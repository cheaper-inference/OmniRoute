#!/usr/bin/env node
// scripts/merge-queue/apply-ruleset.mjs — WP6. Plan §3.9: apply config/merge-queue/ruleset.release.json.
//
//   node scripts/merge-queue/apply-ruleset.mjs --base <branch> [--dry-run]
//        [--repo <owner/repo>] [--app-id <id>]
//
// One ruleset per release branch, found by name ("<template name>: <branch>"): created when
// absent, updated when its normalized form differs, left alone otherwise. --dry-run prints the
// diff and the REST body and performs no write.
//
// Landing path: afterwards it reads every rule GitHub enforces on the branch
// (GET /repos/{repo}/rules/branches/{base}) and reports rules from OTHER rulesets (for example
// "Require PR on default branch" on ~DEFAULT_BRANCH) that would reject the App's fast-forward
// landing push because the App is not one of their bypass actors: a warning on --dry-run,
// exit 1 on a real apply.
//
// Production lock: a real apply (no --dry-run) against cheaper-inference/OmniRoute (or its old
// name diegosouzapw/OmniRoute, which redirects) is refused unless
// OMNI_QUEUE_ALLOW_PRODUCTION_RULESET=1. Checked twice: on the --repo string before any API
// call, then on the full_name GitHub resolves (redirects included) before any write. The
// cut-over is the owner's decision (docs/ops/OMNI_QUEUE.md → "Cut-over").
//
// Token: GITHUB_TOKEN, else `gh auth token` (execFile, never a shell). Never printed.

