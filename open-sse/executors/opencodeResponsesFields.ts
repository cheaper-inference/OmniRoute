/**
 * Pure field normalizers for the Responses-API body, moved out of opencode.ts to keep that
 * file under its frozen size ceiling. Behavior unchanged.
 */
import { randomUUID } from "crypto";

export function clampResponsesCallId(callId: unknown): string {
  const s = String(callId || "").trim();
  return s || `call_${randomUUID().replace(/-/g, "").slice(0, 16)}`;
}

export function coerceResponsesArguments(args: unknown): string {
  if (typeof args === "string") return args;
  if (args && typeof args === "object") {
    try {
      return JSON.stringify(args);
    } catch {
      return "{}";
    }
  }
  return "{}";
}

export function coerceResponsesOutput(output: unknown): string {
  if (typeof output === "string") return output;
  if (output && typeof output === "object") {
    try {
      return JSON.stringify(output);
    } catch {
      return "";
    }
  }
  return String(output ?? "");
}

/**
 * Move a legacy max_tokens/max_completion_tokens value to the Responses API's
 * max_output_tokens field, in place. Extracted from sanitizeResponsesBody to
 * keep that function under the max-lines-per-function ratchet.
 */
export function normalizeResponsesTokenFields(body: Record<string, unknown>): void {
  if (body.max_output_tokens === undefined) {
    if (body.max_completion_tokens !== undefined) {
      body.max_output_tokens = body.max_completion_tokens;
    } else if (body.max_tokens !== undefined) {
      body.max_output_tokens = body.max_tokens;
    }
  }
  delete body.max_tokens;
  delete body.max_completion_tokens;
}

/**
 * Fold a legacy reasoning_effort field into the Responses API's reasoning
 * object, in place. Extracted from sanitizeResponsesBody (see above).
 */
export function normalizeResponsesReasoningField(body: Record<string, unknown>): void {
  normalizeOpencodeThinking(body, "openai-responses");
  if (body.reasoning_effort !== undefined && body.reasoning === undefined) {
    body.reasoning = { effort: body.reasoning_effort, summary: "auto" };
  }
  if (body.reasoning && typeof body.reasoning === "object" && !Array.isArray(body.reasoning)) {
    const r = body.reasoning as Record<string, unknown>;
    if (!r.summary) r.summary = "auto";
  }
  delete body.reasoning_effort;
}

/**
 * OpenCode Console rejects raw `thinking` on non-Claude formats (#19315).
 * Fold or remove any Claude/adaptive `thinking` field for non-Claude formats.
 */
export function normalizeOpencodeThinking(
  body: Record<string, unknown>,
  format: string | undefined
): void {
  if (format === "claude" || !body.thinking) return;
  const thinking = body.thinking as Record<string, unknown> | undefined;
  if (format === "openai-responses") {
    if (thinking?.type !== "disabled" && body.reasoning === undefined) {
      body.reasoning = { effort: "medium", summary: "auto" };
    }
  } else if (body.reasoning_effort === undefined) {
    body.reasoning_effort = thinking?.type === "disabled" ? "none" : "medium";
  }
  delete body.thinking;
}
