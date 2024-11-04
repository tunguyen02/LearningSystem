import { Router } from "express";
import lessonController from "../controllers/lesson.controller.js";

const LessonRouter = Router();

LessonRouter.get('/', lessonController.getAllLessons);
LessonRouter.get('/:id', lessonController.getLessonById);
LessonRouter.post('/', lessonController.createLesson);
LessonRouter.put('/:id', lessonController.updateLesson);
LessonRouter.delete('/:id', lessonController.deleteLesson);

export default LessonRouter;
