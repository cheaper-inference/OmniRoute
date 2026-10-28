"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils/cn";
import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";
import EmptyState from "./EmptyState";
import Icon from "./Icon";
import Input from "./Input";
import { Skeleton } from "./Loading";
import Select from "./Select";
import Toggle from "./Toggle";
import { matchesOnlyPaidModels } from "@/shared/utils/freeModels";

export interface ModelMapping {
  id: string;
  pattern: string;
  comboId: string;
  comboName?: string;
  priority: number;
  enabled: boolean;
  description: string;
}

interface Combo {
  id: string;
  name: string;
}

export default function ModelRoutingSection({ combos: externalCombos }: { combos?: Combo[] } = {}) {
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");
  const [mappings, setMappings] = useState<ModelMapping[]>([]);
  const [internalCombos, setInternalCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hidePaidModels, setHidePaidModels] = useState(false);
  const combos = externalCombos || internalCombos;

  // Form state
  const [pattern, setPattern] = useState("");
  const [comboId, setComboId] = useState("");
  const [priority, setPriority] = useState(0);
  const [description, setDescription] = useState("");

  const loadMappings = async () => {
    try {
      const res = await fetch("/api/model-combo-mappings");
      if (res.ok) {
        const data = await res.json();
        return data.mappings || [];
      }
    } catch {}
    return [];
  };

  useEffect(() => {
    let cancelled = false;
    loadMappings().then((data) => {
      if (!cancelled) {
        setMappings(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // #6540: read hidePaidModels once so the pattern field can warn (fail-open)
  // when it resolves only to paid model families.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data) setHidePaidModels(data.hidePaidModels === true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (externalCombos !== undefined) return;
    let cancelled = false;
    fetch("/api/combos")
      .then((res) => (res.ok ? res.json() : { combos: [] }))
      .then((data) => {
        if (!cancelled) {
          setInternalCombos(Array.isArray(data?.combos) ? data.combos : []);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [externalCombos]);

  const refetchMappings = async () => {
    const data = await loadMappings();
    setMappings(data);
  };

  const resetForm = () => {
    setPattern("");
    setComboId("");
    setPriority(0);
    setDescription("");
    setAdding(false);
    setEditingId(null);
  };

  const handleSave = async () => {
    if (!pattern.trim() || !comboId) return;

    try {
      if (editingId) {
        const res = await fetch(`/api/model-combo-mappings/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pattern: pattern.trim(), comboId, priority, description }),
        });
        if (res.ok) await refetchMappings();
      } else {
        const res = await fetch("/api/model-combo-mappings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pattern: pattern.trim(), comboId, priority, description }),
        });
        if (res.ok) await refetchMappings();
      }
    } catch {}
    resetForm();
  };

  const handleEdit = (m: ModelMapping) => {
    setPattern(m.pattern);
    setComboId(m.comboId);
    setPriority(m.priority);
    setDescription(m.description);
    setEditingId(m.id);
    setAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteRoutingRule"))) return;
    try {
      await fetch(`/api/model-combo-mappings/${id}`, { method: "DELETE" });
      setMappings((prev) => prev.filter((m) => m.id !== id));
    } catch {}
  };

  const handleToggle = async (m: ModelMapping) => {
    try {
      const res = await fetch(`/api/model-combo-mappings/${m.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !m.enabled }),
      });
      if (res.ok) {
        setMappings((prev) => prev.map((x) => (x.id === m.id ? { ...x, enabled: !x.enabled } : x)));
      }
    } catch {}
  };

  // #6540: fail-open heuristic — only warn/block when the pattern resolves
  // to at least one model AND every match is paid. A pattern matching a
  // mix of free and paid models (or nothing recognizable) is left alone.
  const patternIsPaidOnly = hidePaidModels && matchesOnlyPaidModels(pattern);

  return (
    <Card
      title={t("modelRoutingTitle")}
      subtitle={t("modelRoutingDesc")}
      icon="route"
      action={
        !adding && (
          <Button variant="secondary" size="sm" icon="add" onClick={() => setAdding(true)}>
            {t("addRule")}
          </Button>
        )
      }
    >
      {/* Inline form */}
      {adding && (
        <div className="mt-3 rounded-lg border border-primary/20 bg-primary/[0.04] p-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Input
                label={t("pattern")}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="claude-sonnet*"
                hint={t("patternHint")}
              />
              {patternIsPaidOnly && (
                <p className="mt-1 text-xs text-warning" role="status">
                  {t("paidModelPatternWarning") ||
                    "This pattern only matches paid models — enable paid models or adjust the pattern."}
                </p>
              )}
            </div>
            <Select
              label={t("routeToCombo")}
              value={comboId}
              onChange={(e) => setComboId(e.target.value)}
            >
              <option value="">{t("selectCombo")}</option>
              {combos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Input
              type="number"
              label={t("priority")}
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              hint={t("priorityHint")}
            />
            <Input
              label={t("description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("modelRoutingDescriptionPlaceholder")}
            />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!pattern.trim() || !comboId || patternIsPaidOnly}
            >
              {editingId ? t("update") : t("save")}
            </Button>
            <Button variant="ghost" size="sm" onClick={resetForm}>
              {t("cancel")}
            </Button>
          </div>
        </div>
      )}

      {/* Mappings list */}
      {loading ? (
        <div className="mt-3 flex flex-col gap-1.5" aria-busy="true">
          <span className="ci-sr-only">{t("loading")}</span>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : mappings.length === 0 ? (
        <EmptyState
          className="mt-3"
          icon="route"
          title={t("noRoutingRules")}
          description={t("routingRuleHint")}
        />
      ) : (
        <div className="mt-3 flex flex-col gap-1.5">
          {mappings.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex items-center justify-between rounded-lg border px-3 py-2 transition-colors",
                m.enabled ? "border-border bg-surface" : "border-border/60 bg-bg-subtle opacity-50"
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <code className="shrink-0 rounded bg-warning/10 px-1.5 py-0.5 font-mono text-xs text-warning">
                  {m.pattern}
                </code>
                <span className="text-[10px] text-text-muted" aria-hidden="true">
                  →
                </span>
                <span className="truncate text-xs font-medium text-primary">
                  {m.comboName || m.comboId.slice(0, 8)}
                </span>
                {m.description && (
                  <span className="hidden truncate text-[10px] text-text-muted sm:inline">
                    {m.description}
                  </span>
                )}
                <Badge size="sm" className="shrink-0">
                  P{m.priority}
                </Badge>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {/* A switch with a static name ("Enabled") — the on/off state is its checked
                    state, not part of the label (an action label + aria-pressed read as
                    "Disable, pressed"). */}
                <Toggle
                  size="sm"
                  checked={m.enabled}
                  onChange={() => handleToggle(m)}
                  ariaLabel={t("enabled")}
                  title={m.enabled ? t("disable") : t("enable")}
                  className="mx-1"
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleEdit(m)}
                  title={tCommon("edit")}
                  aria-label={tCommon("edit")}
                >
                  <Icon name="edit" size={14} className="text-text-muted" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDelete(m.id)}
                  title={tCommon("delete")}
                  aria-label={tCommon("delete")}
                  className="hover:bg-error/10"
                >
                  <Icon name="delete" size={14} className="text-error" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
