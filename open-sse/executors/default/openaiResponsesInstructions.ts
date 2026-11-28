/**
 * On the OpenAI API Responses path (`provider === "openai"`), GPT-6.2 models do
 * not include the top-level `instructions` field in the automatic prompt-cache
 * prefix — only `input` (+ `tools`) is cached (#20846, see also #20649/#20651).
 *
 * Both Chat Completions requests translated by `openaiToOpenAIResponsesRequest`
 * (which hoists the first system/developer message into `instructions`) and
 * native `/v1/responses` requests carrying top-level `instructions` would
 * otherwise re-bill the system prompt on every turn.
 *
 * When a Responses-shaped body (no `messages`) carries a non-empty string
 * `instructions` and is not a stateful continuation (`previous_response_id` or
 * `conversation`, where stored upstream input would repeat the prompt on later
 * turns), move `instructions` to the front of `input` as a `developer` message
 * item and remove `instructions`.
 */
type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function hasStatefulResponsesContinuation(body: JsonRecord): boolean {
  const prevId = body.previous_response_id;
  if (typeof prevId === "string" && prevId.trim().length > 0) return true;
  if (prevId !== undefined && prevId !== null && typeof prevId !== "string") return true;

  const conversation = body.conversation;
  if (typeof conversation === "string" && conversation.trim().length > 0) return true;
  if (isRecord(conversation)) return true;

  return false;
}

function toInputItems(input: unknown): unknown[] {
  if (Array.isArray(input)) return input;
  if (typeof input === "string") {
    return input.length > 0
      ? [
          {
            type: "message",
            role: "user",
            content: [{ type: "input_text", text: input }],
          },
        ]
      : [];
  }
  if (isRecord(input)) return [input];
  return [];
}

export function hoistOpenAIResponsesInstructionsToInput<T>(body: T): T {
  if (!isRecord(body)) return body;
  if (Array.isArray(body.messages)) return body;
  if (body.input === undefined) return body;
  if (hasStatefulResponsesContinuation(body)) return body;

  const instructions = body.instructions;
  if (typeof instructions !== "string") {
    return body;
  }
  if (instructions.trim().length === 0) {
    const { instructions: _dropped, ...rest } = body;
    return rest as T;
  }

  const developerItem = {
    type: "message",
    role: "developer",
    content: [{ type: "input_text", text: instructions }],
  };

  const { instructions: _dropped, ...rest } = body;
  return {
    ...rest,
    input: [developerItem, ...toInputItems(body.input)],
  } as T;
}
