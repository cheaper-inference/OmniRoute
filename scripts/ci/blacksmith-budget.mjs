#!/usr/bin/env node
// Estimate docker-publish usage for runner selection, not a financial spending cap.
// Existing weights and the configured monthly threshold are unchanged. The estimate
// covers this workflow's runs created in the UTC month, excludes the current run,
// and cannot reserve capacity for concurrent or future jobs. Unknown collection
// results select hosted; pagination completeness does not establish billing accuracy.
// No npm dependencies: runs on a bare runner with only the workflow token.

import { appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const WORKFLOWS = ["docker-publish.yml"];
const PAGE_SIZE = 100;
const MAX_PAGES = 10;
const MAX_REQUESTS = 128;
const COLLECTION_TIMEOUT_MS = 30_000;

/**
 * Free-tier minutes one job used. Pure: no I/O.
 * Blacksmith bills x64 by the 2-vCPU minute and ARM at 0.625 of it; a job's minutes are
 * rounded up, as runner minutes are.
 */
export function jobMinutes(job, now = Date.now()) {
  const label = [job?.runner_name ?? "", ...(job?.labels ?? [])].find((l) =>
    /^blacksmith-\d+vcpu/.test(l)
  );
  // GitHub fills started_at while a job still waits in the queue, so only a job a runner took
  // counts: run 41843820512's amd64 job sat queued for 13 h and read as 1,596 spent minutes.
  if (!label || !job.runner_name) return 0;
  if (!job.started_at) {
    if (job.completed_at) throw new Error("BUDGET_INVALID_JOB_TIME");
    return 0;
  }
  const vcpu = Number(label.match(/^blacksmith-(\d+)vcpu/)[1]);
  const end = job.completed_at ? Date.parse(job.completed_at) : now;
  const start = Date.parse(job.started_at);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) {
    throw new Error("BUDGET_INVALID_JOB_TIME");
  }
  const minutes = Math.ceil((end - start) / 60000);
  const arm = /-arm(\b|-)/.test(label) ? 0.625 : 1;
  return minutes * (vcpu / 2) * arm;
}

/** Fetch every other run: a cancelled run can already have used runner minutes. */
export function runsToCount(runs, { selfRunId }) {
  return runs.filter((run) => run.id !== selfRunId);
}

/** Pure: the decision for this publish. */
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
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-01`;
}

async function gh(path, { token, api, signal }) {
  const res = await fetch(`${api}${path}`, {
    signal,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) throw new Error("BUDGET_API_ERROR");
  return {
    body: await res.json(),
    hasNext: /(?:^|;)\s*rel="next"/.test(res.headers.get("link") ?? ""),
  };
}

// Only an exact, bounded listing establishes completeness for this estimate.
// total_count alone is insufficient: validate page lengths, IDs and the final Link.
async function collectPages(path, key, request, { searchLimit = false } = {}) {
  const rows = [];
  const ids = new Set();
  let expected;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const separator = path.includes("?") ? "&" : "?";
    const { body, hasNext } = await request(
      `${path}${separator}per_page=${PAGE_SIZE}&page=${page}`
    );
    const count = body?.total_count;
    const items = body?.[key];
    if (
      !Number.isSafeInteger(count) ||
      count < 0 ||
      !Array.isArray(items) ||
      count > PAGE_SIZE * MAX_PAGES ||
      (searchLimit && count >= 1000) ||
      (expected !== undefined && count !== expected)
    )
      throw new Error("BUDGET_INCOMPLETE_LIST");
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

export async function usedMinutes({ repo, token, api, selfRunId, now = Date.now() }) {
  if (!Number.isFinite(now)) throw new Error("BUDGET_INVALID_TIME");
  const signal = AbortSignal.timeout(COLLECTION_TIMEOUT_MS);
  let requests = 0;
  const request = (path) => {
    if (++requests > MAX_REQUESTS || signal.aborted) {
      throw new Error("BUDGET_COLLECTION_LIMIT");
    }
    return gh(path, { token, api, signal });
  };
  let total = 0;
  for (const workflow of WORKFLOWS) {
    const q = new URLSearchParams({ created: `>=${monthStart(new Date(now))}` });
    const runs = await collectPages(
      `/repos/${repo}/actions/workflows/${workflow}/runs?${q}`,
      "workflow_runs",
      request,
      { searchLimit: true }
    );
    for (const run of runsToCount(runs, { selfRunId })) {
      const jobs = await collectPages(
        `/repos/${repo}/actions/runs/${run.id}/jobs?filter=all`,
        "jobs",
        request
      );
      for (const job of jobs) {
        if (
          !Array.isArray(job.labels) ||
          job.labels.some((label) => typeof label !== "string") ||
          (job.runner_name != null && typeof job.runner_name !== "string")
        )
          throw new Error("BUDGET_INVALID_JOB_METADATA");
        const minutes = jobMinutes(job, now);
        if (!Number.isFinite(minutes) || minutes < 0) throw new Error("BUDGET_INVALID_JOB");
        total += minutes;
      }
    }
  }
  return total;
}

function output(line) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${line}\n`);
  console.log(line);
}

async function main() {
  const env = process.env;
  const want = env.WANT ?? "";
  const cap = Number(env.CAP || 2500);
  if (want !== "blacksmith") {
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
  } catch (err) {
    // Unknown usage: keep the conservative hosted fallback; this is not a billing guarantee.
    console.log(`::warning::Blacksmith budget unknown (${err.message}); building on hosted.`);
    output("blacksmith=false");
    return;
  }
  const ok = decide({ want, used, cap });
  output(`blacksmith=${ok}`);
  output(`blacksmith_minutes=${used}`);
  const verdict = ok ? "Blacksmith" : "hosted (cap reached)";
  const line = `Estimated Blacksmith minutes this month: ${used} of ${cap} → ${verdict}`;
  console.log(line);
  if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, `${line}\n`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await main();
}
