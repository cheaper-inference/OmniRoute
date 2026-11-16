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
  WATCHDOG_DEADLINE_SECONDS,
  WATCHDOG_LIMIT_MINUTES,
  WATCHDOG_MARKER,
  WATCHDOG_MAX_RETRIES,
  WATCHDOG_MAX_WAIT_SECONDS,
  WATCHDOG_READ_BUDGET_SECONDS,
  WATCHDOG_REOPEN_HOURS,
  WATCHDOG_REQUEST_TIMEOUT_SECONDS,
  WATCHDOG_STALLED_GRACE_MINUTES,
  WATCHDOG_TITLE,
  WATCHDOG_WRITE_CUTOFF_SECONDS,
  assessStaleness,
  assessStalled,
  main,
  runWatchdog,
} from "../../../scripts/merge-queue/watchdog.mjs";
import { sha, startFakeGitHub } from "./helpers/fake-github.mjs";

const NOW = "2026-11-13T12:00:00.000Z";
const ago = (minutes) => new Date(Date.parse(NOW) - minutes * 60_000).toISOString();
const later = (minutes) => new Date(Date.parse(NOW) + minutes * 60_000).toISOString();
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
  // A short backoff: injected 5xx answers are retried by the client before they fail a read.
  const gh = createGitHubClient({
    token: "watchdog-token",
    repository: fake.repository,
    apiUrl: fake.url,
    baseDelayMs: 1,
    maxDelayMs: 5,
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
  assert.ok(issue.body.includes("| `release/v3.8.54` | 2026-11-13 10:00Z |"), issue.body);
  assert.ok(!issue.body.includes("120"), "absolute times only: no count of minutes");

  // Half an hour later the same signal renders the same body: the same issue, nothing written.
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
  assert.match(comments[0].body, /no undelivered stalled episode .*Closing/);
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
  // (An unmanaged base's own file is reported, never judged: "a valid document that is not where
  // its base belongs: three cases, three reasons".)
  let result = await run();
  assert.deepEqual(result.stale, [{ base: "release/v3.8.53", minutes: 100 }]);
  assert.deepEqual(result.unreadable, []);

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

test("assessStalled: an undelivered episode opened 30 minutes ago is not reported, 31 is; a delivered one never", () => {
  assert.equal(WATCHDOG_STALLED_GRACE_MINUTES, 30);
  const reasons = ["paused manually since 07:00Z, for more than 120 min"];
  const episode = (openedAt, extra = {}) => ({ since: ago(300), reasons, openedAt, ...extra });
  const states = [
    { base: "release/v3.8.56", updatedAt: ago(2), work: true, stalled: episode(ago(31)) },
    { base: "release/v3.8.55", updatedAt: ago(2), work: true, stalled: episode(ago(30)) },
    {
      base: "release/v3.8.54",
      updatedAt: ago(2),
      work: true,
      stalled: episode(ago(300), { notified: true }),
    },
    { base: "release/v3.8.53", updatedAt: ago(2), work: true, stalled: null },
  ];
  assert.deepEqual(assessStalled({ states, now: NOW }), {
    stalled: [{ base: "release/v3.8.56", since: ago(300), openedAt: ago(31), reasons }],
  });
  // An episode written before openedAt existed counts from its since.
  const old = [{ base: BASE, updatedAt: ago(2), work: true, stalled: { since: ago(31), reasons } }];
  assert.equal(assessStalled({ states: old, now: NOW }).stalled.length, 1);
  // An orphan (no work AND a state older than the staleness limit) is not reported; with work,
  // or with a state saved within the limit, it is.
  const orphan = (updatedAt, work) => [{ base: BASE, updatedAt, work, stalled: episode(ago(200)) }];
  assert.deepEqual(assessStalled({ states: orphan(ago(91), false), now: NOW }).stalled, []);
  assert.equal(assessStalled({ states: orphan(ago(90), false), now: NOW }).stalled.length, 1);
  assert.equal(assessStalled({ states: orphan(ago(91), true), now: NOW }).stalled.length, 1);
});

test("a fresh state with an undelivered episode is reported after 30 minutes; a delivered one is not", async (t) => {
  const { fake, run, writeState, watchdogIssues } = await setup(t);
  // Every tick fails and still saves: the state is fresh, only `stalled` says so; its dashboard
  // comment could not be posted.
  const reasons = ["3 ticks in a row failed, the first at 2026-11-13 11:00Z: ticks are failing"];
  const stalledState = (openedAt, extra = {}) => ({
    ...initialState(BASE, ago(2)),
    failedTicks: 6,
    failedSince: ago(60),
    stalled: { since: ago(60), reasons, openedAt, ...extra },
  });
  fake.addPull({ number: 7, labels: ["omni-queue"], base: { ref: BASE } });
  writeState(stalledState(ago(30)));
  let result = await run();
  assert.deepEqual(result.stale, []);
  assert.deepEqual(result.stalled, []);
  assert.equal(result.issue.action, "none");

  // Delivered: the approvers were told on the dashboard; the watchdog does not ping them again.
  writeState(stalledState(ago(150), { notified: true }));
  result = await run();
  assert.deepEqual(result.stalled, []);
  assert.equal(result.issue.action, "none");

  writeState(stalledState(ago(31)));
  result = await run();
  assert.deepEqual(result.stale, [], "the state is fresh");
  assert.deepEqual(result.stalled, [{ base: BASE, since: ago(60), openedAt: ago(31), reasons }]);
  assert.equal(result.issue.action, "opened");
  const [issue] = watchdogIssues();
  assert.equal(issue.title, WATCHDOG_TITLE);
  assert.ok(
    issue.body.includes(
      "The queue of `release/v3.8.54` has reported itself stalled since 2026-11-13 11:00Z**; " +
        "the episode opened at 2026-11-13 11:29Z"
    ),
    issue.body
  );
  assert.ok(issue.body.includes(`- ${reasons[0]}`), "with its reasons");
  assert.ok(!issue.body.includes("No state saved"), "only the signal that fired");
  assert.ok(issue.body.includes("@octo-approver"));
});

test("an undelivered episode on an orphan base is not reported; a labeled PR on it makes it work", async (t) => {
  const { fake, run, writeState } = await setup(t);
  // No work (nothing in flight, no pause, no labeled PR) and saved 91 minutes ago: nobody is
  // waiting on this base.
  writeState({
    ...initialState(BASE, ago(91)),
    stalled: { since: ago(200), reasons: ["x"], openedAt: ago(150) },
  });
  let result = await run();
  assert.deepEqual(result.stalled, []);
  assert.deepEqual(result.stale, []);
  assert.equal(result.issue.action, "none");
  fake.addPull({ number: 7, labels: ["omni-queue"], base: { ref: BASE } });
  result = await run();
  assert.deepEqual(
    result.stalled.map((s) => s.base),
    [BASE]
  );
  assert.deepEqual(result.stale, [{ base: BASE, minutes: 91 }], "and its state is stale too");
  assert.equal(result.issue.action, "opened");
});

test("an unreadable state file is its own signal: not JSON, or not a valid state", async (t) => {
  const { fake, run, writeState, watchdogIssues } = await setup(t);
  fake.commitFiles({ branch: STATE_BRANCH, files: { "state/release-v3.8.54.json": "{not json" } });
  let result = await run();
  assert.equal(result.unreadable.length, 1);
  assert.equal(result.unreadable[0].file, "state/release-v3.8.54.json");
  assert.match(result.unreadable[0].reason, /^not JSON: /);
  assert.equal(result.issue.action, "opened");
  let [issue] = watchdogIssues();
  assert.ok(issue.body.includes("**Unreadable state files**"), issue.body);
  assert.ok(issue.body.includes("- `state/release-v3.8.54.json`: `not JSON: "), issue.body);

  // It parses, but does not validate (an unknown schema version, history not a list).
  writeState({ ...initialState(BASE, ago(1)), version: 99, history: "x" });
  result = await run();
  assert.deepEqual(result.unreadable, [
    { file: "state/release-v3.8.54.json", reason: "does not validate: version, history" },
  ]);
  [issue] = watchdogIssues();
  assert.ok(
    issue.body.includes("- `state/release-v3.8.54.json`: `does not validate: version, history`"),
    issue.body
  );
  assert.equal(result.issue.action, "updated", "the open issue says what is true now");
  // A document that names no base at all is the queue's file too.
  fake.commitFiles({ branch: STATE_BRANCH, files: { "state/nameless.json": "{}" } });
  result = await run();
  assert.deepEqual(
    result.unreadable.map((u) => u.file),
    ["state/nameless.json", "state/release-v3.8.54.json"]
  );
  // A clean file again, and the nameless one deleted (a commit whose tree holds only the clean
  // file): nothing fires, the issue is closed.
  fake.commitFiles({
    branch: STATE_BRANCH,
    parents: [],
    files: { [stateFilePath(BASE)]: JSON.stringify(initialState(BASE, ago(1))) },
  });
  result = await run();
  assert.deepEqual(result.unreadable, []);
  assert.equal(result.issue.action, "closed");
});

test("the open issue's body follows the signals: updated in place, no comment, mention line kept", async (t) => {
  const { fake, run, writeState, watchdogIssues, writes } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), inFlight: inFlight() });
  const { issue } = await run();
  const opened = fake.issues.get(issue.number).body;
  const mention = opened.split("\n")[1];
  assert.match(mention, /@octo-approver/);
  // The same signals: the same body, no write.
  let before = writes().length;
  assert.equal((await run()).issue.action, "reused");
  assert.equal(writes().length, before);
  // A new signal: one PATCH of the body, no comment, no new issue.
  writeState({
    ...initialState("release/v3.8.55", ago(100)),
    paused: { reason: "manual", since: ago(100), baseSha: null, detail: "", issue: null },
  });
  before = writes().length;
  const result = await run();
  assert.deepEqual(result.issue, { action: "updated", number: issue.number });
  const made = writes().slice(before);
  assert.deepEqual(
    made.map((r) => `${r.method} ${r.path}`),
    [`PATCH /issues/${issue.number}`]
  );
  assert.deepEqual(Object.keys(made[0].body), ["body"], "the body only, the state untouched");
  const body = fake.issues.get(issue.number).body;
  assert.ok(body.includes("`release/v3.8.55`"), body);
  assert.equal(body.split("\n")[1], mention, "the mention line is unchanged");
  assert.equal(fake.comments.get(issue.number)?.length ?? 0, 0, "no comment");
  assert.equal(watchdogIssues().length, 1);
  // Even when the approvers change, an update keeps the line the issue was created with.
  const changed = { ...config, approvers: ["someone-else"] };
  writeState({ ...initialState("release/v3.8.56", ago(100)), inFlight: inFlight() });
  await runWatchdog({
    gh: createGitHubClient({
      token: "watchdog-token",
      repository: fake.repository,
      apiUrl: fake.url,
    }),
    config: changed,
    now: NOW,
  });
  assert.equal(fake.issues.get(issue.number).body.split("\n")[1], mention);
});

