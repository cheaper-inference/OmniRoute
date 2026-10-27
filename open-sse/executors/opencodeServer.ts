import { spawn } from "node:child_process";
import { closeSync, existsSync, mkdirSync, openSync } from "node:fs";
import { join } from "node:path";

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { buildErrorBody } from "../utils/error.ts";
import {
  OpencodeEventBus,
  type OpencodeMessageInfo,
  type OpencodePart,
} from "../services/opencodeServerEventBus.ts";
import { buildServerEnv, isLoopbackHost } from "../services/opencodeServerSafety.ts";
import {
  clearOpencodeServerSettingsCache,
  readOpencodeServerSettings,
  type OpencodeServerSettings,
} from "../services/opencodeServerSettings.ts";
import {
  OpencodeTurnCollector,
  buildChatCompletion,
  buildParts,
  buildResponsesPayload,
  buildTurns,
  createSseSink,
  createStreamFrames,
  detectWireFormat,
  finalStreamFrames,
  firstExistingPath,
  newId,
  normalizeTools,
  opencodeBinaryCandidates,
  parseCatalog,
  parseToolEnvelope,
  toolInstruction,
  turnResultFromParts,
  type CatalogPayload,
  type NormalizedTools,
  type OpencodeServerModel,
  type StreamFrames,
  type TurnResult,
  type TurnSinks,
  type WireFormat,
} from "../services/opencodeServerWire.ts";

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
  const { candidates, fallback } = opencodeBinaryCandidates(process.platform, process.env);
  return firstExistingPath(candidates, existsSync) ?? fallback;
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

function catalogIsFresh(): boolean {
  return Date.now() - catalog.at < CATALOG_TTL_MS && catalog.byModel.size > 0;
}

async function loadCatalog(force = false): Promise<typeof catalog> {
  if (!force && catalogIsFresh()) return catalog;
  await ensureOpencodeServer();
  const { byModel, defaultProvider } = parseCatalog(
    await serverJson<CatalogPayload>("/config/providers")
  );
  catalog.byModel = byModel;
  catalog.defaultProvider = defaultProvider;
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

type RunOptions = TurnSinks & {
  sessionID: string;
  payload: Record<string, unknown>;
  signal?: AbortSignal | null;
  wait: boolean;
};

// Blocking turn: one POST that returns the finished { info, parts }.
async function runBlockingTurn({ sessionID, payload, signal }: RunOptions): Promise<TurnResult> {
  const result = await serverJson<{ info?: OpencodeMessageInfo; parts?: OpencodePart[] }>(
    `/session/${sessionID}/message`,
    { method: "POST", body: payload, signal }
  );
  return turnResultFromParts(result?.info, result?.parts);
}

// Streaming turn: prompt_async (204) and follow the shared /event stream until the
// session goes idle, forwarding deltas to the sinks as they arrive.
async function runStreamingTurn({
  sessionID,
  payload,
  signal,
  onText,
  onReasoning,
}: RunOptions): Promise<TurnResult> {
  const collector = new OpencodeTurnCollector({ onText, onReasoning });
  let unsubscribe = () => {};
  let rejectRun: ((error: Error) => void) | null = null;
  const finished = new Promise<void>((resolve, reject) => {
    rejectRun = reject;
    unsubscribe = eventBus.subscribe(sessionID, (event) => {
      collector.handle(event);
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
  return collector.result();
}

function runTurn(options: RunOptions): Promise<TurnResult> {
  return options.wait ? runStreamingTurn(options) : runBlockingTurn(options);
}

type StreamArgs = {
  sessionID: string;
  payload: Record<string, unknown>;
  signal?: AbortSignal | null;
  wireFormat: WireFormat;
  id: string;
  created: number;
  model: string;
  tools: NormalizedTools["tools"];
  toolMode: boolean;
};

// Runs the turn behind an already-returned SSE response. Errors become the same
// sanitized envelope every other route uses, with no raw upstream text (Hard
// Rule 12); the session is always destroyed and the stream always closed.
async function pumpStreamTurn(
  args: StreamArgs,
  frames: StreamFrames,
  sink: ReturnType<typeof createSseSink>
): Promise<void> {
  // With tools the answer may be a tool_calls envelope rather than prose, which
  // is only knowable at the end, so those deltas are buffered.
  const forward =
    (frame: (delta: string) => string) =>
    (delta: string): void => {
      if (!args.toolMode) sink.emit(frame(delta));
    };
  try {
    const result = await runTurn({
      sessionID: args.sessionID,
      payload: args.payload,
      signal: args.signal,
      onText: forward(frames.text),
      onReasoning: forward(frames.reasoning),
      wait: true,
    });
    for (const frame of finalStreamFrames(frames, result, args.tools, args.toolMode)) {
      sink.emit(frame);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    sink.emit(frames.error(buildErrorBody(502, message).error));
  } finally {
    await destroySession(args.sessionID);
    sink.close();
  }
}

function jsonResponse(payload: unknown): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
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
    const toolMode = normalized.tools.length > 0 && normalized.choice !== "none";

    if (!wantsStream) {
      try {
        const result = await runTurn({ sessionID, payload, signal: input.signal, wait: false });
        const toolCalls = toolMode ? parseToolEnvelope(result.text, normalized.tools) : null;
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
      toolMode,
    });
  }

  private streamResponse(args: StreamArgs): { response: Response } {
    const frames = createStreamFrames(args.wireFormat, args);
    const sink = createSseSink();
    const response = new Response(sink.stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
    sink.emit(frames.created());
    void pumpStreamTurn(args, frames, sink);
    return { response };
  }
}
