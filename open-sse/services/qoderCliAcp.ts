/**
 * Persistent qodercli transport over ACP (Agent Client Protocol: newline-delimited
 * JSON-RPC 2.0 on stdio, `qodercli --acp`). One long-lived qodercli process per
 * PAT serves every request as its own ACP session, instead of paying a fresh
 * ~750 MB / ~11 s Node start-up per request in `--print` mode.
 *
 * Opt-in via `QODER_CLI_TRANSPORT=acp`; the process-wide qodercli gate still
 * bounds how many prompts run at once.
 */
import { spawn } from "child_process";
import crypto from "crypto";
import { resolveQoderCliInvocation } from "./qoderCliResolve";
import { buildQoderCliEnv, killQoderCliProcessTree, type QoderCliRunResult } from "./qoderCliSpawn";

const ACP_PROTOCOL_VERSION = 1;
const DEFAULT_PROMPT_TIMEOUT_MS = 120_000;
const DEFAULT_STARTUP_TIMEOUT_MS = 60_000;
const DEFAULT_IDLE_TIMEOUT_MS = 10 * 60 * 1000;
const DEFAULT_MAX_SESSIONS_PER_PROCESS = 500;
const SESSION_SETUP_TIMEOUT_MS = 60_000;
const SESSION_CLEANUP_TIMEOUT_MS = 10_000;

type JsonRecord = Record<string, unknown>;

export type QoderAcpModel = { modelId: string; name?: string };

export type QoderAcpPromptOptions = {
  token: string;
  prompt: string;
  configDir: string;
  cwd: string;
  /** Picks the ACP `modelId` to switch the session to; null keeps the session default. */
  pickModelId?: (available: QoderAcpModel[], currentModelId: string) => string | null;
  command?: string | null;
  signal?: AbortSignal | null;
  timeoutMs?: number;
};

