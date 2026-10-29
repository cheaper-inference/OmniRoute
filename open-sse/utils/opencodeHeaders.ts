import { createHash, randomBytes, randomUUID } from "crypto";
import { setUserAgentHeader } from "../executors/base/headers.ts";
import { generateSessionId } from "../services/sessionManager.ts";
import {
  getCachedOpencodeCliVersion,
  OPENCODE_CLI_V2_VERSION_FALLBACK,
  refreshOpencodeCliVersion,
} from "./opencodeCliVersion.ts";
import {
  resolveOpencodeSessionIdentity,
  type OpencodeSessionBody,
} from "./opencodeSessionIdentity.ts";

/**
 * Default synthesized User-Agent. The upstream only parses the version, so this literal
 * exists to be recent enough, not to impersonate a build: any `opencode/<>=1.17>` passes.
 * Overridable through the existing OPENCODE_USER_AGENT (or <PROVIDER>_USER_AGENT) knob.
 */
export const DEFAULT_OPENCODE_USER_AGENT = "opencode/1.18.31";

/**
 * Opt-in OpenCode v2 client fingerprint (`OPENCODE_V2_CLIENT_FINGERPRINT_ENABLED`, off by
 * default; #16571, ported from 9router): the v2 CLI identifies as
 * `opencode/<channel>/<version>/<client>` with a 2.x version and `x-opencode-client: cli`.
 * With the flag off every surface keeps the identity above, byte for byte.
 */
export const DEFAULT_OPENCODE_V2_USER_AGENT = `opencode/latest/${OPENCODE_CLI_V2_VERSION_FALLBACK}/cli`;

/** Canonical OpenCode session id shape: `ses_` + 12 hex + 14 base62. */
export const OPENCODE_SESSION_PATTERN = /^ses_[0-9a-f]{12}[0-9A-Za-z]{14}$/;
/** Same shape for the request id, which the upstream accepts but does not validate. */
export const OPENCODE_REQUEST_PATTERN = /^msg_[0-9a-f]{12}[0-9A-Za-z]{14}$/;

/**
 * The free-tier gate is the session id's *value*, not its shape: the upstream decodes the
 * 12 hex back through OpenCode CLI's `Identifier.descending()` layout, where the low 12
 * bits hold `0xFFF - counter` (counter is the within-millisecond sequence, 0–63). Only a
 * low-12 landing in `0xFC0–0xFFF` passes — `counter = 64` renders `fbf` and is refused
 * (opencode.ai/zen free tier, upstream validated from 2026-10-13; #16328 probes 2026-10-14).
 * `OPENCODE_SESSION_PATTERN` alone accepts any 12 hex, so an out-of-window counter would
 * slip through and 403; the time-part pattern below is the value-level check.
 *
 * Length is 12: `[0-9a-f]{9}` timestamp bits, then the low-12 window `f[c-f][0-9a-f]`
 * (top nibble `f`, second nibble `c–f`). Byte-identical to opencode2api v1.3.8's
 * `descendingTimePartPattern`, which is the reference implementation our side aligns to.
 */
export const OPENCODE_SESSION_TIME_PART_PATTERN = /^[0-9a-f]{9}f[c-f][0-9a-f]$/;

/** Whether a `ses_…` id's 12-hex time part carries the accepted descending counter window. */
export function isValidOpencodeSessionValue(
  sessionId: string | null | undefined
): string | undefined {
  const value = (sessionId || "").trim();
  if (!OPENCODE_SESSION_PATTERN.test(value)) return undefined;
  // A genuine OpenCode session keeps its prompt-cache affinity; a foreign encoding
  // (raw hash, ascending id, counter out of window) is re-minted by canonicalId().
  return OPENCODE_SESSION_TIME_PART_PATTERN.test(value.slice(4, 16)) ? value : undefined;
}

