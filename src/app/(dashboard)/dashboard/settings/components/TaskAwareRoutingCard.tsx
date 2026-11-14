"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, ModelSelectField, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { NumberField } from "./ResilienceFields";

type TaskType =
  "coding" | "analysis" | "summarization" | "background" | "vision" | "creative" | "chat";

const TASK_LABEL_KEYS: Record<TaskType, string> = {
  coding: "taskRoutingTaskCoding",
  analysis: "taskRoutingTaskAnalysis",
  summarization: "taskRoutingTaskSummarization",
  background: "taskRoutingTaskBackground",
  vision: "taskRoutingTaskVision",
  creative: "taskRoutingTaskCreative",
  chat: "taskRoutingTaskChat",
};

type TaskModelMap = Partial<Record<TaskType, string>>;

type ComplexityRouting = { enabled: boolean; minScore: number; model: string };

type TaskRoutingSettings = {
  enabled: boolean;
  detectionAnchor: "latest-user" | "first-user";
  taskModelMap: TaskModelMap;
  complexityRouting: ComplexityRouting;
  defaultTaskModelMap: TaskModelMap;
  stats: { detected: number; routed: number };
};

type TaskRoutingResponse = Partial<
  Omit<TaskRoutingSettings, "complexityRouting" | "stats" | "detectionAnchor">
> & {
  detectionAnchor?: string;
  complexityRouting?: Partial<ComplexityRouting>;
  stats?: Partial<TaskRoutingSettings["stats"]>;
};

type TaskRoutingUpdate = Partial<
  Pick<TaskRoutingSettings, "enabled" | "detectionAnchor" | "taskModelMap" | "complexityRouting">
>;

// PUT responds without defaultTaskModelMap, so keep the one GET returned.
function toSettings(
  data: TaskRoutingResponse,
  previous: TaskRoutingSettings | null
): TaskRoutingSettings {
  return {
    enabled: data.enabled === true,
    detectionAnchor: data.detectionAnchor === "first-user" ? "first-user" : "latest-user",
    taskModelMap: { ...data.taskModelMap },
    complexityRouting: { enabled: false, minScore: 6, model: "", ...data.complexityRouting },
    defaultTaskModelMap: data.defaultTaskModelMap ?? previous?.defaultTaskModelMap ?? {},
    stats: { detected: Number(data.stats?.detected ?? 0), routed: Number(data.stats?.routed ?? 0) },
  };
}

