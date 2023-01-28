/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiError } from "@/helpers/api-errors";
import { Request, Response, NextFunction } from "express";

export const middlewareError = (
  error: Error & Partial<ApiError>,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  res.status(statusCode).send({ message });
};
