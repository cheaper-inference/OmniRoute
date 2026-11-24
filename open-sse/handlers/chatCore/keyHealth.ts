/**
 * chatCore per-request API-key health updater.
 *
 * One authoritative state — the rotator's per-key entry — answers every question:
 *   - `status`        active | warning | invalid, the failure ladder (#3501 behaviour);
 *   - `rejectedAt`    set when the wording proves the credential itself is dead, cleared
 *                     by a served request. A key can be `invalid` after a generic 403 that
 *                     only rejected one endpoint, and such a key still serves other models,
 *                     so this verdict is kept separate from the status;
 *   - `lastSeq`       the dispatch sequence of the newest outcome applied. It is the only
 *                     ordering rule, and it is sequence-based rather than clock-based so it
 *                     survives clock jumps: a response for an older request than the one
 *                     already applied carries no news, whatever its status, and is discarded
 *                     without touching state. `generation` handles the other half — an
 *                     outcome describes the key material it was issued with, so the entry
 *                     resets when a swapped-in credential is first observed.
 *
 * The connection-level verdict is derived on demand and never stored: the connection is
 * unusable when every key it carries has a `rejectedAt`. When that happens the verdict is
 * published to the credential cache the combo dispatcher consults, because real traffic is
 * the only evidence that a blocked account is blocked — the health probe only asks for auth
 * and model lists. A bare 401 is tolerated for two attempts before it closes the connection;
 * an upstream that names the credential, or the account or workspace behind it, is believed
 * on the first failure. Rotating a token counts as new material, so a genuinely dead account
 * is retried at most twice per refresh before the ladder closes it again. A served request
 * clears both the key verdict and the cached block.
 *
 * The connection-level cache has a second writer: the background probe scheduler records its
 * own auth/model-list verdicts there. Key state stays authoritative for what real traffic
 * observed; a probe failure can hold the gate closed until the next probe or a served request.
 */

import { keyHealthEntries } from "@/shared/utils/keyHealthEntries";
import { credentialFingerprint } from "@/shared/utils/credentialFingerprint";
import {
  getKeyHealthEntry,
  recordKeyFailure,
  recordKeySuccess,
  recordKeyTerminal,
  recordKeyCooldown,
  markKeyRejected,
  markKeyOutcomeSeq,
  syncKeyGeneration,
  DEFAULT_KEY_COOLDOWN_MS,
  trackConnectionExtraKeys,
  type KeyHealth,
} from "../../services/apiKeyRotator.ts";
import { isModelUnavailableError } from "../../services/modelFamilyFallback.ts";
import { hasPerModelQuota } from "../../services/accountFallback.ts";
import { mergeConnectionProviderSpecificData } from "@/lib/db/providers";
import { getCredentialHealth, setCredentialHealth } from "@/lib/credentialHealth/cache";

type KeyHealthLog = {
  warn?: (tag: string, message: string) => void;
  error?: (tag: string, message: string) => void;
} | null;

/** Wording that makes an upstream rejection a credential failure at all. */
const CREDENTIAL_FAILURE_PATTERNS = [
  /\b(?:invalid|incorrect|expired|missing|revoked)\s+api[\s_-]?key\b/i,
  /\bapi[\s_-]?key\s+(?:is\s+)?(?:invalid|incorrect|expired|missing|revoked|not\s+valid)\b/i,
  /\bauthentication[\s_-]+(?:failed|error|required)\b/i,
  /\b(?:invalid|expired|missing|revoked)\s+(?:token|credentials?|bearer)\b/i,
  // "Unauthorized" alone describes an endpoint, not a credential: a 401 already counts
  // unconditionally, and on a 403 this wording is too weak to blame the key.
  /\bnot\s+authenticated\b/i,
  /\bforbidden\b/i,
  /\baccess\s+denied\b/i,
];

/**
 * Wording that proves the credential itself is unusable. Narrower than the classifier
 * above: closing a whole connection takes away every model it can serve.
 */
