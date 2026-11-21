import { getRuntimeArch, getRuntimePlatform } from "./providerHeaderProfiles.ts";
import { getCliVersionOverride, type CliVersionSource } from "./cliVersions.ts";
import { canStartBackgroundRefresh } from "@/shared/utils/backgroundRefresh";

export {
  GROK_BUILD_PROXY_BASE_URL,
  GROK_BUILD_RESPONSES_URL,
  GROK_BUILD_MODELS_URL,
} from "./grokBuildEndpoints.ts";

export const GROK_BUILD_OAUTH_ISSUER = "https://auth.x.ai";
export const GROK_BUILD_DEVICE_CODE_URL = `${GROK_BUILD_OAUTH_ISSUER}/oauth2/device/code`;
export const GROK_BUILD_TOKEN_URL = `${GROK_BUILD_OAUTH_ISSUER}/oauth2/token`;

export const GROK_BUILD_DEFAULT_CLIENT_VERSION = "1.0.89";
export const GROK_BUILD_DEFAULT_REASONING_EFFORT = "high";
export const GROK_BUILD_SUPPORTED_REASONING_EFFORTS = Object.freeze([
  "low",
  "medium",
  "high",
  "xhigh",
]);
// `grok-shell` is the identity Grok Build uses on the models / OAuth faces; the
// chat turns (`/v1/responses`) run as `grok-pager` with an `interactive` mode
// (captured from the real CLI 1.0.89, which also double-reports both names in
// the User-Agent: `grok-pager/<v> grok-shell/<v> (windows; x86_64)`).
export const GROK_BUILD_CLIENT_IDENTIFIER = "grok-shell";
export const GROK_BUILD_PAGER_IDENTIFIER = "grok-pager";
export const GROK_BUILD_TOKEN_AUTH = "xai-grok-cli";
export const GROK_BUILD_REASONING_INCLUDE = "reasoning.encrypted_content";
export const GROK_BUILD_NO_INLINE_CITATIONS = "no_inline_citations";
export const GROK_BUILD_OAUTH_REFERRER = "grok-build";

export const GROK_BUILD_OAUTH_SCOPES = Object.freeze([
  "openid",
  "profile",
  "email",
  "offline_access",
  "grok-cli:access",
  "api:access",
  "conversations:read",
  "conversations:write",
  "workspaces:read",
  "workspaces:write",
]);

export type GrokBuildClientMode = "headless" | "interactive";
export type GrokBuildClientSurface = "ui" | "cli" | "headless";

export type GrokBuildSessionHeaderOptions = {
  token?: string | null;
  model?: string | null;
  stream?: boolean;
  clientMode?: GrokBuildClientMode;
  userId?: string | null;
  email?: string | null;
  principalType?: string | null;
  /** Internal connection id; drives the per-connection trace and loop headers. */
  connectionId?: string | null;
};

function getWireEmail(email?: string | null, principalType?: string | null): string | null {
  const normalizedPrincipalType = principalType?.trim().toLowerCase();
  return normalizedPrincipalType === "team" || normalizedPrincipalType === "organization"
    ? null
    : email || null;
}

function mapPlatform(platform: string): string {
  if (platform === "darwin") return "macos";
  if (platform === "win32") return "windows";
  return platform;
}

function mapArch(arch: string): string {
  if (arch === "arm64") return "aarch64";
  if (arch === "x64") return "x86_64";
  return arch;
}

const GROK_CLIENT_VERSION_PATTERN =
  /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

/**
 * Shared version validator: same SemVer rules for the env var, the discovered
 * x.ai/cli/<channel> pointer and the test seams. Rejects line breaks, oversized
 * values and numeric prerelease identifiers with leading zeros.
 */
function isValidGrokBuildClientVersion(version: string): boolean {
  if (!version || version.length > 128) return false;
  const match = GROK_CLIENT_VERSION_PATTERN.exec(version);
  if (!match) return false;
  if (match[4]?.split(".").some((identifier) => /^0[0-9]+$/.test(identifier))) return false;
  return true;
}

function parseGrokBuildVersionResponse(text: string): string | null {
  const version = text.trim();
  return isValidGrokBuildClientVersion(version) ? version : null;
}

function compareGrokBuildVersions(left: string, right: string): number {
  const toNumbers = (value: string): number[] =>
    value
      .split(".")
      .slice(0, 3)
      .map((part) => Number.parseInt(part, 10) || 0);
  const leftParts = toNumbers(left);
  const rightParts = toNumbers(right);
  for (let index = 0; index < 3; index++) {
    const delta = leftParts[index] - rightParts[index];
    if (delta !== 0) return delta;
  }
  return 0;
}

