/**
 * Regression test for upstream 9router #5000 — Gemini 400
 * `properties[value].items: field predicate failed: $type == Type.ARRAY`.
 *
 * Gemini's Schema proto only accepts `items` on a node whose type is ARRAY.
 * Two schema shapes reached Gemini with `items` on a non-array node:
 *  - a type union such as `["string", "number", "array", "null"]` with `items`
 *    was flattened to its first member (`"string"`), keeping `items`;
 *  - a node with `items` but no `type` passed through untyped.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { cleanJSONSchemaForAntigravity } from "../../open-sse/translator/helpers/geminiHelper.ts";
import { buildGeminiTools } from "../../open-sse/translator/helpers/geminiToolsSanitizer.ts";

type Schema = {
  type?: unknown;
  items?: Schema;
  properties?: Record<string, Schema>;
};

/** Every node carrying `items` must be typed "array" — collect the ones that are not. */
function nodesWithItemsOnNonArray(node: unknown, path = "$", out: string[] = []): string[] {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    node.forEach((item, i) => nodesWithItemsOnNonArray(item, `${path}[${i}]`, out));
    return out;
  }
  const record = node as Record<string, unknown>;
  if (record.items !== undefined && record.type !== "array") {
    out.push(`${path} (type=${JSON.stringify(record.type)})`);
  }
  for (const [key, value] of Object.entries(record)) {
    nodesWithItemsOnNonArray(value, `${path}.${key}`, out);
  }
  return out;
}

const operationsSchema = {
  type: "object",
  properties: {
    operations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          op: { type: "string" },
          value: {
            type: ["string", "number", "boolean", "array", "object", "null"],
            items: { type: "string" },
          },
          expectedValue: { items: { type: "string" } },
        },
      },
    },
  },
};

describe("cleanJSONSchemaForAntigravity — items only on array nodes (#5000)", () => {
  it("flattens a type union that carries items to array", () => {
    const cleaned = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: {
        value: { type: ["string", "number", "array", "null"], items: { type: "string" } },
      },
    }) as Schema;
    const value = cleaned.properties?.value;
    assert.equal(value?.type, "array");
    assert.deepEqual(value?.items, { type: "string" });
  });

  it("flattens a type union that carries properties to object", () => {
    const cleaned = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: {
        value: { type: ["string", "object"], properties: { a: { type: "string" } } },
      },
    }) as Schema;
    assert.equal(cleaned.properties?.value?.type, "object");
  });

  it("keeps the first member for a plain union without items/properties", () => {
    const cleaned = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: { value: { type: ["string", "number", "null"] } },
    }) as Schema;
    assert.equal(cleaned.properties?.value?.type, "string");
  });

  it("types a node that has items but no type as array", () => {
    const cleaned = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: { expectedValue: { items: { type: "string" } } },
    }) as Schema;
    const expectedValue = cleaned.properties?.expectedValue;
    assert.equal(expectedValue?.type, "array");
    assert.deepEqual(expectedValue?.items, { type: "string" });
  });

  it("leaves no items on a non-array node in the reported tool shape", () => {
    const cleaned = cleanJSONSchemaForAntigravity(operationsSchema);
    assert.deepEqual(nodesWithItemsOnNonArray(cleaned), []);
  });
});

describe("buildGeminiTools — items only on array nodes (#5000)", () => {
  it("emits value/expectedValue as arrays for an OpenAI function tool", () => {
    const tools = buildGeminiTools([
      {
        type: "function",
        function: { name: "patch_document", parameters: operationsSchema },
      },
    ]);
    const params = tools?.[0]?.functionDeclarations?.[0]?.parameters as Schema;
    assert.deepEqual(nodesWithItemsOnNonArray(params), []);
    const op = params.properties?.operations?.items?.properties;
    assert.equal(op?.value?.type, "array");
    assert.equal(op?.expectedValue?.type, "array");
    assert.equal(op?.op?.type, "string");
  });
});
