// Issue #14482: the old promptfoo -> codex-security -> extract-zip risk was
// retired by the dependency upgrade. Keep absence and production-import guards;
// a resolved vulnerability must never fail merely because the old chain vanished.
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";

const ROOT = path.resolve(import.meta.dirname, "..", "..");

// Reads the committed package-lock.json directly rather than shelling out to
// `npm ls` against installed node_modules: in a git-worktree checkout that reuses a
// SYMLINKED node_modules from a different (main) checkout, npm ls's hoisting/
// "extraneous" detection reflects the shared install state, not this checkout's
// lockfile, and produced a false top-level `extract-zip` node in exactly this setup.
// The lockfile's `packages[path].dependencies` edges are deterministic and checkout-
// local, independent of what happens to be physically installed in node_modules.
interface LockPackage {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
}

interface Lockfile {
  packages?: Record<string, LockPackage>;
}

function readLockfile(): Lockfile {
  return JSON.parse(fs.readFileSync(path.join(ROOT, "package-lock.json"), "utf8")) as Lockfile;
}

function declaredDependents(lock: Lockfile, depName: string): string[] {
  const dependents: string[] = [];
  for (const [key, pkg] of Object.entries(lock.packages ?? {})) {
    if (key === "") continue; // root project node itself, handled separately
    const deps: Record<string, string> = {
      ...(pkg.dependencies ?? {}),
      ...(pkg.optionalDependencies ?? {}),
    };
    if (Object.prototype.hasOwnProperty.call(deps, depName)) dependents.push(key);
  }
  return dependents;
}

test("the retired extract-zip chain stays absent from the root lockfile", () => {
  const lock = readLockfile();
  const root = lock.packages?.[""] ?? {};

  // 1. The root project must never depend on extract-zip directly (prod or dev).
  assert.ok(
    !Object.prototype.hasOwnProperty.call(root.dependencies ?? {}, "extract-zip"),
    "root project must not depend on extract-zip directly (production)"
  );
  assert.ok(
    !Object.prototype.hasOwnProperty.call(root.devDependencies ?? {}, "extract-zip"),
    "root project must not depend on extract-zip directly (dev)"
  );

  assert.deepEqual(
    declaredDependents(lock, "extract-zip"),
    [],
    "no dependency may reintroduce the retired vulnerable archive extractor"
  );
  assert.deepEqual(
    Object.keys(lock.packages ?? {}).filter((key) => key.endsWith("/extract-zip")),
    [],
    "the lockfile must not retain an orphan extract-zip node"
  );

  // 4. promptfoo itself must be a devDependency, never a production dependency —
  //    this is what makes `npm audit --omit=dev` correctly report 0 for this chain.
  assert.ok(
    Object.prototype.hasOwnProperty.call(root.devDependencies ?? {}, "promptfoo"),
    "promptfoo must be listed under devDependencies"
  );
  assert.ok(
    !Object.prototype.hasOwnProperty.call(root.dependencies ?? {}, "promptfoo"),
    "promptfoo must NOT also be listed under production dependencies"
  );
});

test("OmniRoute's own production/runtime code never imports the extract-zip npm package", () => {
  const scanDirs = ["src", "open-sse", "bin"].map((d) => path.join(ROOT, d));
  const offenders: string[] = [];

  function walkFiles(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".next") continue;
        walkFiles(full);
      } else if (/\.(ts|tsx|js|mjs|cjs)$/.test(entry.name)) {
        const content = fs.readFileSync(full, "utf8");
        // Match an actual import/require of the npm package, not incidental substring
        // hits like our own local `extractZip()` helper function name.
        if (/(?:from\s+["']extract-zip["']|require\(["']extract-zip["']\))/.test(content)) {
          offenders.push(full);
        }
      }
    }
  }

  for (const dir of scanDirs) walkFiles(dir);

  assert.deepEqual(
    offenders,
    [],
    `expected no production import of the vulnerable "extract-zip" npm package, found: ${offenders.join(", ")}`
  );
});