const CONNECTION_BLOCKING_PATTERNS = [
  /\b(?:invalid|incorrect|expired|revoked|missing)\s+api[\s_-]?key\b/i,
  /\bapi[\s_-]?key\s+(?:is\s+)?(?:invalid|incorrect|expired|revoked|not\s+valid)\b/i,
  /\b(?:invalid|expired|revoked)\s+(?:token|credentials?|bearer)\b/i,
  /\bnot\s+authenticated\b/i,
  /\b(?:account|workspace)\b[\s\S]{0,24}?\b(?:denied|blocked|suspended|deactivated|disabled)\b/i,
];

/**
 * A denial that says the key does not apply to one endpoint or model says nothing about the
 * credential. It has to name the target that way: a bare "request"/"endpoint" also appears in
 * identifiers and in upstream wording that blames the key, such as "invalid subscription key or
 * wrong API endpoint".
 */
const ENDPOINT_SCOPE_PATTERN =
  /\b(?:for|on)\s+(?:(?:this|the|that)\s+)?(?:[a-z][\w-]*\s+){0,3}(?:endpoint|route|model|scope)\b|\bthe\s+selected\s+(?:endpoint|route|model)\b/i;

/** Fixed gate wording: upstream errors can echo the key, and monitoring reads this. */
const SAFE_AUTH_FAILURE_MESSAGE = "upstream rejected the credential";

function isModelCapabilityFailure(status: number, failureDetail: string): boolean {
  // Every wording field, never an auxiliary one: a code-first body still says "model not
  // available" in its message, while a sibling hint is not the rejection.
  const wording = scopeWording(failureDetail);
  if (!wording) return false;
  const normalizedDetail = wording.replace(/[_-]+/g, " ");
  // Model-family fallback already owns these phrases. Use a model-capable status for
  // classification because some aggregators misreport the same model rejection as 401.
  return isModelUnavailableError(status === 401 ? 403 : status, normalizedDetail);
}

/**
 * Whether the wording by itself proves the credential dead, without waiting for the failure
 * ladder. A bare 401 is tolerated twice before the connection closes; an upstream that names
 * the credential (or the account/workspace behind it) is believed the first time.
 */
function isDecisiveVerdict(status: number, failureDetail: string): boolean {
  if (!isCredentialVerdict(status, failureDetail)) return false;
  // The wording fields, never an auxiliary one: a sibling hint is not the rejection.
  return CONNECTION_BLOCKING_PATTERNS.some((pattern) => pattern.test(scopeWording(failureDetail)));
}

function isCredentialFailure(status: number, failureDetail: string): boolean {
  if (status !== 401 && status !== 403) return false;
  if (isModelCapabilityFailure(status, failureDetail)) return false;
  // A denial that names one endpoint or model says nothing about the credential, whatever
  // the status: a 401 with that wording must not take away every model the connection serves.
  if (ENDPOINT_SCOPE_PATTERN.test(scopeWording(failureDetail))) return false;
  if (status === 401) return true;
  if (CREDENTIAL_FAILURE_PATTERNS.some((pattern) => pattern.test(failureDetail))) return true;
  // A suspended workspace states a dead credential even without the key-health wording.
  return CONNECTION_BLOCKING_PATTERNS.some((pattern) => pattern.test(failureDetail));
}

/** True only when the wording, not just the status, blames the credential itself. */
function isCredentialVerdict(status: number, failureDetail: string): boolean {
  if (status !== 401 && status !== 403) return false;
  // Scope wording belongs to the rejection message; scanning the whole body matches
  // unrelated fields such as `request_id`.
  if (ENDPOINT_SCOPE_PATTERN.test(scopeWording(failureDetail))) return false;
  if (status === 401) return true;
  return CONNECTION_BLOCKING_PATTERNS.some((pattern) => pattern.test(failureDetail));
}

/** The gate is keyed by provider for display; fall back to the connection id. */
function connectionProvider(creds: Record<string, unknown>, connId: string): string {
  return typeof creds.provider === "string" && creds.provider.length > 0 ? creds.provider : connId;
}

