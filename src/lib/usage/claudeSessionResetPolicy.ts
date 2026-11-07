/**
 * claudeSessionResetPolicy.ts — the "auto-apply banked resets" gate on the Claude weekly
 * session reset, which is claimed in the request path at the 5-hour wall.
 *
 * Registered at startup through open-sse's `setClaudeLimitResetPolicy()` hook (open-sse
 * never imports `src/`). Feature off, or `creditTypes.claudeSessionReset` off → `null`, so
 * the per-account `autoLimitReset` toggle decides exactly as before. Otherwise the account
 * scope is the opt-in and decideBankedReset() decides with the walled window `session`:
 * `redeem` → claim (its outcome is audited once, when the claim settles), `dry-run` → no
 * claim plus a dry-run audit row, `skip` → no claim. Any error → no claim. A `redeem`
 * reserves a slot in the same synchronous step as the decision (see
 * reserveBankedResetSlot), so concurrent walls and the background job cannot all pass the
 * caps before the first audit row exists.
 */

import { logger } from "@omniroute/open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  setClaudeLimitResetPolicy,
  type ClaudeLimitResetPolicy,
  type ClaudeLimitResetPolicyInput,
  type ClaudeLimitResetPolicyVerdict,
} from "@omniroute/open-sse/services/claudeLimitReset.ts";
import { getQuotaWindowStatus } from "@/domain/quotaCache";
import { getProviderConnections } from "@/lib/db/providers";
import { getCachedSettings } from "@/lib/db/readCache";
import {
  BANKED_RESET_HISTORY_WINDOW_MS,
  createDefaultBankedResetSinks,
  readBankedResetAuditRows,
  recordBankedResetOutcome,
  releaseBankedResetSlot,
  reserveBankedResetSlot,
  summarizeBankedResetHistory,
  toBankedResetReason,
  type BankedResetAuditRow,
  type BankedResetOutcome,
  type BankedResetSinks,
} from "@/lib/usage/bankedResetAudit";
import {
  decideBankedReset,
  isBankedResetAccountInScope,
  mergeBankedResetAutoApplySettings,
  type BankedResetPoolMember,
} from "@/lib/usage/bankedResetPolicy";
import {
  buildBankedResetPool,
  readBankedResetWindows,
  type BankedResetQuotaReader,
} from "@/lib/usage/bankedResetQuota";
import type { BankedResetAutoApplySettings } from "@/shared/constants/bankedResetAutoApply";

const log = logger("BankedResetClaudeGate");

type JsonRecord = Record<string, unknown>;

export interface ClaudeSessionResetConnection {
  id: string;
  provider?: string;
  authType?: string;
}

export interface ClaudeSessionResetPolicyDeps {
  getSettings: () => Promise<JsonRecord>;
  getProviderConnections: (filter: JsonRecord) => Promise<ClaudeSessionResetConnection[]>;
  getQuotaWindowStatus: BankedResetQuotaReader;
  readAuditRows: (sinceIso: string) => BankedResetAuditRow[];
  sinks: BankedResetSinks;
}

export function createDefaultClaudeSessionResetPolicyDeps(): ClaudeSessionResetPolicyDeps {
  return {
    getSettings: getCachedSettings,
    // DB rows are untyped records; only id / provider / authType are read.
    getProviderConnections:
      getProviderConnections as unknown as ClaudeSessionResetPolicyDeps["getProviderConnections"],
    getQuotaWindowStatus: (id, window) => getQuotaWindowStatus(id, window),
    readAuditRows: readBankedResetAuditRows,
    sinks: createDefaultBankedResetSinks(),
  };
}

