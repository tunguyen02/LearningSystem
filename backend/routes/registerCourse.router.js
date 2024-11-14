import { Router } from "express";
import registerCourseController from "../controllers/registerCourse.controller.js";
import { authMiddleware, checkAdmin } from "../middleware/authMiddleware.js";

const RegistrationRouter = Router();

RegistrationRouter.get('/new', authMiddleware, registerCourseController.getNewRegistrations);
RegistrationRouter.get('/', authMiddleware, checkAdmin, registerCourseController.getAllRegistrations);
RegistrationRouter.post('/', authMiddleware, registerCourseController.registerCourse);
RegistrationRouter.put('/:id', authMiddleware, checkAdmin, registerCourseController.updateRegistrationStatus);

export default RegistrationRouter;
