"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";
import type { TokenLimit, UpsertTokenLimitInput } from "@/lib/db/tokenLimits";

export interface TokenLimitReport extends TokenLimit {
  tokensUsed: number;
  remaining: number;
  periodStartAt: number;
  nextResetAt: number | null;
}

async function fetchTokenLimits(
  apiKeyId: string,
  signal: AbortSignal,
  fallback: string
): Promise<TokenLimitReport[]> {
  const response = await fetch(`/api/usage/token-limits?apiKeyId=${encodeURIComponent(apiKeyId)}`, {
    signal,
    cache: "no-store",
  });
  const body = await response.json();
  if (!response.ok) throw new Error(extractApiErrorMessage(body, fallback));
  if (!Array.isArray(body.limits)) throw new Error(fallback);
  return body.limits;
}

export function useTokenLimits(apiKeyId: string, pauseRefresh: boolean) {
  const t = useTranslations("tokenLimits");
  const [limits, setLimits] = useState<TokenLimitReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const pendingRead = useRef<AbortController | null>(null);

  const refresh = useCallback(() => {
    pendingRead.current?.abort();
    const controller = new AbortController();
    pendingRead.current = controller;
    return fetchTokenLimits(apiKeyId, controller.signal, t("loadError"))
      .then((records) => {
        if (controller.signal.aborted) return;
        setLimits(records);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted)
          setError(err instanceof Error ? err.message : t("loadError"));
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
  }, [apiKeyId, t]);

  useEffect(() => {
    void refresh();
    return () => pendingRead.current?.abort();
  }, [refresh]);

  useEffect(() => {
    if (pauseRefresh || busy) return;
    const timer = setInterval(() => {
      if (!document.hidden) void refresh();
    }, 30000);
    return () => clearInterval(timer);
  }, [refresh, pauseRefresh, busy]);

  const mutate = async (method: "POST" | "DELETE", input: UpsertTokenLimitInput | string) => {
    if (busy) return false;
    pendingRead.current?.abort();
    setLoading(false);
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      const url =
        method === "DELETE"
          ? `/api/usage/token-limits?id=${encodeURIComponent(String(input))}`
          : "/api/usage/token-limits";
      const response = await fetch(url, {
        method,
        ...(method === "POST"
          ? {
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(input),
            }
          : {}),
      });
      const body = await response.json();
      if (!response.ok || body.success !== true) {
        throw new Error(extractApiErrorMessage(body, t("saveError")));
      }
      setNotice(t(method === "DELETE" ? "deleted" : "saved"));
      await refresh();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : t("saveError"));
      return false;
    } finally {
      setBusy(false);
    }
  };

  return { limits, loading, busy, error, notice, refresh, mutate };
}
