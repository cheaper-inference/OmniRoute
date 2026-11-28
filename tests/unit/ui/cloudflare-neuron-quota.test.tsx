import { expect, test } from "vitest";

import { parseQuotaData } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing";

test("keeps the neuron unit and daily allocation in the parsed Cloudflare quota", () => {
  const resetAt = new Date(Date.now() + 60_000).toISOString();
  const quotas = parseQuotaData("cloudflare-ai", {
    quotas: {
      neurons: {
        displayName: "Daily free allocation (neurons)",
        used: 15_000,
        total: 10_000,
        unit: "neurons",
        remainingPercentage: 0,
        resetAt,
      },
    },
  });

  expect(quotas).toMatchObject([
    {
      name: "neurons",
      displayName: "Daily free allocation (neurons)",
      used: 15_000,
      total: 10_000,
      unit: "neurons",
      remainingPercentage: 0,
      resetAt,
    },
  ]);
});