test("the issue search is bounded: open issues, and closed ones updated in the last 24 hours", async (t) => {
  const { fake, run, writeState, watchdogIssues } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), inFlight: inFlight() });
  const { issue } = await run();
  writeState({ ...initialState(BASE, ago(1)), inFlight: inFlight() });
  assert.equal((await run()).issue.action, "closed");
  // 25 hours after that closing the base stalls again: a new issue, the old one stays closed.
  const at = later(25 * 60);
  writeState({
    ...initialState(BASE, new Date(Date.parse(at) - 120 * 60_000).toISOString()),
    inFlight: inFlight(),
  });
  const before = fake.requests.length;
  const result = await run(at);
  assert.equal(result.issue.action, "opened");
  assert.notEqual(result.issue.number, issue.number);
  assert.equal(fake.issues.get(issue.number).state, "closed");
  assert.equal(watchdogIssues().length, 1);
  const listings = fake.requests
    .slice(before)
    .filter((r) => r.method === "GET" && r.path === "/issues")
    .map((r) => ({ state: r.query.state, labels: r.query.labels, since: r.query.since }));
  assert.deepEqual(listings, [
    { state: "open", labels: DASHBOARD_LABEL, since: undefined },
    { state: "closed", labels: DASHBOARD_LABEL, since: later(60) },
  ]);
});

