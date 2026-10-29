import { inheritTrustedLocalRateLimitResponse } from "@omniroute/open-sse/services/rateLimitManager/errors.ts";
import { inheritResponsePolicies } from "./responsePolicies.ts";

export function withSelectedConnectionHeader(
  response: Response,
  connectionId: string | null | undefined
): Response {
  if (!response || !connectionId) return response;

  try {
    response.headers.set("X-OmniRoute-Selected-Connection-Id", connectionId);
    return response;
  } catch {
    const cloned = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    cloned.headers.set("X-OmniRoute-Selected-Connection-Id", connectionId);
    // A cloned response must keep the trusted local rate-limit marker plus the per-Response
    // routing policies of the original (#15594 provider-probe marker, #16072 empty-turn
    // execution record), or the probe fence / empty-turn guard loses track of it.
    const trusted = inheritTrustedLocalRateLimitResponse(response, cloned);
    return inheritResponsePolicies(response, trusted);
  }
}
