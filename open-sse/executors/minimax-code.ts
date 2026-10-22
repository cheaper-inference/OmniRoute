import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { execFile } from "node:child_process";
import { homedir } from "node:os";
import { join } from "node:path";
import {
  BaseExecutor,
  type ExecuteInput,
  type ExecutorExecuteResult,
  type ProviderCredentials,
} from "./base.ts";
import { buildErrorBody, errorResponse, sanitizeErrorMessage } from "../utils/error.ts";
import { MINIMAX_CODE_MODELS } from "../config/providers/registry/minimax-code/index.ts";
import {
  applyGatewayEvent,
  buildGatewayPayload,
  estimateGatewayInputTokens,
  isGatewayPayloadOversized,
  callGateway,
  ensureAccessToken,
  gatewayErrorInBody,
  gatewayErrorStatus,
  gatewayResultToCompletion,
  GatewayAuthError,
  GatewayStatusError,
  parseGatewayResult,
  parseGatewaySse,
  readAuthProfile,
  refreshAuthProfile,
  resolveAuthFile,
  resolveGatewayInputLimit,
  type GatewayStreamState,
} from "./minimaxCodeGateway.ts";
import { runMinimaxCodeAcpTurn } from "./minimaxCodeAcp.ts";

/**
 * MiniMax Code provider.
 *
 * Requests are executed by the locally installed MiniMax Code CLI
 * (`mcode exec`), which runs the same agent runtime the desktop app uses and
 * keeps the credential in the local MiniMax profile (`~/.minimax`). OmniRoute
 * stores no credential of its own: the provider reads that local profile to
 * authenticate a run and writes a rotated credential back to it.
 *
 * The CLI reports its run as JSONL (`--output-format stream-json`):
 *   exec.started / session.started / turn.started
 *   item.started | item.updated   -> assistant text deltas
 *   item.completed                -> final assistant message
 *   turn.completed                -> usage
 *   exec.completed                -> final result (status + output)
 */

const MINIMAX_CODE_URL = "minimax-code://gateway";
/**
 * The status a gateway failure has to be answered with.
 *
 * The status of the upstream answer decides what the runtime does with the
 * failure. A 4xx belongs to the request and keeps its own status; a failure
 * of the transport itself — the gateway could not be reached — is a 502, and
 * everything else is ours and stays a 500. A 502 is in the model-lockout
 * list, and it only belongs there for an outage of the gateway.
 */
function gatewayFailureStatus(error: unknown): number {
  if (error instanceof GatewayStatusError) return error.status;
  if (error instanceof GatewayAuthError) return error.status;
  // The gateway could not be reached: that is an outage of the upstream, and
  // a 502 keeps the model out of the combos while it lasts.
  if (isTransportFailure(error)) return 502;
  // Anything else is ours — a bug in the payload builder or in the parser.
  // It says nothing about the health of the model, and a 502 would lock the
  // model out of every combo of the instance for half an hour.
  return 500;
}

/** A failure of the HTTP transport itself, not of our code. */
function isTransportFailure(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /fetch failed|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|EAI_AGAIN|socket hang up|network|terminated/i.test(
    message
  );
}

/**
 * The status a refusal of the local CLI transport has to be answered with.
 *
 * The CLI refuses a request for a reason that belongs to the request ("too
 * large", "no such model") and for a reason that belongs to this host (the
 * binary is missing, the agent died). None of them says anything about the
 * health of the model, and a 502 is in the model-lockout list: one refusal
 * would take the model out of every combo for half an hour.
 */
function cliFailureStatus(message: string): number {
  if (isCliAuthFailure(message)) return 401;
  if (/too large|too long|context length|exceeds the maximum|maximum context/i.test(message)) {
    return 413;
  }
  if (/model .*(not found|not supported|unknown)|unknown model|invalid model/i.test(message)) {
    return 400;
  }
  return 500;
}

/**
 * The error classification of a gateway failure.
 *
 * A request-scoped refusal is marked as one, so the fallback layer keeps it
 * out of the model lockout: another account of the same model would fail the
 * same way. Only the statuses that are a property of the request are marked
 * — a 403 or a 429 stay what they are.
 */
function gatewayFailureClassification(
  error: unknown
): { type: string; code?: string } | undefined {
  const status = gatewayFailureStatus(error);
  if (status !== 400 && status !== 413 && status !== 422) return undefined;
  return { type: "invalid_request_error" };
}

/**
 * The local CLI refuses the run when it is not signed in.
 *
 * That refusal says nothing about the health of the model, and it must not be
 * answered with a 502: a 502 is in the model-lockout list, so a missing
 * credential takes the model out of every combo for half an hour — for every
 * session on the instance, not only for the one that needed the credential.
 * The answer is 401: the credential is missing or expired, and the operator
 * has to sign in again.
 */
function isCliAuthFailure(message: string): boolean {
  return /authentication required/i.test(message) || /mcode login/i.test(message);
}
/**
 * Budget of one managed-gateway call.
 *
 * The whole call (the refresh, the attempt, the backoff and the retry) has to
 * stay under the per-target timeout of the routing machinery (120 s): a
 * target that runs longer is cut off with a synthetic 504, and a 504 is in
 * the model-lockout list, so a slow gateway would take the model out of
 * every fallback combo of the instance. The budget therefore has to be
 * shorter than that timeout, and it covers every attempt of the call.
 */
