// bin/cli/launch/contract/builders.mjs: plan and adapter builders.
// Part of the launcher contract; import it through ../contract.mjs (pure: no I/O).

import { ADAPTER_CONTRACT, PLACEHOLDERS, PLAN_VERSION, PLATFORMS } from "./constants.mjs";
import { json } from "./json.mjs";
import { ensureV1, statePath, tempPath } from "./paths.mjs";
import { toml } from "./toml.mjs";
import { yaml } from "./yaml.mjs";

/** @typedef {import("../contract.d.ts").LaunchAdapter} LaunchAdapter */
/** @typedef {import("../contract.d.ts").LaunchContext} LaunchContext */
/** @typedef {import("../contract.d.ts").LaunchPlan} LaunchPlan */

// ---------- plan + adapter builders ----------

/**
 * A complete LaunchPlan with every required field defaulted. Adapters spread their parts over it.
 * The optional `tempDirs` (1.2) is kept only when given, so plans without it are unchanged.
 * @param {string} tool
 * @param {Partial<LaunchPlan>} [parts]
 * @returns {LaunchPlan}
 */
export function createPlan(tool, parts = {}) {
  const plan = {
    planVersion: PLAN_VERSION,
    tool,
    argv: [],
    env: { set: {}, unset: [] },
    tempFiles: [],
    needsTempDir: false,
    secretSites: [],
    notes: [],
    warnings: [],
    preflight: [],
    teardown: [],
    postExitChecks: [],
    modelList: { strategy: "inject", viewHash: "", injected: 0 },
    cleanup: { removeTempDir: true, revokeSession: true },
    ...parts,
  };
  plan.env = copyEnv(parts.env);
  if (Array.isArray(parts.tempDirs)) plan.tempDirs = parts.tempDirs.map((dir) => ({ ...dir }));
  if (!("needsTempDir" in parts)) plan.needsTempDir = usesTmpRoot(plan);
  return plan;
}

function copyEnv(env) {
  return { set: { ...(env?.set || {}) }, unset: [...(env?.unset || [])] };
}

const isTmpRooted = (entry) => (entry.root ?? "tmp") === "tmp";

/** True when a tmp-root file or dir, or a ${TMP} in argv/env, needs the temp dir. */
function usesTmpRoot(plan) {
  return (
    plan.tempFiles.some(isTmpRooted) ||
    (plan.tempDirs ?? []).some(isTmpRooted) ||
    JSON.stringify([plan.argv, plan.env]).includes(PLACEHOLDERS.TMP)
  );
}

/**
 * Every place "${TOKEN}" appears in a plan, as secretSites entries (env key, argv index, file
 * path). Adapters may use it to fill `secretSites`; validation compares against it.
 * @param {LaunchPlan} plan
 * @returns {import("../contract.d.ts").SecretSite[]}
 */
export function findTokenSites(plan) {
  /** @type {import("../contract.d.ts").SecretSite[]} */
  const sites = [];
  for (const [key, value] of Object.entries(plan.env?.set || {})) {
    if (String(value).includes(PLACEHOLDERS.TOKEN)) sites.push({ kind: "env", key });
  }
  (plan.argv || []).forEach((arg, index) => {
    if (String(arg).includes(PLACEHOLDERS.TOKEN)) sites.push({ kind: "arg", key: String(index) });
  });
  for (const file of plan.tempFiles || []) {
    if (String(file.contents ?? "").includes(PLACEHOLDERS.TOKEN)) {
      sites.push({ kind: "file", key: file.path });
    }
  }
  return sites;
}

const STRATEGIES = new Set(["inject", "server-view", "both"]);
const PROTOCOLS = new Set([
  "anthropic-messages",
  "openai-responses",
  "openai-chat",
  "gemini-native",
]);

/**
 * Validate the static shape of an adapter and freeze it. Throws TypeError on a malformed
 * adapter (a programming error, caught by tests). Does not call plan().
 * @param {LaunchAdapter} adapter
 * @returns {Readonly<LaunchAdapter>}
 */
export function defineAdapter(adapter) {
  const broken = ADAPTER_RULES.find((rule) => rule.bad(adapter));
  if (broken) {
    throw new TypeError(`defineAdapter(${adapter?.id ?? "?"}): ${broken.message(adapter)}`);
  }
  return deepFreezeData(adapter);
}

