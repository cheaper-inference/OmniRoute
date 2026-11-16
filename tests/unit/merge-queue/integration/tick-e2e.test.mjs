// omni-queue end to end: the REAL modules wired the way tick.main() wires them, against a fake
// GitHub (local HTTP) and a bare git repository as the remote (see helpers/queue-world.mjs).
// Plan §6 (integration) and §8 (rehearsal scenarios), minus what needs real GitHub Actions.
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import test, { describe } from "node:test";

import { NO_RUN_TIMEOUT_MINUTES } from "../../../../scripts/merge-queue/checks.mjs";
import { loadConfig } from "../../../../scripts/merge-queue/config.mjs";
import {
  STATE_BRANCH,
  baseCheckRef,
  candidateRef,
  dashboardTitle,
  parseQueueTrailers,
  stateFilePath,
} from "../../../../scripts/merge-queue/contracts.mjs";
import { main } from "../../../../scripts/merge-queue/tick.mjs";
import {
  BOT_LOGIN,
  LAND_TOKEN,
  QBASE,
  createQueueWorld,
  writesIn,
} from "./helpers/queue-world.mjs";

const head12 = (sha) => sha.slice(0, 12);
const nums = (prs) => prs.map((p) => p.n);

/**
 * Scenarios 1–9 and 11–15 are independent worlds (own sandbox, own fake server): they run
 * concurrently.
 * Scenario 10 mutates process.env for main() and runs alone, after them.
 */
const scenarios = [];
const scenario = (name, fn) => scenarios.push([name, fn]);

/** Open independent PRs (one new file each) and approve them in order. */
async function approvedPrs(w, numbers) {
  const heads = {};
  for (const n of numbers) {
    heads[n] = w.openPr(n, { [`pr-${n}.txt`]: `change ${n}\n` });
    const approval = await w.label(n);
    assert.equal(approval.action, "approved", `#${n} approved by the real approve.mjs`);
    w.clock.advance(1);
  }
  w.clock.advance(w.config.batch.maxWaitMinutes); // the batch window has passed
  return heads;
}

/** Statuses of the land context on `sha`, newest first: [state, creator, description]. */
function landStatuses(w, sha) {
  return (w.fake.statuses.get(sha) ?? [])
    .filter((st) => st.context === w.config.landing.statusContext)
    .map((st) => [st.state, st.creator.login, st.description]);
}

/** Merge commits on the first-parent chain base..candidate, oldest first. */
function queueMerges(w, baseSha, candidateSha) {
  const out = w.sb.origin([
    "log",
    "--first-parent",
    "--reverse",
    "--format=%P%x00%B%x1e",
    `${baseSha}..${candidateSha}`,
  ]).stdout;
  return out
    .split("\x1e")
    .map((r) => r.replace(/^\n/, ""))
    .filter(Boolean)
    .map((record) => {
      const [parents, message] = record.split("\x00");
      return { parents: parents.trim().split(" "), message, trailers: parseQueueTrailers(message) };
    });
}

/** CI + tick until nothing is in flight; returns the number of ticks spent. */
async function drain(w, { maxTicks = 20 } = {}) {
  for (let i = 1; i <= maxTicks; i++) {
    w.ciInFlight();
    await w.tick();
    if (!w.state().inFlight) return i;
  }
  throw new Error("the queue did not drain");
}

scenario(
  "scenarios 1+2 (live): 3 approved PRs composed, CI green on the candidate ref, merge-ff",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const base0 = w.baseTip();
    w.openPr(3, { "lib.txt": "library v2\n" }, { title: "Library bump" });
    // A title carrying a GitHub skip marker must not stop CI on the candidate.
    w.openPr(1, { "pr-1.txt": "change 1\n" }, { title: "First change [skip ci]" });
    // #2 is stacked on #3 (its branch contains #3's commit): #3 rides along without a merge commit.
    w.openPr(2, { "pr-2.txt": "change 2\n" }, { from: w.headOf(3), title: "Second change" });
    for (const n of [1, 2, 3]) {
      assert.equal((await w.label(n)).action, "approved");
      w.clock.advance(1);
    }
    const approvedAt = Object.fromEntries(
      [1, 2, 3].map((n) => [String(n), w.fake.timeline.get(n).at(-1).created_at])
    );
    w.clock.advance(w.config.batch.maxWaitMinutes);

    // ── tick 1: compose and push the candidate; state saved through the Contents API ──
    const first = await w.tick();
    const f = w.state().inFlight;
    assert.ok(f, "a candidate is in flight");
    assert.deepEqual(nums(f.prs), [1, 2, 3]);
    assert.equal(f.baseSha, base0);
    assert.deepEqual(w.candidateRefs(), [{ ref: f.candidateRef, sha: f.candidateSha }]);
    assert.deepEqual(w.candidatePushes(), [{ ref: f.candidateRef, sha: f.candidateSha }]);
    const merges = queueMerges(w, base0, f.candidateSha);
    assert.equal(merges.length, 2, "one merge commit per PR, none for the stacked #3");
    for (const [i, n] of [1, 2].entries()) {
      const { parents, message, trailers } = merges[i];
      assert.deepEqual(trailers, {
        pr: n,
        head: w.headOf(n),
        author: `dev${n}`,
        base: base0,
        target: QBASE,
        batch: f.batchId,
      });
      assert.equal(parents[1], w.headOf(n), "second parent = the approved head");
      assert.match(message, new RegExp(`^Merge PR #${n}: `));
      assert.doesNotMatch(message, /\[skip ci\]/i);
    }
    assert.match(merges[0].message, /First change \(skip ci\)/);
    assert.ok(w.isAncestor(w.headOf(3), f.candidateSha));
    // landing.actor "owner": the queue's merge commits are the owner's (landing.identity)
    const { name, email } = w.config.landing.identity;
    const signature = w.sb.origin([
      "log",
      "-1",
      "--format=%an <%ae>|%cn <%ce>",
      f.candidateSha,
    ]).stdout;
    assert.equal(signature, `${name} <${email}>|${name} <${email}>`);
    // state branch created through the git data / Contents API of the fake
    assert.ok(
      writesIn(first.requests).some(
        (r) => r.path === "/git/refs" || r.path.startsWith("/contents/")
      )
    );
    assert.ok(w.fake.readFile(STATE_BRANCH, stateFilePath(QBASE)));
    const started = w.events("batch-started");
    assert.equal(started.length, 1);
    assert.deepEqual(started[0].labeledAt, approvedAt, "approval time of each PR (metrics)");
    assert.match(started[0].detail, /stacked #3/);

    // ── CI: green on the candidate ref; a red run of the SAME SHA from another branch push ──
    w.runCi(f.candidateSha, f.candidateRef);
    w.fake.addCheckRun(f.candidateSha, {
      name: "Gate / CI",
      conclusion: "failure",
      headBranch: QBASE, // not the candidate ref: never decides the candidate verdict
    });

    // ── tick 2: the App blesses the candidate, then lands merge-ff ──
    assert.deepEqual(landStatuses(w, f.candidateSha), [], "not blessed while CI ran");
    await w.tick();
    const state = w.state();
    assert.deepEqual(landStatuses(w, f.candidateSha), [
      ["success", BOT_LOGIN, `omni-queue ${f.batchId}: checks green`],
    ]);
    assert.equal(w.events("land-blessed").length, 1);
    assert.equal(state.inFlight, null);
    assert.equal(w.baseTip(), f.candidateSha, "base == the tested candidate");
    assert.equal(
      w.sb.origin(["rev-parse", `${QBASE}^{tree}`]).stdout,
      w.sb.origin(["rev-parse", `${f.candidateSha}^{tree}`]).stdout
    );
    for (const n of [1, 2, 3]) {
      assert.ok(w.isAncestor(w.headOf(n), w.baseTip()), `#${n} head reachable from the base`);
      assert.deepEqual(w.labelsOf(n), [], `#${n} labels removed`);
      assert.equal(w.commentsWithKey(n, `landed:${head12(w.headOf(n))}`).length, 1);
    }
    assert.deepEqual(w.events("landed")[0].prs, [1, 2, 3]);
    assert.equal(state.counters.landedPrs, 3);
    assert.equal(state.counters.culprits, 0);
    assert.deepEqual(w.candidateRefs(), [], "the landed candidate ref was deleted");
    const dashboards = [...w.fake.issues.values()].filter((i) => i.title === dashboardTitle(QBASE));
    assert.equal(dashboards.length, 1, "dashboard issue created");
    assert.ok(dashboards[0].labels.some((l) => l.name === "omni-queue-dashboard"));
    assert.match(dashboards[0].body, /#1/);
    for (const comment of [...w.fake.comments.values()].flat()) {
      assert.equal(comment.user.login, BOT_LOGIN, "every queue comment is the App's");
    }
  }
);

scenario(
  "scenario 2c (live): a planted in-flight record (one extra commit over its batch) is neither blessed nor landed",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const base0 = w.baseTip();
    await approvedPrs(w, [1]);
    await w.tick();
    const state = w.state();
    const f = state.inFlight;
    // The composed candidate plus one commit (same tree) under a candidate ref of its own, and
    // the stored record pointed at it: what an edit of the state branch could plant. Its CI is
    // green (a planted tree controls its own ci.yml).
    const planted = w.sb.origin(["commit-tree", `${f.candidateSha}^{tree}`, "-p", f.candidateSha], {
      input: "planted\n",
    }).stdout;
    const ref = candidateRef(QBASE, f.batchId, planted);
    w.sb.origin(["update-ref", `refs/heads/${ref}`, planted]);
    state.inFlight = { ...f, candidateSha: planted, candidateRef: ref };
    w.fake.commitFiles({
      branch: STATE_BRANCH,
      files: { [stateFilePath(QBASE)]: `${JSON.stringify(state, null, 2)}\n` },
      message: "planted",
    });
    w.runCi(planted, ref);

    await w.tick();
    const after = w.state();
    assert.deepEqual(landStatuses(w, planted), [], "no land status on the planted commit");
    assert.deepEqual(landStatuses(w, f.candidateSha), [], "nor on the composed one");
    assert.equal(w.baseTip(), base0, "nothing landed");
    assert.equal(after.inFlight, null);
    assert.equal(after.paused?.reason, "error");
    assert.match(after.paused.detail, /does not match its candidate/);
    assert.match(after.paused.detail, /not a queue merge commit/);
    assert.equal(w.events("land-blessed").length, 0);
  }
);

