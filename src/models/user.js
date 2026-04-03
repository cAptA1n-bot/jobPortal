import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                try {
                    emailValidator(value); // your utils function
                    return true;
                } catch (err) {
                    return false;
                }
            },
            message: "Email id is invalid"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                try {
                    passwordValidator(value);
                    return true;
                } catch (err) {
                    return false;
                }
            },
            message: "Set a strong password"
        }
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'recruiter', 'applicant'],
            message: '{VALUE} is not a valid role'
        },
        default: 'applicant'
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

const emailValidator = (emailId) => {
    return validator.isEmail(emailId);
}

const passwordValidator = (password) => {
    return validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    });
}

export default User;