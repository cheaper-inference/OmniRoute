// bin/cli/launch/core/plan.mjs: build ctx, call adapter.plan(), validate, redact, render dry-run.
// PURE: no I/O.

import {
  ADAPTER_ERROR_CODES,
  LaunchError,
  NO_AUTH_SENTINEL,
  PLACEHOLDERS,
  PLAN_VERSION,
  createContextUtil,
  deepFreeze,
  findAssetRefs,
  findTokenSites,
  isLaunchError,
  isValidEnvKey,
  json,
  validateAssetPath,
} from "../contract.mjs";
import { runAfterPlan, runBeforePlan } from "./middleware.mjs";

/**
 * Frozen LaunchContext. `auth.token` is always the `${TOKEN}` placeholder.
 * @returns {import("../contract.d.ts").LaunchContext}
 */
export function buildContext(input) {
  const ctx = {
    platform: input.platform,
    homeDir: input.homeDir,
    baseEnv: { ...(input.baseEnv || {}) },
    gateway: {
      rootUrl: input.gateway.rootUrl,
      origin: input.gateway.origin,
      ...(input.gateway.version ? { version: input.gateway.version } : {}),
    },
    auth: {
      token: PLACEHOLDERS.TOKEN,
      source: input.auth?.source ?? "session",
      ...(input.auth?.sessionId ? { sessionId: input.auth.sessionId } : {}),
      sentinel: NO_AUTH_SENTINEL,
    },
    view: input.view,
    tool: {
      command: input.tool.command,
      shell: Boolean(input.tool.shell),
      ...(input.tool.version ? { version: input.tool.version } : {}),
      features: { ...(input.tool.features || {}) },
    },
    passthroughArgs: [...(input.passthroughArgs || [])],
    passthroughJson: { ...(input.passthroughJson || {}) },
    settings: { summary: true, privateMode: false, ...(input.settings || {}) },
    util: createContextUtil(),
  };
  if (input.cwd) ctx.cwd = input.cwd;
  if (input.model) ctx.model = input.model;
  if (input.profile !== undefined && input.profile !== "") ctx.profile = input.profile;
  return deepFreeze(ctx);
}

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

const TEARDOWN_ENV = new Set([undefined, "plan", "base"]);
const ON_ERROR = new Set(["warn", "ignore"]);

/**
 * Plan invariants. Throws Internal naming every problem.
 * @param {import("../contract.d.ts").LaunchPlan} plan
 * @param {import("../contract.d.ts").LaunchContext} ctx
 * @param {import("../contract.d.ts").LaunchAdapter} adapter
 */
