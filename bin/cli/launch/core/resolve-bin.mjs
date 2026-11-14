// bin/cli/launch/core/resolve-bin.mjs: locate the tool binary (single probeWindowsBinary, was 3
// copies in launch.mjs / launch-codex.mjs / run.mjs) and probe its version.

import { execFile, execFileSync } from "node:child_process";
import { accessSync, constants, statSync } from "node:fs";
import { delimiter, isAbsolute, join } from "node:path";

import { LaunchError } from "../contract.mjs";
import { compareVersions, parseVersion } from "./preflight.mjs";
import { quoteShellArgsForSpawn } from "../../utils/winShellArgs.mjs";

/** `where.exe <command>` -> matching lines, [] when nothing is found. */
export function probeWindowsBinary(command) {
  try {
    const out = execFileSync("where.exe", [command], {
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
      timeout: 3000,
      windowsHide: true,
    });
    return out
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

/** First executable `name` on PATH (POSIX), or null. */
export function findOnPath(name, pathValue) {
  if (isAbsolute(name)) return isExecutable(name) ? name : null;
  for (const dir of String(pathValue ?? "").split(delimiter)) {
    if (!dir) continue;
    const candidate = join(dir, name);
    if (isExecutable(candidate)) return candidate;
  }
  return null;
}

function isExecutable(path) {
  try {
    if (!statSync(path).isFile()) return false;
    accessSync(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

function installHint(adapter, platform) {
  const commands = adapter.capabilities.install?.commands || {};
  const lines = commands[platform] ?? commands.any ?? [];
  const url = adapter.capabilities.install?.url;
  const parts = [];
  if (lines.length > 0) parts.push(`install with: ${lines.join(" && ")}`);
  if (url) parts.push(url);
  return parts.length > 0 ? parts.join("; ") : undefined;
}

/**
 * Resolve the adapter's binary. win32: prefer a real `.exe` (no shell), else a `.cmd`/`.bat`
 * shim through the shell (#8246 / #9454). Elsewhere: the first binary found on PATH.
 * @param {import("../contract.d.ts").LaunchAdapter} adapter
 * @param {{ platform?: string, env?: Record<string,string|undefined>, probe?: (cmd: string) => string[] | Promise<string[]>, which?: (name: string) => string | null }} [deps]
 * @returns {Promise<{ command: string, shell: boolean }>}
 */
export async function resolveBinary(adapter, deps = {}) {
  const platform = deps.platform ?? process.platform;
  const env = deps.env ?? process.env;
  for (const name of adapter.binaries) {
    if (platform === "win32") {
      const probe = deps.probe ?? probeWindowsBinary;
      const found = await probe(name);
      const lines = Array.isArray(found) ? found : found ? [found] : [];
      const exe = lines.find((line) => /\.exe$/i.test(line));
      if (exe) return { command: exe, shell: false };
      const shim = lines.find((line) => /\.(?:cmd|bat)$/i.test(line));
      if (shim) return { command: shim, shell: true };
    } else {
      const which = deps.which ?? ((bin) => findOnPath(bin, env.PATH));
      const found = which(name);
      if (found) return { command: found, shell: false };
    }
  }
  throw new LaunchError(
    "ToolNotFound",
    `${adapter.id}: binary not found (${adapter.binaries.join(", ")})`,
    {
      hint: installHint(adapter, platform),
    }
  );
}

/** `<command> <args>` stdout+stderr text, or "" on failure (5 s cap). */
export function runVersionCommand(
  command,
  args,
  { shell = false, platform = process.platform, env } = {}
) {
  return new Promise((resolvePromise) => {
    execFile(
      command,
      quoteShellArgsForSpawn(args, platform, shell),
      { timeout: 5000, shell: shell || undefined, windowsHide: true, env, encoding: "utf8" },
      (_error, stdout, stderr) => resolvePromise(`${stdout ?? ""}\n${stderr ?? ""}`)
    );
  });
}

/**
 * Probe the tool version and apply the version gate.
 * @param {import("../contract.d.ts").LaunchAdapter} adapter
 * @param {{ command: string, shell: boolean }} bin
 * @param {{ runVersion?: typeof runVersionCommand, platform?: string, env?: object }} [deps]
 * @returns {Promise<{ version?: string, features: Record<string, boolean>, warnings: string[] }>}
 */
export async function probeTool(adapter, bin, deps = {}) {
  const gate = adapter.capabilities.versionGate;
  if (!gate) return { version: undefined, features: {}, warnings: [] };
  const run = deps.runVersion ?? runVersionCommand;
  const text = await run(bin.command, gate.args, {
    shell: bin.shell,
    platform: deps.platform,
    env: deps.env,
  });
  const version = parseVersion(String(text ?? ""), gate.pattern);
  return { version, ...applyVersionGate(adapter, version, deps.platform) };
}

/**
 * PURE. Features + warnings for a probed version; throws ToolVersionTooOld below `min`.
 * @returns {{ features: Record<string, boolean>, warnings: string[] }}
 */
export function applyVersionGate(adapter, version, platform = process.platform) {
  const gate = adapter.capabilities.versionGate;
  const features = {};
  const warnings = [];
  if (!gate) return { features, warnings };
  for (const [name, first] of Object.entries(gate.features || {})) {
    features[name] = version !== undefined && compareVersions(version, first) >= 0;
  }
  if (version === undefined) {
    if (gate.min || gate.recommended) {
      warnings.push(`${adapter.id}: could not read the tool version; assuming a supported one`);
      for (const name of Object.keys(features)) features[name] = true;
    }
    return { features, warnings };
  }
  if (gate.min && compareVersions(version, gate.min) < 0) {
    throw new LaunchError(
      "ToolVersionTooOld",
      `${adapter.id} ${version} is too old; need ${gate.min} or newer`,
      {
        hint: installHint(adapter, platform),
      }
    );
  }
  if (gate.recommended && compareVersions(version, gate.recommended) < 0) {
    warnings.push(
      `${adapter.id} ${version} works, but ${gate.recommended} or newer is recommended`
    );
  }
  return { features, warnings };
}
