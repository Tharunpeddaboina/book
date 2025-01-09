const express = require("express");
const User = require("../models/userSchema");
const Book = require("../models/BooksSchema");
const router = express.Router();
const authMiddleware = require("../authMiddleware");
const roleMiddleware = require("../roleMiddleware ");


// Get all users
router.get("/users", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/users/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User banned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all books
router.get("/books", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const books = await Book.find().populate("owner", "name email");
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a book
router.delete("/books/:id", authMiddleware, roleMiddleware("admin"), async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
