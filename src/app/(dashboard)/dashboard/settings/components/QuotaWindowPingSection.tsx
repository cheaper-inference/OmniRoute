"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import { Button, Checkbox, InfoTooltip, Input, Select, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import ModelSelectField, { type ApiModel } from "@/shared/components/ModelSelectField";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import {
  QUOTA_WINDOW_PING_MAX_INTERVAL_MINUTES,
  QUOTA_WINDOW_PING_MIN_INTERVAL_MINUTES,
} from "@/shared/constants/quotaWindowPing";
import type {
  QuotaWindowPingReason,
  WindowPingRun,
  WindowPingSchedule,
  WindowPingTarget,
  WindowPingTargetInput,
} from "@/shared/types/quotaWindowPing";

const API = "/api/settings/quota-window-ping";
const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6] as const;
const RECENT_LIMIT = 20;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

type DescriptorView = {
  id: string;
  provider: string;
  displayName: string;
  scope: string;
  windowId: string;
  kind: string;
  durationSeconds: number | null;
  policy: "scheduled" | "manual" | "excluded";
  scheduledAllowed: boolean;
  targetable: boolean;
  longerWindow: { descriptorId: string; windowId: string } | null;
};

type ProviderConnection = {
  id: string;
  provider: string;
  authType?: string;
  isActive?: boolean | null;
  name?: string | null;
  email?: string | null;
  displayName?: string | null;
};

type Snapshot = {
  enabled: boolean;
  descriptors: DescriptorView[];
  targets: WindowPingTarget[];
  runs: WindowPingRun[];
};

type Notice = { tone: "ok" | "error"; text: string } | null;

type ScheduleDraft = {
  kind: "daily" | "interval";
  time: string;
  timezone: string;
  days: number[];
  minutes: number;
};

type UpdateTarget = (
  target: WindowPingTarget,
  patch: Partial<WindowPingTargetInput>,
  okText?: string
) => Promise<boolean>;

function connectionLabel(connection: ProviderConnection): string {
  return connection.displayName || connection.name || connection.email || connection.id;
}

function providerLabel(provider: string): string {
  const entry = AI_PROVIDERS[provider] as { name?: unknown } | undefined;
  return typeof entry?.name === "string" ? entry.name : provider;
}

function weekdayNames(locale: string): string[] {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  // 2023-01-01 was a Sunday, so day i maps to Date#getDay() === i.
  return WEEKDAYS.map((day) => format.format(Date.UTC(2023, 0, 1 + day)));
}

function toggleIn<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function browserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(0);
    return true;
  } catch {
    return false;
  }
}

function draftFromSchedule(schedule: WindowPingSchedule | null): ScheduleDraft {
  const base: ScheduleDraft = {
    kind: "daily",
    time: "08:00",
    timezone: browserTimeZone(),
    days: [1, 2, 3, 4, 5],
    minutes: 300,
  };
  if (schedule?.kind === "interval")
    return { ...base, kind: "interval", minutes: schedule.minutes };
  if (schedule?.kind === "daily") {
    return { ...base, time: schedule.time, timezone: schedule.timezone, days: [...schedule.days] };
  }
  return base;
}

function buildSchedule(draft: ScheduleDraft): WindowPingSchedule {
  if (draft.kind === "interval") return { kind: "interval", minutes: draft.minutes };
  return {
    kind: "daily",
    time: draft.time,
    timezone: draft.timezone.trim(),
    days: [...draft.days].sort((a, b) => a - b),
  };
}

function scheduleIsValid(draft: ScheduleDraft): boolean {
  if (draft.kind === "interval") {
    return (
      Number.isInteger(draft.minutes) &&
      draft.minutes >= QUOTA_WINDOW_PING_MIN_INTERVAL_MINUTES &&
      draft.minutes <= QUOTA_WINDOW_PING_MAX_INTERVAL_MINUTES
    );
  }
  return (
    TIME_PATTERN.test(draft.time) &&
    draft.timezone.trim().length > 0 &&
    isValidTimeZone(draft.timezone.trim()) &&
    draft.days.length > 0
  );
}

