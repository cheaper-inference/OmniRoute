/**
 * CloudflarePlaygroundExecutor — Cloudflare AI Playground (No Auth) provider
 *
 * Reverse-engineered access to the free, anonymous Cloudflare AI Playground
 * (https://playground.ai.cloudflare.com). No account, no API key, no cookies:
 * chat runs over a PartySocket WebSocket speaking Cloudflare's `cf_agent` RPC
 * protocol, and the only gate is a browser-grade TLS fingerprint on the WS
 * upgrade. This executor therefore drives a headless Chromium via Playwright,
 * opens the WebSocket *inside the page context* (only a real browser TLS stack
 * passes the upgrade), and translates the `cf_agent` frame stream into
 * OpenAI-format chat completion chunks.
 *
 * Protocol (captured live 2026-08-15):
 *   - Transport: wss://playground.ai.cloudflare.com/agents/playground/<room>?_pk=<uuid>
 *   - Resume:    {"type":"cf_agent_stream_resume_request"}
 *   - Config:    {"type":"rpc","method":"setConfig","args":[{model,temperature,stream}]}
 *   - Chat:      {"id":<cid>,"init":{"method":"POST","body":{messages,trigger}},"type":"cf_agent_use_chat_request"}
 *   - Stream:    start → start-step → (reasoning-start/delta/end)* → text-start →
 *                text-delta* → finish-step → finish{messageMetadata.finishReason} → {done:true}
 *   - Errors:    {"error":true,"body":"{message,details}","id":<cid>} — e.g.
 *                "3021: rate limiting: inference request per min rate reached"
 *
 * Notes:
 *   - The playground's system prompt is server-side (set via setConfig by the
 *     app itself); client `system` messages are dropped. Tool calls are emulated
 *     by serializing OpenAI `tools[]` into a prompt contract (sent as its own
 *     user message) and parsing the model's text reply back into OpenAI
 *     `tool_calls`.
 *   - A conversation may carry at most 10 user-role messages; longer payloads
 *     are rejected in-band ("This demo is limited to 10 messages per
 *     conversation. Start a new chat to continue."). Turns older than the
 *     verbatim window are compacted into a single user message (contract and
 *     replayed tool results included) instead of being dropped.
 *   - Upstream rate limits arrive in-band as `error:true` frames. Non-streaming
 *     requests surface them as HTTP 429/502; streaming requests emit an SSE
 *     error chunk before `[DONE]` (the response status is already committed).
 *     A server-side chat timeout follows the same rule: streaming requests
 *     emit a `timeout_error` chunk before `[DONE]` instead of silently
 *     completing (#10494).
 *   - Set CLOUDFLARE_PLAYGROUND_CHROME_PATH to point at a full desktop Chrome
 *     binary when Playwright's bundled Chromium gets fingerprint-blocked.
 */
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources/chat/completions";
import { randomUUID } from "crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { containsMediaKind } from "../utils/mediaParts.ts";
import { isMissingBrowserExecutable } from "./browserExecutableCheck.ts";
import { isRegisteredFeatureFlagEnabled } from "../utils/registeredFeatureFlag.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import { connectObscuraBrowser } from "../services/obscura.ts";
import type { Browser, Page } from "playwright";
import {
  parseCfToolCalls,
  buildCfToolConversationPrompt,
  stripCfToolMarkup,
  stripCfToolResults,
  hasFabricatedCfToolResult,
  finalizeCfToolCalls,
  hasMalformedCfToolIntent,
  cfToolNonce,
  cfMessageText,
  truncateCfMessage,
  type CfParsedToolCall,
  type CfToolDef,
} from "../translator/cloudflarePlaygroundTools.ts";
import { scanCfJsonStandaloneEnvelope } from "../translator/cloudflarePlaygroundJson.ts";
import { resolveDeclaredToolName } from "../translator/cloudflarePlaygroundNameResolution.ts";
import {
  getRequestedToolNames,
  resolveRequestedToolName,
  type RequestedToolName,
} from "../translator/webTools.ts";

export const PLAYGROUND_URL = "https://playground.ai.cloudflare.com/";
const PLAYGROUND_WS_BASE = "wss://playground.ai.cloudflare.com/agents/playground/";
const PLAYGROUND_UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";
const BROWSER_ARGS = [
  "--disable-blink-features=AutomationControlled",
  "--no-first-run",
  "--no-default-browser-check",
];
const MODEL_PREFIX = "@cf/";
const DEFAULT_MODEL = "zai-org/glm-4.7-flash";
const DEFAULT_TEMPERATURE = 0.7;
const NAV_TIMEOUT_MS = 45_000;
const CHAT_TIMEOUT_MS = 120_000;
const BLOCKED_MESSAGE =
  "Cloudflare Playground blocked the headless browser (fingerprint check). Set CLOUDFLARE_PLAYGROUND_CHROME_PATH to a full desktop Chrome binary and retry.";

/** Opt-in: the larger retry budget and the hard failure once it is exhausted. */
export const STRICT_TOOL_RECOVERY_FLAG = "CLOUDFLARE_PLAYGROUND_STRICT_TOOL_RECOVERY_ENABLED";

/** Retry attempts for tool call validation failures with the flag off. */
export const DEFAULT_TOOL_RETRIES = 3;

/**
 * Retry attempts for tool call validation failures with the flag on.
 *
 * Each retry is a *fresh* playground room carrying a corrective reminder that
 * names the exact gate that failed, so the budget is what a drifting model
 * gets before the turn is declared unrecoverable (see the hard failure after
 * the loop). Exported so tests can assert the production budget without paying
 * it in wall clock.
 */
export const MAX_TOOL_RETRIES = 10;

/**
 * Delay between retry attempts in milliseconds.
 *
 * Deliberately not shortened: the playground rate-limits per IP per minute
 * ("3021: rate limiting: inference request per min rate reached"), and a burst
 * of back-to-back repair attempts is exactly what trips it. Exported for the
 * same reason as MAX_TOOL_RETRIES.
 */
export const RETRY_DELAY_MS = 5000;

