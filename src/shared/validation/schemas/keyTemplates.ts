import { z } from "zod";
import { API_KEY_CODEX_SERVICE_MODES } from "../../constants/codexServiceMode";
import { accessScheduleSchema } from "./misc.ts";
import {
  createReasoningRoutingRuleSchema,
  reasoningEffortSchema,
  reasoningSourceEffortSchema,
} from "./reasoningRouting.ts";

// Field bounds mirror createKeySchema / updateKeyPermissionsSchema, setBudgetSchema,
// setKeyQuotaSchema, setTokenLimitSchema and the reasoning-rule schema, so a template
// can hold exactly what the normal forms can store.

const modelRuleList = z.array(z.string().trim().min(1)).max(1000);
const resetIntervalSchema = z.enum(["daily", "weekly", "monthly"]);
const hhmmSchema = z
  .string()
  .trim()
  .regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format");
const nullableCount = z.number().int().min(0).nullable();

export const keyTemplateKeyPolicySchema = z
  .object({
    modelAccessMode: z.enum(["all", "restricted"]),
    allowedModels: modelRuleList,
    blockedModels: modelRuleList,
    allowedCombos: z.array(z.string().trim().min(1).max(200)).max(500),
    allowedConnections: z.array(z.string().uuid()).max(100),
    preferredConnections: z.array(z.string().uuid()).max(100),
    allowedQuotas: z.array(z.string().trim().min(1).max(200)).max(100),
    noLog: z.boolean(),
    autoResolve: z.boolean(),
    isActive: z.boolean(),
    isBanned: z.boolean(),
    accessSchedule: accessScheduleSchema.strict().nullable(),
    maxRequestsPerDay: nullableCount,
    maxRequestsPerMinute: nullableCount,
    throttleDelayMs: z.number().int().min(0).max(300000).nullable(),
    rateLimits: z
      .array(
        z
          .object({ limit: z.number().int().positive(), window: z.number().int().positive() })
          .strict()
      )
      .max(50)
      .nullable(),
    maxSessions: z.number().int().min(0).max(10000),
    ipAllowlist: z.array(z.string().trim().min(1).max(100)).max(200),
    scopes: z.array(z.string().trim().min(1).max(64)).max(32),
    proxyId: z.string().trim().min(1).max(200).nullable(),
    allowedEndpoints: z.array(z.string().trim().min(1).max(64)).max(20),
    streamDefaultMode: z.enum(["legacy", "json"]),
    codexServiceMode: z.enum(API_KEY_CODEX_SERVICE_MODES),
    cacheDefaultMode: z.enum(["legacy", "bypass"]),
    disableNonPublicModels: z.boolean(),
    allowUsageCommand: z.boolean(),
    usageLimitEnabled: z.boolean(),
    dailyUsageLimitUsd: z.number().min(0).nullable(),
    weeklyUsageLimitUsd: z.number().min(0).nullable(),
    fiveHourUsageLimitUsd: z.number().min(0).nullable().default(null),
    chaosModeEnabled: z.boolean(),
    compressionEnabled: z.boolean(),
    allowAutoCombos: z.boolean(),
    allowCcDiscoveryAliases: z.boolean(),
    catalogScope: z.enum(["all", "combos", "models"]),
    forcedModel: z.string().trim().min(1).max(300).nullable(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.modelAccessMode === "all" && value.allowedModels.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "allowedModels must be empty when modelAccessMode is 'all'",
        path: ["allowedModels"],
      });
    }
    if (value.scopes.includes("lease:exclusive") && value.allowedConnections.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "lease:exclusive requires explicit allowedConnections",
        path: ["allowedConnections"],
      });
    }
    if (value.allowedConnections.length > 0 && value.preferredConnections.length > 0) {
      const allowed = new Set(value.allowedConnections);
      if (value.preferredConnections.some((id) => !allowed.has(id))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "preferredConnections must be a subset of allowedConnections",
          path: ["preferredConnections"],
        });
      }
    }
  });

const domainBudgetSchema = z
  .object({
    dailyLimitUsd: z.number().min(0),
    weeklyLimitUsd: z.number().min(0),
    monthlyLimitUsd: z.number().min(0),
    warningThreshold: z.number().min(0).max(1),
    resetInterval: resetIntervalSchema,
    resetTime: hhmmSchema,
  })
  .strict();

const quotaLimitsSchema = z
  .object({
    tpmLimit: z.number().min(0).nullable(),
    rpmLimit: z.number().min(0).nullable(),
    monthlyAmountUsd: z.number().min(0).nullable(),
  })
  .strict();

const tokenLimitSchema = z
  .object({
    scopeType: z.enum(["model", "provider", "global"]),
    scopeValue: z.string().trim(),
    tokenLimit: z.number().int().positive(),
    resetInterval: resetIntervalSchema,
    resetTime: hhmmSchema.nullable(),
    enabled: z.boolean(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.scopeType !== "global" && value.scopeValue.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "scopeValue is required unless scopeType is 'global'",
        path: ["scopeValue"],
      });
    }
  });

