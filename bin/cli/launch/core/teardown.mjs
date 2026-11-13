// bin/cli/launch/core/teardown.mjs: post-exit teardown steps and read-only post-exit checks.

import { spawn as nodeSpawn } from "node:child_process";
import { readFileSync } from "node:fs";

import { PLACEHOLDERS } from "../contract.mjs";
import { quoteShellArgsForSpawn } from "../../utils/winShellArgs.mjs";
import { readDottedKey } from "./preflight.mjs";

function runStep(step, deps) {
  const argv = Array.isArray(step?.argv) ? step.argv.map(String) : [];
  if (argv.length === 0) return Promise.resolve("empty argv");
  const isTool = argv[0] === PLACEHOLDERS.TOOL;
  const substituted = argv.map((arg) => arg.split(PLACEHOLDERS.TOOL).join(deps.command ?? ""));
  const [executable, ...rest] = substituted;
  const platform = deps.platform ?? process.platform;
  const useShell = isTool ? Boolean(deps.shell) : false;
  const env = step.env === "base" ? deps.baseEnv : deps.planEnv;
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
      child = spawn(executable, quoteShellArgsForSpawn(rest, platform, useShell), {
        env,
        stdio: "ignore",
        cwd: deps.cwd,
        ...(useShell ? { shell: true } : {}),
        ...(platform === "win32" ? { windowsHide: true } : {}),
      });
    } catch (error) {
      done(error?.code || error?.message || "spawn failed");
      return;
    }
    const timeoutMs = Number(step.timeoutMs);
    if (Number.isFinite(timeoutMs) && timeoutMs > 0) {
      timer = setTimeout(() => {
        try {
          child.kill("SIGKILL");
        } catch {}
        done(`timed out after ${timeoutMs}ms`);
      }, timeoutMs);
      timer.unref?.();
    }
    child.once("error", (error) => done(error?.code || error?.message || "spawn failed"));
    child.once("close", (code, signal) => {
      if (code === 0) done(null);
      else if (code !== null && code !== undefined) done(`exit code ${code}`);
      else done(`killed by ${signal ?? "signal"}`);
    });
  });
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
    let reason;
    try {
      reason = await runStep(step, deps);
    } catch (error) {
      reason = error?.message || "unexpected error";
    }
    if (reason && step?.onError !== "ignore") {
      const label = Array.isArray(step?.argv) ? step.argv.join(" ") : "";
      warnings.push(`teardown step ${label} failed: ${reason}`);
    }
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

/**
 * Compare against the snapshot. Read-only, never throws.
 * @returns {string[]} warnings
 */
export function evaluatePostExit(checks, snapshot, { readFile } = {}) {
  const warnings = [];
  (checks ?? []).forEach((check, index) => {
    try {
      const before = snapshot?.[index] ?? {};
      if (check?.kind === "json-key-unchanged") {
        const after = readJsonKey(check.path, check.key, readFile);
        if (after !== before.value) {
          warnings.push(`${check.message} (revert: ${check.revertHint})`);
        }
      } else if (check?.kind === "file-unchanged") {
        const after = readBytes(check.path, readFile);
        const prior = before.bytes ?? null;
        const same =
          after === null || prior === null ? after === prior : Buffer.compare(after, prior) === 0;
        if (!same) warnings.push(check.message);
      }
    } catch {}
  });
  return warnings;
}
