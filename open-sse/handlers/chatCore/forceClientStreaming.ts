/**
 * forceClientStreaming.ts — : auto-convert client stream=false to stream=true.
 *
 * Non-streaming requests on large contexts give the worst user experience: the
 * client sees zero bytes until the ENTIRE generation is complete (minutes for
 * 300k+ token requests). Production census (2026-11-04): ~4% of traffic, but
 * those requests generate disproportionate "stuck/frozen" reports because the
 * first byte arrives only after everything is done.
 *
 * The fork already forces UPSTREAM streaming (#80, nnd.27) — the upstream
 * connection is always SSE. This module closes the CLIENT-facing gap: when
 * OMNIROUTE_FORCE_CLIENT_STREAMING is enabled, a client that sends
 * stream=false gets stream=true instead, so they see first bytes (and can
 * watch progress) instead of waiting in total silence.
 *
 * Gate: OMNIROUTE_FORCE_CLIENT_STREAMING (unset=off, 1/true/on=on).
 * Clients that explicitly need a complete JSON object in one shot will need
 * this off; gray-roll by enabling and monitoring 4xx from clients that can't
 * handle SSE.
 */

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
 * Exempt paths can be added later (e.g. /v1/responses which has its own
 * streaming semantics).
 */
export function maybeForceClientStreaming<T extends { stream?: boolean }>(
  body: T,
  env: { [k: string]: string | undefined } = process.env
): T {
  if (!isForceClientStreamingEnabled(env)) return body;
  if (body.stream !== false) return body;
  return { ...body, stream: true };
}
