import { Router } from "express";
import registerCourseController from "../controllers/registerCourse.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const RegistrationRouter = Router();

RegistrationRouter.get('/new', registerCourseController.getNewRegistrations);
RegistrationRouter.get('/', registerCourseController.getAllRegistrations);
RegistrationRouter.post('/', authMiddleware, registerCourseController.registerCourse);
RegistrationRouter.put('/:id', authMiddleware, registerCourseController.updateRegistrationStatus);

export default RegistrationRouter;
