/**
 * Fidelity gate, numeric invariant: every input number must appear in the output as a
 * standalone literal. A number that only occurs inside a longer one ("12" inside "123")
 * is a different number and must fail.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { checkFidelity } from "../../../open-sse/services/compression/fidelityGate.ts";

const ON = { enabled: true };

test("numeric: '12' inside '123' does not count as preserved", () => {
  const r = checkFidelity("run 12 jobs", "run 123 jobs", ON);
  assert.equal(r.passed, false);
  assert.equal(r.failedInvariant, "numeric");
  assert.match(r.detail ?? "", /12/);
});

test("numeric: '3.5' inside '13.5' does not count as preserved", () => {
  const r = checkFidelity("limit 3.5 seconds", "limit 13.5 seconds", ON);
  assert.equal(r.passed, false);
  assert.equal(r.failedInvariant, "numeric");
});

test("numeric: a number at the end of a sentence still counts as preserved", () => {
  assert.equal(
    checkFidelity("found 12 files in 3.5 seconds", "files: 12. time: 3.5.", ON).passed,
    true
  );
});

test("numeric: a trailing comma on the input number does not make it a different number", () => {
  assert.equal(checkFidelity("ids 7, 8", "ids 7 8", ON).passed, true);
});

test("numeric: comma-joined literals keep their identity", () => {
  assert.equal(checkFidelity("lines 1,3", "lines 1,3 changed", ON).passed, true);
  assert.equal(checkFidelity("lines 1,3", "lines 1 and 3", ON).failedInvariant, "numeric");
});

test("numeric: the check can be switched off", () => {
  assert.equal(
    checkFidelity("run 12 jobs", "run 123 jobs", { enabled: true, checkNumericIntegrity: false })
      .passed,
    true
  );
});