scenario(
  "scenario 2d (live): queue refs unprotected, the green batch is not blessed and the queue pauses; protected again and resumed, it lands",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const base0 = w.baseTip();
    const heads = await approvedPrs(w, [1]);
    await w.tick();
    const f = w.state().inFlight;
    assert.ok(f, "a candidate is in flight");
    w.runCi(f.candidateSha, f.candidateRef);
    // The queue-refs ruleset no longer enforces `update` on the state branch.
    w.unprotect(STATE_BRANCH, "update");

    await w.tick();
    let state = w.state();
    assert.deepEqual(landStatuses(w, f.candidateSha), [], "the green candidate is not blessed");
    assert.equal(w.events("land-blessed").length, 0);
    assert.equal(w.baseTip(), base0, "the base did not move");
    assert.equal(state.inFlight, null);
    assert.equal(state.paused?.reason, "error");
    assert.equal(
      state.paused.detail,
      "queue refs are not protected (omni-queue-state: update): not blessed, not landed; " +
        "apply apply-ruleset.mjs --kind queue-refs, then resume"
    );
    assert.deepEqual(w.labelsOf(1), [w.config.label], "the PR keeps its label");

    // The ruleset enforces every rule again; the operator resumes: the PR is composed again and
    // lands.
    w.fake.branchRules.delete(STATE_BRANCH);
    await w.tick({ action: "resume" });
    assert.equal(w.state().paused, null, "resumed");
    await drain(w);
    state = w.state();
    assert.equal(state.paused, null);
    const landed = w.events("landed");
    assert.equal(landed.length, 1);
    assert.deepEqual(landed[0].prs, [1]);
    assert.notEqual(w.baseTip(), base0, "the base moved");
    assert.ok(w.isAncestor(heads[1], w.baseTip()), "#1 landed");
    assert.deepEqual(landStatuses(w, w.baseTip()), [
      ["success", BOT_LOGIN, `omni-queue ${landed[0].batchId}: checks green`],
    ]);
  }
);

scenario(
  "scenario 2b: a pull request opened on the candidate SHA never decides the candidate's verdict",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const base0 = w.baseTip();
    w.seedGreenBase(); // the tip the queue landed: no base check needed
    await approvedPrs(w, [1]);
    w.culprits.add(1);
    await w.tick();
    const red = w.state().inFlight;
    w.runCi(red.candidateSha, red.candidateRef); // the candidate's own push run: Gate / CI fails
    // A fork publishes the (public) candidate commit and opens a PR on it; its CI passes later.
    w.reportChecks(red.candidateSha, {
      headBranch: "patch-1",
      suiteBranch: null,
      event: "pull_request",
    });
    // Same trick from a branch of this repository named like the candidate ref.
    w.reportChecks(red.candidateSha, { headBranch: red.candidateRef, event: "pull_request" });
    await w.tick();
    assert.equal(w.baseTip(), base0, "the red candidate did not land");
    assert.equal(w.events("checks-red").length, 1);
    assert.equal(w.events("checks-green").length, 0);
    assert.deepEqual(
      w.events("culprit-found").map((e) => e.prs),
      [[1]]
    );

    // The other way around: a green candidate, and the PR's runs get cancelled.
    await approvedPrs(w, [2]);
    await w.tick();
    const green = w.state().inFlight;
    assert.deepEqual(nums(green.prs), [2]);
    w.runCi(green.candidateSha, green.candidateRef);
    for (const suiteBranch of [null, green.candidateRef]) {
      w.reportChecks(green.candidateSha, {
        headBranch: suiteBranch ?? "patch-1",
        suiteBranch,
        event: "pull_request",
        conclusion: "cancelled",
      });
    }
    await w.tick();
    assert.equal(w.baseTip(), green.candidateSha, "the candidate's own green verdict landed it");
    assert.equal(w.events("infra-retry").length, 0);
    assert.equal(w.state().paused, null);
  }
);

/**
 * A commit status on `sha` written by `creator` (any App or user with statuses:write), listed
 * newest first the way the fake's POST /statuses/:sha records one.
 */
