import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User',
    }
},
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
