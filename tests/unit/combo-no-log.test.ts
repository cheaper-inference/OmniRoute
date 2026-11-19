import test from "node:test";
import assert from "node:assert/strict";

// Combo-level payload-logging opt-out: `config.noLog === true` on the combo
// serving the request withholds message content from call logs.
const { resolveComboNoLog } = await import("../../open-sse/handlers/chatCore/comboNoLog.ts");

const combos = [
  { id: "c1", name: "fast", config: { noLog: true } },
  { id: "c2", name: "cheap", config: { noLog: false } },
  { id: "c3", name: "plain", config: {} },
  { id: "c4", name: "NoConfig" },
  { id: "c5", name: "MixedCase", config: { noLog: true } },
];

test("a combo with noLog true withholds payloads", () => {
  assert.equal(resolveComboNoLog({ comboName: "fast", combos }), true);
});

test("noLog false, absent config, or a missing config all fall through", () => {
  assert.equal(resolveComboNoLog({ comboName: "cheap", combos }), false);
  assert.equal(resolveComboNoLog({ comboName: "plain", combos }), false);
  assert.equal(resolveComboNoLog({ comboName: "NoConfig", combos }), false);
});

test("only a strict boolean true opts out (strings and truthy values do not)", () => {
  const odd = [
    { id: "a", name: "str", config: { noLog: "true" } },
    { id: "b", name: "num", config: { noLog: 1 } },
    { id: "c", name: "nested", config: { noLog: { enabled: true } } },
  ];
  for (const comboName of ["str", "num", "nested"]) {
    assert.equal(resolveComboNoLog({ comboName, combos: odd }), false, comboName);
  }
});

test("id wins over name (a combo can be renamed mid-flight)", () => {
  // The name lookup would find the no-log combo; the id points at another one.
  assert.equal(
    resolveComboNoLog({ comboName: "fast", comboId: "c2", combos }),
    false,
    "id c2 is the logging combo"
  );
  assert.equal(resolveComboNoLog({ comboName: "cheap", comboId: "c1", combos }), true);
});

test("name matching is case-insensitive as a fallback", () => {
  assert.equal(resolveComboNoLog({ comboName: "mixedcase", combos }), true);
  assert.equal(resolveComboNoLog({ comboName: "MIXEDCASE", combos }), true);
});

test("non-combo requests and empty inputs never withhold", () => {
  assert.equal(resolveComboNoLog({ combos }), false);
  assert.equal(resolveComboNoLog({ comboName: null, comboId: null, combos }), false);
  assert.equal(resolveComboNoLog({ comboName: "", combos }), false);
  assert.equal(resolveComboNoLog({ comboName: "  ", combos }), false);
  assert.equal(resolveComboNoLog({ comboName: "fast", combos: null }), false);
  assert.equal(resolveComboNoLog({ comboName: "fast", combos: [] }), false);
  assert.equal(resolveComboNoLog({ comboName: "missing", combos }), false);
});

test("malformed rows are skipped instead of throwing", () => {
  const dirty = [
    null,
    undefined,
    42,
    "combo",
    [],
    { id: "ok", name: "ok", config: { noLog: true } },
  ];
  assert.equal(resolveComboNoLog({ comboName: "ok", combos: dirty }), true);
  assert.equal(resolveComboNoLog({ comboName: "nope", combos: dirty }), false);
});
