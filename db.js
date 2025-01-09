const mongoose = require("mongoose");
require("dotenv").config();

const mongoURL = process.env.MONGODB_URI;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("mongodb connected");
});
db.on("error", (err) => {
  console.log("mongodb connection error:", err);
});
db.on("disconnected", () => {
  console.log("mongodb disconnected");
});
module.exports = db;
