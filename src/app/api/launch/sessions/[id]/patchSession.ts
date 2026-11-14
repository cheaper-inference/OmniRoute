/**
 * Applies a validated `PATCH /api/launch/sessions/:id` body, kept out of route.ts (a Next.js
 * route file may only export HTTP handlers and route config).
 */

import type { z } from "zod";

import type { LaunchSessionRecord } from "@/lib/db/launchSessions";
import type { launchSessionPatchSchema } from "@/shared/validation/launchView";

type LaunchSessionPatch = z.output<typeof launchSessionPatchSchema>;

/**
 * The view is replaced first (a failed write keeps the prior record), then the heartbeat
 * extends the TTL. Null when the heartbeat finds the session gone (the route answers 404).
 */
export async function applySessionPatch(
  id: string,
  existing: LaunchSessionRecord,
  patch: LaunchSessionPatch
): Promise<LaunchSessionRecord | null> {
  const { heartbeatLaunchSession, setLaunchSessionView } = await import("@/lib/db/launchSessions");
  let session = existing;
  if (patch.view) session = setLaunchSessionView(id, patch.view) ?? session;
  if (!patch.heartbeat) return session;
  return heartbeatLaunchSession(id);
}
