import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            value: ['admin', 'recruiter', 'applicant'],
            message: '{VALUE} is not a valid role'
        },
        default: 'applicant'
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;