// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useSelfServiceQuery } from "@/app/quota/[provider]/lib/useSelfServiceQuery";
import { selfQuotaResponseSchema, type SelfQuotaResponse } from "@/shared/schemas/selfQuota";

const KEY = "sk-live-1234567890";
const QUOTA = "/api/v1/me/quota/";

/** A response that parses in the real quota contract. */
function quota(name: string): SelfQuotaResponse {
  return {
    provider: "claude",
    generatedAt: "2026-11-20T12:00:00.000Z",
    pools: [
      {
        ref: "qpr_a",
        name,
        provider: "claude",
        borrowMode: "saturation",
        lendingPercent: 0,
        lendingUntil: null,
        lendingActive: false,
        policy: "hard",
        weight: 50,
        cap: null,
        accountVisible: true,
        dimensions: [],
        accounts: [],
      },
    ],
    availableModels: [],
    expiresAt: null,
    apiBaseUrl: null,
    blocks: { schedules: [], modelCaps: [] },
  };
}

type Pending = {
  url: string;
  init: RequestInit;
  respond: (body: unknown, status?: number) => void;
};

/**
 * Requests under the self-service routes wait for the test to answer; anything else is a 404.
 * An aborted request is not rejected here, so a late answer still reaches the hook and the test
 * proves the hook itself drops it.
 */
function stubFetch() {
  const pending: Pending[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn((url: string, init: RequestInit) => {
      if (!url.startsWith("/api/v1/me/"))
        return Promise.resolve(new Response(null, { status: 404 }));
      return new Promise<Response>((resolve) => {
        pending.push({
          url,
          init,
          respond: (body, status = 200) => resolve(new Response(JSON.stringify(body), { status })),
        });
      });
    })
  );
  return {
    pending,
    count: (prefix: string) => pending.filter((entry) => entry.url.startsWith(prefix)).length,
    answer: async (index: number, body: unknown, status = 200) => {
      await act(async () => {
        pending[index].respond(body, status);
      });
    },
  };
}

type Props = { path: string; apiKey: string | null; refetchOnReturn?: boolean };

function renderQuery(initial: Props) {
  return renderHook(
    (props: Props) => useSelfServiceQuery({ ...props, schema: selfQuotaResponseSchema }),
    { initialProps: initial }
  );
}

function setVisibility(state: DocumentVisibilityState) {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: state });
  document.dispatchEvent(new Event("visibilitychange"));
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
});

