import { readFileSync } from "node:fs";
import { join, sep } from "node:path";
import { parseEnvValue } from "./parseEnvValue.mjs";

/**
 * A `.env` inside the installed package directory does not survive an update:
 * `npm i -g` replaces that directory wholesale, and postinstall recreates the
 * file from `.env.example`. The CLI announces every env file it loads without
 * distinguishing the ones that last from the one that doesn't.
 *
 * Returns the warning to print, or null when there is nothing worth saying.
 *
 * Two conditions, both required, so a development checkout never sees this:
 *  - the file sits inside the package root, and that root is inside a
 *    `node_modules` directory — i.e. an installed package, not a checkout,
 *    where the same path is stable and documented in SETUP_GUIDE.md;
 *  - the file actually supplied at least one value. First writer wins, so a
 *    file entirely shadowed by a durable one supplied nothing, and losing it
 *    costs nothing. Generated template defaults are restored on update too;
 *    only effective values that differ from those defaults are at risk.
 *
 * @param {{ envPath: string, packageRoot: string, durableEnvPath: string, suppliedKeys: boolean, suppliedValues?: Map<string, string | undefined> }} args
 * @returns {string | null}
 */
export function describeVolatileEnvWarning({
  envPath,
  packageRoot,
  durableEnvPath,
  suppliedKeys,
  suppliedValues,
}) {
  if (!suppliedKeys) return null;
  if (envPath === durableEnvPath) return null;
  if (!isInsideInstalledPackage(packageRoot)) return null;
  if (!envPath.startsWith(packageRoot + sep)) return null;
  if (suppliedValues && suppliesOnlyTemplateDefaults(packageRoot, suppliedValues)) return null;

  return (
    `${envPath} lives inside the installed package: updating OmniRoute replaces it. ` +
    `Move the values you set to ${durableEnvPath}, which updates leave alone.`
  );
}

/** True when the path sits under a `node_modules` directory. */
function isInsideInstalledPackage(dir) {
  return typeof dir === "string" && dir.split(sep).includes("node_modules");
}

/** Missing template evidence must never hide an at-risk configuration. */
function suppliesOnlyTemplateDefaults(packageRoot, suppliedValues) {
  let content;
  try {
    content = readFileSync(join(packageRoot, ".env.example"), "utf8");
  } catch {
    return false;
  }
  const defaults = new Map();
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index < 1) continue;
    const key = trimmed.slice(0, index).trim();
    // Match CLI loading: the first declaration of a key wins.
    if (!defaults.has(key)) defaults.set(key, parseEnvValue(trimmed.slice(index + 1)));
  }
  return [...suppliedValues].every(
    ([key, value]) => defaults.has(key) && defaults.get(key) === value
  );
}
