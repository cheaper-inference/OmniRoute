"use client";

import Button from "@/shared/components/Button";
import Icon from "@/shared/components/Icon";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";
import { KeyTemplateTokenLimitTiming } from "./KeyTemplatePolicyDetails";
import { UsageLimitSettings } from "./UsageLimitSettings";
import {
  type KeyTemplateResetInterval,
  type KeyTemplateTokenLimit,
} from "../keyTemplatePolicyUtils";

import type { PolicyEditorFormState } from "../keyTemplatePolicyUtils";
import { useKeyPolicyEditor } from "./KeyPolicyEditorContext";

export default function KeyPolicyLimitsTab() {
  const { formState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-4">
      <SessionAndRequestLimits />

      {/* Custom Rate Limits */}
      <RateLimitWindows />

      {/* Access Schedule */}
      <AccessSchedule />

      {/* Key USD Usage Limits */}
      <UsageBudgets />

      {/* Related: Domain Budget */}
      <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
        <DomainBudgetToggle />
        {formState.domainBudgetEnabled && <DomainBudgetAmounts />}
      </div>

      {/* Related: TPM / RPM / Monthly Quota Limits */}
      <QuotaLimits />

      {/* Related: Scoped Token Limits */}
      <TokenLimits />

      {/* Allowed Quota Pools */}
      <QuotaPoolRestrictions />
    </div>
  );
}

function QuotaLimits() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("templateQuotaLimitsTitle")}</p>
          <p className="text-xs text-text-muted">{t("templateQuotaLimitsDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.quotaLimitsEnabled}
          onChange={() =>
            updateState((p) => ({
              ...p,
              quotaLimitsEnabled: !p.quotaLimitsEnabled,
            }))
          }
          ariaLabel={t("templateQuotaLimitsTitle")}
        />
      </div>
      {formState.quotaLimitsEnabled && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
          <Input
            label="TPM Limit"
            type="number"
            min={0}
            step="any"
            value={formState.quotaTpmLimit}
            onChange={(e) => updateState((p) => ({ ...p, quotaTpmLimit: e.target.value }))}
          />
          <Input
            label="RPM Limit"
            type="number"
            min={0}
            step="any"
            value={formState.quotaRpmLimit}
            onChange={(e) => updateState((p) => ({ ...p, quotaRpmLimit: e.target.value }))}
          />
          <Input
            label="Monthly Cap (USD)"
            type="number"
            min={0}
            step="0.01"
            value={formState.quotaMonthlyUsd}
            onChange={(e) => updateState((p) => ({ ...p, quotaMonthlyUsd: e.target.value }))}
          />
        </div>
      )}
    </div>
  );
}

function SessionAndRequestLimits() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      <Input
        label={t("maxActiveSessions")}
        hint={t("maxActiveSessionsDescription")}
        type="number"
        min={0}
        value={String(formState.maxSessions)}
        onChange={(e) =>
          updateState((p) => ({
            ...p,
            maxSessions: Math.max(0, parseInt(e.target.value) || 0),
          }))
        }
      />
      <Input
        label={t("throttleDelay")}
        hint={t("throttleDelayDescription")}
        type="number"
        min={0}
        max={300000}
        value={String(formState.throttleDelayMs)}
        onChange={(e) =>
          updateState((p) => ({
            ...p,
            throttleDelayMs: Math.max(0, parseInt(e.target.value) || 0),
          }))
        }
      />
      <Input
        label={t("templateMaxRequestsPerMinute")}
        type="number"
        min={0}
        placeholder={t("never")}
        value={formState.maxRequestsPerMinute}
        onChange={(e) => updateState((p) => ({ ...p, maxRequestsPerMinute: e.target.value }))}
      />
      <Input
        label={t("templateMaxRequestsPerDay")}
        type="number"
        min={0}
        placeholder={t("never")}
        value={formState.maxRequestsPerDay}
        onChange={(e) => updateState((p) => ({ ...p, maxRequestsPerDay: e.target.value }))}
      />
    </div>
  );
}

