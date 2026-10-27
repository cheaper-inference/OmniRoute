/**
 * The Codex / OpenAI Responses validator requires every property value and
 * every `items` to be a Schema object (or a boolean schema). MCP tool servers
 * emit bare type names (`properties: { value: "object" }`) and tuple `items`
 * arrays, and one offending tool fails the whole request on every account:
 *
 *   400 Invalid schema for function 'X': 'object' is not of type 'object', 'boolean'
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { normalizeCodexTools } from "../../open-sse/executors/codex/tools.ts";
import { coerceSchemaValueShapes } from "../../open-sse/translator/helpers/schemaValueShapes.ts";

type Rec = Record<string, unknown>;

function functionTool(parameters: unknown): Rec {
  return { type: "function", function: { name: "mcp_tool", parameters } };
}

function normalizedParameters(parameters: unknown): Rec {
  const body: Rec = { tools: [functionTool(parameters)] };
  normalizeCodexTools(body);
  return (body.tools as Rec[])[0].parameters as Rec;
}

test("bare type names in properties become schema objects", () => {
  const parameters = normalizedParameters({
    type: "object",
    properties: { value: "object", count: "integer", odd: "dict", empty: null },
  });

  assert.deepEqual(parameters.properties, {
    value: { type: "object" },
    count: { type: "integer" },
    odd: { type: "string" },
    empty: { type: "string" },
  });
});

test("tuple items collapse to the most informative member; unusable tuples are dropped", () => {
  const parameters = normalizedParameters({
    type: "object",
    properties: {
      pair: {
        type: "array",
        items: [{ type: "string" }, { type: "object", properties: { a: "string" } }],
      },
      junk: { type: "array", items: [1, null] },
      tags: { type: "array", items: "string" },
    },
  });
  const properties = parameters.properties as Rec;

  assert.deepEqual((properties.pair as Rec).items, {
    type: "object",
    properties: { a: { type: "string" } },
  });
  assert.equal("items" in (properties.junk as Rec), false);
  assert.deepEqual((properties.tags as Rec).items, { type: "string" });
});

test("boolean schemas are preserved for Codex (the validator accepts them)", () => {
  const parameters = normalizedParameters({
    type: "object",
    properties: { anything: true, forbidden: false },
    additionalProperties: false,
  });

  assert.deepEqual(parameters.properties, { anything: true, forbidden: false });
  assert.equal(parameters.additionalProperties, false);
});

test("namespace sub-tools get the same coercion", () => {
  const body: Rec = {
    tools: [
      {
        type: "namespace",
        name: "mcp__srv__",
        tools: [{ type: "function", name: "lookup", parameters: { properties: { q: "string" } } }],
      },
    ],
  };
  normalizeCodexTools(body);

  const subTool = ((body.tools as Rec[])[0].tools as Rec[])[0];
  assert.deepEqual((subTool.parameters as Rec).properties, { q: { type: "string" } });
});

test("data-valued keywords are never treated as schemas", () => {
  const parameters = normalizedParameters({
    type: "object",
    properties: {
      cfg: {
        type: "object",
        default: { items: "x", properties: "y" },
        enum: [{ items: "x" }],
        properties: { items: "array" },
      },
    },
  });
  const cfg = (parameters.properties as Rec).cfg as Rec;

  assert.deepEqual(cfg.default, { items: "x", properties: "y" });
  assert.deepEqual(cfg.enum, [{ items: "x" }]);
  assert.deepEqual(cfg.properties, { items: { type: "array" } });
});

test("coerceSchemaValueShapes returns the same reference for a compatible schema", () => {
  const schema = {
    type: "object",
    properties: {
      path: { type: "string" },
      list: { type: "array", items: { type: "integer" } },
      either: { anyOf: [{ type: "string" }, true] },
    },
    $defs: { Node: { type: "object" } },
  };

  assert.equal(coerceSchemaValueShapes(schema), schema);
});

test("coerceSchemaValueShapes never mutates its input", () => {
  const schema = { type: "object", properties: { value: "object" } };
  const snapshot = structuredClone(schema);

  const result = coerceSchemaValueShapes(schema) as Rec;

  assert.notEqual(result, schema);
  assert.deepEqual(schema, snapshot);
  assert.deepEqual(result.properties, { value: { type: "object" } });
});

test("gemini mode: booleans are coerced and unknown type names are kept for later mapping", () => {
  const result = coerceSchemaValueShapes(
    { type: "object", properties: { flag: true, n: "int32" }, items: false },
    { allowBooleanSchemas: false, keepUnknownTypeNames: true }
  ) as Rec;

  assert.deepEqual(result.properties, { flag: { type: "string" }, n: { type: "int32" } });
  assert.equal("items" in result, false);
});
