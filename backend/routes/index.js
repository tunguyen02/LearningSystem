import { Router } from "express";
import UserRouter from "./user.router.js";
import CourseRouter from "./course.router.js";
import LessonRouter from "./lesson.router.js";
import ReviewRouter from "./review.router.js";
import RegistrationRouter from "./registerCourse.router.js";
import UploadRouter from "./upload.router.js";

const RootRouterV1 = Router();

RootRouterV1.use('/users', UserRouter);
RootRouterV1.use('/courses', CourseRouter);
RootRouterV1.use('/lessons', LessonRouter);
RootRouterV1.use('/reviews', ReviewRouter);
RootRouterV1.use('/registrations', RegistrationRouter);
RootRouterV1.use('/upload', UploadRouter);

export { RootRouterV1 };
