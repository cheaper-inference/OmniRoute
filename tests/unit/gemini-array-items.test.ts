import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cleanJSONSchemaForAntigravity } from "../../open-sse/translator/helpers/geminiHelper";

type SchemaNode = {
  type?: string;
  properties?: Record<string, SchemaNode>;
  items?: SchemaNode;
  required?: string[];
  [key: string]: unknown;
};

describe("Gemini array items sanitizer (#10578)", () => {
  it("should inject a string items schema for array types that are missing it", () => {
    const sloppySchema = {
      type: "object",
      properties: {
        emails: {
          type: "array",
        },
      },
      required: ["emails"],
    };

    const cleanedSchema = cleanJSONSchemaForAntigravity(sloppySchema as unknown) as SchemaNode;

    assert.equal(cleanedSchema.properties?.emails?.type, "array");
    assert.ok(cleanedSchema.properties?.emails?.items, "items should be injected");
    assert.equal(cleanedSchema.properties?.emails?.items?.type, "string");
  });

  it("should safely ignore arrays that already have valid items", () => {
    const goodSchema = {
      type: "object",
      properties: {
        tags: {
          type: "array",
          items: { type: "number" },
        },
      },
    };

    const cleanedSchema = cleanJSONSchemaForAntigravity(goodSchema as unknown) as SchemaNode;

    assert.equal(cleanedSchema.properties?.tags?.items?.type, "number");
  });

  it("types empty items of a nested array (2D array with `items: {}`)", () => {
    const schema = {
      type: "object",
      properties: {
        where: { type: "array", items: { type: "array", items: {} } },
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema as unknown) as SchemaNode;

    assert.equal(cleaned.properties?.where?.items?.type, "array");
    assert.equal(cleaned.properties?.where?.items?.items?.type, "string");
  });

  it("types empty items at any depth (3D array)", () => {
    const schema = {
      type: "object",
      properties: {
        matrix: { type: "array", items: { type: "array", items: { type: "array", items: {} } } },
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema as unknown) as SchemaNode;

    assert.equal(cleaned.properties?.matrix?.items?.items?.items?.type, "string");
  });

  it("still fills a missing inner items schema of a nested array", () => {
    const schema = {
      type: "object",
      properties: {
        where: { type: "array", items: { type: "array" } },
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema as unknown) as SchemaNode;

    assert.equal(cleaned.properties?.where?.items?.items?.type, "string");
  });

  it("types items left empty by unsupported-keyword stripping", () => {
    const schema = {
      type: "object",
      properties: {
        names: { type: "array", items: { minLength: 1 } },
        where: {
          type: "array",
          items: { type: "array", items: { title: "Condition", default: [] } },
        },
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema as unknown) as SchemaNode;

    assert.deepEqual(cleaned.properties?.names?.items, { type: "string" });
    assert.deepEqual(cleaned.properties?.where?.items?.items, { type: "string" });
  });

  it("keeps a description on typeless items while typing them", () => {
    const schema = {
      type: "object",
      properties: {
        notes: { type: "array", items: { description: "free-form note" } },
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema as unknown) as SchemaNode;

    assert.deepEqual(cleaned.properties?.notes?.items, {
      type: "string",
      description: "free-form note",
    });
  });

  it("infers type array for a node that has items but no type", () => {
    const schema = {
      type: "object",
      properties: {
        tags: { items: { type: "number" } },
        rows: { items: {} },
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema as unknown) as SchemaNode;

    assert.equal(cleaned.properties?.tags?.type, "array");
    assert.equal(cleaned.properties?.tags?.items?.type, "number");
    assert.equal(cleaned.properties?.rows?.type, "array");
    assert.equal(cleaned.properties?.rows?.items?.type, "string");
  });

  it("types typeless object-shaped items as object", () => {
    const schema = {
      type: "object",
      properties: {
        records: { type: "array", items: { properties: { id: { type: "string" } } } },
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(schema as unknown) as SchemaNode;

    assert.equal(cleaned.properties?.records?.items?.type, "object");
    assert.equal(cleaned.properties?.records?.items?.properties?.id?.type, "string");
  });
});