/** Key ids this connection carries, in rotator terms. Blank entries are not credentials. */
function keyIdsFor(creds: Record<string, unknown>, extraKeys: string[]): string[] {
  const ids: string[] = [];
  if (creds.apiKey || creds.accessToken) ids.push("primary");
  // The rotator numbers extras after dropping blanks, so the same array has to be
  // filtered first — otherwise a blank entry shifts every id and the gate checks a
  // key the rotator never selects.
  extraKeys
    .filter((key) => typeof key === "string" && key.trim().length > 0)
    .forEach((_key, index) => ids.push(`extra_${index}`));
  return ids;
}

/**
 * Sequence for each upstream dispatch. Ordering is by dispatch order, not by clock: two
 * requests can finish in either order, and only the sequence says which one describes the
 * newer state of the credential.
 */
let dispatchSequence = 0;

export function nextRequestSeq(): number {
  dispatchSequence += 1;
  return dispatchSequence;
}

/** Fingerprint of the key material, so verdicts never outlive the credential they describe. */
function credentialGeneration(material: string): string {
  return credentialFingerprint(material);
}

/** Executors leave the primary field intact and identify a rotated extra by its key id. */
function selectedCredentialMaterial(
  creds: Record<string, unknown>,
  keyId: string,
  extraKeys: string[]
): string {
  if (keyId === "primary") return String(creds.accessToken || creds.apiKey || "");
  const match = /^extra_(\d+)$/.exec(keyId);
  if (!match) return "";
  const filtered = extraKeys.filter((key) => typeof key === "string" && key.trim().length > 0);
  return filtered[Number(match[1])] ?? "";
}

/** Fields that carry the rejection's wording, in the order upstreams usually send them. */
const REJECTION_TEXT_FIELDS = [
  "message",
  "detail",
  "reason",
  "description",
  "error_description",
  "code",
] as const;

/**
 * Every wording field of the rejection, in order. A structured body with no wording field
 * returns nothing: an auxiliary hint or an identifier is not the rejection.
 */
function rejectionWording(failureDetail: string): string[] {
  if (!failureDetail) return [];
  try {
    const parsed = JSON.parse(failureDetail) as Record<string, unknown> & {
      error?: { message?: unknown; code?: unknown } | string;
    };
    const wording: string[] = [];
    if (typeof parsed?.error === "string") wording.push(parsed.error);
    else if (typeof parsed?.error === "object") {
      if (typeof parsed.error?.message === "string") wording.push(parsed.error.message);
      if (typeof parsed.error?.code === "string") wording.push(parsed.error.code);
    }
    for (const field of REJECTION_TEXT_FIELDS) {
      const value = parsed?.[field];
      if (typeof value === "string") wording.push(value);
    }
    return wording;
  } catch {
    // Not JSON: the body itself is the wording.
  }
  return [failureDetail];
}

/** The wording a scope test reads: any field may carry the target the denial names. */
function scopeWording(failureDetail: string): string {
  return rejectionWording(failureDetail).join("\n");
}

/** Derived, never stored: unusable means no key is left without a rejection verdict. */
function connectionUsable(
  connId: string,
  keyIds: string[],
  storedHealth: Record<string, KeyHealth>
): boolean {
  return keyIds.some(
    (keyId) => !(getKeyHealthEntry(connId, keyId) ?? storedHealth[keyId])?.rejectedAt
  );
}

/**
 * `providerSpecificData` is an arbitrary JSON column, so the stored map is untrusted: keep
 * only entries shaped like keys so nothing else rides into the persisted snapshot.
 */
function sanitizeStoredHealth(
  stored: Record<string, KeyHealth> | undefined
): Record<string, KeyHealth> {
  return keyHealthEntries<KeyHealth>(stored ?? {});
}

type KeyHealthPersistenceSink = (connId: string, apiKeyHealth: Record<string, KeyHealth>) => void;

