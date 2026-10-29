"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Field } from "@omniroute/ui-kit/field";
import { Card, Textarea, Toggle } from "@/shared/components";
import Icon from "@/shared/components/Icon";

export default function SystemPromptTab() {
  const [config, setConfig] = useState({ enabled: false, prefixPrompt: "", suffixPrompt: "" });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const configRef = useRef(config);
  const t = useTranslations("settings");

  useEffect(() => {
    fetch("/api/settings/system-prompt")
      .then((res) => res.json())
      .then((data) => {
        setConfig({
          enabled: data?.enabled ?? false,
          prefixPrompt: data?.prefixPrompt ?? "",
          suffixPrompt: data?.suffixPrompt ?? "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async (updates) => {
    const newConfig = { ...configRef.current, ...updates };
    setConfig(newConfig);
    configRef.current = newConfig;
    setStatus("");
    try {
      const res = await fetch("/api/settings/system-prompt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      }
    } catch {
      setStatus("error");
    }
  };

  const handleFieldChange = (field, text) => {
    const updated = { ...configRef.current, [field]: text };
    setConfig(updated);
    configRef.current = updated;
    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        save({ [field]: text });
      }, 800)
    );
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
          <Icon name="edit_note" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{t("globalSystemPrompt")}</h3>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-xs font-medium text-success flex items-center gap-1">
              <Icon name="check_circle" size={14} /> {t("saved")}
            </span>
          )}
          <Toggle
            checked={config.enabled}
            onChange={() => save({ enabled: !config.enabled })}
            disabled={loading}
            ariaLabel={t("globalSystemPrompt")}
          />
        </div>
      </div>

      {config.enabled && (
        <div className="flex flex-col gap-5">
          {/* Before Prompt — injected BEFORE agent/provider instructions */}
          <Field
            htmlFor="system-prompt-before"
            label={
              <span className="flex items-center gap-1.5">
                <Icon name="vertical_align_top" size={16} />
                {t("beforePromptLabel")}
              </span>
            }
            hint={t("beforePromptDesc")}
          >
            <div className="relative">
              <Textarea
                id="system-prompt-before"
                value={config.prefixPrompt}
                onChange={(e) => handleFieldChange("prefixPrompt", e.target.value)}
                placeholder={t("beforePromptPlaceholder")}
                rows={9}
                className="min-h-[220px] resize-y"
                disabled={loading}
              />
              <div className="absolute bottom-2 right-3 text-xs text-text-muted tabular-nums">
                {t("chars", { count: config.prefixPrompt.length })}
              </div>
            </div>
          </Field>

          {/* After Prompt — injected AFTER agent/provider instructions */}
          <Field
            htmlFor="system-prompt-after"
            label={
              <span className="flex items-center gap-1.5">
                <Icon name="vertical_align_bottom" size={16} />
                {t("afterPromptLabel")}
              </span>
            }
            hint={t("afterPromptDesc")}
          >
            <div className="relative">
              <Textarea
                id="system-prompt-after"
                value={config.suffixPrompt}
                onChange={(e) => handleFieldChange("suffixPrompt", e.target.value)}
                placeholder={t("afterPromptPlaceholder")}
                rows={9}
                className="min-h-[220px] resize-y"
                disabled={loading}
              />
              <div className="absolute bottom-2 right-3 text-xs text-text-muted tabular-nums">
                {t("chars", { count: config.suffixPrompt.length })}
              </div>
            </div>
          </Field>
        </div>
      )}
    </Card>
  );
}
