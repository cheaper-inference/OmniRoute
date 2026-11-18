/**
 * bankedResetAutoApply.ts — the opt-in "auto-apply banked resets" background job.
 *
 * Once a minute, for every active, in-scope Codex / Claude OAuth account whose credit type
 * is on, decideBankedReset() (src/lib/usage/bankedResetPolicy.ts) decides from the quota
 * cache and the audit history whether a banked reset credit should be redeemed, only
 * recorded (dry-run), or left alone. The decision runs before any upstream call, so a skip
 * never lists credits:
 *   - walled accounts come first and are listed only when the policy would act;
 *   - an account that is not walled is probed with a credit expiring 1 ms from now, so an
 *     idle account is never scanned; a busy one is scanned at most every 6 h for a credit
 *     about to expire.
 * At most one redemption (or dry-run row) per tick, the credit expiring soonest first, with
 * the idempotency key `auto-reset:<connectionId>:<yyyy-mm-dd>:<n>`. After the listing the
 * history is re-read and the decision re-made, and the slot is reserved in that same
 * synchronous step (reserveBankedResetSlot, shared with the Claude request-path gate), so
 * a claim made while the listing was in flight is respected. A failed listing or
 * redemption backs the account off for 1 h. Outcomes go to the audit log (and the webhook
 * on success) through bankedResetAudit.ts; skip decisions are only logged at debug level.
 *
 * Every external effect is behind an injectable `deps` object and the tick takes an
 * injectable `now()` clock, so tests run without timers, DB or network (same shape as
 * quotaAutoPing.ts).
 */

import { logger } from "@omniroute/open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { throttleQuotaFetch } from "@omniroute/open-sse/services/quotaFetchThrottle.ts";
import { getQuotaWindowStatus } from "@/domain/quotaCache";
import { getProviderConnections } from "@/lib/db/providers";
import { getSettings } from "@/lib/db/settings";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import {
  BANKED_RESET_HISTORY_WINDOW_MS,
  classifyBankedResetFailure,
  countBankedResetsToday,
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
  type BankedResetDecision,
  type BankedResetHistory,
  type BankedResetPoolMember,
} from "@/lib/usage/bankedResetPolicy";
import {
  buildBankedResetPool,
  readBankedResetWindows,
  type BankedResetAccountWindows,
  type BankedResetQuotaReader,
} from "@/lib/usage/bankedResetQuota";
import type {
  BankedResetAutoApplySettings,
  BankedResetCreditType,
} from "@/shared/constants/bankedResetAutoApply";

const log = logger("BankedResetAutoApply");

type JsonRecord = Record<string, unknown>;

const HOUR_MS = 60 * 60_000;
export const BANKED_RESET_TICK_INTERVAL_MS = 60_000;
/** An account whose listing or redemption failed is left alone this long. */
const BANKED_RESET_BACKOFF_MS = HOUR_MS;
/** A walled account whose listing had nothing redeemable is not re-listed for this long. */
const BANKED_RESET_EMPTY_LISTING_TTL_MS = HOUR_MS;
/** A busy, non-walled account is scanned for expiring credits at most this often. */
const BANKED_RESET_EXPIRY_SCAN_TTL_MS = 6 * HOUR_MS;

export type BankedResetJobProvider = "codex" | "claude";

const BANKED_RESET_JOB_PROVIDERS: ReadonlyArray<{
  provider: BankedResetJobProvider;
  creditType: BankedResetCreditType;
}> = [
  { provider: "codex", creditType: "codexCredits" },
  { provider: "claude", creditType: "claudeCredits" },
];

/** The public credit fields the job reads (Codex and Claude listings share them). */
export interface BankedResetCredit {
  selectionToken: string;
  resetType?: string;
  expiresAt?: string | null;
  usableNow?: boolean;
  resetsLeft?: number;
}

export interface BankedResetCreditList {
  availableCount: number;
  credits: BankedResetCredit[];
}

export interface BankedResetAutoApplyConnection {
  id: string;
  provider?: string;
  authType?: string;
  isActive?: boolean;
}