const DEFAULT_GATEWAY_TIMEOUT_MS = 100_000;
const MINIMAX_CODE_PROVIDER_ID = "minimax";
const DEFAULT_MODEL = MINIMAX_CODE_MODELS[0]?.id || "MiniMax-M3.1-Flash";
const MINIMAX_CODE_MODEL_ALLOWLIST = new Set(MINIMAX_CODE_MODELS.map((model) => model.id));
/**
 * Budget of one local CLI run.
 *
 * The budget has to stay under the per-target timeout of the routing
 * machinery (120 s): a run that is cut off by that timer is answered with a
 * synthetic 504, and a 504 is in the model-lockout list — the model would be
 * taken out of every combo of the instance for minutes because one turn was
 * slow. The provider answers first instead, with a status that says nothing
 * about the health of the model.
 */
const DEFAULT_TURN_TIMEOUT_MS = 100_000;
const DEFAULT_MAX_STEPS = 1;
const DEFAULT_CONTEXT_MODE = "lightweight";
const DEFAULT_PERMISSION_POLICY = "smart";

type JsonRecord = Record<string, unknown>;
type OpenAIMsg = { role?: string; content?: unknown };

export interface MinimaxCodeUsage {
  inputTokens?: number;
  outputTokens?: number;
  cacheReadTokens?: number;
  totalTokens?: number;
}

export interface MinimaxCodeExecEvent {
  type?: string;
  item?: { type?: string; contentDelta?: string; content?: string };
  result?: {
    status?: string;
    output?: string;
    usage?: MinimaxCodeUsage;
    error?: string;
    message?: string;
  };
  usage?: MinimaxCodeUsage;
  model?: { providerId?: string; modelId?: string };
}

export interface MinimaxCodeExecState {
  text: string;
  usage: MinimaxCodeUsage | null;
  status: string | null;
  error: string | null;
}

export interface MinimaxCodeRunOptions {
  command: string;
  args: string[];
  /** CLI context mode used for this run ("lightweight" or "standard"). */
  mode: string;
  /** Step budget handed to the CLI for this run. */
  maxSteps: number;
  cwd: string;
  prompt: string;
  timeoutMs: number;
  signal?: AbortSignal | null;
  env?: NodeJS.ProcessEnv;
  onDelta?: (delta: string) => void;
}

export interface MinimaxCodeRunResult {
  text: string;
  usage: MinimaxCodeUsage | null;
  state: MinimaxCodeExecState;
}

export interface MinimaxCodeExecutorOptions {
  /** Profile directory of the shared agent (default: the code profile). */
  agentDataDir?: string;
  /** Path to the `mcode` binary (default: `mcode` from PATH). */
  command?: string;
  /** Replaces the computed `mcode exec` arguments — used by tests. */
  args?: string[];
  /** Workspace directory handed to the agent. */
  cwd?: string;
  /** Maximum assistant steps for one run (default: 1 — a single answer). */
  maxSteps?: number;
  /** Tool permission policy handed to the CLI (default: `smart`). */
  permission?: string;
  /** CLI context mode: `lightweight` (conversation) or `standard` (full agent). */
  mode?: string;
  /**
   * Transport used for a run.
   *   "gateway"— the managed gateway (the default). It has no fallback: a
   *              failing gateway answers with the status of the failure and
   *              names the transport. A missing credential answers with a 401
   *              — it is not an outage of the model.
   *   "auto"   — client tools go through the managed gateway (native function
   *              calling, the client executes the tools), plain chat stays on
   *              the local CLI in the fast lightweight profile.
   *   "cli"    — always the local CLI.
   */
  transport?: "auto" | "gateway" | "cli";
  /** Timeout of a single managed-gateway call in milliseconds. */
  gatewayTimeoutMs?: number;
  /** Path of the MiniMax Code auth profile (default: the local profile). */
  authFile?: string;
  /** Injection point for the HTTP client of the managed gateway (tests). */
  fetchImpl?: typeof fetch;
  /** Run timeout in milliseconds. */
  timeoutMs?: number;
  /** Extra CLI arguments appended to the run. */
  extraArgs?: string[];
  /**
   * Allow a CLI run to use the host tools (shell, file, memory, web).
   *
   * Off by default: the host tools let a request reach the machine the
   * provider runs on.
   */
  allowHostTools?: boolean;
  /** Injection point for the process runner (tests). */
  runner?: (options: MinimaxCodeRunOptions) => Promise<MinimaxCodeRunResult>;
  env?: NodeJS.ProcessEnv;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function textFromContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      if (typeof part === "string") return part;
      const record = asRecord(part);
      if (record.type === "text" || record.type === "input_text" || record.type === "output_text") {
        return typeof record.text === "string" ? record.text : "";
      }
      return "";
    })
    .join("");
}

/** Convert an OpenAI conversation into one explicit MiniMax Code prompt. */
export function buildMinimaxCodePrompt(messages: OpenAIMsg[]): string {
  const parts: string[] = [];
  for (const message of messages) {
    const text = textFromContent(message.content).trim();
    if (!text) continue;
    const role = String(message.role || "user");
    const label = role === "system" ? "System" : role === "assistant" ? "Assistant" : "User";
    parts.push(`[${label}]\n${text}`);
  }
  return parts.join("\n\n") || "(empty)";
}