/**
 * Wait out a retry delay, returning as soon as the request is aborted so a
 * client disconnect does not keep the delay running. The caller re-checks the
 * signal before opening another playground session.
 */
function waitForRetryDelay(ms: number, signal?: AbortSignal | null): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted) {
      resolve();
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      resolve();
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

const EXPECTED_FORMAT = "Here is the expected format:\n";
const RETRY_WITH_VALID_NAME = "Retry with a valid tool name from the list above.";

/**
 * The text around the schema example and tool list in each targeted reminder:
 * `<lead><schema>\n\nAvailable tools: <names><tail>`.
 */
const TOOL_RETRY_REMINDER_PARTS: Partial<
  Record<CfToolGateFailure, { lead: string; tail: string }>
> = {
  invalid_json: {
    lead:
      "Your previous response was not valid JSON. The tool contract requires a single JSON object (or an array of them) " +
      "with no syntax errors. " +
      EXPECTED_FORMAT,
    tail: "\nReply with ONLY the JSON call(s), no markdown, no explanation.",
  },
  missing_type: {
    lead:
      "Your previous response is missing the required 'type' field. Every tool call must include " +
      '"type": "tool_call" to mark it as a call. ' +
      EXPECTED_FORMAT,
    tail: "\nRetry with the correct type field.",
  },
  wrong_type: {
    lead:
      'Your previous response has an invalid "type" value. It must be exactly "tool_call" (case-sensitive). ' +
      EXPECTED_FORMAT,
    tail: '\nRetry with type set to exactly "tool_call".',
  },
  missing_name: {
    lead:
      "Your previous response is missing the required 'name' field. Every tool call must specify " +
      "which tool to invoke. " +
      EXPECTED_FORMAT,
    tail: "\n" + RETRY_WITH_VALID_NAME,
  },
  invalid_name: {
    lead: "Your previous response specified a tool name that is not available. " + EXPECTED_FORMAT,
    tail: "\n" + RETRY_WITH_VALID_NAME,
  },
  missing_arguments: {
    lead:
      "Your previous response is missing the required 'arguments' field, or it is null/empty. " +
      "Every tool call must include an 'arguments' object with the tool's declared parameters. " +
      EXPECTED_FORMAT,
    tail: "\nRetry with a valid arguments object.",
  },
  fabricated_result: {
    lead:
      "Your previous response invented a tool result: it contained a " +
      '{"tool_result": ...} object for a tool that has not been run. ' +
      "No tool has executed in this conversation yet, and you must never write a tool's " +
      "output yourself — only the harness can return one. " +
      "Take the action instead. Reply with ONLY the JSON call:\n",
    tail: "\nThe harness will run the tool and send you its real result as the next message.",
  },
  empty_response: {
    lead:
      "Your previous response was empty — it carried neither text nor a tool call, so there " +
      "was nothing for the client to act on. Perform the next concrete step now. If it needs " +
      "a tool, reply with ONLY the JSON call:\n",
    tail: "",
  },
};

/**
 * Build a targeted corrective reminder based on the specific validation failure.
 */
export function buildToolRetryReminder(
  failure: CfToolGateFailure,
  availableTools: CfToolDef[],
  nonce: string
): string {
  const parts = TOOL_RETRY_REMINDER_PARTS[failure];
  if (!parts) return malformedIntentReminder(nonce);
  const toolNames = availableTools.map((t) => t.name).join(", ");
  const schemaExample =
    '{"type": "tool_call", "name": "<tool>", "arguments": {...}, "_nonce": "' + nonce + '"}';
  return parts.lead + schemaExample + "\n\nAvailable tools: " + toolNames + parts.tail;
}

/** The reminder for `malformed_intent`, and for any failure without its own text. */
function malformedIntentReminder(nonce: string): string {
  return (
    "Your previous response contained a tool call that the client could not read, so it was rejected. " +
    "Retry the requested next action from scratch, following the tool contract exactly: " +
    "reply with ONLY a JSON object (or an array of them for several calls) shaped like " +
    '{"type": "tool_call", "name": "<tool>", "arguments": {...}, "_nonce": "' +
    nonce +
    '"}, with the ' +
    "arguments as a single JSON object and the _nonce binding copied verbatim. " +
    "If your previous reply was cut off, send every call again, complete: a single object, or one " +
    "array holding all of them. No XML tags and no code fences."
  );
}

/**
 * Reasons a reply's JSON envelope can fail the tool-call contract. Each maps
 * to a targeted corrective reminder in buildToolRetryReminder.
 */
export type CfEnvelopeGateFailure =
  | "invalid_json"
  | "missing_type"
  | "wrong_type"
  | "missing_name"
  | "invalid_name"
  | "missing_arguments";

/**
 * Every reason a reply can fail the tool-call contract. The envelope failures
 * above are shape failures on one JSON document; the two below are failures of
 * the turn as a whole — a reply that only *looks* like tool intent
 * (`malformed_intent`), one that answers its own call (`fabricated_result`),
 * and one that carries nothing at all (`empty_response`).
 */
export type CfToolGateFailure =
  CfEnvelopeGateFailure | "malformed_intent" | "fabricated_result" | "empty_response";

/** The verdict one reply (or one channel of it) earns from the gates. */
export interface CfGateOutcome {
  calls: CfParsedToolCall[];
  retry: boolean;
  reason: CfToolGateFailure | null;
}

/**
 * Gate one raw envelope value — the bytes the model actually sent — against
 * the contract shape `{"type": "tool_call", "name": <declared>, "arguments":
 * {...}}`. Returns the first failed gate, or null when every gate passes.
 * Arrays and the OpenAI `tool_calls` wrapper are gated element by element: one
 * bad element fails the whole turn (all-or-nothing), matching the parser.
 *
 * Policy: the discriminator is contractual — exactly `"tool_call"` (leading /
 * trailing whitespace is formatting, not a different value). The *name*, by
 * contrast, is resolved the way the parser + finalize resolve it (case-
 * insensitive, then fuzzy), because those normalizations are the system's own
 * documented job; rejecting them would retry — and after three attempts drop —
 * a call the executor would have executed.
 */
export function gateCfEnvelopeValue(
  value: unknown,
  availableTools: CfToolDef[],
  requestedNames: RequestedToolName[] = []
): CfEnvelopeGateFailure | null {
  if (Array.isArray(value)) {
    for (const item of value) {
      const failure = gateCfEnvelopeValue(item, availableTools, requestedNames);
      if (failure) return failure;
    }
    return null;
  }
  if (!value || typeof value !== "object") return "invalid_json";
  const obj = value as Record<string, unknown>;

  // The OpenAI wrapper shape models reach for — gate the calls inside it.
  const nested = obj.tool_calls ?? obj.toolCalls;
  if (nested !== undefined) return gateCfEnvelopeValue(nested, availableTools, requestedNames);

  // Gate 1 — `type` must exist and be exactly "tool_call".
  if (!Object.hasOwn(obj, "type")) return "missing_type";
  const type = typeof obj.type === "string" ? obj.type.trim() : obj.type;
  if (type !== "tool_call") return "wrong_type";

  // Gate 2 — `name` must be present, hold a value, and resolve to a declared
  // tool exactly the way parser + finalize resolve it.
  if (!Object.hasOwn(obj, "name") || obj.name === null || obj.name === undefined) {
    return "missing_name";
  }
  if (typeof obj.name !== "string" || !obj.name.trim()) return "invalid_name";
  const declared =
    resolveDeclaredToolName(obj.name, availableTools) ??
    (requestedNames.length > 0 ? resolveRequestedToolName(obj.name, requestedNames) : null);
  if (!declared) return "invalid_name";

  // Gate 3 — `arguments` must be a non-null JSON object.
  if (!Object.hasOwn(obj, "arguments") || obj.arguments === null || obj.arguments === undefined) {
    return "missing_arguments";
  }
  if (typeof obj.arguments !== "object" || Array.isArray(obj.arguments)) {
    return "missing_arguments";
  }
  return null;
}

/**
 * Gate the reply's whole-body JSON envelope, when it has one. A reply that is
 * not (trying to be) a single JSON value is not gated here — tags, prose and
 * embedded JSON are covered by the parser and the intent net, so a schema
 * example quoted mid-sentence can never be mistaken for a call.
 */
export function gateCfStandaloneEnvelope(
  text: string,
  availableTools: CfToolDef[],
  requestedNames: RequestedToolName[] = []
): CfEnvelopeGateFailure | null {
  const envelope = scanCfJsonStandaloneEnvelope(text);
  if (!envelope) return null;
  // The raw text is an envelope attempt that does not parse: broken or cut
  // off mid-object.
  if (envelope.value === undefined) return "invalid_json";
  return gateCfEnvelopeValue(envelope.value, availableTools, requestedNames);
}

// ── Frame parsing & translation (pure — unit-tested against live captures) ──

export interface CfChatFrame {
  id?: string;
  type?: string;
  error?: boolean;
  done?: boolean;
  body?: unknown;
}

/** Parse a raw WS frame. Returns null for non-JSON / unrelated frames. */
export function parseCfFrame(raw: string): CfChatFrame | null {
  try {
    const msg = JSON.parse(raw) as CfChatFrame;
    if (msg && typeof msg === "object" && typeof msg.type === "string") return msg;
  } catch {
    /* non-JSON — ignore */
  }
  return null;
}

export interface CfStreamEvent {
  type: "role" | "content" | "reasoning" | "finish";
  value?: string;
}

/**
 * Translates `cf_agent_use_chat_response` frames for one chat id into
 * OpenAI-format stream events. Frames for other ids (RPC responses such as
 * `setConfig` also carry `done:true`!) and non-chat frame types
 * (`cf_agent_identity`, `cf_agent_state`, ...) are ignored.
 */
export class CfStreamParser {
  readonly chatId: string;
  done = false;
  text = "";
  reasoningText = "";
  finishReason: string | null = null;
  error: { status: number; message: string } | null = null;
  private seenStart = false;

  constructor(chatId: string) {
    this.chatId = chatId;
  }

  /** Returns the SSE-relevant event, or null when the frame is ignorable. */
  push(raw: string): CfStreamEvent | null {
    const msg = parseCfFrame(raw);
    if (!msg || msg.type !== "cf_agent_use_chat_response" || msg.id !== this.chatId) return null;

    if (msg.error) {
      this.error = classifyError(msg.body);
      return null;
    }
    if (msg.done) {
      this.done = true;
      return null;
    }

    let body: Record<string, unknown>;
    try {
      body =
        typeof msg.body === "string"
          ? (JSON.parse(msg.body) as Record<string, unknown>)
          : (msg.body as Record<string, unknown>);
    } catch {
      return null;
    }
    if (!body || typeof body.type !== "string") return null;

    switch (body.type) {
      case "start":
        if (this.seenStart) return null;
        this.seenStart = true;
        return { type: "role" };
      case "reasoning-delta": {
        const delta = typeof body.delta === "string" ? body.delta : "";
        if (!delta) return null;
        this.reasoningText += delta;
        return { type: "reasoning", value: delta };
      }
      case "text-delta": {
        const delta = typeof body.delta === "string" ? body.delta : "";
        if (!delta) return null;
        this.text += delta;
        return { type: "content", value: delta };
      }
      case "finish": {
        const meta = (body.messageMetadata ?? {}) as Record<string, unknown>;
        const reason = typeof meta.finishReason === "string" ? meta.finishReason : "stop";
        this.finishReason = reason;
        return { type: "finish", value: reason };
      }
      default:
        // reasoning-start/end, start-step, finish-step, text-start/end, heartbeat — ignored.
        return null;
    }
  }
}

/** Map an in-band upstream error frame to an HTTP-ish status + clean message. */
function classifyError(body: unknown): { status: number; message: string } {
  let detail = "";
  if (typeof body === "string") {
    try {
      const parsed = JSON.parse(body) as Record<string, unknown>;
      detail = String(parsed.details || parsed.message || "");
    } catch {
      detail = body;
    }
  } else if (body && typeof body === "object") {
    const parsed = body as Record<string, unknown>;
    detail = String(parsed.details || parsed.message || "");
  }
  const status = /rate|limit|quota|throttl/i.test(detail) ? 429 : 502;
  return { status, message: detail || "Cloudflare Playground upstream error" };
}

// ── Message conversion ───────────────────────────────────────────────────────

export interface CfChatMessage {
  role: "user" | "assistant";
  parts: Array<{ type: "text"; text: string }>;
  id: string;
}

/**
 * Convert OpenAI-format messages to the playground's chat body shape.
 * `system` messages are dropped (the playground's persona is server-side).
 * Tool calls and tool results are replayed as text so the model sees the
 * conversation history. `execute()` runs the messages through
 * `buildCfToolConversationPrompt` first, which injects the tool contract and
 * trims the history to the playground's 10-user-message cap.
 */
export function toCfMessages(
  messages: Array<{ role?: string; content?: unknown }>
): CfChatMessage[] {
  const out: CfChatMessage[] = [];
  for (const message of messages ?? []) {
    if (message.role !== "user" && message.role !== "assistant" && message.role !== "tool")
      continue;
    const text = truncateCfMessage(cfMessageText(message));
    if (!text) continue;
    out.push({
      role: message.role === "tool" ? "user" : message.role,
      parts: [{ type: "text", text }],
      id: `m${out.length + 1}`,
    });
  }
  return out;
}

/**
 * The Cloudflare Playground bridge uses text-only cf_agent chat parts. It has
 * no image-upload frame. Do not silently strip a client's image or launch a
 * browser for a request the bridge cannot fulfill (#16460).
 */
function isUnsupportedCfImagePart(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const part = value as Record<string, unknown>;
  return (
    part.type === "image_url" ||
    part.type === "input_image" ||
    part.type === "image" ||
    Object.hasOwn(part, "image_url")
  );
}

export function hasUnsupportedCfImageParts(messages: unknown): boolean {
  // Scan only known message/content/output/input envelopes. An iterative walk
  // catches deeply nested image parts without recursion overflow. The node
  // budget only bounds hot-path work: exhausting it fails OPEN (a long
  // text-only conversation is not evidence of an image), while a repeated
  // reference (impossible in parsed JSON) still fails closed.
  const pending: unknown[] = [messages];
  const visited = new WeakSet<object>();
  const maxNodes = 2048;
  let scanned = 0;
  while (pending.length > 0) {
    const value = pending.pop();
    if (!value || typeof value !== "object") continue;
    if (visited.has(value)) return true; // cycle or non-JSON repeated reference
    visited.add(value);
    if (++scanned > maxNodes) return false;
    if (Array.isArray(value)) {
      if (value.length > maxNodes) return false;
      for (const part of value) pending.push(part);
      continue;
    }
    if (isUnsupportedCfImagePart(value)) return true;
    const record = value as Record<string, unknown>;
    if (Array.isArray(record.images) && record.images.length > 0) return true;
    pending.push(record.content, record.output, record.input);
  }
  return false;
}

/**
 * A missing Playwright package/browser is a local runtime configuration
 * problem, not a transient Cloudflare upstream failure (#16460).
 */
export function classifyCfBrowserStartFailure(error: unknown): {
  status: number;
  message: string;
  fallbackHint?: "connection_cooldown";
} {
  const message = error instanceof Error ? error.message : String(error);
  if (isMissingBrowserExecutable(message)) {
    return {
      status: 503,
      fallbackHint: "connection_cooldown",
      message:
        "Cloudflare Playground needs Playwright and its Chromium browser. " +
        "Install the browser runtime (npm i playwright && npx playwright install chromium) " +
        "or use an OmniRoute browser-enabled deployment.",
    };
  }
  // Raw browser startup messages may contain local paths, proxy credentials,
  // or environment values. Never return them to a client (HR #12).
  return {
    status: 502,
    message: "Cloudflare Playground browser session failed. Check server logs for details.",
  };
}

// ── Transport ────────────────────────────────────────────────────────────────

export interface CfTransportConfig {
  model: string;
  messages: CfChatMessage[];
  temperature: number;
  signal?: AbortSignal | null;
}

export type CfTransportStartResult =
  | { ok: true }
  | { ok: false; status: number; message: string; fallbackHint?: "connection_cooldown" };

export interface CfTransport {
  start(config: CfTransportConfig): Promise<CfTransportStartResult>;
  frames(): AsyncGenerator<string>;
  close(): Promise<void>;
}

/**
 * Open the anonymous playground session inside the browser page context.
 *
 * Exported so tests can assert session isolation: every call must mint a new
 * `playground-<uuid>` room and a new `_pk` key, so two requests can never share
 * a playground conversation (and its 10-user-message history budget).
 */
export function openPlaygroundSession(args: {
  chatId: string;
  model: string;
  messages: CfChatMessage[];
  temperature: number;
  wsBase: string;
}): void {
  const { chatId, model, messages, temperature, wsBase } = args;
  const pk = crypto.randomUUID();
  const room = "playground-" + crypto.randomUUID().replace(/-/g, "").slice(0, 25);
  const socket = new WebSocket(wsBase + room + "?_pk=" + pk);
  const push = (raw: string) => {
    try {
      (window as unknown as { __cfpPush: (raw: string) => void }).__cfpPush(raw);
    } catch {
      /* page torn down */
    }
  };
  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "cf_agent_stream_resume_request" }));
    socket.send(
      JSON.stringify({
        type: "rpc",
        id: "cfp-config",
        method: "setConfig",
        args: [{ model, temperature, stream: true }],
      })
    );
    socket.send(
      JSON.stringify({
        id: chatId,
        init: { method: "POST", body: JSON.stringify({ messages, trigger: "submit-message" }) },
        type: "cf_agent_use_chat_request",
      })
    );
  };
  socket.onmessage = (event: MessageEvent) => push(String(event.data));
  socket.onerror = () =>
    push(
      JSON.stringify({
        id: chatId,
        type: "cf_agent_use_chat_response",
        error: true,
        body: JSON.stringify({
          message: "Playground WebSocket error",
          details: "ws transport failed",
        }),
      })
    );
}

