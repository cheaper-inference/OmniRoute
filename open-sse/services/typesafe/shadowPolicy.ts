import { z } from "zod";

const identifier = z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_.:/-]{0,127}$/);
const identifiers = z.array(identifier).max(255);
const money = z.number().finite().nonnegative().max(1_000_000);
const permission = z.enum(["read", "write", "execute", "network"]);
const permissions = z.array(permission).max(4);
const dataClass = z.enum(["public", "internal", "restricted"]);

export const shadowInputSchema = z
  .object({
    task: z
      .object({
        id: identifier,
        boundaryId: identifier,
        boundary: z.enum(["task", "phase"]),
        summary: z.string().trim().min(1).max(4000),
        dataClass,
        requiredCapabilities: identifiers,
        requiredPermissions: permissions,
        explicitModel: identifier.nullable(),
        explicitHarness: identifier.nullable(),
        handoff: z
          .object({
            objectiveRef: identifier,
            planRef: identifier,
            workspaceRef: identifier,
            branchRef: identifier,
            changeRefs: identifiers,
            testRefs: identifiers,
            outstandingRefs: identifiers,
          })
          .strict(),
      })
      .strict(),
    policy: z
      .object({
        version: identifier,
        approvedWorkspaceRefs: identifiers,
        approvedProfileIds: identifiers,
        allowedPermissions: permissions,
        remainingBudgetUsd: money,
        maxEvaluationCostUsd: money,
        minConfidence: z.number().finite().min(0).max(1),
        maxEvaluationLatencyMs: z.number().int().positive().max(60_000).default(8000),
      })
      .strict(),
    profiles: z
      .array(
        z
          .object({
            id: identifier,
            harness: identifier,
            model: identifier,
            description: z.string().trim().min(1).max(500),
            approved: z.boolean(),
            available: z.boolean(),
            compatible: z.boolean(),
            capabilities: identifiers,
            permissions,
            allowedDataClasses: z.array(dataClass).max(3),
            estimatedTaskCostUsd: money,
          })
          .strict()
      )
      .max(255)
      .refine(
        (profiles) => new Set(profiles.map((profile) => profile.id)).size === profiles.length
      ),
  })
  .strict();

export type ShadowInput = z.infer<typeof shadowInputSchema>;
export type ShadowProfile = ShadowInput["profiles"][number];
export type ExclusionReason =
  | "unapproved"
  | "unavailable"
  | "incompatible"
  | "privacy"
  | "permissions"
  | "capabilities"
  | "budget"
  | "explicit_model"
  | "explicit_harness";

/** The caller supplies a trusted operator catalog, never a model-generated catalog. */
export function parseShadowInput(value: unknown): ShadowInput {
  const parsed = shadowInputSchema.safeParse(value);
  if (!parsed.success) throw new Error("Invalid shadow input");
  return parsed.data;
}

export function profileExclusion(
  input: ShadowInput,
  profile: ShadowProfile,
  evaluationCostUsd = 0
): ExclusionReason | null {
  const { task, policy } = input;
  if (!profile.approved || !policy.approvedProfileIds.includes(profile.id)) return "unapproved";
  if (!profile.available) return "unavailable";
  if (!profile.compatible) return "incompatible";
  if (!profile.allowedDataClasses.includes(task.dataClass)) return "privacy";
  if (
    profile.permissions.some((p) => !policy.allowedPermissions.includes(p)) ||
    task.requiredPermissions.some((p) => !profile.permissions.includes(p))
  )
    return "permissions";
  if (task.requiredCapabilities.some((c) => !profile.capabilities.includes(c)))
    return "capabilities";
  if (profile.estimatedTaskCostUsd + evaluationCostUsd > policy.remainingBudgetUsd) return "budget";
  if (task.explicitModel !== null && task.explicitModel !== profile.model) return "explicit_model";
  if (task.explicitHarness !== null && task.explicitHarness !== profile.harness)
    return "explicit_harness";
  return null;
}

export const shadowRecordingSchema = z
  .object({
    source: z.enum(["synthetic", "recorded"]),
    requestSha256: z.string().regex(/^[a-f0-9]{64}$/),
    latencyMs: z.number().finite().nonnegative().max(86_400_000),
    costUsd: money,
    response: z.unknown(),
    error: z
      .enum([
        "timeout",
        "network_error",
        "missing_api_key",
        "http_401",
        "http_403",
        "http_429",
        "http_500",
        "cancelled",
      ])
      .optional(),
  })
  .strict();

export const shadowChoiceSchema = z
  .object({
    model: z.literal("jev-1.14.0"),
    answers: z
      .object({
        route: z
          .object({
            type: z.literal("choice"),
            choice: identifier,
            confidence: z.number().finite().min(0).max(1),
            probabilities: z.record(identifier, z.number().finite().min(0).max(1)),
          })
          .strict(),
      })
      .strict(),
    usage: z
      .object({
        input_tokens: z.number().int().nonnegative(),
        output_tokens: z.number().int().nonnegative(),
      })
      .optional(),
  })
  .strict();

export const shadowOutcomeSchema = z
  .object({
    taskId: identifier,
    boundaryId: identifier,
    source: z.enum(["synthetic", "recorded"]),
    actualProfileId: identifier,
    success: z.boolean(),
    testsPassed: z.boolean().nullable(),
    durationMs: z.number().finite().nonnegative(),
    costUsd: money,
  })
  .strict();