function readPositiveInt(raw: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(String(raw ?? "").trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function isQoderAcpTransportEnabled(): boolean {
  return (
    String(process.env.QODER_CLI_TRANSPORT || "")
      .trim()
      .toLowerCase() === "acp"
  );
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

class AcpRpcError extends Error {
  constructor(
    message: string,
    readonly code: number | null
  ) {
    super(message);
    this.name = "AcpRpcError";
  }
}

type Pending = {
  resolve: (value: JsonRecord) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
};

type SessionListener = (update: JsonRecord) => void;

class QoderAcpProcess {
  private child: ReturnType<typeof spawn> | null = null;
  private nextId = 1;
  private readonly pending = new Map<number, Pending>();
  private readonly listeners = new Map<string, SessionListener>();
  private stdoutBuffer = "";
  private startPromise: Promise<void> | null = null;
  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private activeSessions = 0;
  private sessionsServed = 0;
  private disposed = false;

  constructor(
    private readonly key: string,
    private readonly options: { token: string; configDir: string; command?: string | null },
    private readonly onDispose: (key: string, instance: QoderAcpProcess) => void
  ) {}

  get isDisposed(): boolean {
    return this.disposed;
  }

  /** Stop accepting sessions after this many, so a leaking process gets recycled. */
  get isDraining(): boolean {
    return (
      this.sessionsServed >=
      readPositiveInt(
        process.env.QODER_CLI_ACP_MAX_SESSIONS_PER_PROCESS,
        DEFAULT_MAX_SESSIONS_PER_PROCESS
      )
    );
  }

  start(): Promise<void> {
    if (!this.startPromise) this.startPromise = this.spawnAndInitialize();
    return this.startPromise;
  }

  private async spawnAndInitialize(): Promise<void> {
    const { command, useShell } = await resolveQoderCliInvocation(this.options.command);
    const env = buildQoderCliEnv(this.options.token);

    // `--tools ""` applies to every ACP session the process creates: OmniRoute only
    // wants plain LM replies, never file-system access or command execution.
    const args = ["--acp", "--tools", "", "--config-dir", this.options.configDir];
    const child = spawn(command, args, {
      env,
      cwd: this.options.configDir,
      // stderr is shared by every session (it logs failing requests with their
      // params), so it is never captured: it could leak one caller's prompt to another.
      stdio: ["pipe", "pipe", "ignore"],
      windowsHide: true,
      detached: process.platform !== "win32",
      ...(useShell ? { shell: true } : {}),
    });
    this.child = child;

    child.stdin?.on("error", () => {});
    child.stdout?.on("error", () => {});
    child.stdout?.setEncoding("utf8");
    child.stdout?.on("data", (chunk: string) => this.onStdout(chunk));
    child.on("error", (err: Error) => this.dispose(`qodercli ACP process error: ${err.message}`));
    child.on("close", (code: number | null) =>
      this.dispose(`qodercli ACP process exited (code ${code})`)
    );

    const startupTimeoutMs = readPositiveInt(
      process.env.QODER_CLI_ACP_STARTUP_TIMEOUT_MS,
      DEFAULT_STARTUP_TIMEOUT_MS
    );
    await this.request(
      "initialize",
      { protocolVersion: ACP_PROTOCOL_VERSION, clientCapabilities: {} },
      startupTimeoutMs
    );
  }

  private onStdout(chunk: string): void {
    this.stdoutBuffer += chunk;
    let newline = this.stdoutBuffer.indexOf("\n");
    while (newline !== -1) {
      const line = this.stdoutBuffer.slice(0, newline).trim();
      this.stdoutBuffer = this.stdoutBuffer.slice(newline + 1);
      if (line) this.onMessage(line);
      newline = this.stdoutBuffer.indexOf("\n");
    }
  }

  private onMessage(line: string): void {
    let message: JsonRecord;
    try {
      message = asRecord(JSON.parse(line));
    } catch {
      return; // stray log output on stdout
    }
    const id = message.id;
    const method = typeof message.method === "string" ? message.method : "";

    if (method && id !== undefined && id !== null) {
      this.answerAgentRequest(id, method);
      return;
    }
    if (method === "session/update") {
      const params = asRecord(message.params);
      const listener = this.listeners.get(String(params.sessionId || ""));
      listener?.(asRecord(params.update));
      return;
    }
    if (typeof id === "number" && this.pending.has(id)) {
      const pending = this.pending.get(id)!;
      this.pending.delete(id);
      clearTimeout(pending.timer);
      if (message.error) {
        const error = asRecord(message.error);
        pending.reject(
          new AcpRpcError(
            String(error.message || "qodercli ACP request failed"),
            typeof error.code === "number" ? error.code : null
          )
        );
      } else {
        pending.resolve(asRecord(message.result));
      }
    }
  }

  /** Deny every agent-initiated request: no tool permissions, no client fs/terminal. */
  private answerAgentRequest(id: unknown, method: string): void {
    const reply =
      method === "session/request_permission"
        ? { jsonrpc: "2.0", id, result: { outcome: { outcome: "cancelled" } } }
        : {
            jsonrpc: "2.0",
            id,
            error: { code: -32601, message: `Method not supported: ${method}` },
          };
    this.write(reply);
  }

  private write(message: JsonRecord): void {
    try {
      this.child?.stdin?.write(`${JSON.stringify(message)}\n`);
    } catch {
      /* the close handler disposes the process */
    }
  }

  request(method: string, params: JsonRecord, timeoutMs: number): Promise<JsonRecord> {
    if (this.disposed) {
      return Promise.reject(new Error("qodercli ACP process is not running"));
    }
    const id = this.nextId++;
    return new Promise<JsonRecord>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        const error = new Error(`qodercli ACP ${method} timed out after ${timeoutMs}ms`);
        error.name = "TimeoutError";
        reject(error);
      }, timeoutMs);
      timer.unref?.();
      this.pending.set(id, { resolve, reject, timer });
      this.write({ jsonrpc: "2.0", id, method, params });
    });
  }

  notify(method: string, params: JsonRecord): void {
    if (!this.disposed) this.write({ jsonrpc: "2.0", method, params });
  }

  beginSession(): void {
    this.activeSessions += 1;
    this.sessionsServed += 1;
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }
  }

  endSession(): void {
    this.activeSessions = Math.max(0, this.activeSessions - 1);
    if (this.activeSessions > 0 || this.disposed) return;
    if (this.isDraining) {
      this.dispose("qodercli ACP process recycled");
      return;
    }
    const idleMs = readPositiveInt(
      process.env.QODER_CLI_ACP_IDLE_TIMEOUT_MS,
      DEFAULT_IDLE_TIMEOUT_MS
    );
    this.idleTimer = setTimeout(() => this.dispose("qodercli ACP process idle"), idleMs);
    this.idleTimer.unref?.();
  }

  listen(sessionId: string, listener: SessionListener): () => void {
    this.listeners.set(sessionId, listener);
    return () => this.listeners.delete(sessionId);
  }

  dispose(reason: string): void {
    if (this.disposed) return;
    this.disposed = true;
    if (this.idleTimer) clearTimeout(this.idleTimer);
    for (const pending of this.pending.values()) {
      clearTimeout(pending.timer);
      pending.reject(new Error(reason));
    }
    this.pending.clear();
    this.listeners.clear();
    if (this.child) killQoderCliProcessTree(this.child);
    this.onDispose(this.key, this);
  }
}

