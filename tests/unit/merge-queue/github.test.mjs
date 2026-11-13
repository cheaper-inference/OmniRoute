// omni-queue REST client (scripts/merge-queue/github.mjs) against the in-process fake GitHub.
import assert from "node:assert/strict";
import test from "node:test";
import { commentMarker } from "../../../scripts/merge-queue/contracts.mjs";
import {
  createGitHubClient,
  encodePath,
  GitHubError,
  isRateLimited,
  normalizeCheckRun,
  normalizePull,
  normalizeStatus,
  normalizeTimelineEvent,
  parseLinkHeader,
  retryDelayMs,
} from "../../../scripts/merge-queue/github.mjs";
import { sha, startFakeGitHub } from "./helpers/fake-github.mjs";

const TOKEN = "ghs_SuperSecretInstallationToken0123456789";

async function setup(t, fakeOptions = {}, clientOptions = {}) {
  const fake = await startFakeGitHub({ token: TOKEN, ...fakeOptions });
  t.after(() => fake.close());
  const sleeps = [];
  const logs = [];
  const gh = createGitHubClient({
    token: TOKEN,
    repository: fake.repository,
    apiUrl: fake.url,
    sleep: async (ms) => {
      sleeps.push(ms);
    },
    log: (msg) => logs.push(msg),
    ...clientOptions,
  });
  return { fake, gh, sleeps, logs };
}

// ───────────────────────────── pure helpers ─────────────────────────────

test("parseLinkHeader extracts every rel", () => {
  const header =
    '<https://api.github.com/x?page=2>; rel="next", <https://api.github.com/x?page=9>; rel="last"';
  assert.deepEqual(parseLinkHeader(header), {
    next: "https://api.github.com/x?page=2",
    last: "https://api.github.com/x?page=9",
  });
  assert.deepEqual(parseLinkHeader(null), {});
  assert.deepEqual(parseLinkHeader("garbage"), {});
});

test("retryDelayMs honors Retry-After, then x-ratelimit-reset, then exponential backoff", () => {
  const opts = { baseDelayMs: 1000, maxDelayMs: 60_000, nowMs: 1_000_000 };
  assert.equal(retryDelayMs(0, new Headers({ "retry-after": "7" }), opts), 7000);
  const reset = new Headers({ "x-ratelimit-remaining": "0", "x-ratelimit-reset": "1010" });
  assert.equal(retryDelayMs(0, reset, opts), 11_000); // (1010 s − 1000 s) + 1 s margin
  assert.equal(retryDelayMs(0, null, opts), 1000);
  assert.equal(retryDelayMs(3, null, opts), 8000);
  assert.equal(retryDelayMs(10, null, opts), 60_000, "clamped to maxDelayMs");
  assert.equal(retryDelayMs(0, new Headers({ "retry-after": "999999" }), opts), 60_000);
  const past = new Headers({ "x-ratelimit-remaining": "0", "x-ratelimit-reset": "1" });
  assert.equal(retryDelayMs(0, past, opts), 0, "never negative");
});

test("isRateLimited separates rate limits from permission errors", () => {
  assert.equal(isRateLimited(429, new Headers(), null), true);
  assert.equal(isRateLimited(403, new Headers({ "retry-after": "3" }), null), true);
  assert.equal(isRateLimited(403, new Headers({ "x-ratelimit-remaining": "0" }), null), true);
  assert.equal(
    isRateLimited(403, new Headers(), { message: "You have exceeded a secondary rate limit" }),
    true
  );
  assert.equal(isRateLimited(403, new Headers(), { message: "Resource not accessible" }), false);
  assert.equal(isRateLimited(404, new Headers({ "retry-after": "3" }), null), false);
});

test("encodePath keeps separators and escapes segments", () => {
  assert.equal(encodePath("state/release-v3.8.54.json"), "state/release-v3.8.54.json");
  assert.equal(encodePath("a b/c#d"), "a%20b/c%23d");
});

test("normalizePull flattens the API payload", () => {
  const pull = normalizePull({
    number: 7,
    state: "open",
    draft: false,
    merged: false,
    mergeable: null,
    mergeable_state: "unknown",
    title: "feat: x",
    body: null,
    user: { login: "alice" },
    labels: [{ name: "omni-queue" }, { name: "hold" }],
    base: { ref: "release/v3.8.54" },
    head: { sha: sha("h"), ref: "feat-x", repo: { full_name: "alice/fork" } },
    created_at: "2026-11-01T00:00:00Z",
    updated_at: "2026-11-02T00:00:00Z",
  });
  assert.deepEqual(pull, {
    number: 7,
    draft: false,
    baseRef: "release/v3.8.54",
    headSha: sha("h"),
    headRef: "feat-x",
    headRepoFullName: "alice/fork",
    title: "feat: x",
    author: "alice",
    labels: ["omni-queue", "hold"],
    createdAt: "2026-11-01T00:00:00Z",
    updatedAt: "2026-11-02T00:00:00Z",
    state: "open",
    merged: false,
    mergeable: null,
    mergeableState: "unknown",
    body: "",
  });
  assert.equal(normalizePull({ number: 1, head: null, repo: null }).headRepoFullName, null);
  assert.equal(normalizePull({ number: 1, merged_at: "2026-11-01T00:00:00Z" }).merged, true);
});

