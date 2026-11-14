// bin/cli/launch/core/execute.mjs: run a LaunchPlan. The child spawn, signal forwarding and
// SIGKILL escalation live in pipeline/exec-child.mjs.

import { spawn as nodeSpawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  ASSET_ROOT,
  LaunchError,
  PLACEHOLDERS,
  deepMerge,
  expandAssetRefs,
  validateAssetPath,
} from "../contract.mjs";
import { quoteShellArgsForSpawn } from "../../utils/winShellArgs.mjs";
import { toLaunchError } from "./errors.mjs";
import { assertPreflight, evaluatePreflight } from "./preflight.mjs";
import {
  createPrivateTempDir,
  ensureDirWithMode,
  ensurePrivateDir,
  removeDirSafe,
  resolveUnder,
  writePrivateFile,
} from "./tempfiles.mjs";
import { evaluatePostExit, runTeardown, snapshotPostExit } from "./teardown.mjs";
import {
  buildSpawnOptions,
  computeExitCode,
  errorText,
  runChild,
  spawnLaunchError,
} from "./pipeline/exec-child.mjs";
import { trace } from "./trace.mjs";

/** Package root: this file is bin/cli/launch/core/execute.mjs. */
const PACKAGE_ROOT = fileURLToPath(new URL("../../../../", import.meta.url));

function replaceAll(text, needle, value) {
  return text.split(needle).join(value);
}

function makeSubstituter({ tmpDir, stateDir, token, command }) {
  return (value, withTool = false) => {
    if (typeof value !== "string") return value;
    let out = value;
    if (typeof tmpDir === "string") out = replaceAll(out, PLACEHOLDERS.TMP, tmpDir);
    if (typeof stateDir === "string") out = replaceAll(out, PLACEHOLDERS.STATE, stateDir);
    if (typeof token === "string") out = replaceAll(out, PLACEHOLDERS.TOKEN, token);
    if (withTool && typeof command === "string") {
      out = replaceAll(out, PLACEHOLDERS.TOOL, command);
    }
    return out;
  };
}

/** Preflight check fields that carry placeholders. */
const PREFLIGHT_FIELDS = Object.freeze(["path", "key", "value", "binary"]);

/** Substitute each named string field of `target` in place. */
function subStringFields(target, fields, sub) {
  for (const field of fields) {
    if (typeof target[field] === "string") target[field] = sub(target[field]);
  }
}

/** Substitute the string fields of every entry of an optional list in place. */
function subEach(list, fields, sub) {
  for (const entry of list ?? []) subStringFields(entry, fields, sub);
}

/** Substitute `holder.argv` in place when it is an array. */
function subArgv(holder, sub, withTool) {
  if (Array.isArray(holder.argv)) holder.argv = holder.argv.map((arg) => sub(arg, withTool));
}

/** Substitute every env.set value in place. */
function subEnvSet(env, sub) {
  if (!env || !env.set) return;
  for (const key of Object.keys(env.set)) env.set[key] = sub(env.set[key]);
}

/**
 * Deep copy of `plan` with ${TMP}, ${STATE}, ${TOKEN} replaced (exact match, no regex) in argv,
 * env.set values, tempFiles[].contents, cwd, preflight path/key/value/binary, postExitChecks
 * paths and teardown argv. ${TOOL} is replaced only in teardown argv. Asset tokens untouched.
 * @param {import("../contract.d.ts").LaunchPlan} plan
 * @param {{ tmpDir?: string | null, stateDir?: string | null, token?: string, command?: string }} values
 * @returns {import("../contract.d.ts").LaunchPlan}
 */
export function substitutePlan(plan, { tmpDir, stateDir, token, command } = {}) {
  const sub = makeSubstituter({ tmpDir, stateDir, token, command });
  const copy = structuredClone(plan);
  subArgv(copy, sub, false);
  subEnvSet(copy.env, sub);
  subEach(copy.tempFiles, ["contents"], sub);
  subStringFields(copy, ["cwd"], sub);
  subEach(copy.preflight, PREFLIGHT_FIELDS, sub);
  subEach(copy.postExitChecks, ["path"], sub);
  for (const step of copy.teardown ?? []) subArgv(step, sub, true);
  return copy;
}

