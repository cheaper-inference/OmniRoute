import { getProviderConnectionById } from "@/lib/db/providers";
import {
  getCodexAutospendCount,
  getCodexAutospendKeyGenerations,
  setCodexAutospendCount,
  setCodexAutospendKeyGenerations,
  utcDayKey,
} from "@/lib/db/codexResetCreditAutospend";
import { getSettings, resolveProxyForConnection } from "@/lib/db/settings";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import {
  fetchAndPersistProviderLimits,
  refreshAndUpdateCredentials,
} from "@/lib/usage/providerLimits";
import { releaseCodexCooldownAfterResetCredit } from "@/lib/usage/resetCreditCooldownRelease";
import { invalidateCodexQuotaCache } from "@omniroute/open-sse/services/codexQuotaFetcher.ts";
import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";
import { getCodexBackendIdentityHeaders } from "@omniroute/open-sse/config/codexClient.ts";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const CODEX_RESET_CREDIT_CONSUME_URL =
  "https://chatgpt.com/backend-api/wham/rate-limit-reset-credits/consume";
const CODEX_RESET_CREDITS_URL = "https://chatgpt.com/backend-api/wham/rate-limit-reset-credits";

type JsonRecord = Record<string, unknown>;

type CodexConnectionLike = JsonRecord & {
  id: string;
  provider: string;
  authType?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  tokenExpiresAt?: string;
  providerSpecificData?: JsonRecord;
};

export type CodexResetCreditOutcome = "reset" | "alreadyRedeemed";

export interface CodexResetCredit {
  id: string;
  resetType?: string;
  status?: string;
  grantedAt?: string;
  expiresAt?: string | null;
  title?: string;
  description?: string;
}

export type PublicCodexResetCredit = Omit<CodexResetCredit, "id"> & {
  selectionToken: string;
};

export interface CodexResetCreditList {
  credits: PublicCodexResetCredit[];
  availableCount: number;
}

export class CodexResetCreditError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "CodexResetCreditError";
    this.status = status;
    this.code = code;
  }
}

/** Default look-ahead for the opt-in auto-spend sweep (see settings.ts). */
export const CODEX_AUTOSPEND_DEFAULT_HORIZON_HOURS = 24;
export const CODEX_AUTOSPEND_DEFAULT_MAX_PER_DAY = 1;

export interface CodexAutospendConfig {
  enabled: boolean;
  horizonHours: number;
  maxPerDay: number;
  /** True when `connections` was absent (opt-in covers every eligible connection). */
  providerWide: boolean;
  connections: Record<string, boolean>;
}

export interface CodexAutospendSpent {
  creditId: string;
  outcome: CodexResetCreditOutcome;
}

export interface CodexAutospendFailure {
  creditId: string;
  code: string;
}

export type CodexAutospendSkipReason =
  "opt_in_off" | "connection_inactive" | "no_expiring_credit" | "daily_cap_reached";

