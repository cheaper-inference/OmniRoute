// scripts/check/lib/gateMode.mjs
// Shared mode resolver for the gates that judge DERIVED content (translation mirrors, UI
// catalogs of the non-English locales, generated docs, quality baselines, managed counts).
//
// Plan "derived numbers and texts resolved only at release" (2026-11-13): a feature PR never
// writes a value that depends on the state of its base. Those values are recomputed once, by
// the release refresh (`release:refresh-derived`) or by a translation wave. So every gate that
// compares derived content against the tree runs in one of two modes:
//
//   pr       — judge only what the change itself did. Never fail because the base moved.
//   release  — strict equality against the tree, as these gates always did.
//
// Resolution order (first match wins):
//   1. `--mode=pr|release` on the command line;
//   2. `OMNIROUTE_GATE_MODE=pr|release` in the environment;
//   3. automatic, from the GitHub Actions event:
//        pull_request / pull_request_target, head not `release/v*`  → pr
//        merge_group, or push to `omni-queue/**` (a queue batch is a sum of feature PRs,
//        none of which carries refreshed derived files)              → pr
//        everything else — push, schedule, workflow_dispatch, the release PR
//        (`release/v* → main`) and any local run                     → release
//
// A local run defaults to `release` on purpose: it is the behaviour every gate had before the
// split, so nothing gets weaker by accident. Pass `--mode=pr` to preview what CI will judge.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const GATE_MODES = Object.freeze(["pr", "release"]);

const PR_EVENTS = new Set(["pull_request", "pull_request_target"]);
const RELEASE_HEAD = /^release\/v/;
const QUEUE_REF = /^omni-queue\//;

function assertMode(value, source) {
  if (!GATE_MODES.includes(value)) {
    throw new Error(`invalid gate mode "${value}" from ${source} (expected pr or release)`);
  }
  return value;
}

/**
 * Mode implied by the GitHub Actions event alone (step 3 above).
 * @param {Record<string, string | undefined>} env
 * @returns {{ mode: "pr" | "release", reason: string }}
 */
export function detectGateMode(env = process.env) {
  const event = env.GITHUB_EVENT_NAME || "";
  if (PR_EVENTS.has(event)) {
    const head = env.GITHUB_HEAD_REF || "";
    if (RELEASE_HEAD.test(head)) return { mode: "release", reason: `${event} from ${head}` };
    return { mode: "pr", reason: event };
  }
  if (event === "merge_group") return { mode: "pr", reason: "merge_group" };
  const refName = env.GITHUB_REF_NAME || "";
  if (event === "push" && QUEUE_REF.test(refName)) {
    return { mode: "pr", reason: `push to ${refName}` };
  }
  return { mode: "release", reason: event ? event : "local run" };
}

/**
 * Full resolution with its provenance, for log lines.
 * @param {{ argv?: string[], env?: Record<string, string | undefined> }} [opts]
 * @returns {{ mode: "pr" | "release", source: "flag" | "env" | "auto", reason: string }}
 */
export function resolveGateModeInfo({ argv = process.argv, env = process.env } = {}) {
  const flag = argv.find((arg) => arg.startsWith("--mode="));
  if (flag) {
    return {
      mode: assertMode(flag.slice("--mode=".length), "--mode"),
      source: "flag",
      reason: flag,
    };
  }
  const fromEnv = (env.OMNIROUTE_GATE_MODE || "").trim();
  if (fromEnv) {
    return {
      mode: assertMode(fromEnv, "OMNIROUTE_GATE_MODE"),
      source: "env",
      reason: `OMNIROUTE_GATE_MODE=${fromEnv}`,
    };
  }
  return { ...detectGateMode(env), source: "auto" };
}

/** @returns {"pr" | "release"} */
export function resolveGateMode(opts = {}) {
  return resolveGateModeInfo(opts).mode;
}

/** One log fragment, e.g. `mode=pr (auto: pull_request)`. */
export function describeGateMode(info) {
  return `mode=${info.mode} (${info.source}: ${info.reason})`;
}

function git(args, cwd) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function tryGit(args, cwd) {
  try {
    return git(args, cwd);
  } catch {
    return null;
  }
}

function packageVersion(cwd) {
  try {
    return JSON.parse(fs.readFileSync(path.join(cwd, "package.json"), "utf8")).version || null;
  } catch {
    return null;
  }
}

/**
 * Base refs worth trying, most specific first: the base SHA the workflow passes, an explicit
 * BASE_REF, the PR's base branch, and finally the active release line of package.json.
 */
export function baseRefCandidates(env = process.env, cwd = process.cwd()) {
  const out = [];
  for (const value of [env.BASE_SHA, env.GITHUB_BASE_SHA, env.BASE_REF]) {
    if (value && value.trim()) out.push(value.trim());
  }
  if (env.GITHUB_BASE_REF) out.push(`origin/${env.GITHUB_BASE_REF}`);
  const version = packageVersion(cwd);
  if (version && /^\d+\.\d+\.\d+$/.test(version)) out.push(`origin/release/v${version}`);
  return [...new Set(out)];
}

/**
 * Merge base between HEAD and the first resolvable candidate, or null (shallow clone, unknown
 * ref). Callers SKIP their diff-based check on null, like the other diff-aware gates do.
 * @returns {{ sha: string, ref: string } | null}
 */
export function resolvePrDiffBase({ env = process.env, cwd = process.cwd() } = {}) {
  for (const ref of baseRefCandidates(env, cwd)) {
    if (!tryGit(["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], cwd)) continue;
    const sha = tryGit(["merge-base", "HEAD", ref], cwd);
    if (sha) return { sha, ref };
  }
  return null;
}

/**
 * Paths the change touches relative to `base` (a commit). Renames count on both sides, so
 * moving a file into or out of a guarded tree is visible. With `includeWorktree` the staged,
 * unstaged and untracked files of a local checkout are added — what a developer is about to
 * commit is judged the same way CI will judge it.
 * @returns {string[]} sorted, unique, repo-relative POSIX paths
 */
export function listChangedFiles(base, { cwd = process.cwd(), includeWorktree = false } = {}) {
  const lines = git(["diff", "--name-only", "--no-renames", base, "HEAD"], cwd).split("\n");
  if (includeWorktree) {
    lines.push(...git(["diff", "--name-only", "--no-renames", "HEAD"], cwd).split("\n"));
    lines.push(...git(["ls-files", "--others", "--exclude-standard"], cwd).split("\n"));
  }
  return [...new Set(lines.map((line) => line.trim()).filter(Boolean))].sort();
}

/** Current head branch: the PR head in Actions, otherwise the checked-out branch. */
export function resolveHeadBranch({ env = process.env, cwd = process.cwd() } = {}) {
  if (env.GITHUB_HEAD_REF) return env.GITHUB_HEAD_REF;
  if (env.GITHUB_REF_NAME && env.GITHUB_EVENT_NAME === "push") return env.GITHUB_REF_NAME;
  const branch = tryGit(["rev-parse", "--abbrev-ref", "HEAD"], cwd);
  return branch && branch !== "HEAD" ? branch : "";
}
