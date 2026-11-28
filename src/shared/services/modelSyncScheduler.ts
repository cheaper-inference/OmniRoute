/**
 * Model Auto-Sync Scheduler (#488)
 *
 * Automatically refreshes model lists for provider connections that have
 * autoSync enabled in their providerSpecificData, at a configurable
 * interval (default: 6h).
 *
 * Pattern mirrors cloudSyncScheduler.ts for consistency.
 */

import { randomUUID } from "node:crypto";
import { Agent, buildConnector, fetch as undiciFetch, type Dispatcher } from "undici";
import { getSettings, updateSettings } from "@/lib/db/settings";
import { isConnectionUnavailableToAuxiliaryActivity } from "@/lib/exclusiveLeaseIsolation";
import { runConnectionFollowUp } from "@/lib/providers/connectionFollowUps";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { timingSafeCompare } from "@/shared/utils/timingSafeCompare";
import { getProcessStore } from "@/shared/utils/processSingleton";

export const DEFAULT_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours

/** Node clamps timer delays above this to about 1ms, so never arm a timer past it. */
export const MAX_TIMER_DELAY_MS = 2_147_483_647;

/** Intervals below one second are meaningless for a background catalog sync. */
export const MIN_SYNC_INTERVAL_MS = 1_000;

/** Whole-string check for MODEL_SYNC_INTERVAL_HOURS: a signed number, nothing else. */
const HOURS_SETTING_PATTERN = /^[-+]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;

/** True only for literals that mean exactly zero: "0", "0.0", "-0", "0e5". */
function isZeroHoursLiteral(raw: string): boolean {
  const mantissa = raw.replace(/^[-+]/, "").replace(/[eE][-+]?\d+$/, "");
  return mantissa.length > 0 && /^0*(?:\.0*)?$/.test(mantissa);
}

/** Keep a delay inside the timer range; an absent value falls back to the default. */
function clampTimerDelay(ms: number): number {
  if (Number.isNaN(ms)) return DEFAULT_INTERVAL_MS;
  // Infinity here means "longer than the timer can express", not "no value":
  // clamping it keeps the operator's intent instead of reinstating six hours.
  return Math.min(Math.max(Math.round(ms), MIN_SYNC_INTERVAL_MS), MAX_TIMER_DELAY_MS);
}
/** Cycle-wide in-flight cap. Heap cost is total catalog JSON, not one upstream. */
export const MODEL_SYNC_CYCLE_CONCURRENCY = 4;
/** First cycle after boot. Past cleanup's 30s so the two jobs do not overlap. */
export const MODEL_SYNC_STARTUP_DELAY_MS = 90_000;
/**
 * Phase offset (not a period change) between this scheduler's recurring tick
 * and cleanup.ts's own 6h scheduler (#13973 — both are started back-to-back
 * in the same boot sequence, so with the same period they collide every 6h
 * for the process lifetime). The recurring `setInterval` is armed only after
 * this delay, so every periodic tick lands at boot + offset + k * interval
 * while the configured interval itself stays exactly as configured.
 */
export const MODEL_SYNC_STAGGER_OFFSET_MS = 45 * 60 * 1000; // 45 minutes
const MODEL_SYNC_SETTING_KEY = "model_sync_last_run";
const MODEL_SYNC_INTERNAL_AUTH_HEADER = "x-model-sync-internal-auth";
export const MODEL_SYNC_LOCAL_SPAWN_DENIED_HEADER = "x-model-sync-local-spawn-denied";

