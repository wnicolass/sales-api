import { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';

class ErrorHandler {
  public handle(
    error: Error,
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Response {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
}

export default new ErrorHandler();
