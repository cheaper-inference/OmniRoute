/**
 * Learned max_tokens ceilings: parse, clamp, and the clamp-and-retry helper.
 * Some upstreams advertise a max_tokens ceiling lower than what clients
 * legitimately ask for ("expected a value <= 131072"); the gateway parses the
 * advertised ceiling from the 400, clamps, retries once, and records it so
 * future requests pre-clamp.
 */
import test from "node:test";
import assert from "node:assert/strict";

const caps = await import("../../open-sse/services/learnedMaxTokensCaps.ts");
const recovery = await import("../../open-sse/executors/base/maxTokensRecovery.ts");

test("1. parse: inclusive bound, exclusive bound, non-matches, escaped JSON form", () => {
  assert.equal(
    caps.parseMaxTokensCeiling(
      "The parameter `max_tokens` is invalid: integer above maximum value, expected a value <= 131072, but got 178586 instead."
    ),
    131072
  );
  assert.equal(
    caps.parseMaxTokensCeiling("The parameter `max_tokens` is not valid: integer, expected a value < 8192"),
    8191
  );
  // JSON-serialized error body escapes "<" as \u003c and "=" as \u003d — the
  // parser must normalize before matching or the escaped form never hits.
  assert.equal(
    caps.parseMaxTokensCeiling(
      '{"error":{"message":"The parameter `max_tokens` ... expected a value \\u003c\\u003d 131072, but got 178586"}}'
    ),
    131072
  );
  assert.equal(caps.parseMaxTokensCeiling("thinking_budget must be in the range [-1, 32000]"), null);
  assert.equal(caps.parseMaxTokensCeiling(""), null);
  assert.equal(caps.parseMaxTokensCeiling(42), null);
});

test("2. record keeps the lowest learned ceiling; get is provider+model keyed", () => {
  caps.__test_resetLearnedMaxTokensCaps();
  assert.equal(caps.recordLearnedMaxTokensCap("prov", "model-a", 131072), 131072);
  assert.equal(caps.recordLearnedMaxTokensCap("PROV", "MODEL-A", 8192), 8192); // lower wins, case-insensitive
  assert.equal(caps.recordLearnedMaxTokensCap("prov", "model-a", 131072), 8192); // higher never overwrites
  assert.equal(caps.getLearnedMaxTokensCap("prov", "model-a"), 8192);
  assert.equal(caps.getLearnedMaxTokensCap("prov", "model-b"), null);
});

test("3. clampTopLevelMaxTokens clamps max_tokens and squeezes an over-cap thinking budget", () => {
  const body = { max_tokens: 178586, thinking: { budget_tokens: 170394 } };
  assert.equal(caps.clampTopLevelMaxTokens(body, 131072), true);
  assert.equal(body.max_tokens, 131072);
  // budget squeezed to cap - 1024, keeping the budget < max_tokens contract.
  assert.equal(body.thinking?.budget_tokens, 131072 - 1024);

  const fine = { max_tokens: 4096, thinking: { budget_tokens: 2048 } };
  assert.equal(caps.clampTopLevelMaxTokens(fine, 131072), false, "already within cap");
  assert.equal(fine.max_tokens, 4096);
  assert.equal(caps.clampTopLevelMaxTokens(null, 100), false);
  assert.equal(caps.clampTopLevelMaxTokens({ max_tokens: "big" }, 100), false);
});

test("4. applyMaxTokensRecovery: 400 advertising a ceiling → clamp, retry once, learn", async () => {
  caps.__test_resetLearnedMaxTokensCaps();
  const err400 = new Response(
    "The parameter `max_tokens` is invalid: integer above maximum value, expected a value <= 131072, but got 178586 instead.",
    { status: 400 }
  );
  const ok200 = new Response("{}", { status: 200 });
  const calls: string[] = [];
  const body = { max_tokens: 178586 };
  const result = await recovery.applyMaxTokensRecovery({
    response: err400,
    url: "https://upstream.example/v1/messages",
    provider: "prov",
    model: "model-x",
    body,
    fetchOptions: {},
    fetchFn: async (_url, options) => {
      calls.push(String(options.body));
      return ok200;
    },
  });
  assert.equal(result.retried, true);
  assert.equal(result.attempted, true);
  assert.equal(result.response.status, 200);
  assert.deepEqual(JSON.parse(calls[0]), { max_tokens: 131072 });
  assert.equal(caps.getLearnedMaxTokensCap("prov", "model-x"), 131072);
});

test("5. applyMaxTokensRecovery: unrelated 400 and 200 pass through untouched", async () => {
  const body = { max_tokens: 500 };
  const pass = await recovery.applyMaxTokensRecovery({
    response: new Response("some other validation error", { status: 400 }),
    url: "https://upstream.example/v1/messages",
    provider: "prov",
    model: "model-y",
    body,
    fetchOptions: {},
    fetchFn: async () => {
      throw new Error("must not retry");
    },
  });
  assert.equal(pass.retried, false);
  assert.equal(pass.attempted, false);
  assert.equal(body.max_tokens, 500);

  const okPass = await recovery.applyMaxTokensRecovery({
    response: new Response("{}", { status: 200 }),
    url: "https://upstream.example/v1/messages",
    provider: "prov",
    model: "model-y",
    body,
    fetchOptions: {},
    fetchFn: async () => {
      throw new Error("must not retry");
    },
  });
  assert.equal(okPass.retried, false);
});

test("6. applyMaxTokensRecovery: ceiling advertised but body within it → learned, no retry", async () => {
  caps.__test_resetLearnedMaxTokensCaps();
  const body = { max_tokens: 4096 };
  const result = await recovery.applyMaxTokensRecovery({
    response: new Response(
      "The parameter `max_tokens` is invalid: integer above maximum value, expected a value <= 131072",
      { status: 400 }
    ),
    url: "https://upstream.example/v1/messages",
    provider: "prov",
    model: "model-z",
    body,
    fetchOptions: {},
    fetchFn: async () => {
      throw new Error("must not retry");
    },
  });
  assert.equal(result.attempted, true);
  assert.equal(result.retried, false);
  assert.equal(caps.getLearnedMaxTokensCap("prov", "model-z"), 131072);
});
