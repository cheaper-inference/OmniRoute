// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ModalityBridgeVisionTab from "@/app/(dashboard)/dashboard/settings/components/modalityBridge/ModalityBridgeVisionTab";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));

function jsonResponse(data: unknown) {
  return { ok: true, json: async () => data } as Response;
}

describe("VisionBridgeSettingsTab (Modality Bridge vision tab)", () => {
  let container: HTMLDivElement;
  let root: Root;
  const fetchMock = vi.fn();

  beforeEach(async () => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock.mockImplementation(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes("/api/models")) {
        return jsonResponse({ models: [] });
      }
      if (url.includes("/api/modality-bridge/stats")) {
        return jsonResponse({ vision: { bridged: 0, cacheHits: 0, failures: 0 }, audio: {} });
      }
      if (init?.method === "PATCH") return jsonResponse({});
      return jsonResponse({});
    });
    vi.stubGlobal("fetch", fetchMock);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    await act(async () => {
      root.render(<ModalityBridgeVisionTab />);
    });
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it("exposes the text-only reroute setting and persists a toggle", async () => {
    expect(container.textContent).toContain("visionBridgeRerouteTextOnlyLabel");
    const toggles = container.querySelectorAll('[role="switch"]');
    const rerouteToggle = toggles.item(1) as HTMLButtonElement;
    await act(async () => {
      rerouteToggle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/settings",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ visionBridgeRerouteTextOnly: true }),
      })
    );
  });
});
