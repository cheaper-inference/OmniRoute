import { randomUUID } from "node:crypto";

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";

type JsonRecord = Record<string, unknown>;
type OpenAIMessage = {
  role?: string;
  content?: unknown;
  tool_calls?: unknown;
};

type Usage = { prompt_tokens: number; completion_tokens: number; total_tokens: number };
type ParsedModel = { path: string; version: string | null };
type PushFrame = (frame: string) => void;
type PredictionRequest = {
  url: string;
  headers: Record<string, string>;
  credentials: ProviderCredentials;
  model: string;
  stream: boolean;
  payload: JsonRecord;
  promptText: string;
  maxTokens: number | null;
  signal?: AbortSignal | null;
};

const DEFAULT_BASE_URL = "https://api.replicate.com/v1";
// Replicate holds the connection for up to 60s when asked with `Prefer: wait`.
const WAIT_SECONDS = 60;
const POLL_INTERVAL_MS = 1000;
const POLL_DEADLINE_MS = 120_000;
const USAGE_LOOKUP_TIMEOUT_MS = 5000;
const TERMINAL_STATUSES = new Set(["succeeded", "failed", "canceled"]);
// owner/name for official models, owner/name:version for pinned or community ones.
const MODEL_ID_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+(?::[A-Za-z0-9]+)?$/;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function parseModel(model: string): ParsedModel | null {
  const id = String(model || "").trim();
  if (!MODEL_ID_PATTERN.test(id)) return null;
  const [path, version] = id.split(":");
  return { path, version: version ?? null };
}

function extractText(content: unknown): string {
  if (typeof content === "string") return content.trim();
  if (!Array.isArray(content)) return "";
  return content
    .map((part) => {
      const item = asRecord(part);
      return (item.type === "text" || item.type === "input_text") && typeof item.text === "string"
        ? item.text
        : "";
    })
    .filter((text) => text.trim().length > 0)
    .join("\n")
    .trim();
}

// Vision-capable Replicate models take a single `image` input (URL or data URI).
function imagePartUrl(part: unknown): string | null {
  const item = asRecord(part);
  if (item.type !== "image_url" && item.type !== "input_image") return null;
  const ref = item.image_url;
  const url = typeof ref === "string" ? ref : asRecord(ref).url;
  return typeof url === "string" && url ? url : null;
}

function extractFirstImage(messages: OpenAIMessage[]): string | null {
  for (const message of messages) {
    if (!Array.isArray(message?.content)) continue;
    for (const part of message.content) {
      const url = imagePartUrl(part);
      if (url) return url;
    }
  }
  return null;
}

function describeToolCalls(toolCalls: unknown): string {
  if (!Array.isArray(toolCalls)) return "";
  return toolCalls
    .map((call) => {
      const fn = asRecord(asRecord(call).function);
      return typeof fn.name === "string"
        ? `[tool call ${fn.name}(${typeof fn.arguments === "string" ? fn.arguments : ""})]`
        : "";
    })
    .filter(Boolean)
    .join("\n");
}

type Turn = { label: string; text: string; user: boolean };

function toTurn(role: string, text: string): Turn {
  if (role === "assistant") return { label: "Assistant", text, user: false };
  // Keep tool results in the transcript so the model still sees them.
  if (role === "tool" || role === "function") return { label: "Tool result", text, user: true };
  return { label: "User", text, user: true };
}

// Replicate language models take a single `prompt` string. A lone user turn is
// sent verbatim; multi-turn history is flattened into a labelled transcript.
function flattenTurns(turns: Turn[]): string {
  if (turns.length === 1 && turns[0].label === "User") return turns[0].text;
  return turns
    .map((turn) => `${turn.label}: ${turn.text}`)
    .concat(turns.length > 0 && turns[turns.length - 1].user ? ["Assistant:"] : [])
    .join("\n");
}