function postStatus(w, sha, { context, state, creator }) {
  const at = w.fake.now();
  const status = {
    id: Date.parse(at) + (w.fake.statuses.get(sha)?.length ?? 0),
    state,
    context,
    description: `${context}: ${state}`,
    target_url: null,
    creator: { login: creator, type: /\[bot\]$/.test(creator) ? "Bot" : "User" },
    created_at: at,
    updated_at: at,
  };
  if (!w.fake.statuses.has(sha)) w.fake.statuses.set(sha, []);
  w.fake.statuses.get(sha).unshift(status);
}

scenario("a status an App posts on the candidate SHA never decides its verdict", async (t) => {
  const w = await createQueueWorld(t, { mode: "live" });
  w.seedGreenBase(); // the tip the queue landed: no base check needed
  // #2 is opened now (on the base tip the sandbox knows) and approved after #1 has landed.
  w.openPr(2, { "pr-2.txt": "change 2\n" });

  // A green candidate with failing and pending statuses on its SHA: it lands.
  await approvedPrs(w, [1]);
  await w.tick();
  const green = w.state().inFlight;
  postStatus(w, green.candidateSha, {
    context: "ci/external",
    state: "failure",
    creator: "external-ci[bot]",
  });
  postStatus(w, green.candidateSha, {
    context: "security/scan",
    state: "error",
    creator: "external-ci[bot]",
  });
  postStatus(w, green.candidateSha, {
    context: "ci/slow",
    state: "pending",
    creator: BOT_LOGIN, // the queue's own App, under a context that is not omni-queue/
  });
  w.runCi(green.candidateSha, green.candidateRef);
  await w.tick();
  assert.equal(w.baseTip(), green.candidateSha, "the candidate's own green runs landed it");
  assert.equal(w.events("checks-red").length, 0);
  assert.equal(w.events("checks-green").length, 1);

  // A candidate whose required checks exist only as success statuses: never green.
  assert.equal((await w.label(2)).action, "approved");
  w.clock.advance(w.config.batch.maxWaitMinutes);
  await w.tick();
  const forged = w.state().inFlight;
  assert.deepEqual(nums(forged.prs), [2]);
  for (const name of w.config.requiredChecks) {
    postStatus(w, forged.candidateSha, { context: name, state: "success", creator: "forger[bot]" });
  }
  postStatus(w, forged.candidateSha, {
    context: w.config.requiredChecks[0],
    state: "success",
    creator: BOT_LOGIN,
  });
  w.clock.advance(5);
  await w.tick();
  assert.equal(w.baseTip(), green.candidateSha, "statuses alone landed nothing");
  assert.equal(w.state().inFlight?.candidateSha, forged.candidateSha, "still waiting for its CI");
  assert.equal(w.events("checks-green").length, 1);
  w.runCi(forged.candidateSha, forged.candidateRef);
  await w.tick();
  assert.equal(w.baseTip(), forged.candidateSha, "its own green runs land it");
  assert.equal(w.events("checks-red").length, 0);
  assert.equal(w.state().paused, null);
});

scenario(
  "scenario 3 (shadow): would-land, base intact, the next tick does not recompose",
  async (t) => {
    // The production configuration: landing.actor "owner" and no OMNI_QUEUE_LAND_TOKEN.
    const w = await createQueueWorld(t, { mode: "shadow", landToken: null });
    assert.equal(w.config.landing.actor, "owner");
    const base0 = w.baseTip();
    const heads = await approvedPrs(w, [1, 2, 3]);
    await w.tick();
    const f = w.state().inFlight;
    w.runCi(f.candidateSha, f.candidateRef);
    await w.tick();

    let state = w.state();
    assert.equal(w.baseTip(), base0, "shadow never lands");
    assert.equal(state.inFlight, null);
    assert.equal(w.events("would-land").length, 1);
    assert.equal(w.events("landed").length, 0);
    assert.deepEqual(state.shadow.processed, { 1: heads[1], 2: heads[2], 3: heads[3] });
    for (const n of [1, 2, 3]) assert.deepEqual(w.labelsOf(n), ["omni-queue"], "labels kept");
    assert.equal(state.paused, null, "shadow runs without the land token");
    for (const sha of [f.candidateSha, heads[1], heads[2], heads[3]]) {
      assert.deepEqual(landStatuses(w, sha), [], "shadow never writes the land status");
    }

    await w.tick();
    await w.tick();
    state = w.state();
    assert.equal(w.events("batch-started").length, 1, "the same heads are not composed again");
    assert.equal(w.candidatePushes().length, 1);
    assert.equal(state.inFlight, null);
    assert.equal(w.baseTip(), base0);
  }
);

scenario(
  "scenario 3b (shadow): culprit, conflicts and a withdrawn label write nothing on any PR",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "shadow" });
    // #1 conflicts with the base in git; GitHub already reports #4 as conflicting.
    w.openPr(1, { "shared.txt": "PR one\nline 2\nline 3\n" });
    w.sb.advanceBase({ "shared.txt": "BASE\nline 2\nline 3\n" }, "base edits line 1");
    const base0 = w.baseTip();
    w.openPr(2, { "two.txt": "2\n" });
    w.openPr(3, { "three.txt": "3\n" });
    w.openPr(4, { "four.txt": "4\n" });
    w.fake.pulls.get(4).mergeable = false;
    for (const n of [1, 2, 3, 4]) {
      assert.equal((await w.label(n)).action, "approved");
      w.clock.advance(1);
    }
    w.clock.advance(w.config.batch.maxWaitMinutes);
    w.culprits.add(2);
    w.seedGreenBase(); // the tip the queue landed: no base check needed
    const from = w.fake.requests.length;
    await w.tick(); // b1 [2, 3]; #1 base-conflict, #4 conflicting
    await drain(w); // red → [2] red (culprit) → [3] green (would-land)
    await w.tick();
    await w.tick();

    const state = w.state();
    assert.equal(w.baseTip(), base0, "shadow never lands");
    assert.equal(state.inFlight, null);
    assert.deepEqual(
      w.events("batch-started").map((e) => e.prs),
      [[2, 3], [2], [3]],
      "no head is composed twice"
    );
    assert.deepEqual(
      w.events("would-dequeue").map((e) => [e.prs[0], e.detail]),
      [
        [4, "conflicting"],
        [1, "base-conflict"],
      ]
    );
    assert.equal(w.events("pr-dequeued").length, 0);
    const culprit = w.events("culprit-found");
    assert.deepEqual(
      culprit.map((e) => e.prs),
      [[2]]
    );
    assert.match(culprit[0].detail, /shadow mode: label kept, no comment$/);
    assert.deepEqual(
      w.events("would-land").map((e) => e.prs),
      [[3]]
    );
    assert.deepEqual(state.shadow.processed, {
      1: w.headOf(1),
      2: w.headOf(2),
      3: w.headOf(3),
    });
    for (const n of [1, 2, 3, 4]) {
      assert.deepEqual(w.labelsOf(n), ["omni-queue"], `#${n} keeps its label`);
      assert.equal(w.fake.comments.get(n), undefined, `#${n} got no comment`);
      const statuses = w.fake.statuses.get(w.headOf(n));
      assert.deepEqual(
        statuses.map((st) => [st.context, st.state]),
        [["omni-queue/approval", "success"]],
        `#${n}: the approval is the only status on its head`
      );
    }
    const onPrs = writesIn(w.fake.requests.slice(from)).filter((r) =>
      /^\/(issues|pulls)\/[1-4](\/|$)/.test(r.path)
    );
    assert.deepEqual(
      onPrs.map((r) => `${r.method} ${r.path}`),
      [],
      "no label removal and no comment on a pull request"
    );
    const dashboard = [...w.fake.issues.values()].find((i) => i.title === dashboardTitle(QBASE));
    assert.match(dashboard.body, /`would-dequeue`/);
    assert.match(dashboard.body, /`shadow-processed`/);

    // The maintainer withdraws a label: the approval job writes nothing in shadow mode.
    const withdrawn = await w.unlabel(3);
    assert.deepEqual(withdrawn, { action: "ignored" });
    assert.deepEqual(
      w.fake.statuses.get(w.headOf(3)).map((st) => st.state),
      ["success"],
      "no red status on a PR that another queue still lands"
    );
    await w.tick();
    assert.equal(w.candidatePushes().length, 3);
  }
);

