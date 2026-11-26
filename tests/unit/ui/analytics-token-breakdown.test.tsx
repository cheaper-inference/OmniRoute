// @vitest-environment jsdom
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";
import TokenBreakdownCards from "@/shared/components/analytics/TokenBreakdownCards";
import type { AnalyticsTokenSummary } from "@/shared/utils/analyticsTokenBreakdown";
import en from "@/i18n/messages/en.json";
import fa from "@/i18n/messages/fa.json";
import namespaces from "@/i18n/routeNamespaces.generated.json";
import { pickMessages } from "@/i18n/pickMessages";
import { deepMergeFallback } from "@/i18n/request";

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
      messages={pickMessages(
        locale === "fa" ? deepMergeFallback(structuredClone(fa), en) : en,
        namespaces.sections.analytics
      )}
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

  it("uses the dashboard type scale for token labels and values", () => {
    renderCards(summary);
    for (const group of screen.getAllByRole("group")) {
      expect(group.querySelector("dt")?.classList.contains("text-xs")).toBe(true);
      const value = group.querySelector("dd [tabindex]")!;
      expect(value.classList.contains("font-semibold")).toBe(true);
      expect(value.classList.contains("font-bold")).toBe(false);
    }
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

  it("labels the exact known fresh-input subtotal as partial", () => {
    renderCards({ ...summary, cachedInputTokensComplete: false, knownFreshInputTokens: 550 });
    expect(count("Input Tokens", "550+ (Partial)").textContent).toBe("550+ (Partial)");
    expect(count("Total Input Tokens", "10,000")).toBeTruthy();
    expect(screen.queryByText(en.analytics.inputSplitUnavailable)).toBeNull();
  });

  it("shows only the known fresh-input subtotal when stored cache reads are missing and invalid", async () => {
    const dataDir = mkdtempSync(join(tmpdir(), "analytics-token-cards-"));
    vi.stubEnv("DATA_DIR", dataDir);
    const { getDbInstance, resetDbInstance } = await import("@/lib/db/core");
    try {
      const insert = getDbInstance().prepare(`
        INSERT INTO usage_history
          (provider, model, timestamp, tokens_input, tokens_output, tokens_cache_read)
        VALUES ('fixture', 'fixture-model', ?, ?, 0, ?)
      `);
      const timestamp = new Date().toISOString();
      insert.run(timestamp, 100, 20);
      insert.run(timestamp, 10, 30);
      insert.run(timestamp, 100, null);

      const { getCachedInputAnalytics } = await import("@/lib/db/cachedInputAnalytics");
      const { buildUnifiedSource, getUsageSummary } = await import("@/lib/db/usageAnalytics");
      const options = {
        sinceIso: null,
        untilIso: null,
        rawCutoffDate: timestamp.slice(0, 10),
        apiKeyWhere: "",
        apiKeyParams: {},
      };
      const { unifiedSource, unifiedParams } = buildUnifiedSource(options);
      const summary = {
        ...getUsageSummary(unifiedSource, unifiedParams),
        ...getCachedInputAnalytics(options).summary,
      };
      expect(summary).toMatchObject({
        promptTokens: 210,
        cachedInputTokens: 50,
        cachedInputTokensComplete: false,
        knownFreshInputTokens: 80,
      });

      renderCards(summary);
      expect(count("Input Tokens", "80+ (Partial)").textContent).toBe("80+ (Partial)");
      expect(count("Total Input Tokens", "210")).toBeTruthy();
      const input = screen.getByRole("group", { name: "Input Tokens" });
      expect(input.querySelector("dd")).toHaveAccessibleDescription(en.analytics.inputTokensHint);
    } finally {
      resetDbInstance();
      vi.unstubAllEnvs();
      rmSync(dataDir, { recursive: true, force: true });
    }
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

  it("preserves Persian labels and uses the production English fallback for untranslated keys", () => {
    const localized = deepMergeFallback(structuredClone(fa), en) as typeof en;
    renderCards(summary, "exact", "fa");
    expect(fa.stats.totalInputTokens).not.toBe(en.stats.totalInputTokens);
    expect(count(fa.stats.totalInputTokens, "10,000")).toBeTruthy();
    expect(count(localized.analytics.cachedInputTokens, "6,000")).toBeTruthy();
    expect(screen.getByText(localized.analytics.inputTokensHint)).toBeTruthy();
    expect(screen.queryByText("analytics.cachedInputTokens")).toBeNull();
  });
});

describe("partial input description", () => {
  const partial = {
    promptTokens: 1800,
    cachedInputTokens: 400,
    knownFreshInputTokens: 550,
    cachedInputTokensComplete: false,
  };
  it.each(["exact", "compact"] as const)("describes the measured subtotal in %s mode", (mode) => {
    renderCards({ ...partial, promptTokens: 2950, knownFreshInputTokens: 1550 }, mode);
    const input = screen.getByRole("group", { name: "Input Tokens" });
    expect(count("Input Tokens", "1,550+ (Partial)").textContent).toBe(
      mode === "exact" ? "1,550+ (Partial)" : "1.6K+ (Partial)"
    );
    expect(input.querySelector("dd")).toHaveAccessibleDescription(en.analytics.inputTokensHint);
  });
  it.each([
    { ...partial, cachedInputTokensComplete: true },
    { ...partial, cachedInputTokens: 1250 },
    { ...partial, cachedInputTokens: 1300 },
    { ...partial, cachedInputTokens: null },
    { ...partial, knownFreshInputTokens: 0 },
  ])("omits the numeric remainder for incomplete or exact splits (%j)", (value) => {
    renderCards(value);
    expect(screen.queryByText(/not split \(cache read unknown\)/)).toBeNull();
  });
});
