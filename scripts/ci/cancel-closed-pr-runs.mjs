#!/usr/bin/env node
// API-only cleanup for PR runs left active after their PR closes. The control checkout is
// trusted workflow code, never the PR's code. Discovery is not permission to cancel: confirm
// the closed PR and current run ownership before each write, then confirm a terminal run.
// These reads reduce races but the API does not provide a transaction spanning GET and POST.
// No npm dependencies are required.

import { pathToFileURL } from "node:url";

const ACTIVE = new Set(["queued", "in_progress", "waiting", "pending", "requested"]);
const PR_EVENTS = new Set(["pull_request", "pull_request_target"]);
const PAGE_SIZE = 100;
const MAX_PAGES = 5;
const REPO_RE = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const SHA_RE = /^[a-f0-9]{40}$/;
const positiveId = (value) => Number.isSafeInteger(value) && value > 0;

function ownsRun(run, ctx, allowUnlinkedFallback) {
  if (
    !positiveId(run?.id) ||
    run.id === ctx.selfRunId ||
    !PR_EVENTS.has(run.event) ||
    run.head_branch !== ctx.headRef ||
    run.head_repository?.full_name !== ctx.headRepo ||
    !SHA_RE.test(run.head_sha ?? "") ||
    !Array.isArray(run.pull_requests)
  ) {
    return false;
  }
  if (run.pull_requests.length === 0) {
    return allowUnlinkedFallback === true && run.head_sha === ctx.headSha;
  }
  if (run.pull_requests.length !== 1) return false;
  const link = run.pull_requests[0];
  if (!positiveId(link?.number) || link.number !== ctx.prNumber) return false;
  // Some API responses include richer link identity. Contradictory data is not evidence
  // of ownership, even when the top-level PR number matches.
  if (
    (link.head?.ref !== undefined && link.head.ref !== ctx.headRef) ||
    (link.head?.repo?.full_name !== undefined && link.head.repo.full_name !== ctx.headRepo) ||
    (link.base?.repo?.full_name !== undefined && link.base.repo.full_name !== ctx.repo)
  ) {
    return false;
  }
  return true;
}

/** Single explicit link, or exact head plus a separately proven absence of an open reuse. */
export function selectRunsToCancel(runs, ctx) {
  if (
    !Array.isArray(runs) ||
    !positiveId(ctx?.prNumber) ||
    !positiveId(ctx?.selfRunId) ||
    !REPO_RE.test(ctx?.headRepo ?? "") ||
    !ctx?.headRef ||
    !SHA_RE.test(ctx?.headSha ?? "")
  ) {
    return [];
  }
  return runs.filter(
    (run) => ACTIVE.has(run?.status) && ownsRun(run, ctx, ctx.allowUnlinkedFallback)
  );
}

function duration(value, fallback) {
  if (value === undefined) return fallback;
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(Number(value))) {
    throw new Error("CLEANUP_INVALID_DURATION");
  }
  return Math.min(Number(value), fallback);
}

function remaining(ctx) {
  const value = ctx.deadlineAt - Date.now();
  if (value <= 0) throw new Error("CLEANUP_DEADLINE_EXHAUSTED");
  return value;
}

