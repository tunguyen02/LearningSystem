import mongoose from "mongoose";

const registerCourseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
},
    {
        timestamps: true,
    }
)

const RegisterCourseModel = mongoose.model("RegisterCourse", registerCourseSchema);
export default RegisterCourseModel;