const MINIMUM_USER_AGENT_MINOR = 17;
const USER_AGENT_VERSION_RE = /opencode\/(?:[a-z]+\/)?v?(\d+)\.(\d+)/i;
// v2 fingerprint only: `opencode/<channel>/<x.y.z>/<client>` or a bare `opencode/<x.y>`.
const V2_USER_AGENT_VERSION_RE = /opencode\/(?:[a-z0-9-]+\/)?v?(\d+)\.(\d+)/i;
const V2_MINIMUM_USER_AGENT_MAJOR = 2;

/**
 * Whether a User-Agent already satisfies the upstream contract, so it must be kept.
 * `v2Fingerprint` (opt-in, #16571) raises the bar to a 2.x client: a 1.x UA is then
 * replaced by the synthesized v2 identity instead of being kept.
 */
export function satisfiesOpencodeUserAgentContract(
  userAgent: string | null | undefined,
  v2Fingerprint = false
): boolean {
  if (v2Fingerprint) {
    const v2Match = String(userAgent || "").match(V2_USER_AGENT_VERSION_RE);
    return !!v2Match && Number.parseInt(v2Match[1], 10) >= V2_MINIMUM_USER_AGENT_MAJOR;
  }
  const match = String(userAgent || "").match(USER_AGENT_VERSION_RE);
  if (!match) return false;
  const major = Number.parseInt(match[1], 10);
  const minor = Number.parseInt(match[2], 10);
  if (!Number.isFinite(major) || !Number.isFinite(minor)) return false;
  return major > 1 || (major === 1 && minor >= MINIMUM_USER_AGENT_MINOR);
}

/** The CLI version the v2 identity carries: the live one when it is 2.x, else the v2 pin. */
function v2CliVersion(): string {
  const live = getCachedOpencodeCliVersion();
  const major = Number.parseInt(live.split(".")[0] ?? "", 10);
  return major >= V2_MINIMUM_USER_AGENT_MAJOR ? live : OPENCODE_CLI_V2_VERSION_FALLBACK;
}

// SDK and HTTP-library defaults: never an agent's own identity, so they are always
// replaced. Bounded alternation, anchored at the start — no backtracking risk.
const GENERIC_CLIENT_USER_AGENT_RE =
  /^(?:curl|wget|libcurl|python-requests|python-httpx|python-urllib|aiohttp|httpie|node-fetch|node|undici|axios|got|ky|bun|deno|go-http-client|okhttp|java|apache-httpclient|postmanruntime|insomnia|openai|anthropic|async ?openai|openai-python)(?:[/\s]|$)/i;

/** Whether a User-Agent is a generic SDK or HTTP-library default rather than an agent's own. */
export function isGenericClientUserAgent(userAgent: string | null | undefined): boolean {
  const value = String(userAgent || "").trim();
  return !value || GENERIC_CLIENT_USER_AGENT_RE.test(value);
}

/**
 * The session id the caller supplied, if any.
 *
 * Only a client-supplied value joins two requests of one conversation: a synthesized one
 * is derived from the body, and the body of a build request and of the title request that
 * follows it differ — including in their tool list, which is the very thing being joined.
 */
export function clientSuppliedOpencodeSession(
  clientHeaders: Record<string, string> | null | undefined,
  body?: unknown
): string | undefined {
  return resolveOpencodeSessionIdentity(clientHeaders, body);
}

/**
 * The CLI identity defaults the upstream expects, or `undefined` when synthesis is off.
 *
 * Lives here rather than in the executor because this module already owns the default
 * user-agent and the contract that validates one. `gated` says the free tier will inspect
 * this request: outside the gate a configured user-agent is honoured as-is (the #5997
 * contract, which `opencode-go` and paid models rely on), while on a gated request one
 * that does not satisfy the version rule is replaced — an operator still carrying the
 * previous unversioned default would otherwise be refused.
 *
 * `v2Fingerprint` (opt-in `OPENCODE_V2_CLIENT_FINGERPRINT_ENABLED`, #16571) switches the
 * synthesized identity to the OpenCode v2 CLI shape (`opencode/latest/<2.x>/cli`, client
 * `cli`) and applies the 2.x rule to a configured UA on a gated request. Off: unchanged.
 */