test("normalizeTimelineEvent trusts server time, never commit dates", () => {
  assert.deepEqual(
    normalizeTimelineEvent({
      event: "labeled",
      actor: { login: "diegosouzapw" },
      created_at: "2026-11-13T10:00:00Z",
      label: { name: "omni-queue", color: "fff" },
    }),
    {
      event: "labeled",
      actor: "diegosouzapw",
      createdAt: "2026-11-13T10:00:00Z",
      label: "omni-queue",
    }
  );
  const committed = normalizeTimelineEvent({
    event: "committed",
    sha: sha("c"),
    author: { date: "2030-01-01T00:00:00Z" },
    committer: { date: "2030-01-01T00:00:00Z" },
  });
  assert.deepEqual(committed, { event: "committed", actor: null, createdAt: null, sha: sha("c") });
  assert.deepEqual(
    normalizeTimelineEvent({
      event: "head_ref_force_pushed",
      actor: { login: "bob" },
      created_at: "2026-11-13T11:00:00Z",
      commit_id: sha("f"),
    }),
    {
      event: "head_ref_force_pushed",
      actor: "bob",
      createdAt: "2026-11-13T11:00:00Z",
      sha: sha("f"),
    }
  );
});

test("normalizeCheckRun and normalizeStatus produce the pure-module shapes", () => {
  assert.deepEqual(
    normalizeCheckRun({
      id: 5,
      name: "Gate / CI",
      status: "completed",
      conclusion: "failure",
      started_at: "a",
      completed_at: "b",
      html_url: "https://x",
      app: { slug: "github-actions" },
      output: { title: "t", summary: null },
    }),
    {
      id: 5,
      name: "Gate / CI",
      status: "completed",
      conclusion: "failure",
      startedAt: "a",
      completedAt: "b",
      htmlUrl: "https://x",
      appSlug: "github-actions",
      headBranch: null,
      output: { title: "t", summary: null, text: null },
    }
  );
  assert.deepEqual(
    normalizeStatus({
      context: "omni-queue/approval",
      state: "success",
      creator: { login: "omni-queue[bot]" },
      description: null,
      created_at: "2026-11-13T10:00:00Z",
    }),
    {
      context: "omni-queue/approval",
      state: "success",
      creator: "omni-queue[bot]",
      description: "",
      createdAt: "2026-11-13T10:00:00Z",
      targetUrl: null,
    }
  );
});

test("createGitHubClient rejects a missing token and a malformed repository", () => {
  assert.throws(() => createGitHubClient({ repository: "a/b" }), /token required/);
  assert.throws(() => createGitHubClient({ token: "x", repository: "a/b/c" }), /invalid repo/);
});

// ───────────────────────────── transport ─────────────────────────────

test("sends the auth, accept, API-version and user-agent headers", async (t) => {
  const { fake, gh } = await setup(t);
  fake.addPull({ number: 1 });
  await gh.getPull(1);
  const headers = fake.requests.at(-1).headers;
  assert.equal(headers.authorization, `Bearer ${TOKEN}`);
  assert.equal(headers.accept, "application/vnd.github+json");
  assert.equal(headers["x-github-api-version"], "2022-11-28");
  assert.equal(headers["user-agent"], "omni-queue");
});

test("paginate follows Link rel=next across pages", async (t) => {
  const { fake, gh } = await setup(t, { maxPerPage: 2 });
  for (let n = 1; n <= 5; n++) fake.addPull({ number: n, base: { ref: "release/v3.8.54" } });
  fake.addPull({ number: 6, base: { ref: "main" } });
  const pulls = await gh.listOpenPulls({ base: "release/v3.8.54" });
  assert.deepEqual(
    pulls.map((p) => p.number),
    [5, 4, 3, 2, 1]
  );
  const pages = fake.requests.filter((r) => r.path === "/pulls");
  assert.equal(pages.length, 3);
  assert.deepEqual(
    pages.map((r) => r.query.page ?? "1"),
    ["1", "2", "3"]
  );
  assert.ok(pages.every((r) => r.query.base === "release/v3.8.54" && r.query.state === "open"));
});

test("paginate unwraps {total_count, check_runs} envelopes over several pages", async (t) => {
  const { fake, gh } = await setup(t, { maxPerPage: 2 });
  const head = sha("candidate");
  fake.checkRuns.set(
    head,
    [1, 2, 3].map((id) => ({ id, name: `job ${id}`, status: "completed", conclusion: "success" }))
  );
  const runs = await gh.listCheckRuns(head);
  assert.deepEqual(
    runs.map((r) => r.name),
    ["job 1", "job 2", "job 3"]
  );
  assert.equal(fake.requests.filter((r) => r.path.endsWith("/check-runs")).length, 2);
  assert.equal(fake.requests[0].query.filter, "all");
});

