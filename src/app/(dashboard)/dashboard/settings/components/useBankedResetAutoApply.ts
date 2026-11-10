"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BankedResetAutoApplySettings } from "@/shared/constants/bankedResetAutoApply";
import { mergeBankedResetAutoApplyClient } from "./bankedResetAutoApplyClient";

export type BankedResetConnection = {
  id: string;
  provider: string;
  authType?: string;
  name?: string | null;
  email?: string | null;
  displayName?: string | null;
};

export type BankedResetHistoryEntry = {
  id: number | null;
  timestamp: string;
  connectionId: string | null;
  status: string | null;
  provider: string | null;
  creditType: string | null;
  mode: string | null;
  trigger: string | null;
  reason: string | null;
};

export type BankedResetHistoryData = {
  entries: BankedResetHistoryEntry[];
  counts24h: { success: number; failed: number; dryRun: number };
};

export type BankedResetSaveStatus = "" | "saved" | "error";

export function connectionLabel(conn: BankedResetConnection): string {
  return conn.displayName || conn.name || conn.email || conn.id;
}

const SCOPED_PROVIDERS = new Set(["codex", "claude"]);

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

/**
 * Stored settings merged with the defaults, plus the Codex/Claude OAuth connections.
 * A failed load must surface as an error, never as defaults: the next save PATCHes the
 * whole object, so defaults shown here would overwrite the stored caps and accounts.
 */
async function loadBankedResetAutoApply(): Promise<{
  settings: BankedResetAutoApplySettings;
  connections: BankedResetConnection[];
}> {
  const [settingsData, providersData] = await Promise.all([
    fetchJson("/api/settings"),
    fetchJson("/api/providers"),
  ]);
  const connections: BankedResetConnection[] = (providersData?.connections || []).filter(
    (c: BankedResetConnection) => SCOPED_PROVIDERS.has(c.provider) && c.authType === "oauth"
  );
  return {
    settings: mergeBankedResetAutoApplyClient(settingsData?.bankedResetAutoApply),
    connections,
  };
}

/** Settings + Codex/Claude OAuth connections; `update` PATCHes the full merged object. */
export function useBankedResetAutoApply() {
  const [settings, setSettings] = useState<BankedResetAutoApplySettings | null>(null);
  const [connections, setConnections] = useState<BankedResetConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<BankedResetSaveStatus>("");
  const settingsRef = useRef<BankedResetAutoApplySettings | null>(null);
  const savingRef = useRef(false);
  const pendingPatchRef = useRef<Partial<BankedResetAutoApplySettings> | null>(null);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadBankedResetAutoApply()
      .then(({ settings: merged, connections: scoped }) => {
        if (cancelled) return;
        settingsRef.current = merged;
        setSettings(merged);
        setConnections(scoped);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
      if (statusTimer.current) clearTimeout(statusTimer.current);
    };
  }, []);

  const update = useCallback(async (patch: Partial<BankedResetAutoApplySettings>) => {
    if (!settingsRef.current) return;
    // A change made while a save is in flight is queued and saved right after, never dropped.
    pendingPatchRef.current = { ...pendingPatchRef.current, ...patch };
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    try {
      while (pendingPatchRef.current && settingsRef.current) {
        const queued = pendingPatchRef.current;
        pendingPatchRef.current = null;
        await saveOnce(settingsRef.current, queued);
      }
    } finally {
      savingRef.current = false;
      setSaving(false);
    }

    async function saveOnce(
      previous: BankedResetAutoApplySettings,
      queued: Partial<BankedResetAutoApplySettings>
    ) {
      setStatus("");
      if (statusTimer.current) clearTimeout(statusTimer.current);
      const next = { ...previous, ...queued };
      settingsRef.current = next;
      setSettings(next);
      try {
        const res = await fetch("/api/settings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bankedResetAutoApply: next }),
        });
        if (res.ok) {
          setStatus("saved");
          statusTimer.current = setTimeout(() => setStatus(""), 2000);
          return;
        }
      } catch {
        // fall through to the restore below
      }
      settingsRef.current = previous;
      setSettings(previous);
      setStatus("error");
    }
  }, []);

  return { settings, connections, loading, saving, status, update };
}

async function fetchBankedResetHistory(limit: number): Promise<BankedResetHistoryData> {
  const res = await fetch(`/api/settings/banked-reset-auto/history?limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(String(res.status));
  const body = await res.json();
  return {
    entries: Array.isArray(body?.entries) ? body.entries : [],
    counts24h: {
      success: Number(body?.counts24h?.success) || 0,
      failed: Number(body?.counts24h?.failed) || 0,
      dryRun: Number(body?.counts24h?.dryRun) || 0,
    },
  };
}

/** Last redemption attempts (newest first) for the history table. */
export function useBankedResetHistory(limit = 50) {
  const [data, setData] = useState<BankedResetHistoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await fetchBankedResetHistory(limit));
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    let cancelled = false;
    fetchBankedResetHistory(limit)
      .then((next) => {
        if (!cancelled) setData(next);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [limit]);

  const reload = useCallback(() => {
    setLoading(true);
    return load();
  }, [load]);

  return { data, loading, failed, reload };
}
