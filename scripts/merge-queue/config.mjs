// scripts/merge-queue/config.mjs — load and validate config/merge-queue/config.json.
//
// Zero-dependency on purpose (see contracts.mjs): the orchestrator runs without `npm ci`.
// tests/unit/merge-queue/config.test.mjs validates the same file with a Zod schema and checks
// that this validator and Zod agree on a battery of mutated configs (differential test).

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { APPROVAL_CONTEXTS, SCHEMA_VERSION } from "./contracts.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const DEFAULT_CONFIG_PATH = join(ROOT, "config", "merge-queue", "config.json");

export const LANDING_MODES = Object.freeze(["merge-ff", "squash-api"]);
export const LANDING_ACTORS = Object.freeze(["app", "owner"]);
export const QUEUE_MODES = Object.freeze(["shadow", "live"]);

const CONFIG_KEYS = [
  "schemaVersion",
  "label",
  "protectedApprovalLabel",
  "approvers",
  "appSlug",
  "bases",
  "blockLabels",
  "batch",
  "landing",
  "requiredChecks",
  "advisoryChecks",
  "aggregateChecks",
  "checksTimeoutMinutes",
  "infraRetries",
  "preferGreenPrChecks",
  "prGreenCheck",
  "protectedPaths",
  "mode",
];

/** Keys that may be left out: each one has a default (applied by validateConfig). */
const OPTIONAL_CONFIG_KEYS = ["flakyReruns", "prChecksRequired", "lanes"];
/** Keys of `lanes` (both required when `lanes` is present). */
const LANE_KEYS = ["hotfixLabel", "baseRepairLabel"];
/** Re-runs of a red candidate's failed jobs before it is classified (tick onRed): once. */
const DEFAULT_FLAKY_RERUNS = 1;
/** Keys of `batch`; `adaptive` and `startSize` are optional (defaults: false, maxSize). */
const BATCH_KEYS = ["maxSize", "minSize", "maxWaitMinutes", "adaptive", "startSize"];

const isRecord = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const nonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;
const LABEL_RE = /^[^\s,][^,]{0,49}$/;
const LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,33}$/;
const STATUS_CONTEXT_RE = /^[A-Za-z0-9._/-]{1,100}$/;
/**
 * The land status context stays in the queue's own namespace, next to the approval contexts: the
 * release ruleset requires it by name, and a name under omni-queue/ keeps it apart from the
 * contexts third parties (other Apps, workflows) report. The candidate verdict reads no commit
 * status at all (checks.mjs), so the prefix plays no part in it.
 */
const LAND_STATUS_PREFIX = "omni-queue/";
const NOREPLY_EMAIL_RE = /^[^\s@]+@users\.noreply\.github\.com$/;
const LANDING_KEYS = ["mode", "actor", "identity", "statusContext"];
const DEFAULT_LANDING_ACTOR = "app";
const DEFAULT_LAND_STATUS_CONTEXT = "omni-queue/land";

function stringList(value, path, errors, { min = 0, item = nonEmptyString } = {}) {
  if (!Array.isArray(value)) return errors.push(`${path}: expected array`);
  if (value.length < min) errors.push(`${path}: expected at least ${min} item(s)`);
  value.forEach((v, i) => {
    if (!item(v)) errors.push(`${path}[${i}]: invalid`);
  });
  if (new Set(value).size !== value.length) errors.push(`${path}: duplicate entries`);
}

function positiveInt(value, path, errors, { min = 1, max = Number.MAX_SAFE_INTEGER } = {}) {
  if (!Number.isSafeInteger(value) || value < min || value > max)
    errors.push(`${path}: expected integer in [${min}, ${max}]`);
}

/**
 * Validate the `landing` block, push every problem onto `errors` and return the block with its
 * defaults applied (`actor: "app"`, `statusContext: "omni-queue/land"`), or null when `raw` is not
 * an object. The returned block is only used when `errors` stays empty.
 */
