import React from "react";
import "@testing-library/jest-dom/vitest";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import QuotaHealthOverview from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaHealthOverview";
import { buildHealthAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";
import type { ConnectionQuotaAvailability } from "@/lib/usage/availabilityTypes";

vi.unmock("next-intl");
afterEach(cleanup);

for (const provider of ["antigravity", "agy"])
  for (const locale of ["en", "zh-CN"]) {
    it(`${provider} ${locale} shows a partial cap and the cooling family on hover without quota groups`, () => {
      const now = Date.now();
      const messages = locale === "en" ? en : zh;
      const until = new Date(now + 600_000).toISOString();
      const connection = { id: "synthetic-family", provider, isActive: true };
      const usage = {
        fetchedAt: new Date(now).toISOString(),
        quotas: { "gemini-3-flash": { remainingPercentage: 80, resetAt: until } },
      };
      const ready = {
        usable: true,
        blockers: [],
        allowanceReasons: [],
        fetchedAt: usage.fetchedAt,
      };
      const availability: ConnectionQuotaAvailability = {
        id: connection.id,
        account: ready,
        scopes: [
          {
            id: "gemini",
            kind: "group",
            model: "gemini-3-flash",
            windows: [],
            decision: {
              ...ready,
              usable: false,
              blockers: [
                {
                  name: "gemini-3-flash",
                  reason: "modelLockout",
                  kind: "fiveHour",
                  resetAt: until,
                },
              ],
            },
          },
          {
            id: "claude_gpt",
            kind: "group",
            model: "claude-sonnet-4-5",
            windows: [],
            decision: ready,
          },
        ],
      };
      const account = buildHealthAccount(connection, { raw: usage }, {}, now, {
        availability,
        availabilityObservedAt: now,
      });
      render(
        <NextIntlClientProvider
          locale={locale}
          messages={{ usage: messages.usage, common: messages.common }}
          timeZone="UTC"
          now={new Date(now)}
        >
          <QuotaHealthOverview
            connections={[connection]}
            accounts={{ [connection.id]: account }}
            quotaData={{}}
            emailsVisible={false}
            providerLabels={{ [provider]: "Antigravity" }}
            renderCard={() => null}
          />
        </NextIntlClientProvider>
      );
      const capsule = document.querySelector(`[data-account="${connection.id}"]`)!;
      expect(capsule).toHaveAttribute("data-kind", "ok");
      expect(capsule.querySelector("[data-partial]")).toHaveClass("bg-warning");
      fireEvent.mouseEnter(capsule);
      const tooltip = screen.getByRole("tooltip");
      expect(tooltip).toHaveTextContent(messages.usage.modelLockouts);
      expect(tooltip).toHaveTextContent("gemini-3-flash");
      fireEvent.mouseLeave(capsule);
      expect(screen.queryByRole("tooltip")).toBeNull();
    });
  }
