/**
 * agyCliAcp.ts — the transport that drives the operator's own `agy acp`.
 *
 * Every other antigravity path in this repository talks HTTP to Antigravity with
 * a harvested token. This one does not: it runs the installed `agy`, which signs
 * its own calls. That is the anti-ban half of the port — the account, the quota
 * and the client fingerprint are the CLI's, so there is no token to burn and no
 * request shape to imitate. The HTTP path stays the default; this one is opt-in
 * (`AGY_CLI_TRANSPORT=acp` or `providerSpecificData.transport`).
 *
 * One agy process per connection, one ACP session per conversation on it: the
 * process pays for the handshake, a session is cheap.
 *
 * Four things about agy shape this module, and none are obvious from the ACP
 * spec:
 *
 *   - agy reports a failed upstream call as reply text, not as an ACP error.
 *     `agyAgentText` classifies it; here it becomes the turn's failure status.
 *   - agy asks before running a client tool. The caller's tools reach it through
 *     the `ide-tools` MCP bridge (`agyMcpBridge`), so a permission request that
 *     names one of them is allowed once; anything agy would run on its own
 *     (shell, edits, questions, browser) is refused, because the caller's tools
 *     are the only ones this transport offers.
 *   - The session runs as an agent definition with `tools: []` and
 *     `inheritMcp: false`, written into a throwaway workspace, so agy cannot
 *     reach the operator's global MCP servers, skills or plugins through it.
 *   - The client's system prompt is not sent as session instructions by default.
 *     Antigravity answers a bare 429 "Resource has been exhausted" to a system
 *     prompt it turns away, whatever quota is left, and the set of lines it
 *     refuses keeps growing. It goes into the first user turn as
 *     `<external_system_instructions>` instead, which is what upstream does;
 *     `AGY_BRIDGE_SYSTEM_APPEND=1` restores the ACP field.
 *
 * Ported from magpie-community/plugins packages/agy-cli index.mjs (Proc + the
 * ACP half), keeping this repository's error and lifecycle conventions. The
 * state-free half (prompt parts, model selection, errors, the PATH shim) lives
 * in agyCliProtocol.ts and is re-exported below.
 */

