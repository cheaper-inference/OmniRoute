import { z } from "zod";

import { launchSessionViewSchema } from "../../../../shared/validation/launchView";

/**
 * Mint body schema for `POST /api/launch/sessions`, kept apart from route.ts (a Next.js route
 * file must not export arbitrary names) so the CLI test stub can import the exact same schema.
 *
 * It must stay free of server imports (DB, auth): launchRouteHelpers.ts pulls those in at load
 * time, so the two id/tag schemas it owns are mirrored here. tests/unit/api/launch-sessions.test.ts
 * asserts the mirrors accept and reject the same inputs as the helpers.
 */

export const LAUNCH_MINT_SPEC_VERSION = 1;

export const launchMintToolIdSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-z0-9][a-z0-9._-]*$/, "tool id must be lowercase letters, digits, . _ -");

export const launchMintSessionTagSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9._:/=-]+$/, "session tag must use [A-Za-z0-9._:/=-]");

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
 * `POST /api/launch/sessions` body. `tool` is the short
 * spelling of `toolId`. `policy` and `mcp` are reserved: rejected until capabilities lists them,
 * so a gateway never silently ignores a budget.
 */
export const launchMintSchema = z
  .object({
    specVersion: z.literal(LAUNCH_MINT_SPEC_VERSION).optional(),
    tool: launchMintToolIdSchema.optional(),
    toolId: launchMintToolIdSchema.optional(),
    ttlSec: z.number().int().min(60).max(3600).optional(),
    sessionTag: launchMintSessionTagSchema.optional(),
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
