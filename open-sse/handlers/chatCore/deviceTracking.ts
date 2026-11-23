/**
 * chatCore per-API-key device/connection tracking (port of upstream 9router#931, thanks
 * @mugnimaestra; chatCore god-file decomposition, slice 2 — design after #15709).
 *
 * In-memory only, never blocks the request path. A request without an API key id is not tracked.
 */

import { extractIpFromHeaders, trackDevice } from "../../services/deviceTracker.ts";

export function trackRequestDevice({
  apiKeyId,
  headers,
  userAgent,
}: {
  apiKeyId: string | null | undefined;
  headers: Record<string, unknown> | Headers | null | undefined;
  userAgent: string | null | undefined;
}): void {
  if (apiKeyId) {
    trackDevice(apiKeyId, extractIpFromHeaders(headers ?? null), userAgent ?? null);
  }
}
