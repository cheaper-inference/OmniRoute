/**
 * Offline, task/phase-boundary advice. No transport, credential access, routing,
 * process launch, or database dependency. OmniRoute routing stays untouched.
 * Wire shape follows System One; live transport is deliberately not connected.
 */
import { createHash } from "node:crypto";
import {
  parseShadowInput,
  profileExclusion,
  shadowChoiceSchema,
  shadowOutcomeSchema,
  shadowRecordingSchema,
} from "./shadowPolicy.ts";
import type { ShadowInput, ShadowProfile } from "./shadowPolicy.ts";

export const SHADOW_QUESTION_VERSION = "profile-choice-v1";
const INSTRUCTIONS = "Which approved model/harness profile best fits this coding task?";

function prepare(input: ShadowInput) {
  const exclusions = input.profiles.flatMap((profile) => {
    const reason = profileExclusion(input, profile);
    return reason ? [{ profileId: profile.id, reason }] : [];
  });
  const eligible = input.profiles.filter((profile) => !profileExclusion(input, profile));
  const payload = {
    model: "jev-1.14.0",
    state: {
      summary: input.task.summary,
      boundary: input.task.boundary,
      requiredCapabilities: input.task.requiredCapabilities,
    },
    questions: {
      route: {
        type: "choice",
        instructions: INSTRUCTIONS,
        criteria: Object.fromEntries(
          eligible.map((profile) => [
            profile.id,
            `${profile.description}; harness=${profile.harness}; model=${profile.model}`,
          ])
        ),
      },
    },
  };
  // Bind to all policy and evidence inputs, not just the text shown to Jev.
  const requestSha256 = createHash("sha256")
    .update(
      JSON.stringify({
        questionVersion: SHADOW_QUESTION_VERSION,
        input,
        payload,
      })
    )
    .digest("hex");
  return { payload, requestSha256, eligibleProfileIds: eligible.map((p) => p.id), exclusions };
}

/** Preview only; this function does not send or persist the payload. */
export function buildShadowRequest(value: unknown) {
  return prepare(parseShadowInput(value));
}

export type ShadowReason =
  | "workspace_denied"
  | "recommended"
  | "single_eligible"
  | "permission_denied"
  | "no_eligible_profiles"
  | "missing_recording"
  | "invalid_recording"
  | "recording_mismatch"
  | "evaluation_budget"
  | "evaluation_failed"
  | "invalid_response"
  | "low_confidence"
  | "selected_profile_ineligible";

export interface ShadowRecommendation {
  mode: "shadow";
  questionVersion: string;
  policyVersion: string;
  taskId: string;
  boundaryId: string;
  boundary: "task" | "phase";
  requestSha256: string;
  status: "recommended" | "abstained";
  reason: ShadowReason;
  profileId: string | null;
  harness: string | null;
  model: string | null;
  confidence: number | null;
  explicitModel: string | null;
  explicitHarness: string | null;
  handoff: ShadowInput["task"]["handoff"];
  exclusions: ReturnType<typeof prepare>["exclusions"];
  evaluationSource: "synthetic" | "recorded" | "none";
  evaluationLatencyMs: number;
  evaluationCostUsd: number;
  evaluatorModel: string | null;
  routeChanged: false;
  agentLaunched: false;
}

function select(record: ShadowRecommendation, profile: ShadowProfile, reason: ShadowReason) {
  return {
    ...record,
    status: "recommended" as const,
    reason,
    profileId: profile.id,
    harness: profile.harness,
    model: profile.model,
  };
}

