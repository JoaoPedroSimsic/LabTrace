import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../controllers/AuthController";

const authRoutes = Router();
const authController= container.resolve(AuthController);

authRoutes.post("/create", (req, res) => authController.create(req, res)); 
authRoutes.post("/login", (req, res) => authController.login(req, res));

export { authRoutes };
