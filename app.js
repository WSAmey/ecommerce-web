const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const userRouter = require("./routes/user.route");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
const PORT = process.env.PORT || 3300;
const DB = process.env.DB_URL;

app.listen(PORT, () => {
  try {
    connectDB(DB);
    console.log("Server running on port: ", PORT);
  } catch (error) {
    console.log("An error occured while connecting to server: ", PORT);
  }
});
