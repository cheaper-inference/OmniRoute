import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeKiroTools } from "../../open-sse/utils/kiroSanitizer.ts";
const { convertKiroToOpenAI } =
  await import("../../open-sse/translator/response/kiro-to-openai.ts");

// #1375 — Kiro returns 400 "Improperly formed request" when a tool schema
// carries unsupported JSON-Schema keywords or a tool name longer than 64 chars.

test("sanitizeKiroTools: strips unsupported JSON-Schema keywords recursively", () => {
  const tools = [
    {
      toolSpecification: {
        name: "search",
        inputSchema: {
          json: {
            type: "object",
            additionalProperties: false,
            $schema: "http://json-schema.org/draft-07/schema#",
            properties: {
              filter: {
                anyOf: [{ type: "string" }, { type: "null" }],
                $ref: "#/$defs/Filter",
                description: "kept",
              },
            },
            $defs: { Filter: { type: "string" } },
          },
        },
      },
    },
  ];

  const { tools: out } = sanitizeKiroTools(tools);
  const schema = out[0].toolSpecification.inputSchema.json;

  assert.equal("additionalProperties" in schema, false);
  assert.equal("$schema" in schema, false);
  assert.equal("$defs" in schema, false);
  assert.equal("anyOf" in schema.properties.filter, false);
  assert.equal("$ref" in schema.properties.filter, false);
  // Non-stripped keys survive.
  assert.equal(schema.properties.filter.description, "kept");
  assert.equal(schema.type, "object");
});

test("sanitizeKiroTools: drops empty required array and guarantees required:[]", () => {
  const { tools: out } = sanitizeKiroTools([
    {
      toolSpecification: {
        name: "noop",
        inputSchema: { json: { type: "object", properties: {}, required: [] } },
      },
    },
  ]);

  const schema = out[0].toolSpecification.inputSchema.json;
  assert.deepEqual(schema.required, []);
});

test("sanitizeKiroTools: hash-truncates names >64 chars and records nameMap", () => {
  const longName = "a".repeat(80);
  const { tools: out, nameMap } = sanitizeKiroTools([
    {
      toolSpecification: {
        name: longName,
        inputSchema: { json: { type: "object", properties: {} } },
      },
    },
  ]);

  const truncated = out[0].toolSpecification.name;
  assert.ok(truncated.length <= 64, `truncated name should be <=64, got ${truncated.length}`);
  assert.notEqual(truncated, longName);
  // nameMap maps the truncated name back to the original.
  assert.equal(nameMap.get(truncated), longName);
});

test("sanitizeKiroTools: short names are left untouched with an empty nameMap", () => {
  const { tools: out, nameMap } = sanitizeKiroTools([
    {
      toolSpecification: {
        name: "read_file",
        // `path` is declared: the root `required` is filtered to declared properties.
        inputSchema: {
          json: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
        },
      },
    },
  ]);

  assert.equal(out[0].toolSpecification.name, "read_file");
  assert.equal(out[0].toolSpecification.inputSchema.json.required[0], "path");
  assert.equal(nameMap.size, 0);
});

test("sanitizeKiroTools: non-array input is returned untouched", () => {
  const { tools, nameMap } = sanitizeKiroTools(undefined);
  assert.equal(tools, undefined);
  assert.equal(nameMap.size, 0);
});

test("kiro-to-openai: streamed tool name is reverse-mapped via state.toolNameMap (#1375)", () => {
  const longName = "b".repeat(80);
  // Build the truncated name exactly as sanitizeKiroTools would, then verify
  // the response translator maps the streamed (truncated) name back.
  const { tools: out, nameMap } = sanitizeKiroTools([
    {
      toolSpecification: {
        name: longName,
        inputSchema: { json: { type: "object", properties: {} } },
      },
    },
  ]);
  const truncated = out[0].toolSpecification.name;

  const result = convertKiroToOpenAI(
    { _eventType: "toolUseEvent", toolUseId: "call_9", name: truncated, input: {} },
    { toolNameMap: nameMap }
  );

  assert.equal(result.choices[0].delta.tool_calls[0].function.name, longName);
});

test("kiro-to-openai: unmapped tool name passes through unchanged", () => {
  const result = convertKiroToOpenAI(
    { _eventType: "toolUseEvent", toolUseId: "call_10", name: "read_file", input: {} },
    { toolNameMap: new Map() }
  );

  assert.equal(result.choices[0].delta.tool_calls[0].function.name, "read_file");
});

// Root schema unions and keyword-named properties. Kiro rejects top-level
// oneOf/anyOf/allOf ("does not support oneOf, allOf, or anyOf at the top
// level"), so they must be flattened into one object schema instead of being
// stripped wholesale (which used to leave a zero-argument tool). Property
// NAMES are user data and must never be treated as JSON-Schema keywords.

function sanitizeOne(json: unknown) {
  const { tools: out } = sanitizeKiroTools([
    { toolSpecification: { name: "dynamic_tool", inputSchema: { json } } },
  ]);
  return out[0].toolSpecification.inputSchema.json;
}

