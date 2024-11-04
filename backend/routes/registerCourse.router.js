import { Router } from "express";
import registerCourseController from "../controllers/registerCourse.controller.js";

const RegistrationRouter = Router();

RegistrationRouter.get('/', registerCourseController.getAllRegistrations);
RegistrationRouter.get('/new', registerCourseController.getNewRegistrations);
RegistrationRouter.put('/:id', registerCourseController.updateRegistrationStatus);

export default RegistrationRouter;
