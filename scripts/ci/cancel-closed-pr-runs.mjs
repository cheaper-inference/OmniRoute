#!/usr/bin/env node
// Cancel workflow runs a pull request still has queued or running once it is closed
// (merged or not). CI and Quality intentionally use `cancel-in-progress: false`: the running
// candidate completes and GitHub retains only the newest pending candidate. Closing a PR
// creates no successor, so this API-only cleanup handles work that would otherwise remain
// active after the PR can no longer merge. No npm dependencies are required.

import { pathToFileURL } from "node:url";

const ACTIVE = new Set(["queued", "in_progress", "waiting", "pending", "requested"]);
const PR_EVENTS = new Set(["pull_request", "pull_request_target"]);

/**
 * Pick the runs to cancel for a closed PR. Pure: no I/O.
 * A run belongs to the PR when its single explicit PR link, branch and repository agree.
 * An unlinked PR-event run needs an exact repository/ref/SHA match plus a separately proven
 * absence of an open PR reusing that repository/ref.
 */
export function selectRunsToCancel(
  runs,
  { prNumber, headRef, headRepo, headSha, selfRunId, allowUnlinkedFallback }
) {
  return runs.filter((run) => {
    if (!run || !Number.isSafeInteger(run.id) || run.id === selfRunId) return false;
    if (!ACTIVE.has(run.status) || !PR_EVENTS.has(run.event)) return false;
    if (!Array.isArray(run.pull_requests)) return false;
    if (run.pull_requests.some((pr) => !Number.isSafeInteger(pr?.number))) return false;
    const linkedPrNumbers = [...new Set(run.pull_requests.map((pr) => pr.number))];
    const sameBranchAndRepo =
      run.head_branch === headRef && run.head_repository?.full_name === headRepo;
    if (linkedPrNumbers.length > 0) {
      return linkedPrNumbers.length === 1 && linkedPrNumbers[0] === prNumber && sameBranchAndRepo;
    }
    if (!allowUnlinkedFallback) return false;
    const sameHead = sameBranchAndRepo && run.head_sha === headSha;
    return sameHead;
  });
}

const PAGE_SIZE = 100;
const MAX_PAGES = 5;
const DEFAULT_DEADLINE_MS = 240_000;
const DEFAULT_NORMAL_GRACE_MS = 10_000;
const DEFAULT_POLL_INTERVAL_MS = 1_000;

function durationFromEnv(value, fallback) {
  if (value === undefined) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
}

function ensureBudget(deadlineAt) {
  const remaining = deadlineAt - Date.now();
  if (remaining <= 0) {
    throw new Error("cleanup deadline exhausted before every target reached a terminal state");
  }
  return remaining;
}

