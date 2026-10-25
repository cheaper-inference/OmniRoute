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
  isContextWindowFailure,
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
import { isDraining } from "../../src/lib/gracefulShutdown.ts";

/**
 * MiniMax Code provider.
 *
 * Every request runs on the managed MiniMax subscription gateway, which speaks
 * the native tool protocol — a request that carries client `tools` is answered
 * with the tool calls the client has to run, and a plain chat turn is answered
 * with the text of the assistant.
 *
 * The provider does not persist a separate credential in OmniRoute's
 * connection database. It reads the local MiniMax Code profile (`~/.minimax`)
 * to authenticate the call and writes a rotated credential back to that file.
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
  if (error instanceof GatewayStatusError) {
    // A request that does not fit the window of the model is a property of
    // the request, not a failure of the model. The gateway answers it with a
    // 400, and a 400 with a model scope locks the model out of the fallbacks
    // (incident 2026-10-21) — it is answered with a 413 instead.
    if (isContextWindowFailure(error.message)) return 413;
    return error.status;
  }
  if (error instanceof GatewayAuthError) return error.status;
  // The gateway could not be reached: that is an outage of the upstream, and
  // a 502 keeps the model out of the combos while it lasts.
  if (isTransportFailure(error)) return 502;
  // Anything else is ours — a bug in the payload builder or in the parser.
  // It says nothing about the health of the model, and a 502 would lock the
  // model out of every combo of the instance for half an hour.
  return 500;
}

/**
 * The status a failure of this executor is answered with while the instance
 * is draining.
 *
 * A graceful shutdown tears the transport down under the requests that are
 * still in flight, so the failure is evidence about OUR shutdown, not about
 * the health of the provider. A 5xx says the opposite: it is in the
 * model-lockout list and in the provider-breaker list, and it is not exempt
 * from the connection cooldown — so the account is written as `unavailable`
 * with a `rateLimitedUntil` into the `provider_connections` table, a state
 * that outlives the restart. The shutdown the operator asked for must not
 * cost the account its health.
 *
 * 499 is the answer an aborted caller gets, and it carries
 * `client_disconnected`, which the connection-cooldown policy already exempts
 * (`shouldSkipConnDisable`) — so the account is not poisoned. It is in neither
 * the model-lockout nor the provider-breaker status list, so it can neither
 * lock the model out nor open the provider circuit.
 *
 * A refusal that belongs to the request (a 4xx of the gateway) keeps its own
 * status: that answer is about the request, not about the shutdown.
 *
 * The drain flag is read live on every call — it never latches.
 */
function drainAwareFailureStatus(status: number): number {
  return status >= 500 && isDraining() ? 499 : status;
}

/** A failure of the HTTP transport itself, not of our code. */
function isTransportFailure(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /fetch failed|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|EAI_AGAIN|socket hang up|network|terminated/i.test(
    message
  );
}

/**
 * The classification of a gateway refusal.
 *
 * A request-scoped refusal is marked as one, so the fallback layer keeps it
 * out of the model lockout: another account of the same model would fail the
 * same way. Only the statuses that are a property of the request are marked
 * — a 403 or a 429 stay what they are.
 */
function gatewayFailureClassification(error: unknown): { type: string; code?: string } | undefined {
  const status = gatewayFailureStatus(error);
  if (status !== 400 && status !== 413 && status !== 422) return undefined;
  return { type: "invalid_request_error" };
}

/**
 * Budget of one managed-gateway call.
 *
 * The budget has to stay under the per-target timeout of the routing
 * machinery (120 s): a call that is cut off by that timer is answered with a
 * synthetic 504, and a 504 is in the model-lockout list — the model would be
 * taken out of every combo of the instance for minutes because one turn was
 * slow. The provider answers first instead, with a status that says nothing
 * about the health of the model.
 */
const DEFAULT_GATEWAY_TIMEOUT_MS = 100_000;
const DEFAULT_MODEL = MINIMAX_CODE_MODELS[0]?.id || "MiniMax-M3.1-Flash";
const MINIMAX_CODE_MODEL_ALLOWLIST = new Set(MINIMAX_CODE_MODELS.map((model) => model.id));

