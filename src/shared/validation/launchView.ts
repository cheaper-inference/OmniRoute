/**
 * launchView.ts: Zod schemas for the launch model view.
 *
 * - `viewSelectSpecSchema`: an adapter's `capabilities.modelList.view` (ViewSelectSpec).
 * - `serverViewPresentationSchema`: `capabilities.modelList.serve` (gateway presentation).
 * - `modelListSpecSchema`: the whole `capabilities.modelList`.
 * - `launchSessionPatchSchema`: body of `PATCH /api/launch/sessions/:id` (heartbeat and/or view).
 *
 * Imported by the gateway routes and by tests; never by adapters (they import contract.mjs only).
 */

import { z } from "zod";
import { WIRE_PROTOCOLS, VIEW_CATALOG_KINDS, viewHash } from "../launch/viewSelect.ts";

/** Upper bound on view ids in one PATCH (no tool picker needs more; guards the request size). */
export const LAUNCH_VIEW_MAX_IDS = 5000;
const MAX_ID_LENGTH = 512;
const MAX_LIST_ENTRIES = 200;
const MAX_NAME_LENGTH = 64;

const wireProtocolSchema = z.enum(WIRE_PROTOCOLS as [string, ...string[]]);
const catalogKindSchema = z.enum(VIEW_CATALOG_KINDS as [string, ...string[]]);
const idPatternSchema = z.string().min(1).max(MAX_ID_LENGTH);
const nonNegativeInt = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);

export const viewSelectSpecSchema = z
  .object({
    name: z
      .string()
      .min(1)
      .max(MAX_NAME_LENGTH)
      .regex(/^[a-z0-9][a-z0-9._-]*$/, "name must be lowercase letters, digits, . _ -"),
    filter: z
      .object({
        protocols: z.array(wireProtocolSchema).max(WIRE_PROTOCOLS.length).optional(),
        kinds: z.array(catalogKindSchema).max(VIEW_CATALOG_KINDS.length).optional(),
        minContextTokens: nonNegativeInt.optional(),
        requireKnownContext: z.boolean().optional(),
        capabilities: z.array(z.string().min(1).max(64)).max(MAX_LIST_ENTRIES).optional(),
        includeIds: z.array(idPatternSchema).max(MAX_LIST_ENTRIES).optional(),
        excludeIds: z.array(idPatternSchema).max(MAX_LIST_ENTRIES).optional(),
        combos: z.boolean().optional(),
      })
      .strict(),
    order: z.enum(["preferences", "catalog"]).optional(),
    limit: nonNegativeInt.max(LAUNCH_VIEW_MAX_IDS).optional(),
  })
  .strict();

export const serverViewPresentationSchema = z
  .object({
    prefix: z
      .string()
      .min(1)
      .max(32)
      .regex(/^[A-Za-z0-9._-]+\/$/, "prefix must end with / and use [A-Za-z0-9._-]")
      .optional(),
    mode: z.enum(["replace", "mirror"]).optional(),
    shape: z.enum(["openai", "codex"]).optional(),
  })
  .strict()
  .refine((value) => value.mode === undefined || value.prefix !== undefined, {
    message: "mode requires prefix",
    path: ["mode"],
  });

export const modelListSpecSchema = z
  .object({
    strategy: z.enum(["inject", "server-view", "both"]),
    view: viewSelectSpecSchema,
    serve: serverViewPresentationSchema.optional(),
    injectLimit: nonNegativeInt.max(LAUNCH_VIEW_MAX_IDS).optional(),
  })
  .strict()
  .refine((value) => value.strategy !== "inject" || value.serve === undefined, {
    message: "serve is only valid for server-view or both",
    path: ["serve"],
  })
  .refine((value) => value.strategy !== "server-view" || value.injectLimit === undefined, {
    message: "injectLimit is only valid for inject or both",
    path: ["injectLimit"],
  });

/** The resolved view core sends: ordered raw ids + their hash (+ presentation, + spec for audit). */
export const launchSessionViewSchema = z
  .object({
    hash: z.string().regex(/^[0-9a-f]{64}$/, "hash must be 64 lowercase hex characters"),
    ids: z
      .array(z.string().min(1).max(MAX_ID_LENGTH))
      .max(LAUNCH_VIEW_MAX_IDS)
      .refine((ids) => new Set(ids).size === ids.length, { message: "ids must be unique" }),
    serve: serverViewPresentationSchema.optional(),
    spec: viewSelectSpecSchema.optional(),
  })
  .strict()
  .refine((value) => viewHash(value.ids) === value.hash, {
    message: "hash does not match ids",
    path: ["hash"],
  });

/** `PATCH /api/launch/sessions/:id`: a heartbeat, a view, or both. */
export const launchSessionPatchSchema = z
  .object({
    heartbeat: z.literal(true).optional(),
    view: launchSessionViewSchema.optional(),
  })
  .strict()
  .refine((value) => value.heartbeat !== undefined || value.view !== undefined, {
    message: "body must contain heartbeat or view",
  });

export type ViewSelectSpecInput = z.infer<typeof viewSelectSpecSchema>;
export type ServerViewPresentationInput = z.infer<typeof serverViewPresentationSchema>;
export type ModelListSpecInput = z.infer<typeof modelListSpecSchema>;
export type LaunchSessionViewInput = z.infer<typeof launchSessionViewSchema>;
export type LaunchSessionPatchInput = z.infer<typeof launchSessionPatchSchema>;
