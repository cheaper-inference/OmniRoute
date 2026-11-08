/**
 * One-shot repair for malformed Kiro `tool_call` wrappers.
 *
 * Kiro sometimes emits the MCP wrapper tool `tool_call` without `input.name` or
 * `input.arguments`. The SSE transform detects that once the wrapper input is
 * complete and, without repair, ends the turn with `invalid_kiro_tool_call`.
 *
 * The repair runs inside the response stream, so the executor still hands the
 * stream off on the first role-only chunk (#15260) and TTFT is unchanged:
 *
 * - Chunks are forwarded as they arrive. Role-only start chunks do not count as
 *   output; text, reasoning, tool calls and finish chunks do.
 * - A malformed wrapper seen before any output is suppressed, the first upstream
 *   is cancelled, and the request is re-sent once with a corrective instruction
 *   appended to the current user message. The retry's role-only chunk is dropped
 *   because the client already received one.
 * - A malformed wrapper after visible output (text or reasoning) cannot be
 *   replayed invisibly, so it surfaces as `invalid_kiro_tool_call` as before.
 * - A retry that fails (non-OK status, network error, or a second malformed
 *   wrapper) ends the stream with `kiro_tool_call_repair_retry_failed`. Headers
 *   are already sent at that point, so a non-OK retry cannot reach account
 *   fallback; the turn fails exactly as it did before the repair existed.
 *
 * Gated by the KIRO_TOOL_CALL_REPAIR_ENABLED feature flag (on by default).
 */
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import type { ExecutorLog } from "../base.ts";
import { encodeSse } from "../kiroToolCallValidation.ts";

export const KIRO_TOOL_CALL_REPAIR_FLAG = "KIRO_TOOL_CALL_REPAIR_ENABLED";
export const KIRO_TOOL_CALL_REPAIR_RETRY_FAILED_CODE = "kiro_tool_call_repair_retry_failed";
const MAX_REASON_CHARS = 300;
const KIRO_TOOL_CALL_REPAIR_INSTRUCTION = [
  "Retry the previous response because its Kiro tool_call wrapper was malformed.",
  "If you use the wrapper tool named tool_call, its input must be a JSON object with a non-empty string name and an arguments field.",
  "Do not emit a tool_call wrapper without input.name and input.arguments.",
].join(" ");

export function isKiroToolCallRepairEnabled(): boolean {
  try {
    return isFeatureFlagEnabled(KIRO_TOOL_CALL_REPAIR_FLAG);
  } catch {
    // An unreadable flag store keeps the definition default (on).
    return true;
  }
}

type JsonRecord = Record<string, unknown>;

const asRecord = (value: unknown): JsonRecord | null =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;

/**
 * Copy the translated Kiro payload and append the corrective instruction to
 * `conversationState.currentMessage.userInputMessage.content`, where the
 * `<thinking_mode>` hint also lives. Only the validation message is echoed
 * (capped at 300 chars); tool arguments never are.
 */
export function buildKiroToolCallRepairPayload(transformedBody: unknown, reason: string): unknown {
  const repaired = structuredClone(transformedBody) as unknown;
  const userInput = asRecord(
    asRecord(asRecord(asRecord(repaired)?.conversationState)?.currentMessage)?.userInputMessage
  );
  if (!userInput) return repaired;
  const capped = String(reason || "invalid tool_call payload").slice(0, MAX_REASON_CHARS);
  const instruction = `${KIRO_TOOL_CALL_REPAIR_INSTRUCTION} Previous validation error: ${capped}`;
  const content = typeof userInput.content === "string" ? userInput.content : "";
  userInput.content = content ? `${content}\n\n${instruction}` : instruction;
  return repaired;
}

const decoder = new TextDecoder();

function parseSseData(chunk: Uint8Array): JsonRecord[] {
  const out: JsonRecord[] = [];
  for (const line of decoder.decode(chunk).split("\n")) {
    if (!line.startsWith("data: ")) continue;
    const data = line.slice(6).trim();
    if (!data || data === "[DONE]") continue;
    try {
      const parsed = asRecord(JSON.parse(data));
      if (parsed) out.push(parsed);
    } catch {
      // Not JSON: treat as output so it is never swallowed.
      out.push({ raw: data });
    }
  }
  return out;
}

