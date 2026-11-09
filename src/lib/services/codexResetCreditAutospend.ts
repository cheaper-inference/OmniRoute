/**
 * codexResetCreditAutospend.ts — opt-in scheduler that spends Codex reset credits
 * which are about to expire.
 *
 * Why a background tick and not "only when the dashboard refreshes": the whole
 * point is to rescue a credit that would otherwise expire while nobody is
 * looking (a 3 AM expiry with the dashboard closed). A dashboard-only trigger
 * would silently lose exactly the credits this feature exists to save.
 *
 * Safety rails (all deliberate):
 * - Strictly opt-in: `settings.codexSpendExpiringResetCredits.enabled` (default
 *   false in src/lib/db/settings.ts) plus the per-connection allowlist.
 * - `maxPerDay` ceiling per connection (UTC day) so a bug cannot drain an
 *   account.
 * - Only active connections: the tick filters on `isActive` and the spend path
 *   re-checks it, so a disabled or auto-disabled account is never spent on.
 * - Deterministic `redeem_request_id` per credit, so a retry never double-spends.
 * - Never runs in the request hot path.
 *
 * NOTE: this is the first reset-credit side effect on a background path. The
 * quota refresher deliberately documents "background polls never trigger
 * reset-credit activity" (src/lib/usage/providerLimits.ts, refresh path); this
 * scheduler is intentionally exempt from that rule *because* it is opt-in and
 * capped. Keep both invariants in mind before widening it.
 *
 * Every external effect goes through an injectable `deps` object and the tick
 * takes an injectable clock, so tests are fully deterministic.
 */

import { logger } from "@omniroute/open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getProviderConnections } from "@/lib/db/providers";
import { getSettings } from "@/lib/db/settings";
import { spendExpiringResetCredits } from "@/lib/usage/codexResetCredits";

const log = logger("CodexResetCreditAutospend");

export const CODEX_AUTOSPEND_TICK_INTERVAL_MS = 60 * 60 * 1000;

type JsonRecord = Record<string, unknown>;

export interface CodexAutospendConnection {
  id: string;
  provider: string;
  authType?: string;
}

export interface CodexAutospendDeps {
  getSettings: () => Promise<JsonRecord>;
  getProviderConnections: (filter: JsonRecord) => Promise<CodexAutospendConnection[]>;
  spend: (
    connectionId: string,
    options: { now: () => number }
  ) => Promise<{ spent: unknown[]; skipped?: string; error?: string }>;
}

export interface CodexAutospendState {
  running: boolean;
}

export function createCodexAutospendState(): CodexAutospendState {
  return { running: false };
}

export function createDefaultCodexAutospendDeps(): CodexAutospendDeps {
  return {
    getSettings: () => getSettings() as unknown as Promise<JsonRecord>,
    getProviderConnections: (filter) =>
      getProviderConnections(filter) as unknown as Promise<CodexAutospendConnection[]>,
    spend: (connectionId, options) => spendExpiringResetCredits(connectionId, options),
  };
}

function describeError(error: unknown): string {
  return sanitizeErrorMessage((error as Error)?.message ?? String(error));
}

/** Spend one connection's expiring credits; a failure is logged and never aborts the sweep. */
async function spendForConnection(
  deps: CodexAutospendDeps,
  connectionId: string,
  now: () => number
): Promise<void> {
  try {
    const result = await deps.spend(connectionId, { now });
    if (result.spent.length > 0) {
      log.info("auto-spent expiring reset credits", {
        connectionId,
        count: result.spent.length,
      });
    } else if (result.error) {
      log.warn("auto-spend error", { connectionId, error: sanitizeErrorMessage(result.error) });
    }
  } catch (error) {
    // One connection must never abort the sweep for the others.
    log.warn("auto-spend failed", { connectionId, error: describeError(error) });
  }
}

/**
 * Run one sweep. Safe to call concurrently: a re-entrant call while already
 * running is a no-op, so a slow upstream cannot stack ticks.
 */
export async function runCodexAutospendTick(
  deps: CodexAutospendDeps = createDefaultCodexAutospendDeps(),
  state: CodexAutospendState = createCodexAutospendState(),
  now: () => number = Date.now
): Promise<void> {
  if (state.running) return;
  state.running = true;
  try {
    const settings = await deps.getSettings();
    const config = (settings.codexSpendExpiringResetCredits ?? {}) as JsonRecord;
    if (config.enabled !== true) return;

    const connections = await deps.getProviderConnections({
      provider: "codex",
      authType: "oauth",
      isActive: true,
    });

    for (const connection of connections) {
      await spendForConnection(deps, connection.id, now);
    }
  } catch (error) {
    log.warn("tick error", { error: describeError(error) });
  } finally {
    state.running = false;
  }
}

let schedulerInterval: ReturnType<typeof setInterval> | null = null;
const schedulerState = createCodexAutospendState();

/** Start the in-process scheduler. Idempotent — a second call is a no-op. */
export function startCodexResetCreditAutospend(): void {
  if (schedulerInterval) return;
  log.info("scheduler started");
  runCodexAutospendTick(createDefaultCodexAutospendDeps(), schedulerState).catch(() => undefined);
  schedulerInterval = setInterval(() => {
    runCodexAutospendTick(createDefaultCodexAutospendDeps(), schedulerState).catch(() => undefined);
  }, CODEX_AUTOSPEND_TICK_INTERVAL_MS);
  schedulerInterval.unref?.();
}