export interface CodexAutospendResult {
  /** Credits that were actually redeemed (or confirmed as already redeemed). */
  spent: CodexAutospendSpent[];
  /** Credits that upstream refused; the sweep keeps going and never throws for these. */
  failed: CodexAutospendFailure[];
  /** How many available credits the sweep looked at. */
  considered: number;
  skipped?: CodexAutospendSkipReason;
  /** Fatal, non-per-credit error (listing failure, connection gone, …). */
  error?: string;
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function normalizeOutcome(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  return normalized || null;
}

function extractOutcome(payload: unknown): string | null {
  const direct = normalizeOutcome(payload);
  if (direct) return direct;

  const record = toRecord(payload);
  for (const key of ["code", "outcome", "status", "result", "type"]) {
    const normalized = normalizeOutcome(record[key]);
    if (normalized) return normalized;
  }

  return null;
}

function parseConsumeOutcome(payload: unknown): CodexResetCreditOutcome {
  const outcome = extractOutcome(payload);
  if (outcome === "reset") return "reset";
  if (outcome === "alreadyredeemed") return "alreadyRedeemed";

  if (outcome === "nocredit" || outcome === "nocredits") {
    throw new CodexResetCreditError(409, "no_credit", "No Codex reset credits are available.");
  }

  if (outcome === "nothingtoreset") {
    throw new CodexResetCreditError(
      409,
      "nothing_to_reset",
      "No exhausted Codex usage limit can be reset right now."
    );
  }

  throw new CodexResetCreditError(
    502,
    "unknown_reset_credit_response",
    "Codex returned an unknown reset-credit response."
  );
}

function throwKnownConsumeError(payload: unknown): void {
  const outcome = extractOutcome(payload);

  if (outcome === "nocredit" || outcome === "nocredits") {
    throw new CodexResetCreditError(409, "no_credit", "No Codex reset credits are available.");
  }

  if (outcome === "nothingtoreset") {
    throw new CodexResetCreditError(
      409,
      "nothing_to_reset",
      "No exhausted Codex usage limit can be reset right now."
    );
  }
}

function extractStringField(record: JsonRecord, keys: string[]): string | null {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return null;
}

function isUnavailableResetCredit(record: JsonRecord): boolean {
  const status = normalizeOutcome(
    record.status ?? record.state ?? record.outcome ?? record.result ?? record.code
  );
  if (
    status &&
    ["consumed", "redeeming", "redeemed", "used", "expired", "unavailable"].includes(status)
  ) {
    return true;
  }
  return record.consumed === true || record.redeemed === true || record.available === false;
}

function parseOptionalTimestamp(record: JsonRecord, keys: string[]): string | null | undefined {
  for (const key of keys) {
    const value = record[key];
    if (value === null) return null;
    if (typeof value === "string" && value.trim().length > 0) return value.trim();
  }
  return undefined;
}

function parseResetCredit(value: unknown): CodexResetCredit | null {
  const record = toRecord(value);
  if (!record || Object.keys(record).length === 0 || isUnavailableResetCredit(record)) return null;
  const id = extractStringField(record, ["credit_id", "creditId", "id"]);
  if (!id) return null;

  const expiresAt = parseOptionalTimestamp(record, [
    "expires_at",
    "expiresAt",
    "expiration_at",
    "expirationAt",
  ]);
  if (expiresAt) {
    const expiresAtMs = Date.parse(expiresAt);
    if (Number.isFinite(expiresAtMs) && expiresAtMs <= Date.now()) return null;
  }

  const resetType = extractStringField(record, ["reset_type", "resetType"]);
  const status = extractStringField(record, ["status", "state"]);
  const grantedAt = parseOptionalTimestamp(record, ["granted_at", "grantedAt"]);
  const title = extractStringField(record, ["title"]);
  const description = extractStringField(record, ["description"]);

  return {
    id,
    ...(resetType ? { resetType } : {}),
    ...(status ? { status } : {}),
    ...(grantedAt !== undefined ? { grantedAt } : {}),
    ...(expiresAt !== undefined ? { expiresAt } : {}),
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
  };
}

function getResetCreditCandidates(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  const record = toRecord(payload);
  for (const key of [
    "credits",
    "reset_credits",
    "resetCredits",
    "rate_limit_reset_credits",
    "rateLimitResetCredits",
    "items",
    "data",
  ]) {
    const value = record[key];
    if (Array.isArray(value)) return value;
  }

  return [];
}

function getExpirySortValue(credit: CodexResetCredit): number {
  if (!credit.expiresAt) return Number.POSITIVE_INFINITY;
  const expiresAtMs = Date.parse(credit.expiresAt);
  return Number.isFinite(expiresAtMs) ? expiresAtMs : Number.POSITIVE_INFINITY;
}

function parseAvailableResetCredits(payload: unknown): {
  credits: CodexResetCredit[];
  availableCount: number;
} {
  const credits = getResetCreditCandidates(payload)
    .map(parseResetCredit)
    .filter((credit): credit is CodexResetCredit => credit !== null)
    .map((credit, index) => ({ credit, index }))
    .sort(
      (a, b) => getExpirySortValue(a.credit) - getExpirySortValue(b.credit) || a.index - b.index
    )
    .map(({ credit }) => credit);

  const payloadRecord = toRecord(payload);
  const reportedCount = Number(payloadRecord.available_count ?? payloadRecord.availableCount);

  return {
    credits,
    availableCount: Number.isFinite(reportedCount)
      ? Math.max(0, Math.trunc(reportedCount))
      : credits.length,
  };
}

function toPublicResetCredit(credit: CodexResetCredit): PublicCodexResetCredit {
  const { id, ...metadata } = credit;
  return { ...metadata, selectionToken: id };
}

function selectResetCredit(payload: unknown, requestedCreditId?: string): CodexResetCredit {
  const { credits } = parseAvailableResetCredits(payload);
  if (requestedCreditId) {
    const selected = credits.find((credit) => credit.id === requestedCreditId);
    if (selected) return selected;
    throw new CodexResetCreditError(
      409,
      "selected_credit_unavailable",
      "The selected Codex reset credit is no longer available."
    );
  }

  if (credits[0]) return credits[0];

  throw new CodexResetCreditError(409, "no_credit", "No Codex reset credits are available.");
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getWorkspaceId(connection: CodexConnectionLike): string | null {
  const providerSpecificData = toRecord(connection.providerSpecificData);
  const workspaceId = providerSpecificData.workspaceId;
  return typeof workspaceId === "string" && workspaceId.trim().length > 0
    ? workspaceId.trim()
    : null;
}

function buildCodexResetCreditHeaders(connection: CodexConnectionLike): Record<string, string> {
  if (!connection.accessToken) {
    throw new CodexResetCreditError(
      401,
      "codex_access_token_missing",
      "Codex OAuth access token is missing."
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${connection.accessToken}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    // Canonical Codex backend identity (UA + originator + version), same
    // chain as inference — see getCodexUsage.
    ...getCodexBackendIdentityHeaders(),
  };

  const workspaceId = getWorkspaceId(connection);
  if (workspaceId) headers["chatgpt-account-id"] = workspaceId;

  return headers;
}

async function loadCodexConnection(connectionId: string): Promise<CodexConnectionLike> {
  if (await isConnectionUnavailableToAuxiliaryActivity(connectionId)) {
    throw new CodexResetCreditError(
      409,
      "exclusive_lease_active",
      "Reset-credit operations are deferred while an exclusive lease is active."
    );
  }
  const connection = (await getProviderConnectionById(
    connectionId
  )) as unknown as CodexConnectionLike | null;

  if (!connection) {
    throw new CodexResetCreditError(404, "connection_not_found", "Connection not found.");
  }

  if (connection.provider !== "codex") {
    throw new CodexResetCreditError(
      400,
      "codex_provider_required",
      "Reset credits can only be redeemed for OpenAI Codex accounts."
    );
  }

  if (connection.authType !== "oauth") {
    throw new CodexResetCreditError(
      400,
      "codex_oauth_required",
      "Codex reset credits require an OAuth connection."
    );
  }

  return connection;
}

async function refreshCodexConnectionIfNeeded(
  connection: CodexConnectionLike,
  force = false
): Promise<CodexConnectionLike> {
  const refreshed = await refreshAndUpdateCredentials(connection, {
    allowRotatingRefresh: true,
    force,
  });
  return refreshed.connection as CodexConnectionLike;
}

async function postConsumeResetCredit(
  connection: CodexConnectionLike,
  idempotencyKey: string,
  creditId: string
): Promise<Response> {
  const headers = buildCodexResetCreditHeaders(connection);
  const proxyInfo = await resolveProxyForConnection(connection.id);
  return runWithProxyContext(proxyInfo?.proxy ?? null, () =>
    fetch(CODEX_RESET_CREDIT_CONSUME_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({ redeem_request_id: idempotencyKey, credit_id: creditId }),
      signal: AbortSignal.timeout(15_000),
    })
  );
}

async function fetchResetCredits(connection: CodexConnectionLike): Promise<Response> {
  const headers = buildCodexResetCreditHeaders(connection);
  const proxyInfo = await resolveProxyForConnection(connection.id);
  return runWithProxyContext(proxyInfo?.proxy ?? null, () =>
    fetch(CODEX_RESET_CREDITS_URL, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(15_000),
    })
  );
}

async function consumeWithAuthRetry(
  connection: CodexConnectionLike,
  idempotencyKey: string,
  requestedCreditId?: string
): Promise<{ connection: CodexConnectionLike; response: Response }> {
  let refreshedConnection = await refreshCodexConnectionIfNeeded(connection);
  let creditsResponse = await fetchResetCredits(refreshedConnection);

  if (creditsResponse.status === 401 || creditsResponse.status === 403) {
    refreshedConnection = await refreshCodexConnectionIfNeeded(refreshedConnection, true);
    creditsResponse = await fetchResetCredits(refreshedConnection);
  }

  const creditsPayload = await readResponsePayload(creditsResponse);
  if (!creditsResponse.ok) {
    throwKnownConsumeError(creditsPayload);
    throw new CodexResetCreditError(
      creditsResponse.status,
      "codex_reset_credit_upstream_error",
      `Codex reset-credit API returned HTTP ${creditsResponse.status}.`
    );
  }

  const credit = selectResetCredit(creditsPayload, requestedCreditId);
  let response = await postConsumeResetCredit(refreshedConnection, idempotencyKey, credit.id);

  if (response.status === 401 || response.status === 403) {
    refreshedConnection = await refreshCodexConnectionIfNeeded(refreshedConnection, true);
    const refreshedCreditsResponse = await fetchResetCredits(refreshedConnection);
    const refreshedCreditsPayload = await readResponsePayload(refreshedCreditsResponse);
    if (!refreshedCreditsResponse.ok) {
      throwKnownConsumeError(refreshedCreditsPayload);
      throw new CodexResetCreditError(
        refreshedCreditsResponse.status,
        "codex_reset_credit_upstream_error",
        `Codex reset-credit API returned HTTP ${refreshedCreditsResponse.status}.`
      );
    }
    const refreshedCredit = selectResetCredit(refreshedCreditsPayload, requestedCreditId);
    response = await postConsumeResetCredit(
      refreshedConnection,
      idempotencyKey,
      refreshedCredit.id
    );
  }

  return { connection: refreshedConnection, response };
}

export async function listCodexResetCredits(connectionId: string): Promise<CodexResetCreditList> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new CodexResetCreditError(400, "connection_id_required", "connectionId is required.");
  }

  try {
    let connection = await loadCodexConnection(connectionId);
    connection = await refreshCodexConnectionIfNeeded(connection);
    let response = await fetchResetCredits(connection);

    if (response.status === 401 || response.status === 403) {
      connection = await refreshCodexConnectionIfNeeded(connection, true);
      response = await fetchResetCredits(connection);
    }

    const payload = await readResponsePayload(response);
    if (!response.ok) {
      throwKnownConsumeError(payload);
      throw new CodexResetCreditError(
        response.status,
        "codex_reset_credit_upstream_error",
        `Codex reset-credit API returned HTTP ${response.status}.`
      );
    }

    const result = parseAvailableResetCredits(payload);
    return {
      availableCount: result.availableCount,
      credits: result.credits.map(toPublicResetCredit),
    };
  } catch (error) {
    if (error instanceof CodexResetCreditError) throw error;
    throw new CodexResetCreditError(
      500,
      "codex_reset_credit_list_failed",
      sanitizeErrorMessage(error) || "Failed to load Codex reset credits."
    );
  }
}

