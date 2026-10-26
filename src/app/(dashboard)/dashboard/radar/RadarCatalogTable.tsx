"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { Card } from "@/shared/components";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Input from "@/shared/components/Input";
import { cn } from "@/shared/utils/cn";

export interface RadarMergedEntry {
  provider: string;
  modelId: string;
  displayName: string;
  monthlyTokens: number;
  creditTokens: number;
  freeType: string;
  poolKey: string | null;
  tos: string;
  trainsOnPrompts?: boolean;
  enabled?: boolean;
  origin: "baseline" | "radar" | "local";
  disabledBy?: "radar";
  contextWindow?: number | null;
  capabilities?: {
    tools: boolean | null;
    vision: boolean | null;
    thinking: boolean | null;
  };
  metadataEvidenceUrls?: string[];
  budget?: { kind: string; tokensPerMonth?: number; poolId?: string };
  limits?: { rpm: number | null; rpd: number | null; tpm: number | null; tpd: number | null };
  setup?: { keyUrl: string | null; steps: string[] } | null;
}

interface RadarLocalModelState {
  provider: string;
  modelId: string;
  displayName: string | null;
  enabled: boolean | null;
  tombstoned: boolean;
  updatedAt: string;
}

interface RadarCatalogTableProps {
  entries: RadarMergedEntry[];
  refreshCatalog: () => Promise<void>;
  onError: (message: string) => void;
}

/**
 * Compact a plain count. Locale-independent on purpose: `toLocaleString()` would
 * make the rendering — and any test asserting on it — depend on the machine's
 * locale.
 */
export function compactCount(value: number): string {
  // The feed is JSON off the network, so the declared `number` is a hope, not a
  // guarantee: a string, a NaN or an Infinity would otherwise render as
  // "InfinityM" or "NaN/min" in the operator's table.
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return "?";
  if (numeric >= 1_000_000) return `${(numeric / 1_000_000).toFixed(1)}M`;
  if (numeric >= 1_000) return `${(numeric / 1_000).toFixed(0)}K`;
  return String(numeric);
}

function formatTokens(value: number): string {
  // A monthly budget of zero means the pool is rate-limited rather than
  // token-limited. That reading is specific to budgets — see `formatLimits`.
  if (value === 0) return "rate-only";
  return compactCount(value);
}

/**
 * Render the rate limits the feed reported, and nothing else. Each of the four
 * values is independently nullable, so an absent one is omitted rather than
 * printed as zero — "no reported limit" and "a limit of zero" are opposite
 * facts, and the second one is worth noticing. An entry with no limits at all,
 * or with four nulls, reads "—".
 *
 * Deliberately not built on `formatTokens`: that one maps 0 to "rate-only",
 * which would render a zero ceiling as "rate-only/min".
 */
export function formatLimits(entry: Pick<RadarMergedEntry, "limits">): string {
  const { rpm, rpd, tpm, tpd } = entry.limits ?? {};
  const parts: string[] = [];
  if (rpm != null) parts.push(`${compactCount(rpm)}/min`);
  if (rpd != null) parts.push(`${compactCount(rpd)}/day`);
  if (tpm != null) parts.push(`${compactCount(tpm)} tok/min`);
  if (tpd != null) parts.push(`${compactCount(tpd)} tok/day`);
  return parts.length ? parts.join(" · ") : "—";
}

function budgetLabel(entry: RadarMergedEntry): string {
  if (entry.budget?.kind === "shared_pool") {
    return `shared (${formatTokens(entry.budget.tokensPerMonth ?? entry.monthlyTokens)}/mo)`;
  }
  if (entry.budget?.kind === "rate_only" || entry.monthlyTokens === 0) return "rate-only";
  return `${formatTokens(entry.monthlyTokens)}/mo`;
}

function capabilityBadge(
  label: string,
  value: boolean | null | undefined,
  trueClass: string,
  unknownHelp: string
) {
  const state = value === true ? "✓" : value === false ? "✕" : "?";
  const stateClass =
    value === true
      ? trueClass
      : value === false
        ? "bg-error/10 text-error"
        : "bg-surface-2/10 text-text-muted";
  const unknown = value !== true && value !== false;
  return (
    <span
      className={`text-[10px] px-1.5 py-0.5 rounded ${stateClass}`}
      {...(unknown ? { title: unknownHelp } : {})}
    >
      {label} {state}
    </span>
  );
}