async function gh(path, ctx, method = "GET") {
  const signal = AbortSignal.timeout(Math.max(1, Math.min(30_000, remaining(ctx))));
  signal.throwIfAborted();
  const response = await fetch(ctx.api + path, {
    method,
    signal,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + ctx.token,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  remaining(ctx);
  return response;
}

async function readJson(path, ctx) {
  const response = await gh(path, ctx);
  if (!response.ok) throw new Error("CLEANUP_READ_HTTP_" + response.status);
  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error("CLEANUP_INVALID_JSON");
  }
  remaining(ctx);
  return {
    body,
    hasNext: /(?:^|;)\s*rel="next"/.test(response.headers.get("link") ?? ""),
  };
}

async function closedPullRequest(ctx) {
  const { body: pr } = await readJson("/repos/" + ctx.repo + "/pulls/" + ctx.prNumber, ctx);
  if (
    pr?.number !== ctx.prNumber ||
    pr?.base?.repo?.full_name !== ctx.repo ||
    pr?.head?.repo?.full_name !== ctx.headRepo ||
    pr?.head?.ref !== ctx.headRef ||
    pr?.head?.sha !== ctx.headSha
  ) {
    throw new Error("CLEANUP_PR_IDENTITY_CHANGED");
  }
  if (pr.state === "open") return false;
  if (pr.state !== "closed") throw new Error("CLEANUP_UNKNOWN_PR_STATE");
  return true;
}

async function competingOpenPullRequest(ctx) {
  const ids = new Set();
  for (let page = 1; page <= MAX_PAGES; page++) {
    const query = new URLSearchParams({
      state: "open",
      head: ctx.headRepo.split("/")[0] + ":" + ctx.headRef,
      per_page: String(PAGE_SIZE),
      page: String(page),
    });
    const { body: prs, hasNext } = await readJson("/repos/" + ctx.repo + "/pulls?" + query, ctx);
    if (!Array.isArray(prs) || prs.length > PAGE_SIZE) {
      throw new Error("CLEANUP_INCOMPLETE_OPEN_PRS");
    }
    for (const pr of prs) {
      if (
        !positiveId(pr?.number) ||
        ids.has(pr.number) ||
        pr.state !== "open" ||
        pr.base?.repo?.full_name !== ctx.repo ||
        typeof pr.head?.ref !== "string" ||
        !pr.head.ref ||
        !REPO_RE.test(pr.head?.repo?.full_name ?? "")
      ) {
        throw new Error("CLEANUP_AMBIGUOUS_OPEN_PR");
      }
      ids.add(pr.number);
      if (pr.head.ref === ctx.headRef && pr.head.repo.full_name === ctx.headRepo) return true;
    }
    if (prs.length < PAGE_SIZE) {
      if (hasNext) throw new Error("CLEANUP_INCOMPLETE_OPEN_PRS");
      return false;
    }
  }
  throw new Error("CLEANUP_OPEN_PR_PAGE_LIMIT");
}

async function listRuns(ctx) {
  const runs = [];
  const ids = new Set();
  let expected;
  for (let page = 1; page <= MAX_PAGES; page++) {
    const query = new URLSearchParams({
      branch: ctx.headRef,
      per_page: String(PAGE_SIZE),
      page: String(page),
    });
    const { body, hasNext } = await readJson("/repos/" + ctx.repo + "/actions/runs?" + query, ctx);
    const count = body?.total_count;
    const items = body?.workflow_runs;
    if (
      !Number.isSafeInteger(count) ||
      count < 0 ||
      count > PAGE_SIZE * MAX_PAGES ||
      (expected !== undefined && expected !== count) ||
      !Array.isArray(items) ||
      items.length !== Math.min(PAGE_SIZE, count - runs.length)
    ) {
      throw new Error("CLEANUP_INCOMPLETE_RUN_LIST");
    }
    expected = count;
    for (const run of items) {
      if (!positiveId(run?.id) || ids.has(run.id)) throw new Error("CLEANUP_AMBIGUOUS_RUN_ID");
      ids.add(run.id);
      runs.push(run);
    }
    if (runs.length === expected) {
      if (hasNext) throw new Error("CLEANUP_INCOMPLETE_RUN_LIST");
      return runs;
    }
  }
  throw new Error("CLEANUP_RUN_PAGE_LIMIT");
}

async function readRun(ctx, target) {
  const { body: run } = await readJson("/repos/" + ctx.repo + "/actions/runs/" + target.id, ctx);
  if (
    run?.id !== target.id ||
    !ownsRun(run, ctx, target.pull_requests.length === 0) ||
    (!ACTIVE.has(run.status) && run.status !== "completed")
  ) {
    throw new Error("CLEANUP_RUN_IDENTITY_OR_STATE_CHANGED");
  }
  return run;
}

function terminal(run) {
  return run.status === "completed";
}

function logTerminal(run) {
  console.log("terminal-confirmed " + run.id + " status=completed");
}

// Re-read both objects. A fallback also needs a fresh complete absence of an open
// PR reusing the head. A newly missing link cannot downgrade an explicit link to fallback.
async function beforeWrite(ctx, target) {
  if (!(await closedPullRequest(ctx))) throw new Error("CLEANUP_PR_REOPENED");
  let current = await readRun(ctx, target);
  if (terminal(current)) return current;
  if (current.pull_requests.length === 0 && (await competingOpenPullRequest(ctx))) {
    throw new Error("CLEANUP_HEAD_REUSED");
  }
  if (!(await closedPullRequest(ctx))) throw new Error("CLEANUP_PR_REOPENED");
  current = await readRun(ctx, target);
  return current;
}

async function waitForTerminal(ctx, target, untilAt, pollIntervalMs) {
  while (true) {
    const current = await readRun(ctx, target);
    if (terminal(current) || Date.now() >= untilAt) return current;
    const delay = Math.min(Math.max(25, pollIntervalMs), untilAt - Date.now(), remaining(ctx));
    if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

async function main() {
  const env = process.env;
  const ctx = {
    repo: env.REPO,
    token: env.GH_TOKEN,
    api: env.GITHUB_API_URL || "https://api.github.com",
    prNumber: Number(env.PR_NUMBER),
    selfRunId: Number(env.SELF_RUN_ID),
    headRef: env.HEAD_REF,
    headRepo: env.HEAD_REPO,
    headSha: env.HEAD_SHA,
    deadlineAt: Date.now() + duration(env.CANCEL_DEADLINE_MS, 240_000),
  };
  const graceMs = duration(env.CANCEL_NORMAL_GRACE_MS, 10_000);
  const pollMs = duration(env.CANCEL_POLL_INTERVAL_MS, 1_000);
  if (
    !REPO_RE.test(ctx.repo ?? "") ||
    ctx.headRepo !== ctx.repo ||
    !ctx.token ||
    !positiveId(ctx.prNumber) ||
    !positiveId(ctx.selfRunId) ||
    !ctx.headRef ||
    !SHA_RE.test(ctx.headSha ?? "")
  ) {
    throw new Error("CLEANUP_INVALID_CONTEXT");
  }
  if (!(await closedPullRequest(ctx))) {
    console.log("cancel-closed-pr-runs: PR is open; preserving its runs");
    return;
  }
  const runs = await listRuns(ctx);
  const fallbackCandidates = selectRunsToCancel(runs, { ...ctx, allowUnlinkedFallback: true }).some(
    (run) => run.pull_requests.length === 0
  );
  const allowUnlinkedFallback = fallbackCandidates && !(await competingOpenPullRequest(ctx));
  const targets = selectRunsToCancel(runs, { ...ctx, allowUnlinkedFallback });
  const requested = [];
  let confirmed = 0;
  for (const target of targets) {
    const current = await beforeWrite(ctx, target);
    if (terminal(current)) {
      confirmed++;
      logTerminal(current);
      continue;
    }
    const response = await gh(
      "/repos/" + ctx.repo + "/actions/runs/" + target.id + "/cancel",
      ctx,
      "POST"
    );
    if (![202, 409].includes(response.status)) {
      throw new Error("CLEANUP_CANCEL_HTTP_" + response.status);
    }
    console.log("cancel-request " + target.id + " HTTP " + response.status);
    requested.push({ target, status: response.status });
  }

  // All normal requests share one grace period; target count cannot multiply it.
  const normalUntil = Math.min(ctx.deadlineAt, Date.now() + graceMs);
  const active = [];
  for (const { target, status } of requested) {
    const current = await waitForTerminal(
      ctx,
      target,
      status === 409 ? Date.now() : normalUntil,
      pollMs
    );
    if (terminal(current)) {
      confirmed++;
      logTerminal(current);
    } else {
      active.push(target);
    }
  }
  for (const target of active) {
    const current = await beforeWrite(ctx, target);
    if (terminal(current)) {
      confirmed++;
      logTerminal(current);
      continue;
    }
    const response = await gh(
      "/repos/" + ctx.repo + "/actions/runs/" + target.id + "/force-cancel",
      ctx,
      "POST"
    );
    if (![202, 409].includes(response.status)) {
      throw new Error("CLEANUP_FORCE_HTTP_" + response.status);
    }
    console.log("force-cancel-request " + target.id + " HTTP " + response.status);
    const final = await waitForTerminal(
      ctx,
      target,
      response.status === 409 ? Date.now() : ctx.deadlineAt,
      pollMs
    );
    if (!terminal(final)) throw new Error("CLEANUP_FORCE_NOT_TERMINAL");
    confirmed++;
    logTerminal(final);
  }
  console.log(
    "cancel-closed-pr-runs: PR #" +
      ctx.prNumber +
      " — " +
      confirmed +
      "/" +
      targets.length +
      " run(s) terminal-confirmed"
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main().catch((error) => {
    const reason = /^CLEANUP_[A-Z0-9_]+$/.test(error?.message ?? "")
      ? error.message
      : "CLEANUP_REQUEST_FAILED";
    console.error("cancel-closed-pr-runs: " + reason);
    process.exitCode = 1;
  });
}
