import { buildAccountSemaphoreKey } from "./accountSemaphore.ts";

/** Process-local AIMD limits. No persistence or cross-instance coordination. */
const limits = new Map<string, { limit: number; successes: number }>();
const INITIAL_LIMIT = 4;
const CEILING = 32;
const SUCCESS_WINDOW = 16;

export function adaptiveConnectionKey(provider: string, connectionId: string): string {
  return buildAccountSemaphoreKey({ provider, accountKey: connectionId });
}

export function getAdaptiveConnectionLimit(key: string, initial = INITIAL_LIMIT): number {
  let state = limits.get(key);
  if (!state) {
    state = { limit: Math.max(1, Math.min(CEILING, initial)), successes: 0 };
    limits.set(key, state);
  }
  return state.limit;
}

/** Call only for a response received from upstream, never for local admission failures. */
export function recordAdaptiveConnectionResponse(key: string, status: number): void {
  const state = limits.get(key);
  if (!state) return;
  if (status === 429) {
    state.limit = Math.max(1, Math.floor(state.limit / 2));
    state.successes = 0;
  } else if (status >= 200 && status < 300) {
    state.successes++;
    if (state.successes >= SUCCESS_WINDOW) {
      state.limit = Math.min(CEILING, state.limit + 1);
      state.successes = 0;
    }
  }
}

export function resolveConnectionConcurrencyCap(
  configured: number | null | undefined,
  providerDefault: number | null | undefined,
  key: string
): number | null {
  if (configured === -1) return getAdaptiveConnectionLimit(key, providerDefault || INITIAL_LIMIT);
  if (typeof configured === "number" && configured > 0) return configured;
  return typeof providerDefault === "number" && providerDefault > 0 ? providerDefault : null;
}

export function getAdaptiveConnectionStatus(): Record<string, number> {
  return Object.fromEntries([...limits].map(([key, value]) => [key, value.limit]));
}

export function resetAdaptiveConnectionLimitsForTest(): void {
  limits.clear();
}