test("listCheckRuns maps each run to the head_branch of its check suite (paginated)", async (t) => {
  const { fake, gh } = await setup(t, { maxPerPage: 1 });
  const head = sha("candidate-on-two-refs");
  const ref = "omni-queue/release-v3.8.54/b7-0123456789ab";
  const ours = fake.addCheckRun(head, {
    name: "Gate / CI",
    headBranch: ref,
    startedAt: "2026-11-13T10:00:00Z",
    completedAt: "2026-11-13T10:30:00Z",
  });
  // Same suite, second job: both runs resolve through the one suite.
  fake.addCheckRun(head, { name: "Gate / Quality", suiteId: ours.check_suite.id });
  // The base's own push of the same SHA (another suite, another branch).
  fake.addCheckRun(head, {
    name: "Gate / CI",
    conclusion: "failure",
    headBranch: "release/v3.8.54",
  });
  // A suite GitHub reports without a branch, and a run whose suite is not listed at all.
  fake.addCheckRun(head, { name: "external", appSlug: "some-app", headBranch: null });
  fake.checkRuns.get(head).push({ id: 9001, name: "orphan", status: "queued", conclusion: null });

  const runs = await gh.listCheckRuns(head);
  assert.deepEqual(
    runs.map((r) => [r.name, r.headBranch, r.appSlug]),
    [
      ["Gate / CI", ref, "github-actions"],
      ["Gate / Quality", ref, "github-actions"],
      ["Gate / CI", "release/v3.8.54", "github-actions"],
      ["external", null, "some-app"],
      ["orphan", null, null],
    ]
  );
  assert.equal(runs[0].startedAt, "2026-11-13T10:00:00Z");
  assert.equal(runs[0].completedAt, "2026-11-13T10:30:00Z");
  assert.equal(runs[4].startedAt, null);
  assert.equal(runs[4].completedAt, null);
  // Every page of the suites was read (3 suites at 1 per page).
  assert.equal(fake.requests.filter((r) => r.path.endsWith("/check-suites")).length, 3);
});

test("listCheckRuns skips the check-suites call when the SHA has no run", async (t) => {
  const { fake, gh } = await setup(t);
  assert.deepEqual(await gh.listCheckRuns(sha("no-runs")), []);
  assert.equal(fake.requests.filter((r) => r.path.endsWith("/check-suites")).length, 0);
});

test("retries a 502 with backoff and then succeeds", async (t) => {
  const { fake, gh, sleeps, logs } = await setup(t);
  fake.addPull({ number: 3, title: "ok" });
  fake.inject({ method: "GET", path: "/pulls/3", status: 502, body: { message: "bad" }, times: 2 });
  const pull = await gh.getPull(3);
  assert.equal(pull.title, "ok");
  assert.deepEqual(sleeps, [1000, 2000]);
  assert.equal(logs.filter((l) => l.includes("502")).length, 2);
});

test("gives up after maxRetries and throws GitHubError with the status", async (t) => {
  const { fake, gh, sleeps } = await setup(t, {}, { maxRetries: 2 });
  fake.addPull({ number: 3 });
  fake.inject({ path: "/pulls/3", status: 503, body: { message: "down" }, times: 10 });
  await assert.rejects(gh.getPull(3), (error) => {
    assert.ok(error instanceof GitHubError);
    assert.equal(error.status, 503);
    assert.equal(error.method, "GET");
    assert.match(error.message, /down/);
    return true;
  });
  assert.equal(sleeps.length, 2);
});

test("retries a secondary rate-limit 403 honoring Retry-After", async (t) => {
  const { fake, gh, sleeps } = await setup(t);
  fake.addPull({ number: 4 });
  fake.inject({
    path: "/pulls/4",
    status: 403,
    body: { message: "You have exceeded a secondary rate limit" },
    headers: { "retry-after": "7" },
  });
  assert.equal((await gh.getPull(4)).number, 4);
  assert.deepEqual(sleeps, [7000]);
});

test("retries a primary rate-limit 403 until x-ratelimit-reset", async (t) => {
  const { fake, gh, sleeps } = await setup(t, {}, { nowMs: () => 1_000_000 });
  fake.addPull({ number: 4 });
  fake.inject({
    path: "/pulls/4",
    status: 403,
    body: { message: "API rate limit exceeded" },
    headers: { "x-ratelimit-remaining": "0", "x-ratelimit-reset": "1030" },
  });
  await gh.getPull(4);
  assert.deepEqual(sleeps, [31_000]);
});

