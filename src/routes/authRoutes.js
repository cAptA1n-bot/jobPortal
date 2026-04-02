import express from 'express';
import authController from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);

export default authRouter;