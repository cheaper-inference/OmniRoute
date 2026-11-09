import { healthyResponse } from "./quota-availability-fixtures";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useAvailability } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useAvailability";
import { buildHealthAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";
import { displayAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay";
const t0 = Date.parse("2099-01-01T00:00:00Z"),
  H = 3600000;
const iso = (n: number) => new Date(n).toISOString();
const policy = { enabled: false, defaultThresholdPercent: 2, providerWindowDefaults: {} };
const data = { quotas: [{ name: "weekly", remainingPercentage: 80 }] };
const connection = { id: "a", provider: "claude", isActive: true };
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
const flush = (ms = 0) =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
function setup(makeRow: () => any, generatedAt: () => any = () => iso(Date.now())) {
  vi.useFakeTimers();
  vi.setSystemTime(t0);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      if (url === "/api/usage/availability") return healthyResponse(["a"]);
      if (url === "/api/resilience/cooldowns")
        return Response.json({ generatedAt: generatedAt(), connections: [makeRow()] });
      throw Error("Unexpected " + url);
    })
  );
}
const row = (extra = {}) => ({
  id: "a",
  status: "cooling_down",
  testStatus: "unavailable",
  lockouts: [],
  ...extra,
});
it.each([true, false])(
  "stable cooldown identity despite polling jitter, explicit=%s",
  async (explicit) => {
    let lag = 1;
    setup(
      () =>
        row({
          rateLimitedUntil: explicit ? iso(t0 + 6 * H) : null,
          cooldownRemainingMs: t0 + 6 * H - Date.now(),
        }),
      () => iso(Date.now() + lag)
    );
    const connections = [connection];
    const { result } = renderHook(() => useAvailability(connections, { a: data }, {}));
    await flush();
    await flush(1);
    await flush(29998);
    const before = displayAccount(result.current.accounts.a, Date.now());
    lag = 2;
    await flush(2);
    await flush(1);
    const after = displayAccount(result.current.accounts.a, Date.now());
    expect(after.kind).toBe(before.kind);
    expect(after.fill!).toBeGreaterThanOrEqual(before.fill!);
    expect(after.recoverAt).toBe(before.recoverAt);
  }
);
it("fresh summary event supplies duration instead of yesterday's connection event", async () => {
  setup(() =>
    row({ rateLimitedUntil: iso(t0 + H / 2), cooldownRemainingMs: H / 2, lastErrorAt: iso(t0) })
  );
  const connections = [{ ...connection, lastErrorAt: iso(t0 - 24 * H) }];
  const { result } = renderHook(() => useAvailability(connections, { a: data }, {}));
  await flush();
  await flush(1);
  const a = displayAccount(result.current.accounts.a, Date.now());
  expect(a.kind).toBe("cd5");
  expect(a.fill!).toBeLessThan(0.01);
  expect(a.reasons.find((r) => r.type === "cooldown")?.durationMs).toBe(H / 2);
});
it.each([String(t0 + H), `${t0 + H}.0`, t0 + H, iso(t0 + H)])(
  "fallback deadline format %s stays blocked",
  (deadline) => {
    const a = displayAccount(
      buildHealthAccount(
        { ...connection, rateLimitedUntil: deadline as any, lastErrorAt: String(t0) },
        data,
        {},
        t0,
        { policy }
      ),
      t0
    );
    expect(a.kind).toBe("cd5");
    expect(a.fill).toBe(0);
    expect(a.runtimeAvailability?.state).toBe("UNHEALTHY");
  }
);
it.each([t0, String(t0), `${t0}.0`, iso(t0)])(
  "summary timestamp and error timestamp accept %s",
  async (timestamp) => {
    setup(
      () => row({ cooldownRemainingMs: H / 2, lastErrorAt: timestamp }),
      () => timestamp
    );
    const connections = [{ ...connection, lastErrorAt: iso(t0 - 24 * H) }];
    const { result } = renderHook(() => useAvailability(connections, { a: data }, {}));
    await flush();
    await flush(1);
    expect(result.current.summaryFailed).toBe(false);
    const a = displayAccount(result.current.accounts.a, Date.now());
    expect(a.kind).toBe("cd5");
    expect(a.fill!).toBeLessThan(0.01);
  }
);
it("fresh healthy summary including null clears every obsolete connection runtime field", async () => {
  setup(() =>
    row({
      status: "healthy",
      testStatus: null,
      lastErrorAt: null,
      lastErrorType: null,
      rateLimitedUntil: null,
      cooldownRemainingMs: 0,
    })
  );
  const connections = [
    {
      ...connection,
      testStatus: "banned",
      lastErrorType: "server_error",
      rateLimitedUntil: iso(t0 + H),
      lastErrorAt: iso(t0 - H),
    },
  ];
  const { result } = renderHook(() => useAvailability(connections, { a: data }, {}));
  await flush();
  await flush(1);
  expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("ok");
  expect(result.current.accounts.a.runtimeAvailability?.state).toBe("AVAILABLE");
});
it.each(["failed", "expired", "missing-row"])(
  "%s summary falls back to connection cooldown",
  async (mode) => {
    setup(
      () =>
        mode === "missing-row"
          ? { ...row(), id: "other" }
          : row({ status: "healthy", rateLimitedUntil: null, cooldownRemainingMs: 0 }),
      () => (mode === "expired" ? iso(t0 - 90001) : mode === "failed" ? "invalid" : iso(Date.now()))
    );
    const connections = [{ ...connection, rateLimitedUntil: `${t0 + H}.0`, lastErrorAt: iso(t0) }];
    const { result } = renderHook(() => useAvailability(connections, { a: data }, {}));
    await flush();
    await flush(1);
    expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("cd5");
  }
);
it("a failed poll keeps a fresh successful summary until it expires", async () => {
  let fail = false;
  setup(() => {
    if (fail) throw Error("synthetic failure");
    return row({ status: "healthy", rateLimitedUntil: null });
  });
  const connections = [{ ...connection, rateLimitedUntil: iso(t0 + H), lastErrorAt: iso(t0) }];
  const { result } = renderHook(() => useAvailability(connections, { a: data }, {}));
  await flush();
  await flush(1);
  expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("ok");
  fail = true;
  await flush(30000);
  expect(result.current.summaryFailed).toBe(false);
  expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("ok");
  await flush(61000);
  expect(result.current.summaryFailed).toBe(true);
  expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("cd5");
});
it("invalid start after deadline uses the first local observation", async () => {
  setup(() => row({ rateLimitedUntil: iso(t0 + H / 2), lastErrorAt: iso(t0 + H) }));
  const connections = [connection];
  const { result } = renderHook(() => useAvailability(connections, { a: data }, {}));
  await flush();
  await flush(1);
  await flush(1000);
  const a = displayAccount(result.current.accounts.a, Date.now());
  expect(a.kind).toBe("cd5");
  expect(a.fill!).toBeGreaterThan(0);
});
