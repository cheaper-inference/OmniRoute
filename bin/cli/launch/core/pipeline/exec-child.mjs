// bin/cli/launch/core/pipeline/exec-child.mjs: spawn the launched tool and wait for it. The one
// shared copy of the signal forwarding + SIGKILL escalation logic (formerly launch.mjs:209-262),
// plus the spawn option, spawn error and exit code mapping used by core/execute.mjs.

import os from "node:os";

import { LaunchError } from "../../contract.mjs";
import { SIGNAL_EXIT_CODES } from "../errors.mjs";
import { trace } from "../trace.mjs";

const FORWARDED_SIGNALS = Object.freeze(["SIGINT", "SIGTERM", "SIGHUP"]);

function signalExitCode(signal) {
  if (!signal) return undefined;
  if (SIGNAL_EXIT_CODES[signal]) return SIGNAL_EXIT_CODES[signal];
  const n = os.constants.signals?.[signal];
  return typeof n === "number" ? 128 + n : undefined;
}

export function errorText(error) {
  return error instanceof Error && error.message ? error.message : String(error);
}

/**
 * Spawn the child and wait for it, forwarding SIGINT/SIGTERM/SIGHUP with SIGKILL escalation.
 * Resolves `{ code, signal, forwardedSignal }` or rejects with the spawn error.
 */
export function runChild(command, args, spawnOptions, ctl) {
  const { spawn, signalSource, signalTimeoutMs, onSpawn, warnings } = ctl;
  let child;
  try {
    child = spawn(command, args, spawnOptions);
    trace("spawn");
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

export function buildSpawnOptions(env, spawnCwd, { stdio, shell, platform }) {
  return {
    env,
    stdio,
    shell: shell || undefined,
    cwd: spawnCwd,
    ...(platform === "win32" ? { windowsHide: true } : {}),
  };
}

export function spawnLaunchError(error, command) {
  if (error && error.code === "ENOENT") {
    return new LaunchError("ToolNotFound", `tool binary not found: ${command}`, { cause: error });
  }
  return new LaunchError("Internal", `could not start ${command}: ${errorText(error)}`, {
    cause: error,
  });
}

export function computeExitCode({ code, signal, forwardedSignal }) {
  if (forwardedSignal) return SIGNAL_EXIT_CODES[forwardedSignal];
  if (typeof code === "number") return code;
  return signalExitCode(signal) ?? 0;
}
