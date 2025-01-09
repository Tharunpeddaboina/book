const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/Bookexchange";
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
module.exports=db;
