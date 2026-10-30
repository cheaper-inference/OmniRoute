/**
 * Boot-time sweeper for the Grok Bot remote-cleanup retry queue (spec
 * steps 13-14). The executor's per-request drain only runs when a NEW
 * conversation arrives on the same connection; items whose connection goes
 * quiet would otherwise sit forever. This sweeper makes retry progress
 * request-independently: once at boot, then on a fixed interval.
 *
 * Per item, per sweep:
 *  - 24h TTL from createdAt: drop with a final error log (dead-letter).
 *  - Connection row gone: drop immediately (nothing left to authenticate as).
 *  - No refresh token on the persisted connection: drop (unrecoverable).
 *  - Token refresh failure: keep (transient; retried next sweep).
 *  - rowId known: DeleteGrokBotAgent; success removes the item.
 *  - rowId unknown: roster lookup maps agentId -> rowId. A roster RPC
 *    failure keeps the item; a roster MISS counts toward terminal
 *    resolution -- three consecutive misses spanning at least 10 minutes
 *    mean the agent is really gone: drop with an `unresolved` error log
 *    (the audit record) instead of retrying forever.
 *  - Per-item in-process lock: overlapping sweeps never double-delete.
 *
 * Every item is isolated: one throwing operation can neither abort the
 * sweep nor take down the timer callback.
 */

import { getAccessToken } from "../services/tokenRefresh.ts";
import {
  readQueue,
  removeFromQueue,
  type PendingCleanup,
} from "./grok-bot-cleanup-queue.ts";

/** 24h dead-letter horizon from item creation. */
export const CLEANUP_ITEM_TTL_MS = 24 * 60 * 60 * 1000;
/** Terminal roster-miss policy: count and minimum observation window. */
export const CLEANUP_ABSENT_MISS_THRESHOLD = 3;
export const CLEANUP_ABSENT_SPAN_MS = 10 * 60 * 1000;
/** Default sweep cadence. */
export const CLEANUP_SWEEP_INTERVAL_MS = 60 * 1000;

export type SweeperLog = { warn?: (...args: unknown[]) => void; info?: (...args: unknown[]) => void } | null;

export interface SweeperTransport {
  rpc(method: string, payload: Record<string, unknown>, opts?: { signal?: AbortSignal }): Promise<unknown>;
}

export interface CleanupSweeperOptions {
  /** Standard persisted-connection loader: refresh token by connection id. */
  resolveConnection(connectionId: string): Promise<{ refreshToken?: string | null } | null>;
  /** Transport factory for a freshly refreshed access token. */
  transportFor(accessToken: string): SweeperTransport;
  /**
   * OAuth refresh step. Injectable so tests never touch the network; the
   * boot wiring uses the standard getAccessToken("grok-bot", ...) path.
   */
  refresh?(
    credentials: { refreshToken?: string },
    log?: { warn?: (...args: unknown[]) => void } | undefined
  ): Promise<{ accessToken: string } | { error: string } | null>;
  now?(): number;
  intervalMs?: number;
  log?: SweeperLog;
}

type AbsenceRecord = { misses: number; firstMissAt: number };

const absenceTracking = new Map<string, AbsenceRecord>();

export function resetCleanupSweeperTrackingForTests(): void {
  absenceTracking.clear();
}

function dropItem(item: PendingCleanup, log: SweeperLog, reason: string): void {
  log?.warn?.(
    "GROK_BOT_CLEANUP",
    `dropping pending cleanup (connection=${item.connectionId ?? "?"} agent=${item.agentId ?? "?"}): ${reason}`
  );
  removeFromQueue(item);
  if (item.agentId) absenceTracking.delete(item.agentId);
}