export function RadarCatalogTable({ entries, refreshCatalog, onError }: RadarCatalogTableProps) {
  const t = useTranslations("radarPage");
  const [states, setStates] = useState<RadarLocalModelState[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [enabled, setEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadState = useCallback(async () => {
    try {
      const response = await fetch("/api/radar/local-model-state");
      if (!response.ok) return;
      const payload = await response.json();
      setStates(Array.isArray(payload.states) ? payload.states : []);
    } catch {
      onError(t("errorLoading"));
    }
  }, [onError, t]);

  useEffect(() => {
    void (async () => {
      await loadState();
    })();
  }, [loadState]);

  const stateByKey = useMemo(
    () => new Map(states.map((state) => [`${state.provider}:${state.modelId}`, state])),
    [states]
  );
  const hiddenModels = useMemo(() => states.filter((state) => state.tombstoned), [states]);

  const applyResponse = useCallback(async (response: Response) => {
    if (!response.ok) throw new Error("save_failed");
    const payload = await response.json();
    setStates(Array.isArray(payload.states) ? payload.states : []);
  }, []);

  const mutate = useCallback(
    async (operation: () => Promise<Response>) => {
      setSaving(true);
      onError("");
      try {
        await applyResponse(await operation());
        setEditingKey(null);
        await refreshCatalog();
      } catch {
        onError(t("localStateSaveFailed"));
      } finally {
        setSaving(false);
      }
    },
    [applyResponse, onError, refreshCatalog, t]
  );

  const beginEdit = useCallback((entry: RadarMergedEntry) => {
    setEditingKey(`${entry.provider}:${entry.modelId}`);
    setDisplayName(entry.displayName);
    setEnabled(entry.enabled !== false);
  }, []);

  const saveOverride = useCallback(
    (entry: RadarMergedEntry) =>
      mutate(() =>
        fetch("/api/radar/local-model-state", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: entry.provider,
            modelId: entry.modelId,
            displayName,
            enabled,
          }),
        })
      ),
    [displayName, enabled, mutate]
  );

  const resetOverride = useCallback(
    (entry: Pick<RadarMergedEntry, "provider" | "modelId">) => {
      const query = new URLSearchParams({ provider: entry.provider, modelId: entry.modelId });
      return mutate(() =>
        fetch(`/api/radar/local-model-state?${query.toString()}`, { method: "DELETE" })
      );
    },
    [mutate]
  );

  const setTombstone = useCallback(
    (provider: string, modelId: string, tombstoned: boolean) =>
      mutate(() =>
        fetch("/api/radar/local-model-state", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider, modelId, tombstoned }),
        })
      ),
    [mutate]
  );

  return (
    <>
      <Card padding="none" className="overflow-hidden">
        <Table aria-label={t("catalogTab")} scrollbarLabel={t("catalogTab")}>
          <TableHeader>
            <TableRow>
              <TableHead>{t("colProvider")}</TableHead>
              <TableHead>{t("colModel")}</TableHead>
              <TableHead>{t("colQuota")}</TableHead>
              <TableHead>{t("colLimits")}</TableHead>
              <TableHead>{t("colContext")}</TableHead>
              <TableHead>{t("colCapabilities")}</TableHead>
              <TableHead>{t("colTos")}</TableHead>
              <TableHead className="text-right">{t("colActions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => {
              const key = `${entry.provider}:${entry.modelId}`;
              const localState = stateByKey.get(key);
              const hasOverride =
                localState && (localState.displayName !== null || localState.enabled !== null);
              return (
                <TableRow key={key} className={cn(entry.enabled === false && "opacity-50")}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{entry.provider}</span>
                      {entry.origin === "radar" && (
                        <Badge variant="primary" size="sm">
                          {t("newBadge")}
                        </Badge>
                      )}
                      {entry.origin === "local" && (
                        <Badge variant="info" size="sm">
                          {t("localBadge")}
                        </Badge>
                      )}
                      {entry.setup?.keyUrl && (
                        <Link
                          href={`/dashboard/radar/setup?provider=${encodeURIComponent(entry.provider)}`}
                          className="text-xs text-primary hover:underline"
                          title={t("setupGuide")}
                          aria-label={t("setupGuide")}
                        >
                          ⚙
                        </Link>
                      )}
                    </div>
                    {entry.enabled === false && entry.disabledBy === "radar" && (
                      <p className="text-xs text-error mt-0.5">{t("disabledByFeed")}</p>
                    )}
                  </TableCell>
                  <TableCell className="text-text-muted text-sm font-mono max-w-[240px]">
                    {editingKey === key ? (
                      <Input
                        type="text"
                        value={displayName}
                        onChange={(event) => setDisplayName(event.target.value)}
                        aria-label={t("modelDisplayName")}
                        maxLength={160}
                        className="min-w-[180px]"
                        inputClassName="font-mono text-sm"
                      />
                    ) : (
                      <span className="block truncate">{entry.displayName}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">{budgetLabel(entry)}</TableCell>
                  <TableCell className="text-sm text-text-muted">
                    {(() => {
                      const limits = formatLimits(entry);
                      return limits === "—" ? (
                        <span title={t("limitsUnknownHelp")}>{limits}</span>
                      ) : (
                        limits
                      );
                    })()}
                  </TableCell>
                  <TableCell className="text-sm text-text-muted">
                    {entry.contextWindow != null ? (
                      `${(entry.contextWindow / 1000).toFixed(0)}K`
                    ) : (
                      <span title={t("contextUnknownHelp")}>—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {capabilityBadge(
                        t("capTools"),
                        entry.capabilities?.tools,
                        "bg-info/10 text-info",
                        t("capabilityUnknownHelp")
                      )}
                      {capabilityBadge(
                        t("capVision"),
                        entry.capabilities?.vision,
                        "bg-primary/10 text-primary",
                        t("capabilityUnknownHelp")
                      )}
                      {capabilityBadge(
                        t("capThinking"),
                        entry.capabilities?.thinking,
                        "bg-warning/10 text-warning",
                        t("capabilityUnknownHelp")
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        entry.tos === "ok"
                          ? "bg-success/10 text-success"
                          : entry.tos === "caution"
                            ? "bg-warning/10 text-warning"
                            : entry.tos === "avoid"
                              ? "bg-error/10 text-error"
                              : "bg-surface-2/10 text-text-muted"
                      }`}
                    >
                      {entry.tos}
                    </span>
                    {entry.trainsOnPrompts === true && (
                      <span
                        className="ml-1 text-xs px-2 py-1 rounded bg-warning/10 text-warning"
                        title={t("trainsOnPromptsHelp")}
                      >
                        {t("trainsOnPrompts")}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="pl-3">
                    {editingKey === key ? (
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <Checkbox
                          checked={enabled}
                          disabled={entry.disabledBy === "radar"}
                          onChange={(event) => setEnabled(event.target.checked)}
                          label={t("modelEnabled")}
                          className="text-xs text-text-muted"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={saving || displayName.trim().length === 0}
                          onClick={() => void saveOverride(entry)}
                          className="h-7 px-2 text-xs text-primary"
                        >
                          {t("saveModel")}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={saving}
                          onClick={() => setEditingKey(null)}
                          className="h-7 px-2 text-xs text-text-muted hover:text-text-main"
                        >
                          {t("cancelEdit")}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={saving}
                          onClick={() => beginEdit(entry)}
                          className="h-7 px-2 text-xs text-primary"
                        >
                          {t("editModel")}
                        </Button>
                        {hasOverride && (
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={saving}
                            onClick={() => void resetOverride(entry)}
                            className="h-7 px-2 text-xs text-text-muted hover:text-text-main"
                          >
                            {t("resetModel")}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={saving}
                          onClick={() => void setTombstone(entry.provider, entry.modelId, true)}
                          className="h-7 px-2 text-xs text-error hover:bg-error/10"
                        >
                          {t("hideModel")}
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {hiddenModels.length > 0 && (
        <Card>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">{t("hiddenModelsTitle")}</h3>
            {hiddenModels.map((state) => (
              <div
                key={`${state.provider}:${state.modelId}:hidden`}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-3 last:border-b-0 last:pb-0"
              >
                <div>
                  <span className="font-medium">{state.provider}</span>
                  <span className="ml-2 text-sm font-mono text-text-muted">
                    {state.displayName ?? state.modelId}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={saving}
                  onClick={() => void setTombstone(state.provider, state.modelId, false)}
                  className="text-primary"
                >
                  {t("restoreModel")}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
