import Redis from 'ioredis';
import { redisConfig } from '@config/cache';

export class RedisCacheSingleton {
  private static _client: RedisCacheSingleton | null = null;
  private redisClient = new Redis(redisConfig.redis);

  private constructor() {}

  public static get client(): RedisCacheSingleton {
    if (!RedisCacheSingleton._client) {
      RedisCacheSingleton._client = new RedisCacheSingleton();
    }
    return RedisCacheSingleton._client;
  }

  public async save(key: string, value: unknown): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const cachedProducts = await this.redisClient.get(key);

    if (!cachedProducts) {
      return null;
    }

    return JSON.parse(cachedProducts) satisfies T;
  }

  public async invalidate(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