test("does not retry a plain 403 or a 404", async (t) => {
  const { fake, gh, sleeps } = await setup(t);
  fake.inject({ path: "/pulls/9", status: 403, body: { message: "Resource not accessible" } });
  await assert.rejects(gh.getPull(9), (e) => e instanceof GitHubError && e.status === 403);
  await assert.rejects(gh.getPull(10), (e) => e instanceof GitHubError && e.status === 404);
  assert.deepEqual(sleeps, []);
});

test("retries network errors", async (t) => {
  const fake = await startFakeGitHub({ token: TOKEN });
  t.after(() => fake.close());
  fake.addPull({ number: 2 });
  let calls = 0;
  const sleeps = [];
  const gh = createGitHubClient({
    token: TOKEN,
    repository: fake.repository,
    apiUrl: fake.url,
    sleep: async (ms) => sleeps.push(ms),
    fetchImpl: async (url, init) => {
      calls += 1;
      if (calls === 1) throw new TypeError("fetch failed: ECONNRESET");
      return fetch(url, init);
    },
  });
  assert.equal((await gh.getPull(2)).number, 2);
  assert.equal(calls, 2);
  assert.deepEqual(sleeps, [1000]);
});

test("the token never appears in error messages or logs", async (t) => {
  const { fake, gh, logs } = await setup(t, {}, { maxRetries: 1 });
  fake.inject({
    path: "/pulls/1",
    status: 500,
    body: { message: `echo Authorization: Bearer ${TOKEN}` },
    times: 5,
  });
  let caught;
  await gh.getPull(1).catch((e) => (caught = e));
  assert.ok(caught instanceof GitHubError);
  assert.ok(!caught.message.includes(TOKEN), caught.message);
  assert.match(caught.message, /\*\*\*/);
  assert.ok(!JSON.stringify(caught).includes(TOKEN));

  const leaky = createGitHubClient({
    token: TOKEN,
    repository: fake.repository,
    apiUrl: fake.url,
    maxRetries: 1,
    sleep: async () => {},
    log: (msg) => logs.push(msg),
    fetchImpl: async () => {
      throw new Error(`connect failed for Bearer ${TOKEN}`);
    },
  });
  await assert.rejects(leaky.getPull(1), (e) => !e.message.includes(TOKEN) && e.status === 0);
  assert.ok(logs.length > 0);
  for (const line of logs) {
    assert.ok(!line.includes(TOKEN), line);
    assert.ok(!/authorization/i.test(line) || line.includes("***"), line);
  }
});

test("refuses to follow a pagination link to a foreign origin", async (t) => {
  const { fake, gh } = await setup(t);
  fake.inject({
    path: "/pulls",
    status: 200,
    body: [],
    headers: { link: '<https://evil.example/steal?page=2>; rel="next"' },
  });
  await assert.rejects(gh.listOpenPulls(), /foreign origin/);
  assert.equal(fake.requests.length, 1);
});

// ───────────────────────────── pull requests / issues ─────────────────────────────

test("listPullFiles includes the previous names of renames", async (t) => {
  const { fake, gh } = await setup(t);
  fake.addPull({ number: 8 });
  fake.files.set(8, [
    { filename: "src/a.ts", status: "modified" },
    { filename: "docs/new.md", previous_filename: "AGENTS.md", status: "renamed" },
  ]);
  assert.deepEqual(await gh.listPullFiles(8), ["src/a.ts", "docs/new.md", "AGENTS.md"]);
});

test("labels round-trip through the timeline with the server actor", async (t) => {
  let clock = "2026-11-13T10:00:00Z";
  const { fake, gh } = await setup(t, { now: () => clock });
  fake.addPull({ number: 11 });
  fake.timeline.set(11, [
    { event: "committed", sha: sha("c1"), committer: { date: "2099-01-01T00:00:00Z" } },
  ]);
  await gh.addLabels(11, ["omni-queue"]);
  clock = "2026-11-13T10:05:00Z";
  fake.actor = "mallory";
  await gh.removeLabel(11, "omni-queue");
  await gh.removeLabel(11, "omni-queue"); // already absent → no throw
  const timeline = await gh.listIssueTimeline(11);
  assert.deepEqual(timeline, [
    { event: "committed", actor: null, createdAt: null, sha: sha("c1") },
    {
      event: "labeled",
      actor: "diegosouzapw",
      createdAt: "2026-11-13T10:00:00Z",
      label: "omni-queue",
    },
    {
      event: "unlabeled",
      actor: "mallory",
      createdAt: "2026-11-13T10:05:00Z",
      label: "omni-queue",
    },
  ]);
  assert.deepEqual((await gh.getPull(11)).labels, []);
});

