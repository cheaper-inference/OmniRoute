"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import { Button, Checkbox, Input, Select, Toggle } from "@/shared/components";

type Schedule =
  | { kind: "interval"; minutes: number }
  | { kind: "daily"; time: string; timezone: string; days: number[] };

type WakeupTask = {
  id: string;
  name: string;
  connectionIds: string[];
  schedule: Schedule;
  enabled: boolean;
  nextRunAt: string | null;
};

type WakeupRun = { id: string; taskId: string; status: string; startedAt: string };

export type WakeupAccount = { id: string; label: string };

type Notice = { tone: "ok" | "error"; text: string } | null;

const API = "/api/settings/codex-wakeups";
const RUN_STATUSES = ["running", "succeeded", "failed", "skipped", "partial", "interrupted"];
const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

function weekdayNames(locale: string): string[] {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  // 2023-01-01 was a Sunday, so day i maps to Date#getDay() === i.
  return WEEKDAYS.map((day) => format.format(Date.UTC(2023, 0, 1 + day)));
}

function browserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

type WakeupState = { tasks: WakeupTask[]; runs: WakeupRun[] };

async function loadWakeups(): Promise<WakeupState | null> {
  try {
    const res = await fetch(API);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      tasks: Array.isArray(data?.tasks) ? data.tasks : [],
      runs: Array.isArray(data?.runs) ? data.runs : [],
    };
  } catch {
    // Keep the last good list; the section is informational until the next reload.
    return null;
  }
}

