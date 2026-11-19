#!/usr/bin/env node
// Estimate docker-publish usage for runner selection. This is not an atomic spending cap:
// runs created this UTC month are counted, the current run is excluded, and concurrent or
// future work does not reserve minutes. Unknown collection selects the hosted runner.
// Existing weights, rounding and the explicit Blacksmith opt-in remain unchanged.
// No npm dependencies: runs on a bare runner with only the workflow token.

import { appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const WORKFLOWS = ["docker-publish.yml"];
const PAGE_SIZE = 100;
const MAX_PAGES = 10;
const MAX_REQUESTS = 128;
const COLLECTION_TIMEOUT_MS = 30_000;

/** Estimate one assigned job using the existing 2-vCPU weights and per-job rounding. */
export function jobMinutes(job, now = Date.now()) {
  // started_at may already be set while queued; no assigned runner means no runner time.
  if (job?.runner_name == null || job.runner_name === "") return 0;
  if (
    typeof job.runner_name !== "string" ||
    !Array.isArray(job.labels) ||
    job.labels.length === 0 ||
    job.labels.some((label) => typeof label !== "string")
  ) {
    throw new Error("BUDGET_INVALID_JOB_METADATA");
  }
  const label = [job.runner_name, ...job.labels].find((value) =>
    /^blacksmith-\d+vcpu(?:-|$)/.test(value)
  );
  if (!label) {
    if ([job.runner_name, ...job.labels].some((value) => /^blacksmith-/i.test(value))) {
      throw new Error("BUDGET_UNKNOWN_RUNNER_CLASS");
    }
    return 0;
  }
  const vcpu = Number(label.match(/^blacksmith-(\d+)vcpu/)[1]);
  const start = typeof job.started_at === "string" ? Date.parse(job.started_at) : NaN;
  const end =
    job.completed_at == null
      ? now
      : typeof job.completed_at === "string"
        ? Date.parse(job.completed_at)
        : NaN;
  if (
    !Number.isSafeInteger(vcpu) ||
    vcpu <= 0 ||
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    end < start
  ) {
    throw new Error("BUDGET_INVALID_JOB_TIME");
  }
  const minutes = Math.ceil((end - start) / 60000);
  const arm = /-arm(\b|-)/.test(label) ? 0.625 : 1;
  return minutes * (vcpu / 2) * arm;
}

/** Cancelled runs may contain completed or partially executed jobs. */
export function runsToCount(runs, { selfRunId }) {
  return runs.filter((run) => run.id !== selfRunId);
}

/** Pure: only a finite, complete estimate below a valid cap enables the opt-in. */
export function decide({ want, used, cap }) {
  return (
    want === "blacksmith" &&
    Number.isFinite(used) &&
    used >= 0 &&
    Number.isFinite(cap) &&
    cap > 0 &&
    used < cap
  );
}

export function monthStart(now = new Date()) {
  return now.getUTCFullYear() + "-" + String(now.getUTCMonth() + 1).padStart(2, "0") + "-01";
}

async function gh(path, { token, api, signal }) {
  const response = await fetch(api + path, {
    signal,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + token,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!response.ok) throw new Error("BUDGET_API_ERROR");
  return {
    body: await response.json(),
    hasNext: /(?:^|;)\s*rel="next"/.test(response.headers.get("link") ?? ""),
  };
}

// An exact total, stable across pages, plus unique IDs and coherent page lengths
// is required. The Actions filtered-run API's 1,000-result boundary is ambiguous.
async function collectPages(path, key, request, { filteredRuns = false } = {}) {
  const rows = [];
  const ids = new Set();
  let expected;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const separator = path.includes("?") ? "&" : "?";
    const { body, hasNext } = await request(
      path + separator + "per_page=" + PAGE_SIZE + "&page=" + page
    );
    const count = body?.total_count;
    const items = body?.[key];
    if (
      !Number.isSafeInteger(count) ||
      count < 0 ||
      count > PAGE_SIZE * MAX_PAGES ||
      (filteredRuns && count >= 1000) ||
      (expected !== undefined && count !== expected) ||
      !Array.isArray(items)
    ) {
      throw new Error("BUDGET_INCOMPLETE_LIST");
    }
    expected = count;
    if (items.length !== Math.min(PAGE_SIZE, expected - rows.length)) {
      throw new Error("BUDGET_INCOMPLETE_PAGE");
    }
    for (const item of items) {
      if (!Number.isSafeInteger(item?.id) || item.id <= 0 || ids.has(item.id)) {
        throw new Error("BUDGET_AMBIGUOUS_ID");
      }
      ids.add(item.id);
      rows.push(item);
    }
    if (rows.length === expected) {
      if (hasNext) throw new Error("BUDGET_UNEXPECTED_NEXT_PAGE");
      return rows;
    }
  }
  throw new Error("BUDGET_PAGE_LIMIT");
}

async function usedMinutes({ repo, token, api, selfRunId }) {
  if (
    !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repo ?? "") ||
    !token ||
    !Number.isSafeInteger(selfRunId) ||
    selfRunId <= 0
  ) {
    throw new Error("BUDGET_INVALID_CONTEXT");
  }
  const now = Date.now();
  const deadlineAt = now + COLLECTION_TIMEOUT_MS;
  const signal = AbortSignal.timeout(COLLECTION_TIMEOUT_MS);
  let requests = 0;
  const ensureBudget = () => {
    if (signal.aborted || Date.now() >= deadlineAt) {
      throw new Error("BUDGET_COLLECTION_DEADLINE");
    }
  };
  const request = async (path) => {
    ensureBudget();
    if (requests >= MAX_REQUESTS) throw new Error("BUDGET_REQUEST_LIMIT");
    requests++;
    const result = await gh(path, { token, api, signal });
    ensureBudget();
    return result;
  };
  let total = 0;
  for (const workflow of WORKFLOWS) {
    const query = new URLSearchParams({ created: ">=" + monthStart(new Date(now)) });
    const runs = await collectPages(
      "/repos/" + repo + "/actions/workflows/" + workflow + "/runs?" + query,
      "workflow_runs",
      request,
      { filteredRuns: true }
    );
    for (const run of runsToCount(runs, { selfRunId })) {
      const jobs = await collectPages(
        "/repos/" + repo + "/actions/runs/" + run.id + "/jobs?filter=all",
        "jobs",
        request
      );
      for (const job of jobs) {
        ensureBudget();
        if (
          !Array.isArray(job.labels) ||
          job.labels.some((label) => typeof label !== "string") ||
          (job.runner_name != null && typeof job.runner_name !== "string")
        ) {
          throw new Error("BUDGET_INVALID_JOB_METADATA");
        }
        const minutes = jobMinutes(job, now);
        if (!Number.isFinite(minutes) || minutes < 0) throw new Error("BUDGET_INVALID_JOB");
        total += minutes;
        if (!Number.isFinite(total)) throw new Error("BUDGET_INVALID_TOTAL");
      }
    }
  }
  ensureBudget();
  return total;
}

function output(line) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, line + "\n");
  console.log(line);
}

async function main() {
  const env = process.env;
  const want = env.WANT ?? "";
  const cap = Number(env.CAP || 2500);
  if (want !== "blacksmith" || !Number.isFinite(cap) || cap <= 0) {
    output("blacksmith=false");
    return;
  }
  let used;
  try {
    used = await usedMinutes({
      repo: env.REPO,
      token: env.GH_TOKEN,
      api: env.GITHUB_API_URL || "https://api.github.com",
      selfRunId: Number(env.SELF_RUN_ID),
    });
  } catch (error) {
    const reason = /^BUDGET_[A-Z_]+$/.test(error?.message ?? "")
      ? error.message
      : "BUDGET_COLLECTION_FAILED";
    console.log("::warning::Blacksmith budget unknown (" + reason + "); building on hosted.");
    output("blacksmith=false");
    return;
  }
  const ok = decide({ want, used, cap });
  output("blacksmith=" + ok);
  output("blacksmith_minutes=" + used);
  const verdict = ok ? "Blacksmith" : "hosted (cap reached)";
  const line = "Estimated Blacksmith minutes this month: " + used + " of " + cap + " → " + verdict;
  console.log(line);
  if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, line + "\n");
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await main();
}