export function validatePlan(plan, ctx, adapter) {
  const problems = [];
  const fail = (message) => problems.push(message);
  if (!plan || typeof plan !== "object") {
    throw new LaunchError("Internal", `adapter ${adapter.id} returned no plan`);
  }
  if (plan.planVersion !== PLAN_VERSION) fail(`planVersion must be ${PLAN_VERSION}`);
  if (plan.tool !== adapter.id) fail(`plan.tool ${JSON.stringify(plan.tool)} != ${adapter.id}`);
  try {
    if (JSON.stringify(JSON.parse(JSON.stringify(plan))) !== JSON.stringify(plan)) {
      fail("plan is not plain JSON data");
    }
  } catch {
    fail("plan is not JSON-serializable");
  }
  if (!Array.isArray(plan.argv) || plan.argv.some((arg) => typeof arg !== "string")) {
    fail("argv must be an array of strings");
  }
  const set = plan.env?.set ?? {};
  const unset = plan.env?.unset ?? [];
  if (typeof set !== "object" || !Array.isArray(unset)) fail("env must be {set, unset[]}");
  for (const [key, value] of Object.entries(set)) {
    if (!isValidEnvKey(key)) fail(`invalid env key ${JSON.stringify(key)}`);
    if (typeof value !== "string") fail(`env.set.${key} must be a string`);
  }
  for (const key of unset) {
    if (!isValidEnvKey(key)) fail(`invalid env.unset key ${JSON.stringify(key)}`);
    if (Object.prototype.hasOwnProperty.call(set, key)) fail(`${key} is both set and unset`);
  }

  // ${TOKEN}: never in argv (13.3 item 5), every site declared.
  const declared = new Set((plan.secretSites || []).map((site) => `${site.kind}:${site.key}`));
  let sites = [];
  try {
    sites = findTokenSites(plan);
  } catch {
    sites = [];
  }
  for (const site of sites) {
    if (site.kind === "arg") fail(`${PLACEHOLDERS.TOKEN} in argv[${site.key}] (use env or a file)`);
    else if (!declared.has(`${site.kind}:${site.key}`)) {
      fail(`${PLACEHOLDERS.TOKEN} at ${site.kind}:${site.key} is not in secretSites`);
    }
  }
  if (
    JSON.stringify([plan.argv, plan.env, plan.preflight, plan.postExitChecks]).includes(
      PLACEHOLDERS.TOOL
    )
  ) {
    fail(`${PLACEHOLDERS.TOOL} is valid in teardown argv only`);
  }
  if (JSON.stringify([plan.argv, plan.env, plan.teardown, plan.preflight]).includes("${ASSET:")) {
    fail("asset tokens are valid only inside tempFiles contents");
  }

  // Files only under ${TMP} / ${STATE}.
  const seen = new Set();
  let usesTmp = JSON.stringify([
    plan.argv,
    plan.env,
    plan.teardown,
    plan.preflight,
    plan.cwd,
  ]).includes(PLACEHOLDERS.TMP);
  for (const file of plan.tempFiles || []) {
    const root = file.root ?? "tmp";
    if (!relativeSafe(file.path))
      fail(`temp file path ${JSON.stringify(file.path)} escapes its root`);
    if (root !== "tmp" && root !== "state")
      fail(`temp file ${file.path}: root must be tmp | state`);
    if (root === "tmp") usesTmp = true;
    const hasContents = file.contents !== undefined;
    const hasAsset = file.asset !== undefined;
    if (hasContents === hasAsset) fail(`${file.path}: exactly one of contents / asset`);
    if (hasContents && typeof file.contents !== "string")
      fail(`${file.path}: contents must be a string`);
    if (hasAsset) {
      try {
        validateAssetPath(file.asset);
      } catch {
        fail(`${file.path}: invalid asset path ${JSON.stringify(file.asset)}`);
      }
      if (file.mergeBase) fail(`${file.path}: mergeBase requires contents`);
    }
    if (hasContents && typeof file.contents === "string") {
      const refs = findAssetRefs(file.contents);
      if (file.contents.split("${ASSET:").length - 1 !== refs.length) {
        fail(`${file.path}: malformed \${ASSET:...} token`);
      }
      for (const ref of refs) {
        try {
          validateAssetPath(ref.path);
        } catch {
          fail(`${file.path}: invalid asset path ${JSON.stringify(ref.path)}`);
        }
      }
    }
    if (file.mode !== undefined && file.mode !== 0o600 && file.mode !== 0o700) {
      fail(`${file.path}: mode must be 0600 or 0700`);
    }
    const key = `${root}:${file.path}`;
    if (seen.has(key)) fail(`temp file ${key} written twice`);
    seen.add(key);
  }
  if (plan.tempDirs !== undefined && !Array.isArray(plan.tempDirs)) {
    fail("tempDirs must be an array");
  }
  const seenDirs = new Set();
  for (const dir of Array.isArray(plan.tempDirs) ? plan.tempDirs : []) {
    const root = dir?.root ?? "tmp";
    if (!relativeSafe(dir?.path))
      fail(`temp dir path ${JSON.stringify(dir?.path)} escapes its root`);
    if (root !== "tmp" && root !== "state") fail(`temp dir ${dir?.path}: root must be tmp | state`);
    if (root === "tmp") usesTmp = true;
    if (dir?.mode !== undefined && !validDirMode(dir.mode)) {
      fail(`temp dir ${dir?.path}: mode must give the owner rwx and refuse group/other write`);
    }
    const key = `${root}:${dir?.path}`;
    if (seen.has(key)) fail(`temp dir ${key} is also a temp file`);
    if (seenDirs.has(key)) fail(`temp dir ${key} declared twice`);
    seenDirs.add(key);
  }
  if (usesTmp && plan.needsTempDir !== true) fail("plan uses ${TMP} but needsTempDir is false");

  for (const step of plan.teardown || []) {
    if (
      !Array.isArray(step.argv) ||
      step.argv.length === 0 ||
      step.argv.some((a) => typeof a !== "string")
    ) {
      fail("teardown argv must be a non-empty string array");
    }
    if (!(typeof step.timeoutMs === "number" && step.timeoutMs > 0))
      fail("teardown timeoutMs must be > 0");
    if (!ON_ERROR.has(step.onError)) fail("teardown onError must be warn | ignore");
    if (!TEARDOWN_ENV.has(step.env)) fail("teardown env must be plan | base");
  }

  // Model list bookkeeping: injected ids are a subset of the view (count, cut by injectLimit).
  const strategy = adapter.capabilities.modelList.strategy;
  if (plan.modelList?.strategy !== strategy) fail(`modelList.strategy must be ${strategy}`);
  if (plan.modelList?.viewHash !== ctx.view.hash)
    fail("modelList.viewHash must equal ctx.view.hash");
  const injected = plan.modelList?.injected;
  const limit = adapter.capabilities.modelList.injectLimit;
  const maxInjected =
    typeof limit === "number" ? Math.min(limit, ctx.view.rows.length) : ctx.view.rows.length;
  if (!Number.isInteger(injected) || injected < 0 || injected > maxInjected) {
    fail(`modelList.injected must be an integer 0..${maxInjected}`);
  }
  if (strategy === "server-view" && injected !== 0) fail("server-view plans inject nothing");
  for (const field of [
    "notes",
    "warnings",
    "preflight",
    "teardown",
    "postExitChecks",
    "secretSites",
    "tempFiles",
  ]) {
    if (!Array.isArray(plan[field])) fail(`${field} must be an array`);
  }
  if (!plan.cleanup || typeof plan.cleanup !== "object") fail("cleanup is required");

  if (problems.length > 0) {
    throw new LaunchError(
      "Internal",
      `adapter ${adapter.id} produced an invalid plan: ${problems.join("; ")}`
    );
  }
  return plan;
}