type JsonRecord = Record<string, unknown>;

export interface MinimaxCodeExecutorOptions {
  /** Timeout of a single managed-gateway call in milliseconds. */
  gatewayTimeoutMs?: number;
  /** Path of the MiniMax Code auth profile (default: the local profile). */
  authFile?: string;
  /** Injection point for the HTTP client of the managed gateway (tests). */
  fetchImpl?: typeof fetch;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
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

export class MinimaxCodeExecutor extends BaseExecutor {
  private readonly options: MinimaxCodeExecutorOptions;

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
      return await callGateway({
        ...options,
        accessToken: refreshed.accessToken,
        timeoutMs: remaining,
      });
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
      `Trim the conversation and retry.`
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
        gatewayErrorStatus(bodyError.type, bodyError.message),
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

  /**
   * Run one request through the MiniMax Code transport.
   *
   * @executorRecovery custom
   * @executorRecoveryReason Owns its own dispatch: the request goes to the managed MiniMax subscription gateway and the answer of the gateway is turned into an OpenAI answer here. None of the three recovery kinds of the base loop applies to this payload — it carries no reasoning enum, no field the base recovery knows how to repair, and no Gemini budget — and the refusals of the request keep their own status (413 above the ceiling of the gateway, 400 for a refusal of the gateway), so they are never read as an outage of the model.
   * @executorRecoveryTest tests/unit/minimax-code-executor.test.ts
   */
  async execute(input: ExecuteInput): Promise<ExecutorExecuteResult> {
    const resolution = resolveMinimaxCodeModel(input.model);
    if (!resolution.ok) {
      const message = "error" in resolution ? resolution.error : "Invalid MiniMax Code model";
      return errorResponse(400, message);
    }

    const body = asRecord(input.body);
    const clientTools = Array.isArray(body.tools) ? body.tools : [];
    input.log?.info?.(
      "MINIMAX_CODE",
      `run started model=${resolution.model} transport=gateway clientTools=${clientTools.length}`
    );

    try {
      return input.stream
        ? await this.executeGatewayStream(input, resolution.model, body)
        : await this.executeGateway(input, resolution.model, body);
    } catch (error) {
      const message = sanitizeErrorMessage(error instanceof Error ? error.message : String(error));
      const failureStatus = gatewayFailureStatus(error);
      if (isDraining() && failureStatus >= 500) {
        // Our own shutdown tore the transport down under a request that was
        // still in flight. That failure is evidence about OUR shutdown, not
        // about the health of the provider, so the answer is 499
        // (client_disconnected) — the status an aborted caller already gets.
        // 499 is exempt from the connection cooldown, so the account is not
        // written as `unavailable` in the database, a state that outlives
        // the restart; and it is in neither the model-lockout nor the
        // provider-breaker status list.
        //
        // A refusal that belongs to the request (a 4xx of the gateway) keeps
        // its own status — that answer is about the request, not about the
        // shutdown — so only a 5xx takes this branch.
        input.log?.warn?.(
          "MINIMAX_CODE",
          `gateway transport failed while the instance is draining: ${message}`
        );
        return errorResponse(499, message);
      }
      // The status of the gateway answer decides what the runtime does with
      // the failure. A 4xx is a property of the request and keeps its own
      // status: a refusal that arrives as a 502 is recorded as a model
      // outage, and the model lockout that follows takes the MiniMax leg
      // out of every combo for minutes (incident 2026-10-21). Only a
      // failure of the transport itself is a 502; everything else is ours
      // and stays a 500.
      const status = failureStatus;
      const detail =
        status === 502
          ? `MiniMax managed gateway unavailable (${message})`
          : `MiniMax gateway rejected the request (${status}): ${message}`;
      input.log?.warn?.("MINIMAX_CODE", detail);
      // The failure happens before the stream is opened, so the request
      // answers with a real status instead of an error inside a 200 stream.
      return errorResponse(
        drainAwareFailureStatus(status),
        detail,
        gatewayFailureClassification(error)
      );
    }
  }

  // Credentials are intentionally ignored: the local MiniMax Code profile owns auth.
  override buildHeaders(_credentials: ProviderCredentials): Record<string, string> {
    return {};
  }
}