/**
 * Read a launcher asset from `<packageRoot>/<ASSET_ROOT>/<relpath>` (never process.cwd()).
 * @param {string} relpath
 * @returns {string}
 */
export function defaultReadAsset(relpath) {
  const safe = validateAssetPath(relpath);
  const absolute = join(PACKAGE_ROOT, ASSET_ROOT, ...safe.split("/"));
  try {
    return readFileSync(absolute, "utf8");
  } catch (error) {
    throw new LaunchError("Internal", `launcher asset missing: ${absolute}`, { cause: error });
  }
}

/**
 * Create the declared temp dirs (contract 1.2), recursive, with their mode (default 0700).
 * @param {import("../contract.d.ts").TempDirSpec[]} dirs
 * @param {{ tmpDir?: string | null, stateDir?: string | null }} roots
 * @returns {string[]} absolute paths created
 */
export function materializeTempDirs(dirs, { tmpDir, stateDir } = {}) {
  const created = [];
  for (const dir of dirs ?? []) {
    const root = dir.root === "state" ? stateDir : tmpDir;
    const target = resolveUnder(root, dir.path);
    ensureDirWithMode(target, { mode: dir.mode ?? 0o700 });
    created.push(target);
  }
  return created;
}

/** Parse a temp file's own contents as the JSON override of a merge. */
function parseOverride(file, content) {
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new LaunchError("Internal", `temp file ${file.path} contents are not valid JSON`, {
      cause: error,
    });
  }
}

/** Read and parse the merge base; undefined when it is missing or not valid JSON. */
function readMergeBase(path, read) {
  try {
    return JSON.parse(String(read(path)));
  } catch {
    return undefined;
  }
}

/** Deep-merge `content` (JSON) over the file's merge base, warning when the base is unusable. */
function mergeWithBase(file, content, read, warn) {
  const override = parseOverride(file, content);
  const base = readMergeBase(file.mergeBase.path, read);
  if (base === undefined) {
    warn?.(
      `merge base ${file.mergeBase.path} is missing or not valid JSON; using launcher settings alone`
    );
    return content;
  }
  return `${JSON.stringify(deepMerge(base, override), null, 2)}\n`;
}

/** The final text of one temp file: asset, or contents with asset refs expanded (and merged). */
function renderTempFile(file, { readAsset, read, warn }) {
  if (typeof file.asset === "string") return String(readAsset(file.asset));
  const content = expandAssetRefs(file.contents ?? "", readAsset);
  return file.mergeBase ? mergeWithBase(file, content, read, warn) : content;
}

/**
 * Write the (already substituted) temp files.
 * @param {import("../contract.d.ts").TempFileSpec[]} files
 * @param {{ tmpDir?: string | null, stateDir?: string | null,
 *   readAsset?: (relpath: string) => string, readFile?: (path: string) => string,
 *   warn?: (message: string) => void }} options
 * @returns {string[]} absolute paths written
 */
export function materializeTempFiles(
  files,
  { tmpDir, stateDir, readAsset = defaultReadAsset, readFile, warn } = {}
) {
  const read = readFile ?? ((path) => readFileSync(path, "utf8"));
  const written = [];
  for (const file of files ?? []) {
    const root = file.root === "state" ? stateDir : tmpDir;
    const target = resolveUnder(root, file.path);
    const content = renderTempFile(file, { readAsset, read, warn });
    writePrivateFile(target, content, { mode: file.mode ?? 0o600 });
    written.push(target);
  }
  return written;
}

/**
 * Child env: copy of baseEnv, minus planEnv.unset, plus planEnv.set, plus extraEnv.
 */
export function buildChildEnv(baseEnv, planEnv, extraEnv = {}) {
  const env = { ...(baseEnv ?? {}) };
  for (const key of planEnv?.unset ?? []) delete env[key];
  Object.assign(env, planEnv?.set ?? {}, extraEnv ?? {});
  return env;
}

