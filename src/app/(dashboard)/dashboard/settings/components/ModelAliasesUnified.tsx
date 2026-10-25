"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Collapsible, Input, SegmentedControl } from "@/shared/components";
import Icon from "@/shared/components/Icon";

interface WildcardAlias {
  pattern: string;
  target: string;
}

type AliasMode = "exact" | "wildcard";

function translateOrFallback(
  t: ReturnType<typeof useTranslations>,
  key: string,
  fallback: string
): string {
  return typeof t.has === "function" && t.has(key) ? t(key) : fallback;
}

export default function ModelAliasesUnified() {
  const [wildcardAliases, setWildcardAliases] = useState<WildcardAlias[]>([]);
  const [builtInAliases, setBuiltInAliases] = useState<Record<string, string>>({});
  const [customAliases, setCustomAliases] = useState<Record<string, string>>({});
  const [aliasMode, setAliasMode] = useState<AliasMode>("exact");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: "",
  });
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const t = useTranslations("settings");
  const builtInEntries = Object.entries(builtInAliases);
  const customEntries = Object.entries(customAliases);

  useEffect(() => {
    const loadAliases = async () => {
      try {
        const [settingsRes, aliasesRes] = await Promise.all([
          fetch("/api/settings"),
          fetch("/api/settings/model-aliases"),
        ]);
        const settingsData = settingsRes.ok ? await settingsRes.json() : {};
        const aliasesData = aliasesRes.ok ? await aliasesRes.json() : {};
        setWildcardAliases(settingsData.wildcardAliases || []);
        setBuiltInAliases(aliasesData.builtIn || {});
        setCustomAliases(aliasesData.custom || {});
      } catch (error) {
        console.error("Failed to load model aliases:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAliases();
  }, []);

  const showStatus = (type: "success" | "error", message: string) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: "", message: "" }), 2500);
  };

  const addExactAlias = async () => {
    if (!fromValue.trim() || !toValue.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/settings/model-aliases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: fromValue.trim(), to: toValue.trim() }),
      });
      if (!res.ok) throw new Error("Failed to save exact alias");
      const data = await res.json();
      setCustomAliases(data.custom || {});
      setFromValue("");
      setToValue("");
      showStatus("success", translateOrFallback(t, "saved", "Saved"));
    } catch (error) {
      console.error("Failed to save exact alias:", error);
      showStatus("error", translateOrFallback(t, "errorOccurred", "An error occurred"));
    } finally {
      setSaving(false);
    }
  };

  const removeExactAlias = async (from: string) => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings/model-aliases", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from }),
      });
      if (!res.ok) throw new Error("Failed to remove exact alias");
      const data = await res.json();
      setCustomAliases(data.custom || {});
      showStatus("success", translateOrFallback(t, "saved", "Saved"));
    } catch (error) {
      console.error("Failed to remove exact alias:", error);
      showStatus("error", translateOrFallback(t, "errorOccurred", "An error occurred"));
    } finally {
      setSaving(false);
    }
  };

  const addWildcardAlias = async () => {
    if (!fromValue.trim() || !toValue.trim()) return;
    setSaving(true);
    try {
      const settingsRes = await fetch("/api/settings", { cache: "no-store" });
      if (!settingsRes.ok) throw new Error("Failed to load current settings");
      const settingsData = await settingsRes.json();
      const revision =
        typeof settingsData.settingsRevision === "number" ? settingsData.settingsRevision : 0;
      const currentWildcards = Array.isArray(settingsData.wildcardAliases)
        ? settingsData.wildcardAliases
        : wildcardAliases;
      const updated = [...currentWildcards, { pattern: fromValue.trim(), target: toValue.trim() }];
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wildcardAliases: updated, expectedRevision: revision }),
      });
      if (res.status === 409) throw new Error("Settings conflict — refresh and retry");
      if (!res.ok) throw new Error("Failed to save wildcard alias");
      setWildcardAliases(updated);
      setFromValue("");
      setToValue("");
      showStatus("success", translateOrFallback(t, "saved", "Saved"));
    } catch (error) {
      console.error("Failed to save wildcard alias:", error);
      showStatus("error", translateOrFallback(t, "errorOccurred", "An error occurred"));
    } finally {
      setSaving(false);
    }
  };

  const removeWildcardAlias = async (index: number) => {
    setSaving(true);
    try {
      const settingsRes = await fetch("/api/settings", { cache: "no-store" });
      if (!settingsRes.ok) throw new Error("Failed to load current settings");
      const settingsData = await settingsRes.json();
      const revision =
        typeof settingsData.settingsRevision === "number" ? settingsData.settingsRevision : 0;
      const currentWildcards = Array.isArray(settingsData.wildcardAliases)
        ? settingsData.wildcardAliases
        : wildcardAliases;
      const updated = currentWildcards.filter((_, currentIndex) => currentIndex !== index);
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wildcardAliases: updated, expectedRevision: revision }),
      });
      if (res.status === 409) throw new Error("Settings conflict — refresh and retry");
      if (!res.ok) throw new Error("Failed to remove wildcard alias");
      setWildcardAliases(updated);
      showStatus("success", translateOrFallback(t, "saved", "Saved"));
    } catch (error) {
      console.error("Failed to remove wildcard alias:", error);
      showStatus("error", translateOrFallback(t, "errorOccurred", "An error occurred"));
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = async () => {
    if (aliasMode === "wildcard") {
      await addWildcardAlias();
      return;
    }
    await addExactAlias();
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-bg-subtle text-text-muted">
          <Icon name="swap_horiz" size={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">
            {translateOrFallback(t, "modelAliasesTitle", "Model Aliases")}
          </h3>
          <p className="text-sm text-text-muted">
            {translateOrFallback(
              t,
              "modelAliasesDesc",
              "Remap model names using exact matches or wildcard patterns."
            )}
          </p>
        </div>
        {status.message && (
          <span
            className={`text-xs font-medium flex items-center gap-1 ${
              status.type === "success" ? "text-success" : "text-error"
            }`}
          >
            <Icon name={status.type === "success" ? "check_circle" : "error"} size={14} />
            {status.message}
          </span>
        )}
      </div>

      <div className="mb-5 rounded-lg border border-border/30 bg-surface/20 p-4">
        <SegmentedControl
          className="mb-3"
          size="sm"
          value={aliasMode}
          onChange={(value) => setAliasMode(value as AliasMode)}
          options={[
            {
              value: "exact",
              label: translateOrFallback(t, "exactMatchMode", "Exact Match"),
            },
            {
              value: "wildcard",
              label: translateOrFallback(t, "wildcardPatternMode", "Wildcard Pattern"),
            },
          ]}
        />

        <p className="text-xs text-text-muted mb-3">
          {aliasMode === "exact"
            ? translateOrFallback(
                t,
                "exactMatchModeDesc",
                "Use exact aliases for deprecated or renamed model IDs."
              )
            : translateOrFallback(
                t,
                "wildcardPatternModeDesc",
                "Use wildcard aliases with * and ? when a family of models should map to one target."
              )}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto] gap-2 items-end">
          <Input
            label={aliasMode === "exact" ? t("deprecatedModelId") : t("pattern")}
            placeholder={
              aliasMode === "exact" ? t("deprecatedModelId") : t("aliasPatternPlaceholder")
            }
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void handleAdd()}
            disabled={loading || saving}
          />
          <div className="hidden md:flex items-center justify-center pb-2 text-text-muted">
            <Icon name="arrow_forward" size={16} />
          </div>
          <Input
            label={aliasMode === "exact" ? t("newModelId") : t("targetModel")}
            placeholder={aliasMode === "exact" ? t("newModelId") : t("aliasTargetPlaceholder")}
            value={toValue}
            onChange={(e) => setToValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && void handleAdd()}
            disabled={loading || saving}
          />
          <Button
            variant="primary"
            size="sm"
            onClick={() => void handleAdd()}
            disabled={loading || saving || !fromValue.trim() || !toValue.trim()}
            className="md:mb-[2px]"
          >
            {t("add")}
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          {translateOrFallback(t, "customAliases", "Custom Aliases")}
        </p>
        <div className="rounded-lg border border-border/30 divide-y divide-border/20">
          {customEntries.length === 0 ? (
            <div className="px-4 py-3 text-sm text-text-muted">
              {translateOrFallback(
                t,
                "noExactAliasesConfigured",
                "No exact-match aliases configured."
              )}
            </div>
          ) : (
            customEntries.map(([from, to]) => (
              <div key={from} className="flex items-center gap-3 px-4 py-2.5">
                <code className="text-xs text-text-muted flex-1 truncate">{from}</code>
                <Icon name="arrow_forward" size={14} className="text-text-muted" />
                <code className="text-xs text-text-main flex-1 truncate">{to}</code>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  icon="close"
                  onClick={() => void removeExactAlias(from)}
                  disabled={saving}
                  aria-label={t("remove")}
                  title={t("remove")}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-2">
          {translateOrFallback(t, "wildcardRulesTitle", "Wildcard Rules")}
        </p>
        <div className="rounded-lg border border-border/30 divide-y divide-border/20">
          {wildcardAliases.length === 0 ? (
            <div className="px-4 py-3 text-sm text-text-muted">
              {translateOrFallback(
                t,
                "noWildcardAliasesConfigured",
                "No wildcard aliases configured."
              )}
            </div>
          ) : (
            wildcardAliases.map((alias, index) => (
              <div
                key={`${alias.pattern}-${alias.target}-${index}`}
                className="flex items-center gap-3 px-4 py-2.5"
              >
                <code className="text-xs text-text-muted flex-1 truncate">{alias.pattern}</code>
                <Icon name="arrow_forward" size={14} className="text-text-muted" />
                <code className="text-xs text-text-main flex-1 truncate">{alias.target}</code>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  icon="close"
                  onClick={() => void removeWildcardAlias(index)}
                  disabled={saving}
                  aria-label={t("remove")}
                  title={t("remove")}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <Collapsible
        variant="inline"
        title={`${translateOrFallback(t, "builtInAliases", "Built-in Aliases")} (${builtInEntries.length})`}
      >
        <div className="rounded-lg border border-border/30 divide-y divide-border/20 max-h-60 overflow-y-auto">
          {builtInEntries.map(([from, to]) => (
            <div key={from} className="flex items-center gap-3 px-4 py-2 opacity-60">
              <code className="text-xs text-text-muted flex-1 truncate">{from}</code>
              <Icon name="arrow_forward" size={14} className="text-text-muted" />
              <code className="text-xs text-text-main flex-1 truncate">{to}</code>
              <Icon name="lock" size={14} className="text-text-muted" />
            </div>
          ))}
        </div>
      </Collapsible>
    </Card>
  );
}
