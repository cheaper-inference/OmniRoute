/**
 * Opt-in guard (OMNIROUTE_REQUIRED_TOOL_GUARD, default off) for non-streaming replies. When the
 * client forced a tool call (tool_choice "required", a named tool, or Claude "any") and the
 * finished reply carries no tool call, the turn is a contract break. It is reported as one
 * `required_tool_not_called` error, instead of a successful plain-text answer.
 *
 * Never fires for: a reply that was cut off or refused, an error, a request with no tools, a
 * request that declares a server-side tool, or a turn where OmniRoute ran the tools itself.
 */

type Json = Record<string, unknown>;
const isRecord = (v: unknown): v is Json => !!v && typeof v === "object" && !Array.isArray(v);

export const REQUIRED_TOOL_NOT_CALLED = "required_tool_not_called";

export function isRequiredToolGuardEnabled(env: Record<string, string | undefined> = process.env) {
  return ["1", "true", "yes"].includes((env.OMNIROUTE_REQUIRED_TOOL_GUARD ?? "").toLowerCase());
}

/** True when the request forces a tool call and declares only client tools. */
function forcesClientTool(request: unknown): boolean {
  if (!isRecord(request) || !Array.isArray(request.tools) || request.tools.length === 0)
    return false;
  // A tool with its own type (web_search, code_execution, ...) runs on the provider's side.
  const clientOnly = request.tools.every(
    (t) => isRecord(t) && (!t.type || t.type === "function" || t.type === "custom")
  );
  const choice = request.tool_choice;
  const forced =
    choice === "required" ||
    (isRecord(choice) && ["function", "tool", "any"].includes(String(choice.type)));
  return clientOnly && forced;
}

const text = (v: unknown) => typeof v === "string" && v.trim() !== "";

function chatMissedTool(body: Json): boolean {
  const choice = Array.isArray(body.choices) ? body.choices[0] : null;
  const message = isRecord(choice) && isRecord(choice.message) ? choice.message : null;
  if (!message || choice.finish_reason !== "stop") return false;
  const calls = Array.isArray(message.tool_calls) && message.tool_calls.length > 0;
  return !calls && !isRecord(message.function_call) && !text(message.refusal);
}

function responsesMissedTool(body: Json): boolean {
  if (body.status !== "completed" || !Array.isArray(body.output)) return false;
  return body.output.every((item) => {
    if (!isRecord(item) || item.type === "reasoning") return isRecord(item);
    if (item.type !== "message") return false; // function_call, web_search_call, ...
    const parts = Array.isArray(item.content) ? item.content : [];
    return !parts.some((p) => isRecord(p) && p.type === "refusal");
  });
}

function claudeMissedTool(body: Json): boolean {
  if (body.stop_reason !== "end_turn" && body.stop_reason !== "stop_sequence") return false;
  const blocks = Array.isArray(body.content) ? body.content : [];
  return !blocks.some((b) => isRecord(b) && /(^|_)tool_use$/.test(String(b.type)));
}

/**
 * `request` is the client body, `reply` the finished non-streaming reply in the client's own
 * format. Returns the malformed-reason code, or null when the reply is fine.
 */
export function detectRequiredToolNotCalled(
  request: unknown,
  reply: unknown,
  serverToolsRan = false
): typeof REQUIRED_TOOL_NOT_CALLED | null {
  if (serverToolsRan || !isRecord(reply) || !forcesClientTool(request)) return null;
  const missed =
    reply.object === "response"
      ? responsesMissedTool(reply)
      : reply.type === "message"
        ? claudeMissedTool(reply)
        : chatMissedTool(reply);
  return missed ? REQUIRED_TOOL_NOT_CALLED : null;
}

/** The flag-gated form the non-streaming path calls. */
export function requiredToolGuardReason(request: unknown, reply: unknown, serverToolsRan: boolean) {
  return isRequiredToolGuardEnabled()
    ? detectRequiredToolNotCalled(request, reply, serverToolsRan)
    : null;
}
