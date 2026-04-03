import bcrypt from 'bcrypt';
import User from '../models/user.js';

const signup = async (firstName, lastName, emailId, password) => {
    const existingUser = await User.findOne({emailId});
    if(existingUser){
        throw new Error("Already signed up with this email id");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({firstName, lastName, emailId, password: hashedPassword});
    return user;
}

export default { signup };