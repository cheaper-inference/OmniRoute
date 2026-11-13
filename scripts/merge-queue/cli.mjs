#!/usr/bin/env node
// scripts/merge-queue/cli.mjs — WP4. Plan §3.10: local CLI for the owner and the skills.
//
//   npm run queue -- status [--base <branch>]
//   npm run queue -- add <PR...>        apply the queue label (approval is recorded by the workflow)
//   npm run queue -- remove <PR...>     remove the queue label
//   npm run queue -- pause <base> [--reason <text>]   workflow_dispatch action=pause
//   npm run queue -- resume <base>                    workflow_dispatch action=resume
//   npm run queue -- why <PR>           eligibility verdict + reasons, computed locally
//   npm run queue -- history [--base <branch>] [--limit <n>]
//   global: --repo <owner/repo>  (default: `gh repo view`)
//
// Token: `gh auth token` (execFile, never a shell). Reads state from contracts.STATE_BRANCH via
// the Contents API; never writes state (the workflow is the single writer). Without --base,
// status/history cover every managed base with labeled PRs OR a state document (a paused base
// with nothing labeled is exactly when the owner needs to see it).
//
// Exit codes: 0 success · 1 runtime/API error (or a partial failure of add/remove) · 2 usage.

import { execFile } from "node:child_process";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { isManagedBase, loadConfig } from "./config.mjs";
import {
  FREEZE_LABEL,
  STATE_BRANCH,
  sanitizeTitle,
  stateFilePath,
  validateState,
} from "./contracts.mjs";
import { createGitHubClient } from "./github.mjs";

export const QUEUE_WORKFLOW = "omni-queue.yml";

export const USAGE = [
  "usage: npm run queue -- <command> [options]",
  "",
  "commands:",
  "  status [--base <branch>]                 queue state, in-flight candidate, labeled PRs",
  "  add <PR...>                              apply the queue label",
  "  remove <PR...>                           remove the queue label",
  "  pause <base> [--reason <text>]           pause the queue of a base (workflow_dispatch)",
  "  resume <base>                            resume the queue of a base (workflow_dispatch)",
  "  why <PR>                                 why a PR is (not) eligible",
  "  history [--base <branch>] [--limit <n>]  recent queue events (default limit 20)",
  "",
  "options:",
  "  --repo <owner/repo>                      repository (default: gh repo view)",
  "  -h, --help                               show this help",
].join("\n");

const COMMANDS = ["status", "add", "remove", "pause", "resume", "why", "history"];
const VALUE_FLAGS = ["--base", "--limit", "--reason", "--repo"];
const ALLOWED_FLAGS = {
  status: ["--base"],
  add: [],
  remove: [],
  pause: ["--reason"],
  resume: [],
  why: [],
  history: ["--base", "--limit"],
};

class UsageError extends Error {}

/** Split argv into {command, positionals, flags}; throws UsageError on malformed input. */
export function parseArgs(argv) {
  const positionals = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") {
      flags.help = true;
    } else if (arg.startsWith("--")) {
      const [name, inline] = arg.includes("=") ? arg.split(/=(.*)/s) : [arg, undefined];
      if (!VALUE_FLAGS.includes(name)) throw new UsageError(`unknown option ${name}`);
      const value = inline ?? argv[++i];
      if (value === undefined || value === "") throw new UsageError(`${name} needs a value`);
      flags[name.slice(2)] = value;
    } else {
      positionals.push(arg);
    }
  }
  const [command, ...rest] = positionals;
  return { command, positionals: rest, flags };
}

function parsePrNumbers(values) {
  if (!values.length) throw new UsageError("expected at least one PR number");
  return values.map((v) => {
    const s = String(v).replace(/^#/, "");
    if (!/^[1-9][0-9]{0,9}$/.test(s)) throw new UsageError(`invalid PR number: ${v}`);
    return Number(s);
  });
}

const fmtTime = (iso) => {
  const t = Date.parse(iso ?? "");
  return Number.isNaN(t) ? "-" : `${new Date(t).toISOString().slice(0, 16).replace("T", " ")}Z`;
};
const short = (sha) => String(sha ?? "").slice(0, 12) || "-";

async function defaultExec(cmd, args) {
  const { stdout } = await promisify(execFile)(cmd, args, { encoding: "utf8", timeout: 30_000 });
  return { stdout };
}

/** Build the API client from `gh` (token + repository). Never prints the token. */
async function buildClient(flags, deps) {
  const exec = deps.exec ?? defaultExec;
  let repository = flags.repo;
  if (!repository) {
    const res = await exec("gh", [
      "repo",
      "view",
      "--json",
      "nameWithOwner",
      "-q",
      ".nameWithOwner",
    ]);
    repository = String(res.stdout ?? "").trim();
  }
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
    throw new UsageError(
      `invalid repository: ${JSON.stringify(repository)} (use --repo owner/repo)`
    );
  }
  const token = String((await exec("gh", ["auth", "token"])).stdout ?? "").trim();
  if (!token) throw new Error("`gh auth token` returned no token (run `gh auth login`)");
  return createGitHubClient({ token, repository, apiUrl: deps.apiUrl });
}

