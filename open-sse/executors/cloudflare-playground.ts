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
import { randomUUID } from "crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { isMissingBrowserExecutable } from "./browserExecutableCheck.ts";
import { makeExecutorErrorResult as makeErrorResult } from "../utils/error.ts";
import { connectObscuraBrowser } from "../services/obscura.ts";
import type { Browser, Page } from "playwright";
import {
  parseCfToolCalls,
  buildCfToolConversationPrompt,
  stripCfToolMarkup,
  finalizeCfToolCalls,
  hasMalformedCfToolIntent,
  cfToolNonce,
  cfMessageText,
  truncateCfMessage,
  type CfParsedToolCall,
  type CfToolDef,
} from "../translator/cloudflarePlaygroundTools.ts";

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

/**
 * Maximum number of retry attempts for tool call validation failures.
 */
const MAX_TOOL_RETRIES = 3;

/**
 * Delay between retry attempts in milliseconds.
 */
const RETRY_DELAY_MS = 5000;

/**
 * Build a targeted corrective reminder based on the specific validation failure.
 */
function buildToolRetryReminder(
  failure:
    | "invalid_json"
    | "missing_type"
    | "wrong_type"
    | "missing_name"
    | "invalid_name"
    | "missing_arguments"
    | "malformed_intent",
  availableTools: CfToolDef[],
  nonce: string
): string {
  const toolNames = availableTools.map((t) => t.name).join(", ");
  const schemaExample =
    '{"type": "tool_call", "name": "<tool>", "arguments": {...}, "_nonce": "' + nonce + '"}';

  switch (failure) {
    case "invalid_json":
      return (
        "Your previous response was not valid JSON. The tool contract requires a single JSON object (or an array of them) " +
        "with no syntax errors. " +
        "Here is the expected format:\n" +
        schemaExample +
        "\n\n" +
        "Available tools: " +
        toolNames +
        "\n" +
        "Reply with ONLY the JSON call(s), no markdown, no explanation."
      );
    case "missing_type":
      return (
        "Your previous response is missing the required 'type' field. Every tool call must include " +
        '"type": "tool_call" to mark it as a call. ' +
        "Here is the expected format:\n" +
        schemaExample +
        "\n\n" +
        "Available tools: " +
        toolNames +
        "\n" +
        "Retry with the correct type field."
      );
    case "wrong_type":
      return (
        'Your previous response has an invalid "type" value. It must be exactly "tool_call" (case-sensitive). ' +
        "Here is the expected format:\n" +
        schemaExample +
        "\n\n" +
        "Available tools: " +
        toolNames +
        "\n" +
        'Retry with type set to exactly "tool_call".'
      );
    case "missing_name":
      return (
        "Your previous response is missing the required 'name' field. Every tool call must specify " +
        "which tool to invoke. " +
        "Here is the expected format:\n" +
        schemaExample +
        "\n\n" +
        "Available tools: " +
        toolNames +
        "\n" +
        "Retry with a valid tool name from the list above."
      );
    case "invalid_name":
      return (
        "Your previous response specified a tool name that is not available. " +
        "Here is the expected format:\n" +
        schemaExample +
        "\n\n" +
        "Available tools: " +
        toolNames +
        "\n" +
        "Retry with a valid tool name from the list above."
      );
    case "missing_arguments":
      return (
        "Your previous response is missing the required 'arguments' field, or it is null/empty. " +
        "Every tool call must include an 'arguments' object with the tool's declared parameters. " +
        "Here is the expected format:\n" +
        schemaExample +
        "\n\n" +
        "Available tools: " +
        toolNames +
        "\n" +
        "Retry with a valid arguments object."
      );
    case "malformed_intent":
    default:
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
}

/**
 * Validate a parsed tool call object for required fields and correctness.
 * Returns null if valid, or a failure reason string if invalid.
 */
function validateParsedToolCall(
  call: unknown,
  availableTools: CfToolDef[]
):
  | "invalid_json"
  | "missing_type"
  | "wrong_type"
  | "missing_name"
  | "invalid_name"
  | "missing_arguments"
  | null {
  // Must be a valid JSON object
  if (!call || typeof call !== "object" || Array.isArray(call)) {
    return "invalid_json";
  }

  const obj = call as Record<string, unknown>;

  // Check type field exists and is exactly "tool_call"
  if (!Object.hasOwn(obj, "type")) {
    return "missing_type";
  }
  if (obj.type !== "tool_call") {
    return "wrong_type";
  }

  // Check name field exists, is non-null, and is a declared tool
  if (!Object.hasOwn(obj, "name") || obj.name === null || obj.name === undefined) {
    return "missing_name";
  }
  if (typeof obj.name !== "string") {
    return "invalid_name";
  }
  const toolNames = new Set(availableTools.map((t) => t.name));
  if (!toolNames.has(obj.name)) {
    return "invalid_name";
  }

  // Check arguments field exists and is a non-null object
  if (!Object.hasOwn(obj, "arguments") || obj.arguments === null || obj.arguments === undefined) {
    return "missing_arguments";
  }
  if (typeof obj.arguments !== "object" || Array.isArray(obj.arguments)) {
    return "missing_arguments";
  }

  return null;
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
    private chatTimeoutMs: number = CHAT_TIMEOUT_MS
  ) {
    super("cloudflare-playground", { id: "cloudflare-playground", baseUrl: PLAYGROUND_URL });
  }

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
            messages,
            tools as Array<{
              type: string;
              function: {
                name: string;
                description?: string;
                parameters: Record<string, unknown>;
              };
            }>
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
     * Sleep helper for retry delays.
     */
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    /**
     * Turn one raw reply into tool calls, held to the nonce + argument-schema
     * contract. Returns null if the reply expressed tool intent but failed
     * validation (triggering a retry), or an empty array if no tool calls.
     * Returns the accepted calls on success.
     */
    const parseAttempt = (text: string): CfParsedToolCall[] | null => {
      if (!hasTools) return [];
      const parsed = parseCfToolCalls(text, availableTools, { nonce });
      if (parsed.length === 0) {
        // The real schemas matter: without them a nameless payload looks
        // ambiguous and every such turn would be retried forever.
        return hasMalformedCfToolIntent(text, toolNames, availableTools) ? null : [];
      }
      return finalizeCfToolCalls(parsed, tools, nonce);
    };

    /**
     * Validate tool calls from the parser output. Checks each call for required
     * fields (type, name, arguments) and correctness. Returns null if all valid,
     * or a failure reason string for the first invalid call.
     */
    const validateToolCalls = (calls: CfParsedToolCall[]): string | null => {
      for (const call of calls) {
        // The parser returns objects with id, name, arguments - we need to check
        // the original parsed format which should have type, name, arguments
        const validation = validateParsedToolCall(
          { type: "tool_call", name: call.name, arguments: JSON.parse(call.arguments) },
          availableTools
        );
        if (validation) return validation;
      }
      return null;
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
    let toolCalls = parseAttempt(parser.text);

    // Check if the last message ends with ":" (mid-sentence stop) and retry
    const lastAssistantMessage = [...originalMessages]
      .reverse()
      .find((m) => m.role === "assistant" && typeof m.content === "string");
    const endsWithColon = lastAssistantMessage?.content?.trim().endsWith(":");

    // Retry loop for tool call validation failures (up to MAX_TOOL_RETRIES times)
    let retryCount = 0;
    while (toolCalls === null && retryCount < MAX_TOOL_RETRIES) {
      retryCount++;

      // Determine the failure reason for targeted reminder
      let failureReason:
        | "invalid_json"
        | "missing_type"
        | "wrong_type"
        | "missing_name"
        | "invalid_name"
        | "missing_arguments"
        | "malformed_intent" = "malformed_intent";

      if (hasTools && parser.text) {
        const parsed = parseCfToolCalls(parser.text, availableTools, { nonce });
        if (parsed.length > 0) {
          const validationFailure = validateToolCalls(parsed);
          if (validationFailure) {
            failureReason = validationFailure;
          }
        }
      }

      const reminder = buildToolRetryReminder(failureReason, availableTools, nonce);
      const retrySuffix = `-retry-${retryCount}`;

      await sleep(RETRY_DELAY_MS);

      const retry = await runAttempt(attemptMessages(reminder), retrySuffix);
      if (retry.ok === true) {
        parser = retry.parser;
        timedOut = retry.timedOut;
        toolCalls = parseAttempt(parser.text);
      } else {
        toolCalls = [];
        break;
      }
    }

    // A reply that carried tool intent but no readable call gets handled above
    // via the retry loop. If still null after retries, treat as plain text.
    if (toolCalls === null) {
      toolCalls = [];
    }

    // Retry if last assistant message ends with colon (mid-sentence)
    if (endsWithColon && toolCalls.length === 0 && !timedOut) {
      const colonRetry = await runAttempt(attemptMessages(), "-colon-retry");
      if (colonRetry.ok === true) {
        parser = colonRetry.parser;
        timedOut = colonRetry.timedOut;
        toolCalls = parseAttempt(parser.text) ?? [];
      }
    }

    if (!wantStream) {
      if (parser.error) {
        return makeErrorResult(parser.error.status, parser.error.message, body, PLAYGROUND_URL);
      }
      if (timedOut && !parser.text) {
        return makeErrorResult(504, "Cloudflare Playground timed out", body, PLAYGROUND_URL);
      }

      const text = parser.text;
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
      if (parser.reasoningText) {
        messagePayload.reasoning_content = parser.reasoningText;
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
              completion_tokens: Math.ceil((text.length + parser.reasoningText.length) / 4),
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
    const bufferReasoning = parser.reasoningText;

    const fullText = parser.text;
    let finishReason = parser.finishReason ?? "stop";
    let content: string | null = fullText;
    if (toolCalls.length > 0) {
      finishReason = "tool_calls";
      content = stripCfToolMarkup(fullText, toolNames);
      if (!content) content = null;
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

          // Emit reasoning if present
          if (bufferReasoning) {
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
