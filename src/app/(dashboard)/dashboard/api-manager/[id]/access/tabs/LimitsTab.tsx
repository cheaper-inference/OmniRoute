"use client";

import Button from "@/shared/components/Button";
import Toggle from "@/shared/components/Toggle";

import { useId } from "react";
import { useTranslations } from "next-intl";
import Input from "@/shared/components/Input";
import { UsageLimitSettings } from "@/app/(dashboard)/dashboard/api-manager/components/UsageLimitSettings";
import type { ApiKeyAccessFormState } from "../useApiKeyAccessForm";
import TabErrorList from "./TabErrorList";

interface LimitsTabProps {
  formState: ApiKeyAccessFormState;
  setMaxSessions: (sessions: number) => void;
  setThrottleDelayMs: (delay: number) => void;
  addRateLimit: () => void;
  removeRateLimit: (index: number) => void;
  updateRateLimit: (index: number, limit: number, windowVal: number) => void;
  setScheduleEnabled: (enabled: boolean) => void;
  setScheduleFrom: (from: string) => void;
  setScheduleUntil: (until: string) => void;
  setScheduleDays: (days: number[] | ((prev: number[]) => number[])) => void;
  setScheduleTz: (tz: string) => void;
  setUsageLimitEnabled: (enabled: boolean) => void;
  setDailyUsageLimitUsd: (val: string) => void;
  setWeeklyUsageLimitUsd: (val: string) => void;
  errors?: string[];
}

type LimitsSectionProps<K extends keyof LimitsTabProps> = Pick<LimitsTabProps, "formState" | K>;

function MaxSessionsField({ formState, setMaxSessions }: LimitsSectionProps<"setMaxSessions">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("maxActiveSessions")}</p>
        <p className="text-xs text-text-muted">{t("maxActiveSessionsDescription")}</p>
      </div>
      <div className="w-32 shrink-0">
        <Input
          type="number"
          min={0}
          step={1}
          aria-label={t("maxActiveSessions")}
          value={String(formState.maxSessions)}
          onChange={(e) => {
            const parsed = Number.parseInt(e.target.value || "0", 10);
            setMaxSessions(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
          }}
        />
      </div>
    </div>
  );
}

function ThrottleDelayField({
  formState,
  setThrottleDelayMs,
}: LimitsSectionProps<"setThrottleDelayMs">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("throttleDelay")}</p>
        <p className="text-xs text-text-muted">{t("throttleDelayDescription")}</p>
      </div>
      <div className="w-36 shrink-0">
        <Input
          type="number"
          min={0}
          max={300000}
          step={100}
          aria-label={t("throttleDelay")}
          value={String(formState.throttleDelayMs)}
          onChange={(e) => {
            const parsed = Number.parseInt(e.target.value || "0", 10);
            setThrottleDelayMs(
              Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 300000) : 0
            );
          }}
        />
        <p className="text-[10px] text-text-muted mt-1 text-right">milliseconds</p>
      </div>
    </div>
  );
}

