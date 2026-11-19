// @vitest-environment jsdom
// Review of 2026-11-15, defect 6 (finding A5-02): an overflowing kit Table container joins the
// tab order, and it is a named `region` only when the table has a name. 50 hand-assembled
// tables had none: a screen reader announced the stop with no name. They now pass
// `scrollLabel`. The static guard tests/unit/kit-tables-have-accessible-name.test.ts covers
// every table; this file renders a sample, with the real English catalog (the default
// next-intl mock of tests/_setup/vitestUiPolyfills.ts), including the tables that needed a
// label of their own.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import en from "../../../src/i18n/messages/en.json";
import { EncoderComparisonTable } from "@/app/(dashboard)/dashboard/compression/studio/EncoderComparisonTable";
import CursorModelUsageTable from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/CursorModelUsageTable";
import MarkdownMessage from "@/app/(dashboard)/dashboard/playground/components/MarkdownMessage";
import { HeaderTable } from "@/app/(dashboard)/dashboard/tools/traffic-inspector/components/shared/HeaderTable";

let container: HTMLElement;
let root: Root;

beforeEach(() => {
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  // jsdom has no layout: make every box report a table wider than its container (phone width).
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(900);
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(358);
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});

function renderScroller(ui: React.ReactElement) {
  act(() => root.render(ui));
  const scroller = container.querySelector<HTMLElement>("[data-slot='table-container']");
  expect(scroller, "the kit table container").not.toBeNull();
  return scroller!;
}

function expectNamedScrollRegion(scroller: HTMLElement, name: string) {
  expect(scroller.dataset.overflowing).toBe("true");
  expect(scroller.tabIndex).toBe(0);
  expect(scroller.getAttribute("role")).toBe("region");
  expect(scroller.getAttribute("aria-label")).toBe(name);
}

describe("hand-assembled kit tables name their overflowing scroll container", () => {
  it("a table that already had a translated scrollbar label reuses it", () => {
    const scroller = renderScroller(<HeaderTable headers={{ accept: "application/json" }} />);
    expectNamedScrollRegion(scroller, en.trafficInspector.headersTable);
  });

  it("the encoder comparison is named by its heading", () => {
    const scroller = renderScroller(
      <EncoderComparisonTable
        comparison={{
          arraysCompared: 2,
          json: { bytes: 400, tokens: 120 },
          gcf: { bytes: 150, tokens: 40 },
          toon: { bytes: 170, tokens: 48 },
          toonAvailable: true,
          winner: "gcf",
        }}
      />
    );
    expectNamedScrollRegion(scroller, "Encoder A/B — 2 array(s)");
  });

  it("the Cursor model usage table is named by its heading", () => {
    const scroller = renderScroller(
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
    expectNamedScrollRegion(scroller, "API tokens (this cycle)");
  });

  it("a markdown table, which has no title, takes the generic label", () => {
    const scroller = renderScroller(
      <MarkdownMessage content={"| a | b |\n| --- | --- |\n| 1 | 2 |"} />
    );
    expect(en.common.table).toBe("Table");
    expectNamedScrollRegion(scroller, "Table");
  });
});

describe("labels created for tables that had no text to reuse", () => {
  it("exist in the English catalog", () => {
    expect(en.common.table).toBe("Table");
    expect(en.providerStats.modelsTable).toBe("Models for {provider}");
  });
});
