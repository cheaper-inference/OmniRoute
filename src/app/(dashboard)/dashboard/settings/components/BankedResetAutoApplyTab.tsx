"use client";

import { useTranslations } from "next-intl";
import { Card, InfoTooltip, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import {
  BANKED_RESET_ACCOUNT_SCOPES,
  BANKED_RESET_LIMITS,
  BANKED_RESET_MODES,
  type BankedResetAccountScope,
  type BankedResetCreditType,
  type BankedResetMode,
} from "@/shared/constants/bankedResetAutoApply";
import {
  BankedResetNumberField,
  BankedResetSection,
  BankedResetToggleRow,
} from "./BankedResetAutoApplyFields";
import BankedResetAutoApplyHistory from "./BankedResetAutoApplyHistory";
import {
  BANKED_RESET_NUMBER_MAX,
  isConnectionInScope,
  setConnectionInScope,
  type BankedResetNumberKey,
} from "./bankedResetAutoApplyClient";
import {
  connectionLabel,
  useBankedResetAutoApply,
  type BankedResetSaveStatus,
} from "./useBankedResetAutoApply";

const MODE_KEYS: Record<BankedResetMode, { label: string; help: string }> = {
  "dry-run": {
    label: "bankedResetAutoApplyModeDryRun",
    help: "bankedResetAutoApplyModeDryRunHelp",
  },
  "last-resort": {
    label: "bankedResetAutoApplyModeLastResort",
    help: "bankedResetAutoApplyModeLastResortHelp",
  },
  eager: { label: "bankedResetAutoApplyModeEager", help: "bankedResetAutoApplyModeEagerHelp" },
};

const SCOPE_KEYS: Record<BankedResetAccountScope, { label: string; help: string }> = {
  all: { label: "bankedResetAutoApplyScopeAll", help: "bankedResetAutoApplyScopeAllHelp" },
  selected: {
    label: "bankedResetAutoApplyScopeSelected",
    help: "bankedResetAutoApplyScopeSelectedHelp",
  },
};

const CREDIT_TYPE_ROWS: Array<{ type: BankedResetCreditType; label: string; help: string }> = [
  {
    type: "codexCredits",
    label: "bankedResetAutoApplyCreditCodex",
    help: "bankedResetAutoApplyCreditCodexHelp",
  },
  {
    type: "claudeCredits",
    label: "bankedResetAutoApplyCreditClaude",
    help: "bankedResetAutoApplyCreditClaudeHelp",
  },
  {
    type: "claudeSessionReset",
    label: "bankedResetAutoApplyCreditClaudeSession",
    help: "bankedResetAutoApplyCreditClaudeSessionHelp",
  },
];

const TIMING_FIELDS: Array<{ key: BankedResetNumberKey; label: string; hint: string }> = [
  {
    key: "sessionResetGuardMinutes",
    label: "bankedResetAutoApplySessionGuardLabel",
    hint: "bankedResetAutoApplySessionGuardHint",
  },
  {
    key: "weeklyResetGuardHours",
    label: "bankedResetAutoApplyWeeklyGuardLabel",
    hint: "bankedResetAutoApplyWeeklyGuardHint",
  },
  {
    key: "weeklyFloorPercent",
    label: "bankedResetAutoApplyWeeklyFloorLabel",
    hint: "bankedResetAutoApplyWeeklyFloorHint",
  },
  {
    key: "expiringCreditHours",
    label: "bankedResetAutoApplyExpiringHoursLabel",
    hint: "bankedResetAutoApplyExpiringHoursHint",
  },
  {
    key: "expiringCreditMinUsedPercent",
    label: "bankedResetAutoApplyExpiringUsedLabel",
    hint: "bankedResetAutoApplyExpiringUsedHint",
  },
];

const LIMIT_FIELDS: Array<{ key: BankedResetNumberKey; label: string; hint: string }> = [
  {
    key: "maxPerAccountPerDay",
    label: "bankedResetAutoApplyMaxPerAccountLabel",
    hint: "bankedResetAutoApplyMaxPerAccountHint",
  },
  {
    key: "maxPerDay",
    label: "bankedResetAutoApplyMaxPerDayLabel",
    hint: "bankedResetAutoApplyMaxPerDayHint",
  },
  {
    key: "minSpacingMinutes",
    label: "bankedResetAutoApplyMinSpacingLabel",
    hint: "bankedResetAutoApplyMinSpacingHint",
  },
];

function SaveStatus({ status }: { status: BankedResetSaveStatus }) {
  const t = useTranslations("settings");
  if (status === "saved") {
    return (
      <span role="status" className="text-xs font-medium text-success flex items-center gap-1">
        <Icon name="check_circle" size={14} /> {t("saved")}
      </span>
    );
  }
  if (status === "error") {
    return (
      <span role="alert" className="text-xs font-medium text-error flex items-center gap-1">
        <Icon name="error" size={14} /> {t("bankedResetAutoApplySaveError")}
      </span>
    );
  }
  return null;
}

function RadioOption({
  name,
  value,
  checked,
  disabled,
  label,
  help,
  onSelect,
}: {
  name: string;
  value: string;
  checked: boolean;
  disabled: boolean;
  label: string;
  help: string;
  onSelect: () => void;
}) {
  return (
    <label className="flex items-start gap-2 text-sm">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onSelect}
        className="mt-1"
      />
      <span>
        <span className="text-text-main">{label}</span>
        <span className="block text-xs text-text-muted">{help}</span>
      </span>
    </label>
  );
}

