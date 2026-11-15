/**
 * Codex + ChatGPT-account model rejection ("The '<model>' model is not supported when using
 * Codex with a ChatGPT account.", HTTP 400).
 *
 * Unlike a provider-wide unsupported model (#10460), this refusal is ACCOUNT-scoped: the model
 * exists on the provider, but THIS ChatGPT plan/workspace may not serve it. Rotating to a
 * sibling codex connection is therefore correct and must keep working — which is exactly why
 * the message cannot stay inside `isProviderModelUnsupported400` (that path returns
 * `shouldFallback: false` and stops rotation dead).
 *
 * Once every account has refused, the model must stop being retried on this connection without
 * poisoning its siblings. The lock is:
 *
 *  - EXACT model only. `getModelLockKey()` collapses codex models through
 *    `getCodexModelScope()`, so a quota-family lock here would take every `gpt-5*` / spark
 *    model of the account down with one rejected model (T09 coupling). This module writes
 *    through `lockExactModel()` instead, which lives in its own key namespace.
 *  - BOUNDED (see CODEX_CHATGPT_UNSUPPORTED_LOCK_MS). A later plan upgrade or rollout must be
 *    able to recover on its own: an indefinite lock would hide a genuinely served model
 *    forever, and this module cannot prove the entitlement is permanent.
 *  - TIGHTLY GUARDED. status 400 + canonical `codex` + the exact upstream sentence + the
 *    captured model matching (or being the effort-less base of) the requested one. A message
 *    naming a different model is evidence about THAT model, not this request: do nothing.
 *
 * The `codexChatgptRejectionFlag` result mirrors `copilotRejectionFlag`: once every otherwise
 * routable connection carries the rejection for the requested model, the all-rate-limited
 * branch reports `modelNotSupported`, and `credentialCooldownResponse()` answers 400
 * `model_not_supported` instead of a bogus cooldown countdown.
 */
import {
  getAllModelLockouts,
  getCanonicalLockProvider,
  isModelLocked,
  lockExactModel,
} from "./accountFallback.ts";

/**
 * Upper bound on how long one account keeps refusing a model. Mirrors the 6h bound already
 * shipped for the same class of learned rejection (Copilot, #15634), which the reviewers
 * accepted as the safe ceiling: a ChatGPT plan change, workspace rollout or upstream fix can
 * grant access at any time, and this module only knows the refusal happened once.
 */
export const CODEX_CHATGPT_UNSUPPORTED_LOCK_MS = 6 * 60 * 60 * 1000;
export const CODEX_CHATGPT_UNSUPPORTED_REASON = "codex_chatgpt_model_not_supported" as const;

const CODEX_CANONICAL_PROVIDER = "codex";
const HTTP_BAD_REQUEST = 400;
/** Guard against pathological payloads: the sentence is short, so a bounded slice is enough. */
const MAX_INSPECTED_TEXT_LENGTH = 4000;

/**
 * The upstream sentence, with the rejected model captured. Quoting, casing and spacing vary
 * between Codex client versions, so the quote characters are optional and the model token is
 * bounded by a fixed-width character class (no nested quantifiers: no ReDoS surface).
 */
