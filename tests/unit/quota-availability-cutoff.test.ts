import assert from "node:assert/strict";
import { test } from "node:test";
import { registerQuotaFetchers } from "../../src/instrumentation-node.ts";
import { getRegisteredQuotaFetchers } from "../../open-sse/services/quotaPreflight.ts";
import { fetchGenericQuota } from "../../open-sse/services/genericQuotaFetcher.ts";
import { evaluateCachedQuotaAvailability } from "../../src/lib/usage/availability.ts";
import { canEvaluateCachedCutoff } from "../../src/lib/usage/cachedQuotaConversion.ts";

await registerQuotaFetchers();
const registry = getRegisteredQuotaFetchers();
const unsupported = [...registry]
  .filter(([id, fetcher]) => id !== "codex" && fetcher !== fetchGenericQuota)
  .map(([id]) => id)
  .sort();
console.log("Cached cutoff unavailable providers:", JSON.stringify(unsupported));
const usage = {
  fetchedAt: new Date().toISOString(),
  quotas: { session: { remainingPercentage: 5, resetAt: "2099-02-01T00:00:00Z" } },
};
const policy = { enabled: false, defaultThresholdPercent: 10, providerWindowDefaults: {} };
for (const provider of unsupported) {
  test(`${provider} reports unevaluated live cutoff only when its preflight gate is enabled`, () => {
    assert.equal(canEvaluateCachedCutoff(provider), false);
    const input = {
      id: `synthetic-${provider}`,
      provider,
      isActive: true,
      providerSpecificData: { quotaPreflightEnabled: true },
    };
    const enabled = evaluateCachedQuotaAvailability(input, usage, policy);
    assert.equal(enabled.cutoffEvaluated, false);
    assert.equal(enabled.usable, true);
    assert.deepEqual(enabled.blockers, []);
    const disabled = evaluateCachedQuotaAvailability(
      { ...input, providerSpecificData: { quotaPreflightEnabled: false } },
      usage,
      policy
    );
    assert.notEqual(disabled.cutoffEvaluated, false);
    const defaultGate = evaluateCachedQuotaAvailability(
      { ...input, providerSpecificData: {} },
      usage,
      { ...policy, defaultThresholdPercent: 2 }
    );
    assert.notEqual(defaultGate.cutoffEvaluated, false);
  });
}
for (const provider of ["codex", "ollama-cloud"]) {
  test(`${provider} evaluates the cached cutoff through the routing converter`, () => {
    const result = evaluateCachedQuotaAvailability(
      {
        id: `synthetic-${provider}`,
        provider,
        providerSpecificData: { quotaPreflightEnabled: true },
      },
      usage,
      policy
    );
    assert.equal(result.cutoffEvaluated, true);
    assert.equal(result.usable, false);
  });
}
