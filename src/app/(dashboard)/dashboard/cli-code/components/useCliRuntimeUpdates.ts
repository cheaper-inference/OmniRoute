"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ManagedCliRuntimeItem } from "@/lib/cliTools/managedCliRuntimes";
import { refreshManagedCliProviderModels } from "@/shared/services/managedCliModelRefresh";

const API_PATH = "/api/cli-tools/runtime/managed";
const IDENTITY_PATH = "/api/settings/cli-versions";

export interface RuntimeRequestFailure {
  status: number;
  code: string | null;
  message: string | null;
}

export interface ProviderClientVersion {
  key: "codex" | "claude";
  effective: string;
  source: string;
}

type OperationKind = "load" | "check" | "batch" | "update";
type Operation = { kind: OperationKind; toolId?: string };
type UpdateSummary = {
  kind: "check" | "update";
  updated: number;
  failed: number;
  checkFailed: number;
  available: number;
  modelsRefreshed: number;
  modelRefreshFailed: number;
};

class RuntimeRequestError extends Error {
  constructor(readonly failure: RuntimeRequestFailure) {
    super("CLI runtime request failed");
  }
}

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function failureOf(error: unknown): RuntimeRequestFailure {
  return error instanceof RuntimeRequestError
    ? error.failure
    : { status: 0, code: null, message: null };
}

async function requestJson(
  url: string,
  signal: AbortSignal,
  body?: Record<string, string>
): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    signal,
    cache: "no-store",
    ...(body
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      : {}),
  });
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const error = record(data) ? data.error : null;
    const details = record(error) && record(error.details) ? error.details : null;
    throw new RuntimeRequestError({
      status: response.status,
      code:
        details && typeof details.code === "string"
          ? details.code
          : record(error) && typeof error.code === "string"
            ? error.code
            : null,
      message:
        typeof error === "string"
          ? error
          : record(error) && typeof error.message === "string"
            ? error.message
            : null,
    });
  }
  if (!record(data)) {
    throw new RuntimeRequestError({ status: 0, code: "invalid_response", message: null });
  }
  return data;
}

function isRuntimeItem(value: unknown): value is ManagedCliRuntimeItem {
  if (!record(value)) return false;
  const requiredStrings = ["id", "name", "packageName"];
  const nullableStrings = [
    "installedVersion",
    "latestVersion",
    "commandPath",
    "checkedAt",
    "error",
    "reason",
  ];
  return (
    requiredStrings.every((key) => typeof value[key] === "string") &&
    nullableStrings.every((key) => value[key] === null || typeof value[key] === "string") &&
    ["installed", "runnable", "canUpdate", "updateAvailable"].every(
      (key) => typeof value[key] === "boolean"
    ) &&
    ["managed", "external", "missing", "override"].includes(String(value.source))
  );
}

function readItems(data: Record<string, unknown>): ManagedCliRuntimeItem[] {
  if (!Array.isArray(data.items) || !data.items.every(isRuntimeItem)) {
    throw new RuntimeRequestError({ status: 0, code: "invalid_response", message: null });
  }
  return data.items;
}

