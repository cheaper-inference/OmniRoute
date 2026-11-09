"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Checkbox, CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import { Card, Collapsible, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import {
  CLAUDE_FAST_MODE_DEFAULT_MODELS,
  getClaudeFastModeSupportedModels,
  isClaudeFastModeEnabled,
} from "@/lib/providers/claudeFastMode";

const SUPPORTED_MODEL_CHOICES = [...CLAUDE_FAST_MODE_DEFAULT_MODELS];

export default function ClaudeFastModeTab() {
  const [enabled, setEnabled] = useState(false);
  const [selectedModels, setSelectedModels] = useState<string[]>([
    ...CLAUDE_FAST_MODE_DEFAULT_MODELS,
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");
  const t = useTranslations("settings");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setEnabled(isClaudeFastModeEnabled(data));
        setSelectedModels(getClaudeFastModeSupportedModels(data));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const modelsCount = selectedModels.length;

  const subtitle = useMemo(
    () => t("claudeFastModeModelsLabel", { count: modelsCount }),
    [t, modelsCount]
  );

  const persist = async (payload: { enabled: boolean; supportedModels: string[] }) => {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claudeFastMode: payload }),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
        return false;
      }
    } catch {
      setStatus("error");
      return false;
    } finally {
      setSaving(false);
    }
    return true;
  };

  const saveEnabled = async (next: boolean) => {
    if (saving || loading) return;
    const previous = enabled;
    setEnabled(next);
    const ok = await persist({ enabled: next, supportedModels: selectedModels });
    if (!ok) setEnabled(previous);
  };

  const toggleModel = async (modelId: string, checked: boolean) => {
    if (saving || loading) return;
    const previous = selectedModels;
    const next = checked
      ? Array.from(new Set([...selectedModels, modelId]))
      : selectedModels.filter((id) => id !== modelId);
    setSelectedModels(next);
    const ok = await persist({ enabled, supportedModels: next });
    if (!ok) setSelectedModels(previous);
  };

  return (
    <Card
      icon="bolt"
      title={t("claudeFastModeTitle")}
      subtitle={t("claudeFastModeDesc")}
      action={
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span
              role="status"
              className="text-xs font-medium text-success flex items-center gap-1"
            >
              <Icon name="check_circle" size={14} /> {t("saved")}
            </span>
          )}
          {status === "error" && (
            <span role="alert" className="text-xs font-medium text-error flex items-center gap-1">
              <Icon name="error" size={14} /> {t("claudeFastModeSaveError")}
            </span>
          )}
          <Toggle
            checked={enabled}
            onChange={(value) => saveEnabled(value)}
            disabled={loading || saving}
            ariaLabel={t("claudeFastModeTitle")}
          />
        </div>
      }
    >
      {enabled && (
        <div className="mb-3">
          <Collapsible
            title={t("claudeFastModeModelsLabel", { count: modelsCount })}
            subtitle={subtitle}
            icon="checklist"
            variant="inline"
          >
            <CheckboxGroup>
              {SUPPORTED_MODEL_CHOICES.map((modelId) => (
                <Checkbox
                  key={modelId}
                  checked={selectedModels.includes(modelId)}
                  onChange={(e) => toggleModel(modelId, e.target.checked)}
                  disabled={loading || saving}
                  aria-label={t("claudeFastModeModelCheckbox", { model: modelId })}
                  label={<span className="font-mono text-xs">{modelId}</span>}
                />
              ))}
            </CheckboxGroup>
          </Collapsible>
        </div>
      )}

      <p className="text-xs text-text-muted flex items-start gap-1.5 leading-relaxed">
        <Icon name="info" size={14} className="mt-0.5" />
        <span>{t("claudeFastModeHint")}</span>
      </p>
    </Card>
  );
}
