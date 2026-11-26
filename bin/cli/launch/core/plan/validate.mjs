// bin/cli/launch/core/plan/validate.mjs: LaunchPlan invariants as an ordered table of checks.
// PURE: no I/O. Each check appends to the shared problem list in table order, so the joined
// "produced an invalid plan" message keeps a stable order.

import {
  LaunchError,
  PLACEHOLDERS,
  PLAN_VERSION,
  findAssetRefs,
  findTokenSites,
  isValidEnvKey,
  validateAssetPath,
} from "../../contract.mjs";

const TEARDOWN_ENV = new Set([undefined, "plan", "base"]);
const ON_ERROR = new Set(["warn", "ignore"]);
const ARRAY_FIELDS = [
  "notes",
  "warnings",
  "preflight",
  "teardown",
  "postExitChecks",
  "secretSites",
  "tempFiles",
];
const ROOTS = new Set(["tmp", "state"]);

function relativeSafe(path) {
  const s = String(path ?? "");
  if (s === "" || s.startsWith("/") || s.startsWith("\\") || /^[A-Za-z]:/.test(s)) return false;
  return !s.split(/[\\/]/).some((part) => part === ".." || part === "" || part === ".");
}

/** TempDirSpec.mode (1.2): an integer 0..0o777 with owner rwx and no group/other write. */
function validDirMode(mode) {
  return (
    Number.isInteger(mode) &&
    mode >= 0 &&
    mode <= 0o777 &&
    (mode & 0o700) === 0o700 &&
    (mode & 0o022) === 0
  );
}

function isStringArray(value) {
  return Array.isArray(value) && !value.some((item) => typeof item !== "string");
}

function mentions(values, needle) {
  return JSON.stringify(values).includes(needle);
}

function checkHeader({ plan, adapter, fail }) {
  if (plan.planVersion !== PLAN_VERSION) fail(`planVersion must be ${PLAN_VERSION}`);
  if (plan.tool !== adapter.id) fail(`plan.tool ${JSON.stringify(plan.tool)} != ${adapter.id}`);
}

function checkPlainJson({ plan, fail }) {
  try {
    if (JSON.stringify(JSON.parse(JSON.stringify(plan))) !== JSON.stringify(plan)) {
      fail("plan is not plain JSON data");
    }
  } catch {
    fail("plan is not JSON-serializable");
  }
}

function checkArgv({ plan, fail }) {
  if (!isStringArray(plan.argv)) fail("argv must be an array of strings");
}

function checkEnvSet(set, fail) {
  for (const [key, value] of Object.entries(set)) {
    if (!isValidEnvKey(key)) fail(`invalid env key ${JSON.stringify(key)}`);
    if (typeof value !== "string") fail(`env.set.${key} must be a string`);
  }
}

function checkEnvUnset(set, unset, fail) {
  for (const key of unset) {
    if (!isValidEnvKey(key)) fail(`invalid env.unset key ${JSON.stringify(key)}`);
    if (Object.prototype.hasOwnProperty.call(set, key)) fail(`${key} is both set and unset`);
  }
}

function checkEnv({ plan, fail }) {
  const set = plan.env?.set ?? {};
  const unset = plan.env?.unset ?? [];
  if (typeof set !== "object" || !Array.isArray(unset)) fail("env must be {set, unset[]}");
  checkEnvSet(set, fail);
  checkEnvUnset(set, unset, fail);
}

function tokenSitesOf(plan) {
  try {
    return findTokenSites(plan);
  } catch {
    return [];
  }
}

/** ${TOKEN}: never in argv (13.3 item 5), every site declared. */
function checkTokenSites({ plan, fail }) {
  const declared = new Set((plan.secretSites || []).map((site) => `${site.kind}:${site.key}`));
  for (const site of tokenSitesOf(plan)) {
    const id = `${site.kind}:${site.key}`;
    if (site.kind === "arg") fail(`${PLACEHOLDERS.TOKEN} in argv[${site.key}] (use env or a file)`);
    else if (!declared.has(id)) fail(`${PLACEHOLDERS.TOKEN} at ${id} is not in secretSites`);
  }
}

