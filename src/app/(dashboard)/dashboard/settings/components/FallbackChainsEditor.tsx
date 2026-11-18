"use client";

/**
 * FallbackChainsEditor — Batch D
 *
 * Editor for model fallback chains. Each chain maps a model name
 * to a prioritized list of providers that can serve it.
 * API: /api/fallback/chains
 */

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Badge, Card, Button, Input, EmptyState, Skeleton } from "@/shared/components";
import Icon from "@/shared/components/Icon";
import { useNotificationStore } from "@/store/notificationStore";
import { useConfirmDialog } from "@/shared/hooks/useConfirmDialog";

// Chain position colours are data series (1st, 2nd, … provider), so each chip is a Badge in a
// kit chart tone (the series ink on its tint, which keeps the label readable), cycling through
// the first five steps of the palette.
const CHAIN_TONES = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"] as const;
function chainTone(index: number) {
  return CHAIN_TONES[index % CHAIN_TONES.length];
}

async function fetchChainsData() {
  try {
    const res = await fetch("/api/fallback/chains");
    if (res.ok) {
      const data = await res.json();
      return data.chains || data || {};
    }
  } catch {
    // silent
  }
  return null;
}

export default function FallbackChainsEditor() {
  const [chains, setChains] = useState({});
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newModel, setNewModel] = useState("");
  const [newProviders, setNewProviders] = useState("");
  const [saving, setSaving] = useState(false);
  const notify = useNotificationStore();
  const t = useTranslations("settings");
  const tc = useTranslations("common");
  const { requestConfirm, confirmDialog } = useConfirmDialog();

  const applyChains = useCallback((data) => {
    if (data) setChains(data);
    setLoading(false);
  }, []);

  const fetchChains = useCallback(async () => {
    applyChains(await fetchChainsData());
  }, [applyChains]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const data = await fetchChainsData();
      if (!cancelled) applyChains(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [applyChains]);

  const handleCreate = async () => {
    if (!newModel.trim() || !newProviders.trim()) {
      notify.warning(t("fillModelAndProviders"));
      return;
    }

    const providers = newProviders
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((provider, i) => ({ provider, priority: i + 1, enabled: true }));

    if (providers.length === 0) {
      notify.warning(t("addAtLeastOneProvider"));
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/fallback/chains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: newModel.trim(), chain: providers }),
      });
      if (res.ok) {
        notify.success(t("chainCreated", { model: newModel.trim() }));
        setNewModel("");
        setNewProviders("");
        setShowCreate(false);
        await fetchChains();
      } else {
        notify.error(t("failedCreateChain"));
      }
    } catch {
      notify.error(t("failedCreateChain"));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (model) => {
    if (!(await requestConfirm(t("deleteChainConfirm", { model })))) return;
    try {
      const res = await fetch("/api/fallback/chains", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model }),
      });
      if (res.ok) {
        notify.success(t("chainDeleted", { model }));
        await fetchChains();
      } else {
        notify.error(t("failedDeleteChain"));
      }
    } catch {
      notify.error(t("failedDeleteChain"));
    }
  };

  if (loading) {
    return (
      <Card icon="timeline" title={t("fallbackChainsTitle")}>
        <p className="sr-only" role="status">
          {t("loadingFallbackChains")}
        </p>
        <Skeleton className="h-16 w-full" />
      </Card>
    );
  }

  const chainEntries = Object.entries(chains);

  return (
    <Card
      icon="timeline"
      title={t("fallbackChainsTitle")}
      subtitle={t("fallbackChainsDesc")}
      action={
        <Button
          size="sm"
          variant={showCreate ? "outline" : "primary"}
          aria-expanded={showCreate}
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? tc("cancel") : t("addChain")}
        </Button>
      }
    >
      {/* Create Form */}
      {showCreate && (
        <Card.Section className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Input
              label={t("modelName")}
              placeholder={t("modelNamePlaceholder")}
              value={newModel}
              onChange={(e) => setNewModel(e.target.value)}
            />
            <Input
              label={t("providersCommaSeparated")}
              placeholder={t("providersCommaSeparatedPlaceholder")}
              value={newProviders}
              onChange={(e) => setNewProviders(e.target.value)}
            />
          </div>
          <Button variant="primary" size="sm" onClick={handleCreate} loading={saving}>
            {t("createChain")}
          </Button>
        </Card.Section>
      )}

      {/* Chains List */}
      <div>
        {chainEntries.length === 0 ? (
          <EmptyState
            icon="timeline"
            title={t("noFallbackChains")}
            description={t("noFallbackChainsDesc")}
          />
        ) : (
          <div className="flex flex-col gap-2">
            {chainEntries.map(([model, chain]) => (
              <Card.Section key={model} className="flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
                  <span className="font-mono text-sm text-text-main truncate max-w-[200px]">
                    {model}
                  </span>
                  <Icon name="arrow_forward" size={14} className="text-text-muted" />
                  <div className="flex gap-1.5 flex-wrap">
                    {(Array.isArray(chain) ? chain : []).map((entry, i) => (
                      <Badge key={`${entry.provider}-${i}`} size="sm" tone={chainTone(i)} dot>
                        {i + 1}. {entry.provider}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDelete(model)}
                  title={t("deleteChain")}
                  aria-label={`${t("deleteChain")} ${model}`}
                >
                  <Icon name="close" size={16} />
                </Button>
              </Card.Section>
            ))}
          </div>
        )}
      </div>
      {confirmDialog}
    </Card>
  );
}
