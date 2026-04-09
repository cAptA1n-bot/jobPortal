import userServices from "../services/userServices.js";

const getProfile = async (req, res) => {
    try{
        const user = req.user;
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ data: user });
    }
    catch(error) {
        res.status(400).json({ error: error.message });
    }
}

const getMyApplications = async (req, res) => {
    const candidateId = req.user._id;
    try{
        const applications = await userServices.getMyApplications(candidateId, req.query);
        res.status(200).json({ data: applications });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

export default { getProfile, getMyApplications };