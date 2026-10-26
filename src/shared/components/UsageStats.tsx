"use client";

import { useTranslations } from "next-intl";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Card from "./Card";
import Badge from "./Badge";
import SegmentedControl from "./SegmentedControl";
import Toggle from "./Toggle";
import { CardSkeleton } from "./Loading";
import { fmtFull, fmtCost } from "@/shared/utils/formatting";
import { SortableTableHead, type DataTableSortDirection } from "@omniroute/ui-kit/data-table-shell";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@omniroute/ui-kit/table";

function MiniBarGraph({
  data,
  colorClass = "bg-primary",
}: {
  data: number[];
  colorClass?: string;
}) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-1 h-8 w-24">
      {data.slice(-9).map((val, idx) => (
        <div
          key={`bar-${idx}-${val}`}
          className={`flex-1 rounded-t-sm transition-all duration-500 ${colorClass}`}
          style={{ height: `${Math.max((val / max) * 100, 5)}%` }}
          title={String(val)}
        />
      ))}
    </div>
  );
}

export default function UsageStats() {
  const t = useTranslations("stats");
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "rawModel";
  const sortOrder = searchParams.get("sortOrder") || "asc";

  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [viewMode, setViewMode] = useState("tokens"); // 'tokens' or 'costs'
  const [refreshInterval, setRefreshInterval] = useState(5000); // Start with 5s
  const prevTotalRequestsRef = useRef(0);

  // SortableTableHead (kit) computes the next direction: flip on the active column, "asc" on a
  // new one (defaultDirection) — the rule the legacy header click applied.
  const toggleSort = (field: string, direction: DataTableSortDirection) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", field);
    params.set("sortOrder", direction);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const sortData = useCallback(
    (dataMap: Record<string, any>, pendingMap: Record<string, any> = {}) => {
      return Object.entries(dataMap || {})
        .map(([key, data]: [string, any]) => {
          const totalTokens = (data.promptTokens || 0) + (data.completionTokens || 0);
          const totalCost = data.cost || 0;

          // Calculate cost breakdown (estimated based on token ratio)
          const inputCost =
            totalTokens > 0 ? (data.promptTokens || 0) * (totalCost / totalTokens) : 0;
          const outputCost =
            totalTokens > 0 ? (data.completionTokens || 0) * (totalCost / totalTokens) : 0;

          return {
            ...data,
            key,
            totalTokens,
            totalCost,
            inputCost,
            outputCost,
            pending: pendingMap[key] || 0,
          };
        })
        .sort((a, b) => {
          let valA = a[sortBy];
          let valB = b[sortBy];

          // Handle case-insensitive sorting for strings
          if (typeof valA === "string") valA = valA.toLowerCase();
          if (typeof valB === "string") valB = valB.toLowerCase();

          if (valA < valB) return sortOrder === "asc" ? -1 : 1;
          if (valA > valB) return sortOrder === "asc" ? 1 : -1;
          return 0;
        });
    },
    [sortBy, sortOrder]
  );

  const sortedModels = useMemo(
    () => sortData(stats?.byModel, stats?.pending?.byModel),
    [stats?.byModel, stats?.pending?.byModel, sortData]
  );
  const statsByAccount = stats?.byAccount;
  const statsPendingByAccount = stats?.pending?.byAccount;
  const sortedAccounts = useMemo(() => {
    // For accounts, pendingMap is by connectionId, but dataMap is by accountKey
    // We need to map connectionId pending counts to accountKeys
    const accountPendingMap: Record<string, any> = {};
    if (statsPendingByAccount) {
      Object.entries(statsByAccount || {}).forEach(([accountKey, data]: [string, any]) => {
        const connPending = statsPendingByAccount[data.connectionId];
        if (connPending) {
          // Get modelKey (rawModel (provider))
          const modelKey = data.provider ? `${data.rawModel} (${data.provider})` : data.rawModel;
          accountPendingMap[accountKey] = connPending[modelKey] || 0;
        }
      });
    }
    return sortData(statsByAccount, accountPendingMap);
  }, [statsByAccount, statsPendingByAccount, sortData]);

  // Note: no synchronous setLoading(true) here — `loading` starts as true and the
  // only showLoading=true call happens on mount, so the skeleton is already up.
  const fetchStats = useCallback(async (showLoading = true): Promise<void> => {
    try {
      const res = await fetch("/api/usage/history");
      if (res.ok) {
        const data = await res.json();
        setStats(data);

        // Smart polling: adjust interval based on activity
        const currentTotal = data.totalRequests || 0;
        if (currentTotal > prevTotalRequestsRef.current) {
          // New requests detected - reset to fast polling
          setRefreshInterval(5000);
        } else {
          // No change - increase interval (exponential backoff)
          setRefreshInterval((prev) => Math.min(prev * 2, 60000)); // Max 60s
        }
        prevTotalRequestsRef.current = currentTotal;
      }
    } catch (error) {
      console.error("Failed to fetch usage stats:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const run = async () => {
      await fetchStats();
    };
    run();
  }, [fetchStats]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    let isPageVisible = true;

    // Page Visibility API - pause when tab is hidden
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && autoRefresh) {
        fetchStats(false); // Fetch immediately when tab becomes visible
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (autoRefresh) {
      // Clear any existing interval first
      if (intervalId) clearInterval(intervalId);

      intervalId = setInterval(() => {
        if (isPageVisible) {
          fetchStats(false); // fetch without loading skeleton
        }
      }, refreshInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoRefresh, refreshInterval, fetchStats]);

  if (loading) return <CardSkeleton />;

  if (!stats) return <div className="text-text-muted">{t("failedToLoad")}</div>;

  // Format number with commas — delegated to shared module
  const fmt = (n: number) => fmtFull(n);

  // Format cost with dollar sign and 2 decimals — delegated to shared module

  // Time format for "Last Used"
  const fmtTime = (iso: string) => {
    if (!iso) return t("never");
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return t("justNow");
    if (diffMins < 60) return t("minutesAgo", { count: diffMins });
    if (diffMins < 1440) return t("hoursAgo", { count: Math.floor(diffMins / 60) });
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Auto Refresh Toggle and View Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t("usageOverview")}</h2>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <SegmentedControl
            size="sm"
            value={viewMode}
            onChange={(next) => setViewMode(next as typeof viewMode)}
            options={[
              { value: "tokens", label: t("tokens") },
              { value: "costs", label: t("costs") },
            ]}
          />

          {/* Auto Refresh Toggle */}
          <div className="text-sm font-medium text-text-muted flex items-center gap-2">
            <span>{t("autoRefresh", { seconds: refreshInterval / 1000 })}</span>
            <Toggle
              size="sm"
              checked={autoRefresh}
              onChange={setAutoRefresh}
              ariaLabel={t("toggleAutoRefresh")}
            />
          </div>
        </div>
      </div>

      {/* Active Requests Summary */}
      {(stats.activeRequests || []).length > 0 && (
        <Card className="p-3 border-primary/20 bg-primary/5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t("activeRequests")}
            </div>
            <div className="flex flex-wrap gap-3">
              {stats.activeRequests.map((req) => (
                <div
                  key={`${req.model}-${req.provider}-${req.account}`}
                  className="px-3 py-1.5 rounded-md bg-bg-subtle border border-primary/20 text-xs font-mono shadow-sm"
                >
                  <span className="text-primary font-bold">{req.model}</span>
                  <span className="mx-1 text-text-muted">|</span>
                  <span className="text-text-main">{req.provider}</span>
                  <span className="mx-1 text-text-muted">|</span>
                  <span className="text-text-main font-medium">{req.account}</span>
                  {req.count > 1 && (
                    <span className="ml-2 px-1.5 py-0.5 rounded bg-primary text-accent-foreground font-bold">
                      x{req.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="px-4 py-3 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-sm uppercase font-semibold">
                {t("totalRequests")}
              </span>
              <span className="text-2xl font-bold">{fmt(stats.totalRequests)}</span>
            </div>
            <MiniBarGraph
              data={(stats.last10Minutes || []).map((m) => m.requests)}
              colorClass="bg-text-muted/30"
            />
          </div>
        </Card>
        <Card className="px-4 py-3 flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-text-muted text-sm uppercase font-semibold">
                {t("totalInputTokens")}
              </span>
              <span className="text-2xl font-bold text-primary">
                {fmt(stats.totalPromptTokens)}
              </span>
            </div>
            <MiniBarGraph
              data={(stats.last10Minutes || []).map((m) => m.promptTokens)}
              colorClass="bg-primary/50"
            />
          </div>
        </Card>
        <Card className="px-4 py-2 flex flex-col gap-1">
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-text-muted text-sm uppercase font-semibold">
                {t("outputTokens")}
              </span>
              <span className="text-2xl font-bold text-success">
                {fmt(stats.totalCompletionTokens)}
              </span>
            </div>
            <div className="w-px bg-border self-stretch mx-2" />
            <div className="flex flex-col gap-1 flex-1">
              <span className="text-text-muted text-sm uppercase font-semibold">
                {t("totalCost")}
              </span>
              <span className="text-2xl font-bold text-warning">{fmtCost(stats.totalCost)}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* {t("usageByModel")} Table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border bg-bg-subtle/50">
          <h3 className="font-semibold">{t("usageByModel")}</h3>
        </div>
        <Table containerClassName="rounded-none border-0" className="text-sm text-left">
          <TableHeader>
            <TableRow>
              <SortableTableHead
                className="px-6 py-3"
                defaultDirection="asc"
                direction={
                  sortBy === "rawModel" ? (sortOrder as DataTableSortDirection) : undefined
                }
                onDirectionChange={(direction) => toggleSort("rawModel", direction)}
              >
                {t("model")}
              </SortableTableHead>
              <SortableTableHead
                className="px-6 py-3"
                defaultDirection="asc"
                direction={
                  sortBy === "provider" ? (sortOrder as DataTableSortDirection) : undefined
                }
                onDirectionChange={(direction) => toggleSort("provider", direction)}
              >
                {t("provider")}
              </SortableTableHead>
              <SortableTableHead
                align="right"
                className="px-6 py-3"
                defaultDirection="asc"
                direction={
                  sortBy === "requests" ? (sortOrder as DataTableSortDirection) : undefined
                }
                onDirectionChange={(direction) => toggleSort("requests", direction)}
              >
                {t("requests")}
              </SortableTableHead>
              <SortableTableHead
                align="right"
                className="px-6 py-3"
                defaultDirection="asc"
                direction={
                  sortBy === "lastUsed" ? (sortOrder as DataTableSortDirection) : undefined
                }
                onDirectionChange={(direction) => toggleSort("lastUsed", direction)}
              >
                {t("lastUsed")}
              </SortableTableHead>
              {viewMode === "tokens" ? (
                <>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "promptTokens" ? (sortOrder as DataTableSortDirection) : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("promptTokens", direction)}
                  >
                    {t("inputTokens")}
                  </SortableTableHead>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "completionTokens"
                        ? (sortOrder as DataTableSortDirection)
                        : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("completionTokens", direction)}
                  >
                    {t("outputTokens")}
                  </SortableTableHead>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "totalTokens" ? (sortOrder as DataTableSortDirection) : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("totalTokens", direction)}
                  >
                    {t("totalTokens")}
                  </SortableTableHead>
                </>
              ) : (
                <>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "promptTokens" ? (sortOrder as DataTableSortDirection) : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("promptTokens", direction)}
                  >
                    {t("inputCost")}
                  </SortableTableHead>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "completionTokens"
                        ? (sortOrder as DataTableSortDirection)
                        : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("completionTokens", direction)}
                  >
                    {t("outputCost")}
                  </SortableTableHead>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "cost" ? (sortOrder as DataTableSortDirection) : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("cost", direction)}
                  >
                    {t("totalCost")}
                  </SortableTableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedModels.map((data) => (
              <TableRow key={data.key}>
                <TableCell
                  className={`px-6 py-3 font-medium transition-colors ${
                    data.pending > 0 ? "text-primary" : ""
                  }`}
                >
                  {data.rawModel}
                </TableCell>
                <TableCell className="px-6 py-3">
                  <Badge variant={data.pending > 0 ? "primary" : "default"} size="sm">
                    {data.provider}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-3 text-right">{fmt(data.requests)}</TableCell>
                <TableCell className="px-6 py-3 text-right text-text-muted whitespace-nowrap">
                  {fmtTime(data.lastUsed)}
                </TableCell>
                {viewMode === "tokens" ? (
                  <>
                    <TableCell className="px-6 py-3 text-right text-text-muted">
                      {fmt(data.promptTokens)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-right text-text-muted">
                      {fmt(data.completionTokens)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-right font-medium">
                      {fmt(data.totalTokens)}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="px-6 py-3 text-right text-text-muted">
                      {fmtCost(data.inputCost)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-right text-text-muted">
                      {fmtCost(data.outputCost)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-right font-medium text-warning">
                      {fmtCost(data.totalCost)}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
            {sortedModels.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="px-6 py-8 text-center text-text-muted">
                  {t("noUsageData")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* {t("usageByAccount")} Table */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b border-border bg-bg-subtle/50">
          <h3 className="font-semibold">{t("usageByAccount")}</h3>
        </div>
        <Table containerClassName="rounded-none border-0" className="text-sm text-left">
          <TableHeader>
            <TableRow>
              <SortableTableHead
                className="px-6 py-3"
                defaultDirection="asc"
                direction={
                  sortBy === "rawModel" ? (sortOrder as DataTableSortDirection) : undefined
                }
                onDirectionChange={(direction) => toggleSort("rawModel", direction)}
              >
                {t("model")}
              </SortableTableHead>
              <SortableTableHead
                className="px-6 py-3"
                defaultDirection="asc"
                direction={
                  sortBy === "provider" ? (sortOrder as DataTableSortDirection) : undefined
                }
                onDirectionChange={(direction) => toggleSort("provider", direction)}
              >
                {t("provider")}
              </SortableTableHead>
              <SortableTableHead
                className="px-6 py-3"
                defaultDirection="asc"
                direction={
                  sortBy === "accountName" ? (sortOrder as DataTableSortDirection) : undefined
                }
                onDirectionChange={(direction) => toggleSort("accountName", direction)}
              >
                {t("account")}
              </SortableTableHead>
              <SortableTableHead
                align="right"
                className="px-6 py-3"
                defaultDirection="asc"
                direction={
                  sortBy === "requests" ? (sortOrder as DataTableSortDirection) : undefined
                }
                onDirectionChange={(direction) => toggleSort("requests", direction)}
              >
                {t("requests")}
              </SortableTableHead>
              <SortableTableHead
                align="right"
                className="px-6 py-3"
                defaultDirection="asc"
                direction={
                  sortBy === "lastUsed" ? (sortOrder as DataTableSortDirection) : undefined
                }
                onDirectionChange={(direction) => toggleSort("lastUsed", direction)}
              >
                {t("lastUsed")}
              </SortableTableHead>
              {viewMode === "tokens" ? (
                <>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "promptTokens" ? (sortOrder as DataTableSortDirection) : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("promptTokens", direction)}
                  >
                    {t("inputTokens")}
                  </SortableTableHead>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "completionTokens"
                        ? (sortOrder as DataTableSortDirection)
                        : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("completionTokens", direction)}
                  >
                    {t("outputTokens")}
                  </SortableTableHead>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "totalTokens" ? (sortOrder as DataTableSortDirection) : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("totalTokens", direction)}
                  >
                    {t("totalTokens")}
                  </SortableTableHead>
                </>
              ) : (
                <>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "promptTokens" ? (sortOrder as DataTableSortDirection) : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("promptTokens", direction)}
                  >
                    {t("inputCost")}
                  </SortableTableHead>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "completionTokens"
                        ? (sortOrder as DataTableSortDirection)
                        : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("completionTokens", direction)}
                  >
                    {t("outputCost")}
                  </SortableTableHead>
                  <SortableTableHead
                    align="right"
                    className="px-6 py-3"
                    defaultDirection="asc"
                    direction={
                      sortBy === "cost" ? (sortOrder as DataTableSortDirection) : undefined
                    }
                    onDirectionChange={(direction) => toggleSort("cost", direction)}
                  >
                    {t("totalCost")}
                  </SortableTableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAccounts.map((data) => (
              <TableRow key={data.key}>
                <TableCell
                  className={`px-6 py-3 font-medium transition-colors ${
                    data.pending > 0 ? "text-primary" : ""
                  }`}
                >
                  {data.rawModel}
                </TableCell>
                <TableCell className="px-6 py-3">
                  <Badge variant={data.pending > 0 ? "primary" : "default"} size="sm">
                    {data.provider}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-3">
                  <span
                    className={`font-medium transition-colors ${
                      data.pending > 0 ? "text-primary" : ""
                    }`}
                  >
                    {data.accountName ||
                      t("accountLabel", { id: `${data.connectionId?.slice(0, 8)}...` })}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-3 text-right">{fmt(data.requests)}</TableCell>
                <TableCell className="px-6 py-3 text-right text-text-muted whitespace-nowrap">
                  {fmtTime(data.lastUsed)}
                </TableCell>
                {viewMode === "tokens" ? (
                  <>
                    <TableCell className="px-6 py-3 text-right text-text-muted">
                      {fmt(data.promptTokens)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-right text-text-muted">
                      {fmt(data.completionTokens)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-right font-medium">
                      {fmt(data.totalTokens)}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell className="px-6 py-3 text-right text-text-muted">
                      {fmtCost(data.inputCost)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-right text-text-muted">
                      {fmtCost(data.outputCost)}
                    </TableCell>
                    <TableCell className="px-6 py-3 text-right font-medium text-warning">
                      {fmtCost(data.totalCost)}
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
            {sortedAccounts.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="px-6 py-8 text-center text-text-muted">
                  {t("noAccountUsage")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
