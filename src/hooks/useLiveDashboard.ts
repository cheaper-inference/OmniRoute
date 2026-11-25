/**
 * useLiveDashboard — React hooks for real-time dashboard WebSocket
 *
 * Provides hooks for connecting to the live dashboard WebSocket server
 * and subscribing to event channels.
 *
 * Usage:
 *   const { requests, isConnected } = useLiveRequests();
 *   const { comboEvents, lastComboEvent } = useLiveComboStatus();
 */

"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import type { DashboardChannel, DashboardEventName } from "@/lib/events/types";
import { deriveLiveWsPath, resolveLiveWsUrl, sanitizeLiveWsPort } from "@/shared/utils/wsPath";

// ── Config ────────────────────────────────────────────────────────────────

const WS_RECONNECT_DELAYS = [1000, 2000, 4000, 8000];

// Consecutive sockets that may fail (no accepted session) before the hook stops dialling.
// Each failed attempt makes the browser log its own "WebSocket connection to ... failed"
// line, which page code cannot suppress; dialling forever filled the console of every
// install whose live socket is unreachable (KEA-9514). reconnect() starts a new round.
const MAX_CONSECUTIVE_FAILED_ATTEMPTS = 5;

/** `connection.error` once the hook stopped dialling, or when there is nothing to dial. */
export const LIVE_WS_UNAVAILABLE_ERROR = "Live updates unavailable";

// Must stay <= the server's HEARTBEAT_TIMEOUT_MS (35s in src/server/ws/liveServer.ts) so a
// healthy, connected-but-idle client is never force-terminated by the server's heartbeat sweep.
// Matches the server's own HEARTBEAT_INTERVAL_MS (15s).
const CLIENT_PING_INTERVAL_MS = 15_000;

/** Only accept ws:// or wss:// URLs (mirrors the guard in src/app/api/v1/ws/route.ts). */
function sanitizeWsPublicUrl(url: unknown): string | null {
  if (typeof url !== "string" || url.length === 0) return null;
  return url.startsWith("ws://") || url.startsWith("wss://") ? url : null;
}

function readLiveWsHandshake(
  live?: {
    publicUrl?: unknown;
    path?: unknown;
    port?: unknown;
    enabled?: unknown;
    sameOrigin?: unknown;
  } | null
) {
  const publicUrl = sanitizeWsPublicUrl(live?.publicUrl);
  const path = live?.path;
  // Use the running server's port so a LIVE_WS_PORT override reaches prebuilt images (#11331).
  const port = sanitizeLiveWsPort(live?.port);
  // These flags tell the client whether to dial and whether the HTTP port can relay (KEA-9514).
  const enabled = live?.enabled;
  const sameOrigin = live?.sameOrigin;

  return {
    publicUrl,
    path: typeof path === "string" && path.startsWith("/") ? path : null,
    port,
    enabled: typeof enabled === "boolean" ? enabled : null,
    sameOrigin: typeof sameOrigin === "boolean" ? sameOrigin : null,
  };
}

function getReconnectPlan(accepted: boolean, previousFailures: number) {
  const failures = accepted ? 0 : previousFailures + 1;
  if (failures >= MAX_CONSECUTIVE_FAILED_ATTEMPTS) return { failures, delay: null };

  // 1s after an accepted session dropped or the first failure, then 2s, 4s, 8s.
  const step = Math.min(Math.max(failures - 1, 0), WS_RECONNECT_DELAYS.length - 1);
  return { failures, delay: WS_RECONNECT_DELAYS[step] };
}

// Build-time inlined value (Docker/npm prebuilt images won't have this — the
// runtime value is discovered via the /api/v1/ws?handshake=1 handshake below).
const BUILD_TIME_PUBLIC_WS_URL = sanitizeWsPublicUrl(process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL);
const BUILD_TIME_WS_PATH = deriveLiveWsPath(process.env.NEXT_PUBLIC_LIVE_WS_PUBLIC_URL);

function getDefaultWsUrl(): string {
  if (BUILD_TIME_PUBLIC_WS_URL) return BUILD_TIME_PUBLIC_WS_URL;
  if (typeof window === "undefined") return `ws://localhost:20132${BUILD_TIME_WS_PATH}`;
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const { hostname } = window.location;
  // The WS server's own port. Used on loopback (`next dev` has no upgrade handler on the
  // HTTP port) and when the handshake says the HTTP port cannot relay; off loopback,
  // resolveLiveWsUrl() dials the page's own origin instead (KEA-9514). The handshake
  // replaces the port when the server reports a different one, and a caller can always
  // pass `wsUrl` outright.
  return `${protocol}//${hostname}:20132${BUILD_TIME_WS_PATH}`;
}

