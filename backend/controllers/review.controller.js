import ReviewModel from "../models/review.model.js";

const reviewController = {
    createReview: async (req, res) => {
        try {
            const { userId, courseId, rating, comment } = req.body;
            const newReview = new ReviewModel({ userId, courseId, rating, comment });
            const savedReview = await newReview.save();

            res.json({
                success: true,
                data: savedReview,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error creating review: " + error.message,
            });
        }
    },

    updateReview: async (req, res) => {
        try {
            const { userId, courseId, rating, comment } = req.body;
            const updatedReview = await ReviewModel.findOneAndUpdate(
                { userId, courseId },
                { rating, comment },
                { new: true }
            );

            if (!updatedReview) {
                return res.status(404).json({
                    success: false,
                    message: "Review not found",
                });
            }

            res.json({
                success: true,
                data: updatedReview,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error updating review: " + error.message,
            });
        }
    },

    getReviewsByCourse: async (req, res) => {
        try {
            const { courseId } = req.params;
            const reviews = await ReviewModel.find({ courseId }).populate({
                path: "userId",
                select: "name _id email",
            });

            res.json({
                success: true,
                data: reviews,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error fetching reviews: " + error.message,
            });
        }
    },

    deleteReview: async (req, res) => {
        try {
            const { reviewId } = req.params;
            const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);

            if (!deletedReview) {
                return res.status(404).json({
                    success: false,
                    message: "Review not found",
                });
            }

            res.json({
                success: true,
                message: "Review deleted successfully",
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error deleting review: " + error.message,
            });
        }
    },
};

export default reviewController;