function RateLimitRow({
  rl,
  idx,
}: {
  rl: PolicyEditorFormState["rateLimits"][number];
  idx: number;
}) {
  const { t, updateState } = useKeyPolicyEditor();
  return (
    <div key={idx} className="flex items-center gap-2">
      <Input
        type="number"
        min={1}
        value={String(rl.limit)}
        onChange={(e) => {
          const val = parseInt(e.target.value) || 0;
          updateState((p) => {
            const next = [...p.rateLimits];
            next[idx] = { ...next[idx], limit: val };
            return { ...p, rateLimits: next };
          });
        }}
        aria-label={t("apiManagerRateLimitRequestsPlaceholder")}
      />
      <span className="text-xs text-text-muted">{t("apiManagerRateLimitReqPer")}</span>
      <Input
        type="number"
        min={1}
        value={String(rl.window)}
        onChange={(e) => {
          const val = parseInt(e.target.value) || 0;
          updateState((p) => {
            const next = [...p.rateLimits];
            next[idx] = { ...next[idx], window: val };
            return { ...p, rateLimits: next };
          });
        }}
        aria-label={t("apiManagerRateLimitSecondsPlaceholder")}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() =>
          updateState((p) => ({
            ...p,
            rateLimits: p.rateLimits.filter((_, i) => i !== idx),
          }))
        }
        aria-label={t("apiManagerRemoveLimitTitle")}
      >
        <Icon name="delete" size={16} className="text-error" />
      </Button>
    </div>
  );
}

function AccessSchedule() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-border bg-surface/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("accessSchedule")}</p>
          <p className="text-xs text-text-muted">{t("accessScheduleDesc")}</p>
        </div>
        <Toggle
          size="sm"
          checked={formState.scheduleEnabled}
          onChange={() => updateState((p) => ({ ...p, scheduleEnabled: !p.scheduleEnabled }))}
          ariaLabel={t("accessSchedule")}
        />
      </div>
      {formState.scheduleEnabled && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
          <Input
            label={t("scheduleFrom")}
            type="time"
            value={formState.scheduleFrom}
            onChange={(e) => updateState((p) => ({ ...p, scheduleFrom: e.target.value }))}
          />
          <Input
            label={t("scheduleUntil")}
            type="time"
            value={formState.scheduleUntil}
            onChange={(e) => updateState((p) => ({ ...p, scheduleUntil: e.target.value }))}
          />
          <Input
            label={t("scheduleTimezone")}
            type="text"
            value={formState.scheduleTz}
            onChange={(e) => updateState((p) => ({ ...p, scheduleTz: e.target.value }))}
          />
        </div>
      )}
    </div>
  );
}

function TokenLimitHeading() {
  const { t, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <p className="text-sm font-medium text-text-main">{t("templateTokenLimitsTitle")}</p>
        <p className="text-xs text-text-muted">{t("templateTokenLimitsDesc")}</p>
      </div>
      <Button
        type="button"
        size="sm"
        variant="secondary"
        icon="add"
        onClick={() =>
          updateState((p) => ({
            ...p,
            tokenLimits: [
              ...p.tokenLimits,
              {
                scopeType: "global",
                scopeValue: "",
                tokenLimit: 1000000,
                resetInterval: "monthly",
                resetTime: "00:00",
                enabled: true,
              },
            ],
          }))
        }
      >
        {t("templateAddTokenLimit")}
      </Button>
    </div>
  );
}

function RateLimitWindows() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-text-main">{t("apiManagerCustomRateLimits")}</p>
          <p className="text-xs text-text-muted">{t("apiManagerCustomRateLimitsDesc")}</p>
        </div>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          icon="add"
          onClick={() =>
            updateState((p) => ({
              ...p,
              rateLimits: [...p.rateLimits, { limit: 100, window: 60 }],
            }))
          }
        >
          {t("templateAddRateLimit")}
        </Button>
      </div>
      {formState.rateLimits.map((rl, idx) => (
        <RateLimitRow key={idx} rl={rl} idx={idx} />
      ))}
    </div>
  );
}