function CustomRateLimits({
  formState,
  addRateLimit,
  removeRateLimit,
  updateRateLimit,
}: LimitsSectionProps<"addRateLimit" | "removeRateLimit" | "updateRateLimit">) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("apiManagerCustomRateLimits")}</p>
          <p className="text-xs text-text-muted">{t("apiManagerCustomRateLimitsDesc")}</p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon="add"
          onClick={addRateLimit}
          className="shrink-0"
        >
          Add Limit
        </Button>
      </div>
      {formState.rateLimits.length > 0 && (
        <div className="flex flex-col gap-2 pt-1">
          {formState.rateLimits.map((rl, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                type="number"
                min={1}
                value={String(rl.limit)}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  updateRateLimit(index, val, rl.window);
                }}
                placeholder={t("apiManagerRateLimitRequestsPlaceholder")}
                aria-label={t("apiManagerRateLimitRequestsPlaceholder")}
              />
              <span className="text-sm text-text-muted shrink-0">
                {t("apiManagerRateLimitReqPer")}
              </span>
              <Input
                type="number"
                min={1}
                value={String(rl.window)}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  updateRateLimit(index, rl.limit, val);
                }}
                placeholder={t("apiManagerRateLimitSecondsPlaceholder")}
                aria-label={t("apiManagerRateLimitSecondsPlaceholder")}
              />
              <span className="text-sm text-text-muted shrink-0">sec</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeRateLimit(index)}
                className="text-error shrink-0"
                title={t("apiManagerRemoveLimitTitle")}
                aria-label={t("apiManagerRemoveLimitTitle")}
                icon="delete"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ScheduleDayPicker({ formState, setScheduleDays }: LimitsSectionProps<"setScheduleDays">) {
  const t = useTranslations("apiManager");
  const labelId = useId();

  return (
    <div>
      <p className="text-xs text-text-muted mb-1.5" id={labelId}>
        {t("scheduleDays")}
      </p>
      <div className="flex gap-1.5 flex-wrap" role="group" aria-labelledby={labelId}>
        {(
          [
            [0, t("daySun")],
            [1, t("dayMon")],
            [2, t("dayTue")],
            [3, t("dayWed")],
            [4, t("dayThu")],
            [5, t("dayFri")],
            [6, t("daySat")],
          ] as [number, string][]
        ).map(([dayIdx, label]) => {
          const selected = formState.scheduleDays.includes(dayIdx);
          return (
            <Button
              size="sm"
              variant={selected ? "primary" : "ghost"}
              aria-pressed={selected}
              key={dayIdx}
              onClick={() =>
                setScheduleDays((prev) =>
                  prev.includes(dayIdx)
                    ? prev.filter((d) => d !== dayIdx)
                    : [...prev, dayIdx].sort((a, b) => a - b)
                )
              }
              className="gap-1.5 text-xs"
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

type ScheduleDetailSetter =
  "setScheduleFrom" | "setScheduleUntil" | "setScheduleDays" | "setScheduleTz";

function ScheduleDetails({
  formState,
  setScheduleFrom,
  setScheduleUntil,
  setScheduleDays,
  setScheduleTz,
}: LimitsSectionProps<ScheduleDetailSetter>) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-3 pt-1 border-t border-border/50">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <Input
          label={t("scheduleFrom")}
          type="time"
          value={formState.scheduleFrom}
          onChange={(e) => setScheduleFrom(e.target.value)}
        />
        <Input
          label={t("scheduleUntil")}
          type="time"
          value={formState.scheduleUntil}
          onChange={(e) => setScheduleUntil(e.target.value)}
        />
      </div>
      <ScheduleDayPicker formState={formState} setScheduleDays={setScheduleDays} />
      <Input
        label={t("scheduleTimezone")}
        type="text"
        value={formState.scheduleTz}
        onChange={(e) => setScheduleTz(e.target.value)}
        placeholder={t("apiManagerTimezonePlaceholder")}
        hint={t("scheduleTimezoneHint")}
        className="max-w-sm"
        inputClassName="font-mono"
      />
    </div>
  );
}

function AccessScheduleSection({
  formState,
  setScheduleEnabled,
  setScheduleFrom,
  setScheduleUntil,
  setScheduleDays,
  setScheduleTz,
}: LimitsSectionProps<"setScheduleEnabled" | ScheduleDetailSetter>) {
  const t = useTranslations("apiManager");

  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("accessSchedule")}</p>
          <p className="text-xs text-text-muted">{t("accessScheduleDesc")}</p>
        </div>
        <Toggle
          size="sm"
          className="shrink-0"
          checked={formState.scheduleEnabled}
          onChange={() => setScheduleEnabled(!formState.scheduleEnabled)}
          ariaLabel={t("accessSchedule")}
        />
      </div>
      {formState.scheduleEnabled && (
        <ScheduleDetails
          formState={formState}
          setScheduleFrom={setScheduleFrom}
          setScheduleUntil={setScheduleUntil}
          setScheduleDays={setScheduleDays}
          setScheduleTz={setScheduleTz}
        />
      )}
    </div>
  );
}

export default function LimitsTab({
  formState,
  setMaxSessions,
  setThrottleDelayMs,
  addRateLimit,
  removeRateLimit,
  updateRateLimit,
  setScheduleEnabled,
  setScheduleFrom,
  setScheduleUntil,
  setScheduleDays,
  setScheduleTz,
  setUsageLimitEnabled,
  setDailyUsageLimitUsd,
  setWeeklyUsageLimitUsd,
  errors,
}: LimitsTabProps) {
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col gap-5">
      <TabErrorList errors={errors} />

      {/* Max Sessions Limit (T08) */}
      <MaxSessionsField formState={formState} setMaxSessions={setMaxSessions} />

      {/* Soft Throttle */}
      <ThrottleDelayField formState={formState} setThrottleDelayMs={setThrottleDelayMs} />

      {/* Custom Rate Limits */}
      <CustomRateLimits
        formState={formState}
        addRateLimit={addRateLimit}
        removeRateLimit={removeRateLimit}
        updateRateLimit={updateRateLimit}
      />

      {/* Access Schedule */}
      <AccessScheduleSection
        formState={formState}
        setScheduleEnabled={setScheduleEnabled}
        setScheduleFrom={setScheduleFrom}
        setScheduleUntil={setScheduleUntil}
        setScheduleDays={setScheduleDays}
        setScheduleTz={setScheduleTz}
      />

      {/* Usage Limit Settings */}
      <div className="p-4 rounded-lg border border-border bg-surface/40">
        <UsageLimitSettings
          enabled={formState.usageLimitEnabled}
          dailyLimitUsd={formState.dailyUsageLimitUsd}
          weeklyLimitUsd={formState.weeklyUsageLimitUsd}
          enabledLabel={tc("enabled")}
          disabledLabel={tc("disabled")}
          onEnabledChange={setUsageLimitEnabled}
          onDailyLimitUsdChange={setDailyUsageLimitUsd}
          onWeeklyLimitUsdChange={setWeeklyUsageLimitUsd}
        />
      </div>
    </div>
  );
}