export class PlaywrightCfTransport implements CfTransport {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private pending: string[] = [];
  private waiters: Array<(frame: string | null) => void> = [];
  private closed = false;
  private abortSignal: AbortSignal | null = null;
  private abortListener: (() => void) | null = null;

  constructor(
    private chatId: string,
    private chromeExecutablePath?: string
  ) {}

  async start(config: CfTransportConfig): Promise<CfTransportStartResult> {
    try {
      // #12274: prefer the shared Obscura browser (browser-grade TLS fingerprint
      // on the WS upgrade, ~30MB) over a full Chromium per request; fall back to
      // a direct Chromium launch when Obscura is unavailable.
      const obscura = await connectObscuraBrowser();
      const playwright = await importPlaywright();
      if (obscura) {
        this.browser = obscura.browser;
      } else {
        const executablePath =
          this.chromeExecutablePath ?? process.env.CLOUDFLARE_PLAYGROUND_CHROME_PATH;
        this.browser = await playwright.chromium.launch({
          ...(executablePath ? { executablePath } : {}),
          headless: true,
          args: BROWSER_ARGS,
        });
      }
      const context = await this.browser.newContext({ userAgent: PLAYGROUND_UA });
      const page = await context.newPage();
      this.page = page;
      await page.goto(PLAYGROUND_URL, { waitUntil: "domcontentloaded", timeout: NAV_TIMEOUT_MS });
      const title = await page.title().catch(() => "");
      if (title.includes("Attention Required")) {
        // #10494: this branch used to return without closing the browser it
        // just launched, leaking a Chromium process for every blocked
        // request. Close it on every non-success start path, same as the
        // catch block below.
        await this.close().catch(() => {});
        return { ok: false, status: 502, message: BLOCKED_MESSAGE };
      }
      await page.exposeFunction("__cfpPush", (raw: string) => {
        this.push(raw);
      });
      // Bundlers (esbuild/webpack keepNames) inject a `__name` helper call into
      // serialized function bodies; define it in the page context so
      // page.evaluate(openPlaygroundSession) doesn't throw ReferenceError.
      await page.evaluate(() => {
        (window as unknown as { __name?: unknown }).__name = (fn: unknown) => fn;
      });
      await page.evaluate(openPlaygroundSession, {
        ...config,
        chatId: this.chatId,
        wsBase: PLAYGROUND_WS_BASE,
      });
      if (config.signal) {
        this.abortSignal = config.signal;
        this.abortListener = () => {
          void this.close();
        };
        config.signal.addEventListener("abort", this.abortListener, { once: true });
      }
      return { ok: true };
    } catch (error) {
      await this.close().catch(() => {});
      return { ok: false, ...classifyCfBrowserStartFailure(error) };
    }
  }

