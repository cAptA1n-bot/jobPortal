import jobServices from "../services/jobServices.js";

const createJob = async (req, res) => {
    const { title, description, company, requirements, location, salary } = req.body;
    const createdBy = req.user._id;
    try {
        if (!title || !description || !company || !location || !salary || !requirements) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const job = await jobServices.createJob(title, description, company, requirements, location, salary, createdBy);
        res.status(201).json({ message: "Job created successfully", data: job });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const getJobs = async (req, res) => {
    try{
        const jobs = await jobServices.getJobs(req.query);
        res.status(200).json({ data: jobs });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

const applyToJob = async (req, res) => {
    const jobId = req.params.id;
    const candidateId = req.user._id;
    try{
        const application = await jobServices.applyToJob(jobId, candidateId);
        res.status(200).json({ message: "Applied to job successfully", data: application });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

const withdrawApplication = async (req, res) => {
    const jobId = req.params.id;
    const candidateId = req.user._id;
    try{
        await jobServices.withdrawApplication(jobId, candidateId);
        res.status(200).json({ message: "Application withdrawn successfully" });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export default { createJob, getJobs, applyToJob, withdrawApplication };