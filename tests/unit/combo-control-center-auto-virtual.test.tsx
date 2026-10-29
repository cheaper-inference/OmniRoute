// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Root } from "react-dom/client";

import ComboControlCenterClient from "@/app/(dashboard)/dashboard/combos/ComboControlCenterClient";

vi.mock("next-intl", () => {
  // `t` is a useCallback/useEffect dep in the client — it must be referentially
  // stable across renders or the load effect re-fires forever inside act().
  const t = (key: string) => key;
  t.has = () => false;
  t.rich = (key: string) => key;
  return { useTranslations: () => t };
});

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/lib/display/names", () => ({
  getProviderDisplayName: (provider: string) => provider,
}));

// The payload /api/combos/auto?id=auto/fast returns for a virtual combo:
// models are the runtime-resolved candidate steps; config nests every router
// knob under `auto` (virtualFactory.ts).
const AUTO_COMBO_PAYLOAD = {
  id: "auto/fast",
  name: "auto/fast",
  strategy: "auto",
  type: "auto",
  isActive: true,
  candidateCount: 2,
  models: [
    {
      id: "virtual-auto-default-1-openai",
      kind: "model",
      model: "openai/gpt-4.1-mini",
      providerId: "openai",
      connectionId: "conn-1234567890",
      weight: 0.9,
      label: "openai",
    },
    {
      id: "virtual-auto-default-2-groq",
      kind: "model",
      model: "groq/llama-3.3-70b-versatile",
      providerId: "groq",
      connectionId: null,
      weight: 0.8,
      label: "groq",
    },
  ],
  config: {
    auto: {
      candidatePool: ["openai", "groq"],
      weights: { quota: 0.1429, health: 0.1605 },
      explorationRate: 0.05,
      routerStrategy: "lkgp",
    },
  },
};

function stubAutoComboFetch() {
  return vi.fn(async (url: string) => {
    if (url.startsWith("/api/combos/auto")) {
      return { ok: true, status: 200, json: async () => AUTO_COMBO_PAYLOAD };
    }
    if (url.startsWith("/api/combos/metrics")) {
      return { ok: true, status: 200, json: async () => ({ metrics: null }) };
    }
    if (url.startsWith("/api/usage/call-logs")) {
      return { ok: true, status: 200, json: async () => [] };
    }
    throw new Error(`unexpected fetch: ${url}`);
  });
}

describe("ComboControlCenterClient on a virtual auto/* combo", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  async function renderAndSettle(comboId: string) {
    await act(async () => {
      root.render(<ComboControlCenterClient comboId={comboId} />);
    });
    // load() awaits the combo fetch then a Promise.all — flush both turns.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }

  it("populates Resolved runtime targets from the materialized candidates", async () => {
    const fetchMock = stubAutoComboFetch();
    vi.stubGlobal("fetch", fetchMock);

    await renderAndSettle("auto/fast");

    // The combo-health lookup is skipped for virtual ids — only /api/combos/auto
    // serves them, and the candidates materialize through `models`.
    expect(fetchMock.mock.calls.some(([url]) => url.startsWith("/api/combos/auto"))).toBe(true);
    expect(fetchMock.mock.calls.some(([url]) => url.includes("/api/usage/combo-health"))).toBe(
      false
    );

    const text = container.textContent ?? "";
    expect(text).toContain("openai/gpt-4.1-mini");
    expect(text).toContain("groq/llama-3.3-70b-versatile");
    expect(text).not.toContain("noResolvedTargetHealth");
    expect(text).not.toContain("unavailable");
  });

  it("renders runtime config as rows — never the nested `auto` JSON blob", async () => {
    vi.stubGlobal("fetch", stubAutoComboFetch());

    await renderAndSettle("auto/fast");

    const text = container.textContent ?? "";
    // Unwrapped keys render as their own rows…
    expect(text).toContain("routerStrategy");
    expect(text).toContain("lkgp");
    expect(text).toContain("explorationRate");
    expect(text).toContain("quota=0.1429");
    // …and the giant stringified object never makes it to the DOM.
    expect(text).not.toContain('"candidatePool"');
    expect(text).not.toContain('candidatePool":');
  });
});