export interface BankedResetAutoApplyDeps {
  getSettings: () => Promise<JsonRecord>;
  getProviderConnections: (filter: JsonRecord) => Promise<BankedResetAutoApplyConnection[]>;
  getQuotaWindowStatus: BankedResetQuotaReader;
  isConnectionUnavailableToAuxiliaryActivity: (connectionId: string) => Promise<boolean>;
  /** Paces the credit listing like every other upstream quota read. */
  throttleQuotaFetch: () => Promise<void>;
  listCredits: (
    provider: BankedResetJobProvider,
    connectionId: string
  ) => Promise<BankedResetCreditList>;
  redeemCredit: (
    provider: BankedResetJobProvider,
    connectionId: string,
    idempotencyKey: string,
    creditId: string
  ) => Promise<unknown>;
  readAuditRows: (sinceIso: string) => BankedResetAuditRow[];
  sinks: BankedResetSinks;
}

export interface BankedResetAutoApplyState {
  running: boolean;
  /** `<provider>:<connectionId>` → epoch ms until which the account is left alone. */
  backoffUntil: Record<string, number>;
  /** `<provider>:<connectionId>` → the last listing: when, and the credit it would redeem. */
  listings: Record<string, { at: number; credit: BankedResetCredit | null }>;
}

export function createBankedResetAutoApplyState(): BankedResetAutoApplyState {
  return { running: false, backoffUntil: {}, listings: {} };
}

// Loaded lazily: both pull in the provider-limits graph, which stays off the startup import
// graph (#12074).
async function listResetCredits(
  provider: BankedResetJobProvider,
  connectionId: string
): Promise<BankedResetCreditList> {
  if (provider === "codex") {
    const { listCodexResetCredits } = await import("@/lib/usage/codexResetCredits");
    return listCodexResetCredits(connectionId);
  }
  const { listClaudeResetCredits } = await import("@/lib/usage/claudeResetCredits");
  return listClaudeResetCredits(connectionId);
}

async function redeemResetCredit(
  provider: BankedResetJobProvider,
  connectionId: string,
  idempotencyKey: string,
  creditId: string
): Promise<unknown> {
  if (provider === "codex") {
    const { consumeCodexResetCredit } = await import("@/lib/usage/codexResetCredits");
    return consumeCodexResetCredit(connectionId, idempotencyKey, creditId);
  }
  const { consumeClaudeResetCredit } = await import("@/lib/usage/claudeResetCredits");
  return consumeClaudeResetCredit(connectionId, idempotencyKey, creditId);
}

export function createDefaultBankedResetAutoApplyDeps(): BankedResetAutoApplyDeps {
  return {
    getSettings,
    // DB rows are untyped records; only id / provider / authType / isActive are read.
    getProviderConnections:
      getProviderConnections as unknown as BankedResetAutoApplyDeps["getProviderConnections"],
    getQuotaWindowStatus: (id, window) => getQuotaWindowStatus(id, window),
    isConnectionUnavailableToAuxiliaryActivity,
    throttleQuotaFetch,
    listCredits: listResetCredits,
    redeemCredit: redeemResetCredit,
    readAuditRows: readBankedResetAuditRows,
    sinks: createDefaultBankedResetSinks(),
  };
}

interface BankedResetCandidate {
  provider: BankedResetJobProvider;
  creditType: BankedResetCreditType;
  connectionId: string;
  key: string;
  windows: BankedResetAccountWindows;
  pool: BankedResetPoolMember[];
}

interface TickContext {
  deps: BankedResetAutoApplyDeps;
  state: BankedResetAutoApplyState;
  settings: BankedResetAutoApplySettings;
  nowMs: number;
  rows: BankedResetAuditRow[];
}

function errorFields(err: unknown): JsonRecord {
  return {
    code: toBankedResetReason((err as { code?: unknown } | null)?.code),
    error: sanitizeErrorMessage((err as Error)?.message ?? String(err)),
  };
}

