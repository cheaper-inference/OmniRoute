import test from "node:test";
import assert from "node:assert/strict";

// The combo-level payload opt-out is an additional rung in the existing
// no-log circuit breaker. Absent or false preserves current logging behaviour.
const { resolveComboNoLog, resolveComboNoLogForRequest } =
  await import("../../open-sse/handlers/chatCore/comboNoLog.ts");

test("resolveComboNoLog matches by id first and only strict true opts out", () => {
  const combos = [
    { id: "c1", name: "code-main", config: { noLog: true } },
    { id: "c2", name: "code-main", config: { noLog: false } },
  ];

  assert.equal(resolveComboNoLog({ comboId: "c1", combos }), true);
  assert.equal(resolveComboNoLog({ comboId: "c2", combos }), false);
  assert.equal(resolveComboNoLog({ comboId: "missing", combos }), false);
  assert.equal(resolveComboNoLog({ comboName: "code-main", combos }), true);
  assert.equal(resolveComboNoLog({ comboName: "CODE-MAIN", combos }), true);
  assert.equal(resolveComboNoLog({ comboName: "missing", combos }), false);
});

test("resolveComboNoLog rejects non-boolean flags and malformed records", () => {
  const combos = [
    { id: "string", name: "string", config: { noLog: "true" } },
    { id: "number", name: "number", config: { noLog: 1 } },
    { id: "missing", name: "missing", config: {} },
    { id: "bad-config", name: "bad-config", config: [] },
    null,
    "not-a-record",
  ];

  for (const id of ["string", "number", "missing", "bad-config"]) {
    assert.equal(resolveComboNoLog({ comboId: id, combos }), false);
  }
  assert.equal(resolveComboNoLog({ comboName: "string", combos }), false);
  assert.equal(resolveComboNoLog({ comboName: "string", combos: null }), false);
  assert.equal(resolveComboNoLog({ comboName: "string", combos: undefined }), false);
});

test("resolveComboNoLogForRequest does not load combos for ordinary model calls", async () => {
  let called = false;
  assert.equal(
    await resolveComboNoLogForRequest({
      getCombos: async () => {
        called = true;
        return [{ id: "c1", name: "code-main", config: { noLog: true } }];
      },
    }),
    false
  );
  assert.equal(called, false);
});

test("resolveComboNoLogForRequest degrades to logging enabled on store failure", async () => {
  assert.equal(
    await resolveComboNoLogForRequest({
      comboName: "code-main",
      getCombos: async () => {
        throw new Error("store unavailable");
      },
    }),
    false
  );
});
