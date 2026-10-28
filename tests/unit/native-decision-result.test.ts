import assert from "node:assert/strict";
import { test } from "node:test";
import { projectNativeDecisionResult } from "../../src/app/(dashboard)/dashboard/endpoint/components/nativeDecisionResult.ts";

test("full255-choice numeric distribution survives display projection beyond5KB", () => {
  const probabilities = Object.fromEntries(
    Array.from({ length: 255 }, (_, index) => [
      `synthetic_option_number_${index}`,
      index === 0 ? 1 : 0,
    ])
  );
  const body = {
    model: "synthetic/model",
    answers: {
      route: { type: "choice", choice: "synthetic_option_number_0", probabilities, confidence: 1 },
    },
    usage: { input_tokens: 400, output_tokens: 22 },
  };
  const projected = projectNativeDecisionResult(body, new Headers());
  const serialized = JSON.stringify(projected, null, 2);
  assert.ok(serialized.length > 5000);
  assert.deepEqual(JSON.parse(serialized), body);
});
test("nested arbitrary answer usage and provider account metadata are not displayed", () => {
  const projected = projectNativeDecisionResult(
    {
      model: "synthetic/model",
      answers: { route: { type: "noul", noul: 1, debug: { account: "PRIVATE" } } },
      usage: { input_tokens: 3, account: "PRIVATE", email: "PRIVATE", id: "PRIVATE" },
      provider_metadata: { gateway: { account: "PRIVATE" } },
    },
    new Headers()
  );
  assert.equal(JSON.stringify(projected).includes("PRIVATE"), false);
  assert.deepEqual(projected, {
    model: "synthetic/model",
    answers: { route: { type: "noul", noul: 1 } },
    usage: { input_tokens: 3 },
  });
});
test("cost sources are distinct and genuine reportedzero is retained", () => {
  assert.deepEqual(
    projectNativeDecisionResult(
      { usage: { cost: 0 }, provider_metadata: { gateway: { cost: "0.00001" } } },
      new Headers({ "x-omniroute-cost-status": "known", "x-omniroute-response-cost": "0.00002" })
    ),
    {
      usage: { cost: 0 },
      cost_receipt: {
        cost_status: "known",
        omniroute_accounted_cost_usd: "0.00002",
        provider_gateway_cost_usd: "0.00001",
      },
    }
  );
});
test("unknowncost and invalidprices are never invented aszero", () => {
  assert.deepEqual(
    projectNativeDecisionResult(
      { usage: { cost: null }, provider_metadata: { gateway: { cost: "unknown" } } },
      new Headers({ "x-omniroute-cost-status": "unknown" })
    ),
    { usage: { cost: null }, cost_receipt: { cost_status: "unknown" } }
  );
});
test("refusal and missing confidence remain explicit", () => {
  assert.deepEqual(
    projectNativeDecisionResult(
      { answers: { route: { type: "refusal", confidence: null, probabilities: null } } },
      new Headers()
    ),
    { answers: { route: { type: "refusal", confidence: null, probabilities: null } } }
  );
});
test("credential-shaped display strings are redacted without dropping numeric fields", () => {
  const projected = projectNativeDecisionResult(
    {
      model: "sk-syntheticOnlyFixture0123456789",
      answers: {
        route: {
          type: "choice",
          choice: "sk-syntheticOnlyFixture0123456789",
          probabilities: { "sk-syntheticOnlyFixture0123456789": 1 },
        },
      },
    },
    new Headers()
  );
  assert.equal(JSON.stringify(projected).includes("syntheticOnlyFixture"), false);
  assert.equal(
    Object.values(
      (projected.answers as Record<string, Record<string, unknown>>).route.probabilities as Record<
        string,
        number
      >
    )[0],
    1
  );
});
test("oversized individual text fields receive an explicit truncation marker", () => {
  const projected = projectNativeDecisionResult({ model: "a".repeat(6000) }, new Headers());
  assert.match(String(projected.model), /\[truncated\]$/);
});
