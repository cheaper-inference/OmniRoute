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
  frozenBranches,
  isBaseFrozen,
  selectBatch,
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
  const list = Array.from({ length: 9 }, (_, i) => candidate(i + 1, 100 - i));
  const result = selectBatch(list, makeCtx());
  assert.equal(config.batch.maxSize, 6);
  assert.deepEqual(nums(result), [1, 2, 3, 4, 5, 6]);
  assert.match(result.reason, /6 of 9/);
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
  // a full batch never waits
  const full = Array.from({ length: 6 }, (_, i) => candidate(i + 1, 1));
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
