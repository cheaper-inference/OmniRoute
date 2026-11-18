// @vitest-environment jsdom
import React, { act, useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useProviderQuota } from "@/app/(dashboard)/dashboard/providers/[id]/hooks/useProviderQuota";
import ConnectionQuotaPanel from "@/app/(dashboard)/dashboard/providers/[id]/components/ConnectionQuotaPanel";
import { useCachedQuotaPolling } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useCachedQuotaPolling";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

const cacheUrl = "/api/usage/provider-limits";
const snapshot = (remaining: number, fetchedAt = "2026-01-01T00:00:00.000Z") => ({
  caches: { account: { quotas: { session: { remainingPercentage: remaining } }, fetchedAt } },
});
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

let root: Root;
let element: HTMLDivElement;
let latest: ReturnType<typeof useProviderQuota>;
function Probe() {
  const quota = useProviderQuota();
  useEffect(() => {
    latest = quota;
  }, [quota]);
  return (
    <ConnectionQuotaPanel
      providerId="codex"
      connection={{ id: "account", provider: "codex", name: "Account" }}
      cache={quota.quotaByConnectionId.account}
      onRefresh={() => {
        void quota.refreshConnection("account");
      }}
    />
  );
}
async function mount(component = <Probe />) {
  await act(async () => {
    root.render(component);
  });
}
async function tick(ms = 5000) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-01-01T00:01:00.000Z"));
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  element = document.createElement("div");
  document.body.appendChild(element);
  root = createRoot(element);
});
afterEach(() => {
  act(() => root.unmount());
  element.remove();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("live cached Codex quota", () => {
  it("updates the rendered account quota within 5 seconds using only local cached GETs", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(Response.json(snapshot(80)))
      .mockResolvedValue(Response.json(snapshot(25)));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    expect(element.textContent).toContain("5h 20%");
    await tick();
    expect(element.textContent).toContain("5h 75%");
    expect(fetcher).toHaveBeenCalledTimes(2);
    for (const [url, options] of fetcher.mock.calls) {
      expect(url).toBe(cacheUrl);
      expect(options?.method ?? "GET").toBe("GET");
      expect(options?.cache).toBe("no-store");
    }
  });

  it("pauses when hidden and catches up immediately on returning to the tab", async () => {
    const fetcher = vi.fn().mockImplementation(async () => Response.json(snapshot(50)));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    await tick(15000);
    expect(fetcher).toHaveBeenCalledTimes(1);
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
    });
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("never overlaps polls and aborts an outstanding read on unmount", async () => {
    const pending = deferred<Response>();
    const fetcher = vi.fn().mockReturnValue(pending.promise);
    vi.stubGlobal("fetch", fetcher);
    await mount();
    await tick(5000);
    expect(fetcher).toHaveBeenCalledTimes(1);
    const signal = fetcher.mock.calls[0][1]?.signal as AbortSignal;
    act(() => root.unmount());
    expect(signal).toBeDefined();
    expect(signal.aborted).toBe(true);
    root = createRoot(element);
    pending.resolve(Response.json(snapshot(0)));
    await act(async () => {
      await pending.promise;
    });
    expect(element.textContent).toBe("");
  });

  it("keeps the last observation and its age after a failed cache read", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(Response.json(snapshot(80)))
      .mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    const before = latest.quotaByConnectionId.account;
    await tick();
    expect(latest.quotaByConnectionId.account).toEqual(before);
    expect(latest.quotaByConnectionId.account.fetchedAt).toBe("2026-01-01T00:00:00.000Z");
  });

  it("a stalled cached read times out and the next poll recovers", async () => {
    const pending = deferred<Response>();
    const fetcher = vi
      .fn()
      .mockReturnValueOnce(pending.promise)
      .mockResolvedValue(Response.json(snapshot(20)));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    const signal = fetcher.mock.calls[0][1]?.signal as AbortSignal;
    await tick(20000);
    expect(signal).toBeDefined();
    expect(signal.aborted).toBe(true);
    expect(element.textContent).toContain("5h 80%");
    pending.resolve(Response.json(snapshot(90)));
    await act(async () => {
      await pending.promise;
    });
    expect(element.textContent).toContain("5h 80%");
  });

  it("manual refresh re-reads the canonical cache and cannot be overwritten by an older poll", async () => {
    const oldRead = deferred<Response>();
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce(Response.json(snapshot(80)))
      .mockReturnValueOnce(oldRead.promise)
      .mockResolvedValueOnce(Response.json({ quotas: { session: { remainingPercentage: 60 } } }))
      .mockResolvedValueOnce(Response.json(snapshot(25, "2026-01-01T00:00:30.000Z")));
    vi.stubGlobal("fetch", fetcher);
    await mount();
    await tick();
    await act(async () => {
      await latest.refreshConnection("account");
    });
    oldRead.resolve(Response.json(snapshot(90)));
    await act(async () => {
      await oldRead.promise;
    });
    expect(element.textContent).toContain("5h 75%");
    expect(latest.quotaByConnectionId.account.fetchedAt).toBe("2026-01-01T00:00:30.000Z");
    expect(fetcher.mock.calls.map(([url]) => url)).toEqual([
      cacheUrl,
      cacheUrl,
      "/api/usage/account",
      cacheUrl,
    ]);
  });

  it("the provider-limits page re-reads quotas quickly without re-scanning accounts every poll", async () => {
    const readConnections = vi.fn().mockResolvedValue([{ id: "account" }]);
    const readLimits = vi.fn().mockResolvedValue(snapshot(80).caches);
    const apply = vi.fn();
    function LimitsProbe() {
      useCachedQuotaPolling(readConnections, readLimits, apply);
      return null;
    }
    await mount(<LimitsProbe />);
    await tick();
    expect(readLimits).toHaveBeenCalled();
    const before = readLimits.mock.calls.length;
    readLimits.mockResolvedValue(snapshot(20).caches);
    await tick();
    expect(readLimits.mock.calls.length).toBeGreaterThan(before);
    expect(apply).toHaveBeenLastCalledWith([{ id: "account" }], snapshot(20).caches);
    expect(readConnections).toHaveBeenCalledTimes(1);
  });
});
