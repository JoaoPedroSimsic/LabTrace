import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase";
import { LoginUserUseCase } from "../../../application/use-cases/user/LoginUserUseCase";
import { handleHttpError } from "../utils/ErrorHandler";
import { AppError } from "../../../shared/errors/AppError";
import validator from 'validator';

@injectable()
export class AuthController {
	constructor(
		private createUserUseCase: CreateUserUseCase,
		private loginUserUseCase: LoginUserUseCase,
	) { }

	async create(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new AppError("Missing email or password", 400);
            }

            if (!validator.isEmail(email)) {
                throw new AppError("Invalid email format", 400);
            }

            if (!validator.isLength(password, { min: 6, max: 72 })) {
                throw new AppError("Password must be between 6 and 72 characters", 400);
            }

            const sanitizedEmail = validator.normalizeEmail(email) || email;

            await this.createUserUseCase.execute({ 
                email: sanitizedEmail, 
                password 
            });

            return res.status(201).json({ message: "User created" });
        } catch (err: unknown) {
            return handleHttpError(err, res);
        }
    }
	async login(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				throw new AppError("Missing email or password", 400);
			}

			const result = await this.loginUserUseCase.execute(req.body);

			return res.status(200).json(result);
		} catch (err: unknown) {
			return handleHttpError(err, res);
		}
	}
}
