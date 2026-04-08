import { Router } from "express";
import userController from "../controllers/userController.js";
import authenticator from "../Middleware/authenticator.js";

const userRouter = Router();

// public routes
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

// protected routes
userRouter.get("/:id", authenticator, userController.getUser);
userRouter.get("/me", authenticator, userController.getMe);
userRouter.post("/verify-security", userController.verifySecurityAnswer);
userRouter.put("/:id", authenticator, userController.updateUser);
userRouter.delete("/:id", authenticator, userController.deleteUser);

export default userRouter;