scenario(
  "scenario 3c (shadow): a PR Mergify merged during the candidate CI is noted on would-land",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "shadow" });
    const heads = await approvedPrs(w, [1, 2]);
    await w.tick();
    const f = w.state().inFlight;
    assert.deepEqual(nums(f.prs), [1, 2]);
    w.runCi(f.candidateSha, f.candidateRef);
    // Another path merges #2 (the tested head) while the candidate CI runs.
    Object.assign(w.fake.pulls.get(2), {
      state: "closed",
      merged: true,
      merged_at: w.clock.now(),
    });
    await w.tick();

    const would = w.events("would-land");
    assert.equal(would.length, 1, "the green batch was not discarded");
    assert.deepEqual(would[0].prs, [1, 2]);
    assert.match(would[0].detail, /merged meanwhile by another path: #2$/);
    assert.equal(w.events("land-rejected").length, 0);
    assert.equal(w.candidatePushes().length, 1, "nothing recomposed");
    assert.deepEqual(w.state().shadow.processed, { 1: heads[1] });
  }
);

scenario(
  "scenario 4: batch of 3 with 1 culprit, bisection isolates it, the other 2 land",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const heads = await approvedPrs(w, [1, 2, 3]);
    w.culprits.add(2);
    w.seedGreenBase(); // the tip the queue landed: no base check needed
    await w.tick(); // compose b1 [1, 2, 3]
    const ticks = 1 + (await drain(w));
    const pushes = w.candidatePushes();
    t.diagnostic(
      `bisection of 3 with 1 culprit: ${pushes.length} candidate pushes, ${ticks} ticks`
    );

    const state = w.state();
    assert.deepEqual(
      w.events("batch-started").map((e) => e.prs),
      [[1, 2, 3], [1, 2], [1], [2], [3]],
      "b1 red → [1,2] red → [1] green (lands) → [2] red (culprit) → [3] green (lands)"
    );
    assert.equal(pushes.length, 5);
    assert.equal(ticks, 6);
    assert.equal(state.counters.ciRuns, 5);
    assert.equal(state.counters.culprits, 1);
    assert.equal(state.counters.bisections, 1);
    assert.equal(state.counters.landedPrs, 2);
    assert.deepEqual(
      w.events("culprit-found").map((e) => e.prs),
      [[2]]
    );
    assert.deepEqual(w.labelsOf(2), [], "culprit unlabeled");
    const culprit = w.commentsWithKey(2, `culprit:${head12(heads[2])}`);
    assert.equal(culprit.length, 1);
    assert.match(culprit[0].body, /Gate \/ CI/);
    assert.ok(w.isAncestor(heads[1], w.baseTip()));
    assert.ok(w.isAncestor(heads[3], w.baseTip()));
    assert.ok(!w.isAncestor(heads[2], w.baseTip()), "the culprit never reaches the base");
    assert.deepEqual(w.candidateRefs(), [], "every candidate ref was cleaned up");
  }
);

scenario(
  "scenario 5: the base moves during CI, land-rejected, recomposed on the new tip",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const heads = await approvedPrs(w, [1, 2]);
    await w.tick();
    const f = w.state().inFlight;
    const moved = w.sb.advanceBase({ "hotfix.txt": "manual merge\n" }, "manual hotfix");
    w.runCi(f.candidateSha, f.candidateRef);
    await w.tick();

    assert.equal(w.baseTip(), moved, "the stale candidate did not overwrite the base");
    const rejected = w.events("land-rejected");
    assert.equal(rejected.length, 1);
    assert.match(rejected[0].detail, /base moved/);
    const g = w.state().inFlight;
    assert.notEqual(g.candidateSha, f.candidateSha);
    assert.equal(g.baseSha, moved, "recomposed on the new tip");
    assert.deepEqual(nums(g.prs), [1, 2]);
    assert.equal(queueMerges(w, moved, g.candidateSha)[0].parents[0], moved);
    assert.equal(w.events("batch-started").length, 2);

    w.runCi(g.candidateSha, g.candidateRef);
    await w.tick();
    assert.equal(w.baseTip(), g.candidateSha);
    for (const n of [1, 2]) assert.ok(w.isAncestor(heads[n], w.baseTip()));
    assert.ok(w.isAncestor(moved, w.baseTip()), "the manual merge is kept");
  }
);

scenario(
  "scenario 5c: a stored base the base branch does not have is never blessed; recomposed on the tip",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const seed = w.baseTip();
    const heads = await approvedPrs(w, [1, 2]);
    // E carries a payload and sits on top of the tip; the batch is composed on it honestly.
    const E = w.sb.advanceBase({ "payload.txt": "never reviewed\n" }, "commit E");
    await w.tick();
    const f = w.state().inFlight;
    assert.equal(f.baseSha, E);
    // E leaves the base (rewound): the stored base is now what a planted record would name.
    w.sb.origin(["update-ref", `refs/heads/${QBASE}`, seed]);
    w.runCi(f.candidateSha, f.candidateRef);
    await w.tick();

    assert.deepEqual(landStatuses(w, f.candidateSha), [], "the candidate on E was never blessed");
    assert.equal(w.baseTip(), seed, "nothing landed");
    const rejected = w.events("land-rejected");
    assert.equal(rejected.length, 1);
    assert.match(rejected[0].detail, /^base moved: base .* expected /);
    const g = w.state().inFlight;
    assert.equal(g.baseSha, seed, "recomposed on the real tip");
    assert.deepEqual(nums(g.prs), [1, 2]);
    assert.ok(!w.isAncestor(E, g.candidateSha), "the recomposed candidate does not carry E");
    for (const n of [1, 2]) assert.ok(w.isAncestor(heads[n], g.candidateSha));
  }
);

