import {
  DEFAULT_RESILIENCE_SETTINGS,
  type RequestQueueSettings,
} from "../../../src/lib/resilience/settings.ts";
import type { ConnectionRateLimitOverrides } from "../../../src/lib/db/providers/columns.ts";

export const enabledConnections = new Set<string>();
export function isConnectionRateLimitEnabled(connectionId: string): boolean {
  return enabledConnections.has(connectionId);
}

export const connectionRateLimitOverrides = new Map<string, ConnectionRateLimitOverrides>();
export const requestQueueState: { settings: RequestQueueSettings } = {
  settings: DEFAULT_RESILIENCE_SETTINGS.requestQueue,
};

function resolveOverride(override: number | undefined | null, fallback: number): number {
  return typeof override === "number" && override > 0 ? override : fallback;
}

export const ZAI_WEB_REQUEST_QUEUE_MAX_WAIT_MS = 60_000;
// MaxAI proxies reasoning models (deepseek-r1, gpt-5.6-thinking, grok-4.5,
// gemini-3.1-pro-preview, grok-4-1-fast-reasoning) whose single upstream turn
// legitimately runs tens of seconds to minutes. The 15s default execution
// expiration (Bottleneck `expiration`, applied AFTER dispatch) kills those mid
// think and surfaces a spurious local 504. Floor MaxAI at 5 min — the same
// ceiling waitForCooldown.budgetMs uses — so slow reasoning turns complete.
export const MAXAI_REQUEST_QUEUE_MAX_WAIT_MS = 300_000;

export function resolveRequestQueueMaxWaitMs(
  provider: string,
  configuredMaxWaitMs: number = requestQueueState.settings.maxWaitMs,
  connectionId?: string
): number {
  const p = provider.trim().toLowerCase();
  let legacyDefault = configuredMaxWaitMs;
  if (p === "zai-web") {
    legacyDefault = Math.max(configuredMaxWaitMs, ZAI_WEB_REQUEST_QUEUE_MAX_WAIT_MS);
  } else if (p === "maxai" || p === "mx") {
    // MaxAI's slow reasoning models legitimately need up to ~5 min; floor the
    // per-request execution budget so they aren't cut off early.
    legacyDefault = Math.max(configuredMaxWaitMs, MAXAI_REQUEST_QUEUE_MAX_WAIT_MS);
  }
  const override = connectionId
    ? connectionRateLimitOverrides.get(connectionId)?.maxWaitMs
    : undefined;
  return resolveOverride(override, legacyDefault);
}
