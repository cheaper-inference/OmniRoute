// #19066 block 7: type scale ratchet (scripts/check/check-type-scale-ratchet.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  compare,
  countViolations,
  measure,
} from "../../scripts/check/check-type-scale-ratchet.mjs";

const ROOT = process.cwd();

test("counts arbitrary sizes under the kit's 12 px floor", () => {
  const src = [
    '<p className="text-[8px]" />',
    '<p className="text-[9px] md:text-[10px]" />',
    '<p className="!text-[11px]" />',
    '<p className="text-[10.5px]" />',
  ].join("\n");
  assert.equal(countViolations(src).typeScaleSubFloorSizes, 5);
});

test("ignores sizes at or above the floor and look-alike classes", () => {
  const src = [
    '<p className="text-xs text-[12px] text-[13px]" />',
    '<p className="text-[110px] text-[1px]" />',
    '<p className="leading-[11px] my-text-[11px]" />',
  ].join("\n");
  assert.equal(countViolations(src).typeScaleSubFloorSizes, 0);
});

test("counts font-bold, including variants, but not longer names", () => {
  assert.equal(countViolations('<b className="font-bold hover:font-bold" />').typeScaleFontBold, 2);
  assert.equal(
    countViolations('<b className="font-semibold font-bolder x-font-bold" />').typeScaleFontBold,
    0
  );
});

test("measure walks nested folders, including ones named build, and skips tests", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "type-scale-"));
  try {
    const nested = path.join(dir, "src", "tabs", "build");
    fs.mkdirSync(nested, { recursive: true });
    fs.mkdirSync(path.join(dir, "src", "__tests__"), { recursive: true });
    fs.writeFileSync(path.join(nested, "Wizard.tsx"), '<p className="text-[11px] font-bold" />');
    fs.writeFileSync(path.join(dir, "src", "a.test.tsx"), '<p className="text-[11px]" />');
    fs.writeFileSync(path.join(dir, "src", "__tests__", "b.tsx"), '<p className="text-[9px]" />');
    const { totals, perFile } = measure(dir);
    assert.deepEqual(totals, { typeScaleSubFloorSizes: 1, typeScaleFontBold: 1 });
    assert.equal(perFile.length, 1);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("compare fails only on a count above its ceiling and skips absent metrics", () => {
  const metrics = { typeScaleSubFloorSizes: { value: 10 }, typeScaleFontBold: { value: 5 } };
  assert.deepEqual(compare({ typeScaleSubFloorSizes: 10, typeScaleFontBold: 4 }, metrics), {
    regressions: [],
    skipped: [],
  });
  assert.deepEqual(
    compare({ typeScaleSubFloorSizes: 11, typeScaleFontBold: 5 }, metrics).regressions,
    [{ name: "typeScaleSubFloorSizes", measured: 11, ceiling: 10 }]
  );
  assert.deepEqual(compare({ typeScaleSubFloorSizes: 99, typeScaleFontBold: 99 }, {}).skipped, [
    "typeScaleSubFloorSizes",
    "typeScaleFontBold",
  ]);
});

// The pre-commit hook runs the gate with --ratchet; this keeps the same ceiling enforced in
// CI (test:unit), where hooks do not run.
test("the live src/ tree stays within the type scale baseline", () => {
  const baseline = JSON.parse(
    fs.readFileSync(path.join(ROOT, "config/quality/quality-baseline.json"), "utf8")
  );
  const metrics = baseline.metrics;
  for (const name of ["typeScaleSubFloorSizes", "typeScaleFontBold"]) {
    assert.equal(typeof metrics[name]?.value, "number", `${name} has a baseline`);
    assert.equal(metrics[name].direction, "down", `${name} only goes down`);
  }
  const { totals, perFile } = measure(ROOT);
  const { regressions } = compare(totals, metrics);
  assert.deepEqual(
    regressions,
    [],
    "Sizes under 12 px or font-bold grew. Use text-xs (the kit floor) and font-semibold " +
      "(the kit's bold). Worst files:\n" +
      perFile
        .slice(0, 10)
        .map((r) => `  ${r.file}`)
        .join("\n")
  );
});