scenario(
  "scenario 5b (squash-api as the owner): heads blessed by the App, merged with the land token",
  async (t) => {
    const w = await createQueueWorld(t, {
      mode: "live",
      config: { landing: { ...loadConfig().landing, mode: "squash-api" } },
    });
    const heads = await approvedPrs(w, [1, 2]);
    await w.tick();
    const f = w.state().inFlight;
    assert.deepEqual(nums(f.prs), [1, 2]);
    w.runCi(f.candidateSha, f.candidateRef);
    // GitHub refuses the second merge: the landing does not complete.
    w.fake.mergeResponses.set(2, {
      status: 405,
      body: { message: "Pull Request is not mergeable" },
    });
    const { requests } = await w.tick();

    const merges = requests.filter(
      (r) => r.method === "PUT" && /^\/pulls\/\d+\/merge$/.test(r.path)
    );
    assert.deepEqual(
      merges.map((r) => [r.path, r.headers.authorization]),
      [
        ["/pulls/1/merge", `Bearer ${LAND_TOKEN}`],
        ["/pulls/2/merge", `Bearer ${LAND_TOKEN}`],
      ],
      "the PRs are merged with the owner's token"
    );
    const blessings = requests.filter(
      (r) => r.method === "POST" && r.path.startsWith("/statuses/")
    );
    assert.ok(
      requests.indexOf(blessings[1]) < requests.indexOf(merges[0]),
      "every head is blessed before the first merge"
    );
    for (const n of [1, 2]) {
      assert.deepEqual(
        landStatuses(w, heads[n]),
        [
          ["failure", BOT_LOGIN, `omni-queue ${f.batchId}: landing withdrawn (merge-failed)`],
          ["success", BOT_LOGIN, `omni-queue ${f.batchId}: checks green`],
        ],
        `#${n}: blessed by the App, withdrawn when the landing did not complete`
      );
    }
    const state = w.state();
    assert.equal(state.paused.reason, "error");
    assert.match(state.paused.detail, /merge-failed/);
    assert.equal(state.inFlight, null);
  }
);

scenario(
  "scenario 6: base conflict leaves, batch conflict stays, already-in-base is dropped",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    // #1 edits line 1 of shared.txt; the base then changes the same line → conflicts with the base.
    w.openPr(1, { "shared.txt": "PR one\nline 2\nline 3\n" });
    w.sb.advanceBase({ "shared.txt": "BASE\nline 2\nline 3\n" }, "base edits line 1");
    // #2 and #3 add the same new file with different content → they conflict only with each other.
    w.openPr(2, { "both.txt": "from two\n" });
    w.openPr(3, { "both.txt": "from three\n" });
    // #4's commit already entered the base by hand (fast-forward).
    const head4 = w.openPr(4, { "four.txt": "four\n" });
    w.sb.work(["push", "--quiet", "origin", `${head4}:refs/heads/${QBASE}`]);
    for (const n of [1, 2, 3, 4]) {
      await w.label(n);
      w.clock.advance(1);
    }
    w.clock.advance(w.config.batch.maxWaitMinutes);
    await w.tick();

    const f = w.state().inFlight;
    assert.deepEqual(nums(f.prs), [2]);
    // #1: dequeued with a comment
    assert.deepEqual(w.labelsOf(1), []);
    assert.equal(w.commentsWithKey(1, `base-conflict:${head12(w.headOf(1))}`).length, 1);
    // #3: skipped for this batch only, still queued
    assert.deepEqual(w.labelsOf(3), ["omni-queue"]);
    assert.deepEqual(
      w.events("pr-skipped-conflict").map((e) => e.prs),
      [[3]]
    );
    // #4: already in the base → dequeued, never recomposed
    assert.deepEqual(w.labelsOf(4), []);
    assert.equal(w.commentsWithKey(4, `already-landed:${head12(head4)}`).length, 1);
    assert.deepEqual(
      w.events("pr-dequeued").map((e) => [e.prs[0], e.detail]),
      [
        [1, "base-conflict"],
        [4, "already-in-base"],
      ]
    );
    assert.match(w.events("batch-started")[0].detail, /#3 batch-conflict/);
    assert.match(w.events("batch-started")[0].detail, /#4 already-in-base/);

    w.runCi(f.candidateSha, f.candidateRef);
    await w.tick(); // lands #2; #3 now conflicts with the base itself → leaves the queue
    assert.ok(w.isAncestor(w.headOf(2), w.baseTip()));
    assert.deepEqual(w.labelsOf(3), []);
    assert.equal(w.commentsWithKey(3, `base-conflict:${head12(w.headOf(3))}`).length, 1);
    assert.equal(w.events("batch-started").length, 1, "#4 was never composed again");
  }
);

scenario(
  "scenario 7: non-approver label ignored once; a label before a new push never enters",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    w.openPr(1, { "one.txt": "1\n" });
    w.openPr(2, { "two.txt": "2\n" });
    assert.equal((await w.label(1, { actor: "mallory" })).action, "rejected-actor");
    assert.equal((await w.label(2)).action, "approved");
    w.clock.advance(1);
    w.pushToPr(2, { "two.txt": "2 again\n" }); // the head changes after the approval
    w.clock.advance(w.config.batch.maxWaitMinutes);

    await w.tick();
    await w.tick();
    assert.equal(w.state().inFlight, null, "nothing composed");
    assert.equal(w.candidatePushes().length, 0);
    const notApprover = w.commentsWithKey(1, "not-approver");
    assert.equal(notApprover.length, 1, "approve.mjs and the tick share one comment");
    assert.equal(notApprover[0].user.login, BOT_LOGIN);
    assert.deepEqual(w.labelsOf(1), ["omni-queue"], "the label is ignored, not removed");
    assert.deepEqual(w.labelsOf(2), ["omni-queue"], "approval of the new head may still come");

    // Hours later no approval exists for the new head: the label goes, with one comment.
    w.clock.advance(7 * 60);
    await w.tick();
    assert.deepEqual(w.labelsOf(2), []);
    assert.equal(w.commentsWithKey(2, `head-changed:${head12(w.headOf(2))}`).length, 1);
    assert.equal(w.candidatePushes().length, 0);
    assert.equal(w.events("batch-started").length, 0);
  }
);

scenario("scenario 8: a protected surface without protected-approved does not enter", async (t) => {
  const w = await createQueueWorld(t, { mode: "live" });
  w.openPr(1, { "AGENTS.md": "new agent rules\n" });
  w.openPr(2, { "two.txt": "2\n" });
  await w.label(1);
  await w.label(2);
  w.clock.advance(w.config.batch.maxWaitMinutes + 1);
  await w.tick();

  const f = w.state().inFlight;
  assert.deepEqual(nums(f.prs), [2], "only the unprotected PR is composed");
  assert.equal(w.commentsWithKey(1, `protected:${head12(w.headOf(1))}`).length, 1);
  assert.deepEqual(w.labelsOf(1), ["omni-queue"]);
  assert.ok(!w.isAncestor(w.headOf(1), f.candidateSha));
});

scenario(
  "scenario 8b: a PR whose file list GitHub truncates needs protected-approved",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    w.openPr(1, { "one.txt": "1\n" });
    w.openPr(2, { "two.txt": "2\n" });
    // 3,001 changed files: GitHub lists only the first 3,000, so a protected path could hide past
    // the cap. The extra entries live only in the manifest; the git diff stays one file.
    for (let i = 0; i < 3000; i++) w.fake.files.get(1).push({ filename: `pad/${i}.txt` });
    await w.label(1);
    await w.label(2);
    w.clock.advance(w.config.batch.maxWaitMinutes + 1);
    await w.tick();

    const f = w.state().inFlight;
    assert.deepEqual(nums(f.prs), [2], "the PR with a truncated file list stays out");
    assert.equal(w.commentsWithKey(1, `protected:${head12(w.headOf(1))}`).length, 1);
    assert.ok(!w.isAncestor(w.headOf(1), f.candidateSha));
  }
);

