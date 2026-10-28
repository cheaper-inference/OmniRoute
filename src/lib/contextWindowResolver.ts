import { getAllSyncedAvailableModels, getSyncedAvailableModels } from "./db/models";
import { getResolvedModelCapabilities } from "./modelCapabilities";
import {
  getModelContextOverrideRecord,
  setModelContextOverride,
  removeModelContextOverride,
} from "./db/modelContextOverrides";
import { invalidateDbCache } from "./db/readCache";

/**
 * Feature 5004 — self-correcting context-window reconciler.
 *
 * Compares each model's provider-declared window (captured by `/models` discovery in
 * `syncedAvailableModels`) against the override-free catalog and, when they diverge,
 * pins the discovered value as an `auto:discovery` override so the real window wins in
 * `getModelContextLimit`. It never touches `manual` overrides, and it self-heals by
 * removing a now-redundant auto override when the catalog has caught up.
 *
 * No new network fetch: it reconciles data the managed-model import already persisted,
 * so it does not duplicate `modelsDevSync` / `modelDiscovery`.
 */

export interface DiscoveredWindow {
  provider: string;
  modelId: string;
  window: number | null;
}

export interface ReconcileDeps {
  getCatalogWindow: (provider: string, modelId: string) => number | null;
  getExistingSource: (provider: string, modelId: string) => string | null;
  /** Stored window of the existing override; lets the pass skip rewriting an unchanged pin. */
  getExistingWindow?: (provider: string, modelId: string) => number | null;
  writeAuto: (provider: string, modelId: string, window: number) => void;
  removeOverride: (provider: string, modelId: string) => void;
}

export interface ReconcileResult {
  scanned: number;
  written: number;
  removed: number;
  skippedManual: number;
}

/**
 * True when `existingSource` is an `auto:discovery` pin that already stores `window`, so the
 * pass can skip rewriting it (the write would only churn `refreshedAt` and the read cache).
 */
function isAlreadyPinned(
  existingSource: string | null,
  deps: ReconcileDeps,
  provider: string,
  modelId: string,
  window: number
): boolean {
  return (
    existingSource === "auto:discovery" && deps.getExistingWindow?.(provider, modelId) === window
  );
}

/** Remove an `auto:discovery` pin when discovery no longer reports a window; true if removed. */
function dropStaleAutoPin(deps: ReconcileDeps, provider: string, modelId: string): boolean {
  if (deps.getExistingSource(provider, modelId) !== "auto:discovery") return false;
  deps.removeOverride(provider, modelId);
  return true;
}

/** Reconcile one discovered window; mutates `result` and goes through the injected deps. */
function reconcileOne(
  { provider, modelId, window }: DiscoveredWindow,
  deps: ReconcileDeps,
  result: ReconcileResult
): void {
  if (!provider || !modelId) return;
  if (typeof window !== "number" || !Number.isInteger(window) || window <= 0) {
    // Discovery omitted a real window. Drop a stale auto:discovery pin
    // (e.g. grok-cli's old 256k fallback) so registry/models.dev can win.
    if (dropStaleAutoPin(deps, provider, modelId)) result.removed++;
    return;
  }

  const existingSource = deps.getExistingSource(provider, modelId);
  if (existingSource === "manual") {
    result.skippedManual++;
    return;
  }

  const catalog = deps.getCatalogWindow(provider, modelId);
  if (window !== catalog) {
    if (isAlreadyPinned(existingSource, deps, provider, modelId, window)) return;
    deps.writeAuto(provider, modelId, window);
    result.written++;
  } else if (existingSource) {
    // Discovered window now matches the catalog and a stale auto override exists → drop it.
    deps.removeOverride(provider, modelId);
    result.removed++;
  }
}

/**
 * Pure reconcile: given the discovered windows and a set of injectable deps, decide
 * which auto overrides to write/remove. Deterministic and side-effect-free except
 * through the injected `writeAuto`/`removeOverride`.
 */
export function reconcileContextWindows(
  discovered: DiscoveredWindow[],
  deps: ReconcileDeps
): ReconcileResult {
  const result: ReconcileResult = { scanned: 0, written: 0, removed: 0, skippedManual: 0 };
  for (const entry of discovered) {
    result.scanned++;
    reconcileOne(entry, deps, result);
  }
  return result;
}

/** Max synchronous work per slice before the cooperative pass yields to the event loop (#18048). */
const RECONCILE_SLICE_MS = 15;

const yieldToEventLoop = (): Promise<void> => new Promise((resolve) => setImmediate(resolve));

/**
 * Cooperative twin of `reconcileContextWindows`: identical decisions, but it hands the
 * event loop back every ~15 ms so a large catalog (100+ connections) cannot starve
 * loopback requests and client traffic (#18048).
 */
