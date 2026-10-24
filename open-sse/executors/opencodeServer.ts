import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { closeSync, existsSync, mkdirSync, openSync } from "node:fs";
import { join } from "node:path";

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { buildErrorBody } from "../utils/error.ts";
import {
  OpencodeEventBus,
  type EventProperties,
  type EventLike,
  type OpencodeMessageInfo,
  type OpencodePart,
} from "../services/opencodeServerEventBus.ts";
import {
  buildServerEnv,
  isForwardableFileUrl,
  isLoopbackHost,
} from "../services/opencodeServerSafety.ts";
import {
  clearOpencodeServerSettingsCache,
  readOpencodeServerSettings,
  type OpencodeServerSettings,
} from "../services/opencodeServerSettings.ts";

// Executor for the local `opencode serve` process (the headless server that the
// opencode CLI itself starts; the TUI is just a client of it, see
// https://opencode.ai/docs/server/).
//
// Why a dedicated executor instead of pointing the opencode-zen executor at a
// local baseUrl: the server does NOT speak the OpenAI wire format. Its API is
// `POST /session` + `POST /session/:id/message` -> { info, parts[] }, with
// `GET /event` (SSE) for live parts. There is no /v1/chat/completions and no
// /v1/models; probing them returns the web app's index.html with HTTP 200, so a
// status-only health probe gives a false positive.
//
// This executor therefore owns the whole translation (OpenAI chat/Responses in,
// opencode session/parts out) and runs IN-PROCESS: there is no sidecar proxy and
// no extra network hop between OmniRoute and the opencode server.
//
// Credentials never reach OmniRoute. The server holds the opencode credential
// and is the only thing that talks to the upstream (https://opencode.ai/inference),
// so connections of this provider need no api key at all.
//
// Two opencode-server behaviours this depends on, both verified against 1.19.2:
//   - `system` accepts a plain string and REPLACES the agent system prompt, and
//     `tools: {}` disables the agent toolset. Without both, every request carries
//     ~6.8k tokens of opencode agent prompt; with them the overhead drops to ~18.
//   - `POST /session/:id/prompt_async` (204) plus `GET /event` gives real token
//     streaming via `message.part.delta` events, terminated by `session.idle`.

const DEFAULT_BASE_URL = "http://127.0.0.1:4096";
const DEFAULT_TIMEOUT_MS = 180_000;
const CATALOG_TTL_MS = 60_000;
const DEFAULT_AUTOSTART_TIMEOUT_MS = 45_000;

// Settings come from the dashboard (Providers → local → opencode server) and
// win over the defaults; the cache lives in services/opencodeServerSettings.ts so
// the settings route can invalidate it without importing an executor.
export { clearOpencodeServerSettingsCache };

// Refreshed on every ensureOpencodeServer() (i.e. before each request) so the
// synchronous helpers below can read it without becoming async themselves.
let resolvedSettings: OpencodeServerSettings = {};

type OpencodeServerModel = {
  providerID: string;
  modelID: string;
  name: string;
  isFree: boolean;
  contextLength: number;
  outputLimit: number;
  toolCalling: boolean;
  reasoning: boolean;
  image: boolean;
  synthetic?: boolean;
};

type OpencodeUsage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: { cached_tokens: number };
  completion_tokens_details: { reasoning_tokens: number };
};

type ToolCall = {
  id: string;
  type: "function";
  function: { name: string; arguments: string };
};

const TOOL_PROTOCOL = [
  "You have access to the following functions, but you CANNOT execute them yourself; the caller executes them and sends the result back.",
  "If a function must be called, reply with a single JSON object and nothing else:",
  '{"tool_calls":[{"name":"<exact function name>","arguments":{...}}]}',
  "Rules: use exact function names; arguments must be a JSON object; emit no prose, no markdown fence, no extra keys.",
  "If no function is needed, answer normally as plain text.",
].join("\n");

const ROLE_LABEL: Record<string, string> = {
  user: "[user]",
  assistant: "[assistant]",
  tool: "[tool]",
  system: "[system]",
  developer: "[system]",
};

function serverBaseUrl(): string {
  const configured =
    String(process.env.OPENCODE_SERVER_URL || "").trim() ||
    String(resolvedSettings.url || "").trim();
  return (configured || DEFAULT_BASE_URL).replace(/\/+$/, "");
}