scenario("scenario 9: an open release-freeze citing the base admits nothing", async (t) => {
  const w = await createQueueWorld(t, { mode: "live" });
  w.fake.addIssue({
    title: "🔒 release-freeze: v1.0.0 in progress",
    body: `do NOT merge campaign PRs into ${QBASE}`,
    labels: ["release-freeze"],
  });
  await approvedPrs(w, [1, 2]);
  await w.tick();
  assert.equal(w.state().inFlight, null);
  assert.equal(w.candidatePushes().length, 0);
  assert.equal(w.events("batch-started").length, 0);
  for (const n of [1, 2]) {
    assert.equal(w.commentsWithKey(n, "frozen:release-v1.0.0").length, 1);
    assert.deepEqual(w.labelsOf(n), ["omni-queue"], "kept: retargeting is the author's call");
  }
});

/** Type of every event in the queue history, oldest first. */
const eventTypes = (w) => w.state().history.map((e) => e.type);

/** The base-check candidate ref of `sha` as the brief names it: omni-queue/<base>/basecheck-<sha12>. */
const baseCheckRefRe = (sha, suffix = "") =>
  new RegExp(`^omni-queue/release-v1\\.0\\.0/basecheck-${head12(sha)}${suffix}$`);

// Scenarios 11–14 never call seedGreenBase: the tip has no verdict, so a red batch on it goes
// through the base check first (classify: needs-base-check), with the real classifier reading
// the check runs and annotations the fake GitHub serves.

scenario(
  "scenario 11: red batch on a tip pushed from outside: base check green, then bisection isolates the culprit",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const tip = w.sb.advanceBase({ "outside.txt": "pushed by hand\n" }, "pushed from outside");
    w.failingJob = "Unit Tests (2/8)";
    const heads = await approvedPrs(w, [1, 2, 3]);
    w.culprits.add(2);

    await w.tick(); // compose b1 [1, 2, 3] on a tip the queue never verified
    assert.equal(w.state().inFlight.baseSha, tip);
    w.ciInFlight(); // b1 red: "Unit Tests (2/8)" fails, and "Gate / CI" with it
    await w.tick();
    let state = w.state();
    assert.equal(state.inFlight.kind, "base-check", "nobody is blamed before the bare base ran");
    assert.equal(state.inFlight.candidateSha, tip);
    assert.equal(state.inFlight.candidateRef, baseCheckRef(QBASE, tip));
    assert.match(state.inFlight.candidateRef, baseCheckRefRe(tip));
    assert.deepEqual(w.candidatePushes().at(-1), { ref: baseCheckRef(QBASE, tip), sha: tip });
    assert.deepEqual(state.inFlight.pendingRed.signatures, [
      { check: "Gate / CI", key: "", infra: false },
      { check: "Unit Tests", key: "", infra: false },
    ]);
    assert.equal(
      w.events("base-check-started")[0].detail,
      "b1 red on a base with no verdict: testing the bare base"
    );
    for (const n of [1, 2, 3]) assert.deepEqual(w.labelsOf(n), ["omni-queue"]);
    assert.equal(w.fake.comments.get(2), undefined, "no culprit comment yet");

    w.ciInFlight(); // the bare base passes every check
    await w.tick();
    state = w.state();
    assert.equal(state.baseChecks[0].baseSha, tip);
    assert.equal(state.baseChecks[0].status, "green");
    assert.equal(state.baseChecks[0].ref, baseCheckRef(QBASE, tip));
    const baseGreen = w.events("checks-green")[0];
    assert.deepEqual(
      [baseGreen.batchId, baseGreen.sha, baseGreen.prs],
      [`basecheck-${head12(tip)}`, tip, []]
    );
    assert.equal(w.events("bisect-split")[0].detail, "batch of 3 red: testing #1, #2 first");

    await drain(w);
    state = w.state();
    assert.deepEqual(eventTypes(w), [
      "batch-started", // b1 [1, 2, 3]
      "checks-red",
      "base-check-started",
      "checks-green", // the bare base
      "bisect-split",
      "batch-started", // [1, 2]
      "checks-red",
      "bisect-split",
      "batch-started", // [1]
      "checks-green",
      "land-blessed",
      "landed",
      "batch-started", // [2], on the tip #1 landed
      "checks-red",
      "culprit-found",
      "batch-started", // [3]
      "checks-green",
      "land-blessed",
      "landed",
    ]);
    assert.deepEqual(
      w.events("batch-started").map((e) => e.prs),
      [[1, 2, 3], [1, 2], [1], [2], [3]]
    );
    assert.deepEqual(
      w.events("culprit-found").map((e) => [e.prs, e.detail]),
      [[[2], "Gate / CI, Unit Tests (2/8)"]]
    );
    assert.deepEqual(
      w.events("landed").map((e) => e.prs),
      [[1], [3]]
    );
    assert.deepEqual(w.labelsOf(2), [], "culprit unlabeled");
    const [comment] = w.commentsWithKey(2, `culprit:${head12(heads[2])}`);
    assert.match(comment.body, /\[`Unit Tests \(2\/8\)`\]\([^)]+\) — `failure`/);
    assert.doesNotMatch(comment.body, /hanging/);
    assert.ok(w.isAncestor(heads[1], w.baseTip()));
    assert.ok(w.isAncestor(heads[3], w.baseTip()));
    assert.ok(!w.isAncestor(heads[2], w.baseTip()), "the culprit never reaches the base");
    assert.ok(w.isAncestor(tip, w.baseTip()), "the outside push is kept");
    assert.equal(state.baseChecks.find((b) => b.baseSha === tip).status, "green");
    assert.equal(state.counters.bisections, 1);
    assert.equal(state.paused, null);
    assert.deepEqual(w.candidateRefs(), [], "every candidate ref was cleaned up");
  }
);