test("commentOnce posts once per key and appends the hidden marker", async (t) => {
  const { fake, gh } = await setup(t);
  fake.addPull({ number: 12 });
  assert.deepEqual(await gh.commentOnce(12, "not-approver", "Hello"), { posted: true });
  assert.deepEqual(await gh.commentOnce(12, "not-approver", "Hello again"), { posted: false });
  assert.deepEqual(await gh.commentOnce(12, "conflict", "Other"), { posted: true });
  const comments = await gh.listIssueComments(12);
  assert.equal(comments.length, 2);
  assert.equal(comments[0].body, `Hello\n\n${commentMarker("not-approver")}`);
  assert.equal(comments[0].author, "diegosouzapw");
  await assert.rejects(gh.commentOnce(12, "bad key!", "x"), /unsafe comment key/);
});

test("commentOnce with botLogin ignores markers planted by other users", async (t) => {
  const { fake, gh } = await setup(
    t,
    { actor: "omni-queue[bot]" },
    { botLogin: "omni-queue[bot]" }
  );
  fake.addPull({ number: 13 });
  fake.comments.set(13, [
    { id: 1, body: `spoof ${commentMarker("conflict")}`, user: { login: "mallory" } },
  ]);
  assert.deepEqual(await gh.commentOnce(13, "conflict", "Real"), { posted: true });
  assert.deepEqual(await gh.commentOnce(13, "conflict", "Real"), { posted: false });
});

test("listIssues filters out pull requests and normalizes", async (t) => {
  const { fake, gh } = await setup(t);
  fake.addIssue({ number: 20, title: "Freeze release/v3.8.54", labels: ["release-freeze"] });
  fake.addIssue({ number: 21, title: "unrelated", labels: ["bug"] });
  fake.addPull({ number: 22, labels: ["release-freeze"] });
  const issues = await gh.listIssues({ labels: ["release-freeze"] });
  assert.deepEqual(issues, [
    {
      number: 20,
      title: "Freeze release/v3.8.54",
      body: "",
      labels: ["release-freeze"],
      state: "open",
      updatedAt: fake.issues.get(20).updated_at,
    },
  ]);
  const created = await gh.createIssue({ title: "T", body: "B", labels: ["x"] });
  await gh.updateIssue(created.number, { body: "B2" });
  assert.equal(fake.issues.get(created.number).body, "B2");
});

// ───────────────────────────── commits / statuses / merge ─────────────────────────────

test("statuses come back newest first and descriptions are capped at 140 chars", async (t) => {
  let clock = "2026-11-13T10:00:00Z";
  const { gh } = await setup(t, { actor: "omni-queue[bot]", now: () => clock });
  const head = sha("head");
  await gh.createCommitStatus(head, {
    state: "success",
    context: "omni-queue/approval",
    description: "approved by diegosouzapw",
  });
  clock = "2026-11-13T10:01:00Z";
  await gh.createCommitStatus(head, {
    state: "failure",
    context: "omni-queue/approval",
    description: "x".repeat(300),
    targetUrl: "https://github.com/acme/widget/actions/runs/1",
  });
  const statuses = await gh.listCommitStatuses(head);
  assert.deepEqual(
    statuses.map((s) => [s.state, s.creator, s.description.length]),
    [
      ["failure", "omni-queue[bot]", 140],
      ["success", "omni-queue[bot]", 24],
    ]
  );
  assert.equal(statuses[0].targetUrl, "https://github.com/acme/widget/actions/runs/1");
  await assert.rejects(gh.listCommitStatuses("nothex"), /invalid sha/);
});

test("mergePull reports 405/409 as merged:false without throwing", async (t) => {
  const { fake, gh } = await setup(t);
  const pr = fake.addPull({ number: 30 });
  const stale = await gh.mergePull(30, { method: "squash", sha: sha("stale") });
  assert.deepEqual(
    { merged: stale.merged, status: stale.status, sha: stale.sha },
    { merged: false, status: 409, sha: null }
  );
  const ok = await gh.mergePull(30, { method: "squash", sha: pr.head.sha, commitTitle: "t (#30)" });
  assert.equal(ok.merged, true);
  assert.match(ok.sha, /^[0-9a-f]{40}$/);
  assert.equal(fake.merges.at(-1).body.commit_title, "t (#30)");
  assert.equal(fake.merges.at(-1).body.merge_method, "squash");
  // A repeat at the same head is answered 405, but GET /pulls confirms it landed: idempotent.
  const again = await gh.mergePull(30, { method: "squash", sha: pr.head.sha });
  assert.deepEqual([again.merged, again.status, again.sha], [true, 200, ok.sha]);
  // Merged, but at another head than the one requested: still a rejection.
  const other = await gh.mergePull(30, { method: "squash", sha: sha("other-head") });
  assert.deepEqual([other.merged, other.status, other.sha], [false, 405, null]);
  fake.mergeResponses.set(31, { status: 422, body: { message: "nope" } });
  fake.addPull({ number: 31 });
  await assert.rejects(gh.mergePull(31, { method: "squash", sha: sha("x") }), /422/);
});