export type GrokBuildClientVersionFetch = (input: string, init?: RequestInit) => Promise<Response>;

export const GROK_BUILD_CLI_CHANNELS = Object.freeze(["stable", "alpha", "enterprise"] as const);
export type GrokBuildCliChannel = (typeof GROK_BUILD_CLI_CHANNELS)[number];

const GROK_BUILD_DEFAULT_CHANNEL: GrokBuildCliChannel = "stable";
const GROK_BUILD_VERSION_PRIMARY_URL = "https://x.ai/cli";
const GROK_BUILD_VERSION_FALLBACK_URL =
  "https://storage.googleapis.com/grok-build-public-artifacts/cli";
const GROK_BUILD_VERSION_CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours
const GROK_BUILD_VERSION_RETRY_AFTER_FAILURE_MS = 15 * 60 * 1000; // 15 minutes
const GROK_BUILD_VERSION_FETCH_TIMEOUT_MS = 10_000;
const GROK_BUILD_VERSION_MAX_BODY_BYTES = 1024;

/** The distribution channel whose latest version we advertise (x.ai/cli/stable). */
export function getGrokBuildCliChannel(): GrokBuildCliChannel {
  const raw = process.env.GROK_CLI_CHANNEL?.trim().toLowerCase() || "";
  return (GROK_BUILD_CLI_CHANNELS as readonly string[]).includes(raw)
    ? (raw as GrokBuildCliChannel)
    : GROK_BUILD_DEFAULT_CHANNEL;
}

type GrokBuildVersionCache = { version: string; fetchedAt: number } | null;
let grokBuildVersionCache: GrokBuildVersionCache = null;
let grokBuildVersionInFlight: Promise<string> | null = null;
let grokBuildVersionLookupFailedAt = 0;

async function readGrokBuildVersionBody(response: Response): Promise<string | null> {
  if (!response.body) return null;
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > GROK_BUILD_VERSION_MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        return null;
      }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

async function fetchGrokBuildChannelPointer(
  fetchImpl: GrokBuildClientVersionFetch,
  url: string
): Promise<string | null> {
  try {
    const response = await fetchImpl(url, {
      headers: {
        Accept: "text/plain",
        "User-Agent": "OmniRoute-GrokVersion/1.0",
      },
      signal: AbortSignal.timeout(GROK_BUILD_VERSION_FETCH_TIMEOUT_MS),
      redirect: "error",
    });
    if (!response.ok) return null;
    return parseGrokBuildVersionResponse((await readGrokBuildVersionBody(response)) ?? "");
  } catch {
    return null;
  }
}

/**
 * Resolve the latest Grok Build CLI version from the same plain-text pointer the
 * official installer (`x.ai/cli/install.sh`) uses, with the public GCS mirror as
 * a fallback. The primary is `https://x.ai/cli/<channel>`; `alpha` and
 * `enterprise` channels exist and are selectable via `GROK_CLI_CHANNEL`.
 *
 * A fetched version newer than the pin replaces it; any failure, a malformed
 * pointer, or an older version keeps the pin. Cached for six hours.
 */
export function resolveGrokBuildClientVersion(
  fetchImpl: GrokBuildClientVersionFetch = fetch
): Promise<string> {
  const now = Date.now();
  if (
    grokBuildVersionCache &&
    now - grokBuildVersionCache.fetchedAt < GROK_BUILD_VERSION_CACHE_TTL_MS
  ) {
    return Promise.resolve(pickGrokBuildVersionAtLeastPin(grokBuildVersionCache.version));
  }
  if (grokBuildVersionInFlight) return grokBuildVersionInFlight;

  grokBuildVersionInFlight = (async () => {
    const channel = getGrokBuildCliChannel();
    const primary = await fetchGrokBuildChannelPointer(
      fetchImpl,
      `${GROK_BUILD_VERSION_PRIMARY_URL}/${channel}`
    );
    const fetched =
      primary ??
      (await fetchGrokBuildChannelPointer(
        fetchImpl,
        `${GROK_BUILD_VERSION_FALLBACK_URL}/${channel}`
      ));
    const version = pickGrokBuildVersionAtLeastPin(
      fetched ?? grokBuildVersionCache?.version ?? null
    );
    if (fetched) {
      grokBuildVersionCache = { version, fetchedAt: Date.now() };
      grokBuildVersionLookupFailedAt = 0;
    } else {
      grokBuildVersionLookupFailedAt = Date.now();
    }
    return version;
  })();

  return grokBuildVersionInFlight.finally(() => {
    grokBuildVersionInFlight = null;
  });
}

