// The documented default of OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS must match the code default.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-analytics-docs-"));
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS;

const cache = await import("../../src/lib/usage/analyticsResponseCache.ts");
const NAME = "OMNIROUTE_ANALYTICS_CACHE_MIN_COMPUTE_MS";

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test(".env.example documents the code default for the analytics cache threshold", () => {
  const text = fs.readFileSync(path.resolve(".env.example"), "utf8");
  const line = text.split("\n").find((l) => l.startsWith(`# ${NAME}=`));
  assert.ok(line, `${NAME} example line missing`);
  assert.equal(Number(line.split("=")[1]), cache.getAnalyticsCacheMinComputeMs());
});

test("ENVIRONMENT.md documents the code default for the analytics cache threshold", () => {
  const text = fs.readFileSync(path.resolve("docs/reference/ENVIRONMENT.md"), "utf8");
  const row = text.split("\n").find((l) => l.startsWith(`| \`${NAME}\``));
  assert.ok(row, `${NAME} table row missing`);
  const cell = row.split("|")[2];
  assert.match(cell, new RegExp(`\`${cache.getAnalyticsCacheMinComputeMs()}\``));
});
