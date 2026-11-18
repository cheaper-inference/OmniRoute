"use client";

import { useState, useEffect, useMemo } from "react";
import type { ProviderPermissionModel as Model } from "./ProviderModelPermissionList";
import type { ProviderConnection } from "./ProviderConnectionPermissionList";
import type { AllowedComboOption } from "./AllowedCombosSection";

interface QuotaPoolItem {
  id: string;
  name?: string;
  groupId?: string;
}
interface KeyGroupItem {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
}
interface ProxyItem {
  id: string;
  name?: string;
  host?: string;
  port?: number;
}

async function loadRows<T>(url: string, fields: string[]): Promise<T[] | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) return undefined;
    const data = await response.json();
    for (const field of fields) if (Array.isArray(data[field])) return data[field] as T[];
  } catch {
    /* Failed catalogs remain unknown; never infer that their references are missing. */
  }
  return undefined;
}

async function loadModels(): Promise<Model[]> {
  const primary = await loadRows<Model>("/v1/models", ["data"]);
  if (primary) return primary;
  const fallback = await loadRows<{
    fullModel?: string;
    provider?: string;
    model?: string;
    alias?: string;
  }>("/api/models?all=true", ["models"]);
  return (fallback ?? [])
    .map((model) => ({
      id: model.fullModel ?? `${model.provider}/${model.model}`,
      owned_by: model.provider ?? "unknown",
      name: model.alias ?? model.model ?? model.fullModel,
    }))
    .filter((model) => Boolean(model.id));
}

function ids<T>(rows: T[] | undefined, select: (row: T) => string) {
  return rows === undefined ? undefined : new Set(rows.map(select));
}

export function useKeyPolicyCatalog() {
  const [allModels, setAllModels] = useState<Model[]>([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [combos, setCombos] = useState<AllowedComboOption[]>();
  const [connections, setConnections] = useState<ProviderConnection[]>();
  const [pools, setPools] = useState<QuotaPoolItem[]>();
  const [groups, setGroups] = useState<KeyGroupItem[]>();
  const [proxies, setProxies] = useState<ProxyItem[]>();

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const [models, combos, connections, pools, groups, proxies] = await Promise.all([
        loadModels(),
        loadRows<AllowedComboOption>("/api/combos", ["combos"]),
        loadRows<ProviderConnection>("/api/providers", ["connections"]),
        loadRows<QuotaPoolItem>("/api/quota/pools", ["pools"]),
        loadRows<KeyGroupItem>("/api/keys/groups", ["groups"]),
        loadRows<ProxyItem>("/api/settings/proxies", ["items", "proxies"]),
      ]);
      if (cancelled) return;
      setAllModels(models);
      setModelsLoaded(true);
      setCombos(combos);
      setConnections(connections);
      setPools(pools);
      setGroups(groups);
      setProxies(proxies);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const catalogSets = useMemo(
    () => ({
      connectionIds: ids(connections, (row) => row.id),
      comboNames: ids(combos, (row) => row.name),
      comboIds: ids(combos, (row) => row.id || row.name),
      quotaPoolIds: ids(pools, (row) => row.id),
      proxyIds: ids(proxies, (row) => row.id),
      groupIds: ids(groups, (row) => row.id),
      inactiveGroupIds: ids(
        groups?.filter((row) => row.isActive === false),
        (row) => row.id
      ),
    }),
    [connections, combos, pools, proxies, groups]
  );

  return {
    allModels,
    modelsLoaded,
    allCombos: combos ?? [],
    allConnections: connections ?? [],
    allQuotaPools: pools ?? [],
    allKeyGroups: groups ?? [],
    allProxies: proxies ?? [],
    catalogSets,
  };
}
