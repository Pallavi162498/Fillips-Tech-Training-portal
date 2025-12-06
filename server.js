import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import connectDB from "./db.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000
connectDB()

app.listen(PORT, () => 
    console.log(`Server is running on ${PORT}`)
)