function pickGrokBuildVersionAtLeastPin(candidate: string | null): string {
  if (candidate && compareGrokBuildVersions(candidate, GROK_BUILD_DEFAULT_CLIENT_VERSION) > 0) {
    return candidate;
  }
  return GROK_BUILD_DEFAULT_CLIENT_VERSION;
}

export function getCachedGrokBuildClientVersion(): string {
  return pickGrokBuildVersionAtLeastPin(grokBuildVersionCache?.version ?? null);
}

export function seedGrokBuildClientVersionCache(version: string, fetchedAt = Date.now()): void {
  const parsed = parseGrokBuildVersionResponse(version);
  if (!parsed) {
    throw new TypeError(`Invalid Grok Build client version: ${version}`);
  }
  grokBuildVersionCache = { version: parsed, fetchedAt };
}

export function resetGrokBuildClientVersionCache(): void {
  grokBuildVersionCache = null;
  grokBuildVersionInFlight = null;
  grokBuildVersionLookupFailedAt = 0;
}

/**
 * The version OmniRoute advertises on the wire, highest priority first:
 *   1. the dashboard override (`settings.cliVersionOverrides["grok-cli"]`),
 *   2. the `GROK_CLI_CLIENT_VERSION` env var,
 *   3. a discovered `x.ai/cli/<channel>` version newer than the pin,
 *   4. the captured default pin.
 */
export function getGrokBuildClientVersion(): string {
  const override = getCliVersionOverride("grok-cli");
  if (override) return override;

  const raw = process.env.GROK_CLI_CLIENT_VERSION || "";
  if (!/[\r\n]/.test(raw) && isValidGrokBuildClientVersion(raw.trim())) {
    return raw.trim();
  }

  if (
    grokBuildVersionCache &&
    compareGrokBuildVersions(grokBuildVersionCache.version, GROK_BUILD_DEFAULT_CLIENT_VERSION) >= 0
  ) {
    return grokBuildVersionCache.version;
  }

  if (
    canStartBackgroundRefresh() &&
    !process.env.NODE_TEST_CONTEXT &&
    !grokBuildVersionCache &&
    !grokBuildVersionInFlight &&
    Date.now() - grokBuildVersionLookupFailedAt >= GROK_BUILD_VERSION_RETRY_AFTER_FAILURE_MS
  ) {
    void resolveGrokBuildClientVersion();
  }
  return getCachedGrokBuildClientVersion();
}

/**
 * Which layer produced `getGrokBuildClientVersion()` right now. Side-effect
 * free: unlike the resolver it never starts a background refresh.
 */
export function getGrokBuildClientVersionSource(): CliVersionSource {
  if (getCliVersionOverride("grok-cli")) return "settings";
  const raw = process.env.GROK_CLI_CLIENT_VERSION || "";
  if (!/[\r\n]/.test(raw) && isValidGrokBuildClientVersion(raw.trim())) return "env";
  const cached = getCachedGrokBuildClientVersion();
  return cached !== GROK_BUILD_DEFAULT_CLIENT_VERSION ? "discovered" : "default";
}

function buildGrokBuildUserAgent(identifier: string, version: string): string {
  const base = `${mapPlatform(getRuntimePlatform())}; ${mapArch(getRuntimeArch())}`;
  if (identifier === GROK_BUILD_PAGER_IDENTIFIER) {
    return `grok-pager/${version} grok-shell/${version} (${base})`;
  }
  return `${identifier}/${version} (${base})`;
}

/** User-Agent for the chat (`/v1/responses`) face, as captured from CLI 1.0.89. */
export function getGrokBuildUserAgent(): string {
  return buildGrokBuildUserAgent(GROK_BUILD_PAGER_IDENTIFIER, getGrokBuildClientVersion());
}

/** User-Agent for the models / OAuth faces (grok-shell identity only). */
export function getGrokBuildShellUserAgent(): string {
  return buildGrokBuildUserAgent(GROK_BUILD_CLIENT_IDENTIFIER, getGrokBuildClientVersion());
}

/** grok-shell identity (models discovery / OAuth): headless by default. */
export function getGrokBuildClientHeaders(
  clientMode: GrokBuildClientMode = "headless"
): Record<string, string> {
  return {
    "x-grok-client-version": getGrokBuildClientVersion(),
    "x-grok-client-identifier": GROK_BUILD_CLIENT_IDENTIFIER,
    "x-grok-client-mode": clientMode,
    "User-Agent": getGrokBuildShellUserAgent(),
  };
}

