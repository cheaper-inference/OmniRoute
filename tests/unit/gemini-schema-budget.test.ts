// Expansion budget for local `$ref` inlining in Gemini/Antigravity schemas.
//
// Gemini has no `$ref`, so the cleaner inlines every local reference. Inlining is
// cycle-safe but was unbounded: a `$defs` fan-out (L0 → 2×L1 → 2×L2 → …) grows
// exponentially from a tiny request body and pins the CPU / exhausts memory. The
// expansion is now metered (depth, nodes, bytes per schema, plus a cap shared by
// every schema of one request) and a runaway schema fails fast with a typed 400
// that never reaches the provider and never cools the account down. Schemas
// without `$ref` are never charged, so plain large tool schemas are unaffected.
import test from "node:test";
import assert from "node:assert/strict";

const { cleanJSONSchemaForAntigravity } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");
const { createSchemaBudget } = await import("../../open-sse/translator/helpers/schemaBudget.ts");
const { SchemaPreparationError } = await import("../../open-sse/utils/schemaErrors.ts");
const { openaiToGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");
const { createTranslationFailureResult, TRANSLATION_FAILURE_CODE } =
  await import("../../open-sse/handlers/chatCore/translationFailure.ts");
const { shouldSkipConnDisable } = await import("../../open-sse/services/combo/comboPredicates.ts");

/** L0 references L1 twice, L1 references L2 twice, … → 2^levels leaves once inlined. */
function fanOutSchema(levels: number) {
  const $defs: Record<string, unknown> = {};
  for (let i = 0; i < levels; i++) {
    $defs[`L${i}`] = {
      type: "object",
      properties: {
        left: { $ref: `#/$defs/L${i + 1}` },
        right: { $ref: `#/$defs/L${i + 1}` },
      },
    };
  }
  $defs[`L${levels}`] = { type: "string", description: "leaf" };
  return { $defs, type: "object", properties: { root: { $ref: "#/$defs/L0" } } };
}

function chatBody(responseSchema: unknown, tools?: unknown[]) {
  return {
    messages: [{ role: "user", content: "hi" }],
    response_format: { type: "json_schema", json_schema: { name: "x", schema: responseSchema } },
    ...(tools ? { tools } : {}),
  };
}

test("exponential $defs fan-out fails fast with a typed schema error", () => {
  // 2^24 leaves once inlined: unbounded expansion never finishes (or exhausts the
  // heap); the metered one stops at the per-schema node cap. The wall-clock bound
  // is loose on purpose — CI runners and dev boxes are often heavily loaded.
  const started = Date.now();
  assert.throws(
    () => cleanJSONSchemaForAntigravity(fanOutSchema(24), { preserveNullable: true }),
    (error: unknown) => {
      assert.ok(error instanceof SchemaPreparationError);
      assert.equal(error.statusCode, 400);
      assert.equal(error.errorType, "invalid_request_error");
      assert.equal(error.code, "schema_size");
      return true;
    }
  );
  assert.ok(Date.now() - started < 2000, `took ${Date.now() - started}ms`);
});

test("a small $ref graph still inlines normally", () => {
  const out = cleanJSONSchemaForAntigravity(fanOutSchema(3)) as {
    properties: { root: { properties: { left: { type: string } } } };
  };
  assert.equal(out.properties.root.properties.left.type, "object");
});

test("deep reference chains trip the depth limit", () => {
  const $defs: Record<string, unknown> = {};
  for (let i = 0; i < 80; i++) {
    $defs[`D${i}`] = { type: "object", properties: { next: { $ref: `#/$defs/D${i + 1}` } } };
  }
  $defs.D80 = { type: "string" };
  assert.throws(
    () => cleanJSONSchemaForAntigravity({ $defs, $ref: "#/$defs/D0" }),
    (error: unknown) => error instanceof SchemaPreparationError && error.code === "schema_depth"
  );
});

test("a large schema without $ref is never charged", () => {
  const properties: Record<string, unknown> = {};
  for (let i = 0; i < 6000; i++) properties[`p${i}`] = { type: "string", description: `d${i}` };
  const out = cleanJSONSchemaForAntigravity({ type: "object", properties }) as {
    properties: Record<string, unknown>;
  };
  assert.equal(Object.keys(out.properties).length, 6000);
});

test("the request-wide cap is shared across schemas of one request", () => {
  const budget = createSchemaBudget({ maxRequestNodes: 300 });
  const schema = fanOutSchema(4); // 153 expanded nodes: fits alone, not twice
  cleanJSONSchemaForAntigravity(schema, { budget, location: "tools" });
  assert.throws(
    () => cleanJSONSchemaForAntigravity(schema, { budget, location: "response_format" }),
    (error: unknown) =>
      error instanceof SchemaPreparationError && error.message.includes("response_format")
  );
});

test("response_format fan-out is rejected during translation, before any provider call", () => {
  assert.throws(
    () => openaiToGeminiRequest("gemini-2.5-flash", chatBody(fanOutSchema(20)), false),
    (error: unknown) => error instanceof SchemaPreparationError
  );
});

test("tool schema fan-out is rejected during translation too", () => {
  const tools = [{ type: "function", function: { name: "boom", parameters: fanOutSchema(20) } }];
  assert.throws(
    () =>
      openaiToGeminiRequest(
        "gemini-2.5-flash",
        { messages: [{ role: "user", content: "hi" }], tools },
        false
      ),
    (error: unknown) => error instanceof SchemaPreparationError
  );
});

test("chatCore maps the schema error to a sanitized 400 that skips account cooldown", async () => {
  let caught: unknown;
  try {
    openaiToGeminiRequest("gemini-2.5-flash", chatBody(fanOutSchema(20)), false);
  } catch (error) {
    caught = error;
  }
  assert.ok(caught instanceof SchemaPreparationError);
  // Same mapping as handleChatCore's translation catch (statusCode/message/errorType).
  const result = createTranslationFailureResult(
    caught.statusCode,
    caught.message,
    caught.errorType
  );
  assert.equal(result.status, 400);
  assert.equal(result.errorCode, TRANSLATION_FAILURE_CODE);
  const body = await result.response.json();
  assert.equal(body.error.type, "invalid_request_error");
  assert.ok(!body.error.message.includes("at /"));
  assert.ok(!body.error.message.includes("$defs"));
  assert.ok(!body.error.message.includes("leaf"));
  assert.equal(shouldSkipConnDisable(result, false, false, "gemini"), true);
});

test("a property literally named definitions is still inlined (#13057 class)", () => {
  const out = cleanJSONSchemaForAntigravity({
    $defs: { Item: { type: "object", properties: { id: { type: "integer" } } } },
    type: "object",
    properties: { definitions: { type: "array", items: { $ref: "#/$defs/Item" } } },
  }) as { properties: { definitions: { items: { properties: { id: { type: string } } } } } };
  assert.equal(out.properties.definitions.items.properties.id.type, "integer");
});
