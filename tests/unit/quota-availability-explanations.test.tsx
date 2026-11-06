import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import HealthAccountTooltip from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/HealthAccountTooltip";
import { buildHealthAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";
import type { QuotaAvailabilityDecision } from "@/lib/usage/availabilityTypes";
vi.unmock("next-intl");
afterEach(cleanup);
for (const locale of ["en", "zh-CN"]) {
  for (const [reason, key] of [
    ["recentSuccess", "healthRecentSuccessBypass"],
    ["purchasedBalance", "healthPurchasedBalanceBypass"],
    ["cutoff", "healthCutoffAtRequest"],
  ] as const) {
    it(`${locale} tooltip displays the server's ${reason} explanation`, () => {
      const now = Date.now();
      const messages = locale === "en" ? en : zh;
      const decision: QuotaAvailabilityDecision = {
        usable: true,
        fetchedAt: new Date(now).toISOString(),
        blockers: [],
        allowanceReasons: reason === "cutoff" ? [] : [reason],
        ...(reason === "cutoff" ? { cutoffEvaluated: false } : {}),
      };
      const account = buildHealthAccount(
        { id: "synthetic", provider: "openai", isActive: true },
        {
          quotas: [{ name: "weekly", remainingPercentage: 0 }],
        },
        {},
        now,
        {
          availabilityObservedAt: now,
          availability: { id: "synthetic", account: decision, scopes: [] },
        }
      );
      render(
        <NextIntlClientProvider
          locale={locale}
          messages={{ usage: messages.usage, common: messages.common }}
          timeZone="UTC"
          now={new Date(now)}
        >
          <HealthAccountTooltip
            id="synthetic-tooltip"
            account={account}
            label="Synthetic account"
            anchor={document.body}
          />
        </NextIntlClientProvider>
      );
      expect(screen.getByText(messages.usage[key])).toBeTruthy();
      expect(account.reasons.some((r) => r.type === "cutoffNotEvaluated")).toBe(
        reason === "cutoff"
      );
      expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("0");
    });
  }
}