/**
 * ctx -> middleware.beforePlan -> adapter.plan -> middleware.afterPlan -> modelWarnings -> validate.
 * @returns {{ plan: import("../contract.d.ts").LaunchPlan, ctx: object, appliedMiddleware: string[] }}
 */
export function planLaunch(adapter, ctx, options = {}) {
  const middleware = options.middleware || [];
  const before = runBeforePlan(middleware, ctx);
  let plan;
  try {
    plan = adapter.plan(before.ctx);
  } catch (error) {
    if (isLaunchError(error)) {
      if (ADAPTER_ERROR_CODES.includes(error.code) || error.code === "Internal") throw error;
      throw new LaunchError(
        "Internal",
        `adapter ${adapter.id} threw ${error.code}: ${error.message}`
      );
    }
    throw new LaunchError(
      "Internal",
      `adapter ${adapter.id} plan() failed: ${error?.message ?? "error"}`,
      {
        cause: error,
      }
    );
  }
  const after = runAfterPlan(middleware, plan, before.ctx);
  plan = after.plan;
  if (before.ctx.model && typeof adapter.modelWarnings === "function") {
    const extra = adapter.modelWarnings(before.ctx.model, before.ctx) || [];
    if (extra.length > 0) plan = { ...plan, warnings: [...(plan.warnings || []), ...extra] };
  }
  validatePlan(plan, before.ctx, adapter);
  return { plan, ctx: before.ctx, appliedMiddleware: [...before.applied, ...after.applied] };
}

function scrub(value, secrets) {
  let out = value;
  for (const secret of secrets) {
    if (secret && out.includes(secret)) out = out.split(secret).join(PLACEHOLDERS.TOKEN);
  }
  return out;
}

/**
 * Copy of `plan` safe to print (--dry-run, --json, plan.final): every real secret string becomes
 * `${TOKEN}`, and an env/arg secretSite whose value no longer carries the placeholder is shown as
 * "<redacted>". Asset refs stay refs (asset text is never expanded here).
 * @param {import("../contract.d.ts").LaunchPlan} plan
 * @param {Array<string | undefined>} [secrets] real token, parent credential
 */
export function redactPlan(plan, secrets = []) {
  const list = secrets.filter((s) => typeof s === "string" && s.length >= 4);
  const walk = (value) => {
    if (typeof value === "string") return scrub(value, list);
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === "object") {
      const out = {};
      for (const key of Object.keys(value)) out[key] = walk(value[key]);
      return out;
    }
    return value;
  };
  const copy = walk(JSON.parse(JSON.stringify(plan)));
  for (const site of copy.secretSites || []) {
    if (site.kind === "env" && typeof copy.env?.set?.[site.key] === "string") {
      const value = copy.env.set[site.key];
      if (!value.includes(PLACEHOLDERS.TOKEN)) copy.env.set[site.key] = "<redacted>";
    } else if (site.kind === "arg") {
      const index = Number(site.key);
      if (
        typeof copy.argv?.[index] === "string" &&
        !copy.argv[index].includes(PLACEHOLDERS.TOKEN)
      ) {
        copy.argv[index] = "<redacted>";
      }
    }
  }
  return copy;
}

