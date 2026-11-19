import test from "node:test";
import assert from "node:assert/strict";
import { verifyInvariants } from "../../scripts/check/check-functional-invariants.mjs";

test("property_boundary_regex - nominal: ECONNRESET -> retry (no signal)", () => {
  const d = [{ path: "a.ts", line: 'if (err.code === "ECONNRESET") retry();' }];
  assert.equal(
    verifyInvariants(d).some((r) => r.predicate === "property_boundary_regex"),
    false
  );
});

test("property_boundary_regex - limit: property error -> no retry (REJECTED)", () => {
  const d = [{ path: "a.ts", line: "if (/ECONNRESET/.test(err.message)) retry();" }];
  assert.equal(
    verifyInvariants(d).some((r) => r.predicate === "property_boundary_regex"),
    true
  );
});