import { execFileSync } from "node:child_process";
import { readFileSync, realpathSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { sanitizeBase } from "./contracts.mjs";
import { createGitHubClient } from "./github.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const DEFAULT_TEMPLATE_PATH = join(ROOT, "config", "merge-queue", "ruleset.release.json");

/** Placeholder replaced by the base branch in conditions.ref_name.include. */
export const BASE_PLACEHOLDER = "{{base}}";

/** Repositories (lowercase owner/repo) where a real apply needs the explicit override. */
export const PRODUCTION_REPOSITORIES = Object.freeze([
  "cheaper-inference/omniroute",
  "diegosouzapw/omniroute",
]);

/** Rule types that would make the PR's own checks a merge requirement (never wanted here). */
export const CHECK_REQUIRING_RULE_TYPES = Object.freeze([
  "required_status_checks",
  "required_deployments",
  "merge_queue",
  "workflows",
  "code_scanning",
]);

const BRANCH_RE = /^[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/;
const REPO_RE = /^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/;
const APP_ID_RE = /^[1-9][0-9]{0,15}$/;

const isRecord = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

function stripPrivateKeys(value) {
  if (Array.isArray(value)) return value.map(stripPrivateKeys);
  if (!isRecord(value)) return value;
  const out = {};
  for (const [key, v] of Object.entries(value)) {
    if (!key.startsWith("_")) out[key] = stripPrivateKeys(v);
  }
  return out;
}

/** Throws unless `base` is a plain branch name (no wildcard, no refs/ prefix, no `..`). */
export function assertBranchName(base) {
  const name = String(base ?? "");
  if (
    !BRANCH_RE.test(name) ||
    name.startsWith("refs/") ||
    name.includes("..") ||
    name.split("/").some((seg) => seg.startsWith(".") || seg.endsWith(".lock"))
  )
    throw new Error(`invalid base branch: ${JSON.stringify(base)}`);
  sanitizeBase(name); // same rule the queue uses for its own ref names
  return name;
}

/**
 * Fill the template for one branch: conditions.ref_name.include = ["refs/heads/<base>"], the
 * name suffixed with the base, and the App bypass actor id (Integration) from appId.
 * appId null → the Integration bypass actor is left out (dry-run preview only: main() refuses a
 * real apply without it, because the merge-ff landing push needs that bypass).
 * @param {object} template   parsed ruleset.release.json
 * @param {{base: string, appId: number|null}} input
 * @returns {object} REST body for POST/PUT /repos/{owner}/{repo}/rulesets
 */
export function buildRuleset(template, input) {
  const base = assertBranchName(input?.base);
  const appId = input?.appId ?? null;
  if (appId !== null && (!Number.isSafeInteger(appId) || appId <= 0))
    throw new Error(`invalid app id: ${JSON.stringify(appId)}`);
  if (!isRecord(template)) throw new Error("ruleset template: expected an object");
  if (typeof template.name !== "string" || !template.name.trim())
    throw new Error("ruleset template: name is required");
  if (!Array.isArray(template.rules) || template.rules.length === 0)
    throw new Error("ruleset template: rules are required");
  const duplicated = duplicateRuleTypes(template.rules);
  if (duplicated.length)
    throw new Error(`ruleset template: duplicate rule types: ${duplicated.join(", ")}`);
  const include = template.conditions?.ref_name?.include;
  if (!Array.isArray(include) || !include.some((r) => String(r).includes(BASE_PLACEHOLDER)))
    throw new Error(`ruleset template: conditions.ref_name.include needs ${BASE_PLACEHOLDER}`);

  const body = stripPrivateKeys(structuredClone(template));
  body.name = `${template.name.trim()}: ${base}`;
  body.conditions.ref_name.include = include.map((r) =>
    String(r).replaceAll(BASE_PLACEHOLDER, base)
  );
  if (!Array.isArray(body.conditions.ref_name.exclude)) body.conditions.ref_name.exclude = [];
  body.bypass_actors = (Array.isArray(body.bypass_actors) ? body.bypass_actors : []).flatMap(
    (actor) => {
      if (actor?.actor_type !== "Integration" || actor.actor_id !== null) return [actor];
      return appId === null ? [] : [{ ...actor, actor_id: appId }];
    }
  );
  if (JSON.stringify(body).includes("{{"))
    throw new Error("ruleset template: unresolved placeholder");
  return body;
}

// ───────────────────────────── normalization / diff ─────────────────────────────

const sortStrings = (list) => [...(Array.isArray(list) ? list : [])].map(String).sort();

/** Rule types that appear more than once (GitHub allows one rule of each type per ruleset). */
function duplicateRuleTypes(rules) {
  const seen = new Map();
  for (const rule of Array.isArray(rules) ? rules : []) {
    const type = String(rule?.type);
    seen.set(type, (seen.get(type) ?? 0) + 1);
  }
  return [...seen].filter(([, n]) => n > 1).map(([type]) => type);
}

/** Parameters with "off" values (false/0/null/""/[]) dropped and keys sorted recursively. */
function canonicalParams(value) {
  if (Array.isArray(value)) {
    const items = value.map(canonicalParams);
    return items.every((v) => typeof v !== "object" || v === null)
      ? [...items].sort((a, b) => String(a).localeCompare(String(b)))
      : items;
  }
  if (!isRecord(value)) return value;
  const out = {};
  for (const key of Object.keys(value).sort()) {
    const v = canonicalParams(value[key]);
    if (v === false || v === 0 || v === null || v === undefined || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    // GitHub echoes disabled sub-objects (dismissal_restriction: {enabled: false,
    // allowed_actors: []}); once canonicalized they are empty and mean "unset".
    if (isRecord(v) && Object.keys(v).length === 0) continue;
    out[key] = v;
  }
  return out;
}

/**
 * Canonical form used for the create/update/noop decision: server-only fields (id, node_id,
 * _links, timestamps, source, current_user_can_bypass) are ignored, lists are sorted, and
 * parameters that are off by default compare equal to their absence.
 */
export function normalizeRuleset(ruleset) {
  const r = isRecord(ruleset) ? ruleset : {};
  const rules = (Array.isArray(r.rules) ? r.rules : [])
    .map((rule) => {
      const parameters = canonicalParams(rule?.parameters ?? {});
      return Object.keys(parameters).length
        ? { type: String(rule?.type), parameters }
        : { type: String(rule?.type) };
    })
    .sort((a, b) => a.type.localeCompare(b.type));
  const bypassActors = (Array.isArray(r.bypass_actors) ? r.bypass_actors : [])
    .map((a) => ({
      actor_type: String(a?.actor_type),
      actor_id: a?.actor_id ?? null,
      bypass_mode: String(a?.bypass_mode ?? "always"),
    }))
    .sort((a, b) => actorKey(a).localeCompare(actorKey(b)));
  return {
    name: r.name ?? null,
    target: r.target ?? "branch",
    enforcement: r.enforcement ?? null,
    conditions: {
      ref_name: {
        include: sortStrings(r.conditions?.ref_name?.include),
        exclude: sortStrings(r.conditions?.ref_name?.exclude),
      },
    },
    rules,
    bypass_actors: bypassActors,
  };
}

function actorKey(actor) {
  return `${actor.actor_type}:${actor.actor_id}`;
}

const show = (v) => (v === undefined ? "(unset)" : JSON.stringify(v));

/**
 * Human-readable differences between the current ruleset (null = absent) and the desired one.
 * Empty array = equivalent. Lines start with "+" (added), "-" (removed) or "~" (changed).
 * @returns {string[]}
 */
export function diffRulesets(current, desired) {
  const wantDuplicates = duplicateRuleTypes(desired?.rules);
  if (wantDuplicates.length)
    throw new Error(`desired ruleset has duplicate rule types: ${wantDuplicates.join(", ")}`);
  const want = normalizeRuleset(desired);
  if (current === null || current === undefined) {
    return [
      `+ name: ${show(want.name)}`,
      `+ target: ${show(want.target)}`,
      `+ enforcement: ${show(want.enforcement)}`,
      `+ conditions.ref_name.include: ${show(want.conditions.ref_name.include)}`,
      ...(want.conditions.ref_name.exclude.length
        ? [`+ conditions.ref_name.exclude: ${show(want.conditions.ref_name.exclude)}`]
        : []),
      ...want.rules.map((rule) => `+ rule ${rule.type}${ruleParams(rule)}`),
      ...want.bypass_actors.map((a) => `+ bypass ${actorKey(a)} (${a.bypass_mode})`),
    ];
  }
  const have = normalizeRuleset(current);
  const lines = [];
  for (const key of ["name", "target", "enforcement"]) {
    if (have[key] !== want[key]) lines.push(`~ ${key}: ${show(have[key])} → ${show(want[key])}`);
  }
  for (const key of ["include", "exclude"]) {
    const a = have.conditions.ref_name[key];
    const b = want.conditions.ref_name[key];
    if (JSON.stringify(a) !== JSON.stringify(b))
      lines.push(`~ conditions.ref_name.${key}: ${show(a)} → ${show(b)}`);
  }
  // A Map keeps one rule per type: report the extra copies instead of hiding them.
  for (const type of duplicateRuleTypes(have.rules)) {
    const copies = have.rules.filter((rule) => rule.type === type).length;
    lines.push(`- rule ${type}: ${copies - 1} duplicate(s) in the current ruleset`);
  }
  const haveRules = new Map(have.rules.map((rule) => [rule.type, rule]));
  const wantRules = new Map(want.rules.map((rule) => [rule.type, rule]));
  for (const [type, rule] of wantRules) {
    const old = haveRules.get(type);
    if (!old) {
      lines.push(`+ rule ${type}${ruleParams(rule)}`);
      continue;
    }
    const a = old.parameters ?? {};
    const b = rule.parameters ?? {};
    for (const param of [...new Set([...Object.keys(a), ...Object.keys(b)])].sort()) {
      if (JSON.stringify(a[param]) !== JSON.stringify(b[param]))
        lines.push(`~ rule ${type}.${param}: ${show(a[param])} → ${show(b[param])}`);
    }
  }
  for (const [type, rule] of haveRules) {
    if (!wantRules.has(type)) lines.push(`- rule ${type}${ruleParams(rule)}`);
  }
  const haveActors = new Map(have.bypass_actors.map((a) => [actorKey(a), a]));
  const wantActors = new Map(want.bypass_actors.map((a) => [actorKey(a), a]));
  for (const [key, actor] of wantActors) {
    const old = haveActors.get(key);
    if (!old) lines.push(`+ bypass ${key} (${actor.bypass_mode})`);
    else if (old.bypass_mode !== actor.bypass_mode)
      lines.push(`~ bypass ${key}: ${old.bypass_mode} → ${actor.bypass_mode}`);
  }
  for (const [key, actor] of haveActors) {
    if (!wantActors.has(key)) lines.push(`- bypass ${key} (${actor.bypass_mode})`);
  }
  return lines;
}

function ruleParams(rule) {
  return rule.parameters ? ` ${JSON.stringify(rule.parameters)}` : "";
}

// ───────────────────────────── apply ─────────────────────────────

/**
 * Find the repository ruleset with the desired name and create / update / leave it.
 * With dryRun the returned action is what WOULD happen; no write method of gh is called.
 * @param {{gh: object, base: string, desired: object, dryRun: boolean}} input
 * @returns {Promise<{action: "create"|"update"|"noop", id: number|null, diff: string[]}>}
 */
export async function applyRuleset(input) {
  const { gh, desired, dryRun } = input ?? {};
  const base = assertBranchName(input?.base);
  const expectedRef = `refs/heads/${base}`;
  if (!desired?.conditions?.ref_name?.include?.includes(expectedRef))
    throw new Error(`desired ruleset does not target ${expectedRef}`);
  const listed = await gh.listRulesets();
  const sameName = (Array.isArray(listed) ? listed : []).filter(
    (r) =>
      r?.name === desired.name && (r.source_type === undefined || r.source_type === "Repository")
  );
  const wantTarget = desired.target ?? "branch";
  const otherTarget = sameName.filter((r) => (r.target ?? "branch") !== wantTarget);
  if (otherTarget.length)
    throw new Error(
      `repository ruleset ${JSON.stringify(desired.name)} already exists with target ` +
        `${otherTarget.map((r) => `${JSON.stringify(r.target)} (id ${r.id})`).join(", ")}; ` +
        `GitHub refuses a second ruleset with that name: rename or delete it by hand`
    );
  const matches = sameName;
  if (matches.length > 1)
    throw new Error(
      `${matches.length} repository rulesets are named ${JSON.stringify(desired.name)}; ` +
        `resolve the duplicate by hand (ids: ${matches.map((r) => r.id).join(", ")})`
    );
  if (matches.length === 0) {
    const diff = diffRulesets(null, desired);
    if (dryRun) return { action: "create", id: null, diff };
    const created = await gh.createRuleset(desired);
    return { action: "create", id: created?.id ?? null, diff };
  }
  const id = matches[0].id;
  const current = await gh.getRuleset(id);
  const diff = diffRulesets(current, desired);
  if (diff.length === 0) return { action: "noop", id, diff };
  if (!dryRun) await gh.updateRuleset(id, desired);
  return { action: "update", id, diff };
}

// ───────────────────────────── landing path ─────────────────────────────

/**
 * Rule types that reject the queue's fast-forward landing push (an App pushing a merge commit
 * it composed, outside any PR merge) unless the App is a bypass actor of THEIR ruleset: a
 * ruleset's bypass list only covers that ruleset's own rules.
 */
export const LANDING_BLOCKING_RULE_TYPES = Object.freeze([
  "pull_request",
  "required_status_checks",
  "update",
  "required_linear_history",
  "required_signatures",
  "merge_queue",
  "required_deployments",
  "workflows",
  "code_scanning",
]);

/** Rule types that never affect a fast-forward push to an existing branch. */
const LANDING_SAFE_RULE_TYPES = new Set(["deletion", "non_fast_forward", "creation"]);

/** Bypass modes that also cover direct pushes ("pull_request" only covers PR merges). */
const PUSH_BYPASS_MODES = new Set(["always", "exempt"]);

/**
 * Read the rules GitHub enforces on `base` (GET /repos/{repo}/rules/branches/{base}, all pages,
 * every ruleset that matches it, organization ones included) and report those coming from a ruleset
 * other than `ownRulesetId` that would stop the App's landing push.
 * Example: "Require PR on default branch" (~DEFAULT_BRANCH, pull_request, no bypass) also
 * applies to whichever release branch is the default one.
 * @param {{gh: object, repo: string, base: string, ownRulesetId: number|null,
 *          appId: number|null}} input
 * @returns {Promise<{blockers: string[], warnings: string[]}>} blockers: rule types in
 *          LANDING_BLOCKING_RULE_TYPES not bypassed by the App; warnings: other unknown types
 */
export async function checkLandingPath(input) {
  const { gh, repo, ownRulesetId = null, appId = null } = input ?? {};
  const base = assertBranchName(input?.base);
  if (!REPO_RE.test(String(repo ?? ""))) throw new Error(`invalid repo: ${JSON.stringify(repo)}`);
  const branchPath = base.split("/").map(encodeURIComponent).join("/");
  // Paginated endpoint: follow every Link rel="next" page (paginate uses per_page=100).
  const rules = await gh.paginate(`/repos/${repo}/rules/branches/${branchPath}`);
  const bypassByRuleset = new Map();
  const bypassActorsOf = async (rulesetId) => {
    if (!bypassByRuleset.has(rulesetId)) {
      let actors = null;
      try {
        const ruleset = await gh.getRuleset(rulesetId);
        if (Array.isArray(ruleset?.bypass_actors)) actors = ruleset.bypass_actors;
      } catch {
        actors = null; // not readable with this token: treated as "not bypassed"
      }
      bypassByRuleset.set(rulesetId, actors);
    }
    return bypassByRuleset.get(rulesetId);
  };

  const blockers = [];
  const warnings = [];
  for (const rule of rules) {
    const type = String(rule?.type);
    const rulesetId = rule?.ruleset_id ?? null;
    if (ownRulesetId !== null && rulesetId === ownRulesetId) continue;
    if (LANDING_SAFE_RULE_TYPES.has(type)) continue;
    const source = `ruleset ${rulesetId} (${rule?.ruleset_source_type ?? "?"} ${rule?.ruleset_source ?? "?"})`;
    let reason;
    if (appId === null) {
      reason = "cannot tell whether the omni-queue App bypasses it without --app-id";
    } else {
      const actors = await bypassActorsOf(rulesetId);
      if (actors === null) {
        reason = "its bypass actors are not readable with this token";
      } else if (
        actors.some(
          (a) =>
            a?.actor_type === "Integration" &&
            Number(a.actor_id) === appId &&
            PUSH_BYPASS_MODES.has(String(a.bypass_mode ?? "always"))
        )
      ) {
        continue;
      } else {
        reason = `the omni-queue App (Integration ${appId}) is not an "always" bypass actor`;
      }
    }
    const line = `rule ${type} from ${source} on ${base}: ${reason}`;
    if (LANDING_BLOCKING_RULE_TYPES.includes(type)) blockers.push(line);
    else warnings.push(line);
  }
  return { blockers, warnings };
}

// ───────────────────────────── CLI ─────────────────────────────

const USAGE = [
  "usage: node scripts/merge-queue/apply-ruleset.mjs --base <branch> [--dry-run]",
  "                                                  [--repo <owner/repo>] [--app-id <id>]",
  "  --base     release branch to protect (e.g. release/v3.8.55)",
  "  --dry-run  print the diff and the REST body; write nothing",
  "  --repo     owner/repo (default: GITHUB_REPOSITORY)",
  "  --app-id   numeric id of the omni-queue GitHub App (default: OMNI_QUEUE_APP_ID);",
  "             required for a real apply (bypass actor of the fast-forward landing push)",
  "A real apply on cheaper-inference/OmniRoute also needs OMNI_QUEUE_ALLOW_PRODUCTION_RULESET=1.",
  "Exit codes: 0 ok, 1 failure (API error, or another ruleset would reject the landing push),",
  "2 usage error or refused.",
].join("\n");

/** True when owner/repo is the production repository (case-insensitive, old name included). */
export function isProductionRepository(repo) {
  return PRODUCTION_REPOSITORIES.includes(String(repo ?? "").toLowerCase());
}

function resolveToken(env, execImpl) {
  if (env.GITHUB_TOKEN) return env.GITHUB_TOKEN;
  const token = String(execImpl("gh", ["auth", "token"], { encoding: "utf8" }) ?? "").trim();
  if (!token) throw new Error("no GitHub token: set GITHUB_TOKEN or log in with `gh auth login`");
  return token;
}

/**
 * CLI entry. @returns {Promise<number>} exit code (0 ok, 1 failure: API error, or on a real
 * apply another ruleset would reject the landing push; 2 usage / refused)
 * @param {string[]} [argv]
 * @param {Record<string, string|undefined>} [env]
 * @param {{gh?: object, template?: object, out?: (line: string) => void,
 *          err?: (line: string) => void, execFile?: typeof execFileSync}} [deps]  test seams
 */
export async function main(argv = process.argv.slice(2), env = process.env, deps = {}) {
  const out = deps.out ?? ((line) => console.log(line));
  const err = deps.err ?? ((line) => console.error(line));
  let values;
  try {
    ({ values } = parseArgs({
      args: argv,
      strict: true,
      allowPositionals: false,
      options: {
        base: { type: "string" },
        "dry-run": { type: "boolean", default: false },
        repo: { type: "string" },
        "app-id": { type: "string" },
        help: { type: "boolean", short: "h", default: false },
      },
    }));
  } catch (error) {
    err(`apply-ruleset: ${error.message}`);
    err(USAGE);
    return 2;
  }
  if (values.help) {
    out(USAGE);
    return 0;
  }
  const dryRun = values["dry-run"];
  const repo = values.repo ?? env.GITHUB_REPOSITORY ?? "";
  const rawAppId = values["app-id"] ?? env.OMNI_QUEUE_APP_ID ?? "";
  if (!values.base) {
    err("apply-ruleset: --base is required");
    err(USAGE);
    return 2;
  }
  try {
    assertBranchName(values.base);
  } catch (error) {
    err(`apply-ruleset: ${error.message}`);
    return 2;
  }
  if (!REPO_RE.test(repo)) {
    err(`apply-ruleset: --repo must be owner/repo (got ${JSON.stringify(repo)})`);
    return 2;
  }
  if (rawAppId !== "" && !APP_ID_RE.test(rawAppId)) {
    err(`apply-ruleset: --app-id must be a positive integer (got ${JSON.stringify(rawAppId)})`);
    return 2;
  }
  const appId = rawAppId === "" ? null : Number(rawAppId);
  if (!dryRun && isProductionRepository(repo) && env.OMNI_QUEUE_ALLOW_PRODUCTION_RULESET !== "1") {
    err(
      `apply-ruleset: refusing to write a ruleset on ${repo} (production). Use --dry-run, or ` +
        "set OMNI_QUEUE_ALLOW_PRODUCTION_RULESET=1 once the owner approved the cut-over."
    );
    return 2;
  }
  if (!dryRun && appId === null) {
    err(
      "apply-ruleset: a real apply needs --app-id: without the App bypass actor the " +
        "fast-forward landing push of the queue is rejected by the pull_request rule"
    );
    return 2;
  }

  try {
    const template =
      deps.template ?? JSON.parse(readFileSync(DEFAULT_TEMPLATE_PATH, { encoding: "utf8" }));
    const desired = buildRuleset(template, { base: values.base, appId });
    if (appId === null)
      err("apply-ruleset: no --app-id: the preview leaves out the omni-queue App bypass actor");
    const gh =
      deps.gh ??
      createGitHubClient({
        token: resolveToken(env, deps.execFile ?? execFileSync),
        repository: repo,
      });
    if (!dryRun) {
      // Second gate, before any write: an alias the string check does not know (rename,
      // transfer) resolves, through GitHub's redirect, to the production full_name.
      const info = await gh.request("GET", `/repos/${repo}`);
      const fullName = info?.data?.full_name;
      if (typeof fullName !== "string" || !REPO_RE.test(fullName))
        throw new Error(`could not resolve the repository ${repo} before writing`);
      if (isProductionRepository(fullName) && env.OMNI_QUEUE_ALLOW_PRODUCTION_RULESET !== "1") {
        err(
          `apply-ruleset: refusing to write a ruleset on ${repo}: it resolves to ${fullName} ` +
            "(production). Use --dry-run, or set OMNI_QUEUE_ALLOW_PRODUCTION_RULESET=1 once the " +
            "owner approved the cut-over."
        );
        return 2;
      }
    }
    const result = await applyRuleset({ gh, base: values.base, desired, dryRun });
    const where = result.id === null ? "" : ` (id ${result.id})`;
    out(`apply-ruleset: ${result.action} ${JSON.stringify(desired.name)} on ${repo}${where}`);
    for (const line of result.diff) out(`  ${line}`);
    if (dryRun) {
      out("apply-ruleset: dry-run, nothing was written. REST body:");
      out(JSON.stringify(desired, null, 2));
    }

    let landing;
    try {
      landing = await checkLandingPath({
        gh,
        repo,
        base: values.base,
        ownRulesetId: result.id,
        appId,
      });
    } catch (error) {
      const why = error?.message ?? String(error);
      landing = { blockers: [`could not read the rules enforced on ${values.base}: ${why}`] };
    }
    for (const line of landing.warnings ?? []) err(`apply-ruleset: warning: ${line}`);
    for (const line of landing.blockers) {
      err(
        `apply-ruleset: ${dryRun ? "warning" : "error"}: landing push would be rejected: ${line}`
      );
    }
    if (landing.blockers.length) {
      err(
        "apply-ruleset: add the omni-queue App as an always bypass actor of those rulesets, or " +
          "exclude the branch from them (owner approval; docs/ops/OMNI_QUEUE.md → Ruleset)."
      );
      if (!dryRun) return 1;
    }
    return 0;
  } catch (error) {
    err(`apply-ruleset: ${error?.message ?? String(error)}`);
    return 1;
  }
}

function invokedDirectly() {
  try {
    return (
      Boolean(process.argv[1]) && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
    );
  } catch {
    return false;
  }
}

if (invokedDirectly()) {
  main().then((code) => {
    process.exitCode = code;
  });
}