function QuotaPoolChoices() {
  const { formState, updateState, allQuotaPools } = useKeyPolicyEditor();
  return (
    <div className="flex flex-wrap gap-1.5 pt-1">
      {allQuotaPools.map((pool) => {
        const selected = formState.allowedQuotas.includes(pool.id);
        return (
          <Button
            key={pool.id}
            type="button"
            size="sm"
            variant={selected ? "primary" : "outline"}
            aria-pressed={selected}
            onClick={() =>
              updateState((p) => ({
                ...p,
                allowedQuotas: selected
                  ? p.allowedQuotas.filter((id) => id !== pool.id)
                  : [...p.allowedQuotas, pool.id],
              }))
            }
            className="text-xs font-mono"
          >
            {pool.name || pool.id}
          </Button>
        );
      })}
    </div>
  );
}

function QuotaPoolRestrictions() {
  const { t, formState, updateState, allQuotaPools } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
      <p className="text-sm font-medium text-text-main">{t("templateAllowedQuotaPools")}</p>
      <p className="text-xs text-text-muted">{t("templateAllowedQuotaPoolsDesc")}</p>
      {allQuotaPools.length > 0 && <QuotaPoolChoices />}
      {formState.allowedQuotas.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {formState.allowedQuotas.map((poolId) => (
            <span
              key={poolId}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-border text-xs font-mono"
            >
              {poolId}
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="h-4 w-4 p-0 text-text-muted hover:text-error"
                onClick={() =>
                  updateState((p) => ({
                    ...p,
                    allowedQuotas: p.allowedQuotas.filter((id) => id !== poolId),
                  }))
                }
                aria-label={t("removeSelection", { name: poolId })}
              >
                <Icon name="close" size={12} />
              </Button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function TokenScopeSelect({
  tl,
  idx,
}: {
  tl: PolicyEditorFormState["tokenLimits"][number];
  idx: number;
}) {
  const { t, updateState } = useKeyPolicyEditor();
  return (
    <Select
      label={t("templateTokenScopeType")}
      value={tl.scopeType}
      onChange={(e) => {
        const nextScope = e.target.value as KeyTemplateTokenLimit["scopeType"];
        updateState((p) => {
          const next = [...p.tokenLimits];
          next[idx] = {
            ...next[idx],
            scopeType: nextScope,
            scopeValue: nextScope === "global" ? "" : next[idx].scopeValue,
          };
          return { ...p, tokenLimits: next };
        });
      }}
    >
      <option value="global">Global</option>
      <option value="provider">Provider</option>
      <option value="model">Model</option>
    </Select>
  );
}

function DomainBudgetToggle() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-text-main">{t("templateDomainBudgetTitle")}</p>
        <p className="text-xs text-text-muted">{t("templateDomainBudgetDesc")}</p>
      </div>
      <Toggle
        size="sm"
        checked={formState.domainBudgetEnabled}
        onChange={() =>
          updateState((p) => ({
            ...p,
            domainBudgetEnabled: !p.domainBudgetEnabled,
          }))
        }
        ariaLabel={t("templateDomainBudgetTitle")}
      />
    </div>
  );
}

function UsageBudgets() {
  const { formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="p-3.5 rounded-lg border border-border bg-surface/40">
      <UsageLimitSettings
        enabled={formState.usageLimitEnabled}
        dailyLimitUsd={formState.dailyUsageLimitUsd}
        weeklyLimitUsd={formState.weeklyUsageLimitUsd}
        fiveHourLimitUsd={formState.fiveHourUsageLimitUsd}
        onEnabledChange={(enabled) => updateState((p) => ({ ...p, usageLimitEnabled: enabled }))}
        onDailyLimitUsdChange={(val) => updateState((p) => ({ ...p, dailyUsageLimitUsd: val }))}
        onWeeklyLimitUsdChange={(val) => updateState((p) => ({ ...p, weeklyUsageLimitUsd: val }))}
        onFiveHourLimitUsdChange={(val) =>
          updateState((p) => ({ ...p, fiveHourUsageLimitUsd: val }))
        }
      />
    </div>
  );
}

function TokenResetInterval({
  tl,
  idx,
}: {
  tl: PolicyEditorFormState["tokenLimits"][number];
  idx: number;
}) {
  const { t, updateState } = useKeyPolicyEditor();
  return (
    <Select
      label={t("templateResetInterval")}
      value={tl.resetInterval}
      onChange={(e) =>
        updateState((p) => {
          const next = [...p.tokenLimits];
          next[idx] = {
            ...next[idx],
            resetInterval: e.target.value as KeyTemplateResetInterval,
          };
          return { ...p, tokenLimits: next };
        })
      }
    >
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </Select>
  );
}

function TokenLimitAmount({
  tl,
  idx,
}: {
  tl: PolicyEditorFormState["tokenLimits"][number];
  idx: number;
}) {
  const { t, updateState } = useKeyPolicyEditor();
  return (
    <Input
      label={t("templateTokenMaxTokens")}
      type="number"
      min={1}
      value={String(tl.tokenLimit)}
      onChange={(e) =>
        updateState((p) => {
          const next = [...p.tokenLimits];
          next[idx] = {
            ...next[idx],
            tokenLimit: parseInt(e.target.value) || 0,
          };
          return { ...p, tokenLimits: next };
        })
      }
    />
  );
}

function TokenLimits() {
  const { t, tc, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="flex flex-col gap-2 p-3.5 rounded-lg border border-border bg-surface/40">
      <TokenLimitHeading />
      {formState.tokenLimits.map((tl, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end pt-2 border-t border-border/40"
        >
          <TokenScopeSelect tl={tl} idx={idx} />
          <Input
            label={t("templateTokenScopeValue")}
            disabled={tl.scopeType === "global"}
            value={tl.scopeValue}
            onChange={(e) =>
              updateState((p) => {
                const next = [...p.tokenLimits];
                next[idx] = { ...next[idx], scopeValue: e.target.value };
                return { ...p, tokenLimits: next };
              })
            }
            placeholder={tl.scopeType === "global" ? "All" : "openai"}
          />
          <TokenLimitAmount tl={tl} idx={idx} />
          <TokenResetInterval tl={tl} idx={idx} />
          <KeyTemplateTokenLimitTiming
            limit={tl}
            onChange={(patch) =>
              updateState((p) => ({
                ...p,
                tokenLimits: p.tokenLimits.map((value, i) =>
                  i === idx ? { ...value, ...patch } : value
                ),
              }))
            }
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() =>
              updateState((p) => ({
                ...p,
                tokenLimits: p.tokenLimits.filter((_, i) => i !== idx),
              }))
            }
            aria-label={tc("delete")}
          >
            <Icon name="delete" size={16} className="text-error" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function DomainWarningThreshold() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <Input
      label={t("templateDomainWarningPct")}
      type="number"
      min={0}
      step="any"
      max={100}
      value={formState.domainWarningThresholdPct}
      onChange={(e) =>
        updateState((p) => ({
          ...p,
          domainWarningThresholdPct: e.target.value,
        }))
      }
    />
  );
}

function DomainBudgetAmounts() {
  const { t, formState, updateState } = useKeyPolicyEditor();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/50">
      <Input
        label={t("templateDomainDailyUsd")}
        type="number"
        min={0}
        step="0.01"
        value={formState.domainDailyLimitUsd}
        onChange={(e) => updateState((p) => ({ ...p, domainDailyLimitUsd: e.target.value }))}
      />
      <Input
        label={t("templateDomainWeeklyUsd")}
        type="number"
        min={0}
        step="0.01"
        value={formState.domainWeeklyLimitUsd}
        onChange={(e) => updateState((p) => ({ ...p, domainWeeklyLimitUsd: e.target.value }))}
      />
      <Input
        label={t("templateDomainMonthlyUsd")}
        type="number"
        min={0}
        step="0.01"
        value={formState.domainMonthlyLimitUsd}
        onChange={(e) => updateState((p) => ({ ...p, domainMonthlyLimitUsd: e.target.value }))}
      />
      <DomainWarningThreshold />
      <Select
        label={t("templateResetInterval")}
        value={formState.domainResetInterval}
        onChange={(e) =>
          updateState((p) => ({
            ...p,
            domainResetInterval: e.target.value as KeyTemplateResetInterval,
          }))
        }
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </Select>
      <Input
        label={t("templateResetTime")}
        type="time"
        value={formState.domainResetTime}
        onChange={(e) => updateState((p) => ({ ...p, domainResetTime: e.target.value }))}
      />
    </div>
  );
}