export async function reconcileContextWindowsCooperative(
  discovered: DiscoveredWindow[],
  deps: ReconcileDeps
): Promise<ReconcileResult> {
  const result: ReconcileResult = { scanned: 0, written: 0, removed: 0, skippedManual: 0 };
  let sliceStart = performance.now();
  for (const entry of discovered) {
    result.scanned++;
    reconcileOne(entry, deps, result);
    if (performance.now() - sliceStart >= RECONCILE_SLICE_MS) {
      await yieldToEventLoop();
      sliceStart = performance.now();
    }
  }
  return result;
}

/** Flatten the per-provider discovery map into the reconcile input. */
function toDiscoveredWindows(
  byProvider: Record<
    string,
    Array<{ id: string; contextWindow?: number; inputTokenLimit?: number }>
  >
): DiscoveredWindow[] {
  const out: DiscoveredWindow[] = [];
  for (const [provider, models] of Object.entries(byProvider)) {
    for (const m of models) {
      out.push({
        provider,
        modelId: m.id,
        window: m.contextWindow ?? m.inputTokenLimit ?? null,
      });
    }
  }
  return out;
}

export interface RunReconcileOptions {
  /** Restrict the pass to these providers (post-sync path); omit for the full pass. */
  providers?: string[];
}

async function loadDiscoveryByProvider(
  providers?: string[]
): Promise<Awaited<ReturnType<typeof getAllSyncedAvailableModels>>> {
  if (!providers) return getAllSyncedAvailableModels();
  const byProvider: Awaited<ReturnType<typeof getAllSyncedAvailableModels>> = {};
  for (const provider of new Set(providers)) {
    byProvider[provider] = await getSyncedAvailableModels(provider);
    await yieldToEventLoop();
  }
  return byProvider;
}

/** Run the reconcile against the live DB (discovery → overrides). */
export async function runContextWindowReconcile(
  options: RunReconcileOptions = {}
): Promise<ReconcileResult> {
  const byProvider = await loadDiscoveryByProvider(options.providers);
  const discovered = toDiscoveredWindows(byProvider);
  // Each catalog-version bump drops catalog-version memos (the synced vision
  // verdict map, which `getCatalogWindow` reads), so writes inside the pass do
  // not invalidate: one bump at the end. The comparisons below read the
  // override-free catalog and the override table directly, so they stay exact.
  let changed = false;
  try {
    return await reconcileContextWindowsCooperative(discovered, {
      // Compare against the override-free catalog view. A persisted override must
      // never feed back into the comparison that (re)writes it, or the reconciler
      // oscillates (write → equal → remove → differ → write ...).
      getCatalogWindow: (provider, modelId) =>
        getResolvedModelCapabilities({ provider, model: modelId }, { persistedOverrides: false })
          .contextWindow,
      getExistingSource: (provider, modelId) =>
        getModelContextOverrideRecord(provider, modelId)?.source ?? null,
      getExistingWindow: (provider, modelId) =>
        getModelContextOverrideRecord(provider, modelId)?.realContext ?? null,
      writeAuto: (provider, modelId, window) => {
        if (
          setModelContextOverride(provider, modelId, window, "auto:discovery", {
            invalidate: false,
          })
        ) {
          changed = true;
        }
      },
      removeOverride: (provider, modelId) => {
        if (removeModelContextOverride(provider, modelId, { invalidate: false })) changed = true;
      },
    });
  } finally {
    if (changed) invalidateDbCache("model-capabilities");
  }
}

// --- Periodic job (mirrors modelsDevSync.startPeriodicSync) ---

const DEFAULT_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24h
let reconcileTimer: ReturnType<typeof setInterval> | null = null;

function resolveIntervalMs(): number {
  const raw = process.env.CONTEXT_WINDOW_RECONCILE_INTERVAL;
  if (raw === undefined) return DEFAULT_INTERVAL_MS;
  const seconds = Number(raw);
  if (!Number.isFinite(seconds) || seconds <= 0) return 0; // 0/invalid → disabled
  return Math.floor(seconds * 1000);
}

/**
 * Start the periodic reconcile. Idempotent. Disabled when
 * `CONTEXT_WINDOW_RECONCILE_INTERVAL=0`. Best-effort: failures are swallowed (the
 * static catalog remains the source of truth).
 */
export function startContextWindowReconcile(intervalMs?: number): void {
  if (reconcileTimer) return;
  const interval = intervalMs ?? resolveIntervalMs();
  if (!interval || interval <= 0) return;

  const tick = () => {
    void runContextWindowReconcile().catch(() => {
      // Swallow — reconcile is advisory; the catalog still resolves windows.
    });
  };

  // Initial non-blocking pass, then on the interval.
  setTimeout(tick, 0);
  reconcileTimer = setInterval(tick, interval);
  reconcileTimer.unref?.();
}

export function stopContextWindowReconcile(): void {
  if (reconcileTimer) {
    clearInterval(reconcileTimer);
    reconcileTimer = null;
  }
}
