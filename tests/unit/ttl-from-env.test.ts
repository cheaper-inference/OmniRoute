// Unit tests for resolveTtlMsFromEnv (open-sse/utils/ttlFromEnv.ts): valid
// minute values are converted to milliseconds; unset, blank, non-numeric,
// zero and negative values fall back to the default.
import test from "node:test";
import assert from "node:assert/strict";

import { resolveTtlMsFromEnv } from "../../open-sse/utils/ttlFromEnv.ts";

const VAR = "OMNIROUTE_TEST_TTL_FROM_ENV_MIN";
const MIN = 60 * 1000;

function withEnv(value: string | undefined, fn: () => void): void {
  const prev = process.env[VAR];
  if (value === undefined) delete process.env[VAR];
  else process.env[VAR] = value;
  try {
    fn();
  } finally {
    if (prev === undefined) delete process.env[VAR];
    else process.env[VAR] = prev;
  }
}

test("a positive integer value is converted from minutes to milliseconds", () => {
  withEnv("45", () => assert.equal(resolveTtlMsFromEnv(VAR, 15), 45 * MIN));
  withEnv("1", () => assert.equal(resolveTtlMsFromEnv(VAR, 15), 1 * MIN));
});

test("unset and blank values fall back to the default", () => {
  withEnv(undefined, () => assert.equal(resolveTtlMsFromEnv(VAR, 15), 15 * MIN));
  withEnv("", () => assert.equal(resolveTtlMsFromEnv(VAR, 15), 15 * MIN));
});

test("non-numeric, zero and negative values fall back to the default", () => {
  for (const raw of ["abc", "0", "-3", "  "]) {
    withEnv(raw, () => assert.equal(resolveTtlMsFromEnv(VAR, 15), 15 * MIN, `raw=${raw}`));
  }
});

test("the default is honored per call", () => {
  withEnv(undefined, () => assert.equal(resolveTtlMsFromEnv(VAR, 30), 30 * MIN));
});