export function resolveOpencodeCliDefaults(
  providerId: string,
  gated: boolean,
  v2Fingerprint = false
): { userAgent: string; client: string; project: string } | undefined {
  if (/^(0|false|no|off)$/i.test(process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS?.trim() ?? "")) {
    return undefined;
  }
  const envUAKey = `${providerId.toUpperCase().replace(/[^A-Z0-9]/g, "_")}_USER_AGENT`;
  const configuredUA = process.env[envUAKey]?.trim() || process.env.OPENCODE_USER_AGENT?.trim();
  // Auto-refresh the live CLI version in the background (coalesced, 6h TTL, never
  // throws); the default below reads the cache synchronously so synthesis never blocks.
  // Skipped under test runners: their globalThis.fetch stubs count dispatches, and the
  // registry lookup would be counted as one (same guard as adobeFireflySession).
  if (!process.env.NODE_TEST_CONTEXT && !process.env.VITEST && process.env.NODE_ENV !== "test") {
    void refreshOpencodeCliVersion();
  }
  const synthesizedUA = v2Fingerprint
    ? `opencode/latest/${v2CliVersion()}/cli`
    : `opencode/${getCachedOpencodeCliVersion()}`;
  return {
    userAgent:
      configuredUA && (!gated || satisfiesOpencodeUserAgentContract(configuredUA, v2Fingerprint))
        ? configuredUA
        : synthesizedUA,
    client: process.env.OPENCODE_CLIENT?.trim() || (v2Fingerprint ? "cli" : "desktop"),
    project: process.env.OPENCODE_PROJECT?.trim() || "global",
  };
}

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/** The within-millisecond sequence OpenCode's `Identifier.descending()` inverts. */
const OPENCODE_SESSION_COUNTER = 1n;
const OPENCODE_SESSION_MASK_48 = 0xffffffffffffn;
/** Bits the hash may carry into the inverted low-48 (48 bits − the 12 reserved for counter). */
const OPENCODE_SESSION_TS_MAX = 0xfffffffffn; // 2**36 − 1

function base62From(bytes: Buffer, length: number): string {
  return Array.from(bytes.subarray(0, length), (byte) => BASE62[byte % 62]).join("");
}

/**
 * Render an id in the canonical OpenCode shape (`<prefix>` + 12 hex + 14 base62).
 *
 * For `ses_` the hex half must reproduce OpenCode CLI's `Identifier.descending()`
 * encoding: `descending(ts) = ~(ts << 12 | counter)` over 48 bits, rendered as 12 hex
 * (most-significant byte first). The upstream free tier decodes it back and only accepts
 * a low 12 bits in `0xFC0–0xFFF` (counter 0–63), so we invert with `counter = 1` — the
 * deterministic replacement for the client's per-ms sequence — and take the high 36 bits
 * from the top 36 bits of the seed hash. A `Date.now()` timestamp is *not* validated
 * upstream (epoch+1ms passes), so staying hash-derived keeps the id stable per
 * conversation and prompt-cache affinity intact. Byte-identical to opencode2api v1.3.8's
 * `CanonicalSessionID` (the reference implementation), so both gateways mint alike.
 *
 * `msg_` ids are not value-checked upstream, so they keep the plain hash render.
 */
