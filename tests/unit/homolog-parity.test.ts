import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluateParity } from "../../scripts/homolog/lib/parity.mjs";

test("parity OK when health matches expected version", () => {
  const r = evaluateParity(
    { status: "healthy", version: "3.8.49" },
    { expectedVersion: "3.8.49", httpStatus: 200 }
  );
  assert.equal(r.ok, true);
  assert.deepEqual(r.failures, []);
});

test("parity fails listing each divergence", () => {
  const r = evaluateParity(
    { status: "degraded", version: "3.8.47" },
    { expectedVersion: "3.8.49", httpStatus: 200 }
  );
  assert.equal(r.ok, false);
  assert.equal(r.failures.length, 2); // status!=healthy, version mismatch
});

test("parity fails on non-200 HTTP even with good body", () => {
  const r = evaluateParity(
    { status: "healthy", version: "3.8.49" },
    { expectedVersion: "3.8.49", httpStatus: 503 }
  );
  assert.equal(r.ok, false);
});