export function resolveMinimaxCodeModel(
  model: unknown
): { ok: true; model: string } | { ok: false; error: string } {
  const requested = typeof model === "string" ? model.trim() : "";
  if (!requested) return { ok: true, model: DEFAULT_MODEL };
  if (requested.startsWith("-")) {
    return {
      ok: false,
      error: `Invalid MiniMax Code model "${requested}": model must not start with "-".`,
    };
  }
  // The catalog namespaces provider models by alias, so both the provider id
  // and its alias must resolve to the runtime model id.
  const namespace = ["minimax-code/", "mmcode/"].find((prefix) => requested.startsWith(prefix));
  const normalized = namespace ? requested.slice(namespace.length) : requested;
  if (!MINIMAX_CODE_MODEL_ALLOWLIST.has(normalized)) {
    return {
      ok: false,
      error: `Unknown MiniMax Code model "${requested}". Supported models: ${[...MINIMAX_CODE_MODEL_ALLOWLIST].join(", ")}.`,
    };
  }
  return { ok: true, model: normalized };
}

/**
 * Build the `mcode exec` command line for one run.
 *
 * `mode` maps to the CLI context mode: "lightweight" runs the conversation
 * prompt (answer directly, no coding-agent scaffolding) and is roughly twice
 * as fast as "standard" — that is the right shape for a chat-completion
 * proxy. "standard" keeps the full agent context.
 */
export function buildMinimaxCodeExecArgs(options: {
  model: string;
  cwd: string;
  maxSteps?: number;
  permission?: string;
  timeoutMs?: number;
  mode?: string;
  extraArgs?: string[];
}): string[] {
  const args = [
    "exec",
    "--model",
    `${MINIMAX_CODE_PROVIDER_ID}/${options.model}`,
    "--permission",
    options.permission || DEFAULT_PERMISSION_POLICY,
    "--mode",
    options.mode || DEFAULT_CONTEXT_MODE,
    "--output-format",
    "stream-json",
    "--input",
    "-",
    "--input-format",
    "text",
    "--cwd",
    options.cwd,
  ];
  const maxSteps = options.maxSteps ?? DEFAULT_MAX_STEPS;
  if (Number.isFinite(maxSteps) && maxSteps > 0) args.push("--max-steps", String(maxSteps));
  const timeoutMs = options.timeoutMs ?? DEFAULT_TURN_TIMEOUT_MS;
  if (Number.isFinite(timeoutMs) && timeoutMs > 0)
    args.push("--timeout", `${Math.ceil(timeoutMs / 1000)}s`);
  if (options.extraArgs?.length) args.push(...options.extraArgs);
  return args;
}

/**
 * Pick the transport for one request.
 *
 * A request that carries client `tools` comes from an agentic client
 * (OpenCode, Codex, ...). Those tools live on the client machine and the
 * model has to call them, so the run goes to the managed gateway: it speaks
 * the native tool protocol and returns the calls to the client.
 *
 * A plain chat request has nothing to execute, so it stays on the local CLI
 * in the lightweight profile — no tools, small prompt, half the latency.
 */
export function resolveMinimaxCodeTransport(
  configured: "auto" | "gateway" | "cli",
  hasTools: boolean
): "gateway" | "cli" {
  if (configured !== "auto") return configured;
  return hasTools ? "gateway" : "cli";
}

export function createExecState(): MinimaxCodeExecState {
  return { text: "", usage: null, status: null, error: null };
}

/**
 * Fold one `mcode exec` event into the run state.
 * Returns the assistant text delta carried by the event ("" when there is none).
 */
export function applyExecEvent(state: MinimaxCodeExecState, event: MinimaxCodeExecEvent): string {
  const type = typeof event.type === "string" ? event.type : "";
  if ((type === "item.started" || type === "item.updated") && event.item) {
    if (
      event.item.type === "agent_message" &&
      typeof event.item.contentDelta === "string" &&
      event.item.contentDelta
    ) {
      state.text += event.item.contentDelta;
      return event.item.contentDelta;
    }
    return "";
  }
  if (
    type === "item.completed" &&
    event.item?.type === "agent_message" &&
    typeof event.item.content === "string"
  ) {
    // The completed item carries the full assistant message.
    state.text = event.item.content;
    return "";
  }
  if (type === "turn.completed" && event.usage) {
    state.usage = event.usage;
    return "";
  }
  if (type === "exec.completed" || type === "exec.failed") {
    const result = event.result ?? {};
    if (typeof result.status === "string") state.status = result.status;
    if (typeof result.output === "string") state.text = result.output;
    if (result.usage) state.usage = result.usage;
    const message = result.error ?? result.message;
    if (type === "exec.failed" || (state.status && state.status !== "succeeded")) {
      state.error =
        typeof message === "string" && message.trim()
          ? message.trim()
          : `MiniMax Code run failed (${state.status ?? "unknown"})`;
    }
  }
  return "";
}

/** Parse JSONL output of `mcode exec --output-format stream-json`. */
export function parseExecJsonl(chunk: string): MinimaxCodeExecEvent[] {
  const events: MinimaxCodeExecEvent[] = [];
  for (const line of chunk.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && typeof parsed === "object") events.push(parsed as MinimaxCodeExecEvent);
    } catch {
      // Ignore partial or non-JSON lines.
    }
  }
  return events;
}