export async function consumeCodexResetCredit(
  connectionId: string,
  idempotencyKey: string,
  creditId?: string
): Promise<{
  outcome: CodexResetCreditOutcome;
  usage: JsonRecord;
}> {
  if (!connectionId || typeof connectionId !== "string") {
    throw new CodexResetCreditError(400, "connection_id_required", "connectionId is required.");
  }
  if (!idempotencyKey || typeof idempotencyKey !== "string" || !idempotencyKey.trim()) {
    throw new CodexResetCreditError(400, "idempotency_key_required", "idempotencyKey is required.");
  }

  try {
    const outcome = await redeemCodexResetCredit(connectionId, idempotencyKey.trim(), creditId);

    invalidateCodexQuotaCache(connectionId);

    const refreshed = await fetchAndPersistProviderLimits(connectionId, "manual", {
      allowRotatingRefresh: true,
    });
    // The credit is already spent upstream: a failed local release must not turn it into a 500.
    await releaseCodexCooldownAfterResetCredit(connectionId, refreshed.usage).catch((error) => {
      console.warn(
        `[CodexResetCredits] Cooldown release failed for ${connectionId}: ${sanitizeErrorMessage(error)}`
      );
    });

    return { outcome, usage: refreshed.usage };
  } catch (error) {
    if (error instanceof CodexResetCreditError) throw error;
    throw new CodexResetCreditError(
      500,
      "codex_reset_credit_failed",
      sanitizeErrorMessage(error) || "Failed to redeem Codex reset credit."
    );
  }
}

