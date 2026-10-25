"use client";

import Icon from "@/shared/components/Icon";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@omniroute/ui-kit/table";
import { DataTableShell, SortableTableHead } from "@omniroute/ui-kit/data-table-shell";
import { TableLoadingState } from "@omniroute/ui-kit/table-loading";
import { cn } from "@/shared/utils/cn";
import Badge from "./Badge";
import Button from "./Button";
import ColumnToggle from "./ColumnToggle";
import EmptyState from "./EmptyState";
import Input from "./Input";
import Select from "./Select";
import RequestLoggerDetail from "./RequestLoggerDetail";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { PROVIDER_COLORS, getProtocolColor } from "@/shared/constants/colors";
import {
  formatTime,
  formatDuration,
  maskAccount,
  stableAccountSuffix,
  formatApiKeyLabel,
  formatCachePercentage,
} from "@/shared/utils/formatting";
import { getProviderDisplayLabel } from "@/shared/utils/providerDisplayLabel";
import { mergeLogFilterOptions } from "@/shared/utils/logFilterOptions";
import { buildLogTpsTitle, computeLogTps } from "@/shared/utils/logTps";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import {
  computeLogsSignature,
  shouldAutoRefresh,
  shouldTriggerInfiniteScroll,
} from "./requestLoggerSignature";
import { getResilienceBadges } from "./requestLoggerResilience";
import {
  DEFAULT_REFRESH_INTERVAL_SEC,
  clampRefreshIntervalSec,
  readSavedRefreshIntervalSec,
  writeSavedRefreshIntervalSec,
} from "./requestLoggerPreferences";

// Number of call-log rows fetched per page. The viewer grows its window by this
// amount on "Load more" / infinite scroll so users can browse past the first
// page (previously hardcoded to a single 300-row window). See #2565.
// Reduced from 300 → 50 to avoid browser freeze and network saturation.
const PAGE_SIZE = 50;

// Column sort toggle mapping: clicking a column header toggles asc/desc.
const COLUMN_SORT_MAP = {
  status: { desc: "status_desc", asc: "status_asc" },
  model: { desc: "model_desc", asc: "model_asc" },
  tokens: { desc: "tokens_desc", asc: "tokens_asc" },
  tps: { desc: "tps_desc", asc: "tps_asc" },
  duration: { desc: "duration_desc", asc: "duration_asc" },
  time: { desc: "newest", asc: "oldest" },
} as const;

function getLogTotalTokens(log) {
  return (log?.tokens?.in || 0) + (log?.tokens?.out || 0);
}

// #13130: generation-time TPS (duration - TTFT, reasoning-aware); see logTps.ts.
function getLogTps(log): number {
  return computeLogTps(log?.tokens?.out, log?.tokens?.reasoning, log?.duration, log?.ttft);
}

function formatTps(tps: number): string {
  if (tps <= 0) return "—";
  if (tps >= 100) return Math.round(tps).toLocaleString();
  return tps.toFixed(1);
}

function getCacheSourceMeta(cacheSource: unknown) {
  if (cacheSource === "semantic") {
    return { key: "semantic", variant: "success" as const };
  }
  return { key: "upstream", variant: "info" as const };
}

// HTTP status → kit Badge tone (2xx success, 4xx warning, 5xx error, 0 = pending).
function httpStatusTone(status: number) {
  if (status >= 200 && status < 300) return "success" as const;
  if (status >= 400 && status < 500) return "warning" as const;
  if (status >= 500) return "error" as const;
  if (status === 0) return "info" as const;
  return "default" as const;
}

export interface RequestLoggerV2Handle {
  openDetail: (logEntry: any) => void;
  getSortedLogs: () => any[];
}