export async function sweepGrokBotCleanupsOnce(options: CleanupSweeperOptions): Promise<void> {
  const now = options.now?.() ?? Date.now();
  const log = options.log ?? null;
  const items = readQueue();
  const inFlight = sweepGrokBotCleanupsOnce.inFlight;

  for (const item of items) {
    const key = `${item.connectionId ?? ""}:${item.agentId ?? item.rowId ?? item.createdAt}`;
    if (inFlight.has(key)) continue;
    inFlight.add(key);
    try {
      await processItem(item, now, options, log);
    } catch (err) {
      log?.warn?.("GROK_BOT_CLEANUP", `sweep item failed (kept for retry): ${String((err as Error)?.message ?? err)}`);
    } finally {
      inFlight.delete(key);
    }
  }
}
sweepGrokBotCleanupsOnce.inFlight = new Set<string>();

async function processItem(
  item: PendingCleanup,
  now: number,
  options: CleanupSweeperOptions,
  log: SweeperLog
): Promise<void> {
  if (now - Date.parse(item.createdAt) > CLEANUP_ITEM_TTL_MS) {
    dropItem(item, log, "dead-letter after 24h TTL");
    return;
  }
  if (!item.connectionId) {
    dropItem(item, log, "no connection id recorded");
    return;
  }
  const connection = await options.resolveConnection(item.connectionId);
  if (!connection) {
    dropItem(item, log, "connection deleted");
    return;
  }
  if (!connection.refreshToken) {
    dropItem(item, log, "no refresh token on persisted connection (unrecoverable)");
    return;
  }
  const refresh = options.refresh ?? ((credentials: { refreshToken?: string }, l?: { warn?: (...args: unknown[]) => void }) =>
    getAccessToken("grok-bot", credentials, l)
  );
  const refreshed = await refresh({ refreshToken: connection.refreshToken ?? undefined }, log ?? undefined);
  if (!refreshed || refreshed.error) {
    // Transient refresh failure (network, upstream blip): keep the item.
    return;
  }
  const transport = options.transportFor(refreshed.accessToken);

  let rowId = item.rowId;
  if (!rowId) {
    if (!item.agentId) {
      dropItem(item, log, "neither roster row id nor agent id recorded");
      return;
    }
    let roster: { agents?: { id?: string; agentId?: string }[] };
    try {
      roster = (await transport.rpc("ListGrokBotAgents", {})) as { agents?: { id?: string; agentId?: string }[] };
    } catch {
      return; // roster RPC failure is transient -- retry next sweep
    }
    const row = roster?.agents?.find((a) => a.agentId === item.agentId);
    if (!row?.id) {
      const record = absenceTracking.get(item.agentId) ?? { misses: 0, firstMissAt: now };
      record.misses += 1;
      absenceTracking.set(item.agentId, record);
      const span = now - record.firstMissAt;
      if (record.misses >= CLEANUP_ABSENT_MISS_THRESHOLD && span >= CLEANUP_ABSENT_SPAN_MS) {
        dropItem(item, log, `unresolved: agent absent from ${record.misses} consecutive roster lists over ${Math.round(span / 60000)}m (terminal)`);
      }
      return;
    }
    absenceTracking.delete(item.agentId);
    rowId = row.id;
  }

  try {
    await transport.rpc("DeleteGrokBotAgent", { id: rowId });
  } catch {
    return; // delete failure keeps the item for the next sweep / TTL
  }
  removeFromQueue(item);
  if (item.agentId) absenceTracking.delete(item.agentId);
}

export interface StartedCleanupSweeper {
  stop(): void;
  /** Exported for boot's initial drain and tests. */
  sweepOnce(): Promise<void>;
}

export function startGrokBotCleanupSweeper(options: CleanupSweeperOptions): StartedCleanupSweeper {
  const intervalMs = options.intervalMs ?? CLEANUP_SWEEP_INTERVAL_MS;
  // Boot drain runs in the background: it must never delay server readiness.
  void sweepGrokBotCleanupsOnce(options).catch(() => {
    /* per-item isolation already applied; the interval retries */
  });
  const timer = setInterval(() => {
    void sweepGrokBotCleanupsOnce(options).catch(() => {
      /* the next interval retries */
    });
  }, intervalMs);
  timer.unref?.();
  return {
    stop() {
      clearInterval(timer);
    },
    sweepOnce: () => sweepGrokBotCleanupsOnce(options),
  };
}
