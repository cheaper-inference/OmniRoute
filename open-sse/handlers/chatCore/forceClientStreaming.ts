/**
 * forceClientStreaming.ts — auto-convert client stream=false to stream=true.
 *
 * Non-streaming requests on large contexts give the worst user experience: the
 * client sees zero bytes until the ENTIRE generation is complete (minutes for
 * 300k+ token requests). When OMNIROUTE_FORCE_CLIENT_STREAMING is enabled, a
 * client that sends stream=false on /v1/chat/completions gets stream=true
 * instead, so it sees first bytes (and can watch progress) instead of waiting
 * in total silence.
 *
 * Gate: OMNIROUTE_FORCE_CLIENT_STREAMING (unset=off, 1/true/on=on).
 *
 * The route rewrites `body.stream` once, before its keepalive decision, so
 * handleChat and resolveStreamFlag read a single value downstream. Callers that
 * need one complete JSON object stay on JSON: see applyForceClientStreaming.
 */

import { normalizeStreamDefaultMode, resolveExplicitStreamAlias } from "../../utils/aiSdkCompat.ts";

const FORCE_CLIENT_STREAMING_ENV = "OMNIROUTE_FORCE_CLIENT_STREAMING";

export function isForceClientStreamingEnabled(
  env: { [k: string]: string | undefined } = process.env
): boolean {
  const v = env[FORCE_CLIENT_STREAMING_ENV];
  if (typeof v !== "string") return false;
  const n = v.trim().toLowerCase();
  return n === "1" || n === "true" || n === "on";
}

/**
 * Returns a patched body with stream=true if the feature is on and the client
 * explicitly asked for stream=false; otherwise returns the original body.
 */
export function maybeForceClientStreaming<T extends { stream?: boolean }>(
  body: T,
  env: { [k: string]: string | undefined } = process.env
): T {
  if (!isForceClientStreamingEnabled(env)) return body;
  if (body.stream !== false) return body;
  return { ...body, stream: true };
}

export interface ForceClientStreamingContext {
  acceptHeader?: string | null;
  /** The request's idempotency key, when it sent one. */
  idempotencyKey?: string | null;
  /** The calling API key's stream default mode, when it has one. */
  streamDefaultMode?: unknown;
  env?: { [k: string]: string | undefined };
}

/**
 * True only when the caller's Accept header says it can read SSE. A client that
 * lists application/json expects one JSON object (the OpenAI/Vercel AI SDK
 * signature, #5305), and in-process dispatchers build a Request with no Accept
 * header at all, so neither is converted.
 */
function acceptHeaderAdmitsSse(acceptHeader: string | null | undefined): boolean {
  if (typeof acceptHeader !== "string") return false;
  const normalized = acceptHeader.toLowerCase();
  if (normalized.includes("application/json")) return false;
  return /text\/event-stream|text\/\*|\*\/\*/.test(normalized);
}

/**
 * Request-level gate around maybeForceClientStreaming. Leaves the body alone
 * when the caller cannot take SSE or needs what only the JSON path provides:
 * an idempotency replay is stored on the non-streaming path only, and an
 * explicit non-stream alias or a per-key JSON mode is a stated JSON preference.
 */
export function applyForceClientStreaming<T>(body: T, context: ForceClientStreamingContext): T {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  if (!acceptHeaderAdmitsSse(context.acceptHeader)) return body;
  if (context.idempotencyKey) return body;
  if (normalizeStreamDefaultMode(context.streamDefaultMode) === "json") return body;
  if (resolveExplicitStreamAlias(body) === false) return body;
  return maybeForceClientStreaming(body as { stream?: boolean }, context.env) as T;
}
