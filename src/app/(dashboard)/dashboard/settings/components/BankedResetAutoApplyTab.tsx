"use client";

import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Card, InfoTooltip, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import {
  BANKED_RESET_ACCOUNT_SCOPES,
  BANKED_RESET_LIMITS,
  BANKED_RESET_MODES,
  type BankedResetAccountScope,
  type BankedResetAutoApplySettings,
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
  type BankedResetConnection,
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

const POOL_FIELDS: Array<{ key: BankedResetNumberKey; label: string; hint: string }> = [
  {
    key: "poolHeadroomPercent",
    label: "bankedResetAutoApplyPoolHeadroomLabel",
    hint: "bankedResetAutoApplyPoolHeadroomHint",
  },
];

type SectionProps = {
  settings: BankedResetAutoApplySettings;
  saving: boolean;
  update: (patch: Partial<BankedResetAutoApplySettings>) => Promise<void>;
};

function ModeSection({ settings, saving, update }: SectionProps) {
  const t = useTranslations("settings");
  return (
    <BankedResetSection title={t("bankedResetAutoApplyModeTitle")}>
      <BankedResetToggleRow
        label={t("bankedResetAutoApplyEnabledLabel")}
        help={t("bankedResetAutoApplyEnabledHelp")}
        checked={settings.enabled}
        disabled={saving}
        onChange={(enabled) => void update({ enabled })}
      />
      <RadioGroup
        aria-label={t("bankedResetAutoApplyModeTitle")}
        name="banked-reset-auto-apply-mode"
        value={settings.mode}
        disabled={saving}
        onValueChange={(next) => void update({ mode: next as BankedResetMode })}
      >
        {BANKED_RESET_MODES.map((mode) => (
          <RadioGroupItem
            key={mode}
            value={mode}
            label={t(MODE_KEYS[mode].label)}
            description={t(MODE_KEYS[mode].help)}
          />
        ))}
      </RadioGroup>
    </BankedResetSection>
  );
}

function CreditTypesSection({ settings, saving, update }: SectionProps) {
  const t = useTranslations("settings");
  return (
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
            type === "claudeSessionReset" ? t("bankedResetAutoApplyClaudeSessionNote") : undefined
          }
          checked={settings.creditTypes[type]}
          disabled={saving}
          onChange={(checked) =>
            void update({ creditTypes: { ...settings.creditTypes, [type]: checked } })
          }
        />
      ))}
    </BankedResetSection>
  );
}

function ConnectionScopeList({
  settings,
  saving,
  update,
  connections,
}: SectionProps & { connections: BankedResetConnection[] }) {
  const t = useTranslations("settings");
  if (connections.length === 0) {
    return <p className="text-sm text-text-muted">{t("bankedResetAutoApplyNoConnections")}</p>;
  }
  return (
    <ul className="flex flex-col gap-1 border-t border-border pt-3">
      {connections.map((conn) => (
        <li key={conn.id} className="flex items-center justify-between gap-3 py-1">
          <span className="min-w-0 truncate text-sm font-mono">
            {connectionLabel(conn)}
            <span className="ms-2 font-sans text-xs text-text-muted">{conn.provider}</span>
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
  );
}

function ScopeSection(props: SectionProps & { connections: BankedResetConnection[] }) {
  const { settings, saving, update } = props;
  const t = useTranslations("settings");
  return (
    <BankedResetSection
      title={t("bankedResetAutoApplyScopeTitle")}
      description={t("bankedResetAutoApplyScopeDesc")}
    >
      <RadioGroup
        aria-label={t("bankedResetAutoApplyScopeTitle")}
        name="banked-reset-auto-apply-scope"
        value={settings.accountScope}
        disabled={saving}
        onValueChange={(next) => void update({ accountScope: next as BankedResetAccountScope })}
      >
        {BANKED_RESET_ACCOUNT_SCOPES.map((scope) => (
          <RadioGroupItem
            key={scope}
            value={scope}
            label={t(SCOPE_KEYS[scope].label)}
            description={t(SCOPE_KEYS[scope].help)}
          />
        ))}
      </RadioGroup>
      <ConnectionScopeList {...props} />
    </BankedResetSection>
  );
}

function NumberFieldsSection({
  settings,
  saving,
  update,
  title,
  description,
  fields,
  gridClassName,
}: SectionProps & {
  title: string;
  description: string;
  fields: typeof TIMING_FIELDS;
  gridClassName: string;
}) {
  const t = useTranslations("settings");
  return (
    <BankedResetSection title={title} description={description}>
      <div className={`grid gap-3 ${gridClassName}`}>
        {fields.map(({ key, label, hint }) => (
          <BankedResetNumberField
            key={key}
            label={t(label)}
            hint={t(hint)}
            value={settings[key]}
            max={BANKED_RESET_NUMBER_MAX[key]}
            disabled={saving}
            onCommit={(value) => void update({ [key]: value })}
          />
        ))}
      </div>
    </BankedResetSection>
  );
}

function ScheduleSection({ settings, saving, update }: SectionProps) {
  const t = useTranslations("settings");
  return (
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
          onCommit={(endHourUtc) => void update({ schedule: { ...settings.schedule, endHourUtc } })}
        />
      </div>
    </BankedResetSection>
  );
}

function BankedResetAutoApplyForm(props: SectionProps & { connections: BankedResetConnection[] }) {
  const t = useTranslations("settings");
  return (
    <div className="flex flex-col gap-5">
      <ModeSection {...props} />
      <CreditTypesSection {...props} />
      <ScopeSection {...props} />
      <NumberFieldsSection
        {...props}
        title={t("bankedResetAutoApplyTimingTitle")}
        description={t("bankedResetAutoApplyTimingDesc")}
        fields={TIMING_FIELDS}
        gridClassName="sm:grid-cols-2"
      />
      <NumberFieldsSection
        {...props}
        title={t("bankedResetAutoApplyPoolTitle")}
        description={t("bankedResetAutoApplyPoolDesc")}
        fields={POOL_FIELDS}
        gridClassName="sm:grid-cols-2"
      />
      <NumberFieldsSection
        {...props}
        title={t("bankedResetAutoApplyLimitsTitle")}
        description={t("bankedResetAutoApplyLimitsDesc")}
        fields={LIMIT_FIELDS}
        gridClassName="sm:grid-cols-3"
      />
      <ScheduleSection {...props} />
      <BankedResetAutoApplyHistory connections={props.connections} />
    </div>
  );
}

export default function BankedResetAutoApplyTab() {
  const t = useTranslations("settings");
  const { settings, connections, loading, saving, status, update } = useBankedResetAutoApply();

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
        <BankedResetAutoApplyForm
          settings={settings}
          connections={connections}
          saving={saving}
          update={update}
        />
      )}
    </Card>
  );
}
