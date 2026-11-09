import test from "node:test";
import assert from "node:assert/strict";
import { parseOllamaCloudBalance } from "../../open-sse/services/ollamaCloudBalance.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";
import { convertUsageToQuotaInfo } from "../../open-sse/services/genericQuotaFetcher.ts";

function balance(remaining: number, until: string, purchased = 0) {
  return {
    included: {
      balance_usd: remaining,
      allowance_usd: 100,
      period: { from: "2000-01-01T00:00:00Z", until },
    },
    purchased: { balance_usd: purchased },
  };
}

test("control: documented monthly balance with future reset stays at 72.5%", () => {
  const quotas = parseOllamaCloudBalance(balance(72.5, "2099-01-01T00:00:00Z"));
  const monthly = parseQuotaData("ollama-cloud", { quotas }).find((row) => row.name === "monthly");
  assert.equal(monthly?.remainingPercentage, 72.5);
});

test("a fetched API balance stays authoritative when its period timestamp is past", () => {
  const quotas = parseOllamaCloudBalance(balance(72.5, "2000-02-01T00:00:00Z"));
  const monthly = parseQuotaData("ollama-cloud", { quotas }).find((row) => row.name === "monthly");
  assert.equal(monthly?.remainingPercentage, 72.5);
});

test("missing balance_usd must not fabricate an exhausted monthly window", () => {
  const quotas = parseOllamaCloudBalance({ included: { allowance_usd: 100 } });
  assert.equal(quotas.monthly, undefined);
});

test("positive purchased credits must not be blocked by exhausted included allowance", () => {
  const quotas = parseOllamaCloudBalance(balance(0, "2099-01-01T00:00:00Z", 25));
  const info = convertUsageToQuotaInfo({ quotas }, { provider: "ollama-cloud" });
  assert.equal(info?.limitReached ?? false, false);
});

test("missing and malformed monthly balances remain unknown; explicit zero remains exhausted", () => {
  for (const value of [undefined, null, "", " ", false, {}, "invalid", NaN, Infinity]) {
    const quotas = parseOllamaCloudBalance({
      included: { allowance_usd: 100, balance_usd: value },
    });
    assert.equal(quotas.monthly, undefined);
  }
  const quotas = parseOllamaCloudBalance(balance(0, "2099-01-01T00:00:00Z"));
  assert.equal(
    convertUsageToQuotaInfo({ quotas }, { provider: "ollama-cloud" })?.limitReached,
    true
  );
});

test("legacy API windows preserve observed fractions; cookie and other-provider resets stay unchanged", () => {
  const quotas = parseOllamaCloudBalance({
    included: {
      session: { remaining_percent: 40, resets_at: "2000-01-01T00:00:00Z" },
    },
  });
  assert.equal(parseQuotaData("ollama-cloud", { quotas })[0].remainingPercentage, 40);
  const cookie = { session: { ...quotas.session, ollamaApiBalance: undefined } };
  assert.equal(parseQuotaData("ollama-cloud", { quotas: cookie })[0].remainingPercentage, 100);
  assert.equal(parseQuotaData("openai", { quotas })[0].remainingPercentage, 100);
  assert.equal(parseQuotaData("openrouter", { quotas })[0].remainingPercentage, 100);
});

test("only verified positive Ollama USD credits suppress included-only preflight blocks", () => {
  const quotas = parseOllamaCloudBalance(balance(0, "2099-01-01T00:00:00Z", 25));
  for (const credits of [
    { ...quotas.credits, remaining: 0 },
    { ...quotas.credits, remaining: -1 },
    { ...quotas.credits, remaining: "25" },
    { ...quotas.credits, remaining: NaN },
    { ...quotas.credits, currency: "EUR" },
    { ...quotas.credits, currency: undefined },
    { ...quotas.credits, ollamaApiBalance: false },
  ]) {
    assert.equal(
      convertUsageToQuotaInfo({ quotas: { ...quotas, credits } }, { provider: "ollama-cloud" })
        ?.limitReached,
      true
    );
  }
  assert.equal(convertUsageToQuotaInfo({ quotas }, { provider: "openai" })?.limitReached, true);
});
