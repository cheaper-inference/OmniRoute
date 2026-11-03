#!/usr/bin/env node
// Keep docker-publish inside Blacksmith's free tier. The free allowance is 3,000 x64 2-vCPU
// minutes a month per org; a 4 vCPU minute counts as two, and past the allowance the runners
// keep running and are invoiced (docs.blacksmith.sh/codesmith/pricing-and-faqs). A publish
// costs ~90 of those minutes (amd64 build ~45 min on 4 vCPU, prepare + merge on 2 vCPU), so
// at ~54 publishes a month the allowance runs out mid-month.
//
// This sums the Blacksmith minutes docker-publish used since the 1st (UTC) from the jobs' own
// timestamps and prints `blacksmith=true` while that stays under the cap, `false` otherwise,
// so the build moves to the hosted runner for the rest of the month. Only docker-publish runs
// on Blacksmith today; another workflow moved there must be added to WORKFLOWS.
// No npm dependencies: runs on a bare runner with only the workflow token.

import { appendFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const WORKFLOWS = ["docker-publish.yml"];
const COUNTED = new Set(["success", "failure", "timed_out", null]);

/**
 * Free-tier minutes one job used. Pure: no I/O.
 * Blacksmith bills x64 by the 2-vCPU minute and ARM at 0.625 of it; a job's minutes are
 * rounded up, as runner minutes are.
 */
export function jobMinutes(job, now = Date.now()) {
  const label = [job?.runner_name ?? "", ...(job?.labels ?? [])].find((l) =>
    /^blacksmith-\d+vcpu/.test(l)
  );
  if (!label || !job.started_at) return 0;
  const vcpu = Number(label.match(/^blacksmith-(\d+)vcpu/)[1]);
  const end = job.completed_at ? Date.parse(job.completed_at) : now;
  const minutes = Math.max(0, Math.ceil((end - Date.parse(job.started_at)) / 60000));
  const arm = /-arm(\b|-)/.test(label) ? 0.625 : 1;
  return minutes * (vcpu / 2) * arm;
}

/**
 * Runs whose jobs are worth fetching. Pure: no I/O.
 * Cancelled runs are skipped: on release pushes they are replaced while still pending
 * (dozens a day) and never start a job; a mid-build cancellation is a manual, rare event.
 */
export function runsToCount(runs, { selfRunId }) {
  return runs.filter(
    (run) =>
      run?.id !== selfRunId && (run.status !== "completed" || COUNTED.has(run.conclusion ?? null))
  );
}

/** Pure: the decision for this publish. */
export function decide({ want, used, cap }) {
  return want === "blacksmith" && used < cap;
}

export function monthStart(now = new Date()) {
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-01`;
}

async function gh(path, { token, api }) {
  const res = await fetch(`${api}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!res.ok) throw new Error(`GET ${path}: HTTP ${res.status}`);
  return res.json();
}

async function usedMinutes({ repo, token, api, selfRunId }) {
  let total = 0;
  for (const workflow of WORKFLOWS) {
    const runs = [];
    for (let page = 1; page <= 10; page++) {
      const q = new URLSearchParams({
        created: `>=${monthStart()}`,
        per_page: "100",
        page: String(page),
      });
      const body = await gh(`/repos/${repo}/actions/workflows/${workflow}/runs?${q}`, {
        token,
        api,
      });
      runs.push(...(body.workflow_runs ?? []));
      if ((body.workflow_runs ?? []).length < 100) break;
    }
    for (const run of runsToCount(runs, { selfRunId })) {
      const body = await gh(`/repos/${repo}/actions/runs/${run.id}/jobs?filter=all&per_page=100`, {
        token,
        api,
      });
      for (const job of body.jobs ?? []) total += jobMinutes(job);
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
    // Unknown spend: stay on the free hosted runner rather than risk an invoice.
    console.log(`::warning::Blacksmith budget unknown (${err.message}); building on hosted.`);
    output("blacksmith=false");
    return;
  }
  const ok = decide({ want, used, cap });
  output(`blacksmith=${ok}`);
  output(`blacksmith_minutes=${used}`);
  const verdict = ok ? "Blacksmith" : "hosted (cap reached)";
  const line = `Blacksmith minutes this month: ${used} of ${cap} → ${verdict}`;
  console.log(line);
  if (env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY, `${line}\n`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  await main();
}