test("sanitizeKiroTools: flattens a root oneOf into one object schema (required = intersection)", () => {
  const schema = sanitizeOne({
    oneOf: [
      {
        type: "object",
        properties: { path: { type: "string" }, patch: { type: "string" } },
        required: ["path"],
      },
      {
        type: "object",
        properties: { path: { type: "string" }, line: { type: "integer" } },
        required: ["path", "line"],
      },
    ],
  });

  assert.deepEqual(schema, {
    type: "object",
    properties: {
      path: { type: "string" },
      patch: { type: "string" },
      line: { type: "integer" },
    },
    required: ["path"],
  });
});

test("sanitizeKiroTools: flattens a root anyOf alongside root properties (first definition wins)", () => {
  const schema = sanitizeOne({
    type: "object",
    properties: { mode: { type: "string", description: "root" } },
    anyOf: [
      { properties: { mode: { type: "integer" }, a: { type: "string" } }, required: ["a"] },
      { properties: { b: { type: "string" } }, required: ["b"] },
    ],
  });

  assert.equal(schema.type, "object");
  assert.deepEqual(schema.properties.mode, { type: "string", description: "root" });
  assert.deepEqual(Object.keys(schema.properties).sort(), ["a", "b", "mode"]);
  // No name is required by every branch → intersection empty → top-level required:[].
  assert.deepEqual(schema.required, []);
  assert.equal("anyOf" in schema, false);
});

test("sanitizeKiroTools: flattens a root allOf (required = union)", () => {
  const schema = sanitizeOne({
    allOf: [
      { type: "object", properties: { a: { type: "string" } }, required: ["a"] },
      { type: "object", properties: { b: { type: "number" } }, required: ["b"] },
    ],
  });

  assert.equal(schema.type, "object");
  assert.deepEqual(schema.properties, { a: { type: "string" }, b: { type: "number" } });
  assert.deepEqual(schema.required, ["a", "b"]);
  assert.equal("allOf" in schema, false);
});

test("sanitizeKiroTools: keeps properties whose names equal unsupported keywords", () => {
  const schema = sanitizeOne({
    type: "object",
    properties: {
      if: { type: "string", description: "condition name" },
      not: { type: "boolean" },
      $ref: { type: "string" },
      then: {
        type: "object",
        properties: { additionalProperties: { type: "boolean" } },
      },
    },
    patternProperties: { "^x-": { type: "string", $ref: "#/x" } },
    required: ["if", "then"],
  });

  assert.deepEqual(schema.properties, {
    if: { type: "string", description: "condition name" },
    not: { type: "boolean" },
    $ref: { type: "string" },
    then: {
      type: "object",
      properties: { additionalProperties: { type: "boolean" } },
    },
  });
  // Pattern names are kept; the keyword inside the pattern schema is still stripped.
  assert.deepEqual(schema.patternProperties, { "^x-": { type: "string" } });
  assert.deepEqual(schema.required, ["if", "then"]);
});

test("sanitizeKiroTools: nested anyOf/$ref/if-then-else inside a property are still stripped", () => {
  const schema = sanitizeOne({
    type: "object",
    properties: {
      nested: {
        type: "object",
        anyOf: [{ required: ["value"] }],
        properties: {
          value: {
            type: "string",
            $ref: "#/$defs/V",
            if: { const: "x" },
            then: { minLength: 1 },
            else: { maxLength: 10 },
          },
        },
      },
    },
  });

  assert.deepEqual(schema.properties.nested, {
    type: "object",
    properties: { value: { type: "string" } },
  });
});

test("sanitizeKiroTools: root union branches may require properties declared by the root", () => {
  const schema = sanitizeOne({
    type: "object",
    properties: { a: { type: "string" }, b: { type: "string" } },
    allOf: [{ required: ["a"] }],
    oneOf: [{ required: ["b"] }, { required: ["b", "a"] }],
  });

  assert.deepEqual(Object.keys(schema.properties), ["a", "b"]);
  assert.deepEqual(schema.required, ["a", "b"]);
  assert.equal("allOf" in schema, false);
  assert.equal("oneOf" in schema, false);
});

test("sanitizeKiroTools: root required is filtered to declared properties", () => {
  const schema = sanitizeOne({
    type: "object",
    properties: { path: { type: "string" } },
    required: ["path", "ghost", "path"],
  });

  assert.deepEqual(schema.required, ["path"]);
});

test("sanitizeKiroTools: forces root type object and properties when missing", () => {
  const schema = sanitizeOne({ description: "no shape" });

  assert.equal(schema.type, "object");
  assert.deepEqual(schema.properties, {});
  assert.deepEqual(schema.required, []);
  assert.equal(schema.description, "no shape");
});

test("sanitizeKiroTools: does not mutate the input tool definitions", () => {
  const json = {
    oneOf: [
      { type: "object", properties: { if: { type: "string" } }, required: ["if"] },
      { type: "object", properties: { if: { type: "string" }, b: { $ref: "#/b" } } },
    ],
  };
  const tools = [{ toolSpecification: { name: "t", inputSchema: { json } } }];
  const snapshot = JSON.parse(JSON.stringify(tools));

  sanitizeKiroTools(tools);

  assert.deepEqual(tools, snapshot);
});
