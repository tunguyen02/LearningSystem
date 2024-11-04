import { Router } from "express";
import reviewController from "../controllers/review.controller.js";

const ReviewRouter = Router();

ReviewRouter.post('/', reviewController.createReview);
ReviewRouter.put('/:userId/:courseId', reviewController.updateReview);
ReviewRouter.get('/:courseId', reviewController.getReviewsByCourse);
ReviewRouter.delete('/:reviewId', reviewController.deleteReview);

export default ReviewRouter;
