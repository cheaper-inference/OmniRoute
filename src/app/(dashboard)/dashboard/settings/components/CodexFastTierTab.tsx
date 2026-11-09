"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Checkbox, CheckboxGroup } from "@omniroute/ui-kit/checkbox";
import { Button, Card, Toggle, Select } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import {
  CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS,
  resolveCodexGlobalFastServiceTier,
} from "@/lib/providers/codexFastTier";

type TierValue = "default" | "priority" | "flex";

export default function CodexFastTierTab() {
  const [enabled, setEnabled] = useState(false);
  const [tier, setTier] = useState<TierValue>("priority");
  const [supportedModels, setSupportedModels] = useState<string[]>([
    ...CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS,
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"" | "saved" | "error">("");
  const [modelsOpen, setModelsOpen] = useState(false);
  const t = useTranslations("settings");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const resolved = resolveCodexGlobalFastServiceTier(data);
        setEnabled(resolved.enabled);
        setTier(resolved.tier);
        setSupportedModels([...resolved.supportedModels]);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const allCatalogModels = useMemo(() => {
    // Union of the catalog and any custom models the user has stored, so we don't
    // silently drop a slug the user added on a future Codex release.
    const set = new Set<string>([...CODEX_FAST_TIER_DEFAULT_SUPPORTED_MODELS, ...supportedModels]);
    return Array.from(set);
  }, [supportedModels]);

  const save = async (next: {
    enabled?: boolean;
    tier?: TierValue;
    supportedModels?: string[];
  }) => {
    if (saving || loading) return;
    setSaving(true);
    setStatus("");
    const previous = { enabled, tier, supportedModels };
    const merged = {
      enabled: next.enabled ?? enabled,
      tier: next.tier ?? tier,
      supportedModels: next.supportedModels ?? supportedModels,
    };
    setEnabled(merged.enabled);
    setTier(merged.tier);
    setSupportedModels(merged.supportedModels);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codexServiceTier: {
            enabled: merged.enabled,
            tier: merged.tier,
            supportedModels: merged.supportedModels,
          },
        }),
      });
      if (res.ok) {
        setStatus("saved");
        setTimeout(() => setStatus(""), 2000);
      } else {
        setEnabled(previous.enabled);
        setTier(previous.tier);
        setSupportedModels(previous.supportedModels);
        setStatus("error");
      }
    } catch {
      setEnabled(previous.enabled);
      setTier(previous.tier);
      setSupportedModels(previous.supportedModels);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const toggleModel = (slug: string, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...supportedModels, slug]))
      : supportedModels.filter((m) => m !== slug);
    save({ supportedModels: next });
  };

  return (
    <Card
      icon="bolt"
      title={t("codexFastTierTitle")}
      subtitle={t("codexFastTierDesc")}
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
              <Icon name="error" size={14} /> {t("codexFastTierSaveError")}
            </span>
          )}
          <Toggle
            checked={enabled}
            onChange={(value) => save({ enabled: value })}
            disabled={loading || saving}
            ariaLabel={t("codexFastTierTitle")}
          />
        </div>
      }
    >
      {enabled && (
        <div className="flex flex-col gap-4 border-t border-border pt-4">
          <Select
            label={t("codexFastTierTierLabel")}
            value={tier}
            disabled={loading || saving}
            onChange={(e) => save({ tier: e.target.value as TierValue })}
            options={[
              { value: "priority", label: t("codexFastTierTierPriority") },
              { value: "flex", label: t("codexFastTierTierFlex") },
              { value: "default", label: t("codexFastTierTierDefault") },
            ]}
          />

          <div>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 px-1"
              onClick={() => setModelsOpen((open) => !open)}
              aria-expanded={modelsOpen}
            >
              <Icon name={modelsOpen ? "expand_less" : "expand_more"} size={18} />
              {t("codexFastTierModelsLabel")}
              <span className="ml-1 text-xs text-text-muted">({supportedModels.length})</span>
            </Button>
            {modelsOpen && (
              <CheckboxGroup description={t("codexFastTierModelsHint")} className="mt-3 pl-6">
                {allCatalogModels.map((slug) => (
                  <Checkbox
                    key={slug}
                    checked={supportedModels.includes(slug)}
                    disabled={loading || saving}
                    onChange={(e) => toggleModel(slug, e.target.checked)}
                    aria-label={t("codexFastTierModelCheckbox", { model: slug })}
                    label={<span className="font-mono text-xs">{slug}</span>}
                  />
                ))}
              </CheckboxGroup>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-text-muted flex items-start gap-1.5 leading-relaxed">
        <Icon name="info" size={14} className="mt-0.5" />
        <span>{t("codexFastTierHint")}</span>
      </p>
    </Card>
  );
}
