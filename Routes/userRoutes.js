const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields (name, email, password) are required' });
    }

    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10); // Salt factor
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password

    // Create the new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET || "12345", { expiresIn: '1h' });

    res.status(201).json({ token, user: { email: newUser.email, name: newUser.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    
    // If everything is correct, generate and return a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "12345", { expiresIn: '1d' });
    
    res.json({ token, user: { email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
