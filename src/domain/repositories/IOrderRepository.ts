import { Order } from "../entities/Order";
import { OrderState } from "../value-objects/order/OrderState";

export interface IOrderRepository {
	save(order: Order): Promise<void>;
	get(filters: {
		state?: OrderState;
		page: number;
		limit: number;
	}): Promise<Order[]>;
	findById(id: string): Promise<Order | null>;
	update(id: string, order: Partial<Order>): Promise<void>;
}
