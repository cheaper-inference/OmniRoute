// bin/cli/launch/core/execute.mjs: run a LaunchPlan (architecture section 5). The one shared copy
// of the signal forwarding + SIGKILL escalation logic (formerly launch.mjs:209-262).

import { spawn as nodeSpawn } from "node:child_process";
import { readFileSync } from "node:fs";
import os from "node:os";
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
import { SIGNAL_EXIT_CODES, toLaunchError } from "./errors.mjs";
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

/** Package root: this file is bin/cli/launch/core/execute.mjs. */
const PACKAGE_ROOT = fileURLToPath(new URL("../../../../", import.meta.url));

const FORWARDED_SIGNALS = Object.freeze(["SIGINT", "SIGTERM", "SIGHUP"]);

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
  if (Array.isArray(copy.argv)) copy.argv = copy.argv.map((arg) => sub(arg));
  if (copy.env && copy.env.set) {
    for (const key of Object.keys(copy.env.set)) copy.env.set[key] = sub(copy.env.set[key]);
  }
  for (const file of copy.tempFiles ?? []) {
    if (typeof file.contents === "string") file.contents = sub(file.contents);
  }
  if (typeof copy.cwd === "string") copy.cwd = sub(copy.cwd);
  for (const check of copy.preflight ?? []) {
    for (const field of ["path", "key", "value", "binary"]) {
      if (typeof check[field] === "string") check[field] = sub(check[field]);
    }
  }
  for (const check of copy.postExitChecks ?? []) {
    if (typeof check.path === "string") check.path = sub(check.path);
  }
  for (const step of copy.teardown ?? []) {
    if (Array.isArray(step.argv)) step.argv = step.argv.map((arg) => sub(arg, true));
  }
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
    let content =
      typeof file.asset === "string"
        ? String(readAsset(file.asset))
        : expandAssetRefs(file.contents ?? "", readAsset);
    if (file.mergeBase && typeof file.asset !== "string") {
      let override;
      try {
        override = JSON.parse(content);
      } catch (error) {
        throw new LaunchError("Internal", `temp file ${file.path} contents are not valid JSON`, {
          cause: error,
        });
      }
      let base;
      try {
        base = JSON.parse(String(read(file.mergeBase.path)));
      } catch {
        base = undefined;
      }
      if (base === undefined) {
        warn?.(
          `merge base ${file.mergeBase.path} is missing or not valid JSON; using launcher settings alone`
        );
      } else {
        content = `${JSON.stringify(deepMerge(base, override), null, 2)}\n`;
      }
    }
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

function signalExitCode(signal) {
  if (!signal) return undefined;
  if (SIGNAL_EXIT_CODES[signal]) return SIGNAL_EXIT_CODES[signal];
  const n = os.constants.signals?.[signal];
  return typeof n === "number" ? 128 + n : undefined;
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

function errorText(error) {
  return error instanceof Error && error.message ? error.message : String(error);
}

/**
 * Spawn the child and wait for it, forwarding SIGINT/SIGTERM/SIGHUP with SIGKILL escalation.
 * Resolves `{ code, signal, forwardedSignal }` or rejects with the spawn error.
 */
function runChild(command, args, spawnOptions, ctl) {
  const { spawn, signalSource, signalTimeoutMs, onSpawn, warnings } = ctl;
  let child;
  try {
    child = spawn(command, args, spawnOptions);
  } catch (error) {
    return Promise.reject(error);
  }
  let forwardedSignal;
  let escalationTimer;
  const handlers = {};
  const removeHandlers = () => {
    for (const signal of FORWARDED_SIGNALS) {
      if (handlers[signal]) signalSource?.removeListener?.(signal, handlers[signal]);
    }
  };

  const finished = new Promise((resolve, reject) => {
    let settled = false;
    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      if (escalationTimer) clearTimeout(escalationTimer);
      removeHandlers();
      fn(value);
    };
    child.once?.("error", (error) => {
      // A spawn failure never produces a pid; later errors (kill races) wait for close.
      if (child.pid === undefined) finish(reject, error);
    });
    child.once?.("close", (code, signal) => finish(resolve, { code, signal, forwardedSignal }));
  });

  for (const signal of FORWARDED_SIGNALS) {
    handlers[signal] = () => {
      if (forwardedSignal !== undefined) return;
      forwardedSignal = signal;
      try {
        child.kill(signal);
      } catch {
        // The child may already be gone; its close event settles.
      }
      escalationTimer = setTimeout(() => {
        try {
          child.kill("SIGKILL");
        } catch {}
      }, signalTimeoutMs);
      escalationTimer.unref?.();
    };
    signalSource?.on?.(signal, handlers[signal]);
  }

  const spawned = (async () => {
    if (!onSpawn) return;
    try {
      await onSpawn(child);
    } catch (error) {
      warnings.push(`onSpawn hook failed: ${errorText(error)}`);
    }
  })();

  return Promise.all([finished, spawned]).then(([result]) => result);
}