// The CLI binary is usually on PATH, but on managed/bundled installs it may not
// be (npm shim vs. the real exe inside the package). Resolution order mirrors
// executors/auggie.ts: explicit ENV override, then known install locations, then
// PATH. It is never read from the settings DB / dashboard (see
// services/opencodeServerSettings.ts).
function resolveBinary(): string | null {
  const explicit = String(
    process.env.OPENCODE_SERVER_BIN || process.env.CLI_OPENCODE_BIN || ""
  ).trim();
  if (explicit) return explicit;
  const home = process.env.HOME || process.env.USERPROFILE || "";
  if (process.platform === "win32") {
    const localAppData = process.env.LOCALAPPDATA || "";
    const candidates = [
      localAppData ? join(localAppData, "opencode", "bin", "opencode.exe") : "",
      join(home, "AppData", "Roaming", "npm", "opencode.cmd"),
      join(home, ".bun", "install", "global", "node_modules", "opencode-ai", "bin", "opencode.exe"),
      join(home, ".bun", "bin", "opencode.exe"),
    ].filter(Boolean);
    for (const candidate of candidates) {
      try {
        if (existsSync(candidate)) return candidate;
      } catch {
        /* keep looking */
      }
    }
    return "opencode.cmd";
  }
  for (const candidate of [
    join(home, ".bun", "bin", "opencode"),
    "/usr/local/bin/opencode",
    "/opt/homebrew/bin/opencode",
  ]) {
    try {
      if (existsSync(candidate)) return candidate;
    } catch {
      /* keep looking */
    }
  }
  return "opencode";
}

