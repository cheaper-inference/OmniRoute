import test from "node:test";
import assert from "node:assert/strict";

import { cleanJSONSchemaForAntigravity } from "../../open-sse/translator/helpers/geminiHelper.ts";

type Schema = { properties?: Record<string, unknown>; required?: unknown };

test("a property named required survives next to a property named properties", () => {
  const out = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: { required: { type: "string" }, properties: { type: "string" } },
  }) as Schema;
  assert.deepEqual(Object.keys(out.properties ?? {}).sort(), ["properties", "required"]);
});

test("a property named required survives alone", () => {
  const out = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: { required: { type: "string" } },
  }) as Schema;
  assert.deepEqual(Object.keys(out.properties ?? {}), ["required"]);
});

test("boolean required on a property is still promoted to the parent required list", () => {
  const out = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: { city: { type: "string", required: true } },
  }) as Schema;
  assert.deepEqual(out.required, ["city"]);
  assert.equal((out.properties?.city as { required?: unknown }).required, undefined);
});

test("boolean required is promoted inside a property that is itself named properties", () => {
  const out = cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {
      properties: {
        type: "object",
        properties: { city: { type: "string", required: true } },
      },
    },
  }) as { properties: { properties: Schema } };
  const inner = out.properties.properties;
  assert.deepEqual(inner.required, ["city"]);
  assert.equal((inner.properties?.city as { required?: unknown }).required, undefined);
});
