// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
const { default: OAuthModal } = await import("@/shared/components/OAuthModal");

describe("Z-code account sign-in", () => {
  let element: HTMLDivElement;
  let root: ReturnType<typeof createRoot>;
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.useFakeTimers();
    element = document.createElement("div");
    document.body.appendChild(element);
    root = createRoot(element);
  });
  afterEach(() => {
    act(() => root.unmount());
    element.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it.each([
    ["zai", "https://z.example/login"],
    ["bigmodel", "https://b.example/login"],
  ])("starts a separate %s sign-in and polls its selected region", async (region, link) => {
    const fetchMock = vi.fn(
      async (input: RequestInfo | URL, _init?: RequestInit) =>
        new Response(
          JSON.stringify(
            String(input).endsWith("/start")
              ? {
                  sessionId: "session-1",
                  authorizeUrl: link,
                  expiresAt: Date.now() + 60000,
                  pollIntervalSec: 1,
                }
              : { status: "pending" }
          ),
          { status: 200, headers: { "Content-Type": "application/json" } }
        )
    );
    vi.stubGlobal("fetch", fetchMock);
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    await act(async () =>
      root.render(
        <OAuthModal isOpen provider="zcode" providerInfo={{ name: "Z-code" }} onClose={() => {}} />
      )
    );
    expect(fetchMock).not.toHaveBeenCalled();
    const radio = document.querySelector<HTMLInputElement>(`input[value="${region}"]`)!;
    await act(async () => radio.click());
    const button = [...document.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Continue to sign in")
    )!;
    await act(async () => {
      button.click();
      await Promise.resolve();
    });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/oauth/zcode/login/start");
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({ family: region });
    expect(open).toHaveBeenCalledWith(link, "oauth_verify");
    expect(document.querySelector(`a[href="${link}"]`)).toBeTruthy();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    const poll = fetchMock.mock.calls.find(([input]) => String(input).endsWith("/poll"))!;
    expect(JSON.parse(String((poll[1] as RequestInit).body))).toMatchObject({
      sessionId: "session-1",
    });
  });
  it("finishes only after the server confirms that the account was saved", async () => {
    const onSuccess = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async (input: RequestInfo | URL) =>
          new Response(
            JSON.stringify(
              String(input).endsWith("/start")
                ? {
                    sessionId: "session-2",
                    authorizeUrl: "https://z.example/login",
                    expiresAt: Date.now() + 60000,
                    pollIntervalSec: 1,
                  }
                : { status: "ok", connection: { id: "new-account" } }
            ),
            { headers: { "Content-Type": "application/json" } }
          )
      )
    );
    vi.spyOn(window, "open").mockImplementation(() => null);
    await act(async () =>
      root.render(
        <OAuthModal
          isOpen
          provider="zcode"
          providerInfo={{ name: "Z-code" }}
          onClose={() => {}}
          onSuccess={onSuccess}
        />
      )
    );
    const button = [...document.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Continue to sign in")
    )!;
    await act(async () => {
      button.click();
      await Promise.resolve();
    });
    expect(onSuccess).not.toHaveBeenCalled();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(onSuccess).toHaveBeenCalledOnce();
  });
  it("reopens an existing BigModel account in its own region", async () => {
    const fetchMock = vi.fn(
      async (_input: RequestInfo | URL, _init?: RequestInit) =>
        new Response(
          JSON.stringify({
            sessionId: "session",
            authorizeUrl: "https://b.example/login",
            expiresAt: Date.now() + 60000,
            pollIntervalSec: 1,
          }),
          { headers: { "Content-Type": "application/json" } }
        )
    );
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(window, "open").mockImplementation(() => null);
    await act(async () =>
      root.render(
        <OAuthModal
          isOpen={false}
          provider="zcode"
          providerInfo={{ name: "Z-code" }}
          onClose={() => {}}
        />
      )
    );
    await act(async () =>
      root.render(
        <OAuthModal
          isOpen
          provider="zcode"
          providerInfo={{ name: "Z-code" }}
          onClose={() => {}}
          reauthConnection={{ id: "existing-id", providerSpecificData: { family: "bigmodel" } }}
        />
      )
    );
    expect(document.querySelector<HTMLInputElement>('input[value="bigmodel"]')?.checked).toBe(true);
    const button = [...document.querySelectorAll("button")].find((b) =>
      b.textContent?.includes("Continue to sign in")
    )!;
    await act(async () => {
      button.click();
      await Promise.resolve();
    });
    expect(JSON.parse(String(fetchMock.mock.calls[0][1]?.body))).toEqual({
      family: "bigmodel",
      connectionId: "existing-id",
    });
  });
});