scenario(
  "scenario 12: the bare base fails the same check: base-red pause, labels kept, resumes when the tip moves",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const broken = w.sb.advanceBase({ "widget.txt": "broken\n" }, "pushed from outside");
    w.failingJob = "Unit Tests (5/8)";
    w.brokenBases.add(broken); // every run on this tip fails "Unit Tests (5/8)"
    const heads = await approvedPrs(w, [1, 2]);

    await w.tick(); // b1 [1, 2] on the broken tip
    w.ciInFlight(); // red: the job fails, and "Gate / CI" with it
    await w.tick();
    assert.equal(w.state().inFlight.kind, "base-check");
    assert.match(w.state().inFlight.candidateRef, baseCheckRefRe(broken));
    w.ciInFlight(); // the bare base fails the same job
    await w.tick();

    let state = w.state();
    assert.deepEqual(eventTypes(w), [
      "batch-started",
      "checks-red",
      "base-check-started",
      "checks-red", // the base check
      "base-red-paused",
    ]);
    assert.equal(w.events("checks-red")[1].batchId, `basecheck-${head12(broken)}`);
    assert.match(w.events("checks-red")[1].detail, /^base-check red: .*Unit Tests \(5\/8\)/);
    assert.equal(state.paused.reason, "base-red");
    assert.equal(state.paused.baseSha, broken);
    assert.equal(
      state.paused.detail,
      `all 1 failure(s) also fail on base ${head12(broken)} (1 matched by check name only: ` +
        "no test-level key)"
    );
    assert.equal(state.inFlight, null);
    assert.equal(state.baseChecks[0].baseSha, broken);
    assert.equal(state.baseChecks[0].status, "red");
    assert.ok(
      state.baseChecks[0].signatures.some((s) => s.check === "Unit Tests" && s.key === ""),
      JSON.stringify(state.baseChecks[0].signatures)
    );
    for (const n of [1, 2]) {
      assert.deepEqual(w.labelsOf(n), ["omni-queue"], `#${n} stays queued`);
      assert.equal(w.fake.comments.get(n), undefined, `#${n} is not blamed`);
    }
    assert.equal(state.counters.culprits, 0);
    assert.equal(state.counters.bisections, 0);

    // The tip has not moved: the pause holds and nothing is composed.
    await w.tick();
    state = w.state();
    assert.equal(state.paused?.reason, "base-red");
    assert.equal(state.inFlight, null);
    assert.equal(w.events("batch-started").length, 1);
    assert.equal(w.candidatePushes().length, 2, "b1 and its base check only");

    // A repair is pushed from outside: the pause lifts and the batch is composed on the new tip.
    const repaired = w.sb.advanceBase({ "widget.txt": "repaired\n" }, "repair pushed by hand");
    await w.tick();
    state = w.state();
    assert.equal(state.paused, null);
    assert.equal(
      w.events("resumed")[0].detail,
      `base moved ${head12(broken)} → ${head12(repaired)} after a base-red pause`
    );
    assert.equal(state.inFlight.baseSha, repaired);
    assert.deepEqual(nums(state.inFlight.prs), [1, 2]);
    w.ciInFlight(); // green on the repaired tip
    await w.tick();

    state = w.state();
    assert.deepEqual(eventTypes(w), [
      "batch-started",
      "checks-red",
      "base-check-started",
      "checks-red",
      "base-red-paused",
      "resumed",
      "batch-started",
      "checks-green",
      "land-blessed",
      "landed",
    ]);
    assert.equal(state.inFlight, null);
    for (const n of [1, 2]) {
      assert.ok(w.isAncestor(heads[n], w.baseTip()), `#${n} landed`);
      assert.deepEqual(w.labelsOf(n), []);
    }
    assert.ok(w.isAncestor(repaired, w.baseTip()));
    assert.deepEqual(w.candidateRefs(), []);
  }
);

scenario(
  "scenario 13: a job times out on both runs: infra-retry, hang-suspected, hang bisection",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const base0 = w.baseTip(); // the queue never landed it: no verdict
    const heads = await approvedPrs(w, [1, 2]);
    w.hangs.add(1); // #1 hangs "Unit Tests (3/8)" until GitHub stops it at its time limit

    await w.tick(); // b1 [1, 2]
    const f = w.state().inFlight;
    w.ciInFlight(); // the job is stopped at its limit, "Gate / CI" fails with it
    await w.tick();
    let state = w.state();
    assert.deepEqual(eventTypes(w), ["batch-started", "checks-red", "infra-retry"]);
    assert.equal(
      w.events("infra-retry")[0].detail,
      "retry 1/1: all 1 failure(s) are infrastructure (1 aggregate gate failure(s) ignored)"
    );
    assert.equal(state.inFlight.batchId, "b1-r1");
    assert.equal(state.inFlight.candidateSha, f.candidateSha, "the same SHA under a new ref");
    assert.equal(state.inFlight.timedOutRuns, 1);

    w.ciInFlight(); // the retry stops at the limit again
    await w.tick();
    state = w.state();
    const rootHang = w.events("hang-suspected")[0];
    assert.deepEqual(
      [rootHang.batchId, rootHang.prs, rootHang.sha, rootHang.detail],
      [
        "b1-r1",
        [1, 2],
        f.candidateSha,
        "Unit Tests (3/8) timed out on 2 run(s) of this candidate: suspected hanging test",
      ]
    );
    assert.equal(state.paused, null, "not an infrastructure pause");
    assert.equal(state.inFlight.kind, "base-check");
    assert.equal(state.inFlight.candidateSha, base0);
    assert.equal(state.inFlight.pendingRed.timedOutRuns, 2);

    w.ciInFlight(); // the bare base passes the job
    await w.tick();
    state = w.state();
    assert.equal(state.baseChecks[0].baseSha, base0);
    assert.equal(state.baseChecks[0].status, "green");
    assert.equal(w.events("bisect-split")[0].detail, "batch of 2 red: testing #1 first");
    assert.equal(state.inFlight.bisect.hang, true);
    assert.deepEqual(nums(state.inFlight.prs), [1]);
    const pushes = w.candidatePushes().length;

    w.ciInFlight(); // [1] stops at the limit once: not retried inside a hang bisection
    await w.tick();
    state = w.state();
    assert.deepEqual(
      w.events("hang-suspected").map((e) => [e.prs, e.detail]),
      [
        [[1, 2], rootHang.detail],
        [
          [1],
          "Unit Tests (3/8) timed out on 1 run(s) of this candidate (hang bisection: not retried): " +
            "suspected hanging test",
        ],
      ]
    );
    assert.equal(w.events("infra-retry").length, 1, "only the root batch was retried");
    assert.deepEqual(nums(state.inFlight.prs), [2]);
    assert.equal(w.candidatePushes().length, pushes + 1, "the next segment, not a retry");

    await drain(w);
    state = w.state();
    assert.deepEqual(eventTypes(w), [
      "batch-started", // b1 [1, 2]
      "checks-red",
      "infra-retry",
      "checks-red",
      "hang-suspected",
      "base-check-started",
      "checks-green", // the bare base
      "bisect-split",
      "batch-started", // [1]
      "checks-red",
      "hang-suspected",
      "culprit-found",
      "batch-started", // [2]
      "checks-green",
      "land-blessed",
      "landed",
    ]);
    assert.equal(state.paused, null);
    assert.equal(w.events("infra-paused").length, 0);
    assert.deepEqual(
      w.events("culprit-found").map((e) => e.prs),
      [[1]]
    );
    assert.deepEqual(
      w.events("landed").map((e) => e.prs),
      [[2]]
    );
    assert.deepEqual(w.labelsOf(1), []);
    const [comment] = w.commentsWithKey(1, `culprit:${head12(heads[1])}`);
    // The culprit's own segment ran once (no retry inside a hang bisection); the root batch's two
    // runs are in the first hang-suspected event above.
    assert.match(
      comment.body,
      /- Suspected hanging test: the job `Unit Tests \(3\/8\)` timed out once on this PR alone; the base passes the same job\./
    );
    assert.match(comment.body, /\[`Unit Tests \(3\/8\)`\]\([^)]+\) — `cancelled`/);
    assert.ok(w.isAncestor(heads[2], w.baseTip()));
    assert.ok(!w.isAncestor(heads[1], w.baseTip()));
    assert.deepEqual(w.candidateRefs(), []);
  }
);