function requestTimeoutMs(): number {
  const parsed = Number(process.env.OPENCODE_SERVER_TIMEOUT_MS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_TIMEOUT_MS;
}

function autostartTimeoutMs(): number {
  const parsed = Number(process.env.OPENCODE_SERVER_START_TIMEOUT_MS);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_AUTOSTART_TIMEOUT_MS;
}

function autostartEnabled(): boolean {
  return !/^(0|false|no|off)$/i.test(String(process.env.OPENCODE_SERVER_AUTOSTART ?? "1"));
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function newId(prefix: string): string {
  return `${prefix}${randomUUID().replace(/-/g, "")}`;
}

async function probeHealth(
  timeoutMs = 1500
): Promise<{ healthy: boolean; version?: string } | null> {
  try {
    const response = await fetch(`${serverBaseUrl()}/global/health`, {
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) return null;
    return (await response.json()) as { healthy: boolean; version?: string };
  } catch {
    return null;
  }
}

// Owns the lazy autostart of `opencode serve`. Concurrent requests share the same
// promise so a burst never spawns more than one server.
const autostartState: {
  pending: Promise<{ healthy: boolean; version?: string }> | null;
  pid: number | null;
} = {
  pending: null,
  pid: null,
};

function openServerLogs(): { stdoutFd: number | null; stderrFd: number | null } {
  const logDir =
    process.env.OMNIROUTE_LOG_DIR ||
    join(process.env.HOME || process.env.USERPROFILE || "", ".omniroute", "logs");
  try {
    mkdirSync(logDir, { recursive: true });
  } catch {
    /* logging is best effort */
  }
  let stdoutFd: number | null = null;
  let stderrFd: number | null = null;
  try {
    stdoutFd = openSync(join(logDir, "opencode-serve.log"), "a");
    stderrFd = openSync(join(logDir, "opencode-serve.err.log"), "a");
  } catch {
    /* fall back to inherited stdio */
  }
  return { stdoutFd, stderrFd };
}

async function spawnServer(): Promise<{ healthy: boolean; version?: string }> {
  // Autostart only ever applies to a server on this machine; a remote URL means
  // someone else owns that process.
  if (!isLoopbackHost(new URL(serverBaseUrl()).hostname)) {
    throw new Error(
      `[opencode-server] no server reachable on ${serverBaseUrl()} and autostart only applies to a loopback URL`
    );
  }
  const binary = resolveBinary();
  if (!binary) {
    throw new Error(
      "[opencode-server] server unreachable and no opencode binary found (set OPENCODE_SERVER_BIN in the OmniRoute environment)"
    );
  }
  const { stdoutFd, stderrFd } = openServerLogs();

  const url = new URL(serverBaseUrl());
  const child = spawn(
    binary,
    [
      "serve",
      "--port",
      url.port || "4096",
      "--hostname",
      url.hostname.replace(/^\[|\]$/g, "") || "127.0.0.1",
    ],
    {
      cwd: process.env.OPENCODE_SERVER_CWD || process.cwd(),
      detached: true,
      windowsHide: true,
      stdio: ["ignore", stdoutFd, stderrFd],
      env: buildServerEnv(),
    }
  );
  child.on("error", () => {});
  child.unref();
  autostartState.pid = child.pid ?? null;
  if (stdoutFd !== null) closeSync(stdoutFd);
  if (stderrFd !== null) closeSync(stderrFd);

  const deadline = Date.now() + autostartTimeoutMs();
  let delay = 150;
  while (Date.now() < deadline) {
    await sleep(delay);
    delay = Math.min(1000, Math.round(delay * 1.4));
    const health = await probeHealth(1200);
    if (health) return health;
  }
  throw new Error(
    `[opencode-server] could not start opencode serve on ${serverBaseUrl()} (pid ${autostartState.pid ?? "?"})`
  );
}

export async function ensureOpencodeServer(): Promise<{ healthy: boolean; version?: string }> {
  resolvedSettings = await readOpencodeServerSettings();
  const health = await probeHealth();
  if (health) return health;
  if (!autostartEnabled()) {
    throw new Error(
      `[opencode-server] no server on ${serverBaseUrl()} and OPENCODE_SERVER_AUTOSTART is disabled`
    );
  }
  if (!autostartState.pending) {
    autostartState.pending = spawnServer().finally(() => {
      autostartState.pending = null;
    });
  }
  return autostartState.pending;
}

type ServerJsonOptions = {
  method?: string;
  body?: unknown;
  signal?: AbortSignal | null;
  timeoutMs?: number;
};

async function serverJson<T>(path: string, options: ServerJsonOptions = {}): Promise<T> {
  const timeout = AbortSignal.timeout(options.timeoutMs ?? requestTimeoutMs());
  const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
  const response = await fetch(serverBaseUrl() + path, {
    method: options.method || "GET",
    headers: { "content-type": "application/json" },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal,
  });
  const text = await response.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = null;
  }
  if (!response.ok) {
    // The upstream body is deliberately NOT echoed: it can carry server paths,
    // stack frames or credentials of the local opencode install, and this text
    // ends up in client-visible HTTP / SSE errors (Hard Rule 12).
    const error = new Error(`[opencode-server] ${path} -> ${response.status}`) as Error & {
      status?: number;
    };
    error.status = response.status;
    throw error;
  }
  return parsed as T;
}

const catalog = {
  at: 0,
  byModel: new Map<string, OpencodeServerModel>(),
  defaultProvider: "opencode",
};

async function loadCatalog(force = false): Promise<typeof catalog> {
  if (!force && Date.now() - catalog.at < CATALOG_TTL_MS && catalog.byModel.size > 0)
    return catalog;
  await ensureOpencodeServer();
  const payload = await serverJson<{
    providers?: Array<{
      id: string;
      models?: Record<
        string,
        OpencodeServerModel & {
          cost?: Record<string, number>;
          limit?: Record<string, number>;
          capabilities?: Record<string, unknown>;
        }
      >;
    }>;
    default?: Record<string, string>;
  }>("/config/providers");

  const byModel = new Map<string, OpencodeServerModel>();
  for (const provider of payload?.providers || []) {
    for (const [modelID, raw] of Object.entries(provider.models || {})) {
      const costInput = Number(raw?.cost?.input ?? 0);
      const costOutput = Number(raw?.cost?.output ?? 0);
      const record: OpencodeServerModel = {
        providerID: provider.id,
        modelID,
        name: raw?.name || modelID,
        isFree: costInput === 0 && costOutput === 0,
        contextLength: Number(raw?.limit?.context ?? 0),
        outputLimit: Number(raw?.limit?.output ?? 0),
        toolCalling: Boolean(raw?.capabilities?.toolcall),
        reasoning: Boolean(raw?.capabilities?.reasoning),
        image: Boolean((raw?.capabilities?.input as { image?: boolean } | undefined)?.image),
      };
      if (!byModel.has(modelID)) byModel.set(modelID, record);
    }
  }
  catalog.byModel = byModel;
  catalog.defaultProvider = payload?.default?.opencode
    ? "opencode"
    : Object.keys(payload?.default || {})[0] || "opencode";
  catalog.at = Date.now();
  return catalog;
}

function resolveModel(model: string): OpencodeServerModel {
  const requested = String(model || "").trim();
  if (!requested) throw new Error("[opencode-server] missing model");
  const bare = requested.includes("/")
    ? requested.slice(requested.lastIndexOf("/") + 1)
    : requested;
  return (
    catalog.byModel.get(bare) ||
    catalog.byModel.get(requested) || {
      providerID: catalog.defaultProvider,
      modelID: bare,
      name: bare,
      isFree: true,
      contextLength: 0,
      outputLimit: 0,
      toolCalling: false,
      reasoning: false,
      image: false,
      synthetic: true,
    }
  );
}

function textOf(content: unknown): string {
  if (content == null) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (!part || typeof part !== "object") return "";
        const type = (part as { type?: string }).type;
        if (type !== "text" && type !== "input_text" && type !== "output_text") return "";
        return String((part as { text?: unknown }).text || "");
      })
      .filter(Boolean)
      .join("\n");
  }
  if (typeof content === "object" && typeof (content as { text?: unknown }).text === "string") {
    return String((content as { text: string }).text);
  }
  return "";
}

function mimeFromUrl(url: string): string {
  const dataMatch = /^data:([^;,]+)/.exec(url);
  if (dataMatch) return dataMatch[1];
  const ext = url.split("?")[0].split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    pdf: "application/pdf",
  };
  return map[ext || ""] || "application/octet-stream";
}