function checkPlaceholders({ plan, fail }) {
  if (mentions([plan.argv, plan.env, plan.preflight, plan.postExitChecks], PLACEHOLDERS.TOOL)) {
    fail(`${PLACEHOLDERS.TOOL} is valid in teardown argv only`);
  }
  if (mentions([plan.argv, plan.env, plan.teardown, plan.preflight], "${ASSET:")) {
    fail("asset tokens are valid only inside tempFiles contents");
  }
}

function checkTmpMentions(state) {
  const { plan } = state;
  const values = [plan.argv, plan.env, plan.teardown, plan.preflight, plan.cwd];
  state.usesTmp = mentions(values, PLACEHOLDERS.TMP);
}

/** Path safety and root for a temp file or dir ("temp file" / "temp dir" as `kind`). */
function checkPlacement(state, kind, path, root) {
  if (!relativeSafe(path)) state.fail(`${kind} path ${JSON.stringify(path)} escapes its root`);
  if (!ROOTS.has(root)) state.fail(`${kind} ${path}: root must be tmp | state`);
  if (root === "tmp") state.usesTmp = true;
}

function checkAssetPath(fail, owner, assetPath) {
  try {
    validateAssetPath(assetPath);
  } catch {
    fail(`${owner}: invalid asset path ${JSON.stringify(assetPath)}`);
  }
}

function checkContentRefs(fail, file) {
  const refs = findAssetRefs(file.contents);
  if (file.contents.split("${ASSET:").length - 1 !== refs.length) {
    fail(`${file.path}: malformed \${ASSET:...} token`);
  }
  for (const ref of refs) checkAssetPath(fail, file.path, ref.path);
}

function checkFileSource(fail, file) {
  const hasContents = file.contents !== undefined;
  const hasAsset = file.asset !== undefined;
  const stringContents = typeof file.contents === "string";
  if (hasContents === hasAsset) fail(`${file.path}: exactly one of contents / asset`);
  if (hasContents && !stringContents) fail(`${file.path}: contents must be a string`);
  if (hasAsset) {
    checkAssetPath(fail, file.path, file.asset);
    if (file.mergeBase) fail(`${file.path}: mergeBase requires contents`);
  }
  if (stringContents) checkContentRefs(fail, file);
}

function checkTempFile(state, file) {
  const { fail, seen } = state;
  const root = file.root ?? "tmp";
  checkPlacement(state, "temp file", file.path, root);
  checkFileSource(fail, file);
  if (file.mode !== undefined && file.mode !== 0o600 && file.mode !== 0o700) {
    fail(`${file.path}: mode must be 0600 or 0700`);
  }
  const key = `${root}:${file.path}`;
  if (seen.has(key)) fail(`temp file ${key} written twice`);
  seen.add(key);
}

/** Files only under ${TMP} / ${STATE}. */
function checkTempFiles(state) {
  for (const file of state.plan.tempFiles || []) checkTempFile(state, file);
}

function checkTempDir(state, dir, seenDirs) {
  const { fail } = state;
  const { root: rawRoot, path, mode } = dir ?? {};
  const root = rawRoot ?? "tmp";
  checkPlacement(state, "temp dir", path, root);
  if (mode !== undefined && !validDirMode(mode)) {
    fail(`temp dir ${path}: mode must give the owner rwx and refuse group/other write`);
  }
  const key = `${root}:${path}`;
  if (state.seen.has(key)) fail(`temp dir ${key} is also a temp file`);
  if (seenDirs.has(key)) fail(`temp dir ${key} declared twice`);
  seenDirs.add(key);
}

