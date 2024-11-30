import { Router } from "express";
import lessonController from "../controllers/lesson.controller.js";
import { authMiddleware, checkAdmin } from "../middleware/authMiddleware.js";

const LessonRouter = Router();

LessonRouter.get('/all', lessonController.getAllLessons);
LessonRouter.get('/detail/:id', lessonController.getLessonById);
LessonRouter.post('/create', authMiddleware, checkAdmin, lessonController.createLesson);
LessonRouter.put('/:id', authMiddleware, checkAdmin, lessonController.updateLesson);
LessonRouter.delete('/:id', authMiddleware, checkAdmin, lessonController.deleteLesson);

export default LessonRouter;
