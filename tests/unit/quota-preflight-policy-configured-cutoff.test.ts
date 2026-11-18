import test from "node:test";
import assert from "node:assert/strict";

import {
  isConfiguredCutoff,
  type QuotaPreflightPolicy,
} from "../../src/sse/services/quotaPreflightPolicy.ts";

const basePolicy: QuotaPreflightPolicy = {
  enabled: false,
  defaultThresholdPercent: 2,
  providerWindowDefaults: {},
};

test("isConfiguredCutoff is false when nothing was configured (#17884)", () => {
  assert.equal(isConfiguredCutoff("openai", {}, basePolicy, "weekly"), false);
  assert.equal(isConfiguredCutoff("openai", {}, basePolicy, null), false);
});

test("isConfiguredCutoff honours a per-connection window override", () => {
  const connection = { quotaWindowThresholds: { weekly: 10 } };
  assert.equal(isConfiguredCutoff("openai", connection, basePolicy, "weekly"), true);
  assert.equal(isConfiguredCutoff("openai", connection, basePolicy, "session"), false);
});

test("isConfiguredCutoff honours a provider window default", () => {
  const policy = { ...basePolicy, providerWindowDefaults: { openai: { weekly: 5 } } };
  assert.equal(isConfiguredCutoff("openai", {}, policy, "weekly"), true);
  assert.equal(isConfiguredCutoff("claude", {}, policy, "weekly"), false);
});

test("isConfiguredCutoff matches a Codex scoped window through its base name", () => {
  const connection = { quotaWindowThresholds: { weekly: 10 } };
  assert.equal(isConfiguredCutoff("codex", connection, basePolicy, "codex-spark-weekly"), true);
  assert.equal(isConfiguredCutoff("openai", connection, basePolicy, "codex-spark-weekly"), false);
});

test("isConfiguredCutoff is true under a global or legacy opt-in", () => {
  assert.equal(isConfiguredCutoff("openai", {}, { ...basePolicy, enabled: true }, "weekly"), true);
  assert.equal(
    isConfiguredCutoff("openai", {}, { ...basePolicy, defaultThresholdPercent: 10 }, null),
    true
  );
  assert.equal(
    isConfiguredCutoff(
      "openai",
      { providerSpecificData: { quotaPreflightEnabled: true } },
      basePolicy,
      null
    ),
    true
  );
});
