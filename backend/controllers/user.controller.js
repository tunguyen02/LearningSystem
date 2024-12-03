import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';

const createToken = (id, role, name) => {
    return jwt.sign(
        { id, role, name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
};

const userController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const emailExists = await UserModel.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already exists."
                });
            }
            if (!name || !email || !password) {
                return res.status(400).json({
                    message: "Please fill in all fields."
                });
            }

            if (password.length < 6) {
                return res.status(400).json({
                    message: "Password must be at least 6 characters."
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({
                name,
                email,
                password: hashedPassword
            });
            res.status(201).json({
                message: "User created successfully.",
                data: user
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    },

    

export default userController;