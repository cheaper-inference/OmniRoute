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
 * OpenCode Console rejects a raw `thinking` field on the OpenAI lanes (#19315): fold it into the
 * lane's own reasoning control, without overriding one the request already carries. Run it after
 * the model-suffix effort is applied so a `-high` alias keeps its tier.
 */
export function normalizeOpencodeThinking(
  body: Record<string, unknown>,
  format: string | undefined
): void {
  if (!body.thinking || (format !== "openai" && format !== "openai-responses")) return;
  const thinking = body.thinking as Record<string, unknown>;
  if (format === "openai-responses") {
    if (thinking.type !== "disabled" && body.reasoning === undefined) {
      body.reasoning = { effort: "medium", summary: "auto" };
    }
  } else if (body.reasoning_effort === undefined) {
    body.reasoning_effort = thinking.type === "disabled" ? "none" : "medium";
  }
  delete body.thinking;
}
