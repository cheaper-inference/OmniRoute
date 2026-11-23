// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiKeyBanBanner from "../../../src/app/(dashboard)/home/ApiKeyBanBanner";
import messages from "../../../src/i18n/messages/en.json";
import namespaces from "../../../src/i18n/routeNamespaces.generated.json";

const homeMessages = Object.fromEntries(
  Object.entries(messages).filter(([name]) => namespaces.home.includes(name))
);

vi.unmock("next-intl");
vi.mock("next/link", () => ({ default: "a" }));

let root: Root;
let container: HTMLDivElement;

async function showBanner() {
  await act(async () => {
    root.render(
      <NextIntlClientProvider locale="en" timeZone="UTC" messages={homeMessages}>
        <ApiKeyBanBanner />
      </NextIntlClientProvider>
    );
  });
}

describe("API key ban banner", () => {
  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("renders one notice with each safe reason and a key management link", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        Response.json({
          total: 3,
          keys: [
            { id: "fixture-1", name: "Example key", reason: "prompt_injection" },
            { id: "fixture-2", name: "Existing key", reason: null },
          ],
        })
      )
    );
    await showBanner();
    expect(container.querySelectorAll('[role="status"]')).toHaveLength(1);
    expect(container.textContent).toContain("Example key · Suspected prompt injection");
    expect(container.textContent).toContain("Existing key · No reason recorded");
    expect(container.textContent).toContain("1 more banned key");
    expect(container.querySelector('a[href="/dashboard/api-manager"]')).not.toBeNull();
  });

  it("removes the notice when a later read is unauthorized", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          total: 1,
          keys: [{ id: "fixture-1", name: "Example key", reason: "policy_violation" }],
        })
      )
      .mockResolvedValueOnce(new Response(null, { status: 401 }));
    vi.stubGlobal("fetch", fetch);
    await showBanner();
    expect(container.textContent).toContain("Policy violation");

    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(container.textContent).toBe("");
  });

  it("clears stale details after a stalled refresh times out", async () => {
    vi.useFakeTimers();
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({
          total: 1,
          keys: [{ id: "fixture-1", name: "Example key", reason: "policy_violation" }],
        })
      )
      .mockImplementationOnce(
        (_url: string, options: RequestInit) =>
          new Promise((_resolve, reject) => {
            options.signal?.addEventListener("abort", () => reject(options.signal?.reason), {
              once: true,
            });
          })
      )
      .mockResolvedValueOnce(Response.json({ total: 0, keys: [] }));
    vi.stubGlobal("fetch", fetch);
    await showBanner();
    expect(container.textContent).toContain("Policy violation");

    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
      await vi.advanceTimersByTimeAsync(10_000);
    });
    expect(container.textContent).toBe("");
    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  it("stays hidden with no actual bans", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ total: 0, keys: [] })));
    await showBanner();
    expect(container.textContent).toBe("");
  });
});
