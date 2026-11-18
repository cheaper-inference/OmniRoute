import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
// @ts-expect-error — .mjs gate module has no type declarations; runtime shape is known.
import { findErrorHelperViolations } from "../../scripts/check/check-error-helper.mjs";

const ROUTE = "src/app/api/providers/[id]/sync-models/route.ts";
const source = readFileSync(new URL(`../../${ROUTE}`, import.meta.url), "utf8");

function scan(source: string): string[] {
  return findErrorHelperViolations([{ path: ROUTE, source }], new Set<string>());
}

test("model sync keeps its error log recognizable without a gate exemption", () => {
  assert.deepEqual(scan(source), []);
});

test("timing an internal call log does not turn it into a client response", () => {
  const fixture = `export async function fail(error: Error) {
    await timings.measure("call-log", () =>
      saveCallLog({
        status: 500,
        error: error.message || "Sync failed",
      })
    ).catch(() => {});
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }`;
  assert.deepEqual(scan(fixture), []);
});

test("a timed call log must not hide a neighboring raw HTTP error", () => {
  const fixture = `export async function fail(error: Error) {
    await timings.measure("call-log", () =>
      saveCallLog({
        status: 500,
        error: error.message || "Sync failed",
      })
    ).catch(() => {});
    return NextResponse.json({ error: error.message }, { status: 500 });
  }`;
  assert.deepEqual(scan(fixture), [ROUTE]);
});

test("timing a raw HTTP response does not make it an internal log", () => {
  const fixture = `export async function fail(error: Error) {
    return timings.measure("call-log", () =>
      NextResponse.json({
        error: error.message || "Sync failed",
      }, { status: 500 })
    );
  }`;
  assert.deepEqual(scan(fixture), [ROUTE]);
});

test("the real model sync response remains checked independently of its log", () => {
  const unsafe = source.replace(
    'sanitizeErrorMessage(error) || "Failed to sync models"',
    'error.message || "Failed to sync models"'
  );
  assert.notEqual(unsafe, source, "the response mutation must reach the real catch path");
  assert.deepEqual(scan(unsafe), [ROUTE]);
});
