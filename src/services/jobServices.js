import Job from '../models/job.js';

const createJob = async (title, description, company, requirements, location, salary, createdBy) => {
    try{
        const job = new Job({ title, description, company, requirements, location, salary, createdBy });
        await job.save();
        return job;
    }
    catch(error) {
        throw new Error("Failed to create job");
    }
}

const getJobs = async () => {
    try{
        const jobs  = await Job.find({}, {title: 1, company: 1, location: 1, salary: 1});
        return jobs;
    }
    catch(error){
        throw new Error("Failed to fetch jobs");
    }
}

export default { createJob, getJobs };