function validateLanding(raw, errors) {
  if (!isRecord(raw)) {
    errors.push(`landing.mode: expected one of ${LANDING_MODES.join(", ")}`);
    return null;
  }
  for (const key of Object.keys(raw)) {
    if (!LANDING_KEYS.includes(key)) errors.push(`landing.${key}: unknown key`);
  }
  if (!LANDING_MODES.includes(raw.mode))
    errors.push(`landing.mode: expected one of ${LANDING_MODES.join(", ")}`);
  const actor = Object.hasOwn(raw, "actor") ? raw.actor : DEFAULT_LANDING_ACTOR;
  if (!LANDING_ACTORS.includes(actor))
    errors.push(`landing.actor: expected one of ${LANDING_ACTORS.join(", ")}`);
  const hasIdentity = Object.hasOwn(raw, "identity");
  if (actor === "owner" && !hasIdentity)
    errors.push("landing.identity: required when landing.actor is owner");
  if (hasIdentity && actor !== "owner")
    errors.push("landing.identity: only allowed when landing.actor is owner");
  if (hasIdentity) {
    const identity = raw.identity;
    if (!isRecord(identity)) errors.push("landing.identity: expected object");
    else {
      for (const key of Object.keys(identity)) {
        if (key !== "name" && key !== "email") errors.push(`landing.identity.${key}: unknown key`);
      }
      if (!nonEmptyString(identity.name)) errors.push("landing.identity.name: invalid");
      if (typeof identity.email !== "string" || !NOREPLY_EMAIL_RE.test(identity.email))
        errors.push("landing.identity.email: must be a @users.noreply.github.com address");
    }
  }
  const statusContext = Object.hasOwn(raw, "statusContext")
    ? raw.statusContext
    : DEFAULT_LAND_STATUS_CONTEXT;
  if (typeof statusContext !== "string" || !STATUS_CONTEXT_RE.test(statusContext))
    errors.push("landing.statusContext: invalid (expected [A-Za-z0-9._/-]{1,100})");
  else if (
    !statusContext.startsWith(LAND_STATUS_PREFIX) ||
    statusContext.length === LAND_STATUS_PREFIX.length
  )
    errors.push(`landing.statusContext: must start with ${LAND_STATUS_PREFIX}`);
  // An approval context as the land status would make a label approval a blessing.
  else if (Object.values(APPROVAL_CONTEXTS).includes(statusContext))
    errors.push("landing.statusContext: must not equal an approval context");
  return { ...raw, actor, statusContext };
}

/**
 * Validate the optional `lanes` block of `raw` (the whole config), push every problem onto
 * `errors` and return it, or null when it is left out (no lanes). Both labels are label names,
 * distinct from each other and from `label`, `protectedApprovalLabel` and `blockLabels`, compared
 * case-insensitively as GitHub compares label names. Absence is `raw.lanes === undefined`, so the
 * runbook's key probe (a Proxy that owns no key) still sees both keys read.
 */
function validateLanes(raw, errors) {
  const lanes = raw.lanes;
  if (lanes === undefined) return null;
  if (!isRecord(lanes)) {
    errors.push("lanes: expected an object {hotfixLabel, baseRepairLabel}");
    return null;
  }
  for (const key of Object.keys(lanes)) {
    if (!LANE_KEYS.includes(key)) errors.push(`lanes.${key}: unknown key`);
  }
  const valid = [];
  for (const key of LANE_KEYS) {
    const value = lanes[key];
    if (typeof value !== "string" || !LABEL_RE.test(value)) errors.push(`lanes.${key}: invalid`);
    else valid.push(key);
  }
  if (valid.length !== LANE_KEYS.length) return lanes;
  const lower = (v) => String(v).toLowerCase();
  if (lower(lanes.hotfixLabel) === lower(lanes.baseRepairLabel))
    errors.push("lanes.baseRepairLabel: must differ from lanes.hotfixLabel");
  const others = [
    raw.label,
    raw.protectedApprovalLabel,
    ...(Array.isArray(raw.blockLabels) ? raw.blockLabels : []),
  ].map(lower);
  for (const key of LANE_KEYS) {
    if (others.includes(lower(lanes[key])))
      errors.push(`lanes.${key}: must differ from label, protectedApprovalLabel and blockLabels`);
  }
  return lanes;
}

