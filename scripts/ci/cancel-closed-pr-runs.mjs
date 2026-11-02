#!/usr/bin/env node
// Cancel the workflow runs a pull request still has queued or running once it is closed
// (merged or not). `concurrency: <workflow>-<ref>` + cancel-in-progress only supersedes a
// run when a newer one starts on the same ref, and a closed PR never gets one, so its
// runs sat in the hosted-runner queue for hours: 34 of 229 queued PR runs on 2026-10-26
// belonged to closed PRs or superseded heads, against the org's 20-job concurrency cap.
// No npm dependencies: runs on a bare hosted runner with only the workflow token.

import { pathToFileURL } from "node:url";

const ACTIVE = new Set(["queued", "in_progress", "waiting", "pending", "requested"]);
const PR_EVENTS = new Set(["pull_request", "pull_request_target"]);

/**
 * Pick the runs to cancel for a closed PR. Pure: no I/O.
 * A run belongs to the PR when GitHub links it by number, or when it is a PR-event run of
 * the same head branch from the same repository (fork heads share branch names freely, so
 * a fork run is only taken when GitHub links it by number).
 */
export function selectRunsToCancel(runs, { prNumber, headRef, headRepo, selfRunId }) {
  return runs.filter((run) => {
    if (!run || run.id === selfRunId) return false;
    if (!ACTIVE.has(run.status) || !PR_EVENTS.has(run.event)) return false;
    const linked = (run.pull_requests ?? []).some((pr) => pr?.number === prNumber);
    const sameBranch = run.head_branch === headRef && run.head_repository?.full_name === headRepo;
    return linked || sameBranch;
  });
}

async function gh(path, { method = "GET", token, api }) {
  const res = await fetch(`${api}${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return res;
}

async function main() {
  const env = process.env;
  const repo = env.REPO;
  const token = env.GH_TOKEN;
  const api = env.GITHUB_API_URL || "https://api.github.com";
  const prNumber = Number(env.PR_NUMBER);
  const selfRunId = Number(env.SELF_RUN_ID);
  const headRef = env.HEAD_REF;
  const headRepo = env.HEAD_REPO;
  if (!repo || !token || !Number.isSafeInteger(prNumber) || !headRef) {
    console.error("cancel-closed-pr-runs: missing REPO, GH_TOKEN, PR_NUMBER or HEAD_REF");
    process.exit(2);
  }

  const runs = [];
  for (let page = 1; page <= 5; page++) {
    const q = new URLSearchParams({ branch: headRef, per_page: "100", page: String(page) });
    const res = await gh(`/repos/${repo}/actions/runs?${q}`, { token, api });
    if (!res.ok) {
      console.error(`cancel-closed-pr-runs: listing runs failed with HTTP ${res.status}`);
      process.exit(1);
    }
    const body = await res.json();
    runs.push(...(body.workflow_runs ?? []));
    if ((body.workflow_runs ?? []).length < 100) break;
  }

  const targets = selectRunsToCancel(runs, { prNumber, headRef, headRepo, selfRunId });
  let cancelled = 0;
  for (const run of targets) {
    let res = await gh(`/repos/${repo}/actions/runs/${run.id}/cancel`, {
      method: "POST",
      token,
      api,
    });
    // 409 = the run cannot be cancelled normally (e.g. an always() job stuck in queue).
    if (res.status === 409) {
      res = await gh(`/repos/${repo}/actions/runs/${run.id}/force-cancel`, {
        method: "POST",
        token,
        api,
      });
    }
    const ok = res.status === 202;
    if (ok) cancelled++;
    console.log(`${ok ? "cancelled" : `skip(${res.status})`} ${run.id} ${run.name} ${run.status}`);
  }
  console.log(
    `cancel-closed-pr-runs: PR #${prNumber} — ${cancelled}/${targets.length} run(s) cancelled`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((err) => {
    console.error(`cancel-closed-pr-runs: ${err?.message ?? err}`);
    process.exit(1);
  });
}
