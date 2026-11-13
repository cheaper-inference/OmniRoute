import { launchMintSchema } from "./schema";

import {
  firstIssueMessage,
  launchError,
  launchJson,
  LAUNCH_SPEC_VERSION,
  publicSessionView,
  readJsonBody,
  resolveLaunchCaller,
  serveError,
  unauthorized,
} from "../launchRouteHelpers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const caller = await resolveLaunchCaller(request);
  if (!caller) return unauthorized();
  if (caller.kind === "session") {
    return launchError(403, "A launch session token cannot mint another session");
  }

  const read = await readJsonBody(request);
  if (!read.ok) return launchError(400, "Invalid JSON body", "invalid_request_error");
  const parsed = launchMintSchema.safeParse(read.body);
  if (!parsed.success) {
    return launchError(400, firstIssueMessage(parsed.error), "invalid_request_error");
  }
  const body = parsed.data;
  if (body.policy !== undefined || body.mcp !== undefined) {
    return launchError(
      400,
      "policy and mcp blocks are not supported by this gateway (see /api/launch/capabilities)",
      "invalid_request_error"
    );
  }
  const prefixError = serveError(body.view?.serve);
  if (prefixError) return launchError(400, prefixError, "invalid_request_error");

  const toolId = (body.tool || body.toolId) as string;
  const { createLaunchSession, purgeLaunchSessions } = await import("@/lib/db/launchSessions");
  try {
    purgeLaunchSessions();
    const { session, token } = createLaunchSession({
      parentKeyId: caller.kind === "key" ? caller.parentKeyId : null,
      parentCredential: caller.kind === "key" ? caller.credential : null,
      toolId,
      sessionTag: body.sessionTag ?? null,
      view: body.view ?? null,
      spec: {
        specVersion: LAUNCH_SPEC_VERSION,
        toolId,
        ...(body.view?.spec ? { view: body.view.spec } : {}),
      },
      attribution: body.metadata ?? null,
      preset: body.metadata?.preset ?? null,
      ttlSeconds: body.ttlSec ?? null,
    });
    return launchJson(
      {
        sessionId: session.id,
        token,
        toolId: session.toolId,
        sessionTag: session.sessionTag,
        expiresAt: session.expiresAt,
        ttlSec: session.ttlSeconds,
        specVersion: LAUNCH_SPEC_VERSION,
        anonymous: session.parentKeyId === null,
        view: publicSessionView(session),
      },
      201
    );
  } catch {
    return launchError(500, "Failed to create launch session");
  }
}
