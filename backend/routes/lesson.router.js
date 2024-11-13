import { Router } from "express";
import lessonController from "../controllers/lesson.controller.js";

const LessonRouter = Router();

LessonRouter.get('/all', lessonController.getAllLessons);
LessonRouter.get('/detail/:id', lessonController.getLessonById);
LessonRouter.post('/create', lessonController.createLesson);
LessonRouter.put('/:id', lessonController.updateLesson);
LessonRouter.delete('/:id', lessonController.deleteLesson);

export default LessonRouter;