function scheduleSummary(
  schedule: WindowPingSchedule,
  t: ReturnType<typeof useTranslations>,
  dayNames: string[]
): string {
  if (schedule.kind === "interval") {
    return t("quotaWindowPing.everyMinutes", { minutes: schedule.minutes });
  }
  return t("quotaWindowPing.dailyAt", {
    days: schedule.days.map((day) => dayNames[day]).join(", "),
    time: schedule.time,
    timezone: schedule.timezone,
  });
}

function formatDate(iso: string, locale: string): string {
  return new Date(iso).toLocaleString(locale);
}

function targetInputFrom(
  target: WindowPingTarget,
  patch: Partial<WindowPingTargetInput>
): WindowPingTargetInput {
  return {
    connectionId: target.connectionId,
    descriptorId: target.descriptorId,
    model: target.model,
    enabled: target.enabled,
    schedule: target.schedule,
    minLongerWindowRemainingPct: target.minLongerWindowRemainingPct,
    dryRun: target.dryRun,
    claudeBillableConfirmed: target.claudeBillableConfirmed,
    ...patch,
  };
}

function runIcon(reason: QuotaWindowPingReason | null): string {
  if (reason === null) return "timer";
  if (reason === "completed") return "check_circle";
  if (reason === "would_ping") return "science";
  if (
    reason === "not_completed" ||
    reason === "timeout" ||
    reason === "error" ||
    reason === "auth_failed" ||
    reason === "no_token"
  ) {
    return "error";
  }
  return "block";
}

async function readErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const data = (await response.json()) as { error?: unknown };
    const error = data?.error;
    if (typeof error === "string" && error) return error;
    if (error && typeof error === "object") {
      const payload = error as { message?: unknown; details?: unknown };
      const details = Array.isArray(payload.details) ? payload.details : [];
      const first = details[0] as { message?: unknown } | undefined;
      if (typeof first?.message === "string" && first.message) return first.message;
      if (typeof payload.message === "string" && payload.message) return payload.message;
    }
  } catch {
    // Fall through to the localized generic message.
  }
  return fallback;
}

async function fetchSnapshot(): Promise<Snapshot | null> {
  try {
    const response = await fetch(API);
    if (!response.ok) return null;
    const data = (await response.json()) as Partial<Snapshot>;
    return {
      enabled: data?.enabled === true,
      descriptors: Array.isArray(data?.descriptors) ? data.descriptors : [],
      targets: Array.isArray(data?.targets) ? data.targets : [],
      runs: Array.isArray(data?.runs) ? data.runs : [],
    };
  } catch {
    return null;
  }
}

async function fetchConnections(): Promise<ProviderConnection[] | null> {
  try {
    const response = await fetch("/api/providers");
    if (!response.ok) return null;
    const data = (await response.json()) as { connections?: unknown };
    return Array.isArray(data?.connections) ? (data.connections as ProviderConnection[]) : [];
  } catch {
    return null;
  }
}

