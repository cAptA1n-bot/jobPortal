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

const getJobs = async (query) => {
    try{

        const keywords = query.keywords ? { $or: [{ title: { $regex: query.keywords, $options: 'i' } }, { description: { $regex: query.keywords, $options: 'i' } }] } : {};
        const filters = {...keywords, ...(query.location && { location: { $regex: query.location, $options: 'i' } }), ...(query.salary && { salary: { $gte: parseInt(query.salary) } })};
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const jobs  = await Job.find(filters, {title: 1, company: 1, description: 1, location: 1, salary: 1}).skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments(filters);
        return { jobs, totalPages: Math.ceil(totalJobs / limit), currentPage: page, totalJobs};
    }
    catch(error){
        throw new Error("Failed to fetch jobs");
    }
}

export default { createJob, getJobs };