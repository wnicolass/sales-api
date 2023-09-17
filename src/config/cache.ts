import { RedisOptions } from 'ioredis';

interface IRedisConfig {
  redis: RedisOptions;
  driver: string;
}

export const redisConfig = {
  redis: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  driver: 'redis',
} satisfies IRedisConfig;
