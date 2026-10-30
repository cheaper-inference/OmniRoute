import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  buildShadowRequest,
  recommendShadow,
  compareShadowOutcome,
  summarizeShadow,
} from "../../../open-sse/services/typesafe/shadow.ts";

function input() {
  return {
    task: {
      id: "task-1",
      boundaryId: "phase-1",
      boundary: "phase",
      summary: "Review a parser change",
      dataClass: "internal",
      requiredCapabilities: ["tools"],
      requiredPermissions: ["read"],
      explicitModel: null as string | null,
      explicitHarness: null as string | null,
      handoff: {
        objectiveRef: "objective-1",
        planRef: "plan-1",
        workspaceRef: "workspace-1",
        branchRef: "branch-1",
        changeRefs: ["change-1"],
        testRefs: ["test-1"],
        outstandingRefs: [],
      },
    },
    policy: {
      version: "policy-1",
      approvedWorkspaceRefs: ["workspace-1"],
      approvedProfileIds: ["review", "build"],
      allowedPermissions: ["read"],
      remainingBudgetUsd: 1,
      maxEvaluationCostUsd: 0,
      minConfidence: 0.8,
    },
    profiles: [
      {
        id: "review",
        harness: "codex",
        model: "provider/reviewer",
        description: "Review code",
        approved: true,
        available: true,
        compatible: true,
        capabilities: ["tools"],
        permissions: ["read"],
        allowedDataClasses: ["public", "internal"],
        estimatedTaskCostUsd: 0.2,
      },
      {
        id: "build",
        harness: "claude",
        model: "provider/builder",
        description: "Implement code",
        approved: true,
        available: true,
        compatible: true,
        capabilities: ["tools"],
        permissions: ["read"],
        allowedDataClasses: ["public", "internal"],
        estimatedTaskCostUsd: 0.4,
      },
    ],
  };
}

function recording(value = input()) {
  const request = buildShadowRequest(value);
  return {
    source: "synthetic",
    requestSha256: request.requestSha256,
    latencyMs: 12,
    costUsd: 0,
    response: {
      model: "jev-1.14.0",
      answers: {
        route: {
          type: "choice",
          choice: "review",
          confidence: 0.9,
          probabilities: { review: 0.95, build: 0.05 },
        },
      },
    },
  };
}

test("records a recommendation only and preserves evidence without mutating the request", () => {
  const value = input();
  const before = structuredClone(value);
  const result = recommendShadow(value, recording(value));
  assert.equal(result.status, "recommended");
  assert.equal(result.profileId, "review");
  assert.equal(result.mode, "shadow");
  assert.equal(result.routeChanged, false);
  assert.equal(result.agentLaunched, false);
  assert.deepEqual(result.handoff, value.task.handoff);
  assert.deepEqual(value, before);
  assert.ok(!JSON.stringify(result).includes(value.task.summary));
});

test("request uses paired approved profiles and a pinned model", () => {
  const request = buildShadowRequest(input());
  assert.equal(request.payload.model, "jev-1.14.0");
  assert.deepEqual(Object.keys(request.payload.questions.route.criteria), ["review", "build"]);
  assert.match(request.payload.questions.route.criteria.review, /codex/);
  assert.match(request.payload.questions.route.criteria.review, /provider\/reviewer/);
});

for (const [name, edit] of [
  [
    "unapproved",
    (p: ReturnType<typeof input>["profiles"][number]) => {
      p.approved = false;
    },
  ],
  [
    "unavailable",
    (p: ReturnType<typeof input>["profiles"][number]) => {
      p.available = false;
    },
  ],
  [
    "incompatible",
    (p: ReturnType<typeof input>["profiles"][number]) => {
      p.compatible = false;
    },
  ],
  [
    "privacy",
    (p: ReturnType<typeof input>["profiles"][number]) => {
      p.allowedDataClasses = ["public"];
    },
  ],
  [
    "permissions",
    (p: ReturnType<typeof input>["profiles"][number]) => {
      p.permissions = ["read", "execute"];
    },
  ],
  [
    "budget",
    (p: ReturnType<typeof input>["profiles"][number]) => {
      p.estimatedTaskCostUsd = 2;
    },
  ],
  [
    "capabilities",
    (p: ReturnType<typeof input>["profiles"][number]) => {
      p.capabilities = [];
    },
  ],
] as const) {
  test(`excludes ${name} profiles before building the question`, () => {
    const value = input();
    edit(value.profiles[0]);
    assert.deepEqual(buildShadowRequest(value).eligibleProfileIds, ["build"]);
  });
}

