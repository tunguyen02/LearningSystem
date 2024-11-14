import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await UserModel.findById(decoded.id);

        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
}


export const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admins only.'
        });
    }
    next();
};