/**
 * @typedef {object} QueueConfig
 * @property {1} schemaVersion
 * @property {string} label                    queue label (shadow: "omni-queue")
 * @property {string} protectedApprovalLabel   extra label required for protected surfaces
 * @property {string[]} approvers              logins whose label application counts
 * @property {string} appSlug                  GitHub App slug; its bot is "<slug>[bot]"
 * @property {string} bases                    RegExp source matched against the PR base
 * @property {string[]} blockLabels
 * @property {{maxSize: number, minSize: number, maxWaitMinutes: number, adaptive: boolean,
 *             startSize: number}} batch   adaptive (optional, default false): the batch size is
 *                                             a window (state.batchWindow) that starts at
 *                                             startSize (optional, default maxSize), halves after
 *                                             a red root batch and grows by one after a full one
 *                                             lands; without it every batch is up to maxSize
 * @property {{mode: "merge-ff"|"squash-api", actor: "app"|"owner", identity?: {name: string, email: string}, statusContext: string}} landing
 *                                             actor "owner" lands with `identity` (a noreply address);
 *                                             statusContext is the commit status the queue publishes
 * @property {string[]} requiredChecks         check names that must be `success` on the candidate
 * @property {string[]} advisoryChecks         check names whose failure is tolerated
 * @property {string[]} aggregateChecks        always() gate checks that fail whenever a job they
 *                                             need fails; ignored by classify next to other failures
 * @property {number} checksTimeoutMinutes
 * @property {number} infraRetries             re-runs of the same candidate on infra failure
 * @property {0|1} flakyReruns                 optional, default 1: re-runs of a red candidate's
 *                                             failed jobs (same run) before it is classified
 * @property {boolean} preferGreenPrChecks
 * @property {string} prGreenCheck             PR-level check preferred when selecting a batch
 * @property {string[]} prChecksRequired       optional, default []: PR-level checks that must be
 *                                             green on a PR's head before it can enter a batch
 * @property {string[]} protectedPaths         globs (contracts.matchesGlob) of protected surfaces
 * @property {{hotfixLabel: string, baseRepairLabel: string}|null} lanes  optional, default null
 *                                             (no lanes): the label of each lane (eligibility
 *                                             laneOf). A hotfix PR is composed alone ahead of the
 *                                             FIFO; a base-repair PR alone too, and it is the
 *                                             only thing a base-red pause processes
 * @property {"shadow"|"live"} mode
 */

/**
 * @param {unknown} raw
 * @returns {{ok: true, config: QueueConfig, errors: []} | {ok: false, config: null, errors: string[]}}
 */
