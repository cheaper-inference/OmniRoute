// #19066 block 7: type scale ratchet (scripts/check/check-type-scale-ratchet.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

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

// Missing scan inputs must never be accepted as an empty, passing tree.
const cliPath = path.join(ROOT, "scripts/check/check-type-scale-ratchet.mjs");
const completeMetrics = (value = 0) => ({
  typeScaleSubFloorSizes: { value, direction: "down" },
  typeScaleFontBold: { value, direction: "down" },
});

function runFixture({
  baseline,
  source = "",
  missingSource = false,
  sourceIsFile = false,
  ratchet = true,
}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "type-scale-cli-"));
  try {
    fs.mkdirSync(path.join(dir, "config/quality"), { recursive: true });
    if (baseline !== undefined) {
      fs.writeFileSync(
        path.join(dir, "config/quality/quality-baseline.json"),
        typeof baseline === "string" ? baseline : JSON.stringify(baseline)
      );
    }
    if (sourceIsFile) fs.writeFileSync(path.join(dir, "src"), source);
    else if (!missingSource) {
      fs.mkdirSync(path.join(dir, "src"));
      fs.writeFileSync(path.join(dir, "src/Component.tsx"), source);
    }
    return spawnSync(process.execPath, [cliPath, ...(ratchet ? ["--ratchet"] : [])], {
      cwd: dir,
      encoding: "utf8",
      timeout: 10000,
    });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

for (const [name, baseline] of [
  ["missing baseline", undefined],
  ["malformed baseline", "{"],
  ["missing metrics", {}],
  ["missing one metric", { metrics: { typeScaleSubFloorSizes: { value: 0, direction: "down" } } }],
  ["null ceiling", { metrics: completeMetrics(null) }],
  ["string ceiling", { metrics: completeMetrics("0") }],
  ["negative ceiling", { metrics: completeMetrics(-1) }],
  ["fractional ceiling", { metrics: completeMetrics(0.5) }],
  [
    "nonfinite ceiling",
    '{"metrics":{"typeScaleSubFloorSizes":{"value":1e309,"direction":"down"},"typeScaleFontBold":{"value":0,"direction":"down"}}}',
  ],
  [
    "wrong direction",
    { metrics: { ...completeMetrics(), typeScaleFontBold: { value: 0, direction: "up" } } },
  ],
]) {
  test(`the blocking CLI reports incomplete input for ${name}`, () => {
    const result = runFixture({ baseline });
    assert.ifError(result.error);
    assert.equal(result.signal, null);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /typeScale=INCOMPLETE/);
    assert.doesNotMatch(result.stdout, /typeScale OK/);
  });
}

for (const shape of ["missing", "file"]) {
  test(`the blocking CLI rejects a ${shape} src tree`, () => {
    const result = runFixture({
      baseline: { metrics: completeMetrics() },
      missingSource: shape === "missing",
      sourceIsFile: shape === "file",
    });
    assert.ifError(result.error);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /typeScale=INCOMPLETE/);
    assert.doesNotMatch(result.stdout, /typeScale OK/);
  });
}

test("the CLI still accepts measured zero, equality and improvement", () => {
  for (const fixture of [
    { baseline: { metrics: completeMetrics() } },
    { baseline: { metrics: completeMetrics(1) }, source: "text-[10px] font-bold" },
    { baseline: { metrics: completeMetrics(1) } },
  ]) {
    const result = runFixture(fixture);
    assert.ifError(result.error);
    assert.equal(result.status, 0);
    assert.match(result.stdout, /typeScale OK/);
  }
});

test("a measured regression remains a policy failure, separate from incomplete input", () => {
  const result = runFixture({
    baseline: { metrics: completeMetrics() },
    source: "text-[10px] font-bold",
  });
  assert.ifError(result.error);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Type scale ratchet:/);
  assert.doesNotMatch(result.stderr, /typeScale=INCOMPLETE/);
});

test("advisory measurement does not require a baseline", () => {
  const result = runFixture({ ratchet: false, source: "font-bold" });
  assert.ifError(result.error);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /typeScaleFontBold=1/);
});
