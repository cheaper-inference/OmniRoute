/**
 * Build the final non-streaming JSON response body once and publish an accurate
 * Content-Length for downstream HTTP clients and buffering proxies.
 */
import {
  detokenizeResponsePayload,
  isReversibleVaultEnabled,
} from "../../utils/tokenVault.ts";
export function buildNonStreamingJsonResponse(
  body: unknown,
  headers: Record<string, string>,
): Response {
  const finalBody = isReversibleVaultEnabled()
    ? detokenizeResponsePayload(body)
    : body;
  const payload = JSON.stringify(finalBody);
  return new Response(payload, {
    headers: {
      ...headers,
      "Content-Length": String(Buffer.byteLength(payload)),
    },
  });
}