function checkTempDirs(state) {
  const dirs = state.plan.tempDirs;
  const isArray = Array.isArray(dirs);
  if (dirs !== undefined && !isArray) state.fail("tempDirs must be an array");
  const seenDirs = new Set();
  for (const dir of isArray ? dirs : []) checkTempDir(state, dir, seenDirs);
}

function checkNeedsTempDir({ plan, usesTmp, fail }) {
  if (usesTmp && plan.needsTempDir !== true) fail("plan uses ${TMP} but needsTempDir is false");
}

function checkTeardownStep(fail, step) {
  if (!isStringArray(step.argv) || step.argv.length === 0) {
    fail("teardown argv must be a non-empty string array");
  }
  if (!(typeof step.timeoutMs === "number" && step.timeoutMs > 0)) {
    fail("teardown timeoutMs must be > 0");
  }
  if (!ON_ERROR.has(step.onError)) fail("teardown onError must be warn | ignore");
  if (!TEARDOWN_ENV.has(step.env)) fail("teardown env must be plan | base");
}

function checkTeardown({ plan, fail }) {
  for (const step of plan.teardown || []) checkTeardownStep(fail, step);
}

function maxInjectedFor(modelList, rowCount) {
  const limit = modelList.injectLimit;
  return typeof limit === "number" ? Math.min(limit, rowCount) : rowCount;
}

function validInjected(injected, max) {
  return Number.isInteger(injected) && injected >= 0 && injected <= max;
}

/** Model list bookkeeping: injected ids are a subset of the view (count, cut by injectLimit). */
function checkModelList({ plan, ctx, adapter, fail }) {
  const capability = adapter.capabilities.modelList;
  const strategy = capability.strategy;
  const list = plan.modelList;
  if (list?.strategy !== strategy) fail(`modelList.strategy must be ${strategy}`);
  if (list?.viewHash !== ctx.view.hash) fail("modelList.viewHash must equal ctx.view.hash");
  const injected = list?.injected;
  const max = maxInjectedFor(capability, ctx.view.rows.length);
  if (!validInjected(injected, max)) fail(`modelList.injected must be an integer 0..${max}`);
  if (strategy === "server-view" && injected !== 0) fail("server-view plans inject nothing");
}

function checkArrayFields({ plan, fail }) {
  for (const field of ARRAY_FIELDS) {
    if (!Array.isArray(plan[field])) fail(`${field} must be an array`);
  }
}

function checkCleanup({ plan, fail }) {
  if (!plan.cleanup || typeof plan.cleanup !== "object") fail("cleanup is required");
}

/** Run in this order: `checkTmpMentions` seeds `usesTmp`, the temp file/dir checks extend it. */
const CHECKS = [
  checkHeader,
  checkPlainJson,
  checkArgv,
  checkEnv,
  checkTokenSites,
  checkPlaceholders,
  checkTmpMentions,
  checkTempFiles,
  checkTempDirs,
  checkNeedsTempDir,
  checkTeardown,
  checkModelList,
  checkArrayFields,
  checkCleanup,
];

/**
 * Plan invariants. Throws Internal naming every problem.
 * @param {import("../../contract.d.ts").LaunchPlan} plan
 * @param {import("../../contract.d.ts").LaunchContext} ctx
 * @param {import("../../contract.d.ts").LaunchAdapter} adapter
 */
export function validatePlan(plan, ctx, adapter) {
  if (!plan || typeof plan !== "object") {
    throw new LaunchError("Internal", `adapter ${adapter.id} returned no plan`);
  }
  const problems = [];
  const state = {
    plan,
    ctx,
    adapter,
    fail: (message) => problems.push(message),
    seen: new Set(),
    usesTmp: false,
  };
  for (const check of CHECKS) check(state);
  if (problems.length > 0) {
    throw new LaunchError(
      "Internal",
      `adapter ${adapter.id} produced an invalid plan: ${problems.join("; ")}`
    );
  }
  return plan;
}
