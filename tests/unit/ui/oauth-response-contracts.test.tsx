// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => Object.assign((key: string) => key, { rich: (key: string) => key }),
}));
const { default: OAuthModal } = await import("@/shared/components/OAuthModal");
const roots: Array<{ root: ReturnType<typeof createRoot>; element: HTMLDivElement }> = [];

async function render(provider: string) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  roots.push({ root, element });
  await act(async () => {
    root.render(
      <OAuthModal isOpen provider={provider} providerInfo={{ name: provider }} onClose={() => {}} />
    );
  });
}

function response(body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), { headers: { "Content-Type": "application/json" } });
}

describe("OAuth response URL contracts", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.spyOn(window, "open").mockReturnValue(null);
  });
  afterEach(() => {
    for (const { root, element } of roots.splice(0)) {
      act(() => root.unmount());
      element.remove();
    }
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("rejects an object authUrl instead of opening its string representation", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => response({ authUrl: { url: "https://example.test" } }))
    );
    await render("antigravity");
    expect(window.open).not.toHaveBeenCalled();
    expect(document.body.textContent).toContain("errorBrowserUnavailable");
  });

  it("falls back from an invalid callback-server URL to the valid manual URL", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetchMock = vi.fn(async (url: string) =>
      response(
        url.includes("start-callback-server")
          ? { authUrl: 42 }
          : { authUrl: "https://example.test/authorize" }
      )
    );
    vi.stubGlobal("fetch", fetchMock);
    await render("codex");
    expect(fetchMock.mock.calls.some(([url]) => url.includes("/authorize?"))).toBe(true);
    expect(window.open).toHaveBeenCalledExactlyOnceWith(
      "https://example.test/authorize",
      "oauth_auth"
    );
  });

  it("preserves valid browser authorization URLs", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => response({ authUrl: "https://example.test/authorize" }))
    );
    await render("antigravity");
    expect(window.open).toHaveBeenCalledWith(
      "https://example.test/authorize",
      "oauth_popup",
      "width=600,height=700"
    );
  });
});