function canonicalId(prefix: "ses_" | "msg_", seed?: string): string {
  const bytes = seed
    ? createHash("sha256").update(`opencode\u0000${prefix}\u0000${seed}`).digest()
    : randomBytes(32);
  if (prefix === "ses_") {
    // Top 36 bits of hash[0:5]: bytes 0-3 plus the high nibble of byte 4, exactly as
    // opencode2api's descendingTimePart() reads them into the timestamp half.
    const ts36 =
      ((BigInt(bytes[0]) << 28n) |
        (BigInt(bytes[1]) << 20n) |
        (BigInt(bytes[2]) << 12n) |
        (BigInt(bytes[3]) << 4n) |
        (BigInt(bytes[4]) >> 4n)) &
      OPENCODE_SESSION_TS_MAX;
    // OpenCode's own math, counter pinned to 1: ~(ts << 12 | 1) over 48 bits.
    const value = ~((ts36 << 12n) | OPENCODE_SESSION_COUNTER) & OPENCODE_SESSION_MASK_48;
    return `${prefix}${value.toString(16).padStart(12, "0")}${base62From(bytes.subarray(6), 14)}`;
  }
  return `${prefix}${bytes.subarray(0, 6).toString("hex")}${base62From(bytes.subarray(6), 14)}`;
}

/**
 * Case-insensitively replace any existing entry before setting: a registry static
 * or operator header under a different case plus the forwarded key would both
 * reach the wire and be comma-joined into one garbage value by undici.
 */
function setForwardedHeader(headers: Record<string, string>, name: string, value: string): void {
  for (const existing of Object.keys(headers)) {
    if (existing.toLowerCase() === name) delete headers[existing];
  }
  headers[name] = value;
}

/**
 * Attribution kill-switch: OMNIROUTE_FORWARD_ATTRIBUTION=0 keeps the
 * registry/operator app identity and never forwards client x-session-id /
 * x-title / http-referer. Default on: a harness behind OmniRoute keeps its app
 * attribution upstream (OpenRouter publisher gates key on it), matching the
 * falsy-off motif of OPENCODE_SYNTHESIZE_CLI_HEADERS.
 */
function attributionForwardingEnabled(): boolean {
  return !/^(0|false|no|off)$/i.test(process.env.OMNIROUTE_FORWARD_ATTRIBUTION?.trim() ?? "");
}

/**
 * Header keys that are forwarded from the client to the upstream provider.
 * Used by both OpencodeExecutor and DefaultExecutor.
 */
const OPENCODE_HEADER_KEYS = [
  "x-opencode-session",
  "x-opencode-request",
  "x-opencode-project",
  "x-opencode-client",
] as const;

/**
 * Common agent-metadata headers used by non-OpenCode clients (custom agents/
 * providers) for upstream request tracking and attribution. Forwarded the same
 * way as the x-opencode-* set (case-insensitive lookup, client value wins,
 * plus case-variant replacement — see setForwardedHeader). http-referer was
 * added for app attribution that upstreams such as OpenRouter key publisher
 * access control on; the whole set is gated by OMNIROUTE_FORWARD_ATTRIBUTION.
 * Originally added for 9router#2413.
 */
const AGENT_METADATA_HEADER_KEYS = ["x-session-id", "x-title", "http-referer"] as const;

/**
 * Case-insensitive lookup for a header in a headers record.
 */
function findHeader(headers: Record<string, string>, name: string): string | undefined {
  return Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1];
}