const DEFAULT_WS_URL = getDefaultWsUrl();

// ── Types ─────────────────────────────────────────────────────────────────

export interface WsEventPayload {
  event: string;
  channel: DashboardChannel;
  data: unknown;
  timestamp: number;
}

export interface DashboardConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  reconnectAttempt: number;
}

// ── Core Hook ─────────────────────────────────────────────────────────────

export interface UseLiveDashboardOptions {
  /**
   * WebSocket URL. Default: the page's own origin + `/live-ws` off loopback, the live
   * server's port (ws://hostname:20132) on loopback; the handshake can adjust either.
   */
  wsUrl?: string;
  /** Whether the WebSocket connection should be active (default: true) */
  enabled?: boolean;
  /** API key for authentication */
  apiKey?: string;
  /** Channels to subscribe to */
  channels?: DashboardChannel[];
  /** Auto-reconnect on disconnect (default: true) */
  autoReconnect?: boolean;
  /** Event callback */
  onEvent?: (payload: WsEventPayload) => void;
}

/**
 * Core WebSocket connection hook.
 * Manages connection lifecycle, reconnection, and event streaming.
 */
export function useLiveDashboard({
  wsUrl,
  enabled = true,
  apiKey,
  channels = ["requests", "combo", "credentials"],
  autoReconnect = true,
  onEvent,
}: UseLiveDashboardOptions = {}) {
  const [connection, setConnection] = useState<DashboardConnectionState>({
    isConnected: false,
    isConnecting: false,
    error: null,
    reconnectAttempt: 0,
  });

  // Runtime discovery of the public WS URL via the handshake endpoint.
  // NEXT_PUBLIC_* env vars are inlined at build time, so prebuilt Docker/npm
  // images never see a runtime NEXT_PUBLIC_LIVE_WS_PUBLIC_URL — the server
  // echoes it in the /api/v1/ws?handshake=1 response instead.
  // Skipped when the caller passes an explicit wsUrl or the env was inlined.
  const needsHandshake = !wsUrl && !BUILD_TIME_PUBLIC_WS_URL && typeof window !== "undefined";
  const [handshakeUrl, setHandshakeUrl] = useState<string | null>(null);
  const [handshakePath, setHandshakePath] = useState<string | null>(null);
  const [handshakePort, setHandshakePort] = useState<number | null>(null);
  const [handshakeEnabled, setHandshakeEnabled] = useState<boolean | null>(null);
  const [handshakeSameOrigin, setHandshakeSameOrigin] = useState<boolean | null>(null);
  const [wsUrlResolved, setWsUrlResolved] = useState(!needsHandshake);

  useEffect(() => {
    if (!needsHandshake || wsUrlResolved) return;
    let cancelled = false;
    fetch("/api/v1/ws?handshake=1")
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => {
        if (cancelled) return;
        const { publicUrl, path, port, enabled, sameOrigin } = readLiveWsHandshake(body?.live);
        if (publicUrl !== null) setHandshakeUrl(publicUrl);
        if (path !== null) setHandshakePath(path);
        if (port !== null) setHandshakePort(port);
        if (enabled !== null) setHandshakeEnabled(enabled);
        if (sameOrigin !== null) setHandshakeSameOrigin(sameOrigin);
      })
      .catch(() => {
        // Handshake unavailable — fall back to the default URL.
      })
      .finally(() => {
        if (!cancelled) setWsUrlResolved(true);
      });
    return () => {
      cancelled = true;
    };
  }, [needsHandshake, wsUrlResolved]);

  const effectiveWsUrl = resolveLiveWsUrl({
    // A build-time public URL is as explicit as a caller's: no handshake ran for it.
    explicit: wsUrl || BUILD_TIME_PUBLIC_WS_URL,
    handshakeUrl,
    handshakePort,
    handshakePath: handshakePath !== BUILD_TIME_WS_PATH ? handshakePath : null,
    handshakeEnabled,
    handshakeSameOrigin,
    location: typeof window === "undefined" ? null : window.location,
    defaultUrl: DEFAULT_WS_URL,
  });

  const [events, setEvents] = useState<WsEventPayload[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(true);
  // Consecutive connection attempts that ended without an accepted session. A ref,
  // not state: bumping it must not re-create `connect`, whose effect cleanup would
  // drop the next socket mid-handshake.
  const failedAttemptsRef = useRef(0);
  // Each bump makes the connect effect open a fresh socket (backoff timer, reconnect()).
  const [reconnectTick, setReconnectTick] = useState(0);

  const stopPingHeartbeat = useCallback(() => {
    if (pingIntervalRef.current) {
      clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = null;
    }
  }, []);
  const maxEvents = 500;

  const onEventRef = useRef(onEvent);
  useEffect(() => {
    onEventRef.current = onEvent;
  }, [onEvent]);

  // Key + memo pair: the channel ARRAY is usually a fresh literal each render,
  // so `connect` deps use a stable identity derived from its contents.
  const channelsKey = channels.join(",");
  const stableChannels = useMemo(
    () => channelsKey.split(",").filter(Boolean) as DashboardChannel[],
    [channelsKey]
  );

  const connect = useCallback(() => {
    if (!mountedRef.current) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;
    if (!effectiveWsUrl) {
      // The handshake said the live server is off: nothing to dial.
      setConnection((prev) => ({
        ...prev,
        isConnecting: false,
        error: LIVE_WS_UNAVAILABLE_ERROR,
      }));
      return;
    }

    setConnection((prev) => ({
      ...prev,
      isConnecting: true,
      error: null,
    }));

    try {
      const wsUrlWithAuth = apiKey
        ? `${effectiveWsUrl}?token=${encodeURIComponent(apiKey)}`
        : effectiveWsUrl;

      const ws = new WebSocket(wsUrlWithAuth);
      wsRef.current = ws;
      // Set by this socket's "welcome": a session that was accepted and later dropped is
      // not a failed attempt.
      let accepted = false;

      ws.onopen = () => {
        if (!mountedRef.current || wsRef.current !== ws) return;
        // The server authorizes only after the upgrade, so `open` is not an accepted
        // session yet: the backoff resets on "welcome", not here.
        setConnection((prev) => ({
          ...prev,
          isConnected: true,
          isConnecting: false,
          error: null,
        }));

        // Subscribe to channels
        ws.send(JSON.stringify({ type: "subscribe", channels: stableChannels }));

        // Heartbeat: keep sending an application ping. Older servers refreshed
        // liveness only from inbound messages and would otherwise terminate a
        // healthy, idle connection (#10319). The current server counts only the
        // protocol pong the browser sends on its own, and still answers this ping.
        stopPingHeartbeat();
        pingIntervalRef.current = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "ping" }));
          }
        }, CLIENT_PING_INTERVAL_MS);
      };

      ws.onmessage = (event) => {
        if (!mountedRef.current || wsRef.current !== ws) return;
        try {
          const msg = JSON.parse(event.data);

          if (msg.type === "event") {
            const payload: WsEventPayload = {
              event: msg.event,
              channel: msg.channel,
              data: msg.data,
              timestamp: msg.timestamp || Date.now(),
            };
            setEvents((prev) => {
              const next = [...prev, payload];
              return next.length > maxEvents ? next.slice(-maxEvents) : next;
            });
            onEventRef.current?.(payload);
          } else if (msg.type === "pong") {
            // Heartbeat response
          } else if (msg.type === "welcome") {
            // First frame of an accepted session: the backoff starts over.
            accepted = true;
            failedAttemptsRef.current = 0;
            setConnection((prev) => ({ ...prev, reconnectAttempt: 0 }));
            // Send backlog
            if (Array.isArray(msg.data)) {
              setEvents((prev) => {
                const next = [...prev, ...msg.data];
                return next.length > maxEvents ? next.slice(-maxEvents) : next;
              });
              for (const item of msg.data) {
                const payload: WsEventPayload = {
                  event: item.event,
                  channel: item.channel,
                  data: item.data,
                  timestamp: item.timestamp || Date.now(),
                };
                onEventRef.current?.(payload);
              }
            }
          } else if (msg.type === "error") {
            // Once per failing streak: a server that rejects every attempt would otherwise
            // log again on each one.
            if (failedAttemptsRef.current === 0) {
              console.error("[LiveWS] Server error:", msg.code, msg.message);
            }
          }
        } catch {
          // Ignore parse errors
        }
      };

      ws.onclose = () => {
        // A superseded socket must not touch the refs its successor now owns.
        if (wsRef.current !== ws) return;
        stopPingHeartbeat();
        if (!mountedRef.current) return;
        wsRef.current = null;
        setConnection((prev) => ({
          ...prev,
          isConnected: false,
          isConnecting: false,
        }));

        if (autoReconnect) {
          const { failures, delay } = getReconnectPlan(accepted, failedAttemptsRef.current);
          failedAttemptsRef.current = failures;
          if (delay === null) {
            // Stop dialling; reconnect() starts a new round (KEA-9514).
            setConnection((prev) => ({ ...prev, error: LIVE_WS_UNAVAILABLE_ERROR }));
            return;
          }
          reconnectTimeoutRef.current = setTimeout(() => {
            setConnection((prev) => ({ ...prev, reconnectAttempt: Math.max(failures, 1) }));
            setReconnectTick((tick) => tick + 1);
          }, delay);
        }
      };

      ws.onerror = () => {
        if (!mountedRef.current || wsRef.current !== ws) return;
        setConnection((prev) => ({
          ...prev,
          isConnecting: false,
          error: "Connection failed",
        }));
      };
    } catch (err) {
      setConnection((prev) => ({
        ...prev,
        isConnecting: false,
        error: err instanceof Error ? err.message : "Connection failed",
      }));
    }
  }, [effectiveWsUrl, apiKey, stableChannels, autoReconnect, stopPingHeartbeat]);

  // Connect on mount and on reconnect trigger
  useEffect(() => {
    mountedRef.current = true;
    if (!enabled) {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      stopPingHeartbeat();
      const ws = wsRef.current;
      wsRef.current = null;
      ws?.close();
      failedAttemptsRef.current = 0;
      setConnection({
        isConnected: false,
        isConnecting: false,
        error: null,
        reconnectAttempt: 0,
      });
      return;
    }

    // Wait for the handshake URL resolution before opening the socket, so we
    // never connect to the hardcoded default and then flap to the public URL.
    if (!wsUrlResolved) return;

    connect();
    return () => {
      mountedRef.current = false;
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      stopPingHeartbeat();
      const ws = wsRef.current;
      wsRef.current = null;
      ws?.close();
    };
  }, [connect, enabled, wsUrlResolved, stopPingHeartbeat, reconnectTick]);

  // Connect (for manual retry)
  const reconnect = useCallback(() => {
    // A manual retry gets a full round of attempts, also after the hook gave up.
    failedAttemptsRef.current = 0;
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    const ws = wsRef.current;
    wsRef.current = null;
    ws?.close();
    setReconnectTick((tick) => tick + 1);
  }, []);

  return {
    connection,
    events,
    reconnect,
    /** Filter events by channel */
    getEventsByChannel: useCallback(
      (channel: DashboardChannel) => events.filter((e) => e.channel === channel),
      [events]
    ),
    /** Filter events by name */
    getEventsByName: useCallback(
      (eventName: string) => events.filter((e) => e.event === eventName),
      [events]
    ),
    /** Clear event history */
    clearEvents: useCallback(() => setEvents([]), []),
  };
}