async function gh(path, { method = "GET", token, api, deadlineAt }) {
  const remaining = ensureBudget(deadlineAt);
  try {
    return await fetch(`${api}${path}`, {
      method,
      signal: AbortSignal.timeout(Math.max(1, Math.min(30_000, remaining))),
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (error) {
    if (error?.name === "TimeoutError" || error?.name === "AbortError") {
      throw new Error(`request deadline exhausted during ${method} ${path}`);
    }
    throw error;
  }
}

async function responseJson(res, label) {
  try {
    return await res.json();
  } catch {
    throw new Error(`${label} returned invalid JSON`);
  }
}

async function readPullRequest(ctx) {
  const res = await gh(`/repos/${ctx.repo}/pulls/${ctx.prNumber}`, ctx);
  if (!res.ok) {
    throw new Error(`reading PR #${ctx.prNumber} failed with HTTP ${res.status}`);
  }
  return responseJson(res, `reading PR #${ctx.prNumber}`);
}

async function confirmClosedPullRequest(ctx) {
  const pr = await readPullRequest(ctx);
  if (pr?.state === "open") return false;
  if (pr?.state !== "closed") {
    throw new Error(`PR #${ctx.prNumber} returned invalid state ${String(pr?.state)}`);
  }
  if (
    pr?.base?.repo?.full_name !== ctx.repo ||
    pr?.head?.ref !== ctx.headRef ||
    pr?.head?.sha !== ctx.headSha ||
    pr?.head?.repo?.full_name !== ctx.headRepo
  ) {
    throw new Error(`PR #${ctx.prNumber} identity no longer matches the close event`);
  }
  return true;
}

async function findCompetingOpenPullRequest(ctx) {
  const slash = ctx.headRepo.indexOf("/");
  if (slash <= 0) throw new Error(`invalid HEAD_REPO: ${ctx.headRepo}`);
  const headOwner = ctx.headRepo.slice(0, slash);
  for (let page = 1; page <= MAX_PAGES; page++) {
    const query = new URLSearchParams({
      state: "open",
      head: `${headOwner}:${ctx.headRef}`,
      per_page: String(PAGE_SIZE),
      page: String(page),
    });
    const res = await gh(`/repos/${ctx.repo}/pulls?${query}`, ctx);
    if (!res.ok) {
      throw new Error(
        `checking open PRs for ${ctx.headRepo}:${ctx.headRef} failed with HTTP ${res.status}`
      );
    }
    const openPrs = await responseJson(res, "checking open PRs");
    if (!Array.isArray(openPrs)) {
      throw new Error("checking open PRs returned an invalid response");
    }
    const hasAmbiguousMetadata = openPrs.some(
      (candidate) =>
        !Number.isSafeInteger(candidate?.number) ||
        candidate?.state !== "open" ||
        typeof candidate?.head?.ref !== "string" ||
        candidate.head.ref.length === 0 ||
        typeof candidate?.head?.repo?.full_name !== "string" ||
        candidate.head.repo.full_name.length === 0
    );
    if (hasAmbiguousMetadata) {
      throw new Error("checking open PRs returned ambiguous PR metadata; preserving all runs");
    }
    const competing = openPrs.find(
      (candidate) =>
        candidate?.state === "open" &&
        candidate?.head?.ref === ctx.headRef &&
        candidate?.head?.repo?.full_name === ctx.headRepo
    );
    if (competing) return competing;
    if (openPrs.length < PAGE_SIZE) return null;
    if (page === MAX_PAGES) {
      throw new Error(
        "INCOMPLETE: open PR listing reached the 500 open PR safety cap; preserving all runs"
      );
    }
  }
  return null;
}

async function listWorkflowRuns(ctx) {
  const runs = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const query = new URLSearchParams({
      branch: ctx.headRef,
      per_page: String(PAGE_SIZE),
      page: String(page),
    });
    const res = await gh(`/repos/${ctx.repo}/actions/runs?${query}`, ctx);
    if (!res.ok) {
      throw new Error(`listing runs failed with HTTP ${res.status}`);
    }
    const body = await responseJson(res, "listing workflow runs");
    if (!Array.isArray(body?.workflow_runs)) {
      throw new Error("listing workflow runs returned an invalid response");
    }
    runs.push(...body.workflow_runs);
    if (body.workflow_runs.length < PAGE_SIZE) return runs;
    if (page === MAX_PAGES) {
      throw new Error(
        "INCOMPLETE: workflow run listing reached the 500-run safety cap; preserving all runs"
      );
    }
  }
  return runs;
}

async function readRun(ctx, runId) {
  const res = await gh(`/repos/${ctx.repo}/actions/runs/${runId}`, ctx);
  if (!res.ok) throw new Error(`run ${runId} readback failed with HTTP ${res.status}`);
  const run = await responseJson(res, `run ${runId} readback`);
  if (run?.id !== runId) {
    throw new Error(`run ${runId} readback returned mismatched id ${String(run?.id)}`);
  }
  return run;
}

function isTerminal(run) {
  return run?.status === "completed";
}

function logTerminal(run) {
  console.log(
    `terminal-confirmed ${run.id} status=${run.status} conclusion=${run.conclusion ?? "unknown"}`
  );
}

async function waitForTerminal(ctx, runId, untilAt, pollIntervalMs) {
  let current;
  do {
    current = await readRun(ctx, runId);
    if (isTerminal(current)) return current;
    if (!ACTIVE.has(current?.status)) {
      throw new Error(
        `run ${runId} readback returned invalid status ${current?.status ?? "unknown"}`
      );
    }
    if (Date.now() >= untilAt) return current;
    const delay = Math.min(Math.max(25, pollIntervalMs), Math.max(0, untilAt - Date.now()));
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
  } while (Date.now() <= untilAt);
  return current;
}

async function confirmRequestedAfterReopen(ctx, requested) {
  const active = [];
  for (const { run } of requested) {
    const current = await readRun(ctx, run.id);
    if (isTerminal(current)) {
      logTerminal(current);
      continue;
    }
    if (!ACTIVE.has(current?.status)) {
      throw new Error(
        `run ${run.id} readback returned invalid status ${current?.status ?? "unknown"}`
      );
    }
    active.push(`run ${run.id} remains ${current.status}`);
  }
  if (active.length > 0) {
    throw new Error(
      `PR #${ctx.prNumber} reopened after normal cancel requests; ${active.join(
        ", "
      )}; preserving without force-cancel`
    );
  }
}

function isUnlinkedRun(run) {
  return Array.isArray(run?.pull_requests) && run.pull_requests.length === 0;
}

async function confirmRunOwnership(ctx, run, selectorContext) {
  let allowUnlinkedFallback = selectorContext.allowUnlinkedFallback;
  if (isUnlinkedRun(run)) {
    const competing = await findCompetingOpenPullRequest(ctx);
    allowUnlinkedFallback = !competing;
    if (competing) {
      throw new Error(
        `run ${run.id} became ambiguous because open PR #${competing.number} reuses ${ctx.headRepo}:${ctx.headRef}`
      );
    }
  }
  const stillOwned = selectRunsToCancel([run], {
    ...selectorContext,
    allowUnlinkedFallback,
  });
  if (stillOwned.length !== 1) {
    throw new Error(`run ${run?.id ?? "unknown"} ownership became ambiguous`);
  }
}

async function forceCancelRun(ctx, originalRun, current, selectorContext, pollIntervalMs) {
  const runId = originalRun.id;
  if (!(await confirmClosedPullRequest(ctx))) {
    throw new Error(`PR #${ctx.prNumber} reopened before force-cancel; preserving run ${runId}`);
  }
  await confirmRunOwnership(ctx, current, {
    ...selectorContext,
    allowUnlinkedFallback: selectorContext.allowUnlinkedFallback && isUnlinkedRun(originalRun),
  });

  const force = await gh(`/repos/${ctx.repo}/actions/runs/${runId}/force-cancel`, {
    ...ctx,
    method: "POST",
  });
  if (force.status === 409) {
    const raced = await readRun(ctx, runId);
    if (!isTerminal(raced)) {
      throw new Error(`run ${runId} force-cancel returned HTTP 409 and remains ${raced?.status}`);
    }
    logTerminal(raced);
    return raced;
  }
  if (force.status !== 202) {
    throw new Error(`run ${runId} force-cancel request failed with HTTP ${force.status}`);
  }
  console.log(
    `accepted force-cancel request for ${runId} ${current.name ?? originalRun.name} ${current.status}`
  );
  const terminal = await waitForTerminal(ctx, runId, ctx.deadlineAt, pollIntervalMs);
  if (!isTerminal(terminal)) {
    throw new Error(
      `run ${runId} remains ${terminal?.status ?? "unknown"} after force-cancel was accepted`
    );
  }
  logTerminal(terminal);
  return terminal;
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
  const headSha = env.HEAD_SHA;
  const deadlineMs = durationFromEnv(env.CANCEL_DEADLINE_MS, DEFAULT_DEADLINE_MS);
  const normalGraceMs = durationFromEnv(env.CANCEL_NORMAL_GRACE_MS, DEFAULT_NORMAL_GRACE_MS);
  const pollIntervalMs = durationFromEnv(env.CANCEL_POLL_INTERVAL_MS, DEFAULT_POLL_INTERVAL_MS);
  if (
    !repo ||
    !token ||
    !Number.isSafeInteger(prNumber) ||
    !Number.isSafeInteger(selfRunId) ||
    !headRef ||
    !headRepo ||
    !headSha
  ) {
    console.error(
      "cancel-closed-pr-runs: missing REPO, GH_TOKEN, PR_NUMBER, HEAD_REF, HEAD_REPO, HEAD_SHA or SELF_RUN_ID"
    );
    process.exit(2);
  }

  const ctx = {
    repo,
    token,
    api,
    prNumber,
    headRef,
    headRepo,
    headSha,
    deadlineAt: Date.now() + deadlineMs,
  };
  if (!(await confirmClosedPullRequest(ctx))) {
    console.log(`cancel-closed-pr-runs: preserving runs because PR #${prNumber} is not closed`);
    return;
  }

  const competingPr = await findCompetingOpenPullRequest(ctx);
  const allowUnlinkedFallback = !competingPr;
  if (competingPr) {
    console.log(
      `cancel-closed-pr-runs: unlinked fallback disabled; open PR #${competingPr.number} reuses ${headRepo}:${headRef}`
    );
  }

  const runs = await listWorkflowRuns(ctx);

  const selectorContext = {
    prNumber,
    headRef,
    headRepo,
    headSha,
    selfRunId,
    allowUnlinkedFallback,
  };
  const targets = selectRunsToCancel(runs, selectorContext);

  const requested = [];
  for (const [index, run] of targets.entries()) {
    if (!(await confirmClosedPullRequest(ctx))) {
      console.log(
        `cancel-closed-pr-runs: preserving ${targets.length - index} target(s) because PR #${prNumber} reopened before cancellation`
      );
      await confirmRequestedAfterReopen(ctx, requested);
      return;
    }
    await confirmRunOwnership(ctx, run, selectorContext);
    const normal = await gh(`/repos/${repo}/actions/runs/${run.id}/cancel`, {
      method: "POST",
      ...ctx,
    });
    if (normal.status !== 202 && normal.status !== 409) {
      throw new Error(`run ${run.id} cancel request failed with HTTP ${normal.status}`);
    }
    if (normal.status === 202) {
      console.log(`accepted cancel request for ${run.id} ${run.name} ${run.status}`);
    }
    requested.push({ run, status: normal.status });
  }

  const normalUntil = Math.min(ctx.deadlineAt, Date.now() + normalGraceMs);
  const stillActive = [];
  let terminalConfirmed = 0;
  for (const { run, status } of requested) {
    const current = await waitForTerminal(
      ctx,
      run.id,
      status === 409 ? Date.now() : normalUntil,
      pollIntervalMs
    );
    if (isTerminal(current)) {
      terminalConfirmed++;
      logTerminal(current);
      continue;
    }
    stillActive.push({ run, current });
  }

  for (const { run, current } of stillActive) {
    await forceCancelRun(ctx, run, current, selectorContext, pollIntervalMs);
    terminalConfirmed++;
  }
  console.log(
    `cancel-closed-pr-runs: PR #${prNumber} — ${terminalConfirmed}/${targets.length} run(s) terminal-confirmed`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((err) => {
    console.error(`cancel-closed-pr-runs: ${err?.message ?? err}`);
    process.exit(1);
  });
}