/**
 * Forward OpenCode client request metadata headers to the upstream provider.
 *
 * Shared logic used by OpencodeExecutor and DefaultExecutor:
 * 1. Forwards User-Agent from clientHeaders via `setUserAgentHeader()`
 * 2. Forwards x-opencode-session, x-opencode-request, x-opencode-project,
 *    x-opencode-client headers (case-insensitive match)
 * 3. Forwards x-session-id, x-title and http-referer agent-metadata headers
 *    (case-insensitive match) — common conventions used by non-OpenCode agent
 *    clients (9router#2413); http-referer carries app attribution upstreams
 *    such as OpenRouter key publisher access control on.
 *
 * @param headers - The outbound headers record to mutate
 * @param clientHeaders - The client-provided headers to forward from
 * @param options.synthesizeRequestId - When true (OpencodeExecutor only), maps
 *   x-session-affinity / x-session-id to x-opencode-session when the latter is
 *   missing, and synthesizes a UUID for x-opencode-request if also missing.
 * @param options.cliDefaults - When provided (OpencodeExecutor only), synthesize
 *   the OpenCode CLI identity headers that Cloudflare requires on VPS egress
 *   (User-Agent, x-opencode-client, x-opencode-project) plus fresh request/session
 *   UUIDs, but ONLY for keys the client did not already supply. Client values always
 *   win; these defaults only fill gaps. User-Agent is the one exception: a client UA
 *   that is not already the OpenCode CLI (e.g. curl/8.5.0) is REPLACED with the
 *   synthesized CLI UA, because opencode.ai's free tier rejects generic client UAs
 *   from datacenter IPs with FreeUsageLimitError 429. (#5997, follow-up #10229)
 * @param options.keepAgentUserAgent - OpenCode Go (#15311): keep a client User-Agent that
 *   names the agent itself, as Go's client requirements ask. A generic SDK / HTTP-library
 *   UA is still replaced, and a missing one is still filled.
 * @param options.forwardUserAgent - Set to false (DefaultExecutor, #15632) to NOT copy the
 *   caller's User-Agent onto the upstream request: a library UA such as Python-urllib is
 *   blocked by Cloudflare-fronted providers (Groq) and would override the provider/env/
 *   connection User-Agent. Defaults to true.
 * @param options.sessionBody - Request body fields used to generate a
 *   conversation-stable session fingerprint (model, system, messages or input, tools).
 *   When provided, x-opencode-session is a deterministic hash instead of a random
 *   UUID, so upstream prompt caching hits across requests in the same conversation.
 * @param options.reencodeSession - Free-tier (zen) only: validate a client-supplied
 *   session's *value* (the 12-hex time part must decode to the client's
 *   `Identifier.descending()` counter window `0xFC0–0xFFF`) and re-mint it otherwise. The
 *   upstream began enforcing this on 2026-10-13; a shape-valid but foreign-encoded id
 *   (raw hash, ascending id, out-of-window counter) is 403 FreeTierError. Off for the
 *   ungated surfaces (opencode-go), which keep the client's session unchanged (#15311).
 * @param options.v2Fingerprint - Opt-in OpenCode v2 client fingerprint
 *   (`OPENCODE_V2_CLIENT_FINGERPRINT_ENABLED`, #16571). A client UA is kept only when it is
 *   a 2.x OpenCode client, and on a gated free-tier request (`reencodeSession`) the v1-only
 *   `x-opencode-request` is dropped and the session is mirrored onto
 *   `x-opencode-session-id` / `x-session-affinity` / `x-session-id`, as the v2 CLI sends it.
 *   Off: unchanged.
 */
export function forwardOpencodeClientHeaders(
  headers: Record<string, string>,
  clientHeaders: Record<string, string>,
  options?: {
    synthesizeRequestId?: boolean;
    cliDefaults?: { userAgent: string; client: string; project: string };
    keepAgentUserAgent?: boolean;
    sessionBody?: OpencodeSessionBody;
    forwardUserAgent?: boolean;
    reencodeSession?: boolean;
    v2Fingerprint?: boolean;
  }
): void {
  // 1. Forward User-Agent (opt-out for generic providers, #15632)
  const clientUA = clientHeaders["User-Agent"] || clientHeaders["user-agent"];
  if (clientUA && options?.forwardUserAgent !== false) {
    setUserAgentHeader(headers, clientUA);
  }

  // 2. Forward x-opencode-* metadata headers
  for (const headerName of OPENCODE_HEADER_KEYS) {
    const value = findHeader(clientHeaders, headerName);
    if (value) {
      setForwardedHeader(headers, headerName, value);
    }
  }

  // 2b. Forward agent-metadata headers (x-session-id, x-title, http-referer) — 9router#2413.
  // http-referer carries app attribution OpenRouter publisher gates key on (e.g. the
  // thinkingmachines/inkling:free "agentic harnesses" 403). Gated by
  // OMNIROUTE_FORWARD_ATTRIBUTION for operators who want the static identity kept.
  if (attributionForwardingEnabled()) {
    for (const headerName of AGENT_METADATA_HEADER_KEYS) {
      const value = findHeader(clientHeaders, headerName);
      if (!value) continue;
      setForwardedHeader(headers, headerName, value);
    }
  }

  // 3. OpencodeExecutor-only: synthesize session/request id from fallback headers
  if (options?.synthesizeRequestId || options?.cliDefaults) {
    applySessionFallback(headers, clientHeaders, options.sessionBody);
  }

  // 4. OpencodeExecutor-only: synthesize the OpenCode CLI identity Cloudflare expects
  //    on VPS egress, for any key the client did not supply (#5997).
  if (options?.cliDefaults) {
    applyCliDefaults(
      headers,
      options.cliDefaults,
      options.sessionBody,
      options.keepAgentUserAgent === true,
      options.reencodeSession === true,
      options.v2Fingerprint === true
    );
  }
}