function normalizeInternalBasePath(value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "/") return "";
  if (!trimmed.startsWith("/") || /[?#\\]/.test(trimmed)) return "";

  const segments = trimmed.split("/").filter(Boolean);
  if (segments.some((segment) => segment === "." || segment === "..")) return "";
  return `/${segments.join("/")}`;
}

/**
 * Trusted origin for server-internal self-fetches (model sync, auto-discovery).
 *
 * SECURITY: never derive this from the incoming request (`request.url` /
 * `Host` header) — that is client-controlled and lets a caller redirect an
 * internal, credential-bearing self-fetch to an arbitrary host (SSRF +
 * internal-auth-header exfiltration; CodeQL js/request-forgery). Always use
 * this loopback/env-pinned origin instead.
 */
export function getModelSyncInternalBaseUrl(): string {
  return resolveModelSyncInternalBaseUrl();
}

export function resolveModelSyncInternalBaseUrl(_candidate?: string): string {
  const { dashboardPort } = getRuntimePorts();
  const nativeTls = process.env.OMNIROUTE_INTERNAL_SCHEME === "https";
  const origin = nativeTls
    ? `https://localhost:${dashboardPort}`
    : `http://127.0.0.1:${dashboardPort}`;
  return `${origin}${normalizeInternalBasePath(process.env.OMNIROUTE_BASE_PATH)}`;
}

export function createPinnedModelSyncTlsConnector(
  connect: buildConnector.connector = buildConnector({ servername: "localhost" })
): buildConnector.connector {
  return (options, callback) =>
    connect(
      {
        ...options,
        host: "localhost",
        hostname: "127.0.0.1",
        servername: "localhost",
      },
      callback
    );
}

let pinnedModelSyncTlsDispatcher: Dispatcher | null = null;

function getPinnedModelSyncTlsDispatcher(): Dispatcher {
  if (!pinnedModelSyncTlsDispatcher) {
    pinnedModelSyncTlsDispatcher = new Agent({
      connect: createPinnedModelSyncTlsConnector(),
      connections: 8,
      pipelining: 0,
    });
  }
  return pinnedModelSyncTlsDispatcher;
}

const fetchWithDispatcher = undiciFetch as unknown as (
  input: RequestInfo | URL,
  init: RequestInit & { dispatcher: Dispatcher }
) => Promise<Response>;

export const fetchModelSyncInternal: typeof fetch = async (input, init = {}) => {
  const inputUrl =
    typeof input === "string" || input instanceof URL ? new URL(input) : new URL(input.url);
  const expectedBase = new URL(getModelSyncInternalBaseUrl());
  if (
    inputUrl.protocol !== expectedBase.protocol ||
    inputUrl.hostname !== expectedBase.hostname ||
    inputUrl.port !== expectedBase.port ||
    inputUrl.username ||
    inputUrl.password
  ) {
    throw new TypeError("model sync internal fetch must target the active dashboard listener");
  }

  const basePath = expectedBase.pathname === "/" ? "" : expectedBase.pathname;
  if (basePath && inputUrl.pathname !== basePath && !inputUrl.pathname.startsWith(`${basePath}/`)) {
    throw new TypeError("model sync internal fetch must stay under the configured base path");
  }

  const requestInit = { ...init, redirect: "error" as const };
  if (inputUrl.protocol === "https:") {
    return fetchWithDispatcher(inputUrl, {
      ...requestInit,
      dispatcher: getPinnedModelSyncTlsDispatcher(),
    });
  }
  return globalThis.fetch(inputUrl.href, requestInit);
};

const globalState = globalThis as typeof globalThis & {
  __omnirouteModelSyncInternalAuthToken?: string;
};

interface SchedulerTimers {
  /** Recurring interval, armed once the phase offset elapses. */
  timer: NodeJS.Timeout | null;
  /** Pending one-shot that arms `timer` after the phase offset. */
  phase: NodeJS.Timeout | null;
  /** Pending first cycle; must be cancellable like the others. */
  startup: NodeJS.Timeout | null;
  /** Cycle-wide in-flight guard, shared so two module copies cannot both run one. */
  running: boolean;
}

/**
 * Timers live in the process store, not in module scope. A bundled server chunk
 * can load a second copy of this module, and a route reading its own copy would
 * report a running scheduler as stopped. `processSingleton` exists for exactly
 * that; the internal auth token above uses the same trick.
 */
function schedulerTimers(): SchedulerTimers {
  return getProcessStore<SchedulerTimers>("modelSyncScheduler.timers", () => ({
    timer: null,
    phase: null,
    startup: null,
    running: false,
  }));
}
let internalAuthToken: string | null = null;

function getInternalAuthToken(): string {
  if (!internalAuthToken) {
    internalAuthToken = globalState.__omnirouteModelSyncInternalAuthToken || randomUUID();
    globalState.__omnirouteModelSyncInternalAuthToken = internalAuthToken;
  }
  return internalAuthToken;
}

export function getModelSyncInternalAuthHeaderName(): string {
  return MODEL_SYNC_INTERNAL_AUTH_HEADER;
}

export function buildModelSyncInternalHeaders(
  options: { denyLocalSpawn?: boolean } = {}
): Record<string, string> {
  return {
    [MODEL_SYNC_INTERNAL_AUTH_HEADER]: getInternalAuthToken(),
    ...(options.denyLocalSpawn ? { [MODEL_SYNC_LOCAL_SPAWN_DENIED_HEADER]: "1" } : {}),
  };
}

export function isModelSyncInternalRequest(request: { headers: Headers }): boolean {
  if (!internalAuthToken && globalState.__omnirouteModelSyncInternalAuthToken) {
    internalAuthToken = globalState.__omnirouteModelSyncInternalAuthToken;
  }
  const headerToken = request.headers.get(MODEL_SYNC_INTERNAL_AUTH_HEADER);
  return Boolean(
    headerToken && internalAuthToken && timingSafeCompare(headerToken, internalAuthToken)
  );
}

export function isModelSyncLocalSpawnDenied(request: { headers: Headers }): boolean {
  return (
    isModelSyncInternalRequest(request) &&
    request.headers.get(MODEL_SYNC_LOCAL_SPAWN_DENIED_HEADER) === "1"
  );
}

/** Providers whose connections are created with `autoSync: true` (#488). */
const AUTO_SYNC_DEFAULT_PROVIDERS = new Set(["antigravity", "agy"]);

/**
 * Whether a connection takes part in the sync cycle.
 *
 * `autoSync` unset means the connection predates the family default, not that the operator
 * opted out — those connections never refreshed their catalog again, so every model Google
 * shipped after the connection was created stayed invisible. An explicit `false` is still
 * honored.
 */
export function isAutoSyncEnabled(provider: unknown, psd: Record<string, unknown>): boolean {
  if (psd.autoSync === true) return true;
  if (psd.autoSync !== undefined) return false;
  return typeof provider === "string" && AUTO_SYNC_DEFAULT_PROVIDERS.has(provider);
}

/**
 * Fetch all provider connections that have autoSync enabled.
 */
async function getAutoSyncConnections(): Promise<
  Array<{ id: string; provider: string; name?: string }>
> {
  try {
    const { getProviderConnections } = await import("@/lib/db/providers");
    const connections = await getProviderConnections();
    const autoSyncConnections: Array<{ id: string; provider: string; name?: string }> = [];
    for (const conn of connections) {
      if (!conn.isActive && conn.isActive !== undefined) continue;
      if (
        typeof conn.id === "string" &&
        (await isConnectionUnavailableToAuxiliaryActivity(conn.id))
      )
        continue;
      const psd =
        conn.providerSpecificData && typeof conn.providerSpecificData === "object"
          ? (conn.providerSpecificData as Record<string, unknown>)
          : {};
      if (!isAutoSyncEnabled(conn.provider, psd)) continue;
      if (typeof conn.id !== "string" || typeof conn.provider !== "string") continue;
      autoSyncConnections.push({
        id: conn.id,
        provider: conn.provider,
        ...(typeof conn.name === "string" ? { name: conn.name } : {}),
      });
    }
    return autoSyncConnections;
  } catch (err) {
    console.warn("[ModelSync] Failed to load connections:", (err as Error).message);
    return [];
  }
}

/**
 * Sync models for a single connection via the internal sync-models endpoint.
 *
 * Shared by the scheduled auto-sync cycle and the reactive trigger
 * (src/lib/providerModels/reactiveModelSync.ts) that runs a discovery sync
 * after an upstream model-not-found 404.
 */
export async function syncConnectionModels(
  connectionId: string,
  provider: string,
  baseUrl: string,
  options: { mode?: "import" | "sync" } = {}
): Promise<boolean> {
  try {
    // `mode=import` keeps the catalog-import semantics the API-key create path
    // had before it moved to this shared helper.
    const query = options.mode === "import" ? "?mode=import" : "";
    const res = await fetchModelSyncInternal(
      `${baseUrl}/api/providers/${connectionId}/sync-models${query}`,
      {
        method: "POST",
        redirect: "error",
        headers: {
          "Content-Type": "application/json",
          ...buildModelSyncInternalHeaders(),
        },
      }
    );
    if (!res.ok) {
      console.warn(
        `[ModelSync] ${provider} (${connectionId.slice(0, 8)}): sync returned ${res.status}`
      );
      return false;
    }
    const data = await res.json();
    const removedSynced = Number(data.modelChanges?.removed) || 0;
    const removedCustom = Number(data.customModelChanges?.removed) || 0;
    const removed =
      removedSynced || removedCustom
        ? ` (removed: ${removedSynced} synced, ${removedCustom} custom)`
        : "";
    console.log(
      `[ModelSync] ${provider} (${connectionId.slice(0, 8)}): ✓ ${data.syncedModels || 0} models${removed}`
    );
    return true;
  } catch (err) {
    // Constant format: the provider id stays a plain argument, so a "%s" in it is not a
    // format directive (CodeQL #1407).
    console.warn(
      "[ModelSync] %s (%s): fetch failed — %s",
      provider,
      connectionId.slice(0, 8),
      (err as Error).message
    );
    return false;
  }
}

/**
 * Run the first model sync for a connection a credential import just created or replaced.
 *
 * The sync cycle only reaches a connection on its next tick (up to the configured interval
 * after the import), and until then the account has no synced inventory, so routing treats
 * it as advertising nothing. This starts the same per-connection sync now, as a tracked
 * follow-up: the import response does not wait for it, and a failure never fails the import.
 * The outcome lands where every other sync writes it (the model-sync call log and the
 * connection's discovery state). Connections the cycle would skip are skipped here too.
 */
export function startConnectionModelSync(connection: {
  id?: unknown;
  provider?: unknown;
  name?: unknown;
  isActive?: unknown;
  providerSpecificData?: unknown;
}): void {
  const { id, provider } = connection;
  if (typeof id !== "string" || !id || typeof provider !== "string") return;
  if (connection.isActive === false) return;
  const psd =
    connection.providerSpecificData && typeof connection.providerSpecificData === "object"
      ? (connection.providerSpecificData as Record<string, unknown>)
      : {};
  if (!isAutoSyncEnabled(provider, psd)) return;
  const label = typeof connection.name === "string" && connection.name ? connection.name : provider;
  runConnectionFollowUp(`Initial model sync error for ${id}`, async () => {
    if (await isConnectionUnavailableToAuxiliaryActivity(id)) return;
    await syncConnectionModels(id, label, getModelSyncInternalBaseUrl());
  });
}

async function mapWithConcurrencySettled<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T) => Promise<R>
): Promise<PromiseSettledResult<R>[]> {
  const results = new Array<PromiseSettledResult<R>>(values.length);
  let nextIndex = 0;
  const workerCount = Math.min(Math.max(1, concurrency), values.length);
  const workers = Array.from({ length: workerCount }, async () => {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      try {
        const value = await mapper(values[index]);
        results[index] = { status: "fulfilled", value };
      } catch (reason) {
        results[index] = { status: "rejected", reason };
      }
    }
  });
  await Promise.all(workers);
  return results;
}

