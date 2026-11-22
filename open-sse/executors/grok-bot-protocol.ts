import { stripAnsiCodes } from "../utils/streamHelpers.ts";
import { randomUUID } from "node:crypto";
import { PROVIDERS } from "../config/constants.ts";
import { readConnectFrames } from "../utils/connectFrames.ts";
import { startBridgeTurn } from "./grok-bot-bridge.ts";
import type { BridgeCloseReason } from "../services/grokBotBridgeRegistry";
import { frameConnectJson } from "../utils/connectFrames.ts";

const GROK_BOT_SERVICE = "aiserver.v1.GrokBotService";
export const CREATE_TIMEOUT_MS = 45_000;
/** Remote delete is best-effort inside the request; the queue owns retries. */
export const DELETE_TIMEOUT_MS = 15_000;
export const WATCH_IDLE_TIMEOUT_MS = 240_000;
// The server silently drops watch streams that go quiet; reconnect well before
// the upstream/proxy idle cut. Measured live: a settled turn idles the stream
// within seconds, and every reconnect replays from the generation-0 baseline.
export const WATCH_READ_TIMEOUT_MS = 20_000;
/**
 * Deadline for the RPCs that start a turn (tool discovery and the send itself).
 * Without one, a stalled upstream holds the request until undici gives up.
 */
export const TURN_START_TIMEOUT_MS = 60_000;
// Connect-protocol envelope: streaming RPC request bodies are framed like the
// response (flag 0 + u32be length + JSON). Sending a bare JSON body gets
// "protocol error: incomplete envelope" (measured live 2026-09-23).
const CONNECT_TIMEOUT_HEADER_MS = "120000";
const CLIENT_HEADERS = {
  "x-cursor-client-type": "sand",
  "x-sand-box-namespace": "prod",
  "user-agent": "connect-es/1.6.1",
};

// Proto3 enum GrokBotAgentHarnessKind.TEMPORAL as its JSON numeric form. The
// server rejects the lowercase string name with HTTP 400 (measured live
// 2026-09-23); the roster echoes it back as the string "temporal".
export const HARNESS_TEMPORAL = 2;
// Client-invented session ids are rejected (404, measured); empty string means
// "the agent's current turn".
export const EMPTY_SESSION_ID = "";
// SendGrokBotUserMessage rejects text over 200000 characters (measured live
// 2026-10-06, HTTP 400 "text exceeds the maximum length of 200000"). The
// margin leaves room for the trailing instruction lines and the newlines
// joining them.
const MAX_PROMPT_CHARS = 190_000;
// SendGrokBotUserMessage requires a machineId (client-side sandbox machine
// identity). The live server accepts a random UUID. It is per-executor-instance
// (not module-level) so coexisting executor instances do not share a machine
// identity; see the review finding on cross-tenant shared state (r5).

export type Transport = {
  rpc: (method: string, payload: unknown, opts?: { signal?: AbortSignal }) => Promise<unknown>;
  watch: (
    method: string,
    payload: unknown,
    opts?: { signal?: AbortSignal }
  ) => AsyncIterable<unknown>;
};

let testTransport: Transport | ((accessToken: string) => Transport) | null = null;

/** Test seam -- production uses the fetch-based transport. */
export function setGrokBotTransportForTests(
  t: Transport | ((accessToken: string) => Transport) | null
): void {
  testTransport = t;
}

export function getTransport(accessToken: string): Transport {
  if (typeof testTransport === "function") return testTransport(accessToken);
  if (testTransport) return testTransport;
  return createTransport(accessToken);
}

async function connectRpc(
  method: string,
  payload: unknown,
  accessToken: string,
  opts: { signal?: AbortSignal; stream?: boolean } = {}
): Promise<Response> {
  const config = PROVIDERS["grok-bot"];
  const base = (config?.baseUrl ?? "https://api2.cursor.sh").replace(/\/$/, "");
  const contentType = opts.stream ? "application/connect+json" : "application/json";
  const body = JSON.stringify(payload);
  const framed = opts.stream ? frameConnectJson(body) : body;
  const headers: Record<string, string> = {
    authorization: `Bearer ${accessToken}`,
    "content-type": contentType,
    ...CLIENT_HEADERS,
  };
  if (opts.stream) {
    headers["connect-timeout-ms"] = CONNECT_TIMEOUT_HEADER_MS;
    headers["connect-accept-encoding"] = "identity";
  }
  return fetch(`${base}/${method.includes("/") ? method : `${GROK_BOT_SERVICE}/${method}`}`, {
    method: "POST",
    headers,
    body: framed,
    signal: opts.signal ?? null,
  });
}

