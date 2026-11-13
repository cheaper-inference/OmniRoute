import { z } from "zod";

import { launchSessionViewSchema } from "@/shared/validation/launchView";

import {
  firstIssueMessage,
  launchError,
  launchJson,
  launchSessionTagSchema,
  launchToolIdSchema,
  LAUNCH_SPEC_VERSION,
  publicSessionView,
  readJsonBody,
  resolveLaunchCaller,
  serveError,
  unauthorized,
} from "../launchRouteHelpers";

export const dynamic = "force-dynamic";

const shortText = (max: number) => z.string().min(1).max(max);

const metadataSchema = z
  .object({
    launchId: shortText(128).optional(),
    cwd: shortText(256).optional(),
    gitBranch: shortText(200).optional(),
    preset: shortText(64).optional(),
    tags: z
      .record(shortText(64), z.string().max(256))
      .refine((tags) => Object.keys(tags).length <= 16, { message: "at most 16 tags" })
      .optional(),
    parentSessionId: shortText(64).optional(),
  })
  .strict();

/**
 * `POST /api/launch/sessions` body (architecture 12.1 LaunchSessionSpec). `tool` is the short
 * spelling of `toolId`. `policy` and `mcp` are reserved: rejected until capabilities lists them,
 * so a gateway never silently ignores a budget.
 */
const mintSchema = z
  .object({
    specVersion: z.literal(LAUNCH_SPEC_VERSION).optional(),
    tool: launchToolIdSchema.optional(),
    toolId: launchToolIdSchema.optional(),
    ttlSec: z.number().int().min(60).max(3600).optional(),
    sessionTag: launchSessionTagSchema.optional(),
    view: launchSessionViewSchema.optional(),
    metadata: metadataSchema.optional(),
    policy: z.unknown().optional(),
    mcp: z.unknown().optional(),
  })
  .strict()
  .refine((body) => Boolean(body.tool || body.toolId), {
    message: "tool is required",
    path: ["tool"],
  })
  .refine((body) => !body.tool || !body.toolId || body.tool === body.toolId, {
    message: "tool and toolId disagree",
    path: ["toolId"],
  });

export async function POST(request: Request) {
  const caller = await resolveLaunchCaller(request);
  if (!caller) return unauthorized();
  if (caller.kind === "session") {
    return launchError(403, "A launch session token cannot mint another session");
  }

  const read = await readJsonBody(request);
  if (!read.ok) return launchError(400, "Invalid JSON body", "invalid_request_error");
  const parsed = mintSchema.safeParse(read.body);
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
