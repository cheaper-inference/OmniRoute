"use client";

import Icon from "@/shared/components/Icon";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { DataTableShell } from "@omniroute/ui-kit/data-table-shell";
import { TableLoadingState } from "@omniroute/ui-kit/table-loading";
import { cn } from "@/shared/utils/cn";
import Badge from "./Badge";
import Button from "./Button";
import ColumnToggle from "./ColumnToggle";
import EmptyState from "./EmptyState";
import Input from "./Input";
import Select from "./Select";
import ProxyLogDetail from "./ProxyLogDetail";
import { TYPE_COLORS, LEVEL_COLORS, PROVIDER_COLORS } from "@/shared/constants/colors";
import {
  formatTime,
  formatDuration as formatLatency,
  maskAccount,
  maskSegment,
  truncateUrl,
} from "@/shared/utils/formatting";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import { getProviderDisplayLabel } from "@/shared/utils/providerDisplayLabel";

const PROXY_COLUMN_KEYS = [
  "status",
  "proxy",
  "tls",
  "type",
  "level",
  "provider",
  "upstream",
  "egress",
  "correlation",
  "servedBy",
  "target",
  "latency",
  "ip",
  "time",
];

/**
 * A proxy log row is a connection test when the writer marked it as such:
 * the `provider-test` level fallback (no proxy resolved) or the
 * `/connection-test` target suffix (a proxy was resolved, so `level` carries
 * the real level). Both markers are written by the connection-test route.
 */
function isProviderTestLog(log) {
  if (!log) return false;
  if (log.level === "provider-test") return true;
  return typeof log.targetUrl === "string" && log.targetUrl.endsWith("/connection-test");
}

// Proxy status string → kit Badge tone.
function proxyStatusTone(status: unknown) {
  if (status === "success") return "success" as const;
  if (status === "error") return "error" as const;
  if (status === "timeout") return "warning" as const;
  return "default" as const;
}

const DEFAULT_VISIBLE = Object.fromEntries(PROXY_COLUMN_KEYS.map((key) => [key, true]));

