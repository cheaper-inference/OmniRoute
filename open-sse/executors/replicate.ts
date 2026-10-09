import { randomUUID } from "node:crypto";

import {
  BaseExecutor,
  mergeUpstreamExtraHeaders,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { buildErrorBody } from "../utils/error.ts";

type JsonRecord = Record<string, unknown>;
type OpenAIMessage = {
  role?: string;
  content?: unknown;
};

const DEFAULT_BASE_URL = "https://api.replicate.com/v1";
// Replicate holds the connection for up to 60s when asked with `Prefer: wait`.
const WAIT_SECONDS = 60;
const POLL_INTERVAL_MS = 1000;
const POLL_DEADLINE_MS = 120_000;
const TERMINAL_STATUSES = new Set(["succeeded", "failed", "canceled"]);

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function extractTextContent(content: unknown): string {
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

function resolvePrompt(messages: OpenAIMessage[] | undefined): {
  prompt: string;
  systemPrompt: string | null;
} {
  if (!Array.isArray(messages)) return { prompt: "", systemPrompt: null };

  const systemParts: string[] = [];
  const turns: Array<{ role: string; text: string }> = [];

  for (const message of messages) {
    const role = String(message?.role || "user").toLowerCase();
    const text = extractTextContent(message?.content);
    if (!text) continue;
    if (role === "system" || role === "developer") systemParts.push(text);
    else if (role === "user" || role === "assistant") turns.push({ role, text });
  }

  // Replicate language models take a single `prompt` string. A lone user turn is
  // sent verbatim; multi-turn history is flattened into a labelled transcript.
  const prompt =
    turns.length === 1 && turns[0].role === "user"
      ? turns[0].text
      : turns
          .map((turn) => `${turn.role === "user" ? "User" : "Assistant"}: ${turn.text}`)
          .concat(turns.length > 0 && turns[turns.length - 1].role === "user" ? ["Assistant:"] : [])
          .join("\n");

  return { prompt, systemPrompt: systemParts.length > 0 ? systemParts.join("\n\n") : null };
}

function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function jsonCompletion(content: string, model: string, promptText: string): Response {
  const promptTokens = estimateTokens(promptText);
  const completionTokens = estimateTokens(content);
  return new Response(
    JSON.stringify({
      id: `chatcmpl-replicate-${randomUUID()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model,
      choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// Predictions finish before the response is returned, so streaming clients get
// the whole answer as one synthesized delta rather than token-by-token output.
function synthesizedStream(content: string, model: string): Response {
  const id = `chatcmpl-replicate-${randomUUID()}`;
  const created = Math.floor(Date.now() / 1000);
  const chunk = (delta: JsonRecord, finish: string | null) =>
    sseChunk({
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta, finish_reason: finish }],
    });
  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(chunk({ role: "assistant" }, null)));
      if (content) controller.enqueue(encoder.encode(chunk({ content }, null)));
      controller.enqueue(encoder.encode(chunk({}, "stop")));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

function errorResponse(status: number, message: string): Response {
  return new Response(JSON.stringify(buildErrorBody(status, message)), {
    status,
    headers: { "Content-Type": "application/json" },
  });
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
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(signal.reason ?? new Error("aborted"));
      },
      { once: true }
    );
  });
}

export class ReplicateExecutor extends BaseExecutor {
  constructor() {
    super("replicate", PROVIDERS.replicate || { format: "openai" });
  }

  buildUrl(
    model: string,
    _stream: boolean,
    _urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ): string {
    const custom = credentials?.providerSpecificData?.baseUrl;
    const baseUrl = String(typeof custom === "string" && custom.trim() ? custom : DEFAULT_BASE_URL)
      .trim()
      .replace(/\/+$/, "");
    // Official models live at /models/{owner}/{name}/predictions.
    const path = String(model)
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    return `${baseUrl}/models/${path}/predictions`;
  }

  buildHeaders(credentials: ProviderCredentials | null, _stream = true): Record<string, string> {
    const key = credentials?.apiKey || credentials?.accessToken;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Prefer: `wait=${WAIT_SECONDS}`,
    };
    if (key) headers.Authorization = `Bearer ${key}`;
    return headers;
  }

  private buildPayload(body: unknown): JsonRecord | null {
    const source = asRecord(body);
    const messages = Array.isArray(source.messages) ? (source.messages as OpenAIMessage[]) : [];
    const { prompt, systemPrompt } = resolvePrompt(messages);
    if (!prompt) return null;

    const maxTokens = source.max_completion_tokens ?? source.max_tokens;
    return {
      input: {
        prompt,
        ...(systemPrompt ? { system_prompt: systemPrompt } : {}),
        ...(typeof maxTokens === "number" ? { max_tokens: maxTokens } : {}),
        ...(typeof source.temperature === "number" ? { temperature: source.temperature } : {}),
        ...(typeof source.top_p === "number" ? { top_p: source.top_p } : {}),
      },
    };
  }

  private async pollUntilDone(
    prediction: JsonRecord,
    headers: Record<string, string>,
    signal?: AbortSignal | null
  ): Promise<JsonRecord> {
    const pollUrl = asRecord(prediction.urls).get;
    if (typeof pollUrl !== "string") return prediction;

    const pollHeaders = { ...headers };
    delete pollHeaders.Prefer;
    const deadline = Date.now() + POLL_DEADLINE_MS;
    let current = prediction;

    while (!TERMINAL_STATUSES.has(String(current.status)) && Date.now() < deadline) {
      await sleep(POLL_INTERVAL_MS, signal);
      const res = await fetch(pollUrl, { method: "GET", headers: pollHeaders, signal });
      if (!res.ok) throw new Error(`poll failed with status ${res.status}`);
      current = asRecord(await res.json());
    }
    return current;
  }

  async execute({ model, body, stream, credentials, signal, upstreamExtraHeaders }: ExecuteInput) {
    const url = this.buildUrl(model, stream, 0, credentials);
    const headers = this.buildHeaders(credentials, stream);
    mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);

    const payload = this.buildPayload(body);
    if (!payload) {
      return {
        response: errorResponse(400, "Replicate requests require at least one user message."),
        url,
        headers,
        transformedBody: body,
      };
    }
    const promptText = String(asRecord(payload.input).prompt || "");

    try {
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal,
      });

      if (!res.ok) {
        const detail = asRecord(await res.json().catch(() => ({}))).detail;
        return {
          response: errorResponse(
            res.status,
            `Replicate API failed with status ${res.status}${typeof detail === "string" ? `: ${detail}` : ""}`
          ),
          url,
          headers,
          transformedBody: payload,
        };
      }

      const prediction = await this.pollUntilDone(asRecord(await res.json()), headers, signal);

      if (prediction.status !== "succeeded") {
        const failed = prediction.status === "failed" || prediction.status === "canceled";
        const reason = typeof prediction.error === "string" ? `: ${prediction.error}` : "";
        return {
          response: errorResponse(
            failed ? 502 : 504,
            failed
              ? `Replicate prediction ${String(prediction.status)}${reason}`
              : "Replicate prediction did not finish in time"
          ),
          url,
          headers,
          transformedBody: payload,
        };
      }

      const content = outputToText(prediction.output);
      return {
        response: stream
          ? synthesizedStream(content, model)
          : jsonCompletion(content, model, promptText),
        url,
        headers,
        transformedBody: payload,
      };
    } catch (error) {
      if (signal?.aborted) throw error;
      const message = error instanceof Error ? error.message : String(error || "Unknown error");
      return {
        response: errorResponse(502, `Replicate fetch error: ${message}`),
        url,
        headers,
        transformedBody: payload,
      };
    }
  }
}

export default ReplicateExecutor;
