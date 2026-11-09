import { z } from "zod";
import { PII_BUILTIN_TYPES, PII_CUSTOM_PATTERN_LIMITS } from "@/shared/constants/piiTypes";
import {
  compilePiiCustomPattern,
  PII_PATTERN_REJECTION_MESSAGES,
} from "@/shared/utils/piiCustomPatterns";

// Not re-exported from the schemas barrel: it pulls `safe-regex` in, and only
// the PII settings routes need it.

const patternTypeSchema = z.enum(["regex", "wildcard"]);
const flagsSchema = z
  .string()
  .max(5)
  .regex(/^[gimsu]*$/, "Flags may only contain g, i, m, s and u")
  .optional();
const patternSchema = z.string().min(1).max(PII_CUSTOM_PATTERN_LIMITS.maxPatternLength);

function refusePatternsThatFailTheGate(
  value: { type: "regex" | "wildcard"; pattern: string; flags?: string },
  ctx: z.RefinementCtx
) {
  const compiled = compilePiiCustomPattern(value);
  if ("reason" in compiled) {
    ctx.addIssue({
      code: "custom",
      path: ["pattern"],
      message: PII_PATTERN_REJECTION_MESSAGES[compiled.reason],
    });
  }
}

export const piiCustomPatternSchema = z
  .object({
    id: z.string().trim().min(1).max(PII_CUSTOM_PATTERN_LIMITS.maxIdLength),
    name: z.string().trim().min(1).max(PII_CUSTOM_PATTERN_LIMITS.maxNameLength),
    type: patternTypeSchema,
    pattern: patternSchema,
    flags: flagsSchema,
    enabled: z.boolean().default(true),
  })
  .strict()
  .superRefine(refusePatternsThatFailTheGate);

export const updatePiiSettingsSchema = z
  .object({
    enabledTypes: z
      .array(z.enum(PII_BUILTIN_TYPES))
      .max(PII_BUILTIN_TYPES.length)
      .nullable()
      .optional(),
    customPatterns: z
      .array(piiCustomPatternSchema)
      .max(PII_CUSTOM_PATTERN_LIMITS.maxPatterns)
      .optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.enabledTypes === undefined && value.customPatterns === undefined) {
      ctx.addIssue({ code: "custom", path: [], message: "Nothing to update" });
    }
    const ids = (value.customPatterns ?? []).map((pattern) => pattern.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({
        code: "custom",
        path: ["customPatterns"],
        message: "Custom pattern ids must be unique",
      });
    }
  });

export const testPiiPatternSchema = z
  .object({
    type: patternTypeSchema.default("regex"),
    pattern: patternSchema,
    flags: flagsSchema,
    sampleText: z
      .string()
      .max(PII_CUSTOM_PATTERN_LIMITS.maxSampleBytes)
      .refine(
        (text) => new TextEncoder().encode(text).length <= PII_CUSTOM_PATTERN_LIMITS.maxSampleBytes,
        `sampleText must be at most ${PII_CUSTOM_PATTERN_LIMITS.maxSampleBytes} bytes`
      ),
  })
  .strict()
  .superRefine(refusePatternsThatFailTheGate);
