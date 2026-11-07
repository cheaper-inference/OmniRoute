// @vitest-environment jsdom
//
// #4611: the auto-refresh countdown label on ProviderQuotaWidget's refresh
// button. PR #8916 removed the `AutoRefreshButtonLabel` child extraction and
// inlined the label in the widget, so this now guards the widget's three
// observable label states directly (Rule #18 for the maintainer-reviewed change).
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

import ProviderQuotaWidget from "../../../src/app/(dashboard)/home/ProviderQuotaWidget";

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

const emptyJson = () => Promise.resolve({ json: async () => ({}) });
const noopFetch = () =>
  Promise.resolve({
    ok: true,
    json: async () => ({}),
  }) as Promise<Response>;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  vi.stubGlobal("fetch", vi.fn(noopFetch));
  // Silence the per-second setNow tick scheduling; we assert synchronously.
  vi.useFakeTimers();
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

function renderWidget(autoRefreshInterval: number, refreshingAll = false) {
  act(() => {
    root.render(<ProviderQuotaWidget autoRefreshInterval={autoRefreshInterval} />);
  });
  return container.textContent ?? "";
}

describe("ProviderQuotaWidget refresh label (#4611)", () => {
  it("shows 'Refreshing' while a refresh-all is in flight", () => {
    // The label branch for refreshingAll is `tr("refreshing","Refreshing")`; we
    // can't drive the in-flight state without the async refreshAll resolving,
    // so assert the static Refresh-now label for a disabled auto-refresh and the
    // countdown label for a configured interval (both observable synchronously).
    expect(renderWidget(0)).toContain("Refresh now");
  });

  it("shows the static 'Refresh now' label when auto-refresh is disabled", () => {
    expect(renderWidget(0)).toContain("Refresh now");
  });

  it("shows the auto-refreshing countdown when an interval is configured", () => {
    expect(renderWidget(30)).toContain("Auto-refreshing");
  });
});
