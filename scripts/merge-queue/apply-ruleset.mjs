#!/usr/bin/env node
// scripts/merge-queue/apply-ruleset.mjs — WP6. Plan §3.9: apply the omni-queue rulesets.
//
//   node scripts/merge-queue/apply-ruleset.mjs --base <branch> [--dry-run]
//        [--repo <owner/repo>] [--app-id <id>]                      (--kind release, default)
//   node scripts/merge-queue/apply-ruleset.mjs --kind queue-refs [--dry-run]
//        [--repo <owner/repo>] [--app-id <id>]
//
// Two kinds, each a JSON template under config/merge-queue/:
//   release     ruleset.release.json — the status door of ONE release branch, found by name
//               ("<template name>: <branch>"). No pull_request rule and no bypass actor: a commit
//               reaches the branch (push or merge) only if it carries the land status
//               (config.landing.statusContext) written by the queue's GitHub App, pinned with
//               integration_id. The queue writes that status on the validated candidate right
//               before landing it; the landing push is then made as config.landing.actor.
//   queue-refs  ruleset.queue-refs.json — the queue's own refs (omni-queue-state, omni-queue/**/*):
//               only the App (its single bypass actor) may create, update or delete them. Takes no
//               --base; the ruleset keeps the fixed name of its template.
// Created when absent, updated when its normalized form differs, left alone otherwise. --dry-run
// prints the diff and the REST body and performs no write.
//
// Landing path (release kind): afterwards it reads every rule GitHub enforces on the branch
// (GET /repos/{repo}/rules/branches/{base}) and reports rules from OTHER rulesets (for example
// "Require PR on default branch" on ~DEFAULT_BRANCH) that would reject the landing push because
// the landing actor is not one of their bypass actors (the App, or for `landing.actor: owner` the
// repository admin role / organization admins): a warning on --dry-run, exit 1 on a real apply.
// A non-strict required_status_checks rule that only requires checks of config.requiredChecks from
// GitHub Actions is already satisfied by the candidate pushed: printed as info, never counted.
//
// Production lock: a real apply (no --dry-run, either kind) against cheaper-inference/OmniRoute
// (or its old name diegosouzapw/OmniRoute, which redirects) is refused unless
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
import { LANDING_ACTORS, loadConfig } from "./config.mjs";
import { sanitizeBase } from "./contracts.mjs";
import { createGitHubClient } from "./github.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const DEFAULT_TEMPLATE_PATH = join(ROOT, "config", "merge-queue", "ruleset.release.json");
export const QUEUE_REFS_TEMPLATE_PATH = join(
  ROOT,
  "config",
  "merge-queue",
  "ruleset.queue-refs.json"
);

/** The rulesets this script applies (`--kind`). */
export const RULESET_KINDS = Object.freeze(["release", "queue-refs"]);

/** Placeholder replaced by the base branch in conditions.ref_name.include. */
export const BASE_PLACEHOLDER = "{{base}}";

/** Placeholder replaced by config.landing.statusContext in the required status check. */
export const STATUS_CONTEXT_PLACEHOLDER = "{{statusContext}}";

/** Repositories (lowercase owner/repo) where a real apply needs the explicit override. */
export const PRODUCTION_REPOSITORIES = Object.freeze([
  "cheaper-inference/omniroute",
  "diegosouzapw/omniroute",
]);

/**
 * Rule types that would make the PR's own checks a merge requirement (never wanted here). The one
 * exception is a single required_status_checks rule carrying only the land status context
 * (buildRuleset enforces it): the queue itself writes that status on the candidate.
 */
export const CHECK_REQUIRING_RULE_TYPES = Object.freeze([
  "required_status_checks",
  "required_deployments",
  "merge_queue",
  "workflows",
  "code_scanning",
]);

/** The only parameters the required_status_checks rule of a template may carry. */
const STATUS_RULE_PARAMETER_KEYS = Object.freeze([
  "strict_required_status_checks_policy",
  "do_not_enforce_on_create",
  "required_status_checks",
]);

