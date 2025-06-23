import { Request, Response, NextFunction } from 'express';

type CustomError = {
  statusCode?: number;
  message: string;
};

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    data: null
  });
};
