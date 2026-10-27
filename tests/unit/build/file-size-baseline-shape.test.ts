// tests/unit/build/file-size-baseline-shape.test.ts
// Shape guard for config/quality/file-size-baseline.json.
//
// scripts/check/check-file-size.mjs reads ONLY `cap`, `testCap`, `frozen` and
// `testFrozen` from this file. A merge resolution on 2026-09-03 (d36d077a4d, #12626)
// left ~69 file-path → LOC keys at the TOP level, outside `frozen`. The gate ignored
// them, so the file showed two different ceilings for the same path (e.g. combo.ts)
// and only one of them was real. This test keeps stray top-level keys out.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const BASELINE_PATH = path.resolve("config/quality/file-size-baseline.json");
const KNOWN_KEYS = new Set(["cap", "testCap", "frozen", "testFrozen"]);

function loadBaseline(): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
}

const isNote = (key: string) => key.startsWith("_");

test("file-size baseline: top level only has cap/testCap/frozen/testFrozen and _notes", () => {
  const baseline = loadBaseline();
  const stray = Object.keys(baseline).filter((key) => !KNOWN_KEYS.has(key) && !isNote(key));
  assert.deepEqual(
    stray,
    [],
    `stray top-level keys are invisible to check-file-size.mjs — move them into ` +
      `"frozen"/"testFrozen" or drop them: ${stray.join(", ")}`
  );
});

test("file-size baseline: cap and testCap are positive finite numbers", () => {
  const baseline = loadBaseline();
  for (const key of ["cap", "testCap"]) {
    const value = baseline[key];
    assert.equal(typeof value, "number", `${key} must be a number`);
    assert.ok(Number.isFinite(value) && (value as number) > 0, `${key} must be > 0`);
  }
});

test("file-size baseline: frozen/testFrozen map file paths to numeric LOC", () => {
  const baseline = loadBaseline();
  for (const mapKey of ["frozen", "testFrozen"]) {
    const map = baseline[mapKey];
    assert.ok(map && typeof map === "object" && !Array.isArray(map), `${mapKey} must be an object`);
    const entries = Object.entries(map as Record<string, unknown>).filter(([k]) => !isNote(k));
    assert.ok(entries.length > 0, `${mapKey} must hold at least one file entry`);
    for (const [file, loc] of entries) {
      assert.ok(
        typeof loc === "number" || typeof loc === "string",
        `${mapKey}["${file}"] must be a number or numeric string, got ${typeof loc}`
      );
      assert.ok(
        Number.isFinite(Number(loc)) && Number(loc) > 0,
        `${mapKey}["${file}"] must be a positive finite LOC, got ${JSON.stringify(loc)}`
      );
    }
  }
});
