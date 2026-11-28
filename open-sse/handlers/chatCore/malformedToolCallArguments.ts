/**
 * Label for a provider response whose tool-call `arguments` are not a JSON object (#17198).
 * The provider was reachable and answered; only this response is unusable, and every other
 * request to the same provider may still succeed. It is therefore neither a transport failure
 * nor an account fault: the label keeps it off the provider breaker and the connection
 * cooldown, while combos still fall back to their next target.
 */
export const MALFORMED_TOOL_CALL_ARGUMENTS_CODE = "malformed_tool_call_arguments";

/** Client-facing message. Constant on purpose: it never echoes the arguments. */
export const MALFORMED_TOOL_CALL_ARGUMENTS_MESSAGE =
  "Upstream returned malformed tool-call arguments";

export class MalformedToolCallArgumentsError extends SyntaxError {
  readonly code = MALFORMED_TOOL_CALL_ARGUMENTS_CODE;

  constructor(options?: ErrorOptions) {
    super("Tool-call arguments must be a JSON object", options);
  }
}
