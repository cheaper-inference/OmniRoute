import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cleanJSONSchemaForAntigravity } from "../../open-sse/translator/helpers/geminiHelper";

type SchemaNode = {
  type?: string;
  enum?: unknown[];
  default?: unknown;
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  [key: string]: unknown;
};

// Gemini / Antigravity reject a request whose tool schema carries an empty string inside `enum`:
//   tools[0].function_declarations[N].parameters.properties[severity].enum[3]: cannot be empty
// Some MCP servers declare optional string choices as ["a", "b", ""]; a single such tool among the
// request's tools made every Gemini leg of a combo fail with a 400.
describe("Gemini schema sanitizer drops empty-string enum values", () => {
  it("removes the empty string and keeps the other choices in order", () => {
    const schema = {
      type: "object",
      properties: {
        severity: { type: "string", enum: ["high", "medium", "low", ""], default: "" },
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema) as SchemaNode;

    assert.deepEqual(cleaned.properties?.severity?.enum, ["high", "medium", "low"]);
    assert.equal(cleaned.properties?.severity?.type, "string");
  });

  it("removes the enum entirely when the empty string was its only value", () => {
    const schema = { type: "object", properties: { mode: { type: "string", enum: [""] } } };

    const cleaned = cleanJSONSchemaForAntigravity(schema) as SchemaNode;

    assert.equal(cleaned.properties?.mode?.type, "string");
    assert.equal("enum" in (cleaned.properties?.mode ?? {}), false);
  });

  it("cleans enums nested in array items", () => {
    const schema = {
      type: "object",
      properties: { tags: { type: "array", items: { type: "string", enum: ["a", ""] } } },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema) as SchemaNode;

    assert.deepEqual(cleaned.properties?.tags?.items?.enum, ["a"]);
  });

  it("leaves enums without an empty string untouched", () => {
    const schema = { type: "object", properties: { unit: { type: "string", enum: ["c", "f"] } } };

    const cleaned = cleanJSONSchemaForAntigravity(schema) as SchemaNode;

    assert.deepEqual(cleaned.properties?.unit?.enum, ["c", "f"]);
  });
});
