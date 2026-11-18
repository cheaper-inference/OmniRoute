import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { decide } from "../../scripts/ci/blacksmith-budget.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));

// Exercise the unchanged public CLI, not a not-yet-exported collector. fetch never
// reaches a network; records retain synthetic URL/method/signal metadata only.
function observe(t, scenario, { want = "blacksmith", cap = "2500" } = {}) {
  const artifacts = join(root, "_artifacts");
  mkdirSync(artifacts, { recursive: true });
  const directory = mkdtempSync(join(artifacts, "budget-completeness-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  mkdirSync(join(directory, "scripts/ad-hoc"), { recursive: true });
  const trace = join(directory, "requests.jsonl");
  const output = join(directory, "github-output.txt");
  const preload = join(directory, "scripts/ad-hoc/transport.mjs");
  writeFileSync(
    preload,
    `
    import { appendFileSync } from "node:fs";
    const scenario = ${JSON.stringify(scenario)};
    const now = Date.UTC(2026, 10, 3, 23);
    Date.now = () => now;
    if(scenario === "expired-deadline") AbortSignal.timeout = () => AbortSignal.abort();
    const run = (id, conclusion = "success") => ({id, status: "completed", conclusion});
    const job = (id, minutes = 0) => ({
      id, runner_name: "blacksmith-2vcpu-ubuntu-2404-fixture", labels: ["blacksmith-2vcpu-ubuntu-2404"],
      started_at: new Date(now - minutes * 60000).toISOString(), completed_at: new Date(now).toISOString(),
    });
    const json = (key, rows, total = rows.length, headers = {}) => new Response(JSON.stringify({total_count: total, [key]: rows}), {
      status: 200, headers: {"content-type": "application/json", ...headers},
    });
    globalThis.fetch = async (value, init = {}) => {
      const url = new URL(value);
      if(url.origin !== "https://budget-fixture.invalid") throw new Error("unexpected fixture origin");
      appendFileSync(${JSON.stringify(trace)}, JSON.stringify({path: url.pathname + url.search, method: init.method || "GET", hasSignal: init.signal instanceof AbortSignal}) + "\\n");
      if(init.signal?.aborted) throw new DOMException("fixture deadline", "AbortError");
      const page = Number(url.searchParams.get("page")) || 1;
      if(url.pathname.endsWith("/runs")) {
        if(scenario === "api-error") return new Response("{}", {status: 403});
        if(scenario === "missing-runs") return new Response(JSON.stringify({total_count: 0}));
        if(["complete-empty", "expired-deadline"].includes(scenario)) return json("workflow_runs", []);
        if(scenario === "contradictory-next") return json("workflow_runs", [], 0, {link: '<https://budget-fixture.invalid/next>; rel="next"'});
        if(scenario === "current-run") return json("workflow_runs", [run(999)]);
        if(scenario === "saturated-runs") return json("workflow_runs", Array.from({length: 100}, (_, i) => run((page - 1) * 100 + i + 1)), 1000);
        if(scenario === "request-ceiling") return json("workflow_runs", Array.from({length: page === 1 ? 100 : 29}, (_, i) => run((page - 1) * 100 + i + 1)), 129);
        const cancelled = ["cancelled-spend", "unstarted-cancelled"].includes(scenario);
        return json("workflow_runs", [run(1, cancelled ? "cancelled" : "success")], scenario === "short-runs" ? 2 : 1);
      }
      if(url.pathname.endsWith("/jobs")) {
        if(["saturated-runs", "request-ceiling"].includes(scenario)) return json("jobs", []);
        if(scenario === "missing-jobs") return new Response(JSON.stringify({total_count: 0}));
        if(scenario === "cancelled-spend") return json("jobs", [job(11, 2600)]);
        if(scenario === "unstarted-cancelled") return json("jobs", [{...job(11), runner_name: "", started_at: null, completed_at: null}]);
        if(scenario === "missing-classification") return json("jobs", [{id: 11, runner_name: "unclassified", started_at: new Date(now).toISOString(), completed_at: new Date(now).toISOString()}]);
        if(scenario === "backwards-time") return json("jobs", [{...job(11), started_at: new Date(now + 60000).toISOString()}]);
        if(scenario === "duplicate-jobs") return json("jobs", [job(11), job(11)]);
        if(scenario === "exact-full-page") return json("jobs", Array.from({length: 100}, (_, i) => job(i + 1, 1)));
        if(["jobs-page-two", "later-page-error", "drifting-total", "jobs-page-ceiling"].includes(scenario)) {
          if(page === 1) return json("jobs", Array.from({length: 100}, (_, i) => job(i + 1)), scenario === "jobs-page-ceiling" ? 1001 : 101);
          if(scenario === "later-page-error") return new Response("{}", {status: 403});
          return json("jobs", [job(101, 2600)], scenario === "drifting-total" ? 102 : 101);
        }
        return json("jobs", [job(11, 42)]);
      }
      throw new Error("unexpected synthetic request");
    };
  `
  );
  const result = spawnSync(
    process.execPath,
    ["--import", preload, join(root, "scripts/ci/blacksmith-budget.mjs")],
    {
      cwd: directory,
      env: {
        WANT: want,
        CAP: cap,
        REPO: "fixture/repository",
        GH_TOKEN: "fixture-token",
        SELF_RUN_ID: "999",
        GITHUB_API_URL: "https://budget-fixture.invalid",
        GITHUB_OUTPUT: output,
      },
      encoding: "utf8",
      timeout: 10000,
      maxBuffer: 2 * 1024 * 1024,
    }
  );
  assert.equal(result.error, undefined);
  assert.equal(result.status, 0, result.stderr);
  const outputs = Object.fromEntries(
    readFileSync(output, "utf8")
      .trim()
      .split("\n")
      .map((line) => line.split("="))
  );
  const calls = existsSync(trace)
    ? readFileSync(trace, "utf8")
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((line) => JSON.parse(line))
    : [];
  return { ...result, outputs, calls };
}

for (const scenario of ["cancelled-spend", "jobs-page-two"]) {
  test(`${scenario} contributes before selecting a runner`, (t) => {
    const result = observe(t, scenario);
    assert.equal(result.outputs.blacksmith, "false");
    assert.equal(result.outputs.blacksmith_minutes, "2600");
    assert.ok(result.calls.some((entry) => entry.path.includes("/jobs?")));
    if (scenario === "jobs-page-two")
      assert.ok(result.calls.some((entry) => entry.path.includes("page=2")));
  });
}

for (const scenario of [
  "missing-runs",
  "missing-jobs",
  "short-runs",
  "duplicate-jobs",
  "missing-classification",
  "backwards-time",
  "later-page-error",
  "drifting-total",
  "contradictory-next",
  "jobs-page-ceiling",
  "saturated-runs",
  "request-ceiling",
  "expired-deadline",
  "api-error",
]) {
  test(`${scenario} selects hosted without certifying a partial estimate`, (t) => {
    const result = observe(t, scenario);
    assert.equal(result.outputs.blacksmith, "false", result.stdout);
    assert.equal(result.outputs.blacksmith_minutes, undefined);
    assert.ok(result.calls.length <= 128, "collection has a finite aggregate request budget");
    if (scenario === "expired-deadline") assert.equal(result.calls.length, 0);
  });
}

for (const [scenario, minutes, requests] of [
  ["complete-empty", "0", 1],
  ["complete-under-cap", "42", 2],
  ["exact-full-page", "100", 2],
  ["current-run", "0", 1],
  ["unstarted-cancelled", "0", 2],
]) {
  test(`${scenario} preserves the bounded, opted-in estimate`, (t) => {
    const result = observe(t, scenario);
    assert.equal(result.outputs.blacksmith, "true", result.stdout);
    assert.equal(result.outputs.blacksmith_minutes, minutes);
    assert.equal(result.calls.length, requests);
  });
}

test("every collection request carries an abort signal", (t) => {
  const result = observe(t, "complete-under-cap");
  assert.equal(result.calls.length, 2);
  assert.ok(result.calls.every((entry) => entry.hasSignal));
});

test("without Blacksmith opt-in the CLI performs no API requests", (t) => {
  const result = observe(t, "complete-empty", { want: "hosted" });
  assert.equal(result.outputs.blacksmith, "false");
  assert.equal(result.calls.length, 0);
});

test("invalid estimates or caps cannot authorize Blacksmith", () => {
  for (const used of [NaN, Infinity, -1])
    assert.equal(decide({ want: "blacksmith", used, cap: 2500 }), false);
  for (const cap of [NaN, Infinity, 0, -1])
    assert.equal(decide({ want: "blacksmith", used: 0, cap }), false);
});
