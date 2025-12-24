import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post("/", (req, res) => orderController.create(req, res));

export { orderRoutes };
