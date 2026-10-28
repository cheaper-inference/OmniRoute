/**
 * Anthropic error envelope for the Messages API surface.
 *
 * Claude Code and the Anthropic SDKs only surface an error message when the
 * body uses Anthropic's shape: `{ type: "error", error: { type, message } }`.
 * Other routes keep the OpenAI-compatible `{ error: { ... } }` body.
 *
 * @module shared/utils/anthropicErrorEnvelope
 */

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";

export type AnthropicErrorType =
  "authentication_error" | "permission_error" | "invalid_request_error";

export interface AnthropicErrorBody {
  type: "error";
  error: { type: AnthropicErrorType; message: string };
}

const MESSAGES_PATH = /\/v1\/messages(?:\/count_tokens)?$/;

/**
 * Whether a pathname is the Anthropic Messages endpoint (`/v1/messages` or
 * `/v1/messages/count_tokens`, with or without the `/api` prefix).
 */
export function isAnthropicMessagesPath(pathname: string): boolean {
  if (!pathname) return false;
  let path = pathname.toLowerCase();
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return MESSAGES_PATH.test(path);
}

/**
 * Whether a request speaks the Anthropic Messages protocol: it carries an
 * `anthropic-version` header or targets `/v1/messages`.
 */
export function isAnthropicMessagesRequest(request: Request): boolean {
  if (request.headers.has("anthropic-version")) return true;

  try {
    const url = new URL(request.url);
    return url.pathname.endsWith("/v1/messages");
  } catch {
    return false;
  }
}

/** Build the Anthropic error body; the message is sanitized (no stack, no paths). */
export function buildAnthropicErrorBody(
  type: AnthropicErrorType,
  message: string
): AnthropicErrorBody {
  return { type: "error", error: { type, message: sanitizeErrorMessage(message) } };
}

/** JSON `Response` carrying the Anthropic error envelope. */
export function anthropicErrorResponse(
  status: number,
  type: AnthropicErrorType,
  message: string
): Response {
  return new Response(JSON.stringify(buildAnthropicErrorBody(type, message)), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
