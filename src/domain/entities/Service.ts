import { ServiceStatus } from "../value-objects/service/ServiceStatus";

export class Service {
	constructor(
		public name: string,
		public value: number,
		public status: ServiceStatus,
	) { }
}