// ── Request Monitoring Hook ───────────────────────────────────────────────

export interface LiveRequest {
  id: string;
  model: string;
  provider: string;
  timestamp: number;
  status: "pending" | "running" | "success" | "error";
  tokensInput?: number;
  tokensOutput?: number;
  latencyMs?: number;
  error?: string;
  comboName?: string;
}

/**
 * Hook for monitoring live requests.
 */
export function useLiveRequests(options?: UseLiveDashboardOptions) {
  const [requestState, setRequestState] = useState<{
    active: Map<string, LiveRequest>;
    completed: LiveRequest[];
  }>({
    active: new Map(),
    completed: [],
  });
  const maxCompleted = 100;

  const handleEvent = useCallback((event: WsEventPayload) => {
    if (event.channel !== "requests") return;

    if (event.event === "request.started") {
      const data = event.data as any;
      setRequestState((prev) => {
        const active = new Map(prev.active);
        active.set(data.id, {
          id: data.id,
          model: data.model,
          provider: data.provider,
          timestamp: data.timestamp,
          status: "pending",
          comboName: data.comboName,
        });
        return { active, completed: prev.completed };
      });
    } else if (event.event === "request.streaming") {
      const data = event.data as any;
      setRequestState((prev) => {
        const active = new Map(prev.active);
        const existing = active.get(data.id);
        if (existing) {
          active.set(data.id, { ...existing, status: "running" });
        }
        return { active, completed: prev.completed };
      });
    } else if (event.event === "request.completed") {
      const data = event.data as any;
      setRequestState((prev) => {
        const active = new Map(prev.active);
        const existing = active.get(data.id);
        if (existing) {
          active.delete(data.id);
          const done: LiveRequest = {
            ...existing,
            status: data.status === "success" ? "success" : "error",
            tokensInput: data.tokensInput,
            tokensOutput: data.tokensOutput,
            latencyMs: data.latencyMs,
            error: data.error,
          };
          const completed = [done, ...prev.completed].slice(0, maxCompleted);
          return { active, completed };
        }
        return prev;
      });
    } else if (event.event === "request.failed") {
      const data = event.data as any;
      setRequestState((prev) => {
        const active = new Map(prev.active);
        const existing = active.get(data.id);
        if (existing) {
          active.delete(data.id);
          const done: LiveRequest = {
            ...existing,
            status: "error",
            error: data.error,
            latencyMs: data.latencyMs,
          };
          const completed = [done, ...prev.completed].slice(0, maxCompleted);
          return { active, completed };
        }
        return prev;
      });
    }
  }, []);

  const { connection, reconnect } = useLiveDashboard({
    channels: ["requests"],
    onEvent: handleEvent,
    ...options,
  });

  return {
    activeRequests: Array.from(requestState.active.values()),
    completedRequests: requestState.completed,
    activeCount: requestState.active.size,
    isConnected: connection.isConnected,
    reconnect,
  };
}