test("a failed listing of the labeled PRs is loud: judged what it could, then exit 1", async (t) => {
  const { fake, run, writeState, watchdogIssues } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), inFlight: inFlight() });
  fake.inject({
    method: "GET",
    path: "/pulls",
    status: 403,
    body: { message: "Resource not accessible by integration" },
  });
  const result = await run();
  assert.match(result.listingError, /could not list the open PRs labeled omni-queue/);
  assert.deepEqual(result.stale, [{ base: BASE, minutes: 120 }], "a base with work is judged");
  assert.equal(result.issue.action, "opened", "and its issue handled");
  assert.equal(watchdogIssues().length, 1);

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
  fake.inject({ method: "GET", path: "/pulls", status: 403, body: { message: "nope" } });
  assert.equal(await main(env), 1);
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.match(errors[0], /^omni-queue watchdog: could not list the open PRs labeled omni-queue/);
  assert.equal(await main(env), 0, "the listing works again");
});

test("flapping: closed when the queue recovers, reopened (no mention) within 24 hours, new after", async (t) => {
  assert.equal(WATCHDOG_REOPEN_HOURS, 24);
  const { fake, run, writeState, watchdogIssues } = await setup(t);
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
  // The reopened issue's body is the current one (with the mention line it was created with).
  const reopenedBody = fake.issues.get(number).body;
  assert.ok(reopenedBody.includes("| `release/v3.8.54` | 2026-11-14 10:00Z |"), reopenedBody);
  assert.ok(!reopenedBody.includes("2026-11-13 10:00Z"), "not the first episode's");
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

/**
 * The watchdog's `main()` against the fake API (console captured); returns its exit code and the
 * lines it printed. `deps` is main()'s second argument (an injected clock, deadline timer or
 * client factory).
 */
async function runMain(t, fake, deps) {
  const dir = mkdtempSync(join(tmpdir(), "omni-queue-watchdog-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const configPath = join(dir, "config.json");
  writeFileSync(configPath, JSON.stringify(config));
  const errors = [];
  const logs = [];
  t.mock.method(console, "log", (line) => logs.push(String(line)));
  t.mock.method(console, "error", (line) => errors.push(String(line)));
  const code = await main(
    {
      GITHUB_TOKEN: "watchdog-token",
      GITHUB_REPOSITORY: fake.repository,
      GITHUB_API_URL: fake.url,
      OMNI_QUEUE_CONFIG: configPath,
    },
    deps
  );
  t.mock.restoreAll();
  return { code, errors, logs };
}

const pausedSince = (since) => ({
  reason: "manual",
  since,
  baseSha: null,
  detail: "",
  issue: null,
});

test("a partial run never closes or rewrites the open issue: the PR listing fails (the re-review's probe)", async (t) => {
  const { fake, run, writeState, watchdogIssues, writes } = await setup(t);
  // The only work of the base is a labeled PR; its state was saved two hours ago.
  writeState(initialState(BASE, ago(120)));
  fake.addPull({ number: 7, labels: ["omni-queue"], base: { ref: BASE } });
  const first = await run();
  assert.equal(first.issue.action, "opened");
  const number = first.issue.number;
  const body = fake.issues.get(number).body;
  // A second signal appears, and the listing fails (502 after the client's retries).
  writeState({ ...initialState("release/v3.8.55", ago(100)), paused: pausedSince(ago(100)) });
  fake.inject({
    method: "GET",
    path: "/pulls",
    status: 502,
    body: { message: "Bad gateway" },
    times: 50,
  });
  const before = writes().length;
  const second = await run(later(30));
  assert.equal(second.partial, true);
  assert.match(second.listingError, /could not list the open PRs labeled omni-queue/);
  assert.equal(writes().length, before, "no PATCH, no comment, no close");
  assert.deepEqual(second.issue, { action: "reused", number });
  assert.equal(watchdogIssues().length, 1, "the issue stays open");
  assert.equal(fake.issues.get(number).body, body, "its body is not rewritten from a partial view");
  assert.equal(fake.comments.get(number)?.length ?? 0, 0);
  // main(): the same run fails, one line for the failed read. main() builds its own client with
  // the default backoff, so it gets a status the client does not retry.
  fake.injections.length = 0;
  fake.inject({ method: "GET", path: "/pulls", status: 403, body: { message: "nope" } });
  const { code, errors } = await runMain(t, fake);
  assert.equal(code, 1);
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.match(errors[0], /could not list the open PRs labeled omni-queue/);
  assert.equal(watchdogIssues().length, 1);
  fake.injections.length = 0;

  // A complete run right after: the body is updated as before.
  const third = await run(later(31));
  assert.equal(third.partial, false);
  assert.deepEqual(third.issue, { action: "updated", number });
  assert.ok(fake.issues.get(number).body.includes("`release/v3.8.55`"));
  // ... and closed once nothing fires.
  writeState(initialState(BASE, later(30)));
  writeState({ ...initialState("release/v3.8.55", later(30)), paused: pausedSince(ago(100)) });
  assert.deepEqual((await run(later(32))).issue, { action: "closed", number });
});

test("a partial run never closes the open issue: a state file cannot be fetched", async (t) => {
  const { fake, run, writeState, watchdogIssues, writes } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), paused: pausedSince(ago(120)) });
  const first = await run();
  assert.equal(first.issue.action, "opened");
  const number = first.issue.number;
  const path = `/contents/${stateFilePath(BASE)}`;
  fake.inject({ method: "GET", path, status: 502, body: { message: "Bad gateway" }, times: 50 });
  const before = writes().length;
  const second = await run(later(30));
  assert.equal(second.partial, true);
  assert.deepEqual(
    second.fetchErrors.map((e) => e.file),
    [stateFilePath(BASE)]
  );
  assert.deepEqual(second.stale, [], "nothing it could read fires");
  assert.equal(writes().length, before, "no closing comment, no close");
  assert.equal(watchdogIssues().length, 1);
  // main() builds its own client with the default backoff: a status the client does not retry.
  fake.injections.length = 0;
  fake.inject({ method: "GET", path, status: 403, body: { message: "nope" } });
  const { code, errors } = await runMain(t, fake);
  assert.equal(code, 1, "a fetch failure fails the run");
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.ok(errors[0].includes(stateFilePath(BASE)), errors[0]);
  assert.equal(watchdogIssues().length, 1);
  fake.injections.length = 0;
  // Complete again: the state still fires, nothing written.
  assert.deepEqual((await run(later(31))).issue, { action: "reused", number });
  writeState(initialState(BASE, later(30)));
  assert.deepEqual((await run(later(32))).issue, { action: "closed", number });
});

test("a read failure alone opens no issue: it only fails the run", async (t) => {
  const { fake, run, writeState, watchdogIssues } = await setup(t);
  writeState(initialState(BASE, ago(10)));
  fake.inject({ method: "GET", path: "/pulls", status: 502, body: {}, times: 50 });
  const result = await run();
  assert.equal(result.partial, true);
  assert.equal(result.issue.action, "none");
  assert.deepEqual(watchdogIssues(), []);

  // The fetch case: a state file that cannot be fetched, and nothing else.
  fake.injections.length = 0;
  const path = `/contents/${stateFilePath(BASE)}`;
  fake.inject({ method: "GET", path, status: 502, body: {}, times: 50 });
  const fetched = await run();
  assert.equal(fetched.partial, true);
  assert.deepEqual(
    fetched.fetchErrors.map((e) => e.file),
    [stateFilePath(BASE)]
  );
  assert.equal(fetched.issue.action, "none");
  assert.deepEqual(watchdogIssues(), []);
  fake.injections.length = 0;
  fake.inject({ method: "GET", path, status: 403, body: { message: "nope" } });
  const { code, errors } = await runMain(t, fake);
  assert.equal(code, 1, "the run fails");
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.deepEqual(watchdogIssues(), [], "and opens no issue");
});

test("the body carries a hash of itself: the same signals do not rewrite it, whatever GitHub does to line endings", async (t) => {
  const { fake, run, writeState, writes } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), inFlight: inFlight() });
  const { issue } = await run();
  const stored = fake.issues.get(issue.number);
  const hashLine = stored.body
    .split("\n")
    .find((l) => l.startsWith("<!-- omni-queue-watchdog:body:"));
  assert.match(hashLine, /^<!-- omni-queue-watchdog:body:[0-9a-f]{12} -->$/);
  assert.ok(stored.body.startsWith(WATCHDOG_MARKER), "found by its marker as before");
  // GitHub hands the body back with CRLF line endings and a trailing newline.
  stored.body = `${stored.body.replace(/\n/g, "\r\n")}\r\n`;
  const before = writes().length;
  assert.equal((await run()).issue.action, "reused");
  assert.equal(writes().length, before, "no write");
  // A changed signal: one update, and a new hash.
  writeState({ ...initialState("release/v3.8.55", ago(100)), paused: pausedSince(ago(100)) });
  assert.equal((await run()).issue.action, "updated");
  assert.equal(writes().length, before + 1);
  assert.ok(!fake.issues.get(issue.number).body.includes(hashLine), "the hash moved");
  assert.equal((await run()).issue.action, "reused");
  assert.equal(writes().length, before + 1);
});