const UNSUPPORTED_MESSAGE_RE =
  /(?:^|[^\w`])the\s+["'`]?([a-z0-9][\w.:/@-]{0,119})["'`]?\s+model\s+is\s+not\s+supported\s+when\s+using\s+codex\s+with\s+a\s+chatgpt\s+account/i;

/**
 * A different failure phrased next to the same words must never be learned as an entitlement
 * fact. Kept as a deny-list on top of the exact sentence: the signature is already narrow, and
 * a false positive here silently removes a working model from one account.
 */
const NON_ENTITLEMENT_HINTS: readonly RegExp[] = [
  /\bquota\b/i,
  /\brate[\s_-]?limit/i,
  /\bcapacity\b/i,
  /\bprefill\b/i,
  /\bunauthori[sz]ed\b/i,
  /\bauthentication\b/i,
  /\binvalid\s+api[\s_-]?key\b/i,
];

/** Effort tiers that may be appended to a served model id; never part of its identity. */
const EFFORT_SUFFIXES: readonly string[] = [
  "none",
  "minimal",
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
  "ultra",
];

export type CodexChatgptRejectionInput = {
  provider: string | null | undefined;
  status: number | null | undefined;
  model: string | null | undefined;
  errorText: string | null | undefined;
};

function canonicalProviderOf(provider: string | null | undefined): string {
  if (!provider) return "";
  return getCanonicalLockProvider(provider);
}

/**
 * Trim/lowercase and drop an optional provider prefix, so `codex/gpt-6.1-sol` and
 * `gpt-6.1-sol` compare as the same model.
 */
export function normalizeCodexModelId(model: string): string {
  const lower = model.trim().toLowerCase();
  if (!lower) return "";
  const slash = lower.lastIndexOf("/");
  return slash >= 0 && slash < lower.length - 1 ? lower.slice(slash + 1) : lower;
}

/** The model id without a trailing effort tier (`-high`, `-xhigh`, …). */
export function stripCodexEffortSuffix(model: string): string {
  const normalized = normalizeCodexModelId(model);
  for (const effort of EFFORT_SUFFIXES) {
    const suffix = `-${effort}`;
    if (normalized.length > suffix.length && normalized.endsWith(suffix)) {
      return normalized.slice(0, -suffix.length);
    }
  }
  return normalized;
}

/** The model named by the upstream sentence, or null when the text is not that sentence. */
export function getCodexChatgptUnsupportedModel(
  errorText: string | null | undefined
): string | null {
  if (typeof errorText !== "string" || errorText.length === 0) return null;
  const text =
    errorText.length > MAX_INSPECTED_TEXT_LENGTH
      ? errorText.slice(0, MAX_INSPECTED_TEXT_LENGTH)
      : errorText;
  const match = UNSUPPORTED_MESSAGE_RE.exec(text);
  const captured = match?.[1]?.trim().toLowerCase();
  return captured && captured.length > 0 ? captured : null;
}

/**
 * True only when the text is the exact upstream sentence and nothing in it points at
 * quota/auth/shape instead of entitlement. No model requirement: rotation decisions care that
 * the refusal is ACCOUNT-scoped, while learning a lock additionally needs the model to match.
 */
export function isCodexChatgptUnsupportedModelText(
  errorText: string | null | undefined,
  provider?: string | null
): boolean {
  if (provider !== undefined && canonicalProviderOf(provider) !== CODEX_CANONICAL_PROVIDER) {
    return false;
  }
  if (typeof errorText !== "string" || errorText.length === 0) return false;
  if (NON_ENTITLEMENT_HINTS.some((pattern) => pattern.test(errorText))) return false;
  return getCodexChatgptUnsupportedModel(errorText) !== null;
}

/**
 * True only when the refusal is unambiguously this exact ChatGPT-account/model pair. Any
 * ambiguity (different model, different status, non-codex provider, quota/auth wording)
 * returns false so the caller keeps its existing rotation/cooldown behaviour.
 */
export function isCodexChatgptUnsupportedModelRejection(
  input: CodexChatgptRejectionInput
): boolean {
  const { provider, status, model, errorText } = input;
  if (Number(status) !== HTTP_BAD_REQUEST) return false;
  if (canonicalProviderOf(provider) !== CODEX_CANONICAL_PROVIDER) return false;
  if (typeof model !== "string" || model.trim().length === 0) return false;
  if (!isCodexChatgptUnsupportedModelText(errorText, provider)) return false;

  const rejectedModel = getCodexChatgptUnsupportedModel(errorText) as string;
  const requested = normalizeCodexModelId(model);
  if (!requested) return false;
  // Exact id, or the same model under a different effort tier. A genuinely different model
  // means the upstream is talking about something this request did not ask for.
  return (
    requested === rejectedModel ||
    stripCodexEffortSuffix(requested) === stripCodexEffortSuffix(rejectedModel)
  );
}

/**
 * Lock the requested model for this connection (in memory, exact scope) and return the model
 * ids the caller should persist. Returns an empty array when the text is not the strict
 * signature, so callers can branch on `length === 0`.
 */
export function lockCodexChatgptModelNotSupported(
  provider: string | null | undefined,
  connectionId: string,
  model: string | null | undefined,
  errorText: string | null | undefined
): string[] {
  if (!connectionId || typeof model !== "string" || model.trim().length === 0) return [];
  if (
    !isCodexChatgptUnsupportedModelRejection({
      provider,
      status: HTTP_BAD_REQUEST,
      model,
      errorText,
    })
  ) {
    return [];
  }

  const requested = model.trim();
  const rejected = getCodexChatgptUnsupportedModel(errorText);
  const models = new Set<string>([requested]);
  // Also cover the exact id the upstream named when it is the effort-less base of the request
  // (`gpt-6.1-sol` for a `gpt-6.1-sol-high` request): the next request may use either form.
  if (rejected && rejected !== normalizeCodexModelId(requested)) models.add(rejected);

  for (const locked of models) {
    lockExactModel(
      provider as string,
      connectionId,
      locked,
      CODEX_CHATGPT_UNSUPPORTED_REASON,
      CODEX_CHATGPT_UNSUPPORTED_LOCK_MS
    );
  }
  return Array.from(models);
}

/** True when this exact provider/connection/model pair is currently rejected. */
export function isCodexChatgptModelRejected(
  provider: string | null | undefined,
  connectionId: string,
  model: string | null | undefined
): boolean {
  if (canonicalProviderOf(provider) !== CODEX_CANONICAL_PROVIDER) return false;
  if (!connectionId || !model) return false;
  return isModelLocked(provider as string, connectionId, model);
}

type PersistedRejection = { models: string[]; remainingMs: number };

/**
 * Re-materialize persisted rejections into the in-memory lock map for the connections about to
 * be selected. Persisted entries are the durable record; this keeps routing decisions local
 * and synchronous. Entries already expired are ignored (and pruned by the DB writer).
 */
export function rehydrateCodexChatgptModelLocks(
  provider: string | null | undefined,
  connections: ReadonlyArray<{ id: string; providerSpecificData?: unknown }>
): number {
  if (canonicalProviderOf(provider) !== CODEX_CANONICAL_PROVIDER) return 0;
  let restored = 0;
  for (const connection of connections) {
    if (!connection?.id) continue;
    for (const { models, remainingMs } of readPersistedRejections(
      connection.providerSpecificData
    )) {
      for (const model of models) {
        if (isModelLocked(provider as string, connection.id, model)) continue;
        lockExactModel(
          provider as string,
          connection.id,
          model,
          CODEX_CHATGPT_UNSUPPORTED_REASON,
          remainingMs
        );
        restored += 1;
      }
    }
  }
  return restored;
}

function readPersistedRejections(providerSpecificData: unknown): PersistedRejection[] {
  if (!providerSpecificData || typeof providerSpecificData !== "object") return [];
  const raw = (providerSpecificData as Record<string, unknown>).codexUnsupportedModelsUntil;
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return [];
  const now = Date.now();
  const byRemaining = new Map<number, string[]>();
  for (const [model, until] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof model !== "string" || model.length === 0) continue;
    const untilMs = typeof until === "string" ? new Date(until).getTime() : NaN;
    const remainingMs = untilMs - now;
    if (!Number.isFinite(remainingMs) || remainingMs <= 0) continue;
    const bucket = byRemaining.get(remainingMs) ?? [];
    bucket.push(model);
    byRemaining.set(remainingMs, bucket);
  }
  return Array.from(byRemaining, ([remainingMs, models]) => ({ models, remainingMs }));
}

/** Active rejections across every codex connection (diagnostics and tests). */
export function getCodexChatgptModelRejections() {
  const now = Date.now();
  return getAllModelLockouts().flatMap((entry) =>
    entry.provider === CODEX_CANONICAL_PROVIDER &&
    entry.reason === CODEX_CHATGPT_UNSUPPORTED_REASON &&
    entry.until > now
      ? [{ ...entry, remainingMs: entry.until - now }]
      : []
  );
}

/** Connection filter states that never reach the cooldown branch of getProviderCredentials. */
const NON_COOLDOWN_FILTER_STATES = new Set([
  "excluded",
  "modelExcluded",
  "modelNotAdvertised",
  "terminalStatus",
]);

/** Whether every otherwise-routable connection currently rejects this exact model. */
export function areCodexConnectionsRejected(
  provider: string,
  model: string | null | undefined,
  connections: ReadonlyArray<{ id: string }>
): boolean {
  if (!model || canonicalProviderOf(provider) !== CODEX_CANONICAL_PROVIDER) return false;
  if (connections.length === 0) return false;
  return connections.every((connection) => isModelLocked(provider, connection.id, model));
}

/**
 * `{ modelNotSupported: true }` when every cooldown-blocked connection carries a learned
 * rejection for this model, `{}` otherwise — spread into the all-rate-limited result so the
 * caller answers 400 `model_not_supported` instead of a cooldown it cannot honour.
 */
export function codexChatgptRejectionFlag(
  provider: string,
  model: string | null | undefined,
  connections: ReadonlyArray<{ id: string }>,
  filterStatus: ReadonlyMap<string, string>
): { modelNotSupported?: true } {
  if (canonicalProviderOf(provider) !== CODEX_CANONICAL_PROVIDER) return {};
  const blocked = connections.filter(
    (connection) => !NON_COOLDOWN_FILTER_STATES.has(filterStatus.get(connection.id) ?? "")
  );
  return areCodexConnectionsRejected(provider, model, blocked) ? { modelNotSupported: true } : {};
}
