// omni-queue end to end: the REAL modules wired the way tick.main() wires them, against a fake
// GitHub (local HTTP) and a bare git repository as the remote (see helpers/queue-world.mjs).
// Plan §6 (integration) and §8 (rehearsal scenarios), minus what needs real GitHub Actions.
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import test, { describe } from "node:test";

import {
  STATE_BRANCH,
  dashboardTitle,
  parseQueueTrailers,
  stateFilePath,
} from "../../../../scripts/merge-queue/contracts.mjs";
import { main } from "../../../../scripts/merge-queue/tick.mjs";
import { BOT_LOGIN, QBASE, createQueueWorld, writesIn } from "./helpers/queue-world.mjs";

const head12 = (sha) => sha.slice(0, 12);
const nums = (prs) => prs.map((p) => p.n);

/**
 * Scenarios 1–9 are independent worlds (own sandbox, own fake server): they run concurrently.
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
    const author = w.sb.origin(["log", "-1", "--format=%an <%ae>", f.candidateSha]).stdout;
    assert.match(author, /^omni-queue\[bot\] </);
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

    // ── tick 2: lands merge-ff ──
    await w.tick();
    const state = w.state();
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
  "scenario 3 (shadow): would-land, base intact, the next tick does not recompose",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "shadow" });
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
  "scenario 4: batch of 3 with 1 culprit, bisection isolates it, the other 2 land",
  async (t) => {
    const w = await createQueueWorld(t, { mode: "live" });
    const heads = await approvedPrs(w, [1, 2, 3]);
    w.culprits.add(2);
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