test("explicit model and harness choices are hard filters, never overridden", () => {
  const value = input();
  value.task.explicitModel = "provider/builder";
  value.task.explicitHarness = "claude";
  const result = recommendShadow(value, null);
  assert.equal(result.profileId, "build");
  assert.equal(result.reason, "single_eligible");
  assert.equal(result.confidence, null);
  assert.equal(result.explicitModel, "provider/builder");
});

test("an unavailable explicit choice abstains instead of silently selecting another model", () => {
  const value = input();
  value.task.explicitModel = "provider/missing";
  const result = recommendShadow(value, recording());
  assert.equal(result.status, "abstained");
  assert.equal(result.reason, "no_eligible_profiles");
});

test("missing recording and policy failures are explicit abstentions", () => {
  assert.equal(recommendShadow(input(), null).reason, "missing_recording");
  const value = input();
  value.policy.allowedPermissions = [];
  assert.equal(recommendShadow(value, null).reason, "permission_denied");
});

test("a recording must match the exact task, boundary, policy and candidate question", () => {
  const value = input();
  const replay = recording(value);
  value.task.boundaryId = "phase-2";
  assert.equal(recommendShadow(value, replay).reason, "recording_mismatch");
  value.task.boundaryId = "phase-1";
  value.policy.version = "policy-2";
  assert.equal(recommendShadow(value, replay).reason, "recording_mismatch");
});

test("evaluation expense is gated separately and included in the total task budget", () => {
  const value = input();
  const replay = recording(value);
  replay.costUsd = 0.01;
  assert.equal(recommendShadow(value, replay).reason, "evaluation_budget");
  value.policy.maxEvaluationCostUsd = 0.01;
  value.policy.remainingBudgetUsd = 0.2;
  const bound = recording(value);
  bound.costUsd = 0.01;
  assert.equal(recommendShadow(value, bound).profileId, null);
  // Both profiles actually exceed the remaining budget once the classifier cost is included.
  assert.equal(recommendShadow(value, bound).reason, "no_eligible_profiles");
});

for (const [name, edit, reason] of [
  [
    "low confidence",
    (r: ReturnType<typeof recording>) => {
      r.response.answers.route.confidence = 0.2;
      r.response.answers.route.probabilities = { review: 0.6, build: 0.4 };
    },
    "low_confidence",
  ],
  [
    "unknown choice",
    (r: ReturnType<typeof recording>) => {
      r.response.answers.route.choice = "invented";
    },
    "invalid_response",
  ],
  [
    "out-of-range probability",
    (r: ReturnType<typeof recording>) => {
      r.response.answers.route.probabilities.review = 2;
    },
    "invalid_response",
  ],
  [
    "non-normalized probabilities",
    (r: ReturnType<typeof recording>) => {
      r.response.answers.route.probabilities.build = 0.9;
    },
    "invalid_response",
  ],
  [
    "wrong model",
    (r: ReturnType<typeof recording>) => {
      r.response.model = "jev-latest";
    },
    "invalid_response",
  ],
  [
    "choice not highest probability",
    (r: ReturnType<typeof recording>) => {
      r.response.answers.route.choice = "build";
    },
    "invalid_response",
  ],
] as const) {
  test(`abstains on ${name}`, () => {
    const replay = recording();
    edit(replay);
    assert.equal(recommendShadow(input(), replay).reason, reason);
  });
}

test("malformed, failed, or cancelled evaluations never become recommendations", () => {
  assert.equal(
    recommendShadow(input(), { ...recording(), response: {} }).reason,
    "invalid_response"
  );
  for (const error of [
    "timeout",
    "network_error",
    "missing_api_key",
    "http_401",
    "http_403",
    "http_429",
    "http_500",
    "cancelled",
  ]) {
    const result = recommendShadow(input(), { ...recording(), response: null, error });
    assert.equal(result.status, "abstained");
    assert.equal(result.reason, "evaluation_failed");
  }
});

