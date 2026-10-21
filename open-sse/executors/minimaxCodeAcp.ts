import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

/**
 * One shared MiniMax Code agent over the Agent Client Protocol.
 *
 * `mcode acp` speaks the Agent Client Protocol over stdin/stdout: the client
 * starts the agent, opens a session, and sends a prompt. The agent answers
 * with `session/update` notifications and the prompt result carries the stop
 * reason.
 *
 * WHY ONE SHARED AGENT: a MiniMax Code runtime costs a few hundred megabytes
 * and a few seconds of start-up. Starting one per request multiplied that
 * cost by the number of requests, and every concurrent request added its own
 * copy to the instance. The client below keeps one agent per (command, args,
 * cwd, data dir) for the whole process, hands it to every request that needs
 * it, and closes it when it has been idle for a while.
 *
 * The protocol is the one the client wants anyway: the client provides the
 * tools, so the agent does not have to load its own.
 */

const DEFAULT_STARTUP_TIMEOUT_MS = 30_000;
const DEFAULT_REQUEST_TIMEOUT_MS = 180_000;
const DEFAULT_IDLE_TIMEOUT_MS = 600_000;

type JsonRecord = Record<string, unknown>;

export interface MinimaxCodeAcpOptions {
  command: string;
  args?: string[];
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  /** Profile directory of the agent (MINIMAX_DATA_DIR). */
  dataDir?: string;
  startupTimeoutMs?: number;
  requestTimeoutMs?: number;
  clientName?: string;
  clientVersion?: string;
  /** Called when the agent process is gone, so a shared agent can be dropped. */
  onExit?: (error: Error) => void;
}

export interface MinimaxCodeAcpSession {
  sessionId: string;
}

export interface MinimaxCodeAcpTurn {
  /** The answer of the agent. */
  text: string;
  /** The reasoning of the agent, when the runtime streams it. */
  thinking: string;
  stopReason: string;
}

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

interface SessionListener {
  onText?: (text: string) => void;
  onThinking?: (text: string) => void;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/** Read the text out of an ACP content block. */
export function contentText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(contentText).join("");
  const record = asRecord(value);
  if (typeof record.text === "string") return record.text;
  if (Array.isArray(record.content)) return record.content.map(contentText).join("");
  return "";
}

/**
 * A local MiniMax Code agent reached over the Agent Client Protocol.
 */
export class MinimaxCodeAcpClient {
  private readonly options: MinimaxCodeAcpOptions;
  private child: ChildProcessWithoutNullStreams | null = null;
  private buffer = "";
  private readonly pending = new Map<string, PendingRequest>();
  private readonly listeners = new Map<string, SessionListener>();
  private nextRequestId = 1;
  private closed = false;

  constructor(options: MinimaxCodeAcpOptions) {
    this.options = options;
  }

  /** True while the agent process is alive and usable. */
  get running(): boolean {
    return this.child !== null && !this.closed;
  }

  async start(): Promise<void> {
    if (this.child) return;
    const env = { ...process.env, ...(this.options.env ?? {}) };
    if (this.options.dataDir) env.MINIMAX_DATA_DIR = this.options.dataDir;
    this.child = spawn(this.options.command, this.options.args ?? ["acp"], {
      stdio: ["pipe", "pipe", "pipe"],
      cwd: this.options.cwd,
      env,
    });
    this.child.stdout.on("data", (chunk: Buffer) => this.feed(chunk.toString("utf8")));
    this.child.stderr.on("data", () => undefined);
    this.child.on("exit", () => {
      const error = new Error("MiniMax Code agent exited");
      this.failAll(error);
      this.options.onExit?.(error);
    });
    await this.request(
      "initialize",
      {
        protocolVersion: 1,
        clientCapabilities: {
          fs: { readTextFile: false, writeTextFile: false },
        },
        clientInfo: {
          name: this.options.clientName ?? "omniroute",
          title: "OmniRoute",
          version: this.options.clientVersion ?? "1.0.0",
        },
      },
      this.options.startupTimeoutMs ?? DEFAULT_STARTUP_TIMEOUT_MS
    );
  }

  /** Open a session in the agent. */
  async newSession(cwd: string, model?: string): Promise<MinimaxCodeAcpSession> {
    const result = asRecord(
      await this.request(
        "session/new",
        { cwd, mcpServers: [], ...(model ? { model } : {}) },
        this.options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS
      )
    );
    const sessionId = result.sessionId ?? result.session_id;
    if (typeof sessionId !== "string" || !sessionId.trim()) {
      throw new Error("MiniMax Code session/new returned no session id");
    }
    return { sessionId };
  }

  /** Watch the answer of one session. */
  onSession(sessionId: string, listener: SessionListener): () => void {
    this.listeners.set(sessionId, listener);
    return () => this.listeners.delete(sessionId);
  }