function resolvePrompt(messages: OpenAIMessage[]): { prompt: string; systemPrompt: string | null } {
  const systemParts: string[] = [];
  const turns: Turn[] = [];

  for (const message of messages) {
    const role = String(message?.role || "user").toLowerCase();
    const text = [extractText(message?.content), describeToolCalls(message?.tool_calls)]
      .filter(Boolean)
      .join("\n");
    if (!text) continue;
    if (role === "system" || role === "developer") systemParts.push(text);
    else turns.push(toTurn(role, text));
  }

  return {
    prompt: flattenTurns(turns),
    systemPrompt: systemParts.length > 0 ? systemParts.join("\n\n") : null,
  };
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

function numberOrNull(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

// Prefer the token counts Replicate reports; fall back to a length estimate.
function resolveUsage(prediction: JsonRecord, promptText: string, content: string): Usage {
  const metrics = asRecord(prediction.metrics);
  const promptTokens = numberOrNull(metrics.input_token_count) ?? estimateTokens(promptText);
  const completionTokens = numberOrNull(metrics.output_token_count) ?? estimateTokens(content);
  return {
    prompt_tokens: promptTokens,
    completion_tokens: completionTokens,
    total_tokens: promptTokens + completionTokens,
  };
}

function resolveFinishReason(usage: Usage, maxTokens: number | null): "stop" | "length" {
  return maxTokens !== null && usage.completion_tokens >= maxTokens ? "length" : "stop";
}

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function jsonCompletion(
  content: string,
  model: string,
  usage: Usage,
  finishReason: string
): Response {
  return new Response(
    JSON.stringify({
      id: `chatcmpl-replicate-${randomUUID()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: finishReason }],
      usage,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// Builds OpenAI chat.completion.chunk frames for one response.
function chunkWriter(model: string) {
  const id = `chatcmpl-replicate-${randomUUID()}`;
  const created = Math.floor(Date.now() / 1000);
  return (choices: unknown[], usage?: Usage) =>
    sseChunk({
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices,
      ...(usage ? { usage } : {}),
    });
}

// Used when the prediction has already finished (no live stream to relay): the whole
// answer is emitted as a single content delta.
function synthesizedStream(
  content: string,
  model: string,
  usage: Usage,
  finishReason: string
): Response {
  const write = chunkWriter(model);
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      const push = (frame: string) => controller.enqueue(encoder.encode(frame));
      push(write([{ index: 0, delta: { role: "assistant" }, finish_reason: null }]));
      if (content) push(write([{ index: 0, delta: { content }, finish_reason: null }]));
      push(write([{ index: 0, delta: {}, finish_reason: finishReason }]));
      push(write([], usage));
      push("data: [DONE]\n\n");
      controller.close();
    },
  });
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function errorResponse(status: number, message: string, retryAfter?: string | null): Response {
  return new Response(JSON.stringify(buildErrorBody(status, message)), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...(retryAfter ? { "Retry-After": retryAfter } : {}),
    },
  });
}

// Turns a prediction that reached a final state (or ran out of time) into the client response.
function finishedResponse(prediction: JsonRecord, request: PredictionRequest): Response {
  if (prediction.status !== "succeeded") {
    const failed = prediction.status === "failed" || prediction.status === "canceled";
    const reason = typeof prediction.error === "string" ? `: ${prediction.error}` : "";
    return errorResponse(
      failed ? 502 : 504,
      failed
        ? `Replicate prediction ${String(prediction.status)}${reason}`
        : "Replicate prediction did not finish in time"
    );
  }

  const content = outputToText(prediction.output);
  const usage = resolveUsage(prediction, request.promptText, content);
  const finishReason = resolveFinishReason(usage, request.maxTokens);
  return request.stream
    ? synthesizedStream(content, request.model, usage, finishReason)
    : jsonCompletion(content, request.model, usage, finishReason);
}

// Upstream HTTP failure that keeps its status (and Retry-After) so rate-limit and
// auth handling downstream classify it correctly instead of seeing a flat 502.
class ReplicateHttpError extends Error {
  constructor(
    readonly status: number,
    readonly retryAfter: string | null,
    message: string
  ) {
    super(message);
  }
}

function describeUpstreamFailure(status: number, detail: unknown): string {
  const safe = typeof detail === "string" ? sanitizeErrorMessage(detail.trim()).slice(0, 200) : "";
  return `Replicate API failed with status ${status}${safe ? `: ${safe}` : ""}`;
}

// The Bearer token must only ever travel to the host the request itself was sent to.
function sameOrigin(candidate: unknown, requestUrl: string): candidate is string {
  if (typeof candidate !== "string") return false;
  try {
    return new URL(candidate).origin === new URL(requestUrl).origin;
  } catch {
    return false;
  }
}

// Stream URLs live on a separate Replicate host and are fetched WITHOUT credentials,
// so they only need to be https on a replicate.com host (or the request's own origin).
function isTrustedStreamUrl(candidate: unknown, requestUrl: string): candidate is string {
  if (typeof candidate !== "string") return false;
  if (sameOrigin(candidate, requestUrl)) return true;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" && /(^|\.)replicate\.com$/i.test(url.hostname);
  } catch {
    return false;
  }
}

function outputToText(output: unknown): string {
  if (typeof output === "string") return output;
  if (Array.isArray(output))
    return output.map((part) => (typeof part === "string" ? part : "")).join("");
  return "";
}

function sleep(ms: number, signal?: AbortSignal | null): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason ?? new Error("aborted"));
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal.reason ?? new Error("aborted"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

// Minimal SSE reader: yields {event, data} per event. Only one leading space is stripped
// from each data line (per the SSE spec) so token whitespace is preserved.
async function* readSseEvents(
  body: ReadableStream<Uint8Array>
): AsyncGenerator<{ event: string; data: string }> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const parse = (block: string) => {
    let event = "message";
    const data: string[] = [];
    for (const line of block.split("\n")) {
      if (!line || line.startsWith(":")) continue;
      if (line.startsWith("event:")) event = line.slice(6).trim();
      else if (line.startsWith("data:")) {
        const value = line.slice(5);
        data.push(value.startsWith(" ") ? value.slice(1) : value);
      }
    }
    return data.length > 0 || event !== "message" ? { event, data: data.join("\n") } : null;
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");
      let index = buffer.indexOf("\n\n");
      while (index !== -1) {
        const parsed = parse(buffer.slice(0, index));
        buffer = buffer.slice(index + 2);
        if (parsed) yield parsed;
        index = buffer.indexOf("\n\n");
      }
    }
    const tail = parse(buffer.trim());
    if (tail) yield tail;
  } finally {
    reader.releaseLock();
  }
}

export class ReplicateExecutor extends BaseExecutor {
  protected pollIntervalMs = POLL_INTERVAL_MS;
  protected pollDeadlineMs = POLL_DEADLINE_MS;

  constructor() {
    super("replicate", PROVIDERS.replicate || { format: "openai" });
  }

  private resolvePredictionsBaseUrl(credentials: ProviderCredentials | null): string {
    const custom = credentials?.providerSpecificData?.baseUrl;
    return String(typeof custom === "string" && custom.trim() ? custom : DEFAULT_BASE_URL)
      .trim()
      .replace(/\/+$/, "");
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ): string {
    const baseUrl = this.resolvePredictionsBaseUrl(credentials);
    const parsed = parseModel(model);
    // Pinned/community versions go through the generic endpoint with a `version` field;
    // official models use /models/{owner}/{name}/predictions.
    if (parsed?.version) return `${baseUrl}/predictions`;
    const path = String(parsed?.path ?? model)
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    return `${baseUrl}/models/${path}/predictions`;
  }

  buildHeaders(credentials: ProviderCredentials | null, stream = false): Record<string, string> {
    const key = credentials?.apiKey || credentials?.accessToken;
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    // Streaming returns the prediction immediately and relays tokens from urls.stream.
    if (!stream) headers.Prefer = `wait=${WAIT_SECONDS}`;
    if (key) headers.Authorization = `Bearer ${key}`;
    return headers;
  }

  private buildPayload(
    body: unknown,
    parsed: ParsedModel,
    stream: boolean
  ): { payload: JsonRecord; promptText: string; maxTokens: number | null } | null {
    const source = asRecord(body);
    const messages = Array.isArray(source.messages) ? (source.messages as OpenAIMessage[]) : [];
    const { prompt, systemPrompt } = resolvePrompt(messages);
    if (!prompt) return null;

    const image = extractFirstImage(messages);
    const rawMax = source.max_completion_tokens ?? source.max_tokens;
    const maxTokens = typeof rawMax === "number" ? rawMax : null;

    return {
      promptText: prompt,
      maxTokens,
      payload: {
        ...(parsed.version ? { version: parsed.version } : {}),
        ...(stream ? { stream: true } : {}),
        input: {
          prompt,
          ...(systemPrompt ? { system_prompt: systemPrompt } : {}),
          ...(image ? { image } : {}),
          ...(maxTokens !== null ? { max_tokens: maxTokens } : {}),
          ...(typeof source.temperature === "number" ? { temperature: source.temperature } : {}),
          ...(typeof source.top_p === "number" ? { top_p: source.top_p } : {}),
        },
      },
    };
  }

  // Every Replicate call leaves through here: this executor owns its fetch path, so it has to
  // apply the same outbound guards BaseExecutor applies (GHSA-4f49 and GHSA-cmhj).
  private send(
    url: string,
    init: RequestInit,
    credentials: ProviderCredentials
  ): Promise<Response> {
    this.assertOutboundUrlAllowed(url);
    return this.dispatchRequest(url, init, credentials);
  }

  private withoutPrefer(headers: Record<string, string>): Record<string, string> {
    const copy = { ...headers };
    delete copy.Prefer;
    return copy;
  }

  private async pollUntilDone(
    prediction: JsonRecord,
    requestUrl: string,
    headers: Record<string, string>,
    credentials: ProviderCredentials,
    signal?: AbortSignal | null
  ): Promise<JsonRecord> {
    if (TERMINAL_STATUSES.has(String(prediction.status))) return prediction;

    const urls = asRecord(prediction.urls);
    if (!sameOrigin(urls.get, requestUrl)) {
      throw new ReplicateHttpError(502, null, "Replicate returned an unexpected polling URL");
    }

    const pollHeaders = this.withoutPrefer(headers);
    const deadline = Date.now() + this.pollDeadlineMs;
    let current = prediction;

    while (!TERMINAL_STATUSES.has(String(current.status)) && Date.now() < deadline) {
      await sleep(this.pollIntervalMs, signal);
      const res = await this.send(
        urls.get,
        { method: "GET", headers: pollHeaders, signal },
        credentials
      );
      if (!res.ok) {
        const detail = asRecord(await res.json().catch(() => ({}))).detail;
        throw new ReplicateHttpError(
          res.status,
          res.headers.get("Retry-After"),
          describeUpstreamFailure(res.status, detail)
        );
      }
      current = asRecord(await res.json());
    }

    if (!TERMINAL_STATUSES.has(String(current.status))) {
      await this.cancelPrediction(current, requestUrl, pollHeaders, credentials);
    }
    return current;
  }

  // Best effort: stop a prediction we are abandoning so it stops billing and a
  // combo fallback does not duplicate the work.
  private async cancelPrediction(
    prediction: JsonRecord,
    requestUrl: string,
    headers: Record<string, string>,
    credentials: ProviderCredentials
  ): Promise<void> {
    const cancelUrl = asRecord(prediction.urls).cancel;
    if (!sameOrigin(cancelUrl, requestUrl)) return;
    try {
      await this.send(
        cancelUrl,
        { method: "POST", headers: this.withoutPrefer(headers) },
        credentials
      );
    } catch {
      // Nothing more to do; the caller still reports the timeout.
    }
  }

  // Reads the finished prediction once to pick up Replicate's real token counts.
  private async fetchFinalPrediction(
    prediction: JsonRecord,
    requestUrl: string,
    headers: Record<string, string>,
    credentials: ProviderCredentials
  ): Promise<JsonRecord> {
    const getUrl = asRecord(prediction.urls).get;
    if (!sameOrigin(getUrl, requestUrl)) return prediction;
    try {
      const res = await this.send(
        getUrl,
        {
          method: "GET",
          headers: this.withoutPrefer(headers),
          signal: AbortSignal.timeout(USAGE_LOOKUP_TIMEOUT_MS),
        },
        credentials
      );
      return res.ok ? asRecord(await res.json()) : prediction;
    } catch {
      return prediction;
    }
  }

  // Reads the upstream SSE events into `push`; returns what arrived and any stream error.
  private async pumpOutput(
    body: ReadableStream<Uint8Array>,
    write: ReturnType<typeof chunkWriter>,
    push: PushFrame
  ): Promise<{ content: string; streamError: string | null }> {
    let content = "";
    for await (const event of readSseEvents(body)) {
      if (event.event === "output") {
        content += event.data;
        if (event.data) {
          push(write([{ index: 0, delta: { content: event.data }, finish_reason: null }]));
        }
      } else if (event.event === "error") {
        const streamError = sanitizeErrorMessage(asRecord(safeJson(event.data)).detail ?? "");
        return { content, streamError };
      } else if (event.event === "done") {
        break;
      }
    }
    return { content, streamError: null };
  }

  private async relayUpstream(
    streamUrl: string,
    prediction: JsonRecord,
    request: PredictionRequest,
    write: ReturnType<typeof chunkWriter>,
    push: PushFrame,
    signal: AbortSignal
  ): Promise<void> {
    const res = await this.send(
      streamUrl,
      {
        method: "GET",
        headers: { Accept: "text/event-stream", "Cache-Control": "no-store" },
        signal,
      },
      request.credentials
    );
    if (!res.ok || !res.body) {
      throw new ReplicateHttpError(
        res.ok ? 502 : res.status,
        res.headers.get("Retry-After"),
        describeUpstreamFailure(res.status, null)
      );
    }

    push(write([{ index: 0, delta: { role: "assistant" }, finish_reason: null }]));
    const { content, streamError } = await this.pumpOutput(res.body, write, push);

    if (streamError !== null) {
      push(sseChunk(buildErrorBody(502, `Replicate prediction failed: ${streamError}`)));
      push("data: [DONE]\n\n");
      return;
    }

    const final = await this.fetchFinalPrediction(
      prediction,
      request.url,
      request.headers,
      request.credentials
    );
    const usage = resolveUsage(final, request.promptText, content);
    const finishReason = resolveFinishReason(usage, request.maxTokens);
    push(write([{ index: 0, delta: {}, finish_reason: finishReason }]));
    push(write([], usage));
    push("data: [DONE]\n\n");
  }

  // Relays Replicate's native SSE stream (`output` events carry raw text tokens).
  private relayStream(
    streamUrl: string,
    prediction: JsonRecord,
    request: PredictionRequest
  ): Response {
    const { signal } = request;
    const write = chunkWriter(request.model);
    const encoder = new TextEncoder();
    const upstreamAbort = new AbortController();
    const onAbort = () => upstreamAbort.abort();
    signal?.addEventListener("abort", onAbort, { once: true });
    let finished = false;

    const body = new ReadableStream<Uint8Array>({
      start: async (controller) => {
        const push = (frame: string) => controller.enqueue(encoder.encode(frame));
        try {
          await this.relayUpstream(
            streamUrl,
            prediction,
            request,
            write,
            push,
            upstreamAbort.signal
          );
          finished = true;
          controller.close();
        } catch (error) {
          finished = true;
          if (signal?.aborted) {
            controller.error(error);
            return;
          }
          const status = error instanceof ReplicateHttpError ? error.status : 502;
          const message =
            error instanceof ReplicateHttpError ? error.message : "Replicate stream failed";
          push(sseChunk(buildErrorBody(status, message)));
          push("data: [DONE]\n\n");
          controller.close();
        } finally {
          signal?.removeEventListener("abort", onAbort);
        }
      },
      // Client went away mid-stream: stop reading and cancel the running prediction.
      cancel: async () => {
        upstreamAbort.abort();
        signal?.removeEventListener("abort", onAbort);
        if (!finished) {
          await this.cancelPrediction(
            prediction,
            request.url,
            request.headers,
            request.credentials
          );
        }
      },
    });

    return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
  }

  private async runPrediction(request: PredictionRequest): Promise<Response> {
    const { url, headers, credentials, signal } = request;
    const res = await this.send(
      url,
      { method: "POST", headers, body: JSON.stringify(request.payload), signal },
      credentials
    );

    if (!res.ok) {
      const detail = asRecord(await res.json().catch(() => ({}))).detail;
      return errorResponse(
        res.status,
        describeUpstreamFailure(res.status, detail),
        res.headers.get("Retry-After")
      );
    }

    const created = asRecord(await res.json());
    const streamUrl = asRecord(created.urls).stream;
    const running = !TERMINAL_STATUSES.has(String(created.status));
    if (request.stream && running && isTrustedStreamUrl(streamUrl, url)) {
      return this.relayStream(streamUrl, created, request);
    }

    const prediction = await this.pollUntilDone(created, url, headers, credentials, signal);
    return finishedResponse(prediction, request);
  }

  /**
   * @executorRecovery custom
   * @executorRecoveryReason Owns its own dispatch: the chat request is rebuilt as a Replicate prediction input (prompt, system prompt, max_tokens, temperature, one image), created on the predictions API and then relayed from its native stream or polled until it finishes. None of the three recovery kinds of the base loop applies to that payload — it carries no reasoning enum, no field the base recovery knows how to repair, and no Gemini budget — and upstream refusals keep their own status and Retry-After.
   * @executorRecoveryTest tests/unit/executor-replicate.test.ts
   */
  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const url = this.buildUrl(model, stream, 0, credentials);
    const headers = this.buildHeaders(credentials, stream);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);
    const result = (response: Response, transformedBody: unknown) => ({
      response,
      url,
      headers,
      transformedBody,
    });

    const parsed = parseModel(model);
    if (!parsed) {
      return result(
        errorResponse(400, "Replicate model IDs must look like owner/name or owner/name:version."),
        body
      );
    }

    const built = this.buildPayload(body, parsed, stream);
    if (!built) {
      return result(
        errorResponse(400, "Replicate requests require at least one user message."),
        body
      );
    }
    const { payload } = built;

    try {
      const response = await this.runPrediction({
        ...built,
        url,
        headers,
        credentials,
        model,
        stream,
        signal,
      });
      return result(response, payload);
    } catch (error) {
      if (signal?.aborted) throw error;
      const response =
        error instanceof ReplicateHttpError
          ? errorResponse(error.status, error.message, error.retryAfter)
          : errorResponse(502, "Replicate request failed");
      return result(response, payload);
    }
  }
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default ReplicateExecutor;
