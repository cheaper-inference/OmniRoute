import test from "node:test";
import assert from "node:assert/strict";

const { applyToolCallShimToBuffer, hasToolCallShim, repairToolArguments } =
  await import("../../open-sse/translator/helpers/toolCallShim.ts");

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    meta: { type: "object", properties: { labels: { type: "array" } } },
    steps: {
      type: "array",
      items: { type: "object", properties: { args: { type: "array" } } },
    },
    either: { type: ["string", "array"] },
    maybeList: { type: ["array", "null"] },
  },
};

const run = (args: unknown, s: Record<string, unknown> | undefined = schema) =>
  JSON.parse(applyToolCallShimToBuffer("create_task", JSON.stringify(args), s));

test("repairToolArguments: decodes a stringified array when the schema says array", () => {
  const out = JSON.parse(repairToolArguments(JSON.stringify({ tags: '["a","b"]' }), schema));
  assert.deepEqual(out, { tags: ["a", "b"] });
});

test("applyToolCallShimToBuffer: a tool without a registered shim is repaired from its schema", () => {
  assert.deepEqual(run({ tags: '["a"]', meta: '{"labels":["x"]}' }), {
    tags: ["a"],
    meta: { labels: ["x"] },
  });
});

test("never touches a string-typed parameter, even when the text looks like JSON", () => {
  const raw = JSON.stringify({ title: '["not","a","list"]' });
  assert.equal(repairToolArguments(raw, schema), raw);
  assert.equal(applyToolCallShimToBuffer("create_task", raw, schema), raw);
});

test("never decodes when the schema also allows a string", () => {
  const raw = JSON.stringify({ either: '["a"]' });
  assert.equal(repairToolArguments(raw, schema), raw);
});

test("decodes when the schema allows array or null", () => {
  assert.deepEqual(run({ maybeList: "[1,2]" }), { maybeList: [1, 2] });
});

test("keeps the text when the string does not parse to the declared type", () => {
  for (const args of [{ tags: "not json" }, { tags: '{"a":1}' }, { meta: "[1]" }, { tags: "" }]) {
    const raw = JSON.stringify(args);
    assert.equal(repairToolArguments(raw, schema), raw, raw);
  }
});

test("recurses into nested arrays and objects", () => {
  const out = run({ steps: [{ args: '["ls","-l"]' }, { args: ["pwd"] }] });
  assert.deepEqual(out.steps, [{ args: ["ls", "-l"] }, { args: ["pwd"] }]);
});

test("unwraps a whole-arguments JSON string once, then repairs fields", () => {
  const raw = JSON.stringify(JSON.stringify({ tags: '["a"]', title: "t" }));
  assert.deepEqual(JSON.parse(repairToolArguments(raw, schema)), { tags: ["a"], title: "t" });
});

test("keeps the text when the whole-arguments string is not an object", () => {
  for (const raw of [JSON.stringify("hello"), JSON.stringify("[1]"), "not json", "", "[1]"]) {
    assert.equal(repairToolArguments(raw, schema), raw, raw);
  }
});

test("returns the original text byte for byte when nothing needs repair", () => {
  const raw = '{ "id": 25999999999999999,  "tags": ["a"] }';
  assert.equal(repairToolArguments(raw, schema), raw);
});

test("returns the original text without a schema", () => {
  const raw = JSON.stringify({ tags: '["a"]' });
  assert.equal(repairToolArguments(raw, undefined), raw);
  assert.equal(applyToolCallShimToBuffer("create_task", raw), raw);
});

test("a registered shim still runs after the schema repair", () => {
  const prSchema = { type: "object", properties: { findings: { type: "array" } } };
  const out = JSON.parse(
    applyToolCallShimToBuffer(
      "submit_pr_review",
      JSON.stringify({ findings: '[{"t":1}]' }),
      prSchema
    )
  );
  assert.deepEqual(out.findings, [{ t: 1 }]);
  assert.deepEqual(out.functionalChanges, []);
});

test("hasToolCallShim: a schema with array/object parameters opts a tool in", () => {
  assert.equal(hasToolCallShim("create_task"), false);
  assert.equal(hasToolCallShim("create_task", schema), true);
  assert.equal(
    hasToolCallShim("create_task", { properties: { title: { type: "string" } } }),
    false
  );
});

test("applyToolCallShimToBuffer: a zero-argument call without a registered shim emits {}", () => {
  // The buffer is empty when the model sent no arguments at all.
  assert.equal(applyToolCallShimToBuffer("create_task", "", schema), "{}");
  assert.equal(applyToolCallShimToBuffer("create_task", "", undefined), "{}");
  assert.equal(
    applyToolCallShimToBuffer("create_task", '{"title":"t"}', schema),
    '{"title":"t"}',
    "non-empty arguments are still returned as they were"
  );
});
