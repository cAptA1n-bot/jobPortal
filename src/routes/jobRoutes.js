import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import authorizeRole from '../middlewares/authorizeRole.js';
import jobControllers from '../controllers/jobControllers.js';

const jobRouter = express.Router();

jobRouter.post("/", authMiddleware, authorizeRole("admin", "recruiter"), jobControllers.createJob);
jobRouter.get("/", authMiddleware, jobControllers.getJobs);
jobRouter.post("/:id/applications", authMiddleware, authorizeRole("applicant"), jobControllers.applyToJob);
jobRouter.delete("/:id/applications", authMiddleware, authorizeRole("applicant"), jobControllers.withdrawApplication);
jobRouter.get("/applications", authMiddleware, authorizeRole("applicant"), jobControllers.getMyApplications);
jobRouter.get("/myjobs", authMiddleware, authorizeRole("recruiter"), jobControllers.getMyJobs);
jobRouter.get("/:id/applicants", authMiddleware, authorizeRole("recruiter"), jobControllers.getApplicantsForJob);
jobRouter.patch("/:id/:status/close", authMiddleware, authorizeRole("recruiter"), jobControllers.closeJob);

export default jobRouter;