function envDiff(baseEnv, planEnv) {
  const before = baseEnv || {};
  const changedOrAdded = Object.keys(planEnv.set).filter((key) => before[key] !== planEnv.set[key]);
  const removed = planEnv.unset.filter((key) => key in before);
  return { changedOrAdded, removed };
}

/**
 * The `--dry-run --json` document: the redacted LaunchPlan plus `{gateway, auth, command, view}`
 * and the `omniroute run --dry-run --json` compatibility keys.
 * @param {import("../contract.d.ts").LaunchPlan} plan already redacted
 * @param {object} meta { gateway:{rootUrl,origin,status}, auth:{source,sessionId?}, command,
 *   shell, model, view:{name,hash,size}, baseEnv, appliedMiddleware }
 */
export function dryRunDocument(plan, meta) {
  const diff = envDiff(meta.baseEnv, plan.env);
  const doc = {
    ...plan,
    env: { ...plan.env, ...diff },
    gateway: meta.gateway,
    auth: {
      source: meta.auth.source,
      present: meta.auth.source !== "none",
      ...(meta.auth.sessionId ? { sessionId: meta.auth.sessionId } : {}),
    },
    command: meta.command,
    shell: Boolean(meta.shell),
    model: meta.model ?? null,
    view: meta.view,
    appliedMiddleware: meta.appliedMiddleware || [],
    // compatibility projection (run.mjs writeDryRunOutput)
    target: plan.tool,
    baseUrl: meta.gateway.rootUrl,
    args: plan.argv,
    configOverlay:
      plan.tempFiles.length > 0
        ? plan.tempFiles
            .map(
              (file) =>
                `${file.root === "state" ? PLACEHOLDERS.STATE : PLACEHOLDERS.TMP}/${file.path}`
            )
            .join(", ")
        : null,
  };
  return doc;
}

/** Human dry-run text. */
export function renderDryRunText(doc) {
  const lines = [];
  lines.push(`tool: ${doc.tool}`);
  lines.push(`command: ${doc.command}${doc.shell ? " [shell]" : ""}`);
  lines.push(`gateway: ${doc.gateway.rootUrl} (${doc.gateway.status ?? doc.gateway.origin})`);
  lines.push(`auth: ${doc.auth.source} (session token as ${PLACEHOLDERS.TOKEN})`);
  lines.push(`model: ${doc.model ?? "(none)"}`);
  lines.push(
    `view: ${doc.view.name} ${doc.view.size} models, hash ${String(doc.view.hash).slice(0, 12)}, strategy ${doc.modelList.strategy}, injected ${doc.modelList.injected}`
  );
  lines.push(`argv: ${JSON.stringify(doc.argv)}`);
  for (const key of Object.keys(doc.env.set).sort())
    lines.push(`env set: ${key}=${doc.env.set[key]}`);
  if (doc.env.unset.length > 0) lines.push(`env unset: ${doc.env.unset.join(", ")}`);
  for (const file of doc.tempFiles) {
    const root = file.root === "state" ? PLACEHOLDERS.STATE : PLACEHOLDERS.TMP;
    if (file.asset !== undefined) {
      lines.push(`file ${root}/${file.path}: asset ${file.asset}`);
    } else {
      lines.push(
        `file ${root}/${file.path}${file.mergeBase ? ` (merged over ${file.mergeBase.path})` : ""}:`
      );
      for (const line of String(file.contents).split("\n")) lines.push(`  | ${line}`);
    }
  }
  for (const step of doc.teardown) lines.push(`teardown: ${step.argv.join(" ")}`);
  for (const check of doc.preflight) lines.push(`preflight: ${check.kind} (${check.why})`);
  if (doc.appliedMiddleware.length > 0)
    lines.push(`middleware: ${doc.appliedMiddleware.join(", ")}`);
  for (const note of doc.notes) lines.push(`note: ${note}`);
  for (const warning of doc.warnings) lines.push(`warning: ${warning}`);
  return `${lines.join("\n")}\n`;
}

/** Canonical JSON text for `--dry-run --json`. */
export function renderDryRunJson(doc) {
  return `${json(doc, { indent: 2 })}\n`;
}
