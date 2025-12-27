import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateUserUseCase } from "@application/use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "@application/use-cases/user/LoginUserUseCase";
import { handleHttpError } from "../utils/ErrorHandler";

@injectable()
export class AuthController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private loginUserUseCase: LoginUserUseCase,
	) { }

	async create(req: Request, res: Response): Promise<Response> {
		try {
			await this.createUserUseCase.execute(req.body);

			return res.status(201).json({ message: "User created" });
		} catch (err: unknown) {
			return handleHttpError(err, res);
		}
	}

	async login(req: Request, res: Response): Promise<Response> {
		try {
			const { token } = await this.loginUserUseCase.execute(req.body);

			res.cookie("auth_token", token, {
				httpOnly: true,
				secure: false,
				sameSite: "lax",
				maxAge: 24 * 60 * 60 * 1000,
			});

			return res.status(200).json(token);
		} catch (err: unknown) {
			return handleHttpError(err, res);
		}
	}
}
