/**
 * Client agent classifier for the agent guard.
 *
 * Names the client agent that sent a request from a fixed list of HTTP headers.
 * Pure: no I/O, no state. Only the headers listed in `readSignals` are read, so
 * credentials (`authorization`, `x-api-key`, `cookie`) never reach the result.
 * The referer is kept without its query, fragment and userinfo.
 *
 * "unknown" is not "third-party": a bare curl or an unrecognized client is
 * `unknown`, with `thirdParty: false`. The `x-stainless-*` fingerprint is
 * recorded but never makes a client official on its own.
 */

type AgentName =
  | "claude-code"
  | "anthropic-sdk"
  | "kilocode"
  | "cline"
  | "roo-code"
  | "opencode"
  | "aider"
  | "unknown";

export type AgentClassification = {
  agent: AgentName;
  /** Official Anthropic client (Claude Code or a first-party SDK). */
  official: boolean;
  /** Positively identified as a known third-party agent. */
  thirdParty: boolean;
  /** Raw header values that drove the decision, each capped at 200 characters. */
  signals: {
    userAgent: string;
    xApp: string;
    anthropicBeta: string;
    xTitle: string;
    referer: string;
    stainless: boolean;
  };
};

type HeadersLike = Headers | Record<string, unknown> | null | undefined;
type Signals = AgentClassification["signals"];

const MAX_SIGNAL_LENGTH = 200;

const STAINLESS_HEADERS = [
  "x-stainless-lang",
  "x-stainless-package-version",
  "x-stainless-runtime",
];

/** Known third-party agent tokens. Order matters: the first rule that matches wins. */
const THIRD_PARTY_RULES: ReadonlyArray<{ agent: AgentName; tokens: readonly string[] }> = [
  { agent: "kilocode", tokens: ["kilo-code", "kilocode", "kilo code"] },
  { agent: "roo-code", tokens: ["roo-code", "roo code", "roocode"] },
  { agent: "cline", tokens: ["cline"] },
  { agent: "opencode", tokens: ["opencode"] },
  { agent: "aider", tokens: ["aider"] },
];

const OFFICIAL_SDK_PREFIXES = [
  "anthropic/",
  "asyncanthropic/",
  "anthropic-typescript/",
  "anthropic-python/",
];

function readHeader(headers: HeadersLike, name: string): string {
  if (!headers) return "";
  if (typeof (headers as Headers).get === "function") {
    return (headers as Headers).get(name) ?? "";
  }
  for (const [key, value] of Object.entries(headers as Record<string, unknown>)) {
    if (key.toLowerCase() === name && typeof value === "string") return value;
  }
  return "";
}

function readSignal(headers: HeadersLike, name: string): string {
  return readHeader(headers, name).slice(0, MAX_SIGNAL_LENGTH);
}

/**
 * A referer can carry a token in its query, its fragment or its userinfo. Only the part that
 * identifies the client page is kept: scheme, host and path. The userinfo runs to the last `@`
 * of the authority, as in the WHATWG URL parser.
 */
function refererOrigin(headers: HeadersLike): string {
  const raw = readHeader(headers, "http-referer") || readHeader(headers, "referer");
  const cut = raw.search(/[?#]/);
  const withoutQuery = cut === -1 ? raw : raw.slice(0, cut);
  return withoutQuery.replace(/^([a-z][a-z0-9+.-]*:\/\/)[^/]*@/i, "$1").slice(0, MAX_SIGNAL_LENGTH);
}

function readSignals(headers: HeadersLike): Signals {
  return {
    userAgent: readSignal(headers, "user-agent"),
    xApp: readSignal(headers, "x-app"),
    anthropicBeta: readSignal(headers, "anthropic-beta"),
    xTitle: readSignal(headers, "x-title"),
    referer: refererOrigin(headers),
    stainless: STAINLESS_HEADERS.some((name) => readHeader(headers, name) !== ""),
  };
}

function isWordChar(char: string | undefined): boolean {
  if (char === undefined) return false;
  return (char >= "a" && char <= "z") || (char >= "0" && char <= "9");
}

/** True when `token` occurs in `haystack` with no `[a-z0-9]` character on either side. */
function containsWord(haystack: string, token: string): boolean {
  let index = haystack.indexOf(token);
  while (index !== -1) {
    const before = index > 0 ? haystack[index - 1] : undefined;
    const after = haystack[index + token.length];
    if (!isWordChar(before) && !isWordChar(after)) return true;
    index = haystack.indexOf(token, index + 1);
  }
  return false;
}

function matchThirdParty(signals: Signals): AgentName | null {
  // "\n" is a word boundary that no token contains, so a token never spans two fields.
  const haystack = [signals.userAgent, signals.xTitle, signals.referer].join("\n").toLowerCase();
  for (const rule of THIRD_PARTY_RULES) {
    if (rule.tokens.some((token) => containsWord(haystack, token))) return rule.agent;
  }
  return null;
}

function isClaudeCode(signals: Signals): boolean {
  const ua = signals.userAgent.toLowerCase();
  if (ua.startsWith("claude-cli/") || ua.startsWith("claude-code/")) return true;
  if (signals.xApp.toLowerCase() !== "cli") return false;
  return signals.anthropicBeta !== "" || ua.includes("claude");
}

function isOfficialSdk(signals: Signals): boolean {
  const ua = signals.userAgent.toLowerCase();
  return OFFICIAL_SDK_PREFIXES.some((prefix) => ua.startsWith(prefix));
}

export function classifyClientAgent(headers: HeadersLike): AgentClassification {
  const signals = readSignals(headers);
  const thirdParty = matchThirdParty(signals);
  if (thirdParty) return { agent: thirdParty, official: false, thirdParty: true, signals };
  if (isClaudeCode(signals)) {
    return { agent: "claude-code", official: true, thirdParty: false, signals };
  }
  if (isOfficialSdk(signals)) {
    return { agent: "anthropic-sdk", official: true, thirdParty: false, signals };
  }
  return { agent: "unknown", official: false, thirdParty: false, signals };
}
