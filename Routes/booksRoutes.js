const express = require("express");
const Book = require("../models/BooksSchema");
const mongoose = require('mongoose');
const authMiddleware = require("../authMiddleware");  // Import the authMiddleware
const router = express.Router();

// Route for searching books
router.get("/search", async (req, res) => {
  const { title } = req.query;

  try {
    const filters = title ? { title: new RegExp(title, 'i') } : {}; 
    const books = await Book.find(filters);
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(400).json({ error: err.message });
  }
});

// Route to post a book (requires authentication)
router.post("/post", async (req, res) => {
  const { title, author, condition, price, genre, location, contact, transactionType } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      condition,
      price,
      genre,
      location,
      contact,
      transactionType,
      userId: null,  // Use the user._id from authenticated request
    });

    await newBook.save();
    res.status(201).json({ message: "Book posted successfully", book: newBook });
  } catch (error) {
    console.error("Error posting book:", error);
    res.status(500).json({ message: "Failed to post the book" });
  }
});

// Route for fetching books of a specific user
router.get("/user-books/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the userId is a valid 24-character hex string
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    const validUserId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId
    console.log('Fetching books for userId:', validUserId);

    const books = await Book.find({ userId: validUserId }); // Fetch books where userId matches
    console.log('Books found:', books);

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found for this user." });
    }

    res.json(books); // Return books as JSON
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Error fetching books" });
  }
});

module.exports = router;
