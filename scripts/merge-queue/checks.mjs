// scripts/merge-queue/checks.mjs — WP1 (pure). Plan §3.4: verdict of a candidate's checks.
//
// Mirrors the Mergify merge_conditions of .mergify.yml: zero failures except the advisory
// checks, zero pending (advisory included, like "#check-pending=0"), and every required check
// an affirmative `success`. Fail closed: a required check reported as skipped/neutral is red.

/**
 * @typedef {import("./eligibility.mjs").CommitStatus} CommitStatus
 * @typedef {import("./config.mjs").QueueConfig} QueueConfig
 */

/**
 * @typedef {object} CheckRun        normalized by github.listCheckRuns
 * @property {number} id
 * @property {string} name
 * @property {string} status         queued | in_progress | completed | waiting | requested | pending
 * @property {string|null} conclusion success | failure | neutral | cancelled | skipped | timed_out |
 *                                   action_required | stale | startup_failure | null
 * @property {string|null} startedAt
 * @property {string|null} completedAt
 * @property {string|null} htmlUrl
 * @property {string|null} appSlug   "github-actions" for workflow jobs
 * @property {{title: string|null, summary: string|null, text: string|null}} output
 */

/**
 * @typedef {object} ChecksVerdict
 * @property {"green"|"red"|"pending"|"timeout"} verdict
 * @property {Object<string, string>} required   required name → conclusion | "missing" | "pending"
 * @property {CheckRun[]} failures         failed, non-advisory runs (latest attempt per name)
 * @property {CheckRun[]} advisoryFailures
 * @property {string[]} pending            names still running, plus required ones not reported yet
 */

/** Conclusions that make a completed check a failure. */
export const FAILING_CONCLUSIONS = Object.freeze([
  "failure",
  "cancelled",
  "timed_out",
  "action_required",
  "startup_failure",
  "stale",
]);

/** Statuses/runs written by the queue itself never count towards the candidate verdict. */
const OWN_PREFIX = "omni-queue/";

/**
 * Keep only the latest run per check name (highest id) — re-runs and retried candidates report
 * several runs with the same name on one SHA. Output keeps the input order of the kept runs.
 * @param {CheckRun[]} checkRuns
 * @returns {CheckRun[]}
 */
export function latestByName(checkRuns) {
  const best = new Map();
  for (const run of checkRuns ?? []) {
    if (!run || typeof run.name !== "string") continue;
    const cur = best.get(run.name);
    if (!cur || Number(run.id) > Number(cur.id)) best.set(run.name, run);
  }
  const kept = new Set(best.values());
  return (checkRuns ?? []).filter((r) => kept.has(r));
}

/** Newest status per context (max createdAt; ties keep the earlier entry of a newest-first list). */
function latestStatusByContext(statuses) {
  const best = new Map();
  for (const s of statuses ?? []) {
    if (!s || typeof s.context !== "string") continue;
    const ms = Date.parse(String(s.createdAt ?? ""));
    const cur = best.get(s.context);
    if (!cur || (Number.isFinite(ms) && ms > cur.ms)) {
      best.set(s.context, { status: s, ms: Number.isFinite(ms) ? ms : -Infinity });
    }
  }
  return [...best.values()].map((v) => v.status);
}

/**
 * A failed commit status presented as a CheckRun so failures can flow into classify.mjs.
 * `id` is 0 (no check-run annotations exist for a status: callers must not fetch them).
 * @param {CommitStatus} s
 * @returns {CheckRun & {source: "status"}}
 */
function statusAsRun(s) {
  return {
    id: 0,
    name: s.context,
    status: "completed",
    conclusion: "failure",
    startedAt: null,
    completedAt: s.createdAt ?? null,
    htmlUrl: s.targetUrl ?? null,
    appSlug: null,
    output: { title: s.description ?? null, summary: null, text: null },
    source: "status",
  };
}

/** "pending" | "success" | "failure" | "neutral" | "skipped" for one check run. */
function runOutcome(run) {
  if (run.status !== "completed") return "pending";
  const c = run.conclusion;
  if (c === null || c === undefined) return "pending";
  if (FAILING_CONCLUSIONS.includes(c)) return "failure";
  return c;
}

