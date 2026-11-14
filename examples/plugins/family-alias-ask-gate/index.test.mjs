import assert from "node:assert/strict";
import test from "node:test";
import { authorizeFallback, normalizeModel, onRequest } from "./index.mjs";

const models = {
  "claude-opus-4-8": { family: "claude", tier: 75 },
  "claude-sonnet-4-6": { family: "claude", tier: 15 },
  "gpt-5.6-sol": { family: "gpt", tier: 30 },
};
const requested = "claude-opus-4-8";
const allow = () => "allow";

for (const [header, permitted] of [
  [undefined, false], ["0", false], ["true", false], [" 1", false], ["1", true],
  [["1", "1"], false],
]) {
  test(`cross-family consent must be exactly 1 (${JSON.stringify(header)})`, async () => {
    const result = await authorizeFallback({
      requested, candidate: "gpt-5.6-sol", models,
      headers: { "x-open-design-cross-family": header }, ask: allow,
    });
    assert.equal(result.allowed, permitted);
    assert.equal(result.cross_family_consent, permitted);
  });
}

test("default in-family downgrade works without cross-family consent", async () => {
  let asks = 0;
  const result = await authorizeFallback({
    requested, candidate: "claude-sonnet-4-6", models,
    ask: () => { asks += 1; return "allow"; },
  });
  assert.equal(result.modelId, "claude-sonnet-4-6");
  assert.equal(asks, 1);
});

test("same-tier fallback is permitted after Ask", async () => {
  const result = await authorizeFallback({ requested, candidate: requested, models, ask: allow });
  assert.equal(result.allowed, true);
});

test("upward fallback is forbidden even with consent and approval", async () => {
  let asks = 0;
  const result = await authorizeFallback({
    requested: "claude-sonnet-4-6", candidate: requested, models,
    headers: { "x-open-design-cross-family": "1" },
    ask: () => { asks += 1; return "allow"; },
  });
  assert.equal(result.allowed, false);
  assert.equal(result.reason, "upward_tier");
  assert.equal(asks, 0);
});

test("request claims cannot override the map's family", async () => {
  const result = await authorizeFallback({ requested, candidate: "gpt-5.6-sol", models, ask: allow });
  assert.equal(result.reason, "cross_family_consent_required");
});

test("missing tiers, invalid tiers, missing Ask, and deny all fail closed", async () => {
  for (const input of [
    { candidate: "unknown", ask: allow },
    { candidate: "unknown", models: { ...models, unknown: { family: "claude", tier: NaN } }, ask: allow },
    { candidate: "claude-sonnet-4-6" },
    { candidate: "claude-sonnet-4-6", ask: () => "deny" },
    { candidate: "claude-sonnet-4-6", ask: () => "yes" },
  ]) {
    const result = await authorizeFallback({ requested, models, ...input });
    assert.equal(result.allowed, false);
    assert.equal(result.line, `No confirmed lower-tier model in the same family. Stopped on ${requested}.`);
  }
});

test("same-model retry is allowed at most once", async () => {
  const result = await authorizeFallback({ requested, candidate: requested, models, ask: allow, sameModelRetries: 1 });
  assert.equal(result.reason, "same_model_retry_exhausted");
});

test("CPA prefixes and trailing effort are stripped for shared-map lookup", async () => {
  assert.equal(normalizeModel("cpa-base/claude-opus-4-8-high"), requested);
  const result = await authorizeFallback({
    requested: "cpa-deep/claude-opus-4-8-high", candidate: "claude-sonnet-4-6-low", models, ask: allow,
  });
  assert.equal(result.allowed, true);
});

test("initial requests are never blocked or silently swapped", async () => {
  assert.equal(await onRequest({ model: requested, body: { model: requested }, metadata: {} }), undefined);
});

test("native hook blocks a proposed fallback with a visible response without Ask", async () => {
  const response = await onRequest({
    model: "claude-sonnet-4-6", metadata: { family_alias_ask_gate: { requested, models } },
  });
  assert.equal(response.blocked, true);
  assert.equal(response.response.status, 409);
  assert.equal(response.metadata.family_alias_ask_gate.reason, "ask_required");
});

test("IPC approval is bound to the exact proposed model and still cannot promote", async () => {
  const make = (candidate, approved) => ({
    model: candidate,
    metadata: { family_alias_ask_gate: { requested: "claude-sonnet-4-6", models, approved_model: approved, ask_answer: "allow" } },
  });
  assert.equal((await onRequest(make(requested, requested))).blocked, true);
  assert.equal((await onRequest(make("gpt-5.6-sol", "claude-sonnet-4-6"))).blocked, true);
});