const ADAPTER_ID = /^[a-z0-9][a-z0-9-]*$/;
const MODEL_MODES = ["required", "optional", "none"];
const TIERS = ["core", "supported", "later"];
const PASSTHROUGH_ACTIONS = ["reject", "warn", "mergeJson", "owned"];

const isObject = (value) => Boolean(value) && typeof value === "object";
const fixed = (message) => () => message;

function badPassthroughIndex(caps) {
  return (caps.passthrough || []).findIndex(
    (rule) => typeof rule.flag !== "string" || !PASSTHROUGH_ACTIONS.includes(rule.action)
  );
}

function badMinor(contract) {
  return !Number.isInteger(contract?.minor) || contract.minor > ADAPTER_CONTRACT.minor;
}

function badPlatforms(platforms) {
  return !Array.isArray(platforms) || platforms.some((p) => !PLATFORMS.includes(p));
}

/**
 * defineAdapter checks, in order; the first `bad` one is reported. Later checks may assume the
 * earlier ones passed (an adapter object, a capabilities object, a modelList).
 */
const ADAPTER_RULES = [
  { bad: (a) => !isObject(a), message: fixed("adapter must be an object") },
  {
    bad: (a) => a.contract?.major !== ADAPTER_CONTRACT.major,
    message: fixed("contract.major must be 1"),
  },
  {
    bad: (a) => badMinor(a.contract),
    message: fixed(`contract.minor must be an integer <= ${ADAPTER_CONTRACT.minor}`),
  },
  {
    bad: (a) => typeof a.id !== "string" || !ADAPTER_ID.test(a.id),
    message: fixed("id must be a lowercase manifest id"),
  },
  {
    bad: (a) => !Array.isArray(a.binaries) || a.binaries.length === 0,
    message: fixed("binaries must be a non-empty array"),
  },
  { bad: (a) => typeof a.plan !== "function", message: fixed("plan must be a function") },
  { bad: (a) => !isObject(a.capabilities), message: fixed("capabilities is required") },
  {
    bad: (a) => !PROTOCOLS.has(a.capabilities.protocol),
    message: (a) => `unknown protocol ${a.capabilities.protocol}`,
  },
  {
    bad: (a) => !a.capabilities.modelList || !STRATEGIES.has(a.capabilities.modelList.strategy),
    message: fixed("capabilities.modelList.strategy must be inject | server-view | both"),
  },
  {
    bad: (a) => typeof a.capabilities.modelList.view?.name !== "string",
    message: fixed("capabilities.modelList.view.name is required"),
  },
  {
    bad: (a) => !MODEL_MODES.includes(a.capabilities.model),
    message: fixed("capabilities.model is invalid"),
  },
  {
    bad: (a) => !isObject(a.capabilities.install),
    message: fixed("capabilities.install is required"),
  },
  {
    bad: (a) => typeof a.capabilities.supportsProfile !== "boolean",
    message: fixed("capabilities.supportsProfile is required"),
  },
  {
    bad: (a) => badPlatforms(a.capabilities.platforms),
    message: fixed("capabilities.platforms must list darwin | linux | win32"),
  },
  {
    bad: (a) => !TIERS.includes(a.capabilities.tier),
    message: fixed("capabilities.tier is invalid"),
  },
  {
    bad: (a) => badPassthroughIndex(a.capabilities) !== -1,
    message: (a) =>
      `invalid passthrough rule ${JSON.stringify(a.capabilities.passthrough[badPassthroughIndex(a.capabilities)])}`,
  },
];

/** Freeze data properties but leave functions callable (freezing a function is harmless too). */
function deepFreezeData(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value)) {
      if (typeof value[key] !== "function") deepFreezeData(value[key]);
    }
  }
  return value;
}

/**
 * The `ctx.util` bag core hands to adapters. Exported so core and fixtures build the same one.
 * @returns {LaunchContext["util"]}
 */
export function createContextUtil() {
  return Object.freeze({
    tempPath,
    statePath,
    ensureV1,
    toml,
    json,
    yaml,
  });
}