/**
 * Execute a LaunchPlan. Never calls process.exit.
 * @param {import("../contract.d.ts").LaunchPlan} plan
 * @param {object} opts see module docs (command, shell, baseEnv, token, stateDir, ...)
 * @returns {Promise<{ exitCode: number, signal: string | null, forwardedSignal: string | null,
 *   durationMs: number, warnings: string[], tmpDir: string | null }>}
 */
export async function executePlan(plan, opts = {}) {
  const {
    command,
    shell,
    platform = process.platform,
    baseEnv = {},
    token,
    stateDir = null,
    tmpRoot,
    tmpPrefix = "omnirouter-",
    extraEnv,
    cwd,
    readAsset,
    readFile,
    spawn = nodeSpawn,
    stdio = "inherit",
    signalSource = process,
    signalTimeoutMs = defaultSignalTimeout(),
    toolVersion,
    preflightDeps = {},
    teardownDeps = {},
    warn = (message) => process.stderr.write(`omnirouter: warning: ${message}\n`),
    onSpawn,
    afterExit,
  } = opts;

  const warnings = [];
  const scrub = (message) =>
    typeof token === "string" && token !== "" && token !== PLACEHOLDERS.TOKEN
      ? replaceAll(String(message), token, "***")
      : String(message);

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

  const started = Date.now();
  let s;
  let env;
  let snapshot;
  try {
    if (stateDir && needsStateDir(plan)) ensurePrivateDir(stateDir);
    s = substitutePlan(plan, { tmpDir, stateDir, token, command });
    env = buildChildEnv(baseEnv, s.env, extraEnv);

    const results = await evaluatePreflight(s.preflight ?? [], {
      env,
      toolVersion,
      ...preflightDeps,
    });
    warnings.push(...assertPreflight(results));

    materializeTempDirs(s.tempDirs ?? [], { tmpDir, stateDir });
    materializeTempFiles(s.tempFiles ?? [], {
      tmpDir,
      stateDir,
      readAsset,
      readFile,
      warn: (message) => warnings.push(message),
    });
    snapshot = snapshotPostExit(s.postExitChecks ?? [], { readFile });
  } catch (error) {
    removeTmp();
    throw toLaunchError(error);
  }

  // Pre-spawn warnings are printed now: once the tool owns the terminal they would be lost.
  for (const message of warnings) {
    try {
      warn(scrub(message));
    } catch {}
  }

  // The child's PWD must name the directory it is spawned in: opencode and kilo resolve their
  // project dir from PWD, so a forwarded parent PWD sends tool writes elsewhere (smoke item 12).
  const spawnCwd = s.cwd ?? cwd;
  if (platform !== "win32" || "PWD" in env) env.PWD = resolve(spawnCwd ?? process.cwd());

  let outcome;
  try {
    outcome = await runChild(
      command,
      quoteShellArgsForSpawn(s.argv ?? [], platform, shell),
      {
        env,
        stdio,
        shell: shell || undefined,
        cwd: spawnCwd,
        ...(platform === "win32" ? { windowsHide: true } : {}),
      },
      { spawn, signalSource, signalTimeoutMs, onSpawn, warnings }
    );
  } catch (error) {
    removeTmp();
    if (error && error.code === "ENOENT") {
      throw new LaunchError("ToolNotFound", `tool binary not found: ${command}`, { cause: error });
    }
    throw new LaunchError("Internal", `could not start ${command}: ${errorText(error)}`, {
      cause: error,
    });
  }

  const { code, signal, forwardedSignal } = outcome;
  const exitCode = forwardedSignal
    ? SIGNAL_EXIT_CODES[forwardedSignal]
    : typeof code === "number"
      ? code
      : (signalExitCode(signal) ?? 0);
  const durationMs = Date.now() - started;

  try {
    warnings.push(
      ...(await runTeardown(s.teardown ?? [], {
        command,
        shell,
        platform,
        planEnv: env,
        baseEnv,
        ...teardownDeps,
      }))
    );
    warnings.push(...evaluatePostExit(s.postExitChecks ?? [], snapshot, { readFile }));
    if (afterExit) {
      try {
        await afterExit({ exitCode, signal: signal ?? null });
      } catch (error) {
        warnings.push(`afterExit hook failed: ${errorText(error)}`);
      }
    }
  } finally {
    if (plan.cleanup?.removeTempDir !== false) removeTmp();
    else dropSafetyNet();
  }

  return {
    exitCode,
    signal: signal ?? null,
    forwardedSignal: forwardedSignal ?? null,
    durationMs,
    warnings: warnings.map(scrub),
    tmpDir,
  };
}
