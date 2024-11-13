import { Router } from 'express';
import multer from 'multer';
import uploadController from '../controllers/upload.controller.js';
import courseController from '../controllers/course.controller.js';

const CourseRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

CourseRouter.get('/', courseController.getAllCourses);
CourseRouter.get('/:id', courseController.getCourseById);
CourseRouter.post('/', upload.single('image'), courseController.createCourse);
CourseRouter.put('/:id', courseController.updateCourse);
CourseRouter.delete('/:id', courseController.deleteCourse);
CourseRouter.get('/:id/confirm', courseController.isCourseConfirmed);

export default CourseRouter;