/**
 * Run one full model-sync cycle across all auto-sync connections.
 */
async function runSyncCycle(apiBaseUrl: string): Promise<void> {
  const cycleState = schedulerTimers();
  if (cycleState.running) {
    console.log("[ModelSync] Skipping cycle — previous run still in progress");
    return;
  }
  cycleState.running = true;
  const start = Date.now();

  try {
    const connections = await getAutoSyncConnections();

    if (connections.length === 0) {
      console.log("[ModelSync] No connections with autoSync enabled — skipping cycle");
      return;
    }

    console.log(`[ModelSync] Starting model sync cycle — ${connections.length} connection(s)`);

    const results = await mapWithConcurrencySettled(
      connections,
      MODEL_SYNC_CYCLE_CONCURRENCY,
      (conn) => syncConnectionModels(conn.id, conn.name || conn.provider, apiBaseUrl)
    );

    const succeeded = results.filter((r) => r.status === "fulfilled" && r.value === true).length;
    console.log(
      `[ModelSync] Cycle complete: ${succeeded}/${connections.length} synced in ${Date.now() - start}ms`
    );

    // Record last sync time
    try {
      await updateSettings({ [MODEL_SYNC_SETTING_KEY]: new Date().toISOString() });
    } catch {
      // Non-critical
    }
  } finally {
    cycleState.running = false;
  }
}

