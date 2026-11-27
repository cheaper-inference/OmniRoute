/**
 * Strict schema of a combo's decision block (`config.auto.decision`, or `config.decision`
 * when the combo keeps its router knobs at the top level). The combo save schema and the
 * runtime parser share it, so a stored block that fails it is never used.
 *
 * No secret belongs here: the credential is a `connectionId` reference (or an environment
 * variable), and `.strict()` rejects an `apiKey` field outright (#14239 pattern).
 */
import { z } from "zod";

import { MAX_DECISION_MENU_ITEMS } from "./menu.ts";
import {
  MAX_DECISION_TIMEOUT_MS,
  MIN_DECISION_TIMEOUT_MS,
  normalizeDecisionBaseUrl,
} from "./config.ts";
import { DECIDER_KINDS, DECISION_WIRES } from "./types.ts";

export const MAX_DECISION_DESCRIPTION_KEY_CHARS = 300;
export const MAX_DECISION_DESCRIPTION_CHARS = 1_000;

export const decisionRoutingConfigSchema = z
  .object({
    decider: z.enum(DECIDER_KINDS),
    /** TypeSafe model, http decision model, or the `provider/model` of a combo-model call. */
    model: z.string().trim().min(1).max(200).optional(),
    baseUrl: z
      .string()
      .trim()
      .max(500)
      .refine((value) => normalizeDecisionBaseUrl(value) !== undefined, {
        message: "baseUrl must be an http(s) URL without credentials, query or fragment",
      })
      .optional(),
    connectionId: z.string().trim().min(1).max(200).optional(),
    wire: z.enum(DECISION_WIRES).optional(),
    timeoutMs: z.coerce
      .number()
      .int()
      .min(MIN_DECISION_TIMEOUT_MS)
      .max(MAX_DECISION_TIMEOUT_MS)
      .optional(),
    minConfidence: z.coerce.number().min(0).max(1).optional(),
    // Keyed by model id or provider/model; capped like the decision menu.
    descriptions: z
      .record(
        z.string().trim().min(1).max(MAX_DECISION_DESCRIPTION_KEY_CHARS),
        z.string().trim().min(1).max(MAX_DECISION_DESCRIPTION_CHARS)
      )
      .refine((value) => Object.keys(value).length <= MAX_DECISION_MENU_ITEMS, {
        message: `At most ${MAX_DECISION_MENU_ITEMS} model descriptions`,
      })
      .optional(),
  })
  .strict();

export type DecisionRoutingConfig = z.infer<typeof decisionRoutingConfigSchema>;

export type DecisionConfigResolution =
  { valid: true; config: DecisionRoutingConfig } | { valid: false };

/** `undefined` when the combo has no decision block; `{valid:false}` when it fails the schema. */
export function resolveDecisionRoutingConfig(raw: unknown): DecisionConfigResolution | undefined {
  if (raw === undefined || raw === null) return undefined;
  const parsed = decisionRoutingConfigSchema.safeParse(raw);
  return parsed.success ? { valid: true, config: parsed.data } : { valid: false };
}
