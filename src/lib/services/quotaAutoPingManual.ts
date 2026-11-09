/**
 * quotaAutoPingManual.ts — operator-triggered "Ping now" for one Codex OAuth connection.
 *
 * The opt-in scheduler in quotaAutoPing.ts only pings once it sees a connection's
 * session window slide. This is the manual counterpart: one tiny request through the
 * same Codex executor and the same `response.completed` check (sendCodexPing), sent
 * right away, independent of the auto-ping opt-in. It still refuses to spend quota
 * when the session or a blocking (weekly) quota is exhausted, honours exclusive
 * leases and the provider circuit breaker, allows one ping per account at a time and
 * gives up after 60s.
 *
 * Results are a fixed `{ status, reason }` pair — never upstream error text — so the
 * route can return them as-is and the dashboard can localize the reason code.
 */

import { logger } from "@omniroute/open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getProviderConnectionById } from "@/lib/db/providers";
import { QUOTA_AUTOPING_PROVIDERS } from "@/shared/constants/quotaAutoPing";
import {
  createDefaultQuotaAutoPingDeps,
  hasExhaustedBlockingQuota,
  isQuotaExhausted,
  normalizeResetKey,
  sendCodexPing,
  type QuotaAutoPingConnection,
  type QuotaAutoPingDeps,
} from "./quotaAutoPing";

const log = logger("QuotaAutoPingManual");

export const MANUAL_PING_TIMEOUT_MS = 60_000;

export type ManualPingStatus = "succeeded" | "failed" | "skipped";
export type ManualPingReason =
  | "completed"
  | "not_found"
  | "unsupported"
  | "inactive"
  | "busy"
  | "unavailable"
  | "no_model"
  | "auth_failed"
  | "no_token"
  | "quota_unavailable"
  | "quota_exhausted"
  | "not_completed"
  | "timeout"
  | "error";

export interface ManualPingResult {
  status: ManualPingStatus;
  reason: ManualPingReason;
}

type ManualPingConnection = QuotaAutoPingConnection & { isActive?: boolean | null };

export interface ManualPingDeps extends QuotaAutoPingDeps {
  getProviderConnectionById: (id: string) => Promise<ManualPingConnection | null>;
}

export interface ManualPingState {
  /** Connection ids with a manual ping in flight (per-process lock). */
  inFlight: Set<string>;
}

export function createManualPingState(): ManualPingState {
  return { inFlight: new Set() };
}

export function createDefaultManualPingDeps(): ManualPingDeps {
  return {
    ...createDefaultQuotaAutoPingDeps(),
    getProviderConnectionById:
      getProviderConnectionById as unknown as ManualPingDeps["getProviderConnectionById"],
  };
}

const sharedState = createManualPingState();

function result(status: ManualPingStatus, reason: ManualPingReason): ManualPingResult {
  return { status, reason };
}

function checkConnection(connection: ManualPingConnection | null): ManualPingResult | null {
  if (!connection) return result("skipped", "not_found");
  if (connection.provider !== "codex" || connection.authType !== "oauth") {
    return result("skipped", "unsupported");
  }
  if (connection.isActive === false) return result("skipped", "inactive");
  return null;
}

async function runPing(
  connection: ManualPingConnection,
  deps: ManualPingDeps,
  signal: AbortSignal
): Promise<ManualPingResult> {
  if (!deps.canExecuteProvider("codex")) return result("skipped", "unavailable");
  if (await deps.isConnectionUnavailableToAuxiliaryActivity(connection.id)) {
    return result("skipped", "unavailable");
  }
  const pingModel = await deps.resolvePingModel("codex", Date.now());
  if (!pingModel) return result("skipped", "no_model");

  let current: QuotaAutoPingConnection;
  try {
    current = (await deps.refreshAndUpdateCredentials(connection)).connection;
  } catch (err) {
    log.warn(`codex:${connection.id}: credential refresh failed`, {
      error: sanitizeErrorMessage((err as Error)?.message ?? String(err)),
    });
    return result("failed", "auth_failed");
  }
  if (!current?.accessToken) return result("skipped", "no_token");

  const providerConfig = { ...QUOTA_AUTOPING_PROVIDERS.codex, pingModel };
  const proxyInfo = await deps.resolveProxyForConnection(current.id);
  return deps.runWithProxyContext(proxyInfo?.proxy ?? null, async () => {
    await deps.throttleQuotaFetch();
    const usage = await deps.getCodexUsage(current.accessToken, current.providerSpecificData);
    const quotas = (usage?.quotas as Record<string, unknown> | undefined) || {};
    const quota = quotas[providerConfig.quotaKey] as Record<string, unknown> | undefined;
    if (!quota) return result("skipped", "quota_unavailable");
    if (isQuotaExhausted(quota) || hasExhaustedBlockingQuota(quotas, providerConfig.quotaKey)) {
      return result("skipped", "quota_exhausted");
    }
    signal.throwIfAborted();

    const ok = await sendCodexPing(current, providerConfig, deps, signal);
    signal.throwIfAborted();
    if (!ok) return result("failed", "not_completed");

    const resetAt = typeof quota.resetAt === "string" ? quota.resetAt : null;
    await deps.updateProviderConnection(current.id, {
      lastPingAt: new Date().toISOString(),
      ...(resetAt ? { lastPingedResetKey: normalizeResetKey(resetAt) } : {}),
    });
    log.info(`codex:${current.id}: manual ping sent`, { model: pingModel });
    return result("succeeded", "completed");
  });
}

/**
 * Send one Codex ping for `connectionId` now. Never throws: every outcome is a
 * `{ status, reason }` pair. A timeout reports `failed/timeout` — the request may still
 * have reached the provider, so callers should check quota before retrying.
 */
export async function pingCodexAccountNow(
  connectionId: string,
  deps: ManualPingDeps = createDefaultManualPingDeps(),
  state: ManualPingState = sharedState,
  options: { timeoutMs?: number } = {}
): Promise<ManualPingResult> {
  let connection: ManualPingConnection | null;
  try {
    connection = await deps.getProviderConnectionById(connectionId);
  } catch (err) {
    log.warn(`codex:${connectionId}: connection lookup failed`, {
      error: sanitizeErrorMessage((err as Error)?.message ?? String(err)),
    });
    return result("failed", "error");
  }
  const rejected = checkConnection(connection);
  if (rejected) return rejected;
  if (state.inFlight.has(connectionId)) return result("skipped", "busy");

  state.inFlight.add(connectionId);
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<ManualPingResult>((resolve) => {
    timer = setTimeout(() => {
      controller.abort();
      resolve(result("failed", "timeout"));
    }, options.timeoutMs ?? MANUAL_PING_TIMEOUT_MS);
  });
  try {
    const work = runPing(connection as ManualPingConnection, deps, controller.signal).catch(
      (err) => {
        if (controller.signal.aborted) return result("failed", "timeout");
        log.warn(`codex:${connectionId}: manual ping error`, {
          error: sanitizeErrorMessage((err as Error)?.message ?? String(err)),
        });
        return result("failed", "error");
      }
    );
    return await Promise.race([work, timeout]);
  } finally {
    clearTimeout(timer);
    state.inFlight.delete(connectionId);
  }
}