/** True unless every data payload is a role-only `chat.completion.chunk`. */
export function isMeaningfulKiroSseChunk(chunk: Uint8Array): boolean {
  return parseSseData(chunk).some((payload) => {
    const choices = Array.isArray(payload.choices) ? payload.choices : null;
    if (!choices) return true;
    return choices.some((choice) => {
      const c = asRecord(choice);
      if (!c) return true;
      if (c.finish_reason !== null && c.finish_reason !== undefined) return true;
      const delta = asRecord(c.delta) ?? {};
      return Object.keys(delta).some((key) => key !== "role");
    });
  });
}

function readChunkId(chunk: Uint8Array): string | undefined {
  const id = parseSseData(chunk).find((payload) => typeof payload.id === "string")?.id;
  return typeof id === "string" ? id : undefined;
}

function repairErrorFrame(message: string): Uint8Array {
  const error = {
    error: {
      message,
      type: "invalid_request_error",
      code: KIRO_TOOL_CALL_REPAIR_RETRY_FAILED_CODE,
    },
  };
  return encodeSse(`data: ${JSON.stringify(error)}\n\ndata: [DONE]\n\n`);
}

export type KiroSseTransform = (
  upstream: Response,
  opts: { onInvalidToolCall: (message: string) => boolean; responseId?: string }
) => Response;

export function createKiroToolCallRepairStream(params: {
  upstream: Response;
  transform: KiroSseTransform;
  retry: (payload: unknown, signal: AbortSignal) => Promise<Response>;
  transformedBody: unknown;
  signal?: AbortSignal | null;
  log?: ExecutorLog | null;
}): Response {
  const { upstream, transform, retry, transformedBody, signal, log } = params;
  const retryAbort = new AbortController();
  let phase: "first" | "retry" | "done" = "first";
  let cancelled = false;
  let sawOutput = false;
  let invalidReason: string | null = null;
  let responseId: string | undefined;

  const openAttempt = (response: Response) =>
    transform(response, {
      responseId,
      onInvalidToolCall: (message) => {
        if (sawOutput) return false;
        invalidReason = message;
        return true;
      },
    }).body!.getReader();

  let reader = openAttempt(upstream);

  const startRetry = async (): Promise<string | null> => {
    const reason = invalidReason ?? "";
    log?.warn?.("KIRO", "malformed tool_call wrapper before any output; retrying once");
    invalidReason = null;
    phase = "retry";
    let response: Response;
    try {
      const retrySignal = signal ? AbortSignal.any([signal, retryAbort.signal]) : retryAbort.signal;
      response = await retry(buildKiroToolCallRepairPayload(transformedBody, reason), retrySignal);
    } catch (error) {
      if (signal?.aborted || retryAbort.signal.aborted) throw error;
      return "Kiro tool_call repair retry failed";
    }
    if (cancelled || !response.ok) {
      await response.body?.cancel().catch(() => {});
      return `Kiro tool_call repair retry failed with HTTP ${response.status}`;
    }
    reader = openAttempt(response);
    return null;
  };

  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      while (phase !== "done") {
        const { done, value } = await reader.read();
        if (cancelled) return;
        if (!done) {
          const meaningful = isMeaningfulKiroSseChunk(value);
          if (!sawOutput && !meaningful && phase === "retry") continue;
          if (phase === "first") responseId ??= readChunkId(value);
          if (meaningful) sawOutput = true;
          controller.enqueue(value);
          return;
        }
        if (invalidReason === null) break;
        if (phase === "first") {
          const failure = await startRetry();
          if (cancelled) return;
          if (failure === null) continue;
          controller.enqueue(repairErrorFrame(failure));
        } else {
          controller.enqueue(repairErrorFrame(invalidReason));
        }
        break;
      }
      phase = "done";
      controller.close();
    },
    async cancel(reason) {
      cancelled = true;
      phase = "done";
      retryAbort.abort(reason);
      await reader.cancel(reason).catch(() => {});
    },
  });

  return new Response(body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