test("a state file whose document is for another base is unreadable", async (t) => {
  const { fake, run, watchdogIssues } = await setup(t);
  for (const wrong of ["release/v3.8.55", "main"]) {
    fake.commitFiles({
      branch: STATE_BRANCH,
      files: {
        "state/release-v3.8.54.json": JSON.stringify({
          ...initialState(wrong, ago(500)),
          paused: pausedSince(ago(500)),
        }),
      },
    });
    const result = await run();
    assert.deepEqual(result.unreadable, [
      {
        file: "state/release-v3.8.54.json",
        reason: `the document is for base ${wrong}, which is stored in ${stateFilePath(wrong)}`,
        misplaced: true,
      },
    ]);
    assert.deepEqual(result.stale, [], "nothing is judged from it");
  }
  assert.ok(
    watchdogIssues()[0].body.includes(
      "- `state/release-v3.8.54.json`: `the document is for base main, which is stored in " +
        "state/main.json`. If a managed base is stored in this file, its ticks fail until the " +
        "file is fixed or deleted; otherwise the file is stray and can be deleted."
    ),
    watchdogIssues()[0].body
  );
  // A stray file whose document names a base of another file is reported the same way.
  fake.commitFiles({
    branch: STATE_BRANCH,
    files: {
      "state/release-v3.8.54.json": JSON.stringify(initialState(BASE, ago(1))),
      "state/impostor.json": JSON.stringify(initialState("release/v3.8.99", ago(5000))),
    },
  });
  assert.deepEqual((await run()).unreadable, [
    {
      file: "state/impostor.json",
      reason:
        "the document is for base release/v3.8.99, which is stored in " +
        "state/release-v3.8.99.json",
      misplaced: true,
    },
  ]);
});

