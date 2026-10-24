// @vitest-environment jsdom
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import UsageAnalytics from "@/shared/components/UsageAnalytics";

vi.unmock("next-intl");

vi.mock("@/shared/components/analytics", async (original) => {
  const actual = await original<Record<string, unknown>>();
  return Object.fromEntries(
    Object.entries(actual).map(([name, component]) => [
      name,
      name === "StatCard" ? component : () => null,
    ])
  );
});
import { NextIntlClientProvider } from "next-intl";
import messages from "@/i18n/messages/en.json";
import namespaces from "@/i18n/routeNamespaces.generated.json";
import { pickMessages } from "@/i18n/pickMessages";
import CachedInputTokens from "@/shared/components/CachedInputTokens";
import UsageOverview from "@/shared/components/UsageOverview";
import { ModelTable } from "@/shared/components/analytics/ModelTable";

function renderUsage(children: React.ReactNode) {
  return renderToStaticMarkup(
    <NextIntlClientProvider
      locale="en"
      timeZone="UTC"
      messages={pickMessages(messages, namespaces.sections.usage)}
      onError={(error) => {
        throw error;
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}

describe("provider cached input reporting", () => {
  it("active analytics page displays cached input from its actual API payload", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              summary: {
                totalRequests: 1,
                totalTokens: 110,
                promptTokens: 100,
                completionTokens: 10,
                totalCost: 0,
                cachedInputTokens: 60,
                cachedInputTokensComplete: false,
              },
              byModel: [],
              byAccount: [],
              byApiKey: [],
              byProvider: [],
              dailyTrend: [],
              activityMap: {},
              byServiceTier: [],
              weeklyTokens: [],
              weeklyCounts: [],
              weeklyPattern: [],
            }),
            { status: 200, headers: { "content-type": "application/json" } }
          )
      )
    );
    try {
      render(
        <NextIntlClientProvider
          locale="en"
          timeZone="UTC"
          messages={pickMessages(messages, namespaces.sections.analytics)}
          onError={(error) => {
            throw error;
          }}
        >
          <UsageAnalytics />
        </NextIntlClientProvider>
      );
      const cache = await screen.findByTestId("cached-input-tokens", {}, { timeout: 700 });
      expect(cache.textContent).toContain("Cache Read Tokens: 60+ (Partial)");
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/api/usage/analytics?"));
    } finally {
      cleanup();
      vi.unstubAllGlobals();
    }
  }, 1_000);
  it("renders recorded cache reads separately from original input and output", () => {
    const html = renderUsage(
      <UsageOverview
        stats={{
          totalRequests: 1,
          totalPromptTokens: 100,
          totalCompletionTokens: 10,
          totalCost: 0,
          totalCachedInputTokens: 60,
          totalCachedInputTokensComplete: true,
          last10Minutes: [],
        }}
      />
    );
    expect(html).toContain("Total Input Tokens");
    expect(html).toContain(">100<");
    expect(html).toContain("Cache Read Tokens");
    expect(html).toContain("60");
    expect(html).toContain(messages.stats.outputTokens);
    expect(html).not.toContain(">160<");
  }, 1_000);

  it("model table preserves legacy input cells but renders measured and explicitly unknown cache fields", () => {
    const base = {
      model: "fixture-model",
      requests: 1,
      promptTokens: 100,
      completionTokens: 10,
      totalTokens: 110,
      cost: 0,
    };
    const legacy = renderUsage(<ModelTable byModel={[base]} />);
    const known = renderUsage(
      <ModelTable byModel={[{ ...base, cachedInputTokens: 60, cachedInputTokensComplete: true }]} />
    );
    const unknown = renderUsage(
      <ModelTable
        byModel={[{ ...base, cachedInputTokens: null, cachedInputTokensComplete: false }]}
      />
    );
    expect(legacy).not.toContain("cached-input-tokens");
    expect(known).toContain("Cache Read Tokens");
    expect(known).toContain("60");
    expect(unknown).toContain("No data available");
  }, 1_000);

  it("does not display missing historical cache counts as measured zero", () => {
    const unknown = renderUsage(<CachedInputTokens value={null} complete={false} />);
    const partial = renderUsage(<CachedInputTokens value={60} complete={false} />);
    expect(unknown).toContain("No data available");
    expect(unknown).not.toContain(": 0");
    expect(partial).toContain("60");
    expect(partial).toContain("(Partial)");
  }, 1_000);
});
