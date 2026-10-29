// Gate for the streaming PII transform: resolves the per-request opt-out list
// with the same production reader as the non-streaming guardrail, then decides
// whether the PII transform joins the chain. Mirrors the credential gate.
import { test } from "node:test";
import assert from "node:assert/strict";

test("opt-out list disables the streaming PII transform", async () => {
  const { resolvePiiGate, isPiiTransformEnabled } =
    await import("../../src/lib/streamingPiiTransform.ts");
  const optedOut = await resolvePiiGate({
    resolveDisabledGuardrails: () => ["pii-masker"],
  });
  assert.deepEqual(optedOut.piiDisabledGuardrails, ["pii-masker"]);
  assert.equal(isPiiTransformEnabled(optedOut), false);
  const kept = await resolvePiiGate({
    resolveDisabledGuardrails: () => [],
  });
  assert.equal(isPiiTransformEnabled(kept), true);
});

test("underscored name resolves to the same opt-out", async () => {
  const { resolvePiiGate, isPiiTransformEnabled } =
    await import("../../src/lib/streamingPiiTransform.ts");
  const { resolveDisabledGuardrails } = await import("../../src/lib/guardrails/registry.ts");
  const gate = await resolvePiiGate({
    resolveDisabledGuardrails,
    body: { disabledGuardrails: ["pii_masker"] },
  });
  assert.deepEqual(gate.piiDisabledGuardrails, ["pii-masker"]);
  assert.equal(isPiiTransformEnabled(gate), false);
});

test("each request channel carrying the opt-out disables the transform", async () => {
  const { resolvePiiGate, isPiiTransformEnabled } =
    await import("../../src/lib/streamingPiiTransform.ts");
  const { resolveDisabledGuardrails } = await import("../../src/lib/guardrails/registry.ts");
  const channels = [
    { body: { disabledGuardrails: ["pii-masker"] } },
    { body: { metadata: { disabledGuardrails: ["pii-masker"] } } },
    { headers: { "x-omniroute-disabled-guardrails": "pii-masker" } },
    { headers: { "x-disabled-guardrails": "pii-masker" } },
    { apiKeyInfo: { disabledGuardrails: ["pii-masker"] } },
  ];
  for (const channel of channels) {
    const gate = await resolvePiiGate({
      resolveDisabledGuardrails,
      apiKeyInfo: channel.apiKeyInfo,
      body: channel.body,
      headers: channel.headers,
    });
    assert.equal(isPiiTransformEnabled(gate), false, JSON.stringify(channel));
  }
});

test("out-of-contract input resolves to an empty list and keeps the transform", async () => {
  const { resolvePiiGate, isPiiTransformEnabled } =
    await import("../../src/lib/streamingPiiTransform.ts");
  const { resolveDisabledGuardrails } = await import("../../src/lib/guardrails/registry.ts");
  for (const odd of [42, null, { disabledGuardrails: 42 }]) {
    const gate = await resolvePiiGate({
      resolveDisabledGuardrails,
      body: odd,
    });
    assert.deepEqual(gate.piiDisabledGuardrails, []);
    assert.equal(isPiiTransformEnabled(gate), true);
  }
});

test("reader failure keeps the historical behavior", async () => {
  const { resolvePiiGate, isPiiTransformEnabled } =
    await import("../../src/lib/streamingPiiTransform.ts");
  const gate = await resolvePiiGate({
    resolveDisabledGuardrails: () => {
      throw new Error("reader down");
    },
  });
  assert.deepEqual(gate.piiDisabledGuardrails, []);
  assert.equal(isPiiTransformEnabled(gate), true);
});

test("an unrelated entry alone keeps the transform", async () => {
  const { resolvePiiGate, isPiiTransformEnabled } =
    await import("../../src/lib/streamingPiiTransform.ts");
  const gate = await resolvePiiGate({
    resolveDisabledGuardrails: () => ["vision-bridge"],
  });
  assert.equal(isPiiTransformEnabled(gate), true);
});