const autoCandidateOverrideSchema = z
  .object({
    autoChannel: z.string().trim().min(1).max(200),
    connectionId: z.string().trim().min(1).max(200),
    excluded: z.boolean(),
  })
  .strict();

/** Placeholder satisfying the reasoning schema's apiKey check; replaced by the new key id. */
const TEMPLATE_KEY_PLACEHOLDER = "key-template-placeholder";

const reasoningRuleSchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    description: z.string().trim().max(1000),
    scope: z.literal("apiKey"),
    comboId: z.string().trim().min(1).nullable(),
    connectionId: z.string().trim().min(1).nullable(),
    modelPattern: z.string().trim().min(1).max(500).nullable(),
    sourceEffort: reasoningSourceEffortSchema,
    requestTags: z.array(z.string().trim().min(1).max(100)).max(20),
    tagMatchMode: z.enum(["any", "all"]),
    effortMode: z.enum(["inherit", "default", "force"]),
    targetEffort: reasoningEffortSchema.nullable(),
    targetKind: z.enum(["keep", "model", "combo"]),
    targetModel: z.string().trim().min(1).max(500).nullable(),
    targetComboId: z.string().trim().min(1).nullable(),
    budgetAction: z.enum(["preserve", "remove", "set"]),
    budgetTokens: z.number().int().positive().max(10_000_000).nullable(),
    priority: z.number().int().min(-1_000_000).max(1_000_000),
    enabled: z.boolean(),
  })
  .strict()
  .superRefine((value, ctx) => {
    // Reuse the canonical cross-field rules of reasoning routing rules.
    const result = createReasoningRoutingRuleSchema.safeParse({
      ...value,
      apiKeyId: TEMPLATE_KEY_PLACEHOLDER,
    });
    if (!result.success) {
      for (const zodIssue of result.error.issues) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: zodIssue.message,
          path: zodIssue.path,
        });
      }
    }
  });

export const keyTemplateRelatedPolicySchema = z
  .object({
    groupIds: z.array(z.string().trim().min(1).max(200)).max(100),
    domainBudget: domainBudgetSchema.nullable(),
    quotaLimits: quotaLimitsSchema.nullable(),
    tokenLimits: z.array(tokenLimitSchema).max(200),
    autoCandidateOverrides: z.array(autoCandidateOverrideSchema).max(500),
    reasoningRules: z.array(reasoningRuleSchema).max(100),
  })
  .strict()
  .superRefine((value, ctx) => {
    const duplicate = (path: string, keys: string[], message: string) => {
      const seen = new Set<string>();
      keys.forEach((key, index) => {
        if (seen.has(key)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [path, index] });
        }
        seen.add(key);
      });
    };
    duplicate("groupIds", value.groupIds, "Duplicate group membership");
    duplicate(
      "tokenLimits",
      value.tokenLimits.map((l) =>
        JSON.stringify([l.scopeType, l.scopeType === "global" ? "" : l.scopeValue, l.resetInterval])
      ),
      "Duplicate token limit for the same scope and window"
    );
    duplicate(
      "autoCandidateOverrides",
      value.autoCandidateOverrides.map((o) => JSON.stringify([o.autoChannel, o.connectionId])),
      "Duplicate auto-candidate override"
    );
  });

export const keyTemplateExpirySchema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("none") }).strict(),
  z
    .object({
      mode: z.literal("relative"),
      // Up to ten years.
      ttlSeconds: z.number().int().positive().max(315_360_000),
    })
    .strict(),
]);

export const keyTemplatePolicySchema = z
  .object({
    schemaVersion: z.literal(1),
    key: keyTemplateKeyPolicySchema,
    related: keyTemplateRelatedPolicySchema,
    expiry: keyTemplateExpirySchema,
  })
  .strict();

const templateNameSchema = z.string().trim().min(1, "Name is required").max(200);
const templateDescriptionSchema = z.string().trim().max(2000);

export const createKeyTemplateSchema = z
  .object({
    name: templateNameSchema,
    description: templateDescriptionSchema.optional(),
    policy: keyTemplatePolicySchema.optional(),
    fromKeyId: z.string().trim().min(1).max(200).optional(),
    acknowledge: z.array(z.string().trim().min(1).max(64)).max(32).optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if ((value.policy === undefined) === (value.fromKeyId === undefined)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide exactly one of policy or fromKeyId",
        path: ["policy"],
      });
    }
    if (value.acknowledge !== undefined && value.fromKeyId === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "acknowledge is only accepted with fromKeyId",
        path: ["acknowledge"],
      });
    }
  });

export const updateKeyTemplateSchema = z
  .object({
    revision: z.number().int().positive(),
    name: templateNameSchema.optional(),
    description: templateDescriptionSchema.optional(),
    policy: keyTemplatePolicySchema.optional(),
  })
  .strict()
  .refine(
    (value) =>
      value.name !== undefined || value.description !== undefined || value.policy !== undefined,
    { message: "No fields to update", path: [] }
  );

export const createKeyFromPolicySchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(200),
    policy: keyTemplatePolicySchema,
    templateRef: z
      .object({ id: z.string().trim().min(1).max(200), revision: z.number().int().positive() })
      .strict()
      .optional(),
  })
  .strict();
