import { availability, decision } from "./quota-availability-fixtures";
import React from "react";
import fs from "node:fs";
import path from "node:path";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { parse } from "@formatjs/icu-messageformat-parser";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import HealthAccountTooltip from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/HealthAccountTooltip";
import { buildHealthAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing";
vi.unmock("next-intl");
afterEach(cleanup);
const now = Date.parse("2099-01-01T00:00:00Z");
const cases = [
  { provider: "claude", psd: { blockExtraUsage: false }, key: "healthExtraUsageBypass" },
  { provider: "codex", psd: { allowPaidCredits: true }, key: "healthPaidCreditsBypass" },
  {
    provider: "codex",
    psd: { quotaPreflightEnabled: false, limitPolicy: { enabled: false } },
    key: "healthFilteringBypass",
  },
] as const;
for (const locale of ["en", "zh-CN"])
  for (const row of cases)
    it(`${locale} tooltip explains ${row.key} while retaining the exhausted meter`, () => {
      const messages = locale === "en" ? en : zh;
      const raw = {
        quotas: {
          weekly: {
            total: 100,
            used: 100,
            remainingPercentage: 0,
            resetAt: "2099-01-02T00:00:00Z",
          },
        },
        paidCredits: {
          hasCredits: true,
          balance: 50,
          unlimited: false,
          overageLimitReached: false,
        },
      };
      const account = buildHealthAccount(
        { id: "synthetic", provider: row.provider, isActive: true, providerSpecificData: row.psd },
        { raw, quotas: parseQuotaData(row.provider, raw) },
        {},
        now,
        {
          availability: availability("synthetic", {
            ...decision(),
            allowanceReasons: [
              row.key === "healthExtraUsageBypass"
                ? "extraUsage"
                : row.key === "healthPaidCreditsBypass"
                  ? "paidCredits"
                  : "filteringDisabled",
            ],
          }),
          availabilityObservedAt: now,
        }
      );
      render(
        <NextIntlClientProvider
          locale={locale}
          messages={{ usage: messages.usage, common: messages.common }}
          timeZone="UTC"
          now={new Date(now)}
          onError={(error) => {
            throw error;
          }}
        >
          <HealthAccountTooltip
            id="synthetic-tooltip"
            account={account}
            label="Synthetic account"
            anchor={document.body}
          />
        </NextIntlClientProvider>
      );
      expect(typeof messages.usage[row.key]).toBe("string");
      expect(screen.getByText(messages.usage[row.key])).toBeTruthy();
      expect(screen.getByRole("progressbar").getAttribute("aria-valuenow")).toBe("0");
      expect(screen.getAllByText(messages.usage.healthAvailable)).toHaveLength(2);
    });
for (const row of cases) {
  it(`all 67 catalogs translate ${row.key} with the same empty ICU argument set`, () => {
    const directory = path.resolve("src/i18n/messages");
    const files = fs.readdirSync(directory).filter((file) => file.endsWith(".json"));
    expect(files.length).toBe(67);
    for (const file of files) {
      const usage = JSON.parse(fs.readFileSync(path.join(directory, file), "utf8")).usage;
      expect(typeof usage[row.key], `${file}:${row.key}`).toBe("string");
      expect(usage[row.key].startsWith("__MISSING__:")).toBe(false);
      expect(usage[row.key].match(/[{}]/g)).toBeNull();
      expect(parse(usage[row.key]).every((node) => node.type === 0)).toBe(true);
      if (file !== "en.json") expect(usage[row.key]).not.toBe(en.usage[row.key]);
    }
  });
}
