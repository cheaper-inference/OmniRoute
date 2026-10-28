// @vitest-environment jsdom
/**
 * F4 (KEA-7886): the category chips' "configured/total" count on /dashboard/providers. The
 * "/total" part used to sit at opacity-70 on top of text-text-muted — 3.28:1 on the kit button
 * (14 axe color-contrast nodes). It must keep the muted token ink at full opacity.
 */
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProviderSummaryCard, {
  type ProviderSummaryStats,
} from "@/app/(dashboard)/dashboard/providers/components/ProviderSummaryCard";

vi.mock("next-intl", () => ({ useTranslations: () => (k: string) => k }));

const stat = { configured: 2, total: 9 };
const stats = Object.fromEntries(
  [
    "all",
    "free",
    "noauth",
    "oauth",
    "apikey",
    "compatible",
    "webcookie",
    "search",
    "audio",
    "local",
    "upstreamproxy",
    "cloudagent",
    "ide",
    "webfetch",
  ].map((k) => [k, stat])
) as unknown as ProviderSummaryStats;

const t = Object.assign((k: string) => k, { has: () => false });

afterEach(cleanup);

describe("ProviderSummaryCard category counts", () => {
  it("renders the /total part without an opacity utility", () => {
    const { container } = render(
      <ProviderSummaryCard
        activeCategory={null}
        activeServiceKind={null}
        onServiceKindChange={() => {}}
        disabledConfigured={false}
        displayMode={"grid" as never}
        modelSearchQuery=""
        onBatchTest={() => {}}
        onCategoryChange={() => {}}
        onDisplayModeChange={() => {}}
        onNewProvider={() => {}}
        onImportFromFile={() => {}}
        searchQuery=""
        setModelSearchQuery={() => {}}
        setSearchQuery={() => {}}
        showFreeOnly={false}
        summaryStats={stats}
        t={t}
        tc={t}
        testingMode={null}
      />
    );
    const chips = [...container.querySelectorAll<HTMLButtonElement>("button[aria-pressed]")].filter(
      (b) => /2\/9/.test(b.textContent ?? "")
    );
    expect(chips.length).toBeGreaterThan(5);
    for (const chip of chips) {
      const total = [...chip.querySelectorAll("span")].find((s) => s.textContent === "/9");
      expect(total, "the /total span is rendered").toBeTruthy();
      expect(total!.className).not.toMatch(/\bopacity-/);
      expect(total!.closest("[class*='opacity-']")).toBeNull();
      expect(total!.closest(".text-text-muted")).toBeTruthy();
    }
  });
});
