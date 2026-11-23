"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Icon from "@/shared/components/Icon";
import type { ApiKeyBanSummary } from "@/lib/db/apiKeys/banSummary";

const REFRESH_MS = 60_000;
const REQUEST_TIMEOUT_MS = 10_000;

export default function ApiKeyBanBanner() {
  const t = useTranslations("home");
  const common = useTranslations("common");
  const [summary, setSummary] = useState<ApiKeyBanSummary | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let pending = false;
    async function refresh() {
      if (pending || document.hidden) return;
      pending = true;
      try {
        const response = await fetch("/api/monitoring/api-key-bans", {
          credentials: "same-origin",
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(REQUEST_TIMEOUT_MS)]),
        });
        const next = response.ok ? await response.json() : null;
        if (!controller.signal.aborted) setSummary(Array.isArray(next?.keys) ? next : null);
      } catch {
        // A failed refresh must not leave security data visible after access is lost.
        if (!controller.signal.aborted) setSummary(null);
      } finally {
        pending = false;
      }
    }

    void refresh();
    const timer = window.setInterval(refresh, REFRESH_MS);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      controller.abort();
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  if (!summary?.keys.length) return null;
  const remaining = summary.total - summary.keys.length;

  return (
    <Alert
      variant="warning"
      className="mb-4"
      icon={<Icon name="security" size={18} />}
      title={t("apiKeyBanTitle", { count: summary.total })}
      description={
        <>
          <ul className="mt-1.5 space-y-0.5 break-words">
            {summary.keys.map(({ id, name, reason }) => (
              <li key={id}>
                {t("apiKeyBanEntry", {
                  name,
                  reason: common(`apiKeyBanReason.${reason ?? "unknown"}`),
                })}
              </li>
            ))}
            {remaining > 0 && <li>{t("apiKeyBanMore", { count: remaining })}</li>}
          </ul>
          <Link href="/dashboard/api-manager" className="mt-1.5 inline-block font-medium underline">
            {t("apiKeyBanManage")}
          </Link>
        </>
      }
    />
  );
}
