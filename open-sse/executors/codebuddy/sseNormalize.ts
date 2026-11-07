import type { ExecutorExecuteResult } from "../base.ts";

/**
 * CodeBuddy (CN + Intl) streams OpenAI-shaped `chat.completion.chunk` SSE with two
 * non-standard artefacts that strict OpenAI clients (SDK enum validation) reject:
 *  - `finish_reason: ""` on mid-stream chunks → `null` (the empty string is not terminal)
 *  - empty legacy `delta.function_call` shells (no name, no arguments) → dropped
 */

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isEmptyField(value: unknown): boolean {
  return value === null || value === undefined || value === "";
}

function normalizeChoice(choice: unknown): unknown {
  if (!isRecord(choice)) return choice;
  let next = choice;

  if (choice.finish_reason === "") {
    next = { ...next, finish_reason: null };
  }

  const delta = next.delta;
  if (isRecord(delta) && isRecord(delta.function_call)) {
    const { name, arguments: args } = delta.function_call;
    if (isEmptyField(name) && isEmptyField(args)) {
      const restDelta = { ...delta };
      delete restDelta.function_call;
      next = { ...next, delta: restDelta };
    }
  }

  return next;
}

/** Normalise one parsed chunk. Returns the same reference when nothing changed. */
export function normalizeChatChunk(chunk: unknown): unknown {
  if (!isRecord(chunk) || !Array.isArray(chunk.choices)) return chunk;

  let changed = false;
  const choices = chunk.choices.map((choice) => {
    const next = normalizeChoice(choice);
    if (next !== choice) changed = true;
    return next;
  });

  return changed ? { ...chunk, choices } : chunk;
}

/** Rewrite one SSE line (without its `\n`). Untouched lines are returned verbatim. */
function rewriteSseLine(line: string): string {
  if (!line.startsWith("data:")) return line;
  const hasCr = line.endsWith("\r");
  const payload = (hasCr ? line.slice(0, -1) : line).slice(5).trim();
  if (!payload || payload === "[DONE]") return line;
  try {
    const parsed: unknown = JSON.parse(payload);
    const normalized = normalizeChatChunk(parsed);
    if (normalized === parsed) return line;
    return `data: ${JSON.stringify(normalized)}${hasCr ? "\r" : ""}`;
  } catch {
    return line;
  }
}

/** Line-buffered TransformStream that rewrites SSE `data:` JSON lines via normalizeChatChunk. */
export function createSseNormalizeTransform(): TransformStream<Uint8Array, Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      if (lines.length === 0) return;
      controller.enqueue(encoder.encode(lines.map((line) => `${rewriteSseLine(line)}\n`).join("")));
    },
    flush(controller) {
      buffer += decoder.decode();
      if (buffer) controller.enqueue(encoder.encode(rewriteSseLine(buffer)));
      buffer = "";
    },
  });
}

function normalizeSseResponse(response: Response): Response {
  const contentType = response.headers.get("content-type") || "";
  if (!response.ok || !response.body || !contentType.includes("text/event-stream")) {
    return response;
  }
  const headers = new Headers(response.headers);
  // The rewrite can change the byte length.
  headers.delete("content-length");
  return new Response(response.body.pipeThrough(createSseNormalizeTransform()), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/** Apply SSE normalisation to an executor result; non-OK / non-SSE results pass through. */
export function normalizeCodeBuddyResult(result: ExecutorExecuteResult): ExecutorExecuteResult {
  if (result instanceof Response) return normalizeSseResponse(result);
  const response = normalizeSseResponse(result.response);
  return response === result.response ? result : { ...result, response };
}