test("mergePull never replays a merge that GitHub applied before answering 502", async (t) => {
  const { fake, gh, sleeps } = await setup(t);
  const pr = fake.addPull({ number: 32 });
  fake.inject({
    method: "PUT",
    path: "/pulls/32/merge",
    status: 502,
    body: { message: "Bad Gateway" },
    apply: true,
  });
  const result = await gh.mergePull(32, { method: "squash", sha: pr.head.sha });
  assert.equal(result.merged, true);
  assert.equal(result.sha, fake.pulls.get(32).merge_commit_sha);
  assert.match(result.sha, /^[0-9a-f]{40}$/);
  assert.equal(fake.merges.length, 1, "the PUT was sent exactly once");
  assert.deepEqual(sleeps, [], "no backoff: the GET confirmed the merge");
  assert.ok(fake.requests.some((r) => r.method === "GET" && r.path === "/pulls/32"));
});

test("mergePull retries a 502 that did not merge, after checking the PR", async (t) => {
  const { fake, gh, sleeps } = await setup(t);
  const pr = fake.addPull({ number: 33 });
  fake.inject({ method: "PUT", path: "/pulls/33/merge", status: 502, body: { message: "x" } });
  const result = await gh.mergePull(33, { method: "merge", sha: pr.head.sha });
  assert.equal(result.merged, true);
  assert.equal(result.status, 200);
  assert.equal(fake.merges.length, 1, "the injected 502 never reached the merge handler");
  assert.equal(fake.requests.filter((r) => r.method === "PUT").length, 2);
  assert.deepEqual(sleeps, [1000]);
});

test("mergePull gives up after maxRetries of unconfirmed 5xx", async (t) => {
  const { fake, gh, sleeps } = await setup(t, {}, { maxRetries: 2 });
  const pr = fake.addPull({ number: 34 });
  fake.inject({ method: "PUT", path: "/pulls/34/merge", status: 503, body: {}, times: 10 });
  await assert.rejects(
    gh.mergePull(34, { method: "squash", sha: pr.head.sha }),
    (e) => e instanceof GitHubError && e.status === 503
  );
  assert.equal(fake.requests.filter((r) => r.method === "PUT").length, 3);
  assert.deepEqual(sleeps, [1000, 2000]);
  assert.equal(fake.pulls.get(34).merged, false);
});

test("a hung request times out and is retried as a network error", async (t) => {
  // 1 s, not 100 ms: on a loaded machine the retried (fast) request must not time out too.
  const { fake, gh, sleeps, logs } = await setup(t, {}, { requestTimeoutMs: 1000 });
  fake.addPull({ number: 35, title: "slow" });
  fake.inject({ method: "GET", path: "/pulls/35", status: 200, body: {}, delayMs: 10_000 });
  const started = Date.now();
  assert.equal((await gh.getPull(35)).title, "slow");
  assert.ok(Date.now() - started < 5000, "the stalled response did not hold the client");
  assert.deepEqual(sleeps, [1000]);
  assert.ok(logs.some((l) => /timed out after 1000 ms/.test(l)));
});

test("a request that keeps timing out fails with GitHubError status 0", async (t) => {
  const { fake, gh } = await setup(t, {}, { requestTimeoutMs: 50, maxRetries: 1 });
  fake.inject({ path: "/pulls/36", status: 200, body: {}, delayMs: 10_000, times: 5 });
  await assert.rejects(gh.getPull(36), (e) => {
    assert.ok(e instanceof GitHubError);
    assert.equal(e.status, 0);
    assert.match(e.message, /timed out after 50 ms/);
    return true;
  });
});

test("commentOnce keeps the oldest when another writer posted the same marker meanwhile", async (t) => {
  const fake = await startFakeGitHub({ token: TOKEN, actor: "omni-queue[bot]" });
  t.after(() => fake.close());
  fake.addPull({ number: 14 });
  let planted = false;
  const gh = createGitHubClient({
    token: TOKEN,
    repository: fake.repository,
    apiUrl: fake.url,
    botLogin: "omni-queue[bot]",
    fetchImpl: async (url, init) => {
      if (!planted && init.method === "POST" && url.endsWith("/issues/14/comments")) {
        planted = true; // the approval job posts between our read and our write
        fake.comments.set(14, [
          {
            id: 1,
            body: `other writer\n\n${commentMarker("not-approver")}`,
            user: { login: "omni-queue[bot]", type: "Bot" },
            created_at: "2026-11-13T10:00:00Z",
          },
        ]);
      }
      return fetch(url, init);
    },
  });
  assert.deepEqual(await gh.commentOnce(14, "not-approver", "mine"), { posted: false });
  const comments = fake.comments.get(14);
  assert.equal(comments.length, 1, "the newer duplicate was deleted");
  assert.equal(comments[0].id, 1);
  assert.ok(
    fake.requests.some((r) => r.method === "DELETE" && /^\/issues\/comments\/\d+$/.test(r.path))
  );
});

