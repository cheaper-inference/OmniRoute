"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { queueSummaryRefresh } from "./queueSummaryRefresh";
import { fetchWithTimeout } from "@/shared/utils/fetchTimeout";
import {
  buildHealthAccount,
  type AvailabilityEvidence,
  type HealthConnection,
  type HealthCooldown,
  type HealthData,
} from "./healthOverview";
import type { QuotaAvailabilitySummary } from "@/lib/usage/availabilityTypes";
import {
  hasTerminalStatus,
  parseRuntimeTimestamp,
  runtimeCooldownEvidence,
  sameCooldown,
  SUMMARY_FRESHNESS_MS,
  type CooldownObservation,
} from "./runtimeCooldown";

async function readSummary(path: string) {
  const response = await fetchWithTimeout(path, {
    timeoutMs: 20_000,
    method: "GET",
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
function validCooldown(row: HealthCooldown): boolean {
  return (
    !!row &&
    typeof row.id === "string" &&
    ["terminal", "cooling_down", "model_locked", "unavailable", "healthy"].includes(row.status) &&
    Array.isArray(row.lockouts) &&
    row.lockouts.every(
      (lock) => typeof lock.model === "string" && Number.isFinite(lock.remainingMs)
    )
  );
}
type CooldownSnapshot = {
  rows: Record<string, { cooldown: HealthCooldown; observedAt: string | number }>;
  observedAt?: string | number;
  receivedAt?: number;
};
function useCooldownSummary(setNow: (value: number) => void) {
  const [snapshot, setSnapshot] = useState<CooldownSnapshot>({ rows: {} });
  const readCooldowns = useCallback(async () => {
    try {
      const data = await readSummary("/api/resilience/cooldowns");
      if (
        !Array.isArray(data.connections) ||
        !data.connections.every(validCooldown) ||
        !Number.isFinite(parseRuntimeTimestamp(data.generatedAt))
      )
        throw new Error("Invalid cooldown summary");
      const receivedAt = Date.now();
      setSnapshot((previous) => {
        if (parseRuntimeTimestamp(data.generatedAt) <= parseRuntimeTimestamp(previous.observedAt))
          return previous;
        const rows: CooldownSnapshot["rows"] = Object.fromEntries(
          (data.connections as HealthCooldown[]).map((cooldown) => [
            cooldown.id,
            {
              cooldown: {
                ...cooldown,
                isActive: typeof cooldown.isActive === "boolean" ? cooldown.isActive : undefined,
              },
              observedAt: data.generatedAt as string | number,
            },
          ])
        );
        for (const [id, entry] of Object.entries(previous.rows))
          if (!rows[id] && hasTerminalStatus(entry.cooldown)) rows[id] = entry;
        return { rows, observedAt: data.generatedAt, receivedAt };
      });
    } catch {
      // Keep the last successful snapshot; only nonterminal fields expire.
    } finally {
      setNow(Date.now());
    }
  }, [setNow]);
  return {
    snapshot,
    refreshCooldowns: useMemo(() => queueSummaryRefresh(readCooldowns), [readCooldowns]),
  };
}
function useQuotaSummary(setNow: (value: number) => void) {
  const [availability, setAvailability] = useState<QuotaAvailabilitySummary>();
  const readQuota = useCallback(async () => {
    try {
      const data = (await readSummary("/api/usage/availability")) as QuotaAvailabilitySummary;
      if (
        !Number.isFinite(parseRuntimeTimestamp(data.generatedAt)) ||
        !Array.isArray(data.connections) ||
        !data.connections.every(
          (row) =>
            typeof row.id === "string" &&
            row.account &&
            Array.isArray(row.scopes) &&
            [row.account, ...row.scopes.map((scope) => scope.decision)].every(
              (decision) =>
                decision &&
                (decision.usable === null || typeof decision.usable === "boolean") &&
                Array.isArray(decision.blockers) &&
                Array.isArray(decision.allowanceReasons)
            )
        )
      )
        throw new Error("Invalid quota availability summary");
      setAvailability((previous) =>
        !previous ||
        parseRuntimeTimestamp(data.generatedAt) > parseRuntimeTimestamp(previous.generatedAt)
          ? data
          : previous
      );
    } catch {
      // Preserve the last successful conclusion for 90 seconds; never infer from meters.
    } finally {
      setNow(Date.now());
    }
  }, [setNow]);
  return { availability, refreshQuota: useMemo(() => queueSummaryRefresh(readQuota), [readQuota]) };
}
function summaryIsFailed(snapshot: CooldownSnapshot, now: number) {
  return (
    snapshot.receivedAt === undefined ||
    now - snapshot.receivedAt > SUMMARY_FRESHNESS_MS ||
    now - parseRuntimeTimestamp(snapshot.observedAt) > SUMMARY_FRESHNESS_MS
  );
}
function useCooldownObservations(
  connections: HealthConnection[],
  snapshot: CooldownSnapshot,
  summaryFailed: boolean,
  setNow: (value: number) => void
) {
  const [observations, setObservations] = useState(() => new Map<string, CooldownObservation>());
  useEffect(() => {
    const observedAt = Date.now();
    const timer = window.setTimeout(() => {
      setNow(observedAt);
      setObservations((previous) => {
        const next = new Map<string, CooldownObservation>();
        for (const connection of connections) {
          const cooldown = runtimeCooldownEvidence(
            connection,
            {
              cooldown: snapshot.rows[connection.id]?.cooldown,
              observedAt: snapshot.rows[connection.id]?.observedAt,
              summaryFailed,
            },
            observedAt
          );
          const old = previous.get(connection.id);
          if (sameCooldown(old, cooldown)) next.set(connection.id, old!);
          else if (cooldown.until > observedAt)
            next.set(connection.id, {
              until: cooldown.until,
              derived: cooldown.derived,
              observedAt,
              startedAt:
                parseRuntimeTimestamp(cooldown.runtime.lastErrorAt) < cooldown.until
                  ? parseRuntimeTimestamp(cooldown.runtime.lastErrorAt)
                  : observedAt,
            });
        }
        return next.size === previous.size &&
          [...next].every(([id, value]) => previous.get(id) === value)
          ? previous
          : next;
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [connections, snapshot, summaryFailed, setNow]);
  return observations;
}
/** Read-only state summaries. The ticking projection never sends model requests or fetches quotas. */
export function useAvailability(
  connections: HealthConnection[],
  quotaData: Record<string, HealthData>,
  errors: Record<string, string | null>,
  activeConfirmations: Record<string, AvailabilityEvidence["activeConfirmation"]> = {}
) {
  const [now, setNow] = useState(() => Date.now());
  const { snapshot, refreshCooldowns } = useCooldownSummary(setNow);
  const { availability, refreshQuota } = useQuotaSummary(setNow);
  const summaryFailed = summaryIsFailed(snapshot, now);
  const cooldownObservations = useCooldownObservations(
    connections,
    snapshot,
    summaryFailed,
    setNow
  );
  const refreshAvailability = useCallback(async () => {
    await Promise.all([refreshCooldowns(), refreshQuota()]);
  }, [refreshCooldowns, refreshQuota]);
  useEffect(() => {
    const timer = window.setTimeout(() => void refreshAvailability(), 0);
    return () => window.clearTimeout(timer);
  }, [refreshAvailability]);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    const poll = window.setInterval(() => {
      if (document.visibilityState === "visible") void refreshAvailability();
    }, 30_000);
    const visible = () => {
      setNow(Date.now());
      if (document.visibilityState === "visible") void refreshAvailability();
    };
    document.addEventListener("visibilitychange", visible);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [refreshAvailability]);
  const accounts = useMemo(
    () =>
      Object.fromEntries(
        connections.map((connection) => {
          const evidence: AvailabilityEvidence = {
            activeConfirmation: activeConfirmations[connection.id],
            availability: availability?.connections.find((row) => row.id === connection.id),
            availabilityObservedAt: availability?.generatedAt,
            cooldown: snapshot.rows[connection.id]?.cooldown,
            observedAt: snapshot.rows[connection.id]?.observedAt,
            summaryFailed,
            error: errors[connection.id],
          };
          const observation = cooldownObservations.get(connection.id);
          if (sameCooldown(observation, runtimeCooldownEvidence(connection, evidence, now))) {
            evidence.cooldownObservedAt = observation!.observedAt;
            evidence.cooldownDeadline = observation!.until;
            evidence.cooldownStartedAt = observation!.startedAt;
          }
          return [
            connection.id,
            buildHealthAccount(connection, quotaData[connection.id], {}, now, evidence),
          ];
        })
      ),
    [
      connections,
      activeConfirmations,
      quotaData,
      errors,
      availability,
      snapshot,
      now,
      summaryFailed,
      cooldownObservations,
    ]
  );
  return { accounts, refreshAvailability, summaryFailed };
}
