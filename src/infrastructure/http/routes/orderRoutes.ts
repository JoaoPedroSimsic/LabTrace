import { Router } from "express";
import { container } from "tsyringe";
import { OrderController } from "../controllers/OrderController";
import { authMiddleware } from "../middlewares/authMiddleware";

const orderRoutes = Router();
const orderController = container.resolve(OrderController);

orderRoutes.use(authMiddleware);

orderRoutes.post("/", (req, res) => orderController.create(req, res));
orderRoutes.post("/all", (req, res) => orderController.findAll(req, res));

export { orderRoutes };
