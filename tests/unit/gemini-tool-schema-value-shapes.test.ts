/**
 * Gemini / Antigravity reject a tool schema with a hard 400 whenever a schema
 * position holds something that is not a Schema object. MCP servers and skill
 * generators emit several such shapes, and one bad tool fails the whole request
 * on every account:
 *
 *   - `properties: ["a", { name: "b", ... }]` and non-string property values
 *     (`null`, numbers, booleans) —
 *     "Invalid value at '...parameters.properties[3].value' (...Schema), ..."
 *   - shorthand string sub-schemas outside `properties`
 *     (`items: "string"`, `anyOf: ["integer", ...]`)
 *   - tuple validation `items: [{...}, {...}]` —
 *     "Proto field is not repeating, cannot start list"
 *
 * The string form inside `properties` was already handled (#4169); these cover
 * the remaining shapes.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { cleanJSONSchemaForAntigravity } from "../../open-sse/translator/helpers/geminiHelper.ts";
import { buildGeminiTools } from "../../open-sse/translator/helpers/geminiToolsSanitizer.ts";

type Rec = Record<string, unknown>;

// Every value Gemini reads as a Schema must be a plain object.
function collectNonObjectSchemaPositions(node: unknown, path = "$"): string[] {
  if (!node || typeof node !== "object" || Array.isArray(node)) return [];
  const record = node as Rec;
  const bad: string[] = [];
  const isSchema = (value: unknown) =>
    Boolean(value) && typeof value === "object" && !Array.isArray(value);

  if (record.properties !== undefined) {
    if (!isSchema(record.properties)) bad.push(`${path}.properties`);
    else {
      for (const [name, sub] of Object.entries(record.properties as Rec)) {
        if (!isSchema(sub)) bad.push(`${path}.properties.${name}`);
        else bad.push(...collectNonObjectSchemaPositions(sub, `${path}.properties.${name}`));
      }
    }
  }
  if (record.items !== undefined) {
    if (!isSchema(record.items)) bad.push(`${path}.items`);
    else bad.push(...collectNonObjectSchemaPositions(record.items, `${path}.items`));
  }
  return bad;
}

test("array-shaped properties become a name -> schema map", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: ["query", { name: "limit", type: "integer", description: "max rows" }],
    required: ["limit", "missing"],
  }) as Rec;

  assert.deepEqual(cleaned.properties, {
    query: { type: "string" },
    limit: { type: "integer", description: "max rows" },
  });
  assert.deepEqual(cleaned.required, ["limit"]);
  assert.deepEqual(collectNonObjectSchemaPositions(cleaned), []);
});

test("null / number / boolean property values degrade to a string schema", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: { a: null, b: 5, c: true, d: "object" },
    required: ["a"],
  }) as Rec;
  const properties = cleaned.properties as Rec;

  assert.deepEqual(properties.a, { type: "string" });
  assert.deepEqual(properties.b, { type: "string" });
  assert.deepEqual(properties.c, { type: "string" });
  assert.equal((properties.d as Rec).type, "object");
  assert.deepEqual(cleaned.required, ["a"]);
  assert.deepEqual(collectNonObjectSchemaPositions(cleaned), []);
});

test("shorthand string items expand, including protobuf spellings", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      tags: { type: "array", items: "string" },
      ids: { type: "array", items: "int32" },
      padded: { type: "array", items: " Object " },
    },
  }) as Rec;
  const properties = cleaned.properties as Rec;

  assert.deepEqual((properties.tags as Rec).items, { type: "string" });
  assert.deepEqual((properties.ids as Rec).items, { type: "integer" });
  assert.equal(((properties.padded as Rec).items as Rec).type, "object");
  assert.deepEqual(collectNonObjectSchemaPositions(cleaned), []);
});

test("tuple items collapse to the most informative member", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      pair: {
        type: "array",
        items: [{ type: "string" }, { type: "object", properties: { a: { type: "string" } } }],
      },
    },
  }) as Rec;

  assert.deepEqual(((cleaned.properties as Rec).pair as Rec).items, {
    type: "object",
    properties: { a: { type: "string" } },
  });
});

test("a tuple with no usable member falls back to the array placeholder", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      junk: { type: "array", items: [1, null] },
      flag: { type: "array", items: true },
      named: { type: "array", items: ["weird"] },
    },
  }) as Rec;
  const properties = cleaned.properties as Rec;

  assert.deepEqual((properties.junk as Rec).items, { type: "string" });
  assert.deepEqual((properties.flag as Rec).items, { type: "string" });
  assert.deepEqual((properties.named as Rec).items, { type: "string" });
  assert.deepEqual(collectNonObjectSchemaPositions(cleaned), []);
});

test("shorthand strings inside anyOf keep their type through flattening", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: { count: { anyOf: ["integer", { type: "null" }], description: "n" } },
  }) as Rec;

  assert.deepEqual((cleaned.properties as Rec).count, { type: "integer", description: "n" });
});

test("properties literally named items / properties are map keys, not schema slots", () => {
  const cleaned = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: { items: "array", properties: "string" },
  }) as Rec;
  const properties = cleaned.properties as Rec;

  assert.deepEqual(properties.items, { type: "array", items: { type: "string" } });
  assert.deepEqual(properties.properties, { type: "string" });
});

test("a valid schema is returned unchanged", () => {
  const schema = {
    type: "object",
    properties: {
      path: { type: "string", description: "file path" },
      lines: { type: "array", items: { type: "integer" } },
      opts: {
        type: "object",
        properties: { recursive: { type: "boolean" } },
        required: ["recursive"],
      },
    },
    required: ["path"],
  };
  const expected = structuredClone(schema);

  assert.deepEqual(cleanJSONSchemaForAntigravity(schema), expected);
  assert.deepEqual(schema, expected, "input must not be mutated");
});

test("buildGeminiTools: no non-object schema reaches functionDeclarations", () => {
  const tools = buildGeminiTools([
    {
      type: "function",
      function: {
        name: "mcp_tool",
        parameters: {
          type: "object",
          properties: {
            value: "object",
            list: { type: "array", items: ["string", { type: "integer" }] },
            fields: { type: "object", properties: ["x", { name: "y", type: "number" }] },
          },
        },
      },
    },
  ]) as Array<{ functionDeclarations: Array<{ parameters: unknown }> }>;

  const params = tools[0].functionDeclarations[0].parameters as Rec;
  assert.deepEqual(collectNonObjectSchemaPositions(params), []);
  const properties = params.properties as Rec;
  assert.equal((properties.value as Rec).type, "object");
  assert.deepEqual((properties.list as Rec).items, { type: "string" });
  assert.deepEqual((properties.fields as Rec).properties, {
    x: { type: "string" },
    y: { type: "number" },
  });
});