/** Active, in-scope OAuth accounts whose credit type is on — walled ones first. */
async function collectCandidates(
  deps: BankedResetAutoApplyDeps,
  settings: BankedResetAutoApplySettings
): Promise<BankedResetCandidate[]> {
  const walled: BankedResetCandidate[] = [];
  const rest: BankedResetCandidate[] = [];
  for (const { provider, creditType } of BANKED_RESET_JOB_PROVIDERS) {
    if (!settings.creditTypes[creditType]) continue;
    const connections = await deps.getProviderConnections({ provider, isActive: true });
    const ids = connections
      .filter((c) => c.authType === "oauth" && c.isActive !== false)
      .map((c) => c.id)
      .filter((id) => isBankedResetAccountInScope(settings, id));
    for (const connectionId of ids) {
      const windows = readBankedResetWindows(deps.getQuotaWindowStatus, connectionId);
      // Only the last-resort rule reads the pool.
      const pool =
        settings.mode === "last-resort"
          ? buildBankedResetPool(
              deps.getQuotaWindowStatus,
              ids.filter((id) => id !== connectionId)
            )
          : [];
      const candidate = {
        provider,
        creditType,
        connectionId,
        key: `${provider}:${connectionId}`,
        windows,
        pool,
      };
      (windows.walled ? walled : rest).push(candidate);
    }
  }
  return [...walled, ...rest];
}

function decide(
  ctx: TickContext,
  candidate: BankedResetCandidate,
  history: BankedResetHistory,
  creditExpiresAt?: string | null
): BankedResetDecision {
  return decideBankedReset({
    settings: ctx.settings,
    now: ctx.nowMs,
    account: {
      id: candidate.connectionId,
      provider: candidate.provider,
      creditType: candidate.creditType,
      walled: candidate.windows.walled,
      session: candidate.windows.session,
      weekly: candidate.windows.weekly,
      creditExpiresAt,
    },
    pool: candidate.pool,
    history,
  });
}

function expiryMs(credit: BankedResetCredit): number {
  const ms = credit.expiresAt ? Date.parse(credit.expiresAt) : Number.NaN;
  return Number.isFinite(ms) ? ms : Number.POSITIVE_INFINITY;
}

/**
 * Codex: any listed credit (the listing already drops consumed / expired ones). Claude: only
 * banked GRANT credits usable now with resets left — the weekly session reset is not a
 * banked credit (it is gated in the request path instead).
 */
function isRedeemable(provider: BankedResetJobProvider, credit: BankedResetCredit, nowMs: number) {
  if (!credit || typeof credit.selectionToken !== "string" || !credit.selectionToken) return false;
  if (expiryMs(credit) <= nowMs) return false;
  if (provider === "codex") return true;
  return credit.resetType === "GRANT" && credit.usableNow !== false && (credit.resetsLeft ?? 0) > 0;
}

/** The redeemable credit expiring soonest; credits without an expiry sort last. */
function pickCredit(
  provider: BankedResetJobProvider,
  list: BankedResetCreditList | null | undefined,
  nowMs: number
): BankedResetCredit | null {
  if (!list || !Array.isArray(list.credits)) return null;
  if (typeof list.availableCount === "number" && list.availableCount <= 0) return null;
  const redeemable = list.credits.filter((credit) => isRedeemable(provider, credit, nowMs));
  redeemable.sort((a, b) => expiryMs(a) - expiryMs(b));
  return redeemable[0] ?? null;
}

/** True when the last listing still answers the question, so no new listing is needed. */
function isListingMemoised(
  ctx: TickContext,
  candidate: BankedResetCandidate,
  history: BankedResetHistory
): boolean {
  const memo = ctx.state.listings[candidate.key];
  if (!memo) return false;
  const age = ctx.nowMs - memo.at;
  if (candidate.windows.walled) {
    return memo.credit === null && age < BANKED_RESET_EMPTY_LISTING_TTL_MS;
  }
  if (age >= BANKED_RESET_EXPIRY_SCAN_TTL_MS) return false;
  // Within the scan window: re-list only once the remembered credit would now qualify.
  if (!memo.credit) return true;
  return decide(ctx, candidate, history, memo.credit.expiresAt ?? null).action === "skip";
}

