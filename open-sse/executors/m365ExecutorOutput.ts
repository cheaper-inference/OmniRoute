import { sanitizeErrorMessage } from "../utils/error.ts";
import { M365TurnError } from "./m365Turn.ts";
import type { M365ToolOutput } from "./m365Protocol/tools.ts";

type JsonRecord = Record<string, unknown>;
export class M365ExecutorError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message);
  }
}
function failureCode(error: M365TurnError | M365ExecutorError): string {
  if (error instanceof M365ExecutorError) return error.code;
  if (error.code === "M365_FORBIDDEN")
    return error.upstreamErrorCode === "InvalidCopilotLicense"
      ? "m365_account_not_licensed"
      : "m365_model_not_licensed";
  if (error.code === "M365_THROTTLED") return "m365_throttled";
  if (error.code === "M365_OUT_OF_CREDITS") return "priority_access_exhausted";
  // The shared local label for an explicit provider safety stop (providerSafety.ts): routing
  // and account health then treat it as terminal and request-scoped, never as a failover.
  if (error.code === "M365_DISENGAGED") return "provider_safety_rejection";
  return error.code.toLowerCase();
}
function failureMetadata(
  metadata: M365TurnError | undefined,
  model: string,
  status: number
): JsonRecord {
  const fields: JsonRecord = {};
  if (status === 403 && metadata?.upstreamErrorCode !== "InvalidCopilotLicense")
    fields.param = model;
  if (
    metadata?.upstreamErrorCode &&
    /^[A-Za-z][A-Za-z0-9_]{0,127}$/.test(metadata.upstreamErrorCode)
  )
    fields.m365_error_code = metadata.upstreamErrorCode;
  if (["day", "week"].includes(metadata?.priorityWindow ?? ""))
    fields.param = metadata!.priorityWindow;
  return fields;
}
function failureHeaders(status: number, retry: number | undefined): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  // Conservative retry backoff, not a claim about a quota-reset timestamp.
  if (status === 429)
    headers["Retry-After"] = String(
      typeof retry === "number" && Number.isFinite(retry) && retry > 0 ? Math.ceil(retry) : 60
    );
  return headers;
}
/** Only typed local errors cross the boundary. Transport exceptions can contain credentials. */
export function m365Failure(error: unknown, model: string) {
  const typed =
    error instanceof M365TurnError || error instanceof M365ExecutorError
      ? error
      : new M365ExecutorError(502, "m365_executor_error", "Microsoft 365 Copilot request failed.");
  const native = typed instanceof M365TurnError ? typed : undefined;
  const status = typed.status;
  const type =
    status === 400
      ? "invalid_request_error"
      : status === 403
        ? "permission_error"
        : status === 429
          ? "rate_limit_error"
          : "upstream_error";
  const body: { error: JsonRecord } = {
    error: {
      message: sanitizeErrorMessage(typed.message),
      type,
      code: failureCode(typed),
      ...failureMetadata(native, model, status),
    },
  };
  return { body, status, headers: failureHeaders(status, native?.retryAfterSeconds) };
}
export function m365ErrorResponse(error: unknown, model: string): Response {
  const failure = m365Failure(error, model);
  return new Response(JSON.stringify(failure.body), failure);
}
export function m365Output(model: string) {
  const id = `chatcmpl-copilot-m365-${crypto.randomUUID()}`;
  const created = Math.floor(Date.now() / 1000);
  const chunk = (delta: JsonRecord, finish: string | null = null) =>
    `data: ${JSON.stringify({
      id,
      object: "chat.completion.chunk",
      created,
      model,
      choices: [{ index: 0, delta, finish_reason: finish }],
    })}\n\n`;
  const calls = (output: M365ToolOutput) =>
    output.calls.map((call) => ({
      id: call.id,
      type: call.type,
      function: { name: call.name, arguments: call.arguments },
    }));
  const message = (output: M365ToolOutput) => ({
    role: "assistant",
    content: output.calls.length ? null : output.text,
    ...(output.calls.length ? { tool_calls: calls(output) } : {}),
  });
  return {
    chunk,
    json: (output: M365ToolOutput) =>
      new Response(
        JSON.stringify({
          id,
          object: "chat.completion",
          created,
          model,
          choices: [
            {
              index: 0,
              message: message(output),
              finish_reason: output.calls.length ? "tool_calls" : "stop",
            },
          ],
          usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
        }),
        { headers: { "Content-Type": "application/json" } }
      ),
    bufferedSse: (output: M365ToolOutput) =>
      chunk(
        output.calls.length
          ? {
              role: "assistant",
              content: null,
              tool_calls: calls(output).map((call, index) => ({ index, ...call })),
            }
          : message(output)
      ) +
      chunk({}, output.calls.length ? "tool_calls" : "stop") +
      "data: [DONE]\n\n",
  };
}
