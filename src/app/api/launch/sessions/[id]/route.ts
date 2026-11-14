import { launchSessionPatchSchema } from "@/shared/validation/launchView";

import {
  callerOwnsSession,
  launchJson,
  notFound,
  parseLaunchBody,
  publicSessionView,
  resolveLaunchCaller,
  serveError,
  unauthorized,
} from "../../launchRouteHelpers";
import { applySessionPatch } from "./patchSession";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * `PATCH /api/launch/sessions/:id`: `{heartbeat?: true, view?: {hash, ids, serve?, spec?}}`.
 * A heartbeat extends `expires_at` by the session TTL; a view replaces the served list. An
 * expired or revoked session answers 404 (the token itself already fails auth with 401).
 */
export async function PATCH(request: Request, context: RouteContext) {
  const caller = await resolveLaunchCaller(request);
  if (!caller) return unauthorized();
  const { id } = await context.params;

  const { getLaunchSession, isLaunchSessionActive } = await import("@/lib/db/launchSessions");
  const existing = getLaunchSession(id);
  if (!existing || !callerOwnsSession(caller, existing) || !isLaunchSessionActive(existing)) {
    return notFound();
  }

  const parsed = await parseLaunchBody(request, launchSessionPatchSchema, (patch) =>
    serveError(patch.view?.serve)
  );
  if (parsed.ok === false) return parsed.response;

  const session = await applySessionPatch(id, existing, parsed.data);
  if (!session) return notFound();
  return launchJson({
    sessionId: session.id,
    expiresAt: session.expiresAt,
    lastSeenAt: session.lastSeenAt,
    view: publicSessionView(session),
  });
}

/**
 * `DELETE /api/launch/sessions/:id`: revoke. The row is kept 30 days with its hash wiped. A
 * revoked token no longer authenticates, so a second DELETE with it answers 401.
 */
export async function DELETE(request: Request, context: RouteContext) {
  const caller = await resolveLaunchCaller(request);
  if (!caller) return unauthorized();
  const { id } = await context.params;
  const { getLaunchSession, revokeLaunchSession } = await import("@/lib/db/launchSessions");
  const existing = getLaunchSession(id);
  if (!existing || !callerOwnsSession(caller, existing)) return notFound();
  revokeLaunchSession(id);
  const revoked = getLaunchSession(id);
  return launchJson({ sessionId: id, revoked: true, revokedAt: revoked?.revokedAt ?? null });
}
