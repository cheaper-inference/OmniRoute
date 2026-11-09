import test from "node:test";
import assert from "node:assert/strict";
import { parseOllamaCloudBalance } from "../../open-sse/services/ollamaCloudBalance.ts";
import { convertUsageToQuotaInfo } from "../../open-sse/services/genericQuotaFetcher.ts";
import { evaluateQuotaCutoff } from "../../open-sse/services/quotaPreflight.ts";
import { buildConnectionQuotaAvailability } from "../../src/lib/usage/availability.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";
import { buildHealthAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import { displayAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";

const now = Date.parse("2099-01-01T00:00:00Z");
function fixture(purchased: number, resetAt: string) {
  const raw = {
    fetchedAt: new Date(now).toISOString(),
    quotas: parseOllamaCloudBalance({
      included: { allowance_usd: 100, balance_usd: 0, period: { until: resetAt } },
      purchased: { balance_usd: purchased },
    }),
  };
  const route = evaluateQuotaCutoff(
    convertUsageToQuotaInfo(raw, { provider: "ollama-cloud" }),
    undefined,
    { provider: "ollama-cloud" }
  );
  const connection = {
    id: "synthetic-ollama",
    provider: "ollama-cloud",
    isActive: true,
    testStatus: "active",
  };
  const availability = buildConnectionQuotaAvailability(connection, raw, {
    enabled: true,
    defaultThresholdPercent: 2,
    providerWindowDefaults: {},
  });
  assert.equal(availability.account.usable, route.proceed);
  const view = displayAccount(
    buildHealthAccount(connection, { raw, quotas: parseQuotaData("ollama-cloud", raw) }, {}, now, {
      availability,
      availabilityObservedAt: now,
    }),
    now
  );
  return { route, view };
}
test("Ollama purchased balance permits use after included allowance is exhausted", () => {
  const { route, view } = fixture(25, "2099-02-01T00:00:00Z");
  assert.equal(route.proceed, true);
  assert.equal(view.kind, "ok");
});
test("Ollama freshly observed zero balance remains blocked after the billing period ends", () => {
  const { route, view } = fixture(0, "2098-12-31T00:00:00Z");
  assert.equal(route.proceed, false);
  assert.equal(view.kind, "cdw");
});
