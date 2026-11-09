import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useAvailability } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useAvailability";

const connection = {
  id: "synthetic-disabled-hook",
  provider: "openai",
  isActive: true,
  testStatus: "active",
  runtimeObservedAt: "2098-12-31T23:59:59Z",
};
const connections = [connection];
const quotaData = {};
const errors = {};
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

for (const isActive of [false, "false", 0, null, undefined]) {
  it(`accepts a cooldown row while ignoring a nonboolean active field (${String(isActive)})`, async () => {
    vi.useFakeTimers();
    vi.setSystemTime("2099-01-01T00:00:00Z");
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string) => {
        if (input === "/api/usage/availability")
          return Response.json({
            generatedAt: new Date().toISOString(),
            connections: [
              {
                id: connection.id,
                account: { usable: true, blockers: [], allowanceReasons: [] },
                scopes: [],
              },
            ],
          });
        return Response.json({
          generatedAt: new Date().toISOString(),
          connections: [
            { id: connection.id, status: "healthy", isActive, testStatus: "active", lockouts: [] },
          ],
        });
      })
    );
    const { result } = renderHook(() => useAvailability(connections, quotaData, errors));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    const account = result.current.accounts[connection.id];
    expect(result.current.summaryFailed).toBe(false);
    expect(account.runtimeObservedAt).toBe("2099-01-01T00:00:00.000Z");
    expect(account.status).toBe(isActive === false ? "paused" : "ok");
    expect(account.runtimeAvailability?.state).toBe(isActive === false ? "DISABLED" : "AVAILABLE");
  });
}
