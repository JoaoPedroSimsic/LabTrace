import { injectable, inject } from "tsyringe";
import { Order } from "../../../domain/entities/Order";
import { IOrderRepository } from "../../../domain/repositories/IOrderRepository";
import { Service } from "../../../domain/entities/Service";

interface CreateOrderInput {
	lab: string;
	patient: string;
	customer: string;
	services: { name: string; value: number }[];
}

@injectable()
export class CreateOrderUseCase {
	constructor(
		@inject("OrderRepository") private orderRepository: IOrderRepository,
	) { }

	async execute(input: CreateOrderInput): Promise<void> {
		const services = input.services.map(
			(s) => new Service(s.name, s.value, "PENDING"),
		);

		const order = new Order(
			input.lab,
			input.patient,
			input.customer,
			"CREATED",
			"ACTIVE",
			services,
		);

		await this.orderRepository.save(order);
	}
}
