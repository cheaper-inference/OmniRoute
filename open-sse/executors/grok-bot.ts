import { randomUUID } from "node:crypto";
import fs from "node:fs";
import { BaseExecutor, type ExecuteInput, type ExecutorExecuteResult } from "./base.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";
import {
  queueFile,
  readQueue,
  removeFromQueue,
  enqueueCleanup,
  type PendingCleanup,
} from "./grok-bot-cleanup-queue.ts";
import { PROVIDERS, HTTP_STATUS } from "../config/constants.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import { readConnectFrames } from "../utils/connectFrames.ts";
import { startBridgeTurn } from "./grok-bot-bridge.ts";
import type { BridgeCloseReason } from "../services/grokBotBridgeRegistry";

/**
 * Grok Bot executor -- single-account, plain-conversation path.
 *
 * Wire contract (spec: _tasks/superpowers/specs/2026-09-22-grok-bot-executor-integration.md):
 * - A fresh temporal agent is created per request via
 *   aiserver.v1.GrokBotService/CreateGrokBotTemporalAgent. The agentId is a
 *   locally generated nonce the server echoes back; a mismatched or
 *   non-temporal response fails BEFORE any user message is sent.
 * - The conversation turn runs against WatchGrokBotTranscripts with an empty
 *   sessionId (a client-invented session id is rejected by the server with 404;
 *   an empty string means "the agent's current turn").
 * - The turn is settled by the agent's running flag: once the watch has seen
 *   the flag true, it ends when the flag is false or absent. An absent flag
 *   counts as not running.
 * - The agent is deleted in a finally block by roster row id with an
 *   independent timeout, so cancellation of the turn cannot strand it.
 * - If creation times out or the delete fails, a pending-cleanup record is
 *   queued (persisted next to DATA_DIR) and reconciled before the next
 *   conversation on the same connection.
 *
 * Tool round-trips are out of scope for this executor: OmniRoute is a
 * stateless router, so a turn containing tool calls ends when the tool call
 * is surfaced; the caller replays full history on the next request
 * (stateless-full-history contract).
 */

const GROK_BOT_SERVICE = "aiserver.v1.GrokBotService";
const CREATE_TIMEOUT_MS = 45_000;
/** Remote delete is best-effort inside the request; the queue owns retries. */
const DELETE_TIMEOUT_MS = 15_000;
const WATCH_IDLE_TIMEOUT_MS = 240_000;
// The server silently drops watch streams that go quiet; reconnect well before
// the upstream/proxy idle cut. Measured live: a settled turn idles the stream
// within seconds, and every reconnect replays from the generation-0 baseline.
const WATCH_READ_TIMEOUT_MS = 20_000;
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
const HARNESS_TEMPORAL = 2;
// Client-invented session ids are rejected (404, measured); empty string means
// "the agent's current turn".
const EMPTY_SESSION_ID = "";
// SendGrokBotUserMessage rejects text over 200000 characters (measured live
// 2026-10-06, HTTP 400 "text exceeds the maximum length of 200000"). The
// margin leaves room for the trailing instruction lines and the newlines
// joining them.
const MAX_PROMPT_CHARS = 190_000;
// SendGrokBotUserMessage requires a machineId (client-side sandbox machine
// identity). The live server accepts a random UUID. It is per-executor-instance
// (not module-level) so coexisting executor instances do not share a machine
// identity; see the review finding on cross-tenant shared state (r5).