function defaultSignalTimeout() {
  const n = Number(process.env.OMNIROUTE_CHILD_SIGNAL_TIMEOUT_MS);
  return Number.isFinite(n) && n > 0 ? n : 5000;
}

function needsStateDir(plan) {
  if ((plan.tempFiles ?? []).some((file) => file.root === "state")) return true;
  if ((plan.tempDirs ?? []).some((dir) => dir.root === "state")) return true;
  try {
    return JSON.stringify(plan).includes(PLACEHOLDERS.STATE);
  } catch {
    return false;
  }
}

function defaultWarn(message) {
  process.stderr.write(`omnirouter: warning: ${message}\n`);
}

/** executePlan option defaults, applied (lazily, in order) to options that are undefined. */
const OPTION_DEFAULTS = Object.freeze([
  ["platform", () => process.platform],
  ["baseEnv", () => ({})],
  ["stateDir", () => null],
  ["tmpPrefix", () => "omnirouter-"],
  ["spawn", () => nodeSpawn],
  ["stdio", () => "inherit"],
  ["signalSource", () => process],
  ["signalTimeoutMs", defaultSignalTimeout],
  ["preflightDeps", () => ({})],
  ["teardownDeps", () => ({})],
  ["warn", () => defaultWarn],
]);

function resolveOptions(opts) {
  const { ...resolved } = opts;
  for (const [key, makeDefault] of OPTION_DEFAULTS) {
    if (resolved[key] === undefined) resolved[key] = makeDefault();
  }
  return resolved;
}

/** Replace the auth token with *** in a message (unless it is empty or still the placeholder). */
function makeScrubber(token) {
  const active = typeof token === "string" && token !== "" && token !== PLACEHOLDERS.TOKEN;
  return (message) => (active ? replaceAll(String(message), token, "***") : String(message));
}

/** Create the plan's private temp dir (if any) with a process-exit safety net. */
function createTempLifecycle(plan, { tmpRoot, tmpPrefix }) {
  const tmpDir = plan.needsTempDir
    ? createPrivateTempDir({ root: tmpRoot, prefix: tmpPrefix })
    : null;
  const exitSafetyNet = () => removeDirSafe(tmpDir);
  if (tmpDir) process.on("exit", exitSafetyNet);
  const dropSafetyNet = () => {
    if (tmpDir) process.removeListener("exit", exitSafetyNet);
  };
  const removeTmp = () => {
    if (tmpDir) removeDirSafe(tmpDir);
    dropSafetyNet();
  };
  return { tmpDir, dropSafetyNet, removeTmp };
}

/** Substitute, build the env, run preflight, write temp dirs/files and snapshot post-exit state. */
async function prepareSteps(plan, o, tmpDir, warnings) {
  const { stateDir, readFile } = o;
  if (stateDir && needsStateDir(plan)) ensurePrivateDir(stateDir);
  const s = substitutePlan(plan, { tmpDir, stateDir, token: o.token, command: o.command });
  const env = buildChildEnv(o.baseEnv, s.env, o.extraEnv);

  const results = await evaluatePreflight(s.preflight ?? [], {
    env,
    toolVersion: o.toolVersion,
    ...o.preflightDeps,
  });
  warnings.push(...assertPreflight(results));

  materializeTempDirs(s.tempDirs ?? [], { tmpDir, stateDir });
  materializeTempFiles(s.tempFiles ?? [], {
    tmpDir,
    stateDir,
    readAsset: o.readAsset,
    readFile,
    warn: (message) => warnings.push(message),
  });
  const snapshot = snapshotPostExit(s.postExitChecks ?? [], { readFile });
  trace("temp files");
  return { s, env, snapshot };
}

async function prepareLaunch(plan, o, tmp, warnings) {
  try {
    return await prepareSteps(plan, o, tmp.tmpDir, warnings);
  } catch (error) {
    tmp.removeTmp();
    throw toLaunchError(error);
  }
}

