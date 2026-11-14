// Payload rules: optional typed `when` conditions on default / default-raw / override / filter
// rules. All conditions of a rule must hold (AND), evaluated on the payload as it is when the rule
// is reached. A rule without `when` behaves as before. A malformed `when` drops the whole rule:
// a conditional rule must never end up applying unconditionally.
import test from "node:test";
import assert from "node:assert/strict";

const {
  applyPayloadRules,
  normalizePayloadRulesConfig,
  setPayloadRulesConfig,
  getPayloadRulesConfig,
} = await import("../../open-sse/services/payloadRules.ts");
const { resetPayloadRulesConfigForTests } = await import("../../open-sse/services/payloadRules.ts");
const { updatePayloadRulesSchema } = await import("../../src/shared/validation/schemas.ts");

test.afterEach(() => resetPayloadRulesConfigForTests());

const MODELS = [{ name: "gpt-*" }];
const EMPTY = { default: [], override: [], filter: [], defaultRaw: [] };

function run(payload: Record<string, unknown>, rules: Record<string, unknown>) {
  return applyPayloadRules(payload, "gpt-5", "openai", { ...EMPTY, ...rules } as never);
}

function override(when: unknown[]) {
  return { override: [{ models: MODELS, params: { tag: "hit" }, when }] };
}

test("eq applies the rule only when the value matches", () => {
  const when = [{ path: "metadata.tier", op: "eq", value: "pro" }];
  assert.equal(run({ metadata: { tier: "pro" } }, override(when)).payload.tag, "hit");
  assert.equal(run({ metadata: { tier: "free" } }, override(when)).payload.tag, undefined);
  assert.equal(run({}, override(when)).payload.tag, undefined);
});

test("eq compares objects and arrays by value", () => {
  const when = [{ path: "stop", op: "eq", value: ["a", "b"] }];
  assert.equal(run({ stop: ["a", "b"] }, override(when)).payload.tag, "hit");
  assert.equal(run({ stop: ["a"] }, override(when)).payload.tag, undefined);
});

test("neq applies when the value differs, and when the path is missing", () => {
  const when = [{ path: "stream", op: "neq", value: true }];
  assert.equal(run({ stream: false }, override(when)).payload.tag, "hit");
  assert.equal(run({}, override(when)).payload.tag, "hit");
  assert.equal(run({ stream: true }, override(when)).payload.tag, undefined);
});

test("in applies when the value is one of the listed values", () => {
  const when = [{ path: "reasoning_effort", op: "in", value: ["high", "xhigh"] }];
  assert.equal(run({ reasoning_effort: "xhigh" }, override(when)).payload.tag, "hit");
  assert.equal(run({ reasoning_effort: "low" }, override(when)).payload.tag, undefined);
  assert.equal(run({}, override(when)).payload.tag, undefined);
});

test("exists and missing test presence; null counts as present", () => {
  const exists = [{ path: "tools", op: "exists" }];
  const missing = [{ path: "tools", op: "missing" }];
  assert.equal(run({ tools: [] }, override(exists)).payload.tag, "hit");
  assert.equal(run({ tools: null }, override(exists)).payload.tag, "hit");
  assert.equal(run({}, override(exists)).payload.tag, undefined);
  assert.equal(run({}, override(missing)).payload.tag, "hit");
  assert.equal(run({ tools: [] }, override(missing)).payload.tag, undefined);
});

test("array index paths work in conditions", () => {
  const when = [{ path: "messages.0.role", op: "eq", value: "system" }];
  assert.equal(run({ messages: [{ role: "system" }] }, override(when)).payload.tag, "hit");
  assert.equal(run({ messages: [{ role: "user" }] }, override(when)).payload.tag, undefined);
});

test("all conditions must hold (AND)", () => {
  const when = [
    { path: "a", op: "eq", value: 1 },
    { path: "b", op: "exists" },
  ];
  assert.equal(run({ a: 1, b: 0 }, override(when)).payload.tag, "hit");
  assert.equal(run({ a: 1 }, override(when)).payload.tag, undefined);
  assert.equal(run({ a: 2, b: 0 }, override(when)).payload.tag, undefined);
});

test("conditions gate default, default-raw and filter rules too", () => {
  const when = [{ path: "gate", op: "eq", value: "on" }];
  const rules = {
    default: [{ models: MODELS, params: { d: 1 }, when }],
    defaultRaw: [{ models: MODELS, params: { r: "2" }, when }],
    filter: [{ models: MODELS, params: ["gone"], when }],
  };
  const off = run({ gate: "off", gone: 1 }, rules).payload;
  assert.deepEqual(off, { gate: "off", gone: 1 });
  const on = run({ gate: "on", gone: 1 }, rules).payload;
  assert.deepEqual(on, { gate: "on", d: 1, r: 2 });
});

test("a condition sees the payload as earlier rules left it", () => {
  const rules = {
    override: [
      { models: MODELS, params: { stage: "one" } },
      {
        models: MODELS,
        params: { second: true },
        when: [{ path: "stage", op: "eq", value: "one" }],
      },
    ],
  };
  assert.deepEqual(run({}, rules).payload, { stage: "one", second: true });
});

test("a rule without when behaves exactly as before", () => {
  const rules = { override: [{ models: MODELS, params: { tag: "hit" } }] };
  assert.equal(run({}, rules).payload.tag, "hit");
});

test("normalize keeps a valid when and survives the config clone", async () => {
  const when = [{ path: "x", op: "in", value: [1, 2] }];
  setPayloadRulesConfig({ override: [{ models: MODELS, params: { tag: "hit" }, when }] });
  const config = await getPayloadRulesConfig();
  assert.deepEqual(config.override[0].when, when);
  config.override[0].when![0].path = "mutated";
  assert.equal((await getPayloadRulesConfig()).override[0].when![0].path, "x");
});

test("a malformed when drops the whole rule instead of applying it unconditionally", () => {
  for (const bad of [
    "not-an-array",
    [{ path: "x", op: "contains", value: 1 }],
    [{ path: "", op: "exists" }],
    [{ op: "exists" }],
    [{ path: "x", op: "eq" }],
    [{ path: "x", op: "in", value: "not-a-list" }],
    [{ path: "x", op: "exists", value: 1 }],
    [
      { path: "ok", op: "exists" },
      { path: "x", op: "nope" },
    ],
  ]) {
    const config = normalizePayloadRulesConfig({
      override: [{ models: MODELS, params: { tag: "hit" }, when: bad }],
      filter: [{ models: MODELS, params: ["gone"], when: bad }],
    });
    assert.equal(config.override.length, 0, `override kept for ${JSON.stringify(bad)}`);
    assert.equal(config.filter.length, 0, `filter kept for ${JSON.stringify(bad)}`);
  }
});

test("the settings schema accepts a valid when and rejects a malformed one", () => {
  const rule = (when: unknown) => ({
    override: [{ models: [{ name: "gpt-*" }], params: { tag: "hit" }, when }],
  });
  assert.equal(
    updatePayloadRulesSchema.safeParse(rule([{ path: "x", op: "eq", value: 1 }])).success,
    true
  );
  assert.equal(updatePayloadRulesSchema.safeParse(rule([{ path: "x", op: "eq" }])).success, false);
  assert.equal(
    updatePayloadRulesSchema.safeParse(rule([{ path: "x", op: "bogus", value: 1 }])).success,
    false
  );
});