/** Resolve the operator's interval before any scheduler timers are armed. */
function resolveModelSyncIntervalMs(intervalMs: number): number | null {
  // Read MODEL_SYNC_INTERVAL_HOURS env override. Zero or a negative value turns
  // the background sync off; falling back to the default interval would leave an
  // operator who asked for "off" with four sync cycles per connection per day.
  // The whole string has to be a number: a prefix parser reads "0,5" or "0.5h"
  // as a partial value, and a malformed setting must keep the caller's interval
  // instead of silently turning syncing off.
  const rawHours = (process.env.MODEL_SYNC_INTERVAL_HOURS ?? "").trim();
  const hoursValid = HOURS_SETTING_PATTERN.test(rawHours);
  const hoursValue = hoursValid ? Number(rawHours) : NaN;
  // Only an explicit zero or a negative value means "off". A positive literal too
  // small to represent (1e-324 parses to 0) is a tiny delay, not a request to
  // disable syncing, so it takes the same below-the-floor path as 0.5 seconds.
  // The sign has to be read from the literal: -1e309 overflows to -Infinity, and
  // an operator who wrote a negative number still asked for "off".
  const offRequested =
    hoursValid &&
    (rawHours.startsWith("-") ||
      (Number.isFinite(hoursValue) && hoursValue === 0 && isZeroHoursLiteral(rawHours)));
  if (offRequested) return null;

  // A delay outside the timer range is not a harmless mistake: Node clamps it to
  // about 1ms, so a very large hour count would run a sync cycle per millisecond
  // instead of once every few weeks. Clamp both ends, and treat a value that
  // rounds below one second as unusable rather than arming a busy loop.
  // A valid literal whose scaled value overflows is "as long as the timer allows",
  // not a malformed setting: keep the overflow so the clamp below lands on the max.
  const requestedMs = Number.isNaN(hoursValue) ? NaN : hoursValue * 60 * 60 * 1000;
  // The floor applies to the delay that will actually be armed: 999.7 ms rounds to
  // one second and is fine, 999 ms does not and falls back to the caller.
  const roundedMs = Number.isNaN(requestedMs) ? NaN : Math.round(requestedMs);
  const chosenMs =
    Number.isNaN(roundedMs) || roundedMs < MIN_SYNC_INTERVAL_MS ? intervalMs : requestedMs;
  return clampTimerDelay(chosenMs);
}