/** List the account's credits; on error back the account off (no audit row). */
async function listCredit(
  ctx: TickContext,
  candidate: BankedResetCandidate
): Promise<BankedResetCredit | null> {
  const { deps, state, nowMs } = ctx;
  try {
    await deps.throttleQuotaFetch();
    const list = await deps.listCredits(candidate.provider, candidate.connectionId);
    const credit = pickCredit(candidate.provider, list, nowMs);
    state.listings[candidate.key] = { at: nowMs, credit };
    return credit;
  } catch (err) {
    state.backoffUntil[candidate.key] = nowMs + BANKED_RESET_BACKOFF_MS;
    log.warn(`${candidate.key}: listing reset credits failed; backing off 1 h`, errorFields(err));
    return null;
  }
}

/**
 * Record a dry-run, or redeem and record its outcome. Exactly one audit row either way.
 * Runs synchronously up to the redemption call, so the reservation is taken in the same
 * step as the caller's re-decision; it is released once the outcome row is written.
 */
async function applyDecision(
  ctx: TickContext,
  candidate: BankedResetCandidate,
  decision: BankedResetDecision & { trigger: NonNullable<BankedResetDecision["trigger"]> },
  credit: BankedResetCredit,
  rows: BankedResetAuditRow[]
): Promise<void> {
  const { deps, state, settings, nowMs } = ctx;
  const { connectionId, key } = candidate;
  const outcome: Omit<BankedResetOutcome, "status" | "reason"> = {
    connectionId,
    provider: candidate.provider,
    creditType: candidate.creditType,
    mode: settings.mode,
    trigger: decision.trigger,
  };

  if (decision.action === "dry-run") {
    recordBankedResetOutcome(
      { ...outcome, status: "dry-run", reason: decision.reason },
      deps.sinks
    );
    log.info(`${key}: would redeem a banked reset (dry-run)`, { trigger: decision.trigger });
    return;
  }

  const day = new Date(nowMs).toISOString().slice(0, 10);
  const n = countBankedResetsToday(rows, connectionId, nowMs) + 1;
  const idempotencyKey = `auto-reset:${connectionId}:${day}:${n}`;
  const reservation = reserveBankedResetSlot({
    connectionId,
    creditType: candidate.creditType,
    now: nowMs,
  });
  try {
    try {
      await deps.redeemCredit(
        candidate.provider,
        connectionId,
        idempotencyKey,
        credit.selectionToken
      );
    } catch (err) {
      state.backoffUntil[key] = nowMs + BANKED_RESET_BACKOFF_MS;
      const reason = toBankedResetReason((err as { code?: unknown } | null)?.code);
      // A timeout / network failure may still have spent the credit: "unknown" counts
      // toward the caps; a definite refusal is "failed" and does not.
      const status = classifyBankedResetFailure(err);
      recordBankedResetOutcome({ ...outcome, status, reason }, deps.sinks);
      log.warn(
        `${key}: banked reset redemption ${status === "unknown" ? "outcome unknown" : "failed"}; backing off 1 h`,
        errorFields(err)
      );
      return;
    }
    delete state.listings[key];
    delete state.backoffUntil[key];
    recordBankedResetOutcome(
      { ...outcome, status: "success", reason: decision.reason },
      deps.sinks
    );
    log.info(`${key}: banked reset redeemed`, { trigger: decision.trigger });
  } finally {
    releaseBankedResetSlot(reservation);
  }
}

