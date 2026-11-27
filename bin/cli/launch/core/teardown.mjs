// bin/cli/launch/core/teardown.mjs: post-exit teardown steps and read-only post-exit checks.

import { spawn as nodeSpawn } from "node:child_process";
import { readFileSync } from "node:fs";

import { PLACEHOLDERS } from "../contract.mjs";
import { quoteShellArgsForSpawn } from "../../utils/winShellArgs.mjs";
import { readDottedKey } from "./preflight.mjs";

function failureReason(error) {
  return error?.code || error?.message || "spawn failed";
}

function closeReason(code, signal) {
  if (code === 0) return null;
  if (code !== null && code !== undefined) return `exit code ${code}`;
  return `killed by ${signal ?? "signal"}`;
}

function buildSpawnOptions(step, deps, useShell, platform) {
  return {
    env: step.env === "base" ? deps.baseEnv : deps.planEnv,
    stdio: "ignore",
    cwd: deps.cwd,
    ...(useShell ? { shell: true } : {}),
    ...(platform === "win32" ? { windowsHide: true } : {}),
  };
}

function armTimeout(child, timeoutMs, done) {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return undefined;
  const timer = setTimeout(() => {
    try {
      child.kill("SIGKILL");
    } catch {}
    done(`timed out after ${timeoutMs}ms`);
  }, timeoutMs);
  timer.unref?.();
  return timer;
}

function runStep(step, deps) {
  const argv = Array.isArray(step?.argv) ? step.argv.map(String) : [];
  if (argv.length === 0) return Promise.resolve("empty argv");
  const useShell = argv[0] === PLACEHOLDERS.TOOL ? Boolean(deps.shell) : false;
  const substituted = argv.map((arg) => arg.split(PLACEHOLDERS.TOOL).join(deps.command ?? ""));
  const [executable, ...rest] = substituted;
  const platform = deps.platform ?? process.platform;
  const spawn = deps.spawn ?? nodeSpawn;

  return new Promise((resolve) => {
    let settled = false;
    let timer;
    const done = (reason) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      resolve(reason);
    };
    let child;
    try {
      child = spawn(
        executable,
        quoteShellArgsForSpawn(rest, platform, useShell),
        buildSpawnOptions(step, deps, useShell, platform)
      );
    } catch (error) {
      done(failureReason(error));
      return;
    }
    timer = armTimeout(child, Number(step.timeoutMs), done);
    child.once("error", (error) => done(failureReason(error)));
    child.once("close", (code, signal) => done(closeReason(code, signal)));
  });
}

async function stepWarning(step, deps) {
  let reason;
  try {
    reason = await runStep(step, deps);
  } catch (error) {
    reason = error?.message || "unexpected error";
  }
  if (!reason || step?.onError === "ignore") return null;
  const label = Array.isArray(step?.argv) ? step.argv.join(" ") : "";
  return `teardown step ${label} failed: ${reason}`;
}

/**
 * Run teardown steps sequentially. Never throws.
 * @param {import("../contract.d.ts").TeardownStep[]} steps
 * @param {{ command?: string, shell?: boolean, platform?: string, planEnv?: object,
 *   baseEnv?: object, spawn?: Function, cwd?: string }} [deps]
 * @returns {Promise<string[]>} warnings
 */
export async function runTeardown(steps, deps = {}) {
  const warnings = [];
  for (const step of steps ?? []) {
    const warning = await stepWarning(step, deps);
    if (warning) warnings.push(warning);
  }
  return warnings;
}

function readBytes(path, readFile) {
  try {
    const data = readFile ? readFile(path) : readFileSync(path);
    return Buffer.isBuffer(data) ? data : Buffer.from(String(data));
  } catch {
    return null;
  }
}

function readJsonKey(path, key, readFile) {
  const bytes = readBytes(path, readFile);
  if (bytes === null) return undefined;
  try {
    const { found, value } = readDottedKey(JSON.parse(bytes.toString("utf8")), key);
    return found ? JSON.stringify(value) : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Snapshot each post-exit check before spawn.
 * @param {import("../contract.d.ts").PostExitCheck[]} checks
 * @param {{ readFile?: (path: string) => string | Buffer }} [options]
 */
export function snapshotPostExit(checks, { readFile } = {}) {
  return (checks ?? []).map((check) => {
    try {
      if (check?.kind === "json-key-unchanged") {
        return { value: readJsonKey(check.path, check.key, readFile) };
      }
      if (check?.kind === "file-unchanged") {
        return { bytes: readBytes(check.path, readFile) };
      }
    } catch {}
    return {};
  });
}

function jsonKeyWarning(check, before, readFile) {
  const after = readJsonKey(check.path, check.key, readFile);
  return after !== before.value ? `${check.message} (revert: ${check.revertHint})` : null;
}

function fileUnchangedWarning(check, before, readFile) {
  const after = readBytes(check.path, readFile);
  const prior = before.bytes ?? null;
  const same =
    after === null || prior === null ? after === prior : Buffer.compare(after, prior) === 0;
  return same ? null : check.message;
}

const POST_EXIT_WARNINGS = {
  "json-key-unchanged": jsonKeyWarning,
  "file-unchanged": fileUnchangedWarning,
};

function postExitWarning(check, before, readFile) {
  const evaluate = Object.hasOwn(POST_EXIT_WARNINGS, check?.kind)
    ? POST_EXIT_WARNINGS[check.kind]
    : undefined;
  return evaluate ? evaluate(check, before, readFile) : null;
}

/**
 * Compare against the snapshot. Read-only, never throws.
 * @returns {string[]} warnings
 */
export function evaluatePostExit(checks, snapshot, { readFile } = {}) {
  const warnings = [];
  (checks ?? []).forEach((check, index) => {
    try {
      const warning = postExitWarning(check, snapshot?.[index] ?? {}, readFile);
      if (warning) warnings.push(warning);
    } catch {}
  });
  return warnings;
}