/** Loads GET /api/settings/task-routing and saves partial updates with PUT. */
function useTaskRoutingSettings() {
  const [settings, setSettings] = useState<TaskRoutingSettings | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const res = await fetch("/api/settings/task-routing", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as TaskRoutingResponse;
        if (alive) setSettings(toSettings(data, null));
      } catch {
        if (alive) setLoadFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const save = async (update: TaskRoutingUpdate) => {
    setSaving(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/settings/task-routing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(update),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as TaskRoutingResponse;
      setSettings((previous) => toSettings(data, previous));
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  return { settings, loadFailed, saving, status, save };
}

function SettingRow({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start sm:items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm sm:text-base">{title}</p>
        <p className="text-xs sm:text-sm text-text-muted">{hint}</p>
      </div>
      {children}
    </div>
  );
}

function TaskModelsSection({
  taskModelMap,
  defaults,
  saving,
  save,
}: {
  taskModelMap: TaskModelMap;
  defaults: TaskModelMap;
  saving: boolean;
  save: (update: TaskRoutingUpdate) => void;
}) {
  const t = useTranslations("settings");
  return (
    <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
      <div>
        <p className="font-medium text-sm sm:text-base">{t("taskRoutingModelsTitle")}</p>
        <p className="text-xs sm:text-sm text-text-muted">{t("taskRoutingModelsHint")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(Object.keys(TASK_LABEL_KEYS) as TaskType[]).map((type) => (
          <ModelSelectField
            key={type}
            label={t(TASK_LABEL_KEYS[type])}
            value={taskModelMap[type] ?? ""}
            placeholder={t("taskRoutingKeepRequested")}
            allowEmpty
            disabled={saving}
            testId={`task-routing-model-${type}`}
            onChange={(model) => save({ taskModelMap: { ...taskModelMap, [type]: model } })}
          />
        ))}
      </div>
      <div>
        <Button
          variant="ghost"
          size="sm"
          disabled={saving}
          onClick={() => save({ taskModelMap: defaults })}
        >
          {t("taskRoutingRestoreDefaults")}
        </Button>
      </div>
    </div>
  );
}

// Every save applies to live routing, so a number is saved when the field loses focus, never
// per keystroke (typing "12" would save 1 first). Mount with key={saved} to reset the draft.
function ThresholdField({
  label,
  saved,
  onSave,
}: {
  label: string;
  saved: number;
  onSave: (minScore: number) => void;
}) {
  const [draft, setDraft] = useState(saved);
  return (
    <div
      className="w-32"
      onBlur={() => {
        if (draft !== saved) onSave(draft);
      }}
    >
      <NumberField label={label} value={draft} min={0} max={100} onChange={setDraft} />
    </div>
  );
}

// complexityRouting is replaced as a whole on update, so every save sends all three fields.
function EscalationSection({
  complexity,
  saving,
  save,
}: {
  complexity: ComplexityRouting;
  saving: boolean;
  save: (update: TaskRoutingUpdate) => void;
}) {
  const t = useTranslations("settings");
  const update = (patch: Partial<ComplexityRouting>) =>
    save({ complexityRouting: { ...complexity, ...patch } });
  return (
    <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
      <SettingRow title={t("taskRoutingComplexityTitle")} hint={t("taskRoutingComplexityHint")}>
        <Toggle
          checked={complexity.enabled}
          ariaLabel={t("taskRoutingComplexityTitle")}
          disabled={saving || (!complexity.enabled && !complexity.model)}
          onChange={(enabled) => update({ enabled })}
        />
      </SettingRow>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:items-end">
        <ModelSelectField
          label={t("taskRoutingComplexityModel")}
          value={complexity.model}
          disabled={saving}
          testId="task-routing-complexity-model"
          onChange={(model) => update({ model })}
        />
        <ThresholdField
          key={complexity.minScore}
          label={t("taskRoutingComplexityThreshold")}
          saved={complexity.minScore}
          onSave={(minScore) => update({ minScore })}
        />
      </div>
      {!complexity.model && (
        <p className="text-xs text-text-muted">{t("taskRoutingComplexityModelRequired")}</p>
      )}
    </div>
  );
}

/**
 * Task-Aware Routing card (Settings → Global Routing). Edits the same config as
 * PUT /api/settings/task-routing: the on/off switch, the conversation anchor, the
 * model per task type and complexity escalation. Pattern overrides stay API-only.
 */
export default function TaskAwareRoutingCard() {
  const t = useTranslations("settings");
  const { settings, loadFailed, saving, status, save } = useTaskRoutingSettings();

  if (loadFailed) {
    return (
      <Card className="p-6">
        <p className="text-sm text-text-muted">{t("taskRoutingLoadFailed")}</p>
      </Card>
    );
  }
  if (!settings) return null;

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-bg-subtle text-text-muted shrink-0">
          <Icon name="alt_route" size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold">{t("taskRoutingTitle")}</h3>
          <p className="text-xs text-text-muted">{t("taskRoutingDesc")}</p>
        </div>
        {status === "saved" && (
          <span className="text-xs font-medium text-success flex items-center gap-1 shrink-0">
            <Icon name="check_circle" size={14} /> {t("saved")}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <SettingRow title={t("taskRoutingEnable")} hint={t("taskRoutingEnableHint")}>
          <Toggle
            checked={settings.enabled}
            ariaLabel={t("taskRoutingEnable")}
            disabled={saving}
            onChange={(enabled) => save({ enabled })}
          />
        </SettingRow>
        {status === "error" && (
          <p role="alert" className="text-xs text-error">
            {t("taskRoutingSaveFailed")}
          </p>
        )}
        {settings.enabled && (
          <>
            <div className="pt-4 border-t border-border/50">
              <SettingRow title={t("taskRoutingAnchorTitle")} hint={t("taskRoutingAnchorHint")}>
                <Toggle
                  checked={settings.detectionAnchor === "first-user"}
                  ariaLabel={t("taskRoutingAnchorTitle")}
                  disabled={saving}
                  onChange={(on) => save({ detectionAnchor: on ? "first-user" : "latest-user" })}
                />
              </SettingRow>
            </div>
            <TaskModelsSection
              taskModelMap={settings.taskModelMap}
              defaults={settings.defaultTaskModelMap}
              saving={saving}
              save={save}
            />
            <EscalationSection
              complexity={settings.complexityRouting}
              saving={saving}
              save={save}
            />
            {settings.stats.detected > 0 && (
              <p className="text-xs text-text-muted">
                {t("taskRoutingStats", {
                  detected: settings.stats.detected,
                  routed: settings.stats.routed,
                })}
              </p>
            )}
          </>
        )}
      </div>
    </Card>
  );
}
