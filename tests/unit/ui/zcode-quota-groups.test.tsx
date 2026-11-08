import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));
import QuotaCardExpanded from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";

function render(
  quotaGroups: Array<Record<string, unknown>>,
  loading = false,
  providerId = "zcode"
) {
  return renderToStaticMarkup(
    <QuotaCardExpanded
      providerId={providerId}
      quotas={[]}
      quotaGroups={quotaGroups}
      loading={loading}
      error={null}
      hasStaleData={false}
      canEditCutoff={false}
      hasCutoffOverrides={false}
      onRefresh={() => {}}
      onOpenCutoff={() => {}}
      onOpenCost={() => {}}
    />
  );
}

describe("ZCode account quota groups", () => {
  it("shows both plans, their own quotas and observation time while refreshing", () => {
    const html = render(
      [
        {
          plan: "start",
          status: "available",
          observedAt: "2026-11-07T17:59:10.000Z",
          quotas: {
            tokens: { used: 50, total: 100, remainingPercentage: 50, displayName: "Tokens" },
          },
        },
        {
          plan: "individual",
          status: "available",
          observedAt: "2026-11-07T17:59:12.000Z",
          quotas: {
            session: {
              used: 20,
              total: 100,
              remainingPercentage: 80,
              displayName: "5 Hours Quota",
            },
          },
        },
      ],
      true
    );
    expect(html).toContain("Start");
    expect(html).toContain("Individual");
    expect(html).toContain("Tokens");
    expect(html).toContain("5 Hours Quota");
    expect(html).toContain("50%");
    expect(html).toContain("80%");
    expect(html).toContain("2026-11-07T17:59:10.000Z");
  });
  it("deduplicates plan groups and supports Chinese tariff namespaces", () => {
    const group = { plan: "start", status: "unknown", observedAt: null, quotas: {} };
    const html = render([group, { ...group }], false, "zcode-cn-start");
    expect(html.match(/aria-label="Start"/g)).toHaveLength(1);
  });
  it("renders unknown separately and never claims zero quota", () => {
    const html = render([
      { plan: "start", status: "unknown", observedAt: null, quotas: {} },
      { plan: "individual", status: "unknown", observedAt: null, quotas: {} },
    ]);
    expect(html).toContain("Start");
    expect(html).toContain("Individual");
    expect(html).toContain("No quota data");
    expect(html).not.toContain("0% left");
  });
});