/** Directory of the per-base state files on STATE_BRANCH ("state"). */
const STATE_DIR = stateFilePath("probe").replace(/\/[^/]+$/, "");

/**
 * @param {Map<string, string>} [cache]  base → raw state JSON already read by discoverBases
 */
async function loadState(gh, base, cache) {
  let content = cache?.get(base);
  if (content === undefined) {
    const file = await gh.getFileContent(stateFilePath(base), STATE_BRANCH);
    if (!file) return null;
    content = file.content;
  }
  const state = JSON.parse(content);
  const errors = validateState(state);
  if (errors.length) throw new Error(`state of ${base} is invalid: ${errors.join(", ")}`);
  return state;
}

/** Managed bases that have open PRs carrying the queue label (sorted). */
async function labeledPullsByBase(gh, config) {
  const pulls = await gh.listOpenPulls();
  const byBase = new Map();
  for (const pull of pulls) {
    if (!pull.labels.includes(config.label) || !isManagedBase(config, pull.baseRef)) continue;
    if (!byBase.has(pull.baseRef)) byBase.set(pull.baseRef, []);
    byBase.get(pull.baseRef).push(pull);
  }
  for (const list of byBase.values()) list.sort((a, b) => a.number - b.number);
  return byBase;
}

/**
 * Managed bases that have a state document on STATE_BRANCH — a paused queue or a candidate in
 * flight shows up even when no open PR carries the label any more. Returns base → raw JSON.
 * Unreadable files are reported on `err` and skipped (status --base still shows the error).
 */
async function basesWithState(gh, config, err) {
  const found = new Map();
  for (const entry of await gh.listDirectory(STATE_DIR, STATE_BRANCH)) {
    if (entry.type !== "file" || !entry.name.endsWith(".json")) continue;
    const file = await gh.getFileContent(entry.path, STATE_BRANCH);
    if (!file) continue;
    let base;
    try {
      base = JSON.parse(file.content)?.base;
    } catch {
      err(`warning: ${entry.path} on ${STATE_BRANCH} is not valid JSON; skipped`);
      continue;
    }
    // The file must be the one this base maps to: a stray file cannot impersonate another base.
    if (typeof base !== "string" || !isManagedBase(config, base)) continue;
    if (stateFilePath(base) !== entry.path) continue;
    found.set(base, file.content);
  }
  return found;
}

/** Bases to show without --base: those with labeled PRs ∪ those with a state document. */
async function discoverBases(ctx) {
  const { gh, config, err } = ctx;
  const byBase = await labeledPullsByBase(gh, config);
  const cache = await basesWithState(gh, config, err);
  const bases = [...new Set([...byBase.keys(), ...cache.keys()])].sort();
  return { byBase, cache, bases };
}

const NO_BASE =
  "no managed base has queue state or PRs with the queue label (use --base <branch> to inspect one)";

function requireManagedBase(config, base) {
  if (!base) throw new UsageError("expected a base branch");
  if (!isManagedBase(config, base)) {
    throw new UsageError(`${base} is not a queue-managed base (config.bases ${config.bases})`);
  }
  return base;
}

// ───────────────────────────── commands ─────────────────────────────

async function cmdStatus(ctx) {
  const { gh, config, flags, out } = ctx;
  let byBase;
  let cache;
  let bases;
  if (flags.base) {
    bases = [requireManagedBase(config, flags.base)];
    byBase = await labeledPullsByBase(gh, config);
  } else {
    ({ byBase, cache, bases } = await discoverBases(ctx));
  }
  out(`repository ${gh.owner}/${gh.repo} · mode ${config.mode} · label ${config.label}`);
  if (!bases.length) {
    out(NO_BASE);
    return 0;
  }
  for (const base of bases) {
    const state = await loadState(gh, base, cache);
    out("");
    out(`== ${base}`);
    if (!state) out("state: none yet (the queue has not run on this base)");
    else {
      const p = state.paused;
      out(
        p
          ? `paused: ${p.reason} since ${fmtTime(p.since)} — ${sanitizeTitle(p.detail)}`
          : "paused: no"
      );
      const f = state.inFlight;
      if (!f) out("in flight: nothing");
      else {
        out(
          `in flight: ${f.kind} ${f.batchId} · stage ${f.stage} · candidate ${short(f.candidateSha)} ` +
            `· base ${short(f.baseSha)} · started ${fmtTime(f.startedAt)} · retries ${f.attempts}`
        );
        out(`  ref ${f.candidateRef}`);
        for (const pr of f.prs) out(`  #${pr.n} ${sanitizeTitle(pr.title)} (${pr.author})`);
        if (f.bisect) {
          out(
            `  bisecting ${f.bisect.rootBatchId}: ${f.bisect.segments.length} segment(s) pending, ` +
              `${f.bisect.steps} step(s), culprits ${f.bisect.culprits.map((c) => `#${c.n}`).join(" ") || "-"}`
          );
        }
      }
      const c = state.counters;
      out(
        `counters: landed ${c.landedPrs} PRs / ${c.landedBatches} batches · CI runs ${c.ciRuns} · ` +
          `red batches ${c.redBatches} · bisections ${c.bisections} · culprits ${c.culprits}`
      );
    }
    const labeled = byBase.get(base) ?? [];
    out(`labeled PRs (${labeled.length}):`);
    for (const pull of labeled) {
      out(
        `  #${pull.number} ${sanitizeTitle(pull.title)} (${pull.author})${pull.draft ? " [draft]" : ""}`
      );
    }
  }
  return 0;
}