/** Fill missing session/request identity without changing the CLI synthesis policy. */
function applySessionFallback(
  headers: Record<string, string>,
  clientHeaders: Record<string, string>,
  sessionBody?: OpencodeSessionBody
): void {
  if (headers["x-opencode-session"]) return;
  const sessionAffinity = resolveOpencodeSessionIdentity(clientHeaders, sessionBody);
  if (!sessionAffinity) return;
  // Keep the caller's identity as-is when CLI synthesis is disabled; applyCliDefaults
  // renders it in the canonical shape only when that policy is enabled.
  headers["x-opencode-session"] = sessionAffinity;
  headers["x-opencode-request"] ||= randomUUID();
}

/**
 * Fill the OpenCode CLI identity headers Cloudflare requires on VPS egress. For
 * x-opencode-* headers, client values always win (defaults only fill gaps). The
 * User-Agent is the exception: a non-CLI client UA (curl, python, SDKs) is replaced
 * with the synthesized CLI UA, because opencode.ai's free tier flags generic client
 * UAs from datacenter IPs (FreeUsageLimitError 429). A client UA that already looks
 * like the OpenCode CLI (opencode-cli/...) is preserved so the real CLI's versioned
 * identity stays intact. (#5997, follow-up)
 */
/**
 * Whether the client's User-Agent survives CLI synthesis. A UA that satisfies the upstream
 * contract is always kept; the previous rule kept anything starting with `opencode-cli/`,
 * which carries no parsable version and is refused by the free tier. With
 * `keepAgentUserAgent` (OpenCode Go, #15311) an agent's own UA is kept too, because Go asks
 * third-party agents to identify themselves — but never a generic SDK / HTTP-library UA.
 */
function keepsClientUserAgent(
  userAgent: string | undefined,
  keepAgentUserAgent: boolean,
  v2Fingerprint = false
) {
  if (satisfiesOpencodeUserAgentContract(userAgent, v2Fingerprint)) return true;
  return keepAgentUserAgent && !isGenericClientUserAgent(userAgent);
}