/**
 * Redeem one credit upstream WITHOUT the post-consume quota refresh.
 *
 * `consumeCodexResetCredit` owns the operator-facing path (one redemption, then a
 * full limits refresh + cooldown release). The auto-spend sweep can redeem several
 * credits in a single tick, so it calls this lower-level primitive and runs the
 * refresh + cooldown release once per connection after its loop instead of paying
 * for one upstream usage read per credit. The wire request is identical either way:
 * same URL, same `{ redeem_request_id, credit_id }` body, same auth retry.
 */
async function redeemCodexResetCredit(
  connectionId: string,
  idempotencyKey: string,
  creditId?: string
): Promise<CodexResetCreditOutcome> {
  const connection = await loadCodexConnection(connectionId);
  const normalizedCreditId =
    typeof creditId === "string" && creditId.trim().length > 0 ? creditId.trim() : undefined;
  const { response } = await consumeWithAuthRetry(connection, idempotencyKey, normalizedCreditId);
  const payload = await readResponsePayload(response);

  if (!response.ok) {
    throwKnownConsumeError(payload);
    throw new CodexResetCreditError(
      response.status,
      "codex_reset_credit_upstream_error",
      `Codex reset-credit API returned HTTP ${response.status}.`
    );
  }

  return parseConsumeOutcome(payload);
}

