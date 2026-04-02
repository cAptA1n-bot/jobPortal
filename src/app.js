import dotenv from 'dotenv';
import express from "express";
import connectDB from './config/database.js';
dotenv.config();

const app = express();

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(err.message);
    })

