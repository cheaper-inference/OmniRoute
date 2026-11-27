"use client";

import Icon from "@/shared/components/Icon";
import Notice from "@/shared/components/Notice";
import { Alert } from "@omniroute/ui-kit/alert";
import IconChip, { type IconChipTone } from "@/shared/components/IconChip";
import { Spinner } from "@/shared/components/Loading";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, Badge, EmptyState } from "@/shared/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
// Direct module import keeps the tests' barrel stubs (Card/Badge/EmptyState) unchanged.
import Button from "@/shared/components/Button";
import { FORMAT_META } from "../exampleTemplates";

interface MonitorTabProps {
  // F9 passes callback for empty state CTA.
  onGoToTranslate?: () => void;
}

interface TranslationEvent {
  id?: string;
  timestamp?: string | number;
  provider?: string;
  model?: string;
  sourceFormat?: string;
  targetFormat?: string;
  status?: string;
  statusCode?: number | string;
  latency?: number;
  endpoint?: string;
  isComboRouted?: boolean;
  routeEndpoint?: string;
  routeProvider?: string;
  routeCombo?: string;
  routeConnectionShortId?: string;
}

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  color: "blue" | "green" | "red" | "purple" | "amber" | "cyan";
}

// Stat accents as kit IconChip tones (status and chart tokens, theme-aware).
const COLOR_TONE: Record<StatCardProps["color"], IconChipTone> = {
  blue: "info",
  green: "success",
  red: "danger",
  purple: "chart-3",
  amber: "warning",
  cyan: "chart-2",
};

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <Card>
      <div className="p-4 flex items-center gap-3">
        <IconChip tone={COLOR_TONE[color] ?? "info"}>
          <Icon name={icon} />
        </IconChip>
        <div>
          <p className="text-lg font-semibold text-text-main">{value}</p>
          <p className="ci-eyebrow" data-size="3xs">
            {label}
          </p>
        </div>
      </div>
    </Card>
  );
}

/**
 * MonitorTab
 *
 * Refactor of LiveMonitorMode with 100% functional parity + additions:
 * - monitorOriginHint header always visible (explains event origin)
 * - empty state CTA with "Ir para Translate" button (onGoToTranslate)
 * - preserves 3s polling, auto-refresh toggle, 6 stat cards, events table
 * - cleanup useEffect: clearInterval on unmount
 */
