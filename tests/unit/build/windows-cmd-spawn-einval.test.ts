import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";

import { runBuildTool } from "../../../scripts/build/buildToolRunner.mjs";
import { rebuildInvocation } from "../../../scripts/dev/ensure-native-sqlite.mjs";

// Since the CVE-2024-27980 hardening, Node refuses to spawn a `.cmd`/`.bat` without a
// shell and throws EINVAL. Three typecheck gates spawned `npx.cmd` that way, so on
// Windows they crashed before running tsc, and `ensure-native-sqlite` spawned
// `npm.cmd` that way, so its rebuild always reported failure there.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

const TYPECHECK_GATES = [
  "scripts/check/check-api-typecheck.mjs",
  "scripts/check/check-dashboard-typecheck.mjs",
  "scripts/check/check-open-sse-typecheck.mjs",
];

test("typecheck gates execute the local compiler without shims, including special paths", () => {
  for (const rel of TYPECHECK_GATES) {
    const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
    assert.doesNotMatch(src, /"npx\.cmd"/, `${rel} still spawns npx.cmd`);
    // A real CLI invocation proves the platform contract without prescribing a
    // helper name. Spaces and '&' must be arguments, not shell syntax.
    const root = fs.mkdtempSync(path.join(tmpdir(), "qg tsc & spawn-"));
    try {
      const scope = path.basename(rel).slice("check-".length, -"-typecheck.mjs".length);
      for (const directory of ["node_modules/typescript/bin", "config/quality", "open-sse"]) {
        fs.mkdirSync(path.join(root, directory), { recursive: true });
      }
      fs.writeFileSync(
        path.join(
          root,
          scope === "open-sse" ? "open-sse/tsconfig.json" : `tsconfig.typecheck-${scope}.json`
        ),
        "{}\n"
      );
      fs.writeFileSync(
        path.join(root, `config/quality/${scope}-typecheck-baseline.json`),
        JSON.stringify({ "src/example.ts": { TS2339: 1 } })
      );
      fs.writeFileSync(
        path.join(root, "node_modules/typescript/bin/tsc"),
        'process.stdout.write("src/example.ts(1,1): error TS2339: Missing property.\\n"); process.exit(2);\n'
      );
      const result = spawnSync(process.execPath, [path.join(ROOT, rel)], {
        cwd: root,
        encoding: "utf8",
        timeout: 15000,
      });
      assert.equal(result.error, undefined);
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.match(result.stdout, /TypecheckErrors=1/);
      assert.match(result.stdout, /\bOK\b/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

test("runBuildTool returns the tool's stdout so the gates can parse tsc output", () => {
  const out = runBuildTool("typescript", "tsc", ["--version"], { encoding: "utf8" });
  assert.match(String(out), /^Version \d+\.\d+/);
});

test("ensure-native-sqlite spawns npm.cmd through the shell on win32", () => {
  const win = rebuildInvocation("win32");
  assert.equal(win.shell, true, "npm.cmd without a shell is EINVAL on Windows");
  assert.equal(win.file, "npm.cmd rebuild better-sqlite3");
  assert.deepEqual(win.args, [], "a shell command with an args array trips DEP0190");

  assert.deepEqual(rebuildInvocation("linux"), {
    file: "npm",
    args: ["rebuild", "better-sqlite3"],
    shell: false,
  });
});
