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
    const isFailure =
      type === "error" ||
      type === "response.failed" ||
      (response.status === "failed" && Object.keys(nested).length > 0) ||
      (!type && Object.keys(direct).length > 0);
    if (isFailure) {
      // A partial candidate for the fake-output signature is output too; an
      // unrelated later failure must not replace it.
      if (outputText) return { kind: "handoff" };
      const error = Object.keys(direct).length ? direct : nested;
      const message =
        typeof error.message === "string"
          ? error.message
          : typeof event.message === "string"
            ? event.message
            : "";
      const code = typeof error.code === "string" ? error.code.toLowerCase() : "";
      const errorType = typeof error.type === "string" ? error.type.toLowerCase() : "";
      const status =
        error.status_code ??
        error.status ??
        response.status_code ??
        event.status_code ??
        event.status;
      if (typeof status === "number" && status >= 400 && status < 500) return { kind: "handoff" };
      // Input/quota/auth verdicts beat diagnostic prose that quotes overload.
      const concreteNonCapacity = [code, errorType].some(
        (value) => !genericCodes.has(value) && !capacityCodes.has(value)
      );
      const unavailable = CODEX_SSE_MODEL_UNAVAILABLE_PATTERNS.find((pattern) =>
        message.toLowerCase().includes(pattern)
      );
      if (unavailable)
        return { kind: "failure", matched: unavailable, message, modelUnavailable: true };
      if (concreteNonCapacity) return { kind: "handoff" };
      const matched = capacityCodes.has(code)
        ? code
        : capacityCodes.has(errorType)
          ? errorType
          : message.toLowerCase().includes(capacityMessage)
            ? capacityMessage
            : null;
      return matched
        ? { kind: "failure", matched, message: message || matched }
        : { kind: "handoff" };
    }
    if (type === "response.output_text.delta" && typeof event.delta === "string") {
      outputText += event.delta;
      if (outputText.trim() && !overloadText.startsWith(outputText.trim().toLowerCase())) {
        return { kind: "handoff" };
      }
    } else if (
      typeof type === "string" &&
      type.startsWith("response.") &&
      type.endsWith(".delta") &&
      typeof event.delta === "string" &&
      event.delta.length > 0
    ) {
      return { kind: "handoff" };
    }
    if (type === "response.completed") {
      return outputText.trim().toLowerCase() === overloadText
        ? {
            kind: "failure",
            matched: CODEX_OVERLOADED_OUTPUT_MATCH,
            message: CODEX_OVERLOADED_OUTPUT_MESSAGE,
          }
        : { kind: "handoff" };
    }
  }
  if (streamEnded && outputText.trim().toLowerCase() === overloadText) {
    return {
      kind: "failure",
      matched: CODEX_OVERLOADED_OUTPUT_MATCH,
      message: CODEX_OVERLOADED_OUTPUT_MESSAGE,
    };
  }
  return null;
}
