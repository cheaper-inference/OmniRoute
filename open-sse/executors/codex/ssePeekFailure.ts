import { completeCodexSseEvents } from "./ssePeekProgress.ts";
import { CODEX_SSE_MODEL_UNAVAILABLE_PATTERNS } from "./sseModelUnavailable.ts";
import {
  CODEX_OVERLOADED_OUTPUT_MATCH,
  CODEX_OVERLOADED_OUTPUT_MESSAGE,
} from "./sseOverloadedOutput.ts";

type JsonRecord = Record<string, unknown>;
const record = (value: unknown): JsonRecord =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
const capacityCodes = new Set(["server_is_overloaded", "service_unavailable_error"]);
const genericCodes = new Set(["", "error", "server_error", "upstream_error", "api_error"]);
const capacityMessage = "selected model is at capacity";
const overloadText = CODEX_OVERLOADED_OUTPUT_MESSAGE.toLowerCase();

type Decision =
  | { kind: "failure"; matched: string; message: string; modelUnavailable?: boolean }
  | { kind: "handoff" };

const lowerString = (value: unknown): string =>
  typeof value === "string" ? value.toLowerCase() : "";
const hasKeys = (value: JsonRecord): boolean => Object.keys(value).length > 0;
const isOverloadOutput = (outputText: string): boolean =>
  outputText.trim().toLowerCase() === overloadText;
const overloadFailure = (): Decision => ({
  kind: "failure",
  matched: CODEX_OVERLOADED_OUTPUT_MATCH,
  message: CODEX_OVERLOADED_OUTPUT_MESSAGE,
});
const HANDOFF: Decision = { kind: "handoff" };

function isFailureEvent(
  event: JsonRecord,
  response: JsonRecord,
  direct: JsonRecord,
  nested: JsonRecord
): boolean {
  const type = event.type;
  return (
    type === "error" ||
    type === "response.failed" ||
    (response.status === "failed" && hasKeys(nested)) ||
    (!type && hasKeys(direct))
  );
}

function failureMessage(error: JsonRecord, event: JsonRecord): string {
  if (typeof error.message === "string") return error.message;
  return typeof event.message === "string" ? event.message : "";
}

function failureStatus(error: JsonRecord, response: JsonRecord, event: JsonRecord): unknown {
  return (
    error.status_code ?? error.status ?? response.status_code ?? event.status_code ?? event.status
  );
}

function capacityMatch(code: string, errorType: string, message: string): string | null {
  if (capacityCodes.has(code)) return code;
  if (capacityCodes.has(errorType)) return errorType;
  return message.toLowerCase().includes(capacityMessage) ? capacityMessage : null;
}

/** Classify one complete error declaration (the failure branch of the wire walk). */
function classifyFailureEvent(
  event: JsonRecord,
  response: JsonRecord,
  direct: JsonRecord,
  nested: JsonRecord
): Decision {
  const error = hasKeys(direct) ? direct : nested;
  const message = failureMessage(error, event);
  const code = lowerString(error.code);
  const errorType = lowerString(error.type);
  const status = failureStatus(error, response, event);
  if (typeof status === "number" && status >= 400 && status < 500) return HANDOFF;
  // Input/quota/auth verdicts beat diagnostic prose that quotes overload.
  const concreteNonCapacity = [code, errorType].some(
    (value) => !genericCodes.has(value) && !capacityCodes.has(value)
  );
  const unavailable = CODEX_SSE_MODEL_UNAVAILABLE_PATTERNS.find((pattern) =>
    message.toLowerCase().includes(pattern)
  );
  if (unavailable)
    return { kind: "failure", matched: unavailable, message, modelUnavailable: true };
  if (concreteNonCapacity) return HANDOFF;
  const matched = capacityMatch(code, errorType, message);
  return matched ? { kind: "failure", matched, message: message || matched } : HANDOFF;
}

function isNonEmptyDelta(type: unknown, event: JsonRecord): boolean {
  return (
    typeof type === "string" &&
    type.startsWith("response.") &&
    type.endsWith(".delta") &&
    typeof event.delta === "string" &&
    event.delta.length > 0
  );
}

/** Accumulated output text after this event; null when the stream is real output (handoff). */
function nextOutputText(type: unknown, event: JsonRecord, outputText: string): string | null {
  if (type === "response.output_text.delta" && typeof event.delta === "string") {
    const next = outputText + event.delta;
    const trimmed = next.trim();
    return trimmed && !overloadText.startsWith(trimmed.toLowerCase()) ? null : next;
  }
  return isNonEmptyDelta(type, event) ? null : outputText;
}

/** Only complete error declarations can trigger fallback. Walk in wire order:
 * output already delivered in the same network chunk cannot be replaced by a 503.
 * Keep the existing narrow, whole-output fake-200 overload exception.
 */
export function inspectCodexSsePeek(text: string, streamEnded = false): Decision | null {
  let outputText = "";
  for (const event of completeCodexSseEvents(text, streamEnded)) {
    const type = event.type;
    const response = record(event.response);
    const direct = record(event.error);
    const nested = record(response.error);
    if (isFailureEvent(event, response, direct, nested)) {
      // A partial candidate for the fake-output signature is output too; an
      // unrelated later failure must not replace it.
      if (outputText) return HANDOFF;
      return classifyFailureEvent(event, response, direct, nested);
    }
    const next = nextOutputText(type, event, outputText);
    if (next === null) return HANDOFF;
    outputText = next;
    if (type === "response.completed")
      return isOverloadOutput(outputText) ? overloadFailure() : HANDOFF;
  }
  return streamEnded && isOverloadOutput(outputText) ? overloadFailure() : null;
}
