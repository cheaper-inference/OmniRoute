import test from "node:test";
import assert from "node:assert/strict";

// Call-log no-log toggles: global + connection + per-model tiers.
// Any true wins (monotonic); logging is ON by default at every tier.
const { isGlobalNoLogEnabled, resolveNoLogEnabled } =
  await import("../../open-sse/handlers/chatCore/headers.ts");

test("isGlobalNoLogEnabled: either alias false opts out globally", () => {
  assert.equal(isGlobalNoLogEnabled({ noLogPayloads: false }), true);
  assert.equal(isGlobalNoLogEnabled({ loggingEnabled: false }), true);
  assert.equal(isGlobalNoLogEnabled({ noLogPayloads: true }), false);
  assert.equal(isGlobalNoLogEnabled({ loggingEnabled: true }), false);
  assert.equal(isGlobalNoLogEnabled({}), false);
  assert.equal(isGlobalNoLogEnabled(null), false);
  assert.equal(isGlobalNoLogEnabled(undefined), false);
  assert.equal(isGlobalNoLogEnabled("false"), false);
});

test("resolveNoLogEnabled OR matrix across all five tiers", () => {
  const header = { "x-omniroute-no-log": "true" };
  const cases = [
    // [apiKey, headers, global, connection, model, expected]
    [null, null, false, false, undefined, false],
    [null, null, true, false, undefined, true], // global alone
    [null, null, false, true, undefined, true], // connection alone
    [null, null, false, false, true, true], // model alone
    [null, header, false, false, undefined, true], // header alone
    [{ noLog: true }, null, false, false, undefined, true], // key alone
    // Monotonic: parent tiers never un-log a lower opt-out, and vice versa.
    [null, null, true, false, false, true],
    [null, null, false, true, false, true],
  ];
  for (const [apiKeyInfo, headers, globalNoLog, connectionNoLog, modelNoLog, expected] of cases) {
    assert.equal(
      resolveNoLogEnabled({
        apiKeyInfo,
        headers,
        globalNoLog,
        connectionNoLog,
        modelNoLog,
      }),
      expected,
      `case key=${JSON.stringify(apiKeyInfo)} headers=${JSON.stringify(headers)} global=${globalNoLog} conn=${connectionNoLog} model=${modelNoLog}`
    );
  }
});

test("positional overload still works (PR #20096 callers untouched)", () => {
  assert.equal(resolveNoLogEnabled({ noLog: true }, null), true);
  assert.equal(resolveNoLogEnabled(null, { "x-omniroute-no-log": "1" }), true);
  assert.equal(resolveNoLogEnabled(null, null), false);
});

test("noLogPayloads and loggingEnabled accept only strict booleans", () => {
  assert.equal(isGlobalNoLogEnabled({ noLogPayloads: "false" }), false);
  assert.equal(isGlobalNoLogEnabled({ loggingEnabled: 0 }), false);
  assert.equal(resolveNoLogEnabled({ apiKeyInfo: null, headers: null, globalNoLog: true }), true);
  assert.equal(
    resolveNoLogEnabled({ apiKeyInfo: null, headers: null, modelNoLog: undefined }),
    false
  );
});