test("commentOnce removes the duplicate left by a POST replayed after a 502", async (t) => {
  const { fake, gh } = await setup(t);
  fake.addPull({ number: 15 });
  fake.inject({
    method: "POST",
    path: "/issues/15/comments",
    status: 502,
    body: {},
    apply: true,
  });
  await gh.commentOnce(15, "conflict", "body");
  const comments = fake.comments.get(15);
  assert.equal(comments.length, 1, "exactly one comment survives");
  assert.equal(comments[0].body, `body\n\n${commentMarker("conflict")}`);
  assert.deepEqual(await gh.commentOnce(15, "conflict", "body"), { posted: false });
  assert.equal(fake.comments.get(15).length, 1);
});

test("deleteIssueComment tolerates an already-deleted comment", async (t) => {
  const { fake, gh } = await setup(t);
  fake.addPull({ number: 16 });
  const { id } = await gh.createIssueComment(16, "x");
  await gh.deleteIssueComment(id);
  assert.equal(fake.comments.get(16).length, 0);
  await gh.deleteIssueComment(id); // 404 → ok
});

test("listDirectory lists the children of a directory, [] when absent", async (t) => {
  const { fake, gh } = await setup(t);
  fake.commitFiles({
    branch: "omni-queue-state",
    files: {
      "state/release-v3.8.54.json": "{}",
      "state/release-v3.8.55.json": "{}",
      "state/archive/old.json": "{}",
      "README.md": "x",
    },
  });
  const entries = await gh.listDirectory("state", "omni-queue-state");
  assert.deepEqual(
    entries.map((e) => [e.name, e.type, e.path]),
    [
      ["archive", "dir", "state/archive"],
      ["release-v3.8.54.json", "file", "state/release-v3.8.54.json"],
      ["release-v3.8.55.json", "file", "state/release-v3.8.55.json"],
    ]
  );
  assert.match(entries[1].sha, /^[0-9a-f]{40}$/);
  assert.deepEqual(await gh.listDirectory("nothing", "omni-queue-state"), []);
  assert.deepEqual(await gh.listDirectory("state", "no-such-branch"), []);
  assert.deepEqual(
    await gh.listDirectory("README.md", "omni-queue-state"),
    [],
    "a file is not a dir"
  );
});

test("getCommit and getBranchSha read the git object store", async (t) => {
  const { fake, gh } = await setup(t);
  const root = fake.commitFiles({ branch: "release/v3.8.54", files: { "a.txt": "1" } });
  const tip = fake.commitFiles({
    branch: "release/v3.8.54",
    files: { "b.txt": "2" },
    message: "m",
  });
  assert.equal(await gh.getBranchSha("release/v3.8.54"), tip);
  assert.equal(await gh.getBranchSha("release/v9.9.9"), null);
  const commit = await gh.getCommit(tip);
  assert.deepEqual(commit.parents, [root]);
  assert.equal(commit.message, "m");
  assert.match(commit.treeSha, /^[0-9a-f]{40}$/);
});

// ───────────────────────────── contents CAS / orphan branch ─────────────────────────────

test("state store primitives: orphan branch, read, CAS write, conflicts", async (t) => {
  const { fake, gh } = await setup(t);
  const path = "state/release-v3.8.54.json";
  assert.equal(await gh.getFileContent(path, "omni-queue-state"), null, "branch absent");

  const commit = await gh.createOrphanBranch(
    "omni-queue-state",
    [{ path, content: '{"v":1}\n' }],
    "omni-queue: init state"
  );
  assert.match(commit, /^[0-9a-f]{40}$/);
  assert.deepEqual(fake.commits.get(commit).parents, [], "orphan: no parents");
  assert.equal(
    await gh.createOrphanBranch("omni-queue-state", [{ path, content: "{}" }], "again"),
    null,
    "existing branch → null"
  );

  const first = await gh.getFileContent(path, "omni-queue-state");
  assert.equal(first.content, '{"v":1}\n');
  assert.match(first.sha, /^[0-9a-f]{40}$/);
  assert.equal(await gh.getFileContent("state/missing.json", "omni-queue-state"), null);

  const write = await gh.putFileContent(path, {
    branch: "omni-queue-state",
    message: "tick",
    content: '{"v":2}\n',
    sha: first.sha,
  });
  assert.equal(write.ok, true);
  const second = await gh.getFileContent(path, "omni-queue-state");
  assert.equal(second.content, '{"v":2}\n');
  assert.equal(write.sha, second.sha);

  const stale = await gh.putFileContent(path, {
    branch: "omni-queue-state",
    message: "late tick",
    content: '{"v":"lost"}\n',
    sha: first.sha,
  });
  assert.deepEqual(stale, { ok: false, conflict: true });
  const noSha = await gh.putFileContent(path, {
    branch: "omni-queue-state",
    message: "blind",
    content: "{}",
    sha: null,
  });
  assert.deepEqual(noSha, { ok: false, conflict: true });
  assert.equal(fake.readFile("omni-queue-state", path), '{"v":2}\n', "losers wrote nothing");

  const created = await gh.putFileContent("state/other.json", {
    branch: "omni-queue-state",
    message: "new base",
    content: "{}",
  });
  assert.equal(created.ok, true);

  fake.inject({
    method: "PUT",
    path: /^\/contents\//,
    status: 422,
    body: { message: "Invalid path" },
  });
  await assert.rejects(
    gh.putFileContent("bad", { branch: "omni-queue-state", message: "m", content: "x" }),
    (e) => e instanceof GitHubError && e.status === 422
  );
});

