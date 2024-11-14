import { Router } from 'express';
import multer from 'multer';
import courseController from '../controllers/course.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const CourseRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

CourseRouter.get('/my-courses', authMiddleware, courseController.getAllCourseByUser);
CourseRouter.get('/', courseController.getAllCourses);
CourseRouter.get('/:id', courseController.getCourseById);
CourseRouter.post('/', authMiddleware, upload.single('image'), courseController.createCourse);
CourseRouter.put('/:id', authMiddleware, courseController.updateCourse);
CourseRouter.delete('/:id', authMiddleware, courseController.deleteCourse);
CourseRouter.get('/:id/confirm', authMiddleware, courseController.isCourseConfirmed);

export default CourseRouter;