/** Ordering used when one name has several entries: failure > other non-success > pending. */
function severity(outcome) {
  if (outcome === "failure") return 4;
  if (outcome === "pending") return 2;
  if (outcome === "success") return 0;
  return 3;
}

/**
 * Plan §3.4 (mirrors the Mergify merge_conditions):
 *  - red: any completed non-advisory run/status with failure | cancelled | timed_out |
 *    action_required | startup_failure | stale, or a required check concluded other than success;
 *  - green: every config.requiredChecks is `success`, nothing pending, no non-advisory failure;
 *  - timeout: not decided after config.checksTimeoutMinutes since startedAt;
 *  - pending: otherwise.
 * Statuses: failure/error → failure, pending → pending (advisory names tolerated as for runs).
 * Contexts/names starting with "omni-queue/" (the queue's own approval statuses) are ignored.
 * Failed statuses appear in `failures` as CheckRun-shaped objects with id 0 and
 * `source: "status"`.
 * @param {{checkRuns: CheckRun[], statuses: CommitStatus[], config: QueueConfig,
 *          startedAt: string, now: string}} input
 * @returns {ChecksVerdict}
 */
export function evaluateChecks(input) {
  const { config } = input;
  const advisory = new Set(config.advisoryChecks);
  const requiredNames = config.requiredChecks;

  /** @type {{name: string, outcome: string, run: CheckRun}[]} */
  const entries = [];
  for (const run of latestByName(input.checkRuns)) {
    if (run.name.startsWith(OWN_PREFIX)) continue;
    entries.push({ name: run.name, outcome: runOutcome(run), run });
  }
  for (const s of latestStatusByContext(input.statuses)) {
    if (s.context.startsWith(OWN_PREFIX)) continue;
    const outcome =
      s.state === "success"
        ? "success"
        : s.state === "failure" || s.state === "error"
          ? "failure"
          : "pending";
    entries.push({ name: s.context, outcome, run: outcome === "failure" ? statusAsRun(s) : null });
  }

  const failures = [];
  const advisoryFailures = [];
  const pendingNames = [];
  for (const e of entries) {
    if (e.outcome === "pending") {
      if (!pendingNames.includes(e.name)) pendingNames.push(e.name);
    } else if (e.outcome === "failure") {
      (advisory.has(e.name) ? advisoryFailures : failures).push(e.run);
    }
  }

  /** @type {Object<string, string>} */
  const required = {};
  for (const name of requiredNames) {
    const mine = entries.filter((e) => e.name === name);
    if (mine.length === 0) {
      required[name] = "missing";
      if (!pendingNames.includes(name)) pendingNames.push(name);
      continue;
    }
    // A name reported both as a check run and as a status: the worst outcome wins.
    const worst = mine.reduce((a, b) => (severity(b.outcome) > severity(a.outcome) ? b : a));
    if (worst.outcome === "success" || worst.outcome === "pending") {
      required[name] = worst.outcome;
    } else {
      required[name] = worst.run?.conclusion ?? "failure";
      // Fail closed: skipped/neutral (any non-success conclusion) on a required check is red.
      if (worst.outcome !== "failure" && worst.run && !failures.includes(worst.run)) {
        failures.push(worst.run);
      }
    }
  }

  const base = { required, failures, advisoryFailures, pending: pendingNames };
  if (failures.length > 0) return { verdict: "red", ...base };
  const allRequiredGreen = requiredNames.every((n) => required[n] === "success");
  if (allRequiredGreen && pendingNames.length === 0) return { verdict: "green", ...base };

  const startedMs = Date.parse(String(input.startedAt ?? ""));
  const nowMs = Date.parse(String(input.now ?? ""));
  if (
    Number.isFinite(startedMs) &&
    Number.isFinite(nowMs) &&
    nowMs - startedMs >= config.checksTimeoutMinutes * 60 * 1000
  ) {
    return { verdict: "timeout", ...base };
  }
  return { verdict: "pending", ...base };
}
