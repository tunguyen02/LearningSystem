import CourseModel from "../models/course.model.js";
import APIFeatures from "../utils/apiFeature.js";
import RegisterCourseModel from "../models/registerCourse.model.js";
import uploadController from "./upload.controller.js";
const courseController = {
    getAllCourses: async (req, res) => {
        try {
            const features = new APIFeatures(CourseModel.find(), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate();

            const courses = await features.query;
            res.json({
                success: true,
                result: courses.length,
                data: {
                    courses
                }
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    },

    getCourseById: async (req, res) => {
        try {
            const course = await CourseModel.findById(req.params.id);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                })
            }
            res.json({
                success: true,
                data: course
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    createCourse: async (req, res) => {
        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadController.uploadFile(req.file);
        }
        try {
            const course = new CourseModel({
                name: req.body.name,
                level: req.body.level,
                category: req.body.category,
                price: req.body.price,
                discountPrice: req.body.discountPrice,
                image: imageUrl,
                description: req.body.description
            });
            const savedCourse = await course.save();

            res.json({
                success: true,
                data: savedCourse
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    updateCourse: async (req, res) => {
        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadController.uploadFile(req.file);
        }

        try {
            const course = await CourseModel.findById(req.params.id);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                });
            }

            course.name = req.body.name || course.name;
            course.level = req.body.level || course.level;
            course.category = req.body.category || course.category;
            course.price = req.body.price || course.price;
            course.discountPrice = req.body.discountPrice || course.discountPrice;
            course.description = req.body.description || course.description;

            if (imageUrl) {
                course.image = imageUrl;
            }
            const updatedCourse = await course.save();

            res.json({
                success: true,
                data: updatedCourse
            });

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },


    deleteCourse: async (req, res) => {
        try {
            const course = await CourseModel.findByIdAndDelete(req.params.id);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                })
            }
            res.json({
                success: true,
                message: "Delete success"
            })

        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    isCourseConfirmed: async (req, res) => {
        try {
            const registration = await RegisterCourseModel.findOne({
                userId: req.user._id,
                courseId: req.params.id,
                status: "approved"
            })
            if (registration) {
                return res.json({
                    success: true,
                    message: "Course is confirmed"
                })
            }
            res.json({
                success: false,
                message: "Course is not confirmed"
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })

        }
    },

    getAllCourseByUser: async (req, res) => {
        try {
            const userId = req.user._id;
            const courses = await RegisterCourseModel.find({ userId }).populate("courseId", "name");
            res.json({
                success: true,
                result: courses.length,
                data: {
                    courses
                }
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
};

export default courseController;