/** Returns true once a redemption or dry-run row happened (the tick then stops). */
async function processCandidate(
  ctx: TickContext,
  candidate: BankedResetCandidate
): Promise<boolean> {
  const { deps, state, settings, nowMs } = ctx;
  if ((state.backoffUntil[candidate.key] ?? 0) > nowMs) return false;

  const history = summarizeBankedResetHistory(ctx.rows, {
    connectionId: candidate.connectionId,
    mode: settings.mode,
    now: nowMs,
  });
  const walled = candidate.windows.walled !== null;
  // Decide before any I/O. A non-walled account is probed with a credit expiring 1 ms from
  // now: if even that would not qualify, its credits are never listed.
  const probe = decide(
    ctx,
    candidate,
    history,
    walled ? undefined : new Date(nowMs + 1).toISOString()
  );
  if (probe.action === "skip") {
    log.debug(`${candidate.key}: skipped`, { reason: probe.reason });
    return false;
  }
  if (isListingMemoised(ctx, candidate, history)) return false;
  if (await deps.isConnectionUnavailableToAuxiliaryActivity(candidate.connectionId)) return false;

  const credit = await listCredit(ctx, candidate);
  if (!credit) return false;

  // The listing awaited the network, so the request-path gate may have taken a slot since
  // the tick started. Re-read the history and decide again; no await from here until
  // applyDecision has reserved the slot.
  const rows = readHistoryRows(deps, nowMs);
  const fresh = summarizeBankedResetHistory(rows, {
    connectionId: candidate.connectionId,
    mode: settings.mode,
    now: nowMs,
  });
  const decision = decide(ctx, candidate, fresh, walled ? undefined : (credit.expiresAt ?? null));
  if (decision.action === "skip" || !decision.trigger) {
    log.debug(`${candidate.key}: skipped`, { reason: decision.reason });
    return false;
  }
  await applyDecision(ctx, candidate, { ...decision, trigger: decision.trigger }, credit, rows);
  return true;
}

function readHistoryRows(deps: BankedResetAutoApplyDeps, nowMs: number): BankedResetAuditRow[] {
  return deps.readAuditRows(new Date(nowMs - BANKED_RESET_HISTORY_WINDOW_MS).toISOString());
}

/**
 * Run one tick: at most one redemption (or dry-run row) across all accounts. Safe to call
 * concurrently — a call while another is `running` is a no-op. Disabled = no calls beyond
 * reading the settings.
 */
export async function runBankedResetAutoApplyTick(
  deps: BankedResetAutoApplyDeps = createDefaultBankedResetAutoApplyDeps(),
  state: BankedResetAutoApplyState = createBankedResetAutoApplyState(),
  now: () => number = Date.now
): Promise<void> {
  if (state.running) return;
  state.running = true;
  const nowMs = now();
  try {
    const raw = (await deps.getSettings())?.bankedResetAutoApply;
    const settings = mergeBankedResetAutoApplySettings(raw);
    if (!settings.enabled) return;

    const candidates = await collectCandidates(deps, settings);
    if (candidates.length === 0) return;
    const rows = readHistoryRows(deps, nowMs);
    const ctx: TickContext = { deps, state, settings, nowMs, rows };

    for (const candidate of candidates) {
      try {
        if (await processCandidate(ctx, candidate)) return;
      } catch (err) {
        // Unexpected: back the account off so it cannot wedge every tick, and end this one.
        state.backoffUntil[candidate.key] = nowMs + BANKED_RESET_BACKOFF_MS;
        log.warn(`${candidate.key}: tick error; backing off 1 h`, errorFields(err));
        return;
      }
    }
  } catch (err) {
    log.warn("tick error", errorFields(err));
  } finally {
    state.running = false;
  }
}

let schedulerInterval: ReturnType<typeof setInterval> | null = null;
const schedulerState = createBankedResetAutoApplyState();

/** Start the in-process scheduler. Idempotent — a second call is a no-op. */
export function startBankedResetAutoApply(): void {
  if (schedulerInterval) return;
  log.info("scheduler started");
  runBankedResetAutoApplyTick(createDefaultBankedResetAutoApplyDeps(), schedulerState).catch(
    () => undefined
  );
  schedulerInterval = setInterval(() => {
    runBankedResetAutoApplyTick(createDefaultBankedResetAutoApplyDeps(), schedulerState).catch(
      () => undefined
    );
  }, BANKED_RESET_TICK_INTERVAL_MS);
  schedulerInterval.unref?.();
}

/** Stop the in-process scheduler. Idempotent — a second call is a no-op. */
export function stopBankedResetAutoApply(): void {
  if (!schedulerInterval) return;
  clearInterval(schedulerInterval);
  schedulerInterval = null;
  log.info("scheduler stopped");
}
