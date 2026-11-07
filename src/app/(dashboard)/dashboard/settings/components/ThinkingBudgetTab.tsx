"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@omniroute/ui-kit/radio-group";
import { Slider } from "@omniroute/ui-kit/slider";
import { Card } from "@/shared/components";
import Icon from "@/shared/components/Icon";

// Dedicated i18n keys — do NOT reuse settings.auto / autoDesc (those are routing
// "Auto Combo" strings and previously made Thinking Budget look like a routing mode).
const MODES = [
  {
    value: "passthrough",
    labelKey: "thinkingModePassthrough",
    descKey: "thinkingModePassthroughDesc",
    icon: "arrow_forward",
  },
  {
    value: "auto",
    labelKey: "thinkingModeAuto",
    descKey: "thinkingModeAutoDesc",
    icon: "auto_awesome",
  },
  {
    value: "custom",
    labelKey: "thinkingModeCustom",
    descKey: "thinkingModeCustomDesc",
    icon: "tune",
  },
  {
    value: "adaptive",
    labelKey: "thinkingModeAdaptive",
    descKey: "thinkingModeAdaptiveDesc",
    icon: "trending_up",
  },
];

const EFFORTS = [
  { value: "none", labelKey: "effortNone" },
  { value: "low", labelKey: "effortLow" },
  { value: "medium", labelKey: "effortMedium" },
  { value: "high", labelKey: "effortHigh" },
];

export default function ThinkingBudgetTab() {
  const [config, setConfig] = useState({
    mode: "passthrough",
    customBudget: 10240,
    effortLevel: "medium",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const t = useTranslations("settings");

  useEffect(() => {
    fetch("/api/settings/thinking-budget")
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
      const res = await fetch("/api/settings/thinking-budget", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
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

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
          <Icon name="psychology" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{t("thinkingBudgetTitle")}</h3>
          <p className="text-sm text-text-muted">{t("thinkingBudgetDesc")}</p>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            {t("thinkingBudgetIndependenceHint")}
          </p>
        </div>
        {status === "saved" && (
          <span className="ml-auto text-xs font-medium text-success flex items-center gap-1">
            <Icon name="check_circle" size={14} /> {t("saved")}
          </span>
        )}
      </div>

      {/* Mode selector */}
      <RadioGroup
        aria-label={t("thinkingBudgetTitle")}
        orientation="horizontal"
        value={config.mode}
        onValueChange={(next) => save({ mode: next })}
        disabled={loading || saving}
        className="mb-5"
      >
        {MODES.map((m) => (
          <RadioGroupItem
            key={m.value}
            card
            value={m.value}
            label={
              <span className="flex items-center gap-2">
                <Icon name={m.icon} size={18} />
                {t(m.labelKey)}
              </span>
            }
            description={t(m.descKey)}
          />
        ))}
      </RadioGroup>

      {/* Custom budget slider */}
      {config.mode === "custom" && (
        <div className="p-4 rounded-lg bg-surface/30 border border-border/30 mb-4">
          <Slider
            label={t("tokenBudget")}
            min={0}
            max={131072}
            step={1024}
            value={config.customBudget}
            onValueChange={(next) => save({ customBudget: next })}
            formatValue={(value) => `${value.toLocaleString()} ${t("tokens")}`}
          />
        </div>
      )}

      {/* Adaptive effort level */}
      {config.mode === "adaptive" && (
        <div className="p-4 rounded-lg bg-surface/30 border border-border/30">
          <p className="text-sm font-medium mb-3">{t("baseEffortLevel")}</p>
          <p className="text-xs text-text-muted mb-3">{t("adaptiveHint")}</p>
          <RadioGroup
            aria-label={t("baseEffortLevel")}
            orientation="horizontal"
            value={config.effortLevel}
            onValueChange={(next) => save({ effortLevel: next })}
            disabled={loading || saving}
          >
            {EFFORTS.map((e) => (
              <RadioGroupItem key={e.value} card value={e.value} label={t(e.labelKey)} />
            ))}
          </RadioGroup>
        </div>
      )}
    </Card>
  );
}
