import bcrypt from 'bcrypt';
import User from '../models/user';

const signup = async (firstName, lastName, emailId, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({firstName, lastName, emailId, password: hashedPassword});
    return user;
}

export default { signup };