import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { tokenConfig } from '@config/token';

export class AuthValidator {
  public async validate(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new AppError('Missing jwt');
    }

    const [, token] = authorization.split(/\s/);

    try {
      const { sub } = verify(token, tokenConfig.secret);

      request.user = {
        userId: sub as string,
      };

      return next();
    } catch (err: unknown) {
      throw new AppError('Invalid jwt');
    }
  }
}