function createTransport(accessToken: string): Transport {
  return {
    async rpc(method, payload, opts) {
      const res = await connectRpc(method, payload, accessToken, opts);
      const text = await res.text();
      let parsed: unknown = null;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        parsed = null;
      }
      if (!res.ok) {
        const msg =
          parsed && typeof parsed === "object" && "message" in parsed
            ? String((parsed as { message: unknown }).message)
            : `http_${res.status}`;
        throw new Error(`grok-bot ${method} failed: ${msg}`);
      }
      return parsed;
    },
    async *watch(method, payload, opts) {
      const res = await connectRpc(method, payload, accessToken, {
        ...opts,
        stream: true,
      });
      if (!res.ok || !res.body) {
        throw new Error(`grok-bot ${method} stream failed: http_${res.status}`);
      }
      yield* readConnectFrames(res.body);
    },
  };
}

// The access token is threaded into the transport factory (createTransport)
// so concurrent requests never share token state; the earlier module-level
// variable was a real cross-connection race (review finding r5).

export function isTimeoutError(err: unknown): boolean {
  return (
    err instanceof Error &&
    (err.name === "TimeoutError" || err.name === "AbortError" || /timed out/i.test(err.message))
  );
}

export function remoteMcpServers(): Record<
  string,
  { url: string; headers?: Record<string, string> }
