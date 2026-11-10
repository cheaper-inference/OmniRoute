import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import ProviderLimits from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits";
import { queueSummaryRefresh } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/queueSummaryRefresh";
import { useState } from "react";
import {
  useConfirmedAvailabilityChange,
  useSaveQuotaWindowThresholds,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useConfirmedAvailabilityChange";
import { useCodexResetCreditRedemption } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useCodexResetCreditRedemption";
vi.unmock("next-intl");
vi.mock("@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCard", () => ({
  default: ({ connection, onToggleActive }) => (
    <button data-active={String(connection.isActive)} onClick={() => onToggleActive(false)}>
      Synthetic disable
    </button>
  ),
}));
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
for (const summaryFails of [false, true])
  it(`successful local disable removes available capsules with summary failure ${summaryFails}`, async () => {
    vi.useFakeTimers();
    vi.setSystemTime("2099-01-01T00:00:00Z");
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    let serverActive = true;
    let writes = 0;
    let reads = 0;
    const conn = {
      id: "local-disable",
      provider: "claude",
      authType: "oauth",
      isActive: true,
      testStatus: "active",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input, init) => {
        const url = String(input);
        if (
          writes &&
          summaryFails &&
          ["/api/resilience/cooldowns", "/api/usage/availability"].includes(url)
        ) {
          if (url === "/api/usage/availability") reads++;
          throw new Error("Synthetic summary failure");
        }
        if (url === "/api/providers/client")
          return Response.json({ connections: [{ ...conn, isActive: serverActive }] });
        if (url === "/api/usage/provider-limits")
          return Response.json({
            caches: {
              [conn.id]: {
                fetchedAt: new Date().toISOString(),
                quotas: { session: { remainingPercentage: 80, used: 20, total: 100 } },
              },
            },
          });
        if (url === "/api/usage/availability") {
          reads++;
          return Response.json({
            generatedAt: new Date().toISOString(),
            connections: [
              {
                id: conn.id,
                account: { usable: true, blockers: [], allowanceReasons: [] },
                scopes: [],
              },
            ],
          });
        }
        if (url === "/api/resilience/cooldowns")
          return Response.json({
            generatedAt: new Date().toISOString(),
            connections: [
              {
                id: conn.id,
                isActive: serverActive,
                status: "healthy",
                testStatus: "active",
                lockouts: [],
              },
            ],
          });
        if (url === `/api/providers/${conn.id}` && init?.method === "PUT") {
          expect(JSON.parse(init.body)).toEqual({ isActive: false });
          serverActive = false;
          writes++;
          return Response.json({ connection: { ...conn, isActive: false } });
        }
        if (["/api/providers/quota-windows", "/api/settings"].includes(url))
          return Response.json({});
        if (url.startsWith("/api/provider-models?")) return Response.json({ models: [] });
        throw Error(`Unexpected request: ${url}`);
      })
    );
    render(
      <NextIntlClientProvider
        locale="en"
        timeZone="UTC"
        messages={{ usage: en.usage, common: en.common }}
      >
        <ProviderLimits />
      </NextIntlClientProvider>
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(31_000);
    });
    expect(document.querySelector("[data-account]")?.getAttribute("data-kind")).toBe("ok");
    const previousReads = reads;
    fireEvent.click(document.querySelector("[data-account]")!);
    fireEvent.click(screen.getByRole("button", { name: "Synthetic disable" }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(writes).toBe(1);
    expect(serverActive).toBe(false);
    expect(
      screen.getByRole("button", { name: "Synthetic disable" }).getAttribute("data-active")
    ).toBe("false");
    expect(document.querySelector("[data-account]")?.getAttribute("data-kind")).toBe("paused");
    expect(document.querySelector('[data-stat="ok"] .text-2xl')?.textContent).toBe("0");
    expect(reads).toBe(previousReads + 1);
  });