function mimeExtension(mime: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "application/pdf": "pdf",
  };
  return map[mime] || "bin";
}

type Turn = { role: string; text: string; files: Array<{ url: string; mime: string }> };

function collectFiles(content: unknown): Array<{ url: string; mime: string }> {
  if (!Array.isArray(content)) return [];
  const files: Array<{ url: string; mime: string }> = [];
  for (const part of content) {
    if (!part || typeof part !== "object") continue;
    const record = part as Record<string, unknown>;
    const type = String(record.type || "");
    if (type === "image_url") {
      const imageUrl = record.image_url as { url?: string; mime?: string } | string | undefined;
      const url = typeof imageUrl === "string" ? imageUrl : imageUrl?.url;
      if (isForwardableFileUrl(url))
        files.push({
          url,
          mime:
            imageUrl && typeof imageUrl !== "string"
              ? imageUrl.mime || mimeFromUrl(url)
              : mimeFromUrl(url),
        });
    } else if (type === "input_image") {
      const imageUrl = record.image_url as string | { url?: string } | undefined;
      const url =
        typeof imageUrl === "string"
          ? imageUrl
          : imageUrl?.url || (record.url as string | undefined);
      if (isForwardableFileUrl(url))
        files.push({ url, mime: String(record.mime_type || mimeFromUrl(url)) });
    } else if (type === "input_file") {
      const fileUrl = record.file_url as string | undefined;
      const url = fileUrl || (record.url as string | undefined);
      if (isForwardableFileUrl(url))
        files.push({ url, mime: String(record.mime_type || mimeFromUrl(url)) });
    }
  }
  return files;
}

// opencode's message API carries a single role per message, and the executor is
// stateless (the client replays history, exactly like the OpenAI API). Turns are
// therefore flattened into one user message with explicit role labels.
function buildTurns(body: Record<string, unknown>): { systemChunks: string[]; turns: Turn[] } {
  const raw = Array.isArray(body.messages)
    ? (body.messages as unknown[])
    : Array.isArray(body.input)
      ? (body.input as unknown[])
      : typeof body.input === "string" && body.input.trim()
        ? [{ role: "user", content: body.input }]
        : [];

  const systemChunks: string[] = [];
  const turns: Turn[] = [];
  for (const message of raw) {
    if (!message || typeof message !== "object") continue;
    const record = message as Record<string, unknown>;
    const role = String(record.role || "user");
    const text = textOf(record.content);
    if (role === "system" || role === "developer") {
      if (text) systemChunks.push(text);
      continue;
    }
    if (typeof record.type === "string" && record.type.startsWith("function_")) {
      turns.push({
        role: "tool",
        text: `${String(record.name || "function")} -> ${text}`,
        files: [],
      });
      continue;
    }
    turns.push({ role, text, files: collectFiles(record.content) });
  }
  return { systemChunks, turns };
}

function buildParts(turns: Turn[]): OpencodePart[] {
  const parts: OpencodePart[] = [];
  const lines: string[] = [];
  for (const turn of turns) {
    if (turn.text) lines.push(`${ROLE_LABEL[turn.role] || `[${turn.role}]`} ${turn.text}`);
    for (const file of turn.files) {
      if (!file.url) continue;
      parts.push({
        type: "file",
        mime: file.mime || "application/octet-stream",
        filename: `attachment.${mimeExtension(file.mime)}`,
        url: file.url,
      } as unknown as OpencodePart);
      lines.push(`${ROLE_LABEL[turn.role] || "[user]"} [attachment: ${file.mime || "file"}]`);
    }
  }
  const text = lines.join("\n\n").trim();
  if (text) parts.unshift({ type: "text", text });
  if (!parts.length) parts.push({ type: "text", text: "" });
  return parts;
}

type NormalizedTools = {
  tools: Array<{ name: string; description: string; parameters: unknown }>;
  choice: unknown;
};

function normalizeTools(body: Record<string, unknown>): NormalizedTools {
  const list = Array.isArray(body.tools) ? (body.tools as unknown[]) : [];
  const tools = list
    .map((entry) => {
      const record = (entry || {}) as Record<string, unknown>;
      const fn = (record.function || record) as Record<string, unknown>;
      if (!fn || typeof fn.name !== "string") return null;
      return {
        name: fn.name,
        description: String(fn.description || ""),
        parameters: fn.parameters ?? { type: "object", properties: {} },
      };
    })
    .filter(
      (tool): tool is { name: string; description: string; parameters: unknown } => tool !== null
    );

  let choice: unknown = body.tool_choice;
  if (choice && typeof choice === "object") {
    const record = choice as Record<string, unknown>;
    if (record.type === "function") {
      const fn = record.function as Record<string, unknown> | undefined;
      choice = { type: "function", name: fn?.name || record.name };
    } else {
      choice = record.type || null;
    }
  }
  return { tools, choice: choice ?? "auto" };
}