export default function MonitorTab({ onGoToTranslate }: MonitorTabProps) {
  const t = useTranslations("translator");
  const tc = useTranslations("common");

  const translateOrFallback = useCallback(
    (key: string, fallback: string, values?: Record<string, unknown>) => {
      try {
        const translated = t(key, values);
        return translated === key || translated === `translator.${key}` ? fallback : translated;
      } catch {
        return fallback;
      }
    },
    [t]
  );

  const [events, setEvents] = useState<TranslationEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const notAvailable = t("notAvailableSymbol");
  const formatLatency = (value: number) => t("millisecondsShort", { value });

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/translator/history?limit=50");
      if (res.ok) {
        const data = (await res.json()) as { events?: TranslationEvent[] };
        setEvents(data.events ?? []);
      }
    } catch {
      // ignore fetch errors in polling context — do not leak stack traces
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void (async () => {
      await fetchHistory();
    })();
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        void fetchHistory();
      }, 3000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoRefresh, fetchHistory]);

  // Computed stats
  const successCount = events.filter((e) => e.status === "success").length;
  const errorCount = events.filter((e) => e.status === "error").length;
  const comboCount = events.filter((e) => e.isComboRouted).length;
  const uniqueEndpoints = new Set(events.map((e) => e.routeEndpoint ?? e.endpoint).filter(Boolean))
    .size;
  const avgLatency =
    events.length > 0
      ? Math.round(events.reduce((sum, e) => sum + (e.latency ?? 0), 0) / events.length)
      : 0;

  return (
    <div className="space-y-5 min-w-0">
      {/* Origin hint — always visible (monitorOriginHint) */}
      <Alert
        variant="info"
        dismissible={false}
        data-testid="monitor-origin-hint"
        icon={<Icon name="info" size={18} />}
        description={translateOrFallback(
          "monitorOriginHint",
          "Eventos gerados pelo Translate ou pelo pipeline principal aparecem aqui em tempo real."
        )}
      />

      {/* Stat Cards — 6 cards: total, success, errors, avg latency, combo-routed, unique endpoints */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard
          icon="translate"
          label={t("totalTranslations")}
          value={events.length}
          color="blue"
        />
        <StatCard icon="check_circle" label={t("successful")} value={successCount} color="green" />
        <StatCard icon="error" label={t("errors")} value={errorCount} color="red" />
        <StatCard
          icon="speed"
          label={t("avgLatency")}
          value={formatLatency(avgLatency)}
          color="purple"
        />
        <StatCard
          icon="hub"
          label={translateOrFallback("comboRouted", "Combo-routed")}
          value={comboCount}
          color="amber"
        />
        <StatCard
          icon="lan"
          label={translateOrFallback("uniqueEndpoints", "Unique endpoints")}
          value={uniqueEndpoints}
          color="cyan"
        />
      </div>

      {/* Memory note */}
      <Notice variant="warning" icon="memory">
        {t("liveMonitorMemoryNote")}{" "}
        <span className="text-text-muted">{t("liveMonitorMemoryCapNote")}</span>
      </Notice>

      {/* Auto-refresh controls */}
      <Card>
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              name={autoRefresh ? "radio_button_checked" : "radio_button_unchecked"}
              size={18}
              className={autoRefresh ? "animate-pulse text-success" : "text-text-muted"}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAutoRefresh((prev) => !prev)}
              // The button names its action; the Live/Paused badge beside it shows the state.
              // Visible text = accessible name (WCAG 2.5.3), no aria-label or title override.
              data-testid="auto-refresh-toggle"
            >
              {autoRefresh
                ? translateOrFallback("pauseAutoRefresh", "Pause auto-refresh")
                : translateOrFallback("resumeAutoRefresh", "Resume auto-refresh")}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            {/* Live/Paused badge */}
            <Badge variant={autoRefresh ? "success" : "default"} size="sm" dot>
              {autoRefresh
                ? translateOrFallback("live", "Live")
                : translateOrFallback("paused", "Paused")}
            </Badge>
            <Button variant="ghost" size="sm" icon="refresh" onClick={() => void fetchHistory()}>
              {tc("refresh")}
            </Button>
          </div>
        </div>
      </Card>

      {/* Events table */}
      <Card>
        <div className="p-4">
          <h3 className="ci-heading mb-3" data-size="sm">
            {t("recentTranslations")}
          </h3>

          {loading ? (
            <div role="status" className="flex items-center justify-center py-12 text-text-muted">
              <Spinner decorative size="sm" className="mr-2" />
              {tc("loading")}
            </div>
          ) : events.length === 0 ? (
            /* Empty state with CTA (new in MonitorTab) */
            <div data-testid="monitor-empty-state">
              <EmptyState
                icon="📊"
                title={translateOrFallback("noTranslations", "No translations yet")}
                description={translateOrFallback(
                  "monitorEmptyCta",
                  "Go back to the Translate tab and send a request. It will appear here."
                )}
                actionLabel={translateOrFallback("monitorOpenTranslateButton", "Go to Translate")}
                onAction={onGoToTranslate ?? null}
              />
            </div>
          ) : (
            <div data-testid="monitor-events-table">
              <Table
                scrollbarLabel={t("recentTranslations")}
                scrollLabel={t("recentTranslations")}
                variant="plain"
              >
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("time")}</TableHead>
                    <TableHead>{translateOrFallback("routeDetails", "Route")}</TableHead>
                    <TableHead>{t("source")}</TableHead>
                    <TableHead>{t("target")}</TableHead>
                    <TableHead>{t("model")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead numeric>{t("latency")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event, i) => {
                    const srcMeta = FORMAT_META[event.sourceFormat as keyof typeof FORMAT_META] ?? {
                      label: event.sourceFormat ?? "?",
                      color: "gray",
                    };
                    const tgtMeta = FORMAT_META[event.targetFormat as keyof typeof FORMAT_META] ?? {
                      label: event.targetFormat ?? "?",
                      color: "gray",
                    };

                    return (
                      <TableRow key={event.id ?? i} data-testid="monitor-event-row">
                        <TableCell className="text-xs text-text-muted whitespace-nowrap">
                          {event.timestamp
                            ? new Date(event.timestamp).toLocaleTimeString()
                            : notAvailable}
                        </TableCell>
                        <TableCell className="min-w-[220px]">
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <Badge variant="default" size="sm">
                                {event.routeProvider ?? event.provider ?? notAvailable}
                              </Badge>
                              {event.routeCombo ? (
                                <Badge variant="primary" size="sm">
                                  {translateOrFallback("comboBadge", "Combo")}: {event.routeCombo}
                                </Badge>
                              ) : null}
                            </div>
                            <div className="flex flex-wrap gap-x-3 gap-y-1 text-2xs text-text-muted">
                              <span>
                                {translateOrFallback("routeEndpointLabel", "Endpoint")}:{" "}
                                {event.routeEndpoint ?? event.endpoint ?? notAvailable}
                              </span>
                              {event.routeConnectionShortId ? (
                                <span>
                                  {translateOrFallback("routeConnectionLabel", "Conn")}:{" "}
                                  <span className="font-mono">{event.routeConnectionShortId}</span>
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default" size="sm">
                            {srcMeta.label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="primary" size="sm">
                            {tgtMeta.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-mono text-text-muted break-all">
                          {event.model ?? notAvailable}
                        </TableCell>
                        <TableCell>
                          {event.status === "success" ? (
                            <Badge variant="success" size="sm" dot>
                              {t("ok")}
                            </Badge>
                          ) : (
                            <Badge variant="error" size="sm" dot>
                              {event.statusCode ?? t("errorShort")}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell numeric className="text-xs text-text-muted">
                          {event.latency ? formatLatency(event.latency) : notAvailable}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
