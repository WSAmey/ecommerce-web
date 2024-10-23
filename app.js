const express = require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const { connectDB } = require("./config/db");
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

const PORT=process.env.PORT || 3300;
const DB=process.env.DB_URL;

app.listen(PORT,()=>{
    try {
        connectDB(DB);
        console.log("Server running on port: ", PORT);
    } catch (error) {
        console.log("An error occured while connecting to server: ", PORT);
    }
});



