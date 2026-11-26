/**
 * Helpers for `POST /api/launch/sessions`, kept out of route.ts (a Next.js route file may only
 * export HTTP handlers and route config).
 */

import type { z } from "zod";

import type { CreateLaunchSessionInput, LaunchSessionRecord } from "@/lib/db/launchSessions";

import {
  LAUNCH_SPEC_VERSION,
  publicSessionView,
  serveError,
  type LaunchCaller,
} from "../launchRouteHelpers";
import type { launchMintSchema } from "./schema";

type LaunchMintBody = z.output<typeof launchMintSchema>;

const UNSUPPORTED_BLOCKS =
  "policy and mcp blocks are not supported by this gateway (see /api/launch/capabilities)";

/** Semantic checks after the schema: reserved blocks first, then the view presentation. */
export function mintBodyError(body: LaunchMintBody): string | null {
  if (body.policy !== undefined || body.mcp !== undefined) return UNSUPPORTED_BLOCKS;
  return serveError(body.view?.serve);
}

/** The parent a session is bound to: the presenting key, or nothing for the anonymous posture. */
function mintParent(caller: LaunchCaller) {
  return caller.kind === "key"
    ? { parentKeyId: caller.parentKeyId, parentCredential: caller.credential }
    : { parentKeyId: null, parentCredential: null };
}

function mintSpec(toolId: string, body: LaunchMintBody): CreateLaunchSessionInput["spec"] {
  const viewSpec = body.view?.spec;
  return {
    specVersion: LAUNCH_SPEC_VERSION,
    toolId,
    ...(viewSpec ? { view: viewSpec } : {}),
  };
}

export function buildMintInput(
  caller: LaunchCaller,
  body: LaunchMintBody
): CreateLaunchSessionInput {
  const toolId = (body.tool || body.toolId) as string;
  const metadata = body.metadata ?? null;
  return {
    ...mintParent(caller),
    toolId,
    sessionTag: body.sessionTag ?? null,
    view: body.view ?? null,
    spec: mintSpec(toolId, body),
    attribution: metadata,
    preset: metadata?.preset ?? null,
    ttlSeconds: body.ttlSec ?? null,
  };
}

export function mintResponseBody(session: LaunchSessionRecord, token: string) {
  return {
    sessionId: session.id,
    token,
    toolId: session.toolId,
    sessionTag: session.sessionTag,
    expiresAt: session.expiresAt,
    ttlSec: session.ttlSeconds,
    specVersion: LAUNCH_SPEC_VERSION,
    anonymous: session.parentKeyId === null,
    view: publicSessionView(session),
  };
}