test("getFileContent falls back to the blob API when inline content is absent", async (t) => {
  const { fake, gh } = await setup(t);
  fake.commitFiles({ branch: "omni-queue-state", files: { "state/big.json": "BIG" } });
  const blobSha = [...fake.blobs.keys()][0];
  fake.inject({
    method: "GET",
    path: "/contents/state/big.json",
    status: 200,
    body: { type: "file", encoding: "none", content: "", sha: blobSha },
  });
  assert.deepEqual(await gh.getFileContent("state/big.json", "omni-queue-state"), {
    content: "BIG",
    sha: blobSha,
  });
});

// ───────────────────────────── refs / actions / rulesets ─────────────────────────────

test("listMatchingBranches strips refs/heads/ and deleteBranch guards the prefix", async (t) => {
  const { fake, gh } = await setup(t);
  const c = fake.commitFiles({ files: { x: "1" } });
  fake.refs.set("heads/omni-queue/release-v3.8.54/b1-0123456789ab", c);
  fake.refs.set("heads/omni-queue/release-v3.8.54/b2-0123456789ab", c);
  fake.refs.set("heads/release/v3.8.54", c);
  fake.refs.set("heads/omni-queue-state", c);
  const list = await gh.listMatchingBranches("omni-queue/");
  assert.deepEqual(list, [
    { ref: "omni-queue/release-v3.8.54/b1-0123456789ab", sha: c },
    { ref: "omni-queue/release-v3.8.54/b2-0123456789ab", sha: c },
  ]);

  for (const bad of [
    "release/v3.8.54",
    "omni-queue-state",
    "omni-queue/",
    "main",
    "",
    "x/omni-queue/a",
  ]) {
    await assert.rejects(gh.deleteBranch(bad), /refusing to delete/, bad);
  }
  await assert.rejects(gh.deleteBranch("omni-queue/../release/v3.8.54"), /refusing/);
  assert.ok(fake.refs.has("heads/release/v3.8.54"));
  assert.ok(!fake.requests.some((r) => r.method === "DELETE"), "refusals never reach the API");

  await gh.deleteBranch("omni-queue/release-v3.8.54/b1-0123456789ab");
  assert.ok(!fake.refs.has("heads/omni-queue/release-v3.8.54/b1-0123456789ab"));
  await gh.deleteBranch("omni-queue/release-v3.8.54/b1-0123456789ab"); // already gone: ok
});

test("listWorkflowRuns filters and unwraps workflow_runs; dispatchWorkflow posts inputs", async (t) => {
  const { fake, gh } = await setup(t);
  fake.workflowRuns.push(
    {
      id: 1,
      name: "CI",
      status: "completed",
      conclusion: "failure",
      html_url: "https://x/1",
      head_sha: sha("a"),
      head_branch: "release/v3.8.54",
      event: "push",
    },
    {
      id: 2,
      name: "CI",
      status: "in_progress",
      conclusion: null,
      html_url: "https://x/2",
      head_sha: sha("b"),
      head_branch: "main",
      event: "push",
    }
  );
  assert.deepEqual(await gh.listWorkflowRuns({ branch: "release/v3.8.54", event: "push" }), [
    {
      id: 1,
      name: "CI",
      status: "completed",
      conclusion: "failure",
      htmlUrl: "https://x/1",
      headSha: sha("a"),
      event: "push",
    },
  ]);
  await gh.dispatchWorkflow("omni-queue.yml", "main", { base: "release/v3.8.54", action: "pause" });
  assert.deepEqual(fake.dispatches, [
    {
      workflow: "omni-queue.yml",
      ref: "main",
      inputs: { base: "release/v3.8.54", action: "pause" },
    },
  ]);
});

test("rulesets CRUD", async (t) => {
  const { gh } = await setup(t);
  const created = await gh.createRuleset({ name: "release", enforcement: "active" });
  assert.equal(typeof created.id, "number");
  assert.equal((await gh.getRuleset(created.id)).name, "release");
  const updated = await gh.updateRuleset(created.id, { enforcement: "disabled" });
  assert.equal(updated.enforcement, "disabled");
  assert.deepEqual(
    (await gh.listRulesets()).map((r) => r.id),
    [created.id]
  );
});