// ── Combo Status Hook ─────────────────────────────────────────────────────

export interface LiveComboEvent {
  comboName: string;
  targetIndex: number;
  provider: string;
  model: string;
  type: "attempt" | "succeeded" | "failed";
  /** Routing strategy, carried on the attempt payload (used by the Combo Studio). */
  strategy?: string;
  latencyMs?: number;
  error?: string;
  timestamp: number;
  /** The account that served or attempted this target, when known. */
  connectionId?: string;
}

/**
 * Map one `combo` channel WS frame to the event the Combo Studio reducer consumes.
 * Returns null for any other event.
 */
export function toLiveComboEvent(event: WsEventPayload): LiveComboEvent | null {
  const data = event.data as any;
  const base = {
    comboName: data.comboName,
    targetIndex: data.targetIndex,
    provider: data.provider,
    model: data.model,
    timestamp: event.timestamp,
    connectionId: data.connectionId,
  };
  if (event.event === "combo.target.attempt") {
    return { ...base, type: "attempt", strategy: data.strategy };
  }
  if (event.event === "combo.target.succeeded") {
    return { ...base, type: "succeeded", latencyMs: data.latencyMs };
  }
  if (event.event === "combo.target.failed") {
    return { ...base, type: "failed", error: data.error, latencyMs: data.latencyMs };
  }
  return null;
}

