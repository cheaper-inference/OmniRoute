import test from "node:test";
import assert from "node:assert/strict";

import { getMuseUsage } from "../../open-sse/services/usage/museCode.ts";

test("Muse usage leaves unreported quota fields and source absent", async () => {
  const result = await getMuseUsage(undefined, {});
  assert.equal(result.provider, "muse-code");
  assert.equal(result.plan, "unknown");
  assert.equal(result.isSubsActive, undefined);
  assert.deepEqual(result.details, []);

  for (const field of [
    "used",
    "total",
    "remaining",
    "remainingPercentage",
    "isPercentageOnly",
    "quotaSource",
  ]) {
    assert.equal(field in result, false, `${field} must remain unreported`);
  }
});

test("Muse usage reports unknown activity when tier metadata lacks a valid activity flag", async () => {
  for (const isSubsActive of [undefined, "yes", 1, null]) {
    const result = await getMuseUsage(undefined, {
      subsTierName: "Synthetic tier",
      isSubsActive,
    });
    assert.equal(result.isSubsActive, undefined);
    assert.match(String(result.message), /\(activity unknown\)/);
    assert.doesNotMatch(String(result.message), /\(inactive\)/);
  }
});

for (const active of [true, false]) {
  test(`Muse usage preserves subscription metadata when active=${active}`, async () => {
    const result = await getMuseUsage(undefined, {
      subsTierName: "Synthetic tier",
      subsTierId: "synthetic-tier",
      isSubsActive: active,
      hasPaymentMethod: false,
    });
    assert.equal(result.plan, "Synthetic tier");
    assert.equal(result.subsTierId, "synthetic-tier");
    assert.equal(result.isSubsActive, active);
    assert.equal(result.hasPaymentMethod, false);
    assert.match(String(result.message), active ? /\(active\)/ : /\(inactive\)/);
  });
}

test("Muse subscription metadata remains available through generic usage dispatch", async () => {
  const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
  const { USAGE_FETCHER_PROVIDERS } =
    await import("../../open-sse/services/usage/fetcherProviders.ts");
  const { USAGE_SUPPORTED_PROVIDERS } =
    await import("../../open-sse/services/usage/supportedProviders.ts");
  assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("muse-code"));
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("muse-code"));
  const result = await getUsageForProvider({
    id: "muse-compat-test",
    provider: "muse-code",
    providerSpecificData: { subsTierName: "Synthetic tier", isSubsActive: true },
  });
  assert.equal(result.provider, "muse-code");
  assert.equal(result.plan, "Synthetic tier");
  assert.equal(result.isSubsActive, true);
});
