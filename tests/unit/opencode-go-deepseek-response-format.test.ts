// OpenCode Go's relay rejects `response_format` (json_schema and json_object)
// for its deepseek family with a bare 400 that names neither the field nor the
// reason. Drop it for opencode-go deepseek models only. Port of 9router
// 468aa7d9. The registry `unsupportedParams` field is not used for this: it is
// looked up by bare model id across providers, so it would also strip
// response_format for deepseek-v4-pro on providers that serve it.
import { test } from "node:test";
import assert from "node:assert/strict";
import { stripUnsupportedParams } from "../../open-sse/translator/paramSupport.ts";
import { getUnsupportedParams } from "../../open-sse/config/providerRegistry.ts";

const FORMATS = [
  { type: "json_schema", json_schema: { name: "t", schema: { type: "object" } } },
  { type: "json_object" },
];

test("opencode-go deepseek models drop response_format", () => {
  for (const model of [
    "deepseek-v4-pro",
    "deepseek-v4-flash",
    "deepseek-v4.1-flash",
    "deepseek-flash",
  ]) {
    for (const response_format of FORMATS) {
      const body: Record<string, unknown> = { messages: [], response_format };
      stripUnsupportedParams("opencode-go", model, body);
      assert.equal(body.response_format, undefined, `${model} ${response_format.type}`);
    }
  }
});

test("opencode-go non-deepseek models keep response_format", () => {
  const body: Record<string, unknown> = { messages: [], response_format: FORMATS[0] };
  stripUnsupportedParams("opencode-go", "glm-5", body);
  assert.deepEqual(body.response_format, FORMATS[0]);
});

test("other providers keep response_format for the same deepseek ids", () => {
  for (const provider of ["deepseek", "fireworks", "opencode-zen"]) {
    const body: Record<string, unknown> = { messages: [], response_format: FORMATS[1] };
    stripUnsupportedParams(provider, "deepseek-v4-pro", body);
    assert.deepEqual(body.response_format, FORMATS[1], provider);
    assert.ok(!getUnsupportedParams(provider, "deepseek-v4-pro").includes("response_format"));
  }
});
