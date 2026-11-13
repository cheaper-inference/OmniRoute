/**
 * Opt-in (OMNIROUTE_COMBO_EMPTY_200_FAILOVER, default off): a non-streaming 200 that
 * carries no output and counted no output token fails the combo target, so the
 * combo tries the next member instead of ending the turn with an empty message.
 * Streaming turns keep their own opt-in recovery (FLUSH_EMPTY_RETRY_ENABLED).
 */

const SPENT_BUDGET_TOKENS = 1024;

type Json = Record<string, unknown>;

const isRecord = (v: unknown): v is Json => !!v && typeof v === "object" && !Array.isArray(v);
const isBlank = (v: unknown) => typeof v !== "string" || v.trim() === "";
const count = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);

export function isEmpty200FailoverEnabled(env: Record<string, string | undefined> = process.env) {
  return ["1", "true", "yes"].includes(
    (env.OMNIROUTE_COMBO_EMPTY_200_FAILOVER ?? "").toLowerCase()
  );
}

const partIsEmpty = (part: unknown) =>
  !isRecord(part) || (isBlank(part.text) && isBlank(part.refusal) && part.type !== "image_url");

function chatSaid(message: Json): boolean {
  const content = message.content;
  const text = Array.isArray(content) ? !content.every(partIsEmpty) : !isBlank(content);
  const calls = Array.isArray(message.tool_calls) && message.tool_calls.length > 0;
  return (
    text ||
    calls ||
    !isBlank(message.refusal) ||
    !isBlank(message.reasoning_content ?? message.reasoning)
  );
}

function chatFailure(json: Json, trusted: boolean): string | null {
  const choice = Array.isArray(json.choices) ? json.choices[0] : null;
  const message = isRecord(choice) && isRecord(choice.message) ? choice.message : null;
  if (!message || chatSaid(message)) return null;
  const spent = isRecord(json.usage) ? count(json.usage.completion_tokens) : null;
  if (choice.finish_reason === "length" && spent !== null && spent > SPENT_BUDGET_TOKENS)
    return `void 200: finish_reason length after ${spent} tokens with no text or tool call`;
  if (trusted && choice.finish_reason === "stop" && spent === 0)
    return "empty 200: stop with no output token and no content";
  return null;
}

function claudeFailure(json: Json): string | null {
  const stop = json.stop_reason;
  if (stop !== "end_turn" && stop !== "stop_sequence") return null;
  if (!Array.isArray(json.content) || !json.content.every(partIsEmpty)) return null;
  const out = isRecord(json.usage) ? count(json.usage.output_tokens) : null;
  return out === 0 ? "empty 200: end_turn with no output token and no content" : null;
}

function responsesFailure(json: Json, trusted: boolean): string | null {
  if (!trusted || !Array.isArray(json.output)) return null;
  const silent = json.output.every(
    (item) =>
      isRecord(item) &&
      item.type === "message" &&
      (item.content as unknown[] | undefined)?.every?.(partIsEmpty) !== false
  );
  const out = isRecord(json.usage) ? count(json.usage.output_tokens) : null;
  return silent && out === 0 ? "empty 200: response with no output token and no content" : null;
}

function geminiFailure(json: Json): string | null {
  const candidate = Array.isArray(json.candidates) ? json.candidates[0] : null;
  if (!isRecord(candidate) || candidate.finishReason !== "STOP") return null;
  const parts = isRecord(candidate.content) ? candidate.content.parts : null;
  const empty =
    !Array.isArray(parts) ||
    parts.every((p) => !isRecord(p) || (isBlank(p.text) && !p.functionCall));
  return empty ? "empty STOP: candidate with no text and no function call" : null;
}

/** A failure reason for an empty 200 body, or null (flag off, or the body said something). */
export function emptyTurnFailure(json: Json, trusted: boolean): string | null {
  if (!isEmpty200FailoverEnabled()) return null;
  if (json.object === "response") return responsesFailure(json, trusted);
  if (json.type === "message") return claudeFailure(json);
  if (Array.isArray(json.candidates)) return geminiFailure(json);
  return chatFailure(json, trusted);
}
