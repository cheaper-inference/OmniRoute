"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { copyToClipboard } from "@/shared/utils/clipboard";
import { formatApiKeyLabel } from "@/shared/utils/formatting";
import { MCP_TOOL_SCOPES } from "@/shared/constants/mcpScopes";
import RequestLoggerDetail from "@/shared/components/RequestLoggerDetail";
import Badge from "@/shared/components/Badge";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import useEmailPrivacyStore from "@/store/emailPrivacyStore";
import {
  type TimelineLog,
  type ViewMode,
  VISIBLE_WINDOW_MS,
  BAR_HEIGHT,
  LANE_GAP,
  LANE_HEIGHT,
  HEADER_HEIGHT,
  AXIS_HEIGHT,
  MIN_BAR_WIDTH,
  DEFAULT_LIST_POLL_SECONDS,
  TIMELINE_LIST_POLL_STORAGE_KEY,
  FOLLOW_LINE_X,
  LIVE_LINE_FRACTION,
  DRAG_THRESHOLD_PX,
  computeBarRange,
  MODE_META,
  formatTimeAxis,
  CONVERSATION_LANE_REUSE_STORAGE_KEY,
  allocateLanes,
  truncateModel,
  formatDateLabel,
  loadTimelineLogs,
  mergeApiKeyOptions,
  rememberApiKeysFromPoll,
  nextTimelineLogs,
  getTimelineBarColor,
  MCP_BAR_COLOR,
  TIMELINE_BAR_COLORS,
} from "@/shared/components/RequestTimeline.utils";

export type { TimelineLog } from "@/shared/components/RequestTimeline.utils";
export { allocateLanes } from "@/shared/components/RequestTimeline.utils";