test("rejects duplicate profile IDs, invalid numeric policy and non-boundary invocation", () => {
  const value = input();
  value.profiles[1].id = "review";
  assert.throws(() => buildShadowRequest(value), /Invalid shadow input/);
  assert.throws(
    () => buildShadowRequest({ ...input(), task: { ...input().task, boundary: "tool_call" } }),
    /Invalid shadow input/
  );
  assert.throws(
    () => buildShadowRequest({ ...input(), policy: { ...input().policy, minConfidence: NaN } }),
    /Invalid shadow input/
  );
});

test("snapshots evidence rather than retaining caller-owned arrays", () => {
  const value = input();
  const result = recommendShadow(value, recording(value));
  value.task.handoff.testRefs.push("later-test");
  assert.deepEqual(result.handoff.testRefs, ["test-1"]);
});

test("workspace evidence must belong to an operator-approved workspace", () => {
  const value = input();
  value.task.handoff.workspaceRef = "unapproved-workspace";
  assert.equal(recommendShadow(value, null).reason, "workspace_denied");
});

test("rejects excess evaluation latency and malformed recording metadata", () => {
  assert.equal(
    recommendShadow(input(), { ...recording(), latencyMs: 8001 }).reason,
    "evaluation_failed"
  );
  for (const change of [{ costUsd: -1 }, { latencyMs: Infinity }, { source: "live" }]) {
    assert.equal(
      recommendShadow(input(), { ...recording(), ...change }).reason,
      "invalid_recording"
    );
  }
});

test("matching executed profiles retain failed test evidence", () => {
  const result = recommendShadow(input(), recording());
  const comparison = compareShadowOutcome(result, {
    taskId: "task-1",
    boundaryId: "phase-1",
    source: "recorded",
    actualProfileId: "review",
    success: false,
    testsPassed: false,
    durationMs: 10,
    costUsd: 0.1,
  });
  assert.equal(comparison.matchedRecommendation, true);
  assert.equal(comparison.recommendedProfileSucceeded, false);
  assert.equal(summarizeShadow([comparison]).testsFailedTasks, 1);
});

test("compares with observed execution only, never claims counterfactual success", () => {
  const result = recommendShadow(input(), recording());
  const comparison = compareShadowOutcome(result, {
    taskId: "task-1",
    boundaryId: "phase-1",
    source: "recorded",
    actualProfileId: "build",
    success: true,
    testsPassed: true,
    durationMs: 100,
    costUsd: 0.3,
  });
  assert.equal(comparison.matchedRecommendation, false);
  assert.equal(comparison.recommendedProfileSucceeded, null);
  assert.equal(comparison.totalObservedCostUsd, 0.3);
  const summary = summarizeShadow([comparison]);
  assert.equal(summary.completedTasks, 1);
  assert.equal(summary.matchedRecommendations, 0);
  assert.equal(summary.successfulObservedTasks, 1);
  assert.equal(summary.totalObservedLatencyMs, 100);
  assert.equal(comparison.scenarioTotalLatencyMs, 112);
});

test("outcome correlation and duplicate accounting are validated", () => {
  const result = recommendShadow(input(), recording());
  const outcome = {
    taskId: "other-task",
    boundaryId: "phase-1",
    source: "recorded",
    actualProfileId: "review",
    success: true,
    testsPassed: true,
    durationMs: 1,
    costUsd: 0,
  };
  assert.throws(() => compareShadowOutcome(result, outcome), /Outcome does not match/);
  outcome.taskId = "task-1";
  const compared = compareShadowOutcome(result, outcome);
  assert.throws(() => summarizeShadow([compared, compared]), /Duplicate boundary/);
});

test("the offline evaluator cannot import networking or launcher machinery", () => {
  for (const path of ["shadow.ts", "shadowPolicy.ts"]) {
    const source = readFileSync(
      new URL(`../../../open-sse/services/typesafe/${path}`, import.meta.url),
      "utf8"
    );
    assert.doesNotMatch(
      source,
      /\bfetch\s*\(|node:(?:http|https|net|child_process)|acpManager|evaluateSystemOneChoice\s*\(/
    );
  }
});