it("a confirmed mutation queues a fresh summary behind an older in-flight read", async () => {
  let finish: () => void;
  const gate = new Promise<void>((resolve) => {
    finish = resolve;
  });
  const read = vi.fn(async () => {
    if (read.mock.calls.length === 1) await gate;
  });
  const refresh = queueSummaryRefresh(read);
  const before = refresh();
  await Promise.resolve();
  const after = refresh();
  expect(read).toHaveBeenCalledTimes(1);
  finish!();
  await Promise.all([before, after]);
  expect(read).toHaveBeenCalledTimes(2);
});
it("a failed earlier summary cannot suppress the next confirmed refresh", async () => {
  const read = vi
    .fn()
    .mockRejectedValueOnce(new Error("synthetic failure"))
    .mockResolvedValueOnce(undefined);
  const refresh = queueSummaryRefresh(read);
  await expect(refresh()).rejects.toThrow("synthetic failure");
  await refresh();
  expect(read).toHaveBeenCalledTimes(2);
});

for (const ok of [true, false])
  it(`threshold write ${ok ? "success" : "failure"} refreshes without local runtime timestamps`, async () => {
    const refresh = vi.fn(async () => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        Response.json(ok ? { connection: { quotaWindowThresholds: { session: 50 } } } : {}, {
          status: ok ? 200 : 500,
        })
      )
    );
    const { result } = renderHook(() => {
      const [connections, setConnections] = useState([
        {
          id: "synthetic",
          runtimeObservedAt: "2000-01-01T00:00:00Z",
          quotaWindowThresholds: null as Record<string, number> | null,
        },
      ]);
      const fetchConnections = async () => {
        setConnections((previous) =>
          previous.map((connection) => ({
            ...connection,
            quotaWindowThresholds: { session: 50 },
          }))
        );
      };
      const confirm = useConfirmedAvailabilityChange(fetchConnections, refresh);
      return { connections, save: useSaveQuotaWindowThresholds(confirm) };
    });
    await act(async () => {
      if (ok) await result.current.save("synthetic", { session: 50 });
      else
        await expect(result.current.save("synthetic", { session: 50 })).rejects.toThrow("HTTP 500");
    });
    expect(refresh).toHaveBeenCalledTimes(Number(ok));
    expect(result.current.connections[0].quotaWindowThresholds).toEqual(
      ok ? { session: 50 } : null
    );
    expect(result.current.connections[0].runtimeObservedAt).toBe("2000-01-01T00:00:00Z");
  });

for (const outcome of ["usage", "pending", "failure"])
  it(`reset credit ${outcome} refreshes evidence only after a committed write`, async () => {
    const refresh = vi.fn(async () => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url, init) => {
        if (init?.method !== "POST")
          return Response.json({
            credits: [{ selectionToken: "synthetic-selection" }],
            availableCount: 1,
          });
        if (outcome === "failure")
          return Response.json({ error: "synthetic failure" }, { status: 500 });
        return Response.json(
          outcome === "pending" ? { refreshPending: true } : { usage: { quotas: {} } }
        );
      })
    );
    const { result } = renderHook(() => {
      const [connections] = useState([
        { id: "synthetic", runtimeObservedAt: "2000-01-01T00:00:00Z" },
      ]);
      const [, setErrors] = useState({});
      const [, setData] = useState({});
      const [, setTimes] = useState({});
      const confirm = useConfirmedAvailabilityChange(async () => null, refresh);
      return {
        connections,
        ...useCodexResetCreditRedemption(
          (_key, fallback) => fallback,
          setErrors,
          setData,
          setTimes,
          confirm
        ),
      };
    });
    await act(async () => result.current.openCodexResetCredits("synthetic", "codex"));
    expect(result.current.resetCreditPicker).not.toBeNull();
    await act(async () => result.current.redeemCodexResetCredit("synthetic-selection"));
    const committed = outcome !== "failure";
    expect(refresh).toHaveBeenCalledTimes(Number(committed));
    expect(result.current.connections[0].runtimeObservedAt).toBe("2000-01-01T00:00:00Z");
  });
