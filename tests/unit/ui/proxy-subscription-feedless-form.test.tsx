// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SubscriptionTab from "@/app/(dashboard)/dashboard/settings/components/proxy/SubscriptionTab";

// The component lists `t` in effect/callback dependencies, so the translator must be referentially
// stable across renders (a fresh function per render re-fires the load effect forever).
const translate = (key: string) => key;
vi.mock("next-intl", () => ({
  useTranslations: () => translate,
}));

describe("Proxy subscription form: selector-only (feedless) subscription", () => {
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
    vi.restoreAllMocks();
  });

  function mockFetch() {
    return vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const body = url.includes("/api/providers") ? { connections: [] } : { items: [] };
      return {
        ok: true,
        status: init?.method === "POST" ? 201 : 200,
        json: async () => body,
      } as Response;
    });
  }

  async function mount() {
    const fetchMock = mockFetch();
    vi.stubGlobal("fetch", fetchMock);
    await act(async () => root.render(<SubscriptionTab />));
    return fetchMock;
  }

  async function click(text: string) {
    const button = Array.from(document.body.querySelectorAll("button")).find((item) =>
      item.textContent?.includes(text)
    );
    expect(button).toBeTruthy();
    await act(async () => button!.click());
  }

  async function type(placeholder: string, value: string) {
    const input = document.body.querySelector<HTMLInputElement>(
      `input[placeholder="${placeholder}"]`
    );
    expect(input).toBeTruthy();
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")!.set!;
    await act(async () => {
      setter.call(input, value);
      input!.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  function writes(fetchMock: ReturnType<typeof mockFetch>) {
    return fetchMock.mock.calls.filter(([, init]) => init?.method === "POST");
  }

  it("posts a subscription with an empty feed URL when a control URL is set", async () => {
    const fetchMock = await mount();
    await click("proxySubscription.addSubscription");
    await type("proxySubscription.namePlaceholder", "selector only");
    await type("proxySubscription.controlUrlPlaceholder", "http://127.0.0.1:9090");
    await click("proxySubscription.createSubscription");

    const posts = writes(fetchMock);
    expect(posts).toHaveLength(1);
    expect(posts[0][0]).toBe("/api/v1/management/proxy-subscriptions");
    const payload = JSON.parse(String(posts[0][1]?.body));
    expect(payload.name).toBe("selector only");
    expect(payload.url).toBe("");
    expect(payload.controlUrl).toBe("http://127.0.0.1:9090");
    expect(document.body.textContent).not.toContain("proxySubscription.urlRequired");
  });

  it("rejects an empty feed URL when there is no control URL, without posting", async () => {
    const fetchMock = await mount();
    await click("proxySubscription.addSubscription");
    await type("proxySubscription.namePlaceholder", "no feed no control");
    await click("proxySubscription.createSubscription");

    expect(writes(fetchMock)).toHaveLength(0);
    expect(document.body.textContent).toContain("proxySubscription.urlRequired");
  });
});
