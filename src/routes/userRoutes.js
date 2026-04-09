import express from 'express';
import userControllers from '../controllers/userControllers.js';
import authMiddleware from '../middlewares/auth.js';
import authorizeRole from '../middlewares/authorizeRole.js';

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, userControllers.getProfile);
userRouter.get("/applications", authMiddleware, authorizeRole("applicant"), userControllers.getMyApplications);

export default userRouter;