/**
 * Responses that must reach the client from the provider that produced them.
 *
 * A session-ownership fail-close (a Muse OAuth owner that is unavailable, a claim with
 * no eligible owner account, a generation fence) refuses on purpose: replaying the same
 * body on another provider is exactly what it forbids. Its status can read like an
 * ordinary outage (503), so provider failover checks this marker instead of trusting
 * the status or message text.
 */

const providerBoundResponses = new WeakSet<Response>();

/** Marks a response that provider failover must return unchanged. */
export function markProviderBoundResponse(response: Response): Response {
  providerBoundResponses.add(response);
  return response;
}

/** True for a response that must not be failed over to another provider. */
export function isProviderBoundResponse(response: Response): boolean {
  return providerBoundResponses.has(response);
}
