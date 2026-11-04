import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { scanCodeVars } from "../../../scripts/check/check-env-doc-sync.mjs";

// check-env-doc-sync collected `process.env.X` references with
// `grep -rhoE … 2>/dev/null || true` through execSync. On Windows that runs in cmd.exe,
// where `2>/dev/null` is an invalid path: the scan returned ZERO variables, so the
// "in code but missing from .env.example" check passed vacuously. The scan is now
// pure Node and must find the code's references on every platform.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

test("scanCodeVars finds the repo's process.env references (not an empty set)", () => {
  const vars = scanCodeVars({ cwd: ROOT });
  assert.ok(vars.size > 100, `expected hundreds of vars, got ${vars.size}`);
  assert.ok(vars.has("NODE_ENV"));
});

test("scanCodeVars walks nested roots, single files, and skips binary or missing ones", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "env-scan-"));
  try {
    fs.mkdirSync(path.join(dir, "src", "deep"), { recursive: true });
    fs.writeFileSync(
      path.join(dir, "src", "deep", "a.ts"),
      "const a = process.env.ALPHA_ONE; const b = process.env.BETA_2 || process.env.lower;"
    );
    fs.writeFileSync(path.join(dir, "main.js"), "process.env.GAMMA_FILE");
    fs.writeFileSync(path.join(dir, "src", "blob.bin"), "process.env.IN_BINARY\0");

    const vars = scanCodeVars({ cwd: dir, roots: ["src", "main.js", "missing-dir"] });
    assert.deepEqual([...vars].sort(), ["ALPHA_ONE", "BETA_2", "GAMMA_FILE"]);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("the gate no longer shells out to grep", () => {
  const src = fs.readFileSync(path.join(ROOT, "scripts/check/check-env-doc-sync.mjs"), "utf8");
  // Match the import, not prose: the doc comment on scanCodeVars quotes the old grep line.
  assert.doesNotMatch(src, /from\s+["'](node:)?child_process["']/);
});
