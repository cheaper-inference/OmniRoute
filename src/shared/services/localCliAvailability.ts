/**
 * Host-availability checks for local-CLI no-auth providers (#18753).
 *
 * `/v1/models` must not advertise `auggie` / `zcode` models when their binary
 * cannot be resolved on the machine running the server. Only these two have a
 * detector; every other `isLocalCli` provider (devin-cli-agentic,
 * codex-app-server) stays fail-open because the CLI may run elsewhere.
 *
 * Mirrors bin/cli/utils/localCliAvailability.mjs and the executors' own
 * discovery order (open-sse/executors/auggie.ts resolveAuggieBin(),
 * zcode.ts defaultCommand()). Results are cached for a short TTL so the
 * catalog build does no sync fs on every request.
 */

import { existsSync, statSync } from "node:fs";
import os from "node:os";
import path from "node:path";

type Ctx = { env: NodeJS.ProcessEnv; platform: string; homedir: string };

/** providerId -> alias, for the providers that have a detector. */
const GATED_PROVIDERS: Record<string, { alias: string; detect: (ctx: Ctx) => boolean }> = {
  auggie: { alias: "aug", detect: detectAuggie },
  zcode: { alias: "zc", detect: detectZcode },
};

const CACHE_TTL_MS = 60_000;

function isFile(p: string): boolean {
  try {
    return statSync(p).isFile();
  } catch {
    return false;
  }
}

function pathExtensions(env: NodeJS.ProcessEnv, platform: string): string[] {
  if (platform !== "win32") return [""];
  const exts = (env.PATHEXT || ".COM;.EXE;.BAT;.CMD")
    .split(";")
    .map((e) => e.trim())
    .filter(Boolean);
  return ["", ...exts];
}

function searchDirs(env: NodeJS.ProcessEnv, platform: string): string[] {
  const pathMod = platform === "win32" ? path.win32 : path.posix;
  const dirs = String(env.PATH ?? env.Path ?? "")
    .split(pathMod.delimiter)
    .filter(Boolean);
  if (platform === "win32" && env.APPDATA) dirs.push(pathMod.join(env.APPDATA, "npm"));
  return dirs;
}

/** Resolve `name` against PATH (PATHEXT-aware on Windows); names with a separator are checked as-is. */
export function findExecutable(
  name: string,
  env: NodeJS.ProcessEnv = process.env,
  platform: string = process.platform
): string | null {
  if (!name) return null;
  const pathMod = platform === "win32" ? path.win32 : path.posix;
  const exts = pathExtensions(env, platform);
  const hasSeparator = name.includes("/") || (platform === "win32" && name.includes("\\"));
  const dirs = hasSeparator ? [""] : searchDirs(env, platform);
  for (const dir of dirs) {
    const base = hasSeparator ? name : pathMod.join(dir, name);
    for (const ext of exts) {
      if (isFile(base + ext)) return base + ext;
    }
  }
  return null;
}

function detectZcode({ env, platform, homedir }: Ctx): boolean {
  const runtimeRoot = env.ZCODE_SERVER_RUNTIME_ROOT || path.join(homedir, ".zcode", "server");
  const serverNode = env.ZCODE_SERVER_NODE || path.join(runtimeRoot, "node");
  const serverEntry = env.ZCODE_SERVER_ENTRY || path.join(runtimeRoot, "zcode-server.cjs");
  if (existsSync(serverNode) && existsSync(serverEntry)) return true;
  return findExecutable(env.ZCODE_BIN || "zcode", env, platform) !== null;
}

function auggieInstallerPaths({ env, platform, homedir }: Ctx): string[] {
  if (platform === "win32") {
    const base = env.LOCALAPPDATA || path.join(homedir, "AppData", "Local");
    return [path.join(base, "auggie", "bin", "auggie.exe")];
  }
  return [
    path.join(homedir, ".local", "share", "auggie", "bin", "auggie"),
    path.join(homedir, ".auggie", "bin", "auggie"),
  ];
}

function detectAuggie(ctx: Ctx): boolean {
  const envBin = (ctx.env.AUGGIE_BIN || ctx.env.CLI_AUGGIE_BIN || "").trim();
  if (envBin) return findExecutable(envBin, ctx.env, ctx.platform) !== null;
  if (auggieInstallerPaths(ctx).some((p) => existsSync(p))) return true;
  return findExecutable("auggie", ctx.env, ctx.platform) !== null;
}

let cache: { at: number; keys: Set<string> } | null = null;

/** Drop the cached result (tests, or after the operator installs a binary). */
export function resetLocalCliAvailabilityCache(): void {
  cache = null;
}

/**
 * Ids and aliases of gated local-CLI providers whose binary is NOT resolvable
 * on this host. Resolved once and cached for CACHE_TTL_MS.
 */
export function getUnavailableLocalCliProviderKeys(
  ctx: Partial<Ctx> = {},
  now: number = Date.now()
): Set<string> {
  const useCache = Object.keys(ctx).length === 0;
  if (useCache && cache && now - cache.at < CACHE_TTL_MS) return cache.keys;
  const full: Ctx = {
    env: ctx.env ?? process.env,
    platform: ctx.platform ?? process.platform,
    homedir: ctx.homedir ?? os.homedir(),
  };
  const keys = new Set<string>();
  for (const [id, { alias, detect }] of Object.entries(GATED_PROVIDERS)) {
    if (detect(full)) continue;
    keys.add(id);
    keys.add(alias);
  }
  if (useCache) cache = { at: now, keys };
  return keys;
}
