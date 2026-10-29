import { availability, blocker, decision } from "./quota-availability-fixtures";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
vi.unmock("next-intl");
// The existing live-probe button has its own namespace and is outside this layout test.
vi.mock("@/shared/components/ConnectionTestButton", () => ({ default: () => null }));
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import zh from "../../src/i18n/messages/zh-CN.json";
import QuotaCardGrid from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCardGrid";
import { buildHealthAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";

const now = new Date("2099-01-01T00:00:00Z");
const connections = ["a", "b"].map((id) => ({
  id,
  provider: "claude",
  email: `${id}@example.test`,
  isActive: true,
  testStatus: "active",
}));
const quotaData = Object.fromEntries(
  connections.map((c, i) => [
    c.id,
    {
      quotas: [{ name: "weekly", remainingPercentage: i * 10 }],
      raw: {
        fetchedAt: now.toISOString(),
        speed: {
          samples: 2,
          byModel: [
            { model: `${c.id}-model`, avgTps: 120, lastTps: 150, avgTtftMs: 800, samples: 2 },
          ],
        },
      },
    },
  ])
);
const accounts = Object.fromEntries(
  connections.map((c) => [
    c.id,
    buildHealthAccount(c, quotaData[c.id], {}, now.getTime(), {
      availability: availability(
        c.id,
        c.id === "a" ? decision(false, [blocker("weekly")]) : decision()
      ),
      availabilityObservedAt: now.getTime(),
    }),
  ])
);
afterEach(() => {
  cleanup();
  localStorage.clear();
});

for (const locale of ["en", "zh-CN"]) {
  for (const layout of ["overview", "full", "compact"]) {
    it(`preserves per-account row visibility, speed, and quota thresholds in ${layout} (${locale})`, () => {
      const messages = locale === "en" ? en : zh;
      const onHideQuota = vi.fn(),
        onShowQuota = vi.fn();
      const { container } = render(
        <NextIntlClientProvider
          locale={locale}
          messages={{ usage: messages.usage, common: messages.common }}
          now={now}
          timeZone="UTC"
        >
          <QuotaCardGrid
            connections={connections}
            quotaData={quotaData}
            accounts={accounts}
            overview={layout === "overview"}
            compact={layout === "compact"}
            quotaVisibility={{ a: { hidden: ["weekly"] } }}
            loading={{}}
            errors={{}}
            lastRefreshedAt={{}}
            emailsVisible
            providerLabels={{ claude: "Claude" }}
            togglingActiveId={null}
            onRefresh={vi.fn()}
            onOpenCutoff={vi.fn()}
            onToggleActive={vi.fn()}
            onHideQuota={onHideQuota}
            onShowQuota={onShowQuota}
          />
        </NextIntlClientProvider>
      );
      if (layout === "overview") {
        expect(container.querySelector('[data-account="a"]')).toHaveAttribute("data-kind", "cdw");
        expect(container.querySelector('[data-account="b"]')).toHaveAttribute("data-kind", "ok");
        fireEvent.click(container.querySelector('[data-account="a"]')!);
      }
      let cards = Array.from(container.querySelectorAll<HTMLElement>('[style*="border-left:"]'));
      const hiddenCard = cards.find((card) => card.textContent?.includes("a-model"))!;
      expect(hiddenCard).toHaveTextContent("TTFT");
      expect(
        within(hiddenCard).queryByRole("button", { name: messages.usage.hideQuotaRow })
      ).toBeNull();
      fireEvent.click(within(hiddenCard).getByTitle(messages.usage.showQuotaRow));
      expect(onShowQuota).toHaveBeenCalledWith(
        { connectionId: "a", provider: "claude" },
        expect.objectContaining({ name: "weekly" })
      );
      if (layout === "overview") fireEvent.click(container.querySelector('[data-account="b"]')!);
      cards = Array.from(container.querySelectorAll<HTMLElement>('[style*="border-left:"]'));
      const visibleCard = cards.find((card) => card.textContent?.includes("b-model"))!;
      expect(visibleCard).toHaveTextContent("TTFT");
      expect(visibleCard.style.borderLeft).toBe("3px solid var(--color-error)");
      fireEvent.click(
        within(visibleCard).getByRole("button", { name: messages.usage.hideQuotaRow })
      );
      expect(onHideQuota).toHaveBeenCalledWith(
        { connectionId: "b", provider: "claude" },
        expect.objectContaining({ name: "weekly" })
      );
      expect(screen.queryByText(/usage\.health/)).toBeNull();
    });
  }
}
