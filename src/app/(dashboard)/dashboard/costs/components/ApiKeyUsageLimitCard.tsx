"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Input, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";

export interface ApiKeyUsageLimitPayload {
  key: {
    id: string;
    name: string;
    usageLimitEnabled: boolean;
    dailyUsageLimitUsd: number | null;
    weeklyUsageLimitUsd: number | null;
  };
  status: {
    enabled: boolean;
    dailyLimitUsd: number | null;
    weeklyLimitUsd: number | null;
    dailySpentUsd: number;
    weeklySpentUsd: number;
    dailyWindowStartIso: string;
    dailyResetAtIso: string;
    weeklyWindowStartIso: string;
    weeklyResetAtIso: string | null;
    dailyExceeded: boolean;
    weeklyExceeded: boolean;
  };
}

export interface ApiKeyUsageLimitSavePayload {
  usageLimitEnabled: boolean;
  dailyUsageLimitUsd: number | null;
  weeklyUsageLimitUsd: number | null;
}

function createCurrencyFormatter(locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseUsdInput(value: string): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function formatResetHint(resetAtIso: string | null, t: ReturnType<typeof useTranslations>): string {
  if (!resetAtIso) return t("fallbackRollingDays", { days: 7 });
  const resetMs = Date.parse(resetAtIso);
  if (!Number.isFinite(resetMs)) return t("fallbackRollingDays", { days: 7 });
  const deltaMs = resetMs - Date.now();
  if (deltaMs <= 0) return t("resetDueNow");
  const hourMs = 60 * 60 * 1000;
  const dayMs = 24 * hourMs;
  if (deltaMs < dayMs) {
    return t("resetsInHours", { count: Math.max(1, Math.ceil(deltaMs / hourMs)) });
  }
  return t("resetsInDays", { count: Math.max(1, Math.ceil(deltaMs / dayMs)) });
}

function UsageQuotaMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg-subtle px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-text-muted font-semibold">{label}</p>
      <p className="text-lg font-semibold text-text-main mt-1">{value}</p>
    </div>
  );
}

export function ApiKeyUsageLimitCard({
  payload,
  loading,
  locale,
  onSave,
}: {
  payload: ApiKeyUsageLimitPayload | null;
  loading: boolean;
  locale: string;
  onSave: (next: ApiKeyUsageLimitSavePayload) => Promise<void>;
}) {
  const t = useTranslations("usageLimits");
  const [enabled, setEnabled] = useState(false);
  const [dailyLimit, setDailyLimit] = useState("");
  const [weeklyLimit, setWeeklyLimit] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset the form when a new payload arrives — state adjustment during render
  // (react-hooks/set-state-in-effect; see react.dev "adjusting state when a prop changes").
  const [prevPayload, setPrevPayload] = useState<typeof payload>(null);
  if (payload && payload !== prevPayload) {
    setPrevPayload(payload);
    setEnabled(payload.key.usageLimitEnabled);
    setDailyLimit(
      typeof payload.key.dailyUsageLimitUsd === "number"
        ? String(payload.key.dailyUsageLimitUsd)
        : ""
    );
    setWeeklyLimit(
      typeof payload.key.weeklyUsageLimitUsd === "number"
        ? String(payload.key.weeklyUsageLimitUsd)
        : ""
    );
    setError(null);
  }

  const formatter = useMemo(() => createCurrencyFormatter(locale), [locale]);
  const status = payload?.status;

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave({
        usageLimitEnabled: enabled,
        dailyUsageLimitUsd: parseUsdInput(dailyLimit),
        weeklyUsageLimitUsd: parseUsdInput(weeklyLimit),
      });
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : t("saveFailed"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-5 border-success/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon name="paid" size={18} className="text-success" />
            <h3 className="text-sm font-semibold text-text-main">{t("apiKeyUsdQuota")}</h3>
            {payload?.key.name && (
              <span className="truncate rounded bg-bg-subtle px-2 py-0.5 text-xs text-text-muted">
                {payload.key.name}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-text-muted">{t("apiKeyUsdQuotaDescription")}</p>
        </div>
        <Toggle
          checked={enabled}
          onChange={(next) => setEnabled(next)}
          disabled={loading || !payload}
          label={enabled ? t("enabled") : t("disabled")}
          className="shrink-0"
        />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <UsageQuotaMetric
          label={t("dailySpend")}
          value={loading || !status ? "..." : formatter.format(status.dailySpentUsd)}
        />
        <UsageQuotaMetric
          label={t("weeklySpend")}
          value={loading || !status ? "..." : formatter.format(status.weeklySpentUsd)}
        />
        <div className="rounded-lg border border-border bg-bg-subtle px-4 py-3">
          <Input
            type="number"
            min={0}
            step="0.01"
            label={t("dailyQuota")}
            value={dailyLimit}
            onChange={(event) => setDailyLimit(event.target.value)}
            placeholder="0.00"
          />
        </div>
        <div className="rounded-lg border border-border bg-bg-subtle px-4 py-3">
          <Input
            type="number"
            min={0}
            step="0.01"
            label={t("weeklyQuota")}
            value={weeklyLimit}
            onChange={(event) => setWeeklyLimit(event.target.value)}
            placeholder="0.00"
            hint={formatResetHint(status?.weeklyResetAtIso ?? null, t)}
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 text-xs text-error" role="alert">
          {error}
        </p>
      )}
      <div className="mt-4 flex justify-end">
        <Button
          size="sm"
          icon="save"
          onClick={handleSave}
          loading={saving}
          disabled={saving || loading || !payload}
        >
          {saving ? t("saving") : t("saveQuota")}
        </Button>
      </div>
    </Card>
  );
}