/**
 * Start the model sync scheduler and report whether it is scheduled or running.
 * @param apiBaseUrl — internal base URL to call OmniRoute's own API
 * @param intervalMs — sync interval in milliseconds (default: 6h)
 */
export function startModelSyncScheduler(
  apiBaseUrl = getModelSyncInternalBaseUrl(),
  intervalMs = DEFAULT_INTERVAL_MS
): boolean {
  const timers = schedulerTimers();
  if (timers.timer || timers.phase) {
    console.log("[ModelSync] Scheduler already running — skipping start");
    return true;
  }

  const effectiveIntervalMs = resolveModelSyncIntervalMs(intervalMs);
  if (effectiveIntervalMs === null) {
    // Nothing is armed here, including the one-shot Codex catalog revalidation below:
    // turning model syncing off must leave the process free of model-sync timers, which
    // #20865 pins. A disabled install therefore skips that single revalidation on upgrade.
    console.log("[ModelSync] Scheduler disabled by MODEL_SYNC_INTERVAL_HOURS");
    return false;
  }
  const trustedApiBaseUrl = resolveModelSyncInternalBaseUrl(apiBaseUrl);

  console.log(
    `[ModelSync] Scheduler started — interval: ${effectiveIntervalMs / 3_600_000}h ` +
      `(phase offset +${MODEL_SYNC_STAGGER_OFFSET_MS / 60_000}m)`
  );

  // Serve traffic first; cleanup's first pass is +30s, so stay past that window.
  timers.startup = setTimeout(() => {
    timers.startup = null;
    // Returned for callers that invoke this handle directly (tests); Node discards a timer callback's return value.
    return runSyncCycle(trustedApiBaseUrl);
  }, MODEL_SYNC_STARTUP_DELAY_MS);
  timers.startup.unref?.();

  // Codex-only: revalidate catalog only on first-start or app upgrade (not every boot).
  void import("./codexCatalogRevalidation")
    .then(({ scheduleCodexCatalogRevalidation }) => {
      scheduleCodexCatalogRevalidation({ apiBaseUrl: trustedApiBaseUrl });
    })
    .catch(() => {
      // silent
    });

  // Then run on the regular interval, phase-shifted against cleanup.ts's
  // own 6h scheduler (#13973). The period stays `effectiveIntervalMs`; only
  // the moment the interval is armed moves.
  timers.phase = setTimeout(() => {
    timers.phase = null;
    timers.timer = setInterval(() => runSyncCycle(trustedApiBaseUrl), effectiveIntervalMs);
    timers.timer.unref?.();
  }, MODEL_SYNC_STAGGER_OFFSET_MS);
  timers.phase.unref?.();
  return true;
}

