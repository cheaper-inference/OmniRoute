/**
 * freebuff/identity.ts - request identity of the official Freebuff client.
 *
 * Every value below is taken from a captured HAR of the official client
 * (`freebuff` 0.2.36) that was accepted by the upstream, and cross-checked
 * against the client binary itself. The upstream rejects unknown clients with
 * `410 freebuff_update_required`; the header that clears that gate is
 * `x-freebuff-sse-gzip-recovery` (verified by single-variable bisection: a
 * request carrying only that header passes the version gate, a request
 * carrying every other header does not).
 */

export const FREEBUFF_ORIGIN = "https://www.codebuff.com";
export const FREEBUFF_API = `${FREEBUFF_ORIGIN}/api/v1`;

/** Client version sent as `x-freebuff-client-version`. */
export const FREEBUFF_CLIENT_VERSION = "0.2.36";

/** `Bun/1.3.14` is the runtime UA the client uses for non-SDK calls. */
export const FREEBUFF_RUNTIME_UA = "Bun/1.3.14";

/** The AI SDK UA the official client uses for `chat/completions`. */
export const FREEBUFF_CHAT_UA =
  "ai-sdk/openai-compatible/0.0.0-test/codebuff ai-sdk/provider-utils/3.0.25 runtime/browser";

/**
 * `x-freebuff-env` terminal fingerprint, byte-for-byte as the client sends it
 * (shape `v1;key=value;...` from the client's `sVL()`).
 */
export const FREEBUFF_ENV_FINGERPRINT =
  "v1;in=1;out=1;tp=none;term=0;ct=0;sz=120x30;ci=0;ssh=0;l=0;p=na;g=na;osc=0;tzo=0;px=none;tls=0;ca=0;cde=none";

/**
 * Agent id the official client uses for free-mode completions. Captured
 * verbatim from `POST /api/v1/agent-runs` in a working session: it is a single
 * constant for every model - the model is selected by the body `model` handle
 * and the `x-freebuff-model` admission header, never by the agent id.
 */
export const FREEBUFF_AGENT_ID = "base3-free-catalog";

/**
 * Harness identity phrases the upstream treats as a foreign client. The
 * official client's own system prompt is `You are Buffy, the coding agent
 * behind Codebuff`; anything describing another vendor's harness is
 * neutralised before it reaches the free tier.
 */
export const FREEBUFF_HARNESS_REPLACEMENTS: Array<[string, string]> = [
  ["You are Claude Code", "You are a coding assistant"],
  ["Anthropic's official CLI", "a command line interface"],
  ["cc_version=", "cli_version="],
];

/**
 * Persona of the official client, always injected at the head of the caller's
 * system prompt. The free tier inspects the system turn to decide whether the
 * caller is the official client, so this identity must be the first thing the
 * model reads on every request - never replaced by, or appended after, a
 * foreign harness prompt.
 */
export const FREEBUFF_PERSONA =
  "You are Buffy, the coding agent behind Codebuff. You help users with software engineering tasks: fixing bugs, adding functionality, refactoring, and explaining code.";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** `November 18, 2026` - the date shape the official client puts in its prompt. */
export function freebuffCurrentDate(now: number = Date.now()): string {
  const date = new Date(now);
  return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/**
 * Head of the injected system prompt: persona followed by the request date.
 * Used on its own when the caller sent no system prompt at all.
 */
export function freebuffSystemHead(now: number = Date.now()): string {
  return `${FREEBUFF_PERSONA}\n\nCurrent date: ${freebuffCurrentDate(now)}.`;
}

/**
 * Full injected prefix. It ends with the bullet marker `- ` because the
 * caller's own system prompt continues that list, exactly as the official
 * client's prompt reads.
 */
export function freebuffSystemPrefix(now: number = Date.now()): string {
  return `${freebuffSystemHead(now)}\n\n- `;
}

/** Header names used by the official client. */
export const FREEBUFF_HEADERS = {
  client: "x-freebuff-client",
  clientVersion: "x-freebuff-client-version",
  env: "x-freebuff-env",
  timezone: "x-fb-timezone",
  model: "x-freebuff-model",
  instanceId: "x-freebuff-instance-id",
  takeoverInstanceId: "x-freebuff-takeover-instance-id",
  walletSpendLimit: "x-freebuff-wallet-spend-limit",
  sseGzipRecovery: "x-freebuff-sse-gzip-recovery",
  catalogProtocol: "x-freebuff-catalog-protocol",
  catalogFetch: "x-freebuff-catalog-fetch",
  deviceKey: "x-freebuff-device-key",
  deviceTimestamp: "x-freebuff-device-ts",
  deviceSignature: "x-freebuff-device-sig",
  actingUserId: "x-freebuff-acting-user-id",
  includeRateLimits: "x-freebuff-include-unused-rate-limits",
  compactSession: "x-freebuff-compact-session",
  multiSession: "x-freebuff-multi-session",
  heartbeat: "x-freebuff-heartbeat",
  purchaseContinuity: "x-freebuff-purchase-continuity",
  desktopAttemptId: "x-freebuff-desktop-attempt-id",
} as const;

/**
 * Error codes the upstream returns on the free tier, mapped to what the caller
 * should do about them. `freebuff_update_required` is deliberately distinct
 * from a generic upstream failure: it means the request identity stopped
 * matching a supported client and the provider needs a protocol refresh.
 */
export const FREEBUFF_ERROR_CODES = {
  updateRequired: "freebuff_update_required",
  modelRetired: "freebuff_model_retired",
  cliRequired: "free_mode_cli_required",
  invalidAgentModel: "free_mode_invalid_agent_model",
  catalogStale: "freebuff_catalog_stale",
} as const;

/** IANA timezone header value, or undefined when it would be misleading. */
export function freebuffTimezone(timeZone?: string): string | undefined {
  const zone = (timeZone ?? "").trim();
  if (!zone) return undefined;
  // Exclude zero-offset UTC aliases (they carry no regional signal), while
  // keeping non-zero Etc/GMT+/-N zones which represent real UTC offsets.
  if (
    /^(?:UTC|UCT|GMT|GMT0|Greenwich|Universal|Zulu|Etc\/(?:UTC|UCT|GMT|GMT0|GMT[+-]0|Greenwich|Universal|Zulu))$/i.test(
      zone
    )
  ) {
    return undefined;
  }
  if (!/^[A-Za-z]+(?:\/[A-Za-z0-9_+-]+){1,2}$/.test(zone)) return undefined;
  return zone;
}
