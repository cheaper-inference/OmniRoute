"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Alert } from "@omniroute/ui-kit/alert";
import Icon from "@/shared/components/Icon";

interface UnpricedUsageModel {
  provider: string;
  model: string;
  requests: number;
  apiKeys: number;
  limitedApiKeys: number;
}

interface UnpricedUsageReport {
  policy: "fail_closed" | "count_as_zero";
  models: UnpricedUsageModel[];
  limitedApiKeysAffected: number;
}

const MAX_LISTED_MODELS = 5;

/**
 * Admin notice for usage whose provider/model has no pricing row (#12341).
 *
 * Under the default UNPRICED_USAGE_BUDGET_POLICY (`fail_closed`) any per-key
 * USD limit whose window contains such usage is treated as exceeded, so the
 * affected keys stop working until the model is priced. The notice names the
 * models, how many limited keys they affect, and links to the pricing editor.
 * Dismissing only hides it for the current page view, so the reminder returns
 * on the next visit until the gap is fixed.
 */
export default function UnpricedUsageBanner() {
  const t = useTranslations("home");
  const [report, setReport] = useState<UnpricedUsageReport | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/pricing/unpriced-usage", { credentials: "same-origin" })
      .then((res) => (res.ok ? res.json() : null))
      .then((body: UnpricedUsageReport | null) => {
        if (!cancelled && body && Array.isArray(body.models)) setReport(body);
      })
      .catch(() => {
        // Best-effort notice: a failed fetch simply hides the banner.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (dismissed || !report || report.models.length === 0) return null;

  const failClosed = report.policy !== "count_as_zero" && report.limitedApiKeysAffected > 0;
  const countAsZero = report.policy === "count_as_zero";
  const listed = report.models.slice(0, MAX_LISTED_MODELS);
  const hidden = report.models.length - listed.length;

  return (
    <Alert
      variant={failClosed ? "critical" : "warning"}
      className="mb-4"
      icon={<Icon name="price_change" size={18} />}
      title={t("unpricedUsageTitle", { count: report.models.length })}
      description={
        <>
          {(failClosed || countAsZero) && (
            <p>
              {failClosed
                ? t("unpricedUsageFailClosed", { keys: report.limitedApiKeysAffected })
                : t("unpricedUsageCountAsZero")}
            </p>
          )}
          <ul className="mt-1.5 space-y-0.5 font-mono text-xs">
            {listed.map((m) => (
              <li key={`${m.provider}/${m.model}`}>
                {m.provider}/{m.model}
                <span className="opacity-70">
                  {" — "}
                  {t("unpricedUsageModelStats", { requests: m.requests, keys: m.limitedApiKeys })}
                </span>
              </li>
            ))}
            {hidden > 0 && (
              <li className="opacity-70">{t("unpricedUsageMore", { count: hidden })}</li>
            )}
          </ul>
          <Link
            href="/dashboard/costs/pricing"
            className="mt-1.5 inline-block font-medium underline"
          >
            {t("unpricedUsageConfigure")}
          </Link>
        </>
      }
      dismissLabel={t("unpricedUsageDismiss")}
      onDismiss={() => setDismissed(true)}
    />
  );
}
