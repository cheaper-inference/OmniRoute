import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const { USAGE_FETCHER_PROVIDERS, getUsageForProvider } =
  await import("../../open-sse/services/usage.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { OAUTH_PROVIDERS } = await import("../../src/shared/constants/providers/oauth.ts");
const { getLobeProviderIcon } = await import("../../src/shared/components/lobeProviderIcons.ts");
const { parseQuotaData } = await import(
  "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts"
);

const originalFetch = globalThis.fetch;

describe("Grok Bot usage", () => {
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("registers grok-bot in the provider page and icon map", () => {
    assert.equal(OAUTH_PROVIDERS["grok-bot"]?.name, "Grok Bot");
    assert.ok(getLobeProviderIcon("grok-bot"));
    assert.ok((USAGE_FETCHER_PROVIDERS as readonly string[]).includes("grok-bot"));
    assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("grok-bot"));
  });

  it("reads the weekly included allowance from GetSandUsageStatus", async () => {
    const resetAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          usagePercent: 1.65718,
          nextResetTimestampUtc: resetAt,
          grokPlanLabel: "SuperGrok Heavy",
          hasAvailableUsage: true,
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );

    const result = (await getUsageForProvider({
      provider: "grok-bot",
      accessToken: "bot-token",
    })) as {
      plan?: string;
      quotas?: { weekly?: { remainingPercentage?: number; resetAt?: string } };
    };

    assert.equal(result.plan, "SuperGrok Heavy");
    assert.equal(result.quotas?.weekly?.remainingPercentage, 98.34282);
    assert.equal(result.quotas?.weekly?.resetAt, resetAt);
    assert.equal(
      parseQuotaData("grok-bot", result)[0]?.remainingPercentage,
      98.34282
    );
  });
});
