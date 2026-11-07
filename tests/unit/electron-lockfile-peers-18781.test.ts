/**
 * electron/package-lock.json must keep every required peer dependency.
 *
 * electron-release.yml installs with `npm ci`, which refuses a lockfile that lost a required
 * peer. The PR smoke job uses `npm install`, which repairs the tree in place and stays green.
 * The electron bump in #18781 dropped `electron-builder-squirrel-windows` and its subtree that
 * way, and only the release run would have failed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

type LockEntry = {
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
};

const lockfile = JSON.parse(
  readFileSync(new URL("../../electron/package-lock.json", import.meta.url), "utf8")
) as { packages: Record<string, LockEntry> };

/** Walks up the nested node_modules chain the way Node resolution does. */
function resolvesFrom(entryPath: string, name: string): boolean {
  let scope = entryPath;
  while (true) {
    if (lockfile.packages[`${scope ? `${scope}/` : ""}node_modules/${name}`]) return true;
    if (!scope) return false;
    const parent = scope.lastIndexOf("node_modules/");
    scope = parent > 0 ? scope.slice(0, parent - 1) : "";
  }
}

test("electron lockfile holds every required peer dependency", () => {
  const missing: string[] = [];
  for (const [entryPath, entry] of Object.entries(lockfile.packages)) {
    for (const name of Object.keys(entry.peerDependencies ?? {})) {
      if (entry.peerDependenciesMeta?.[name]?.optional) continue;
      if (!resolvesFrom(entryPath, name)) missing.push(`${entryPath} -> ${name}`);
    }
  }
  assert.deepEqual(missing, []);
});
