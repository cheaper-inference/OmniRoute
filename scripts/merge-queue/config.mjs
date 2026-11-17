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

const isRecord = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const nonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;
const LABEL_RE = /^[^\s,][^,]{0,49}$/;
const LOGIN_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,33}$/;
const STATUS_CONTEXT_RE = /^[A-Za-z0-9._/-]{1,100}$/;
/**
 * The land status lives in the namespace the candidate verdict ignores (checks.mjs OWN_PREFIX):
 * outside it, a withdrawn (failure) land status would turn the candidate red.
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
 * @typedef {object} QueueConfig
 * @property {1} schemaVersion
 * @property {string} label                    queue label (shadow: "omni-queue")
 * @property {string} protectedApprovalLabel   extra label required for protected surfaces
 * @property {string[]} approvers              logins whose label application counts
 * @property {string} appSlug                  GitHub App slug; its bot is "<slug>[bot]"
 * @property {string} bases                    RegExp source matched against the PR base
 * @property {string[]} blockLabels
 * @property {{maxSize: number, minSize: number, maxWaitMinutes: number}} batch
 * @property {{mode: "merge-ff"|"squash-api", actor: "app"|"owner", identity?: {name: string, email: string}, statusContext: string}} landing
 *                                             actor "owner" lands with `identity` (a noreply address);
 *                                             statusContext is the commit status the queue publishes
 * @property {string[]} requiredChecks         check names that must be `success` on the candidate
 * @property {string[]} advisoryChecks         check names whose failure is tolerated
 * @property {string[]} aggregateChecks        always() gate checks that fail whenever a job they
 *                                             need fails; ignored by classify next to other failures
 * @property {number} checksTimeoutMinutes
 * @property {number} infraRetries             re-runs of the same candidate on infra failure
 * @property {boolean} preferGreenPrChecks
 * @property {string} prGreenCheck             PR-level check preferred when selecting a batch
 * @property {string[]} protectedPaths         globs (contracts.matchesGlob) of protected surfaces
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
    if (!CONFIG_KEYS.includes(key)) errors.push(`${key}: unknown key`);
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
  if (!isRecord(raw.batch)) errors.push("batch: expected object");
  else {
    for (const key of Object.keys(raw.batch)) {
      if (!["maxSize", "minSize", "maxWaitMinutes"].includes(key))
        errors.push(`batch.${key}: unknown key`);
    }
    positiveInt(raw.batch.maxSize, "batch.maxSize", errors, { max: 32 });
    positiveInt(raw.batch.minSize, "batch.minSize", errors, { max: 32 });
    positiveInt(raw.batch.maxWaitMinutes, "batch.maxWaitMinutes", errors, { min: 0, max: 1440 });
    if (
      Number.isSafeInteger(raw.batch.minSize) &&
      Number.isSafeInteger(raw.batch.maxSize) &&
      raw.batch.minSize > raw.batch.maxSize
    )
      errors.push("batch.minSize: must be <= batch.maxSize");
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
  if (typeof raw.preferGreenPrChecks !== "boolean")
    errors.push("preferGreenPrChecks: expected boolean");
  if (!nonEmptyString(raw.prGreenCheck)) errors.push("prGreenCheck: invalid");
  stringList(raw.protectedPaths, "protectedPaths", errors, { min: 1 });
  if (!QUEUE_MODES.includes(raw.mode))
    errors.push(`mode: expected one of ${QUEUE_MODES.join(", ")}`);
  return errors.length
    ? { ok: false, config: null, errors }
    : { ok: true, config: /** @type {QueueConfig} */ ({ ...raw, landing }), errors: [] };
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
