// bin/cli/launch/core/plan.mjs: build ctx, call adapter.plan(), validate, redact, render dry-run.
// PURE: no I/O.

import {
  ADAPTER_ERROR_CODES,
  LaunchError,
  NO_AUTH_SENTINEL,
  PLACEHOLDERS,
  createContextUtil,
  deepFreeze,
  isLaunchError,
  json,
} from "../contract.mjs";
import { runAfterPlan, runBeforePlan } from "./middleware.mjs";
import { validatePlan } from "./plan/validate.mjs";

export { validatePlan };

/** `{ [key]: value }` when `value` is truthy, else `{}` (spread helper for optional keys). */
function optional(key, value) {
  return value ? { [key]: value } : {};
}

function contextGateway(gateway) {
  return {
    rootUrl: gateway.rootUrl,
    origin: gateway.origin,
    ...optional("version", gateway.version),
  };
}

function contextAuth(auth) {
  return {
    token: PLACEHOLDERS.TOKEN,
    source: auth?.source ?? "session",
    ...optional("sessionId", auth?.sessionId),
    sentinel: NO_AUTH_SENTINEL,
  };
}

function contextTool(tool) {
  return {
    command: tool.command,
    shell: Boolean(tool.shell),
    ...optional("version", tool.version),
    features: { ...(tool.features || {}) },
  };
}

function contextPassthrough(input) {
  return {
    passthroughArgs: [...(input.passthroughArgs || [])],
    passthroughJson: { ...(input.passthroughJson || {}) },
  };
}

function contextOptionals(input) {
  const hasProfile = input.profile !== undefined && input.profile !== "";
  return {
    ...optional("cwd", input.cwd),
    ...optional("model", input.model),
    ...(hasProfile ? { profile: input.profile } : {}),
  };
}

/**
 * Frozen LaunchContext. `auth.token` is always the `${TOKEN}` placeholder.
 * @returns {import("../contract.d.ts").LaunchContext}
 */
export function buildContext(input) {
  return deepFreeze({
    platform: input.platform,
    homeDir: input.homeDir,
    baseEnv: { ...(input.baseEnv || {}) },
    gateway: contextGateway(input.gateway),
    auth: contextAuth(input.auth),
    view: input.view,
    tool: contextTool(input.tool),
    ...contextPassthrough(input),
    settings: { summary: true, privateMode: false, ...(input.settings || {}) },
    util: createContextUtil(),
    ...contextOptionals(input),
  });
}

function adapterPlanError(adapter, error) {
  if (!isLaunchError(error)) {
    return new LaunchError(
      "Internal",
      `adapter ${adapter.id} plan() failed: ${error?.message ?? "error"}`,
      { cause: error }
    );
  }
  if (ADAPTER_ERROR_CODES.includes(error.code) || error.code === "Internal") return error;
  return new LaunchError("Internal", `adapter ${adapter.id} threw ${error.code}: ${error.message}`);
}

function callAdapterPlan(adapter, ctx) {
  try {
    return adapter.plan(ctx);
  } catch (error) {
    throw adapterPlanError(adapter, error);
  }
}

function withModelWarnings(adapter, plan, ctx) {
  if (!ctx.model || typeof adapter.modelWarnings !== "function") return plan;
  const extra = adapter.modelWarnings(ctx.model, ctx) || [];
  if (!(extra.length > 0)) return plan;
  return { ...plan, warnings: [...(plan.warnings || []), ...extra] };
}

/**
 * ctx -> middleware.beforePlan -> adapter.plan -> middleware.afterPlan -> modelWarnings -> validate.
 * @returns {{ plan: import("../contract.d.ts").LaunchPlan, ctx: object, appliedMiddleware: string[] }}
 */
export function planLaunch(adapter, ctx, options = {}) {
  const middleware = options.middleware || [];
  const before = runBeforePlan(middleware, ctx);
  const raw = callAdapterPlan(adapter, before.ctx);
  const after = runAfterPlan(middleware, raw, before.ctx);
  const plan = withModelWarnings(adapter, after.plan, before.ctx);
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

function scrubDeep(value, secrets) {
  if (typeof value === "string") return scrub(value, secrets);
  if (Array.isArray(value)) return value.map((item) => scrubDeep(item, secrets));
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const key of Object.keys(value)) out[key] = scrubDeep(value[key], secrets);
  return out;
}

function redactEnvSite(copy, key) {
  const value = copy.env?.set?.[key];
  if (typeof value === "string" && !value.includes(PLACEHOLDERS.TOKEN)) {
    copy.env.set[key] = "<redacted>";
  }
}

function redactArgSite(copy, key) {
  const index = Number(key);
  const value = copy.argv?.[index];
  if (typeof value === "string" && !value.includes(PLACEHOLDERS.TOKEN)) {
    copy.argv[index] = "<redacted>";
  }
}

