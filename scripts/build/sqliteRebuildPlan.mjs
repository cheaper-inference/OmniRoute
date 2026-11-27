/**
 * OmniRoute — better-sqlite3 source-rebuild planning (postinstall).
 *
 * Pure decision logic for the repair step in scripts/build/postinstall.mjs:
 * WHERE the locked, already-installed package lives, WHICH environment the
 * rebuild must run with, and WHETHER a source rebuild is possible at all.
 *
 * Every input is injected (resolver, existence probe, environment) so the
 * behaviour is unit-testable without running the hook, spawning npm, or
 * touching the network (#20998 / #21001).
 *
 * Security contract enforced here:
 *   - The rebuild targets the package resolved from the install's own module
 *     resolution — root, hoisted (workspace/global) or nested — never an
 *     unpinned registry install, and never the Next-traced `dist/` copy, which
 *     ships no compile inputs (binding.gyp / deps / src) and cannot be built.
 *   - npm's inherited lifecycle environment is stripped of every key that
 *     would redirect the rebuild to the GLOBAL tree or another prefix. During
 *     `npm install -g omniroute` the hook inherits npm_config_global=true /
 *     npm_config_location=global / npm_config_prefix=…, which would otherwise
 *     make `npm rebuild` operate on the wrong tree.
 */

import { basename, dirname, join } from "node:path";

/** npm config keys that choose the install location (matched case-insensitively). */
const LOCATION_ENV_KEYS = new Set([
  "npm_config_global",
  "npm_config_location",
  "npm_config_prefix",
  "npm_config_local_prefix",
  "npm_config_globalconfig",
  "npm_config_global_prefix",
]);

/**
 * Copy of `env` that cannot redirect npm to the global tree, with the location
 * pinned to "project". Everything else (PATH, cache, registry, GYP_DEFINES, …)
 * is preserved so the toolchain still works.
 *
 * @param {Record<string, string | undefined>} env
 * @returns {Record<string, string | undefined>}
 */
export function localRebuildEnv(env) {
  const out = {};
  for (const [key, value] of Object.entries(env ?? {})) {
    if (LOCATION_ENV_KEYS.has(key.toLowerCase())) continue;
    out[key] = value;
  }
  out.npm_config_location = "project";
  return out;
}

/**
 * Plan the better-sqlite3 rebuild.
 *
 * @param {{
 *   resolvePackageJson: (spec: string) => string,
 *   exists: (path: string) => boolean,
 *   env: Record<string, string | undefined>,
 * }} input
 * @returns {{ action: "skip", reason: string } | {
 *   action: "rebuild",
 *   cwd: string,
 *   packageDir: string,
 *   binaryFrom: string,
 *   env: Record<string, string | undefined>,
 * }}
 */
export function planBetterSqliteRebuild({ resolvePackageJson, exists, env }) {
  let packageJsonPath;
  try {
    packageJsonPath = resolvePackageJson("better-sqlite3/package.json");
  } catch {
    // Optional dependency skipped by npm (e.g. its own build failed) — there is
    // no locked package to rebuild. Never fall back to a registry install.
    return { action: "skip", reason: "unresolved" };
  }
  if (typeof packageJsonPath !== "string" || packageJsonPath.length === 0) {
    return { action: "skip", reason: "unresolved" };
  }

  const packageDir = dirname(packageJsonPath);
  const nodeModulesDir = dirname(packageDir);
  if (basename(nodeModulesDir) !== "node_modules") {
    return { action: "skip", reason: "unexpected-layout" };
  }
  // The directory whose node_modules/ holds the package: the project root, the
  // hoisting workspace root, or the global lib/ prefix — all valid rebuild cwd.
  const cwd = dirname(nodeModulesDir);

  // A source rebuild needs the compile inputs. The bundled dist/ copy is
  // Next-traced (lib/ + build/ only), so it can never be rebuilt from source.
  if (!exists(join(packageDir, "binding.gyp"))) {
    return { action: "skip", reason: "no-compile-inputs" };
  }

  return {
    action: "rebuild",
    cwd,
    packageDir,
    binaryFrom: join(packageDir, "build", "Release", "better_sqlite3.node"),
    env: localRebuildEnv(env),
  };
}
