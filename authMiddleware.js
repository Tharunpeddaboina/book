const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');  // Assuming you have a User model

// Middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']; // Get the token from the headers
  if (!token) {
    return res.status(403).json({ message: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token using secret key
    const user = await User.findById(decoded.userId); // Find the user by decoded ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user; // Add the user to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
