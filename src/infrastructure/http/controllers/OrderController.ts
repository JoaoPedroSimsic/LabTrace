import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { CreateOrderUseCase } from "../../../application/use-cases/order/CreateOrderUseCase";
import { GetOrdersUseCase } from "../../../application/use-cases/order/GetOrdersUseCase";
import { handleHttpError } from "../utils/ErrorHandler";
import { OrderState } from "../../../domain/value-objects/order/OrderState";

@injectable()
export class OrderController {
	constructor(
		private createOrderUseCase: CreateOrderUseCase,
		private getOrdersUseCase: GetOrdersUseCase,
	) { }

	async create(req: Request, res: Response): Promise<Response> {
		try {
			await this.createOrderUseCase.execute(req.body);

			return res.status(201).json({ message: "Order was created" });
		} catch (err: unknown) {
			return handleHttpError(err, res);
		}
	}

	async get(req: Request, res: Response): Promise<Response> {
		try {
			const { state, page, limit } = req.query;

			const orders = await this.getOrdersUseCase.execute({
				state: state as OrderState,
				page: Number(page) || 1, 
				limit: Number(limit) || 10, 
			});

			return res.status(200).json(orders);
		} catch (err: unknown) {
			return handleHttpError(err, res);
		}
	}
}