// ---------------------------------------------------------------------------
// Opt-in auto-spend of credits that are about to expire
// ---------------------------------------------------------------------------

function normalizeAutospendConfig(raw: unknown): CodexAutospendConfig {
  const record = toRecord(raw);
  const horizonHours = Number(record.horizonHours);
  const maxPerDay = Number(record.maxPerDay);
  // `connections` absent => provider-wide (every eligible connection);
  // `connections: {}` => explicitly nobody (fail-closed, matches codexAutoPing).
  const hasAllowlist = record.connections !== undefined && record.connections !== null;
  const connections = toRecord(record.connections);

  return {
    enabled: record.enabled === true,
    horizonHours:
      Number.isFinite(horizonHours) && horizonHours > 0
        ? Math.trunc(horizonHours)
        : CODEX_AUTOSPEND_DEFAULT_HORIZON_HOURS,
    maxPerDay:
      Number.isFinite(maxPerDay) && maxPerDay > 0
        ? Math.trunc(maxPerDay)
        : CODEX_AUTOSPEND_DEFAULT_MAX_PER_DAY,
    providerWide: !hasAllowlist,
    connections: Object.fromEntries(
      Object.entries(connections).filter(([, value]) => value === true)
    ) as Record<string, boolean>,
  };
}

/**
 * The opt-in is provider-wide when `connections` is absent, and allowlist-only
 * when it is present (an empty map means nobody). The master `enabled` gates both.
 */
function isAutospendEnabledFor(config: CodexAutospendConfig, connectionId: string): boolean {
  if (!config.enabled) return false;
  if (config.providerWide) return true;
  return config.connections[connectionId] === true;
}

/**
 * Upstream refusals that prove the attempt spent nothing, so a later attempt may use a new
 * `redeem_request_id`. Anything else (network error, 5xx, unknown body) is ambiguous and must
 * keep the same id so upstream can dedupe it.
 */
const AUTOSPEND_DEFINITE_REFUSALS = new Set(["nothing_to_reset", "no_credit"]);

/**
 * Deterministic on purpose: a retry (same tick, next tick, or after a crash) replays the
 * identical `redeem_request_id`, so upstream dedupes the consume instead of burning a second
 * credit.
 *
 * Two upstream behaviours are unverified, so the key is safe under either answer:
 * - Shape: the dashboard modal always sends `crypto.randomUUID()`, and whether upstream accepts
 *   anything else is unknown. The key therefore has the same v4 UUID shape, derived by hash.
 * - Failure memoization: if upstream replays a stored `nothing_to_reset` for a known id, a credit
 *   retried under one fixed id could never be spent once the window does exhaust. `generation`
 *   moves on after a definite refusal only (see AUTOSPEND_DEFINITE_REFUSALS), which costs nothing
 *   when upstream does not memoize failures.
 */
