// omni-queue watchdog (scripts/merge-queue/watchdog.mjs): the pure staleness rule, and the one
// issue it opens, reuses and closes, against the fake GitHub API. The watchdog reads the state
// files and writes issues only: never the state, never a pull request.
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { loadConfig } from "../../../scripts/merge-queue/config.mjs";
import {
  DASHBOARD_LABEL,
  STATE_BRANCH,
  initialState,
  stateFilePath,
} from "../../../scripts/merge-queue/contracts.mjs";
import { createGitHubClient } from "../../../scripts/merge-queue/github.mjs";
import {
  WATCHDOG_LIMIT_MINUTES,
  WATCHDOG_MARKER,
  assessStaleness,
  main,
  runWatchdog,
  watchdogTitle,
} from "../../../scripts/merge-queue/watchdog.mjs";
import { sha, startFakeGitHub } from "./helpers/fake-github.mjs";

const NOW = "2026-11-13T12:00:00.000Z";
const ago = (minutes) => new Date(Date.parse(NOW) - minutes * 60_000).toISOString();
/** Invented approver logins: the issue mentions them. */
const config = { ...loadConfig(), approvers: ["octo-approver"] };
const BASE = "release/v3.8.54";

test("assessStaleness: 90 minutes is not stale, 91 is", () => {
  assert.equal(WATCHDOG_LIMIT_MINUTES, 90);
  const states = [
    { base: "release/v3.8.56", updatedAt: ago(91) },
    { base: "release/v3.8.54", updatedAt: ago(90) },
    { base: "release/v3.8.55", updatedAt: ago(90.9) },
    { base: "release/v3.8.53", updatedAt: ago(400) },
  ];
  assert.deepEqual(assessStaleness({ states, now: NOW }), {
    stale: [
      { base: "release/v3.8.53", minutes: 400 },
      { base: "release/v3.8.56", minutes: 91 },
    ],
  });
  assert.deepEqual(assessStaleness({ states, now: NOW, limitMinutes: 300 }), {
    stale: [{ base: "release/v3.8.53", minutes: 400 }],
  });
  assert.deepEqual(assessStaleness({ states: [], now: NOW }), { stale: [] });
});

test("assessStaleness: a base with no state file is not reported", () => {
  // Only the bases handed in are judged: a base the queue never ran on has no state file and
  // no entry. An entry whose updatedAt cannot be read is not judged either (main warns).
  assert.deepEqual(
    assessStaleness({
      states: [
        { base: BASE, updatedAt: ago(10) },
        { base: "release/v3.8.55", updatedAt: "not a date" },
      ],
      now: NOW,
    }),
    { stale: [] }
  );
});

async function setup(t) {
  const fake = await startFakeGitHub({ token: "watchdog-token", actor: "github-actions[bot]" });
  t.after(() => fake.close());
  const gh = createGitHubClient({
    token: "watchdog-token",
    repository: fake.repository,
    apiUrl: fake.url,
  });
  const logs = [];
  const run = (now = NOW) => runWatchdog({ gh, config, now, log: (m) => logs.push(m) });
  const writeState = (state) =>
    fake.commitFiles({
      branch: STATE_BRANCH,
      files: { [stateFilePath(state.base)]: JSON.stringify(state) },
    });
  const watchdogIssues = (state = "open") =>
    [...fake.issues.values()].filter(
      (i) => i.state === state && String(i.body).includes(WATCHDOG_MARKER)
    );
  const writes = () => fake.requests.filter((r) => r.method !== "GET");
  return { fake, gh, logs, run, writeState, watchdogIssues, writes };
}

const inFlight = () => ({
  batchId: "b3",
  kind: "batch",
  candidateRef: `omni-queue/release-v3.8.54/b3-${sha("cand").slice(0, 12)}`,
  candidateSha: sha("cand"),
  baseSha: sha("base"),
  treeSha: null,
  prs: [],
  stage: "testing",
  startedAt: ago(200),
  attempts: 0,
  bisect: null,
});

test("a base with no state file is not reported, and nothing is written", async (t) => {
  const { run, writes } = await setup(t);
  const result = await run();
  assert.deepEqual(result.stale, []);
  assert.equal(result.issue.action, "none");
  assert.deepEqual(writes(), []);
});

