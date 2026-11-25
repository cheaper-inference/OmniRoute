import { launchMintSchema } from "./schema";
import { buildMintInput, mintBodyError, mintResponseBody } from "./mintSession";

import {
  launchError,
  launchJson,
  parseLaunchBody,
  resolveLaunchCaller,
  unauthorized,
} from "../launchRouteHelpers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const caller = await resolveLaunchCaller(request);
  if (!caller) return unauthorized();
  if (caller.kind === "session") {
    return launchError(403, "A launch session token cannot mint another session");
  }

  const parsed = await parseLaunchBody(request, launchMintSchema, mintBodyError);
  if (parsed.ok === false) return parsed.response;

  const { createLaunchSession, purgeLaunchSessions } = await import("@/lib/db/launchSessions");
  try {
    purgeLaunchSessions();
    const { session, token } = createLaunchSession(buildMintInput(caller, parsed.data));
    return launchJson(mintResponseBody(session, token), 201);
  } catch {
    return launchError(500, "Failed to create launch session");
  }
}
