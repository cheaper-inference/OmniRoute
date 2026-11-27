// @vitest-environment jsdom
// Regression for #20453: /api/usage/analytics now returns one byModel row per
// (provider, model), so the Costs "Top Models" card can receive two rows with the same
// model name. Keying the rows by the model name alone produced duplicate React keys
// and two indistinguishable rows; the provider must take part in the key and the label.
//
// Lives under tests/unit/ui/ for the same reason as the #7272 TopListCard test: the
// component's import chain pulls ESM-only icon packages that node:test cannot load.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

const { TopListCard } =
  await import("../../../src/app/(dashboard)/dashboard/costs/components/TopListCard");

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

async function render(props: Record<string, unknown>) {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement("div");
  document.body.appendChild(container);
  await act(async () => {
    root = createRoot(container!);
    root.render(React.createElement(TopListCard, props));
  });
}

describe("TopListCard per-provider model rows (#20453)", () => {
  afterEach(() => {
    if (root && container) act(() => root!.unmount());
    container?.remove();
    container = null;
    root = null;
    vi.restoreAllMocks();
  });

  it("keys and labels rows that share a model name by their provider", async () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    const rows = [
      { model: "gpt-oss-120b", provider: "cloudflare-ai", cost: 2.5, totalTokens: 1000 },
      { model: "gpt-oss-120b", provider: "groq", cost: 1.25, totalTokens: 500 },
    ];

    await render({
      title: "Top Models",
      rows,
      nameKey: "model",
      qualifierKey: "provider",
      valueKey: "cost",
      secondaryKey: "totalTokens",
      secondaryLabel: "tokens",
      locale: "en",
      hasCostData: true,
      legacyFreeLabel: "Legacy / Free",
    });

    const duplicateKeyWarnings = consoleError.mock.calls.filter((call) =>
      call.some((arg) => String(arg).includes("same key"))
    );
    expect(duplicateKeyWarnings).toEqual([]);
    expect(container?.textContent).toContain("cloudflare-ai");
    expect(container?.textContent).toContain("groq");
  });
});