describe("useSelfServiceQuery", () => {
  it("no key, no request", () => {
    const fetches = stubFetch();
    const { result } = renderQuery({ path: `${QUOTA}claude`, apiKey: null });
    expect(result.current.query).toEqual({ status: "idle" });
    expect(fetches.count(QUOTA)).toBe(0);
  });

  it("loading then ready", async () => {
    const fetches = stubFetch();
    const { result } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    expect(result.current.query).toEqual({ status: "loading", data: null });
    expect(fetches.count(QUOTA)).toBe(1);
    expect(fetches.pending[0].init.headers).toMatchObject({ Authorization: `Bearer ${KEY}` });

    await fetches.answer(0, quota("Pool A"));
    const query = result.current.query;
    expect(query.status).toBe("ready");
    if (query.status !== "ready") return;
    expect(query.data.pools[0].name).toBe("Pool A");
    expect(typeof query.receivedAt).toBe("number");
  });

  it("an answer outside the contract is a failure", async () => {
    const fetches = stubFetch();
    const { result } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, { pools: "nope" });
    expect(result.current.query).toEqual({ status: "failed", reason: "invalid-response" });
  });

  it("reload keeps the last answer on screen", async () => {
    const fetches = stubFetch();
    const { result } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("Pool A"));
    const previous = result.current.query.status === "ready" ? result.current.query.data : null;

    act(() => result.current.reload());
    expect(result.current.query).toEqual({ status: "loading", data: previous });
    expect(fetches.count(QUOTA)).toBe(2);

    await fetches.answer(1, quota("Pool B"));
    expect(result.current.query.status).toBe("ready");
  });

  it("a refusal drops the last answer; a server failure keeps it", async () => {
    const fetches = stubFetch();
    const { result } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("Pool A"));
    const previous = result.current.query.status === "ready" ? result.current.query.data : null;

    act(() => result.current.reload());
    await fetches.answer(1, { error: "boom" }, 500);
    act(() => result.current.reload());
    expect(result.current.query).toEqual({ status: "loading", data: previous });

    await fetches.answer(2, { error: "refused" }, 401);
    expect(result.current.query).toEqual({ status: "refused", reason: "invalid-key" });
    // The same key sent again starts from nothing, not from the refused key's old answer.
    act(() => result.current.reload());
    expect(result.current.query).toEqual({ status: "loading", data: null });
  });

  it("a slower earlier answer never overwrites a newer one", async () => {
    const fetches = stubFetch();
    const { result, rerender } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    rerender({ path: `${QUOTA}codex`, apiKey: KEY });
    expect(fetches.pending[0].init.signal?.aborted).toBe(true);
    expect(fetches.count(QUOTA)).toBe(2);

    await fetches.answer(1, quota("Newer"));
    await fetches.answer(0, quota("Older"));
    const query = result.current.query;
    expect(query.status).toBe("ready");
    if (query.status === "ready") expect(query.data.pools[0].name).toBe("Newer");
  });

  it("a new key never shows the answer for the old one", async () => {
    const fetches = stubFetch();
    const { result, rerender } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("Pool A"));
    rerender({ path: `${QUOTA}claude`, apiKey: "sk-other-0987654321" });
    expect(result.current.query).toEqual({ status: "loading", data: null });
  });

  it("a key entered again starts over instead of showing its earlier answer", async () => {
    const fetches = stubFetch();
    const forKey = (key: string) =>
      fetches.pending.filter(
        (entry) =>
          entry.url.startsWith(QUOTA) &&
          (entry.init.headers as Record<string, string>).Authorization === `Bearer ${key}`
      ).length;
    const { result, rerender } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("Pool A"));
    expect(result.current.query.status).toBe("ready");

    rerender({ path: `${QUOTA}claude`, apiKey: null });
    expect(result.current.query).toEqual({ status: "idle" });
    rerender({ path: `${QUOTA}claude`, apiKey: KEY });
    expect(result.current.query).toEqual({ status: "loading", data: null });
    expect(forKey(KEY)).toBe(2);

    await fetches.answer(1, quota("Pool A again"));
    expect(result.current.query.status).toBe("ready");
  });

  it("switching to another key and back starts over while the other key is pending", async () => {
    const fetches = stubFetch();
    const OTHER = "sk-other-0987654321";
    const forKey = (key: string) =>
      fetches.pending.filter(
        (entry) =>
          entry.url.startsWith(QUOTA) &&
          (entry.init.headers as Record<string, string>).Authorization === `Bearer ${key}`
      ).length;
    const { result, rerender } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("Pool A"));

    rerender({ path: `${QUOTA}claude`, apiKey: OTHER });
    rerender({ path: `${QUOTA}claude`, apiKey: KEY });
    expect(result.current.query).toEqual({ status: "loading", data: null });
    expect(forKey(KEY)).toBe(2);
    expect(forKey(OTHER)).toBe(1);
    expect(fetches.pending[1].init.signal?.aborted).toBe(true);
  });

  it("a request that throws after the fetch is a server failure", async () => {
    const fetches = stubFetch();
    const throwing = {
      safeParse: (): { success: true; data: unknown } | { success: false } => {
        throw new Error("schema exploded");
      },
    };
    const { result } = renderHook(() =>
      useSelfServiceQuery({ path: `${QUOTA}claude`, apiKey: KEY, schema: throwing })
    );
    await fetches.answer(0, quota("Pool A"));
    expect(result.current.query).toEqual({ status: "failed", reason: "server" });
  });

  it("unmount aborts the request", () => {
    const fetches = stubFetch();
    const { unmount } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    unmount();
    expect(fetches.pending[0].init.signal?.aborted).toBe(true);
  });

  it("coming back to the tab reloads only an answer older than a minute", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-11-20T12:00:00.000Z"));
    const fetches = stubFetch();
    const { result } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY, refetchOnReturn: true });
    await fetches.answer(0, quota("Pool A"));
    expect(result.current.query.status).toBe("ready");

    vi.setSystemTime(new Date("2026-11-20T12:00:30.000Z"));
    act(() => setVisibility("visible"));
    expect(fetches.count(QUOTA)).toBe(1);

    vi.setSystemTime(new Date("2026-11-20T12:01:01.000Z"));
    act(() => setVisibility("hidden"));
    expect(fetches.count(QUOTA)).toBe(1);
    act(() => setVisibility("visible"));
    expect(fetches.count(QUOTA)).toBe(2);
  });

  it("without the option, coming back to the tab never reloads", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-11-20T12:00:00.000Z"));
    const fetches = stubFetch();
    renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("Pool A"));

    vi.setSystemTime(new Date("2026-11-20T12:05:00.000Z"));
    act(() => setVisibility("visible"));
    expect(fetches.count(QUOTA)).toBe(1);
  });

  it("adopt replaces the answer without a request", async () => {
    const fetches = stubFetch();
    const { result } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("A"));
    act(() => result.current.adopt(quota("B"), KEY));
    expect(result.current.query).toMatchObject({
      status: "ready",
      data: { pools: [{ name: "B" }] },
    });
    expect(fetches.pending).toHaveLength(1);
  });

  it("adopt drops a refresh that was already in flight", async () => {
    const fetches = stubFetch();
    const { result } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("A"));
    act(() => result.current.reload());
    expect(result.current.query.status).toBe("loading");
    expect(fetches.pending).toHaveLength(2);
    act(() => result.current.adopt(quota("B"), KEY));
    expect(result.current.query.status).toBe("ready");
    await act(async () => fetches.pending[1].respond(quota("stale")));
    expect(result.current.query).toMatchObject({
      status: "ready",
      data: { pools: [{ name: "B" }] },
    });
    expect(fetches.pending).toHaveLength(2);
  });

  it("a reload after adopt asks again and shows the new answer", async () => {
    const fetches = stubFetch();
    const { result } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("A"));
    act(() => result.current.adopt(quota("B"), KEY));
    act(() => result.current.reload());
    expect(result.current.query).toMatchObject({
      status: "loading",
      data: { pools: [{ name: "B" }] },
    });
    expect(fetches.pending).toHaveLength(2);
    await fetches.answer(1, quota("C"));
    expect(result.current.query).toMatchObject({
      status: "ready",
      data: { pools: [{ name: "C" }] },
    });
  });

  it("adopt for another key, or with no key, changes nothing", async () => {
    const fetches = stubFetch();
    const { result, rerender } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("A"));
    rerender({ path: `${QUOTA}claude`, apiKey: "sk-live-0987654321" });
    expect(result.current.query).toEqual({ status: "loading", data: null });
    act(() => result.current.adopt(quota("B"), KEY));
    expect(result.current.query).toEqual({ status: "loading", data: null });
    rerender({ path: `${QUOTA}claude`, apiKey: null });
    expect(result.current.query).toEqual({ status: "idle" });
    act(() => result.current.adopt(quota("B"), KEY));
    expect(result.current.query).toEqual({ status: "idle" });
  });

  it("adopt under an earlier epoch is dropped even when the key value matches", async () => {
    const fetches = stubFetch();
    const { result, rerender } = renderQuery({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(0, quota("A"));
    const earlier = result.current.epoch;
    rerender({ path: `${QUOTA}claude`, apiKey: null });
    rerender({ path: `${QUOTA}claude`, apiKey: KEY });
    await fetches.answer(1, quota("A again"));
    expect(result.current.epoch).not.toBe(earlier);

    act(() => result.current.adopt(quota("Late"), KEY, earlier));
    expect(result.current.query).toMatchObject({
      status: "ready",
      data: { pools: [{ name: "A again" }] },
    });
    act(() => result.current.adopt(quota("Now"), KEY, result.current.epoch));
    expect(result.current.query).toMatchObject({
      status: "ready",
      data: { pools: [{ name: "Now" }] },
    });
  });
});
