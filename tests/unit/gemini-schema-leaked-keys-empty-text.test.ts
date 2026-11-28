import test from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity, convertOpenAIContentToParts } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");

// Gemini rejects the whole tool list with 'Unknown name "<key>" ... Cannot find field'
// when a schema node carries a keyword that its Schema message has no field for.
type Schema = Record<string, Record<string, unknown>> & { properties: Record<string, Schema> };

const LEAKED_KEYS = [
  "discriminator",
  "xml",
  "externalDocs",
  "errorMessages",
  "doNotSuggest",
  "suggestSortText",
] as const;

test("schema keywords Gemini has no field for are stripped from every node", () => {
  const node = Object.fromEntries(LEAKED_KEYS.map((key) => [key, { propertyName: "kind" }]));
  const out = cleanJSONSchemaForAntigravity({
    type: "object",
    ...node,
    properties: { pet: { type: "object", ...node, properties: { name: { type: "string" } } } },
  }) as unknown as Schema;

  for (const key of LEAKED_KEYS) {
    assert.equal(key in out, false, `root leaked ${key}`);
    assert.equal(key in out.properties.pet, false, `nested node leaked ${key}`);
  }
});

test("a tool parameter named like a stripped keyword survives", () => {
  const out = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: { xml: { type: "string" }, discriminator: { type: "string" } },
    required: ["xml"],
  }) as unknown as Schema;

  assert.deepEqual(Object.keys(out.properties).sort(), ["discriminator", "xml"]);
  assert.deepEqual(out.required, ["xml"]);
});

test("empty and text-less text parts are not forwarded to Gemini", () => {
  assert.deepEqual(convertOpenAIContentToParts(""), []);
  assert.deepEqual(convertOpenAIContentToParts([{ type: "text", text: "" }]), []);
  assert.deepEqual(convertOpenAIContentToParts([{ type: "text" }]), []);
  assert.deepEqual(
    convertOpenAIContentToParts([
      { type: "text", text: "" },
      { type: "text", text: "hi" },
    ]),
    [{ text: "hi" }]
  );
});
