"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Icon from "@/shared/components/Icon";
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

const CLOSE_BUTTON_CLASS =
  "rounded p-1 text-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-text-main";
const OUTLINE_BUTTON_CLASS =
  "rounded-lg border border-border bg-transparent text-xs font-medium text-text-main hover:bg-black/5 dark:hover:bg-white/5";

function CloseButton({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <button type="button" onClick={onClose} aria-label={label} className={CLOSE_BUTTON_CLASS}>
      <Icon name="close" size={20} />
    </button>
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
        <button
          type="button"
          onClick={onSelectAll}
          className={`${OUTLINE_BUTTON_CLASS} px-2.5 py-1`}
        >
          {providerText(t, "intelligenceSelectAll", "Select All")}
        </button>
        <label className="flex items-center gap-1.5 text-xs text-text-muted cursor-pointer">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={(e) => onFreeOnlyChange(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-border accent-[var(--color-accent)]"
          />
          {providerText(t, "intelligenceFreeOnly", "Free-only")}
        </label>
        <div className="relative">
          <Icon
            name="search"
            size={14}
            className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={providerText(t, "intelligenceSearch", "Search models…")}
            className="w-40 rounded-lg border border-border bg-sidebar/50 py-1 pl-7 pr-2 text-xs text-text-main placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
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
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(model.modelId)}
        aria-label={providerText(t, "intelligenceToggleModel", "Toggle {id}", {
          id: model.modelId,
        })}
        className="h-3.5 w-3.5 shrink-0 rounded border-border accent-[var(--color-accent)]"
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
        <div className="h-5 w-40 shrink-0 overflow-hidden rounded bg-black/5 dark:bg-white/5">
          <div
            className="h-full rounded transition-all"
            style={{
              width: `${Math.round(model.score * 100)}%`,
              background: `linear-gradient(90deg, #3b82f6, #22c55e)`,
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
          <Icon name="progress_activity" size={24} className="animate-spin text-text-muted" />
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
          <p className="text-sm text-red-500">
            {providerText(t, "intelligenceLoadFailed", "Failed to load intelligence scores.")}
          </p>
          <p className="text-xs text-text-muted">{fetchState.message}</p>
          <button type="button" onClick={refetch} className={`${OUTLINE_BUTTON_CLASS} px-3 py-1.5`}>
            {providerText(t, "intelligenceRetry", "Retry")}
          </button>
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
