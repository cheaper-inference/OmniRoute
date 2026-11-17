import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import QuotaCardExpanded from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";
import CursorModelUsageTable from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/CursorModelUsageTable";

vi.mock("next-intl", () => ({
  useLocale: () => "en-US",
  useTranslations: () => Object.assign((key: string) => key, { has: () => false }),
}));

const QUOTAS = [
  {
    name: "API",
    used: 0.63,
    total: 20,
    remainingPercentage: 96.8,
    resetAt: "2099-09-10T16:00:00Z",
    unlimited: false,
  },
];

const MODEL_USAGE = [
  {
    model: "claude-4.6-sonnet-medium-thinking",
    inputTokens: 1000,
    outputTokens: 500,
    cacheReadTokens: 2000,
    cacheWriteTokens: 100,
    costUsd: 0.505,
  },
  {
    model: "composer-2.5",
    inputTokens: 4861279,
    outputTokens: 726233,
    cacheReadTokens: 87013884,
    cacheWriteTokens: 0,
    costUsd: 21.6769,
  },
];

function renderCard(props: Record<string, unknown>) {
  const root = document.createElement("div");
  root.innerHTML = renderToStaticMarkup(
    <QuotaCardExpanded
      quotas={QUOTAS}
      providerId="cursor"
      loading={false}
      error={null}
      hasStaleData={false}
      onRefresh={() => {}}
      onOpenCutoff={() => {}}
      onOpenCost={() => {}}
      canEditCutoff={false}
      hasCutoffOverrides={false}
      {...props}
    />
  );
  return root;
}

describe("Cursor per-model usage table on the Quota card", () => {
  it("renders per-model tokens and Cursor-billed cost, most expensive first", () => {
    const root = renderCard({ cursorModelUsage: MODEL_USAGE });
    const table = root.querySelector("[data-testid='cursor-model-usage']");
    expect(table).not.toBeNull();
    expect(table?.textContent).toContain("API tokens (this cycle)");
    expect(table?.textContent).toContain("Billed by Cursor");
    const rows = [...(table?.querySelectorAll("tbody tr") ?? [])];
    expect(rows.map((row) => row.querySelector("td")?.textContent)).toEqual([
      "composer-2.5",
      "claude-4.6-sonnet-medium-thinking",
    ]);
    const firstCells = [...rows[0].querySelectorAll("td")].map((td) => td.textContent);
    expect(firstCells).toEqual(["composer-2.5", "4.9M", "726K", "87M", "0", "$21.68"]);
    const secondCells = [...rows[1].querySelectorAll("td")].map((td) => td.textContent);
    expect(secondCells).toEqual([
      "claude-4.6-sonnet-medium-thinking",
      "1.0K",
      "500",
      "2.0K",
      "100",
      "$0.51",
    ]);
    // The % bars keep rendering above the table.
    expect(root.querySelector('[title="API"]')).not.toBeNull();
  });

  it("keeps the card exactly as before when the aggregate call failed (no rows)", () => {
    const withoutRows = renderCard({}).innerHTML;
    expect(renderCard({ cursorModelUsage: undefined }).innerHTML).toBe(withoutRows);
    expect(renderCard({ cursorModelUsage: [] }).innerHTML).toBe(withoutRows);
    expect(renderCard({ cursorModelUsage: "garbage" }).innerHTML).toBe(withoutRows);
    expect(withoutRows).not.toContain("cursor-model-usage");
    expect(withoutRows).toContain("API");
  });

  it("does not render the table for other providers or while the card shows an error", () => {
    expect(
      renderCard({ providerId: "claude", cursorModelUsage: MODEL_USAGE }).querySelector(
        "[data-testid='cursor-model-usage']"
      )
    ).toBeNull();
    expect(
      renderCard({ error: "boom", cursorModelUsage: MODEL_USAGE }).querySelector(
        "[data-testid='cursor-model-usage']"
      )
    ).toBeNull();
  });

  it("formats tiny costs and skips malformed rows", () => {
    const root = document.createElement("div");
    root.innerHTML = renderToStaticMarkup(
      <CursorModelUsageTable
        rows={[
          {
            model: "tiny",
            inputTokens: 3,
            outputTokens: 0,
            cacheReadTokens: 0,
            cacheWriteTokens: 0,
            costUsd: 0.0042,
          },
          {
            model: "",
            inputTokens: 1,
            outputTokens: 1,
            cacheReadTokens: 1,
            cacheWriteTokens: 1,
            costUsd: 9,
          },
          null,
        ]}
      />
    );
    const rows = [...root.querySelectorAll("tbody tr")];
    expect(rows).toHaveLength(1);
    expect(rows[0].textContent).toContain("$0.0042");
  });
});