  /**
   * Send one prompt and wait for the turn to end.
   *
   * The answer arrives as `session/update` notifications, the result of the
   * prompt request carries the stop reason.
   */
  async prompt(
    sessionId: string,
    text: string,
    timeoutMs: number = this.options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS
  ): Promise<MinimaxCodeAcpTurn> {
    let answer = "";
    let thinking = "";
    const stop = this.onSession(sessionId, {
      onText: (delta) => {
        answer += delta;
      },
      onThinking: (delta) => {
        thinking += delta;
      },
    });
    try {
      const result = asRecord(
        await this.request("session/prompt", { sessionId, prompt: [{ type: "text", text }] }, timeoutMs)
      );
      const stopReason = typeof result.stopReason === "string" ? result.stopReason : "end_turn";
      return { text: answer.trim(), thinking: thinking.trim(), stopReason };
    } finally {
      stop();
    }
  }

  /** Cancel the turn of a session. */
  async cancel(sessionId: string): Promise<void> {
    await this.request("session/cancel", { sessionId }, 5_000).catch(() => undefined);
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    this.failAll(new Error("MiniMax Code agent client closed"));
    try {
      this.child?.stdin.end();
    } catch {
      // The pipe may already be gone; the exit handler covers the rest.
    }
    try {
      this.child?.kill("SIGTERM");
    } catch {
      // Best effort: the agent may have exited on its own.
    }
    this.child = null;
  }

  private feed(chunk: string): void {
    this.buffer += chunk;
    for (;;) {
      const lineEnd = this.buffer.indexOf("\n");
      if (lineEnd < 0) return;
      const line = this.buffer.slice(0, lineEnd).trim();
      this.buffer = this.buffer.slice(lineEnd + 1);
      if (!line) continue;
      let message: JsonRecord;
      try {
        message = JSON.parse(line) as JsonRecord;
      } catch {
        continue;
      }
      this.dispatch(message);
    }
  }

  private dispatch(message: JsonRecord): void {
    const id = typeof message.id === "string" ? message.id : undefined;
    if (id && this.pending.has(id)) {
      const pending = this.pending.get(id)!;
      this.pending.delete(id);
      clearTimeout(pending.timer);
      const error = asRecord(message.error);
      if (message.error) {
        pending.reject(
          new Error(`${error.code ?? "agent-error"}: ${error.message ?? "MiniMax Code agent error"}`)
        );
      } else {
        pending.resolve(message.result);
      }
      return;
    }
    if (message.method !== "session/update") return;
    const params = asRecord(message.params);
    const update = asRecord(params.update);
    const sessionId = typeof params.sessionId === "string" ? params.sessionId : undefined;
    if (!sessionId) return;
    const listener = this.listeners.get(sessionId);
    if (!listener) return;
    const kind = update.sessionUpdate;
    if (kind === "agent_message_chunk") {
      const delta = contentText(update.content);
      if (delta) listener.onText?.(delta);
      return;
    }
    if (kind === "agent_thought_chunk") {
      const delta = contentText(update.content);
      if (delta) listener.onThinking?.(delta);
    }
  }

  private request(method: string, params: unknown, timeoutMs: number): Promise<unknown> {
    const id = `rpc-${this.nextRequestId++}`;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`MiniMax Code agent request timed out: ${method}`));
      }, timeoutMs);
      timer.unref?.();
      this.pending.set(id, { resolve, reject, timer });
      this.send({ jsonrpc: "2.0", id, method, params });
    });
  }

  private send(message: JsonRecord): void {
    if (!this.child) throw new Error("MiniMax Code agent client is not started");
    this.child.stdin.write(`${JSON.stringify(message)}\n`);
  }

  private failAll(error: Error): void {
    for (const [, pending] of this.pending) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.pending.clear();
  }
}

/* ------------------------------------------------------------------ */
/* The shared agent: one process per profile for the whole OmniRoute.  */
/* ------------------------------------------------------------------ */

export interface MinimaxCodeAcpServerOptions {
  command: string;
  args?: string[];
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  dataDir?: string;
  startupTimeoutMs?: number;
  requestTimeoutMs?: number;
  /** Close the shared agent after this many idle milliseconds. */
  idleTimeoutMs?: number;
}

interface SharedEntry {
  client: MinimaxCodeAcpClient;
  starting: Promise<void> | null;
  users: number;
  idleTimer: ReturnType<typeof setTimeout> | null;
  dead: boolean;
}

const sharedAgents = new Map<string, SharedEntry>();

function agentKey(options: MinimaxCodeAcpServerOptions): string {
  return [
    options.command,
    (options.args ?? []).join(" "),
    options.cwd ?? "",
    options.dataDir ?? "",
  ].join("|");
}

function idleTimeout(options: MinimaxCodeAcpServerOptions): number {
  const raw = Number(
    process.env.MINIMAX_CODE_SHARED_AGENT_IDLE_MS ?? options.idleTimeoutMs ?? DEFAULT_IDLE_TIMEOUT_MS
  );
  return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_IDLE_TIMEOUT_MS;
}

/**
 * Hand out the shared agent for this profile, starting it on first use.
 * An agent that died is replaced instead of being reused.
 */
