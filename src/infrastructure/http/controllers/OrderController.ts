import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../../application/use-cases/order/CreateOrderUseCase";
import { handleHttpError } from "../utils/ErrorHandler";

@injectable()
export class OrderController {
	constructor(private createOrderUseCase: CreateOrderUseCase) { }

	async create(req: Request, res: Response) {
		try {
			await this.createOrderUseCase.execute(req.body);

			return res.status(201).json({ message: "Order was created" });
		} catch (err: unknown) {
			return handleHttpError(err, res);
		}
	}
}