export function validateConfig(raw) {
  const errors = [];
  if (!isRecord(raw)) return { ok: false, config: null, errors: ["config: expected object"] };
  for (const key of Object.keys(raw)) {
    if (!CONFIG_KEYS.includes(key) && !OPTIONAL_CONFIG_KEYS.includes(key))
      errors.push(`${key}: unknown key`);
  }
  for (const key of CONFIG_KEYS) {
    if (!Object.hasOwn(raw, key)) errors.push(`${key}: required`);
  }
  if (raw.schemaVersion !== SCHEMA_VERSION)
    errors.push(`schemaVersion: expected ${SCHEMA_VERSION}`);
  for (const key of ["label", "protectedApprovalLabel"]) {
    if (typeof raw[key] !== "string" || !LABEL_RE.test(raw[key])) errors.push(`${key}: invalid`);
  }
  if (raw.label === raw.protectedApprovalLabel)
    errors.push("protectedApprovalLabel: must differ from label");
  stringList(raw.approvers, "approvers", errors, {
    min: 1,
    item: (v) => typeof v === "string" && LOGIN_RE.test(v),
  });
  if (typeof raw.appSlug !== "string" || !SLUG_RE.test(raw.appSlug))
    errors.push("appSlug: invalid");
  if (!nonEmptyString(raw.bases)) errors.push("bases: expected RegExp source");
  else {
    try {
      new RegExp(raw.bases);
      if (!raw.bases.startsWith("^") || !raw.bases.endsWith("$"))
        errors.push("bases: must be anchored (^...$)");
    } catch {
      errors.push("bases: invalid RegExp");
    }
  }
  stringList(raw.blockLabels, "blockLabels", errors, {
    item: (v) => typeof v === "string" && LABEL_RE.test(v),
  });
  let batch = null;
  if (!isRecord(raw.batch)) errors.push("batch: expected object");
  else {
    for (const key of Object.keys(raw.batch)) {
      if (!BATCH_KEYS.includes(key)) errors.push(`batch.${key}: unknown key`);
    }
    const { maxSize, minSize } = raw.batch;
    positiveInt(maxSize, "batch.maxSize", errors, { max: 32 });
    positiveInt(minSize, "batch.minSize", errors, { max: 32 });
    positiveInt(raw.batch.maxWaitMinutes, "batch.maxWaitMinutes", errors, { min: 0, max: 1440 });
    const sizesValid = Number.isSafeInteger(minSize) && Number.isSafeInteger(maxSize);
    if (sizesValid && minSize > maxSize) errors.push("batch.minSize: must be <= batch.maxSize");
    const adaptive = Object.hasOwn(raw.batch, "adaptive") ? raw.batch.adaptive : false;
    if (typeof adaptive !== "boolean")
      errors.push("batch.adaptive: expected boolean (true = the batch size adapts)");
    // Absent, startSize is maxSize: only an explicit value can be wrong (an invalid maxSize is
    // reported once, by its own check).
    const hasStartSize = Object.hasOwn(raw.batch, "startSize");
    const startSize = hasStartSize ? raw.batch.startSize : maxSize;
    if (
      hasStartSize &&
      (!Number.isSafeInteger(startSize) ||
        (sizesValid && (startSize < minSize || startSize > maxSize)))
    )
      errors.push(
        // the sizes are only printed when valid: a malformed one may be any JSON value
        sizesValid
          ? `batch.startSize: expected an integer from batch.minSize (${minSize}) to ` +
              `batch.maxSize (${maxSize})`
          : "batch.startSize: expected an integer from batch.minSize to batch.maxSize"
      );
    batch = { ...raw.batch, adaptive, startSize };
  }
  const landing = validateLanding(raw.landing, errors);
  stringList(raw.requiredChecks, "requiredChecks", errors, { min: 1 });
  stringList(raw.advisoryChecks, "advisoryChecks", errors);
  if (
    Array.isArray(raw.requiredChecks) &&
    Array.isArray(raw.advisoryChecks) &&
    raw.requiredChecks.some((c) => raw.advisoryChecks.includes(c))
  )
    errors.push("advisoryChecks: must not overlap requiredChecks");
  stringList(raw.aggregateChecks, "aggregateChecks", errors);
  if (
    typeof landing?.statusContext === "string" &&
    [raw.requiredChecks, raw.aggregateChecks].some(
      (list) => Array.isArray(list) && list.includes(landing.statusContext)
    )
  )
    errors.push("landing.statusContext: must not equal a required or aggregate check");
  positiveInt(raw.checksTimeoutMinutes, "checksTimeoutMinutes", errors, { min: 10, max: 1440 });
  positiveInt(raw.infraRetries, "infraRetries", errors, { min: 0, max: 5 });
  const flakyReruns = Object.hasOwn(raw, "flakyReruns") ? raw.flakyReruns : DEFAULT_FLAKY_RERUNS;
  if (flakyReruns !== 0 && flakyReruns !== 1)
    errors.push("flakyReruns: expected 0 (off) or 1 (re-run a red candidate's failed jobs once)");
  if (typeof raw.preferGreenPrChecks !== "boolean")
    errors.push("preferGreenPrChecks: expected boolean");
  if (!nonEmptyString(raw.prGreenCheck)) errors.push("prGreenCheck: invalid");
  const prChecksRequired = Object.hasOwn(raw, "prChecksRequired") ? raw.prChecksRequired : [];
  if (!Array.isArray(prChecksRequired))
    errors.push("prChecksRequired: expected an array of check names");
  else {
    prChecksRequired.forEach((name, i) => {
      if (!nonEmptyString(name))
        errors.push(`prChecksRequired[${i}]: expected a non-empty check name`);
    });
    if (new Set(prChecksRequired).size !== prChecksRequired.length)
      errors.push("prChecksRequired: duplicate check names");
  }
  stringList(raw.protectedPaths, "protectedPaths", errors, { min: 1 });
  const lanes = validateLanes(raw, errors);
  if (!QUEUE_MODES.includes(raw.mode))
    errors.push(`mode: expected one of ${QUEUE_MODES.join(", ")}`);
  return errors.length
    ? { ok: false, config: null, errors }
    : {
        ok: true,
        config: /** @type {QueueConfig} */ ({
          ...raw,
          batch,
          landing,
          flakyReruns,
          prChecksRequired,
          lanes,
        }),
        errors: [],
      };
}

/** Read + validate; throws with every error listed when the file is invalid. */
export function loadConfig(path = DEFAULT_CONFIG_PATH) {
  const raw = JSON.parse(readFileSync(path, "utf8"));
  const result = validateConfig(raw);
  if (!result.ok)
    throw new Error(`invalid omni-queue config ${path}:\n- ${result.errors.join("\n- ")}`);
  return Object.freeze(result.config);
}

/** True when `base` is a queue-managed base branch. */
export function isManagedBase(config, base) {
  return new RegExp(config.bases).test(String(base ?? ""));
}
