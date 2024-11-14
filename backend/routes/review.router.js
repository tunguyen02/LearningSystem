import { Router } from "express";
import reviewController from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const ReviewRouter = Router();

ReviewRouter.post('/', authMiddleware, reviewController.createReview);
ReviewRouter.put('/:userId/:courseId', authMiddleware, reviewController.updateReview);
ReviewRouter.get('/:courseId', reviewController.getReviewsByCourse);
ReviewRouter.delete('/:reviewId', authMiddleware, reviewController.deleteReview);

export default ReviewRouter;
