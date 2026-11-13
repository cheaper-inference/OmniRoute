import { LAUNCH_VIEW_MAX_IDS } from "@/shared/validation/launchView";
import {
  LAUNCH_SESSION_DEFAULT_TTL_SECONDS,
  LAUNCH_SESSION_MAX_TTL_SECONDS,
  LAUNCH_SESSION_MIN_TTL_SECONDS,
} from "@/lib/db/launchSessions";

import {
  LAUNCH_API_VERSION,
  LAUNCH_SPEC_VERSION,
  launchJson,
  resolveLaunchCaller,
  unauthorized,
} from "../launchRouteHelpers";

export const dynamic = "force-dynamic";

/** Optional session features this gateway enforces. Empty until G6 ships (12.9). */
const POLICY_BLOCKS: string[] = [];

/**
 * `GET /api/launch/capabilities` (architecture 12.9). Authenticated like the session routes;
 * no secrets, cheap. A gateway without this route answers 404, which the CLI maps to
 * GatewayTooOld.
 */
export async function GET(request: Request) {
  const caller = await resolveLaunchCaller(request);
  if (!caller) return unauthorized();
  return launchJson({
    version: LAUNCH_API_VERSION,
    apiVersion: LAUNCH_API_VERSION,
    specVersion: LAUNCH_SPEC_VERSION,
    features: ["sessions", "heartbeat", "revoke", "view", "usage", "session-tag"],
    sessions: {
      tokenPrefix: "olx_",
      ttlSec: {
        default: LAUNCH_SESSION_DEFAULT_TTL_SECONDS,
        min: LAUNCH_SESSION_MIN_TTL_SECONDS,
        max: LAUNCH_SESSION_MAX_TTL_SECONDS,
      },
    },
    view: {
      strategies: ["inject", "server-view", "both"],
      maxIds: LAUNCH_VIEW_MAX_IDS,
      prefix: false,
      shapes: ["openai"],
    },
    policy: POLICY_BLOCKS,
    mcp: false,
    usage: true,
  });
}
