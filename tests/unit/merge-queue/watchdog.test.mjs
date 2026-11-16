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
  WATCHDOG_REOPEN_HOURS,
  WATCHDOG_STALLED_GRACE_MINUTES,
  WATCHDOG_TITLE,
  assessStaleness,
  assessStalled,
  main,
  runWatchdog,
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
  let clock = NOW;
  const fake = await startFakeGitHub({
    token: "watchdog-token",
    actor: "github-actions[bot]",
    now: () => clock,
  });
  t.after(() => fake.close());
  const gh = createGitHubClient({
    token: "watchdog-token",
    repository: fake.repository,
    apiUrl: fake.url,
  });
  const logs = [];
  const run = (now = NOW) => {
    clock = now; // the fake stamps closed_at with the watchdog's clock
    return runWatchdog({ gh, config, now, log: (m) => logs.push(m) });
  };
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
  assert.equal(issue.title, "omni-queue: the queue is not making progress");
  assert.equal(issue.title, WATCHDOG_TITLE, "one stable title, without a number");
  assert.deepEqual(
    issue.labels.map((l) => l.name),
    [DASHBOARD_LABEL]
  );
  assert.ok(issue.body.includes("@octo-approver"), issue.body);
  assert.ok(issue.body.includes("`release/v3.8.54`"));
  assert.ok(issue.body.includes("2026-11-13 10:00Z"));
  assert.ok(issue.body.includes("No state saved for more than 90 minutes"), issue.body);
  assert.ok(issue.body.includes("| 120 |"), "the minutes are in the body");

  // Half an hour later: still the same issue, its title unchanged, nothing written.
  const before = writes().length;
  const second = await run(new Date(Date.parse(NOW) + 30 * 60_000).toISOString());
  assert.deepEqual(second.stale, [{ base: BASE, minutes: 150 }]);
  assert.deepEqual(second.issue, { action: "reused", number: issue.number });
  assert.equal(watchdogIssues().length, 1);
  assert.equal(writes().length, before);

  assert.equal(fake.issues.get(issue.number).title, WATCHDOG_TITLE);

  // An issue that only looks like it (no marker) is not ours: still the same one reused.
  fake.addIssue({ title: WATCHDOG_TITLE, body: "hand-written", labels: [DASHBOARD_LABEL] });
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
  assert.match(comments[0].body, /no base reports itself stalled .*Closing/);
  assert.equal((await run()).issue.action, "none", "nothing more once closed");
});

test("only a base with work is judged: in flight, paused, or a labeled PR targeting it", async (t) => {
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

  // A labeled PR makes its own base work: the idle finished release is judged once a labeled PR
  // targets it, never because of a labeled PR elsewhere.
  writeState(initialState("release/v3.8.53", ago(10)));
  assert.deepEqual((await run()).stale, []);
  fake.addPull({ number: 7, labels: ["omni-queue"], base: { ref: "release/v3.8.53" } });
  assert.deepEqual((await run()).stale, [], "its state is 10 minutes old");
  writeState(initialState("release/v3.8.53", ago(95)));
  result = await run();
  assert.deepEqual(result.stale, [{ base: "release/v3.8.53", minutes: 95 }]);
  // The issue the paused base opened, closed since, is reopened (within 24 hours).
  assert.equal(result.issue.action, "reopened");
  // The watchdog writes issues and their comments only.
  for (const r of writes()) assert.match(r.path, /^\/issues(\/\d+(\/comments)?)?$/, r.path);
});

test("a labeled PR to a base the queue does not manage reports nothing", async (t) => {
  const { fake, run, writeState, writes } = await setup(t);
  // The only fresh state is days old and idle; the labeled PR targets main.
  writeState(initialState(BASE, ago(5000)));
  fake.addPull({ number: 8, labels: ["omni-queue"], base: { ref: "main" } });
  const result = await run();
  assert.deepEqual(result.stale, []);
  assert.equal(result.issue.action, "none");
  assert.deepEqual(writes(), []);
  // A labeled PR to a managed base with no state file is not judged either.
  fake.addPull({ number: 9, labels: ["omni-queue"], base: { ref: "release/v3.8.60" } });
  assert.deepEqual((await run()).stale, []);
  // The same PR on the base with the stale state file: reported.
  fake.pulls.get(8).base.ref = BASE;
  assert.deepEqual((await run()).stale, [{ base: BASE, minutes: 5000 }]);
});

