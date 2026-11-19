import { randomInt, randomUUID } from "node:crypto";

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
import { opaqueTokenFingerprint } from "../utils/opaqueTokenFingerprint.ts";
import {
  isFreebuffQuotaExhausted,
  parseFreebuffResetMs,
} from "../services/accountFallback/freebuffPolicy.ts";
import {
  FreebuffCatalogCache,
  handleForKey,
  parseFreebuffCatalog,
  resolveCatalogHandle,
  rowForHandle,
  type FreebuffCatalog,
} from "./freebuff/catalog.ts";
import {
  createReadOnlyDeviceStore,
  FileDeviceStore,
  FreebuffDeviceSigner,
  officialDeviceKeyPath,
  resolveFreebuffDeviceKeyPath,
} from "./freebuff/deviceKey.ts";
import {
  FREEBUFF_AGENT_ID,
  FREEBUFF_API,
  FREEBUFF_CHAT_UA,
  FREEBUFF_CLIENT_VERSION,
  FREEBUFF_ENV_FINGERPRINT,
  FREEBUFF_ERROR_CODES,
  FREEBUFF_HARNESS_REPLACEMENTS,
  FREEBUFF_HEADERS,
  FREEBUFF_ORIGIN,
  FREEBUFF_RUNTIME_UA,
  freebuffSystemHead,
  freebuffSystemPrefix,
  freebuffTimezone,
} from "./freebuff/identity.ts";

const SESSION_URL = `${FREEBUFF_API}/freebuff/session`;
const ADMISSION_URL = `${FREEBUFF_API}/freebuff/session/admission`;
const CATALOG_URL = `${FREEBUFF_API}/freebuff/models`;
const DEVICE_KEYS_URL = `${FREEBUFF_API}/freebuff/device-keys`;
const AGENT_RUNS_URL = `${FREEBUFF_API}/agent-runs`;
const CHAT_URL = `${FREEBUFF_API}/chat/completions`;
const ME_URL = `${FREEBUFF_API}/me?fields=id%2Cemail`;

const ACCOUNT_TTL_MS = 60 * 60 * 1000;
const DEVICE_REGISTER_TIMEOUT_MS = 15_000;

/** Cap on the conversation-state map (bounded LRU, like the client). */
const INSTANCE_CACHE_LIMIT = 512;

/**
 * Per-conversation identity. The free tier keys "the same chat" off these
 * values, so they must survive across turns: minting a new `client_id` or a new
 * run on every request makes the upstream treat each message as a fresh chat.
 */
interface FreebuffConversationState {
  /** Instance id the upstream admitted for this chat (the session slot). */
  instanceId: string;
  /** `codebuff_metadata.trace_session_id` - one per chat, not per request. */
  traceSessionId: string;
  /** `codebuff_metadata.client_id` - stable client handle for this chat. */
  clientId: string;
  /** Run id of this chat's live agent run, replayed on every turn. */
  lastRunId: string;
}

/**
 * Admission statuses that mean "another instance of this account holds the
 * slot". The client answers these with `x-freebuff-takeover-instance-id` set to
 * `currentInstanceId` and retries - it does NOT end the session first.
 * (`model_locked` and `purchase_claim_released` are separate paths.)
 */
const SLOT_TAKEOVER_STATUSES = new Set([
  "premium_slot_taken",
  "purchase_in_use",
  "purchase_capacity",
]);

/**
 * Admission rejections that are NOT a spent quota and must not cost the account
 * a cooldown: a transient upstream hiccup or a stale catalog handle resolves on
 * its own. Retrying the SAME account is correct for these - rotating to another
 * account would burn that account's one-hour slot for nothing.
 */
const RETRYABLE_ADMISSION_STATUSES = new Set([
  "model_unavailable",
  "model_locked",
  "catalog_stale",
  "premium_slot_taken",
]);

/** Upstream statuses worth a same-account retry before rotating accounts. */
const RETRYABLE_UPSTREAM_STATUSES = new Set([408, 425, 500, 502, 503, 504]);

/**
 * How long the caller should wait before retrying the SAME account on a
 * transient rejection. Every admission bills a one-hour slot, so a same-account
 * retry is always cheaper than rotating - but it must not become a hot loop.
 */
const FREEBUFF_SAME_ACCOUNT_RETRY_DELAY_MS = 3000;

/**
 * In-executor retries for a withdrawn/stale model handle. This is a protocol
 * state the account can resolve by refreshing its catalog, so it is retried
 * here rather than escalating to account rotation.
 */
const FREEBUFF_MODEL_RETRY_MAX = 2;

type FreebuffFetch = typeof fetch;

