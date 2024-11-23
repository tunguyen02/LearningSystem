import { Router } from 'express';
import multer from 'multer';
import courseController from '../controllers/course.controller.js';
import { authMiddleware, checkAdmin } from '../middleware/authMiddleware.js';

const CourseRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

CourseRouter.get('/my-courses', authMiddleware, courseController.getAllCourseByUser);
CourseRouter.get('/', courseController.getAllCourses);
CourseRouter.get('/daily-stats', authMiddleware, checkAdmin, courseController.getDailyStats);
CourseRouter.get('/:id', courseController.getCourseById);
CourseRouter.post('/', authMiddleware, checkAdmin, upload.single('image'), courseController.createCourse);
CourseRouter.put('/:id', authMiddleware, checkAdmin, upload.single('image'), courseController.updateCourse);
CourseRouter.delete('/:id', authMiddleware, checkAdmin, courseController.deleteCourse);
CourseRouter.get('/:id/confirm', authMiddleware, courseController.isCourseConfirmed);

export default CourseRouter;
