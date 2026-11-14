"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Button, Checkbox, Input, Spinner } from "@/shared/components";
import { matchesSearch } from "@/shared/utils/turkishText";
import type { ProviderModelIntelligence } from "@/app/api/provider-intelligence/route";
import { providerText, type ProviderMessageTranslator } from "../providerCredentialText";

interface ModelIntelligencePanelProps {
  t: ProviderMessageTranslator;
  providerId: string;
  providerName: string;
  onClose: () => void;
}

type FetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: ProviderModelIntelligence[] };

function CloseButton({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <Button variant="ghost" size="icon-sm" icon="close" onClick={onClose} aria-label={label} />
  );
}

/** Frame shared by the loading and error states: title row plus a centred body. */
function StatusFrame({
  title,
  closeLabel,
  onClose,
  children,
}: {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-text-main">{title}</h3>
        <CloseButton label={closeLabel} onClose={onClose} />
      </div>
      {children}
    </div>
  );
}

function IntelligenceToolbar({
  t,
  title,
  closeLabel,
  freeOnly,
  search,
  onSelectAll,
  onFreeOnlyChange,
  onSearchChange,
  onClose,
}: {
  t: ProviderMessageTranslator;
  title: string;
  closeLabel: string;
  freeOnly: boolean;
  search: string;
  onSelectAll: () => void;
  onFreeOnlyChange: (value: boolean) => void;
  onSearchChange: (value: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border bg-sidebar/30 px-3 py-2">
      <h3 className="text-sm font-semibold text-text-main">{title}</h3>
      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" onClick={onSelectAll}>
          {providerText(t, "intelligenceSelectAll", "Select All")}
        </Button>
        <Checkbox
          checked={freeOnly}
          onChange={(e) => onFreeOnlyChange(e.target.checked)}
          label={providerText(t, "intelligenceFreeOnly", "Free-only")}
        />
        <Input
          size="sm"
          icon="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={providerText(t, "intelligenceSearch", "Search models…")}
          className="w-40"
        />
        <CloseButton label={closeLabel} onClose={onClose} />
      </div>
    </div>
  );
}

function IntelligenceRow({
  t,
  model,
  checked,
  onToggle,
}: {
  t: ProviderMessageTranslator;
  model: ProviderModelIntelligence;
  checked: boolean;
  onToggle: (modelId: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        onChange={() => onToggle(model.modelId)}
        aria-label={providerText(t, "intelligenceToggleModel", "Toggle {id}", {
          id: model.modelId,
        })}
        className="shrink-0"
      />
      <div
        className="flex flex-1 items-center gap-2 overflow-hidden"
        title={providerText(
          t,
          "intelligenceRowTitle",
          "{id} · Intelligence: {score} · ELO: {elo}",
          { id: model.modelId, score: model.score.toFixed(3), elo: model.eloRaw ?? "—" }
        )}
      >
        <span className="min-w-0 flex-1 truncate text-xs text-text-main">{model.modelId}</span>
        <div className="h-5 w-40 shrink-0 overflow-hidden rounded bg-bg-subtle">
          <div
            className="h-full rounded bg-primary transition-all"
            style={{
              width: `${Math.round(model.score * 100)}%`,
              opacity: model.score > 0 ? 1 : 0,
            }}
          />
        </div>
        <span className="w-12 shrink-0 text-right text-xs tabular-nums text-text-muted">
          {model.score > 0
            ? model.score.toFixed(3)
            : providerText(t, "intelligenceNoData", "No data")}
        </span>
      </div>
    </div>
  );
}

function filterVisibleModels(
  data: ProviderModelIntelligence[],
  selected: Set<string>,
  freeOnly: boolean,
  search: string
): ProviderModelIntelligence[] {
  return data.filter((m) => {
    if (!selected.has(m.modelId)) return false;
    if (freeOnly && !m.isFree) return false;
    if (!search) return true;
    return matchesSearch(m.modelId, search) || matchesSearch(m.modelName, search);
  });
}

/** Fetches the per-model scores and owns the "selected for comparison" set. */
function useProviderIntelligence(providerId: string) {
  const [fetchState, setFetchState] = useState<FetchState>({ status: "loading" });
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    setFetchState({ status: "loading" });
    try {
      const res = await fetch(
        `/api/provider-intelligence?provider=${encodeURIComponent(providerId)}`
      );
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const payload: ProviderModelIntelligence[] = await res.json();
      setFetchState({ status: "success", data: payload });
      setSelected(new Set(payload.map((m) => m.modelId)));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setFetchState({ status: "error", message });
    }
  }, [providerId]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await fetchData();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchData]);

  const data = useMemo(
    () => (fetchState.status === "success" ? fetchState.data : []),
    [fetchState]
  );

  const toggleModel = (modelId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(modelId)) next.delete(modelId);
      else next.add(modelId);
      return next;
    });
  };

  return {
    fetchState,
    data,
    selected,
    refetch: fetchData,
    toggleModel,
    selectAll: () => setSelected(new Set(data.map((m) => m.modelId))),
  };
}

