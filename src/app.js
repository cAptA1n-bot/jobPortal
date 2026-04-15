import dotenv from 'dotenv';
import express from "express";
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import jobRouter from './routes/jobRoutes.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/jobs", jobRouter);


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