  push(raw: string): void {
    const waiter = this.waiters.shift();
    if (waiter) waiter(raw);
    else this.pending.push(raw);
  }

  async *frames(): AsyncGenerator<string> {
    while (this.pending.length > 0 || !this.closed) {
      if (this.pending.length > 0) {
        yield this.pending.shift()!;
        continue;
      }
      const frame = await new Promise<string | null>((resolve) => this.waiters.push(resolve));
      if (frame === null) return;
      yield frame;
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    if (this.abortSignal && this.abortListener) {
      this.abortSignal.removeEventListener("abort", this.abortListener);
    }
    this.abortSignal = null;
    this.abortListener = null;
    for (const waiter of this.waiters.splice(0)) waiter(null);
    const browser = this.browser;
    this.browser = null;
    if (browser) await browser.close().catch(() => {});
  }
}

async function importPlaywright(): Promise<typeof import("playwright")> {
  try {
    return await import("playwright");
  } catch {
    throw new Error(
      "Playwright is not available. Install it (npm i playwright && npx playwright install chromium) or set CLOUDFLARE_PLAYGROUND_CHROME_PATH to a Chrome binary."
    );
  }
}

// ── Executor ─────────────────────────────────────────────────────────────────

function sseChunk(
  cid: string,
  created: number,
  model: string,
  payload: { delta?: Record<string, unknown>; finish_reason?: string | null; error?: unknown }
): string {
  const base = { id: cid, object: "chat.completion.chunk", created, model };
  if (payload.error) {
    return `data: ${JSON.stringify({ ...base, error: payload.error })}\n\n`;
  }
  return `data: ${JSON.stringify({
    ...base,
    choices: [
      { index: 0, delta: payload.delta ?? {}, finish_reason: payload.finish_reason ?? null },
    ],
  })}\n\n`;
}

export class CloudflarePlaygroundExecutor extends BaseExecutor {
  constructor(
    private transportFactory: (chatId: string) => CfTransport = (chatId) =>
      new PlaywrightCfTransport(chatId),
    // Injectable so tests can force the timeout branch without waiting
    // CHAT_TIMEOUT_MS (120s) for a real timer to fire.
    private chatTimeoutMs: number = CHAT_TIMEOUT_MS,
    // Same reasoning: exercising exhaustion otherwise costs its retry budget times
    // RETRY_DELAY_MS of real wall clock per test. Unset, the budget follows the flag.
    private maxToolRetries?: number,
    private retryDelayMs: number = RETRY_DELAY_MS
  ) {
    super("cloudflare-playground", { id: "cloudflare-playground", baseUrl: PLAYGROUND_URL });
  }

