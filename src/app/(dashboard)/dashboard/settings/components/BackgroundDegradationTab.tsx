"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Badge,
  Button,
  Card,
  Collapsible,
  Input,
  ModelSelectField,
  Toggle,
} from "@/shared/components";
import Icon from "@/shared/components/Icon";

export default function BackgroundDegradationTab() {
  const [config, setConfig] = useState({
    enabled: false,
    degradationMap: {},
    detectionPatterns: [],
    stats: { detected: 0, tokensSaved: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [newPattern, setNewPattern] = useState("");
  const t = useTranslations("settings");

  useEffect(() => {
    fetch("/api/settings/background-degradation")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async (updates) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    setSaving(true);
    setStatus("");
    try {
      const { stats, ...persistable } = newConfig;
      const res = await fetch("/api/settings/background-degradation", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(persistable),
      });
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const addMapping = () => {
    if (!newFrom.trim() || !newTo.trim()) return;
    const map = { ...config.degradationMap, [newFrom.trim()]: newTo.trim() };
    save({ degradationMap: map });
    setNewFrom("");
    setNewTo("");
  };

  const removeMapping = (key) => {
    const map = { ...config.degradationMap };
    delete map[key];
    save({ degradationMap: map });
  };

  const addPattern = () => {
    if (!newPattern.trim()) return;
    const patterns = [...config.detectionPatterns, newPattern.trim()];
    save({ detectionPatterns: patterns });
    setNewPattern("");
  };

  const removePattern = (idx) => {
    const patterns = config.detectionPatterns.filter((_, i) => i !== idx);
    save({ detectionPatterns: patterns });
  };

  const mapEntries = Object.entries(config.degradationMap || {}) as [string, string][];

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
          <Icon name="speed" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("backgroundDegradationTitle")}</h3>
          <p className="text-sm text-text-muted">{t("backgroundDegradationDesc")}</p>
        </div>
        {status === "saved" && (
          <span className="text-xs font-medium text-success flex items-center gap-1">
            <Icon name="check_circle" size={14} /> {t("saved")}
          </span>
        )}
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
        <div>
          <p className="text-sm font-medium">{t("enableDegradation")}</p>
          <p className="text-xs text-text-muted mt-0.5">
            {t("enableDegradationHint") ||
              "Automatically use cheaper models for background utility tasks"}
          </p>
        </div>
        <Toggle
          checked={config.enabled}
          onChange={(enabled) => save({ enabled })}
          disabled={loading || saving}
          ariaLabel={t("enableDegradation")}
        />
      </div>

      {/* Stats */}
      {config.stats && config.stats.detected > 0 && (
        <div className="flex items-center gap-4 p-3 rounded-lg bg-info/5 border border-info/20 mb-4">
          <div className="flex items-center gap-2">
            <Icon name="analytics" size={16} className="text-info" />
            <span className="text-xs text-text-muted">{t("tasksDetected")}:</span>
            <span className="text-sm font-mono font-semibold text-info">
              {config.stats.detected}
            </span>
          </div>
        </div>
      )}

      {config.enabled && (
        <>
          {/* Degradation Map */}
          <div className="mb-4">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
              {t("degradationMap")}
            </p>

            {/* Add new mapping */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1">
                <ModelSelectField
                  value={newFrom}
                  onChange={setNewFrom}
                  placeholder={t("premiumModel")}
                />
              </div>
              <span className="text-text-muted text-lg">→</span>
              <div className="flex-1">
                <ModelSelectField value={newTo} onChange={setNewTo} placeholder={t("cheapModel")} />
              </div>
              <Button
                variant="outline"
                onClick={addMapping}
                disabled={saving || !newFrom.trim() || !newTo.trim()}
              >
                {t("add")}
              </Button>
            </div>

            {/* Existing mappings */}
            {mapEntries.length > 0 && (
              <div className="rounded-lg border border-border/30 divide-y divide-border/20 max-h-48 overflow-y-auto">
                {mapEntries.map(([from, to]) => (
                  <div key={from} className="flex items-center gap-3 px-4 py-2">
                    <code className="text-xs text-text-muted flex-1 truncate">{from}</code>
                    <Icon name="arrow_forward" size={14} className="text-text-muted" />
                    <code className="text-xs text-text-main flex-1 truncate">{to}</code>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      icon="close"
                      onClick={() => removeMapping(from)}
                      disabled={saving}
                      aria-label={t("remove")}
                      title={t("remove")}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detection Patterns */}
          <Collapsible
            variant="inline"
            title={`${t("detectionPatterns")} (${config.detectionPatterns?.length || 0})`}
          >
            {/* Add new pattern */}
            <div className="flex items-center gap-2 mb-3">
              <Input
                type="text"
                aria-label={t("newPattern")}
                placeholder={t("newPattern")}
                value={newPattern}
                onChange={(e) => setNewPattern(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={addPattern}
                disabled={saving || !newPattern.trim()}
              >
                {t("add")}
              </Button>
            </div>

            {/* Existing patterns */}
            <div className="flex flex-wrap gap-2">
              {(config.detectionPatterns || []).map((pattern, idx) => (
                <Badge key={idx} variant="info" className="gap-1 pe-0.5">
                  {pattern}
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    icon="close"
                    onClick={() => removePattern(idx)}
                    disabled={saving}
                    className="size-5 min-h-5"
                    aria-label={`${t("remove")} ${pattern}`}
                  />
                </Badge>
              ))}
            </div>
          </Collapsible>
        </>
      )}
    </Card>
  );
}
