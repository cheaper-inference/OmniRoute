import { AsyncLocalStorage } from "node:async_hooks";

const requests = new AsyncLocalStorage<{ origin?: number; bounds: Map<string, number> }>();

export function hasCapacityRequest(): boolean {
  return requests.getStore() != null;
}
export function withoutCapacityRequest<T>(callback: () => T): T {
  return requests.exit(callback);
}
export function runCapacityRequest<T>(callback: () => T): T {
  return requests.run({ bounds: new Map() }, callback);
}

/** Execution may tighten a recorded bound, but never start a parking clock. */
export function capacityRequestDeadline(
  key: string,
  budgetMs: number,
  startOrigin = false
): number {
  const request = requests.getStore();
  if (!startOrigin && request?.origin == null) return Infinity;
  const origin = request ? (request.origin ??= Date.now()) : Date.now();
  const bound = Math.min(
    budgetMs > 0 ? origin + budgetMs : Infinity,
    request?.bounds.get(key) ?? Infinity
  );
  request?.bounds.set(key, bound);
  return bound;
}
