import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { CreateOrderUseCase } from "@application/use-cases/order/CreateOrderUseCase";
import { GetOrdersUseCase } from "@application/use-cases/order/GetOrdersUseCase";
import { handleHttpError } from "../utils/ErrorHandler";
import { AdvanceOrderStateUseCase } from "@application/use-cases/order/AdvanceOrderStateUseCase";
import { AddServiceUseCase } from "@/application/use-cases/order/AddServiceUseCase";

@injectable()
export class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getOrdersUseCase: GetOrdersUseCase,
    private advanceOrderStateUseCase: AdvanceOrderStateUseCase,
    private addServiceUseCase: AddServiceUseCase,
  ) {}

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
      const orders = await this.getOrdersUseCase.execute(req.body);

      return res.status(200).json(orders);
    } catch (err: unknown) {
      return handleHttpError(err, res);
    }
  }

  async advance(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.advanceOrderStateUseCase.execute(id);

      return res.status(200).json({ message: "Order state was advanced" });
    } catch (err: unknown) {
      return handleHttpError(err, res);
    }
  }

  async addService(req: Request, res: Response): Promise<Response> {
    try {
      const { id, service } = req.body;

      await this.addServiceUseCase.execute(id, service);

      return res.status(200).json({ message: "Service added" });
    } catch (err: unknown) {
      return handleHttpError(err, res);
    }
  }
}