/** Print warnings through `warn`, scrubbed; a throwing warn never aborts the launch. */
function flushWarnings(warnings, warn, scrub) {
  for (const message of warnings) {
    try {
      warn(scrub(message));
    } catch {}
  }
}

/**
 * The child's PWD must name the directory it is spawned in: opencode and kilo resolve their
 * project dir from PWD, so a forwarded parent PWD sends tool writes elsewhere
 * (found in live testing). Returns the spawn cwd.
 */
function applyChildPwd(env, s, { cwd, platform }) {
  const spawnCwd = s.cwd ?? cwd;
  if (platform !== "win32" || "PWD" in env) env.PWD = resolve(spawnCwd ?? process.cwd());
  return spawnCwd;
}

async function spawnTool({ s, env }, spawnCwd, o, tmp, warnings) {
  const { command, platform, shell } = o;
  try {
    return await runChild(
      command,
      quoteShellArgsForSpawn(s.argv ?? [], platform, shell),
      buildSpawnOptions(env, spawnCwd, o),
      {
        spawn: o.spawn,
        signalSource: o.signalSource,
        signalTimeoutMs: o.signalTimeoutMs,
        onSpawn: o.onSpawn,
        warnings,
      }
    );
  } catch (error) {
    tmp.removeTmp();
    throw spawnLaunchError(error, command);
  }
}

async function runAfterExit(afterExit, payload, warnings) {
  if (!afterExit) return;
  try {
    await afterExit(payload);
  } catch (error) {
    warnings.push(`afterExit hook failed: ${errorText(error)}`);
  }
}

/** Teardown steps, post-exit checks, then the afterExit hook; warnings collected in order. */
async function runPostExit({ s, env, snapshot }, o, warnings, payload) {
  warnings.push(
    ...(await runTeardown(s.teardown ?? [], {
      command: o.command,
      shell: o.shell,
      platform: o.platform,
      planEnv: env,
      baseEnv: o.baseEnv,
      ...o.teardownDeps,
    }))
  );
  warnings.push(...evaluatePostExit(s.postExitChecks ?? [], snapshot, { readFile: o.readFile }));
  await runAfterExit(o.afterExit, payload, warnings);
}

async function finishLaunch(plan, prepared, o, tmp, warnings, payload) {
  try {
    await runPostExit(prepared, o, warnings, payload);
  } finally {
    if (plan.cleanup?.removeTempDir !== false) tmp.removeTmp();
    else tmp.dropSafetyNet();
  }
}

/**
 * Execute a LaunchPlan. Never calls process.exit.
 * @param {import("../contract.d.ts").LaunchPlan} plan
 * @param {object} opts see module docs (command, shell, baseEnv, token, stateDir, ...)
 * @returns {Promise<{ exitCode: number, signal: string | null, forwardedSignal: string | null,
 *   durationMs: number, warnings: string[], tmpDir: string | null }>}
 */
export async function executePlan(plan, opts = {}) {
  const o = resolveOptions(opts);
  const warnings = [];
  const scrub = makeScrubber(o.token);
  const tmp = createTempLifecycle(plan, o);

  const started = Date.now();
  const prepared = await prepareLaunch(plan, o, tmp, warnings);

  // Pre-spawn warnings are printed now: once the tool owns the terminal they would be lost.
  flushWarnings(warnings, o.warn, scrub);

  const spawnCwd = applyChildPwd(prepared.env, prepared.s, o);
  const outcome = await spawnTool(prepared, spawnCwd, o, tmp, warnings);
  const { signal, forwardedSignal } = outcome;
  const exitCode = computeExitCode(outcome);
  const durationMs = Date.now() - started;

  await finishLaunch(plan, prepared, o, tmp, warnings, { exitCode, signal: signal ?? null });

  return {
    exitCode,
    signal: signal ?? null,
    forwardedSignal: forwardedSignal ?? null,
    durationMs,
    warnings: warnings.map(scrub),
    tmpDir: tmp.tmpDir,
  };
}
