type SimpleObject = Record<string, unknown>;

export function update<T>(entity: T, data: Partial<T>): T {
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      (entity as SimpleObject)[key] = value;
    }
  }

  return entity;
}