function applyCliDefaults(
  headers: Record<string, string>,
  cliDefaults: { userAgent: string; client: string; project: string },
  sessionBody?: OpencodeSessionBody,
  keepAgentUserAgent = false,
  reencodeSession = false,
  v2Fingerprint = false
): void {
  const clientUA = headers["User-Agent"] || headers["user-agent"];
  if (!keepsClientUserAgent(clientUA, keepAgentUserAgent, v2Fingerprint)) {
    setUserAgentHeader(headers, cliDefaults.userAgent);
  }
  headers["x-opencode-client"] ||= cliDefaults.client;
  headers["x-opencode-project"] ||= cliDefaults.project;
  // Both ids go out in the canonical shape. A client value already in that shape is kept;
  // anything else (a UUID from a generic client, an opaque conversation key) is translated
  // deterministically, so one client conversation still maps to one upstream session.
  const clientRequestId = headers["x-opencode-request"]?.trim();
  headers["x-opencode-request"] =
    clientRequestId && OPENCODE_REQUEST_PATTERN.test(clientRequestId)
      ? clientRequestId
      : canonicalId("msg_", clientRequestId || undefined);
  // The free tier (zen) validates the session's *value*, not just its shape: a caller id
  // that matches `OPENCODE_SESSION_PATTERN` but carries an out-of-window counter (a
  // foreign or ascending encoding) still 403s upstream, so on that path only a genuine
  // descending id is kept and everything else is re-minted from the client's own value
  // (opencode2api v1.3.8 `CanonicalSessionID` — same conversation, same stable session,
  // compliant encoding). The ungated surfaces (opencode-go, #15311) keep the client's
  // session untouched, so the value check applies only when `reencodeSession` is set.
  const clientSessionId = headers["x-opencode-session"]?.trim();
  const canonicalClientSession = reencodeSession
    ? isValidOpencodeSessionValue(clientSessionId)
    : clientSessionId && OPENCODE_SESSION_PATTERN.test(clientSessionId)
      ? clientSessionId
      : undefined;
  const session = clientSessionId
    ? (canonicalClientSession ?? canonicalId("ses_", clientSessionId))
    : canonicalId("ses_", generateSessionId(sessionBody ?? null) ?? undefined);
  headers["x-opencode-session"] = session;
  if (v2Fingerprint && reencodeSession) applyV2FreeTierSessionHeaders(headers, session);
}

/**
 * v2 fingerprint on a gated free-tier request (#16571): the v2 CLI sends no
 * `x-opencode-request` (a v1-only header) and carries its session on three more headers.
 */
function applyV2FreeTierSessionHeaders(headers: Record<string, string>, session: string): void {
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === "x-opencode-request") delete headers[key];
  }
  headers["x-opencode-session-id"] = session;
  headers["x-session-affinity"] = session;
  headers["x-session-id"] = session;
}

/**
 * Build outbound headers for OmniRoute's BACKGROUND calls to opencode.ai —
 * model-catalog discovery (autoSync/autoFetchModels), quota checks, and any
 * other non-chat fetch. These calls previously went out on the bare runtime
 * fetch (User-Agent "Bun fetch") with no `x-opencode-session`, which is exactly
 * the shape OpenCode's operator warning names ("requests missing an
 * x-opencode-session header", UA "Bun fetch"; hard errors announced from
 * 2026-09-06).
 *
 * Background traffic has no conversation, so the caller passes the raw
 * connection/workspace seed and applyCliDefaults() canonicalizes it into the
 * deterministic `ses_…` shape — the same id contract the chat path enforces
 * (#10571 follow-up) — so each connection's background traffic groups under
 * one identity across daemon restarts instead of looking like a new anonymous
 * client per call.
 * The User-Agent is synthesized to the OpenCode CLI identity for the same
 * reason applyCliDefaults() does it on the chat path (#5997): generic runtime
 * UAs from non-CLI callers get flagged upstream.
 */
export function buildOpencodeBackgroundHeaders(options?: {
  /** Stable seed for the per-caller session id (connection id / workspace id). */
  seed?: string | null;
  /** Explicit UA override (defaults to the OpenCode CLI identity). */
  userAgent?: string;
}): Record<string, string> {
  const headers: Record<string, string> = {};
  // Seed the session BEFORE applyCliDefaults so its canonicalizer derives the
  // deterministic `ses_…` id from the raw seed (sha256 over the workspace /
  // connection) — the header then carries the same canonical shape as the chat
  // path while the identity stays stable across daemon restarts.
  const seed = options?.seed?.trim();
  if (seed && seed.length > 0) headers["x-opencode-session"] = seed;
  applyCliDefaults(headers, {
    userAgent: options?.userAgent?.trim() || process.env.OPENCODE_USER_AGENT?.trim() || "opencode",
    client: process.env.OPENCODE_CLIENT?.trim() || "desktop",
    project: process.env.OPENCODE_PROJECT?.trim() || "global",
  });
  return headers;
}
