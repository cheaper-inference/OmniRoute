// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import messages from "@/i18n/messages/en.json";
import OAuthModal from "@/shared/components/OAuthModal";

vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => {
    const translate = (key: string) =>
      (messages as unknown as Record<string, Record<string, string>>)[namespace]?.[key] ?? key;
    return Object.assign(translate, { rich: translate });
  },
}));
const redirectUri = "https://login.microsoftonline.com/common/oauth2/nativeclient";
const authorization = (state = "attempt-one") => ({
  authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?state=" + state,
  redirectUri,
  state,
  codeVerifier: "v".repeat(43),
  flowType: "authorization_code",
});
const response = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const callback = (state = "attempt-one") => `${redirectUri}?code=secret&state=${state}`;

describe("M365 native sign-in through the real OAuth dispatcher", () => {
  let root: ReturnType<typeof createRoot>;
  let host: HTMLElement;
  let fetchMock: ReturnType<typeof vi.fn>;
  let success: ReturnType<typeof vi.fn<() => void>>;
  let close: ReturnType<typeof vi.fn<() => void>>;
  const render = (isOpen = true, id = "reauth-target", provider = "copilot-m365-web") =>
    act(async () => {
      root.render(
        <OAuthModal
          isOpen={isOpen}
          provider={provider}
          providerInfo={{ name: "M365" }}
          reauthConnection={{ id }}
          onSuccess={success}
          onClose={close}
        />
      );
    });
  const button = (label: string) =>
    [...document.querySelectorAll("button")].find((b) => b.textContent === label)!;
  const click = async (label: string) =>
    act(async () => {
      button(label).click();
    });
  const paste = async (value: string) =>
    act(async () => {
      const input = document.querySelector<HTMLInputElement>('input[type="password"]')!;
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    success = vi.fn();
    close = vi.fn();
    fetchMock = vi.fn().mockImplementation(async () => response(authorization()));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(window, "open").mockReturnValue(null);
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    host.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  it("shows Network instructions before any explicit start; never opens a browser automatically", async () => {
    await render();
    expect(document.body.textContent).toContain("Preserve log");
    expect(document.body.textContent).toContain("wrongplace");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(window.open).not.toHaveBeenCalled();
    await click("Prepare Microsoft sign-in");
    expect(fetchMock.mock.calls[0][0]).toBe(
      "/api/oauth/copilot-m365-web/authorize?connectionId=reauth-target"
    );
    const link = document.querySelector<HTMLAnchorElement>('a[target="_blank"]')!;
    expect(link.href).toBe("about:blank");
    expect(document.querySelectorAll("a")).toHaveLength(1);
    expect(link.rel).toContain("noopener");
    expect(window.open).not.toHaveBeenCalled();
  });
  it("orders blank-tab setup before authorization navigation and callback capture", async () => {
    await render();
    const steps = [...document.querySelectorAll("ol li")].map((step) => step.textContent);
    expect(steps).toHaveLength(5);
    expect(steps[0]).toMatch(/Prepare/);
    expect(steps[1]).toMatch(/blank tab/);
    expect(steps[2]).toMatch(/DevTools.*Network.*Preserve log.*before navigating/i);
    expect(steps[3]).toMatch(/authorization URL.*paste.*prepared tab/i);
    expect(steps[4]).toMatch(/nativeclient.*Request URL/);
  });
  it("exposes the exact authorization URL for manual copy even without the Clipboard API", async () => {
    expect(navigator.clipboard).toBeUndefined();
    await render();
    expect(document.querySelector("input[readonly]")).toBeNull();
    await click("Prepare Microsoft sign-in");
    const input = document.querySelector<HTMLInputElement>("input[readonly]")!;
    expect(input).not.toBeNull();
    expect(input.type).toBe("text");
    expect(input.value).toBe(authorization().authUrl);
    expect(input.disabled).toBe(false);
    expect(document.querySelector(`label[for="${input.id}"]`)?.textContent).toBe(
      "Authorization URL (copy to the prepared tab)"
    );
    await act(async () => input.focus());
    input.select();
    expect(input.selectionStart).toBe(0);
    expect(input.selectionEnd).toBe(input.value.length);
    expect(document.body.textContent).toContain("Ctrl+C");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(window.open).not.toHaveBeenCalled();
  });
  it("explains server-provided URL expiry without requiring it for older responses", async () => {
    fetchMock.mockResolvedValueOnce(response({ ...authorization(), expiresAt: 1800000000000 }));
    await render();
    await click("Prepare Microsoft sign-in");
    const expiry = document.querySelector("time")!;
    expect(expiry).not.toBeNull();
    expect(expiry.dateTime).toBe(new Date(1800000000000).toISOString());
    expect(expiry.parentElement?.textContent).toMatch(/expires.*Start a new attempt/i);
    await click("Start new attempt");
    expect(document.querySelector("time")).toBeNull();
    expect(document.querySelector("input[readonly]")).not.toBeNull();
  });
  it.each([
    "secret",
    `${redirectUri}?code=secret`,
    callback("wrong"),
    `${redirectUri}/?code=secret&state=attempt-one`,
    "https://login.microsoftonline.com/common/oauth2/wrongplace?code=secret&state=attempt-one",
    `${callback()}&state=attempt-one`,
    `${callback()}#code=other`,
  ])("rejects invalid callback locally: %s", async (value) => {
    await render();
    await click("Prepare Microsoft sign-in");
    await paste(value);
    await click("Connect");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(document.querySelector('[role="alert"]')).not.toBeNull();
  });
  it("posts the full URL and bound reauth attempt, clears secrets on success", async () => {
    await render();
    await click("Prepare Microsoft sign-in");
    fetchMock.mockResolvedValueOnce(response({ success: true }));
    await paste(callback());
    await click("Connect");
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual({
      code: callback(),
      redirectUri,
      codeVerifier: "v".repeat(43),
      state: "attempt-one",
      connectionId: "reauth-target",
    });
    expect(success).toHaveBeenCalledTimes(1);
    expect(document.querySelector("input")).toBeNull();
    expect(document.body.textContent).not.toContain("secret");
  });
  it("cancels an exchange and ignores its late success, reopening starts clean", async () => {
    await render();
    await click("Prepare Microsoft sign-in");
    let resolve!: (value: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((done) => {
          resolve = done;
        })
    );
    await paste(callback());
    await click("Connect");
    const signal = fetchMock.mock.calls[1][1].signal as AbortSignal;
    await click("Cancel");
    expect(signal.aborted).toBe(true);
    expect(close).toHaveBeenCalledOnce();
    await act(async () => resolve(response({ success: true })));
    expect(success).not.toHaveBeenCalled();
    await render(false);
    await render();
    expect(document.querySelector("input")).toBeNull();
    expect(document.body.textContent).not.toContain("secret");
  });
  it("new attempt retires the old state and clears pasted credentials", async () => {
    await render();
    await click("Prepare Microsoft sign-in");
    await paste(callback());
    fetchMock.mockResolvedValueOnce(response(authorization("attempt-two")));
    await click("Start new attempt");
    expect(document.querySelector<HTMLInputElement>('input[type="password"]')!.value).toBe("");
    await paste(callback());
    await click("Connect");
    expect(fetchMock).toHaveBeenCalledTimes(2);
    fetchMock.mockResolvedValueOnce(response({ success: true }));
    await paste(callback("attempt-two"));
    await click("Connect");
    expect(success).toHaveBeenCalledOnce();
  });
  it("shows fixed failure copy without echoing sensitive server errors and supports retry", async () => {
    fetchMock.mockResolvedValueOnce(response({ error: "secret credential" }, 500));
    await render();
    await click("Prepare Microsoft sign-in");
    expect(document.querySelector('[role="alert"]')).not.toBeNull();
    expect(document.body.textContent).not.toContain("secret credential");
    await click("Prepare Microsoft sign-in");
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
  it("aborts pending authorize on unmount", async () => {
    fetchMock.mockImplementationOnce(() => new Promise(() => {}));
    await render();
    await click("Prepare Microsoft sign-in");
    const signal = fetchMock.mock.calls[0][1].signal as AbortSignal;
    await act(async () => root.render(null));
    expect(signal.aborted).toBe(true);
  });
  it("retires a pending exchange when the reauthentication target changes", async () => {
    await render();
    await click("Prepare Microsoft sign-in");
    let resolve!: (value: Response) => void;
    fetchMock.mockImplementationOnce(
      () =>
        new Promise<Response>((done) => {
          resolve = done;
        })
    );
    await paste(callback());
    await click("Connect");
    const signal = fetchMock.mock.calls[1][1].signal as AbortSignal;
    await render(true, "other-target");
    expect(signal.aborted).toBe(true);
    await act(async () => resolve(response({ success: true })));
    expect(success).not.toHaveBeenCalled();
    await click("Prepare Microsoft sign-in");
    expect(fetchMock.mock.calls[2][0]).toBe(
      "/api/oauth/copilot-m365-web/authorize?connectionId=other-target"
    );
  });
  it("requires a fresh attempt after exchange failure and clears the credential URL", async () => {
    await render();
    await click("Prepare Microsoft sign-in");
    fetchMock.mockResolvedValueOnce(response({ error: callback() }, 400));
    await paste(callback());
    await click("Connect");
    expect(success).not.toHaveBeenCalled();
    expect(document.querySelector("input")).toBeNull();
    expect(document.body.textContent).not.toContain("secret");
    expect(document.querySelector('[role="alert"]')?.textContent).toContain("Start a new attempt");
    await click("Prepare Microsoft sign-in");
    expect(document.querySelector<HTMLInputElement>('input[type="password"]')!.value).toBe("");
  });
  it("leaves legacy paste-first providers on their existing flow", async () => {
    await render(true, "legacy", "claude");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(document.body.textContent).not.toContain("Preserve log");
    expect(document.querySelector('input[type="password"]')).not.toBeNull();
  });
});
