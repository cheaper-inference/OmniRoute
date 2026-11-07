import { availability, healthyResponse } from "./quota-availability-fixtures";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useAvailability } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useAvailability";
import { buildHealthAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";
import { displayAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay";
const t0 = Date.parse("2099-01-01T00:00:00Z"),
  H = 3_600_000;
const data = { quotas: [{ name: "weekly", remainingPercentage: 100 }] };
const policy = { enabled: false, defaultThresholdPercent: 2, providerWindowDefaults: {} };
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
const clocks = [t0, t0 + H - 1, t0 + H, t0 + 5 * H, t0 + 6 * H + 1];
function checkStable(project: (clock: number) => ReturnType<typeof displayAccount>) {
  const samples = clocks.map(project);
  expect(samples.map((a) => a.kind)).toEqual(["cdw", "cdw", "cdw", "cdw", "ok"]);
  expect(samples[0].fill).toBe(0);
  expect(samples[2].fill).toBeCloseTo(100 / 6);
  for (let i = 1; i < samples.length; i++)
    expect(samples[i].fill!).toBeGreaterThanOrEqual(samples[i - 1].fill!);
}
it("six-hour runtime evidence uses total duration, not ticking remaining time", () => {
  const connection = {
    id: "synthetic",
    provider: "claude",
    isActive: true,
    lastErrorAt: new Date(t0).toISOString(),
    rateLimitedUntil: new Date(t0 + 6 * H).toISOString(),
  };
  checkStable((clock) =>
    displayAccount(
      buildHealthAccount(connection, data, {}, clock, {
        availability: availability(connection.id),
        availabilityObservedAt: clock,
      }),
      clock
    )
  );
});
it("projecting the identical built evidence also expires locally without reclassification", () => {
  const account = buildHealthAccount(
    {
      id: "synthetic",
      provider: "claude",
      isActive: true,
      lastErrorAt: new Date(t0).toISOString(),
      rateLimitedUntil: new Date(t0 + 6 * H).toISOString(),
    },
    data,
    {},
    t0,
    { availability: availability("synthetic"), availabilityObservedAt: t0 }
  );
  // Refresh only the independent server verdict; runtime evidence stays identical.
  checkStable((clock) =>
    displayAccount({ ...account, quotaAvailabilityValidUntil: clock + 90_000 }, clock)
  );
});
it.each(["claude", "codex"])("30-minute runtime cooldown is cd5 even for %s", (provider) => {
  const account = buildHealthAccount(
    {
      id: "short",
      provider,
      isActive: true,
      lastErrorAt: new Date(t0).toISOString(),
      rateLimitedUntil: new Date(t0 + H / 2).toISOString(),
    },
    data,
    {},
    t0,
    { policy }
  );
  expect(displayAccount(account, t0).kind).toBe("cd5");
  expect(displayAccount(account, t0).fill).toBe(0);
  expect(displayAccount(account, t0 + H / 4).fill).toBe(50);
});
it("component remembers first observation by connection id + until; new until resets it", async () => {
  vi.useFakeTimers();
  vi.setSystemTime(t0);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url === "/api/usage/availability") return healthyResponse(["no-start", "other"]);
      if (url === "/api/resilience/cooldowns") throw Error("synthetic unavailable summary");
      throw Error(`Unexpected request ${url}`);
    })
  );
  const original = {
    id: "no-start",
    provider: "claude",
    isActive: true,
    rateLimitedUntil: new Date(t0 + 6 * H).toISOString(),
  };
  const { result, rerender } = renderHook(
    ({ connections }) => useAvailability(connections, { "no-start": data, other: data }, {}),
    { initialProps: { connections: [original] } }
  );
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
  const flush = () =>
    act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
  const samples = [];
  for (const clock of clocks) {
    vi.setSystemTime(clock);
    rerender({ connections: [{ ...original }] });
    await act(async () => {
      await result.current.refreshAvailability();
    });
    await flush();
    samples.push(displayAccount(result.current.accounts[original.id], clock));
  }
  checkStable((clock) => samples[clocks.indexOf(clock)]);
  const later = t0 + 7 * H;
  vi.setSystemTime(later);
  rerender({
    connections: [{ ...original, rateLimitedUntil: new Date(later + H / 2).toISOString() }],
  });
  await flush();
  const reset = displayAccount(result.current.accounts[original.id], later);
  expect(reset.kind).toBe("cd5");
  expect(reset.fill).toBe(0);
  rerender({
    connections: [
      { ...original, id: "other", rateLimitedUntil: new Date(later + H / 4).toISOString() },
    ],
  });
  await flush();
  const other = displayAccount(result.current.accounts.other, later);
  expect(other.kind).toBe("cd5");
  expect(other.fill).toBe(0);
});