export default function RequestTimeline({
  initialSelectedId,
}: {
  initialSelectedId?: string | null;
} = {}) {
  const router = useRouter();
  const t = useTranslations("requestTimeline");
  const [logs, setLogs] = useState<TimelineLog[]>([]);
  const [mode, setMode] = useState<ViewMode>("follow");
  const [zoom, setZoom] = useState(1);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [nowMs, setNowMs] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(1200);
  const [panOffsetMs, setPanOffsetMs] = useState(0);
  const [panFrozenMs, setPanFrozenMs] = useState(0);
  const [liveBaseMs, setLiveBaseMs] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const { emailsVisible } = useEmailPrivacyStore();
  const [selectedLog, setSelectedLog] = useState<TimelineLog | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailLoggingEnabled, setDetailLoggingEnabled] = useState(false);
  const [conversationLaneReuseMinutes, setConversationLaneReuseMinutes] = useState(() => {
    if (globalThis.window === undefined) return 2;
    try {
      const saved = localStorage.getItem(CONVERSATION_LANE_REUSE_STORAGE_KEY);
      const parsed = saved ? Number(saved) : 2;
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 2;
    } catch {
      return 2;
    }
  });
  const [listPollSeconds, setListPollSeconds] = useState(() => {
    if (globalThis.window === undefined) return DEFAULT_LIST_POLL_SECONDS;
    try {
      const saved = localStorage.getItem(TIMELINE_LIST_POLL_STORAGE_KEY);
      const parsed = saved ? Number(saved) : DEFAULT_LIST_POLL_SECONDS;
      return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_LIST_POLL_SECONDS;
    } catch {
      return DEFAULT_LIST_POLL_SECONDS;
    }
  });
  const [selectedApiKey, setSelectedApiKey] = useState("");
  const [seenApiKeyOptions, setSeenApiKeyOptions] = useState<string[]>([]);
  const knownApiKeyIdsRef = useRef<string[]>([]);
  const seenApiKeyOptionsRef = useRef<string[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  // Guards the ?id= deep-link mount effect below. Also armed by any manual
  // open/close so a stale `initialSelectedId` (App Router's router.replace()
  // commits the URL after the re-render it triggers, so the prop can briefly
  // still reflect the just-closed id on the very next render) can never
  // reopen the modal right after the user closed it.
  const initialOpenedRef = useRef(false);

  useEffect(() => {
    fetch("/api/logs/detail?limit=1")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setDetailLoggingEnabled(data.enabled === true);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    const refresh = () => {
      void loadTimelineLogs(
        fetch,
        selectedApiKey,
        (tool) => MCP_TOOL_SCOPES[tool],
        knownApiKeyIdsRef.current
      ).then((data) => {
        if (cancelled) return;
        const remembered = rememberApiKeysFromPoll(
          knownApiKeyIdsRef.current,
          seenApiKeyOptionsRef.current,
          data,
          selectedApiKey
        );
        knownApiKeyIdsRef.current = remembered.knownIds;
        seenApiKeyOptionsRef.current = remembered.seenOptions;
        setSeenApiKeyOptions(remembered.seenOptions);
        setLogs((current) => nextTimelineLogs(current, data));
      });
    };
    refresh();
    const id = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      refresh();
    }, listPollSeconds * 1000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [listPollSeconds, selectedApiKey]);

  const apiKeyOptions = useMemo(
    () => mergeApiKeyOptions(seenApiKeyOptions, logs, selectedApiKey),
    [seenApiKeyOptions, logs, selectedApiKey]
  );

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCanvasWidth(entry.contentRect.width);
      }
    });
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastUpdate = 0;
    const THROTTLE_MS = mode === "follow" ? 0 : 50;
    const onFrame = (frame: number) => {
      if (frame - lastUpdate >= THROTTLE_MS) {
        lastUpdate = frame;
        setNowMs(Date.now());
      }
      animRef.current = requestAnimationFrame(onFrame);
    };
    animRef.current = requestAnimationFrame(onFrame);
    return () => cancelAnimationFrame(animRef.current);
  }, [mode]);

  const windowMs = VISIBLE_WINDOW_MS / zoom;

  const timeRange = useMemo(() => {
    if (mode === "follow") {
      const end = nowMs + windowMs * (1 - FOLLOW_LINE_X);
      const start = end - windowMs;
      return { start, end };
    }
    if (mode === "live") {
      const base = liveBaseMs || nowMs;
      const elapsed = nowMs - base;
      const snapWindow = windowMs * LIVE_LINE_FRACTION;
      const slot = elapsed % snapWindow;
      const start = nowMs - slot - windowMs * (1 - LIVE_LINE_FRACTION);
      return { start, end: start + windowMs };
    }
    const base = panFrozenMs || nowMs;
    const start = base - windowMs * 0.5 + panOffsetMs;
    return { start, end: start + windowMs };
  }, [mode, nowMs, windowMs, liveBaseMs, panFrozenMs, panOffsetMs]);

  const { start: timeStart, end: timeEnd } = timeRange;

  const nowLineX = useMemo(() => {
    if (mode === "follow") {
      return FOLLOW_LINE_X * 100;
    }
    const totalMs = timeEnd - timeStart;
    if (totalMs <= 0) return 50;
    return Math.max(0, Math.min(100, ((nowMs - timeStart) / totalMs) * 100));
  }, [mode, nowMs, timeStart, timeEnd]);

  const visibleLogs = useMemo(() => {
    return logs.filter((log) => {
      const { startMs, endMs } = computeBarRange(log, nowMs);
      return endMs >= timeStart && startMs <= timeEnd;
    });
  }, [logs, timeStart, timeEnd, nowMs]);

  const laneMap = useMemo(
    () => allocateLanes(logs, nowMs, conversationLaneReuseMinutes * 60 * 1000),
    [logs, nowMs, conversationLaneReuseMinutes]
  );
  const maxLane = useMemo(() => (laneMap.size > 0 ? Math.max(...laneMap.values()) : 0), [laneMap]);

  const barElements = useMemo(() => {
    const totalMs = timeEnd - timeStart;
    return visibleLogs.map((log) => {
      const { startMs, endMs } = computeBarRange(log, nowMs);

      const leftPct = ((startMs - timeStart) / totalMs) * 100;
      const rightPct = ((endMs - timeStart) / totalMs) * 100;
      const widthPct = Math.max(rightPct - leftPct, (MIN_BAR_WIDTH / canvasWidth) * 100);

      const lane = laneMap.get(log.id) ?? 0;
      const topPx = lane * LANE_HEIGHT;
      const color = getTimelineBarColor(log);
      const opacity = log.active ? 0.9 : 0.7;

      return { log, leftPct, widthPct, topPx, color, opacity };
    });
  }, [visibleLogs, timeStart, timeEnd, nowMs, laneMap, canvasWidth]);

  // One connector per consecutive pair of bars sharing a conversation id AND
  // lane (i.e. allocateLanes actually treated them as one continuous
  // conversation, not two bars that just happen to be adjacent).
  const connectorElements = useMemo(() => {
    const byConversation = new Map<string, typeof barElements>();
    for (const el of barElements) {
      const cid = el.log.sessionTag;
      if (!cid) continue;
      const list = byConversation.get(cid);
      if (list) list.push(el);
      else byConversation.set(cid, [el]);
    }

    const connectors: { id: string; x1: number; x2: number; y: number }[] = [];
    for (const els of byConversation.values()) {
      const sorted = [...els].sort(
        (a, b) => new Date(a.log.timestamp).getTime() - new Date(b.log.timestamp).getTime()
      );
      for (let i = 0; i < sorted.length - 1; i++) {
        const a = sorted[i];
        const b = sorted[i + 1];
        if (a.topPx !== b.topPx) continue; // different lanes — reuse window lapsed
        connectors.push({
          id: `${a.log.id}-${b.log.id}`,
          x1: a.leftPct + a.widthPct,
          x2: b.leftPct,
          y: a.topPx + BAR_HEIGHT / 2,
        });
      }
    }
    return connectors;
  }, [barElements]);

  const axisTicks = useMemo(() => {
    const totalMs = timeEnd - timeStart;
    if (totalMs <= 0) return [];

    const MS_MIN = 60 * 1000;
    const MS_10MIN = 10 * MS_MIN;
    const MS_HOUR = 60 * MS_MIN;
    const MS_DAY = 24 * MS_HOUR;

    const startOfHour = (ms: number) => {
      const d = new Date(ms);
      d.setMinutes(0, 0, 0);
      return d.getTime();
    };

    const startOfDay = (ms: number) => {
      const d = new Date(ms);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    };

    const ticks: { pct: number; label: string; kind: "day" | "hour" | "minor" }[] = [];

    const addTick = (ms: number, label: string, kind: "day" | "hour" | "minor") => {
      const pct = ((ms - timeStart) / totalMs) * 100;
      if (pct >= 0 && pct <= 100) {
        ticks.push({ pct, label, kind });
      }
    };

    if (totalMs <= MS_HOUR * 4) {
      const interval = totalMs <= MS_10MIN ? MS_MIN : MS_10MIN;
      const first = Math.ceil(timeStart / interval) * interval;
      for (let ms = first; ms <= timeEnd; ms += interval) {
        const isDay = startOfDay(ms) === ms;
        const isHour = startOfHour(ms) === ms;
        addTick(
          ms,
          isDay ? formatDateLabel(ms) : formatTimeAxis(ms),
          isDay ? "day" : isHour ? "hour" : "minor"
        );
      }
    } else if (totalMs <= MS_DAY) {
      const interval = totalMs <= MS_HOUR * 6 ? MS_10MIN : MS_HOUR;
      const first = Math.ceil(timeStart / interval) * interval;
      for (let ms = first; ms <= timeEnd; ms += interval) {
        const isDay = startOfDay(ms) === ms;
        addTick(ms, isDay ? formatDateLabel(ms) : formatTimeAxis(ms), isDay ? "day" : "hour");
      }
    } else {
      const firstDay = startOfDay(timeStart);
      const start = firstDay < timeStart ? firstDay + MS_DAY : firstDay;
      for (let ms = start; ms <= timeEnd; ms += MS_DAY) {
        addTick(ms, formatDateLabel(ms), "day");
      }
    }

    return ticks;
  }, [timeStart, timeEnd]);

  const contentHeight = Math.max((maxLane + 1) * LANE_HEIGHT + 20, 200);

  const handleBarClick = useCallback(
    (log: TimelineLog) => {
      if (log.kind === "mcp") return;
      initialOpenedRef.current = true;
      setSelectedLog(log);
      setDetailData(null);
      setDetailLoading(true);
      try {
        const url = new URL(globalThis.location.href);
        url.searchParams.set("id", log.id);
        router.replace(url.pathname + url.search);
      } catch {
        // ignore navigation errors
      }
      fetch(`/api/logs/${log.id}`, { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setDetailData(data);
        })
        .catch(() => {})
        .finally(() => setDetailLoading(false));
    },
    [router]
  );

  const closeDetail = useCallback(() => {
    initialOpenedRef.current = true;
    setSelectedLog(null);
    setDetailData(null);
    try {
      const url = new URL(globalThis.location.href);
      url.searchParams.delete("id");
      router.replace(url.pathname + url.search);
    } catch {
      // ignore navigation errors
    }
  }, [router]);

  // Deep-link support: open the request from ?id= on mount without waiting for
  // it to show up in the polled `logs` list (mirrors RequestLoggerV2's openDetail).
  const openById = useCallback(
    async (id: string) => {
      try {
        const url = new URL(globalThis.location.href);
        url.searchParams.set("id", id);
        router.replace(url.pathname + url.search);
      } catch {
        // ignore navigation errors
      }
      setDetailLoading(true);
      try {
        const res = await fetch(`/api/logs/${id}`, { cache: "no-store" });
        const data = res.ok ? await res.json() : null;
        if (data) {
          setSelectedLog({
            id: data.id ?? id,
            timestamp: data.timestamp,
            status: data.status ?? 0,
            model: data.model ?? null,
            provider: data.provider ?? null,
            account: data.account ?? null,
            duration: data.duration ?? 0,
            tokens: data.tokens ?? { in: 0, out: 0 },
            active: data.active,
            error: data.error ?? null,
            path: data.path ?? null,
          });
          setDetailData(data);
        }
      } catch {
        // ignore fetch errors
      } finally {
        setDetailLoading(false);
      }
    },
    [router]
  );

  useEffect(() => {
    if (!initialSelectedId || initialOpenedRef.current) return;
    initialOpenedRef.current = true;
    openById(initialSelectedId)
      .then((r) => r)
      .catch(() => {});
  }, [initialSelectedId, openById]);

  const handleBarHover = (log: TimelineLog, e: React.MouseEvent) => {
    setHoveredId(log.id);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleBarLeave = () => {
    setHoveredId(null);
    setTooltipPos(null);
  };

  const handleReset = useCallback(() => {
    setPanOffsetMs(0);
    setLiveBaseMs(nowMs);
  }, [nowMs]);

  const handleModeChange = useCallback(
    (newMode: ViewMode) => {
      setMode(newMode);
      setPanOffsetMs(0);
      if (newMode === "pan") setPanFrozenMs(nowMs);
      setLiveBaseMs(nowMs);
    },
    [nowMs]
  );

  // Mouse panning mirrors the touch path below: a plain click must NOT steal the
  // user out of "follow" into "pan" — only a deliberate drag switches mode. A
  // click with no movement falls through to the bar's onClick (detail modal).
  const mouseDragRef = useRef<{ x: number; offset: number; moved: boolean } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    mouseDragRef.current = {
      x: e.clientX,
      offset: mode === "pan" ? panOffsetMs : 0,
      // Already panning: any movement pans. From follow/live: wait for the threshold.
      moved: mode === "pan",
    };
    setIsDragging(true);
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const start = mouseDragRef.current;
      if (!start) return;
      const dx = e.clientX - start.x;
      if (!start.moved && Math.abs(dx) < DRAG_THRESHOLD_PX) return;
      if (!start.moved) {
        start.moved = true;
        if (mode !== "pan") {
          setMode("pan");
          setPanFrozenMs(nowMs);
          setLiveBaseMs(nowMs);
        }
      }
      const msPerPx = windowMs / canvasWidth;
      setPanOffsetMs(start.offset - dx * msPerPx);
    },
    [mode, nowMs, windowMs, canvasWidth]
  );

  const handleMouseUp = useCallback(() => {
    mouseDragRef.current = null;
    setIsDragging(false);
  }, []);

  // --- Touch handlers (mobile panning + pinch-to-zoom) ---
  // Track touch start position to distinguish taps from drags.
  // A tap (< 10px movement) passes through to onClick for bar selection;
  // a drag triggers pan mode.
  const touchStartRef = useRef<{
    x: number;
    y: number;
    dist: number;
    offset: number;
    moved: boolean;
  } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        dist: 0,
        offset: mode === "pan" ? panOffsetMs : 0,
        moved: false,
      };
    } else if (e.touches.length === 2) {
      // Pinch-to-zoom: record initial distance between two fingers
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
      touchStartRef.current = { x: 0, y: 0, dist, offset: zoom, moved: false };
      setIsDragging(false);
    }
  };

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStartRef.current) return;
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const dx = touch.clientX - touchStartRef.current.x;
        const dy = touch.clientY - touchStartRef.current.y;
        // Only start panning after a 10px threshold to avoid stealing taps
        if (!touchStartRef.current.moved && Math.hypot(dx, dy) < 10) return;
        if (!touchStartRef.current.moved) {
          touchStartRef.current.moved = true;
          if (mode !== "pan") {
            setMode("pan");
            setPanFrozenMs(nowMs);
            setLiveBaseMs(nowMs);
          }
          setIsDragging(true);
        }
        const msPerPx = windowMs / canvasWidth;
        setPanOffsetMs(touchStartRef.current.offset - dx * msPerPx);
      } else if (e.touches.length === 2 && touchStartRef.current.dist > 0) {
        // Pinch-to-zoom
        e.preventDefault();
        const [a, b] = [e.touches[0], e.touches[1]];
        const dist = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
        const scale = dist / touchStartRef.current.dist;
        setZoom(Math.max(0.001, Math.min(8, touchStartRef.current.offset * scale)));
      }
    },
    [mode, nowMs, windowMs, canvasWidth]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchStartRef.current = null;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.25 : 0.8;
    setZoom((z) => Math.max(0.001, Math.min(8, z * factor)));
  }, []);

  const hoveredLog = hoveredId ? logs.find((l) => l.id === hoveredId) : null;

  return (
    <div className="flex flex-col h-full min-h-0 select-none">
      {/* Header — HEADER_HEIGHT is a minimum, not a fixed height: below ~1100 px the controls
          wrap to a second row instead of being clipped (390 px, F4). Nothing in the canvas
          maths reads the header height (the canvas is the flex-1 sibling). */}
      <div
        className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-2 border-b border-border shrink-0"
        style={{ minHeight: HEADER_HEIGHT }}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-text-main">{t("title")}</h2>
          <span className="text-[10px] text-text-muted font-mono">
            {t("visibleCount", { visible: visibleLogs.length, total: logs.length })}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode selector */}
          <div role="group" aria-label={t("modeLabel")} className="flex items-center gap-0.5">
            {(["follow", "live", "pan"] as ViewMode[]).map((m) => (
              <Button
                key={m}
                data-testid={`timeline-mode-${m}`}
                variant={mode === m ? "primary" : "ghost"}
                size="sm"
                aria-pressed={mode === m}
                onClick={() => handleModeChange(m)}
                title={t(`modes.${MODE_META[m].descriptionKey}`)}
                className="h-7 min-h-7 px-2.5 text-[11px]"
              >
                {t(`modes.${MODE_META[m].labelKey}`)}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            title={t("jumpToNow", { position: Math.round(nowLineX) })}
            className="h-7 min-h-7 px-2 text-[11px]"
          >
            {t("reset")}
          </Button>
          <Select
            value={selectedApiKey}
            onChange={(e) => setSelectedApiKey(e.target.value)}
            aria-label={t("apiKey")}
            compact
            className="w-auto"
            data-testid="timeline-api-key-filter"
          >
            <option value="">{t("allApiKeys")}</option>
            {apiKeyOptions.map((value) => {
              const matched = logs.find((row) => (row.apiKeyId || row.apiKeyName) === value);
              return (
                <option key={value} value={value}>
                  {formatApiKeyLabel(matched?.apiKeyName, matched?.apiKeyId || value)}
                </option>
              );
            })}
          </Select>
          {/* Conversation lane-reuse window: how long a lane stays reserved
              for its conversation before falling back to normal packing. */}
          <div
            className="flex items-center gap-1 whitespace-nowrap text-[11px] text-text-muted"
            title={t("laneReuseHint")}
          >
            <span aria-hidden="true">{t("laneReuse")}</span>
            <Input
              type="number"
              min={1}
              step={1}
              aria-label={t("laneReuseLabel")}
              value={conversationLaneReuseMinutes}
              onChange={(e) => {
                const next = Math.max(1, Number(e.target.value) || 1);
                setConversationLaneReuseMinutes(next);
                try {
                  localStorage.setItem(CONVERSATION_LANE_REUSE_STORAGE_KEY, String(next));
                } catch {}
              }}
              className="w-auto min-w-0 shrink-0"
              inputClassName="h-7 min-h-7 w-12 px-1 text-center font-mono text-[11px]"
            />
            <span aria-hidden="true">{t("laneReuseUnit")}</span>
          </div>
          {/* How often the timeline re-polls /api/usage/call-logs for new rows. */}
          <div
            className="flex items-center gap-1 whitespace-nowrap text-[11px] text-text-muted"
            title={t("autoRefreshHint")}
          >
            <span aria-hidden="true">{t("autoRefresh")}</span>
            <Input
              type="number"
              min={1}
              step={1}
              aria-label={t("autoRefreshLabel")}
              value={listPollSeconds}
              onChange={(e) => {
                const next = Math.max(1, Number(e.target.value) || 1);
                setListPollSeconds(next);
                try {
                  localStorage.setItem(TIMELINE_LIST_POLL_STORAGE_KEY, String(next));
                } catch {}
              }}
              className="w-auto min-w-0 shrink-0"
              inputClassName="h-7 min-h-7 w-12 px-1 text-center font-mono text-[11px]"
            />
            <span aria-hidden="true">{t("autoRefreshUnit")}</span>
          </div>
          {/* Zoom */}
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setZoom((z) => Math.max(0.001, z * 0.5))}
              aria-label={t("zoomOut")}
              title={t("zoomOut")}
            >
              <span aria-hidden="true">-</span>
            </Button>
            <span className="min-w-[36px] px-1 text-center font-mono text-[10px] text-text-muted">
              {zoom >= 1 ? `${zoom}x` : `${zoom * 100}%`}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setZoom((z) => Math.min(8, z * 2))}
              aria-label={t("zoomIn")}
              title={t("zoomIn")}
            >
              <span aria-hidden="true">+</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        data-testid="timeline-canvas"
        className={`flex-1 min-h-0 overflow-hidden relative bg-surface ${
          isDragging ? "cursor-grabbing" : mode === "pan" ? "cursor-grab" : ""
        }`}
        style={{ touchAction: "none" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {/* Scrollable content area */}
        <div className="absolute left-0 right-0" style={{ height: contentHeight }}>
          {/* Time axis */}
          <div
            className="absolute left-0 right-0 border-b border-border/50 bg-surface/90 backdrop-blur-sm z-5"
            style={{ top: 0, height: AXIS_HEIGHT }}
          >
            {axisTicks.map((axisTick, i) => (
              <div key={i} className="absolute" style={{ left: `${axisTick.pct}%`, top: 0 }}>
                <div className="w-px h-3 bg-border -translate-x-1/2" />
                <span className="block text-[9px] text-text-muted font-mono mt-0.5 whitespace-nowrap -translate-x-1/2 text-center">
                  {axisTick.label}
                </span>
              </div>
            ))}
          </div>

          {/* Horizontal grid lines */}
          {Array.from({ length: maxLane + 1 }).map((_, i) => (
            <div
              key={`grid-${i}`}
              className="absolute left-0 right-0 border-b border-border/20"
              style={{ top: AXIS_HEIGHT + i * LANE_HEIGHT + BAR_HEIGHT }}
            />
          ))}

          {/* Request bars */}
          {barElements.map(({ log, leftPct, widthPct, topPx, color, opacity }) => (
            <div
              key={log.id}
              data-testid={`timeline-bar-${log.id}`}
              className={`absolute rounded-sm transition-opacity duration-100 ${
                log.kind === "mcp" ? "cursor-default" : "cursor-pointer"
              }`}
              style={{
                left: `${leftPct}%`,
                width: `${widthPct}%`,
                top: AXIS_HEIGHT + topPx,
                height: BAR_HEIGHT,
                backgroundColor: color,
                opacity,
                minWidth: MIN_BAR_WIDTH,
                zIndex: 2,
              }}
              onClick={() => handleBarClick(log)}
              onMouseEnter={(e) => handleBarHover(log, e)}
              onMouseMove={(e) => setTooltipPos({ x: e.clientX, y: e.clientY })}
              onMouseLeave={handleBarLeave}
            >
              <div className="w-full h-full flex items-center px-1.5 overflow-hidden">
                {/* text-bg inverts with the theme: light ink on the deep light-mode fills, dark ink
                    on the pastel dark-mode fills (white on the pastels is ~1.5:1). */}
                <span className="text-[11px] font-mono text-bg truncate whitespace-nowrap">
                  {truncateModel(log.model)}
                </span>
              </div>
            </div>
          ))}

          {/* Conversation connectors — one arrow per consecutive same-conversation
              bar pair sharing a lane. */}
          <svg
            className="absolute left-0 right-0 pointer-events-none text-primary/60"
            style={{
              top: AXIS_HEIGHT,
              height: (maxLane + 1) * LANE_HEIGHT,
              width: "100%",
              zIndex: 1,
            }}
            viewBox={`0 0 100 ${(maxLane + 1) * LANE_HEIGHT}`}
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="conversation-connector-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
              </marker>
            </defs>
            {connectorElements.map(({ id, x1, x2, y }) => (
              <line
                key={id}
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="currentColor"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                markerEnd="url(#conversation-connector-arrow)"
              />
            ))}
          </svg>
        </div>

        {/* NOW line — full height of the canvas, outside content div */}
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: `${nowLineX}%`,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="w-px h-full bg-error shadow-[0_0_8px_var(--color-error)] -translate-x-1/2" />
          <div className="absolute top-[2px] -translate-x-1/2 bg-error text-bg text-[8px] font-mono px-1.5 py-0.5 rounded-b-sm font-bold tracking-wider">
            NOW
          </div>
        </div>

        {/* Vertical lines — full height of the canvas, same position as axis ticks */}
        {axisTicks.map((axisTick) => (
          <div
            key={`vl-${axisTick.pct}`}
            className="absolute top-0 bottom-0 pointer-events-none -translate-x-1/2"
            style={{
              left: `${axisTick.pct}%`,
              width: axisTick.kind === "day" ? 2 : 1,
              backgroundColor:
                axisTick.kind === "day"
                  ? "color-mix(in srgb, var(--color-chart-3) 50%, transparent)"
                  : axisTick.kind === "hour"
                    ? "color-mix(in srgb, var(--color-text-muted) 45%, transparent)"
                    : "color-mix(in srgb, var(--color-text-muted) 15%, transparent)",
              zIndex: 1,
            }}
          />
        ))}
      </div>

      {/* Tooltip */}
      {hoveredLog && tooltipPos && (
        <div
          className="fixed z-50 pointer-events-none bg-surface border border-border rounded-lg shadow-elevated p-3 max-w-[280px]"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y - 8,
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getTimelineBarColor(hoveredLog) }}
            />
            <span className="text-[11px] font-semibold text-text-main">
              {hoveredLog.kind === "mcp"
                ? hoveredLog.toolName || t("mcpTool")
                : hoveredLog.model || t("unknownModel")}
            </span>
            {hoveredLog.active && (
              <Badge size="sm" className="border-chart-3/30 bg-chart-3/20 text-[9px] text-chart-3">
                {t("active")}
              </Badge>
            )}
          </div>
          <div className="space-y-0.5 text-[10px] text-text-muted font-mono">
            <div className="flex justify-between gap-4">
              <span>{t("started")}</span>
              <span>
                {(() => {
                  const ts = new Date(hoveredLog.timestamp).getTime();
                  const startMs =
                    hoveredLog.active || hoveredLog.completed
                      ? ts
                      : ts - (hoveredLog.duration || 0);
                  return new Date(startMs).toLocaleTimeString();
                })()}
              </span>
            </div>
            {!hoveredLog.active && (
              <div className="flex justify-between gap-4">
                <span>{t("ended")}</span>
                <span>
                  {new Date(
                    hoveredLog.completed
                      ? new Date(hoveredLog.timestamp).getTime() + (hoveredLog.duration || 0)
                      : new Date(hoveredLog.timestamp).getTime()
                  ).toLocaleTimeString()}
                </span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span>{t("duration")}</span>
              <span>
                {hoveredLog.active
                  ? `~${Math.round((nowMs - computeBarRange(hoveredLog, nowMs).startMs) / 1000).toLocaleString()}s`
                  : `${hoveredLog.duration.toLocaleString()}ms`}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span>{t("status")}</span>
              <span>{hoveredLog.status || t("pending")}</span>
            </div>
            {hoveredLog.kind === "mcp" ? (
              <>
                <div className="flex justify-between gap-4">
                  <span>{t("scope")}</span>
                  <span>{hoveredLog.scopes?.length ? hoveredLog.scopes.join(", ") : "—"}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>{t("apiKey")}</span>
                  <span>{formatApiKeyLabel(hoveredLog.apiKeyName, hoveredLog.apiKeyId)}</span>
                </div>
              </>
            ) : (
              <>
                {hoveredLog.provider && (
                  <div className="flex justify-between gap-4">
                    <span>{t("provider")}</span>
                    <span>{hoveredLog.provider}</span>
                  </div>
                )}
                <div className="flex justify-between gap-4">
                  <span>{t("tokens")}</span>
                  <span>
                    {hoveredLog.tokens.in.toLocaleString()} /{" "}
                    {hoveredLog.tokens.out.toLocaleString()}
                  </span>
                </div>
              </>
            )}
            {hoveredLog.error && (
              <div className="mt-1 text-error text-[9px] break-all">{hoveredLog.error}</div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-3 px-4 py-1.5 border-t border-border text-[9px] shrink-0">
        <div className="flex items-center gap-1">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: TIMELINE_BAR_COLORS.success }}
          />
          <span className="text-text-muted">2xx</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: TIMELINE_BAR_COLORS.warning }}
          />
          <span className="text-text-muted">4xx</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: TIMELINE_BAR_COLORS.error }}
          />
          <span className="text-text-muted">5xx</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: TIMELINE_BAR_COLORS.active }}
          />
          <span className="text-text-muted">{t("active")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: TIMELINE_BAR_COLORS.other }}
          />
          <span className="text-text-muted">{t("other")}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: MCP_BAR_COLOR }} />
          <span className="text-text-muted">{t("mcp")}</span>
        </div>
        <div className="ml-4 flex items-center gap-1.5 text-text-muted">
          <div className="w-3 border-t border-dashed border-text-muted/40" />
          <span>{t("tenMinutes")}</span>
          <div className="w-3 border-t border-text-muted/60 ml-2" />
          <span>{t("hour")}</span>
          <div className="w-3 border-t-2 border-chart-3/50 ml-2" />
          <span>{t("day")}</span>
        </div>
        <div
          className="ml-auto text-text-muted italic"
          title={t(`modes.${MODE_META[mode].descriptionKey}`)}
        >
          {t(`modes.${MODE_META[mode].descriptionKey}`)}
        </div>
      </div>

      {selectedLog && (
        <RequestLoggerDetail
          log={selectedLog as any}
          detail={detailData}
          loading={detailLoading}
          debugEnabled={selectedLog?.active ? true : detailLoggingEnabled}
          emailsVisible={emailsVisible}
          onClose={closeDetail}
          onCopy={copyToClipboard}
          onPrevious={undefined}
          onNext={undefined}
          relatedLogs={[]}
          onSelectRelated={undefined}
        />
      )}
    </div>
  );
}
