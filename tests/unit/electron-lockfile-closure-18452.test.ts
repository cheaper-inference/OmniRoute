/**
 * electron-lockfile-closure-18452.test.ts — keep electron/package-lock.json installable.
 *
 * electron-release.yml installs the desktop app with `npm ci`, which rejects a lockfile that
 * omits a required peer. CI's Electron smoke uses `npm install`, which repairs the gap in
 * silence, so a broken lockfile only surfaces on the release run. The Dependabot bump in #18452
 * dropped electron-builder-squirrel-windows (a required peer of app-builder-lib) and its subtree
 * that way. This walks the same closure offline: every required dependency and peer of every
 * locked package must resolve to a locked entry.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

type LockEntry = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
};

type Lockfile = { packages: Record<string, LockEntry> };

const ELECTRON_DIR = new URL("../../electron/", import.meta.url);

async function readJson<T>(relative: string): Promise<T> {
  return JSON.parse(await readFile(fileURLToPath(new URL(relative, ELECTRON_DIR)), "utf8"));
}

/** Node resolution over lockfile keys: own node_modules first, then each ancestor's. */
function resolvesInLock(packages: Lockfile["packages"], fromPath: string, name: string): boolean {
  let base = fromPath;
  while (true) {
    if (packages[base ? `${base}/node_modules/${name}` : `node_modules/${name}`]) return true;
    if (!base) return false;
    const cut = base.lastIndexOf("/node_modules/");
    base = cut === -1 ? "" : base.slice(0, cut);
  }
}

function requiredNames(entry: LockEntry): string[] {
  const peers = Object.keys(entry.peerDependencies ?? {}).filter(
    (name) => !entry.peerDependenciesMeta?.[name]?.optional
  );
  return [
    ...Object.keys(entry.dependencies ?? {}),
    ...Object.keys(entry.devDependencies ?? {}),
    ...peers,
  ];
}

test("electron/package-lock.json root mirrors electron/package.json", async () => {
  const pkg = await readJson<LockEntry>("package.json");
  const lock = await readJson<Lockfile>("package-lock.json");
  const root = lock.packages[""];

  assert.deepEqual(root.dependencies, pkg.dependencies);
  assert.deepEqual(root.devDependencies, pkg.devDependencies);
});

test("every required dependency and peer in electron/package-lock.json is locked", async () => {
  const { packages } = await readJson<Lockfile>("package-lock.json");

  const missing = Object.entries(packages).flatMap(([path, entry]) =>
    requiredNames(entry)
      .filter((name) => !resolvesInLock(packages, path, name))
      .map((name) => `${path || "<root>"} -> ${name}`)
  );

  assert.deepEqual(missing, [], "`npm ci` in electron/ rejects a lockfile with these gaps");
});