export async function acquireSharedAgent(
  options: MinimaxCodeAcpServerOptions
): Promise<MinimaxCodeAcpClient> {
  const key = agentKey(options);
  let entry = sharedAgents.get(key);
  if (entry?.dead) {
    sharedAgents.delete(key);
    entry = undefined;
  }
  if (!entry) {
    // The exit handler belongs to this client only: a late exit of an agent
    // that was already replaced must not drop the agent that took its place.
    let client: MinimaxCodeAcpClient;
    client = new MinimaxCodeAcpClient({
      command: options.command,
      args: options.args,
      cwd: options.cwd,
      env: options.env,
      dataDir: options.dataDir,
      startupTimeoutMs: options.startupTimeoutMs,
      requestTimeoutMs: options.requestTimeoutMs,
      onExit: () => {
        const current = sharedAgents.get(key);
        if (current && current.client === client) {
          current.dead = true;
          sharedAgents.delete(key);
        }
      },
    });
    entry = { client, starting: null, users: 0, idleTimer: null, dead: false };
    sharedAgents.set(key, entry);
  }
  if (!entry.starting) {
    entry.starting = entry.client.start().catch((error) => {
      entry!.dead = true;
      sharedAgents.delete(key);
      throw error;
    });
  }
  await entry.starting;
  entry.users += 1;
  if (entry.idleTimer) {
    clearTimeout(entry.idleTimer);
    entry.idleTimer = null;
  }
  return entry.client;
}

/** Give the shared agent back; it is closed once it has been idle for a while. */
export function releaseSharedAgent(
  client: MinimaxCodeAcpClient,
  options: MinimaxCodeAcpServerOptions
): void {
  for (const [key, entry] of sharedAgents) {
    if (entry.client !== client) continue;
    entry.users = Math.max(0, entry.users - 1);
    if (entry.users > 0) return;
    const delay = idleTimeout(options);
    entry.idleTimer = setTimeout(() => {
      void closeSharedAgent(key);
    }, delay);
    entry.idleTimer.unref?.();
  }
}

/** Close one shared agent (used by the idle timer and by the tests). */
export async function closeSharedAgent(key: string): Promise<void> {
  const entry = sharedAgents.get(key);
  if (!entry) return;
  sharedAgents.delete(key);
  if (entry.idleTimer) clearTimeout(entry.idleTimer);
  await entry.client.close().catch(() => undefined);
}

/** Close every shared agent (shutdown path). */
export async function closeAllSharedAgents(): Promise<void> {
  for (const key of [...sharedAgents.keys()]) await closeSharedAgent(key);
}

/** How many shared agents are alive — used by the run log and the tests. */
export function sharedAgentCount(): number {
  return sharedAgents.size;
}

/* ------------------------------------------------------------------ */
/* One turn on the shared agent.                                        */
/* ------------------------------------------------------------------ */

export interface MinimaxCodeAcpRunOptions {
  command: string;
  args?: string[];
  cwd: string;
  prompt: string;
  model: string;
  timeoutMs: number;
  signal?: AbortSignal | null;
  env?: NodeJS.ProcessEnv;
  dataDir?: string;
  onDelta?: (delta: string) => void;
  log?: {
    info?: (...args: unknown[]) => void;
    warn?: (...args: unknown[]) => void;
    debug?: (...args: unknown[]) => void;
  };
}

function abortError(): Error {
  return new Error("MiniMax Code request aborted");
}

/**
 * Run one turn on the shared agent.
 *
 * The agent process is shared; only the session is per request, so the model
 * keeps its own context while the process cost is paid once.
 */
export async function runMinimaxCodeAcpTurn(options: MinimaxCodeAcpRunOptions): Promise<string> {
  if (options.signal?.aborted) throw abortError();
  const serverOptions: MinimaxCodeAcpServerOptions = {
    command: options.command,
    args: options.args ?? ["acp"],
    cwd: options.cwd,
    env: options.env,
    dataDir:
      options.dataDir ||
      process.env.MINIMAX_CODE_SHARED_AGENT_DATA_DIR ||
      process.env.MINIMAX_CODE_PROFILE_DIR,
    requestTimeoutMs: options.timeoutMs,
  };
  const client = await acquireSharedAgent(serverOptions);
  let sessionId: string | null = null;
  try {
    const session = await client.newSession(options.cwd, options.model || undefined);
    sessionId = session.sessionId;
    const turnPromise = client.prompt(sessionId, options.prompt, options.timeoutMs);
    if (options.signal) {
      const onAbort = () => {
        if (sessionId) void client.cancel(sessionId);
      };
      options.signal.addEventListener("abort", onAbort, { once: true });
      try {
        const turn = await turnPromise;
        if (turn.text) options.onDelta?.(turn.text);
        return turn.text;
      } finally {
        options.signal.removeEventListener("abort", onAbort);
      }
    }
    const turn = await turnPromise;
    if (turn.text) options.onDelta?.(turn.text);
    return turn.text;
  } finally {
    releaseSharedAgent(client, serverOptions);
  }
}
