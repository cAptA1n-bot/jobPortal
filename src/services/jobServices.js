import Job from '../models/job.js';
import Application from '../models/application.js';

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

const applyToJob = async (jobId, candidateId) => {
    try{
        const job = await Job.findById(jobId);
        if(!job){
            throw new Error("Job not found");
        }
        const existingApplication = await Application.findOne({ job: jobId, candidate: candidateId });
        if(existingApplication){
            throw new Error("You have already applied to this job");
        }
        const application = new Application({ job: jobId, candidate: candidateId });
        await application.save();
        return application;
    }
    catch(error){
        throw error;
    }
}

const withdrawApplication = async (jobId, candidateId) => {
    try{
        const deleted = await Application.findOneAndDelete({ job: jobId, candidate: candidateId });
        if(!deleted){
            throw new Error("Application not found");
        }
          
        return;
    }
    catch(error){
        throw error;
    }
}



const getMyJobs = async (recruiterId, query) => {
    try{
       
        const page = query.page ? parseInt(query.page) : 1;
        const limit = query.limit ? parseInt(query.limit) : 10;
        const skip = (page - 1) * limit;
        const jobs = await Job.find({ createdBy: recruiterId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalJobs = await Job.countDocuments({ createdBy: recruiterId });
        return { jobs, totalPages: Math.ceil(totalJobs / limit), currentPage: page, totalJobs };
    }
    catch(error){
        throw error;
    }
}

const getApplicantsForJob = async (jobId, recruiterId) => {
    try{
        const job = await Job.findById(jobId);
        if(!job){
            throw new Error("Job not found");
        }
        if(job.createdBy.toString() !== recruiterId.toString()){
            throw new Error("Unauthorized");
        }
        
        const page = query.page ? parseInt(query.page) : 1;
        const limit = query.limit ? parseInt(query.limit) : 10;
        const skip = (page - 1) * limit;
        const applications = await Application.find({ job: jobId }).populate('candidate', 'firstName lastName emailId').sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalApplicants = await Application.countDocuments({ job: jobId });
        return { applications, totalPages: Math.ceil(totalApplicants / limit), currentPage: page, totalApplicants };
    }
    catch(error){
        throw error;
    }
}

const closeJob = async (applicationId, recruiterId, status) => {
    try{
        const application = await Application.findById(applicationId).populate('job', 'createdBy');
        if(!application){
            throw new Error("Application not found");
        }
        if(application.job.createdBy.toString() !== recruiterId.toString()){
            throw new Error("Unauthorized");
        }
        if(application.status === "applied"){
            application.status = status;
            await application.save();
            return application;
        }
        else{
            throw new Error("Can only close jobs that are currently open");
        }
        
    }
    catch(error){
        throw error;
    }
}

export default { createJob, getJobs, applyToJob, withdrawApplication, getMyJobs, getApplicantsForJob, closeJob };