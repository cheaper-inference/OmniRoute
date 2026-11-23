import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

const gate = path.resolve("scripts/check/check-t11-any-budget.mjs");
const source = fs.readFileSync(gate, "utf8");
const budgetFiles = [...source.matchAll(/file: "([^"]+)"/g)].map((match) => match[1]);

test("any budget distinguishes property names from explicit any types", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "t11-property-name-"));
  try {
    for (const file of budgetFiles) {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
      fs.writeFileSync(path.join(root, file), "export {};\n");
    }
    const target = path.join(root, "open-sse/services/combo.ts");
    fs.writeFileSync(
      target,
      [
        "const a = AbortSignal.any([]);",
        "const b = AbortSignal . any([]);",
        "const c = AbortSignal /* comment */ . /* comment */ any([]);",
        "const d = optional?.any();",
      ].join("\n")
    );
    const allowed = spawnSync(process.execPath, [gate], { cwd: root, encoding: "utf8" });
    assert.equal(allowed.status, 0, allowed.stdout + allowed.stderr);
    assert.match(allowed.stdout, /combo\.ts \(explicit any: 0, budget: 0\)/);

    const safeSource = fs.readFileSync(target, "utf8");
    for (const unsafe of ["const unsafe: any = null;", "type Unsafe = [...any[]];"]) {
      fs.writeFileSync(target, `${safeSource}\n${unsafe}\n`);
      const rejected = spawnSync(process.execPath, [gate], { cwd: root, encoding: "utf8" });
      assert.equal(rejected.status, 1, rejected.stdout + rejected.stderr);
      assert.match(
        rejected.stdout,
        /FAIL - open-sse\/services\/combo\.ts \(explicit any: 1, budget: 0\)/
      );
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