function toolInstruction({ tools, choice }: NormalizedTools): string {
  if (!tools.length || choice === "none") return "";
  const listing = tools.map((tool) => `- ${tool.name}: ${tool.description}`).join("\n");
  let head = TOOL_PROTOCOL;
  if (choice === "required") head += "\nYou MUST reply with the tool_calls JSON object.";
  if (choice && typeof choice === "object") {
    const named = choice as { type?: string; name?: string };
    if (named.type === "function" && named.name) {
      head += `\nYou MUST call exactly "${named.name}" and nothing else.`;
    }
  }
  return `${head}\n\nAvailable functions:\n${listing}`;
}

// The opencode server is agentic: it would execute the tool itself and only return
// prose. That breaks OpenAI semantics, where the client owns tool execution, so
// tools are surfaced as an instruction and the envelope is translated back into
// OpenAI tool_calls.
function parseToolEnvelope(text: string, tools: NormalizedTools["tools"]): ToolCall[] | null {
  if (!text) return null;
  const trimmed = text.trim();
  const fenced = /```(?:json)?\s*([\s\S]*?)```/.exec(trimmed);
  const candidate = (fenced ? fenced[1] : trimmed).trim();
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  let parsed: { tool_calls?: Array<{ name?: string; arguments?: unknown }> };
  try {
    parsed = JSON.parse(candidate.slice(start, end + 1));
  } catch {
    return null;
  }
  const calls = Array.isArray(parsed.tool_calls) ? parsed.tool_calls : null;
  if (!calls || !calls.length) return null;
  const allowed = new Set(tools.map((tool) => tool.name));
  const out: ToolCall[] = [];
  for (const call of calls) {
    const name = call && typeof call === "object" ? call.name : null;
    if (!name || (allowed.size > 0 && !allowed.has(name))) return null;
    const args = call.arguments;
    out.push({
      id: newId("call_"),
      type: "function",
      function: {
        name: String(name),
        arguments: typeof args === "string" ? args : JSON.stringify(args ?? {}),
      },
    });
  }
  return out;
}

function usageFromTokens(tokens: OpencodeMessageInfo["tokens"]): OpencodeUsage {
  const input = Number(tokens?.input ?? 0);
  const output = Number(tokens?.output ?? 0);
  const reasoning = Number(tokens?.reasoning ?? 0);
  const cacheRead = Number(tokens?.cache?.read ?? 0);
  return {
    prompt_tokens: input + cacheRead,
    completion_tokens: output,
    total_tokens: input + output + reasoning + cacheRead,
    prompt_tokens_details: { cached_tokens: cacheRead },
    completion_tokens_details: { reasoning_tokens: reasoning },
  };
}

function finishReason(info: OpencodeMessageInfo | null, hasToolCalls: boolean): string {
  if (hasToolCalls) return "tool_calls";
  const finish = String(info?.finish || "stop");
  if (finish === "length" || finish === "max_tokens") return "length";
  return "stop";
}

