/**
 * A provider completed a response but emitted tool-call arguments that cannot be
 * represented as a Claude `tool_use.input` object. This is a response-quality
 * failure, not evidence that the provider connection is unavailable.
 */
export const MALFORMED_TOOL_CALL_ARGUMENTS_CODE = "malformed_tool_call_arguments";
export const MALFORMED_TOOL_CALL_ARGUMENTS_MESSAGE =
  "Upstream returned malformed tool-call arguments";

export class MalformedToolCallArgumentsError extends SyntaxError {
  readonly code = MALFORMED_TOOL_CALL_ARGUMENTS_CODE;

  constructor(options?: ErrorOptions) {
    super("Tool-call arguments must be a JSON object", options);
  }
}
