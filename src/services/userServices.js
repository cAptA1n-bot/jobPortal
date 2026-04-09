import Application from "../models/application.js";

const getMyApplications = async (candidateId, query) => {
    try{
        
        const page = query.page ? parseInt(query.page) : 1;
        const limit = query.limit ? parseInt(query.limit) : 10;
        const skip = (page - 1) * limit;
        const applications = await Application.find({ candidate: candidateId }).populate('job', 'title company location salary description').sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalApplications = await Application.countDocuments({ candidate: candidateId });
        return { applications, totalPages: Math.ceil(totalApplications / limit), currentPage: page, totalApplications };
    }
    catch(error){
        throw error;
    }
}

export default {getMyApplications};