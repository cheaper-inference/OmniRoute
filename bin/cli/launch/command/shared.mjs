// bin/cli/launch/command/shared.mjs: io, error reporting and helpers shared by the
// `launch` and `gateway` command modules.

import { errorJson, exitCodeFor, formatError, toLaunchError } from "../core/errors.mjs";
import { launchRoot } from "../core/state.mjs";
import { resolveDataDir } from "../../data-dir.mjs";

function defaultSetExitCode(code) {
  process.exitCode = code;
}

export function io(deps) {
  return {
    stdout: deps.stdout ?? process.stdout,
    stderr: deps.stderr ?? process.stderr,
    setExitCode: deps.setExitCode ?? defaultSetExitCode,
  };
}

export function reportError(error, { json, stdout, stderr, setExitCode }) {
  const err = toLaunchError(error);
  if (json) stdout.write(`${JSON.stringify(errorJson(err), null, 2)}\n`);
  else stderr.write(formatError(err));
  setExitCode(exitCodeFor(err));
  return err;
}

/** Launch state dir: injected, or the one under the resolved data dir. */
export function resolveStateDir(deps) {
  return deps.stateDir ?? launchRoot(resolveDataDir());
}

/** `JSON.stringify(value, null, 2)` plus a trailing newline. */
export function jsonLine(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

/** Map commander usage failures (exit 1) to the launcher's usage exit code 2. */
export function usageExitOverride(err) {
  if (err.exitCode === 1 && String(err.code || "").startsWith("commander.")) err.exitCode = 2;
  throw err;
}

export function displayNameOf(registry, adapter) {
  return registry.entry?.(adapter.id)?.displayName ?? adapter.displayName ?? adapter.id;
}
