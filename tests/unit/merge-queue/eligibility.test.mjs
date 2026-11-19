// omni-queue eligibility (scripts/merge-queue/eligibility.mjs): plan §3.3 rules, approval bound
// to the exact head through the approve.mjs commit status, and batch selection.
import assert from "node:assert/strict";
import test from "node:test";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";
import {
  APPROVAL_CONTEXTS,
  APPROVAL_STATUS_SKEW_SECONDS,
  INELIGIBLE_REASONS,
  initialState,
} from "../../../scripts/merge-queue/contracts.mjs";
import {
  approvalFor,
  evaluateEligibility,
  currentBatchWindow,
  currentSuitePredicate,
  frozenBranches,
  isBaseFrozen,
  laneOf,
  prCheckState,
  prChecksNeedWorkflowRuns,
  prGatesReason,
  selectBatch,
  selectLane,
} from "../../../scripts/merge-queue/eligibility.mjs";

const config = loadConfig();
const shadowConfig = config; // the committed config runs in shadow mode
const liveConfig = { ...config, mode: "live" };
const BASE = "release/v3.8.54";
const HEAD = "1".repeat(40);
const OTHER_HEAD = "2".repeat(40);
const APPROVER = config.approvers[0];
const BOT = `${config.appSlug}[bot]`;
const NOW = "2026-11-13T12:00:00.000Z";

// Ages relative to the approval window (contracts.APPROVAL_STATUS_SKEW_SECONDS): a label older than
// SKEW_MIN without its status means the head changed after the label.
const SKEW_MIN = APPROVAL_STATUS_SKEW_SECONDS / 60;
const OLD = SKEW_MIN + 30;

const iso = (minutesBeforeNow) =>
  new Date(Date.parse(NOW) - minutesBeforeNow * 60000).toISOString();

function labeledEvent(label, actor, minutesAgo) {
  return { event: "labeled", actor, label, createdAt: iso(minutesAgo) };
}

function approvalStatus(kind, minutesAgo, overrides = {}) {
  return {
    context: APPROVAL_CONTEXTS[kind],
    state: "success",
    creator: BOT,
    description: `approved by ${APPROVER}`,
    createdAt: iso(minutesAgo),
    targetUrl: null,
    ...overrides,
  };
}

/** An eligible PR: labeled by the approver OLD min ago, approval status recorded on its head. */
function makePr(overrides = {}) {
  return {
    number: 101,
    state: "open",
    draft: false,
    merged: false,
    baseRef: BASE,
    headSha: HEAD,
    title: "fix(sse): keep stops",
    author: "contributor",
    labels: [config.label],
    mergeable: true,
    mergeableState: "clean",
    files: ["open-sse/handlers/chatCore.ts"],
    timeline: [labeledEvent(config.label, APPROVER, OLD)],
    headStatuses: [approvalStatus("queue", OLD)],
    prGreenCheck: "success",
    ...overrides,
  };
}

function makeCtx(overrides = {}) {
  return {
    config: liveConfig,
    freezeIssues: [],
    state: initialState(BASE, NOW),
    now: NOW,
    ...overrides,
  };
}

const codes = (result) => result.reasons.map((r) => r.code);

test("a labeled, approved, clean PR is eligible with no actions", () => {
  const result = evaluateEligibility(makePr(), makeCtx());
  assert.equal(result.eligible, true);
  assert.deepEqual(result.reasons, []);
  assert.deepEqual(result.actions, []);
  assert.equal(result.protectedSurface, false);
  assert.deepEqual(result.approval, {
    valid: true,
    actor: APPROVER,
    labeledAt: iso(OLD),
    reason: null,
  });
});

test("every reason code returned is a contract code", () => {
  const pr = makePr({
    draft: true,
    labels: [config.label, "hold"],
    mergeable: false,
    files: ["AGENTS.md"],
  });
  const result = evaluateEligibility(pr, makeCtx());
  for (const code of codes(result)) assert.ok(INELIGIBLE_REASONS.includes(code), code);
  assert.deepEqual(codes(result).sort(), [
    "blocked-label",
    "conflicting",
    "draft",
    "protected-approval-missing",
  ]);
});

test("closed or merged PRs are not-open and get no actions", () => {
  for (const pr of [makePr({ state: "closed" }), makePr({ state: "closed", merged: true })]) {
    const result = evaluateEligibility(pr, makeCtx());
    assert.equal(result.eligible, false);
    assert.deepEqual(codes(result), ["not-open"]);
    assert.deepEqual(result.actions, []);
  }
});

test("draft PRs are not eligible", () => {
  const result = evaluateEligibility(makePr({ draft: true }), makeCtx());
  assert.deepEqual(codes(result), ["draft"]);
  assert.deepEqual(result.actions, []);
});

test("base outside config.bases is a mismatch (comment once), matching base is fine", () => {
  const result = evaluateEligibility(makePr({ baseRef: "main" }), makeCtx());
  assert.deepEqual(codes(result), ["base-mismatch"]);
  assert.equal(result.actions.length, 1);
  assert.equal(result.actions[0].type, "comment");
  assert.equal(result.actions[0].key, "base-mismatch");
  assert.equal(result.actions[0].pr, 101);
  assert.match(result.actions[0].body, /`main`/);
  assert.equal(result.actions[0].body.includes("<!--"), false, "marker is added by commentOnce");
  // a look-alike base must not match the anchored pattern
  assert.deepEqual(
    codes(evaluateEligibility(makePr({ baseRef: "release/v3.8.54-hotfix" }), makeCtx())),
    ["base-mismatch"]
  );
});

test("pr.labels is the truth about the queue label", () => {
  const result = evaluateEligibility(makePr({ labels: [] }), makeCtx());
  assert.deepEqual(codes(result), ["no-label"]);
  assert.deepEqual(result.actions, [], "never comment on a PR that does not carry the label");
  assert.equal(result.approval.valid, false);
  // the timeline still has the labeled event, but the label was removed afterwards
  const withRemoval = makePr({
    labels: ["bug"],
    timeline: [
      labeledEvent(config.label, APPROVER, 30),
      { event: "unlabeled", actor: APPROVER, label: config.label, createdAt: iso(20) },
    ],
  });
  assert.deepEqual(codes(evaluateEligibility(withRemoval, makeCtx())), ["no-label"]);
});

test("block labels make a PR ineligible; other labels do not", () => {
  for (const block of config.blockLabels) {
    const result = evaluateEligibility(makePr({ labels: [config.label, block] }), makeCtx());
    assert.deepEqual(codes(result), ["blocked-label"], block);
    assert.match(result.reasons[0].detail, new RegExp(block));
  }
  const fine = evaluateEligibility(makePr({ labels: [config.label, "bug", "holder"] }), makeCtx());
  assert.equal(fine.eligible, true);
});

test("label applied by a non-approver: ineligible, comment once, label kept", () => {
  const pr = makePr({
    timeline: [labeledEvent(config.label, "random-user", 30)],
    headStatuses: [],
  });
  const result = evaluateEligibility(pr, makeCtx());
  assert.deepEqual(codes(result), ["label-not-by-approver"]);
  assert.equal(result.approval.reason, "label-not-by-approver");
  assert.equal(result.approval.actor, "random-user");
  assert.deepEqual(
    result.actions.map((a) => [a.type, a.key]),
    [["comment", "not-approver"]]
  );
  assert.equal(
    result.actions.some((a) => a.type === "removeLabel"),
    false
  );
});

test("the LATEST labeled event decides: approver re-labeling after a non-approver counts", () => {
  const pr = makePr({
    timeline: [
      labeledEvent(config.label, "random-user", OLD + 20),
      { event: "unlabeled", actor: APPROVER, label: config.label, createdAt: iso(OLD + 15) },
      labeledEvent(config.label, APPROVER, OLD),
    ],
  });
  assert.equal(evaluateEligibility(pr, makeCtx()).eligible, true);
  const reversed = makePr({
    timeline: [
      labeledEvent(config.label, APPROVER, 50),
      labeledEvent(config.label, "random-user", 30),
    ],
  });
  assert.deepEqual(codes(evaluateEligibility(reversed, makeCtx())), ["label-not-by-approver"]);
});

test("approver logins compare case-insensitively", () => {
  const pr = makePr({ timeline: [labeledEvent(config.label, APPROVER.toUpperCase(), OLD)] });
  assert.equal(approvalFor(pr, makeCtx(), "queue").valid, true);
});

