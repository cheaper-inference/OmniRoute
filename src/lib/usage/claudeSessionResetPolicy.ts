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
 * caps before the first audit row exists. The executor releases it (`release`) when the
 * attempt sends no claim. A sibling wall on an account whose claim is in flight, or was
 * just made, is allowed without a slot or a report: open-sse's in-flight / recent-reset /
 * not-before memos answer it without a second claim.
 */

import { logger } from "@omniroute/open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import {
  CLAUDE_LIMIT_RESET_RECENT_WINDOW_MS,
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
  hasLiveBankedResetSlot,
  isBankedResetSpentStatus,
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
  type BankedResetAccountInput,
  type BankedResetPoolMember,
} from "@/lib/usage/bankedResetPolicy";
import {
  buildBankedResetPool,
  readBankedResetWindows,
  type BankedResetAccountWindows,
  type BankedResetQuotaReader,
} from "@/lib/usage/bankedResetQuota";
import type { BankedResetAutoApplySettings } from "@/shared/constants/bankedResetAutoApply";

const log = logger("BankedResetClaudeGate");

type JsonRecord = Record<string, unknown>;

const CREDIT_TYPE = "claudeSessionReset";

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

/**
 * True when this account's session-reset claim is in flight (a live gate reservation) or
 * was just spent (a success / unknown gate row within the recent-reset window). Such a
 * wall is answered by the request path's memos, so it needs no slot and sends no claim.
 * Only the gate's own claims count: the background job's redemptions set no memo.
 */
function isClaimShared(rows: BankedResetAuditRow[], connectionId: string, now: number): boolean {
  if (hasLiveBankedResetSlot({ connectionId, creditType: CREDIT_TYPE, now })) return true;
  return rows.some((row) => {
    if (row.target !== connectionId || row.creditType !== CREDIT_TYPE) return false;
    if (!isBankedResetSpentStatus(row.status)) return false;
    const age = now - Date.parse(row.timestamp);
    return age >= 0 && age < CLAUDE_LIMIT_RESET_RECENT_WINDOW_MS;
  });
}

/** The walled account as the policy sees it at the 5-hour wall. */
function walledSessionAccount(
  connectionId: string,
  windows: BankedResetAccountWindows,
  sessionResetAt: ClaudeLimitResetPolicyInput["sessionResetAt"]
): BankedResetAccountInput {
  return {
    id: connectionId,
    provider: "claude",
    creditType: CREDIT_TYPE,
    walled: "session",
    // The wall's own header is fresher than the cached window.
    session: {
      usedPercentage: windows.session?.usedPercentage ?? 100,
      resetAt: sessionResetAt ?? windows.session?.resetAt ?? null,
    },
    weekly: windows.weekly,
  };
}

/**
 * The `redeem` verdict: reserves a cap slot and audits the claim once it settles.
 * Released once the outcome row is written, or by the executor (`release`) when the
 * attempt resolved without a claim. Only an attempt that rejects leaves it to expire —
 * stricter, never looser.
 */
function reserveRedeemVerdict(
  deps: ClaudeSessionResetPolicyDeps,
  outcome: Omit<BankedResetOutcome, "status" | "reason">,
  reason: string,
  now: number
): ClaudeLimitResetPolicyVerdict {
  const reservation = reserveBankedResetSlot({
    connectionId: outcome.connectionId,
    creditType: CREDIT_TYPE,
    now,
  });
  return {
    allow: true,
    onSettled: (attempt) => {
      try {
        recordBankedResetOutcome(
          attempt.reset
            ? { ...outcome, status: "success", reason }
            : {
                ...outcome,
                // "error": the claim timed out, the network failed or the status was
                // unexpected — the reset may have been granted, so it counts.
                status: attempt.outcome === "error" ? "unknown" : "failed",
                reason: toBankedResetReason(attempt.outcome),
              },
          deps.sinks
        );
      } finally {
        releaseBankedResetSlot(reservation);
      }
    },
    // Idempotent (tokens are never reused), so a no-op once onSettled has released it.
    release: () => releaseBankedResetSlot(reservation),
  };
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
  if (
    settings.mode !== "dry-run" &&
    isBankedResetAccountInScope(settings, connectionId) &&
    isClaimShared(rows, connectionId, input.now)
  ) {
    log.debug("claude session reset: sharing the account's in-flight or recent claim", {
      connectionId,
    });
    return { allow: true };
  }
  const decision = decideBankedReset({
    settings,
    now: input.now,
    account: walledSessionAccount(connectionId, windows, input.sessionResetAt),
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
    creditType: CREDIT_TYPE,
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
  return reserveRedeemVerdict(deps, outcome, decision.reason, input.now);
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
