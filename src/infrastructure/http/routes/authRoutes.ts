import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/AuthController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { authSchema } from "../validators/AuthValidator";

const authRoutes = Router();
const authController = container.resolve(AuthController);

authRoutes.post("/create", validationMiddleware(authSchema), (req, res) =>
	authController.create(req, res),
);
authRoutes.post("/login", validationMiddleware(authSchema), (req, res) =>
	authController.login(req, res),
);

export { authRoutes };
