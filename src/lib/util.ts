type StringKeyOf<T> = Extract<keyof T, string>;

export function withoutKeysCaseInsensitive<T extends Record<string, any>>(obj: T, keysToRemove: Iterable<string>): Partial<T> {
  const toRemove = new Set(Array.from(keysToRemove, (k) => k.toLowerCase()));
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => !toRemove.has(k.toLowerCase()))) as Partial<T>;
}
