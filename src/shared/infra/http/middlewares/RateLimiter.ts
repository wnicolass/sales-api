import Redis, { Redis as RedisClient } from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@shared/errors/AppError';
import { redisConfig } from '@config/cache';

class RateLimiter {
  private client: RedisClient;

  constructor() {
    this.client = new Redis({
      host: redisConfig.redis.host,
      port: redisConfig.redis.port,
    });
    this.limit = this.limit.bind(this);
  }

  public getClient(): RedisClient {
    return this.client;
  }

  public async limit(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const redisClient = this.getClient();
      const limiter = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: 'ratelimit',
        points: 5,
        duration: 1,
      });
      await limiter.consume(request.ip);
      return next();
    } catch (err: unknown) {
      throw new AppError('Too many requests', 429);
    }
  }
}

export const rateLimiter = new RateLimiter();
