// @vitest-environment jsdom
import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import TokenBreakdownCards from "@/shared/components/analytics/TokenBreakdownCards";
import type { AnalyticsTokenSummary } from "@/shared/utils/analyticsTokenBreakdown";
import en from "@/i18n/messages/en.json";
import fa from "@/i18n/messages/fa.json";
import namespaces from "@/i18n/routeNamespaces.generated.json";
import { pickMessages } from "@/i18n/pickMessages";

vi.unmock("next-intl");
afterEach(cleanup);

const summary = {
  totalRequests: 19433,
  promptTokens: 10_000,
  completionTokens: 1_000,
  cachedInputTokens: 6_000,
  cachedInputTokensComplete: true,
};

/** Mount real token cards with the requested locale and Analytics route messages. */
function renderCards(
  value: AnalyticsTokenSummary,
  displayMode: "compact" | "exact" = "exact",
  locale = "en"
) {
  return render(
    <NextIntlClientProvider
      locale={locale}
      timeZone="UTC"
      messages={pickMessages(locale === "fa" ? fa : en, namespaces.sections.analytics)}
      onError={(error) => {
        throw error;
      }}
    >
      <TokenBreakdownCards summary={value} displayMode={displayMode} />
    </NextIntlClientProvider>
  );
}

/** Find a card value by its translated group label and exact accessible count. */
function count(label: string, value: string) {
  const group = screen.getByRole("group", { name: label });
  return within(group).getByLabelText(value);
}

describe("Analytics token cards", () => {
  it("shows five distinct values, with cache included exactly once", () => {
    renderCards(summary);
    for (const [label, value] of [
      ["Total Tokens", "11,000"],
      ["Total Input Tokens", "10,000"],
      ["Input Tokens", "4,000"],
      ["Cached Input Tokens", "6,000"],
      ["Output Tokens", "1,000"],
    ]) {
      expect(count(label, value).textContent).toBe(value);
    }
    expect(screen.queryByText("17,000")).toBeNull();
    expect(
      within(screen.getByRole("group", { name: "Total Tokens" })).getByText(
        `19,433 ${en.analytics.chartRequests}`
      )
    ).toBeTruthy();
    const input = screen.getByRole("group", { name: "Input Tokens" }).querySelector("dd")!;
    expect(document.getElementById(input.getAttribute("aria-describedby")!)?.textContent).toBe(
      en.analytics.inputTokensHint
    );
  });

  it("keeps card labels and descriptions distinct and retains a measured zero request count", () => {
    renderCards({ ...summary, totalRequests: 0 });
    const groups = screen.getAllByRole("group");
    const labelIds = groups.map((group) => group.getAttribute("aria-labelledby"));
    expect(new Set(labelIds).size).toBe(5);
    for (const group of groups) {
      const label = document.getElementById(group.getAttribute("aria-labelledby")!);
      expect(group.contains(label)).toBe(true);
      const descriptionId = group.querySelector("dd")!.getAttribute("aria-describedby");
      if (descriptionId) expect(group.contains(document.getElementById(descriptionId))).toBe(true);
    }
    expect(screen.getAllByText(`0 ${en.analytics.chartRequests}`)).toHaveLength(1);
    expect(
      within(screen.getByRole("group", { name: "Total Tokens" })).getByText(
        `0 ${en.analytics.chartRequests}`
      )
    ).toBeTruthy();
    expect(
      screen
        .getByRole("group", { name: "Output Tokens" })
        .querySelector("dd")!
        .hasAttribute("aria-describedby")
    ).toBe(false);
  });

  it.each([null, undefined])("omits an unknown request count (%s)", (totalRequests) => {
    renderCards({ ...summary, totalRequests });
    expect(screen.queryByText(new RegExp(en.analytics.chartRequests))).toBeNull();
  });

  it("retains exact accessible counts and keyboard tooltip triggers in compact mode", () => {
    renderCards(summary, "compact");
    const input = count("Input Tokens", "4,000");
    expect(input.textContent).toBe("4.0K");
    expect(input.getAttribute("tabindex")).toBe("0");
    expect(count("Cached Input Tokens", "6,000").textContent).toBe("6.0K");
  });

  it.each([null, undefined])(
    "does not show missing cache metadata as zero (%s)",
    (cachedInputTokens) => {
      renderCards({ ...summary, cachedInputTokens });
      expect(count("Input Tokens", en.common.noData).textContent).toBe(en.common.noData);
      expect(count("Cached Input Tokens", en.common.noData).textContent).toBe(en.common.noData);
      expect(count("Total Input Tokens", "10,000")).toBeTruthy();
      expect(screen.getByText(en.analytics.inputSplitUnavailable)).toBeTruthy();
    }
  );

  it("retains a partial cache subtotal without claiming exact uncached input", () => {
    renderCards({ ...summary, cachedInputTokensComplete: false });
    expect(count("Cached Input Tokens", "6,000+ (Partial)").textContent).toBe("6,000+ (Partial)");
    expect(count("Input Tokens", en.common.noData)).toBeTruthy();
    expect(count("Total Tokens", "11,000")).toBeTruthy();
  });

  it("shows measured zero but does not clamp contradictory provider counts", () => {
    const view = renderCards({ ...summary, cachedInputTokens: 10_000 });
    expect(count("Input Tokens", "0").textContent).toBe("0");
    view.unmount();
    renderCards({ ...summary, cachedInputTokens: 12_000 });
    expect(count("Input Tokens", en.common.noData)).toBeTruthy();
    expect(count("Cached Input Tokens", "12,000")).toBeTruthy();
    expect(screen.getByText(en.analytics.inputSplitUnavailable)).toBeTruthy();
  });

  it("renders Persian labels and explanations from actual Analytics route messages", () => {
    renderCards(summary, "exact", "fa");
    expect(count(fa.stats.totalInputTokens, "10,000")).toBeTruthy();
    expect(count(fa.analytics.cachedInputTokens, "6,000")).toBeTruthy();
    expect(screen.getByText(fa.analytics.inputTokensHint)).toBeTruthy();
    expect(screen.queryByText("analytics.cachedInputTokens")).toBeNull();
  });
});
