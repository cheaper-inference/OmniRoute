// @vitest-environment jsdom
/**
 * Review of 2026-11-15, defect 15 (finding A5-07): double frames the AST guard could not see.
 * The guard (tests/unit/datatable-not-framed-inside-card.test.ts) now treats a card made by
 * hand as a frame and follows components at any depth below a frame. This file renders two of
 * the tables fixed that way and checks the kit container itself:
 *
 * - EncoderComparisonTable draws its own card (a bordered, rounded `section`) around the table.
 * - CursorModelUsageTable sits in the Card of QuotaCard, two imports above it.
 */
import React from "react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { EncoderComparisonTable } from "@/app/(dashboard)/dashboard/compression/studio/EncoderComparisonTable";
import CursorModelUsageTable from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/CursorModelUsageTable";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

afterEach(() => cleanup());

function expectBorderlessTable(container: HTMLElement) {
  const tableContainer = container.querySelector("[data-slot=table-container]");
  expect(tableContainer).not.toBeNull();
  expect(tableContainer!.className).toContain("border-0");
  expect(tableContainer!.className).toContain("rounded-none");
}

describe("tables inside a frame the guard could not see draw no frame of their own", () => {
  it("encoder comparison: the bordered section is the only frame", () => {
    const { container } = render(
      <EncoderComparisonTable
        comparison={{
          arraysCompared: 1,
          json: { bytes: 400, tokens: 120 },
          gcf: { bytes: 150, tokens: 40 },
          toon: { bytes: 170, tokens: 48 },
          toonAvailable: true,
          winner: "gcf",
        }}
      />
    );
    const card = container.querySelector("[data-testid=encoder-comparison]");
    expect(card?.className).toContain("border");
    expectBorderlessTable(container);
  });

  it("Cursor model usage: the quota Card is the only frame", () => {
    const { container } = render(
      <CursorModelUsageTable
        rows={[
          {
            model: "composer-2.5",
            inputTokens: 10,
            outputTokens: 5,
            cacheReadTokens: 0,
            cacheWriteTokens: 0,
            costUsd: 0.01,
          },
        ]}
      />
    );
    expectBorderlessTable(container);
    // The native horizontal scroller of the container is kept.
    expect(container.querySelector("[data-slot=table-container]")!.className).toContain(
      "overflow-x-auto"
    );
  });
});
