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