> {
  const raw = process.env.GROK_BOT_REMOTE_MCP_SERVERS;
  if (!raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
  const servers: Record<string, { url: string; headers?: Record<string, string> }> = {};
  for (const [name, value] of Object.entries(parsed)) {
    const entry = value as { url?: unknown; headers?: unknown };
    if (!entry || typeof entry.url !== "string" || !entry.url) continue;
    const headers =
      entry.headers && typeof entry.headers === "object" && !Array.isArray(entry.headers)
        ? Object.fromEntries(
            Object.entries(entry.headers).filter((item) => typeof item[1] === "string")
          )
        : undefined;
    servers[name] =
      headers && Object.keys(headers).length ? { url: entry.url, headers } : { url: entry.url };
  }
  return servers;
}

/**
 * An answer the caller can actually read. Rather than listing the characters that
 * carry no content - a list that was repeatedly one code point short, since control,
 * format and combining characters come in blocks and siblings - ask whether any
 * code point of a visible class is present after the escapes are gone.
 */
const READABLE_CODE_POINT = /[\p{L}\p{N}\p{P}\p{S}]/u;

/** Letterlike code points that occupy a position without drawing anything. */
const INVISIBLE_LETTERFORM = /[\u115f\u1160\u2800\u3164\uffa0]/gu;

export function hasReadableAnswer(text: string): boolean {
  return READABLE_CODE_POINT.test(stripAnsiCodes(text).replace(INVISIBLE_LETTERFORM, ""));
}

/** The token the prompt tells the model to send when it has no usable bridge tool. */
export const UNAVAILABLE_SENTINEL = "TOOL_UNAVAILABLE";

/** Everything an answer needs to be read: letters and digits. */
const TOKEN_NOISE = /[^\p{L}\p{N}]/gu;

/**
 * Small capitals carry no compatibility decomposition, so NFKC leaves them alone. Only
 * the letters the token is spelled with are mapped; anything else stays as it is.
 */
const SMALL_CAPITALS = new Map<string, string>([
  ["\u1D00", "A"],
  ["\u0299", "B"],
  ["\u1D07", "E"],
  ["\u026A", "I"],
  ["\u029F", "L"],
  ["\u0274", "N"],
  ["\u1D0F", "O"],
  ["\u1D1B", "T"],
  ["\u1D1C", "U"],
  ["\u1D20", "V"],
  ["\uA7AE", "I"],
  ["\uA7AD", "L"],
]);

function foldSmallCapitals(text: string): string {
  let folded = "";
  for (const character of text) folded += SMALL_CAPITALS.get(character) ?? character;
  return folded;
}

/**
 * Whether a reply says nothing but that sentinel.
 *
 * Models decorate instruction tokens - backticks, bold, underscores, a full stop, quotes -
 * and they change the case, so the comparison keeps only the letters and digits of the
 * token and folds case. Decoration cannot survive that, including an underscore run,
 * which is why separators are not part of the comparison. A reply that carries any other
 * word is not the sentinel.
 *
 * Folding covers what Unicode gives a compatibility decomposition - fullwidth, mathematical
 * and circled letters - plus the small capitals the token is spelled with, which have none.
 * Enclosing forms with no decomposition (negative squared, negative circled, regional
 * indicators, keycaps) are pasted from pickers rather than typed and stay distinct.
 */
const SENTINEL_SKELETON = UNAVAILABLE_SENTINEL.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

const ESCAPE_SEQUENCES = [
  // Seven-bit: CSI with its parameters and intermediates, then the final byte.
  /\u001b\[[0-9;:<=>?]*[\x20-\x2f]*[\x40-\x7e]/g,
  // Seven-bit strings: OSC ends with BEL or ST, the others with ST.
  /\u001b\][^\u0007\u001b]*(?:\u0007|\u001b\\)?/g,
  /\u001b[P^_X][^\u001b]*\u001b\\?/g,
  // Eight-bit forms of the same.
  /\u009b[0-9;:<=>?]*[\x20-\x2f]*[\x40-\x7e]/g,
  /\u009d[^\u0007\u009c]*[\u0007\u009c]?/g,
  /\u0090[^\u009c]*\u009c?/g,
  // Any other escape: introducers, intermediates, one final byte.
  /\u001b[\x20-\x2f]*[\x30-\x7e]/g,
];

/**
 * The text with every escape sequence removed, including the families the shared helper does
 * not know: C1 introducers, string sequences, and two- and three-byte designators.
 */
function escapeFree(text: string): string {
  return ESCAPE_SEQUENCES.reduce((value, pattern) => value.replace(pattern, ""), text);
}

/** The same text with the letters kept, for an escape that swallowed one of them. */
function escapeKept(text: string): string {
  return text.replace(/[\p{M}\p{Cf}]/gu, "");
}

const CONTROL_CHARACTER = /[\u0000-\u001f\u007f-\u009f]/;

export function isUnavailableSentinel(text: string): boolean {
  const letters = stripAnsiCodes(text)
    // A combining mark would compose with the token's own letters under NFKC and make a
    // different word, so marks and format characters go first.
    .replace(/[\p{M}\p{Cf}]/gu, "")
    // Compatibility forms - fullwidth, mathematical, circled - are the same letters.
    .normalize("NFKC")
    // Normalisation can itself introduce marks (halfwidth voiced marks, Arabic ligature
    // forms), which would otherwise drop letters that are visible on screen.
    .replace(/[\p{M}\p{Cf}]/gu, "")
    .replace(INVISIBLE_LETTERFORM, "")
    .replace(TOKEN_NOISE, "")
    // A numbered paragraph or a footnote around the token is decoration too - in any
    // script, so this is every numeric character and not just the ASCII digits.
    .replace(/\p{N}/gu, "");
  // Small capitals have to be folded before the case fold, which maps them elsewhere.
  if (foldSmallCapitals(letters).toUpperCase() === SENTINEL_SKELETON) return true;
  if (!CONTROL_CHARACTER.test(text)) return false;
  // An escape sequence can swallow a letter of the token and leave the rest looking like an
  // answer, so the letters alone are compared as well. Only a digit is dropped here, not a
  // letter: a numbered paragraph in front of the token is still the token.
  const readings = [escapeFree(text), escapeKept(text)].map((value) =>
    foldSmallCapitals(
      value
        .replace(/[\p{M}\p{Cf}]/gu, "")
        .normalize("NFKC")
        .replace(INVISIBLE_LETTERFORM, "")
    )
      .replace(/[^\p{L}]/gu, "")
      .toUpperCase()
  );
  return readings.includes(SENTINEL_SKELETON);
}

// A claim is either a first-person statement of intent ("I will use lookup") or a past-tense
// report ("I used search"), which is what a shipped case pins. A bare imperative - "Use the
// date as the key", "Call web_search(query)" - is an instruction or ordinary prose, not a
// claim that a tool ran.
// A claim is a first-person statement ("I will use lookup", "I'll call it", "I'm going to
// query"), a past-tense report ("I used search"), or the equivalent in Chinese. A bare
// imperative - "Use the date as the key", "Call web_search(query)" - is an instruction or
// ordinary prose, not a claim that a tool ran.
// A claim is a first-person statement ("I will use lookup", "I'll call it", "I'm going to
// query"), a past-tense report ("I used search"), or the equivalent in Chinese. A bare
// imperative - "Use the date as the key", "Call web_search(query)" - is an instruction or
// ordinary prose, not a claim that a tool ran.
const CLAIM_FIRST_PERSON =
  "(?:I|we)(?:(?:\\s+|')?(?:will|would|can|could|should|may|might|shall|m|ll)\\s*)?" +
  "(?:going to\\s+)?(?:use|call|run|invoke|query|execute|fetch)";
const CLAIM_PAST =
  "used|using|called|calling|invoked|invoking|queried|executed|executing|ran|" +
  "\u8c03\u7528|\u4f7f\u7528|\u901a\u8fc7";
const LATIN_WORD = "\\p{Script=Latin}\\p{N}_";
const QUOTE = "[\\u0060'\\u2018\\u2019\\u201c\\u201d]";
// An article in front makes the name a noun rather than the thing that was used ("I used the
// search results"), so it is only allowed when the name is quoted, which reads as the tool.
// Chinese verbs glue straight to the name, optionally with the completed-aspect particle, so
// an empty gap is allowed after them.
const CLAIM_GLUE = `(?:(?:\\s+(?:the|a|an))?\\s*${QUOTE}\\s*|\\s+|(?:\\u4e86)?(?<=[\\u4e00-\\u9fff]))`;
// Negated and qualified claims are not claims: "I haven't used search yet", "I used
// search-based ranking", "I used the search results".
const CLAIM_NEGATED = /(?:n't|not|never)\s+\S*\s*$/iu;
const CLAIM_ENDS_HERE =
  /^(?:$|[\s.,;:!?)\]}`'"\u2018\u2019\u201c\u201d]|\s*(?:to|for|and|then|but|so|because|which|that|it|in|on|at|with|from|by|if|when|while|twice|again|first|now|earlier|yesterday)(?![\p{Script=Latin}\p{N}_])|\s*(?:\u4e86|\u5de5\u5177))/iu;

/** Where the name stands as the object of a claim verb, as [start, end) offsets. */
function claimCandidates(haystack: string, name: string): Array<[number, number]> {
  const escaped = name.normalize("NFKC").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `(?:^|[^${LATIN_WORD}])(?:${CLAIM_FIRST_PERSON}|${CLAIM_PAST})${CLAIM_GLUE}${escaped}(?![${LATIN_WORD}])`,
    "giu"
  );
  return [...haystack.matchAll(pattern)].map((match) => {
    const end = match.index + match[0].length;
    return [end - name.length, end] as [number, number];
  });
}

export function namesAClientTool(text: string, tools: unknown[]): boolean {
  // A tool name on its own is not a claim: "The date is 2026-11-22." is a real answer when a
  // client tool happens to be called `date`, and so is "The search tool is optional". Only an
  // answer that says it used the tool counts.
  const haystack = text.normalize("NFKC");
  return tools.some((tool) => {
    const name = (tool as { function?: { name?: unknown } })?.function?.name;
    return (
      typeof name === "string" &&
      name.length > 0 &&
      claimCandidates(haystack, name).some(
        ([start, end]) =>
          !CLAIM_NEGATED.test(haystack.slice(Math.max(0, start - 16), start)) &&
          CLAIM_ENDS_HERE.test(haystack.slice(end))
      )
    );
  });
}

type ChatMessage = {
  role?: string;
  content?: unknown;
  tool_call_id?: string;
  tool_calls?: Array<{ id?: string; function?: { name?: string; arguments?: unknown } }>;
};

/** Flattens one message's content to text, naming attachments this transport
 *  cannot forward instead of dropping them silently. */
function messageText(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return (content as Array<{ type?: string; text?: string; image_url?: { url?: string } }>)
    .map((part) => {
      if (part?.type === "text" && typeof part.text === "string") return part.text;
      if (part?.type === "image_url") {
        const url = part.image_url?.url ?? "";
        const kind = url.startsWith("data:") ? url.slice(5, url.indexOf(";")) || "image" : "image";
        return `[image attached: ${kind}]`;
      }
      return "";
    })
    .filter((part) => part)
    .join("\n");
}

function describeCall(call: {
  id?: string;
  function?: { name?: string; arguments?: unknown };
}): string {
  const name = call.function?.name ?? "";
  const rawArgs = call.function?.arguments;
  const args =
    typeof rawArgs === "string"
      ? rawArgs
      : rawArgs && typeof rawArgs === "object"
        ? JSON.stringify(rawArgs)
        : "";
  return `Assistant called ${name}${call.id ? " (" + call.id + ")" : ""} with ${args}`;
}

/** Renders the conversation as the plain text this transport sends. */
function renderMessage(msg: ChatMessage): string[] {
  const content = messageText(msg?.content);
  const calls = Array.isArray(msg?.tool_calls) ? msg.tool_calls : [];
  if (!content && !calls.length) return [];
  if (msg.role === "system") return [content];
  if (msg.role === "assistant") {
    return [...(content ? [`Assistant: ${content}`] : []), ...calls.map(describeCall)];
  }
  if (msg.role === "tool") {
    return [`Tool result${msg.tool_call_id ? " (" + msg.tool_call_id + ")" : ""}: ${content}`];
  }
  return [`User: ${content}`];
}

function renderConversation(messages: unknown[]): { lines: string[]; count: number } {
  const lines: string[] = [];
  for (const message of Array.isArray(messages) ? messages : []) {
    lines.push(...renderMessage(message as ChatMessage));
  }
  return { lines, count: lines.length };
}

/** What to tell the model about the tools a request exposes, if any. */
function toolDirective(input: {
  challenge?: string;
  advertisedName?: string;
  hasClientTools: boolean;
  toolChoice?: unknown;
  parallel: boolean;
}): string | null {
  if (!input.challenge) return null;
  if (!input.hasClientTools) {
    return (
      "First use GetMcpTools to find the " +
      (input.advertisedName || "bridge") +
      " tool and no other. Discovery of that one tool is allowed for this request. Then call it once, with challenge " +
      input.challenge +
      ". Reply with its returned value verbatim. The value is unknown to you. If discovery cannot find the tool, say TOOL_UNAVAILABLE. Do not use any other tool, computer, file, web, permission, persistent memory, or service."
    );
  }
  const forced =
    input.toolChoice && typeof input.toolChoice === "object" && !Array.isArray(input.toolChoice)
      ? (input.toolChoice as { function?: { name?: string } }).function?.name
      : undefined;
  const directive =
    input.toolChoice === "none"
      ? "Do not call any of them. Answer from the conversation. "
      : input.toolChoice === "required"
        ? "Call at least one of them before answering. "
        : forced
          ? "Call " + forced + " before answering. "
          : "Call whichever of them the request needs, as many times as it needs. ";
  return (
    "The tools listed for this request are available through GetMcpTools. " +
    directive +
    "If you do not call one, reply TOOL_UNAVAILABLE and nothing else. " +
    'A line starting with "Tool result" is the value returned by an earlier call; use it and continue. ' +
    "Do not use any tool that was not listed, nor any computer, file, web, permission, persistent memory, or service." +
    (input.parallel ? "" : " Call one tool, wait for its result, then decide the next.")
  );
}

export function composePrompt(
  messages: unknown[],
  challenge?: string,
  advertisedName?: string,
  hasClientTools = false,
  toolChoice?: unknown,
  parallel = true
): string {
  const { lines, count } = renderConversation(messages);
  lines.push("Answer only from this conversation. Do not read or write Grok account memory.");
  const directive = toolDirective({
    challenge,
    advertisedName,
    hasClientTools,
    toolChoice,
    parallel,
  });
  if (directive) lines.push(directive);
  return fitPrompt(lines, count);
}

// Drop the oldest message lines until the joined prompt is within the upstream
// text cap. The trailing instruction lines stay: they carry the tool contract
// the turn depends on. A single message that is itself over the cap is cut
// from its front, so the most recent part of it survives.
function fitPrompt(lines: string[], messageLineCount: number): string {
  const tail = lines.slice(messageLineCount);
  const tailText = tail.join("\n");
  const budget = MAX_PROMPT_CHARS - (tailText.length ? tailText.length + 1 : 0);
  const head = lines.slice(0, messageLineCount);
  // Cumulative length of head[i..] joined with newlines, computed once so a
  // long history is trimmed in linear time instead of rejoining on each drop.
  const cum: number[] = new Array(head.length + 1);
  cum[head.length] = 0;
  for (let i = head.length - 1; i >= 0; i--) {
    cum[i] = head[i].length + (i + 1 < head.length ? 1 + cum[i + 1] : 0);
  }
  let start = 0;
  while (start < head.length - 1 && cum[start] > budget) start += 1;
  let kept = head.slice(start);
  if (kept.length === 1 && kept[0].length > budget) {
    kept = [kept[0].slice(kept[0].length - Math.max(0, budget))];
  }
  const body = kept.join("\n");
  return tailText ? body + "\n" + tailText : body;
}

export function chatCompletionBody(model: string, content: string, id: string) {
  return {
    id,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
}

export function toolCallBody(
  model: string,
  id: string,
  calls: Array<{ name: string; arguments: unknown }>,
  content: string | null = null
) {
  return {
    id,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content,
          tool_calls: calls.map((call) => ({
            id: "call_" + randomUUID(),
            type: "function",
            function: { name: call.name, arguments: JSON.stringify(call.arguments ?? {}) },
          })),
        },
        finish_reason: "tool_calls",
      },
    ],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
}

export function sseChunk(model: string, content: string, id: string) {
  return {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta: { role: "assistant", content }, finish_reason: null }],
  };
}

export function sseFinish(model: string, id: string, reason = "stop") {
  return {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta: {}, finish_reason: reason }],
  };
}

export function sseToolCallChunk(
  model: string,
  id: string,
  index: number,
  call: { name: string; arguments: unknown }
) {
  return {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index,
              id: "call_" + randomUUID(),
              type: "function",
              function: { name: call.name, arguments: JSON.stringify(call.arguments ?? {}) },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  };
}

export function errResponse(status: number, message: string, type = "upstream_error") {
  return new Response(JSON.stringify({ error: { message, type, code: null } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export type StartedBridge = {
  url: string;
  call: (challenge: string) => string;
  /** Registry-backed turns expose a non-blocking close; test fakes omit it. */
  close?: (reason: BridgeCloseReason) => void;
  /** Internally generated challenge on registry-backed turns (spec step 1). */
  challenge?: string;
  /** Tool calls the model made during the turn, read back when it ends. */
  invocations?: Array<{ name: string; arguments: unknown }>;
};

export type BridgeController = {
  start: (publicBaseUrl?: string, options?: BridgeTurnOptions) => Promise<StartedBridge>;
  stop: () => Promise<void>;
};

/** Per-turn wiring forwarded to the registry-backed bridge (spec steps 9/12). */
export type BridgeTurnOptions = {
  signal?: AbortSignal | null;
  onForcedAbort?: () => void;
  tools?: Array<{ name: string; description?: string; inputSchema?: unknown }>;
};

/**
 * Default bridge: one registry-backed loopback turn per start() (frozen spec
 * 2026-09-28 lifecycle steps 1-7). The cloudflared tunnel path was removed;
 * the public route `/grok-bridge/<nonce>/mcp` replaces it.
 */
/** Spec step 11/12: a body with no read() by 29s is force-aborted. */
export const BRIDGE_UNREAD_TIMEOUT_MS = 29_000;

let unreadTimeoutOverrideMs: number | null = null;

export function createDefaultBridgeController(): BridgeController {
  let current: StartedBridge | null = null;
  return {
    async start(publicBaseUrl?: string, options?: BridgeTurnOptions) {
      if (!publicBaseUrl) throw new Error("Public bridge base URL is required");
      current = null;
      current = await startBridgeTurn({ publicBaseUrl, ...options });
      return current;
    },
    async stop() {
      current?.close("cancel");
      current = null;
    },
  };
}

export function getUnreadTimeout(): number {
  return unreadTimeoutOverrideMs ?? BRIDGE_UNREAD_TIMEOUT_MS;
}
export function setUnreadTimeout(ms: number | null): void {
  unreadTimeoutOverrideMs = ms;
}