type RequestLoggerV2InitialProps = {
  initialSelectedId?: string;
  initialCorrelationId?: string;
};
const RequestLoggerV2 = forwardRef<RequestLoggerV2Handle, RequestLoggerV2InitialProps>(
  (props, ref) => {
    const { initialSelectedId, initialCorrelationId } = props;
    const t = useTranslations("requestLogger");
    const tCache = useTranslations("cache");
    const tCommon = useTranslations("common");
    const { emailsVisible } = useEmailPrivacyStore();

    // Get translated status filters
    const statusFilters = useMemo(
      () => [
        { key: "all", label: t("statusFilters.all"), icon: "" },
        { key: "error", label: t("statusFilters.error"), icon: "error" },
        { key: "ok", label: t("statusFilters.success"), icon: "check_circle" },
        { key: "combo", label: t("statusFilters.combo"), icon: "hub" },
      ],
      [t]
    );

    // Get translated columns
    const columns = useMemo(
      () => [
        { key: "status", label: t("columns.status") },
        { key: "cacheSource", label: t("columns.cacheSource") },
        { key: "model", label: t("columns.model") },
        { key: "requestedModel", label: t("columns.requested") },
        { key: "provider", label: t("columns.provider") },
        { key: "protocol", label: t("columns.protocol") },
        { key: "account", label: t("columns.account") },
        { key: "apiKey", label: t("columns.apiKey") },
        { key: "combo", label: t("columns.combo") },
        { key: "tokens", label: t("columns.tokens") },
        { key: "tps", label: t("columns.tps") },
        { key: "ttft", label: t("columns.ttft") },
        { key: "duration", label: t("columns.duration") },
        { key: "addedWait", label: t("columns.addedWait") },
        { key: "time", label: t("columns.time") },
        { key: "conversation", label: t("columns.conversation") },
      ],
      [t]
    );

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recording, setRecording] = useState(true);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedModel, setSelectedModel] = useState("");
    const [selectedAccount, setSelectedAccount] = useState("");
    const [selectedProvider, setSelectedProvider] = useState("");
    const [selectedApiKey, setSelectedApiKey] = useState("");
    const [sortBy, setSortBy] = useState("newest");
    const [selectedLog, setSelectedLog] = useState(null);
    const [correlationIdFilter, setCorrelationIdFilter] = useState(
      () => initialCorrelationId ?? ""
    );
    const [hoveredCid, setHoveredCid] = useState<string | null>(null);
    const [groupedView, setGroupedView] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);

    const toggleSort = useCallback((column: string) => {
      const mapping = COLUMN_SORT_MAP[column as keyof typeof COLUMN_SORT_MAP];
      if (!mapping) return;
      setSortBy((prev) => {
        if (prev === mapping.desc) return mapping.asc;
        return mapping.desc;
      });
    }, []);
    const [detailData, setDetailData] = useState(null);
    const [detailLoggingEnabled, setDetailLoggingEnabled] = useState(false);
    const [detailLoggingLoading, setDetailLoggingLoading] = useState(false);
    const [limit, setLimit] = useState(PAGE_SIZE);
    const [hasMore, setHasMore] = useState(false);
    const [refreshIntervalSec, setRefreshIntervalSec] = useState(DEFAULT_REFRESH_INTERVAL_SEC);
    const intervalRef = useRef(null);
    const refreshIntervalSecRef = useRef(DEFAULT_REFRESH_INTERVAL_SEC);
    const detailRequestRef = useRef("");
    const hasLoadedRef = useRef(false);
    const logsSignatureRef = useRef("");
    // The kit Table's container (the table element's parent) is the scroll viewport; it only exists
    // while rows are rendered, so it is tracked as state for the scroll/observer effects.
    const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
    const tableRef = useCallback((table: HTMLTableElement | null) => {
      setScrollContainer(table?.parentElement ?? null);
    }, []);
    const loadMoreSentinelRef = useRef(null);
    const hasScrolledRef = useRef(false);
    const [providerNodes, setProviderNodes] = useState([]);
    const [serverFilterOptions, setServerFilterOptions] = useState(null);
    const visibleRef = useRef(true);
    // Set when handlePrev/handleNext hits the edge of the (possibly stale —
    // list polling pauses while a detail modal is open) in-memory list, so we
    // can tell a genuine "no more items" from "more items landed in the
    // background while the modal was open and we just haven't fetched them
    // yet" before giving up and closing the modal.
    const pendingBoundaryNavRef = useRef<null | "prev" | "next">(null);

    const [visibleColumns, setVisibleColumns] = useState(() => {
      const defaultVisible = Object.fromEntries(columns.map((c) => [c.key, true]));
      // #13130: TTFT is only recorded for streaming calls written after the
      // ttft_ms migration, so most rows show "—"; opt-in column, not default.
      defaultVisible.ttft = false;
      if (globalThis.window === undefined) return defaultVisible;
      try {
        const saved = localStorage.getItem("loggerVisibleColumns");
        return saved ? { ...defaultVisible, ...JSON.parse(saved) } : defaultVisible;
      } catch {
        return defaultVisible;
      }
    });

    const toggleColumn = useCallback((key) => {
      setVisibleColumns((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        try {
          localStorage.setItem("loggerVisibleColumns", JSON.stringify(next));
        } catch {}
        return next;
      });
    }, []);

    useEffect(() => {
      const saved = readSavedRefreshIntervalSec();
      refreshIntervalSecRef.current = saved;
      setRefreshIntervalSec(saved);
    }, []);

    useEffect(() => {
      refreshIntervalSecRef.current = refreshIntervalSec;
    }, [refreshIntervalSec]);

    const updateRefreshIntervalSec = useCallback(
      (valueOrUpdater: number | ((current: number) => number)) => {
        const current = refreshIntervalSecRef.current;
        const rawValue =
          typeof valueOrUpdater === "function" ? valueOrUpdater(current) : valueOrUpdater;
        const next = clampRefreshIntervalSec(rawValue);
        refreshIntervalSecRef.current = next;
        writeSavedRefreshIntervalSec(next);
        setRefreshIntervalSec(next);
      },
      []
    );

    const fetchLogs = useCallback(
      async (showLoading = false) => {
        if (showLoading) setLoading(true);
        try {
          const params = new URLSearchParams();
          if (search) params.set("search", search);
          if (activeFilter === "error") params.set("status", "error");
          if (activeFilter === "ok") params.set("status", "ok");
          if (activeFilter === "combo") params.set("combo", "1");
          if (selectedModel) params.set("model", selectedModel);
          if (selectedProvider) params.set("provider", selectedProvider);
          if (selectedAccount) params.set("account", selectedAccount);
          if (selectedApiKey) params.set("apiKey", selectedApiKey);
          if (correlationIdFilter) params.set("correlationId", correlationIdFilter);
          params.set("limit", String(limit));

          const res = await fetch(`/api/usage/call-logs?${params}`);
          if (res.ok) {
            const data = await res.json();
            // If the server returned a full window, more rows may exist beyond it.
            setHasMore(Array.isArray(data) && data.length >= limit);
            // Skip re-render if data hasn't changed (#1369 GPU perf). The signature
            // captures id + status + duration + tokens_out so in-progress updates
            // still re-render while identical snapshots are skipped.
            const sig = computeLogsSignature(data);
            if (sig !== logsSignatureRef.current) {
              logsSignatureRef.current = sig;
              setLogs(data);
            }
          }
        } catch (error) {
          console.error("Failed to fetch call logs:", error);
        } finally {
          if (showLoading) setLoading(false);
        }
      },
      [
        search,
        activeFilter,
        selectedModel,
        selectedAccount,
        selectedProvider,
        selectedApiKey,
        correlationIdFilter,
        limit,
      ]
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

    // Dropdown options come from the whole call_logs table + configured API keys, not
    // just the loaded page — otherwise a value with no row in view cannot be picked.
    useEffect(() => {
      fetch("/api/usage/call-logs/filters")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d) setServerFilterOptions(d);
        })
        .catch(() => {});
    }, []);

    useEffect(() => {
      fetch("/api/logs/detail?limit=1")
        .then(async (res) => {
          if (!res.ok) return null;
          return await res.json();
        })
        .then((data) => {
          if (!data) return;
          setDetailLoggingEnabled(data.enabled === true);
        })
        .catch(() => {});
    }, []);

    // Visibility-aware auto-refresh: pause polling when tab is hidden or user has
    // scrolled past the first page, or when a detail modal is open.
    useEffect(() => {
      const onVisibility = () => {
        const isVisible = document.visibilityState === "visible";
        visibleRef.current = isVisible;
        if (isVisible && !selectedLog && shouldAutoRefresh(recording, limit, PAGE_SIZE)) {
          fetchLogs(false);
        }
      };
      // #4133: re-arm on window focus. Embedded / proxied hosts (Docker dashboard
      // wrappers, webviews) can fire a one-shot `visibilitychange` → hidden and
      // then keep reporting "hidden" — or recover without firing the event again —
      // which left `visibleRef` stuck `false` and froze auto-refresh permanently
      // (the "still not refreshing on 3.8.28, works on 3.8.24" report). A window
      // `focus` is a reliable signal the page is actively viewed, so re-arm and
      // poll. A genuinely backgrounded tab never receives focus, so this does not
      // defeat the perf pause.
      const onFocus = () => {
        visibleRef.current = true;
        if (!selectedLog && shouldAutoRefresh(recording, limit, PAGE_SIZE)) {
          fetchLogs(false);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("focus", onFocus);
      return () => {
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("focus", onFocus);
      };
    }, [recording, limit, fetchLogs, selectedLog]);

    useEffect(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!selectedLog && shouldAutoRefresh(recording, limit, PAGE_SIZE)) {
        intervalRef.current = setInterval(() => {
          // #3972/#4054/#4133: poll while the page is plausibly viewed — the
          // event-tracked `visibleRef` (fail-open) OR a *live* `visibilityState`
          // read. A real background tab has both false → pause (perf); an
          // embedded host that misreports "hidden" keeps polling instead of
          // freezing. The window-`focus` re-arm above covers a host pinned
          // "hidden" while focused.
          if (visibleRef.current || document.visibilityState === "visible") {
            fetchLogs(false);
          }
        }, refreshIntervalSec * 1000);
      }
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [recording, fetchLogs, limit, refreshIntervalSec, selectedLog]);

    // Reset the window back to the first page whenever the active filters change,
    // so switching filters doesn't keep fetching a large expanded window.
    useEffect(() => {
      setLimit(PAGE_SIZE);
      // #4269: a filter change is a fresh first-page view — re-arm the ghost-load-more
      // guard so auto-refresh resumes until the user scrolls again.
      hasScrolledRef.current = false;
    }, [
      search,
      activeFilter,
      selectedModel,
      selectedAccount,
      selectedProvider,
      selectedApiKey,
      correlationIdFilter,
    ]);

    const loadMore = useCallback(() => {
      setLimit((prev) => prev + PAGE_SIZE);
    }, []);

    // #4269: record the first genuine user scroll of the log list. Until then, the
    // infinite-scroll observer below must NOT grow the window (see
    // shouldTriggerInfiniteScroll) — otherwise a sentinel that is already visible on
    // mount fires a "ghost" loadMore and permanently pauses auto-refresh.
    useEffect(() => {
      const root = scrollContainer;
      if (!root) return;
      const onScroll = () => {
        if (root.scrollTop > 0) hasScrolledRef.current = true;
      };
      root.addEventListener("scroll", onScroll, { passive: true });
      return () => root.removeEventListener("scroll", onScroll);
    }, [scrollContainer]);

    // Infinite scroll: grow the window when the sentinel near the bottom of the
    // scroll container becomes visible — but only after a real user scroll (#4269).
    useEffect(() => {
      const sentinel = loadMoreSentinelRef.current;
      const root = scrollContainer;
      if (!sentinel || !hasMore) return;
      const observer = new IntersectionObserver(
        (entries) => {
          if (
            shouldTriggerInfiniteScroll({
              isIntersecting: !!entries[0]?.isIntersecting,
              hasMore,
              loading,
              hasScrolled: hasScrolledRef.current,
            })
          ) {
            loadMore();
          }
        },
        { root, rootMargin: "200px" }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }, [hasMore, loading, loadMore, scrollContainer]);

    const filteredLogs = useMemo(() => {
      let arr = logs;

      // Status filter
      if (activeFilter === "error") {
        arr = arr.filter((l) => l.status >= 400);
      } else if (activeFilter === "ok") {
        arr = arr.filter((l) => l.status >= 200 && l.status < 300);
      } else if (activeFilter === "combo") {
        arr = arr.filter((l) => l.comboName);
      }

      return arr;
    }, [logs, activeFilter]);

    // Grouped view: deduplicate by correlationId, keeping only the latest per group.
    // Rows without a correlationId are always shown.
    const dedupedLogs = useMemo(() => {
      if (!groupedView) return filteredLogs;
      const byCid = new Map<string, (typeof filteredLogs)[0]>();
      const noCid: typeof filteredLogs = [];
      for (const log of filteredLogs) {
        const cid = log.correlationId;
        if (!cid) {
          noCid.push(log);
          continue;
        }
        const existing = byCid.get(cid);
        if (
          !existing ||
          new Date(log.timestamp).getTime() > new Date(existing.timestamp).getTime()
        ) {
          byCid.set(cid, log);
        }
      }
      return [...noCid, ...byCid.values()];
    }, [filteredLogs, groupedView]);

    const sortedLogs = useMemo(() => {
      const arr = [...dedupedLogs];

      arr.sort((a, b) => {
        switch (sortBy) {
          case "oldest":
            return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          case "tokens_desc":
            return getLogTotalTokens(b) - getLogTotalTokens(a);
          case "tokens_asc":
            return getLogTotalTokens(a) - getLogTotalTokens(b);
          case "duration_desc":
            return (b.duration || 0) - (a.duration || 0);
          case "duration_asc":
            return (a.duration || 0) - (b.duration || 0);
          case "tps_desc":
            return getLogTps(b) - getLogTps(a);
          case "tps_asc":
            return getLogTps(a) - getLogTps(b);
          case "status_desc":
            return (b.status || 0) - (a.status || 0);
          case "status_asc":
            return (a.status || 0) - (b.status || 0);
          case "model_asc":
            return (a.model || "").localeCompare(b.model || "");
          case "model_desc":
            return (b.model || "").localeCompare(a.model || "");
          case "newest":
          default:
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        }
      });

      return arr;
    }, [dedupedLogs, sortBy]);

    // Group by correlationId: mark retries as children so they render indented
    // under the first request in each group. Compute group health:
    //   "healed"  — at least one failure followed by a success
    //   "failed"  — all attempts failed
    //   null      — single request or all succeeded
    const groupedLogs = useMemo(() => {
      const cidGroups = new Map();
      for (const log of sortedLogs) {
        const cid = log.correlationId;
        if (cid) {
          if (!cidGroups.has(cid)) cidGroups.set(cid, []);
          cidGroups.get(cid).push(log);
        }
      }
      return sortedLogs.map((log) => {
        const cid = log.correlationId;
        if (!cid) return { ...log, isRetry: false, groupSize: 1, groupStatus: null };
        const group = cidGroups.get(cid);
        if (!group || group.length <= 1)
          return { ...log, isRetry: false, groupSize: 1, groupStatus: null };
        const isFirst = group[0].id === log.id;
        const hasFailure = group.some((g) => g.status >= 400 || g.active);
        const hasSuccess = group.some((g) => g.status >= 200 && g.status < 300);
        const groupStatus = hasFailure && hasSuccess ? "healed" : hasFailure ? "failed" : null;
        return { ...log, isRetry: !isFirst, groupSize: group.length, groupStatus };
      });
    }, [sortedLogs]);

    // Fetch log detail from the persisted call-log endpoint. If a deep-linked
    // request is still being finalized, keep the modal open and poll this same
    // endpoint until the row appears.
    const router = useRouter();

    const closeDetail = useCallback(() => {
      detailRequestRef.current = "";
      setSelectedLog(null);
      setDetailData(null);
      try {
        // remove id param when closing detail
        const url = new URL(globalThis.location.href);
        url.searchParams.delete("id");
        router.replace(url.pathname + url.search, { scroll: false });
      } catch (e) {
        // ignore navigation errors
      }
    }, [router]);

    const openDetail = useCallback(
      async (logEntry) => {
        // Guard: if no valid id provided, close instead of opening an empty modal
        if (!logEntry?.id) {
          try {
            closeDetail();
          } catch {}
          return;
        }

        const requestToken = `${logEntry.id}:${Date.now()}:${Math.random()}`;
        detailRequestRef.current = requestToken;
        const isCurrentDetailRequest = () => detailRequestRef.current === requestToken;

        setSelectedLog(logEntry);
        try {
          const url = new URL(globalThis.location.href);
          url.searchParams.set("id", logEntry.id);
          router.replace(url.pathname + url.search, { scroll: false });
        } catch (e) {
          // ignore navigation errors
        }
        setDetailLoading(true);
        setDetailData(null);
        try {
          const res = await fetch(`/api/logs/${logEntry.id}`, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (!isCurrentDetailRequest()) return;
            const dataHasPipeline =
              data?.pipelinePayloads && Object.keys(data.pipelinePayloads || {}).length > 0;
            setDetailData((prev: { pipelinePayloads: any }) => ({
              ...prev,
              ...data,
              pipelinePayloads: dataHasPipeline ? data.pipelinePayloads : prev?.pipelinePayloads,
            }));
            // ensure the modal summary reflects the fetched call log summary
            if (data && typeof data === "object") {
              setSelectedLog((prev: any) => ({
                ...prev,
                ...data,
                active: data.active === true,
              }));
            }
          } else {
            // A deep-linked id can legitimately 404 while the request is still
            // finalizing. Keep the modal open and poll /api/logs/[id] instead of
            // falling back to an in-memory active-request endpoint.
            if (!isCurrentDetailRequest()) return;
            if (res.status === 404) {
              if (logEntry.pendingLookup || logEntry.active) {
                setSelectedLog((prev: { method: any; path: any }) => ({
                  ...prev,
                  id: logEntry.id,
                  status: 0,
                  method: prev?.method,
                  path: prev?.path || "",
                }));
                setDetailData({ detailState: "pending" });
                return;
              }
              try {
                console.warn("Log not found:", logEntry.id);
              } catch {}
              try {
                closeDetail();
              } catch {}
              return;
            }
            // other errors: show a minimal error indicator by setting detailData to an error object
            try {
              const body = await res.text().catch(() => null);
              if (!isCurrentDetailRequest()) return;
              setDetailData({ error: `Failed to fetch log (status ${res.status})`, body });
            } catch {}
          }
        } catch (error) {
          console.error("Failed to fetch log detail:", error);
        } finally {
          if (isCurrentDetailRequest()) setDetailLoading(false);
        }
      },
      [closeDetail, router]
    );

    const sortedLogsForNav = useMemo(() => sortedLogs, [sortedLogs]);

    useImperativeHandle(
      ref,
      () => ({
        openDetail,
        getSortedLogs: () => sortedLogsForNav,
      }),
      [openDetail, sortedLogsForNav]
    );

    // If the page provided an initialSelectedId (via ?id=), open it on mount.
    // Guard with a ref so subsequent URL updates (close -> replace) don't re-open the modal.
    const initialOpenedRef = useRef(false);
    useEffect(() => {
      if (initialSelectedId && !initialOpenedRef.current) {
        initialOpenedRef.current = true;
        openDetail({ id: initialSelectedId, pendingLookup: true })
          .then((r) => r)
          .catch((error_) => {
            console.error("Failed to open initial log id:", error_);
          });
      }
    }, [initialSelectedId, openDetail]);

    useEffect(() => {
      const isActive = selectedLog?.active === true;
      if (!selectedLog?.id || !isActive) return;
      let cancelled = false;
      let graceCount = 0;
      const interval = setInterval(async () => {
        if (document.visibilityState !== "visible") return;
        try {
          const res = await fetch(`/api/logs/${selectedLog.id}`, { cache: "no-store" });
          if (cancelled) return;
          if (res.status === 404) {
            if (isActive) return;
            clearInterval(interval);
            return;
          }
          if (res.ok) {
            const data = await res.json();
            const stillActive = data.active === true;
            setDetailData((prev: { pipelinePayloads: any }) => ({
              ...prev,
              ...data,
              pipelinePayloads: data?.pipelinePayloads || prev?.pipelinePayloads,
            }));
            setSelectedLog((prev: any) => ({
              ...prev,
              ...data,
              active: stillActive,
            }));
            if (!stillActive) {
              graceCount++;
              if (graceCount >= 3) clearInterval(interval);
            }
          }
        } catch {
          // keep waiting; the detail endpoint is the single source of truth
        }
      }, 1000);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }, [selectedLog?.id, detailData?.detailState, selectedLog?.active, fetchLogs]);

    // Poll for related logs (same correlationId) while the detail modal is open.
    // This ensures newly completed retries appear without closing the modal.
    useEffect(() => {
      const cid = selectedLog?.correlationId;
      if (!selectedLog?.id || !cid) return;
      let cancelled = false;
      const interval = setInterval(async () => {
        if (document.visibilityState !== "visible") return;
        try {
          const res = await fetch(`/api/usage/call-logs?correlationId=${encodeURIComponent(cid)}`, {
            cache: "no-store",
          });
          if (cancelled || !res.ok) return;
          const cidLogs = await res.json();
          if (!Array.isArray(cidLogs) || cidLogs.length === 0) return;
          setLogs((prev) => {
            const ids = new Set(cidLogs.map((l: any) => l.id));
            let changed = false;
            const merged = prev.map((l: any) => {
              const updated = cidLogs.find((c: any) => c.id === l.id);
              if (updated) {
                changed = true;
                return { ...l, ...updated };
              }
              return l;
            });
            for (const cl of cidLogs) {
              if (!merged.some((m: any) => m.id === cl.id)) {
                merged.push(cl);
                changed = true;
              }
            }
            return changed ? merged : prev;
          });
        } catch {
          /* poll failed — non-critical */
        }
      }, 3000);
      return () => {
        cancelled = true;
        clearInterval(interval);
      };
    }, [selectedLog?.id, selectedLog?.correlationId]);

    const currentLogIndex = useMemo(() => {
      if (!selectedLog) return -1;
      return sortedLogsForNav.findIndex((l) => l.id === selectedLog.id);
    }, [selectedLog, sortedLogsForNav]);

    const handlePrev = useCallback(() => {
      const idx = currentLogIndex;
      const target = idx > 0 ? sortedLogsForNav[idx - 1] : null;
      if (target?.id) {
        openDetail(target)
          .then((r) => r)
          .catch((error_) => {
            console.error("Failed to open previous log id:", error_);
          });
      } else {
        // List polling pauses while the modal is open (#background list can
        // go stale), so hitting the edge of the in-memory array doesn't mean
        // there's really nothing newer — resync once and let the effect below
        // decide, instead of assuming this is the last item and closing.
        pendingBoundaryNavRef.current = "prev";
        fetchLogs(false);
      }
    }, [currentLogIndex, sortedLogsForNav, fetchLogs, openDetail]);

    const handleNext = useCallback(() => {
      const idx = currentLogIndex;
      const target =
        idx >= 0 && idx < sortedLogsForNav.length - 1 ? sortedLogsForNav[idx + 1] : null;
      if (target?.id) {
        openDetail(target)
          .then((r) => r)
          .catch((error_) => {
            console.error("Failed to open previous log id:", error_);
          });
      } else {
        pendingBoundaryNavRef.current = "next";
        fetchLogs(false);
      }
    }, [currentLogIndex, sortedLogsForNav, fetchLogs, openDetail]);

    // Resolves a pending boundary nav (see handlePrev/handleNext) once a
    // triggered fetchLogs() resync has landed in sortedLogsForNav. Only fires
    // when a boundary nav is actually pending, so this is a no-op on the
    // normal (paused-while-modal-open) list-update cadence.
    useEffect(() => {
      const direction = pendingBoundaryNavRef.current;
      if (!direction || !selectedLog) return;
      pendingBoundaryNavRef.current = null;
      const idx = sortedLogsForNav.findIndex((l) => l.id === selectedLog.id);
      const target =
        direction === "prev"
          ? idx > 0
            ? sortedLogsForNav[idx - 1]
            : null
          : idx >= 0 && idx < sortedLogsForNav.length - 1
            ? sortedLogsForNav[idx + 1]
            : null;
      if (target?.id) {
        openDetail(target)
          .then((r) => r)
          .catch((error_) => {
            console.error("Failed to open adjacent log id:", error_);
          });
      } else {
        closeDetail();
      }
      // openDetail/closeDetail are plain functions re-created every render
      // (same as handlePrev/handleNext above and the rest of this file) —
      // listing them would re-fire this effect on every render instead of
      // only when sortedLogsForNav/selectedLog actually change.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortedLogsForNav, selectedLog]);

    const toggleDetailLogging = async () => {
      setDetailLoggingLoading(true);
      try {
        const nextEnabled = !detailLoggingEnabled;
        const res = await fetch("/api/logs/detail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enabled: nextEnabled }),
        });
        if (!res.ok) throw new Error(t("updatePipelineFailed"));
        setDetailLoggingEnabled(nextEnabled);
      } catch (error) {
        console.error("Failed to toggle pipeline logging:", error);
      } finally {
        setDetailLoggingLoading(false);
      }
    };

    const filterOptions = useMemo(
      () => mergeLogFilterOptions(serverFilterOptions, serverFilterOptions?.configuredKeys, logs),
      [serverFilterOptions, logs]
    );
    const uniqueAccounts = filterOptions.accounts;
    const uniqueModels = filterOptions.models;
    const uniqueProviders = filterOptions.providers;
    // Quick-filter chips stay on the loaded rows: one chip per provider ever logged
    // (including deleted compatible nodes) would flood the toolbar.
    const loadedProviders = useMemo(
      () => mergeLogFilterOptions(null, null, logs).providers,
      [logs]
    );
    const apiKeyOptions = filterOptions.apiKeys;
    // The "N keys" stat describes the loaded rows, not the dropdown.
    const uniqueApiKeys = useMemo(
      () => [...new Set(logs.map((l) => l.apiKeyId || l.apiKeyName).filter(Boolean))],
      [logs]
    );

    // Stats (memoized to avoid re-computation on every render)
    const { totalCount, okCount, errorCount, comboCount, apiKeyCount, runningCount } = useMemo(
      () => ({
        totalCount: filteredLogs.length,
        okCount: filteredLogs.filter((l) => l.status >= 200 && l.status < 300).length,
        errorCount: filteredLogs.filter((l) => l.status >= 400).length,
        comboCount: logs.filter((l) => l.comboName).length,
        apiKeyCount: uniqueApiKeys.length,
        runningCount: filteredLogs.filter((l) => l.active === true).length,
      }),
      [filteredLogs, logs, uniqueApiKeys]
    );

    const sortDirection = (column: string): "asc" | "desc" | undefined => {
      const mapping = COLUMN_SORT_MAP[column as keyof typeof COLUMN_SORT_MAP];
      if (!mapping) return undefined;
      if (sortBy === mapping.desc) return "desc";
      if (sortBy === mapping.asc) return "asc";
      return undefined;
    };
    const visibleColumnCount = Math.max(1, columns.filter((c) => visibleColumns[c.key]).length);
    // Sortable header: COLUMN_SORT_MAP owns the flip rule (first click = desc); the kit only
    // renders the control, its direction icon and aria-sort.
    const sortableHead = (column: string, label: string, align: "left" | "right" = "right") => (
      <SortableTableHead
        align={align}
        className="px-3"
        direction={sortDirection(column)}
        onDirectionChange={() => toggleSort(column)}
      >
        {label}
      </SortableTableHead>
    );

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

          <Button
            variant="outline"
            size="sm"
            aria-pressed={detailLoggingEnabled}
            onClick={toggleDetailLogging}
            disabled={detailLoggingLoading}
            className={cn(
              "rounded-full",
              detailLoggingEnabled
                ? "border-warning/30 bg-warning/10 text-warning"
                : "text-text-muted"
            )}
            title={t("capturePipeline")}
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-2 rounded-full",
                detailLoggingEnabled ? "bg-warning" : "bg-text-muted"
              )}
            />
            {detailLoggingLoading
              ? t("updatingPipelineLogs")
              : detailLoggingEnabled
                ? t("pipelineLogsOn")
                : t("pipelineLogsOff")}
          </Button>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono">
            <Badge size="sm">
              {totalCount} {t("total")}
            </Badge>
            {runningCount > 0 && (
              <Badge size="sm" variant="warning">
                {runningCount} {t("running")}
              </Badge>
            )}
            <Badge size="sm" variant="success">
              {okCount} {t("ok")}
            </Badge>
            {errorCount > 0 && (
              <Badge size="sm" variant="error">
                {errorCount} {t("err")}
              </Badge>
            )}
            {comboCount > 0 && (
              <Badge size="sm" className="border-chart-3/30 bg-chart-3/10 text-chart-3">
                {comboCount} {t("combo")}
              </Badge>
            )}
            {apiKeyCount > 0 && (
              <Badge size="sm" variant="primary">
                {apiKeyCount} {t("keys")}
              </Badge>
            )}
          </div>

          <div className="ms-auto flex items-center gap-1">
            {/* Refresh interval */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => updateRefreshIntervalSec((v) => v - 1)}
              title={t("interval.decrease")}
              aria-label={t("interval.decrease")}
            >
              <Icon name="remove" size={14} />
            </Button>
            <Input
              type="number"
              min={1}
              max={300}
              value={refreshIntervalSec}
              onChange={(e) => {
                const v = Number.parseInt(e.target.value, 10);
                if (!Number.isNaN(v)) updateRefreshIntervalSec(v);
              }}
              title={t("interval.title")}
              aria-label={t("interval.title")}
              className="w-auto min-w-0"
              inputClassName="h-8 min-h-8 w-14 px-1 text-center text-xs [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => updateRefreshIntervalSec((v) => v + 1)}
              title={t("interval.increase")}
              aria-label={t("interval.increase")}
            >
              <Icon name="add" size={14} />
            </Button>
            <span className="text-[10px] text-text-muted">s</span>

            {/* Refresh */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fetchLogs(false)}
              title={t("refresh")}
              aria-label={t("refresh")}
            >
              <Icon name="refresh" size={18} />
            </Button>
          </div>
        </div>

        <DataTableShell
          filterAlignment="end"
          resultCount={sortedLogs.length}
          resultLabel={(count) => `${count} ${t("shown")}`}
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

              {/* Correlation ID Filter */}
              <Input
                type="text"
                icon="tag"
                placeholder={t("correlationId")}
                aria-label={t("correlationId")}
                value={correlationIdFilter}
                onChange={(e) => setCorrelationIdFilter(e.target.value)}
                className="w-full sm:w-48"
                inputClassName="font-mono"
              />

              {/* Group by CID toggle */}
              <Button
                variant="outline"
                aria-pressed={groupedView}
                onClick={() => setGroupedView((v) => !v)}
                className={cn(groupedView && "border-chart-3/30 bg-chart-3/15 text-chart-3")}
                title={groupedView ? t("group.showAllRows") : t("group.showLatestPerCorrelation")}
              >
                <Icon name={groupedView ? "unfold_less" : "unfold_more"} size={16} />
                {groupedView ? t("group.grouped") : t("statusFilters.all")}
              </Button>

              {/* Provider Dropdown */}
              <Select
                className="w-auto"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                aria-label={t("columns.provider")}
                selectClassName="min-w-[140px]"
              >
                <option value="">{t("allProviders")}</option>
                {uniqueProviders.map((p) => {
                  const compatLabel = getProviderDisplayLabel(p, providerNodes);
                  const pc = PROVIDER_COLORS[p];
                  return (
                    <option key={p} value={p}>
                      {compatLabel || pc?.label || p.toUpperCase()}
                    </option>
                  );
                })}
              </Select>

              {/* Model Dropdown */}
              <Select
                className="w-auto"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                aria-label={t("columns.model")}
                selectClassName="min-w-[180px]"
              >
                <option value="">{t("allModels")}</option>
                {uniqueModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </Select>

              {/* Account Dropdown */}
              <Select
                className="w-auto"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                aria-label={t("columns.account")}
                selectClassName="min-w-[140px]"
              >
                <option value="">{t("allAccounts")}</option>
                {uniqueAccounts.map((a) => (
                  <option key={a} value={a}>
                    {emailsVisible ? a : `${maskAccount(a, false)} · #${stableAccountSuffix(a)}`}
                  </option>
                ))}
              </Select>

              {/* API Key Dropdown */}
              <Select
                className="w-auto"
                value={selectedApiKey}
                onChange={(e) => setSelectedApiKey(e.target.value)}
                aria-label={t("columns.apiKey")}
                selectClassName="min-w-[160px]"
              >
                <option value="">{t("allApiKeys")}</option>
                {apiKeyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {formatApiKeyLabel(option.name, option.id)}
                  </option>
                ))}
              </Select>

              {/* Sort Dropdown */}
              <Select
                className="w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                title={t("sortLogs")}
                aria-label={t("sortLogs")}
                selectClassName="min-w-[150px]"
              >
                <option value="newest">{t("sortNewest")}</option>
                <option value="oldest">{t("sortOldest")}</option>
                <option value="tokens_desc">{t("sortTokensDesc")}</option>
                <option value="tokens_asc">{t("sortTokensAsc")}</option>
                <option value="duration_desc">{t("sortDurationDesc")}</option>
                <option value="duration_asc">{t("sortDurationAsc")}</option>
                <option value="status_desc">{t("sortStatusDesc")}</option>
                <option value="status_asc">{t("sortStatusAsc")}</option>
                <option value="model_asc">{t("sortModelAsc")}</option>
                <option value="model_desc">{t("sortModelDesc")}</option>
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
            {/* Status Filters */}
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
                        : f.key === "combo"
                          ? "bg-chart-3/20 text-chart-3 border-chart-3/40"
                          : "bg-primary text-accent-foreground border-primary"
                    : "text-text-muted"
                )}
              >
                {f.icon && <Icon name={f.icon} size={14} />}
                {f.label}
              </Button>
            ))}

            {/* Divider */}
            {loadedProviders.length > 0 && (
              <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
            )}

            {/* Dynamic Provider Quick Filters (from data) */}
            {loadedProviders.map((p) => {
              const compatLabel = getProviderDisplayLabel(p, providerNodes);
              // Provider identity colours (brand palette in constants/colors), not status tones.
              const pc = PROVIDER_COLORS[p] || {
                bg: "#374151",
                text: "#fff",
                label: compatLabel || p.toUpperCase(),
              };
              const displayLabel = compatLabel || pc.label;
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
                  {displayLabel}
                </Button>
              );
            })}
          </div>

          {/* Table */}
          {loading && logs.length === 0 ? (
            <TableLoadingState label={t("loadingLogs")} className="min-h-[460px]" />
          ) : logs.length === 0 ? (
            <EmptyState icon="receipt_long" title={t("noLogs")} className="min-h-[460px]" />
          ) : sortedLogs.length === 0 ? (
            <EmptyState icon="search_off" title={t("noMatchingLogs")} className="min-h-[460px]" />
          ) : (
            <Table
              ref={tableRef}
              scrollbarLabel={t("tableLabel")}
              // The table container is the scroll viewport: infinite scroll, the sticky header
              // and the user's resize all act on it (opaque bg-surface, #4233).
              containerClassName="min-h-[460px] resize-y overflow-auto rounded-none border-0 bg-surface"
              className="text-left text-xs"
            >
              <TableHeader className="sticky top-0 z-10">
                <TableRow>
                  {visibleColumns.status && sortableHead("status", t("columns.status"), "left")}
                  {visibleColumns.cacheSource && (
                    <TableHead className="px-3">{t("columns.cacheSource")}</TableHead>
                  )}
                  {visibleColumns.model && (
                    <TableHead className="px-3">{t("columns.model")}</TableHead>
                  )}
                  {visibleColumns.requestedModel && (
                    <TableHead className="px-3">{t("columns.requested")}</TableHead>
                  )}
                  {visibleColumns.provider && (
                    <TableHead className="px-3">{t("columns.provider")}</TableHead>
                  )}
                  {visibleColumns.protocol && (
                    <TableHead className="px-3">{t("columns.protocol")}</TableHead>
                  )}
                  {visibleColumns.account && (
                    <TableHead className="px-3">{t("columns.account")}</TableHead>
                  )}
                  {visibleColumns.apiKey && (
                    <TableHead className="px-3">{t("columns.apiKey")}</TableHead>
                  )}
                  {visibleColumns.combo && (
                    <TableHead className="px-3">{t("columns.combo")}</TableHead>
                  )}
                  {visibleColumns.tokens && sortableHead("tokens", t("columns.tokens"))}
                  {visibleColumns.tps && sortableHead("tps", t("columns.tps"))}
                  {visibleColumns.ttft && (
                    <TableHead className="ci-table__head--numeric px-3">
                      {t("columns.ttft")}
                    </TableHead>
                  )}
                  {visibleColumns.duration && sortableHead("duration", t("columns.duration"))}
                  {visibleColumns.addedWait && (
                    <TableHead className="ci-table__head--numeric px-3">
                      {t("columns.addedWait")}
                    </TableHead>
                  )}
                  {visibleColumns.time && sortableHead("time", t("columns.time"))}
                  {visibleColumns.conversation && (
                    <TableHead className="px-3">{t("columns.conversation")}</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {groupedLogs.map((log) => {
                  const isActive = log.active === true;
                  const protocolKey = isActive ? null : log.sourceFormat || log.provider;
                  const protocol = protocolKey ? getProtocolColor(protocolKey, log.provider) : null;
                  const compatLabel = getProviderDisplayLabel(log.provider, providerNodes);
                  const providerColor = PROVIDER_COLORS[log.provider] || {
                    bg: "#374151",
                    text: "#fff",
                    label: compatLabel || (log.provider || "-").toUpperCase(),
                  };
                  const providerLabel = log.providerDisplay || compatLabel || providerColor.label;
                  const isError = !isActive && log.status >= 400;
                  const cacheSourceMeta = getCacheSourceMeta(log.cacheSource);
                  const isSemanticCache = cacheSourceMeta?.key === "semantic";
                  const accountLabel = maskAccount(log.account, emailsVisible);
                  const isHoveredGroup = !!hoveredCid && log.correlationId === hoveredCid;

                  return (
                    <TableRow
                      key={log.id}
                      onClick={() => openDetail(log)}
                      data-cid={log.correlationId || undefined}
                      onMouseEnter={() => log.correlationId && setHoveredCid(log.correlationId)}
                      onMouseLeave={() => setHoveredCid(null)}
                      className={cn(
                        "cursor-pointer transition-colors",
                        isError ? "bg-error/5 hover:bg-error/15" : "hover:bg-info/10",
                        log.isRetry && "border-l-2 border-l-warning/50",
                        log.isRetry && !isHoveredGroup && "bg-warning/[0.03]",
                        isHoveredGroup && "bg-chart-3/10 ring-1 ring-chart-3/20"
                      )}
                    >
                      {visibleColumns.status && (
                        <TableCell className="px-3 py-2">
                          {isActive ? (
                            <span
                              className="inline-flex size-7 items-center justify-center rounded-full border border-warning/25 bg-warning/15"
                              title={t("status.inProgress")}
                            >
                              <span className="inline-block size-3 animate-spin rounded-full border-2 border-warning border-t-transparent" />
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1">
                              <Badge
                                size="sm"
                                variant={httpStatusTone(log.status)}
                                className="min-w-[36px] justify-center font-bold"
                              >
                                {log.status || "..."}
                              </Badge>
                              {log.groupStatus === "healed" &&
                                !log.isRetry &&
                                log.status >= 400 && (
                                  <span
                                    className="text-[11px] text-success"
                                    title={t("status.recoveredByRetry")}
                                  >
                                    ✓
                                  </span>
                                )}
                              {log.isRetry && (
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  className="ml-0.5 size-5 min-h-5 text-[11px] text-warning"
                                  title={t("status.goToParent")}
                                  aria-label={t("status.goToParent")}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const parent = groupedLogs.find(
                                      (g) => g.correlationId === log.correlationId && !g.isRetry
                                    );
                                    if (parent) openDetail(parent);
                                  }}
                                >
                                  ↳
                                </Button>
                              )}
                            </span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.cacheSource && (
                        <TableCell className="px-3 py-2">
                          {isActive ? (
                            <span className="text-[10px] text-text-muted">—</span>
                          ) : (
                            <>
                              <Badge
                                size="sm"
                                variant={cacheSourceMeta.variant}
                                className="text-[9px] font-bold uppercase"
                                title={
                                  isSemanticCache ? t("semanticCacheHit") : t("upstreamResponse")
                                }
                              >
                                {isSemanticCache ? t("semantic") : t("upstream")}
                              </Badge>
                              {getResilienceBadges(log.resilienceActions, (key, values) =>
                                t(`detail.${key}`, values)
                              ).map((badge) => (
                                // Unstyled span: inherits the cache-source
                                // badge line; the title carries the detail.
                                <span key={badge.key} title={badge.title}>
                                  [{badge.label}]
                                </span>
                              ))}
                            </>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.model && (
                        <TableCell className="px-3 py-2 font-mono text-[11px] font-medium text-primary">
                          <div className="flex items-center gap-1.5">
                            <span>{log.model}</span>
                            {log.groupStatus === "healed" && !log.isRetry && (
                              <span
                                className="inline-flex items-center gap-0.5 rounded border border-success/25 bg-success/15 px-1 py-0 text-[8px] font-bold text-success"
                                title={t("status.healedTitle", { count: log.groupSize - 1 })}
                              >
                                {t("status.healed")}
                              </span>
                            )}
                            {log.groupStatus === "failed" && !log.isRetry && (
                              <span
                                className="inline-flex items-center gap-0.5 rounded border border-error/25 bg-error/15 px-1 py-0 text-[8px] font-bold text-error"
                                title={t("status.failedTitle", { count: log.groupSize })}
                              >
                                {t("status.failed")}
                              </span>
                            )}
                            {log.modelPinned && (
                              <span
                                className="inline-flex items-center gap-0.5 rounded border border-chart-3/25 bg-chart-3/15 px-1 py-0 text-[8px] font-bold text-chart-3"
                                title={t("status.pinnedTitle")}
                              >
                                {t("status.pinned")}
                              </span>
                            )}
                          </div>
                          {log.correlationId && !log.isRetry && log.groupSize > 1 && (
                            <div
                              className="max-w-[120px] truncate text-[9px] font-normal text-text-muted"
                              title={log.correlationId}
                            >
                              {log.correlationId.slice(0, 12)}… · {log.groupSize} {t("attempts")}
                            </div>
                          )}
                          {log.correlationId && !log.isRetry && log.groupSize <= 1 && (
                            <div
                              className="max-w-[120px] truncate text-[9px] font-normal text-text-muted"
                              title={log.correlationId}
                            >
                              {log.correlationId.slice(0, 12)}…
                            </div>
                          )}
                          {log.correlationId && log.isRetry && (
                            <div
                              className="max-w-[120px] truncate text-[9px] font-normal text-warning/70"
                              title={log.correlationId}
                            >
                              {log.correlationId.slice(0, 12)}…
                            </div>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.requestedModel && (
                        <TableCell className="px-3 py-2 font-mono text-[11px]">
                          {log.requestedModel ? (
                            <span
                              className={
                                log.requestedModel !== log.model
                                  ? "text-warning"
                                  : "text-text-muted"
                              }
                              title={
                                log.requestedModel !== log.model
                                  ? t("requestedRoutedTitle", {
                                      requested: log.requestedModel,
                                      routed: log.model,
                                    })
                                  : log.requestedModel
                              }
                            >
                              {log.requestedModel}
                            </span>
                          ) : (
                            <span className="text-[10px] text-text-muted">—</span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.provider && (
                        <TableCell className="px-3 py-2">
                          {/* Provider identity colours (brand palette), not a status tone. */}
                          <span
                            className="inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase"
                            style={{
                              backgroundColor: providerColor.bg,
                              color: providerColor.text,
                            }}
                          >
                            {providerLabel}
                          </span>
                        </TableCell>
                      )}
                      {visibleColumns.protocol && (
                        <TableCell className="px-3 py-2">
                          {isActive ? (
                            <span className="text-[10px] text-text-muted">—</span>
                          ) : (
                            <span
                              className="inline-block rounded px-2 py-0.5 text-[9px] font-bold uppercase"
                              style={
                                protocol
                                  ? { backgroundColor: protocol.bg, color: protocol.text }
                                  : {}
                              }
                            >
                              {protocol?.label || "—"}
                            </span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.account && (
                        <TableCell
                          className="max-w-[120px] truncate px-3 py-2 text-text-muted"
                          title={accountLabel}
                        >
                          {accountLabel}
                        </TableCell>
                      )}
                      {visibleColumns.apiKey && (
                        <TableCell
                          className="max-w-[140px] truncate px-3 py-2 text-text-muted"
                          title={log.apiKeyName || log.apiKeyId || t("noApiKey")}
                        >
                          {isActive ? (
                            <span className="text-[10px] text-text-muted">—</span>
                          ) : (
                            formatApiKeyLabel(log.apiKeyName, log.apiKeyId)
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.combo && (
                        <TableCell className="px-3 py-2">
                          {isActive ? (
                            <span className="text-[10px] text-text-muted">—</span>
                          ) : log.comboName ? (
                            <span className="inline-block rounded-full border border-chart-3/40 bg-chart-3/20 px-2 py-0.5 text-[9px] font-bold text-chart-3">
                              {log.comboName}
                            </span>
                          ) : (
                            <span className="text-[10px] text-text-muted">—</span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.tokens && (
                        <TableCell className="whitespace-nowrap px-3 py-2 text-right">
                          {isActive ? (
                            <span className="text-[10px] text-text-muted">—</span>
                          ) : (
                            <>
                              <span className="text-text-muted">TI:</span>{" "}
                              <span className="text-primary">
                                {log.tokens?.in?.toLocaleString() || 0}
                              </span>
                              <span className="mx-1 text-border">|</span>
                              <span className="text-text-muted">TO:</span>{" "}
                              <span className="text-success">
                                {log.tokens?.out?.toLocaleString() || 0}
                              </span>
                              {log.tokens?.cacheRead != null && log.tokens.cacheRead > 0 && (
                                <>
                                  <span className="mx-1 text-border">|</span>
                                  <span className="text-text-muted">CR:</span>{" "}
                                  <span className="text-info" title={tCache("cachedTokensCol")}>
                                    {log.tokens.cacheRead.toLocaleString()} (
                                    {formatCachePercentage(log.tokens.in, log.tokens.cacheRead)}%)
                                  </span>
                                </>
                              )}
                              {log.tokens?.cacheWrite != null && log.tokens.cacheWrite > 0 && (
                                <>
                                  <span className="mx-1 text-border">|</span>
                                  <span className="text-text-muted">CW:</span>{" "}
                                  <span className="text-warning" title={tCache("cacheCreation")}>
                                    {log.tokens.cacheWrite.toLocaleString()}
                                  </span>
                                </>
                              )}
                              {log.tokens?.compressed != null && log.tokens.compressed > 0 && (
                                <>
                                  <span className="mx-1 text-border">|</span>
                                  <span
                                    className="font-semibold text-chart-3"
                                    title={`${log.tokens.compressed.toLocaleString()} tokens compressed`}
                                  >
                                    ↓{log.tokens.compressed.toLocaleString()}
                                  </span>
                                </>
                              )}
                            </>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.tps && (
                        <TableCell className="whitespace-nowrap px-3 py-2 text-right font-mono">
                          {isActive ? (
                            <span className="text-[10px] text-text-muted">—</span>
                          ) : (
                            (() => {
                              const tps = getLogTps(log);
                              const color =
                                tps <= 0
                                  ? "text-text-muted"
                                  : tps >= 80
                                    ? "text-success"
                                    : tps >= 30
                                      ? "text-info"
                                      : "text-warning";
                              return (
                                <span
                                  className={color}
                                  title={buildLogTpsTitle(log, tps, formatDuration)}
                                >
                                  {formatTps(tps)}
                                </span>
                              );
                            })()
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.ttft && (
                        <TableCell className="px-3 py-2 text-right font-mono text-text-muted">
                          {formatDuration(log.ttft > 0 ? log.ttft : null)}
                        </TableCell>
                      )}
                      {visibleColumns.duration && (
                        <TableCell className="px-3 py-2 text-right font-mono text-text-muted">
                          {formatDuration(log.duration)}
                        </TableCell>
                      )}
                      {visibleColumns.addedWait && (
                        <TableCell className="px-3 py-2 text-right font-mono text-text-muted">
                          {typeof log.addedWaitMs === "number" && log.addedWaitMs > 0
                            ? `${formatDuration(log.addedWaitMs)}${log.addedWaitCause ? ` (${log.addedWaitCause})` : ""}`
                            : "—"}
                        </TableCell>
                      )}
                      {visibleColumns.time && (
                        <TableCell className="px-3 py-2 text-right text-text-muted">
                          {formatTime(log.timestamp)}
                        </TableCell>
                      )}
                      {visibleColumns.conversation && (
                        <TableCell className="px-3 py-2 font-mono text-[10px] text-text-muted">
                          {log.sessionTag ? (
                            <span title={log.sessionTag}>{log.sessionTag.slice(0, 12)}…</span>
                          ) : (
                            <span className="text-text-muted">—</span>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
              {hasMore && (
                <TableFooter>
                  <TableRow ref={loadMoreSentinelRef} className="hover:bg-transparent">
                    <TableCell colSpan={visibleColumnCount} className="py-3 text-center">
                      <Button variant="outline" size="sm" onClick={loadMore}>
                        {loading ? t("loadingMore") : t("loadMore")}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          )}
        </DataTableShell>
        <div className="text-[10px] text-text-muted italic">
          {t("callLogsInfo", {
            dataDir: "{DATA_DIR}/call_logs/",
            retentionDays: "CALL_LOG_RETENTION_DAYS",
            maxEntries: "CALL_LOG_MAX_ENTRIES",
          })}
        </div>

        {/* Detail Modal */}
        {selectedLog && (
          <RequestLoggerDetail
            log={selectedLog}
            detail={detailData}
            loading={detailLoading}
            debugEnabled={selectedLog.active ? true : detailLoggingEnabled}
            emailsVisible={emailsVisible}
            onClose={closeDetail}
            onCopy={copyToClipboard}
            onPrevious={handlePrev}
            onNext={handleNext}
            relatedLogs={
              selectedLog.correlationId
                ? groupedLogs.filter((l) => l.correlationId === selectedLog.correlationId)
                : []
            }
            onSelectRelated={(r) => {
              closeDetail();
              openDetail(r);
            }}
          />
        )}
      </div>
    );
  }
);

RequestLoggerV2.displayName = "RequestLoggerV2";

export default RequestLoggerV2;