test("a valid document that is not where its base belongs: three cases, three reasons", async (t) => {
  const { fake, run, watchdogIssues } = await setup(t);
  const files = {
    // 1. A managed base's own file: the normal case, judged (paused, saved 100 minutes ago).
    [stateFilePath(BASE)]: JSON.stringify({
      ...initialState(BASE, ago(100)),
      paused: pausedSince(ago(100)),
    }),
    // 2. An unmanaged base's own file: base "main" is stored as state/main.json ...
    "state/main.json": JSON.stringify(initialState("main", ago(5000))),
    // ... and the re-review's probe: base "release-v3.8.57" (not managed) is stored as
    // state/release-v3.8.57.json, the file of the managed base release/v3.8.57.
    "state/release-v3.8.57.json": JSON.stringify(initialState("release-v3.8.57", ago(500))),
    // 3. A document whose base is stored in another file.
    "state/impostor.json": JSON.stringify(initialState("release/v3.8.99", ago(5000))),
  };
  fake.commitFiles({ branch: STATE_BRANCH, files });
  const result = await run();
  assert.deepEqual(result.stale, [{ base: BASE, minutes: 100 }], "case 1 is judged");
  assert.deepEqual(result.unreadable, [
    {
      file: "state/impostor.json",
      reason:
        "the document is for base release/v3.8.99, which is stored in state/release-v3.8.99.json",
      misplaced: true,
    },
    {
      file: "state/main.json",
      reason: "the document is for base main, which the queue does not manage",
      misplaced: true,
    },
    {
      file: "state/release-v3.8.57.json",
      reason: "the document is for base release-v3.8.57, which the queue does not manage",
      misplaced: true,
    },
  ]);
  const body = watchdogIssues()[0].body;
  const advice =
    ". If a managed base is stored in this file, its ticks fail until the file is fixed or " +
    "deleted; otherwise the file is stray and can be deleted.";
  for (const u of result.unreadable) {
    assert.ok(body.includes(`- \`${u.file}\`: \`${u.reason}\`${advice}`), body);
  }
  assert.ok(!body.includes("every tick of such a base fails"), "that sentence is gone");
  // The not-JSON / not-valid reasons carry no advice.
  fake.commitFiles({ branch: STATE_BRANCH, files: { "state/main.json": "{oops" } });
  const notJson = (await run()).unreadable.find((u) => u.file === "state/main.json");
  assert.equal(notJson.misplaced, undefined);
  const line = watchdogIssues()[0]
    .body.split("\n")
    .find((l) => l.startsWith("- `state/main.json`"));
  assert.ok(!line.includes("stray"), line);
});