const BRANCH_RE = /^[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*$/;
const REPO_RE = /^[A-Za-z0-9._-]+\/[A-Za-z0-9._-]+$/;
const APP_ID_RE = /^[1-9][0-9]{0,15}$/;
const STATUS_CONTEXT_RE = /^[A-Za-z0-9._/-]{1,100}$/; // same rule as config.landing.statusContext

/** Repository role id of "Admin" (the repository owner's token acts as this role). */
const REPOSITORY_ADMIN_ROLE_ID = 5;

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
 * Fill a template. The release template needs a base: conditions.ref_name.include =
 * ["refs/heads/<base>"] and the name suffixed with it. A template without the base placeholder
 * (queue-refs) takes no base and keeps its fixed name and refs.
 * The required status check (release): context = statusContext, integration_id = appId.
 * The Integration bypass actor slot (queue-refs): actor_id = appId.
 * appId null → the integration_id / Integration bypass actor is left out (dry-run preview only:
 * main() refuses a real apply without it, because that pin / bypass is what scopes the rule to
 * the queue's App).
 * @param {object} template   parsed ruleset.release.json or ruleset.queue-refs.json
 * @param {{base?: string, appId?: number|null, statusContext?: string}} input
 * @returns {object} REST body for POST/PUT /repos/{owner}/{repo}/rulesets
 */
export function buildRuleset(template, input) {
  const hasBase = input?.base !== undefined && input?.base !== null;
  const base = hasBase ? assertBranchName(input.base) : null;
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
  if (!Array.isArray(include) || include.length === 0)
    throw new Error("ruleset template: conditions.ref_name.include is required");
  const usesBase = include.some((r) => String(r).includes(BASE_PLACEHOLDER));
  if (hasBase && !usesBase)
    throw new Error(`ruleset template: conditions.ref_name.include needs ${BASE_PLACEHOLDER}`);
  if (!hasBase && usesBase) assertBranchName(input?.base); // throws: a base is required

  const body = stripPrivateKeys(structuredClone(template));
  body.name = hasBase ? `${template.name.trim()}: ${base}` : template.name.trim();
  body.conditions.ref_name.include = include.map((r) =>
    String(r).replaceAll(BASE_PLACEHOLDER, base ?? "")
  );
  if (!Array.isArray(body.conditions.ref_name.exclude)) body.conditions.ref_name.exclude = [];
  body.rules = body.rules.map((rule) =>
    fillRule(rule, { appId, statusContext: input?.statusContext })
  );
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

/**
 * Resolve the placeholders of one rule and refuse the check-requiring rules that are not the land
 * status: required_status_checks stays forbidden except as exactly one rule carrying exactly one
 * check (the land status context, pinned to the App), never strict.
 */
function fillRule(rule, { appId, statusContext }) {
  const type = String(rule?.type);
  if (!CHECK_REQUIRING_RULE_TYPES.includes(type)) return rule;
  if (type !== "required_status_checks")
    throw new Error(
      `ruleset template: rule ${type} is not allowed (the only check-requiring rule is ` +
        "required_status_checks, for the land status alone)"
    );
  if (typeof statusContext !== "string" || !STATUS_CONTEXT_RE.test(statusContext))
    throw new Error(`invalid status context: ${JSON.stringify(statusContext)}`);
  const parameters = rule.parameters;
  if (!isRecord(parameters))
    throw new Error("ruleset template: required_status_checks needs parameters");
  for (const key of Object.keys(parameters)) {
    if (!STATUS_RULE_PARAMETER_KEYS.includes(key))
      throw new Error(`ruleset template: required_status_checks has an unexpected key: ${key}`);
  }
  if (parameters.strict_required_status_checks_policy !== false)
    throw new Error(
      "ruleset template: strict_required_status_checks_policy must be false (the queue " +
        "validates the candidate against the base it lands on)"
    );
  if (parameters.do_not_enforce_on_create !== false)
    throw new Error(
      "ruleset template: do_not_enforce_on_create must be false (a branch created on a commit " +
        "without the land status would get in)"
    );
  const checks = parameters.required_status_checks;
  if (!Array.isArray(checks) || checks.length !== 1)
    throw new Error(
      `ruleset template: required_status_checks needs exactly one check (the land status ` +
        `${JSON.stringify(statusContext)})`
    );
  const [check] = checks;
  if (!isRecord(check)) throw new Error("ruleset template: the required status check is invalid");
  for (const key of Object.keys(check)) {
    if (key !== "context" && key !== "integration_id")
      throw new Error(`ruleset template: the required status check has an unexpected key: ${key}`);
  }
  if (check.context !== STATUS_CONTEXT_PLACEHOLDER && check.context !== statusContext)
    throw new Error(
      `ruleset template: the only required status check allowed is the land status ` +
        `${JSON.stringify(statusContext)} (got ${JSON.stringify(check.context)})`
    );
  if (check.integration_id !== null && check.integration_id !== undefined)
    throw new Error(
      "ruleset template: integration_id of the required status check is filled from --app-id"
    );
  const filled = { context: statusContext };
  if (appId !== null) filled.integration_id = appId;
  return { ...rule, parameters: { ...parameters, required_status_checks: [filled] } };
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
 * @param {{gh: object, base?: string, desired: object, dryRun: boolean}} input
 * @returns {Promise<{action: "create"|"update"|"noop", id: number|null, diff: string[]}>}
 */
export async function applyRuleset(input) {
  const { gh, desired, dryRun } = input ?? {};
  // A branch ruleset (release kind) must target exactly the base it was asked for; the
  // queue-refs ruleset has no base and keeps the refs of its template.
  if (input?.base !== undefined && input?.base !== null) {
    const expectedRef = `refs/heads/${assertBranchName(input.base)}`;
    if (!desired?.conditions?.ref_name?.include?.includes(expectedRef))
      throw new Error(`desired ruleset does not target ${expectedRef}`);
  } else if (!desired?.conditions?.ref_name?.include?.length) {
    throw new Error("desired ruleset does not target any ref");
  }
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
 * Rule types that reject the queue's fast-forward landing push (a merge commit it composed,
 * pushed outside any PR merge, by the App or by the owner) unless the landing actor is a bypass
 * actor of THEIR ruleset: a ruleset's bypass list only covers that ruleset's own rules.
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

/**
 * App id of GitHub Actions: the integration_id GitHub gives the check runs of workflow jobs. The
 * candidate's checks come from its push run on omni-queue/**, and the queue's verdict
 * (checks.mjs, REQUIRED_CHECK_APP "github-actions") only counts a required check green when a run
 * of this app reported it.
 */
export const GITHUB_ACTIONS_APP_ID = 15368;

/** The parameters a required_status_checks rule may carry and still be satisfied by the candidate. */
const SATISFIED_STATUS_RULE_PARAMETER_KEYS = new Set([
  "strict_required_status_checks_policy",
  // only relaxes the rule when a branch is created; the landing push updates an existing branch
  "do_not_enforce_on_create",
  "required_status_checks",
]);

/**
 * A required_status_checks rule of another ruleset does not reject the landing push when the
 * commit pushed already carries those checks green. GitHub: commits "must first be pushed to
 * another branch, then merged or pushed directly to a branch that matches the rule after status
 * checks have passed". merge-ff pushes exactly the candidate, and the queue blesses a candidate
 * only after its verdict saw every config.requiredChecks green on it from GitHub Actions. So the
 * rule is satisfied when: it is not strict (strict would also need the candidate up to date with
 * the branch at push time: kept blocking, conservatively), it has no other parameter, it lists at
 * least one check, and every check is {context, integration_id?} with a context the queue
 * requires (compared exactly) and integration_id absent, null or GITHUB_ACTIONS_APP_ID.
 * @param {object} rule  one entry of GET /rules/branches/{base}
 * @param {string[]} requiredChecks  config.requiredChecks
 * @returns {string[]|null} the contexts of the rule when it is satisfied, else null
 */
function satisfiedStatusRule(rule, requiredChecks) {
  if (rule?.type !== "required_status_checks") return null;
  const parameters = rule.parameters;
  if (!isRecord(parameters)) return null;
  if (Object.keys(parameters).some((key) => !SATISFIED_STATUS_RULE_PARAMETER_KEYS.has(key)))
    return null;
  if (parameters.strict_required_status_checks_policy !== false) return null;
  const doNotEnforceOnCreate = parameters.do_not_enforce_on_create;
  if (doNotEnforceOnCreate !== undefined && typeof doNotEnforceOnCreate !== "boolean") return null;
  const checks = parameters.required_status_checks;
  if (!Array.isArray(checks) || checks.length === 0) return null;
  const queueChecks = new Set(Array.isArray(requiredChecks) ? requiredChecks : []);
  const contexts = [];
  for (const check of checks) {
    if (!isRecord(check)) return null;
    if (Object.keys(check).some((key) => key !== "context" && key !== "integration_id"))
      return null;
    if (typeof check.context !== "string" || !queueChecks.has(check.context)) return null;
    const integrationId = check.integration_id;
    if (
      integrationId !== undefined &&
      integrationId !== null &&
      integrationId !== GITHUB_ACTIONS_APP_ID
    )
      return null;
    contexts.push(check.context);
  }
  return contexts;
}

/** Bypass modes that also cover direct pushes ("pull_request" only covers PR merges). */
const PUSH_BYPASS_MODES = new Set(["always", "exempt"]);

/**
 * Bypass actors that cover the owner's token: the repository Admin role or an organization admin,
 * in "always" mode ("pull_request" mode does not cover the direct landing push).
 */
const isOwnerBypass = (actor) =>
  String(actor?.bypass_mode ?? "always") === "always" &&
  ((actor?.actor_type === "RepositoryRole" &&
    Number(actor.actor_id) === REPOSITORY_ADMIN_ROLE_ID) ||
    actor?.actor_type === "OrganizationAdmin");

/**
 * Read the rules GitHub enforces on `base` (GET /repos/{repo}/rules/branches/{base}, all pages,
 * every ruleset that matches it, organization ones included) and report those coming from a ruleset
 * other than `ownRulesetId` that would stop the landing push of `actor`: "app" (the queue's App,
 * which must be an always/exempt Integration bypass actor of that ruleset) or "owner" (the
 * repository owner's token, covered only by an "always" bypass of RepositoryRole 5 or
 * OrganizationAdmin).
 * Example: "Require PR on default branch" (~DEFAULT_BRANCH, pull_request, no bypass) also
 * applies to whichever release branch is the default one.
 * One exception, whoever lands: a required_status_checks rule the candidate already satisfies
 * (see satisfiedStatusRule; needs `requiredChecks`, the queue's config.requiredChecks) does not
 * block and is reported in `info` instead.
 * @param {{gh: object, repo: string, base: string, ownRulesetId: number|null,
 *          appId: number|null, actor?: "app"|"owner", requiredChecks?: string[]}} input
 *          actor defaults to "app"; requiredChecks to [] (no status rule is then accepted)
 * @returns {Promise<{blockers: string[], warnings: string[], info: string[]}>} blockers: rule
 *          types in LANDING_BLOCKING_RULE_TYPES not bypassed by the landing actor; warnings: other
 *          types; info: required_status_checks rules accepted because the candidate satisfies them
 */
export async function checkLandingPath(input) {
  const {
    gh,
    repo,
    ownRulesetId = null,
    appId = null,
    actor = "app",
    requiredChecks = [],
  } = input ?? {};
  if (!LANDING_ACTORS.includes(actor))
    throw new Error(`invalid landing actor: ${JSON.stringify(actor)}`);
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
  const info = [];
  for (const rule of rules) {
    const type = String(rule?.type);
    const rulesetId = rule?.ruleset_id ?? null;
    if (ownRulesetId !== null && rulesetId === ownRulesetId) continue;
    if (LANDING_SAFE_RULE_TYPES.has(type)) continue;
    const source = `ruleset ${rulesetId} (${rule?.ruleset_source_type ?? "?"} ${rule?.ruleset_source ?? "?"})`;
    const satisfied = satisfiedStatusRule(rule, requiredChecks);
    if (satisfied) {
      info.push(
        `rule ${type} from ${source} on ${base}: does not block the landing push: it is not ` +
          `strict and requires only ${satisfied.map((c) => JSON.stringify(c)).join(", ")}, ` +
          "which the queue's verdict (requiredChecks) already saw green from GitHub Actions on " +
          "the candidate it pushes"
      );
      continue;
    }
    let reason;
    if (actor === "app" && appId === null) {
      reason = "cannot tell whether the omni-queue App bypasses it without --app-id";
    } else {
      const actors = await bypassActorsOf(rulesetId);
      if (actors === null) {
        reason = "its bypass actors are not readable with this token";
      } else if (
        actor === "owner"
          ? actors.some(isOwnerBypass)
          : actors.some(
              (a) =>
                a?.actor_type === "Integration" &&
                Number(a.actor_id) === appId &&
                PUSH_BYPASS_MODES.has(String(a.bypass_mode ?? "always"))
            )
      ) {
        continue;
      } else {
        reason =
          actor === "owner"
            ? 'the repository owner is not an "always" bypass actor (RepositoryRole 5 or ' +
              "OrganizationAdmin) of it"
            : `the omni-queue App (Integration ${appId}) is not an "always" bypass actor`;
      }
    }
    const line = `rule ${type} from ${source} on ${base}: ${reason}`;
    if (LANDING_BLOCKING_RULE_TYPES.includes(type)) blockers.push(line);
    else warnings.push(line);
  }
  return { blockers, warnings, info };
}

// ───────────────────────────── CLI ─────────────────────────────

const USAGE = [
  "usage: node scripts/merge-queue/apply-ruleset.mjs --base <branch> [--dry-run]",
  "                                                  [--repo <owner/repo>] [--app-id <id>]",
  "       node scripts/merge-queue/apply-ruleset.mjs --kind queue-refs [--dry-run]",
  "                                                  [--repo <owner/repo>] [--app-id <id>]",
  "  --kind     release (default): the status door of one release branch;",
  "             queue-refs: the ruleset of the queue's own refs (takes no --base)",
  "  --base     release branch to protect (e.g. release/v3.8.55); required for --kind release",
  "  --dry-run  print the diff and the REST body; write nothing",
  "  --repo     owner/repo (default: GITHUB_REPOSITORY)",
  "  --app-id   numeric id of the omni-queue GitHub App (default: OMNI_QUEUE_APP_ID); required",
  "             for a real apply (release: integration_id of the land status; queue-refs: the",
  "             only bypass actor)",
  "The land status context and the landing actor come from config/merge-queue/config.json.",
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
 * @param {{gh?: object, template?: object, config?: {landing: {actor: string,
 *          statusContext: string}}, out?: (line: string) => void, err?: (line: string) => void,
 *          execFile?: typeof execFileSync}} [deps]  test seams
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
        kind: { type: "string", default: "release" },
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
  const kind = values.kind;
  if (!RULESET_KINDS.includes(kind)) {
    err(`apply-ruleset: --kind must be one of ${RULESET_KINDS.join(", ")} (got ${kind})`);
    err(USAGE);
    return 2;
  }
  if (kind === "queue-refs") {
    if (values.base !== undefined) {
      err("apply-ruleset: --kind queue-refs takes no --base (the queue's refs are fixed)");
      return 2;
    }
  } else {
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
      kind === "queue-refs"
        ? "apply-ruleset: a real apply needs --app-id: the App is the only bypass actor of " +
            "the queue's refs, without it nobody could update them"
        : "apply-ruleset: a real apply needs --app-id: it pins the land status to the " +
            "omni-queue App (integration_id), without it any source could write that status"
    );
    return 2;
  }

  try {
    const templatePath = kind === "queue-refs" ? QUEUE_REFS_TEMPLATE_PATH : DEFAULT_TEMPLATE_PATH;
    const template = deps.template ?? JSON.parse(readFileSync(templatePath, { encoding: "utf8" }));
    // The release ruleset is filled from the queue config; queue-refs needs nothing from it.
    const config = kind === "release" ? (deps.config ?? loadConfig()) : null;
    const desired = buildRuleset(template, {
      base: kind === "release" ? values.base : undefined,
      appId,
      statusContext: config?.landing.statusContext,
    });
    if (appId === null)
      err(
        kind === "queue-refs"
          ? "apply-ruleset: no --app-id: the preview leaves out the omni-queue App bypass actor"
          : "apply-ruleset: no --app-id: the preview leaves integration_id unpinned " +
              "(the land status would be accepted from any source)"
      );
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
    const result = await applyRuleset({
      gh,
      base: kind === "release" ? values.base : undefined,
      desired,
      dryRun,
    });
    const where = result.id === null ? "" : ` (id ${result.id})`;
    out(`apply-ruleset: ${result.action} ${JSON.stringify(desired.name)} on ${repo}${where}`);
    for (const line of result.diff) out(`  ${line}`);
    if (dryRun) {
      out("apply-ruleset: dry-run, nothing was written. REST body:");
      out(JSON.stringify(desired, null, 2));
    }

    // The queue's refs are not a landing target: only release branches have a landing path.
    if (kind === "queue-refs") return 0;

    const actor = config.landing.actor;
    let landing;
    try {
      landing = await checkLandingPath({
        gh,
        repo,
        base: values.base,
        ownRulesetId: result.id,
        appId,
        actor,
        requiredChecks: config.requiredChecks ?? [],
      });
    } catch (error) {
      const why = error?.message ?? String(error);
      landing = { blockers: [`could not read the rules enforced on ${values.base}: ${why}`] };
    }
    for (const line of landing.info ?? []) out(`apply-ruleset: info: ${line}`);
    for (const line of landing.warnings ?? []) err(`apply-ruleset: warning: ${line}`);
    for (const line of landing.blockers) {
      err(
        `apply-ruleset: ${dryRun ? "warning" : "error"}: landing push would be rejected: ${line}`
      );
    }
    if (landing.blockers.length) {
      err(
        "apply-ruleset: remove those rulesets (the status door replaces them), with the owner's " +
          "approval, then run this again until it exits 0 (docs/ops/OMNI_QUEUE.md → Ruleset, and " +
          "Cut-over and rollback)."
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