/** Other active, in-scope Claude OAuth accounts — only needed by the last-resort rule. */
async function loadPool(
  deps: ClaudeSessionResetPolicyDeps,
  settings: BankedResetAutoApplySettings,
  connectionId: string
): Promise<BankedResetPoolMember[]> {
  if (settings.mode !== "last-resort") return [];
  const connections = await deps.getProviderConnections({ provider: "claude", isActive: true });
  const ids = connections
    .filter((c) => c.id !== connectionId && c.authType === "oauth")
    .filter((c) => isBankedResetAccountInScope(settings, c.id))
    .map((c) => c.id);
  return buildBankedResetPool(deps.getQuotaWindowStatus, ids);
}

async function decideClaudeSessionReset(
  deps: ClaudeSessionResetPolicyDeps,
  input: ClaudeLimitResetPolicyInput
): Promise<ClaudeLimitResetPolicyVerdict | null> {
  const raw = (await deps.getSettings())?.bankedResetAutoApply;
  const settings = mergeBankedResetAutoApplySettings(raw);
  if (!settings.enabled || !settings.creditTypes.claudeSessionReset) return null;
  const connectionId = input.connectionId;
  if (!connectionId) return { allow: false };
  const pool = await loadPool(deps, settings, connectionId);

  // No await from here to the reservation: reading the history (audit rows + live
  // reservations), deciding and reserving form one synchronous step, so a concurrent wall
  // on another account, or the background job, sees this claim before it settles.
  const windows = readBankedResetWindows(deps.getQuotaWindowStatus, connectionId);
  const rows = deps.readAuditRows(
    new Date(input.now - BANKED_RESET_HISTORY_WINDOW_MS).toISOString()
  );
  const decision = decideBankedReset({
    settings,
    now: input.now,
    account: {
      id: connectionId,
      provider: "claude",
      creditType: "claudeSessionReset",
      walled: "session",
      // The wall's own header is fresher than the cached window.
      session: {
        usedPercentage: windows.session?.usedPercentage ?? 100,
        resetAt: input.sessionResetAt ?? windows.session?.resetAt ?? null,
      },
      weekly: windows.weekly,
    },
    pool,
    history: summarizeBankedResetHistory(rows, {
      connectionId,
      mode: settings.mode,
      now: input.now,
    }),
  });

  if (decision.action === "skip" || !decision.trigger) {
    log.debug("claude session reset skipped", { connectionId, reason: decision.reason });
    return { allow: false };
  }
  const outcome: Omit<BankedResetOutcome, "status" | "reason"> = {
    connectionId,
    provider: "claude",
    creditType: "claudeSessionReset",
    mode: settings.mode,
    trigger: decision.trigger,
  };
  if (decision.action === "dry-run") {
    recordBankedResetOutcome(
      { ...outcome, status: "dry-run", reason: decision.reason },
      deps.sinks
    );
    return { allow: false };
  }
  // Released once the outcome row is written. A claim that never reports (a sibling that
  // joined another request's in-flight claim) leaves it to expire — stricter, never looser.
  const reservation = reserveBankedResetSlot({ connectionId, now: input.now });
  return {
    allow: true,
    onSettled: (attempt) => {
      try {
        recordBankedResetOutcome(
          attempt.reset
            ? { ...outcome, status: "success", reason: decision.reason }
            : { ...outcome, status: "failed", reason: toBankedResetReason(attempt.outcome) },
          deps.sinks
        );
      } finally {
        releaseBankedResetSlot(reservation);
      }
    },
  };
}

/** The policy registered with open-sse. Never throws: any error means "do not claim". */
export function createClaudeSessionResetPolicy(
  deps: ClaudeSessionResetPolicyDeps = createDefaultClaudeSessionResetPolicyDeps()
): ClaudeLimitResetPolicy {
  return async (input) => {
    try {
      return await decideClaudeSessionReset(deps, input);
    } catch (error) {
      log.warn("claude session reset gate failed; not claiming", {
        error: sanitizeErrorMessage((error as Error)?.message ?? String(error)),
      });
      return { allow: false };
    }
  };
}

/** Startup hook: route the request-path session-reset claim through the policy. */
export function registerClaudeSessionResetPolicy(): void {
  setClaudeLimitResetPolicy(createClaudeSessionResetPolicy());
}
