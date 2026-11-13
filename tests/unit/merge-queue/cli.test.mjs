// omni-queue local CLI (scripts/merge-queue/cli.mjs) against the fake GitHub, with `gh` (the
// binary) and eligibility.mjs replaced by fakes.
import assert from "node:assert/strict";
import test from "node:test";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";
import {
  initialState,
  STATE_BRANCH,
  stateFilePath,
} from "../../../scripts/merge-queue/contracts.mjs";
import { parseArgs, runCli, USAGE } from "../../../scripts/merge-queue/cli.mjs";
import { createGitHubClient } from "../../../scripts/merge-queue/github.mjs";
import { sha, startFakeGitHub } from "./helpers/fake-github.mjs";

const BASE = "release/v3.8.54";
const NOW = "2026-11-13T12:00:00Z";
const config = loadConfig();

async function setup(t) {
  const fake = await startFakeGitHub({ token: "cli-token" });
  t.after(() => fake.close());
  const gh = createGitHubClient({
    token: "cli-token",
    repository: fake.repository,
    apiUrl: fake.url,
  });
  const lines = { out: [], err: [] };
  const run = (argv, extra = {}) =>
    runCli(argv, {
      gh,
      config,
      now: () => NOW,
      out: (l) => lines.out.push(l),
      err: (l) => lines.err.push(l),
      ...extra,
    });
  return { fake, gh, lines, run };
}

function writeState(fake, state) {
  fake.commitFiles({
    branch: STATE_BRANCH,
    files: { [stateFilePath(state.base)]: JSON.stringify(state) },
  });
}

function sampleState() {
  const cand = sha("cand");
  return {
    ...initialState(BASE, "2026-11-13T10:00:00Z"),
    inFlight: {
      batchId: "b3",
      kind: "batch",
      candidateRef: `omni-queue/release-v3.8.54/b3-${cand.slice(0, 12)}`,
      candidateSha: cand,
      baseSha: sha("base"),
      treeSha: null,
      prs: [{ n: 7, head: sha("h7"), title: "feat: seven", author: "alice", labeledAt: NOW }],
      stage: "testing",
      startedAt: "2026-11-13T11:00:00Z",
      attempts: 0,
      bisect: null,
    },
    counters: { ...initialState(BASE).counters, batchSeq: 3, ciRuns: 4, landedPrs: 2 },
    history: [
      { at: "2026-11-13T10:00:00Z", type: "landed", prs: [5, 6], batchId: "b2" },
      { at: "2026-11-13T11:00:00Z", type: "batch-started", prs: [7], batchId: "b3", sha: cand },
    ],
  };
}

// ───────────────────────────── parsing / usage ─────────────────────────────

test("parseArgs splits commands, positionals and flags", () => {
  assert.deepEqual(parseArgs(["history", "--base", BASE, "--limit=5"]), {
    command: "history",
    positionals: [],
    flags: { base: BASE, limit: "5" },
  });
  assert.deepEqual(parseArgs(["add", "1", "#2"]).positionals, ["1", "#2"]);
  assert.throws(() => parseArgs(["status", "--bogus"]), /unknown option --bogus/);
  assert.throws(() => parseArgs(["status", "--base"]), /needs a value/);
});

test("usage errors exit 2 with the usage text on stderr", async (t) => {
  const { run, lines, fake } = await setup(t);
  for (const argv of [
    [],
    ["frobnicate"],
    ["add"],
    ["add", "abc"],
    ["add", "0"],
    ["why", "1", "2"],
    ["pause"],
    ["pause", "main"],
    ["resume", BASE, "extra"],
    ["status", "--limit", "3"],
    ["history", "--limit", "0"],
    ["status", "--nope"],
    ["status", "positional"],
  ]) {
    lines.err.length = 0;
    assert.equal(await run(argv), 2, argv.join(" "));
    assert.match(lines.err[0], /^error: /, argv.join(" "));
    assert.ok(lines.err.includes(USAGE), argv.join(" "));
  }
  assert.equal(fake.dispatches.length, 0);
  assert.ok(!fake.requests.some((r) => r.method !== "GET"), "usage errors never write");
});

test("--help and help print the usage and exit 0", async (t) => {
  const { run, lines } = await setup(t);
  assert.equal(await run(["--help"]), 0);
  assert.equal(await run(["help"]), 0);
  assert.deepEqual(lines.out, [USAGE, USAGE]);
});

// ───────────────────────────── status / history ─────────────────────────────

