import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load as parseYaml } from "js-yaml";
import { selectRunsToCancel } from "../../scripts/ci/cancel-closed-pr-runs.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const repo = "fixture/repository";
const sha = "a".repeat(40);
const context = {
  prNumber: 42,
  headRef: "fix/fixture",
  headRepo: repo,
  headSha: sha,
  selfRunId: 999,
  allowUnlinkedFallback: true,
};
const run = (overrides = {}) => ({
  id: 101,
  name: "fixture",
  status: "queued",
  event: "pull_request",
  head_branch: context.headRef,
  head_sha: sha,
  head_repository: { full_name: repo },
  pull_requests: [],
  ...overrides,
});

for (const [name, candidate, ctx] of [
  ["unlinked different SHA", run({ head_sha: "b".repeat(40) }), context],
  ["link to another PR", run({ pull_requests: [{ number: 7 }] }), context],
  ["ambiguous PR links", run({ pull_requests: [{ number: 42 }, { number: 7 }] }), context],
  ["malformed PR link", run({ pull_requests: [{ number: "42" }] }), context],
  [
    "linked foreign repository",
    run({ head_repository: { full_name: "other/repository" }, pull_requests: [{ number: 42 }] }),
    context,
  ],
  [
    "linked foreign ref",
    run({ head_branch: "fix/other", pull_requests: [{ number: 42 }] }),
    context,
  ],
  ["invalid run ID", run({ id: "101" }), context],
  ["unproved fallback ownership", run(), { ...context, allowUnlinkedFallback: false }],
]) {
  test(`preserves ${name}`, () => assert.deepEqual(selectRunsToCancel([candidate], ctx), []));
}

test("an explicitly linked older head of the same PR remains eligible", () => {
  assert.deepEqual(
    selectRunsToCancel(
      [run({ head_sha: "b".repeat(40), pull_requests: [{ number: 42 }] })],
      context
    ).map((entry) => entry.id),
    [101]
  );
});

