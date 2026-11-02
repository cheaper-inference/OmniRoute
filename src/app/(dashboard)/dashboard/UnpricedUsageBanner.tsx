"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/shared/components/Button";
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
    <div
      role={failClosed ? "alert" : "status"}
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm mb-4 ${
        failClosed
          ? "border-error/30 bg-error-bg text-error"
          : "border-warning/30 bg-warning-bg text-warning"
      }`}
    >
      <Icon name="price_change" size={18} className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold">{t("unpricedUsageTitle", { count: report.models.length })}</p>
        {(failClosed || countAsZero) && (
          <p className="mt-0.5 opacity-80">
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
        <Link href="/dashboard/costs/pricing" className="mt-1.5 inline-block font-medium underline">
          {t("unpricedUsageConfigure")}
        </Link>
      </div>
      <Button
        variant="ghost"
        size="icon-sm"
        type="button"
        onClick={() => setDismissed(true)}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity ml-1"
        aria-label={t("unpricedUsageDismiss")}
      >
        <Icon name="close" size={16} />
      </Button>
    </div>
  );
}