type Transport = {
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
  const framed = opts.stream
    ? (() => {
        const json = new TextEncoder().encode(body);
        const head = new Uint8Array(5);
        head[0] = 0;
        new DataView(head.buffer).setUint32(1, json.length, false);
        const out = new Uint8Array(5 + json.length);
        out.set(head);
        out.set(json, 5);
        return out;
      })()
    : body;
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

function isTimeoutError(err: unknown): boolean {
  return (
    err instanceof Error &&
    (err.name === "TimeoutError" || err.name === "AbortError" || /timed out/i.test(err.message))
  );
}

function remoteMcpServers(): Record<string, { url: string; headers?: Record<string, string> }> {
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

function namesAClientTool(text: string, tools: unknown[]): boolean {
  for (const tool of tools) {
    const name = (tool as { function?: { name?: unknown } })?.function?.name;
    if (typeof name === "string" && name && text.includes(name)) return true;
  }
  return false;
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
function renderConversation(messages: unknown[]): { lines: string[]; count: number } {
  const lines: string[] = [];
  for (const m of Array.isArray(messages) ? messages : []) {
    const msg = m as ChatMessage;
    const content = messageText(msg?.content);
    const calls = Array.isArray(msg?.tool_calls) ? msg.tool_calls : [];
    if (!content && !calls.length) continue;
    if (msg.role === "system") lines.push(content);
    else if (msg.role === "assistant") {
      if (content) lines.push(`Assistant: ${content}`);
      for (const call of calls) lines.push(describeCall(call));
    } else if (msg.role === "tool")
      lines.push(`Tool result${msg.tool_call_id ? " (" + msg.tool_call_id + ")" : ""}: ${content}`);
    else lines.push(`User: ${content}`);
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

function composePrompt(
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

function chatCompletionBody(model: string, content: string, id: string) {
  return {
    id,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  };
}

function toolCallBody(
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

function sseChunk(model: string, content: string, id: string) {
  return {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta: { role: "assistant", content }, finish_reason: null }],
  };
}

function sseFinish(model: string, id: string, reason = "stop") {
  return {
    id,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta: {}, finish_reason: reason }],
  };
}

function sseToolCallChunk(
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

function errResponse(status: number, message: string, type = "upstream_error") {
  return new Response(JSON.stringify({ error: { message, type, code: null } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

type StartedBridge = {
  url: string;
  call: (challenge: string) => string;
  /** Registry-backed turns expose a non-blocking close; test fakes omit it. */
  close?: (reason: BridgeCloseReason) => void;
  /** Internally generated challenge on registry-backed turns (spec step 1). */
  challenge?: string;
  /** Tool calls the model made during the turn, read back when it ends. */
  invocations?: Array<{ name: string; arguments: unknown }>;
};

type BridgeController = {
  start: (publicBaseUrl?: string, options?: BridgeTurnOptions) => Promise<StartedBridge>;
  stop: () => Promise<void>;
};

/** Per-turn wiring forwarded to the registry-backed bridge (spec steps 9/12). */
type BridgeTurnOptions = {
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

export class GrokBotExecutor extends BaseExecutor {
  private readonly machineId = randomUUID();
  private bridgeController: BridgeController | null = createDefaultBridgeController();
  private readonly bridgeLifecycle: string[] = [];
  private readonly usedBridgeNonces = new Set<string>();

  bridgeLifecycleForTests(): string[] {
    return [...this.bridgeLifecycle];
  }

  setBridgeControllerForTests(controller: BridgeController | null): void {
    this.bridgeController = controller;
  }

  constructor() {
    super("grok-bot", PROVIDERS["grok-bot"]);
  }

  buildUrl(): string {
    return PROVIDERS["grok-bot"]?.baseUrl ?? "https://api2.cursor.sh";
  }

  /** Drain pending cleanups for this connection before a new conversation. */
  private async drainPendingCleanups(
    connectionId: string | null | undefined,
    accessToken: string,
    log: { warn?: (...a: unknown[]) => void } | null
  ): Promise<void> {
    if (!connectionId) return;
    const q = readQueue();
    const mine = q.filter((i) => i.connectionId === connectionId);
    if (mine.length === 0) return;
    const t = getTransport(accessToken);
    const remaining: PendingCleanup[] = [];
    for (const item of q) {
      if (item.connectionId !== connectionId) {
        remaining.push(item);
        continue;
      }
      try {
        let rowId = item.rowId;
        if (!rowId && item.agentId) {
          const roster = (await t.rpc("ListGrokBotAgents", {})) as {
            agents?: { id?: string; agentId?: string }[];
          };
          const row = roster?.agents?.find((a) => a.agentId === item.agentId);
          if (!row?.id) {
            // Roster failure keeps the item; roster miss means it is gone.
            remaining.push(item);
            continue;
          }
          rowId = row.id;
        }
        if (rowId) {
          await t.rpc("DeleteGrokBotAgent", { id: rowId });
        }
        // Remove this item from the on-disk queue immediately, inside one
        // synchronous read-filter-write section. The previous shape wrote the
        // whole `remaining` snapshot after the loop, so a concurrent
        // enqueueCleanup during the awaited deletes was silently overwritten
        // (review finding r8).
        removeFromQueue(item);
      } catch (err) {
        log?.warn?.("GROK_BOT", `cleanup reconcile failed: ${sanitizeErrorMessage(err)}`);
        remaining.push(item);
      }
    }
    // Items that survived (roster failure or delete error) were already kept
    // on disk; `remaining` is retained for callers/tests that inspect it.
    void remaining;
  }

  private async ensureAccessToken(input: {
    credentials?: { accessToken?: string; refreshToken?: string; connectionId?: string };
    log?: { warn?: (...a: unknown[]) => void } | null;
  }): Promise<string | null> {
    const creds = input.credentials;
    if (creds?.accessToken) return creds.accessToken;
    const refreshed = await this.refreshCredentials(creds as never, input.log ?? undefined);
    return refreshed?.accessToken ?? null;
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const log = input.log ?? null;
    const creds = input.credentials ?? {};
    const connectionId = creds.connectionId ?? null;
    // ExecuteInput.body is opaque to the base class; the fields this executor
    // reads are narrowed once here rather than at every use site.
    const requestBody = (input.body ?? {}) as {
      messages?: unknown[];
      model?: string;
      grokBotBridge?: { url?: string; challenge?: string };
      tools?: unknown[];
      tool_choice?: unknown;
      parallel_tool_calls?: boolean;
    };
    const model = input.model ?? requestBody.model ?? "grok-bot";
    const stream = input.stream === true;
    const id = `chatcmpl-${randomUUID()}`;

    const accessToken = await this.ensureAccessToken(input);
    if (!accessToken) {
      return errResponse(HTTP_STATUS.UNAUTHORIZED ?? 401, "missing access token");
    }
    await this.drainPendingCleanups(connectionId, accessToken, log);

    const t = getTransport(accessToken);
    // One agent per request. The dashboard keeps a durable agent bound to the
    // connection, and inference must not borrow it: two callers on one
    // connection would share a transcript, and skills or routines attached to
    // the console agent would end up applying to API traffic.
    const agentId = randomUUID();
    let rowId: string | null = null;
    let createdOk = false;
    // Deletion is owned by whoever finishes last: the non-stream branch awaits
    // the turn inline; the stream branch hands ownership to the ReadableStream's
    // finally so the agent outlives the SSE body. Without the handoff, execute's
    // finally deletes the agent while the watch stream is still live
    // (review finding r7).
    let deleteOwnershipTransferred = false;
    let deleteAgentRef: () => Promise<void> = async () => {};

    let startedBridge: StartedBridge | null = null;
    let turnController: AbortController | null = null;
    try {
      let created: unknown;
      try {
        created = await t.rpc(
          "CreateGrokBotTemporalAgent",
          {
            agentId,
            name: "omni-grok-bot",
            description:
              "OmniRoute single-conversation bridge agent. Do not use tools, files, network, integrations, memory storage, or computer access.",
            title: "",
            avatarShape: "",
            avatarColor: "",
            harness: HARNESS_TEMPORAL,
            kickstartRequested: false,
            introductionSuppressed: true,
            language: "en",
          },
          { signal: AbortSignal.timeout(CREATE_TIMEOUT_MS) }
        );
      } catch (err) {
        if (isTimeoutError(err)) {
          // Server may or may not have created the agent -- reconcile via the
          // roster before the next conversation on this connection.
          enqueueCleanup({ connectionId, agentId, createdAt: new Date().toISOString() });
        }
        throw err;
      }

      // Live response shape (measured 2026-09-23): our client nonce comes back
      // as `legacyAgentId`, the roster primary key lives in `agent.id`, and the
      // harness echoes as the lowercase string name.
      const agent = (
        created as {
          agent?: { id?: string; agentId?: string; legacyAgentId?: string; harness?: string };
        }
      )?.agent;
      if (!agent || agent.legacyAgentId !== agentId || agent.harness !== "temporal") {
        return errResponse(
          HTTP_STATUS.BAD_GATEWAY ?? 502,
          "CreateGrokBotTemporalAgent returned an invalid agent"
        );
      }
      rowId = agent.id ?? null;
      createdOk = true;

      // Bind remote cleanup the moment the agent exists: any later failure
      // (send, discovery, prompt build) must still delete it. Binding after
      // the send left a window where a failed discovery leaked the agent
      // (review finding, slice 4d R1).
      deleteAgentRef = async (): Promise<void> => {
        if (!rowId) {
          // The create response did not carry a roster id. The sweeper resolves
          // agentId -> id through the roster and deletes it there.
          enqueueCleanup({ connectionId, agentId, createdAt: new Date().toISOString() });
          return;
        }
        try {
          await t.rpc(
            "DeleteGrokBotAgent",
            { id: rowId },
            { signal: AbortSignal.timeout(DELETE_TIMEOUT_MS) }
          );
        } catch (err) {
          enqueueCleanup({ connectionId, agentId, rowId, createdAt: new Date().toISOString() });
          log?.warn?.("GROK_BOT", `agent cleanup failed: ${sanitizeErrorMessage(err)}`);
        }
      };

      const clientToolList = Array.isArray(requestBody.tools) ? requestBody.tools : [];
      const bridge =
        requestBody.grokBotBridge ??
        (clientToolList.length > 0 &&
        requestBody.tool_choice !== "none" &&
        process.env.GROK_BOT_PUBLIC_BRIDGE_URL
          ? { url: process.env.GROK_BOT_PUBLIC_BRIDGE_URL, challenge: randomUUID() }
          : undefined);
      if (bridge && !bridge.url) {
        return errResponse(HTTP_STATUS.BAD_GATEWAY ?? 502, "Request bridge URL is missing");
      }
      if (bridge && this.bridgeController && !process.env.GROK_BOT_PUBLIC_BRIDGE_URL) {
        // Stop switch (spec deployment step 9): while the public bridge URL
        // is cleared, automatic derivation is off AND explicit bridge input
        // is rejected. Controller-less configurations (test fakes, legacy
        // ingress) are not production ingress and stay unaffected.
        return errResponse(HTTP_STATUS.BAD_GATEWAY ?? 502, "Request bridge is disabled");
      }
      if (
        bridge &&
        bridge.url !== process.env.GROK_BOT_PUBLIC_BRIDGE_URL &&
        !/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(?:\/|$)/.test(bridge.url ?? "")
      ) {
        return errResponse(
          HTTP_STATUS.BAD_GATEWAY ?? 502,
          "Request bridge URL must stay on loopback"
        );
      }
      if (bridge && !this.bridgeController && !bridge.challenge) {
        // The controller path generates its own challenge (spec step 1), so
        // the request's legacy challenge field is not required there; only
        // controller-less configurations (test fakes, legacy ingress) still
        // depend on the client-supplied value.
        return errResponse(HTTP_STATUS.BAD_GATEWAY ?? 502, "Request bridge challenge is missing");
      }

      let bridgeUrl = bridge?.url;
      let bridgeCall: ((challenge: string) => string) | undefined;
      let advertisedToolName: string | undefined;
      let advertised: Array<{ name: string; description?: string; inputSchema?: unknown }> = [];
      if (bridge) {
        this.bridgeLifecycle.length = 0;
        if (this.bridgeController) {
          this.bridgeLifecycle.push("start");
          // Turn-scoped cancel convergence (spec steps 9/10/12): one signal
          // drives the upstream watch, the registry close, and the unread
          // escalation; client cancel and forced abort land on the same path.
          turnController = new AbortController();
          const clientTools = Array.isArray(requestBody.tools) ? requestBody.tools : [];
          advertised = clientTools.flatMap(
            (tool: {
              function?: { name?: string; description?: string; parameters?: unknown };
            }) => {
              const fn = tool?.function;
              if (!fn || typeof fn.name !== "string" || !fn.name) return [];
              const schema = fn.parameters;
              const inputSchema =
                schema && typeof schema === "object" && !Array.isArray(schema)
                  ? schema
                  : { type: "object", properties: {} };
              return [{ name: fn.name, description: fn.description, inputSchema }];
            }
          );
          const turnOptions: BridgeTurnOptions = {
            signal: turnController.signal,
            onForcedAbort: () => turnController?.abort(),
            ...(advertised.length ? { tools: advertised } : {}),
          };
          // Client cancel must converge on the same turn-scoped signal
          // (spec step 9): the watch races the combined signal, but the
          // registry close and the unread escalation only observe this one.
          if (input.signal) {
            if (input.signal.aborted) turnController.abort();
            else
              input.signal.addEventListener("abort", () => turnController?.abort(), {
                once: true,
              });
          }
          let started: StartedBridge | null = null;
          for (let attempt = 0; attempt < 2 && !started; attempt += 1) {
            try {
              started = await this.bridgeController.start(bridge.url, turnOptions);
            } catch (err) {
              if (attempt === 1) throw err;
              await this.bridgeController.stop();
            }
          }
          if (!started) throw new Error("Bridge start failed");
          startedBridge = started;
          bridgeUrl = started.url;
          bridgeCall = started.call;
          if (
            !/^https:\/\/(?!127\.0\.0\.1|localhost(?:[:/]|$))/.test(bridgeUrl ?? "") ||
            !/\/grok-bridge\/[A-Za-z0-9_-]{22}\/mcp$/.test(bridgeUrl ?? "") ||
            this.usedBridgeNonces.has(bridgeUrl ?? "")
          ) {
            return errResponse(
              HTTP_STATUS.BAD_GATEWAY ?? 502,
              "Request bridge URL must use a public HTTPS path-nonce endpoint"
            );
          }
          this.usedBridgeNonces.add(bridgeUrl ?? "");
        } else if (
          !/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(?:\/|$)/.test(bridgeUrl ?? "")
        ) {
          return errResponse(
            HTTP_STATUS.BAD_GATEWAY ?? 502,
            "Request bridge URL must stay on loopback"
          );
        }
        const remote = remoteMcpServers();
        const discovery = (await t.rpc("aiserver.v1.DashboardService/ListSandMcpTools", {
          serverIdentifiers: [...(bridge ? ["bridge"] : []), ...Object.keys(remote)],
          mcpConfigJson: JSON.stringify({
            mcpServers: {
              bridge: {
                url: bridgeUrl,
                // Spec lifecycle step 4: the executor-generated challenge
                // travels in the header; the request's legacy challenge
                // field is only a fallback for controller-less test fakes.
                headers: {
                  Authorization: `Bearer ${startedBridge?.challenge ?? bridge.challenge}`,
                },
              },
              ...remote,
            },
          }),
        })) as {
          tools?: Array<{ name?: string; toolName?: string }>;
          servers?: Array<{ tools?: Array<{ name?: string; toolName?: string }> }>;
        };
        const directTools = Array.isArray(discovery?.tools) ? discovery.tools : [];
        const serverTools = Array.isArray(discovery?.servers)
          ? discovery.servers.flatMap((server) =>
              Array.isArray(server?.tools) ? server.tools : []
            )
          : [];
        // Cursor prefixes the advertised name with the server identifier
        // and keeps the raw name in `toolName`. The bridge registers the
        // client's own tool names when the request carries tools, and
        // falls back to bridge_value only when it does not, so the match
        // has to accept both the fallback and whatever was registered.
        const registered = new Set(advertised.map((tool) => tool.name));
        const isBridgeTool = (tool: { name?: string; toolName?: string }) =>
          tool?.toolName === "bridge_value" ||
          tool?.name === "bridge_value" ||
          tool?.name === "bridge-bridge_value" ||
          (typeof tool?.toolName === "string" && registered.has(tool.toolName)) ||
          (typeof tool?.name === "string" &&
            tool.name.startsWith("bridge-") &&
            registered.has(tool.name.slice("bridge-".length)));
        const bridgeTool = [...directTools, ...serverTools].find(isBridgeTool);
        if (!bridgeTool) {
          return errResponse(
            HTTP_STATUS.BAD_GATEWAY ?? 502,
            "Request bridge tool was not discovered"
          );
        }
        // The model calls the tool by its raw name; Cursor's prefixed `name`
        // is only the discovery label and the model cannot invoke it.
        advertisedToolName = bridgeTool.toolName || bridgeTool.name;
      }

      // The prompt challenge and the discovery-config Authorization header
      // must carry the SAME value the local gate verifies (spec step 1: the
      // generated challenge on controller turns; the request challenge only
      // as legacy fallback).
      const prompt = composePrompt(
        requestBody.messages ?? [],
        startedBridge?.challenge ?? bridge?.challenge,
        advertisedToolName,
        advertised.length > 0,
        requestBody.tool_choice,
        requestBody.parallel_tool_calls !== false
      );
      const messageId = randomUUID();
      const sendPayload: Record<string, unknown> = {
        agentId,
        sessionId: EMPTY_SESSION_ID,
        machineId: this.machineId,
        messageId,
        text: prompt,
        sentAtMs: String(Date.now()),
      };
      const remote = remoteMcpServers();
      if (bridge || Object.keys(remote).length > 0) {
        const servers: Record<string, unknown> = {};
        if (bridge) {
          servers.bridge = {
            url: bridgeUrl,
            headers: {
              Authorization: `Bearer ${startedBridge?.challenge ?? bridge.challenge}`,
            },
          };
        }
        Object.assign(servers, remote);
        sendPayload.mcpConfigJson = JSON.stringify({ mcpServers: servers });
      }
      await t.rpc("SendGrokBotUserMessage", sendPayload);

      const turnSignal = turnController
        ? input.signal
          ? AbortSignal.any([input.signal, turnController.signal])
          : turnController.signal
        : (input.signal ?? null);
      const collect = this.watchTurn(t, agentId, messageId, turnSignal, input.log ?? null);
      if (!stream) {
        const text = await collect;
        if (bridge && text?.trim() === "TOOL_UNAVAILABLE") {
          return errResponse(
            HTTP_STATUS.BAD_GATEWAY ?? 502,
            "Request bridge tool was not called",
            "bridge_not_called"
          );
        }
        let answer = text;
        if (startedBridge?.invocations?.length) {
          return new Response(
            JSON.stringify(toolCallBody(model, id, startedBridge.invocations, text || null)),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
        if (bridgeCall) {
          try {
            // Registry-backed turns verify against their internally
            // generated challenge (spec step 1); fakes keep the
            // request-supplied value.
            answer = bridgeCall(startedBridge?.challenge ?? bridge?.challenge ?? "");
          } catch (err) {
            return errResponse(
              HTTP_STATUS.BAD_GATEWAY ?? 502,
              sanitizeErrorMessage(err),
              "bridge_rejected"
            );
          }
        }
        if (!answer) {
          return errResponse(HTTP_STATUS.BAD_GATEWAY ?? 502, "turn finished without an answer");
        }
        return new Response(JSON.stringify(chatCompletionBody(model, answer, id)), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      const encoder = new TextEncoder();
      // Spec step 11: a bridge body nobody reads by 29 seconds is
      // force-aborted. The first pull() is the read() that transfers
      // ownership: after it, a later cancel follows step 8 with no forced
      // abort.
      let readClaimed = false;
      let unreadTimer: ReturnType<typeof setTimeout> | null = null;
      let body: ReadableStream<Uint8Array>;
      const clearUnreadTimer = () => {
        if (unreadTimer) {
          clearTimeout(unreadTimer);
          unreadTimer = null;
        }
      };
      body = new ReadableStream<Uint8Array>(
        {
          pull() {
            readClaimed = true;
            clearUnreadTimer();
          },
          start(controller) {
            // Fire-and-forget: resolving start immediately lets pull() stay
            // read-triggered under HWM 0 while collect is still pending, so a
            // read within the deadline transfers ownership (spec step 11).
            void (async () => {
              try {
                const text = await collect;
                const calls = startedBridge?.invocations ?? [];
                if (calls.length) {
                  if (text) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify(sseChunk(model, text, id))}\n\n`)
                    );
                  }
                  calls.forEach((call, index) => {
                    controller.enqueue(
                      encoder.encode(
                        `data: ${JSON.stringify(sseToolCallChunk(model, id, index, call))}\n\n`
                      )
                    );
                  });
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify(sseFinish(model, id, "tool_calls"))}\n\n`
                    )
                  );
                } else if (
                  startedBridge &&
                  clientToolList.length > 0 &&
                  namesAClientTool(text ?? "", clientToolList)
                ) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        error: {
                          message: "Request bridge tool was not called",
                          type: "bridge_not_called",
                        },
                      })}\n\n`
                    )
                  );
                } else {
                  if (text) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify(sseChunk(model, text, id))}\n\n`)
                    );
                  }
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify(sseFinish(model, id))}\n\n`)
                  );
                }
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              } catch (err) {
                clearUnreadTimer();
                const calls = startedBridge?.invocations ?? [];
                if (
                  (err as { errorType?: unknown }).errorType === "incomplete_turn" &&
                  calls.length
                ) {
                  calls.forEach((call, index) => {
                    controller.enqueue(
                      encoder.encode(
                        `data: ${JSON.stringify(sseToolCallChunk(model, id, index, call))}\n\n`
                      )
                    );
                  });
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify(sseFinish(model, id, "tool_calls"))}\n\n`
                    )
                  );
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  return;
                }
                const turnAborted = turnController
                  ? turnController.signal.aborted
                  : (input.signal?.aborted ?? false);
                if (turnAborted) {
                  // Spec step 8 cancel paths (client cancel, upstream abort):
                  // no error frame and no [DONE]; just close the stream.
                } else {
                  // Spec step 8 timeout/upstream failure after headers: one
                  // readable error frame, then close. controller.error() is
                  // never used before the frame can be read.
                  const errorType = (err as { errorType?: unknown }).errorType;
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({
                        error: {
                          message: sanitizeErrorMessage(err),
                          type: typeof errorType === "string" ? errorType : "upstream_error",
                        },
                      })}\n\n`
                    )
                  );
                }
                return;
              } finally {
                clearUnreadTimer();
                await deleteAgentRef();
                // Idempotent: cancel paths already forced the close.
                startedBridge?.close?.("normal");
                controller.close();
              }
            })();
          },
          // HWM 0 keeps pull() read-triggered: the first read() is what
          // transfers ownership (spec step 11). A default HWM would call pull
          // eagerly and claim ownership before any reader existed.
        },
        { highWaterMark: 0 }
      );
      // Spec step 11: a bridge body nobody reads by the deadline is
      // force-aborted. Ownership evidence is the pull() fast path or an
      // attached reader (`body.locked`, observable synchronously); HWM 0
      // alone never invokes pull on a bare read().
      if (startedBridge) {
        unreadTimer = setTimeout(() => {
          unreadTimer = null;
          if (!readClaimed && !body.locked) turnController?.abort();
        }, unreadTimeoutOverrideMs ?? BRIDGE_UNREAD_TIMEOUT_MS);
        unreadTimer.unref?.();
      }
      deleteOwnershipTransferred = true;
      return new Response(body, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    } catch (err) {
      if (
        (err as { errorType?: unknown }).errorType === "incomplete_turn" &&
        startedBridge?.invocations?.length
      ) {
        return new Response(JSON.stringify(toolCallBody(model, id, startedBridge.invocations)), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      const errorType = (err as { errorType?: unknown }).errorType;
      return errResponse(
        HTTP_STATUS.BAD_GATEWAY ?? 502,
        sanitizeErrorMessage(err),
        typeof errorType === "string" ? errorType : "upstream_error"
      );
    } finally {
      // Remote agent cleanup runs first and on its own budget: a custom
      // controller whose stop() blocks must never delay it.
      if (createdOk && !deleteOwnershipTransferred) {
        await deleteAgentRef();
      }
      if (startedBridge?.close) {
        // Registry close at draining strength: new admissions stop now and
        // teardown proceeds on its own 30-second budget (spec step 7). The
        // client answer is never blocked on drain.
        this.bridgeLifecycle.push("close");
        startedBridge.close("normal");
      } else if (this.bridgeLifecycle.includes("start") && this.bridgeController) {
        this.bridgeLifecycle.push("stop");
        try {
          await this.bridgeController.stop();
        } catch (err) {
          this.bridgeLifecycle.push("stop-failed");
          log?.warn?.("GROK_BOT", `bridge stop failed: ${sanitizeErrorMessage(err)}`);
        }
      }
    }
  }

  /**
   * Watch one turn to settlement. Settlement requires having seen the agent
   * running flag true at least once; the turn ends when the flag becomes false
   * or absent. Returns the assistant text.
   *
   * Live frame shapes (measured 2026-09-23):
   *  - `agentState.live[]` carries per-agent running flags; `agent` frames are
   *    accepted as a defensive alias.
   *  - Answers arrive as `rows.entries[]` whose `body` is base64 JSON with
   *    `{ clientNonce, kind, message }`; entries whose clientNonce equals our
   *    messageId are the user's own echo and are skipped.
   *  - The server idles streams out within seconds after a turn settles, so a
   *    silent stream is reconnected with the same baseline until the deadline.
   */
  private async watchTurn(
    t: Transport,
    agentId: string,
    messageId: string,
    signal: AbortSignal | null,
    log: { warn?: (...args: unknown[]) => void } | null
  ): Promise<string> {
    let seenRunning = false;
    const parts: string[] = [];
    let submitted: string | null = null;
    let generation = 0;
    const pendingSeqs = new Set<string>();
    const pendingAcks = new Set<string>();
    const cursor = { ack: "0" };
    let staleTimer: ReturnType<typeof setTimeout> | null = null;
    let staleAbort: AbortController | null = null;
    const stopStale = () => {
      if (staleTimer) clearTimeout(staleTimer);
      staleTimer = null;
    };
    const deadline = Date.now() + WATCH_IDLE_TIMEOUT_MS;
    // Each request owns a freshly created temporal agent, so it carries no
    // transcript history and the generation-0 / seq-"0" baseline is exact.
    // Reusing an agent here would replay its earlier assistant rows into this
    // answer: those rows carry no clientNonce, so the filter below cannot tell
    // them apart from the current turn.
    let lastTrace = "";
    while (Date.now() < deadline) {
      const remaining = deadline - Date.now();
      const timeoutSignal = AbortSignal.timeout(Math.min(WATCH_READ_TIMEOUT_MS, remaining));
      if (!staleTimer) staleAbort = new AbortController();
      const link = signal
        ? AbortSignal.any([signal, timeoutSignal, staleAbort!.signal])
        : AbortSignal.any([timeoutSignal, staleAbort!.signal]);
      const missing = [...pendingAcks].map(BigInt);
      const lowest = missing.length ? missing.reduce((min, seq) => (seq < min ? seq : min)) : null;
      const rewound =
        lowest === null ? cursor.ack : lowest > BigInt(0) ? String(lowest - BigInt(1)) : "0";
      const payload = {
        cursors: [{ agentId, sessionId: EMPTY_SESSION_ID, generation, afterUpdatedSeq: rewound }],
        includeUnlistedAgents: false,
        inlineBodyMaxBytes: 65536,
      };
      try {
        const watch = t.watch("WatchGrokBotTranscripts", payload, { signal: link });
        for await (const event of watch) {
          if (process.env.GROK_BOT_WATCH_TRACE === "1") {
            const ev = event as {
              agent?: { isRunningTurn?: boolean };
              agentState?: {
                live?: Array<{
                  agentId?: string;
                  isRunning?: boolean;
                  isRunningTurn?: boolean;
                  staleAfterMs?: number | string;
                  updatedAtMs?: number | string;
                  isComposingMessage?: boolean;
                  isRetrying?: boolean;
                  activity?: unknown;
                  awaiting?: unknown;
                }>;
              };
              entry?: { kind?: string };
              rows?: { entries?: unknown[] };
            };
            const live = ev.agentState?.live?.[0];
            const line = `running=${String(ev.agent?.isRunningTurn ?? "")} live=${ev.agentState?.live?.length ?? 0} liveId=${String(live?.agentId ?? "")} liveRunning=${String(live?.isRunning ?? "")} liveRunningTurn=${String(live?.isRunningTurn ?? "")} staleAfter=${String(live?.staleAfterMs ?? "")} updatedAt=${String(live?.updatedAtMs ?? "")} entry=${ev.entry?.kind ?? ""} parts=${parts.length}`;
            if (line !== lastTrace) {
              lastTrace = line;
              log?.warn?.("GROK_BOT_WATCH", line);
            }
          }
          const result = this.consumeWatchFrame(
            event,
            agentId,
            messageId,
            parts,
            pendingSeqs,
            (running) => {
              if (running) seenRunning = true;
              else if (seenRunning) return true;
              return false;
            },
            (answer) => {
              submitted = answer;
            },
            (remainingMs) => {
              if (staleTimer) clearTimeout(staleTimer);
              staleTimer = setTimeout(() => staleAbort?.abort(), remainingMs);
            },
            cursor,
            pendingAcks
          );
          if (typeof result === "string") {
            stopStale();
            return result;
          }
          if (submitted !== null) {
            stopStale();
            return submitted;
          }
          if (result) {
            if (pendingSeqs.size > 0) {
              throw Object.assign(new Error("turn ended with transcript rows still missing"), {
                errorType: "incomplete_turn",
              });
            }
            const real = parts.filter((part) => !part.startsWith("\u0000submit:"));
            if (real.length) {
              stopStale();
              return real.join("");
            }
            throw Object.assign(new Error("turn became idle without explicit completion"), {
              errorType: "incomplete_turn",
            });
          }
        }
        // Stream ended without settlement (server idle cut) -- reconnect.
        // The stale timer stays armed: the next watch reuses its controller,
        // so a quiet reconnect cannot drop a window that already started.
      } catch (err) {
        if (staleAbort?.signal.aborted) {
          if (staleTimer) clearTimeout(staleTimer);
          const real = parts.filter((part) => !part.startsWith("\u0000submit:"));
          if (real.length) {
            stopStale();
            return real.join("");
          }
        }
        if ((err as { errorType?: unknown }).errorType === "incomplete_turn") throw err;
        if ((err as { errorType?: unknown }).errorType === "watch_resync") {
          stopStale();
          generation = (err as { generation: number }).generation;
          cursor.ack = "0";
          pendingSeqs.clear();
          pendingAcks.clear();
          continue;
        }
        if (signal?.aborted) throw err;
        if (submitted !== null) {
          stopStale();
          return submitted;
        }
        if (Date.now() >= deadline) break;
        // Read timeout or transient drop -- reconnect below.
        void err;
      }
    }
    if (!seenRunning) {
      throw new Error("watch stream ended before the agent started running");
    }
    throw Object.assign(new Error("turn ended without explicit completion"), {
      errorType: "incomplete_turn",
    });
  }

  private consumeWatchFrame(
    event: unknown,
    agentId: string,
    messageId: string,
    parts: string[],
    pendingSeqs: Set<string>,
    onRunning: (running: boolean) => boolean,
    onSubmit: (answer: string) => void,
    onStale: (remainingMs: number) => void,
    cursor: { ack: string },
    pendingAcks: Set<string>
  ): boolean | string {
    const ev = event as {
      cursorTooOld?: { generation?: number };
      cleared?: { newGeneration?: number };
      turnFailed?: { agentId?: string };
      agentState?: {
        live?: Array<{
          agentId?: string;
          isRunningTurn?: boolean;
          isRunning?: boolean;
          staleAfterMs?: number;
          updatedAtMs?: number;
        }>;
      };
      agent?: { agentId?: string; isRunningTurn?: boolean; isRunning?: boolean };
      rows?: {
        entries?: Array<{ seq?: string; body?: string; updatedSeq?: string }>;
        deletes?: Array<{ updatedSeq?: string }>;
      };
      entry?: {
        kind?: string;
        message?: { type?: string; content?: string };
        tool?: { name?: string; callId?: string; content?: string };
      };
    };
    const runningOf = (
      a: {
        agentId?: string;
        isRunningTurn?: boolean;
        isRunning?: boolean;
      } | null
    ): boolean | null => {
      if (!a) return null;
      if (a.agentId !== agentId) return null;
      if (typeof a.isRunningTurn === "boolean") return a.isRunningTurn;
      if (typeof a.isRunning === "boolean") return a.isRunning;
      return false;
    };
    const resyncGeneration = ev.cursorTooOld?.generation ?? ev.cleared?.newGeneration;
    if (typeof resyncGeneration === "number" && resyncGeneration > 0) {
      throw Object.assign(new Error("watch cursor moved"), {
        errorType: "watch_resync",
        generation: resyncGeneration,
      });
    }
    if (ev.turnFailed) {
      throw Object.assign(new Error("server reported the turn failed"), {
        errorType: "incomplete_turn",
      });
    }
    // Mixed-agent frames are not attributable: no entry-level agent identity.
    if (ev.agent?.agentId !== undefined && ev.agent.agentId !== agentId) return false;
    const liveIds = ev.agentState?.live?.map((a) => a.agentId).filter((id) => id !== undefined);
    if (liveIds?.length && liveIds.some((id) => id !== agentId)) return false;
    for (const live of ev.agentState?.live ?? []) {
      const running = runningOf(live);
      if (running) {
        const windowMs = live.staleAfterMs && live.staleAfterMs > 0 ? live.staleAfterMs : 90_000;
        const elapsed =
          live.updatedAtMs && live.updatedAtMs > 0 ? Date.now() - live.updatedAtMs : 0;
        onStale(Math.max(0, windowMs - elapsed));
      }
      const textArrived = parts.some((part) => !part.startsWith("\u0000submit:"));
      if (textArrived && running !== true) return true;
      if (running === false && live.staleAfterMs && !textArrived) {
        // Server dropped isRunning before the text row. The window it already
        // named is still the deadline; failing here drops the answer.
      } else if (running !== null && onRunning(running)) return true;
    }
    if (ev.agent) {
      const running = runningOf(ev.agent);
      if (running !== null && onRunning(running)) return true;
    }
    if (
      ev.entry?.kind === "tool-call" &&
      ev.entry.tool?.name === "submit_answer" &&
      ev.entry.tool.callId &&
      typeof ev.entry.tool.content === "string"
    ) {
      onSubmit(ev.entry.tool.content);
    }
    for (const row of ev.rows?.entries ?? []) {
      if (
        row.updatedSeq !== undefined &&
        (cursor.ack === "0" || BigInt(row.updatedSeq) > BigInt(cursor.ack))
      ) {
        cursor.ack = row.updatedSeq;
      }
      if (!row.body) {
        if (row.seq !== undefined) pendingSeqs.add(row.seq);
        if (row.updatedSeq !== undefined) pendingAcks.add(row.updatedSeq);
        continue;
      }
      if (row.seq !== undefined) pendingSeqs.delete(row.seq);
      if (row.updatedSeq !== undefined) pendingAcks.delete(row.updatedSeq);
      let decoded: {
        clientNonce?: string;
        kind?: string;
        message?: { type?: string; content?: string };
      };
      try {
        decoded = JSON.parse(Buffer.from(row.body, "base64").toString("utf-8"));
      } catch {
        continue;
      }
      if (
        // Entries whose clientNonce equals our messageId are the user's own
        // echo (measured: assistant replies carry clientNonce=null/absent), so
        // they are skipped, not collected.
        decoded.clientNonce !== messageId &&
        decoded.kind === "send-message" &&
        decoded.message?.type === "text" &&
        typeof decoded.message.content === "string"
      ) {
        const added = parts.at(-1) !== decoded.message.content;
        if (added) parts.push(decoded.message.content);
        const liveRunning = (ev.agentState?.live ?? []).some((live) => runningOf(live) === true);
        const stillRunning = runningOf(ev.agent) === true || liveRunning;
        if (added && !stillRunning) onStale(2_000);
        return false;
      }
    }
    if (
      ev.entry?.kind === "send-message" &&
      ev.entry.message?.type === "text" &&
      typeof ev.entry.message.content === "string"
    ) {
      if (parts.at(-1) !== ev.entry.message.content) parts.push(ev.entry.message.content);
    }
    return false;
  }

  async refreshCredentials(
    credentials: { refreshToken?: string } | null | undefined,
    log?: { warn?: (...a: unknown[]) => void }
  ): Promise<{ accessToken: string } | null> {
    if (!credentials?.refreshToken) {
      log?.warn?.("TOKEN_REFRESH", "Grok Bot: no refresh token -- re-authentication required");
      return null;
    }
    const result = await getAccessToken("grok-bot", credentials, log);
    if (!result || result.error) {
      log?.warn?.(
        "TOKEN_REFRESH",
        `Grok Bot: token refresh failed${result?.error ? ` (${result.error})` : ""}`
      );
      return null;
    }
    return result;
  }
}

export default GrokBotExecutor;

/** Test/introspection hooks for the pending-cleanup queue. */
export const _grokBotInternals = {
  remoteMcpServers,
  setUnreadTimeoutForTests(ms: number | null): void {
    unreadTimeoutOverrideMs = ms;
  },
  pendingCleanupCount(): number {
    return readQueue().length;
  },
  resetPendingCleanupsForTests(): void {
    try {
      fs.unlinkSync(queueFile());
    } catch {
      /* nothing to reset */
    }
  },
};