test("label before the last push: status only on the old head → head-changed + removeLabel", () => {
  // headStatuses are the statuses of the CURRENT head: the approval lives on the old head only.
  const pr = makePr({ headSha: OTHER_HEAD, headStatuses: [] });
  const result = evaluateEligibility(pr, makeCtx());
  assert.deepEqual(codes(result), ["head-changed-after-label"]);
  assert.deepEqual(
    result.actions.map((a) => [a.type, a.key ?? a.label]),
    [
      ["comment", `head-changed:${OTHER_HEAD.slice(0, 12)}`],
      ["removeLabel", config.label],
    ]
  );
});

test("protected comment never echoes author-chosen file paths (markdown/marker injection)", () => {
  const evil = [
    ".claude/<!-- omni-queue:conflict:abc -->",
    ".claude/@org/team [x](http://evil.example)",
    ".claude/`code`\nline",
  ];
  const pr = makePr({ files: ["src/ok.ts", ...evil] });
  const result = evaluateEligibility(pr, makeCtx());
  assert.deepEqual(codes(result), ["protected-approval-missing"]);
  const comment = result.actions.find((a) => a.type === "comment");
  assert.ok(comment, "protected comment emitted");
  for (const text of [comment.body, result.reasons[0].detail]) {
    assert.doesNotMatch(text, /<!--|@org|evil\.example|\n/);
    assert.match(text, /3 file\(s\) matching `\.claude\/\*\*`/);
  }
});

test("a protected file whose path contains a newline is still protected", () => {
  const pr = makePr({ files: ["x\ny/AGENTS.md"] });
  const result = evaluateEligibility(pr, makeCtx());
  assert.equal(result.protectedSurface, true);
  assert.deepEqual(codes(result), ["protected-approval-missing"]);
  assert.match(result.reasons[0].detail, /1 file\(s\) matching `\*\*\/AGENTS\.md`/);
});

test("comments never echo unsafe characters of the base branch name", () => {
  const pr = makePr({ baseRef: "feat/<!--x-->@team`" });
  const result = evaluateEligibility(pr, makeCtx());
  const comment = result.actions.find((a) => a.key === "base-mismatch");
  assert.ok(comment);
  assert.doesNotMatch(comment.body, /<!--|@team/);
  assert.match(comment.body, /`feat\/\?\?--x--\?\?team\?`/);
});

test("label present but its labeled event missing from the timeline → visible reason", () => {
  const pr = makePr({ timeline: [] });
  const approval = approvalFor(pr, makeCtx(), "queue");
  assert.equal(approval.valid, false);
  assert.equal(approval.reason, "approval-missing");
  assert.match(approval.detail, /event not found in timeline/);
  const result = evaluateEligibility(pr, makeCtx());
  assert.deepEqual(codes(result), ["approval-missing"]);
  assert.match(result.reasons[0].detail, /event not found in timeline/);
  // a normal fresh label has the default detail instead
  const fresh = makePr({ timeline: [labeledEvent(config.label, APPROVER, 2)], headStatuses: [] });
  assert.doesNotMatch(evaluateEligibility(fresh, makeCtx()).reasons[0].detail, /event not found/);
});

test("fresh label without its status yet → approval-missing, silent (approve job running)", () => {
  const pr = makePr({ timeline: [labeledEvent(config.label, APPROVER, 2)], headStatuses: [] });
  const result = evaluateEligibility(pr, makeCtx());
  assert.deepEqual(codes(result), ["approval-missing"]);
  assert.deepEqual(result.actions, []);
  assert.equal(result.approval.labeledAt, iso(2));
});

test("label older than the skew without any status → head-changed-after-label", () => {
  const pr = makePr({
    timeline: [labeledEvent(config.label, APPROVER, SKEW_MIN + 1)],
    headStatuses: [],
  });
  assert.equal(approvalFor(pr, makeCtx(), "queue").reason, "head-changed-after-label");
  const justInside = makePr({
    timeline: [labeledEvent(config.label, APPROVER, SKEW_MIN - 1)],
    headStatuses: [],
  });
  assert.equal(approvalFor(justInside, makeCtx(), "queue").reason, "approval-missing");
});

test("approval status created by another user does not count", () => {
  const pr = makePr({ headStatuses: [approvalStatus("queue", 30, { creator: APPROVER })] });
  const result = approvalFor(pr, makeCtx(), "queue");
  assert.equal(result.valid, false);
  assert.equal(result.reason, "head-changed-after-label");
  const other = makePr({
    headStatuses: [approvalStatus("queue", 30, { creator: "other-app[bot]" })],
  });
  assert.equal(approvalFor(other, makeCtx(), "queue").valid, false);
});

test("approval status must cite an approver and be success", () => {
  const noCite = makePr({
    headStatuses: [approvalStatus("queue", 30, { description: "approved by random-user" })],
  });
  assert.equal(approvalFor(noCite, makeCtx(), "queue").valid, false);
  const pending = makePr({ headStatuses: [approvalStatus("queue", 30, { state: "pending" })] });
  assert.equal(approvalFor(pending, makeCtx(), "queue").valid, false);
  // a prefix of an approver login is not the approver
  const prefix = makePr({
    headStatuses: [approvalStatus("queue", 30, { description: `approved by ${APPROVER}x` })],
  });
  assert.equal(approvalFor(prefix, makeCtx(), "queue").valid, false);
});

test("a withdrawn label stops the approval from counting without any failure status", () => {
  // approve.mjs writes no status on `unlabeled` in shadow mode: the old `success` stays the
  // newest status of the head. It must never count again by itself.
  const withdrawn = {
    event: "unlabeled",
    actor: APPROVER,
    label: config.label,
    createdAt: iso(90),
  };
  const stale = [approvalStatus("queue", OLD)];
  // 1. label gone: ineligible whatever the statuses say
  const unlabeled = makePr({
    labels: [],
    timeline: [labeledEvent(config.label, APPROVER, OLD), withdrawn],
    headStatuses: stale,
  });
  assert.deepEqual(codes(evaluateEligibility(unlabeled, makeCtx())), ["no-label"]);
  // 2. put back by somebody who is not an approver: the latest label decides
  const byOther = makePr({
    timeline: [
      labeledEvent(config.label, APPROVER, OLD),
      withdrawn,
      labeledEvent(config.label, "random-user", 60),
    ],
    headStatuses: stale,
  });
  assert.deepEqual(codes(evaluateEligibility(byOther, makeCtx())), ["label-not-by-approver"]);
  // 3. put back by an approver: only a status as new as THAT label approves the head
  const relabeled = (minutesAgo) =>
    makePr({
      timeline: [
        labeledEvent(config.label, APPROVER, OLD),
        withdrawn,
        labeledEvent(config.label, APPROVER, minutesAgo),
      ],
      headStatuses: stale,
    });
  assert.deepEqual(codes(evaluateEligibility(relabeled(60), makeCtx())), ["approval-missing"]);
  assert.deepEqual(codes(evaluateEligibility(relabeled(SKEW_MIN + 1), makeCtx())), [
    "head-changed-after-label",
  ]);
  // 4. the protected approval follows the same rule
  const protectedPr = (labels) =>
    makePr({
      files: ["AGENTS.md"],
      labels,
      timeline: [
        labeledEvent(config.label, APPROVER, OLD),
        labeledEvent(config.protectedApprovalLabel, APPROVER, OLD),
      ],
      headStatuses: [approvalStatus("queue", OLD), approvalStatus("protected", OLD)],
    });
  assert.equal(
    evaluateEligibility(protectedPr([config.label, config.protectedApprovalLabel]), makeCtx())
      .eligible,
    true
  );
  assert.deepEqual(codes(evaluateEligibility(protectedPr([config.label]), makeCtx())), [
    "protected-approval-missing",
  ]);
});

test("a newer failure status (approval withdrawn) invalidates an older success", () => {
  const pr = makePr({
    headStatuses: [
      approvalStatus("queue", 5, {
        state: "failure",
        description: `approval withdrawn by ${APPROVER}`,
      }),
      approvalStatus("queue", 30),
    ],
  });
  assert.equal(approvalFor(pr, makeCtx(), "queue").valid, false);
  // order of the list does not matter: the newest createdAt wins
  const shuffled = makePr({ headStatuses: [...pr.headStatuses].reverse() });
  assert.equal(approvalFor(shuffled, makeCtx(), "queue").valid, false);
  // re-approval after the withdrawal is valid again
  const reapproved = makePr({
    timeline: [labeledEvent(config.label, APPROVER, 4)],
    headStatuses: [approvalStatus("queue", 4), ...pr.headStatuses],
  });
  assert.equal(approvalFor(reapproved, makeCtx(), "queue").valid, true);
});

