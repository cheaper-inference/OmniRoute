import test from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity: clean } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");
const { isGeminiTrailingModelTurnRejectingModel: rejectsTrailing } =
  await import("../../open-sse/translator/helpers/geminiTrailingModelTurn.ts");

type Schema = {
  type?: string;
  enum?: string[];
  items: { type: string };
  properties: { range: { items: { type: string }; prefixItems?: unknown } };
};

// Claude Code describes `[start_line, end_line]` ranges with prefixItems. Gemini has no tuple
// keyword, so the array must keep the element type instead of becoming an array of strings.
test("prefixItems of one type keeps that element type as items", () => {
  const out = clean({
    type: "object",
    properties: {
      range: { type: "array", prefixItems: [{ type: "integer" }, { type: "integer" }] },
    },
  }) as Schema;
  assert.equal(out.properties.range.items.type, "integer");
  assert.equal(out.properties.range.prefixItems, undefined);
});

test("prefixItems of mixed types keeps the most informative element schema", () => {
  const out = clean({
    type: "array",
    prefixItems: [{ type: "string" }, { type: "object", properties: { a: { type: "integer" } } }],
  }) as Schema;
  assert.equal(out.items.type, "object");
});

test("guard: an explicit items schema wins over prefixItems", () => {
  const out = clean({
    type: "array",
    items: { type: "number" },
    prefixItems: [{ type: "integer" }],
  }) as Schema;
  assert.equal(out.items.type, "number");
});

test("guard: an array with neither items nor prefixItems still gets a string items schema", () => {
  const out = clean({ type: "array" }) as Schema;
  assert.equal(out.items.type, "string");
});

// A nullable enum must not offer the string "null" as a value, nor keep string values on a
// numeric type.
test("nullable integer enum drops null and the string values", () => {
  const out = clean({ type: ["integer", "null"], enum: [1, 2, null] }) as Schema;
  assert.equal(out.type, "integer");
  assert.equal(out.enum, undefined);
});

test("nullable string enum does not gain a literal 'null' value", () => {
  const out = clean({ type: ["string", "null"], enum: ["a", "b", null] }) as Schema;
  assert.equal(out.type, "string");
  assert.deepEqual(out.enum, ["a", "b"]);
});

test("guard: a plain string enum is unchanged", () => {
  const out = clean({ type: "string", enum: ["a", "b"] }) as Schema;
  assert.deepEqual(out.enum, ["a", "b"]);
});

// Gemini 4 answers 400 "Requests ending with a model turn are not supported", like Gemini 3.
test("the trailing model turn gate covers gemini-4 models", () => {
  assert.equal(rejectsTrailing("gemini-4-argon"), true);
  assert.equal(rejectsTrailing("gemini-4"), true);
  assert.equal(rejectsTrailing("gemini-4.1-pro"), true);
});

test("the trailing model turn gate sees through a provider path prefix", () => {
  assert.equal(rejectsTrailing("models/gemini-3-pro-preview"), true);
  assert.equal(rejectsTrailing("google/gemini-4-argon"), true);
});

test("guard: gemini-2.5 and image models are not gated", () => {
  assert.equal(rejectsTrailing("gemini-2.5-pro"), false);
  assert.equal(rejectsTrailing("gemini-3-pro-image-preview"), false);
  assert.equal(rejectsTrailing("gemini-3-pro"), true);
});