function ScheduleEditor({
  value,
  onChange,
  disabled = false,
}: {
  value: ScheduleDraft;
  onChange: (next: ScheduleDraft) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("settings");
  const locale = useLocale();
  const dayNames = weekdayNames(locale);
  return (
    <div className="flex flex-col gap-2">
      <Select
        label={t("quotaWindowPing.scheduleKind")}
        value={value.kind}
        disabled={disabled}
        onChange={(event) =>
          onChange({ ...value, kind: event.target.value === "interval" ? "interval" : "daily" })
        }
        options={[
          { value: "daily", label: t("quotaWindowPing.daily") },
          { value: "interval", label: t("quotaWindowPing.interval") },
        ]}
      />
      {value.kind === "daily" ? (
        <>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input
              type="time"
              label={t("quotaWindowPing.time")}
              value={value.time}
              disabled={disabled}
              onChange={(event) => onChange({ ...value, time: event.target.value })}
            />
            <Input
              label={t("quotaWindowPing.timezone")}
              hint={t("quotaWindowPing.timezoneHint")}
              value={value.timezone}
              disabled={disabled}
              onChange={(event) => onChange({ ...value, timezone: event.target.value })}
            />
          </div>
          <CheckboxGroup label={t("quotaWindowPing.days")}>
            <div className="flex flex-wrap gap-x-3">
              {WEEKDAYS.map((day) => (
                <Checkbox
                  key={day}
                  className="min-h-11 items-center"
                  label={dayNames[day]}
                  checked={value.days.includes(day)}
                  disabled={disabled}
                  onChange={() => onChange({ ...value, days: toggleIn(value.days, day) })}
                />
              ))}
            </div>
          </CheckboxGroup>
        </>
      ) : (
        <Input
          type="number"
          min={QUOTA_WINDOW_PING_MIN_INTERVAL_MINUTES}
          max={QUOTA_WINDOW_PING_MAX_INTERVAL_MINUTES}
          label={t("quotaWindowPing.minutes")}
          value={String(value.minutes)}
          disabled={disabled}
          onChange={(event) => onChange({ ...value, minutes: Number(event.target.value) })}
        />
      )}
    </div>
  );
}

function RunSummary({ run, targetLabel }: { run: WindowPingRun; targetLabel: string }) {
  const t = useTranslations("settings");
  const locale = useLocale();
  const reasonText = run.reason
    ? t(`quotaWindowPing.reasons.${run.reason}`)
    : t("quotaWindowPing.status.running");
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-muted">
      <Icon name={runIcon(run.reason)} size={14} />
      <span className="font-medium text-text">{reasonText}</span>
      <span>· {t(`quotaWindowPing.status.${run.status}`)}</span>
      <span>· {t(`quotaWindowPing.trigger.${run.trigger}`)}</span>
      <span>· {targetLabel}</span>
      {run.dryRun && <span>· {t("quotaWindowPing.dryRunMarker")}</span>}
      {run.fingerprint && <span className="font-mono break-all">· {run.fingerprint}</span>}
      {run.detail && <span className="font-mono">· {run.detail}</span>}
      <time dateTime={run.startedAt}>· {formatDate(run.startedAt, locale)}</time>
    </div>
  );
}

function ClaudeConfirmation({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}) {
  const t = useTranslations("settings");
  return (
    <Checkbox
      className="min-h-11 items-center"
      label={t("quotaWindowPing.claudeConfirm")}
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
    />
  );
}