test("status shows in-flight state and labeled PRs per discovered base", async (t) => {
  const { run, lines, fake } = await setup(t);
  writeState(fake, sampleState());
  fake.addPull({
    number: 7,
    title: "feat: seven",
    labels: ["omni-queue"],
    user: { login: "alice" },
  });
  fake.addPull({ number: 8, title: "fix: eight\u001b[31m", labels: ["omni-queue"], draft: true });
  fake.addPull({ number: 9, labels: [] });
  fake.addPull({ number: 10, labels: ["omni-queue"], base: { ref: "main" } });
  assert.equal(await run(["status"]), 0);
  const text = lines.out.join("\n");
  assert.match(text, /^repository acme\/widget · mode shadow · label omni-queue/);
  assert.match(text, /== release\/v3\.8\.54/);
  assert.match(text, /paused: no/);
  assert.match(
    text,
    new RegExp(`in flight: batch b3 · stage testing · candidate ${sha("cand").slice(0, 12)}`)
  );
  assert.match(text, /#7 feat: seven \(alice\)/);
  assert.match(text, /counters: landed 2 PRs \/ 0 batches · CI runs 4/);
  assert.match(text, /labeled PRs \(2\):/);
  assert.match(text, /#8 fix: eight \[31m \(contributor\) \[draft\]/, "control chars stripped");
  assert.ok(!text.includes("\u001b"));
  assert.ok(!text.includes("== main"), "unmanaged bases are skipped");
  assert.ok(!text.includes("#9 "));
  assert.equal(lines.err.length, 0);
});

test("status --base on a base without state, and with nothing labeled", async (t) => {
  const { run, lines } = await setup(t);
  assert.equal(await run(["status"]), 0);
  assert.match(lines.out.join("\n"), /no managed base has queue state or PRs with the queue label/);
  lines.out.length = 0;
  assert.equal(await run(["status", "--base", "release/v3.8.55"]), 0);
  assert.match(lines.out.join("\n"), /state: none yet/);
  assert.match(lines.out.join("\n"), /labeled PRs \(0\):/);
});

test("without --base, a paused base with no labeled PR still shows in status and history", async (t) => {
  const { run, lines, fake } = await setup(t);
  const paused = {
    ...initialState("release/v3.8.55", "2026-11-13T09:00:00Z"),
    paused: {
      reason: "base-red",
      since: "2026-11-13T09:30:00Z",
      baseSha: sha("tip"),
      detail: "Unit tests red on the base",
      issue: 77,
    },
    history: [{ at: "2026-11-13T09:30:00Z", type: "base-red-paused", detail: "red" }],
  };
  writeState(fake, paused);
  writeState(fake, sampleState()); // release/v3.8.54: in flight, nothing labeled either
  // Files that must not create a base: unmanaged base, stray name, junk, a sub-directory.
  writeState(fake, initialState("main", "2026-11-13T09:00:00Z"));
  fake.commitFiles({
    branch: STATE_BRANCH,
    files: {
      "state/impostor.json": JSON.stringify(initialState("release/v3.8.99")),
      "state/broken.json": "{not json",
      "state/archive/release-v3.8.1.json": JSON.stringify(initialState("release/v3.8.1")),
    },
  });
  assert.equal(await run(["status"]), 0);
  const text = lines.out.join("\n");
  assert.match(text, /== release\/v3\.8\.54/);
  assert.match(text, /== release\/v3\.8\.55\npaused: base-red since 2026-11-13 09:30Z/);
  assert.ok(text.indexOf("== release/v3.8.54") < text.indexOf("== release/v3.8.55"), "sorted");
  assert.ok(!/== (main|release\/v3\.8\.99|release\/v3\.8\.1)\b/.test(text), text);
  assert.ok(!text.includes("no managed base"));
  assert.deepEqual(lines.err, [
    "warning: state/broken.json on omni-queue-state is not valid JSON; skipped",
  ]);

  lines.out.length = 0;
  lines.err.length = 0;
  assert.equal(await run(["history"]), 0);
  assert.ok(lines.out.includes("== release/v3.8.55"));
  assert.ok(lines.out.includes("2026-11-13 09:30Z  base-red-paused  red"));
  assert.ok(lines.out.includes("== release/v3.8.54"));
});

test("status reports a corrupt state document as an error (exit 1)", async (t) => {
  const { run, lines, fake } = await setup(t);
  writeState(fake, { ...sampleState(), version: 99 });
  assert.equal(await run(["status", "--base", BASE]), 1);
  assert.match(lines.err[0], /^error: state of release\/v3\.8\.54 is invalid: version/);
});

test("history prints the newest events first, honoring --limit", async (t) => {
  const { run, lines, fake } = await setup(t);
  writeState(fake, sampleState());
  assert.equal(await run(["history", "--base", BASE, "--limit", "1"]), 0);
  assert.deepEqual(lines.out, [
    `== ${BASE}`,
    `2026-11-13 11:00Z  batch-started  b3  #7  ${sha("cand").slice(0, 12)}`,
  ]);
  lines.out.length = 0;
  assert.equal(await run(["history", "--base", BASE]), 0);
  assert.equal(lines.out.length, 3);
  assert.equal(lines.out[2], "2026-11-13 10:00Z  landed  b2  #5,#6");
});

// ───────────────────────────── add / remove ─────────────────────────────

test("add and remove apply the configured label", async (t) => {
  const { run, lines, fake } = await setup(t);
  fake.addPull({ number: 1 });
  fake.addPull({ number: 2 });
  assert.equal(await run(["add", "1", "#2"]), 0);
  assert.deepEqual(
    fake.pulls.get(1).labels.map((l) => l.name),
    ["omni-queue"]
  );
  assert.deepEqual(
    fake.pulls.get(2).labels.map((l) => l.name),
    ["omni-queue"]
  );
  assert.ok(lines.out.includes("#1: label omni-queue added"));
  assert.equal(await run(["remove", "2"]), 0);
  assert.deepEqual(fake.pulls.get(2).labels, []);
  assert.ok(lines.out.includes("#2: label omni-queue removed"));
});

test("add reports a partial failure with exit 1 and keeps going", async (t) => {
  const { run, lines, fake } = await setup(t);
  fake.addPull({ number: 1 });
  assert.equal(await run(["add", "404", "1"]), 1);
  assert.match(lines.err[0], /^#404: POST .*\/issues\/404\/labels → 404/);
  assert.deepEqual(
    fake.pulls.get(1).labels.map((l) => l.name),
    ["omni-queue"]
  );
});

// ───────────────────────────── pause / resume ─────────────────────────────

test("pause and resume dispatch omni-queue.yml on the default branch", async (t) => {
  const { run, lines, fake } = await setup(t);
  fake.repoInfo.default_branch = "release/v3.8.54";
  assert.equal(await run(["pause", BASE, "--reason", "deploy window"]), 0);
  assert.equal(await run(["resume", BASE]), 0);
  assert.equal(await run(["pause", BASE]), 0);
  assert.deepEqual(fake.dispatches, [
    {
      workflow: "omni-queue.yml",
      ref: "release/v3.8.54",
      inputs: { base: BASE, action: "pause", reason: "deploy window" },
    },
    {
      workflow: "omni-queue.yml",
      ref: "release/v3.8.54",
      inputs: { base: BASE, action: "resume", reason: "" },
    },
    {
      workflow: "omni-queue.yml",
      ref: "release/v3.8.54",
      inputs: { base: BASE, action: "pause", reason: "paused from the CLI" },
    },
  ]);
  assert.match(lines.out[0], /^pause requested for release\/v3\.8\.54/);
  assert.equal(await run(["resume", BASE, "--reason", "x"]), 2, "resume takes no reason");
});

test("API failure during dispatch → exit 1", async (t) => {
  const { run, lines, fake } = await setup(t);
  fake.inject({
    method: "POST",
    path: /dispatches$/,
    status: 422,
    body: { message: "Unexpected inputs" },
  });
  assert.equal(await run(["pause", BASE]), 1);
  assert.match(lines.err[0], /Unexpected inputs/);
});

// ───────────────────────────── why ─────────────────────────────

test("why assembles the PR snapshot and prints the eligibility verdict", async (t) => {
  const { run, lines, fake } = await setup(t);
  const pull = fake.addPull({ number: 50, title: "feat: x", labels: ["omni-queue", "hold"] });
  fake.files.set(50, [{ filename: "AGENTS.md" }]);
  fake.timeline.set(50, [
    {
      event: "labeled",
      actor: { login: "diegosouzapw" },
      created_at: "2026-11-13T11:00:00Z",
      label: { name: "omni-queue" },
    },
  ]);
  fake.checkRuns.set(pull.head.sha, [
    { id: 1, name: "Gate / Quality", status: "completed", conclusion: "failure" },
    { id: 2, name: "Gate / Quality", status: "completed", conclusion: "success" },
  ]);
  fake.addIssue({
    number: 60,
    title: `Freeze ${BASE}`,
    body: "frozen",
    labels: ["release-freeze"],
  });
  writeState(fake, sampleState());
  let seen;
  const eligibility = {
    evaluateEligibility(pr, ctx) {
      seen = { pr, ctx };
      return {
        eligible: false,
        reasons: [{ code: "blocked-label", detail: "hold" }],
        actions: [{ type: "comment", pr: 50, key: "approval-missing-abc", body: "x" }],
        approval: {
          valid: true,
          actor: "diegosouzapw",
          labeledAt: "2026-11-13T11:00:00Z",
          reason: null,
        },
        protectedSurface: true,
      };
    },
  };
  assert.equal(await run(["why", "50"], { eligibility }), 0);
  assert.equal(seen.pr.number, 50);
  assert.equal(seen.pr.headSha, pull.head.sha);
  assert.deepEqual(seen.pr.labels, ["omni-queue", "hold"]);
  assert.deepEqual(seen.pr.files, ["AGENTS.md"]);
  assert.equal(seen.pr.timeline[0].actor, "diegosouzapw");
  assert.equal(seen.pr.prGreenCheck, "success", "latest run per name wins");
  assert.equal(seen.pr.mergeable, true);
  assert.deepEqual(seen.ctx.freezeIssues, [
    { number: 60, title: `Freeze ${BASE}`, body: "frozen" },
  ]);
  assert.equal(seen.ctx.state.inFlight.batchId, "b3");
  assert.equal(seen.ctx.now, NOW);
  assert.equal(seen.ctx.config, config);
  const text = lines.out.join("\n");
  assert.match(text, /verdict: NOT eligible/);
  assert.match(text, /- blocked-label: hold/);
  assert.match(text, /approval: valid by diegosouzapw at 2026-11-13 11:00Z/);
  assert.match(text, /protected surface: yes/);
  assert.match(text, /next tick would comment \(approval-missing-abc\)/);
});

test("why on an unmanaged base skips the state and reports eligibility", async (t) => {
  const { run, lines, fake } = await setup(t);
  fake.addPull({ number: 51, base: { ref: "main" } });
  let ctxSeen;
  const eligibility = {
    evaluateEligibility(_pr, ctx) {
      ctxSeen = ctx;
      return {
        eligible: true,
        reasons: [],
        actions: [],
        approval: { valid: true, actor: "diegosouzapw", labeledAt: NOW, reason: null },
        protectedSurface: false,
      };
    },
  };
  assert.equal(await run(["why", "51"], { eligibility }), 0);
  assert.equal(ctxSeen.state, null);
  assert.match(lines.out.join("\n"), /verdict: ELIGIBLE/);
  assert.match(lines.out.join("\n"), /Gate \/ Quality on head: none/);
  assert.equal(await run(["why", "999"], { eligibility }), 1, "missing PR → API error");
});

// ───────────────────────────── gh token / repository discovery ─────────────────────────────

test("without an injected client the CLI asks `gh` for the repository and token", async (t) => {
  const fake = await startFakeGitHub({ token: "from-gh-cli" });
  t.after(() => fake.close());
  fake.addPull({ number: 3 });
  const calls = [];
  const out = [];
  const exec = async (cmd, args) => {
    calls.push([cmd, ...args]);
    if (args[0] === "repo") return { stdout: "acme/widget\n" };
    if (args[0] === "auth") return { stdout: "from-gh-cli\n" };
    throw new Error("unexpected");
  };
  const code = await runCli(["add", "3"], {
    exec,
    apiUrl: fake.url,
    config,
    out: (l) => out.push(l),
    err: (l) => out.push(l),
  });
  assert.equal(code, 0, out.join("\n"));
  assert.deepEqual(calls, [
    ["gh", "repo", "view", "--json", "nameWithOwner", "-q", ".nameWithOwner"],
    ["gh", "auth", "token"],
  ]);
  assert.equal(fake.requests.at(-1).headers.authorization, "Bearer from-gh-cli");
  assert.ok(!out.join("\n").includes("from-gh-cli"), "token never printed");

  calls.length = 0;
  assert.equal(
    await runCli(["add", "3", "--repo", "acme/widget"], {
      exec,
      apiUrl: fake.url,
      config,
      out() {},
      err() {},
    }),
    0
  );
  assert.deepEqual(calls, [["gh", "auth", "token"]], "--repo skips gh repo view");

  const errs = [];
  const noToken = async (_cmd, args) => ({ stdout: args[0] === "auth" ? "" : "acme/widget" });
  assert.equal(
    await runCli(["add", "3"], {
      exec: noToken,
      apiUrl: fake.url,
      config,
      out() {},
      err: (l) => errs.push(l),
    }),
    1
  );
  assert.match(errs[0], /returned no token/);
  assert.equal(
    await runCli(["status", "--repo", "not a repo"], { exec, config, out() {}, err() {} }),
    2
  );
});
