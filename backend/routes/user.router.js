import { Router } from "express";
import userController from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post("/register", userController.register);
UserRouter.post("/login", userController.logIn);
UserRouter.get("/", userController.getAllUsers);
UserRouter.get("/:id", userController.getUserById);

export default UserRouter;