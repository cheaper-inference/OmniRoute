// Literal unions in Gemini/Antigravity schemas.
//
// JSON Schema spells "one of these values" as anyOf/oneOf of `const` branches.
// The Gemini cleaner used to turn every `const` into a one-value string enum and
// then flatten the union by keeping ONE branch, so `0|1|2|3|4|null` reached
// Gemini as `{type:"string", enum:["0"]}` — the model could only answer the
// string "0". All-literal unions are now merged before the flatten: strings
// become one string enum, integers/numbers become a bounded typed schema
// (Gemini rejects enum on numeric types), booleans become `type:"boolean"`.
import test from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");
const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");

type Rec = Record<string, unknown>;
const prop = (out: unknown, name = "value") =>
  (out as { properties: Record<string, Rec> }).properties[name];
const wrap = (value: unknown) => ({
  type: "object",
  properties: { value },
  required: ["value"],
});

test("integer literal union with a null branch becomes a bounded nullable integer", () => {
  const out = cleanJSONSchemaForAntigravity(
    { anyOf: [{ const: 0 }, { const: 1 }, { const: 4 }, { type: "null" }] },
    { preserveNullable: true }
  ) as Rec;
  assert.deepEqual(out, { type: "integer", minimum: 0, maximum: 4, nullable: true });
});

test("integer literal union keeps its description and drops nullable for tool schemas", () => {
  const out = prop(
    cleanJSONSchemaForAntigravity(
      wrap({
        description: "score",
        oneOf: [{ const: 2 }, { const: 3 }, { type: "null" }],
      })
    )
  );
  assert.equal(out.type, "integer");
  assert.equal(out.minimum, 2);
  assert.equal(out.maximum, 3);
  assert.equal(out.description, "score");
  assert.equal(out.nullable, undefined);
  assert.equal(out.enum, undefined);
  assert.equal(out.oneOf, undefined);
});

test("number literal union becomes a bounded number", () => {
  const out = prop(
    cleanJSONSchemaForAntigravity(wrap({ anyOf: [{ const: 0.5 }, { const: 1.5 }] }))
  );
  assert.deepEqual(out, { type: "number", minimum: 0.5, maximum: 1.5 });
});

test("boolean literal union becomes a boolean", () => {
  const out = prop(
    cleanJSONSchemaForAntigravity(wrap({ anyOf: [{ const: true }, { const: false }] }))
  );
  assert.deepEqual(out, { type: "boolean" });
});

test("string literal union keeps every value instead of only the first branch", () => {
  const out = prop(
    cleanJSONSchemaForAntigravity(
      wrap({ anyOf: [{ const: "a" }, { const: "b" }, { enum: ["c"] }] })
    )
  );
  assert.equal(out.type, "string");
  assert.deepEqual(out.enum, ["a", "b", "c"]);
});

test("mixed string/number literal union falls back to a string enum of every value", () => {
  const out = prop(
    cleanJSONSchemaForAntigravity(wrap({ anyOf: [{ const: "auto" }, { const: 1 }] }))
  );
  assert.equal(out.type, "string");
  assert.deepEqual(out.enum, ["auto", "1"]);
});

test("a union with a non-literal branch keeps the existing best-branch flattening", () => {
  const out = prop(
    cleanJSONSchemaForAntigravity(
      wrap({ anyOf: [{ const: 1 }, { type: "object", properties: { x: { type: "string" } } }] })
    )
  );
  assert.equal(out.type, "object");
  assert.equal(prop(out, "x").type, "string");
});

test("existing bounds are intersected with the literal range", () => {
  const out = prop(
    cleanJSONSchemaForAntigravity(
      wrap({ minimum: 1, anyOf: [{ const: 0 }, { const: 2 }, { const: 5 }] })
    )
  );
  assert.equal(out.minimum, 1);
  assert.equal(out.maximum, 5);
});

test("integer enum on an integer type keeps its range after the enum is dropped", () => {
  const out = prop(cleanJSONSchemaForAntigravity(wrap({ type: "integer", enum: [3, 1, 7] })));
  assert.equal(out.type, "integer");
  assert.equal(out.enum, undefined);
  assert.equal(out.minimum, 1);
  assert.equal(out.maximum, 7);
});

test("response_format literal union reaches Gemini as a typed integer property", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-flash",
    {
      messages: [{ role: "user", content: "rate it" }],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "rating",
          schema: {
            type: "object",
            properties: {
              rating: { anyOf: [{ const: 0 }, { const: 1 }, { const: 2 }, { type: "null" }] },
            },
            required: ["rating"],
          },
        },
      },
    },
    false
  ) as { generationConfig: { responseSchema: unknown } };
  const rating = prop(result.generationConfig.responseSchema, "rating");
  assert.equal(rating.type, "integer");
  assert.equal(rating.minimum, 0);
  assert.equal(rating.maximum, 2);
  assert.equal(rating.nullable, true);
});
