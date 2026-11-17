/**
 * Cloudflare Workers AI wire for System One decisions.
 *
 * Workers AI serves TypeSafe Jev and Cloudflare's own Clef models behind the
 * existing `cloudflare-ai` connection, with two request shapes and a
 * Cloudflare envelope around the native `{ model, answers, usage }` body:
 *
 *   typesafe/jev      POST /accounts/{id}/ai/run
 *                     { model: "typesafe/jev", input: { state, questions } }
 *                     → { success, result: { state: "Completed", result: native } }
 *   clef | clef-flash POST /accounts/{id}/ai/run/@cf/cloudflare/{model}
 *                     { model, state, questions }
 *                     → { success, result: native }
 *
 * Errors use `{ success: false, errors: [{ code, message }] }`.
 */

import { CLOUDFLARE_SYSTEMONE_API_BASE } from "../config/systemOneRegistry.ts";

const CLOUDFLARE_ACCOUNT_ID = /^[a-f0-9]{32}$/;
const CLOUDFLARE_JEV_MODEL = "typesafe/jev";

export interface CloudflareDecisionRequest {
  url: string;
  body: Record<string, unknown>;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Build the Workers AI request, or null when the connection has no valid
 * account id (it is placed in the URL, so it must be 32 lowercase hex chars).
 * `upstreamModel` comes from the registry allow-list, never from the client.
 */
export function buildCloudflareDecisionRequest(
  upstreamModel: string,
  accountId: unknown,
  input: { state?: unknown; questions?: unknown }
): CloudflareDecisionRequest | null {
  if (typeof accountId !== "string" || !CLOUDFLARE_ACCOUNT_ID.test(accountId)) return null;
  const base = `${CLOUDFLARE_SYSTEMONE_API_BASE}/${accountId}/ai/run`;
  if (upstreamModel === CLOUDFLARE_JEV_MODEL) {
    return {
      url: base,
      body: { model: upstreamModel, input: { state: input.state, questions: input.questions } },
    };
  }
  return {
    url: `${base}/@cf/cloudflare/${upstreamModel}`,
    body: { model: upstreamModel, state: input.state, questions: input.questions },
  };
}

/** Native `{ model, answers, usage }` from a successful envelope, else null. */
export function unwrapCloudflareDecision(payload: unknown): Record<string, unknown> | null {
  const envelope = asRecord(payload);
  if (envelope?.success !== true) return null;
  const result = asRecord(envelope.result);
  const native = result?.state === "Completed" ? asRecord(result.result) : result;
  return native && asRecord(native.answers) ? native : null;
}

/** First Cloudflare error message, if the envelope carries one. */
export function cloudflareErrorMessage(payload: unknown): string | undefined {
  const errors = asRecord(payload)?.errors;
  const message = Array.isArray(errors) ? asRecord(errors[0])?.message : undefined;
  return typeof message === "string" && message ? message : undefined;
}