function IntelligenceChart({
  t,
  data,
  visibleModels,
  selected,
  onToggle,
}: {
  t: ProviderMessageTranslator;
  data: ProviderModelIntelligence[];
  visibleModels: ProviderModelIntelligence[];
  selected: Set<string>;
  onToggle: (modelId: string) => void;
}) {
  if (visibleModels.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-text-muted">
        {data.length === 0
          ? providerText(
              t,
              "intelligenceEmpty",
              "No intelligence scores available for this provider."
            )
          : providerText(t, "intelligenceNoMatch", "No models match the active filters.")}
      </p>
    );
  }
  return (
    <div className="flex flex-col gap-1.5">
      {visibleModels.map((model) => (
        <IntelligenceRow
          key={model.modelId}
          t={t}
          model={model}
          checked={selected.has(model.modelId)}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default function ModelIntelligencePanel({
  t,
  providerId,
  providerName,
  onClose,
}: ModelIntelligencePanelProps) {
  const { fetchState, data, selected, refetch, toggleModel, selectAll } =
    useProviderIntelligence(providerId);
  const [freeOnly, setFreeOnly] = useState(false);
  const [search, setSearch] = useState("");

  const visibleModels = useMemo(
    () => filterVisibleModels(data, selected, freeOnly, search),
    [data, selected, freeOnly, search]
  );

  const title = providerText(t, "intelligenceTitle", "Model Intelligence — {name}", {
    name: providerName,
  });
  const closeLabel = providerText(t, "intelligenceClose", "Close panel");

  if (fetchState.status === "loading") {
    return (
      <StatusFrame title={title} closeLabel={closeLabel} onClose={onClose}>
        <div className="flex flex-1 items-center justify-center">
          <Spinner decorative className="text-text-muted" />
          <span className="ml-2 text-sm text-text-muted">
            {providerText(t, "intelligenceLoading", "Loading intelligence scores…")}
          </span>
        </div>
      </StatusFrame>
    );
  }

  if (fetchState.status === "error") {
    return (
      <StatusFrame title={title} closeLabel={closeLabel} onClose={onClose}>
        <div className="flex flex-1 flex-col items-center justify-center gap-3">
          <p className="text-sm text-error">
            {providerText(t, "intelligenceLoadFailed", "Failed to load intelligence scores.")}
          </p>
          <p className="text-xs text-text-muted">{fetchState.message}</p>
          <Button size="sm" variant="outline" onClick={refetch}>
            {providerText(t, "intelligenceRetry", "Retry")}
          </Button>
        </div>
      </StatusFrame>
    );
  }

  return (
    <div className="absolute inset-0 z-20 flex flex-col overflow-hidden bg-surface border border-border rounded-lg">
      <IntelligenceToolbar
        t={t}
        title={title}
        closeLabel={closeLabel}
        freeOnly={freeOnly}
        search={search}
        onSelectAll={selectAll}
        onFreeOnlyChange={setFreeOnly}
        onSearchChange={setSearch}
        onClose={onClose}
      />

      {/* Bar chart */}
      <div className="flex-1 overflow-auto p-3">
        <IntelligenceChart
          t={t}
          data={data}
          visibleModels={visibleModels}
          selected={selected}
          onToggle={toggleModel}
        />
      </div>
    </div>
  );
}