/**
 * Whether the scheduler currently owns a timer.
 *
 * Callers that report status must ask the scheduler instead of keeping their own
 * copy: the boot path (instrumentation -> initCloudSync) starts it directly, so a
 * route-local flag would answer "not initialized" for every process that never
 * received a POST.
 */
export function isModelSyncSchedulerRunning(): boolean {
  const timers = schedulerTimers();
  return timers.timer !== null || timers.phase !== null;
}

/**
 * Stop the model sync scheduler.
 */
export function stopModelSyncScheduler(): void {
  const timers = schedulerTimers();
  if (timers.startup) {
    clearTimeout(timers.startup);
    timers.startup = null;
    console.log("[ModelSync] Scheduler stopped");
  }
  if (timers.phase) {
    clearTimeout(timers.phase);
    timers.phase = null;
    console.log("[ModelSync] Scheduler stopped");
  }
  if (timers.timer) {
    clearInterval(timers.timer);
    timers.timer = null;
    console.log("[ModelSync] Scheduler stopped");
  }
}

/**
 * Get last sync timestamp from settings DB.
 */
export async function getLastModelSyncTime(): Promise<string | null> {
  try {
    const settings = await getSettings();
    return (settings as Record<string, string>)[MODEL_SYNC_SETTING_KEY] ?? null;
  } catch {
    return null;
  }
}
