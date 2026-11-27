import {
  callerOwnsSession,
  launchError,
  launchJson,
  notFound,
  resolveLaunchCaller,
  unauthorized,
} from "../../../launchRouteHelpers";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

/**
 * `GET /api/launch/sessions/:id/usage` -> LaunchUsageSummary. Authorized by
 * the session's own token (the CLI fetches it right before revoking) or the parent credential.
 * Totals come from the session's agent_sessions row (one launch = one row, keyed by the parent
 * key and this session id); the per-model breakdown from the cost ledger by session tag.
 */
export async function GET(request: Request, context: RouteContext) {
  const caller = await resolveLaunchCaller(request);
  if (!caller) return unauthorized();
  const { id } = await context.params;
  const { getLaunchSession } = await import("@/lib/db/launchSessions");
  const session = getLaunchSession(id);
  if (!session || !callerOwnsSession(caller, session)) return notFound();

  try {
    const { buildLaunchUsageSummary } = await import("./usageSummary");
    return launchJson(buildLaunchUsageSummary(session));
  } catch {
    return launchError(500, "Failed to read launch session usage");
  }
}