test("a status older than the label (beyond 60 s) belongs to an earlier label event", () => {
  const stale = makePr({
    timeline: [labeledEvent(config.label, APPROVER, 30)],
    headStatuses: [approvalStatus("queue", 32)],
  });
  assert.equal(approvalFor(stale, makeCtx(), "queue").valid, false);
  const withinTolerance = makePr({
    timeline: [labeledEvent(config.label, APPROVER, 30)],
    headStatuses: [approvalStatus("queue", 30.5)],
  });
  assert.equal(approvalFor(withinTolerance, makeCtx(), "queue").valid, true);
});

test("statuses of other contexts do not approve", () => {
  const pr = makePr({ headStatuses: [approvalStatus("protected", 30)] });
  assert.equal(approvalFor(pr, makeCtx(), "queue").valid, false);
  assert.throws(() => approvalFor(pr, makeCtx(), "nope"), /unknown approval kind/);
});

test("isBaseFrozen matches the exact branch name only", () => {
  const issue = (title, body = "") => ({ number: 9, title, body });
  assert.equal(isBaseFrozen(BASE, [issue("🧊 Release freeze: release/v3.8.54")]), true);
  assert.equal(
    isBaseFrozen(BASE, [issue("freeze", "Freezing `release/v3.8.54` for the cut.")]),
    true
  );
  assert.equal(isBaseFrozen(BASE, [issue("Release freeze release/v3.8.54.")]), true);
  assert.equal(
    isBaseFrozen(BASE, [issue("freeze", "push to origin/release/v3.8.54 blocked")]),
    true
  );
  assert.equal(isBaseFrozen("release/v3.8.5", [issue("Release freeze: release/v3.8.54")]), false);
  assert.equal(isBaseFrozen(BASE, [issue("Release freeze: release/v3.8.54x")]), false);
  assert.equal(isBaseFrozen(BASE, [issue("Release freeze: release/v3.8.54.1")]), false);
  assert.equal(isBaseFrozen(BASE, [issue("Release freeze: release/v3.8.540")]), false);
  // the body names a "prerelease/…" branch, which is not a release branch, then the real one
  assert.equal(
    isBaseFrozen(BASE, [
      issue("freeze", "do NOT merge into prerelease/v3.8.54 or release/v3.8.53"),
    ]),
    false
  );
  assert.equal(isBaseFrozen(BASE, [issue("Release freeze: release/v3.8.55", null)]), false);
  // "." in the base is literal, not a regex wildcard
  assert.equal(isBaseFrozen(BASE, [issue("Release freeze: release/v3x8x54")]), false);
  assert.equal(isBaseFrozen(BASE, []), false);
});

// Literal texts of the real freeze issues (#17170, #19190, #11439) opened by /generate-release.
const ISSUE_17170 = {
  number: 17170,
  title: "🔒 release-freeze: v3.8.52 in progress",
  body:
    "While this issue is open, do NOT merge campaign PRs into release/v3.8.52 (Hard Rule #21). " +
    "/generate-release closes it after the squash-merge to main. Development continues on " +
    "release/v3.8.53 as soon as 0a.0b cuts it (announced in a comment below).",
};
const ISSUE_19190 = {
  number: 19190,
  title: "🔒 release-freeze: v3.8.53 in progress",
  body:
    "While this issue is open, do NOT merge campaign PRs into release/v3.8.53 (Hard Rule #21). " +
    "/generate-release closes it after the squash-merge to main.",
};
const ISSUE_11439 = {
  number: 11439,
  title: "🔒 release-freeze: v3.8.50 in progress",
  body:
    "While this issue is open, do NOT merge campaign PRs into `release/v3.8.50` (Hard Rule #21)." +
    "\n\nDevelopment continues on the next cycle branch (`release/v3.8.51`), already cut and " +
    "live — retarget PRs there.",
};

test("real freeze issues freeze the named version only, never the branch development moves to", () => {
  assert.deepEqual(frozenBranches(ISSUE_17170), ["release/v3.8.52"]);
  assert.equal(isBaseFrozen("release/v3.8.52", [ISSUE_17170]), true);
  assert.equal(isBaseFrozen("release/v3.8.53", [ISSUE_17170]), false);
  assert.equal(isBaseFrozen("release/v3.8.53", [ISSUE_19190]), true);
  assert.equal(isBaseFrozen("release/v3.8.54", [ISSUE_19190]), false);
  assert.equal(isBaseFrozen("release/v3.8.51", [ISSUE_11439]), false);
  assert.equal(isBaseFrozen("release/v3.8.50", [ISSUE_11439]), true);
  // the active branch during a freeze stays eligible
  const pr = makePr({ baseRef: "release/v3.8.53" });
  const result = evaluateEligibility(pr, makeCtx({ freezeIssues: [ISSUE_17170] }));
  assert.equal(result.eligible, true, JSON.stringify(result.reasons));
  assert.deepEqual(result.actions, []);
});

test("the body is read only when the title names no branch or version", () => {
  // title without a version: the "merge … into <branch>" sentence decides, not other mentions
  const untitled = { ...ISSUE_17170, title: "🔒 release-freeze in progress" };
  assert.deepEqual(frozenBranches(untitled), ["release/v3.8.52"]);
  assert.equal(isBaseFrozen("release/v3.8.53", [untitled]), false);
  // no "into" sentence: the FIRST branch mentioned, never every mention
  const first = {
    number: 1,
    title: "freeze",
    body: "release/v3.8.52 now; next is release/v3.8.53",
  };
  assert.deepEqual(frozenBranches(first), ["release/v3.8.52"]);
  assert.equal(isBaseFrozen("release/v3.8.53", [first]), false);
  // the title wins over the body
  const titled = { number: 2, title: "freeze release/v3.8.54", body: "into release/v3.8.53" };
  assert.deepEqual(frozenBranches(titled), ["release/v3.8.54"]);
  // a version in the title that is longer than X.Y.Z is not that branch
  assert.equal(isBaseFrozen(BASE, [{ number: 3, title: "freeze v3.8.540", body: "" }]), false);
  assert.equal(isBaseFrozen(BASE, [{ number: 3, title: "freeze v3.8.54.", body: "" }]), true);
});

test("an open freeze issue that names no branch or version freezes every base (fail closed)", () => {
  const vague = { number: 5, title: "🔒 release-freeze", body: "Release in progress." };
  assert.deepEqual(frozenBranches(vague), []);
  assert.equal(isBaseFrozen("release/v3.8.53", [vague]), true);
  assert.equal(isBaseFrozen(BASE, [vague]), true);
  assert.equal(isBaseFrozen("", [vague]), false);
});