/**
 * Hook for monitoring live combo cascade status.
 */
export function useLiveComboStatus(options?: UseLiveDashboardOptions) {
  const [comboEvents, setComboEvents] = useState<LiveComboEvent[]>([]);
  const maxComboEvents = 200;

  const handleEvent = useCallback((event: WsEventPayload) => {
    if (event.channel !== "combo") return;

    const comboEvent = toLiveComboEvent(event);
    if (comboEvent) {
      setComboEvents((prev) => [comboEvent!, ...prev].slice(0, maxComboEvents));
    }
  }, []);

  const { connection, reconnect } = useLiveDashboard({
    channels: ["combo"],
    onEvent: handleEvent,
    ...options,
  });

  /** Get events for a specific combo */
  const getComboHistory = useCallback(
    (comboName: string) => comboEvents.filter((e) => e.comboName === comboName),
    [comboEvents]
  );

  /** Get the last event for a specific combo */
  const getLastComboEvent = useCallback(
    (comboName: string) => comboEvents.find((e) => e.comboName === comboName),
    [comboEvents]
  );

  return {
    comboEvents,
    activeCombos: new Set(comboEvents.map((e) => e.comboName)),
    isConnected: connection.isConnected,
    getComboHistory,
    getLastComboEvent,
    reconnect,
  };
}

// ── Connection Status Hook ────────────────────────────────────────────────

/**
 * Hook for checking connection status only (no events).
 */
export function useLiveConnectionStatus(options?: UseLiveDashboardOptions) {
  const { connection, reconnect } = useLiveDashboard({
    channels: [],
    ...options,
  });
  return { ...connection, reconnect };
}