export interface FreebuffExecutorOptions {
  /** Test seam: replaces the global fetch. */
  fetchImpl?: FreebuffFetch;
  /** Stable trace session id (official client keeps one per conversation). */
  traceSessionId?: string;
  /** Writable device-key store; defaults to `DATA_DIR/freebuff/device-key.json`. */
  deviceKeyStore?: import("./freebuff/deviceKey.ts").FreebuffDeviceStore;
  /** Extra read-only stores (official client key). */
  externalDeviceKeyStores?: import("./freebuff/deviceKey.ts").FreebuffDeviceStore[];
  now?: () => number;
}

function generateClientSessionId(): string {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < 13; i++) out += alphabet[randomInt(alphabet.length)];
  return out;
}

function errorResponse(status: number, message: string, type = "upstream_error", code?: string) {
  return new Response(JSON.stringify(buildErrorBody(status, message, undefined, { type, code })), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Map an upstream free-tier rejection onto an actionable client error.
 *
 * `freebuff_update_required` and `freebuff_model_retired` are protocol/version
 * signals - reporting them as a generic upstream failure leaves the operator
 * with no idea that the provider needs a refresh rather than a retry.
 */
function upstreamErrorResponse(status: number, text: string) {
  let code = "";
  let message = "";
  try {
    const parsed = JSON.parse(text) as { error?: unknown; message?: unknown };
    if (typeof parsed.error === "string") code = parsed.error;
    if (typeof parsed.message === "string") message = parsed.message;
  } catch {
    // Non-JSON body: surfaced verbatim below.
  }

  const detail = message || text.slice(0, 400) || `HTTP ${status}`;

  if (status === 401) {
    return errorResponse(
      status,
      `Freebuff authentication failed (401): ${detail}`,
      "authentication_error",
      "invalid_api_key"
    );
  }
  if (code === FREEBUFF_ERROR_CODES.updateRequired) {
    return errorResponse(
      status,
      `Freebuff rejected this client version (410 ${code}). The provider's request protocol changed and needs a refresh: ${detail}`,
      "upstream_protocol_error",
      "upgrade_required"
    );
  }
  if (code === FREEBUFF_ERROR_CODES.modelRetired) {
    return errorResponse(
      status,
      `Freebuff retired this model (${code}): ${detail}`,
      "model_not_found",
      "model_not_found"
    );
  }
  if (code === FREEBUFF_ERROR_CODES.cliRequired) {
    return errorResponse(
      status,
      `Freebuff free mode only accepts the official CLI client (${code}): ${detail}`,
      "permission_error",
      "permission_denied"
    );
  }
  if (code === FREEBUFF_ERROR_CODES.invalidAgentModel) {
    return errorResponse(
      status,
      `Freebuff rejected this agent/model combination (${code}): ${detail}`,
      "invalid_request_error",
      "invalid_request_error"
    );
  }
  // Admission-level statuses that carry no `error` code but are actionable.
  let statusName = "";
  try {
    const parsed = JSON.parse(text) as { status?: unknown };
    if (typeof parsed.status === "string") statusName = parsed.status;
  } catch {
    // already handled above
  }
  if (statusName === "purchase_claim_released") {
    return errorResponse(
      status,
      `Freebuff released this session upstream (${statusName}). Start a new session — the previous hour was refunded or expired.`,
      "session_expired",
      "session_expired"
    );
  }
  if (statusName === "country_blocked") {
    return errorResponse(
      status,
      `Freebuff blocks this region (${statusName}): ${detail}`,
      "permission_error",
      "permission_denied"
    );
  }
  if (isFreebuffQuotaExhausted(status, text, code || null)) {
    return errorResponse(
      status,
      `Freebuff Freebucks limit reached (${statusName || "rate_limited"}): ${detail}`,
      "rate_limit_error",
      "insufficient_quota"
    );
  }
  if (statusName === "spend_limited" || statusName === "rate_limited" || status === 429) {
    return errorResponse(
      status,
      `Freebuff limit reached (${statusName || "rate_limited"}): ${detail}`,
      "rate_limit_error",
      "rate_limit_exceeded"
    );
  }
  return errorResponse(
    status,
    `Freebuff upstream failed (${status}): ${detail}`,
    "upstream_error",
    "upstream_error"
  );
}

/**
 * True when `text` already opens with the persona (idempotent re-injection).
 */
function hasSystemPrefix(text: string): boolean {
  return text.trimStart().startsWith("You are Buffy, the coding agent behind Codebuff");
}

/**
 * Attach a `Retry-After` header to a rejection response when the upstream named
 * the remaining wait, so the caller's cooldown matches the real reset.
 */
function withRetryHint(response: Response, retryAfterMs: number | null): Response {
  if (!retryAfterMs) return response;
  const headers = new Headers(response.headers);
  headers.set("retry-after", String(Math.ceil(retryAfterMs / 1000)));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function buildRejectionResponse(
  status: number,
  text: string,
  headers?: Headers | null,
  nowMs?: number
): Response {
  let statusName = "";
  try {
    const parsed = JSON.parse(text) as { status?: unknown };
    if (typeof parsed.status === "string") statusName = parsed.status;
  } catch {
    // Non-JSON body: statusName stays empty.
  }
  const base = upstreamErrorResponse(status, text);
  if (isFreebuffQuotaExhausted(status, text)) {
    return withRetryHint(base, parseFreebuffResetMs(text, headers, nowMs));
  }
  const retryable =
    RETRYABLE_ADMISSION_STATUSES.has(statusName) ||
    RETRYABLE_UPSTREAM_STATUSES.has(status) ||
    status === 429;
  const upstreamHint = parseFreebuffResetMs(text, headers, nowMs);
  return withRetryHint(
    base,
    upstreamHint ?? (retryable ? FREEBUFF_SAME_ACCOUNT_RETRY_DELAY_MS : null)
  );
}

function stripHarnessMarkers(text: string): string {
  let out = text;
  for (const [marker, neutral] of FREEBUFF_HARNESS_REPLACEMENTS) {
    if (out.includes(marker)) out = out.split(marker).join(neutral);
  }
  return out;
}

function normalizeContent(content: unknown): unknown {
  if (typeof content === "string") return stripHarnessMarkers(content);
  if (!Array.isArray(content)) return content;
  return content.map((part) => {
    if (part && typeof part === "object" && !Array.isArray(part)) {
      const record = part as Record<string, unknown>;
      if (record.type === "text" && typeof record.text === "string") {
        return { ...record, text: stripHarnessMarkers(record.text) };
      }
    }
    return part;
  });
}

/**
 * Prepend the Buffy persona (with the current date) to a (normalised) system
 * turn, keeping the caller's text intact and in order behind it.
 *
 * Idempotent: a caller that already opens with the persona (or a retry that
 * re-runs the shaping) is left untouched, so the prefix is never doubled.
 */
function withSystemPrefix(content: unknown, now: number): unknown {
  if (typeof content === "string") {
    if (hasSystemPrefix(content)) return content;
    // An empty caller prompt becomes the head alone, without the dangling bullet.
    if (content.trim() === "") return freebuffSystemHead(now);
    return `${freebuffSystemPrefix(now)}${content}`;
  }
  if (Array.isArray(content)) {
    const firstText = content.find(
      (part) =>
        part && typeof part === "object" && (part as Record<string, unknown>).type === "text"
    ) as Record<string, unknown> | undefined;
    if (firstText && typeof firstText.text === "string" && hasSystemPrefix(firstText.text)) {
      return content;
    }
    return [{ type: "text", text: freebuffSystemPrefix(now) }, ...content];
  }
  // Null/undefined/unknown content: the head alone still satisfies the gate.
  return freebuffSystemHead(now);
}

/**
 * Mirror the official client's message shaping: `developer` becomes `system`,
 * harness identity phrases are neutralised, the Buffy persona + current date are
 * injected at the head of the caller's system prompt, and a system turn always
 * exists.
 *
 * The upstream's free tier expects the official client's identity in the system
 * turn (`You are Buffy, the coding agent behind Codebuff`), so the persona is
 * prepended to whatever the caller sent instead of being used only as a
 * fallback when no system turn exists.
 */
function normalizeMessages(messages: unknown, now: number): Array<Record<string, unknown>> {
  const list = Array.isArray(messages) ? messages : [];
  const out: Array<Record<string, unknown>> = [];
  let prefixed = false;

  for (const item of list) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const message = { ...(item as Record<string, unknown>) };
    if (message.role === "developer") message.role = "system";
    if (message.role === "system") {
      message.content = normalizeContent(message.content);
      // Only the first system turn carries the persona: it is the head of the
      // caller's system context, so later turns must not repeat it.
      if (!prefixed) {
        message.content = withSystemPrefix(message.content, now);
        prefixed = true;
      }
    }
    out.push(message);
  }

  if (!prefixed) out.unshift({ role: "system", content: freebuffSystemHead(now) });
  return out;
}

export class FreebuffExecutor extends BaseExecutor {
  /**
   * Test seam only. Production resolves the global `fetch` at call time: the
   * registry caches executor instances, and a captured reference would keep
   * whatever transport existed when the first request built them.
   */
  private readonly fetchOverride?: FreebuffFetch;
  /**
   * Optional test override for the first conversation's trace session id.
   * Each conversation receives its own `traceSessionId` in `conversationCache`.
   */
  private readonly traceSessionIdOverride?: string;
  private readonly signer: FreebuffDeviceSigner;
  private readonly catalogCache = new FreebuffCatalogCache();
  private readonly accountCache = new Map<string, { id: string; expiresAt: number }>();
  /**
   * Per-conversation identity. The upstream allows ONE free session at a time,
   * so every request must reuse the instance id the previous turn admitted -
   * otherwise the second message in a chat looks like a competing instance and
   * admission fails with `purchase_capacity`. The same map keeps the chat's
   * `client_id`, `trace_session_id` and previous run id stable, so the upstream
   * sees one continuing conversation instead of a new client per message.
   */
  private readonly conversationCache = new Map<string, FreebuffConversationState>();
  private readonly now: () => number;

  constructor(options: FreebuffExecutorOptions = {}) {
    super("freebuff", PROVIDERS.freebuff || { format: "openai" });
    this.fetchOverride = options.fetchImpl;
    this.traceSessionIdOverride = options.traceSessionId;
    this.now = options.now ?? Date.now;
    this.signer = new FreebuffDeviceSigner({
      externalStores: options.externalDeviceKeyStores ?? [
        createReadOnlyDeviceStore(officialDeviceKeyPath()),
      ],
      writableStore: options.deviceKeyStore ?? new FileDeviceStore(resolveFreebuffDeviceKeyPath()),
      now: this.now,
    });
  }

  private send(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return (this.fetchOverride ?? fetch)(input, init);
  }

  private headers(
    token: string,
    options: { ua: string; extra?: Record<string, string>; hasBody?: boolean } = {
      ua: FREEBUFF_RUNTIME_UA,
    }
  ): Record<string, string> {
    return {
      Authorization: `Bearer ${token}`,
      "User-Agent": options.ua,
      ...(options.hasBody === false ? {} : { "Content-Type": "application/json" }),
      ...options.extra,
    };
  }

  private async sign(
    token: string,
    accountId: string | null,
    method: string,
    url: string,
    body: string | undefined,
    fetchId: string | undefined
  ): Promise<Record<string, string>> {
    return this.signer.headers({
      method,
      url,
      body,
      fetchId,
      origin: FREEBUFF_ORIGIN,
      accountId,
      token,
      register: (publicKey, bearer) => this.registerDeviceKey(publicKey, bearer),
    });
  }

  /** `POST /api/v1/freebuff/device-keys` (official client registration call). */
  private async registerDeviceKey(publicKey: string, token: string): Promise<string | null> {
    try {
      const res = await this.send(DEVICE_KEYS_URL, {
        method: "POST",
        headers: this.headers(token, { ua: FREEBUFF_RUNTIME_UA }),
        body: JSON.stringify({ publicKey, client: "cli" }),
        signal: AbortSignal.timeout(DEVICE_REGISTER_TIMEOUT_MS),
      });
      if (!res.ok) return null;
      const data = (await res.json().catch(() => null)) as { keyId?: unknown } | null;
      return typeof data?.keyId === "string" && data.keyId ? data.keyId : null;
    } catch {
      return null;
    }
  }

  /** Account id used by `x-freebuff-acting-user-id` and the device-key scope. */
  private async accountId(token: string, signal?: AbortSignal | null): Promise<string | null> {
    const key = opaqueTokenFingerprint(token, { length: 32 });
    const cached = this.accountCache.get(key);
    if (cached && cached.expiresAt > this.now()) return cached.id;
    try {
      const res = await this.send(ME_URL, {
        headers: this.headers(token, { ua: FREEBUFF_RUNTIME_UA, hasBody: false }),
        signal: signal ?? undefined,
      });
      if (!res.ok) return null;
      const data = (await res.json().catch(() => null)) as { id?: unknown } | null;
      if (typeof data?.id !== "string" || !data.id) return null;
      this.accountCache.set(key, { id: data.id, expiresAt: this.now() + ACCOUNT_TTL_MS });
      return data.id;
    } catch {
      return null;
    }
  }

  /** `GET /api/v1/freebuff/models` with the catalog protocol headers. */
  private async loadCatalog(
    token: string,
    accountId: string | null,
    signal?: AbortSignal | null
  ): Promise<FreebuffCatalog | null> {
    return this.catalogCache.get(async () => {
      try {
        const res = await this.send(CATALOG_URL, {
          headers: this.headers(token, {
            ua: FREEBUFF_RUNTIME_UA,
            hasBody: false,
            extra: {
              [FREEBUFF_HEADERS.catalogProtocol]: "1",
              [FREEBUFF_HEADERS.client]: "cli",
              [FREEBUFF_HEADERS.clientVersion]: FREEBUFF_CLIENT_VERSION,
              ...(await this.sign(token, accountId, "GET", CATALOG_URL, undefined, undefined)),
            },
          }),
          signal: signal ?? undefined,
        });
        if (!res.ok) return null;
        return parseFreebuffCatalog(await res.json().catch(() => null));
      } catch {
        return null;
      }
    });
  }

  private catalogHeaders(catalog: FreebuffCatalog | null): Record<string, string> {
    if (!catalog?.fetchId) return {};
    return {
      [FREEBUFF_HEADERS.catalogProtocol]: "1",
      [FREEBUFF_HEADERS.catalogFetch]: catalog.fetchId,
    };
  }

  /** `x-fb-timezone`, when the host reports a real IANA zone. */
  private timezoneHeader(): Record<string, string> {
    let zone: string | undefined;
    try {
      zone = freebuffTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      zone = undefined;
    }
    return zone ? { [FREEBUFF_HEADERS.timezone]: zone } : {};
  }

  /**
   * State for this conversation, minting the per-chat identity on first use.
   *
   * `instanceId`, `clientId` and `traceSessionId` are created once and reused
   * for every later turn, which is what makes the upstream treat the exchange
   * as one continuing chat rather than a new client each message.
   */
  private conversationState(conversationKey: string): FreebuffConversationState {
    const existing = this.conversationCache.get(conversationKey);
    if (existing) {
      // Refresh LRU position.
      this.conversationCache.delete(conversationKey);
      this.conversationCache.set(conversationKey, existing);
      return existing;
    }
    const created: FreebuffConversationState = {
      instanceId: `cli:${randomUUID()}`,
      traceSessionId:
        this.traceSessionIdOverride && this.conversationCache.size === 0
          ? this.traceSessionIdOverride
          : randomUUID(),
      clientId: generateClientSessionId(),
      lastRunId: "",
    };
    this.conversationCache.set(conversationKey, created);
    this.trimConversationCache();
    return created;
  }

  private trimConversationCache(): void {
    while (this.conversationCache.size > INSTANCE_CACHE_LIMIT) {
      const oldest = this.conversationCache.keys().next().value;
      if (oldest === undefined) break;
      this.conversationCache.delete(oldest);
    }
  }

  /** Pin a conversation to the instance id the upstream actually admitted. */
  private rememberInstance(conversationKey: string, instanceId: string): void {
    if (!instanceId) return;
    const state = this.conversationState(conversationKey);
    state.instanceId = instanceId;
    this.conversationCache.delete(conversationKey);
    this.conversationCache.set(conversationKey, state);
    this.trimConversationCache();
  }

  /**
   * Drop a dead instance id. A released/refunded hour keeps answering
   * `purchase_claim_released` for that id, so it must never be reused. The
   * chat's `clientId`/`traceSessionId` survive: only the session slot died.
   */
  private forgetInstance(conversationKey: string): void {
    const state = this.conversationCache.get(conversationKey);
    if (!state) return;
    state.instanceId = `cli:${randomUUID()}`;
    state.lastRunId = "";
  }

  /** Record the run this chat opened so every later turn replays it. */
  private rememberRun(conversationKey: string, runId: string): void {
    if (!runId) return;
    const state = this.conversationState(conversationKey);
    state.lastRunId = runId;
  }

  /** Drop a dead run id only if this failed request still owns it. */
  private forgetRun(conversationKey: string, expectedRunId?: string): void {
    const state = this.conversationCache.get(conversationKey);
    if (!state) return;
    if (expectedRunId !== undefined && state.lastRunId !== expectedRunId) return;
    state.lastRunId = "";
  }

  /**
   * Key that identifies "the same chat".
   *
   * An explicit identity wins: the `x-session-id` family of headers, then the
   * body's own conversation hints (`prompt_cache_key`, `conversation_id`,
   * `session_id`, Claude's `metadata.session_id`).
   *
   * Without any of those every request maps to ONE stable chat per account.
   * That is deliberate: the free tier allows a single session slot per account,
   * so keying on per-request content (e.g. a hash of the first message) would
   * fragment one chat into a new upstream session per message while buying no
   * real isolation - and it would break any client that sends only the newest
   * message instead of the whole history.
   */
  private conversationKey(
    accountId: string | null,
    clientHeaders?: Record<string, string> | null,
    body?: Record<string, unknown> | null
  ) {
    const headers = clientHeaders ?? {};
    const explicit =
      headers["x-session-id"] ??
      headers["x_session_id"] ??
      headers["x-omniroute-session-id"] ??
      headers["x-omniroute-session_id"];
    let tag = typeof explicit === "string" ? explicit.trim() : "";

    if (!tag && body) {
      const metadata =
        body.metadata && typeof body.metadata === "object" && !Array.isArray(body.metadata)
          ? (body.metadata as Record<string, unknown>)
          : {};
      const candidates = [
        body.prompt_cache_key,
        body.promptCacheKey,
        body.conversation_id,
        body.conversationId,
        body.session_id,
        body.sessionId,
        metadata.session_id,
      ];
      const found = candidates.find(
        (value) => typeof value === "string" && value.trim().length > 0 && value.length <= 4096
      );
      if (typeof found === "string") tag = found.trim();
    }

    return `${accountId ?? "anon"}:${tag || "default"}`;
  }

  /**
   * `POST /api/v1/freebuff/session/admission` - the call that actually reserves
   * a session slot. Note the empty body: the official client sends no payload,
   * the model travels in `x-freebuff-model` as a catalog handle.
   */
  private async admit(
    token: string,
    accountId: string | null,
    catalog: FreebuffCatalog | null,
    handle: string,
    instanceId: string,
    signal?: AbortSignal | null,
    takeoverInstanceId?: string
  ): Promise<{
    status: number;
    headers: Headers;
    text: string;
    instanceId: string;
    modelKey: string;
    /** Upstream `status` discriminator (`purchase_capacity`, …), when present. */
    statusName: string;
    /** Instance currently holding the slot, for the takeover header. */
    currentInstanceId: string;
  }> {
    const headers = this.headers(token, {
      ua: FREEBUFF_RUNTIME_UA,
      extra: {
        [FREEBUFF_HEADERS.clientVersion]: FREEBUFF_CLIENT_VERSION,
        [FREEBUFF_HEADERS.env]: FREEBUFF_ENV_FINGERPRINT,
        [FREEBUFF_HEADERS.instanceId]: instanceId,
        [FREEBUFF_HEADERS.desktopAttemptId]: instanceId.replace(/^cli:/, ""),
        [FREEBUFF_HEADERS.model]: handle,
        [FREEBUFF_HEADERS.walletSpendLimit]: "session",
        [FREEBUFF_HEADERS.multiSession]: "1",
        [FREEBUFF_HEADERS.purchaseContinuity]: "1",
        // Claim the slot held by another instance instead of ending it.
        ...(takeoverInstanceId
          ? { [FREEBUFF_HEADERS.takeoverInstanceId]: takeoverInstanceId }
          : {}),
        ...this.timezoneHeader(),
        ...this.catalogHeaders(catalog),
        ...(await this.sign(token, accountId, "POST", ADMISSION_URL, undefined, catalog?.fetchId)),
      },
    });
    const res = await this.send(ADMISSION_URL, {
      method: "POST",
      headers,
      signal: signal ?? undefined,
    });
    const text = await res.text();
    let admittedInstance = "";
    let modelKey = "";
    let statusName = "";
    let currentInstanceId = "";
    try {
      const data = JSON.parse(text) as {
        instanceId?: unknown;
        model?: unknown;
        status?: unknown;
        currentInstanceId?: unknown;
        requestedModel?: unknown;
      };
      admittedInstance = typeof data.instanceId === "string" ? data.instanceId : "";
      modelKey = typeof data.model === "string" ? data.model : "";
      statusName = typeof data.status === "string" ? data.status : "";
      currentInstanceId = typeof data.currentInstanceId === "string" ? data.currentInstanceId : "";
    } catch {
      // Non-JSON error body: reported verbatim by the caller.
    }
    return {
      status: res.status,
      headers: res.headers,
      text,
      instanceId: admittedInstance,
      modelKey,
      statusName,
      currentInstanceId,
    };
  }

  /** `GET /api/v1/freebuff/session` — read the slot state for this instance. */
  private async activeSessionInstance(
    token: string,
    accountId: string | null,
    catalog: FreebuffCatalog | null,
    instanceId: string,
    signal?: AbortSignal | null
  ): Promise<string> {
    try {
      const res = await this.send(SESSION_URL, {
        headers: this.headers(token, {
          ua: FREEBUFF_RUNTIME_UA,
          hasBody: false,
          extra: {
            [FREEBUFF_HEADERS.clientVersion]: FREEBUFF_CLIENT_VERSION,
            [FREEBUFF_HEADERS.env]: FREEBUFF_ENV_FINGERPRINT,
            [FREEBUFF_HEADERS.instanceId]: instanceId,
            [FREEBUFF_HEADERS.includeRateLimits]: "1",
            ...this.catalogHeaders(catalog),
            ...(await this.sign(token, accountId, "GET", SESSION_URL, undefined, catalog?.fetchId)),
          },
        }),
        signal: signal ?? undefined,
      });
      if (!res.ok) return "";
      const data = (await res.json().catch(() => null)) as { instanceId?: unknown } | null;
      return typeof data?.instanceId === "string" ? data.instanceId : "";
    } catch {
      return "";
    }
  }

  override async execute(input: ExecuteInput) {
    const { model, body, signal } = input;
    const token = input.credentials?.apiKey || input.credentials?.accessToken || "";
    const payload =
      body && typeof body === "object" && !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : {};

    if (!token) {
      return {
        response: errorResponse(401, "Freebuff Auth Token required", "authentication_error"),
      };
    }

    const requestedModel =
      typeof model === "string"
        ? model.replace(/^freebuff\//, "")
        : model || "deepseek/deepseek-v4-flash";
    const accountId = await this.accountId(token, signal);
    let catalog = await this.loadCatalog(token, accountId, signal);
    let handle = (catalog && resolveCatalogHandle(catalog, requestedModel)) || requestedModel;

    // 1. Session admission with a fresh catalog fetch id.
    const conversationKey = this.conversationKey(accountId, input.clientHeaders, payload);
    const conversationState = this.conversationState(conversationKey);
    let instanceId = conversationState.instanceId;
    let admittedModelKey = "";
    try {
      let admission = await this.admit(token, accountId, catalog, handle, instanceId, signal);
      if (admission.status === 409 && admission.text.includes(FREEBUFF_ERROR_CODES.catalogStale)) {
        this.catalogCache.invalidate();
        catalog = await this.loadCatalog(token, accountId, signal);
        handle = (catalog && resolveCatalogHandle(catalog, requestedModel)) || requestedModel;
        admission = await this.admit(token, accountId, catalog, handle, instanceId, signal);
      }
      if (SLOT_TAKEOVER_STATUSES.has(admission.statusName ?? "")) {
        // Another instance of this account holds the single free slot. The
        // client claims it with `x-freebuff-takeover-instance-id` and retries -
        // ending the session instead would drop the user's other window.
        const holder = admission.currentInstanceId;
        if (holder && holder !== instanceId) {
          admission = await this.admit(
            token,
            accountId,
            catalog,
            handle,
            instanceId,
            signal,
            holder
          );
        }
      }
      if (admission.statusName === "purchase_claim_released") {
        // The hour we were using was refunded/expired upstream, so this
        // instance id is dead and will keep 409-ing forever. Drop it, mint a
        // new one, and admit again - this is the client's `N=!0` path.
        this.forgetInstance(conversationKey);
        instanceId = this.conversationState(conversationKey).instanceId;
        admission = await this.admit(token, accountId, catalog, handle, instanceId, signal);
      }
      // A withdrawn/stale model handle is a protocol state, not a spent quota:
      // refresh the catalog and admit the same account again. Rotating here
      // would bill another account's hour for a problem this account can fix.
      let modelRetries = 0;
      while (
        admission.statusName === "model_unavailable" &&
        modelRetries < FREEBUFF_MODEL_RETRY_MAX
      ) {
        modelRetries += 1;
        this.catalogCache.invalidate();
        catalog = await this.loadCatalog(token, accountId, signal);
        handle = (catalog && resolveCatalogHandle(catalog, requestedModel)) || requestedModel;
        admission = await this.admit(token, accountId, catalog, handle, instanceId, signal);
      }
      if (admission.status < 200 || admission.status >= 300) {
        return {
          response: buildRejectionResponse(
            admission.status,
            admission.text,
            admission.headers,
            this.now()
          ),
        };
      }
      instanceId = admission.instanceId || instanceId;
      // The upstream may hand back a different id than we asked for; keep the
      // conversation pinned to whatever it actually admitted.
      this.rememberInstance(conversationKey, instanceId);
      admittedModelKey = admission.modelKey;
    } catch (e: unknown) {
      const msg =
        sanitizeErrorMessage(e instanceof Error ? e.message : String(e)) || "network error";
      return { response: errorResponse(502, `Freebuff session network error: ${msg}`) };
    }

    // The admission answer names the catalog key that was actually granted,
    // which can differ from the requested one (fallback/reward models).
    const chatModel = (catalog && handleForKey(catalog, admittedModelKey)) || handle;
    const admittedRow = catalog ? rowForHandle(catalog, chatModel) : undefined;

    // 2. Agent run for this chat.
    //
    // The official client opens ONE run per session and replays its `runId` on
    // every chat request (HAR: START 08:21:35 -> two chat POSTs -> FINISH
    // 08:21:44). Starting a fresh run per message breaks that: the chat body
    // then carries an empty `run_id` and the upstream rejects it with
    // `400 No runId found in request body`. So the run id is reused across the
    // conversation and only started when the chat has none.
    let runId = conversationState.lastRunId;
    if (!runId) {
      try {
        const runRes = await this.send(AGENT_RUNS_URL, {
          method: "POST",
          headers: this.headers(token, {
            ua: FREEBUFF_RUNTIME_UA,
            extra: accountId ? { [FREEBUFF_HEADERS.actingUserId]: accountId } : {},
          }),
          body: JSON.stringify({ action: "START", agentId: FREEBUFF_AGENT_ID }),
          signal: signal ?? undefined,
        });
        if (runRes.ok) {
          const runData = (await runRes.json()) as { runId?: string };
          runId = runData.runId || "";
          this.rememberRun(conversationKey, runId);
        }
      } catch {
        // Chat still works without a run id on older deployments.
      }
    }
    if (!runId) {
      // A chat request without a run id is rejected upstream, so fail here with
      // an actionable message instead of forwarding an empty `run_id`.
      return {
        response: errorResponse(
          502,
          "Freebuff could not start an agent run (no runId returned); the request was not sent upstream",
          "upstream_error"
        ),
      };
    }

    // 3. Chat payload with the official free-mode shape.
    const existingMetadata =
      payload.codebuff_metadata &&
      typeof payload.codebuff_metadata === "object" &&
      !Array.isArray(payload.codebuff_metadata)
        ? (payload.codebuff_metadata as Record<string, unknown>)
        : {};
    const existingProvider =
      payload.provider && typeof payload.provider === "object" && !Array.isArray(payload.provider)
        ? (payload.provider as Record<string, unknown>)
        : {};
    const effort =
      typeof payload.reasoning_effort === "string" ? payload.reasoning_effort : undefined;
    const upstreamBody: Record<string, unknown> = {
      ...payload,
      model: chatModel,
      messages: normalizeMessages(payload.messages, this.now()),
      // The official SDK always streams; OmniRoute aggregates for JSON clients.
      stream: true,
      tool_choice: payload.tool_choice ?? "auto",
      provider: { ...existingProvider, data_collection: "deny" },
      codebuff_metadata: {
        ...existingMetadata,
        freebuff_instance_id: instanceId,
        freebuff_multi_session: "1",
        surface: "cli",
        freebuff_client_env: FREEBUFF_ENV_FINGERPRINT,
        // Chat-scoped identity: stable across turns so the upstream keeps the
        // conversation open instead of seeing a new client on every message.
        trace_session_id: conversationState.traceSessionId,
        run_id: runId,
        client_id: conversationState.clientId,
        cost_mode: "free",
        ...(effort ? { reasoning_effort: effort } : {}),
      },
    };
    // Do not forward a fabricated `stop`: the official client sends none, and a
    // caller-supplied one is legitimate.
    if (upstreamBody.stop === undefined) delete upstreamBody.stop;
    const bodyText = JSON.stringify(upstreamBody);

    // 4. Chat completion - the request identity matches the official client.
    const response = await this.send(CHAT_URL, {
      method: "POST",
      headers: this.headers(token, {
        ua: FREEBUFF_CHAT_UA,
        extra: {
          ...(accountId ? { [FREEBUFF_HEADERS.actingUserId]: accountId } : {}),
          [FREEBUFF_HEADERS.clientVersion]: FREEBUFF_CLIENT_VERSION,
          // The single header that clears `410 freebuff_update_required`.
          [FREEBUFF_HEADERS.sseGzipRecovery]: "1",
          ...this.catalogHeaders(catalog),
          ...(await this.sign(token, accountId, "POST", CHAT_URL, bodyText, catalog?.fetchId)),
        },
      }),
      body: bodyText,
      signal: signal ?? undefined,
    });

    // 5. A failed turn must not leave the chat pinned to a poisoned run: finish
    //    it and let the next turn start a fresh one. A successful turn keeps the
    //    run alive, exactly like the official client (one run per session).
    if (!response.ok) {
      this.forgetRun(conversationKey, runId);
      void this.finishAgentRun(token, runId, accountId);
    }

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      return {
        response: buildRejectionResponse(response.status, text, response.headers, this.now()),
      };
    }

    return admittedRow ? { response, model: chatModel } : { response };
  }

  private async finishAgentRun(
    token: string,
    runId: string,
    accountId: string | null
  ): Promise<void> {
    if (!runId) return;
    try {
      await this.send(AGENT_RUNS_URL, {
        method: "POST",
        headers: this.headers(token, {
          ua: FREEBUFF_RUNTIME_UA,
          extra: accountId ? { [FREEBUFF_HEADERS.actingUserId]: accountId } : {},
        }),
        body: JSON.stringify({
          action: "FINISH",
          runId,
          status: "completed",
          totalSteps: 1,
          directCredits: 0,
          totalCredits: 0,
        }),
      });
    } catch {
      // Best effort.
    }
  }
}