export function useCliRuntimeUpdates() {
  const [items, setItems] = useState<ManagedCliRuntimeItem[]>([]);
  const [operation, setOperation] = useState<Operation | null>({ kind: "load" });
  const [error, setError] = useState<RuntimeRequestFailure | null>(null);
  const [rowErrors, setRowErrors] = useState<Record<string, RuntimeRequestFailure>>({});
  const [summary, setSummary] = useState<UpdateSummary | null>(null);
  const [identities, setIdentities] = useState<ProviderClientVersion[] | null>(null);
  const [identityFailed, setIdentityFailed] = useState(false);
  const active = useRef<AbortController | null>(null);
  const identityRequest = useRef<AbortController | null>(null);

  const refreshIdentities = useCallback(async () => {
    identityRequest.current?.abort();
    const controller = new AbortController();
    identityRequest.current = controller;
    try {
      const data = await requestJson(IDENTITY_PATH, controller.signal);
      if (!Array.isArray(data.items)) throw new Error("Invalid client version response");
      const next = data.items.filter(
        (item): item is ProviderClientVersion =>
          record(item) &&
          (item.key === "codex" || item.key === "claude") &&
          typeof item.effective === "string" &&
          typeof item.source === "string"
      );
      if (next.length !== 2 || new Set(next.map((item) => item.key)).size !== 2) {
        throw new Error("Incomplete client version response");
      }
      if (!controller.signal.aborted) {
        setIdentities(next);
        setIdentityFailed(false);
      }
    } catch {
      if (!controller.signal.aborted) setIdentityFailed(true);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    active.current = controller;
    const load = async () => {
      try {
        const data = await requestJson(API_PATH, controller.signal);
        const next = readItems(data);
        if (!controller.signal.aborted) setItems(next);
      } catch (failure) {
        if (!controller.signal.aborted) setError(failureOf(failure));
      } finally {
        if (active.current === controller && !controller.signal.aborted) {
          active.current = null;
          setOperation(null);
        }
      }
    };
    void load();
    void refreshIdentities();
    return () => {
      controller.abort();
      active.current?.abort();
      identityRequest.current?.abort();
    };
  }, [refreshIdentities]);

  const run = useCallback(
    async (kind: OperationKind, selected?: ManagedCliRuntimeItem) => {
      // A synchronous lock also blocks two clicks before React renders the disabled buttons.
      if (active.current) return;
      const controller = new AbortController();
      active.current = controller;
      const current = () => active.current === controller && !controller.signal.aborted;
      setOperation({ kind, toolId: selected?.id });
      setError(null);
      setRowErrors({});
      setSummary(null);
      const result: UpdateSummary = {
        kind: kind === "check" ? "check" : "update",
        updated: 0,
        failed: 0,
        checkFailed: 0,
        available: 0,
        modelsRefreshed: 0,
        modelRefreshFailed: 0,
      };
      try {
        let candidates = selected ? [selected] : [];
        if (kind !== "update") {
          const data = await requestJson(
            API_PATH,
            controller.signal,
            kind === "load" ? undefined : { action: "check" }
          );
          const next = readItems(data);
          if (!current()) return;
          setItems(next);
          result.checkFailed = next.filter((item) => Boolean(item.error)).length;
          result.available = next.filter((item) => item.updateAvailable).length;
          candidates =
            kind === "batch"
              ? next.filter(
                  (item) =>
                    item.installed &&
                    item.runnable &&
                    item.canUpdate &&
                    !item.error &&
                    item.updateAvailable &&
                    Boolean(item.installedVersion && item.latestVersion)
                )
              : [];
        }
        for (const candidate of candidates) {
          if (!current()) return;
          setOperation({ kind, toolId: candidate.id });
          try {
            const data = await requestJson(API_PATH, controller.signal, {
              action: "update",
              toolId: candidate.id,
            });
            if (
              !isRuntimeItem(data.item) ||
              data.item.id !== candidate.id ||
              !data.item.installed ||
              !data.item.runnable ||
              !data.item.installedVersion
            ) {
              throw new RuntimeRequestError({ status: 0, code: "invalid_response", message: null });
            }
            if (!current()) return;
            const next = data.item;
            setItems((previous) => previous.map((item) => (item.id === next.id ? next : item)));
            if (next.installedVersion !== candidate.installedVersion) result.updated += 1;
            try {
              const refresh = await refreshManagedCliProviderModels(candidate.id, fetch, {
                signal: controller.signal,
              });
              result.modelsRefreshed += refresh.refreshed;
              result.modelRefreshFailed += refresh.failed;
            } catch {
              if (current()) result.modelRefreshFailed += 1;
            }
          } catch (failure) {
            if (!current()) return;
            result.failed += 1;
            setRowErrors((previous) => ({ ...previous, [candidate.id]: failureOf(failure) }));
          }
        }
        if (!current()) return;
        if (kind === "update" || kind === "batch") await refreshIdentities();
        if (current() && kind !== "load") setSummary(result);
      } catch (failure) {
        if (current()) setError(failureOf(failure));
      } finally {
        if (current()) {
          active.current = null;
          setOperation(null);
        }
      }
    },
    [refreshIdentities]
  );

  return { items, operation, error, rowErrors, summary, identities, identityFailed, run };
}