// The real CLI runs with an entirely synthetic fetch. No HTTP implementation,
// credentials, repository or workflow run outside this fixture is reachable.
function observe(t, scenario) {
  const artifacts = join(root, "_artifacts");
  mkdirSync(artifacts, { recursive: true });
  const directory = mkdtempSync(join(artifacts, "cancel-ownership-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  mkdirSync(join(directory, "scripts/ad-hoc"), { recursive: true });
  const trace = join(directory, "requests.jsonl");
  const preload = join(directory, "scripts/ad-hoc/transport.mjs");
  writeFileSync(
    preload,
    `
    import { appendFileSync } from "node:fs";
    const scenario = ${JSON.stringify(scenario)};
    const repo = ${JSON.stringify(repo)};
    const sha = ${JSON.stringify(sha)};
    let elapsed = 0, discovered = false, requested = false, forced = false, runReads = 0, readbacks = 0;
    Date.now = () => 1804201200000 + elapsed;
    const run = (extra = {}) => ({
      id: 101, name: "fixture", status: "queued", event: "pull_request",
      head_branch: "fix/fixture", head_sha: sha, head_repository: { full_name: repo },
      pull_requests: [{ number: 42 }], ...extra,
    });
    const pr = (extra = {}) => ({ number: 42, state: "closed", base: { repo: { full_name: repo } },
      head: { ref: "fix/fixture", sha, repo: { full_name: repo } }, ...extra });
    const json = (body, status = 200) => new Response(JSON.stringify(body), {
      status, headers: { "content-type": "application/json" },
    });
    globalThis.fetch = async (value, init = {}) => {
      const url = new URL(value);
      if(url.origin !== "https://cancel-fixture.invalid") throw new Error("unexpected fixture origin");
      const method = init.method || "GET";
      elapsed += 10;
      appendFileSync(${JSON.stringify(trace)}, JSON.stringify({ method, path: url.pathname + url.search, hasSignal: init.signal instanceof AbortSignal }) + "\\n");
      if(init.signal?.aborted) throw new DOMException("fixture deadline", "AbortError");
      if(method === "GET" && url.pathname === "/repos/" + repo + "/pulls/42") {
        if(scenario === "reopened" || (scenario === "reopen-after-discovery" && discovered) || (scenario === "reopen-before-force" && requested) || (scenario === "reopen-during-normal-check" && discovered && runReads > 0)) return json(pr({state: "open"}));
        if(scenario === "foreign-pr-number") return json(pr({number: 99}));
        if(scenario === "event-sha-mismatch") return json(pr({head: {ref: "fix/fixture", sha: "b".repeat(40), repo: {full_name: repo}}}));
        return json(pr());
      }
      if(method === "GET" && url.pathname === "/repos/" + repo + "/pulls") {
        if(scenario === "reused-open-head" || (scenario === "fallback-reused-before-force" && requested)) return json([pr({number: 88, state: "open"})]);
        if(scenario === "incomplete-open-prs") return json(Array.from({length: 100}, (_, index) => pr({number: 1000 + index, state: "open", head: {ref: "other-" + index, sha, repo: {full_name: repo}}})));
        return json([]);
      }
      if(method === "GET" && url.pathname === "/repos/" + repo + "/actions/runs") {
        discovered = true;
        if(scenario === "missing-runs") return json({total_count: 0});
        if(scenario === "incomplete-runs") {
          const page = Number(url.searchParams.get("page"));
          return json({total_count: 501, workflow_runs: Array.from({length: 100}, (_, index) => run({id: page * 1000 + index}))});
        }
        const unlinked = ["reused-open-head", "incomplete-open-prs", "fallback-reused-before-force", "unlinked-terminal"].includes(scenario);
        return json({total_count: scenario === "short-run-page" ? 2 : 1, workflow_runs: [run({pull_requests: unlinked ? [] : [{number: 42}]})]});
      }
      if(method === "GET" && url.pathname === "/repos/" + repo + "/actions/runs/101") {
        runReads++;
        if(requested) readbacks++;
        if(scenario === "run-changed-at-force-refresh" && readbacks >= 2) return json(run({head_branch: "fix/other"}));
        if(scenario === "run-changed-before-normal") return json(run({head_branch: "fix/other"}));
        if(scenario === "wrong-readback-id" && requested) return json(run({id: 202, status: "completed", conclusion: "cancelled"}));
        if(scenario === "run-changed-before-force" && requested) return json(run({head_repository: {full_name: "other/repository"}}));
        if(scenario === "accepted-active" && requested) elapsed += 1000;
        const terminal = (requested && ["terminal-after-accepted", "conflict-terminal", "unlinked-terminal"].includes(scenario)) || (forced && ["force-terminal", "force-conflict-terminal"].includes(scenario));
        return json(run({...(["fallback-reused-before-force", "unlinked-terminal"].includes(scenario) ? {pull_requests: []} : {}), ...(terminal ? {status: "completed", conclusion: "cancelled"} : {})}));
      }
      if(method === "POST") {
        if(["reopened", "foreign-pr-number", "event-sha-mismatch", "reopen-after-discovery", "reopen-during-normal-check", "reused-open-head", "incomplete-runs", "short-run-page", "incomplete-open-prs", "run-changed-before-normal", "deadline-expired"].includes(scenario)) throw new Error("unexpected mutation attempt recorded by fixture");
        if(url.pathname.endsWith("/cancel")) {
          requested = true;
          return json({}, scenario === "cancel-error" ? 403 : ["conflict-terminal", "reopen-before-force", "run-changed-before-force"].includes(scenario) ? 409 : 202);
        }
        if(url.pathname.endsWith("/force-cancel")) { forced = true; return json({}, scenario === "force-conflict-terminal" ? 409 : 202); }
      }
      throw new Error("unexpected synthetic request");
    };
  `
  );
  const result = spawnSync(
    process.execPath,
    ["--import", preload, join(root, "scripts/ci/cancel-closed-pr-runs.mjs")],
    {
      cwd: directory,
      env: {
        GH_TOKEN: "fixture-token",
        GITHUB_API_URL: "https://cancel-fixture.invalid",
        REPO: repo,
        PR_NUMBER: "42",
        HEAD_REF: context.headRef,
        HEAD_REPO: repo,
        HEAD_SHA: sha,
        SELF_RUN_ID: "999",
        CANCEL_DEADLINE_MS: scenario === "deadline-expired" ? "0" : "4000",
        CANCEL_NORMAL_GRACE_MS: "0",
        CANCEL_POLL_INTERVAL_MS: "0",
      },
      encoding: "utf8",
      timeout: 10000,
      maxBuffer: 2 * 1024 * 1024,
    }
  );
  assert.equal(result.error, undefined);
  const calls = existsSync(trace)
    ? readFileSync(trace, "utf8")
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((line) => JSON.parse(line))
    : [];
  return { ...result, calls, posts: calls.filter((entry) => entry.method === "POST") };
}

for (const scenario of [
  "reopened",
  "foreign-pr-number",
  "event-sha-mismatch",
  "reopen-after-discovery",
  "reused-open-head",
  "incomplete-runs",
  "short-run-page",
  "incomplete-open-prs",
  "run-changed-before-normal",
  "reopen-during-normal-check",
]) {
  test(`${scenario} preserves every run before a write`, (t) => {
    const result = observe(t, scenario);
    assert.deepEqual(result.posts, [], result.stderr);
  });
}

for (const scenario of ["missing-runs", "accepted-active", "cancel-error", "wrong-readback-id"]) {
  test(`${scenario} cannot report a completed cleanup`, (t) => {
    const result = observe(t, scenario);
    assert.notEqual(result.status, 0, result.stdout);
    assert.doesNotMatch(result.stdout, /1\/1 run\(s\) cancelled|terminal-confirmed 101/);
  });
}

for (const scenario of [
  "reopen-before-force",
  "run-changed-before-force",
  "run-changed-at-force-refresh",
  "fallback-reused-before-force",
]) {
  test(`${scenario} prohibits force-cancel`, (t) => {
    const result = observe(t, scenario);
    assert.notEqual(result.status, 0, result.stdout);
    assert.ok(!result.posts.some((entry) => entry.path.endsWith("/force-cancel")));
  });
}

for (const scenario of ["terminal-after-accepted", "conflict-terminal", "unlinked-terminal"]) {
  test(`${scenario} needs same-ID readback and no unnecessary force`, (t) => {
    const result = observe(t, scenario);
    assert.equal(result.status, 0, result.stderr);
    const postIndex = result.calls.findIndex((entry) => entry.method === "POST");
    assert.ok(postIndex >= 0);
    assert.ok(
      result.calls
        .slice(postIndex + 1)
        .some((entry) => entry.method === "GET" && entry.path.endsWith("/actions/runs/101"))
    );
    assert.ok(result.calls.every((entry) => entry.hasSignal));
    assert.ok(!result.posts.some((entry) => entry.path.endsWith("/force-cancel")));
    assert.match(result.stdout, /terminal-confirmed/);
  });
}

test("an exhausted global deadline prevents even the first API request", (t) => {
  const result = observe(t, "deadline-expired");
  assert.notEqual(result.status, 0);
  assert.deepEqual(result.calls, []);
});

test("the closed-PR workflow supplies identity with only the required writes", () => {
  const workflow = parseYaml(
    readFileSync(join(root, ".github/workflows/cancel-closed-pr-runs.yml"), "utf8")
  );
  assert.deepEqual(workflow.on.pull_request.types, ["closed"]);
  assert.equal(workflow.on.pull_request_target, undefined);
  const job = workflow.jobs.cancel;
  assert.equal(job.if, "github.event.pull_request.head.repo.full_name == github.repository");
  assert.deepEqual(job.permissions, {
    contents: "read",
    actions: "write",
    "pull-requests": "read",
  });
  const checkout = job.steps.find((entry) => String(entry.uses).startsWith("actions/checkout@"));
  assert.equal(checkout.with.ref, "${{ github.event.repository.default_branch }}");
  assert.equal(checkout.with["persist-credentials"], false);
  assert.equal(checkout.with["sparse-checkout"], "scripts/ci/cancel-closed-pr-runs.mjs");
  const command = job.steps.find(
    (entry) => entry.run === "node scripts/ci/cancel-closed-pr-runs.mjs"
  );
  assert.equal(command.env.HEAD_SHA, "${{ github.event.pull_request.head.sha }}");
});

for (const scenario of ["force-terminal", "force-conflict-terminal"]) {
  test(scenario + " confirms the same run after the force request", (t) => {
    const result = observe(t, scenario);
    assert.equal(result.status, 0, result.stderr);
    const forceIndex = result.calls.findIndex(
      (entry) => entry.method === "POST" && entry.path.endsWith("/force-cancel")
    );
    assert.ok(forceIndex >= 0, "the fixture must reach the force path");
    assert.ok(
      result.calls
        .slice(0, forceIndex)
        .some((entry) => entry.method === "POST" && entry.path.endsWith("/cancel"))
    );
    assert.ok(
      result.calls
        .slice(forceIndex + 1)
        .some((entry) => entry.method === "GET" && entry.path.endsWith("/actions/runs/101"))
    );
    assert.ok(result.calls.every((entry) => entry.hasSignal));
    assert.match(result.stdout, /terminal-confirmed 101/);
  });
}
