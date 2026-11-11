// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ProviderRetryDelaySelect from "../components/ProviderRetryDelaySelect";

vi.mock("next-intl", () => ({
  useTranslations: () => (k: string) => k,
}));

describe("ProviderRetryDelaySelect layout", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ providerLimitOverrides: {} })))
    );
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  // .ci-field is `width: 100%`; as a non-shrinking flex item it takes the whole row
  // and squeezes the description to one word per line.
  it("keeps the compact select at its content width", async () => {
    await act(async () => {
      root.render(<ProviderRetryDelaySelect providerId="codex" />);
    });
    const field = container.querySelector(".ci-field");
    expect(field).not.toBeNull();
    expect(field!.className).toContain("w-auto");
    expect(field!.className).toContain("shrink-0");
  });
});