/** grok-pager identity (chat turns): interactive by default, matching the CLI. */
export function getGrokBuildTurnHeaders(
  clientMode: GrokBuildClientMode = "interactive"
): Record<string, string> {
  return {
    "x-grok-client-version": getGrokBuildClientVersion(),
    "x-grok-client-identifier": GROK_BUILD_PAGER_IDENTIFIER,
    "x-grok-client-mode": clientMode,
    "User-Agent": getGrokBuildUserAgent(),
  };
}

export function getGrokBuildSessionHeaders({
  token,
  model,
  stream = false,
  clientMode = "interactive",
  userId,
  connectionId,
}: GrokBuildSessionHeaderOptions = {}): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
    ...getGrokBuildTurnHeaders(clientMode),
    "X-XAI-Token-Auth": GROK_BUILD_TOKEN_AUTH,
    "x-authenticateresponse": "authenticate-response",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(model ? { "x-grok-model-override": model } : {}),
    // Chat turns identify the account with `x-grok-user-id` only; the redundant
    // `x-userid` / `x-email` stay on the models face (captured CLI 1.0.89).
    ...(userId ? { "x-grok-user-id": userId } : {}),
    ...(connectionId ? getGrokBuildTurnTraceHeaders(connectionId) : {}),
    ...(connectionId ? getGrokBuildLoopHeaders(connectionId, model) : {}),
  };
}

export function getGrokBuildOAuthHeaders(
  surface: GrokBuildClientSurface = "ui"
): Record<string, string> {
  return {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    "x-grok-client-version": getGrokBuildClientVersion(),
    "x-grok-client-surface": surface,
  };
}

export function getGrokBuildModelsHeaders({
  token,
  userId,
  email,
  principalType,
}: Pick<GrokBuildSessionHeaderOptions, "token" | "userId" | "email" | "principalType">): Record<
  string,
  string
> {
  const wireEmail = getWireEmail(email, principalType);
  return {
    Accept: "application/json",
    ...getGrokBuildClientHeaders("headless"),
    "X-XAI-Token-Auth": GROK_BUILD_TOKEN_AUTH,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(userId ? { "x-userid": userId } : {}),
    ...(wireEmail ? { "x-email": wireEmail } : {}),
  };
}

// ── Context window: flexible, registry-first, live-captured ────────────────

/**
 * Top Grok Build tier the backend serves for grok-4.x (the registry window; the
 * /v1/models `context_window` scalar under-advertises 256000 — see #15412).
 */
export const GROK_BUILD_DEFAULT_CONTEXT_WINDOW = 500000;
const GROK_BUILD_CONTEXT_WINDOW_MAX = 2_000_000;

/** Operator-set window that wins over discovery and the registry. */
export function getGrokBuildContextWindowOverride(): number | null {
  const raw = process.env.GROK_CLI_CONTEXT_WINDOW || "";
  if (!/^[0-9]+$/.test(raw.trim())) return null;
  const parsed = Number.parseInt(raw.trim(), 10);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > GROK_BUILD_CONTEXT_WINDOW_MAX) {
    return null;
  }
  return parsed;
}

interface GrokBuildLiveWindowEntry {
  window: number;
  capturedAt: number;
}

// Live `x-grok-context-window` response headers, keyed by connection + model.
// Read-only on the inference path; recorded by GrokCliExecutor.execute().
const grokBuildLiveWindowsByConnectionModel = new Map<string, GrokBuildLiveWindowEntry>();
const GROK_BUILD_LIVE_WINDOWS_MAX = 2048;

function grokBuildLiveWindowKey(connectionId: string, model: string): string {
  return `${connectionId}\u0000${model}`;
}

export function recordGrokBuildLiveContextWindow(
  connectionId: string,
  model: string,
  window: number
): void {
  if (
    !connectionId ||
    !model ||
    !Number.isFinite(window) ||
    window <= 0 ||
    window > GROK_BUILD_CONTEXT_WINDOW_MAX
  ) {
    return;
  }
  if (grokBuildLiveWindowsByConnectionModel.size >= GROK_BUILD_LIVE_WINDOWS_MAX) {
    const firstKey = grokBuildLiveWindowsByConnectionModel.keys().next().value;
    if (firstKey !== undefined) grokBuildLiveWindowsByConnectionModel.delete(firstKey);
  }
  grokBuildLiveWindowsByConnectionModel.set(grokBuildLiveWindowKey(connectionId, model), {
    window: Math.floor(window),
    capturedAt: Date.now(),
  });
}

