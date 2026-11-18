// @vitest-environment jsdom
/**
 * #18075 — `KiroSocialOAuthModal` had no test of its own. It starts the Kiro social device flow,
 * shows the link and code, polls the exchange endpoint and reports success or failure.
 * The global UI polyfill backs `useTranslations` with the real `en.json`.
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

let KiroSocialOAuthModal: typeof import("../../../src/shared/components/KiroSocialOAuthModal").default;

beforeAll(async () => {
  ({ default: KiroSocialOAuthModal } =
    await import("../../../src/shared/components/KiroSocialOAuthModal"));
}, 180_000);

let root: Root;
let container: HTMLDivElement;
let fetchMock: ReturnType<typeof vi.fn>;

const AUTHORIZE = {
  userCode: "ABCD-1234",
  authUrl: "https://example.com/device?code=ABCD-1234",
  deviceCode: "device-1",
  interval: 1,
  expiresIn: 300,
};

function stubFetch(
  exchange: () => Record<string, unknown>,
  authorize = () => Response.json(AUTHORIZE)
) {
  fetchMock = vi.fn(async (url: string) => {
    if (url.startsWith("/api/oauth/kiro/social-authorize")) return authorize();
    if (url === "/api/oauth/kiro/social-exchange") return Response.json(exchange());
    throw new Error(`unexpected fetch ${url}`);
  });
  vi.stubGlobal("fetch", fetchMock);
}

const exchangeCalls = () =>
  fetchMock.mock.calls.filter(([url]) => url === "/api/oauth/kiro/social-exchange");
const body = () => document.body.textContent ?? "";

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

describe("KiroSocialOAuthModal", () => {
  it("shows the link and code, polls, and reports success once", async () => {
    let polls = 0;
    stubFetch(() => {
      polls += 1;
      return polls === 1 ? { pending: true } : { success: true };
    });
    const onSuccess = vi.fn();
    await act(async () => {
      root.render(
        <KiroSocialOAuthModal
          isOpen
          provider="github"
          targetProvider="kiro"
          onSuccess={onSuccess}
          onClose={() => {}}
        />
      );
    });
    expect(fetchMock.mock.calls[0][0]).toBe("/api/oauth/kiro/social-authorize?provider=github");
    await vi.waitFor(() => expect(body()).toContain("ABCD-1234"));
    expect(body()).toContain("Connect Kiro via GitHub");
    const link = document.querySelector<HTMLAnchorElement>(`a[href="${AUTHORIZE.authUrl}"]`);
    expect(link?.target).toBe("_blank");
    expect(link?.rel).toContain("noopener");

    await vi.waitFor(() => expect(body()).toContain("Connected Successfully!"), {
      timeout: 6000,
    });
    expect(onSuccess).toHaveBeenCalledTimes(1);
    const [, init] = exchangeCalls()[0];
    expect(JSON.parse(String(init?.body))).toEqual({
      deviceCode: "device-1",
      provider: "github",
      targetProvider: "kiro",
    });
    expect(exchangeCalls()).toHaveLength(2);
  });

  it("shows the server message when the authorization cannot start", async () => {
    stubFetch(
      () => ({ pending: true }),
      () => Response.json({ error: { message: "Kiro is not configured" } }, { status: 400 })
    );
    await act(async () => {
      root.render(<KiroSocialOAuthModal isOpen provider="google" onClose={() => {}} />);
    });
    await vi.waitFor(() => expect(body()).toContain("Connection Failed"));
    expect(body()).toContain("Kiro is not configured");
    expect(exchangeCalls()).toHaveLength(0);
  });

  it("stops polling on a final failure and shows its reason", async () => {
    stubFetch(() => ({ pending: false, error: "access_denied" }));
    await act(async () => {
      root.render(<KiroSocialOAuthModal isOpen provider="google" onClose={() => {}} />);
    });
    await vi.waitFor(() => expect(body()).toContain("Connection Failed"), { timeout: 6000 });
    expect(body()).toContain("access_denied");
    const calls = exchangeCalls().length;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    });
    expect(exchangeCalls()).toHaveLength(calls);
  });

  it("cancel closes the modal and no poll runs afterwards", async () => {
    stubFetch(() => ({ pending: true }));
    const onClose = vi.fn();
    await act(async () => {
      root.render(<KiroSocialOAuthModal isOpen provider="google" onClose={onClose} />);
    });
    await vi.waitFor(() => expect(body()).toContain("Waiting for authorization..."));
    const cancel = [...document.querySelectorAll<HTMLButtonElement>("button")].find(
      (b) => b.textContent === "Cancel"
    );
    await act(async () => {
      cancel?.click();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
    });
    expect(exchangeCalls()).toHaveLength(0);
  });
});
