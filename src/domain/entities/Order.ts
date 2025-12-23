import { OrderState } from "../value-objects/OrderState";
import { OrderStatus } from "../value-objects/OrderStatus";
import { Service } from "./Service";

export class Order {
	constructor(
		public lab: string,
		public patient: string,
		public customer: string,
		public state: OrderState,
		public status: OrderStatus,
		public service: Service,
	) {}
}
