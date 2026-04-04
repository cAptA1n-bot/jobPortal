import Job from '../models/job.js';

const createJob = async (title, description, company, location, salary, createdBy) => {
    try{
        const job = new Job({ title, description, company, location, salary, createdBy });
        await job.save();
        return job;
    }
    catch(error) {
        throw new Error("Failed to create job");
    }
}

export default { createJob };