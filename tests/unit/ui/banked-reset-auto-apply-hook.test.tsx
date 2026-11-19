// @vitest-environment jsdom
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useBankedResetAutoApply } from "@/app/(dashboard)/dashboard/settings/components/useBankedResetAutoApply";

type FetchCall = { url: string; init?: RequestInit };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function mockFetch(handler: (call: FetchCall) => Promise<Response> | Response) {
  const calls: FetchCall[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      const call = { url: String(url), init };
      calls.push(call);
      return handler(call);
    })
  );
  return calls;
}

function patchBodies(calls: FetchCall[]) {
  return calls
    .filter((c) => c.init?.method === "PATCH")
    .map((c) => JSON.parse(String(c.init?.body)).bankedResetAutoApply);
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useBankedResetAutoApply", () => {
  it("shows no settings when the settings GET fails, so a save cannot write defaults", async () => {
    const calls = mockFetch(({ url }) =>
      url === "/api/settings"
        ? jsonResponse({ error: { message: "boom" } }, 500)
        : jsonResponse({ connections: [] })
    );
    const { result } = renderHook(() => useBankedResetAutoApply());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.settings).toBeNull();

    await act(() => result.current.update({ enabled: true }));
    expect(patchBodies(calls)).toEqual([]);
  });

  it("queues a change made while a save is in flight and saves it after", async () => {
    let releaseFirstSave: (() => void) | null = null;
    let patchCount = 0;
    const calls = mockFetch(({ url, init }) => {
      if (init?.method === "PATCH") {
        patchCount += 1;
        if (patchCount === 1) {
          return new Promise<Response>((resolve) => {
            releaseFirstSave = () => resolve(jsonResponse({ ok: true }));
          });
        }
        return jsonResponse({ ok: true });
      }
      return url === "/api/settings"
        ? jsonResponse({ bankedResetAutoApply: { enabled: false, maxPerDay: 3 } })
        : jsonResponse({ connections: [] });
    });
    const { result } = renderHook(() => useBankedResetAutoApply());
    await waitFor(() => expect(result.current.settings).not.toBeNull());

    let first: Promise<void> = Promise.resolve();
    act(() => {
      first = result.current.update({ enabled: true });
    });
    await waitFor(() => expect(releaseFirstSave).not.toBeNull());
    await act(() => result.current.update({ maxPerDay: 5 }));
    expect(patchBodies(calls)).toHaveLength(1);

    await act(async () => {
      releaseFirstSave?.();
      await first;
    });

    const bodies = patchBodies(calls);
    expect(bodies).toHaveLength(2);
    expect(bodies[0]).toMatchObject({ enabled: true, maxPerDay: 3 });
    expect(bodies[1]).toMatchObject({ enabled: true, maxPerDay: 5 });
    expect(result.current.settings).toMatchObject({ enabled: true, maxPerDay: 5 });
    expect(result.current.saving).toBe(false);
  });
});
