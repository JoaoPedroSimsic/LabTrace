import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodError, ZodType } from "zod";
import { ParsedQs } from "qs";
import { ParamsDictionary } from "express-serve-static-core";

type ValidationShape = {
  body?: unknown;
  query?: unknown;
  params?: unknown;
};

export const validationMiddleware =
  (
    schema: ZodType<ValidationShape>
  ): RequestHandler =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const result = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (result.body !== undefined) {
        req.body = result.body;
      }

      if (result.query !== undefined) {
        req.query = result.query as ParsedQs;
      }

      if (result.params !== undefined) {
        req.params = result.params as ParamsDictionary;
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return next(err);
      }

      next(err);
    }
  };
