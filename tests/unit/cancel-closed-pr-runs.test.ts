import test from "node:test";
import assert from "node:assert/strict";

const { selectRunsToCancel } = await import("../../scripts/ci/cancel-closed-pr-runs.mjs");

const REPO = "cheaper-inference/OmniRoute";
const ctx = { prNumber: 42, headRef: "fix/thing", headRepo: REPO, selfRunId: 999 };

function run(over: Record<string, unknown>) {
  return {
    id: 1,
    name: "CI",
    status: "queued",
    event: "pull_request",
    head_branch: "fix/thing",
    head_repository: { full_name: REPO },
    pull_requests: [],
    ...over,
  };
}

test("cancels queued and running PR runs of the closed PR's branch", () => {
  const picked = selectRunsToCancel(
    [run({ id: 1 }), run({ id: 2, status: "in_progress" }), run({ id: 3, status: "waiting" })],
    ctx
  );
  assert.deepEqual(
    picked.map((r: { id: number }) => r.id),
    [1, 2, 3]
  );
});

test("takes a run GitHub links to the PR by number, even from a fork", () => {
  const fork = run({
    id: 5,
    head_repository: { full_name: "someone/OmniRoute" },
    pull_requests: [{ number: 42 }],
  });
  assert.deepEqual(
    selectRunsToCancel([fork], ctx).map((r: { id: number }) => r.id),
    [5]
  );
});

test("leaves finished runs, non-PR events, other branches, forks and itself alone", () => {
  const keep = [
    run({ id: 10, status: "completed" }),
    run({ id: 11, event: "push" }),
    run({ id: 12, event: "schedule" }),
    run({ id: 13, head_branch: "fix/other" }),
    // Fork with the same branch name, not linked to this PR number.
    run({ id: 14, head_repository: { full_name: "someone/OmniRoute" } }),
    run({ id: 999 }),
    run({ id: 15, pull_requests: [{ number: 7 }], head_branch: "fix/other" }),
  ];
  assert.deepEqual(selectRunsToCancel(keep, ctx), []);
});
