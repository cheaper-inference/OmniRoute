// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelSelectModal from "@/shared/components/ModelSelectModal";

// zed-hosted ships `models: []` and is discovered live per connection. The combo
// picker must render the live catalog, the same way it already does for custom
// compatible nodes, instead of omitting the provider group.

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];
let customModelsPayload: Record<string, unknown> = {};
let hiddenPayload: Record<string, string[]> = {};
const requestedUrls: string[] = [];

async function render(props: React.ComponentProps<typeof ModelSelectModal>): Promise<HTMLElement> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<ModelSelectModal {...props} />);
  });
  roots.push({ root, el });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
  // The dialog is portaled into document.body.
  return document.body;
}

beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  customModelsPayload = {};
  hiddenPayload = {};
  requestedUrls.length = 0;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      requestedUrls.push(url);
      if (url.includes("/api/combos"))
        return new Response(JSON.stringify({ combos: [] }), { status: 200 });
      if (url.includes("/api/provider-nodes"))
        return new Response(JSON.stringify({ nodes: [] }), { status: 200 });
      if (url.includes("/api/provider-models")) {
        return new Response(
          JSON.stringify({ models: customModelsPayload, hiddenModelsByProvider: hiddenPayload }),
          { status: 200 }
        );
      }
      if (url.includes("/api/providers/zed-conn/models")) {
        return new Response(
          JSON.stringify({
            models: [
              { id: "claude-sonnet-5-5", name: "Zed Claude Sonnet" },
              { id: "gpt-6-sol", name: "Zed GPT Sol" },
            ],
          }),
          { status: 200 }
        );
      }
      return new Response(JSON.stringify({}), { status: 200 });
    })
  );
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

const baseProps = {
  isOpen: true,
  onClose: () => {},
  onSelect: () => {},
  activeProviders: [{ provider: "zed-hosted", id: "zed-conn" }],
  modelAliases: {},
  title: "Add model to combo",
};

describe("ModelSelectModal — zed-hosted live catalog (#5199 port)", () => {
  it("fetches the zed-hosted connection's live models and lists them", async () => {
    const el = await render({ ...baseProps, onClose: vi.fn(), onSelect: vi.fn() });

    expect(requestedUrls.some((url) => url.includes("/api/providers/zed-conn/models"))).toBe(true);
    expect(el.textContent).toContain("Zed Hosted Models");
    expect(el.textContent).toContain("Zed Claude Sonnet");
    expect(el.textContent).toContain("Zed GPT Sol");
  });

  it("selects a live model under the zed-hosted prefix", async () => {
    const onSelect = vi.fn();
    const el = await render({ ...baseProps, onClose: vi.fn(), onSelect });

    const button = Array.from(el.querySelectorAll("button")).find((b) =>
      (b.textContent || "").includes("Zed GPT Sol")
    );
    expect(button).toBeTruthy();
    await act(async () => {
      button!.click();
    });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toMatchObject({
      value: "zed-hosted/gpt-6-sol",
      source: "auto",
    });
  });

  it("keeps a custom row over the live duplicate and drops hidden live models", async () => {
    customModelsPayload = {
      "zed-hosted": [{ id: "claude-sonnet-5-5", name: "My Custom Sonnet" }],
    };
    hiddenPayload = { "zed-hosted": ["gpt-6-sol"] };

    const el = await render({ ...baseProps, onClose: vi.fn(), onSelect: vi.fn() });

    expect(el.textContent).toContain("My Custom Sonnet");
    expect(el.textContent).not.toContain("Zed Claude Sonnet");
    expect(el.textContent).not.toContain("Zed GPT Sol");
  });
});