/** Run one MiniMax Code prompt through the local CLI. */
export async function runMinimaxCodeExec(
  options: MinimaxCodeRunOptions
): Promise<MinimaxCodeRunResult> {
  const state = createExecState();
  let stderr = "";
  let buffer = "";
  let timedOut = false;

  if (options.cwd) {
    // The default workspace does not exist on a fresh host, and a spawn with a
    // missing working directory fails with ENOENT — indistinguishable from a
    // CLI that is not installed.
    await mkdir(options.cwd, { recursive: true }).catch(() => undefined);
  }

  const child = spawn(options.command, options.args, {
    cwd: options.cwd,
    env: { ...process.env, ...(options.env ?? {}) },
    stdio: ["pipe", "pipe", "pipe"],
  });

  const timer = setTimeout(() => {
    timedOut = true;
    child.kill("SIGKILL");
  }, options.timeoutMs);
  timer.unref?.();

  const onAbort = () => child.kill("SIGKILL");
  options.signal?.addEventListener("abort", onAbort, { once: true });

  child.stdin.on("error", () => undefined);
  child.stderr.on("data", (chunk: Buffer) => {
    stderr += chunk.toString("utf8");
    if (stderr.length > 4000) stderr = stderr.slice(-4000);
  });
  child.stdout.on("data", (chunk: Buffer) => {
    buffer += chunk.toString("utf8");
    let index = buffer.indexOf("\n");
    while (index >= 0) {
      const line = buffer.slice(0, index);
      buffer = buffer.slice(index + 1);
      for (const event of parseExecJsonl(line)) {
        const delta = applyExecEvent(state, event);
        if (delta) options.onDelta?.(delta);
      }
      index = buffer.indexOf("\n");
    }
  });

  const completion = new Promise<number>((resolve, reject) => {
    child.on("error", (error) => reject(error));
    child.on("close", (code) => resolve(code ?? 0));
  });

  child.stdin.end(options.prompt, "utf8");

  let code = 0;
  try {
    code = await completion;
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", onAbort);
  }

  if (buffer.trim()) {
    for (const event of parseExecJsonl(buffer)) {
      const delta = applyExecEvent(state, event);
      if (delta) options.onDelta?.(delta);
    }
  }

  if (timedOut) throw new Error(`MiniMax Code run timed out after ${options.timeoutMs} ms`);
  if (state.error) throw new Error(state.error);
  if (code !== 0) {
    const tail = stderr.trim().split("\n").slice(-3).join(" ").slice(0, 300);
    throw new Error(`MiniMax Code run failed (exit ${code})${tail ? `: ${tail}` : ""}`);
  }
  if (!state.text.trim()) throw new Error("MiniMax Code run produced no assistant response");
  return { text: state.text, usage: state.usage, state };
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

function completionResponse(
  model: string,
  prompt: string,
  content: string,
  usage: MinimaxCodeUsage | null
): Response {
  const promptTokens = usage?.inputTokens ?? estimateTokens(prompt);
  const completionTokens = usage?.outputTokens ?? estimateTokens(content);
  const totalTokens = usage?.totalTokens ?? promptTokens + completionTokens;
  return new Response(
    JSON.stringify({
      id: `chatcmpl-minimax-code-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: totalTokens,
        estimated: usage === null,
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

function sseChunk(
  model: string,
  delta: JsonRecord,
  finishReason: string | null = null,
  extra: { id?: string; usage?: JsonRecord } = {}
): string {
  const chunk: JsonRecord = {
    id: extra.id || `chatcmpl-minimax-code-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  };
  if (extra.usage) chunk.usage = extra.usage;
  return `data: ${JSON.stringify(chunk)}\n\n`;
}

/**
 * The version of the local CLI, probed once per process.
 *
 * A broken or missing install is the most common reason for a CLI run to
 * fail, and the version in the run log is what tells the two apart.
 */
let cliVersionCache: string | null | undefined;

async function probeCliVersion(command: string): Promise<string | null> {
  if (cliVersionCache !== undefined) return cliVersionCache;
  cliVersionCache = null;
  try {
    const { stdout } = await execFile(command, ["--version"], {
      timeout: 5_000,
      encoding: "utf8",
    });
    const line = String(stdout)
      .split("\n")
      .map((entry) => entry.trim())
      .find((entry) => entry.length > 0);
    cliVersionCache = line ? line.slice(0, 120) : null;
  } catch {
    cliVersionCache = null;
  }
  return cliVersionCache;
}

export class MinimaxCodeExecutor extends BaseExecutor {
  private readonly options: MinimaxCodeExecutorOptions;
  private unknownTransport: string | null = null;

  constructor(options: MinimaxCodeExecutorOptions = {}) {
    super("minimax-code", { id: "minimax-code", baseUrl: MINIMAX_CODE_URL, format: "openai" });
    this.options = options;
  }

  buildUrl(): string {
    return MINIMAX_CODE_URL;
  }

  transformRequest(): null {
    return null;
  }

  /**
   * Where a CLI run works.
   *
   * Not the server's working directory: an agent that runs in the OmniRoute
   * checkout can read and write the server's own files. The default is a
   * dedicated, empty workspace.
   */
  private resolveCwd(): string {
    return (
      this.options.cwd ||
      process.env.MINIMAX_CODE_CWD ||
      join(homedir(), ".omniroute", "minimax-code-workspace")
    );
  }

  /**
   * The CLI binary.
   *
   * `MINIMAX_CODE_BIN` may pin an absolute path. Without it the name is
   * resolved against PATH once, and the absolute path is written to the run
   * log: a bare name can point at a different binary under a different PATH.
   */
  private resolveCommand(): string {
    return this.options.command || process.env.MINIMAX_CODE_BIN || "mcode";
  }

  /** The CLI binary as an absolute path, when it can be resolved. */
  private resolveCommandPath(): string {
    const command = this.resolveCommand();
    if (command.includes("/")) return command;
    for (const dir of (process.env.PATH || "").split(":")) {
      if (!dir) continue;
      const candidate = join(dir, command);
      try {
        if (existsSync(candidate)) return candidate;
      } catch {
        // An unreadable PATH entry is not a reason to fail the run.
      }
    }
    return command;
  }

  private resolveTimeoutMs(): number {
    const configured =
      this.options.timeoutMs ??
      Number(process.env.MINIMAX_CODE_TURN_TIMEOUT_MS || DEFAULT_TURN_TIMEOUT_MS);
    // A timeout of zero or a negative number would abort every run at once
    // and answer 500, which no combo can fail over from.
    if (!Number.isFinite(configured) || configured <= 0) return DEFAULT_TURN_TIMEOUT_MS;
    return Math.floor(configured);
  }

  /**
   * The step budget of a CLI run.
   *
   * A request that carries client tools never reaches the CLI — the local
   * transport cannot hand a tool call back to the client — so the budget is
   * the one of a plain chat run.
   */
  private resolveMaxSteps(): number {
    const raw =
      this.options.maxSteps ?? Number(process.env.MINIMAX_CODE_MAX_STEPS || DEFAULT_MAX_STEPS);
    return Number.isFinite(raw) && raw > 0 ? raw : DEFAULT_MAX_STEPS;
  }

  private resolvePermission(): string {
    return (
      this.options.permission || process.env.MINIMAX_CODE_PERMISSION || DEFAULT_PERMISSION_POLICY
    );
  }

  private resolveMode(): string {
    const raw = this.options.mode || process.env.MINIMAX_CODE_MODE || DEFAULT_CONTEXT_MODE;
    // Normalised: the host-tools gate compares against "standard", so a
    // differently cased value must not slip past it.
    return String(raw).trim().toLowerCase() || DEFAULT_CONTEXT_MODE;
  }

  private resolveGatewayTimeoutMs(): number {
    const configured =
      this.options.gatewayTimeoutMs ??
      Number(process.env.MINIMAX_CODE_GATEWAY_TIMEOUT_MS || DEFAULT_GATEWAY_TIMEOUT_MS);
    // A timeout of zero or a negative number would abort every call at once
    // and answer 502, which locks the model out of the fallbacks.
    if (!Number.isFinite(configured) || configured <= 0) return DEFAULT_GATEWAY_TIMEOUT_MS;
    return Math.floor(configured);
  }

  /**
   * The configured transport, normalized.
   *
   * The default is the managed gateway: it is the transport that speaks the
   * native tool protocol, and it needs no CLI installed on the server. The
   * local CLI stays an explicit transport.
   */
  private configuredTransport(): "auto" | "gateway" | "cli" {
    const raw = this.options.transport || process.env.MINIMAX_CODE_TRANSPORT || "gateway";
    const normalized = raw.trim().toLowerCase();
    if (normalized === "auto" || normalized === "gateway" || normalized === "cli") {
      return normalized;
    }
    this.unknownTransport = raw;
    return "gateway";
  }

  /**
   * Pick the transport for one request.
   *
   * The default transport is the managed gateway for every request, and it
   * does not fall back to another transport: a request that cannot be
   * answered by the transport it asked for fails with that transport named.
   * In the opt-in `auto` mode a request that carries client `tools` goes to
   * the gateway — those tools live on the client machine and the model has
   * to call them, so the gateway has to speak the native tool protocol —
   * while a plain chat request stays on the local CLI in the lightweight
   * profile: no tools, small prompt, half the latency.
   */
  private resolveTransport(hasTools: boolean): "gateway" | "cli" {
    return resolveMinimaxCodeTransport(this.configuredTransport(), hasTools);
  }

  /**
   * Context mode of a CLI run.
   *
   * A request that carries OpenAI `tools` but is routed to the local CLI (the
   * gateway is unavailable, or the transport is pinned to `cli`) needs the full
   * agent context with the host tools (shell, file, memory, web). A plain chat
   * request stays on the lightweight profile — no tools, a small prompt and
   * roughly half the latency.
   */
  /** Host tools are opt-in: they let a request reach the host machine. */
  private hostToolsAllowed(): boolean {
    const raw = this.options.allowHostTools ?? process.env.MINIMAX_CODE_ALLOW_HOST_TOOLS;
    return String(raw ?? "").trim().toLowerCase() === "true";
  }

  private resolveModeForRequest(body: JsonRecord): string {
    const tools = body.tools;
    if (Array.isArray(tools) && tools.length > 0) return "standard";
    return this.resolveMode();
  }

  private buildRunOptions(
    model: string,
    prompt: string,
    mode: string,
    maxSteps: number,
    signal?: AbortSignal | null
  ): MinimaxCodeRunOptions {
    const cwd = this.resolveCwd();
    const args =
      this.options.args ??
      buildMinimaxCodeExecArgs({
        model,
        cwd,
        maxSteps,
        permission: this.resolvePermission(),
        timeoutMs: this.resolveTimeoutMs(),
        mode,
        extraArgs: this.options.extraArgs,
      });
    return {
      command: this.resolveCommand(),
      args,
      mode,
      maxSteps,
      cwd,
      prompt,
      timeoutMs: this.resolveTimeoutMs(),
      signal,
      env: this.options.env,
    };
  }

  /**
   * Whether the local transport runs on the shared agent.
   *
   * The switch is a deployment setting, not a code constant: a host that
   * wants a process per request keeps the one-shot CLI run.
   */
  private sharedAgentEnabled(): boolean {
    const raw = String(process.env.MINIMAX_CODE_SHARED_AGENT ?? "")
      .trim()
      .toLowerCase();
    return raw === "1" || raw === "true" || raw === "yes";
  }

  /** One turn on the shared agent. */
  private async runSharedAgentTurn(
    options: MinimaxCodeRunOptions,
    model: string
  ): Promise<MinimaxCodeRunResult> {
    const text = await runMinimaxCodeAcpTurn({
      command: options.command,
      // The shared agent speaks the Agent Client Protocol; the one-shot
      // arguments of the CLI path do not apply to it.
      args: ["acp"],
      cwd: options.cwd,
      prompt: options.prompt,
      model,
      timeoutMs: options.timeoutMs,
      signal: options.signal,
      env: options.env,
      dataDir: this.options.agentDataDir,
      onDelta: options.onDelta,
    });
    return {
      text,
      usage: null,
      state: { text, usage: null, status: "completed", error: null },
    };
  }

  /**
   * One call against the managed gateway. A token that expired mid-flight is
   * refreshed through the account OAuth endpoint and the call is repeated once.
   */
  private async callManagedGateway(
    payload: JsonRecord,
    stream: boolean,
    signal?: AbortSignal | null,
    log?: ExecuteInput["log"]
  ): Promise<Response> {
    const path = this.options.authFile;
    const timeoutMs = this.resolveGatewayTimeoutMs();
    // The budget starts before the refresh: the refresh is a call to the
    // account endpoint and has to share the bound of the whole call.
    const startedAt = Date.now();
    const accessToken = await ensureAccessToken({
      path,
      // The injected transport has to reach the first refresh as well: a
      // refresh that escapes it would talk to the real account endpoint.
      fetchImpl: this.options.fetchImpl,
      timeoutMs: Math.max(1_000, timeoutMs - (Date.now() - startedAt)),
      onRefresh: () => log?.info?.("MINIMAX_CODE", "managed gateway access token refreshed"),
    });
    const options = {
      payload,
      accessToken,
      stream,
      signal,
      timeoutMs,
      fetchImpl: this.options.fetchImpl,
    };
    try {
      return await callGateway(options);
    } catch (error) {
      if (!(error instanceof GatewayAuthError)) throw error;
      const profile = await readAuthProfile(path || resolveAuthFile());
      if (!profile?.refreshToken) throw error;
      const refreshed = await refreshAuthProfile(profile, {
        path: profile.path,
        fetchImpl: this.options.fetchImpl,
        onRefresh: () => log?.info?.("MINIMAX_CODE", "managed gateway access token refreshed"),
      });
      // The retry after a refresh shares the budget of the call: it must not
      // restart it, or a dead gateway would hold the slot for twice the
      // documented bound.
      const remaining = timeoutMs - (Date.now() - startedAt);
      if (remaining <= 0) throw error;
      return await callGateway({ ...options, accessToken: refreshed.accessToken, timeoutMs: remaining });
    }
  }

  /**
   * The refusal for a request that is too large for the managed gateway
   * transport. It names the transport and the model context, so the message
   * is not read as a limit of the model itself.
   */
  private oversizedGatewayMessage(tokens: number): string {
    return (
      `MiniMax Code request is too large for the managed gateway transport: ` +
      `~${tokens} input tokens (limit ${resolveGatewayInputLimit()}). ` +
      `Trim the conversation and retry. The local MiniMax Code transport runs ` +
      `the same models with their full context.`
    );
  }

  /** One-shot call against the managed gateway: native tool calling, no agent. */
  private async executeGateway(
    input: ExecuteInput,
    model: string,
    body: JsonRecord
  ): Promise<ExecutorExecuteResult> {
    const payload = buildGatewayPayload(body, model);
    if (isGatewayPayloadOversized(payload)) {
      const tokens = estimateGatewayInputTokens(payload);
      const message = this.oversizedGatewayMessage(tokens);
      input.log?.warn?.("MINIMAX_CODE", message);
      // 413, not 400: a request-scoped refusal says nothing about the health
      // of the model. A 400 with a model scope is classified as a model
      // failure and locks the model out of the fallbacks, which takes the leg
      // down for every other session (incident 2026-10-21).
      return errorResponse(413, message);
    }
    const response = await this.callManagedGateway(payload, false, input.signal, input.log);
    const doc = asRecord(await response.json());
    // A 200 answer can carry the refusal of the gateway in its body. Parsing
    // it as a normal answer hands the client an empty completion and loses
    // the refusal.
    const bodyError = gatewayErrorInBody(doc);
    if (bodyError) {
      throw new GatewayStatusError(
        gatewayErrorStatus(bodyError.type),
        `MiniMax gateway error: ${bodyError.message}`
      );
    }
    const result = parseGatewayResult(doc);
    return Response.json(gatewayResultToCompletion(model, result));
  }

  /** Streaming call against the managed gateway: Anthropic SSE in, OpenAI SSE out. */
  private async executeGatewayStream(
    input: ExecuteInput,
    model: string,
    body: JsonRecord
  ): Promise<ExecutorExecuteResult> {
    const payload = buildGatewayPayload(body, model);
    if (isGatewayPayloadOversized(payload)) {
      const tokens = estimateGatewayInputTokens(payload);
      const message = this.oversizedGatewayMessage(tokens);
      input.log?.warn?.("MINIMAX_CODE", message);
      // The failure happens before the stream is opened, so the request
      // answers with a real status — the same as the non-streaming path.
      return errorResponse(413, message);
    }
    const response = await this.callManagedGateway(payload, true, input.signal, input.log);
    const upstream = response.body;
    const encoder = new TextEncoder();
    const messageId = `chatcmpl-minimax-code-${Date.now()}`;
    const state: GatewayStreamState = {
      text: "",
      toolCalls: [],
      finishReason: "end_turn",
      inputTokens: 0,
      outputTokens: 0,
    };

    const stream = new ReadableStream<Uint8Array>({
      start: (controller) => {
        void (async () => {
          const write = (chunk: string) => controller.enqueue(encoder.encode(chunk));
          try {
            write(sseChunk(model, { role: "assistant", content: "" }, null, { id: messageId }));
            if (upstream) {
              const reader = upstream.getReader();
              const decoder = new TextDecoder();
              let buffer = "";
              for (;;) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                let index = buffer.indexOf("\n\n");
                while (index >= 0) {
                  const frame = buffer.slice(0, index);
                  buffer = buffer.slice(index + 2);
                  for (const event of parseGatewaySse(frame)) {
                    const delta = applyGatewayEvent(state, event);
                    if (delta) write(sseChunk(model, { content: delta }, null, { id: messageId }));
                  }
                  index = buffer.indexOf("\n\n");
                }
              }
              if (buffer.trim()) {
                for (const event of parseGatewaySse(buffer)) {
                  const delta = applyGatewayEvent(state, event);
                  if (delta) write(sseChunk(model, { content: delta }, null, { id: messageId }));
                }
              }
            }
            const toolCalls = state.toolCalls.map((call, index) => ({
              index,
              id: call.id,
              type: "function",
              function: { name: call.name, arguments: call.arguments || "{}" },
            }));
            const finishReason = state.toolCalls.length
              ? "tool_calls"
              : state.finishReason === "max_tokens"
                ? "length"
                : "stop";
            const finalDelta: JsonRecord = {};
            if (toolCalls.length) finalDelta.tool_calls = toolCalls;
            write(
              sseChunk(model, finalDelta, finishReason, {
                id: messageId,
                usage: {
                  prompt_tokens: state.inputTokens,
                  completion_tokens: state.outputTokens,
                  total_tokens: state.inputTokens + state.outputTokens,
                },
              })
            );
            write("data: [DONE]\n\n");
          } catch (error) {
            const message = sanitizeErrorMessage(
              error instanceof Error ? error.message : String(error)
            );
            input.log?.warn?.("MINIMAX_CODE", message);
            const status = gatewayFailureStatus(error);
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify(
                  buildErrorBody(status, message, undefined, gatewayFailureClassification(error))
                )}\n\ndata: [DONE]\n\n`
              )
            );
          } finally {
            controller.close();
          }
        })();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const resolution = resolveMinimaxCodeModel(input.model);
    if (!resolution.ok) {
      const message = "error" in resolution ? resolution.error : "Invalid MiniMax Code model";
      return errorResponse(400, message);
    }

    const body = asRecord(input.body);
    const messages = Array.isArray(body.messages) ? (body.messages as OpenAIMsg[]) : [];
    const prompt = buildMinimaxCodePrompt(messages);
    // The local transport runs on one shared agent when the deployment asks
    // for it: the runtime costs a few hundred megabytes and a few seconds of
    // start-up, and that cost is paid once for the whole process instead of
    // once per request.
    const runner =
      this.options.runner ??
      (this.sharedAgentEnabled()
        ? (runOptions: MinimaxCodeRunOptions) =>
            this.runSharedAgentTurn(runOptions, resolution.model)
        : runMinimaxCodeExec);
    const mode = this.resolveModeForRequest(body);
    const clientTools = Array.isArray(body.tools) ? body.tools : [];
    const wantsTools = clientTools.length > 0;
    const transport = this.resolveTransport(wantsTools);
    const maxSteps = this.resolveMaxSteps();
    if (this.unknownTransport) {
      input.log?.warn?.(
        "MINIMAX_CODE",
        `unknown MINIMAX_CODE_TRANSPORT=${this.unknownTransport}; using the managed gateway`
      );
      this.unknownTransport = null;
    }
    input.log?.info?.(
      "MINIMAX_CODE",
      `run started model=${resolution.model} transport=${transport} mode=${mode}` +
        // The step budget belongs to the CLI run; the gateway has no steps.
        (transport === "cli" ? ` maxSteps=${maxSteps}` : "") +
        ` clientTools=${clientTools.length} cwd=${this.resolveCwd()}`
    );

    if (transport === "gateway") {
      try {
        return input.stream
          ? await this.executeGatewayStream(input, resolution.model, body)
          : await this.executeGateway(input, resolution.model, body);
      } catch (error) {
        const message = sanitizeErrorMessage(
          error instanceof Error ? error.message : String(error)
        );
        // The status of the gateway answer decides what the runtime does with
        // the failure. A 4xx is a property of the request and keeps its own
        // status: a refusal that arrives as a 502 is recorded as a model
        // outage, and the model lockout that follows takes the MiniMax leg
        // out of every combo for minutes (incident 2026-10-21). Only a
        // failure of the transport itself is a 502; everything else is ours
        // and stays a 500.
        const status = gatewayFailureStatus(error);
        const detail =
          status === 502
            ? `MiniMax managed gateway unavailable (${message})`
            : `MiniMax gateway rejected the request (${status}): ${message}`;
        input.log?.warn?.("MINIMAX_CODE", detail);
        // The failure happens before the stream is opened, so the request
        // answers with a real status instead of an error inside a 200 stream.
        return errorResponse(status, detail, gatewayFailureClassification(error));
      }
    }

    if (transport === "cli" && wantsTools) {
      // The local CLI cannot execute client tools: it has no way to hand a
      // tool call back to the client, and answering with prose would make the
      // client believe the turn is over without a single tool having run.
      // The host-tools opt-in is about the agent's own tools, not about the
      // caller's protocol, so it does not unlock this path.
      const message =
        "MiniMax Code: the local CLI transport cannot execute client tools — " +
        "use the managed gateway transport for a request that carries tools.";
      input.log?.warn?.("MINIMAX_CODE", message);
      // The refusal is a property of the request, not of the model: it is
      // answered with a request-scoped status so it cannot lock the model
      // out of the fallbacks.
      return errorResponse(400, message, { type: "invalid_request_error" });
    }

    const cliPath = this.resolveCommandPath();
    const cliVersion = await probeCliVersion(cliPath);
    input.log?.info?.(
      "MINIMAX_CODE",
      `local CLI ${cliPath}${cliVersion ? ` (${cliVersion})` : " (version unknown)"}`
    );

    if (mode === "standard" && !this.hostToolsAllowed()) {
      // The `standard` context gives the agent the host tools (shell, file,
      // memory, web). A run must not reach them by default — not even when
      // the mode is pinned through MINIMAX_CODE_MODE, and not even when the
      // request itself carries no tools.
      const message =
        "MiniMax Code: the local CLI runs in `standard` mode, which gives the agent the host " +
        "tools (shell, file, memory, web). Set MINIMAX_CODE_ALLOW_HOST_TOOLS=true to allow it, " +
        "or use the managed gateway transport.";
      input.log?.warn?.("MINIMAX_CODE", message);
      return errorResponse(400, message);
    }

    if (input.stream) {
      const encoder = new TextEncoder();
      const messageId = `chatcmpl-minimax-code-${Date.now()}`;
      const stream = new ReadableStream<Uint8Array>({
        start: (controller) => {
          void (async () => {
            try {
              controller.enqueue(
                encoder.encode(
                  sseChunk(resolution.model, { role: "assistant", content: "" }, null, {
                    id: messageId,
                  })
                )
              );
              await runner({
                ...this.buildRunOptions(resolution.model, prompt, mode, maxSteps, input.signal),
                onDelta: (delta) => {
                  controller.enqueue(
                    encoder.encode(
                      sseChunk(resolution.model, { content: delta }, null, { id: messageId })
                    )
                  );
                },
              });
              controller.enqueue(
                encoder.encode(sseChunk(resolution.model, {}, "stop", { id: messageId }))
              );
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            } catch (error) {
              const message = sanitizeErrorMessage(
                error instanceof Error ? error.message : String(error)
              );
              input.log?.warn?.("MINIMAX_CODE", message);
              const status = cliFailureStatus(message);
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify(buildErrorBody(status, message))}\n\ndata: [DONE]\n\n`
                )
              );
            } finally {
              controller.close();
            }
          })();
        },
      });
      return new Response(stream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    try {
      const result = await runner(
        this.buildRunOptions(resolution.model, prompt, mode, maxSteps, input.signal)
      );
      return completionResponse(resolution.model, prompt, result.text, result.usage);
    } catch (error) {
      const message = sanitizeErrorMessage(error instanceof Error ? error.message : String(error));
      input.log?.warn?.("MINIMAX_CODE", message);
      // A refusal of the CLI is not an outage of the model: a 502 would
      // lock the model out of the fallbacks for half an hour.
      return errorResponse(cliFailureStatus(message), message);
    }
  }

  // Credentials are intentionally ignored: the local MiniMax Code profile owns auth.
  override buildHeaders(_credentials: ProviderCredentials): Record<string, string> {
    return {};
  }
}

/** Default data dir helper kept for parity with the other local CLI executors. */
export function defaultMinimaxCodeProfileDir(): string {
  return join(homedir(), ".minimax");
}