test("assessStalled: a state carrying stalled for 30 minutes is not reported, 31 is", () => {
  assert.equal(WATCHDOG_STALLED_GRACE_MINUTES, 30);
  const episode = (openedAt, extra = {}) => ({
    since: ago(300),
    reasons: ["paused manually since 07:00Z, for more than 120 min"],
    openedAt,
    ...extra,
  });
  const states = [
    { base: "release/v3.8.56", stalled: episode(ago(31)) },
    { base: "release/v3.8.55", stalled: episode(ago(30)) },
    { base: "release/v3.8.54", stalled: episode(ago(31), { notified: true }) },
    { base: "release/v3.8.53", stalled: null },
  ];
  assert.deepEqual(assessStalled({ states, now: NOW }), {
    stalled: [
      { base: "release/v3.8.54", since: ago(300), reasons: episode().reasons, minutes: 31 },
      { base: "release/v3.8.56", since: ago(300), reasons: episode().reasons, minutes: 31 },
    ],
  });
  // An episode written before openedAt existed counts from its since.
  const old = [{ base: BASE, stalled: { since: ago(31), reasons: [] } }];
  assert.equal(assessStalled({ states: old, now: NOW }).stalled.length, 1);
});

test("a fresh state that carries stalled for 31 minutes is reported, not for 30", async (t) => {
  const { fake, run, writeState, watchdogIssues } = await setup(t);
  // Every tick fails and still saves: the state is fresh, only `stalled` says so.
  const reasons = ["3 ticks in a row failed, the first at 2026-11-13 11:00Z: ticks are failing"];
  const stalledState = (openedAt) => ({
    ...initialState(BASE, ago(2)),
    failedTicks: 6,
    failedSince: ago(60),
    stalled: { since: ago(60), reasons, openedAt, notified: true },
  });
  fake.addPull({ number: 7, labels: ["omni-queue"], base: { ref: BASE } });
  writeState(stalledState(ago(30)));
  let result = await run();
  assert.deepEqual(result.stale, []);
  assert.deepEqual(result.stalled, []);
  assert.equal(result.issue.action, "none");

  writeState(stalledState(ago(31)));
  result = await run();
  assert.deepEqual(result.stale, [], "the state is fresh");
  assert.deepEqual(result.stalled, [{ base: BASE, since: ago(60), reasons, minutes: 31 }]);
  assert.equal(result.issue.action, "opened");
  const [issue] = watchdogIssues();
  assert.equal(issue.title, WATCHDOG_TITLE);
  assert.ok(
    issue.body.includes(
      "The queue of `release/v3.8.54` has reported itself stalled since 2026-11-13 11:00Z"
    ),
    issue.body
  );
  assert.ok(issue.body.includes(`- ${reasons[0]}`), "with its reasons");
  assert.ok(!issue.body.includes("No state saved"), "only the signal that fired");
  assert.ok(issue.body.includes("@octo-approver"));
});

test("flapping: closed when the queue recovers, reopened (no mention) within 24 hours, new after", async (t) => {
  assert.equal(WATCHDOG_REOPEN_HOURS, 24);
  const { fake, run, writeState, watchdogIssues } = await setup(t);
  const later = (minutes) => new Date(Date.parse(NOW) + minutes * 60_000).toISOString();
  const staleAt = (now) => ({
    ...initialState(BASE, new Date(Date.parse(now) - 120 * 60_000).toISOString()),
    inFlight: inFlight(),
  });
  writeState(staleAt(NOW));
  const { issue } = await run();
  assert.equal(issue.action, "opened");
  const number = issue.number;

  // Recovered: closed.
  writeState({ ...initialState(BASE, later(58)), inFlight: inFlight() });
  assert.deepEqual((await run(later(60))).issue, { action: "closed", number });
  // Stalls again 23 hours later: the same issue, reopened with a comment that mentions nobody.
  writeState(staleAt(later(60 + 23 * 60)));
  const reopened = await run(later(60 + 23 * 60));
  assert.deepEqual(reopened.issue, { action: "reopened", number });
  assert.equal(watchdogIssues().length, 1);
  assert.equal(watchdogIssues()[0].number, number);
  const comments = fake.comments.get(number);
  const last = comments.at(-1).body;
  assert.match(last, /^Reopened/);
  assert.match(last, /No state saved for more than 90 minutes/);
  assert.ok(!last.includes("@"), "approvers are mentioned when an issue is created, not reopened");
  assert.equal(
    [...fake.issues.values()].filter((i) => i.title === WATCHDOG_TITLE).length,
    1,
    "no second issue"
  );

  // Recovered again, then stalled more than 24 hours after that closing: a new issue.
  writeState({ ...initialState(BASE, later(23 * 60 + 118)), inFlight: inFlight() });
  assert.equal((await run(later(23 * 60 + 120))).issue.action, "closed");
  const farLater = later(23 * 60 + 120 + 24 * 60 + 1);
  writeState(staleAt(farLater));
  const fresh = await run(farLater);
  assert.equal(fresh.issue.action, "opened");
  assert.notEqual(fresh.issue.number, number);
  assert.ok(fake.issues.get(fresh.issue.number).body.includes("@octo-approver"));
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
