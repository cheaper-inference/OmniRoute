// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const MESSAGES = vi.hoisted<Record<string, string>>(() => ({
  tabBrowserLogin: "Browser Login",
  tabPasteRefreshToken: "Refresh Token",
  antigravityRefreshTokenDescription:
    "Paste your Google OAuth refresh token for Antigravity. OmniRoute validates and exchanges it before saving.",
  antigravityRefreshTokenPlaceholder: "1//...",
  apiKeyTokenLabel: "API Key / Token",
  saveConnection: "Save Connection",
  saving: "Saving…",
  cancel: "Cancel",
}));

vi.mock("next-intl", () => ({
  useTranslations: () =>
    Object.assign((key: string) => MESSAGES[key] ?? key, {
      rich: (key: string) => MESSAGES[key] ?? key,
    }),
}));

const { default: OAuthModal } = await import("@/shared/components/OAuthModal");

const REFRESH_TOKEN = "1//0unit-test-refresh-token";
const roots: Array<{ root: ReturnType<typeof createRoot>; element: HTMLDivElement }> = [];

async function flushEffects() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

function renderAntigravityModal(onSuccess = vi.fn()) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  roots.push({ root, element });
  const render = (isOpen: boolean) =>
    act(() => {
      root.render(
        <OAuthModal
          isOpen={isOpen}
          provider="antigravity"
          providerInfo={{ name: "Antigravity" }}
          onClose={vi.fn()}
          onSuccess={onSuccess}
        />
      );
    });
  render(true);
  return { onSuccess, render };
}

function button(label: string) {
  return [...document.querySelectorAll("button")].find((b) => b.textContent === label);
}

function tokenInput() {
  return document.querySelector<HTMLInputElement>('input[placeholder="1//..."]');
}

function typeInto(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
  act(() => {
    setter?.call(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

describe("OAuthModal Antigravity manual refresh token", () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  let openMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      if (String(input).includes("/import-token")) {
        return new Response(JSON.stringify({ success: true, connection: { id: "c1" } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(
        JSON.stringify({ authUrl: "https://accounts.google.com/o/oauth2/auth" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    });
    openMock = vi.fn(() => null);
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("open", openMock);
  });

  afterEach(() => {
    for (const { root, element } of roots.splice(0)) {
      act(() => root.unmount());
      element.remove();
    }
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("OAuthModal_OpenForAntigravity_RendersBothBrowserLoginAndRefreshTokenTabs", async () => {
    renderAntigravityModal();
    await flushEffects();

    expect(button("Browser Login")).toBeDefined();
    expect(button("Refresh Token")).toBeDefined();
  });

  it("OAuthModal_SwitchToRefreshTokenTabAndSave_PostsTokenToImportEndpoint", async () => {
    const { onSuccess } = renderAntigravityModal();
    await flushEffects();

    // Click "Refresh Token" tab
    await act(async () => {
      button("Refresh Token")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    expect(tokenInput()).not.toBeNull();
    expect(document.body.textContent).toContain("Google OAuth refresh token");

    typeInto(tokenInput() as HTMLInputElement, `  ${REFRESH_TOKEN}  `);
    await act(async () => {
      button("Save Connection")?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await flushEffects();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/oauth/antigravity/import-token",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ token: REFRESH_TOKEN }),
      })
    );
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