function autospendIdempotencyKey(
  connectionId: string,
  creditId: string,
  generation: number
): string {
  const hex = opaqueTokenFingerprint(`auto-spend:${connectionId}:${creditId}:${generation}`);
  const variant = ((Number.parseInt(hex[16], 16) & 0x3) | 0x8).toString(16);
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    `4${hex.slice(13, 16)}`,
    `${variant}${hex.slice(17, 20)}`,
    hex.slice(20, 32),
  ].join("-");
}

function hoursUntilExpiry(credit: CodexResetCredit, nowMs: number): number | null {
  if (!credit.expiresAt) return null;
  const expiresAtMs = Date.parse(credit.expiresAt);
  if (!Number.isFinite(expiresAtMs)) return null;
  return (expiresAtMs - nowMs) / 3_600_000;
}

/**
 * Same follow-up as the manual redeem: refresh the limits, which releases a Codex child whose
 * windows recovered, then release the matching in-memory model lockouts. Without it the credit is
 * gone and the account stays out of rotation until the old cooldown lapses. The credit is already
 * spent, so a failure here is logged and never reclassifies the redemption.
 */
async function refreshLimitsAndReleaseCooldown(connectionId: string): Promise<void> {
  try {
    const refreshed = await fetchAndPersistProviderLimits(connectionId, "manual", {
      allowRotatingRefresh: true,
    });
    await releaseCodexCooldownAfterResetCredit(connectionId, refreshed.usage);
  } catch (error) {
    console.warn(
      `[CodexResetCredits] Post auto-spend refresh failed for ${connectionId}: ${sanitizeErrorMessage(error)}`
    );
  }
}

function persistAutospendGenerations(
  connectionId: string,
  generations: Record<string, number>,
  liveCreditIds: string[],
  refusedCreditIds: string[]
): void {
  if (refusedCreditIds.length === 0) return;
  const next: Record<string, number> = {};
  for (const creditId of liveCreditIds) {
    const generation = (generations[creditId] ?? 0) + (refusedCreditIds.includes(creditId) ? 1 : 0);
    if (generation > 0) next[creditId] = generation;
  }
  // Bookkeeping only: if this fails the next tick reuses the old id, which is no worse than today.
  try {
    setCodexAutospendKeyGenerations(connectionId, next);
  } catch (error) {
    console.warn(
      `[CodexResetCredits] Auto-spend key rotation failed for ${connectionId}: ${sanitizeErrorMessage(error)}`
    );
  }
}

/** Read the connection's credits (one auth retry) and keep those expiring inside the horizon. */
async function listExpiringAutospendCandidates(
  connection: CodexConnectionLike,
  nowMs: number,
  horizonHours: number
): Promise<{ considered: number; candidates: CodexResetCredit[] }> {
  const refreshedConnection = await refreshCodexConnectionIfNeeded(connection);
  let response = await fetchResetCredits(refreshedConnection);
  if (response.status === 401 || response.status === 403) {
    const retried = await refreshCodexConnectionIfNeeded(refreshedConnection, true);
    response = await fetchResetCredits(retried);
  }

  const payload = await readResponsePayload(response);
  if (!response.ok) {
    throwKnownConsumeError(payload);
    throw new CodexResetCreditError(
      response.status,
      "codex_reset_credit_upstream_error",
      `Codex reset-credit API returned HTTP ${response.status}.`
    );
  }

  const { credits } = parseAvailableResetCredits(payload);
  const candidates = credits.filter((credit) => {
    const hours = hoursUntilExpiry(credit, nowMs);
    return hours !== null && hours > 0 && hours <= horizonHours;
  });
  return { considered: credits.length, candidates };
}

/** Redeem candidates in FEFO order until the budget runs out or upstream says `nothing_to_reset`. */
async function redeemAutospendCandidates(
  connectionId: string,
  candidates: CodexResetCredit[],
  budget: number
): Promise<{ spent: CodexAutospendSpent[]; failed: CodexAutospendFailure[] }> {
  const spent: CodexAutospendSpent[] = [];
  const failed: CodexAutospendFailure[] = [];
  const refusedCreditIds: string[] = [];
  const generations = getCodexAutospendKeyGenerations(connectionId);
  let remainingBudget = budget;

  for (const credit of candidates) {
    if (remainingBudget <= 0) break;
    try {
      const outcome = await redeemCodexResetCredit(
        connectionId,
        autospendIdempotencyKey(connectionId, credit.id, generations[credit.id] ?? 0),
        credit.id
      );
      spent.push({ creditId: credit.id, outcome });
      remainingBudget -= 1;
    } catch (error) {
      const code =
        error instanceof CodexResetCreditError ? error.code : "codex_reset_credit_failed";
      failed.push({ creditId: credit.id, code });
      if (AUTOSPEND_DEFINITE_REFUSALS.has(code)) refusedCreditIds.push(credit.id);
      if (code === "nothing_to_reset") break;
    }
  }

  persistAutospendGenerations(
    connectionId,
    generations,
    candidates.map((credit) => credit.id),
    refusedCreditIds
  );
  return { spent, failed };
}