test("an error thrown out of the run is one line: the listing of state/ fails, exit 1, nothing written", async (t) => {
  const { fake, writeState, writes } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), paused: pausedSince(ago(120)) });
  fake.inject({ method: "GET", path: "/contents/state", status: 422, body: { message: "x" } });
  let { code, errors } = await runMain(t, fake);
  assert.equal(code, 1);
  assert.equal(errors.length, 1, errors.join("\n---\n"));
  assert.ok(!/[\r\n]/.test(errors[0]), `one line, no stack trace: ${errors[0]}`);
  assert.match(errors[0], /^omni-queue watchdog: /);
  assert.ok(errors[0].length <= 260, errors[0]);
  assert.deepEqual(writes(), [], "nothing written");
  // The issue search fails the same way.
  fake.injections.length = 0;
  fake.inject({ method: "GET", path: "/issues", status: 422, body: { message: "y" } });
  ({ code, errors } = await runMain(t, fake));
  assert.equal(code, 1);
  assert.equal(errors.length, 1, errors.join("\n---\n"));
  assert.ok(!/[\r\n]/.test(errors[0]), errors[0]);
  assert.deepEqual(writes(), []);
});

test("the read budget: past it no state file is fetched, the run is partial and says how far it got", async (t) => {
  assert.equal(WATCHDOG_READ_BUDGET_SECONDS, 150);
  const { fake, gh, writeState, watchdogIssues, writes } = await setup(t);
  const bases = ["50", "51", "52", "53", "54", "55"].map((n) => `release/v3.8.${n}`);
  for (const b of bases) writeState(initialState(b, ago(5)));
  writeState({ ...initialState(bases[5], ago(120)), paused: pausedSince(ago(120)) });
  // A complete run opens the issue for the stale base.
  const opened = await runWatchdog({ gh, config, now: NOW });
  assert.equal(opened.issue.action, "opened");
  const number = opened.issue.number;
  const body = fake.issues.get(number).body;
  // Each state-file fetch takes 61 seconds on this clock: the budget is passed after the third.
  const fetches = () =>
    fake.requests.filter((r) => r.method === "GET" && r.path.startsWith("/contents/state/")).length;
  const clock = () => fetches() * 61_000;

  // Every base fresh again: a complete run would close the issue; this one reads three files.
  writeState(initialState(bases[5], ago(1)));
  let before = fetches();
  const writesBefore = writes().length;
  let result = await runWatchdog({ gh, config, now: NOW, clock });
  assert.equal(fetches() - before, 3, "three fetched");
  assert.equal(result.partial, true);
  assert.match(result.budgetError, /read budget exhausted after 3 of 6 state files/);
  assert.deepEqual(result.issue, { action: "reused", number }, "not closed");
  assert.equal(writes().length, writesBefore);
  assert.equal(watchdogIssues().length, 1);

  // Every base stale: a complete run would rewrite the body; this one does not.
  for (const b of bases)
    writeState({ ...initialState(b, ago(150)), paused: pausedSince(ago(150)) });
  before = fetches();
  result = await runWatchdog({ gh, config, now: NOW, clock });
  assert.equal(fetches() - before, 3);
  assert.equal(result.stale.length, 3, "what it read is judged");
  assert.deepEqual(result.issue, { action: "reused", number }, "not rewritten");
  assert.equal(fake.issues.get(number).body, body);
  assert.equal(writes().length, writesBefore);

  // main(): exit 1, the one error line with the counts.
  const { code, errors } = await runMain(t, fake, { clock });
  assert.equal(code, 1);
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.match(errors[0], /read budget exhausted after 3 of 6 state files/);
  assert.equal(fake.issues.get(number).state, "open");
  assert.equal(fake.issues.get(number).body, body);
});

