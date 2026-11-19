import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or-gemini-schema-prune-"));

const { cleanJSONSchemaForAntigravity } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");

function clean(properties: Record<string, unknown>) {
  return cleanJSONSchemaForAntigravity({ type: "object", properties }) as {
    properties: Record<string, unknown>;
  };
}

// Gemini rejects `items` outside ARRAY and `properties` / `required` outside OBJECT
// ("items: only allowed for ARRAY type"). MCP tool schemas mix them with other types.
test("scalar-typed node loses items, properties and required", () => {
  const out = clean({
    name: {
      type: "string",
      items: { type: "string" },
      properties: { a: { type: "string" } },
      required: ["a"],
    },
  });
  assert.deepEqual(out.properties.name, { type: "string" });
});

test("array-typed node loses properties and required but keeps items", () => {
  const out = clean({
    list: {
      type: "array",
      items: { type: "integer" },
      properties: { a: { type: "string" } },
      required: ["a"],
    },
  });
  assert.deepEqual(out.properties.list, { type: "array", items: { type: "integer" } });
});

test("object-typed node loses items but keeps properties and required", () => {
  const out = clean({
    box: {
      type: "object",
      items: { type: "string" },
      properties: { a: { type: "string" } },
      required: ["a"],
    },
  });
  assert.deepEqual(out.properties.box, {
    type: "object",
    properties: { a: { type: "string" } },
    required: ["a"],
  });
});

test("nested nodes are pruned too", () => {
  const out = clean({
    list: {
      type: "array",
      items: { type: "number", items: { type: "string" }, properties: { x: { type: "string" } } },
    },
  });
  assert.deepEqual(out.properties.list, { type: "array", items: { type: "number" } });
});

test("properties named items and required are kept", () => {
  const out = clean({
    items: { type: "array", items: { type: "string" } },
    required: { type: "boolean" },
  });
  assert.deepEqual(out.properties, {
    items: { type: "array", items: { type: "string" } },
    required: { type: "boolean" },
  });
});
