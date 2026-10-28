import { useState } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import {
  useConfirmedAvailabilityChange,
  useSaveQuotaWindowThresholds,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useConfirmedAvailabilityChange";
import { useCodexResetCreditRedemption } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useCodexResetCreditRedemption";
import {
  buildHealthAccount,
  type HealthConnection,
  type AvailabilityEvidence,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview";
import {
  displayAccount,
  countDisplay,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay";
import { runtimeCooldownEvidence } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/runtimeCooldown";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
for (const terminal of ["banned", "expired"])
  for (const operation of ["threshold", "reset"])
    for (const readFails of [false, true])
      it(`${operation} retains newer ${terminal} evidence when connection read fails=${readFails}`, async () => {
        vi.useFakeTimers();
        const now = Date.parse("2099-01-01T00:00:30Z");
        vi.setSystemTime(now);
        const initial: HealthConnection = {
          id: "synthetic",
          provider: "codex",
          isActive: true,
          testStatus: "active",
          runtimeObservedAt: "2099-01-01T00:00:00Z",
        };
        const evidence: AvailabilityEvidence = {
          availability: {
            id: initial.id,
            account: {
              usable: true,
              blockers: [],
              allowanceReasons: [],
              fetchedAt: "2099-01-01T00:00:20Z",
            },
            scopes: [],
          },
          availabilityObservedAt: "2099-01-01T00:00:20Z",
          cooldown: {
            id: initial.id,
            isActive: true,
            status: "terminal",
            testStatus: terminal,
            lockouts: [],
          },
          observedAt: "2099-01-01T00:00:20Z",
        };
        const events: string[] = [];
        const refresh = vi.fn(async () => {
          events.push("summary");
        });
        vi.stubGlobal(
          "fetch",
          vi.fn(async (_url, init) => {
            if (init?.method === "POST") return Response.json({ refreshPending: true });
            if (init?.method === "PUT")
              return Response.json({
                connection: {
                  ...initial,
                  testStatus: terminal,
                  quotaWindowThresholds: { session: 50 },
                },
              });
            return Response.json({
              credits: [{ selectionToken: "synthetic-selection" }],
              availableCount: 1,
            });
          })
        );
        const { result } = renderHook(() => {
          const [connections, setConnections] = useState([initial]);
          const fetchConnections = async () => {
            events.push("connections");
            if (readFails) return null;
            setConnections([
              { ...initial, testStatus: terminal, runtimeObservedAt: new Date(now).toISOString() },
            ]);
            return [];
          };
          const confirm = useConfirmedAvailabilityChange(fetchConnections, refresh);
          const save = useSaveQuotaWindowThresholds(confirm);
          const [, setErrors] = useState({});
          const [, setData] = useState({});
          const [, setTimes] = useState({});
          const reset = useCodexResetCreditRedemption(
            (_key, fallback) => fallback,
            setErrors,
            setData,
            setTimes,
            confirm
          );
          const display = displayAccount(
            buildHealthAccount(connections[0], undefined, {}, now, evidence),
            now
          );
          return { connections, save, display, ...reset };
        });
        expect(result.current.display.kind).toBe("act");
        if (operation === "reset")
          await act(async () => result.current.openCodexResetCredits(initial.id, "codex"));
        await act(async () => {
          if (operation === "threshold") await result.current.save(initial.id, { session: 50 });
          else await result.current.redeemCodexResetCredit("synthetic-selection");
        });
        expect(events).toEqual(["connections", "summary"]);
        expect(refresh).toHaveBeenCalledTimes(1);
        expect(result.current.display.kind).toBe("act");
        expect(countDisplay([result.current.display]).ok).toBe(0);
        if (readFails) expect(result.current.connections[0]).toEqual(initial);
      });

for (const terminal of ["banned", "expired"])
  it(`active confirmations only vouch for pause, never ${terminal} or cooldown recovery`, () => {
    const now = Date.parse("2099-01-01T00:00:30Z");
    const connection: HealthConnection = {
      id: "synthetic",
      provider: "openai",
      isActive: true,
      testStatus: "active",
      runtimeObservedAt: "2099-01-01T00:00:00Z",
    };
    const evidence: AvailabilityEvidence = {
      activeConfirmation: { isActive: true, confirmedAt: "2099-01-01T00:00:30Z" },
      observedAt: "2099-01-01T00:00:20Z",
      cooldown: {
        id: connection.id,
        isActive: false,
        status: "terminal",
        testStatus: terminal,
        rateLimitedUntil: "2099-01-01T00:10:00Z",
        lockouts: [{ model: "synthetic-model", remainingMs: 60_000, reason: "quota_exhausted" }],
      },
    };
    const result = runtimeCooldownEvidence(connection, evidence, now);
    expect(result.isActive).toBe(true);
    expect(result.runtime.testStatus).toBe(terminal);
    expect(result.until).toBe(Date.parse("2099-01-01T00:10:00Z"));
    expect(result.lockouts).toEqual(evidence.cooldown!.lockouts);
    expect(
      displayAccount(buildHealthAccount(connection, undefined, {}, now, evidence), now).kind
    ).toBe("act");
    const later = { ...evidence, observedAt: "2099-01-01T00:00:40Z" };
    expect(runtimeCooldownEvidence(connection, later, now).isActive).toBe(false);
  });

it("threshold confirmation waits for the authoritative connection read before summaries", async () => {
  let finishRead: () => void;
  const readGate = new Promise<void>((resolve) => {
    finishRead = resolve;
  });
  const events: string[] = [];
  const fetchConnections = vi.fn(async () => {
    events.push("connections");
    await readGate;
  });
  const refresh = vi.fn(async () => {
    events.push("summaries");
  });
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({ connection: { testStatus: "active" } }))
  );
  const { result } = renderHook(() =>
    useSaveQuotaWindowThresholds(useConfirmedAvailabilityChange(fetchConnections, refresh))
  );
  let pending: Promise<void>;
  await act(async () => {
    pending = result.current("synthetic", { session: 50 });
    await Promise.resolve();
  });
  expect(events).toEqual(["connections"]);
  expect(refresh).not.toHaveBeenCalled();
  await act(async () => {
    finishRead!();
    await pending;
  });
  expect(events).toEqual(["connections", "summaries"]);
});

it("rejected post-write reads do not fabricate confirmation evidence", async () => {
  const refresh = vi.fn(async () => {});
  const fetchConnections = vi.fn(async () => {
    throw new Error("synthetic read failure");
  });
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => Response.json({}))
  );
  const { result } = renderHook(() =>
    useSaveQuotaWindowThresholds(useConfirmedAvailabilityChange(fetchConnections, refresh))
  );
  await act(async () => {
    await result.current("synthetic", null);
  });
  expect(fetchConnections).toHaveBeenCalledTimes(1);
  expect(refresh).not.toHaveBeenCalled();
});