test("a crafted state file name never starts a log line: no workflow command", async (t) => {
  const { fake, writeState } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), paused: pausedSince(ago(120)) });
  const notJson = "state/x\n::error title=injected::not JSON\r\n::add-mask::y\n.json";
  const unfetchable = "state/z\n::warning::cannot be fetched\n.json";
  fake.commitFiles({ branch: STATE_BRANCH, files: { [notJson]: "{oops", [unfetchable]: "{}" } });
  fake.inject({ method: "GET", path: /^\/contents\/state\/z%0A/, status: 403, body: {} });
  const { code, errors, logs } = await runMain(t, fake);
  assert.equal(code, 1);
  const lines = [...logs, ...errors].flatMap((l) => l.split(/\r\n|\r|\n/));
  assert.ok(
    lines.some((l) => l.includes("::error title=injected::")),
    `the name is in the log: ${lines.join("\n")}`
  );
  assert.ok(
    lines.some((l) => l.includes("::warning::cannot be fetched")),
    `the fetch error names it: ${lines.join("\n")}`
  );
  assert.deepEqual(
    lines.filter((l) => l.startsWith("::")),
    [],
    "no line starts a workflow command"
  );
});

test("a crafted state file name stays one inert line: no mention, no link, no heading", async (t) => {
  const { fake, run, watchdogIssues } = await setup(t);
  const name = "state/x` @octo-other [link](evil.example) `\n# Heading\n.json";
  fake.commitFiles({ branch: STATE_BRANCH, files: { [name]: "{oops" } });
  const result = await run();
  assert.equal(result.unreadable.length, 1);
  const [issue] = watchdogIssues();
  const lines = issue.body.split("\n");
  assert.ok(!lines.some((l) => /^#/.test(l)), "no heading");
  const carrying = lines.filter((l) => l.includes("octo-other"));
  assert.equal(carrying.length, 1, "one line");
  assert.ok(
    carrying[0].startsWith(
      "- `state/x' @octo-other [link](evil.example) ' # Heading .json`: `not JSON: "
    ),
    carrying[0]
  );
  // Inside its code span: everything between the first two backticks, the mention and the link
  // included; nothing of it outside.
  const outside = carrying[0]
    .split("`")
    .filter((_, i) => i % 2 === 0)
    .join("");
  assert.ok(!outside.includes("@") && !outside.includes("]("), outside);
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

test("the watchdog's client is short: its own limits, and a Retry-After above its largest wait is not waited for", async (t) => {
  assert.equal(WATCHDOG_MAX_RETRIES, 2);
  assert.equal(WATCHDOG_REQUEST_TIMEOUT_SECONDS, 15);
  assert.equal(WATCHDOG_MAX_WAIT_SECONDS, 15);
  const { fake, writeState, watchdogIssues } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), paused: pausedSince(ago(120)) });
  fake.inject({
    method: "GET",
    path: `/contents/${stateFilePath(BASE)}`,
    status: 429,
    body: {},
    headers: { "retry-after": "120" },
    times: 5,
  });
  const passed = [];
  const sleeps = [];
  const createClient = (options) => {
    passed.push(options);
    return createGitHubClient({
      ...options,
      sleep: async (ms) => {
        sleeps.push(ms);
      },
    });
  };
  const { code, errors } = await runMain(t, fake, { createClient });
  assert.equal(passed.length, 1);
  assert.equal(passed[0].maxRetries, 2);
  assert.equal(passed[0].requestTimeoutMs, 15_000);
  assert.equal(passed[0].maxDelayMs, 15_000);
  assert.deepEqual(sleeps, [], "no sleep at all, let alone one of 120 s");
  assert.equal(fake.injections[0]?.times, 4, "asked once, not retried");
  assert.equal(code, 1, "a failed read: the run is partial");
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.match(errors[0], /could not fetch state\/release-v3\.8\.54\.json/);
  assert.deepEqual(watchdogIssues(), [], "nothing else established, no issue");
});

test("the deadline: a fetch that never answers is stopped, one error line, exit 1, no write", async (t) => {
  assert.equal(WATCHDOG_DEADLINE_SECONDS, 240);
  const { fake, writeState, writes } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), paused: pausedSince(ago(120)) });
  let fire = null;
  const armed = [];
  const cleared = [];
  const timer = {
    set: (fn, ms) => {
      fire = fn;
      armed.push(ms);
      return "deadline";
    },
    clear: (handle) => cleared.push(handle),
  };
  // The state file's fetch never answers; the deadline fires while it waits.
  const createClient = (options) =>
    createGitHubClient({
      ...options,
      fetchImpl: (url, init) => {
        if (String(url).includes("/contents/state/")) {
          queueMicrotask(() => fire());
          return new Promise(() => {});
        }
        return fetch(url, init);
      },
    });
  const { code, errors } = await runMain(t, fake, { createClient, timer });
  assert.equal(code, 1);
  assert.deepEqual(armed, [240_000]);
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.match(
    errors[0],
    /^omni-queue watchdog: deadline of 240 s reached: the run was stopped \(while fetching state file 1 of 1\)$/
  );
  assert.deepEqual(writes(), [], "no write");
  assert.deepEqual(cleared, ["deadline"]);
});

