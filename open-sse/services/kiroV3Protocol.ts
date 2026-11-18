/**
 * Opt-in Kiro CLI 3.x runtime protocol support.
 *
 * Kiro 3.4.0 replaced the legacy `GenerateAssistantResponse` wire shape:
 *   - endpoint: POST https://runtime.us-east-1.kiro.dev/ (root, not /generateAssistantResponse)
 *   - body: snake_case `user_input_message` / `history`, not `conversationState`
 *   - headers: aws-sdk-rust user agent + `x-amzn-kiro-*` retry headers
 *
 * The legacy shape is still what the existing Kiro IDE / Builder ID accounts use, so this module
 * is gated behind `providerSpecificData.useV3Protocol = true`. Nothing changes for a connection
 * that does not opt in.
 */

export const KIRO_V3_PROTOCOL_FLAG = "useV3Protocol";

export function isKiroV3Protocol(credentials: unknown): boolean {
  const data = (credentials as { providerSpecificData?: Record<string, unknown> } | null)
    ?.providerSpecificData;
  return data?.[KIRO_V3_PROTOCOL_FLAG] === true;
}

type LegacyTool = Record<string, unknown>;
type LegacyTurn = Record<string, unknown>;
type LegacyUserMessage = Record<string, unknown>;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function legacyToolsToV3(tools: unknown): LegacyTool[] | null {
  if (!Array.isArray(tools) || tools.length === 0) return null;
  const mapped = tools.map((entry) => {
    const legacySpec = asRecord(asRecord(entry)?.toolSpecification);
    if (!legacySpec) return entry as LegacyTool;
    const legacySchema = asRecord(legacySpec.inputSchema);
    const spec: Record<string, unknown> = {
      name: legacySpec.name,
      description: legacySpec.description,
    };
    if (legacySchema) spec.input_schema = legacySchema;
    return { ToolSpecification: spec };
  });
  return mapped as LegacyTool[];
}

function legacyToolResultsToV3(results: unknown): LegacyTool[] | null {
  if (!Array.isArray(results) || results.length === 0) return null;
  return results.map((entry) => {
    const record = asRecord(entry);
    if (!record || !("toolUseId" in record)) return entry as LegacyTool;
    const { toolUseId, ...rest } = record;
    return { tool_use_id: toolUseId, ...rest };
  }) as LegacyTool[];
}

function buildV3Context(
  userMessage: LegacyUserMessage,
  includeEnvironment: boolean
): Record<string, unknown> {
  const legacyContext = asRecord(userMessage.userInputMessageContext);
  const context: Record<string, unknown> = {
    env_state: includeEnvironment
      ? {
          current_working_directory: "",
          environment_variables: [],
          operating_system: "linux",
        }
      : undefined,
    git_state: null,
    tool_results: legacyToolResultsToV3(legacyContext?.toolResults),
    tools: legacyToolsToV3(legacyContext?.tools),
  };
  if (!context.env_state) delete context.env_state;
  return context;
}

function legacyUserTurnToV3(turn: LegacyTurn, includeEnvironment: boolean): LegacyTurn | null {
  const user = asRecord(turn.userInputMessage);
  if (!user) return null;
  const images = Array.isArray(user.images) ? user.images : null;
  return {
    UserInputMessage: {
      content: user.content ?? "",
      images,
      model_id: user.modelId ?? null,
      user_input_message_context: buildV3Context(user, includeEnvironment),
      user_intent: null,
    },
  };
}

function legacyAssistantTurnToV3(turn: LegacyTurn): LegacyTurn | null {
  const assistant = asRecord(turn.assistantResponseMessage);
  if (!assistant) return null;
  const result: Record<string, unknown> = { content: assistant.content ?? "" };
  if (Array.isArray(assistant.toolUses) && assistant.toolUses.length > 0) {
    result.tool_uses = assistant.toolUses.map((entry) => {
      const use = asRecord(entry);
      if (!use || !("toolUseId" in use)) return entry;
      const { toolUseId, ...rest } = use;
      return { tool_use_id: toolUseId, ...rest };
    });
  }
  return { AssistantResponseMessage: result };
}

/**
 * Convert the payload produced by openai-to-kiro into the Kiro CLI 3.x wire shape.
 * Unknown/legacy-only fields (`inferenceConfig`, `additionalModelRequestFields`, `profileArn`,
 * `_kiroSynthesizedToolNames`) are intentionally dropped: the CLI 3.x surface rejects unknown
 * top-level fields.
 */
export function toKiroV3Payload(legacy: Record<string, unknown>): Record<string, unknown> {
  const state = asRecord(legacy.conversationState);
  const current = asRecord(state?.currentMessage);
  const currentUser = asRecord(current?.userInputMessage);
  const history = Array.isArray(state?.history) ? state.history : [];

  const convertedHistory = history
    .map((entry) => {
      const turn = asRecord(entry);
      if (!turn) return null;
      return legacyUserTurnToV3(turn, false) ?? legacyAssistantTurnToV3(turn);
    })
    .filter((turn): turn is LegacyTurn => turn !== null);

  const userInputMessage: Record<string, unknown> = {
    content: currentUser?.content ?? "",
    images: Array.isArray(currentUser?.images) ? currentUser.images : null,
    model_id: currentUser?.modelId ?? null,
    user_input_message_context: buildV3Context(currentUser ?? {}, true),
    user_intent: null,
  };

  return {
    agent_continuation_id: null,
    conversation_id: state?.conversationId ?? "",
    history: convertedHistory,
    user_input_message: userInputMessage,
  };
}

/** Headers captured from a live `kiro-cli 3.4.0` inference request (via mitmdump). */
export function getKiroV3RuntimeHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/x-amz-json-1.0",
    "User-Agent":
      "aws-sdk-rust/1.6.0 ua/2.1 api/codewhispererstreaming/0.1.19636 os/linux " +
      "lang/rust/1.94.1 md/appVersion-3.4.0 app/AmazonQ-For-CLI",
    "X-Amz-User-Agent":
      "aws-sdk-rust/1.6.0 ua/2.1 api/codewhispererstreaming/0.1.19636 os/linux " +
      "lang/rust/1.94.1 m/F app/AmazonQ-For-CLI",
    "X-Amzn-Codewhisperer-Optout": "false",
    "X-Amzn-Kiro-Attempt": "1;max=3",
    "X-Amzn-Kiro-Fallback": "0;max=0",
  };
}
