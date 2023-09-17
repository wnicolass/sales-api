import Redis, { Redis as RedisClient } from 'ioredis';
import { redisConfig } from '@config/cache';

export class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(redisConfig.redis);
  }

  public async save(key: string, value: unknown): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const cachedProducts = await this.client.get(key);

    if (!cachedProducts) {
      return null;
    }

    return JSON.parse(cachedProducts) satisfies T;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