let persistenceSink: KeyHealthPersistenceSink | null = null;

/** Test seam: observe the per-key delta sent to the transactional database merge. */
export function __setKeyHealthPersistenceSink(sink: KeyHealthPersistenceSink | null): void {
  persistenceSink = sink;
}

/** Persist only the observed key; the row transaction preserves current siblings. */
function persistConnectionHealth(
  connId: string,
  keyId: string,
  log?: KeyHealthLog,
  preserveKeyVerdict = false
): void {
  const entry = getKeyHealthEntry(connId, keyId);
  if (!entry) return;
  // Dispatch sequence has no meaning after restart.
  const { lastSeq: _lastSeq, ...persisted } = entry;
  const apiKeyHealth = { [keyId]: persisted };
  if (persistenceSink) {
    persistenceSink(connId, apiKeyHealth);
    return;
  }
  mergeConnectionProviderSpecificData(
    connId,
    { apiKeyHealth },
    { mergeApiKeyHealth: true, preserveKeyVerdict, matchKeyGeneration: true }
  ).catch((err: unknown) => {
    log?.error?.(
      "DB",
      `Failed to persist apiKeyHealth: ${err instanceof Error ? err.message : String(err)}`
    );
  });
}

/** Publish the derived verdict and report whether the cache was updated. */
function publishConnectionUnusable(
  connId: string,
  creds: Record<string, unknown>,
  keyIds: string[],
  storedHealth: Record<string, KeyHealth>,
  message: string,
  errorType: string
): boolean {
  if (connectionUsable(connId, keyIds, storedHealth)) return false;
  setCredentialHealth(
    connId,
    connectionProvider(creds, connId),
    "error",
    message,
    errorType,
    "inference"
  );
  return true;
}

/**
 * Point the entry at the key material this response was observed with. A swap makes the
 * previous verdict meaningless: the ladder restarts and a cached block stops applying,
 * because nothing has been observed about the new credential yet.
 */
function beginOutcome(
  connId: string,
  keyId: string,
  creds: Record<string, unknown>,
  generation: string,
  requestSeq: number | undefined
): void {
  if (requestSeq !== undefined) markKeyOutcomeSeq(connId, keyId, requestSeq);
  const previous = getKeyHealthEntry(connId, keyId)?.generation;
  syncKeyGeneration(connId, keyId, generation);
  if (previous && previous !== generation && getCredentialHealth(connId)?.status === "error") {
    setCredentialHealth(
      connId,
      connectionProvider(creds, connId),
      "unknown",
      undefined,
      undefined,
      "inference"
    );
  }
}

/**
 * The credential failed. The verdict is recorded as soon as the wording proves it, not when the
 * failure ladder reaches "invalid": a later response may no longer carry the wording.
 */
function recordAuthFailure(
  status: number,
  failureDetail: string,
  ctx: {
    connId: string;
    currentKeyId: string;
    creds: Record<string, unknown> | null | undefined;
    generation: string;
    requestSeq?: number;
    keyIds: string[];
    storedHealth: Record<string, KeyHealth>;
    log?: KeyHealthLog;
  }
): void {
    beginOutcome(ctx.connId, ctx.currentKeyId, ctx.creds, ctx.generation, ctx.requestSeq);
    const verdict = isCredentialVerdict(status, failureDetail);
    const updatedHealth = recordKeyFailure(ctx.connId, ctx.currentKeyId);
    ctx.log?.warn?.(
      "AUTH",
      `${status} on connection ${ctx.connId.slice(0, 8)} - key marked as failed (failure #${updatedHealth.failures})`
    );

    // The verdict is recorded as soon as the wording proves it, not when the failure
    // ladder reaches "invalid": a later response may no longer carry the wording.
    let publishedVerdict = false;
    if (verdict) {
      markKeyRejected(ctx.connId, ctx.currentKeyId, new Date().toISOString());
      if (isDecisiveVerdict(status, failureDetail)) {
        // The derived predicate exists to answer "can this connection serve at all" — ask
        // it now, not only when the ladder reaches `invalid`, or a key the wording proved
        // dead keeps the connection selectable for another round.
        publishedVerdict = publishConnectionUnusable(
          ctx.connId,
          ctx.creds,
          ctx.keyIds,
          ctx.storedHealth,
          SAFE_AUTH_FAILURE_MESSAGE,
          "upstream_auth_error"
        );
      }
    }

    persistConnectionHealth(ctx.connId, ctx.currentKeyId, ctx.log);

    if (!publishedVerdict && updatedHealth.status === "invalid") {
      publishConnectionUnusable(
        ctx.connId,
        ctx.creds,
        ctx.keyIds,
        ctx.storedHealth,
        SAFE_AUTH_FAILURE_MESSAGE,
        "upstream_auth_error"
      );
    }
}