test("the issue is reused, not duplicated", async (t) => {
  const { fake, run, writeState, watchdogIssues, writes } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), inFlight: inFlight() });
  const first = await run();
  assert.deepEqual(first.stale, [{ base: BASE, minutes: 120 }]);
  assert.equal(first.issue.action, "opened");
  const [issue] = watchdogIssues();
  assert.equal(issue.number, first.issue.number);
  assert.equal(issue.title, "omni-queue: no tick completed for 120 minutes");
  assert.equal(issue.title, watchdogTitle(120));
  assert.deepEqual(
    issue.labels.map((l) => l.name),
    [DASHBOARD_LABEL]
  );
  assert.ok(issue.body.includes("@octo-approver"), issue.body);
  assert.ok(issue.body.includes("`release/v3.8.54`"));
  assert.ok(issue.body.includes("2026-11-13 10:00Z"));

  // Half an hour later the number in the title has grown: still the same issue, nothing written.
  const before = writes().length;
  const second = await run(new Date(Date.parse(NOW) + 30 * 60_000).toISOString());
  assert.deepEqual(second.stale, [{ base: BASE, minutes: 150 }]);
  assert.deepEqual(second.issue, { action: "reused", number: issue.number });
  assert.equal(watchdogIssues().length, 1);
  assert.equal(writes().length, before);

  // An issue that only looks like it (no marker) is not ours: still the same one reused.
  fake.addIssue({ title: watchdogTitle(5), body: "hand-written", labels: [DASHBOARD_LABEL] });
  assert.equal((await run()).issue.number, issue.number);
});

test("the issue is closed with a comment once ticks complete again", async (t) => {
  const { fake, run, writeState, watchdogIssues } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), inFlight: inFlight() });
  const { issue } = await run();
  writeState({ ...initialState(BASE, ago(3)), inFlight: inFlight() });
  const result = await run();
  assert.deepEqual(result.stale, []);
  assert.deepEqual(result.issue, { action: "closed", number: issue.number });
  assert.deepEqual(watchdogIssues(), []);
  assert.equal(watchdogIssues("closed").length, 1);
  const comments = fake.comments.get(issue.number) ?? [];
  assert.equal(comments.length, 1);
  assert.match(comments[0].body, /Closing/);
  assert.equal((await run()).issue.action, "none", "nothing more once closed");
});

test("only a base with work is judged: in flight, paused, or labeled PRs with no fresh state", async (t) => {
  const { fake, run, writeState, writes } = await setup(t);
  // A finished release: idle and never visited again, so its state ages. Not an alarm.
  writeState(initialState("release/v3.8.52", ago(5000)));
  writeState({
    ...initialState("release/v3.8.53", ago(100)),
    paused: { reason: "manual", since: ago(100), baseSha: null, detail: "", issue: null },
  });
  // A file that does not map to its base, an unmanaged base and junk are never judged.
  writeState(initialState("main", ago(5000)));
  fake.commitFiles({
    branch: STATE_BRANCH,
    files: {
      "state/impostor.json": JSON.stringify({
        ...initialState("release/v3.8.99", ago(5000)),
        paused: {},
      }),
      "state/broken.json": "{not json",
    },
  });
  let result = await run();
  assert.deepEqual(result.stale, [{ base: "release/v3.8.53", minutes: 100 }]);

  // A labeled PR: some tick must be saving a state at least hourly (its base is visited on every
  // tick). The freshest managed state is judged: when even it is older than the limit, no tick
  // has completed anywhere.
  writeState(initialState("release/v3.8.53", ago(10)));
  result = await run();
  assert.deepEqual(result.stale, []);
  fake.addPull({ number: 7, labels: ["omni-queue"], base: { ref: "release/v3.8.53" } });
  assert.deepEqual((await run()).stale, [], "the freshest state is 10 minutes old");
  writeState(initialState("release/v3.8.53", ago(95)));
  assert.deepEqual((await run()).stale, [{ base: "release/v3.8.53", minutes: 95 }]);
  // The watchdog writes issues and their comments only.
  for (const r of writes()) assert.match(r.path, /^\/issues(\/\d+(\/comments)?)?$/, r.path);
});

test("main: exits 1 without a token, 0 after a run against the API", async (t) => {
  const { fake, writeState, watchdogIssues } = await setup(t);
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-watchdog-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const configPath = join(dir, "config.json");
  writeFileSync(configPath, JSON.stringify(config));
  const errors = [];
  t.mock.method(console, "log", () => {});
  t.mock.method(console, "error", (line) => errors.push(String(line)));
  const env = {
    GITHUB_TOKEN: "watchdog-token",
    GITHUB_REPOSITORY: fake.repository,
    GITHUB_API_URL: fake.url,
    OMNI_QUEUE_CONFIG: configPath,
  };
  assert.equal(await main({ ...env, GITHUB_TOKEN: "" }), 1);
  assert.equal(await main({ ...env, GITHUB_REPOSITORY: "not a repo" }), 1);
  writeState({ ...initialState(BASE, "2000-01-01T00:00:00.000Z"), inFlight: inFlight() });
  assert.equal(await main(env), 0);
  assert.equal(watchdogIssues().length, 1);
  assert.ok(!errors.join("\n").includes("watchdog-token"), "the token is never printed");
});
