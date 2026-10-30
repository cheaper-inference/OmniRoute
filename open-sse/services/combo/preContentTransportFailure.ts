import { hasOpenAIFinishReason, isKnownNonClaudeStreamPayload } from "../../utils/streamHelpers.ts";

const TRANSPORT_CODES = new Set(["ECONNRESET", "EPIPE", "UND_ERR_SOCKET", "UND_ERR_BODY_TIMEOUT"]);
const ABORT_CODES = new Set(["ABORT_ERR", "UND_ERR_ABORTED"]);

type ReadFailureDisposition = { kind: "abort" } | { kind: "transport"; code: string } | null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/** Inspect the whole bounded chain before accepting a transport code. */
export function classifyPreContentReadFailure(error: unknown): ReadFailureDisposition {
  const seen = new Set<object>();
  let current = error;
  let transportCode: string | null = null;
  for (let depth = 0; depth < 8; depth++) {
    try {
      if (!isRecord(current) || seen.has(current)) return null;
      seen.add(current);
      const name = current.name;
      if (name === "AbortError") return { kind: "abort" };
      const code = current.code;
      if (ABORT_CODES.has(code as string)) return { kind: "abort" };
      const causeCode = current.causeCode;
      if (ABORT_CODES.has(causeCode as string)) return { kind: "abort" };
      if ([name, code, causeCode].some((value) => value != null && typeof value !== "string"))
        return null;
      if (TRANSPORT_CODES.has(code as string)) transportCode ??= code as string;
      if (TRANSPORT_CODES.has(causeCode as string)) transportCode ??= causeCode as string;
      const cause = current.cause;
      if (cause == null) return transportCode ? { kind: "transport", code: transportCode } : null;
      current = cause;
    } catch {
      return null;
    }
  }
  return null;
}

export function safeStreamReadMessage(error: unknown): string {
  try {
    return String(error instanceof Error ? error.message : error);
  } catch {
    return "Unreadable stream error";
  }
}

/** Additional retry vetoes only: do not broaden the validator's EOF rules. */
export function hasTransportReplayBoundary(parsed: unknown, eventType: string): boolean {
  if (eventType.startsWith("content_block_") || eventType === "message_stop") return true;
  if (
    [
      "response.completed",
      "response.done",
      "response.incomplete",
      "response.cancelled",
      "response.canceled",
    ].includes(eventType)
  )
    return true;
  if (!isRecord(parsed)) return false;
  if (isKnownNonClaudeStreamPayload(parsed, eventType) || hasOpenAIFinishReason(parsed))
    return true;
  if (eventType === "message_delta" && isRecord(parsed.delta) && parsed.delta.stop_reason != null)
    return true;
  if (
    parsed.usage &&
    typeof parsed.usage === "object" &&
    (!Array.isArray(parsed.choices) || parsed.choices.length === 0) &&
    !eventType.startsWith("response.")
  )
    return true;
  return [parsed, parsed.response].some(
    (payload) =>
      isRecord(payload) &&
      Array.isArray(payload.candidates) &&
      payload.candidates.some(
        (candidate: unknown) =>
          isRecord(candidate) &&
          typeof candidate.finishReason === "string" &&
          candidate.finishReason.length > 0 &&
          candidate.finishReason !== "FINISH_REASON_UNSPECIFIED"
      )
  );
}

/**
 * Whether an `error` field carries a real failure signal. A key-presence check
 * (`!= null`) false-positives on benign values some backends emit on every
 * chunk (`{}`, `""`, `false`, `0`) — e.g. tool-call turns where a chunk with
 * real tool_calls content also carries `"error": {}`. Only substantive values
 * are treated as upstream failures.
 */
function isSubstantiveError(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "object" && !Array.isArray(value)) {
    return Object.keys(value as Record<string, unknown>).length > 0;
  }
  return value === true;
}

export function isStreamingUpstreamError(parsed: unknown, eventType: string): boolean {
  if (eventType === "response.failed" || eventType === "error") return true;
  if (!isRecord(parsed)) return false;
  if (isSubstantiveError(parsed.error)) return true;

  const nestedResponse = isRecord(parsed.response) ? parsed.response : null;
  return nestedResponse?.status === "failed" && nestedResponse.error != null;
}

// Response identities carry only the shared veto; headers cannot establish it.
const replayVetoes = new WeakMap<Response, { observed: boolean }>();

export function hasObservedTransportReplayVeto(response: Response): boolean {
  return replayVetoes.get(response)?.observed === true;
}

export function cloneForQuality(response: Response): Response {
  try {
    const clone = response.clone();
    const state = replayVetoes.get(response);
    if (state) replayVetoes.set(clone, state);
    return clone;
  } catch {
    return response;
  }
}

/** Inspect only completed normalized data; keep the original payload type for content checks. */
export function inspectTransportReplayPayload(
  payload: string,
  eventType: string
): { consumed: boolean; veto: boolean } {
  if (payload.trim() === "[DONE]") return { consumed: false, veto: true };
  try {
    const parsed: unknown = JSON.parse(payload);
    if (!parsed) return { consumed: false, veto: false };
    const type =
      (isRecord(parsed) && typeof parsed.type === "string" ? parsed.type : "") || eventType;
    return {
      consumed: true,
      veto: isStreamingUpstreamError(parsed, type) || hasTransportReplayBoundary(parsed, type),
    };
  } catch {
    return { consumed: false, veto: false };
  }
}

export function createTransportReplayObserver(response: Response): () => void {
  const state = replayVetoes.get(response) ?? { observed: false };
  replayVetoes.set(response, state);
  return () => {
    state.observed = true;
  };
}