  /** Execute Cloudflare text chat, rejecting media before opening its browser transport. */
  async execute(input: ExecuteInput) {
    const { body, signal, stream: wantStream } = input;
    const bodyObj = (body || {}) as Record<string, unknown>;
    if (hasUnsupportedCfImageParts(bodyObj.messages) || hasUnsupportedCfImageParts(bodyObj.input)) {
      return makeErrorResult(
        400,
        "Cloudflare Playground accepts text-only chat. Image inputs are not supported.",
        body,
        PLAYGROUND_URL
      );
    }
    const rawModel = (bodyObj.model as string) || DEFAULT_MODEL;
    if (
      ["audio", "video", "document", "file"].some((kind) =>
        containsMediaKind(
          [{ content: [bodyObj.messages, bodyObj.input, bodyObj.contents] }],
          kind as "audio" | "video" | "document" | "file"
        )
      )
    ) {
      return makeErrorResult(
        400,
        "Cloudflare Playground accepts text-only chat. Audio, video and file inputs are not supported.",
        body,
        PLAYGROUND_URL
      );
    }
    const model = rawModel.startsWith(MODEL_PREFIX) ? rawModel : MODEL_PREFIX + rawModel;
    const temperature =
      typeof bodyObj.temperature === "number" ? bodyObj.temperature : DEFAULT_TEMPERATURE;
    const chatId = `chatcmpl-cfp-${randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    // Extract tools from request (OpenAI format)
    const tools =
      (bodyObj.tools as Array<{
        type: string;
        function: { name: string; description?: string; parameters: Record<string, unknown> };
      }>) || [];
    const hasTools = tools.length > 0;

    // Build the playground payload: inject the tool contract, then enforce the
    // playground's 10-user-message conversation cap (it rejects longer ones with
    // "[429] This demo is limited to 10 messages per conversation"). Tool results
    // replay as user messages, so an agent loop fills that budget fast — without
    // trimming, every later turn of a long session fails and the client just
    // retries the same oversized payload.
    const originalMessages =
      (bodyObj.messages as Array<{ role?: string; content?: unknown }>) || [];
    const availableTools: CfToolDef[] = tools.map((t) => ({
      name: t.function.name,
      description: t.function.description,
      parameters: t.function.parameters,
    }));
    const toolNames = availableTools.map((t) => t.name);
    const nonce = hasTools ? cfToolNonce(tools) : "";

    type CfAttemptResult =
      | Extract<CfTransportStartResult, { ok: false }>
      | { ok: true; parser: CfStreamParser; timedOut: boolean };

    /**
     * One playground request, drained to completion.
     *
     * Owns the transport for the whole attempt and always opens a fresh room:
     * the playground keeps a per-room 10-user-message history, so resuming one
     * would inherit a foreign history — which is also what makes the repair
     * retry below safe to run.
     */
    const runAttempt = async (
      messages: Array<{ role?: string; content?: unknown }>,
      idSuffix: string
    ): Promise<CfAttemptResult> => {
      const transport = this.transportFactory(chatId + idSuffix);
      const started = await transport.start({
        model,
        messages: toCfMessages(
          buildCfToolConversationPrompt(
            messages as ChatCompletionMessageParam[],
            tools as ChatCompletionTool[]
          )
        ),
        temperature,
        signal,
      });
      if (started.ok !== true) return started;

      const timedOut = { current: false };
      const timer = setTimeout(() => {
        timedOut.current = true;
        void transport.close();
      }, this.chatTimeoutMs);

      const parser = new CfStreamParser(chatId + idSuffix);
      try {
        for await (const raw of transport.frames()) {
          if (signal?.aborted) break;
          parser.push(raw);
          if (parser.error || parser.done) break;
          if (timedOut.current) break;
        }
      } finally {
        clearTimeout(timer);
        await transport.close().catch(() => {});
      }
      return { ok: true, parser, timedOut: timedOut.current };
    };

    /**
     * Declared tool names in the fuzzy resolver's shape — the same list
     * finalize resolves against, so the gate and the executor can never
     * disagree about whether a name is one of the declared tools.
     */
    const requestedNames = getRequestedToolNames(tools);

    /**
     * Evaluate one raw channel of a reply against every tool-call gate. `retry`
     * is the decision: any gate that fails sets it, and the executor re-asks the
     * model with a reminder naming the exact failure. `calls` holds the accepted
     * calls when every gate passed.
     *
     * Deliberately channel-agnostic about *where* the bytes came from: the
     * playground decides whether a reply lands on `text-delta` or
     * `reasoning-delta`, and reasoner models (gpt-oss-120b observed) routinely
     * emit the whole answer — tool call included — on the reasoning channel
     * with an empty text channel. Gating only `text` was why those turns
     * returned `finish_reason: "stop"` with the call sitting unread in the
     * thinking block.
     */
    const evaluateReply = (text: string): CfGateOutcome => {
      if (!hasTools) return { calls: [], retry: false, reason: null };

      // Gate A — a reply that *is* one JSON value must be a valid envelope:
      // parseable, `type` exactly "tool_call", a name that resolves to a
      // declared tool, an `arguments` object. This is what catches
      // `{"type": "shell", ...}` and cut-off envelopes before the parser ever
      // sees them.
      const envelopeFailure = gateCfStandaloneEnvelope(text, availableTools, requestedNames);
      if (envelopeFailure) return { calls: [], retry: true, reason: envelopeFailure };

      // The parser reads every well-formed call — the XML tag ladder plus
      // embedded JSON — and finalize holds it to the nonce binding and each
      // tool's argument schema.
      const parsed = parseCfToolCalls(text, availableTools, { nonce });
      if (parsed.length > 0) {
        const calls = finalizeCfToolCalls(parsed, tools, nonce);
        // finalize returns null on any contract failure (replayed nonce,
        // undeclared name, arguments failing the schema): intent without an
        // executable call is a failed turn, not prose.
        if (calls === null) return { calls: [], retry: true, reason: "malformed_intent" };
        return { calls, retry: false, reason: null };
      }

      // Gate B — tool intent the parser could not read: an open XML block, a
      // `name(` call, a JSON envelope marker. Malformed XML-style calls retry
      // here; prose returns as a plain answer.
      if (hasMalformedCfToolIntent(text, toolNames, availableTools)) {
        return { calls: [], retry: true, reason: "malformed_intent" };
      }
      return { calls: [], retry: false, reason: null };
    };

    /**
     * Gate one reply across both of the channels it may have arrived on.
     *
     * Order is load-bearing:
     *   1. **fabrication** — a reply that emits its own `{"tool_result": …}`
     *      is untrustworthy even when it also carries a well-formed call: the
     *      model believes the tool already ran, so continuing off it would
     *      resume from an invented state;
     *   2. **the text channel**, authoritative whenever it yields anything, so
     *      a real answer is never overridden by a stray tool-shaped thought;
     *   3. **the reasoning channel**, consulted only when the text channel had
     *      nothing — this is the fallback that recovers a reasoning-only call;
     *   4. **nothing anywhere** — no text, no reasoning, no call is a blank
     *      assistant message and is retried rather than shipped.
     *
     * Pure prose in the reasoning channel with an empty text channel is *not*
     * a failure: it returns `retry: false`, and the response builder promotes
     * it to `content` so a legitimate finished-task summary still reaches the
     * client as a normal `stop`.
     */
    const evaluateReplyChannels = (text: string, reasoning: string): CfGateOutcome => {
      if (!hasTools) return { calls: [], retry: false, reason: null };

      if (hasFabricatedCfToolResult(text) || hasFabricatedCfToolResult(reasoning)) {
        return { calls: [], retry: true, reason: "fabricated_result" };
      }

      const primary = evaluateReply(text);
      if (primary.calls.length > 0 || primary.retry) return primary;

      if (reasoning.trim()) {
        const fallback = evaluateReply(reasoning);
        if (fallback.calls.length > 0 || fallback.retry) return fallback;
      }

      if (!text.trim() && !reasoning.trim()) {
        return { calls: [], retry: true, reason: "empty_response" };
      }
      return primary;
    };

    const attemptMessages = (repairNote?: string) =>
      repairNote ? [...originalMessages, { role: "user", content: repairNote }] : originalMessages;

    const attempt = await runAttempt(attemptMessages(), "");
    if (attempt.ok !== true) {
      return makeErrorResult(
        attempt.status,
        attempt.message,
        body,
        PLAYGROUND_URL,
        attempt.fallbackHint ? { "X-Omni-Fallback-Hint": attempt.fallbackHint } : undefined
      );
    }

    let parser = attempt.parser;
    let timedOut = attempt.timedOut;

    /**
     * Gate a finished attempt's reply.
     *
     * An upstream error frame (rate limit, blocked session) or our own chat
     * timer means the reply never arrived — it is not a tool-call failure and
     * must not be charged against the model's retry budget, or a single 3021
     * would burn all ten attempts while the upstream stays unhappy.
     */
    const gateReply = (p: CfStreamParser, timedOutFlag: boolean): CfGateOutcome => {
      if (p.error) return { calls: [], retry: false, reason: null };
      if (timedOutFlag && !p.text.trim() && !p.reasoningText.trim()) {
        return { calls: [], retry: false, reason: null };
      }
      return evaluateReplyChannels(p.text, p.reasoningText);
    };

    let gate = gateReply(parser, timedOut);

    const strictToolRecovery = isRegisteredFeatureFlagEnabled(STRICT_TOOL_RECOVERY_FLAG);
    const maxToolRetries =
      this.maxToolRetries ?? (strictToolRecovery ? MAX_TOOL_RETRIES : DEFAULT_TOOL_RETRIES);

    // Retry loop: any failed gate re-asks the model (up to maxToolRetries
    // times, one fresh room each) with a reminder naming the exact failure.
    let retryCount = 0;
    while (gate.retry && retryCount < maxToolRetries && !signal?.aborted) {
      retryCount++;

      const reminder = buildToolRetryReminder(
        gate.reason ?? "malformed_intent",
        availableTools,
        nonce
      );
      const retrySuffix = `-retry-${retryCount}`;

      await waitForRetryDelay(this.retryDelayMs, signal);
      if (signal?.aborted) break;

      const retry = await runAttempt(attemptMessages(reminder), retrySuffix);
      if (retry.ok === true) {
        parser = retry.parser;
        timedOut = retry.timedOut;
        gate = gateReply(parser, timedOut);
      } else {
        gate = { calls: [], retry: false, reason: null };
        break;
      }
    }

    let toolCalls = gate.calls;

    // Retry if a request that carries tools got a response ending with a colon
    // (mid-sentence stop) and no tool call — the model stopped before acting. A
    // tool-less reply ending in a colon is a normal answer and opens no second session.
    // Skipped when the gate loop already exhausted: that reply has been re-asked
    // `maxToolRetries` times, and one more attempt without a reminder would reproduce
    // the same failure.
    const responseEndsWithColon = parser.text.trim().endsWith(":");
    if (
      hasTools &&
      !gate.retry &&
      responseEndsWithColon &&
      toolCalls.length === 0 &&
      !timedOut &&
      !signal?.aborted
    ) {
      const colonRetry = await runAttempt(attemptMessages(), "-colon-retry");
      if (colonRetry.ok === true) {
        parser = colonRetry.parser;
        timedOut = colonRetry.timedOut;
        gate = gateReply(parser, timedOut);
        toolCalls = gate.calls;
      }
    }

    /**
     * Hard failure, only with the flag on: the model was re-asked
     * `maxToolRetries` times and still never produced a usable call. Returning
     * its last broken reply as `finish_reason: "stop"` is what made OpenCode
     * appear to stop mid-task with no error at all — the client had no way to
     * tell a finished turn from an unrecoverable one. Non-streaming reports it
     * as HTTP 502 (which OmniRoute's fallback treats as a retryable upstream
     * failure, so the router can move the request to another provider);
     * streaming has already committed 200, so it emits an error chunk before
     * `[DONE]`. With the flag off the last reply is returned as an answer.
     *
     * A reply that legitimately has no call — prose, a promoted summary — has
     * `retry: false` and never reaches this branch, and neither does a request
     * the client abandoned, whose retries were cut short rather than exhausted.
     */
    let recoveryFailure: { message: string; failure: CfToolGateFailure; attempts: number } | null =
      null;
    if (strictToolRecovery && gate.retry && gate.reason && !signal?.aborted) {
      const failure = gate.reason;
      const attempts = 1 + retryCount;
      recoveryFailure = {
        failure,
        attempts,
        message:
          `Cloudflare Playground model failed to produce a valid tool call after ` +
          `${attempts} attempt${attempts === 1 ? "" : "s"} ` +
          `(last failure: ${failure}). The tool was never executed.`,
      };
    }

    /**
     * A reasoner that answered entirely on the reasoning channel still
     * produced an answer. Promote it to `content` so a finished-task summary
     * reaches the client as a normal `stop` instead of `content: null` — the
     * text channel always wins when it has anything.
     */
    const reasoningContent = stripCfToolResults(
      stripCfToolMarkup(
        parser.reasoningText,
        availableTools.map((t) => t.name)
      )
    );
    const promoteReasoning =
      !parser.text.trim() && Boolean(reasoningContent.trim()) && toolCalls.length === 0;
    const answerText = promoteReasoning ? reasoningContent : parser.text;
    const emittedReasoning = promoteReasoning ? "" : reasoningContent;

    if (!wantStream) {
      if (parser.error) {
        return makeErrorResult(parser.error.status, parser.error.message, body, PLAYGROUND_URL);
      }
      if (timedOut && !parser.text) {
        return makeErrorResult(504, "Cloudflare Playground timed out", body, PLAYGROUND_URL);
      }
      if (recoveryFailure) {
        return makeErrorResult(502, recoveryFailure.message, body, PLAYGROUND_URL);
      }

      const text = answerText;
      let finishReason = parser.finishReason ?? "stop";
      let content: string | null = text;
      if (toolCalls.length > 0) {
        finishReason = "tool_calls";
        // Strip tool markup from content
        content = stripCfToolMarkup(
          text,
          availableTools.map((t) => t.name)
        );
        if (!content) content = null;
      }

      const messagePayload: Record<string, unknown> = { role: "assistant", content };
      if (emittedReasoning) {
        messagePayload.reasoning_content = emittedReasoning;
      }
      if (toolCalls.length > 0) {
        messagePayload.tool_calls = toolCalls.map((tc) => ({
          id: tc.id,
          type: "function",
          function: { name: tc.name, arguments: tc.arguments },
        }));
      }

      return {
        response: new Response(
          JSON.stringify({
            id: chatId,
            object: "chat.completion",
            created,
            model: rawModel,
            choices: [
              {
                index: 0,
                message: messagePayload,
                finish_reason: finishReason,
              },
            ],
            usage: {
              prompt_tokens: 0,
              completion_tokens: Math.ceil((text.length + emittedReasoning.length) / 4),
              total_tokens: 0,
            },
          }),
          { headers: { "Content-Type": "application/json" } }
        ),
        url: PLAYGROUND_URL,
        headers: {},
        transformedBody: body,
      };
    }

    // Streaming: buffer the full response first, then parse tool calls and emit clean chunks
    const encoder = new TextEncoder();
    const bufferError = parser.error ?? null;
    const bufferReasoning = emittedReasoning;

    const fullText = answerText;
    let finishReason = parser.finishReason ?? "stop";
    let content: string | null = fullText;
    if (toolCalls.length > 0) {
      finishReason = "tool_calls";
      content = stripCfToolMarkup(fullText, toolNames);
      if (!content) content = null;
    } else if (recoveryFailure) {
      // Never stream a half-answered turn as `finish_reason: "stop"`: the
      // client would read it as a normal completion (this is exactly how the
      // reasoning-channel bug shipped). Nothing of the broken reply goes out
      // ahead of the error — see the error chunk below.
      content = null;
      finishReason = "stop";
    }

    // Build the response stream
    const responseStream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const enqueue = (payload: {
          delta?: Record<string, unknown>;
          finish_reason?: string | null;
          error?: unknown;
        }) => {
          controller.enqueue(encoder.encode(sseChunk(chatId, created, rawModel, payload)));
        };

        try {
          // Emit role
          enqueue({ delta: { role: "assistant" }, finish_reason: null });

          // Emit reasoning if present — suppressed on a failed recovery, where
          // there is no trustworthy answer to stream at all.
          if (bufferReasoning && !recoveryFailure) {
            enqueue({ delta: { reasoning_content: bufferReasoning }, finish_reason: null });
          }

          // Emit content (without tool markup)
          if (content) {
            enqueue({ delta: { content }, finish_reason: null });
          }

          // Emit tool_calls if present — one delta per call, each carrying its
          // `index`. A streaming client keys the calls it reassembles on that
          // index (it is how the OpenAI SDK accumulates them), so a batch
          // without one collapses N parallel calls into a single call whose name
          // and arguments are the concatenation of all of them.
          toolCalls.forEach((tc, index) => {
            enqueue({
              delta: {
                tool_calls: [
                  {
                    index,
                    id: tc.id,
                    type: "function",
                    function: { name: tc.name, arguments: tc.arguments },
                  },
                ],
              },
              finish_reason: null,
            });
          });

          // Handle errors
          if (bufferError) {
            enqueue({
              error: {
                message: bufferError.message,
                type: "upstream_error",
                code: `HTTP_${bufferError.status}`,
              },
            });
          } else if (timedOut) {
            enqueue({
              error: {
                message: "Cloudflare Playground timed out",
                type: "timeout_error",
                code: "HTTP_504",
              },
            });
          } else if (recoveryFailure) {
            // The streaming response already committed HTTP 200, so the only
            // way left to fail loudly is an error chunk before [DONE] — the
            // same channel the timeout_error above uses. Message goes through
            // no upstream text (it is ours), but is still bounded and
            // stack-free: it carries the gate reason and attempt count only.
            enqueue({
              error: {
                message: recoveryFailure.message,
                type: "tool_call_recovery_failed",
                code: "HTTP_502",
              },
            });
          }

          // Final chunk with finish_reason
          enqueue({ delta: {}, finish_reason: finishReason });
        } catch (error) {
          if (!signal?.aborted) controller.error(error);
        } finally {
          // The attempt helper already closed its transport; the whole reply was
          // buffered above, so there is nothing left to drain here.
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
      cancel() {
        // Nothing to release: the attempt's transport was closed before this
        // stream was handed to the client.
      },
    });

    return {
      response: new Response(responseStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }),
      url: PLAYGROUND_URL,
      headers: {},
      transformedBody: body,
    };
  }
}
