import jobServices from "../services/jobServices.js";

const createJob = async (req, res) => {
    const { title, description, company, location, salary } = req.body;
    const createdBy = req.user._id;
    try {
        if (!title || !description || !company || !location || !salary) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const job = await jobServices.createJob(title, description, company, location, salary, createdBy);
        res.status(201).json({ message: "Job created successfully", data: job });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export default { createJob };