import crypto from "node:crypto";
import { spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

import { AcpConnection, type JsonRecord } from "./agyAcpConnection.ts";
import { AgentTextFilter } from "./agyAgentText.ts";
import { outgoing } from "./antigravityPromptCloak.ts";
import {
  ACP_PROTOCOL_VERSION,
  AGENT_NAME,
  AgyTurnError,
  CLIENT_INFO,
  EFFORT_ORDER,
  agentDefinition,
  agyTooOld,
  bareToolName,
  closestEffort,
  configModelSelection,
  configSelect,
  configured,
  ensureShimDir,
  firstTurnParts,
  fitBridgeTools,
  isRecord,
  maxSessionTokens,
  promptHasImage,
  promptTokens,
  resetShimDir,
  resolveAgyBinary,
  selectValues,
  systemAppend,
  transcriptTokens,
  turnFailure,
  userTurnParts,
  type PromptPart,
} from "./agyCliProtocol.ts";
import {
  hasPrefix,
  renderContinuedTurnParts,
  renderInitialPromptParts,
  type AgyMessage,
} from "./agyPromptRender.ts";
import { agySpawnSpec, childEnv, windowsTreeKill } from "./agyCliPlatform.ts";
import {
  BridgeToolCatalog,
  closeControlServer,
  ensureControlServer,
  ideToolOf,
  registerBridgePeer,
  unregisterBridgePeer,
  type BridgePeer,
  type BridgeTool,
} from "./agyMcpBridge.ts";
import { estimateTokens } from "./contextManager.ts";

// The state-free half of the transport lives in agyCliProtocol.ts. Re-exported
// so the executor and the tests keep a single entry point.
export * from "./agyCliProtocol.ts";

const DEFAULT_PROC_START_TIMEOUT_MS = 60_000;
const DEFAULT_TURN_TIMEOUT_MS = 5 * 60 * 1000;
const DEFAULT_IDLE_MS = 10 * 60 * 1000;
const DEFAULT_MAX_PROCS = 16;
const DEFAULT_IDE_CALL_DEADLINE_MS = 150_000;

/**
 * How long one session setup request (create, resume, model or option change)
 * may take. It shares the start-up budget: both are agy answering a request that
 * does no model work, and a request with no deadline would hold the turn forever.
 */
const setupTimeoutMs = (): number =>
  configured("AGY_BRIDGE_START_TIMEOUT_MS", DEFAULT_PROC_START_TIMEOUT_MS);
/** agy's stderr is kept for the death message, bounded. */
const STDERR_TAIL = 32 * 1024;

/** The chunk kinds a running turn consumes. */
function isChunk(kind: unknown): boolean {
  return kind === "agent_message_chunk" || kind === "agent_thought_chunk";
}

/** The text a chunk carries; other content kinds carry none. */
function chunkText(update: JsonRecord): string {
  const content = isRecord(update.content) ? update.content : {};
  return content.type === "text" && typeof content.text === "string" ? content.text : "";
}

/**
 * Write the agent definition into `workspace`, which is what keeps agy from
 * reaching the operator's own tools.
 */ async function writeAgentDefinition(workspace: string): Promise<void> {
  const agentDir = path.join(workspace, ".agents", "agents", AGENT_NAME);
  await fs.promises.mkdir(agentDir, { recursive: true });
  await fs.promises.writeFile(path.join(agentDir, "agent.md"), agentDefinition(), {
    mode: 0o600,
  });
}

// ── One agy process ─────────────────────────────────────────────────────────

export type AgyTurnResult = {
  /** The reply text the caller should see. */
  text: string;
  /** agy's thinking, when the caller asked for it. */
  thinking: string;
  /** The reason agy gave for stopping. */
  stopReason: string;
  /** The session this turn ran in, so the caller may resume it. */
  sessionId: string | null;
  /** The model agy actually ran. */
  model: string | null;
  /**
   * The client tools agy ran this turn, in the order it ran them.
   *
   * A proxied caller asked for tool calls and gets them as part of its reply, so
   * the executor has to know which ones ran and with what arguments — agy's own
   * reply text is the final answer, not the calls.
   */
  toolCalls: AgyToolCall[];
  /**
   * The transcript the session now holds, estimated in tokens.
   *
   * Measured here rather than in the caller because only this process knows what
   * it has actually handed agy: the caller resends its whole conversation every
   * call, which says nothing about how much of it agy was told twice.
   */
  estimatedSessionTokens?: number;
  /** Whether this turn retired a full session and reopened it before sending. */
  preCompacted?: boolean;
};

/** One client tool agy ran, as the caller's own tool-call shape needs it. */
export type AgyToolCall = {
  /** The tool name without agy's `mcp_ide-tools_` prefix, as the client declared it. */
  name: string;
  /** The arguments agy passed, verbatim. */
  arguments: unknown;
};

export type AgyPromptInput = {
  /** A session to continue; a new one is created when absent. */
  sessionId?: string | null;
  /** The parts of the user's turn. */
  parts: PromptPart[];
  /**
   * The whole conversation, when the caller has one.
   *
   * Preferred over `parts` whenever available: only this object can tell
   * whether the session has already been sent the earlier turns, and only the
   * process knows that. Rendering here also keeps the replay under one prompt
   * budget instead of trusting the caller to have done it.
   */
  messages?: AgyMessage[];
  /** The client's system prompt. */
  instructions?: string;
  /** The model to select, when the caller named one. */
  model?: string | null;
  /** The tools the caller declared, which agy is offered over the bridge. */
  tools?: BridgeTool[];
  /** Called as text arrives, so a caller can stream. */
  onText?: (chunk: string) => void;
  /** Called as thinking arrives. */
  onThinking?: (chunk: string) => void;
  /** Called for each client tool agy runs; its answer goes back to agy. */
  onToolCall?: (name: string, args: unknown) => unknown;
  /** Aborting asks agy to cancel the turn. */
  signal?: AbortSignal;
};

/** One turn in flight: the filter that classifies it, and what it has produced. */
type TurnState = {
  text: AgentTextFilter;
  thinking: string;
  /** Everything already handed to `onText`, which the result must repeat. */
  emitted: string;
  onText?: (chunk: string) => void;
  onThinking?: (chunk: string) => void;
  cancelRequested: boolean;
  /** The client tools agy ran, in the order it ran them. */
  toolCalls: AgyToolCall[];
  /**
   * The turn handed its tools to the caller instead of running them here.
   *
   * agy stops as soon as a call it cannot answer comes back, and the caller
   * (a Codex CodeMode request, typically) is the one that runs it. Keeping this
   * apart from `cancelRequested` matters: a cancel discards the reply, a
   * handoff keeps it and the calls with it.
   */
  handoffRequested: boolean;
};

export class AgyAcpProcess implements BridgePeer {
  readonly token = crypto.randomUUID();
  readonly catalog: BridgeToolCatalog;
  private child: ChildProcess | null = null;
  private conn: AcpConnection | null = null;
  private stderrTail = "";
  private sessionId: string | null = null;
  private currentModel: string | null = null;
  private configOptions: unknown[] = [];
  private configMethodUnsupported = false;
  private agentVersion: string | null = null;
  private supportsImages = false;
  private instructionsInSession = false;
  private systemAppendSupported = false;
  private resumeSupported = false;
  private hasSentFirstTurn = false;
  /**
   * Held from the moment a prompt is accepted until its turn ends, so a second
   * request for the same conversation is refused while the first is still
   * setting its session up, before `turn` exists.
   */
  private reserved = false;
  /**
   * Tokens this session has been sent, estimated as it goes.
   *
   * agy compacts on its own schedule and does not say when; the only way to stay
   * ahead of it is to measure what this process handed it. Kept per session and
   * reset when a session is replaced, because that is the moment the transcript
   * starts over.
   */
  private sessionTokens = 0;
  /**
   * The conversation this process has handed agy, turn for turn.
   *
   * Only the turns already sent are recorded, never the current one: a turn that
   * failed must be replayed, not assumed seen.
   */
  private sentMessages: AgyMessage[] = [];
  private dead = false;
  private deadError: Error | null = null;
  private disposed = false;
  private deniedPermissions = 0;
  private startPromise: Promise<void> | null = null;
  private idleTimer: ReturnType<typeof setTimeout> | null = null;
  private turn: TurnState | null = null;
  private toolHandler: ((name: string, args: unknown) => unknown) | null = null;
  private workspace: string | null = null;

  constructor(
    private readonly key: string,
    private readonly options: {
      agyPath: string;
      workDir: string;
      tools: BridgeTool[];
      model?: string | null;
      effort?: string | null;
    },
    private readonly onDispose: (key: string, instance: AgyAcpProcess) => void
  ) {
    this.catalog = new BridgeToolCatalog(options.tools, fitBridgeTools);
  }

  get isDisposed(): boolean {
    return this.disposed;
  }

  get isDead(): boolean {
    return this.dead;
  }

  get version(): string | null {
    return this.agentVersion;
  }

  get denied(): number {
    return this.deniedPermissions;
  }

  get activeSessionId(): string | null {
    return this.sessionId;
  }

  // ── BridgePeer ────────────────────────────────────────────────────────────

  listTools(): BridgeTool[] {
    return this.catalog.listTools();
  }

  addWatcher(socket: net.Socket): void {
    this.catalog.addWatcher(socket);
  }

  /**
   * Answer one MCP call from agy.
   *
   * The socket stays open until the caller's tool answers — that is how a slow
   * tool works here, and why nothing in this method may end it early.
   *
   * A turn with no handler is not an error: that is a Mode request (Codex
   * CodeMode and relatives) where the *client* runs the tool and the model's job
   * is to emit the call. Failing the call with `-32603` there makes agy report a
   * broken bridge instead of returning the call, which the client cannot act on.
   * The call is recorded, the turn is asked to stop, and the reply is what the
   * client gets.
   */
  acceptMcpCall(message: { name: string; arguments: unknown }, socket: net.Socket): void {
    const handler = this.toolHandler;
    const turn = this.turn;
    if (!handler) {
      if (!turn) {
        this.reply(socket, {
          error: { code: -32603, message: "agy bridge: no active turn for MCP call" },
        });
        return;
      }
      // agy names the tool with the prefix it exposes it under; the client only
      // ever knew the bare name, and that is what its tool-call record must carry.
      turn.toolCalls.push({ name: bareToolName(message.name), arguments: message.arguments });
      turn.handoffRequested = true;
      // A result rather than an error, so agy finishes its turn instead of
      // retrying the call; the cancel below is what actually stops it.
      this.reply(socket, { result: { content: [{ type: "text", text: "" }] } });
      this.conn?.notify("session/cancel", { sessionId: this.sessionId });
      return;
    }
    // agy names the tool with the prefix it exposes it under; the client only
    // ever knew the bare name, and that is what its tool-call record must carry.
    const name = bareToolName(message.name);
    this.turn?.toolCalls.push({ name, arguments: message.arguments });
    let result: unknown;
    try {
      result = handler(message.name, message.arguments);
    } catch (error) {
      this.reply(socket, { error: { code: -32603, message: this.messageOf(error) } });
      return;
    }
    if (result && typeof (result as Promise<unknown>).then === "function") {
      (result as Promise<unknown>).then(
        (value) => this.reply(socket, { result: value ?? {} }),
        (error: unknown) =>
          this.reply(socket, { error: { code: -32603, message: this.messageOf(error) } })
      );
      return;
    }
    this.reply(socket, { result: result ?? {} });
  }

  private messageOf(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }

  private reply(socket: net.Socket, payload: unknown): void {
    try {
      socket.end(`${JSON.stringify(payload)}\n`);
    } catch {
      socket.destroy();
    }
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  start(): Promise<void> {
    if (!this.startPromise) this.startPromise = this.spawnAndHandshake();
    return this.startPromise;
  }

  private async spawnAndHandshake(): Promise<void> {
    const port = await ensureControlServer();
    registerBridgePeer(this);
    const binDir = await ensureShimDir();

    // A workspace of its own per process: the agent definition and agy's log go
    // here, so a proxied request never writes into the operator's project.
    const workspace = await fs.promises.mkdtemp(path.join(os.tmpdir(), "omniroute-agy-bridge-"));
    this.workspace = workspace;
    await writeAgentDefinition(workspace);

    const child = this.spawnChild(port, binDir, workspace);
    this.watchChild(child);
    this.conn = this.openConnection(child);

    await this.raceStartup(
      configured("AGY_BRIDGE_START_TIMEOUT_MS", DEFAULT_PROC_START_TIMEOUT_MS)
    );
  }

  /**
   * The agy process for this instance, already in its own workspace.
   *
   * `workspace` is passed in rather than read from `this.workspace`: that field
   * is `string | null` (it is null until the bridge starts, and the teardown
   * check relies on that), so reading it here would hand `spawn` a `cwd` of
   * `null`, which its overloads reject.
   */
  private spawnChild(port: number, binDir: string, workspace: string): ChildProcess {
    const args = ["acp", "--agent", AGENT_NAME, "--ide-mcp-port", String(port)];
    if (this.options.workDir) args.push("--add-dir", this.options.workDir);
    const spawnSpec = agySpawnSpec(this.options.agyPath, args, process.platform, process.env);
    const env = childEnv(process.env, {
      PATH: `${binDir}${path.delimiter}${process.env.PATH || ""}`,
      AGY_BRIDGE_CONTROL_PORT: String(port),
      AGY_BRIDGE_TOKEN: this.token,
    });

    let child: ChildProcess;
    try {
      child = spawn(spawnSpec.file, spawnSpec.args, {
        cwd: workspace,
        // `childEnv` builds a plain record; Next augments `NodeJS.ProcessEnv`
        // with a required `NODE_ENV`, which a spawn env does not need.
        env: env as NodeJS.ProcessEnv,
        stdio: ["pipe", "pipe", "pipe"],
        windowsHide: true,
        ...spawnSpec.options,
      });
    } catch (error) {
      this.markDead(error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
    this.child = child;
    return child;
  }

  /** Report the child's death and keep its stderr for the message. */
  private watchChild(child: ChildProcess): void {
    child.on("error", (error) => this.markDead(error));
    child.on("close", (code, signal) => {
      if (this.dead) return;
      const tail = this.stderrTail.trim();
      this.markDead(
        new Error(
          `agy exited (code=${code} signal=${signal})${tail ? `: ${tail.slice(-1000)}` : ""}`
        )
      );
    });
    child.stderr?.setEncoding("utf8");
    child.stderr?.on("data", (chunk: string) => {
      this.stderrTail = (this.stderrTail + chunk).slice(-STDERR_TAIL);
    });
    child.stdin?.on("error", () => {
      /* the close handler reports the death */
    });
  }

  /** Frame the child's stdio into ACP messages for this instance. */
  private openConnection(child: ChildProcess): AcpConnection {
    return new AcpConnection(child as unknown as ConstructorParameters<typeof AcpConnection>[0], {
      onNotification: (method, params) => this.onNotification(method, params),
      onRequest: (method, params) => this.onRequest(method, params),
      onProtocolError: (error) => this.markDead(error),
    });
  }

  /** Handshake against the start timeout, unwrapping a death that beat it. */
  private async raceStartup(timeoutMs: number): Promise<void> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<never>((_resolve, reject) => {
      timer = setTimeout(
        () =>
          reject(
            new Error(
              `agy bridge: timed out starting agy acp after ${timeoutMs}ms; stderr tail: ${
                this.stderrTail.trim() || "(empty)"
              }`
            )
          ),
        timeoutMs
      );
      timer.unref?.();
    });
    try {
      await Promise.race([this.handshake(), timeout]);
    } catch (error) {
      const failure = error as Error;
      if (
        this.dead &&
        this.deadError &&
        failure !== this.deadError &&
        !/timed out starting/.test(failure.message)
      ) {
        throw new Error(`agy failed before the ACP session started: ${this.deadError.message}`);
      }
      throw failure;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  /**
   * `initialize`: the version check and the capability flags, nothing else.
   *
   * The session is created later, on the first prompt, for one reason: whether
   * the system prompt may ride on the session depends on the caller's prompt
   * (`_meta.antigravity.systemPrompt.append`), and a pooled process outlives any
   * single caller. Announcing the session up front would mean guessing whose
   * instructions it carries.
   *
   * Both capability flags are read from what agy says, never assumed: whether a
   * system prompt may ride on the session, and whether images can be sent.
   */
  async handshake(): Promise<void> {
    const init = await this.request("initialize", {
      protocolVersion: ACP_PROTOCOL_VERSION,
      clientInfo: CLIENT_INFO,
      // This client renders nothing itself and runs no terminal for agy: the
      // caller's tools are the only actions on offer, and they arrive over MCP.
      clientCapabilities: { fs: { readTextFile: false, writeTextFile: false }, terminal: false },
    });

    const agentInfo = isRecord(init?.agentInfo) ? init.agentInfo : {};
    this.agentVersion = typeof agentInfo.version === "string" ? agentInfo.version : null;
    const tooOld = agyTooOld(this.agentVersion);
    if (tooOld) throw new Error(tooOld);

    const capabilities = isRecord(init?.agentCapabilities) ? init.agentCapabilities : {};
    const promptCapabilities = isRecord(capabilities.promptCapabilities)
      ? capabilities.promptCapabilities
      : isRecord(capabilities.prompt_capabilities)
        ? capabilities.prompt_capabilities
        : {};
    this.supportsImages = promptCapabilities.image === true;

    const meta = isRecord(capabilities._meta) ? capabilities._meta : {};
    const antigravity = isRecord(meta.antigravity) ? meta.antigravity : {};
    const systemPrompt = isRecord(antigravity.systemPrompt) ? antigravity.systemPrompt : {};
    this.systemAppendSupported = systemPrompt.append === true;
    // agy only resumes a session when it says it can; asking one that cannot is
    // a wasted round-trip before every continued conversation.
    const sessionCapabilities = isRecord(capabilities.sessionCapabilities)
      ? capabilities.sessionCapabilities
      : isRecord(capabilities.session_capabilities)
        ? capabilities.session_capabilities
        : {};
    this.resumeSupported = sessionCapabilities.resume === true;
  }

  /**
   * Create the session this process will run, once, with the caller's system
   * prompt when it is allowed to carry one.
   *
   * `instructionsInSession` is decided here rather than in the handshake because
   * it is a property of the prompt: the same pooled process serves a caller that
   * sent a system prompt and one that did not, and only the latter can use the
   * user-turn wrapper.
   */
  private async ensureSession(instructions: string): Promise<void> {
    if (this.sessionId) return;

    this.instructionsInSession =
      this.systemAppendSupported && systemAppend() && instructions.length > 0;
    const meta: JsonRecord = this.instructionsInSession
      ? { _meta: { antigravity: { systemPrompt: { append: outgoing(instructions) } } } }
      : {};

    const session = await this.request(
      "session/new",
      {
        cwd: this.options.workDir,
        // No upstream MCP servers: the bridge is the only one, and it is dialled
        // through --ide-mcp-port rather than named here.
        mcpServers: [],
        ...meta,
      },
      setupTimeoutMs()
    );
    const sessionId =
      isRecord(session) && typeof session.sessionId === "string" ? session.sessionId : null;
    if (!sessionId) throw new Error("agy session/new returned no sessionId");
    this.sessionId = sessionId;
    // The transcript starts over with a new session, so does its size.
    this.sessionTokens = 0;
    const models = isRecord(session?.models) ? session.models : {};
    this.currentModel = typeof models.currentModelId === "string" ? models.currentModelId : null;
    this.configOptions = Array.isArray(session?.configOptions) ? session.configOptions : [];

    if (this.options.model) {
      await this.selectModel(
        this.options.model,
        { effort: this.options.effort ?? undefined },
        true
      );
    }
  }

  /** Apply a model (and its effort) through the session's own config. */
  async selectModel(
    model: string,
    selection?: { model?: string; effort?: string } | null,
    force = false
  ): Promise<void> {
    if (!force && this.currentModel === model) return;
    const target = this.configMethodUnsupported
      ? null
      : configModelSelection(this.configOptions, model, selection);
    if (target && (await this.applyConfig(target, force))) {
      this.currentModel = model;
      return;
    }
    // An older agy has no session/set_config_option; the documented
    // session/set_model is the only route, and it carries no effort.
    await this.request(
      "session/set_model",
      { sessionId: this.sessionId, modelId: model },
      setupTimeoutMs()
    );
    this.currentModel = model;
  }

  /**
   * Set the model and its effort through the session config.
   *
   * False means this agy has no `session/set_config_option` at all, which is the
   * one failure `selectModel` falls back for; every other error propagates.
   */
  private async applyConfig(
    target: { config: JsonRecord; value: string; effort: string },
    force: boolean
  ): Promise<boolean> {
    try {
      if (force || target.config.currentValue !== target.value) {
        await this.setConfig(target.config, target.value);
      }
      await this.applyEffort(target.effort, force);
      return true;
    } catch (error) {
      if ((error as { acpError?: { code?: number } }).acpError?.code !== -32601) throw error;
      this.configMethodUnsupported = true;
      return false;
    }
  }

  /** Move `thought_level` as close to the requested effort as agy offers. */
  private async applyEffort(effort: string, force: boolean): Promise<void> {
    if (!effort) return;
    const thought = configSelect(this.configOptions, "thought_level");
    if (!thought) return;
    const levels = selectValues(thought.options)
      .map((option) => option.value)
      .filter((value) => EFFORT_ORDER.includes(value));
    if (!levels.length) return;
    const level = closestEffort(effort, levels);
    if (force || thought.currentValue !== level) await this.setConfig(thought, level);
  }

  private async setConfig(config: JsonRecord, value: string): Promise<void> {
    const result = await this.request(
      "session/set_config_option",
      { sessionId: this.sessionId, configId: config.id, value },
      setupTimeoutMs()
    );
    if (!Array.isArray(result?.configOptions)) {
      throw new Error("agy returned no configOptions after setting a session option");
    }
    this.configOptions = result.configOptions;
    const updated = configSelect(this.configOptions, String(config.id));
    if (updated && updated.currentValue !== value) {
      throw new Error(`agy did not apply session option ${String(config.id)}`);
    }
  }

  private request(method: string, params: JsonRecord, timeoutMs = 0): Promise<JsonRecord | null> {
    if (!this.conn) return Promise.reject(new Error("agy ACP connection is not open"));
    return this.conn.request(method, params, timeoutMs);
  }

  // ── What agy says while a turn runs ───────────────────────────────────────

  private onNotification(method: string, params: JsonRecord): void {
    if (method !== "session/update" || params.sessionId !== this.sessionId) return;
    const update = isRecord(params.update) ? params.update : {};

    if (update.sessionUpdate === "config_option_update" && Array.isArray(update.configOptions)) {
      this.configOptions = update.configOptions;
      return;
    }

    const turn = this.turn;
    if (!turn || !isChunk(update.sessionUpdate)) return;
    const text = chunkText(update);
    if (!text) return;
    if (update.sessionUpdate === "agent_message_chunk") {
      const outcome = turn.text.push(text);
      if (outcome.text) {
        turn.emitted += outcome.text;
        turn.onText?.(outcome.text);
      }
      return;
    }
    turn.thinking += text;
    turn.onThinking?.(text);
  }

  /**
   * Answer what agy asks the client to do.
   *
   * A client tool reaches agy over the bridge and runs in the caller, under the
   * caller's permissions, so it is allowed once. Everything else — a shell
   * command, a file edit, a question — would run inside agy, which is not what
   * this transport offers, so it is refused.
   */
  private onRequest(method: string, params: JsonRecord): unknown {
    if (typeof params.sessionId === "string" && params.sessionId !== this.sessionId) {
      throw Object.assign(new Error("unknown session"), { code: -32602 });
    }
    if (method !== "session/request_permission") {
      throw Object.assign(new Error(`agy bridge does not serve ${method}`), { code: -32601 });
    }

    const options = Array.isArray(params.options) ? params.options : [];
    const tool = ideToolOf(params.toolCall);
    // The catalog, not the constructor's list: a continued request can declare
    // a tool the process was not started with, and agy lists it from here.
    const declared = tool && this.catalog.current().some((entry) => entry.name === tool);
    if (declared) {
      const allow = options.find((option) => isRecord(option) && option.kind === "allow_once");
      if (allow) return { outcome: { outcome: "selected", optionId: allow.optionId } };
    }

    this.deniedPermissions++;
    const reject =
      options.find((option) => isRecord(option) && option.kind === "reject_once") ||
      options.find((option) => isRecord(option) && option.kind === "reject_always");
    return reject
      ? { outcome: { outcome: "selected", optionId: (reject as JsonRecord).optionId } }
      : { outcome: { outcome: "cancelled" } };
  }

  // ── One turn ──────────────────────────────────────────────────────────────

  /**
   * Run one prompt and resolve with what the caller should see.
   *
   * The turn holds a text filter across chunks because classification is only
   * possible at the end (see `agyAgentText`), and a cancel is honoured by asking
   * agy rather than by dropping the reply: agy keeps the conversation, and a
   * caller that retries continues instead of replaying its history.
   */
  async prompt(input: AgyPromptInput): Promise<AgyTurnResult> {
    if (this.dead) throw this.deadError || new Error("agy process is not running");
    if (this.turn || this.reserved)
      throw new AgyTurnError(
        "agy bridge: this conversation still has an unfinished response",
        409,
        true
      );

    // A caller can abort while the process is still starting, which is the
    // common case on a cold pool: the turn must not run at all then.
    if (input.signal?.aborted) return this.cancelledBeforeStart([]);

    // Reserved before the first await: the guard above only sees `turn`, which
    // exists once setup is done, and two requests must not both get past it.
    this.reserved = true;
    try {
      const instructions = (input.instructions || "").trim();
      this.assertImagesSupported(input);
      const preCompacted = await this.openSession(input, instructions);
      if (input.model) await this.selectModel(input.model);
      if (input.tools && this.catalog.toolsGrew(input.tools)) {
        await this.catalog.updateTools(input.tools);
      }
      // The abort listener is bound with the turn, so an abort that landed
      // during setup has not been heard yet: honour it before agy is sent anything.
      if (input.signal?.aborted) return this.cancelledBeforeStart([]);
      this.toolHandler = input.onToolCall || null;

      return await this.runTurn(input, {
        turn: this.startTurn(input),
        parts: this.turnParts(input, instructions),
        instructions,
        preCompacted,
      });
    } finally {
      this.reserved = false;
    }
  }

  /** Send one turn and settle it, whatever agy answers. */
  private async runTurn(
    input: AgyPromptInput,
    ctx: {
      turn: TurnState;
      parts: PromptPart[];
      instructions: string;
      preCompacted: boolean;
    }
  ): Promise<AgyTurnResult> {
    const abort = this.bindAbort(input, ctx.turn);
    try {
      const result = await this.request(
        "session/prompt",
        {
          sessionId: this.sessionId,
          prompt: ctx.parts.length ? ctx.parts : [{ type: "text", text: "" }],
        },
        configured("AGY_BRIDGE_TURN_TIMEOUT_MS", DEFAULT_TURN_TIMEOUT_MS)
      );
      return this.finishTurn(input, ctx, result);
    } catch (error) {
      // agy reports a cancelled turn as an error often enough that the handoff
      // has to be read before the error is: the call is the reply, and turning
      // it into a failure is exactly the `-32603` this path exists to avoid.
      const settled = this.settleAbortedTurn(ctx.turn, ctx.preCompacted);
      if (settled) return settled;
      throw error;
    } finally {
      input.signal?.removeEventListener("abort", abort);
      this.turn = null;
      this.toolHandler = null;
      this.touch();
    }
  }

  /** Account for a completed turn and turn it into the caller's result. */
  private finishTurn(
    input: AgyPromptInput,
    ctx: { turn: TurnState; parts: PromptPart[]; instructions: string; preCompacted: boolean },
    result: JsonRecord | null
  ): AgyTurnResult {
    const { turn, preCompacted } = ctx;
    const stopReason =
      isRecord(result) && typeof result.stopReason === "string" ? result.stopReason : "end_turn";
    this.hasSentFirstTurn = true;

    const ended = turn.text.end();
    if (ended.text) turn.onText?.(ended.text);
    const text = turn.emitted + ended.text;

    // The turn is upstream's now: record it as seen so the next request of
    // this conversation sends only what agy has not been told, and add what
    // this turn cost to the session's running total.
    if (input.messages?.length) this.noteSent(input.messages);
    this.sessionTokens +=
      promptTokens(ctx.parts) + (text ? estimateTokens(text) : 0) + estimateTokens(turn.thinking);

    // A handoff is a finished turn, not a failed one: agy stopped because the
    // tool is the caller's to run, and whatever it said before the call is the
    // narration that goes with the call.
    if (turn.handoffRequested) return this.turnResult(turn, text, "tool_use", preCompacted);
    if (ended.failed) {
      throw turnFailure(ended.detail || "", ended.core || "", ctx.instructions);
    }
    if (turn.cancelRequested) return this.turnResult(turn, "", "cancelled", preCompacted);
    return this.turnResult(turn, text, stopReason, preCompacted);
  }

  /** The result a turn that died after a handoff or a cancel still owes. */
  private settleAbortedTurn(turn: TurnState, preCompacted: boolean): AgyTurnResult | null {
    if (turn.handoffRequested) {
      return this.turnResult(turn, turn.emitted, "tool_use", preCompacted);
    }
    if (turn.cancelRequested) return this.turnResult(turn, "", "cancelled", preCompacted);
    return null;
  }

  /** The result of a turn that never reached agy, because it was already aborted. */
  private cancelledBeforeStart(toolCalls: AgyToolCall[]): AgyTurnResult {
    return {
      text: "",
      thinking: "",
      stopReason: "cancelled",
      sessionId: this.sessionId,
      model: this.currentModel,
      toolCalls,
    };
  }

  /** Whether this agy can receive an image at all. */
  private assertImagesSupported(input: AgyPromptInput): void {
    if (!promptHasImage(input.parts) || this.supportsImages) return;
    throw new AgyTurnError(
      "agy: image input needs an image-capable agy version; update agy",
      400,
      true
    );
  }

  /**
   * Make sure a session is open for this turn, and say whether it had to be
   * retired first.
   *
   * agy compacts its own transcript somewhere around 300k tokens and keeps
   * whatever it decides; retiring the session a little before that is the only
   * way for this side to choose. Nothing is lost: the caller holds the
   * conversation and the replay is bounded by this module's budget.
   */
  private async openSession(input: AgyPromptInput, instructions: string): Promise<boolean> {
    let preCompacted = false;
    if (this.sessionId && this.sessionTokens >= maxSessionTokens()) {
      this.retireSession();
      preCompacted = true;
    }
    if (!preCompacted && input.sessionId && input.sessionId !== this.sessionId) {
      await this.resume(input.sessionId, instructions);
      if (!this.sessionId) {
        await this.ensureSession(instructions);
      } else {
        // A resumed session was filled by someone else, so its size is only
        // knowable from the conversation the caller sent along with it.
        this.sessionTokens = transcriptTokens(input.messages ?? []);
      }
    } else {
      await this.ensureSession(instructions);
    }
    return preCompacted;
  }

  /** The bookkeeping one running turn needs, made current. */
  private startTurn(input: AgyPromptInput): TurnState {
    const turn: TurnState = {
      text: new AgentTextFilter(),
      thinking: "",
      /** Everything already handed to `onText`, which the result must repeat. */
      emitted: "",
      onText: input.onText,
      onThinking: input.onThinking,
      cancelRequested: false,
      toolCalls: [] as AgyToolCall[],
      handoffRequested: false,
    };
    this.turn = turn;
    this.touch();
    return turn;
  }

  /**
   * What to send agy this turn.
   *
   * The client's system prompt rides the first user turn unless the session was
   * asked to carry it, which is what keeps Antigravity from turning the request
   * away.
   */
  private turnParts(input: AgyPromptInput, instructions: string): PromptPart[] {
    const parts = userTurnParts(this.renderParts(input));
    if (this.instructionsInSession || !instructions || this.hasSentFirstTurn) return parts;
    return firstTurnParts(parts, instructions);
  }

  /** Ask agy to cancel when the caller aborts; returns the unbind callback. */
  private bindAbort(input: AgyPromptInput, turn: TurnState): () => void {
    const abort = (): void => {
      if (turn.cancelRequested) return;
      turn.cancelRequested = true;
      this.conn?.notify("session/cancel", { sessionId: this.sessionId });
    };
    input.signal?.addEventListener("abort", abort, { once: true });
    return abort;
  }

  /** What the caller sees for a turn that ended, whatever the reason was. */
  private turnResult(
    turn: TurnState,
    text: string,
    stopReason: string,
    preCompacted: boolean
  ): AgyTurnResult {
    return {
      text,
      thinking: turn.thinking,
      stopReason,
      sessionId: this.sessionId,
      model: this.currentModel,
      toolCalls: turn.toolCalls,
      estimatedSessionTokens: this.sessionTokens,
      preCompacted,
    };
  }

  /**
   * Whether an incoming conversation continues what this session was sent.
   *
   * A client that resends its full history on every call sends this session's
   * own turns back as a prefix; a client that edited or rewound its history
   * does not. Only the second case is a divergence, and it has to be detected
   * here because it is the process — not the caller — that knows what it holds.
   *
   * A session that has been sent nothing continues anything: it is about to be
   * opened with whatever the first request carries.
   */
  holdsHistory(messages: AgyMessage[]): boolean {
    if (!this.hasSentFirstTurn) return true;
    return hasPrefix(messages, this.sentMessages);
  }

  /**
   * What to send agy for this turn: the whole conversation with its history for
   * a session that has not been sent anything, or just the live turn for one
   * that has.
   *
   * `sentMessages` is this process's own record of what it handed agy. It exists
   * because a proxied request resends the whole conversation on every call while
   * the session already holds its part of it: replaying that part would show the
   * model its own transcript twice, and a model answers what it reads.
   */
  private renderParts(input: AgyPromptInput): PromptPart[] {
    if (!input.messages?.length) return input.parts;
    const parts = this.hasSentFirstTurn
      ? renderContinuedTurnParts({ messages: input.messages })
      : renderInitialPromptParts({ messages: input.messages });
    return parts.length ? parts : input.parts;
  }

  /**
   * Record the turns agy now holds.
   *
   * The whole conversation is recorded, including the turn just answered: that
   * is what the session was told, and it is the boundary the next render
   * compares against. Recording only the part before the live turn would let an
   * edit inside that turn pass as a continuation.
   */
  private noteSent(messages: AgyMessage[]): void {
    this.sentMessages = messages.map((message) => ({ ...message }));
  }

  /**
   * Drop the current session so the next prompt opens a fresh one.
   *
   * Not a dispose: the process, its handshake and the operator's sign-in are all
   * still good, and reopening a session is one round-trip. The transcript is what
   * has to go — agy would otherwise decide by itself what to keep.
   */
  private retireSession(): void {
    this.sessionId = null;
    this.hasSentFirstTurn = false;
    this.sessionTokens = 0;
    this.sentMessages = [];
    this.instructionsInSession = false;
  }

  /**
   * Continue an existing agy session, falling back to a fresh one.
   *
   * A conversation agy no longer has is not a failure: this transport is reached
   * through a proxy, and the client keeps its own history. Starting a new
   * session serves that request; refusing it would turn a lost conversation
   * into an outage.
   */
  async resume(sessionId: string, instructions = ""): Promise<void> {
    if (sessionId === this.sessionId) return;
    if (!this.resumeSupported) {
      await this.ensureSession(instructions);
      return;
    }
    try {
      const session = await this.request(
        "session/resume",
        { sessionId, cwd: this.options.workDir, mcpServers: [] },
        setupTimeoutMs()
      );
      if (!isRecord(session)) throw new Error("empty session/resume result");
      this.sessionId = sessionId;
      this.hasSentFirstTurn = true;
      const models = isRecord(session.models) ? session.models : {};
      this.currentModel =
        typeof models.currentModelId === "string" ? models.currentModelId : this.currentModel;
      if (Array.isArray(session.configOptions)) this.configOptions = session.configOptions;
    } catch {
      // agy does not have it any more; a new session is the only answer that
      // still serves the caller.
      this.sessionId = null;
      await this.ensureSession(instructions);
    }
  }

  // ── Death and disposal ────────────────────────────────────────────────────

  private markDead(error: Error): void {
    if (this.dead) return;
    this.dead = true;
    this.deadError = error;
    this.conn?.close(error);
  }

  /** Restart the idle timer; the pool drops a process nobody is using. */
  private touch(): void {
    if (this.idleTimer) clearTimeout(this.idleTimer);
    const idleMs = configured("AGY_BRIDGE_IDLE_MS", DEFAULT_IDLE_MS);
    this.idleTimer = setTimeout(() => this.dispose("agy bridge: idle"), idleMs);
    this.idleTimer.unref?.();
  }

  dispose(reason: string): void {
    if (this.disposed) return;
    this.disposed = true;
    if (this.idleTimer) clearTimeout(this.idleTimer);
    unregisterBridgePeer(this.token);
    this.catalog.dispose();
    this.markDead(new Error(reason));
    if (this.child?.pid) {
      const kill = windowsTreeKill([this.child.pid]);
      if (kill) {
        try {
          const killer = spawn(kill.file, kill.args, { stdio: "ignore", windowsHide: true });
          // A spawn failure (no taskkill) arrives as an event, not a throw; an
          // unheard "error" event would take the whole server down.
          killer.on("error", () => {
            /* the process is going either way */
          });
          killer.unref();
        } catch {
          /* the process is going either way */
        }
      } else {
        try {
          this.child.kill();
        } catch {
          /* already gone */
        }
      }
    }
    if (this.workspace) {
      try {
        fs.rmSync(this.workspace, { recursive: true, force: true });
      } catch {
        /* a temp directory left behind is not worth failing over */
      }
    }
    this.onDispose(this.key, this);
  }
}

// `ideToolOf` is re-exported here because both halves reason about the same
// names, and a caller of this module should not have to reach into the bridge.
export { ideToolOf };

// ── The pool ────────────────────────────────────────────────────────────────

const processes = new Map<string, AgyAcpProcess>();

/**
 * The pool key: one process per connection and conversation.
 *
 * The conversation is part of it because agy keeps the session inside the
 * process: two conversations sharing a process would each see the other's
 * history in its replies. The binary path is part of it too, so an operator who
 * points at a different agy gets a process of its own.
 */
export function processKey(parts: {
  connectionId: string;
  conversationId: string;
  agyPath: string;
  model?: string | null;
}): string {
  return crypto
    .createHash("sha256")
    .update([parts.connectionId, parts.conversationId, parts.agyPath, parts.model || ""].join("\0"))
    .digest("hex");
}

export function agyProcessCount(): number {
  return processes.size;
}

/** Every live process's key; a test and an ops probe. */
export function agyProcessKeys(): string[] {
  return [...processes.keys()];
}

export type AgyPromptRequest = AgyPromptInput & {
  connectionId: string;
  conversationId: string;
  workDir: string;
  agyPath?: string | null;
  effort?: string | null;
};

/**
 * Run one prompt through the pooled process for this connection/conversation.
 *
 * A dead or overflowing pool entry is replaced rather than reused: agy keeps its
 * state in the process, so a process that lost its connection cannot be repaired.
 */
export async function runAgyPrompt(request: AgyPromptRequest): Promise<AgyTurnResult> {
  const agyPath = requiredAgyPath(request);
  const key = processKey({
    connectionId: request.connectionId,
    conversationId: request.conversationId,
    agyPath,
    model: request.model,
  });

  let instance = reuseInstance(key, request);
  if (!instance) {
    instance = createInstance(key, request, agyPath);
    evictUnderPressure(key);
  }

  try {
    await instance.start();
  } catch (error) {
    instance.dispose("agy bridge: start failed");
    processes.delete(key);
    throw error;
  }

  return instance.prompt(request);
}

/** The agy to drive, or the actionable error a caller gets when there is none. */
function requiredAgyPath(request: AgyPromptRequest): string {
  const agyPath = request.agyPath || resolveAgyBinary();
  if (agyPath) return agyPath;
  throw new AgyTurnError(
    "agy: the `agy` CLI was not found. Install it and sign in, or turn AGY_CLI_TRANSPORT off.",
    500,
    true
  );
}

/**
 * The pooled process this request may continue, if any.
 *
 * A conversation that does not continue what this session holds is a different
 * conversation wearing the same id — an edited or rewound history. Replaying it
 * into the live session would leave the model holding two versions of the same
 * turn, so that process is retired and a fresh session opened under it, which is
 * also what upstream does.
 */
function reuseInstance(key: string, request: AgyPromptRequest): AgyAcpProcess | undefined {
  const instance = processes.get(key);
  if (!instance) return undefined;
  if (instance.isDisposed || instance.isDead) return undefined;
  if (request.messages?.length && !instance.holdsHistory(request.messages)) {
    instance.dispose("agy bridge: conversation diverged");
    processes.delete(key);
    return undefined;
  }
  return instance;
}

/** Pool a fresh process for `key`, replacing a dead entry in place. */
function createInstance(key: string, request: AgyPromptRequest, agyPath: string): AgyAcpProcess {
  processes.get(key)?.dispose("agy bridge: replaced");
  const instance = new AgyAcpProcess(
    key,
    {
      agyPath,
      workDir: request.workDir,
      tools: request.tools || [],
      model: request.model,
      effort: request.effort,
    },
    (disposedKey, disposed) => {
      if (processes.get(disposedKey) === disposed) processes.delete(disposedKey);
    }
  );
  processes.set(key, instance);
  return instance;
}

/** Bound the pool: the oldest idle process goes rather than growing without limit. */
function evictUnderPressure(key: string): void {
  if (processes.size <= configured("AGY_BRIDGE_MAX_PROCS", DEFAULT_MAX_PROCS)) return;
  const oldest = [...processes.entries()].find(([candidate]) => candidate !== key);
  if (!oldest) return;
  oldest[1].dispose("agy bridge: pool pressure");
  processes.delete(oldest[0]);
}

/** Stop every pooled process; a test and shutdown helper. */
export async function shutdownAgyPool(): Promise<void> {
  for (const [key, instance] of [...processes]) {
    try {
      instance.dispose("agy bridge: shutting down");
    } catch {
      /* one process failing to stop must not block the rest */
    }
    processes.delete(key);
  }
  resetShimDir();
  // The loopback control server outlives individual processes, so a shutdown
  // has to close it too: the shim dials it, and nothing else will.
  await closeControlServer();
}

/** The deadline agy gives an MCP call before it fails it itself. */
export function ideCallDeadlineMs(): number {
  return configured("AGY_BRIDGE_IDE_CALL_DEADLINE_MS", DEFAULT_IDE_CALL_DEADLINE_MS);
}
