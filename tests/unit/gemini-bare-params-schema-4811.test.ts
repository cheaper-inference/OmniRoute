/**
 * Regression test for upstream 9router #4811 — Gemini 400
 * `Unknown name "action" at 'function_declarations[N].parameters': Cannot find field`.
 *
 * Some clients send a tool's `parameters` as a bare property map
 * (`{ action: {...}, args: {...} }`) with no `type`/`properties` wrapper. The
 * parameters-root coercion used to spread the raw object and add
 * `type: "object", properties: {}`, leaving the property names as unknown
 * top-level fields that Gemini rejects. They must be moved under `properties`.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { buildGeminiTools } from "../../open-sse/translator/helpers/geminiToolsSanitizer.ts";

type Schema = { type?: unknown; required?: unknown; properties: Record<string, Schema> };

function paramsOf(tools: ReturnType<typeof buildGeminiTools>): Schema {
  return tools?.[0]?.functionDeclarations?.[0]?.parameters as Schema;
}

describe("buildGeminiTools — bare property-map parameters (#4811)", () => {
  it("wraps a bare property map under properties (OpenAI function tool)", () => {
    const params = paramsOf(
      buildGeminiTools([
        {
          type: "function",
          function: {
            name: "browser",
            parameters: { action: { type: "string" }, args: { type: "object" } },
          },
        },
      ])
    );
    assert.equal(params.type, "object");
    assert.equal("action" in params, false, "action must not stay at the parameters root");
    assert.equal("args" in params, false, "args must not stay at the parameters root");
    assert.ok(params.properties.action, "action moved into properties");
    assert.ok(params.properties.args, "args moved into properties");
    assert.equal(params.properties.action.type, "string");
  });

  it("wraps a bare property map in a Claude-style input_schema", () => {
    const params = paramsOf(
      buildGeminiTools([{ name: "eval", input_schema: { expression: { type: "string" } } }])
    );
    assert.equal(params.type, "object");
    assert.equal("expression" in params, false);
    assert.equal(params.properties.expression.type, "string");
  });

  it("moves stray property names under properties even when `required` is present", () => {
    const params = paramsOf(
      buildGeminiTools([
        {
          type: "function",
          function: {
            name: "click",
            parameters: {
              selector: { type: "string" },
              match: { type: "string" },
              required: ["selector"],
            },
          },
        },
      ])
    );
    assert.equal(params.type, "object");
    assert.equal("selector" in params, false);
    assert.equal("match" in params, false);
    assert.equal(params.properties.selector.type, "string");
    assert.equal(params.properties.match.type, "string");
    assert.deepEqual(params.required, ["selector"]);
  });
});