/** Consume an explicitly supplied fixture/recording. Never invokes an evaluator. */
export function recommendShadow(value: unknown, recording: unknown): ShadowRecommendation {
  const input = parseShadowInput(value);
  const request = prepare(input);
  const record: ShadowRecommendation = {
    mode: "shadow",
    questionVersion: SHADOW_QUESTION_VERSION,
    policyVersion: input.policy.version,
    taskId: input.task.id,
    boundaryId: input.task.boundaryId,
    boundary: input.task.boundary,
    requestSha256: request.requestSha256,
    status: "abstained",
    reason: "missing_recording",
    profileId: null,
    harness: null,
    model: null,
    confidence: null,
    explicitModel: input.task.explicitModel,
    explicitHarness: input.task.explicitHarness,
    handoff: structuredClone(input.task.handoff),
    exclusions: request.exclusions,
    evaluationSource: "none",
    evaluationLatencyMs: 0,
    evaluationCostUsd: 0,
    evaluatorModel: null,
    routeChanged: false,
    agentLaunched: false,
  };
  const abstain = (reason: ShadowReason): ShadowRecommendation => ({ ...record, reason });
  if (!input.policy.approvedWorkspaceRefs.includes(input.task.handoff.workspaceRef))
    return abstain("workspace_denied");
  if (input.task.requiredPermissions.some((p) => !input.policy.allowedPermissions.includes(p)))
    return abstain("permission_denied");
  if (request.eligibleProfileIds.length === 0) return abstain("no_eligible_profiles");
  if (request.eligibleProfileIds.length === 1 && (recording === null || recording === undefined)) {
    const only = input.profiles.find((p) => p.id === request.eligibleProfileIds[0])!;
    return select(record, only, "single_eligible");
  }
  if (recording === null || recording === undefined) return record;
  const parsed = shadowRecordingSchema.safeParse(recording);
  if (!parsed.success) return abstain("invalid_recording");
  const replay = parsed.data;
  if (replay.requestSha256 !== request.requestSha256) return abstain("recording_mismatch");
  record.evaluationSource = replay.source;
  record.evaluationLatencyMs = replay.latencyMs;
  record.evaluationCostUsd = replay.costUsd;
  if (replay.costUsd > input.policy.maxEvaluationCostUsd) return abstain("evaluation_budget");
  if (replay.error || replay.latencyMs > input.policy.maxEvaluationLatencyMs)
    return abstain("evaluation_failed");
  const eligible = input.profiles.filter((p) => !profileExclusion(input, p, replay.costUsd));
  if (!eligible.length) return abstain("no_eligible_profiles");
  const answer = shadowChoiceSchema.safeParse(replay.response);
  if (!answer.success) return abstain("invalid_response");
  const route = answer.data.answers.route;
  const keys = Object.keys(route.probabilities);
  const probabilities = Object.values(route.probabilities);
  const sum = probabilities.reduce((total, p) => total + p, 0);
  const selected = route.probabilities[route.choice];
  const expectedConfidence =
    keys.length === 1 ? 1 : (Math.max(...probabilities) - 1 / keys.length) / (1 - 1 / keys.length);
  if (
    keys.length !== request.eligibleProfileIds.length ||
    keys.some((key) => !request.eligibleProfileIds.includes(key)) ||
    !request.eligibleProfileIds.includes(route.choice) ||
    Math.abs(sum - 1) > 0.001 ||
    selected !== Math.max(...probabilities) ||
    Math.abs(expectedConfidence - route.confidence) > 0.001
  )
    return abstain("invalid_response");
  record.evaluatorModel = answer.data.model;
  record.confidence = route.confidence;
  if (route.confidence < input.policy.minConfidence) return abstain("low_confidence");
  const profile = eligible.find((p) => p.id === route.choice);
  if (!profile) return abstain("selected_profile_ineligible");
  return select(record, profile, "recommended");
}

/** Observations are caller-supplied evidence, not predictions of unexecuted work. */
export function compareShadowOutcome(recommendation: ShadowRecommendation, value: unknown) {
  const parsed = shadowOutcomeSchema.safeParse(value);
  if (!parsed.success) throw new Error("Invalid shadow outcome");
  const outcome = parsed.data;
  if (outcome.taskId !== recommendation.taskId || outcome.boundaryId !== recommendation.boundaryId)
    throw new Error("Outcome does not match recommendation boundary");
  const matchedRecommendation =
    recommendation.profileId === null ? null : recommendation.profileId === outcome.actualProfileId;
  return {
    recommendation,
    outcome,
    matchedRecommendation,
    recommendedProfileSucceeded: matchedRecommendation === true ? outcome.success : null,
    totalObservedCostUsd:
      (outcome.source === "recorded" ? outcome.costUsd : 0) +
      (recommendation.evaluationSource === "recorded" ? recommendation.evaluationCostUsd : 0),
    totalObservedLatencyMs:
      (outcome.source === "recorded" ? outcome.durationMs : 0) +
      (recommendation.evaluationSource === "recorded" ? recommendation.evaluationLatencyMs : 0),
    scenarioTotalCostUsd: outcome.costUsd + recommendation.evaluationCostUsd,
    scenarioTotalLatencyMs: outcome.durationMs + recommendation.evaluationLatencyMs,
  };
}

export type ShadowComparison = ReturnType<typeof compareShadowOutcome>;

export function summarizeShadow(comparisons: ShadowComparison[]) {
  const seen = new Set<string>();
  for (const { recommendation } of comparisons) {
    const key = JSON.stringify([recommendation.taskId, recommendation.boundaryId]);
    if (seen.has(key)) throw new Error("Duplicate boundary in shadow comparison");
    seen.add(key);
  }
  return {
    completedTasks: comparisons.length,
    matchedRecommendations: comparisons.filter((c) => c.matchedRecommendation === true).length,
    successfulObservedTasks: comparisons.filter((c) => c.outcome.success).length,
    testsPassedTasks: comparisons.filter((c) => c.outcome.testsPassed === true).length,
    testsFailedTasks: comparisons.filter((c) => c.outcome.testsPassed === false).length,
    measuredRecommendationComparisons: comparisons.filter(
      (c) => c.recommendation.evaluationSource === "recorded" && c.outcome.source === "recorded"
    ).length,
    abstentions: comparisons.filter((c) => c.recommendation.status === "abstained").length,
    totalObservedCostUsd: comparisons.reduce((sum, c) => sum + c.totalObservedCostUsd, 0),
    totalObservedLatencyMs: comparisons.reduce((sum, c) => sum + c.totalObservedLatencyMs, 0),
    syntheticOutcomes: comparisons.filter((c) => c.outcome.source === "synthetic").length,
    recordedOutcomes: comparisons.filter((c) => c.outcome.source === "recorded").length,
  };
}
