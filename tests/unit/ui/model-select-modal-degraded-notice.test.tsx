// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelSelectModal from "@/shared/components/ModelSelectModal";

// The global UI polyfill backs `useTranslations` with the real `en.json`.

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];
const PROVIDER = "openai-compatible-local";

async function render(
  props: React.ComponentProps<typeof ModelSelectModal>
): Promise<HTMLDivElement> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<ModelSelectModal {...props} />);
  });
  roots.push({ root, el });
  return el;
}

function stubModelsFetch(payload: Record<string, unknown>) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/combos"))
        return new Response(JSON.stringify({ combos: [] }), { status: 200 });
      if (url.includes("/api/provider-nodes"))
        return new Response(JSON.stringify({ nodes: [] }), { status: 200 });
      if (url.includes("/api/provider-models"))
        return new Response(
          JSON.stringify({
            models: { [PROVIDER]: [{ id: "custom-1", name: "Custom One" }] },
            modelCompatOverrides: [],
          }),
          { status: 200 }
        );
      if (url.includes(`/api/providers/conn-1/models`)) {
        return new Response(JSON.stringify(payload), { status: 200 });
      }
      return new Response(JSON.stringify({}), { status: 200 });
    })
  );
}

function baseProps() {
  return {
    isOpen: true,
    onClose: vi.fn(),
    onSelect: vi.fn(),
    activeProviders: [{ provider: PROVIDER, id: "conn-1" }] as never,
    modelAliases: {},
  };
}

beforeEach(() => {
  (globalThis as unknown as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ModelSelectModal fallback catalog notice", () => {
  it("signals that the list comes from the fallback catalog, with the reason", async () => {
    stubModelsFetch({
      models: [
        { id: "m1", name: "Model One" },
        { id: "m2", name: "Model Two" },
      ],
      source: "local_catalog",
      warning: "API unavailable — using local catalog",
      degraded: true,
      error: "HTTP 500",
    });

    await render(baseProps());

    // The dialog content is portaled to document.body by the kit Dialog, so the
    // notice is asserted against the document, not the mount container.
    const body = document.body;
    expect(body.querySelector('[data-testid="discovery-degraded-notice"]')).not.toBeNull();
    expect(body.textContent).toContain("Couldn't reach the provider's model list");
    expect(body.querySelector('[data-testid="discovery-degraded-cause"]')?.textContent).toBe(
      "HTTP 500"
    );
  });

  it("shows nothing when the list is the provider's own", async () => {
    stubModelsFetch({
      models: [
        { id: "m1", name: "Model One" },
        { id: "m2", name: "Model Two" },
      ],
      source: "api",
    });

    await render(baseProps());

    expect(document.body.querySelector('[data-testid="discovery-degraded-notice"]')).toBeNull();
  });

  it("keeps the reason when the fallback catalog holds a single row", async () => {
    stubModelsFetch({
      models: [{ id: "m1", name: "Model One" }],
      source: "local_catalog",
      warning: "API unavailable — using local catalog",
      degraded: true,
      error: "HTTP 500",
    });

    await render(baseProps());

    expect(document.body.querySelector('[data-testid="discovery-degraded-notice"]')).not.toBeNull();
    expect(
      document.body.querySelector('[data-testid="discovery-degraded-cause"]')?.textContent
    ).toBe("HTTP 500");
  });
});