function sseLine(payload: unknown): string {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

function chunkEnvelope(args: {
  id: string;
  created: number;
  model: string;
  delta: Record<string, unknown>;
  finishReason?: string | null;
}): Record<string, unknown> {
  return {
    id: args.id,
    object: "chat.completion.chunk",
    created: args.created,
    model: args.model,
    choices: [{ index: 0, delta: args.delta, finish_reason: args.finishReason ?? null }],
  };
}

type TurnResult = {
  info: OpencodeMessageInfo;
  text: string;
  reasoning: string;
  error?: string | null;
};

const eventBus = new OpencodeEventBus(serverBaseUrl);

/** Closes the shared /event stream and stops its reconnect loop (tests, shutdown). */
export function closeOpencodeServerEventBus(): void {
  eventBus.close();
}

async function createSession(title: string): Promise<string> {
  const session = await serverJson<{ id?: string }>("/session", {
    method: "POST",
    body: { title },
  });
  const id = session?.id;
  if (!id) throw new Error("[opencode-server] session creation returned no id");
  return id;
}

async function destroySession(sessionID: string): Promise<void> {
  try {
    await serverJson(`/session/${sessionID}`, { method: "DELETE", timeoutMs: 5000 });
  } catch {
    /* best effort */
  }
}

async function abortSession(sessionID: string): Promise<void> {
  try {
    await serverJson(`/session/${sessionID}/abort`, { method: "POST", body: {}, timeoutMs: 5000 });
  } catch {
    /* best effort */
  }
}

type RunOptions = {
  sessionID: string;
  payload: Record<string, unknown>;
  signal?: AbortSignal | null;
  onText?: (delta: string) => void;
  onReasoning?: (delta: string) => void;
  wait: boolean;
};

async function runTurn({
  sessionID,
  payload,
  signal,
  onText,
  onReasoning,
  wait,
}: RunOptions): Promise<TurnResult> {
  if (!wait) {
    const result = await serverJson<{ info?: OpencodeMessageInfo; parts?: OpencodePart[] }>(
      `/session/${sessionID}/message`,
      { method: "POST", body: payload, signal }
    );
    const parts = result?.parts || [];
    return {
      info: result?.info || {},
      text: parts
        .filter((part) => part.type === "text")
        .map((part) => part.text || "")
        .join(""),
      reasoning: parts
        .filter((part) => part.type === "reasoning" || part.type === "thinking")
        .map((part) => part.text || "")
        .join(""),
    };
  }

  const textParts = new Map<string, string>();
  const reasoningParts = new Map<string, string>();
  const emittedText = new Map<string, string>();
  const emittedReasoning = new Map<string, string>();
  const deltaText: string[] = [];
  const assistantMessages = new Set<string>();
  let info: OpencodeMessageInfo = {};

  const isAssistant = (messageID?: string): boolean =>
    !!messageID && assistantMessages.size > 0 && assistantMessages.has(messageID);

  const onEvent = (event: EventLike): void => {
    const properties = (event?.properties || {}) as EventProperties;
    if (event.type === "message.updated") {
      const messageInfo = properties.info as OpencodeMessageInfo | undefined;
      if (messageInfo?.role === "assistant") {
        if (messageInfo.id) assistantMessages.add(messageInfo.id);
        if (messageInfo.sessionID) info = messageInfo;
      }
      return;
    }
    if (event.type === "message.part.delta") {
      const field = String(properties.field || "");
      const delta = properties.delta;
      if (typeof delta !== "string" || !delta) return;
      if (!isAssistant(properties.messageID)) return;
      const partId = String(properties.partID || "__stream__");
      if (field === "text") {
        emittedText.set(partId, (emittedText.get(partId) || "") + delta);
        deltaText.push(delta);
        onText?.(delta);
      } else if (field === "reasoning" || field === "thinking") {
        emittedReasoning.set(partId, (emittedReasoning.get(partId) || "") + delta);
        onReasoning?.(delta);
      }
      return;
    }
    if (event.type === "message.part.updated") {
      const part = (properties.part || {}) as OpencodePart & { state?: { status?: string } };
      if (!isAssistant(part.messageID)) return;
      const isReasoning = part.type === "reasoning" || part.type === "thinking";
      if (typeof part.text !== "string") return;
      const target = isReasoning ? reasoningParts : textParts;
      const emitted = isReasoning ? emittedReasoning : emittedText;
      const sink = isReasoning ? onReasoning : onText;
      const key = String(part.id || part.messageID || "__stream__");
      target.set(key, part.text);
      const seen = emitted.get(key);
      // Models that never emit message.part.delta still stream: diff the growing
      // part.text against what was already forwarded.
      if (seen === undefined) {
        emitted.set(key, part.text);
        if (part.text) {
          if (!isReasoning) deltaText.push(part.text);
          sink?.(part.text);
        }
      } else if (part.text.startsWith(seen) && part.text.length > seen.length) {
        const fresh = part.text.slice(seen.length);
        emitted.set(key, part.text);
        if (!isReasoning) deltaText.push(fresh);
        sink?.(fresh);
      } else if (part.text !== seen) {
        emitted.set(key, part.text);
        sink?.(part.text);
      }
      return;
    }
    if (event.type === "message.part.updatedError") return;
  };

  let unsubscribe = () => {};
  let rejectRun: ((error: Error) => void) | null = null;
  const finished = new Promise<void>((resolve, reject) => {
    rejectRun = reject;
    unsubscribe = eventBus.subscribe(sessionID, (event) => {
      onEvent(event);
      if (event.type === "session.idle" || event.type === "session.error") resolve();
    });
    setTimeout(
      () => reject(new Error("[opencode-server] streaming timeout")),
      requestTimeoutMs()
    ).unref?.();
  });

  const onAbort = () => rejectRun?.(new Error("[opencode-server] request aborted"));
  if (signal) {
    if (signal.aborted) onAbort();
    else signal.addEventListener("abort", onAbort, { once: true });
  }

  try {
    await serverJson(`/session/${sessionID}/prompt_async`, { method: "POST", body: payload });
    await finished;
  } catch (error) {
    await abortSession(sessionID);
    throw error;
  } finally {
    unsubscribe();
    signal?.removeEventListener?.("abort", onAbort);
  }

  const joined = (map: Map<string, string>): string =>
    [...map.values()].filter((value) => value.length > 0).join("");

  return {
    info,
    text: joined(textParts) || deltaText.join(""),
    reasoning: joined(reasoningParts),
  };
}

function buildChatCompletion(args: {
  id: string;
  created: number;
  model: string;
  text: string;
  reasoning: string;
  toolCalls: ToolCall[] | null;
  info: OpencodeMessageInfo | null;
}): Record<string, unknown> {
  const message: Record<string, unknown> = { role: "assistant", content: args.text || null };
  if (args.reasoning) message.reasoning_content = args.reasoning;
  if (args.toolCalls && args.toolCalls.length) message.tool_calls = args.toolCalls;
  return {
    id: args.id,
    object: "chat.completion",
    created: args.created,
    model: args.model,
    choices: [
      {
        index: 0,
        message,
        finish_reason: finishReason(args.info, !!(args.toolCalls && args.toolCalls.length)),
      },
    ],
    usage: usageFromTokens(args.info?.tokens),
  };
}

function buildResponsesPayload(args: {
  id: string;
  created: number;
  model: string;
  text: string;
  toolCalls: ToolCall[] | null;
  info: OpencodeMessageInfo | null;
}): Record<string, unknown> {
  const usage = usageFromTokens(args.info?.tokens);
  const output: Array<Record<string, unknown>> = [];
  if (args.text) {
    output.push({
      type: "message",
      id: newId("msg_"),
      role: "assistant",
      status: "completed",
      content: [{ type: "output_text", text: args.text, annotations: [] }],
    });
  }
  for (const call of args.toolCalls || []) {
    output.push({
      type: "function_call",
      id: newId("fc_"),
      call_id: call.id,
      name: call.function.name,
      arguments: call.function.arguments,
      status: "completed",
    });
  }
  return {
    id: args.id,
    object: "response",
    created_at: args.created,
    status: "completed",
    model: args.model,
    output,
    output_text: args.text || "",
    parallel_tool_calls: false,
    tool_choice: args.toolCalls && args.toolCalls.length ? "required" : "none",
    usage: {
      input_tokens: usage.prompt_tokens,
      output_tokens: usage.completion_tokens,
      total_tokens: usage.total_tokens,
      output_tokens_details: { reasoning_tokens: usage.completion_tokens_details.reasoning_tokens },
      input_tokens_details: { cached_tokens: usage.prompt_tokens_details.cached_tokens },
    },
  };
}

function jsonResponse(payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function detectWireFormat(
  body: Record<string, unknown>,
  clientHeaders?: Record<string, string> | null
): "chat" | "responses" {
  const explicit =
    clientHeaders?.["x-omniroute-opencode-format"] || clientHeaders?.["x-opencode-wire"];
  if (explicit) return String(explicit).includes("response") ? "responses" : "chat";
  if (Array.isArray(body.input) && !Array.isArray(body.messages)) return "responses";
  if (typeof body.input === "string" && !body.messages) return "responses";
  return "chat";
}

export class OpencodeServerExecutor extends BaseExecutor {
  constructor() {
    super("opencode-server", PROVIDERS["opencode-server"] || { format: "openai" });
  }

  override buildUrl(): string {
    return `${serverBaseUrl()}/session`;
  }

  override async execute(input: ExecuteInput): Promise<{ response: Response }> {
    const body =
      input.body && typeof input.body === "object" && !Array.isArray(input.body)
        ? (input.body as Record<string, unknown>)
        : {};
    const wantsStream = input.stream === true || body.stream === true;
    const wireFormat = detectWireFormat(body, input.clientHeaders);

    await loadCatalog();
    const target = resolveModel(input.model);
    if (target.synthetic) {
      throw Object.assign(
        new Error(
          `[opencode-server] unknown model "${input.model}" (not in ${serverBaseUrl()}/config/providers)`
        ),
        { status: 404 }
      );
    }

    const model = `opencode-server/${target.modelID}`;
    const created = Math.floor(Date.now() / 1000);
    const id = newId("chatcmpl-");
    const { systemChunks, turns } = buildTurns(body);
    const normalized = normalizeTools(body);
    const system = [...systemChunks, toolInstruction(normalized), String(body.instructions || "")]
      .filter((chunk) => chunk && chunk.trim())
      .join("\n\n");

    const payload = {
      model: { providerID: target.providerID, modelID: target.modelID },
      system: system || null,
      tools: {},
      parts: buildParts(turns),
    };

    const sessionID = await createSession(model);

    if (!wantsStream) {
      try {
        const result = await runTurn({ sessionID, payload, signal: input.signal, wait: false });
        const toolCalls =
          normalized.tools.length > 0 && normalized.choice !== "none"
            ? parseToolEnvelope(result.text, normalized.tools)
            : null;
        const text = toolCalls ? "" : result.text;
        if (wireFormat === "responses") {
          return {
            response: jsonResponse(
              buildResponsesPayload({ id, created, model, text, toolCalls, info: result.info })
            ),
          };
        }
        return {
          response: jsonResponse(
            buildChatCompletion({
              id,
              created,
              model,
              text,
              reasoning: result.reasoning,
              toolCalls,
              info: result.info,
            })
          ),
        };
      } finally {
        await destroySession(sessionID);
      }
    }

    return this.streamResponse({
      sessionID,
      payload,
      signal: input.signal,
      wireFormat,
      id,
      created,
      model,
      tools: normalized.tools,
      toolMode: normalized.tools.length > 0 && normalized.choice !== "none",
    });
  }

  private streamResponse(args: {
    sessionID: string;
    payload: Record<string, unknown>;
    signal?: AbortSignal | null;
    wireFormat: "chat" | "responses";
    id: string;
    created: number;
    model: string;
    tools: NormalizedTools["tools"];
    toolMode: boolean;
  }): { response: Response } {
    const { sessionID, payload, signal, wireFormat, id, created, model, tools, toolMode } = args;
    const encoder = new TextEncoder();
    let controller: ReadableStreamDefaultController<Uint8Array> | null = null;
    let closed = false;

    const emit = (text: string): void => {
      if (closed || !text || !controller) return;
      try {
        controller.enqueue(encoder.encode(text));
      } catch {
        /* client already went away */
      }
    };

    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        controller = c;
      },
      cancel() {
        closed = true;
        controller = null;
      },
    });

    const response = new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });

    const isResponses = wireFormat === "responses";
    emit(
      isResponses
        ? `data: ${JSON.stringify({
            type: "response.created",
            response: {
              id,
              object: "response",
              created_at: created,
              status: "in_progress",
              model,
              output: [],
            },
          })}\n\n`
        : sseLine(chunkEnvelope({ id, created, model, delta: { role: "assistant", content: "" } }))
    );

    void (async () => {
      const onText = (delta: string): void => {
        // With tools the answer may be a tool_calls envelope rather than prose,
        // which is only knowable at the end, so those deltas are buffered.
        if (toolMode) return;
        emit(
          isResponses
            ? `data: ${JSON.stringify({ type: "response.output_text.delta", item_id: id, output_index: 0, delta })}\n\n`
            : sseLine(chunkEnvelope({ id, created, model, delta: { content: delta } }))
        );
      };
      const onReasoning = (delta: string): void => {
        if (toolMode) return;
        emit(
          isResponses
            ? `data: ${JSON.stringify({ type: "response.reasoning_summary_text.delta", item_id: id, delta })}\n\n`
            : sseLine(chunkEnvelope({ id, created, model, delta: { reasoning_content: delta } }))
        );
      };

      try {
        const result = await runTurn({
          sessionID,
          payload,
          signal,
          onText,
          onReasoning,
          wait: true,
        });
        const toolCalls = toolMode ? parseToolEnvelope(result.text, tools) : null;
        const text = toolCalls ? "" : result.text;

        if (toolMode && !toolCalls && text) {
          emit(
            isResponses
              ? `data: ${JSON.stringify({ type: "response.output_text.delta", item_id: id, output_index: 0, delta: text })}\n\n`
              : sseLine(chunkEnvelope({ id, created, model, delta: { content: text } }))
          );
        }

        for (const call of toolCalls || []) {
          emit(
            isResponses
              ? `data: ${JSON.stringify({
                  type: "response.output_item.done",
                  output_index: 1,
                  item: {
                    type: "function_call",
                    id: newId("fc_"),
                    call_id: call.id,
                    name: call.function.name,
                    arguments: call.function.arguments,
                    status: "completed",
                  },
                })}\n\n`
              : sseLine(
                  chunkEnvelope({
                    id,
                    created,
                    model,
                    delta: {
                      tool_calls: [
                        {
                          index: 0,
                          id: call.id,
                          type: "function",
                          function: {
                            name: call.function.name,
                            arguments: call.function.arguments,
                          },
                        },
                      ],
                    },
                  })
                )
          );
        }

        emit(
          isResponses
            ? `data: ${JSON.stringify({
                type: "response.completed",
                response: buildResponsesPayload({
                  id,
                  created,
                  model,
                  text,
                  toolCalls,
                  info: result.info,
                }),
              })}\n\n`
            : `data: ${JSON.stringify({
                id,
                object: "chat.completion.chunk",
                created,
                model,
                choices: [
                  {
                    index: 0,
                    delta: {},
                    finish_reason: finishReason(result.info, !!(toolCalls && toolCalls.length)),
                  },
                ],
                usage: usageFromTokens(result.info?.tokens),
              })}\n\n`
        );
        emit("data: [DONE]\n\n");
      } catch (error) {
        // Same envelope every other route uses: sanitized message, no raw
        // upstream text (Hard Rule 12).
        const message = error instanceof Error ? error.message : String(error);
        const errorBody = buildErrorBody(502, message);
        emit(
          isResponses
            ? `data: ${JSON.stringify({ type: "error", error: errorBody.error })}\n\n`
            : sseLine({ error: errorBody.error })
        );
      } finally {
        await destroySession(sessionID);
        if (!closed && controller) {
          closed = true;
          try {
            controller.close();
          } catch {
            /* already closed */
          }
        }
      }
    })();

    return { response };
  }
}