type HealthRecordContext = {
  connId: string;
  currentKeyId: string;
  creds: Record<string, unknown> | null | undefined;
  generation: string;
  requestSeq?: number;
  keyIds: string[];
  storedHealth: Record<string, KeyHealth>;
  log?: KeyHealthLog;
};

function recordSuccess(ctx: HealthRecordContext): void {
  beginOutcome(ctx.connId, ctx.currentKeyId, ctx.creds, ctx.generation, ctx.requestSeq);
  // A served request proves this key works; the verdict and the cached block go away.
  const previous = getKeyHealthEntry(ctx.connId, ctx.currentKeyId);
  const wasRejected = Boolean(previous?.rejectedAt);
  const wasWarned = previous?.status;
  const wasCooling = Boolean(previous?.cooldownUntil);
  markKeyRejected(ctx.connId, ctx.currentKeyId, null);
  recordKeySuccess(ctx.connId, ctx.currentKeyId);

  if (wasRejected || wasCooling || wasWarned === "warning" || wasWarned === "invalid") {
    persistConnectionHealth(ctx.connId, ctx.currentKeyId, ctx.log);
  }
  if (getCredentialHealth(ctx.connId)?.status === "error") {
    setCredentialHealth(
      ctx.connId,
      connectionProvider(ctx.creds, ctx.connId),
      "active",
      undefined,
      undefined,
      "inference"
    );
  }
}

function recordInsufficientBalance(ctx: HealthRecordContext): void {
  // "Insufficient account balance" is terminal for this key on single-credential
  // providers (#5239). openai-compatible / per-model-quota gateways multiplex many
  // upstreams behind one key: a 402 there is a per-model billing signal, so the key
  // stays usable for sibling models.
  const provider = connectionProvider(ctx.creds, ctx.connId);
  if (hasPerModelQuota(provider)) return;

  beginOutcome(ctx.connId, ctx.currentKeyId, ctx.creds, ctx.generation, ctx.requestSeq);
  recordKeyTerminal(ctx.connId, ctx.currentKeyId);
  markKeyRejected(ctx.connId, ctx.currentKeyId, new Date().toISOString());
  ctx.log?.error?.(
    "AUTH",
    `402 on connection ${ctx.connId.slice(0, 8)} - key ${ctx.currentKeyId} marked invalid (insufficient balance)`
  );

  persistConnectionHealth(ctx.connId, ctx.currentKeyId, ctx.log);
  publishConnectionUnusable(
    ctx.connId,
    ctx.creds,
    ctx.keyIds,
    ctx.storedHealth,
    "upstream reports no remaining balance for this account",
    "insufficient_balance"
  );
}

