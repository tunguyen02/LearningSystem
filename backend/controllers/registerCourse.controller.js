import RegisterCourseModel from '../models/registerCourse.model.js';
import APIFeatures from '../utils/apiFeature.js';

const registerCourseController = {
    getAllRegistrations: async (req, res) => {
        try {
            const features = new APIFeatures(RegisterCourseModel.find(), req.query)
                .filter()
                .sort()
                .limitFields()
                .paginate();

            const registrations = await features.query
                .populate('userId', 'name')
                .populate('courseId', 'name');

            res.json({
                success: true,
                result: registrations.length,
                data: registrations
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error fetching registrations: ' + error.message
            });
        }
    },


    updateRegistrationStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const registration = await RegisterCourseModel.findById(id);
            if (!registration) {
                return res.status(404).json({
                    success: false,
                    message: 'Registration not found'
                });
            }

            registration.status = status;
            await registration.save();

            res.json({
                success: true,
                data: registration
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating registration status: ' + error.message
            });
        }
    },

    

export default registerCourseController;
