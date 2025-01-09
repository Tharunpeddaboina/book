const express=require('express');
const app=express();
const PORT=5000;
const db=require('./db')
const dotenv = require("dotenv");
const userRoutes=require('./Routes/userRoutes')
const booksRoutes=require('./Routes/booksRoutes')
const cors = require('cors');
app.use(cors());

dotenv.config();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/books", booksRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
