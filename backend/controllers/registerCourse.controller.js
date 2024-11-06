import RegisterCourseModel from '../models/registerCourse.model.js';

const registerCourseController = {
    getAllRegistrations: async (req, res) => {
        try {
            const registrations = await RegisterCourseModel.find()
                .populate('userId', 'name')
                .populate('courseId', 'name');

            res.json({
                success: true,
                data: registrations
            });
        } catch (error) {
            res.status(500).json({
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

    getNewRegistrations: async (req, res) => {
        try {
            const last7Days = new Date(new Date().setDate(new Date().getDate() - 7));
            const newRegistrations = await RegisterCourseModel.find({ createdAt: { $gte: last7Days } });

            res.json({
                success: true,
                data: newRegistrations.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching new registrations: ' + error.message
            });
        }
    }
};

export default registerCourseController;
