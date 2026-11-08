import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import HealthAccountTooltip from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/HealthAccountTooltip";
import { buildHealthAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";
import { displayAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay";
vi.unmock("next-intl");
afterEach(cleanup);
for (const locale of ["en", "zh-CN"])
  for (const reason of ["scopeCooldown", "peakHour", "modelLockout"] as const) {
    it(`${locale} renders ${reason} without inventing quota percentages`, () => {
      const now = Date.now();
      const messages = locale === "en" ? en : zh;
      const ready = {
        usable: true,
        blockers: [],
        allowanceReasons: [],
        fetchedAt: new Date(now).toISOString(),
      };
      const blocked = {
        ...ready,
        usable: false,
        blockers: [
          {
            name: "synthetic-model",
            reason,
            kind: "fiveHour" as const,
            resetAt: new Date(now + 600_000).toISOString(),
          },
        ],
      };
      const scoped = reason !== "peakHour";
      const account = buildHealthAccount(
        { id: "synthetic", provider: "codex", isActive: true },
        undefined,
        {},
        now,
        {
          availabilityObservedAt: now,
          availability: {
            id: "synthetic",
            account: scoped ? ready : blocked,
            scopes: scoped
              ? [
                  {
                    id: "spark",
                    kind: "scoped",
                    model: "synthetic-model",
                    windows: [],
                    decision: blocked,
                  },
                ]
              : [],
          },
        }
      );
      expect(displayAccount(account, now).partial).toBe(scoped);
      render(
        <NextIntlClientProvider
          locale={locale}
          messages={{ usage: messages.usage, common: messages.common }}
          timeZone="UTC"
          now={new Date(now)}
        >
          <HealthAccountTooltip
            id="synthetic-restriction"
            account={account}
            label="Synthetic"
            anchor={document.body}
          />
        </NextIntlClientProvider>
      );
      const text = screen.getByRole("tooltip").textContent;
      expect(text).toContain(
        messages.usage[
          reason === "peakHour"
            ? "healthPeakHourProtection"
            : reason === "modelLockout"
              ? "modelLockouts"
              : "healthCooldown"
        ]
      );
      if (scoped) expect(text).toContain(reason === "scopeCooldown" ? "spark" : "synthetic-model");
      expect(text).not.toContain("NaN");
      expect(text).not.toContain("undefined");
    });
  }