function useCodexWakeups() {
  const [state, setState] = useState<WakeupState>({ tasks: [], runs: [] });

  useEffect(() => {
    let cancelled = false;
    loadWakeups().then((next) => {
      if (!cancelled && next) setState(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const send = useCallback(async (body: Record<string, unknown>): Promise<boolean> => {
    let ok = false;
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    const next = await loadWakeups();
    if (next) setState(next);
    return ok;
  }, []);

  return { tasks: state.tasks, runs: state.runs, send };
}

function scheduleLabel(
  schedule: Schedule,
  t: ReturnType<typeof useTranslations>,
  dayNames: string[]
): string {
  if (schedule.kind === "interval")
    return t("codexWakeups.everyMinutes", { minutes: schedule.minutes });
  return t("codexWakeups.dailyAt", {
    days: schedule.days.map((day) => dayNames[day]).join(", "),
    time: schedule.time,
    timezone: schedule.timezone,
  });
}

type DailyDraft = { time: string; timezone: string; days: number[] };

function toggleIn<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function DailyFields({
  value,
  onChange,
}: {
  value: DailyDraft;
  onChange: (next: DailyDraft) => void;
}) {
  const t = useTranslations("settings");
  const dayNames = weekdayNames(useLocale());
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Input
          type="time"
          label={t("codexWakeups.time")}
          value={value.time}
          onChange={(e) => onChange({ ...value, time: e.target.value })}
        />
        <Input
          label={t("codexWakeups.timezone")}
          value={value.timezone}
          onChange={(e) => onChange({ ...value, timezone: e.target.value })}
        />
      </div>
      <CheckboxGroup label={t("codexWakeups.days")}>
        <div className="flex flex-wrap gap-3">
          {WEEKDAYS.map((day) => (
            <Checkbox
              key={day}
              label={dayNames[day]}
              checked={value.days.includes(day)}
              onChange={() => onChange({ ...value, days: toggleIn(value.days, day) })}
            />
          ))}
        </div>
      </CheckboxGroup>
    </div>
  );
}

function AccountPicker({
  accounts,
  selected,
  onChange,
}: {
  accounts: WakeupAccount[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const t = useTranslations("settings");
  return (
    <CheckboxGroup label={t("codexWakeups.accounts")}>
      {accounts.map((account) => (
        <Checkbox
          key={account.id}
          label={account.label}
          checked={selected.includes(account.id)}
          onChange={() => onChange(toggleIn(selected, account.id))}
        />
      ))}
    </CheckboxGroup>
  );
}

function WakeupForm({
  accounts,
  onCreate,
}: {
  accounts: WakeupAccount[];
  onCreate: (task: Record<string, unknown>) => Promise<boolean>;
}) {
  const t = useTranslations("settings");
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [kind, setKind] = useState<"daily" | "interval">("daily");
  const [daily, setDaily] = useState<DailyDraft>(() => ({
    time: "08:00",
    timezone: browserTimeZone(),
    days: [1, 2, 3, 4, 5],
  }));
  const [minutes, setMinutes] = useState(300);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setSaving(true);
    const schedule =
      kind === "interval"
        ? { kind, minutes }
        : { kind, time: daily.time, timezone: daily.timezone.trim(), days: daily.days };
    const ok = await onCreate({ name, connectionIds: selected, enabled: true, schedule });
    setSaving(false);
    if (ok) {
      setName("");
      setSelected([]);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border p-3">
      <Input
        label={t("codexWakeups.name")}
        value={name}
        maxLength={80}
        onChange={(e) => setName(e.target.value)}
      />
      <AccountPicker accounts={accounts} selected={selected} onChange={setSelected} />
      <Select
        label={t("codexWakeups.scheduleKind")}
        value={kind}
        onChange={(e) => setKind(e.target.value === "interval" ? "interval" : "daily")}
        options={[
          { value: "daily", label: t("codexWakeups.daily") },
          { value: "interval", label: t("codexWakeups.interval") },
        ]}
      />
      {kind === "daily" ? (
        <DailyFields value={daily} onChange={setDaily} />
      ) : (
        <Input
          type="number"
          min={5}
          max={10080}
          label={t("codexWakeups.minutes")}
          value={String(minutes)}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
      )}
      <div>
        <Button
          size="sm"
          icon="alarm_add"
          loading={saving}
          disabled={saving || !name.trim() || selected.length === 0}
          onClick={submit}
        >
          {t("codexWakeups.add")}
        </Button>
      </div>
    </div>
  );
}

function WakeupRow({
  task,
  lastRun,
  onSend,
}: {
  task: WakeupTask;
  lastRun: WakeupRun | undefined;
  onSend: (body: Record<string, unknown>) => Promise<boolean>;
}) {
  const t = useTranslations("settings");
  const locale = useLocale();
  const dayNames = weekdayNames(locale);
  const { id, name, connectionIds, schedule } = task;
  const status = lastRun && RUN_STATUSES.includes(lastRun.status) ? lastRun.status : null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-1">
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{task.name}</p>
        <p className="text-xs text-text-muted">
          {scheduleLabel(task.schedule, t, dayNames)}
          {task.nextRunAt &&
            ` · ${t("codexWakeups.nextRun", { time: new Date(task.nextRunAt).toLocaleString(locale) })}`}
          {status &&
            ` · ${t("codexWakeups.lastRun", { status: t(`codexWakeups.status.${status}`) })}`}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <Toggle
          checked={task.enabled}
          onChange={(enabled) =>
            onSend({
              action: "update",
              id,
              task: { name, connectionIds, schedule, enabled },
            })
          }
          ariaLabel={t("codexWakeups.toggleAria", { name: task.name })}
        />
        <Button
          size="sm"
          variant="ghost"
          icon="play_arrow"
          onClick={() => onSend({ action: "run", id })}
        >
          {t("codexWakeups.runNow")}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          icon="delete"
          onClick={() => onSend({ action: "delete", id })}
        >
          {t("codexWakeups.delete")}
        </Button>
      </div>
    </div>
  );
}

/**
 * Scheduled wakeups for Codex OAuth accounts, shown inside the Codex Auto-Ping card.
 * Each run sends one tiny request per selected account at the chosen time so the
 * account's quota window starts then. Consumes real quota; off until a task exists.
 */
export default function CodexWakeupsSection({ accounts }: { accounts: WakeupAccount[] }) {
  const t = useTranslations("settings");
  const { tasks, runs, send } = useCodexWakeups();
  const [notice, setNotice] = useState<Notice>(null);

  const lastRunByTask = useMemo(() => {
    const map = new Map<string, WakeupRun>();
    for (const run of runs) if (!map.has(run.taskId)) map.set(run.taskId, run);
    return map;
  }, [runs]);

  const act = async (body: Record<string, unknown>, okText?: string) => {
    const ok = await send(body);
    const errorText =
      body.action === "create" ? t("codexWakeups.saveError") : t("codexWakeups.actionError");
    setNotice(
      ok ? (okText ? { tone: "ok", text: okText } : null) : { tone: "error", text: errorText }
    );
    return ok;
  };

  return (
    <section
      className="flex flex-col gap-3 border-t border-border pt-3 mt-3"
      aria-labelledby="codex-wakeups-title"
    >
      <div>
        <h4 id="codex-wakeups-title" className="text-sm font-semibold">
          {t("codexWakeups.title")}
        </h4>
        <p className="text-xs text-text-muted">{t("codexWakeups.desc")}</p>
      </div>
      {tasks.map((task) => (
        <WakeupRow
          key={task.id}
          task={task}
          lastRun={lastRunByTask.get(task.id)}
          onSend={(body) =>
            act(body, body.action === "run" ? t("codexWakeups.runStarted") : undefined)
          }
        />
      ))}
      <WakeupForm accounts={accounts} onCreate={(task) => act({ action: "create", task })} />
      {notice && (
        <p
          role={notice.tone === "ok" ? "status" : "alert"}
          className={`text-xs ${notice.tone === "ok" ? "text-success" : "text-error"}`}
        >
          {notice.text}
        </p>
      )}
    </section>
  );
}