const processes = new Map<string, QoderAcpProcess>();

function processKey(token: string, configDir: string, command?: string | null): string {
  return crypto
    .createHash("sha256")
    .update(`${token}\0${configDir}\0${command || ""}`)
    .digest("hex");
}

async function getQoderAcpProcess(options: {
  token: string;
  configDir: string;
  command?: string | null;
}): Promise<QoderAcpProcess> {
  const key = processKey(options.token, options.configDir, options.command);
  let instance = processes.get(key);
  if (!instance || instance.isDisposed || instance.isDraining) {
    instance = new QoderAcpProcess(key, options, (disposedKey, disposed) => {
      if (processes.get(disposedKey) === disposed) processes.delete(disposedKey);
    });
    processes.set(key, instance);
  }
  try {
    await instance.start();
  } catch (err) {
    instance.dispose(`qodercli ACP start failed: ${(err as Error).message}`);
    throw err;
  }
  return instance;
}

function failure(message: string, extra: Partial<QoderCliRunResult> = {}): QoderCliRunResult {
  return {
    ok: false,
    code: null,
    stdout: "",
    stderr: message,
    timedOut: false,
    error: message,
    ...extra,
  };
}

function abortError(): Error {
  const error = new Error("Aborted");
  error.name = "AbortError";
  return error;
}

function extractChunkText(update: JsonRecord): string {
  if (update.sessionUpdate !== "agent_message_chunk") return "";
  const content = asRecord(update.content);
  return content.type === "text" && typeof content.text === "string" ? content.text : "";
}

function readSessionModels(session: JsonRecord): {
  available: QoderAcpModel[];
  currentModelId: string;
} {
  const models = asRecord(session.models);
  const available = (Array.isArray(models.availableModels) ? models.availableModels : [])
    .map((model) => asRecord(model))
    .filter((model) => typeof model.modelId === "string")
    .map((model) => ({
      modelId: String(model.modelId),
      name: typeof model.name === "string" ? model.name : undefined,
    }));
  return { available, currentModelId: String(models.currentModelId || "") };
}

/** Mimics a `--print --output-format json` run so the executor parses both transports alike. */
function buildAcpTurnResult(text: string, stopReason: string): QoderCliRunResult {
  const isError = !text || (stopReason !== "end_turn" && stopReason !== "max_tokens");
  const envelope = {
    type: "result",
    subtype: isError ? "error" : "success",
    is_error: isError,
    result: isError
      ? text || `qodercli returned no reply (stopReason: ${stopReason || "unknown"})`
      : text,
  };
  return {
    ok: true,
    code: 0,
    stdout: JSON.stringify(envelope),
    stderr: "",
    timedOut: false,
    error: null,
  };
}

class AcpTurn {
  sessionId = "";
  text = "";
  timedOut = false;
  readonly aborted: Promise<never>;
  private rejectOnAbort: (error: Error) => void = () => {};
  private unlisten: () => void = () => {};
  private readonly onAbort = () => {
    this.cancel();
    this.rejectOnAbort(abortError());
  };