export default function BankedResetAutoApplyTab() {
  const t = useTranslations("settings");
  const { settings, connections, loading, saving, status, update } = useBankedResetAutoApply();

  const numberFields = (fields: typeof TIMING_FIELDS) =>
    settings
      ? fields.map(({ key, label, hint }) => (
          <BankedResetNumberField
            key={key}
            label={t(label)}
            hint={t(hint)}
            value={settings[key]}
            max={BANKED_RESET_NUMBER_MAX[key]}
            disabled={saving}
            onCommit={(value) => void update({ [key]: value })}
          />
        ))
      : null;

  return (
    <Card
      icon="restart_alt"
      title={
        <span className="flex items-center gap-1.5">
          {t("bankedResetAutoApplyTitle")}
          <InfoTooltip text={t("bankedResetAutoApplyWarning")} />
        </span>
      }
      subtitle={t("bankedResetAutoApplyDesc")}
      action={<SaveStatus status={status} />}
    >
      {loading ? (
        <p className="text-sm text-text-muted" role="status">
          {t("loading")}
        </p>
      ) : !settings ? (
        <p className="text-sm text-error" role="alert">
          {t("bankedResetAutoApplyLoadError")}
        </p>
      ) : (
        <div className="flex flex-col gap-5">
          <BankedResetSection title={t("bankedResetAutoApplyModeTitle")}>
            <BankedResetToggleRow
              label={t("bankedResetAutoApplyEnabledLabel")}
              help={t("bankedResetAutoApplyEnabledHelp")}
              checked={settings.enabled}
              disabled={saving}
              onChange={(enabled) => void update({ enabled })}
            />
            <fieldset className="flex flex-col gap-2" disabled={saving}>
              <legend className="sr-only">{t("bankedResetAutoApplyModeTitle")}</legend>
              {BANKED_RESET_MODES.map((mode) => (
                <RadioOption
                  key={mode}
                  name="banked-reset-auto-apply-mode"
                  value={mode}
                  checked={settings.mode === mode}
                  disabled={saving}
                  label={t(MODE_KEYS[mode].label)}
                  help={t(MODE_KEYS[mode].help)}
                  onSelect={() => void update({ mode })}
                />
              ))}
            </fieldset>
          </BankedResetSection>

          <BankedResetSection
            title={t("bankedResetAutoApplyCreditTypesTitle")}
            description={t("bankedResetAutoApplyCreditTypesDesc")}
          >
            {CREDIT_TYPE_ROWS.map(({ type, label, help }) => (
              <BankedResetToggleRow
                key={type}
                label={t(label)}
                help={t(help)}
                note={
                  type === "claudeSessionReset"
                    ? t("bankedResetAutoApplyClaudeSessionNote")
                    : undefined
                }
                checked={settings.creditTypes[type]}
                disabled={saving}
                onChange={(checked) =>
                  void update({ creditTypes: { ...settings.creditTypes, [type]: checked } })
                }
              />
            ))}
          </BankedResetSection>

          <BankedResetSection
            title={t("bankedResetAutoApplyScopeTitle")}
            description={t("bankedResetAutoApplyScopeDesc")}
          >
            <fieldset className="flex flex-col gap-2" disabled={saving}>
              <legend className="sr-only">{t("bankedResetAutoApplyScopeTitle")}</legend>
              {BANKED_RESET_ACCOUNT_SCOPES.map((scope) => (
                <RadioOption
                  key={scope}
                  name="banked-reset-auto-apply-scope"
                  value={scope}
                  checked={settings.accountScope === scope}
                  disabled={saving}
                  label={t(SCOPE_KEYS[scope].label)}
                  help={t(SCOPE_KEYS[scope].help)}
                  onSelect={() => void update({ accountScope: scope })}
                />
              ))}
            </fieldset>
            {connections.length === 0 ? (
              <p className="text-sm text-text-muted">{t("bankedResetAutoApplyNoConnections")}</p>
            ) : (
              <ul className="flex flex-col gap-1 border-t border-border pt-3">
                {connections.map((conn) => (
                  <li key={conn.id} className="flex items-center justify-between gap-3 py-1">
                    <span className="min-w-0 truncate text-sm font-mono">
                      {connectionLabel(conn)}
                      <span className="ms-2 font-sans text-xs text-text-muted">
                        {conn.provider}
                      </span>
                    </span>
                    <Toggle
                      checked={isConnectionInScope(settings, conn.id)}
                      disabled={saving}
                      ariaLabel={t("bankedResetAutoApplyConnectionAria", {
                        connection: connectionLabel(conn),
                      })}
                      onChange={(inScope) =>
                        void update({
                          connections: setConnectionInScope(settings, conn.id, inScope),
                        })
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </BankedResetSection>

          <BankedResetSection
            title={t("bankedResetAutoApplyTimingTitle")}
            description={t("bankedResetAutoApplyTimingDesc")}
          >
            <div className="grid gap-3 sm:grid-cols-2">{numberFields(TIMING_FIELDS)}</div>
          </BankedResetSection>

          <BankedResetSection
            title={t("bankedResetAutoApplyPoolTitle")}
            description={t("bankedResetAutoApplyPoolDesc")}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <BankedResetNumberField
                label={t("bankedResetAutoApplyPoolHeadroomLabel")}
                hint={t("bankedResetAutoApplyPoolHeadroomHint")}
                value={settings.poolHeadroomPercent}
                max={BANKED_RESET_NUMBER_MAX.poolHeadroomPercent}
                disabled={saving}
                onCommit={(poolHeadroomPercent) => void update({ poolHeadroomPercent })}
              />
            </div>
          </BankedResetSection>

          <BankedResetSection
            title={t("bankedResetAutoApplyLimitsTitle")}
            description={t("bankedResetAutoApplyLimitsDesc")}
          >
            <div className="grid gap-3 sm:grid-cols-3">{numberFields(LIMIT_FIELDS)}</div>
          </BankedResetSection>

          <BankedResetSection
            title={t("bankedResetAutoApplyScheduleTitle")}
            description={t("bankedResetAutoApplyScheduleDesc")}
          >
            <BankedResetToggleRow
              label={t("bankedResetAutoApplyScheduleEnabledLabel")}
              checked={settings.schedule.enabled}
              disabled={saving}
              onChange={(enabled) => void update({ schedule: { ...settings.schedule, enabled } })}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <BankedResetNumberField
                label={t("bankedResetAutoApplyScheduleStartLabel")}
                value={settings.schedule.startHourUtc}
                max={BANKED_RESET_LIMITS.hourOfDayMax}
                disabled={saving || !settings.schedule.enabled}
                onCommit={(startHourUtc) =>
                  void update({ schedule: { ...settings.schedule, startHourUtc } })
                }
              />
              <BankedResetNumberField
                label={t("bankedResetAutoApplyScheduleEndLabel")}
                hint={t("bankedResetAutoApplyScheduleEndHint")}
                value={settings.schedule.endHourUtc}
                max={BANKED_RESET_LIMITS.hourOfDayMax}
                disabled={saving || !settings.schedule.enabled}
                onCommit={(endHourUtc) =>
                  void update({ schedule: { ...settings.schedule, endHourUtc } })
                }
              />
            </div>
          </BankedResetSection>

          <BankedResetAutoApplyHistory connections={connections} />
        </div>
      )}
    </Card>
  );
}