const SITE_REDACTORS = { env: redactEnvSite, arg: redactArgSite };

/**
 * Copy of `plan` safe to print (--dry-run, --json, plan.final): every real secret string becomes
 * `${TOKEN}`, and an env/arg secretSite whose value no longer carries the placeholder is shown as
 * "<redacted>". Asset refs stay refs (asset text is never expanded here).
 * @param {import("../contract.d.ts").LaunchPlan} plan
 * @param {Array<string | undefined>} [secrets] real token, parent credential
 */
export function redactPlan(plan, secrets = []) {
  const list = secrets.filter((s) => typeof s === "string" && s.length >= 4);
  const copy = scrubDeep(JSON.parse(JSON.stringify(plan)), list);
  for (const site of copy.secretSites || []) {
    const redact = Object.hasOwn(SITE_REDACTORS, site.kind) ? SITE_REDACTORS[site.kind] : null;
    if (redact) redact(copy, site.key);
  }
  return copy;
}

function envDiff(baseEnv, planEnv) {
  const before = baseEnv || {};
  const changedOrAdded = Object.keys(planEnv.set).filter((key) => before[key] !== planEnv.set[key]);
  const removed = planEnv.unset.filter((key) => key in before);
  return { changedOrAdded, removed };
}

function rootToken(file) {
  return file.root === "state" ? PLACEHOLDERS.STATE : PLACEHOLDERS.TMP;
}

function configOverlay(tempFiles) {
  if (!(tempFiles.length > 0)) return null;
  return tempFiles.map((file) => `${rootToken(file)}/${file.path}`).join(", ");
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
  return {
    ...plan,
    env: { ...plan.env, ...diff },
    gateway: meta.gateway,
    auth: {
      source: meta.auth.source,
      present: meta.auth.source !== "none",
      ...optional("sessionId", meta.auth.sessionId),
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
    configOverlay: configOverlay(plan.tempFiles),
  };
}

function headerLines(doc) {
  return [
    `tool: ${doc.tool}`,
    `command: ${doc.command}${doc.shell ? " [shell]" : ""}`,
    `gateway: ${doc.gateway.rootUrl} (${doc.gateway.status ?? doc.gateway.origin})`,
    `auth: ${doc.auth.source} (session token as ${PLACEHOLDERS.TOKEN})`,
  ];
}

function modelLines(doc) {
  const { view, modelList } = doc;
  const hash = String(view.hash).slice(0, 12);
  return [
    `model: ${doc.model ?? "(none)"}`,
    `view: ${view.name} ${view.size} models, hash ${hash}, strategy ${modelList.strategy}, injected ${modelList.injected}`,
    `argv: ${JSON.stringify(doc.argv)}`,
  ];
}

/** Push `format(item)` for each item, iterating with for..of exactly like a plain loop. */
function pushEach(lines, items, format) {
  for (const item of items) lines.push(format(item));
}

function pushEnvLines(lines, env) {
  pushEach(lines, Object.keys(env.set).sort(), (key) => `env set: ${key}=${env.set[key]}`);
  if (env.unset.length > 0) lines.push(`env unset: ${env.unset.join(", ")}`);
}

function pushFileLines(lines, file) {
  const where = `${rootToken(file)}/${file.path}`;
  if (file.asset !== undefined) {
    lines.push(`file ${where}: asset ${file.asset}`);
    return;
  }
  const merged = file.mergeBase ? ` (merged over ${file.mergeBase.path})` : "";
  lines.push(`file ${where}${merged}:`);
  pushEach(lines, String(file.contents).split("\n"), (line) => `  | ${line}`);
}

function pushTrailerLines(lines, doc) {
  pushEach(lines, doc.teardown, (step) => `teardown: ${step.argv.join(" ")}`);
  pushEach(lines, doc.preflight, (check) => `preflight: ${check.kind} (${check.why})`);
  if (doc.appliedMiddleware.length > 0) {
    lines.push(`middleware: ${doc.appliedMiddleware.join(", ")}`);
  }
  pushEach(lines, doc.notes, (note) => `note: ${note}`);
  pushEach(lines, doc.warnings, (warning) => `warning: ${warning}`);
}

/** Human dry-run text. */
export function renderDryRunText(doc) {
  const lines = [...headerLines(doc), ...modelLines(doc)];
  pushEnvLines(lines, doc.env);
  for (const file of doc.tempFiles) pushFileLines(lines, file);
  pushTrailerLines(lines, doc);
  return `${lines.join("\n")}\n`;
}

/** Canonical JSON text for `--dry-run --json`. */
export function renderDryRunJson(doc) {
  return `${json(doc, { indent: 2 })}\n`;
}
