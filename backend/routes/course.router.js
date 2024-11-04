import { Router } from "express";
import courseController from "../controllers/course.controller.js";

const CourseRouter = Router();

CourseRouter.get('/', courseController.getAllCourses);
CourseRouter.get('/:id', courseController.getCourseById);
CourseRouter.post('/', courseController.createCourse);
CourseRouter.put('/:id', courseController.updateCourse);
CourseRouter.delete('/:id', courseController.deleteCourse);
CourseRouter.get('/:id/confirm', courseController.isCourseConfirmed);

export default CourseRouter;
