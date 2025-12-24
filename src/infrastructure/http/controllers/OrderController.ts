import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../../application/use-cases/order/CreateOrderUseCase";
import { OrderRepository } from "../../db/repositories/OrderRepository";
import { handleHttpError } from "../utils/ErrorHandler";

export class OrderController {
	async create(req: Request, res: Response) {
		try {
			const repository = new OrderRepository();
			const useCase = new CreateOrderUseCase(repository);

			await useCase.execute(req.body);

			return res.status(201).json({ message: "Order was created" });
		} catch (err: unknown) {
			return handleHttpError(err, res);
		}
	}
}
