/**
 * Opt-in support for the kiro-cli 3.x runtime wire shape.
 *
 * Verified against a captured kiro-cli 3.4.0 request (mitmdump):
 *   - endpoint: POST https://runtime.us-east-1.kiro.dev/ (root, not /generateAssistantResponse)
 *   - body: still camelCase `conversationState` + `profileArn`, with `chatTriggerType`,
 *     `agentTaskType` and `origin: KIRO_CLI` defaults the CLI always sends
 *   - headers: CLI 3.4.0 user agents + `x-amzn-kiro-*` retry headers + `X-Amz-Target`
 *
 * The legacy path is unchanged; this only applies when the connection sets
 * `providerSpecificData.useV3Protocol = true`.
 */
import { v4 as uuidv4 } from "uuid";

export const KIRO_V3_PROTOCOL_FLAG = "useV3Protocol";

export function isKiroV3Protocol(credentials: unknown): boolean {
  const data = (credentials as { providerSpecificData?: Record<string, unknown> } | null)
    ?.providerSpecificData;
  return data?.[KIRO_V3_PROTOCOL_FLAG] === true;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Return the CLI 3.x compatible body. The wire shape stays camelCase — the
 * snake_case `user_input_message` form is a different operation and is rejected
 * by GenerateAssistantResponse with REQUEST_BODY_INVALID.
 */
export function toKiroV3Payload(legacy: Record<string, unknown>): Record<string, unknown> {
  const state = asRecord(legacy.conversationState);
  if (!state) return legacy;

  const currentMessage = asRecord(state.currentMessage);
  const currentUser = asRecord(currentMessage?.userInputMessage);
  const history = Array.isArray(state.history) ? state.history : [];

  const normalizedState: Record<string, unknown> = {
    ...state,
    chatTriggerType: state.chatTriggerType ?? "MANUAL",
    agentTaskType: state.agentTaskType ?? "vibe",
    currentMessage: {
      ...(currentMessage ?? {}),
      userInputMessage: {
        ...(currentUser ?? {}),
        origin: currentUser?.origin ?? "KIRO_CLI",
      },
    },
    history,
  };

  const result: Record<string, unknown> = { conversationState: normalizedState };
  if (legacy.profileArn !== undefined) result.profileArn = legacy.profileArn;
  return result;
}

/** Headers captured from a live, successful kiro-cli 3.4.0 inference request. */
export function getKiroV3RuntimeHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/x-amz-json-1.0",
    "X-Amz-Target": "AmazonCodeWhispererStreamingService.GenerateAssistantResponse",
    "User-Agent":
      "aws-sdk-rust/1.6.0 ua/2.1 api/codewhispererstreaming/0.1.19636 os/linux " +
      "lang/rust/1.94.1 md/appVersion-3.4.0 app/AmazonQ-For-CLI",
    "X-Amz-User-Agent":
      "aws-sdk-rust/1.6.0 ua/2.1 api/codewhispererstreaming/0.1.19636 os/linux " +
      "lang/rust/1.94.1 m/F app/AmazonQ-For-CLI",
    "X-Amzn-Codewhisperer-Optout": "false",
    "X-Amzn-Kiro-Attempt": "1;max=3",
    "X-Amzn-Kiro-Fallback": "0;max=0",
    "Amz-Sdk-Request": "attempt=1; max=3",
    "Amz-Sdk-Invocation-Id": uuidv4(),
    Accept: "*/*",
  };
}