test("past the write cut-off no write starts: a signal established, no issue created, partial, exit 1", async (t) => {
  assert.equal(WATCHDOG_WRITE_CUTOFF_SECONDS, 210);
  const { fake, gh, run, writeState, watchdogIssues, writes } = await setup(t);
  writeState({ ...initialState(BASE, ago(120)), paused: pausedSince(ago(120)) });
  // A clock that jumps past the cut-off once the run has searched for its issue.
  const searches = () => fake.requests.filter((r) => r.path === "/issues").length;
  const lateClock = () => {
    const at = searches();
    return () => (searches() > at ? 211_000 : 0);
  };
  const result = await runWatchdog({ gh, config, now: NOW, clock: lateClock() });
  assert.deepEqual(result.stale, [{ base: BASE, minutes: 120 }], "the signal is established");
  assert.equal(result.partial, true);
  assert.match(result.cutoffError, /write cut-off of 210 s passed: the issue was not created/);
  assert.equal(result.issue.action, "none");
  assert.deepEqual(watchdogIssues(), []);
  assert.deepEqual(writes(), []);
  const { code, errors } = await runMain(t, fake, { clock: lateClock() });
  assert.equal(code, 1);
  assert.equal(errors.length, 1, errors.join("\n"));
  assert.match(errors[0], /write cut-off of 210 s passed/);
  assert.deepEqual(writes(), []);
  // In time, the same run opens it; and a late run does not close it either.
  const { issue } = await run();
  assert.equal(issue.action, "opened");
  writeState(initialState(BASE, ago(1)));
  const before = writes().length;
  const late = await runWatchdog({ gh, config, now: NOW, clock: lateClock() });
  assert.deepEqual(late.issue, { action: "reused", number: issue.number });
  assert.match(late.cutoffError, /the issue was not closed/);
  assert.equal(writes().length, before);
});

test("a normal run clears its deadline timer: no handle is left behind", async (t) => {
  const { fake, writeState } = await setup(t);
  writeState(initialState(BASE, ago(5)));
  const handles = [];
  const cleared = [];
  // A real timer, NOT unref()ed: were it left armed, this test file would wait 240 s.
  const timer = {
    set: (fn, ms) => {
      const handle = setTimeout(fn, ms);
      handles.push(handle);
      return handle;
    },
    clear: (handle) => {
      cleared.push(handle);
      clearTimeout(handle);
    },
  };
  const { code } = await runMain(t, fake, { timer });
  assert.equal(code, 0);
  assert.equal(handles.length, 1);
  assert.deepEqual(cleared, handles);
});

test("a long base name is clipped inside its reason: the reason still says why", async (t) => {
  const { fake, run, watchdogIssues } = await setup(t);
  const own = `release-${"x".repeat(200)}`;
  const other = `release/${"y".repeat(200)}`;
  fake.commitFiles({
    branch: STATE_BRANCH,
    files: {
      [stateFilePath(own)]: JSON.stringify(initialState(own, ago(1))),
      "state/impostor.json": JSON.stringify(initialState(other, ago(1))),
    },
  });
  const result = await run();
  const reasons = Object.fromEntries(result.unreadable.map((u) => [u.file, u.reason]));
  assert.equal(
    reasons[stateFilePath(own)],
    `the document is for base ${own.slice(0, 60)}…, which the queue does not manage`
  );
  assert.equal(
    reasons["state/impostor.json"],
    `the document is for base ${other.slice(0, 60)}…, which is stored in ` +
      `${stateFilePath(other).slice(0, 60)}…`
  );
  const body = watchdogIssues()[0].body;
  assert.ok(body.includes("…, which the queue does not manage`. If a managed base"), body);
  assert.ok(body.includes("…, which is stored in state/"), body);
});
