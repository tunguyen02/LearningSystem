import { Router } from "express";
import lessonController from "../controllers/lesson.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const LessonRouter = Router();

LessonRouter.get('/all', lessonController.getAllLessons);
LessonRouter.get('/detail/:id', lessonController.getLessonById);
LessonRouter.post('/create', authMiddleware, lessonController.createLesson);
LessonRouter.put('/:id', authMiddleware, lessonController.updateLesson);
LessonRouter.delete('/:id', authMiddleware, lessonController.deleteLesson);

export default LessonRouter;