  constructor(
    private readonly agent: QoderAcpProcess,
    private readonly options: QoderAcpPromptOptions
  ) {
    this.aborted = new Promise<never>((_, reject) => {
      this.rejectOnAbort = reject;
    });
    this.aborted.catch(() => {});
    options.signal?.addEventListener("abort", this.onAbort, { once: true });
  }

  cancel(): void {
    if (this.sessionId) this.agent.notify("session/cancel", { sessionId: this.sessionId });
  }

  private throwIfAborted(): void {
    if (this.options.signal?.aborted) throw abortError();
  }

  private raceAbort(request: Promise<JsonRecord>): Promise<JsonRecord> {
    return Promise.race([request, this.aborted]);
  }

  async run(): Promise<QoderCliRunResult> {
    const { agent, options } = this;
    // Not raced against abort: a session created after the abort must still be deleted.
    const session = await agent.request(
      "session/new",
      { cwd: options.cwd, mcpServers: [] },
      SESSION_SETUP_TIMEOUT_MS
    );
    this.sessionId = String(session.sessionId || "");
    if (!this.sessionId) return failure("qodercli ACP session/new returned no sessionId");
    const sessionId = this.sessionId;
    this.throwIfAborted();
    this.unlisten = agent.listen(sessionId, (update) => {
      this.text += extractChunkText(update);
    });

    const { available, currentModelId } = readSessionModels(session);
    const modelId = options.pickModelId?.(available, currentModelId) ?? null;
    if (modelId && modelId !== currentModelId) {
      await this.raceAbort(
        agent.request("session/set_model", { sessionId, modelId }, SESSION_SETUP_TIMEOUT_MS)
      );
    }
    this.throwIfAborted();

    const result = await this.raceAbort(
      agent.request(
        "session/prompt",
        { sessionId, prompt: [{ type: "text", text: options.prompt }] },
        options.timeoutMs ?? DEFAULT_PROMPT_TIMEOUT_MS
      )
    );
    this.throwIfAborted();
    return buildAcpTurnResult(this.text, String(result.stopReason || ""));
  }

  fail(err: unknown): QoderCliRunResult {
    const error = err as Error;
    if (error.name === "AbortError" || this.options.signal?.aborted) return failure("Aborted");
    if (error.name === "TimeoutError") {
      this.timedOut = true;
      this.cancel();
    }
    return failure(error.message, {
      timedOut: this.timedOut,
      error: this.timedOut ? "qodercli timed out" : error.message,
    });
  }

  async close(): Promise<void> {
    this.options.signal?.removeEventListener?.("abort", this.onAbort);
    this.unlisten();
    if (!this.sessionId) return;
    // `session/delete` closes the live session and drops its transcript from disk.
    const deleted = await this.agent
      .request("session/delete", { sessionId: this.sessionId }, SESSION_CLEANUP_TIMEOUT_MS)
      .then(() => true)
      .catch(() => false);
    // A process that ignored both the prompt deadline and the cleanup is wedged.
    if (!deleted && this.timedOut) this.agent.dispose("qodercli ACP process unresponsive");
  }
}

/** Run one chat turn as a fresh ACP session on the shared qodercli process. */
export async function runQoderAcpPrompt(
  options: QoderAcpPromptOptions
): Promise<QoderCliRunResult> {
  if (options.signal?.aborted) return failure("Aborted");

  let agent: QoderAcpProcess;
  try {
    agent = await getQoderAcpProcess({
      token: options.token,
      configDir: options.configDir,
      command: options.command,
    });
  } catch (err) {
    return failure((err as Error).message);
  }

  agent.beginSession();
  const turn = new AcpTurn(agent, options);
  try {
    return await turn.run();
  } catch (err) {
    return turn.fail(err);
  } finally {
    await turn.close();
    agent.endSession();
  }
}

/** Kill every persistent qodercli ACP process (shutdown hook and tests). */
export function disposeQoderAcpProcesses(): void {
  for (const instance of [...processes.values()]) instance.dispose("qodercli ACP shutdown");
}

export function getQoderAcpProcessCount(): number {
  return processes.size;
}