/** Post-spend bookkeeping: cache invalidation, daily counter, limits refresh + cooldown release. */
async function recordAutospendSpend(
  connectionId: string,
  nowMs: number,
  spentTotalToday: number
): Promise<void> {
  invalidateCodexQuotaCache(connectionId);
  // Counter persistence is bookkeeping, not part of the redemption: a DB
  // hiccup must never reclassify an already-spent credit as a failure.
  try {
    setCodexAutospendCount(connectionId, utcDayKey(nowMs), spentTotalToday, nowMs);
  } catch (error) {
    console.warn(
      `[CodexResetCredits] Auto-spend counter update failed for ${connectionId}: ${sanitizeErrorMessage(error)}`
    );
  }
  await refreshLimitsAndReleaseCooldown(connectionId);
}

/**
 * Opt-in sweep that redeems Codex reset credits about to expire so the account
 * does not silently lose them.
 *
 * Contract (see the PR body):
 * - OFF by default (`settings.codexSpendExpiringResetCredits.enabled`), master
 *   switch gated per connection.
 * - Only credits whose `expiresAt` lands inside `horizonHours` (default 24 h)
 *   are candidates; the soonest-expiring one is redeemed first (the same FEFO
 *   order the dashboard modal shows).
 * - Skips a connection the operator disabled or that was auto-disabled (`isActive: false`).
 * - Never throws: a rejected redemption (`nothing_to_reset`, `no_credit`, …) is
 *   reported per credit so the surrounding quota refresh is unaffected.
 * - `nothing_to_reset` is account-level, so the first one ends the loop: the other
 *   candidates would get the same answer.
 * - Bounded by `maxPerDay` per connection, tracked in `key_value` (no migration).
 * - Reuses the exact manual wire request; only the `redeem_request_id` is
 *   derived by `autospendIdempotencyKey` instead of a random UI UUID.
 * - After a redemption it refreshes limits and releases the cooldown once per
 *   connection, like the manual path.
 */
export async function spendExpiringResetCredits(
  connectionId: string,
  options: { now?: () => number } = {}
): Promise<CodexAutospendResult> {
  const empty: CodexAutospendResult = { spent: [], failed: [], considered: 0 };

  if (!connectionId || typeof connectionId !== "string") {
    return { ...empty, error: "connectionId is required." };
  }

  const now = options.now ?? Date.now;

  try {
    const settings = await getSettings();
    const config = normalizeAutospendConfig(settings.codexSpendExpiringResetCredits);
    if (!isAutospendEnabledFor(config, connectionId)) {
      return { ...empty, skipped: "opt_in_off" };
    }

    const nowMs = now();
    const spentToday = getCodexAutospendCount(connectionId, utcDayKey(nowMs));
    if (spentToday >= config.maxPerDay) {
      return { ...empty, skipped: "daily_cap_reached" };
    }

    const connection = await loadCodexConnection(connectionId);
    if (connection.isActive === false) {
      return { ...empty, skipped: "connection_inactive" };
    }

    const { considered, candidates } = await listExpiringAutospendCandidates(
      connection,
      nowMs,
      config.horizonHours
    );
    if (candidates.length === 0) {
      return { ...empty, considered, skipped: "no_expiring_credit" };
    }

    const { spent, failed } = await redeemAutospendCandidates(
      connectionId,
      candidates,
      config.maxPerDay - spentToday
    );
    if (spent.length > 0) {
      await recordAutospendSpend(connectionId, nowMs, spentToday + spent.length);
    }

    return { spent, failed, considered };
  } catch (error) {
    const message =
      error instanceof CodexResetCreditError
        ? error.code
        : sanitizeErrorMessage(error) || "Codex reset-credit auto-spend failed.";
    return { ...empty, error: message };
  }
}