scenario(
  "scenario 14: the base check gives no result: stored as timeout, the parked batch is PR-red",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const base0 = w.baseTip();
    w.failingJob = "Unit Tests (2/8)";
    const heads = await approvedPrs(w, [1, 2]);
    w.culprits.add(2);

    await w.tick(); // b1 [1, 2]
    w.ciInFlight(); // red
    await w.tick();
    assert.equal(w.state().inFlight.kind, "base-check");

    // GitHub never starts CI on the base-check ref (a skip marker on the tip, say): no run at all.
    w.clock.advance(NO_RUN_TIMEOUT_MINUTES + 1);
    await w.tick();
    let state = w.state();
    assert.deepEqual(eventTypes(w).slice(-2), ["checks-timeout", "infra-retry"]);
    assert.equal(state.inFlight.kind, "base-check");
    assert.equal(state.inFlight.batchId, `basecheck-${head12(base0)}-r1`);
    assert.match(state.inFlight.candidateRef, baseCheckRefRe(base0, "-r1"));
    assert.equal(state.paused, null);

    w.clock.advance(NO_RUN_TIMEOUT_MINUTES + 1); // nor on its retry
    await w.tick();
    state = w.state();
    assert.deepEqual(state.baseChecks[0], {
      baseSha: base0,
      ref: baseCheckRef(QBASE, base0, 1),
      status: "timeout",
      startedAt: state.baseChecks[0].startedAt,
      signatures: [],
    });
    assert.equal(state.paused, null, "no pause on a base check without a result");
    assert.equal(w.events("bisect-split")[0].detail, "batch of 2 red: testing #1 first");
    assert.deepEqual(nums(state.inFlight.prs), [1]);

    await drain(w);
    state = w.state();
    assert.deepEqual(eventTypes(w), [
      "batch-started", // b1 [1, 2]
      "checks-red",
      "base-check-started",
      "checks-timeout", // the base check
      "infra-retry",
      "checks-timeout",
      "bisect-split",
      "batch-started", // [1]
      "checks-green",
      "land-blessed",
      "landed",
      "batch-started", // [2], on the tip #1 landed
      "checks-red",
      "culprit-found",
    ]);
    assert.deepEqual(
      w.events("checks-timeout").map((e) => e.detail),
      [
        `no CI run for candidate after ${NO_RUN_TIMEOUT_MINUTES} min`,
        `no CI run for candidate after ${NO_RUN_TIMEOUT_MINUTES} min`,
      ]
    );
    assert.equal(state.baseChecks.find((b) => b.baseSha === base0).status, "timeout");
    assert.deepEqual(
      w.events("culprit-found").map((e) => e.prs),
      [[2]]
    );
    assert.deepEqual(w.labelsOf(2), []);
    assert.equal(w.commentsWithKey(2, `culprit:${head12(heads[2])}`).length, 1);
    assert.ok(w.isAncestor(heads[1], w.baseTip()));
    assert.ok(!w.isAncestor(heads[2], w.baseTip()));
    assert.equal(state.paused, null);
    assert.deepEqual(w.candidateRefs(), []);
  }
);

scenario(
  "scenario 15: a flaky red batch: its failed jobs are re-run once, green, and it lands",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live", config: { flakyReruns: 1 } });
    const heads = await approvedPrs(w, [1, 2]);
    w.seedGreenBase(); // a red batch on it is PR-red: bisection would follow
    await w.tick(); // compose b1 [1, 2]
    const f = w.state().inFlight;
    w.runCi(f.candidateSha, f.candidateRef, { red: true }); // a flaky failure: no culprit
    const { requests } = await w.tick();
    const run = w.fake.workflowRuns.find(
      (r) => r.event === "push" && r.head_branch === f.candidateRef && r.head_sha === f.candidateSha
    );
    assert.deepEqual(
      writesIn(requests)
        .filter((r) => r.path.startsWith("/actions/"))
        .map((r) => [r.method, r.path]),
      [["POST", `/actions/runs/${run.id}/rerun-failed-jobs`]]
    );
    assert.deepEqual(w.fake.reruns, [run.id]);
    assert.deepEqual(
      w.events("flaky-rerun").map((e) => e.detail),
      ["re-running the failed jobs of b1 once (Gate / CI) before bisecting"]
    );
    let state = w.state();
    assert.equal(state.inFlight.rerun.ref, f.candidateRef);
    assert.deepEqual(state.inFlight.rerun.runIds, [run.id]);
    assert.equal(state.counters.bisections, 0);

    await w.tick(); // the re-run has not reported: the old failure is not read as its verdict
    state = w.state();
    assert.equal(state.counters.bisections, 0);
    assert.equal(w.events("checks-red").length, 1);
    assert.deepEqual(w.fake.reruns, [run.id], "not re-run twice");

    w.reportRerun(f.candidateSha, { pass: true });
    await w.tick();
    state = w.state();
    assert.deepEqual(
      w.events("checks-green").map((e) => e.detail),
      ["green after re-running Gate / CI (flaky)"]
    );
    assert.deepEqual(
      w.events("landed").map((e) => e.batchId),
      ["b1"]
    );
    assert.ok(w.isAncestor(heads[1], w.baseTip()));
    assert.ok(w.isAncestor(heads[2], w.baseTip()), "the PR the first run blamed lands too");
    assert.deepEqual(w.events("culprit-found"), []);
    assert.equal(state.inFlight, null);
    assert.deepEqual(w.fake.reruns, [run.id], "one re-run in all");
  }
);

describe(
  "omni-queue end to end (real modules, fake GitHub, bare origin)",
  { concurrency: 3 },
  () => {
    for (const [name, fn] of scenarios) test(name, fn);
  }
);

test("scenario 10: dry-run through main(), zero writes to GitHub, no new ref in origin", async (t) => {
  // main() uses the real clock: approvals one hour ago are past the batch window.
  const w = await createQueueWorld(t, {
    mode: "live",
    start: new Date(Date.now() - 60 * 60_000).toISOString(),
  });
  await approvedPrs(w, [1, 2]);
  const refsBefore = w.sb.origin(["for-each-ref", "--format=%(refname) %(objectname)"]).stdout;
  const requestsBefore = w.fake.requests.length;

  // main() spawns git with process.env: isolate it from the user's git configuration.
  const saved = { ...process.env };
  t.after(() => {
    for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key];
    Object.assign(process.env, saved);
  });
  for (const key of Object.keys(process.env)) if (key.startsWith("GIT_")) delete process.env[key];
  Object.assign(process.env, w.sb.isolationEnv);
  const printed = [];
  t.mock.method(console, "log", (line) => printed.push(String(line)));
  t.mock.method(console, "error", (line) => printed.push(String(line)));
  const runnerTemp = w.sb.newDir("main-runner");
  writeFileSync(join(runnerTemp, ".keep"), "");

  // No --base: the base is discovered from the labeled PRs.
  const code = await main(["--action", "dry-run"], { ...w.env, RUNNER_TEMP: runnerTemp });
  assert.equal(code, 0, printed.join("\n"));
  const requests = w.fake.requests.slice(requestsBefore);
  assert.ok(requests.length > 0, "the dry-run did read GitHub");
  assert.deepEqual(writesIn(requests), [], "zero writes to the fake GitHub");
  assert.equal(
    w.sb.origin(["for-each-ref", "--format=%(refname) %(objectname)"]).stdout,
    refsBefore,
    "no ref created, moved or deleted in origin"
  );
  assert.equal(w.candidatePushes().length, 0);
  assert.equal(w.state(), null, "no state saved");
  assert.ok(
    printed.some((line) => /\[dry-run\] would push /.test(line)),
    printed.join("\n")
  );
});
