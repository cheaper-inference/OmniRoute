import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import HealthAccountTooltip from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/HealthAccountTooltip";
import { buildHealthAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";

vi.unmock("next-intl");
afterEach(cleanup);
for (const locale of ["en", "zh-CN"]) {
  it(`${locale} tooltip shows the server's positive-quota cutoff and blocking window`, () => {
    const now = Date.now();
    const messages = locale === "en" ? en : zh;
    const account = buildHealthAccount(
      { id: "synthetic-threshold", provider: "kimi-coding", isActive: true },
      { quotas: [{ name: "code_5h", remainingPercentage: 1 }] },
      {},
      now,
      {
        availabilityObservedAt: now,
        availability: {
          id: "synthetic-threshold",
          account: {
            usable: false,
            fetchedAt: new Date(now).toISOString(),
            allowanceReasons: [],
            blockers: [
              {
                name: "code_5h",
                kind: "fiveHour",
                resetAt: new Date(now + 3600000).toISOString(),
                remainingPercent: 1,
                cutoffPercent: 2,
              },
            ],
          },
          scopes: [],
        },
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
          id="synthetic-cutoff-tooltip"
          account={account}
          label="Synthetic account"
          anchor={document.body}
        />
      </NextIntlClientProvider>
    );
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip.textContent).toContain(messages.usage.quotaCutoffsColumnHelp);
    expect(tooltip.textContent).toContain(messages.usage.healthFiveHour);
    expect(tooltip.textContent).toContain("1% ≤ 2%");
    expect(tooltip.textContent).not.toContain(messages.usage.healthQuotaExhausted);
    expect(tooltip.textContent).not.toContain("NaN");
  });
}