function recordRateLimit(ctx: HealthRecordContext, retryAfterMs?: number | null): void {
  // Per-key cooldown (#14573): a rate limit hits ONE key, never the credential, and
  // sibling keys keep serving. Per-model-quota gateways treat 429 as a model signal,
  // mirroring the 402 rule.
  const provider = connectionProvider(ctx.creds ?? {}, ctx.connId);
  if (hasPerModelQuota(provider)) return;

  beginOutcome(ctx.connId, ctx.currentKeyId, ctx.creds, ctx.generation, ctx.requestSeq);
  const cooldownMs = retryAfterMs && retryAfterMs > 0 ? retryAfterMs : DEFAULT_KEY_COOLDOWN_MS;
  recordKeyCooldown(ctx.connId, ctx.currentKeyId, cooldownMs);
  ctx.log?.warn?.(
    "AUTH",
    `429 on connection ${ctx.connId.slice(0, 8)} - key ${ctx.currentKeyId} cooling for ${Math.ceil(cooldownMs / 1000)}s`
  );
  persistConnectionHealth(ctx.connId, ctx.currentKeyId, ctx.log, true);
}

export function recordKeyHealthStatus(
  status: number,
  creds: Record<string, unknown> | null | undefined,
  log?: KeyHealthLog,
  transport?: string,
  failureDetail = "",
  retryAfterMs?: number | null,
  requestSeq?: number
): void {
  // CLIProxyAPI owns a shared external credential pool. Its auth failures cannot be
  // attributed to the native OmniRoute connection selected before proxy dispatch.
  if (transport === "cliproxyapi") return;

  const connId = creds?.connectionId as string | undefined;
  if (!connId) return;

  const psd = creds.providerSpecificData as Record<string, unknown> | undefined;
  const extraKeys = (psd?.extraApiKeys as string[] | undefined) ?? [];
  const currentKeyId = (psd?.selectedKeyId as string | undefined) ?? "primary";
  const keyIds = keyIdsFor(creds, extraKeys);

  trackConnectionExtraKeys(connId, extraKeys);

  // A verdict describes the key material it was observed with. When the credential was
  // swapped, the previous state no longer applies and the entry starts clean. This runs
  // per branch, not up front, so a response that records nothing creates no entry.
  // A connection may have no primary and still send an extra key. Conversely, a
  // genuinely anonymous request has no credential verdict to record (#9827).
  const material = selectedCredentialMaterial(creds, currentKeyId, extraKeys);
  if (!material) return;
  const generation = credentialGeneration(material);
  const storedHealth = sanitizeStoredHealth(
    psd?.apiKeyHealth as Record<string, KeyHealth> | undefined
  );

  // One ordering rule for every outcome. A response for a request older than the newest
  // one already applied describes a state that is gone: a retry, a slower sibling, or an
  // attempt made with material since replaced. Status does not matter — a stale 429 must
  // not cool a key a fresher success just cleared, and a stale 401 must not re-block it.
  const ctx = {
    connId,
    currentKeyId,
    creds,
    generation,
    requestSeq,
    keyIds,
    storedHealth,
    log,
  };

  if (requestSeq !== undefined) {
    const applied = getKeyHealthEntry(connId, currentKeyId)?.lastSeq;
    if (applied !== undefined && requestSeq <= applied) return;
  }

  if (isCredentialFailure(status, failureDetail)) {
    recordAuthFailure(status, failureDetail, {
      connId,
      currentKeyId,
      creds,
      generation,
      requestSeq,
      keyIds,
      storedHealth,
      log,
    });
    return;
  }

  if (status === 402) {
    recordInsufficientBalance(ctx);
    return;
  }

  if (status === 429) {
    recordRateLimit(ctx, retryAfterMs);
    return;
  }

  if (status >= 200 && status < 300) recordSuccess(ctx);
}

/**
 * Bind the per-request log once. Callers above this module get the same argument order
 * without repeating the log, while preserving the upstream dispatch sequence.
 */
export function bindKeyHealthRecorder(log?: KeyHealthLog) {
  return (
    status: number,
    creds: Record<string, unknown> | null | undefined,
    transport?: string,
    failureDetail?: string,
    retryAfterMs?: number | null,
    requestSeq?: number
  ): void =>
    recordKeyHealthStatus(status, creds, log, transport, failureDetail, retryAfterMs, requestSeq);
}
