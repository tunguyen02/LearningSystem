import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';

export const createAdmin = async () => {
    const name = 'Admin';
    const email = 'admin@gmail.com';
    const password = '123456';
    const role = 'Admin';
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await UserModel.findOne({ email });
    if (!existingAdmin) {
        const admin = new UserModel({ name, email, password: hashedPassword, role });
        await admin.save();
        console.log('Admin created');
    } else {
        console.log('Admin already exists');
    }
}