function AddTargetForm({
  descriptors,
  connections,
  busy,
  onAdd,
}: {
  descriptors: DescriptorView[];
  connections: ProviderConnection[];
  busy: boolean;
  onAdd: (input: WindowPingTargetInput) => Promise<boolean>;
}) {
  const t = useTranslations("settings");
  const locale = useLocale();
  const dayNames = weekdayNames(locale);

  const providerOptions = useMemo(() => {
    const providers = [...new Set(descriptors.filter((d) => d.targetable).map((d) => d.provider))];
    return providers.map((provider) => ({ value: provider, label: providerLabel(provider) }));
  }, [descriptors]);

  const [provider, setProvider] = useState(() => providerOptions[0]?.value ?? "");
  const [connectionId, setConnectionId] = useState("");
  const [descriptorId, setDescriptorId] = useState(
    () =>
      descriptors.find((d) => d.provider === (providerOptions[0]?.value ?? "") && d.targetable)
        ?.id ?? ""
  );
  const [model, setModel] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [enabled, setEnabled] = useState(() => {
    const first = descriptors.find((d) => d.id === descriptorId) ?? null;
    return first?.policy === "scheduled" && first.provider !== "claude";
  });
  const [draft, setDraft] = useState<ScheduleDraft>(() => draftFromSchedule(null));

  const connectionOptions = useMemo(
    () =>
      connections
        .filter(
          (connection) =>
            connection.provider === provider &&
            connection.authType === "oauth" &&
            connection.isActive !== false
        )
        .map((connection) => ({ value: connection.id, label: connectionLabel(connection) })),
    [connections, provider]
  );

  const windows = useMemo(
    () => descriptors.filter((d) => d.provider === provider && d.targetable),
    [descriptors, provider]
  );

  const descriptor = windows.find((d) => d.id === descriptorId) ?? null;
  const isClaude = descriptor?.provider === "claude";
  const scheduledAllowed = descriptor?.scheduledAllowed === true;
  const modelFilter = useCallback(
    (candidate: ApiModel) => candidate.provider === provider,
    [provider]
  );

  const chooseProvider = (nextProvider: string) => {
    const first = descriptors.find((d) => d.provider === nextProvider && d.targetable) ?? null;
    setProvider(nextProvider);
    setConnectionId("");
    setDescriptorId(first?.id ?? "");
    setModel("");
    setEnabled(first?.policy === "scheduled" && first.provider !== "claude");
  };

  const chooseDescriptor = (nextId: string) => {
    const next = windows.find((d) => d.id === nextId) ?? null;
    setDescriptorId(nextId);
    setEnabled(next?.policy === "scheduled" && next.provider !== "claude");
  };

  const chooseConfirmed = (nextConfirmed: boolean) => {
    setConfirmed(nextConfirmed);
    if (!nextConfirmed) setEnabled(false);
    else if (descriptor?.policy === "scheduled") setEnabled(true);
  };

  const scheduleReady = !scheduledAllowed || !enabled || scheduleIsValid(draft);
  const canAdd =
    !busy &&
    !!descriptor &&
    !!connectionId &&
    scheduleReady &&
    (!isClaude || !enabled || confirmed);

  const submit = async () => {
    if (!descriptor || !connectionId) return;
    const input: WindowPingTargetInput = {
      connectionId,
      descriptorId: descriptor.id,
      model: model.trim() ? model.trim() : null,
      enabled: scheduledAllowed ? enabled : false,
      schedule: scheduledAllowed && enabled ? buildSchedule(draft) : null,
      dryRun: false,
      claudeBillableConfirmed: isClaude ? confirmed : false,
    };
    const ok = await onAdd(input);
    if (ok) {
      setConnectionId("");
      setModel("");
      setConfirmed(false);
      setEnabled(descriptor.policy === "scheduled" && descriptor.provider !== "claude");
      setDraft(draftFromSchedule(null));
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
      <h5 className="text-sm font-medium">{t("quotaWindowPing.addTitle")}</h5>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Select
          label={t("quotaWindowPing.provider")}
          value={provider}
          disabled={busy || providerOptions.length === 0}
          onChange={(event) => chooseProvider(event.target.value)}
          options={providerOptions}
          placeholder={t("quotaWindowPing.noWindows")}
        />
        <Select
          label={t("quotaWindowPing.connection")}
          value={connectionId}
          disabled={busy || connectionOptions.length === 0}
          onChange={(event) => setConnectionId(event.target.value)}
          options={connectionOptions}
          placeholder={t("quotaWindowPing.connectionPlaceholder")}
        />
        <Select
          label={t("quotaWindowPing.window")}
          value={descriptor?.id ?? ""}
          disabled={busy || windows.length === 0}
          onChange={(event) => chooseDescriptor(event.target.value)}
          options={windows.map((window) => ({
            value: window.id,
            label: window.displayName,
          }))}
          placeholder={t("quotaWindowPing.noWindows")}
        />
        <ModelSelectField
          label={t("quotaWindowPing.model")}
          placeholder={t("quotaWindowPing.modelAuto")}
          ariaLabel={t("quotaWindowPing.model")}
          value={model}
          onChange={setModel}
          allowEmpty
          disabled={busy}
          modelFilter={modelFilter}
        />
      </div>
      {connectionOptions.length === 0 && (
        <p className="text-xs text-text-muted">{t("quotaWindowPing.noConnections")}</p>
      )}
      {descriptor && !descriptor.scheduledAllowed && (
        <p className="flex items-center gap-1 text-xs text-text-muted">
          <Icon name="block" size={14} />
          {t("quotaWindowPing.manualOnly")}
        </p>
      )}
      {descriptor && isClaude && (
        <ClaudeConfirmation checked={confirmed} onChange={chooseConfirmed} />
      )}
      {descriptor && scheduledAllowed && (
        <fieldset className="flex flex-col gap-2" disabled={busy || (isClaude && !confirmed)}>
          <legend className="text-xs font-medium text-text-muted">
            {t("quotaWindowPing.schedule")}
          </legend>
          <ScheduleEditor
            value={draft}
            onChange={setDraft}
            disabled={busy || (isClaude && !confirmed)}
          />
          <Toggle
            checked={enabled}
            onChange={setEnabled}
            disabled={busy || (isClaude && !confirmed)}
            label={t("quotaWindowPing.enabled")}
            size="sm"
            className="min-h-11"
          />
          {enabled && scheduleIsValid(draft) && (
            <p className="text-xs text-text-muted">
              {t("quotaWindowPing.scheduleWillSave", {
                schedule: scheduleSummary(buildSchedule(draft), t, dayNames),
              })}
            </p>
          )}
        </fieldset>
      )}
      <div>
        <Button
          size="sm"
          icon="add"
          loading={busy}
          disabled={!canAdd}
          onClick={submit}
          className="min-h-11"
        >
          {t("quotaWindowPing.add")}
        </Button>
      </div>
    </div>
  );
}

function TargetRow({
  target,
  descriptor,
  connection,
  lastRun,
  busy,
  onUpdate,
  onRun,
  onDelete,
}: {
  target: WindowPingTarget;
  descriptor: DescriptorView | undefined;
  connection: ProviderConnection | undefined;
  lastRun: WindowPingRun | undefined;
  busy: boolean;
  onUpdate: UpdateTarget;
  onRun: (target: WindowPingTarget) => Promise<boolean>;
  onDelete: (target: WindowPingTarget) => Promise<boolean>;
}) {
  const t = useTranslations("settings");
  const locale = useLocale();
  const dayNames = weekdayNames(locale);
  const [draft, setDraft] = useState<ScheduleDraft>(() => draftFromSchedule(target.schedule));
  const [threshold, setThreshold] = useState(String(target.minLongerWindowRemainingPct));

  const isClaude = (descriptor?.provider ?? target.provider) === "claude";
  const scheduledAllowed = descriptor?.scheduledAllowed === true;
  const targetable = descriptor?.targetable === true;
  const label = connection ? connectionLabel(connection) : target.connectionId;
  const windowLabel = descriptor?.displayName ?? target.windowId;
  const draftValid = scheduleIsValid(draft);
  const draftDirty = JSON.stringify(buildSchedule(draft)) !== JSON.stringify(target.schedule);
  const confirmationSatisfied = !isClaude || target.claudeBillableConfirmed;

  const commitThreshold = () => {
    const value = Number(threshold);
    if (!Number.isInteger(value) || value < 0 || value > 100) {
      setThreshold(String(target.minLongerWindowRemainingPct));
      return;
    }
    if (value !== target.minLongerWindowRemainingPct) {
      void onUpdate(target, { minLongerWindowRemainingPct: value });
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium break-words">
            {label} · {windowLabel}
          </p>
          <p className="text-xs text-text-muted">
            {providerLabel(target.provider)} · {target.windowId}
          </p>
        </div>
        {target.enabled && (
          <span className="flex items-center gap-1 text-xs text-success">
            <Icon name="check_circle" size={14} />
            {t("quotaWindowPing.enabled")}
          </span>
        )}
      </div>

      {lastRun ? (
        <div>
          <p className="text-xs font-medium text-text-muted">{t("quotaWindowPing.lastDecision")}</p>
          <RunSummary run={lastRun} targetLabel={windowLabel} />
        </div>
      ) : (
        <p className="text-xs text-text-muted">{t("quotaWindowPing.noRunForTarget")}</p>
      )}

      {!targetable && (
        <p className="flex items-center gap-1 text-xs text-warning">
          <Icon name="warning" size={14} />
          {t("quotaWindowPing.unavailableWindow")}
        </p>
      )}

      {targetable && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {scheduledAllowed && (
            <Toggle
              checked={target.enabled}
              onChange={(checked) =>
                void onUpdate(
                  target,
                  checked
                    ? { enabled: true, schedule: buildSchedule(draft) }
                    : { enabled: false, schedule: null },
                  checked ? t("quotaWindowPing.saved") : undefined
                )
              }
              disabled={busy || !confirmationSatisfied || (target.enabled === false && !draftValid)}
              label={`${t("quotaWindowPing.enabled")} · ${label} ${windowLabel}`}
              description={
                !confirmationSatisfied
                  ? t("quotaWindowPing.claudeConfirmRequired")
                  : t("quotaWindowPing.enabledHint")
              }
              size="sm"
              className="min-h-11"
            />
          )}
          <Toggle
            checked={target.dryRun}
            onChange={(checked) => void onUpdate(target, { dryRun: checked })}
            disabled={busy}
            label={`${t("quotaWindowPing.dryRun")} · ${label} ${windowLabel}`}
            description={t("quotaWindowPing.dryRunHint")}
            size="sm"
            className="min-h-11"
          />
        </div>
      )}

      {targetable && !scheduledAllowed && (
        <p className="flex items-center gap-1 text-xs text-text-muted">
          <Icon name="block" size={14} />
          {t("quotaWindowPing.manualOnly")}
        </p>
      )}

      {descriptor?.longerWindow && (
        <Input
          type="number"
          min={0}
          max={100}
          step={1}
          label={t("quotaWindowPing.threshold")}
          hint={t("quotaWindowPing.thresholdHint")}
          value={threshold}
          disabled={busy}
          className="w-full sm:w-56"
          onChange={(event) => setThreshold(event.target.value)}
          onBlur={commitThreshold}
        />
      )}

      {isClaude && (
        <ClaudeConfirmation
          checked={target.claudeBillableConfirmed}
          disabled={busy || (target.enabled && target.claudeBillableConfirmed)}
          onChange={(checked) =>
            void onUpdate(
              target,
              { claudeBillableConfirmed: checked },
              checked ? t("quotaWindowPing.confirmSaved") : undefined
            )
          }
        />
      )}
      {isClaude && target.enabled && !target.claudeBillableConfirmed && (
        <p role="alert" className="flex items-center gap-1 text-xs text-warning">
          <Icon name="warning" size={14} />
          {t("quotaWindowPing.claudeStale")}
        </p>
      )}

      {scheduledAllowed && (
        <fieldset
          className="flex flex-col gap-2 rounded-lg border border-border p-3"
          disabled={busy || !confirmationSatisfied}
        >
          <legend className="px-1 text-xs font-medium text-text-muted">
            {t("quotaWindowPing.schedule")}
          </legend>
          {target.schedule ? (
            <p className="text-xs text-text-muted">
              {scheduleSummary(target.schedule, t, dayNames)}
              {target.nextRunAt &&
                ` · ${t("quotaWindowPing.nextRun", { time: formatDate(target.nextRunAt, locale) })}`}
            </p>
          ) : (
            <p className="text-xs text-text-muted">{t("quotaWindowPing.scheduleNotSaved")}</p>
          )}
          <ScheduleEditor
            value={draft}
            onChange={setDraft}
            disabled={busy || !confirmationSatisfied}
          />
          {target.enabled && (
            <div>
              <Button
                size="sm"
                variant="outline"
                icon="schedule"
                loading={busy}
                disabled={busy || !draftValid || !draftDirty}
                className="min-h-11"
                onClick={() =>
                  void onUpdate(
                    target,
                    { schedule: buildSchedule(draft) },
                    t("quotaWindowPing.scheduleSaved")
                  )
                }
              >
                {t("quotaWindowPing.saveSchedule")}
              </Button>
            </div>
          )}
          {!draftValid && (
            <p role="alert" className="text-xs text-error">
              {t("quotaWindowPing.scheduleError")}
            </p>
          )}
        </fieldset>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          icon="play_arrow"
          loading={busy}
          disabled={busy}
          className="min-h-11"
          onClick={() => void onRun(target)}
        >
          {t("quotaWindowPing.runNow")}
        </Button>
        <Button
          size="sm"
          variant="destructive-ghost"
          icon="delete"
          disabled={busy}
          className="min-h-11"
          onClick={() => void onDelete(target)}
        >
          {t("quotaWindowPing.delete")}
        </Button>
      </div>
    </div>
  );
}

function RecentRuns({
  runs,
  targets,
  connections,
  descriptors,
}: {
  runs: WindowPingRun[];
  targets: WindowPingTarget[];
  connections: ProviderConnection[];
  descriptors: DescriptorView[];
}) {
  const t = useTranslations("settings");
  const recent = runs.slice(0, RECENT_LIMIT);

  const labelFor = (run: WindowPingRun): string => {
    const target = targets.find((item) => item.id === run.targetId);
    if (!target) return t("quotaWindowPing.unknownTarget");
    const connection = connections.find((item) => item.id === target.connectionId);
    const descriptor = descriptors.find((item) => item.id === target.descriptorId);
    const name = connection ? connectionLabel(connection) : target.connectionId;
    return `${name} · ${descriptor?.displayName ?? run.windowId}`;
  };

  return (
    <details className="rounded-lg border border-border">
      <summary className="min-h-11 cursor-pointer px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
        {t("quotaWindowPing.recentTitle")} ({recent.length})
      </summary>
      <div className="border-t border-border px-3 py-2">
        {recent.length === 0 ? (
          <p className="text-xs text-text-muted" role="status">
            {t("quotaWindowPing.noRuns")}
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {recent.map((run) => (
              <li key={run.id}>
                <RunSummary run={run} targetLabel={labelFor(run)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}

/**
 * Quota window ping targets, shown in the AI settings tab. A target warms one
 * reported quota window per connection with a single tiny request. Off by
 * default: every ping spends real quota, and the kill switch gates scheduled
 * runs while the manual Run now action still reports the skip reason.
 */
export default function QuotaWindowPingSection() {
  const t = useTranslations("settings");
  const [snapshot, setSnapshot] = useState<Snapshot>({
    enabled: false,
    descriptors: [],
    targets: [],
    runs: [],
  });
  const [connections, setConnections] = useState<ProviderConnection[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [notice, setNotice] = useState<Notice>(null);
  const [savingKillSwitch, setSavingKillSwitch] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const loadAll = useCallback(async (): Promise<boolean> => {
    const [nextSnapshot, nextConnections] = await Promise.all([
      fetchSnapshot(),
      fetchConnections(),
    ]);
    if (!nextSnapshot) return false;
    setSnapshot(nextSnapshot);
    setConnections(nextConnections ?? []);
    return true;
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([fetchSnapshot(), fetchConnections()]).then(([nextSnapshot, nextConnections]) => {
      if (cancelled) return;
      if (!nextSnapshot) {
        setStatus("error");
        return;
      }
      setSnapshot(nextSnapshot);
      setConnections(nextConnections ?? []);
      setStatus("ready");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const reload = useCallback(async () => {
    const next = await fetchSnapshot();
    if (next) setSnapshot(next);
  }, []);

  const retry = async () => {
    setStatus("loading");
    const ok = await loadAll();
    setStatus(ok ? "ready" : "error");
  };

  const act = useCallback(
    async (body: Record<string, unknown>, okText?: string): Promise<boolean> => {
      let response: Response;
      try {
        response = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } catch {
        setNotice({ tone: "error", text: t("quotaWindowPing.actionError") });
        return false;
      }
      if (!response.ok) {
        const message = await readErrorMessage(response, t("quotaWindowPing.actionError"));
        setNotice({ tone: "error", text: message });
        await reload();
        return false;
      }
      setNotice(okText ? { tone: "ok", text: okText } : null);
      await reload();
      return true;
    },
    [reload, t]
  );

  const toggleKillSwitch = async (enabled: boolean) => {
    if (savingKillSwitch) return;
    const previous = snapshot.enabled;
    setSavingKillSwitch(true);
    setSnapshot((current) => ({ ...current, enabled }));
    try {
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quotaWindowPing: { enabled } }),
      });
      const data = response.ok
        ? ((await response.json().catch(() => null)) as { ignoredKeys?: unknown } | null)
        : null;
      const ignored =
        Array.isArray(data?.ignoredKeys) && data.ignoredKeys.includes("quotaWindowPing");
      if (!response.ok || ignored) {
        setSnapshot((current) => ({ ...current, enabled: previous }));
        setNotice({ tone: "error", text: t("quotaWindowPing.killSwitchError") });
      } else {
        setNotice({ tone: "ok", text: t("quotaWindowPing.saved") });
      }
    } catch {
      setSnapshot((current) => ({ ...current, enabled: previous }));
      setNotice({ tone: "error", text: t("quotaWindowPing.killSwitchError") });
    } finally {
      setSavingKillSwitch(false);
    }
  };

  const updateTarget = useCallback<UpdateTarget>(
    async (target, patch, okText) => {
      setBusyId(target.id);
      const ok = await act(
        { action: "update", id: target.id, target: targetInputFrom(target, patch) },
        okText
      );
      setBusyId(null);
      return ok;
    },
    [act]
  );

  const runTarget = useCallback(
    async (target: WindowPingTarget) => {
      setBusyId(target.id);
      const ok = await act({ action: "run", id: target.id }, t("quotaWindowPing.runStarted"));
      setBusyId(null);
      return ok;
    },
    [act, t]
  );

  const deleteTarget = useCallback(
    async (target: WindowPingTarget) => {
      setBusyId(target.id);
      const ok = await act({ action: "delete", id: target.id }, t("quotaWindowPing.deleted"));
      setBusyId(null);
      return ok;
    },
    [act, t]
  );

  const addTarget = useCallback(
    async (input: WindowPingTargetInput) => {
      setBusyId("new");
      const ok = await act({ action: "create", target: input }, t("quotaWindowPing.added"));
      setBusyId(null);
      return ok;
    },
    [act, t]
  );

  const lastRunByTarget = useMemo(() => {
    const map = new Map<string, WindowPingRun>();
    for (const run of snapshot.runs) if (!map.has(run.targetId)) map.set(run.targetId, run);
    return map;
  }, [snapshot.runs]);

  return (
    <section
      className="mt-3 flex flex-col gap-3 border-t border-border pt-3"
      aria-labelledby="quota-window-ping-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 id="quota-window-ping-title" className="flex items-center gap-1.5 text-sm">
            {t("quotaWindowPing.title")}
            <InfoTooltip text={t("quotaWindowPing.warning")} />
          </h4>
          <p className="text-xs text-text-muted">{t("quotaWindowPing.desc")}</p>
        </div>
        <Toggle
          checked={snapshot.enabled}
          onChange={(enabled) => void toggleKillSwitch(enabled)}
          disabled={savingKillSwitch || status !== "ready"}
          label={t("quotaWindowPing.killSwitch")}
          description={t("quotaWindowPing.killSwitchHint")}
          size="sm"
          className="min-h-11"
        />
      </div>

      {notice && (
        <p
          role={notice.tone === "ok" ? "status" : "alert"}
          className={`text-xs ${notice.tone === "ok" ? "text-success" : "text-error"}`}
        >
          {notice.text}
        </p>
      )}

      {status === "loading" && (
        <p role="status" className="text-sm text-text-muted">
          {t("quotaWindowPing.loading")}
        </p>
      )}

      {status === "error" && (
        <div role="alert" className="flex flex-wrap items-center gap-2 text-sm text-error">
          <Icon name="error" size={16} />
          <span>{t("quotaWindowPing.loadError")}</span>
          <Button size="sm" variant="outline" icon="refresh" onClick={retry} className="min-h-11">
            {t("quotaWindowPing.retry")}
          </Button>
        </div>
      )}

      {status === "ready" && (
        <>
          {snapshot.targets.length === 0 ? (
            <p role="status" className="text-sm text-text-muted">
              {t("quotaWindowPing.empty")}
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {snapshot.targets.map((target) => (
                <TargetRow
                  key={target.id}
                  target={target}
                  descriptor={snapshot.descriptors.find((d) => d.id === target.descriptorId)}
                  connection={connections.find((c) => c.id === target.connectionId)}
                  lastRun={lastRunByTarget.get(target.id)}
                  busy={busyId === target.id}
                  onUpdate={updateTarget}
                  onRun={runTarget}
                  onDelete={deleteTarget}
                />
              ))}
            </div>
          )}
          <AddTargetForm
            descriptors={snapshot.descriptors}
            connections={connections}
            busy={busyId === "new"}
            onAdd={addTarget}
          />
          <RecentRuns
            runs={snapshot.runs}
            targets={snapshot.targets}
            connections={connections}
            descriptors={snapshot.descriptors}
          />
        </>
      )}
    </section>
  );
}
