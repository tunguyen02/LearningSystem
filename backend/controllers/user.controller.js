import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';

const createToken = (id) => {
    return jwt.sign(
        { id },
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

    logIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    message: "Invalid email or password."
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid email or password."
                });
            }
            const token = createToken(user._id);
            res.status(200).json({
                message: "User logged in successfully.",
                token
            });
        } catch (error) {
            res.status(400).json({
                message: error.message
            });
        }
    }
};

export default userController;