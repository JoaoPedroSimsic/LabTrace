import express, { Application } from "express";
import { initMongoConnection } from "./infrastructure/db/mongoConnection";
import { orderRoutes } from "./infrastructure/http/routes/orderRoutes";

class App {
	app: Application;

	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
		this.dbs();
	}

	middlewares() {
		this.app.use(express.json());
	}

	routes() {
		this.app.use("/orders", orderRoutes);
	}

	dbs() {
		initMongoConnection();
	}
}

export default new App().app;