test("frozen base: ineligible with a comment keyed by the sanitized base", () => {
  const ctx = makeCtx({
    freezeIssues: [{ number: 77, title: `Release freeze: ${BASE}`, body: "" }],
  });
  const result = evaluateEligibility(makePr(), ctx);
  assert.deepEqual(codes(result), ["base-frozen"]);
  assert.match(result.reasons[0].detail, /#77/);
  assert.deepEqual(
    result.actions.map((a) => [a.type, a.key]),
    [["comment", "frozen:release-v3.8.54"]]
  );
  const otherBase = makeCtx({
    freezeIssues: [{ number: 77, title: "Release freeze: release/v3.8.5", body: "" }],
  });
  assert.equal(evaluateEligibility(makePr(), otherBase).eligible, true);
});

test("protected surface without protected-approved: ineligible + comment once per head", () => {
  const pr = makePr({ files: ["src/x.ts", "docs/AGENTS.md"] });
  const result = evaluateEligibility(pr, makeCtx());
  assert.equal(result.protectedSurface, true);
  assert.deepEqual(codes(result), ["protected-approval-missing"]);
  assert.match(result.reasons[0].detail, /1 file\(s\) matching `\*\*\/AGENTS\.md`/);
  assert.deepEqual(
    result.actions.map((a) => [a.type, a.key]),
    [["comment", `protected:${HEAD.slice(0, 12)}`]]
  );
});

test("protected surface with protected-approved by an approver on the current head is eligible", () => {
  const pr = makePr({
    files: [".claude/skills/x/SKILL.md"],
    labels: [config.label, config.protectedApprovalLabel],
    timeline: [
      labeledEvent(config.label, APPROVER, 30),
      labeledEvent(config.protectedApprovalLabel, APPROVER, 25),
    ],
    headStatuses: [approvalStatus("queue", 30), approvalStatus("protected", 25)],
  });
  const result = evaluateEligibility(pr, makeCtx());
  assert.equal(result.protectedSurface, true);
  assert.equal(result.eligible, true, JSON.stringify(result.reasons));
});

test("an incomplete file manifest requires protected-approved (fail closed)", () => {
  // GitHub lists at most 3,000 files of a PR: a protected path may be among the unlisted ones.
  const pr = makePr({ files: ["src/a.ts"], filesComplete: false });
  const result = evaluateEligibility(pr, makeCtx());
  assert.equal(result.eligible, false);
  assert.equal(result.protectedSurface, true);
  assert.deepEqual(codes(result), ["protected-approval-missing"]);
  assert.match(result.reasons[0].detail, /file list incomplete/);
  assert.deepEqual(
    result.actions.map((a) => [a.type, a.key]),
    [["comment", `protected:${HEAD.slice(0, 12)}`]]
  );
  assert.match(result.actions[0].body, /did not list every changed file/);

  const approved = makePr({
    files: ["src/a.ts"],
    filesComplete: false,
    labels: [config.label, config.protectedApprovalLabel],
    timeline: [
      labeledEvent(config.label, APPROVER, 30),
      labeledEvent(config.protectedApprovalLabel, APPROVER, 25),
    ],
    headStatuses: [approvalStatus("queue", 30), approvalStatus("protected", 25)],
  });
  assert.equal(evaluateEligibility(approved, makeCtx()).eligible, true);

  const complete = evaluateEligibility(
    makePr({ files: ["src/a.ts"], filesComplete: true }),
    makeCtx()
  );
  assert.equal(complete.eligible, true);
  assert.equal(complete.protectedSurface, false);
});

test("protected-approved label without its status, or by a non-approver, does not count", () => {
  const base = {
    files: ["llm.txt"],
    labels: [config.label, config.protectedApprovalLabel],
    headStatuses: [approvalStatus("queue", OLD)],
  };
  const noStatus = makePr({
    ...base,
    timeline: [
      labeledEvent(config.label, APPROVER, OLD),
      labeledEvent(config.protectedApprovalLabel, APPROVER, OLD - 5),
    ],
  });
  const r1 = evaluateEligibility(noStatus, makeCtx());
  assert.deepEqual(codes(r1), ["protected-approval-missing"]);
  assert.equal(r1.actions.length, 1);
  const byOther = makePr({
    ...base,
    timeline: [
      labeledEvent(config.label, APPROVER, OLD),
      labeledEvent(config.protectedApprovalLabel, "random-user", OLD - 5),
    ],
    headStatuses: [approvalStatus("queue", OLD), approvalStatus("protected", OLD - 5)],
  });
  assert.deepEqual(codes(evaluateEligibility(byOther, makeCtx())), ["protected-approval-missing"]);
  // freshly applied protected label: still missing, but no comment while approve.mjs runs
  const fresh = makePr({
    ...base,
    timeline: [
      labeledEvent(config.label, APPROVER, OLD),
      labeledEvent(config.protectedApprovalLabel, APPROVER, 1),
    ],
  });
  const r3 = evaluateEligibility(fresh, makeCtx());
  assert.deepEqual(codes(r3), ["protected-approval-missing"]);
  assert.deepEqual(r3.actions, []);
});

test("non-protected paths that merely look similar are not protected", () => {
  const pr = makePr({ files: ["docs/agents.md.bak", "src/claude/x.ts", "skills/a/README.md"] });
  const result = evaluateEligibility(pr, makeCtx());
  assert.equal(result.protectedSurface, false);
  assert.equal(result.eligible, true);
});

test("conflicting PR: comment keyed by head + removeLabel; mergeable null is not a conflict", () => {
  for (const pr of [
    makePr({ mergeable: false }),
    makePr({ mergeable: null, mergeableState: "dirty" }),
  ]) {
    const result = evaluateEligibility(pr, makeCtx());
    assert.deepEqual(codes(result), ["conflicting"]);
    assert.deepEqual(
      result.actions.map((a) => [a.type, a.key ?? a.label]),
      [
        ["comment", `conflict:${HEAD.slice(0, 12)}`],
        ["removeLabel", config.label],
      ]
    );
  }
  const unknown = evaluateEligibility(
    makePr({ mergeable: null, mergeableState: "unknown" }),
    makeCtx()
  );
  assert.equal(unknown.eligible, true);
});

test("shadow mode skips a head already processed, but not a new head or live mode", () => {
  const state = initialState(BASE, NOW);
  state.shadow.processed["101"] = HEAD;
  const shadowCtx = makeCtx({ config: shadowConfig, state });
  assert.equal(shadowConfig.mode, "shadow");
  assert.deepEqual(codes(evaluateEligibility(makePr(), shadowCtx)), ["shadow-processed"]);
  const newHead = makePr({
    headSha: OTHER_HEAD,
    timeline: [labeledEvent(config.label, APPROVER, 3)],
    headStatuses: [approvalStatus("queue", 3)],
  });
  assert.equal(evaluateEligibility(newHead, shadowCtx).eligible, true);
  assert.equal(evaluateEligibility(makePr(), makeCtx({ state })).eligible, true, "live mode");
});

test("in-flight PRs (batch, bisect segment or parked red batch) are ineligible, no actions", () => {
  const ref = { n: 101, head: HEAD, title: "t", author: "a", labeledAt: iso(30) };
  const other = { ...ref, n: 202 };
  const inFlight = (patch) => ({
    batchId: "b1",
    kind: "batch",
    candidateRef: "omni-queue/release-v3.8.54/b1-111111111111",
    candidateSha: "3".repeat(40),
    baseSha: "4".repeat(40),
    treeSha: null,
    prs: [],
    stage: "testing",
    startedAt: iso(10),
    attempts: 0,
    bisect: null,
    ...patch,
  });
  const states = [
    inFlight({ prs: [ref] }),
    inFlight({
      prs: [other],
      bisect: { rootBatchId: "b1", segments: [[other], [ref]], culprits: [], landed: [], steps: 1 },
    }),
    inFlight({
      kind: "base-check",
      pendingRed: {
        batchId: "b1",
        candidateSha: "5".repeat(40),
        prs: [ref],
        signatures: [],
        bisect: null,
      },
    }),
  ];
  for (const f of states) {
    const state = { ...initialState(BASE, NOW), inFlight: f };
    const result = evaluateEligibility(makePr({ mergeable: false }), makeCtx({ state }));
    assert.ok(codes(result).includes("in-flight"));
    assert.deepEqual(result.actions, [], "the tick owns in-flight PRs");
  }
  const notMine = { ...initialState(BASE, NOW), inFlight: inFlight({ prs: [other] }) };
  assert.equal(evaluateEligibility(makePr(), makeCtx({ state: notMine })).eligible, true);
});

// ───────────────────────────── selectBatch ─────────────────────────────

function candidate(n, labeledMinutesAgo, prGreenCheck = "success") {
  const pr = makePr({
    number: n,
    headSha: String(n % 10).repeat(40),
    title: `PR ${n}`,
    author: `user${n}`,
    prGreenCheck,
  });
  const eligibility = {
    eligible: true,
    reasons: [],
    actions: [],
    approval: { valid: true, actor: APPROVER, labeledAt: iso(labeledMinutesAgo), reason: null },
    protectedSurface: false,
  };
  return { pr, eligibility };
}

const nums = (r) => r.batch.map((p) => p.n);

test("selectBatch: FIFO by approval time, PrRef shape", () => {
  const result = selectBatch([candidate(3, 20), candidate(1, 40), candidate(2, 30)], makeCtx());
  assert.equal(result.waiting, false);
  assert.deepEqual(nums(result), [1, 2, 3]);
  assert.deepEqual(result.batch[0], {
    n: 1,
    head: "1".repeat(40),
    title: "PR 1",
    author: "user1",
    labeledAt: iso(40),
  });
});

test("selectBatch: green PR checks first, then pending/unknown, then failing (FIFO inside)", () => {
  const list = [
    candidate(1, 60, "failure"),
    candidate(2, 50, null),
    candidate(3, 40, "success"),
    candidate(4, 30, "pending"),
    candidate(5, 20, "success"),
  ];
  assert.deepEqual(nums(selectBatch(list, makeCtx())), [3, 5, 2, 4, 1]);
  const noPref = makeCtx({ config: { ...liveConfig, preferGreenPrChecks: false } });
  assert.deepEqual(nums(selectBatch(list, noPref)), [1, 2, 3, 4, 5]);
});

test("selectBatch: at most batch.maxSize, the oldest first", () => {
  // No ctx.batchSize (adaptive off, or a caller that passes none): the ceiling is maxSize.
  const list = Array.from({ length: 15 }, (_, i) => candidate(i + 1, 100 - i));
  const result = selectBatch(list, makeCtx());
  assert.equal(config.batch.maxSize, 12);
  assert.deepEqual(nums(result), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  assert.match(result.reason, /12 of 15 eligible \(batch\.maxSize 12\)/);
});

test("selectBatch: waits for maxWaitMinutes while the batch is not full", () => {
  const young = [candidate(1, 3), candidate(2, 1)];
  const waiting = selectBatch(young, makeCtx());
  assert.equal(waiting.waiting, true);
  assert.deepEqual(waiting.batch, []);
  const old = [candidate(1, config.batch.maxWaitMinutes + 1), candidate(2, 1)];
  const go = selectBatch(old, makeCtx());
  assert.equal(go.waiting, false);
  assert.deepEqual(nums(go), [1, 2]);
  // a full batch never waits (full = batch.maxSize when the context names no batch size)
  const full = Array.from({ length: config.batch.maxSize }, (_, i) => candidate(i + 1, 1));
  assert.equal(selectBatch(full, makeCtx()).waiting, false);
});

test("selectBatch: never fewer than batch.minSize; empty pool is not waiting", () => {
  const cfg = { ...liveConfig, batch: { maxSize: 6, minSize: 3, maxWaitMinutes: 10 } };
  const two = [candidate(1, 60), candidate(2, 50)];
  const result = selectBatch(two, makeCtx({ config: cfg }));
  assert.equal(result.waiting, true);
  assert.deepEqual(result.batch, []);
  assert.match(result.reason, /minSize/);
  const three = [...two, candidate(3, 40)];
  assert.deepEqual(nums(selectBatch(three, makeCtx({ config: cfg }))), [1, 2, 3]);
  assert.deepEqual(selectBatch([], makeCtx()), {
    batch: [],
    waiting: false,
    reason: "no eligible PR",
  });
});

test("selectBatch ignores ineligible entries passed by mistake", () => {
  const bad = candidate(9, 90);
  bad.eligibility = { ...bad.eligibility, eligible: false };
  const result = selectBatch([bad, candidate(1, 60)], makeCtx());
  assert.deepEqual(nums(result), [1]);
});

// ───────────────────────────── PR gates (prChecksRequired) ─────────────────────────────

/** A check run as github.listCheckRuns normalizes it. */
function checkRun(
  id,
  name,
  { status = "completed", conclusion = "success", suite = id, app } = {}
) {
  return {
    id,
    name,
    status,
    conclusion: status === "completed" ? conclusion : null,
    startedAt: iso(30),
    completedAt: status === "completed" ? iso(20) : null,
    htmlUrl: null,
    appSlug: app ?? "github-actions",
    headBranch: "feature",
    checkSuiteId: suite,
    output: { title: null, summary: null, text: null },
  };
}

const gatesCtx = (overrides = {}) =>
  makeCtx({
    config: { ...liveConfig, prChecksRequired: ["Gate / CI", "Gate / Quality"] },
    ...overrides,
  });

test("the shipped config requires the three PR gates", () => {
  assert.deepEqual(config.prChecksRequired, ["Gate / CI", "Gate / Quality", "API Route Typecheck"]);
});

test("G3: with the shipped gates, a PR whose API Route Typecheck is red, pending or missing (never ran on the head) is pr-checks-not-green", () => {
  const shipped = makeCtx({ config: { ...liveConfig, prChecksRequired: config.prChecksRequired } });
  const both = { "Gate / CI": "success", "Gate / Quality": "success" };
  const green = { ...both, "API Route Typecheck": "success" };
  assert.equal(evaluateEligibility(makePr({ prChecks: green }), shipped).eligible, true);
  for (const [prChecks, detail] of [
    [{ ...both, "API Route Typecheck": "failure" }, "API Route Typecheck failure"],
    [{ ...both, "API Route Typecheck": "pending" }, "API Route Typecheck pending"],
    // A draft or a head pushed before the workflow existed: no run of that name on the head.
    [{ ...both, "API Route Typecheck": null }, "API Route Typecheck missing"],
    [both, "API Route Typecheck missing"],
  ]) {
    const result = evaluateEligibility(makePr({ prChecks }), shipped);
    assert.equal(result.eligible, false, JSON.stringify(prChecks));
    assert.deepEqual(result.reasons, [{ code: "pr-checks-not-green", detail }]);
    assert.deepEqual(result.actions, [], "no action: the PR waits");
  }
  // From the head's check runs: no run named API Route Typecheck reads as null (missing).
  assert.equal(prCheckState([], "API Route Typecheck"), null);
});

test("pr-checks-not-green for failure, pending and missing", () => {
  const green = { "Gate / CI": "success", "Gate / Quality": "success" };
  assert.equal(evaluateEligibility(makePr({ prChecks: green }), gatesCtx()).eligible, true);
  for (const [prChecks, detail] of [
    [
      { "Gate / CI": "failure", "Gate / Quality": "pending" },
      "Gate / CI failure; Gate / Quality pending",
    ],
    [{ "Gate / CI": "success", "Gate / Quality": "failure" }, "Gate / Quality failure"],
    [{ "Gate / CI": "pending", "Gate / Quality": "success" }, "Gate / CI pending"],
    [{ "Gate / CI": null, "Gate / Quality": "success" }, "Gate / CI missing"],
    [{ "Gate / Quality": "success" }, "Gate / CI missing"],
    [{}, "Gate / CI missing; Gate / Quality missing"],
    [null, "Gate / CI missing; Gate / Quality missing"],
  ]) {
    const result = evaluateEligibility(makePr({ prChecks }), gatesCtx());
    assert.equal(result.eligible, false, JSON.stringify(prChecks));
    assert.deepEqual(result.reasons, [{ code: "pr-checks-not-green", detail }]);
    assert.ok(INELIGIBLE_REASONS.includes("pr-checks-not-green"));
    // No action: the label stays, nothing is posted; the PR waits for its gates.
    assert.deepEqual(result.actions, [], JSON.stringify(prChecks));
  }
  // Turned green later: eligible again, nobody touched the PR.
  const later = evaluateEligibility(makePr({ prChecks: green }), gatesCtx());
  assert.deepEqual(later.reasons, []);
  // Without required gates the rule never applies.
  const none = makeCtx({ config: { ...liveConfig, prChecksRequired: [] } });
  assert.equal(evaluateEligibility(makePr({ prChecks: {} }), none).eligible, true);
  // The base-repair lane (reserved) is exempt; any other lane is ignored.
  const red = makePr({ prChecks: { "Gate / CI": "failure", "Gate / Quality": "failure" } });
  assert.equal(evaluateEligibility(red, gatesCtx({ lane: "base-repair" })).eligible, true);
  for (const lane of ["hotfix", "", undefined, "normal"]) {
    assert.deepEqual(codes(evaluateEligibility(red, gatesCtx({ lane }))), ["pr-checks-not-green"]);
  }
});

test("a success from another app or a later duplicate-named job does not count", () => {
  // no run of that name
  assert.equal(prCheckState([checkRun(1, "Gate / Quality")], "Gate / CI"), null);
  assert.equal(prCheckState([], "Gate / CI"), null);
  assert.equal(prCheckState(undefined, "Gate / CI"), null);
  // GitHub Actions success
  assert.equal(prCheckState([checkRun(1, "Gate / CI")], "Gate / CI"), "success");
  // another app's success is ignored: neither green nor red
  assert.equal(prCheckState([checkRun(1, "Gate / CI", { app: "some-app" })], "Gate / CI"), null);
  assert.equal(
    prCheckState(
      [checkRun(1, "Gate / CI", { conclusion: "failure" }), checkRun(2, "Gate / CI", { app: "x" })],
      "Gate / CI"
    ),
    "failure"
  );
  assert.equal(
    prCheckState(
      [checkRun(1, "Gate / CI", { status: "in_progress" }), checkRun(2, "Gate / CI", { app: "x" })],
      "Gate / CI"
    ),
    "pending"
  );
  // a later job of the same name in another suite does not hide the red gate (worst counts)
  const masked = [
    checkRun(10, "Gate / CI", { conclusion: "failure", suite: 1 }),
    checkRun(11, "Gate / CI", { conclusion: "success", suite: 2 }),
  ];
  assert.equal(prCheckState(masked, "Gate / CI"), "failure");
  // a pending duplicate in another suite keeps the gate pending
  const pendingDup = [
    checkRun(10, "Gate / CI", { suite: 1 }),
    checkRun(11, "Gate / CI", { status: "queued", suite: 2 }),
  ];
  assert.equal(prCheckState(pendingDup, "Gate / CI"), "pending");
  // inside ONE suite the newest run (a re-run) supersedes the earlier attempt, both ways
  assert.equal(
    prCheckState(
      [
        checkRun(10, "Gate / CI", { conclusion: "failure", suite: 1 }),
        checkRun(12, "Gate / CI", { suite: 1 }),
      ],
      "Gate / CI"
    ),
    "success"
  );
  assert.equal(
    prCheckState(
      [
        checkRun(12, "Gate / CI", { conclusion: "failure", suite: 1 }),
        checkRun(10, "Gate / CI", { suite: 1 }),
      ],
      "Gate / CI"
    ),
    "failure"
  );
  // every non-success conclusion is red for a required gate, skipped and neutral included
  for (const conclusion of [
    "failure",
    "cancelled",
    "timed_out",
    "action_required",
    "startup_failure",
    "stale",
    "skipped",
    "neutral",
    null,
  ]) {
    assert.equal(
      prCheckState([checkRun(1, "Gate / CI", { conclusion })], "Gate / CI"),
      "failure",
      String(conclusion)
    );
  }
  for (const status of ["queued", "in_progress", "waiting", "requested", "pending"]) {
    assert.equal(prCheckState([checkRun(1, "Gate / CI", { status })], "Gate / CI"), "pending");
  }
  // runs without a suite id are each counted on their own (nothing supersedes them)
  assert.equal(
    prCheckState(
      [
        checkRun(1, "Gate / CI", { conclusion: "failure", suite: null }),
        checkRun(2, "Gate / CI", { suite: null }),
      ],
      "Gate / CI"
    ),
    "failure"
  );
});

test("prCheckState with suiteIsCurrent: a superseded run of the same workflow no longer counts", () => {
  // ci.yml ran twice on the head (a retarget is an `edited` event, cancel-in-progress): the first
  // run's `if: always()` gate concluded failure (or cancelled) in suite 1, the newer run is green
  // in suite 2. Only suite 2 is current.
  const onlyNewest = (suite) => suite !== 1;
  for (const conclusion of ["failure", "cancelled"]) {
    const superseded = [
      checkRun(10, "Gate / CI", { conclusion, suite: 1 }),
      checkRun(20, "Gate / CI", { suite: 2 }),
    ];
    assert.equal(prCheckState(superseded, "Gate / CI", onlyNewest), "success", conclusion);
    // without suiteIsCurrent: the old reading, every suite counts and the worst wins
    assert.equal(prCheckState(superseded, "Gate / CI"), "failure", conclusion);
    assert.equal(prCheckState(superseded, "Gate / CI", undefined), "failure", conclusion);
  }
  // the newer run of the same workflow is the red one: red
  const turnedRed = [
    checkRun(10, "Gate / CI", { suite: 1 }),
    checkRun(20, "Gate / CI", { conclusion: "failure", suite: 2 }),
  ];
  assert.equal(prCheckState(turnedRed, "Gate / CI", onlyNewest), "failure");
  // a green suite of ANOTHER workflow next to the red gate: both current, the worst wins
  const otherWorkflow = [
    checkRun(10, "Gate / CI", { conclusion: "failure", suite: 1 }),
    checkRun(20, "Gate / CI", { suite: 2 }),
  ];
  assert.equal(
    prCheckState(otherWorkflow, "Gate / CI", () => true),
    "failure"
  );
  // a run without a suite id always counts, whatever suiteIsCurrent says
  const noSuite = [
    checkRun(10, "Gate / CI", { conclusion: "failure", suite: null }),
    checkRun(20, "Gate / CI", { suite: 2 }),
  ];
  assert.equal(
    prCheckState(noSuite, "Gate / CI", () => false),
    "failure"
  );
  // nothing current → null (missing)
  assert.equal(
    prCheckState(
      [checkRun(10, "Gate / CI", { conclusion: "failure", suite: 1 })],
      "Gate / CI",
      () => false
    ),
    null
  );
  // a re-run of failed jobs stays in its suite: newest per suite, as before
  const rerun = [
    checkRun(10, "Gate / CI", { conclusion: "failure", suite: 1 }),
    checkRun(11, "Gate / CI", { suite: 1 }),
  ];
  assert.equal(
    prCheckState(rerun, "Gate / CI", () => true),
    "success"
  );
});

test("currentSuitePredicate: the newest run of each workflow is current; an unmapped suite is kept", () => {
  /** A pull_request workflow run as github.listWorkflowRuns normalizes it (the fields used). */
  const wf = (id, workflowId, checkSuiteId) => ({
    id,
    workflowId,
    checkSuiteId,
    event: "pull_request",
  });
  const isCurrent = currentSuitePredicate([
    wf(100, 7, 1), // ci.yml, cancelled by the retarget
    wf(300, 7, 3), // ci.yml again: current
    wf(200, 8, 2), // quality.yml, its only run: current
    wf(400, null, 4), // no workflow id: cannot be placed, so its suite is not known
    wf(500, 9, null), // no suite: ignored
  ]);
  assert.equal(isCurrent(1), false, "an older run of the same workflow");
  assert.equal(isCurrent(3), true);
  assert.equal(isCurrent(2), true, "another workflow's newest run");
  assert.equal(isCurrent(4), true, "a run without a workflow id is unknown: kept");
  assert.equal(isCurrent(99), true, "a suite no listed run maps to (another app): kept");
  // the order of the listing does not matter: the highest id wins
  const reversed = currentSuitePredicate([wf(300, 7, 3), wf(100, 7, 1)]);
  assert.equal(reversed(1), false);
  assert.equal(reversed(3), true);
  // an empty or failed listing knows nothing: every suite is current
  assert.equal(currentSuitePredicate([])(1), true);
  assert.equal(currentSuitePredicate(undefined)(1), true);

  // End to end over prCheckState: old failed suite + newer green suite of the same workflow
  const runs = [
    checkRun(10, "Gate / CI", { conclusion: "failure", suite: 1 }),
    checkRun(30, "Gate / CI", { suite: 3 }),
  ];
  assert.equal(prCheckState(runs, "Gate / CI", isCurrent), "success");
  // the same job name green in another workflow (suite 2) next to the red gate: red
  const masked = [
    checkRun(30, "Gate / CI", { conclusion: "failure", suite: 3 }),
    checkRun(20, "Gate / CI", { suite: 2 }),
  ];
  assert.equal(prCheckState(masked, "Gate / CI", isCurrent), "failure");
  // a red suite the listing cannot map stays in next to the newest green one
  const unmapped = [
    checkRun(30, "Gate / CI", { suite: 3 }),
    checkRun(90, "Gate / CI", { conclusion: "failure", suite: 99 }),
  ];
  assert.equal(prCheckState(unmapped, "Gate / CI", isCurrent), "failure");
});

test("currentSuitePredicate: a run supersedes only a run of the same workflow and the same event", () => {
  // The concurrency group is `${{ github.workflow }}-${{ github.ref }}`: a pull_request run and a
  // workflow_dispatch run of ci.yml on the same head never cancel each other.
  const wf = (id, checkSuiteId, event, workflowId = 7) => ({
    id,
    workflowId,
    checkSuiteId,
    event,
  });
  const gate = (conclusions) =>
    prCheckState(
      conclusions.map(([id, suite, conclusion]) =>
        checkRun(id, "Gate / CI", { conclusion, suite })
      ),
      "Gate / CI",
      currentSuitePredicate(conclusions.map(([id, suite, , event]) => wf(id * 10, suite, event)))
    );
  // a red pull_request run + a later green workflow_dispatch of the same workflow → red
  assert.equal(
    gate([
      [1, 1, "failure", "pull_request"],
      [2, 2, "success", "workflow_dispatch"],
    ]),
    "failure"
  );
  // a green pull_request run + a later red workflow_dispatch → red
  assert.equal(
    gate([
      [1, 1, "success", "pull_request"],
      [2, 2, "failure", "workflow_dispatch"],
    ]),
    "failure"
  );
  // an old red dispatch, a newer green dispatch and a green pull_request run → green
  assert.equal(
    gate([
      [1, 1, "failure", "workflow_dispatch"],
      [2, 2, "success", "pull_request"],
      [3, 3, "success", "workflow_dispatch"],
    ]),
    "success"
  );
  // round 1 still holds: a superseded red pull_request run + a newer green one → green
  assert.equal(
    gate([
      [1, 1, "failure", "pull_request"],
      [2, 2, "success", "pull_request"],
    ]),
    "success"
  );
  // a run without an event is its own group: it supersedes nothing and nothing supersedes it
  for (const missing of ["", undefined, null]) {
    assert.equal(
      gate([
        [1, 1, "failure", missing],
        [2, 2, "success", missing],
      ]),
      "failure",
      `two runs without an event (${missing})`
    );
    assert.equal(
      gate([
        [1, 1, "failure", "pull_request"],
        [2, 2, "success", missing],
      ]),
      "failure",
      `an event-less run does not supersede a pull_request run (${missing})`
    );
    assert.equal(
      gate([
        [1, 1, "failure", missing],
        [2, 2, "success", "pull_request"],
      ]),
      "failure",
      `a pull_request run does not supersede an event-less run (${missing})`
    );
  }
  // the predicate itself: per (workflowId, event), only the highest run id is current
  const isCurrent = currentSuitePredicate([
    wf(100, 1, "pull_request"),
    wf(200, 2, "workflow_dispatch"),
    wf(300, 3, "pull_request"),
    wf(400, 4, "workflow_dispatch"),
    wf(150, 5, "pull_request", 8), // another workflow, same event: its own group
    wf(500, 6, ""),
    wf(50, 7, ""),
  ]);
  assert.deepEqual(
    [1, 2, 3, 4, 5, 6, 7].map((suite) => isCurrent(suite)),
    [false, false, true, true, true, true, true]
  );
});

test("prChecksNeedWorkflowRuns: only when two suites carry a gate and disagree", () => {
  const gates = ["Gate / CI", "Gate / Quality"];
  // one suite per gate (the usual head): nothing to list
  assert.equal(
    prChecksNeedWorkflowRuns(
      [checkRun(1, "Gate / CI", { suite: 1 }), checkRun(2, "Gate / Quality", { suite: 2 })],
      gates
    ),
    false
  );
  // a re-run in the same suite: still one suite
  assert.equal(
    prChecksNeedWorkflowRuns(
      [
        checkRun(1, "Gate / CI", { conclusion: "failure", suite: 1 }),
        checkRun(3, "Gate / CI", { suite: 1 }),
      ],
      gates
    ),
    false
  );
  // two suites that agree (both green, both red): the answer is the same either way
  for (const conclusion of ["success", "failure"]) {
    assert.equal(
      prChecksNeedWorkflowRuns(
        [
          checkRun(1, "Gate / CI", { conclusion, suite: 1 }),
          checkRun(2, "Gate / CI", { conclusion, suite: 2 }),
        ],
        gates
      ),
      false,
      conclusion
    );
  }
  // two suites that disagree on one gate: list
  assert.equal(
    prChecksNeedWorkflowRuns(
      [
        checkRun(1, "Gate / CI", { conclusion: "failure", suite: 1 }),
        checkRun(2, "Gate / CI", { suite: 2 }),
      ],
      gates
    ),
    true
  );
  assert.equal(
    prChecksNeedWorkflowRuns(
      [
        checkRun(1, "Gate / Quality", { suite: 1 }),
        checkRun(2, "Gate / Quality", { status: "queued", suite: 2 }),
      ],
      gates
    ),
    true
  );
  // a disagreement on a name that is not a gate does not count
  assert.equal(
    prChecksNeedWorkflowRuns(
      [checkRun(1, "lint", { conclusion: "failure", suite: 1 }), checkRun(2, "lint", { suite: 2 })],
      gates
    ),
    false
  );
  assert.equal(prChecksNeedWorkflowRuns(null, gates), false);
  assert.equal(prChecksNeedWorkflowRuns([], []), false);
});

test("prGatesReason is the rule evaluateEligibility applies", () => {
  const red = makePr({ prChecks: { "Gate / CI": "failure", "Gate / Quality": null } });
  assert.deepEqual(prGatesReason(red, gatesCtx()), {
    code: "pr-checks-not-green",
    detail: "Gate / CI failure; Gate / Quality missing",
  });
  assert.deepEqual(evaluateEligibility(red, gatesCtx()).reasons, [prGatesReason(red, gatesCtx())]);
  const green = makePr({ prChecks: { "Gate / CI": "success", "Gate / Quality": "success" } });
  assert.equal(prGatesReason(green, gatesCtx()), null);
  assert.equal(prGatesReason(makePr(), gatesCtx()), null, "revalidate: no prChecks");
  assert.equal(prGatesReason(red, gatesCtx({ lane: "base-repair" })), null);
  assert.equal(
    prGatesReason(red, makeCtx({ config: { ...liveConfig, prChecksRequired: [] } })),
    null
  );
});

test("absent prChecks (revalidate) never blocks", () => {
  // revalidate reads no PR gate: the snapshot has no prChecks key at all
  const pr = makePr();
  assert.equal(Object.hasOwn(pr, "prChecks"), false);
  const result = evaluateEligibility(pr, gatesCtx());
  assert.equal(result.eligible, true);
  assert.deepEqual(result.reasons, []);
  assert.equal(evaluateEligibility(makePr({ prChecks: undefined }), gatesCtx()).eligible, true);
});

test("selectBatch honours ctx.batchSize for the wait and for the slice", () => {
  const ten = Array.from({ length: 10 }, (_, i) => candidate(i + 1, 1 + i / 10));
  // slice: 10 young eligible PRs, window 6 → a full batch of the 6 oldest, no wait
  const cut = selectBatch(ten, makeCtx({ batchSize: 6 }));
  assert.equal(cut.waiting, false);
  assert.deepEqual(nums(cut), [10, 9, 8, 7, 6, 5]);
  assert.match(cut.reason, /6 of 10 eligible \(batch window 6\)/);
  // without ctx.batchSize the same pool waits for maxSize (12)
  const noWindow = selectBatch(ten, makeCtx());
  assert.equal(noWindow.waiting, true);
  assert.match(noWindow.reason, /10\/12 eligible/);
  // wait: 3 young PRs with window 4 → wait; window 3 → full, no wait
  const three = ten.slice(0, 3);
  const waits = selectBatch(three, makeCtx({ batchSize: 4 }));
  assert.equal(waits.waiting, true);
  assert.deepEqual(waits.batch, []);
  assert.match(waits.reason, /3\/4 eligible/);
  assert.deepEqual(nums(selectBatch(three, makeCtx({ batchSize: 3 }))), [3, 2, 1]);
  // after maxWaitMinutes a window that is not full starts anyway
  const old = [candidate(1, config.batch.maxWaitMinutes + 1), candidate(2, 1)];
  assert.deepEqual(nums(selectBatch(old, makeCtx({ batchSize: 4 }))), [1, 2]);
  // a window of 1 takes one PR
  assert.deepEqual(nums(selectBatch(ten, makeCtx({ batchSize: 1 }))), [10]);
  // an invalid ctx.batchSize falls back to maxSize
  for (const batchSize of [0, -1, 2.5, "6", null]) {
    assert.equal(selectBatch(ten, makeCtx({ batchSize })).waiting, true, String(batchSize));
  }
});

test("currentBatchWindow: maxSize without adaptive; stored window clamped; startSize by default", () => {
  const adaptive = { ...liveConfig, batch: { ...liveConfig.batch, adaptive: true, startSize: 6 } };
  const fixed = { ...liveConfig, batch: { ...liveConfig.batch, adaptive: false } };
  const at = (batchWindow) => ({ ...initialState(BASE, NOW), batchWindow });
  assert.equal(currentBatchWindow(fixed, at(3)), 12, "adaptive off: always maxSize");
  assert.equal(currentBatchWindow(adaptive, initialState(BASE, NOW)), 6, "no window: startSize");
  assert.equal(currentBatchWindow(adaptive, null), 6);
  assert.equal(currentBatchWindow(adaptive, at(9)), 9);
  assert.equal(currentBatchWindow(adaptive, at(20)), 12, "a window above a lowered maxSize");
  for (const bad of [0, -2, 1.5, "7", null]) {
    assert.equal(currentBatchWindow(adaptive, at(bad)), 6, String(bad));
  }
  const raisedMin = { ...adaptive, batch: { ...adaptive.batch, minSize: 4 } };
  assert.equal(currentBatchWindow(raisedMin, at(2)), 4, "never below minSize");
  const noStart = {
    ...adaptive,
    batch: { maxSize: 8, minSize: 1, maxWaitMinutes: 10, adaptive: true },
  };
  assert.equal(currentBatchWindow(noStart, null), 8, "startSize defaults to maxSize");
});

// ───────────────────────────── lanes (hotfix, base-repair) ─────────────────────────────

const LANES = { hotfixLabel: "omni-queue-hotfix", baseRepairLabel: "omni-queue-base-repair" };

test("the shipped config names both lane labels", () => {
  assert.deepEqual(config.lanes, LANES);
});

/** A candidate (see `candidate`) that also carries the lane `labels`, applied by `actor`. */
function laneCandidate(n, labeledMinutesAgo, labels, { actor = APPROVER, headSha } = {}) {
  const c = candidate(n, labeledMinutesAgo);
  if (headSha) c.pr.headSha = headSha;
  c.pr.labels = [config.label, ...labels];
  c.pr.timeline = [
    ...c.pr.timeline,
    ...labels.map((label) => labeledEvent(label, actor, labeledMinutesAgo - 1)),
  ];
  return c;
}

test("a lane label applied by a non-approver is ignored", () => {
  const ctx = makeCtx();
  for (const label of [LANES.hotfixLabel, LANES.baseRepairLabel]) {
    const byApprover = laneCandidate(1, 30, [label]).pr;
    const byOther = laneCandidate(1, 30, [label], { actor: "contributor" }).pr;
    assert.equal(laneOf(byOther, ctx), null, label);
    assert.notEqual(laneOf(byApprover, ctx), null, label);
    // only the latest `labeled` event counts: re-applied by someone else, it no longer counts
    const reapplied = {
      ...byApprover,
      timeline: [...byApprover.timeline, labeledEvent(label, "contributor", 5)],
    };
    assert.equal(laneOf(reapplied, ctx), null, `${label} re-applied by a non-approver`);
    // the label must be present: an old labeled event of a removed label is not a lane
    assert.equal(laneOf({ ...byApprover, labels: [config.label] }, ctx), null, label);
    assert.equal(selectLane([laneCandidate(1, 30, [label], { actor: "x" })], ctx), null, label);
  }
  // both labels by an approver: base-repair
  assert.equal(
    laneOf(laneCandidate(1, 30, [LANES.hotfixLabel, LANES.baseRepairLabel]).pr, ctx),
    "base-repair"
  );
  // case-insensitive, as GitHub label names
  assert.equal(laneOf(laneCandidate(1, 30, ["OMNI-QUEUE-HOTFIX"]).pr, ctx), "hotfix");
  // without a lanes section in the config there are no lanes
  const noLanes = makeCtx({ config: { ...liveConfig, lanes: null } });
  assert.equal(laneOf(laneCandidate(1, 30, [LANES.hotfixLabel]).pr, noLanes), null);
  assert.equal(selectLane([laneCandidate(1, 30, [LANES.hotfixLabel])], noLanes), null);
});

test("selectLane: hotfix first, batch of one, no wait", () => {
  // plenty of time left before batch.maxWaitMinutes: selectBatch would wait, a lane never does
  const young = 1;
  const plain = candidate(1, young + 3);
  const repairOld = laneCandidate(2, young + 2, [LANES.baseRepairLabel]);
  const hotfixNew = laneCandidate(3, young, [LANES.hotfixLabel]);
  const hotfixOld = laneCandidate(4, young + 1, [LANES.hotfixLabel]);
  const list = [plain, repairOld, hotfixNew, hotfixOld];
  assert.equal(selectBatch(list, makeCtx()).waiting, true, "the FIFO would wait");
  const picked = selectLane(list, makeCtx());
  assert.equal(picked.lane, "hotfix");
  assert.deepEqual(picked.batch, [
    {
      n: 4,
      head: hotfixOld.pr.headSha,
      title: "PR 4",
      author: "user4",
      labeledAt: iso(young + 1),
    },
  ]);
  // without a hotfix, the oldest base-repair PR goes before the FIFO
  const repair = selectLane([plain, repairOld], makeCtx());
  assert.deepEqual([repair.lane, nums(repair)], ["base-repair", [2]]);
  // no lane PR: nothing (the FIFO decides)
  assert.equal(selectLane([plain, candidate(5, 40)], makeCtx()), null);
  assert.equal(selectLane([], makeCtx()), null);
  // an ineligible lane PR is never picked
  const blocked = laneCandidate(6, 40, [LANES.hotfixLabel]);
  blocked.eligibility = { ...blocked.eligibility, eligible: false };
  assert.equal(selectLane([blocked, plain], makeCtx()), null);
});

test("repairOnly picks only base-repair", () => {
  const hotfix = laneCandidate(1, 50, [LANES.hotfixLabel]);
  const plain = candidate(2, 60);
  const repairA = laneCandidate(3, 30, [LANES.baseRepairLabel]);
  const repairB = laneCandidate(4, 40, [LANES.baseRepairLabel], { headSha: "e".repeat(40) });
  const only = (list, state) =>
    selectLane(list, makeCtx(state ? { state } : {}), { repairOnly: true });
  assert.equal(only([hotfix, plain]), null, "no hotfix, no FIFO PR");
  const picked = only([hotfix, plain, repairA, repairB]);
  assert.deepEqual([picked.lane, nums(picked)], ["base-repair", [4]]);
  // a repair already tried at its current head is skipped; at another head it is not
  const tried = { ...initialState(BASE, NOW), repairTried: { 4: "e".repeat(40) } };
  assert.deepEqual(nums(only([repairA, repairB], tried)), [3]);
  const moved = { ...initialState(BASE, NOW), repairTried: { 4: "f".repeat(40) } };
  assert.deepEqual(nums(only([repairA, repairB], moved)), [4]);
  // outside repairOnly a tried repair is skipped too (it is never recomposed at that head)
  assert.deepEqual(nums(selectLane([repairB, repairA], makeCtx({ state: tried }))), [3]);
});

test("a base-repair PR is eligible with red PR gates; a hotfix is not", () => {
  const red = { "Gate / CI": "failure", "Gate / Quality": "failure" };
  const ctx = gatesCtx();
  const repair = { ...laneCandidate(1, 30, [LANES.baseRepairLabel]).pr, prChecks: red };
  const hotfix = { ...laneCandidate(2, 30, [LANES.hotfixLabel]).pr, prChecks: red };
  const repairLane = laneOf(repair, ctx);
  const hotfixLane = laneOf(hotfix, ctx);
  assert.equal(repairLane, "base-repair");
  assert.equal(hotfixLane, "hotfix");
  assert.equal(evaluateEligibility(repair, { ...ctx, lane: repairLane }).eligible, true);
  assert.deepEqual(codes(evaluateEligibility(hotfix, { ...ctx, lane: hotfixLane })), [
    "pr-checks-not-green",
  ]);
  // a lane label by a non-approver is no exemption
  const fake = {
    ...laneCandidate(3, 30, [LANES.baseRepairLabel], { actor: "contributor" }).pr,
    prChecks: red,
  };
  assert.deepEqual(codes(evaluateEligibility(fake, { ...ctx, lane: laneOf(fake, ctx) })), [
    "pr-checks-not-green",
  ]);
  // the lane label adds to the rules, it replaces none: still needs the queue label
  const unqueued = { ...repair, labels: [LANES.baseRepairLabel] };
  assert.ok(
    codes(evaluateEligibility(unqueued, { ...ctx, lane: "base-repair" })).includes("no-label")
  );
});
