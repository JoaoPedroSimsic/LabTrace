import { injectable, inject } from "tsyringe";
import { IOrderRepository } from "@domain/repositories/IOrderRepository";
import { AppError } from "@application/exceptions/AppError";
import { Service } from "@/domain/entities/Service";

@injectable()
export class AddServiceUseCase {
	constructor(
		@inject("OrderRepository") private orderRepository: IOrderRepository,
	) { }

	async execute(id: string, service: Service): Promise<void> {
		const order = await this.orderRepository.findById(id);

		if (!order) {
			throw new AppError("Order not found", 404);
		}

		order.addService(service);

		await this.orderRepository.update(id, order);
	}
}
