// core/reaper.mjs is spawned under bare `node` (no tsx) by core/gateway/local-reaper.mjs. In an
// npm install the CLI lives under node_modules, where Node refuses to type-strip .ts files
// (ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING), so the reaper's import graph must stay .ts-free.
// This runs the reaper entry from an installed-layout copy and expects its own "bad spec" exit.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");

test("the reaper starts under bare node from an installed (node_modules) layout", (t) => {
  const work = mkdtempSync(join(tmpdir(), "launch-reaper-native-"));
  t.after(() => rmSync(work, { recursive: true, force: true }));
  const pkg = join(work, "node_modules", "omniroute");
  // The .ts the contract re-exports is copied too, so a regression fails on type stripping
  // (the production failure), not on a missing file.
  for (const dir of ["bin/cli", "src/shared/launch"]) {
    cpSync(join(ROOT, dir), join(pkg, dir), { recursive: true });
  }

  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value !== undefined && key !== "OMNIROUTE_LAUNCH_REAPER_SPEC") env[key] = value;
  }
  const res = spawnSync(process.execPath, [join(pkg, "bin/cli/launch/core/reaper.mjs")], {
    cwd: work,
    env,
    encoding: "utf8",
    timeout: 30_000,
  });

  assert.doesNotMatch(res.stderr, /ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING/);
  assert.equal(res.status, 2, `stdout=${res.stdout}\nstderr=${res.stderr}`);
  assert.match(res.stdout, /reaper \d+: bad spec/);
});
