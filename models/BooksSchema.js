const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  condition: { type: String, enum: ['new', 'used'], required: true },
  price: { type: Number, required: true },
  genre: { type: String, required: true },
  location: { type: String, required: true },
  transactionType: { type: String, enum: ["sale", "exchange"], required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }  // Make userId optional
});


module.exports = mongoose.model("Book", BookSchema);