export function getGrokBuildLiveContextWindow(
  connectionId: string | null | undefined,
  model: string | null | undefined
): number | null {
  if (!connectionId || !model) return null;
  const entry = grokBuildLiveWindowsByConnectionModel.get(
    grokBuildLiveWindowKey(connectionId, model)
  );
  return entry ? entry.window : null;
}

export function resetGrokBuildLiveContextWindowCache(): void {
  grokBuildLiveWindowsByConnectionModel.clear();
}

/**
 * The window to size loop/compaction behavior against: operator env override,
 * then the last live header captured for this connection+model, then the
 * registry top tier. NOTE: the live header is the *current* window scalar (the
 * CLI reports 256000 even on accounts that serve 500k), so it is NOT fed into
 * proactive compression — that would re-create the #15412 under-advertise bug.
 */
export function getGrokBuildEffectiveContextWindow(
  connectionId: string | null | undefined,
  model: string | null | undefined
): number {
  return (
    getGrokBuildContextWindowOverride() ??
    getGrokBuildLiveContextWindow(connectionId, model) ??
    GROK_BUILD_DEFAULT_CONTEXT_WINDOW
  );
}

const GROK_BUILD_AUTO_COMPACT_THRESHOLD_PERCENT = 80;

/** Loop / compaction-control headers sent on chat turns (captured CLI 1.0.89). */
export function getGrokBuildLoopHeaders(
  connectionId: string,
  model?: string | null
): Record<string, string> {
  const window = getGrokBuildEffectiveContextWindow(connectionId, model);
  const compactAt = Math.max(
    1,
    Math.floor((window * GROK_BUILD_AUTO_COMPACT_THRESHOLD_PERCENT) / 100)
  );
  return {
    "x-compactions-remaining": "1",
    "x-compaction-at": String(compactAt),
    "x-grok-doom-loop-check": "1024",
    "x-grok-exact-repetition-check": "64",
  };
}

// ── Per-connection turn tracing ─────────────────────────────────────────────

interface GrokBuildTraceState {
  convGroupId: string;
  convId: string;
  sessionId: string;
  agentId: string;
  turnIdx: number;
}

const grokBuildTraceStateByConnection = new Map<string, GrokBuildTraceState>();
const GROK_BUILD_TRACE_STATE_MAX = 1024;

function randomHexBytes(byteLength: number): string {
  const bytes = new Uint8Array(byteLength);
  const cryptoApi = globalThis.crypto;
  if (cryptoApi?.getRandomValues) {
    cryptoApi.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index++) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function randomGrokBuildUuid(): string {
  const hex = randomHexBytes(16);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

function getGrokBuildTraceState(connectionId: string): GrokBuildTraceState {
  let state = grokBuildTraceStateByConnection.get(connectionId);
  if (!state) {
    if (grokBuildTraceStateByConnection.size >= GROK_BUILD_TRACE_STATE_MAX) {
      const firstKey = grokBuildTraceStateByConnection.keys().next().value;
      if (firstKey !== undefined) grokBuildTraceStateByConnection.delete(firstKey);
    }
    state = {
      convGroupId: randomGrokBuildUuid(),
      convId: randomGrokBuildUuid(),
      sessionId: randomGrokBuildUuid(),
      agentId: randomGrokBuildUuid(),
      turnIdx: 0,
    };
    grokBuildTraceStateByConnection.set(connectionId, state);
  }
  return state;
}

/**
 * Trace headers the CLI sends on every chat turn. Ids are session-scoped per
 * connection (stable across turns, so xAI can group the conversation) while
 * `x-grok-req-id` and `traceparent` are per request.
 */
export function getGrokBuildTurnTraceHeaders(connectionId: string): Record<string, string> {
  const state = getGrokBuildTraceState(connectionId);
  state.turnIdx += 1;
  return {
    "x-grok-conv-group-id": state.convGroupId,
    "x-grok-conv-id": state.convId,
    "x-grok-session-id": state.sessionId,
    "x-grok-agent-id": state.agentId,
    "x-grok-req-id": randomGrokBuildUuid(),
    "x-grok-turn-idx": String(state.turnIdx),
    traceparent: `00-${randomHexBytes(16)}-${randomHexBytes(8)}-01`,
  };
}

export function resetGrokBuildTraceStateForTests(): void {
  grokBuildTraceStateByConnection.clear();
}