async function cmdHistory(ctx) {
  const { gh, config, flags, out } = ctx;
  let limit = 20;
  if (flags.limit !== undefined) {
    if (!/^[1-9][0-9]{0,3}$/.test(flags.limit)) throw new UsageError("--limit must be 1..9999");
    limit = Number(flags.limit);
  }
  let cache;
  let bases;
  if (flags.base) bases = [requireManagedBase(config, flags.base)];
  else ({ cache, bases } = await discoverBases(ctx));
  if (!bases.length) {
    out(NO_BASE);
    return 0;
  }
  for (const base of bases) {
    const state = await loadState(gh, base, cache);
    out(`== ${base}`);
    const events = (state?.history ?? []).slice(-limit).reverse();
    if (!events.length) out("no events");
    for (const e of events) {
      const prs = (e.prs ?? []).map((n) => `#${n}`).join(",");
      out(
        [
          fmtTime(e.at),
          e.type,
          e.batchId ?? "",
          prs,
          e.sha ? short(e.sha) : "",
          sanitizeTitle(e.detail ?? ""),
        ]
          .filter(Boolean)
          .join("  ")
      );
    }
  }
  return 0;
}

async function cmdLabel(ctx, add) {
  const { gh, config, positionals, out, err } = ctx;
  const numbers = parsePrNumbers(positionals);
  let failed = 0;
  for (const n of numbers) {
    try {
      if (add) await gh.addLabels(n, [config.label]);
      else await gh.removeLabel(n, config.label);
      out(`#${n}: label ${config.label} ${add ? "added" : "removed"}`);
    } catch (error) {
      failed += 1;
      err(`#${n}: ${error.message}`);
    }
  }
  if (add && failed < numbers.length) {
    out("approval is recorded by the omni-queue workflow when the labeler is an approver");
  }
  return failed ? 1 : 0;
}

async function cmdDispatch(ctx, action) {
  const { gh, config, positionals, flags, out } = ctx;
  if (positionals.length !== 1) throw new UsageError(`${action} expects exactly one base`);
  const base = requireManagedBase(config, positionals[0]);
  const repo = (await gh.request("GET", `/repos/${gh.owner}/${gh.repo}`)).data;
  const ref = repo?.default_branch;
  if (!ref) throw new Error("could not read the default branch of the repository");
  const reason = action === "pause" ? (flags.reason ?? "paused from the CLI") : "";
  await gh.dispatchWorkflow(QUEUE_WORKFLOW, ref, { base, action, reason });
  out(
    `${action} requested for ${base} (workflow ${QUEUE_WORKFLOW} on ${ref}); the next tick applies it`
  );
  return 0;
}

function prGreenState(checkRuns, name) {
  const runs = checkRuns.filter((r) => r.name === name).sort((a, b) => b.id - a.id);
  const latest = runs[0];
  if (!latest) return null;
  if (latest.status !== "completed") return "pending";
  if (latest.conclusion === "success") return "success";
  if (["neutral", "skipped"].includes(latest.conclusion)) return null;
  return "failure";
}