export default function ProxyLogger() {
  const t = useTranslations("proxyLogger");
  const tCommon = useTranslations("common");
  const { emailsVisible } = useEmailPrivacyStore();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedType, setSelectedType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedLog, setSelectedLog] = useState(null);
  const [providerNodes, setProviderNodes] = useState<
    Array<{ id?: string; prefix?: string; name?: string }>
  >([]);
  const intervalRef = useRef(null);
  const hasLoadedRef = useRef(false);
  const logsSignatureRef = useRef("");

  const statusFilters = useMemo(
    () => [
      { key: "all", label: t("filterAll") },
      { key: "error", label: t("filterErrors"), icon: "error" },
      { key: "ok", label: t("filterSuccess"), icon: "check_circle" },
      { key: "timeout", label: t("filterTimeout"), icon: "timer_off" },
    ],
    [t]
  );

  const sourceFilters = useMemo(
    () => [
      { key: "all", label: t("filterAll") },
      { key: "traffic", label: t("filterTraffic") },
      { key: "tests", label: t("filterTests") },
    ],
    [t]
  );

  const columns = useMemo(
    () => [
      { key: "status", label: t("colStatus") },
      { key: "proxy", label: t("colProxy") },
      { key: "tls", label: t("colTls") },
      { key: "type", label: t("colType") },
      { key: "level", label: t("colLevel") },
      { key: "provider", label: t("colProvider") },
      { key: "upstream", label: t("colUpstream") },
      { key: "egress", label: t("colEgress") },
      { key: "correlation", label: t("colCorrelation") },
      { key: "servedBy", label: t("colServedBy") },
      { key: "target", label: t("colTarget") },
      { key: "latency", label: t("colLatency") },
      { key: "ip", label: t("colClientIp") },
      { key: "time", label: t("colTime") },
    ],
    [t]
  );

  const [visibleColumns, setVisibleColumns] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_VISIBLE;
    try {
      const saved = localStorage.getItem("proxyLoggerVisibleColumns");
      return saved ? { ...DEFAULT_VISIBLE, ...JSON.parse(saved) } : DEFAULT_VISIBLE;
    } catch {
      return DEFAULT_VISIBLE;
    }
  });

  const toggleColumn = useCallback((key) => {
    setVisibleColumns((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("proxyLoggerVisibleColumns", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const fetchLogs = useCallback(
    async (showLoading = false) => {
      if (showLoading) setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (activeFilter === "error") params.set("status", "error");
        if (activeFilter === "ok") params.set("status", "ok");
        if (activeFilter === "timeout") params.set("status", "timeout");
        if (selectedType) params.set("type", selectedType);
        if (selectedProvider) params.set("provider", selectedProvider);
        if (selectedLevel) params.set("level", selectedLevel);
        params.set("limit", "300");

        const res = await fetch(`/api/usage/proxy-logs?${params}`);
        if (res.ok) {
          const data = await res.json();
          // Skip re-render if data hasn't changed (#1369 GPU perf)
          const sig = JSON.stringify(data.map?.((l: any) => l.id) ?? []);
          if (sig !== logsSignatureRef.current) {
            logsSignatureRef.current = sig;
            setLogs(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch proxy logs:", error);
      } finally {
        if (showLoading) setLoading(false);
      }
    },
    [search, activeFilter, selectedType, selectedProvider, selectedLevel]
  );

  useEffect(() => {
    const showLoading = !hasLoadedRef.current;
    hasLoadedRef.current = true;
    fetchLogs(showLoading);
  }, [fetchLogs]);

  // Fetch provider nodes for display labels
  useEffect(() => {
    fetch("/api/provider-nodes")
      .then((r) => (r.ok ? r.json() : { nodes: [] }))
      .then((d) => setProviderNodes(d.nodes || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (recording) {
      intervalRef.current = setInterval(() => fetchLogs(false), 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [recording, fetchLogs]);

  const sortedLogs = useMemo(() => {
    const arr = [...logs];
    const filtered =
      sourceFilter === "tests"
        ? arr.filter(isProviderTestLog)
        : sourceFilter === "traffic"
          ? arr.filter((l) => !isProviderTestLog(l))
          : arr;
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case "latency_desc":
          return (b.latencyMs || 0) - (a.latencyMs || 0);
        case "latency_asc":
          return (a.latencyMs || 0) - (b.latencyMs || 0);
        case "newest":
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });
    return filtered;
  }, [logs, sortBy, sourceFilter]);

  const uniqueProviders = [...new Set(logs.map((l) => l.provider).filter(Boolean))].sort();
  const uniqueTypes = [...new Set(logs.map((l) => l.proxy?.type).filter(Boolean))].sort();
  const uniqueLevels = [...new Set(logs.map((l) => l.level).filter(Boolean))].sort();

  const totalCount = logs.length;
  const okCount = logs.filter((l) => l.status === "success").length;
  const errorCount = logs.filter((l) => l.status === "error").length;
  const timeoutCount = logs.filter((l) => l.status === "timeout").length;
  const directCount = logs.filter((l) => l.level === "direct").length;
  const tlsCount = logs.filter((l) => l.tlsFingerprint).length;
  const testsCount = logs.filter(isProviderTestLog).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Recording Toggle */}
        <Button
          variant="outline"
          size="sm"
          aria-pressed={recording}
          onClick={() => setRecording(!recording)}
          className={cn(
            "rounded-full",
            recording ? "border-error/30 bg-error/10 text-error" : "text-text-muted"
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "size-2 rounded-full",
              recording ? "bg-error animate-pulse" : "bg-text-muted"
            )}
          />
          {recording ? t("recording") : t("paused")}
        </Button>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono">
          <Badge size="sm">
            {totalCount} {t("total")}
          </Badge>
          <Badge size="sm" variant="success">
            {okCount} {t("ok")}
          </Badge>
          {errorCount > 0 && (
            <Badge size="sm" variant="error">
              {errorCount} {t("err")}
            </Badge>
          )}
          {timeoutCount > 0 && (
            <Badge size="sm" variant="warning">
              {timeoutCount} {t("timeoutShort")}
            </Badge>
          )}
          {directCount > 0 && (
            <Badge size="sm">
              {directCount} {t("direct")}
            </Badge>
          )}
          {tlsCount > 0 && (
            <Badge size="sm" variant="info">
              🔒 {tlsCount} TLS
            </Badge>
          )}
          {testsCount > 0 && (
            <Badge size="sm" className="border-chart-3/30 bg-chart-3/10 text-chart-3">
              {testsCount} {t("filterTests")}
            </Badge>
          )}
        </div>

        {/* Refresh */}
        <Button
          variant="ghost"
          size="icon"
          className="ms-auto"
          onClick={() => fetchLogs(false)}
          title={t("refresh")}
          aria-label={t("refresh")}
        >
          <Icon name="refresh" size={18} />
        </Button>
      </div>

      <DataTableShell
        filterAlignment="end"
        filters={
          <>
            {/* Search */}
            <Input
              type="text"
              icon="search"
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72"
            />

            {/* Type Dropdown */}
            <Select
              className="w-auto"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label={t("colType")}
              selectClassName="min-w-[120px]"
            >
              <option value="">{t("allTypes")}</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {(TYPE_COLORS[type]?.label || type).toUpperCase()}
                </option>
              ))}
            </Select>

            {/* Level Dropdown */}
            <Select
              className="w-auto"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              aria-label={t("colLevel")}
              selectClassName="min-w-[120px]"
            >
              <option value="">{t("allLevels")}</option>
              {uniqueLevels.map((l) => (
                <option key={l} value={l}>
                  {LEVEL_COLORS[l]?.label || l}
                </option>
              ))}
            </Select>

            {/* Provider Dropdown */}
            <Select
              className="w-auto"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              aria-label={t("colProvider")}
              selectClassName="min-w-[140px]"
            >
              <option value="">{t("allProviders")}</option>
              {uniqueProviders.map((p) => {
                const pc = PROVIDER_COLORS[p];
                return (
                  <option key={p} value={p}>
                    {pc?.label || p.toUpperCase()}
                  </option>
                );
              })}
            </Select>

            {/* Sort */}
            <Select
              className="w-auto"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label={t("sortLogs")}
              selectClassName="min-w-[140px]"
            >
              <option value="newest">{t("newest")}</option>
              <option value="oldest">{t("oldest")}</option>
              <option value="latency_desc">{t("latencyDesc")}</option>
              <option value="latency_asc">{t("latencyAsc")}</option>
            </Select>

            {/* Column visibility — kit DropdownMenu checkbox items via the adapter. */}
            <ColumnToggle columns={columns} visible={visibleColumns} onToggle={toggleColumn} />
          </>
        }
      >
        {/* Quick Filters */}
        <div
          role="group"
          aria-label={tCommon("filters")}
          className="flex flex-wrap items-center gap-2 border-b border-border px-3 py-2.5"
        >
          {statusFilters.map((f) => (
            <Button
              key={f.key}
              variant="outline"
              size="sm"
              aria-pressed={activeFilter === f.key}
              onClick={() => setActiveFilter(activeFilter === f.key ? "all" : f.key)}
              className={cn(
                "h-7 min-h-7 rounded-full px-3 text-xs",
                activeFilter === f.key
                  ? f.key === "error"
                    ? "bg-error/20 text-error border-error/40"
                    : f.key === "ok"
                      ? "bg-success/20 text-success border-success/40"
                      : f.key === "timeout"
                        ? "bg-warning/20 text-warning border-warning/40"
                        : "bg-primary text-accent-foreground border-primary"
                  : "text-text-muted"
              )}
            >
              {f.icon && <Icon name={f.icon} size={14} />}
              {f.label}
            </Button>
          ))}

          {uniqueProviders.length > 0 && (
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
          )}

          <span className="mr-1 text-[10px] uppercase tracking-wider text-text-muted">
            {t("filterSource")}
          </span>
          {sourceFilters.map((f) => (
            <Button
              key={`source-${f.key}`}
              variant="outline"
              size="sm"
              aria-pressed={sourceFilter === f.key}
              onClick={() => setSourceFilter(sourceFilter === f.key ? "all" : f.key)}
              className={cn(
                "h-7 min-h-7 rounded-full px-3 text-xs",
                sourceFilter === f.key
                  ? "bg-primary text-accent-foreground border-primary"
                  : "text-text-muted"
              )}
            >
              {f.label}
            </Button>
          ))}

          {uniqueProviders.length > 0 && (
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
          )}

          {uniqueProviders.map((p) => {
            // Provider identity colours (brand palette in constants/colors), not status tones.
            const pc = PROVIDER_COLORS[p] || {
              bg: "#374151",
              text: "#fff",
              label: p.toUpperCase(),
            };
            const isActive = selectedProvider === p;
            return (
              <Button
                key={p}
                variant="ghost"
                size="sm"
                aria-pressed={isActive}
                onClick={() => setSelectedProvider(isActive ? "" : p)}
                className={cn(
                  "h-7 min-h-7 rounded-full border px-3 text-xs font-bold uppercase",
                  isActive
                    ? "border-border-strong ring-1 ring-border-strong"
                    : "border-transparent opacity-70 hover:opacity-100"
                )}
                style={{
                  backgroundColor: isActive ? pc.bg : `${pc.bg}33`,
                  color: isActive ? pc.text : pc.bg,
                }}
              >
                {pc.label}
              </Button>
            );
          })}
        </div>

        {/* Table */}
        {loading && logs.length === 0 ? (
          <TableLoadingState label={t("loadingProxyLogs")} />
        ) : logs.length === 0 ? (
          <EmptyState icon="vpn_lock" title={t("noProxyLogs")} />
        ) : sortedLogs.length === 0 ? (
          <EmptyState icon="search_off" title={t("noMatchingLogs")} />
        ) : (
          <Table
            scrollbarLabel={t("tableLabel")}
            // Opaque bg-surface viewport (#4233); it scrolls both axes under a sticky header.
            containerClassName="max-h-[calc(100vh-320px)] overflow-auto rounded-none border-0 bg-surface"
            className="text-left text-xs"
          >
            <TableHeader className="sticky top-0 z-10">
              <TableRow>
                {visibleColumns.status && <TableHead className="px-3">{t("colStatus")}</TableHead>}
                {visibleColumns.proxy && <TableHead className="px-3">{t("colProxy")}</TableHead>}
                {visibleColumns.tls && <TableHead className="px-3">{t("colTls")}</TableHead>}
                {visibleColumns.type && <TableHead className="px-3">{t("colType")}</TableHead>}
                {visibleColumns.level && <TableHead className="px-3">{t("colLevel")}</TableHead>}
                {visibleColumns.provider && (
                  <TableHead className="px-3">{t("colProvider")}</TableHead>
                )}
                {visibleColumns.upstream && (
                  <TableHead className="ci-table__head--numeric px-3">{t("colUpstream")}</TableHead>
                )}
                {visibleColumns.egress && <TableHead className="px-3">{t("colEgress")}</TableHead>}
                {visibleColumns.correlation && (
                  <TableHead className="px-3">{t("colCorrelation")}</TableHead>
                )}
                {visibleColumns.servedBy && (
                  <TableHead className="px-3">{t("colServedBy")}</TableHead>
                )}
                {visibleColumns.target && <TableHead className="px-3">{t("colTarget")}</TableHead>}
                {visibleColumns.latency && (
                  <TableHead className="ci-table__head--numeric px-3">{t("colLatency")}</TableHead>
                )}
                {visibleColumns.ip && <TableHead className="px-3">{t("colClientIp")}</TableHead>}
                {visibleColumns.time && (
                  <TableHead className="ci-table__head--numeric px-3">{t("colTime")}</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedLogs.map((log) => {
                // Proxy type / level keep their categorical palettes (constants/colors).
                const typeColor = TYPE_COLORS[log.proxy?.type] || {
                  bg: "#6B7280",
                  text: "#fff",
                  label: log.proxy?.type || "-",
                };
                const levelColor = LEVEL_COLORS[log.level] || LEVEL_COLORS.direct;
                const resolvedProviderLabel =
                  getProviderDisplayLabel(log.provider, providerNodes) ||
                  (log.provider || "-").toUpperCase();
                const providerColor = PROVIDER_COLORS[log.provider] || {
                  bg: "#374151",
                  text: "#fff",
                  label: resolvedProviderLabel,
                };
                const isError = log.status === "error" || log.status === "timeout";

                return (
                  <TableRow
                    key={log.id}
                    onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                    className={cn(
                      "cursor-pointer hover:bg-info/10 transition-colors",
                      isError && "bg-error/5"
                    )}
                  >
                    {visibleColumns.status && (
                      <TableCell className="px-3 py-2">
                        <Badge
                          size="sm"
                          variant={proxyStatusTone(log.status)}
                          className="min-w-[50px] justify-center font-bold uppercase"
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.proxy && (
                      <TableCell className="px-3 py-2 font-mono text-[11px] text-primary">
                        {log.proxy ? log.proxy.name || `${log.proxy.host}:${log.proxy.port}` : "—"}
                      </TableCell>
                    )}
                    {visibleColumns.tls && (
                      <TableCell className="px-3 py-2">
                        {log.tlsFingerprint ? (
                          <Badge
                            size="sm"
                            variant="info"
                            className="text-[9px] font-bold uppercase"
                            title={t("tlsFingerprint")}
                          >
                            <span aria-hidden="true">🔒</span> TLS
                          </Badge>
                        ) : (
                          <span className="text-[10px] text-text-muted">—</span>
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.type && (
                      <TableCell className="px-3 py-2">
                        <span
                          className="inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase"
                          style={{ backgroundColor: typeColor.bg, color: typeColor.text }}
                        >
                          {typeColor.label}
                        </span>
                      </TableCell>
                    )}
                    {visibleColumns.level && (
                      <TableCell className="px-3 py-2">
                        <span
                          className="inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase"
                          style={{ backgroundColor: levelColor.bg, color: levelColor.text }}
                        >
                          {levelColor.label}
                        </span>
                      </TableCell>
                    )}
                    {visibleColumns.provider && (
                      <TableCell className="px-3 py-2">
                        {log.provider ? (
                          <span
                            className="inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase"
                            style={{
                              backgroundColor: providerColor.bg,
                              color: providerColor.text,
                            }}
                          >
                            {providerColor.label}
                          </span>
                        ) : (
                          <span className="text-[10px] text-text-muted">—</span>
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.upstream && (
                      <TableCell className="px-3 py-2 text-right font-mono text-text-muted">
                        {typeof log.upstreamStatus === "number" ? String(log.upstreamStatus) : "—"}
                      </TableCell>
                    )}
                    {visibleColumns.egress && (
                      <TableCell className="px-3 py-2 font-mono text-[11px] text-success">
                        {maskSegment(log.egressIp) || "—"}
                      </TableCell>
                    )}
                    {visibleColumns.correlation && (
                      <TableCell className="px-3 py-2 font-mono text-[11px]">
                        {log.correlationId ? (
                          <a
                            href={`/dashboard/logs?correlationId=${encodeURIComponent(log.correlationId)}`}
                            onClick={(e) => e.stopPropagation()}
                            title={log.correlationId}
                            className="text-primary hover:underline"
                          >
                            {log.correlationId.slice(0, 12)}…
                          </a>
                        ) : (
                          <span className="text-[10px] text-text-muted">—</span>
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.servedBy && (
                      <TableCell className="px-3 py-2 font-mono text-[11px] text-text-muted">
                        {maskAccount(log.rotationAccount ?? log.account, emailsVisible) || "—"}
                      </TableCell>
                    )}
                    {visibleColumns.target && (
                      <TableCell
                        className="max-w-[200px] truncate px-3 py-2 font-mono text-[10px] text-text-muted"
                        title={log.targetUrl}
                      >
                        {truncateUrl(log.targetUrl)}
                      </TableCell>
                    )}
                    {visibleColumns.latency && (
                      <TableCell className="px-3 py-2 text-right font-mono text-text-muted">
                        {formatLatency(log.latencyMs)}
                      </TableCell>
                    )}
                    {visibleColumns.ip && (
                      <TableCell className="px-3 py-2 font-mono text-[11px] text-success">
                        {log.clientIp || "—"}
                      </TableCell>
                    )}
                    {visibleColumns.time && (
                      <TableCell className="px-3 py-2 text-right text-text-muted">
                        {formatTime(log.timestamp)}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </DataTableShell>
      {/* Detail Panel */}
      {selectedLog && <ProxyLogDetail log={selectedLog} onClose={() => setSelectedLog(null)} />}
    </div>
  );
}
