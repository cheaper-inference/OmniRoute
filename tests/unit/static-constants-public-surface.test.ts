import test from "node:test";
import assert from "node:assert/strict";

const config = await import("../../src/shared/constants/config.ts");
const colors = await import("../../src/shared/constants/colors.ts");
const pricing = await import("../../src/shared/constants/pricing.ts");

test("config constants public surface excludes removed app endpoint placeholders", () => {
  assert.equal(Object.hasOwn(config, "SUBSCRIPTION_CONFIG"), false);
  assert.equal(Object.hasOwn(config, "API_ENDPOINTS"), false);
  assert.ok(config.PROVIDER_ENDPOINTS.openai);
  assert.ok(config.APP_CONFIG.name);
});

test("colors public surface excludes removed provider-color wrapper", () => {
  assert.equal(Object.hasOwn(colors, "getProviderColor"), false);
  assert.ok(colors.PROVIDER_COLORS.codex);
  assert.equal(colors.getProtocolColor("openai-chat", "openai").label, "OpenAI-Chat");
  // Kit status tone, not a hex literal (#19066 block 1).
  assert.equal(colors.getProxyStatusStyle("success").tone, "success");
  assert.equal(colors.getProxyStatusStyle("success").bg, "var(--ci-color-success-bg)");
});

test("pricing public surface excludes removed token-cost helper", () => {
  assert.equal(Object.hasOwn(pricing, "calculateCostFromTokens"), false);
  assert.equal(typeof pricing.getPricingForModel, "function");
  assert.equal(typeof pricing.getDefaultPricing, "function");
  assert.equal(typeof pricing.formatCost, "function");
});