async function cmdWhy(ctx) {
  const { gh, config, positionals, out, now } = ctx;
  const [n] = parsePrNumbers(positionals);
  if (positionals.length !== 1) throw new UsageError("why expects exactly one PR number");
  const eligibility = ctx.eligibility ?? (await import("./eligibility.mjs"));
  const pull = await gh.getPull(n);
  const [files, timeline, headStatuses, checkRuns, freezeIssues] = await Promise.all([
    gh.listPullFiles(n),
    gh.listIssueTimeline(n),
    gh.listCommitStatuses(pull.headSha),
    gh.listCheckRuns(pull.headSha),
    gh.listIssues({ labels: [FREEZE_LABEL], state: "open" }),
  ]);
  const state = isManagedBase(config, pull.baseRef) ? await loadState(gh, pull.baseRef) : null;
  const snapshot = {
    number: pull.number,
    state: pull.state,
    draft: pull.draft,
    merged: pull.merged,
    baseRef: pull.baseRef,
    headSha: pull.headSha,
    title: pull.title,
    author: pull.author,
    labels: pull.labels,
    mergeable: pull.mergeable,
    mergeableState: pull.mergeableState,
    files,
    timeline,
    headStatuses,
    prGreenCheck: prGreenState(checkRuns, config.prGreenCheck),
  };
  const verdict = eligibility.evaluateEligibility(snapshot, {
    config,
    freezeIssues: freezeIssues.map((i) => ({ number: i.number, title: i.title, body: i.body })),
    state,
    now: now(),
  });
  out(
    `#${n} ${sanitizeTitle(pull.title)} (${pull.author}) → ${pull.baseRef} @ ${short(pull.headSha)}`
  );
  out(`verdict: ${verdict.eligible ? "ELIGIBLE" : "NOT eligible"}`);
  for (const r of verdict.reasons ?? []) out(`  - ${r.code}: ${sanitizeTitle(r.detail)}`);
  const a = verdict.approval ?? {};
  out(
    `approval: ${a.valid ? "valid" : "invalid"}${a.actor ? ` by ${a.actor}` : ""}` +
      `${a.labeledAt ? ` at ${fmtTime(a.labeledAt)}` : ""}${a.reason ? ` (${a.reason})` : ""}`
  );
  out(`protected surface: ${verdict.protectedSurface ? "yes" : "no"}`);
  out(`${config.prGreenCheck} on head: ${snapshot.prGreenCheck ?? "none"}`);
  for (const action of verdict.actions ?? []) {
    out(
      action.type === "removeLabel"
        ? `next tick would remove label ${action.label}`
        : `next tick would comment (${action.key})`
    );
  }
  return 0;
}

// ───────────────────────────── entry ─────────────────────────────

/**
 * @param {string[]} argv   arguments after `cli.mjs`
 * @param {{gh?: object, out?: (line: string) => void, err?: (line: string) => void,
 *          config?: object, now?: () => string, exec?: (cmd: string, args: string[])
 *          => Promise<{stdout: string}>, apiUrl?: string, eligibility?: object}} [deps]
 *   injected in tests: gh (API client), exec (replaces `gh` the binary), apiUrl (client base),
 *   eligibility (replaces ./eligibility.mjs)
 * @returns {Promise<number>} exit code
 */
export async function runCli(argv, deps = {}) {
  const out = deps.out ?? ((line) => process.stdout.write(`${line}\n`));
  const err = deps.err ?? ((line) => process.stderr.write(`${line}\n`));
  const now = deps.now ?? (() => new Date().toISOString());
  let parsed;
  try {
    parsed = parseArgs(argv);
  } catch (error) {
    err(`error: ${error.message}`);
    err(USAGE);
    return 2;
  }
  const { command, positionals, flags } = parsed;
  if (flags.help || command === "help") {
    out(USAGE);
    return 0;
  }
  if (!command || !COMMANDS.includes(command)) {
    err(command ? `error: unknown command ${command}` : "error: missing command");
    err(USAGE);
    return 2;
  }
  const extra = Object.keys(flags).filter(
    (f) => f !== "repo" && !ALLOWED_FLAGS[command].includes(`--${f}`)
  );
  if (extra.length) {
    err(`error: ${command} does not accept --${extra[0]}`);
    err(USAGE);
    return 2;
  }
  try {
    const config = deps.config ?? loadConfig();
    const gh = deps.gh ?? (await buildClient(flags, deps));
    const ctx = { gh, config, flags, positionals, out, err, now, eligibility: deps.eligibility };
    switch (command) {
      case "status":
        if (positionals.length) throw new UsageError("status takes no positional arguments");
        return await cmdStatus(ctx);
      case "history":
        if (positionals.length) throw new UsageError("history takes no positional arguments");
        return await cmdHistory(ctx);
      case "add":
        return await cmdLabel(ctx, true);
      case "remove":
        return await cmdLabel(ctx, false);
      case "pause":
      case "resume":
        return await cmdDispatch(ctx, command);
      case "why":
        return await cmdWhy(ctx);
    }
  } catch (error) {
    if (error instanceof UsageError) {
      err(`error: ${error.message}`);
      err(USAGE);
      return 2;
    }
    err(`error: ${error.message}`);
    return 1;
  }
  return 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli(process.argv.slice(2)).then((code) => {
    process.exitCode = code;
  });
}
