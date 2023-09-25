import { DeepPartial } from 'typeorm';

type SimpleObject = Record<string, unknown>;

export function update<T>(entity: T, data: DeepPartial<T>): T {
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      (entity as SimpleObject)[key] = value;
    }
  }

  return entity;
}
