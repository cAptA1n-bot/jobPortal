import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import authorizeRole from '../middlewares/authorizeRole.js';
import jobControllers from '../controllers/jobControllers.js';

const jobRouter = express.Router();

jobRouter.post("/", authMiddleware, authorizeRole("admin", "recruiter"), jobControllers.createJob);
jobRouter.get("/", authMiddleware, jobControllers.getJobs);
jobRouter.post("/:id/application", authMiddleware, authorizeRole("applicant"), jobControllers.applyToJob);

export default jobRouter;