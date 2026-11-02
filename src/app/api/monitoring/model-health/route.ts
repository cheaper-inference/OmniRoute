import { NextResponse } from "next/server";
import { getCachedProviderConnections } from "@/lib/db/readCache";
import { getAllCircuitBreakerStatuses } from "@/shared/utils/circuitBreaker";
import { isModelLocked, isAccountUnavailable } from "@omniroute/open-sse/services/accountFallback";
import { resolveProviderId } from "@/shared/constants/providers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getSyncedAvailableModelsByConnection } from "@/lib/db/models";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  classifyModelState,
  type ModelHealthState,
  type CircuitBreakerState,
} from "./classifyModelState";

/**
 * GET /api/monitoring/model-health
 *
 * Real-time health states for every provider/model combination.
 * Each model is classified as: HEALTHY, DEGRADED, RATE_LIMITED, AUTH_FAILED,
 * PROVIDER_DOWN, CONNECTION_BLOCKED, MODEL_LOCKED or UNKNOWN.
 *
 * Management-only: the payload carries connection ids/names, lockouts and
 * per-key error state (GHSA-mvf8-qc78-5mxm). The authz pipeline classifies the
 * path as MANAGEMENT, and the handler refuses a non-management caller itself as
 * well, so there is no anonymous view.
 *
 * Response format:
 * {
 *   timestamp: ISO string,
 *   summary: { healthy: N, degraded: N, rate_limited: N, ... },
 *   providers: [
 *     {
 *       provider: "openai",
 *       circuitBreakerState: "CLOSED" | "DEGRADED" | "OPEN" | "HALF_OPEN",
 *       canExecute: boolean,
 *       retryAfterMs?: number,
 *       connections: [
 *         {
 *           connectionId: "abc123",
 *           connectionName: "OpenAI Key 1",
 *           state: "HEALTHY" | "RATE_LIMITED" | ...,
 *           rateLimitedUntil?: ISO string,
 *           testStatus?: string,
 *           models: [{ model: "gpt-4", state: "HEALTHY" | "MODEL_LOCKED" | ... }]
 *         }
 *       ]
 *     }
 *   ]
 * }
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

interface ModelHealth {
  model: string;
  state: ModelHealthState;
  lockedUntil?: string;
  reason?: string;
}

interface ConnectionHealth {
  connectionId: string;
  connectionName: string;
  state: ModelHealthState;
  rateLimitedUntil?: string;
  testStatus?: string;
  models: ModelHealth[];
}

interface ProviderHealth {
  provider: string;
  circuitBreakerState: CircuitBreakerState;
  canExecute: boolean;
  retryAfterMs?: number;
  connections: ConnectionHealth[];
}

interface HealthSummary {
  healthy: number;
  degraded: number;
  rateLimited: number;
  authFailed: number;
  providerDown: number;
  connectionBlocked: number;
  modelLocked: number;
  unknown: number;
}

/**
 * Only the fields this route reads off a cached provider connection. The cache
 * is typed `unknown[]` (it also carries raw/encrypted variants), so the shape is
 * validated here rather than asserted with a cast.
 */
interface ProviderConnectionRow {
  id: string;
  provider: string;
  name: string | null;
  testStatus: string | null;
  rateLimitedUntil: string | null;
}

function asProviderConnectionRow(value: unknown): ProviderConnectionRow | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;
  if (typeof row.provider !== "string" || row.provider.length === 0) return null;
  if (typeof row.id !== "string" || row.id.length === 0) return null;
  return {
    id: row.id,
    provider: row.provider,
    name: typeof row.name === "string" ? row.name : null,
    testStatus: typeof row.testStatus === "string" ? row.testStatus : null,
    rateLimitedUntil: typeof row.rateLimitedUntil === "string" ? row.rateLimitedUntil : null,
  };
}

const MODEL_HEALTH_STATES: readonly ModelHealthState[] = [
  "HEALTHY",
  "DEGRADED",
  "RATE_LIMITED",
  "AUTH_FAILED",
  "PROVIDER_DOWN",
  "CONNECTION_BLOCKED",
  "MODEL_LOCKED",
  "UNKNOWN",
];

function isModelHealthState(value: string | null): value is ModelHealthState {
  return value !== null && (MODEL_HEALTH_STATES as readonly string[]).includes(value);
}

const CIRCUIT_BREAKER_STATES: readonly CircuitBreakerState[] = [
  "CLOSED",
  "DEGRADED",
  "OPEN",
  "HALF_OPEN",
];

// `CircuitBreakerStatus.state` is typed `string`; coerce to the known union and
// fall back to CLOSED for anything unexpected (fail open — never hide a
// provider because of an unknown state token).
function toCircuitBreakerState(value: unknown): CircuitBreakerState {
  return CIRCUIT_BREAKER_STATES.includes(value as CircuitBreakerState)
    ? (value as CircuitBreakerState)
    : "CLOSED";
}

function classifyConnectionState(connection: {
  rateLimitedUntil?: string | null;
  testStatus?: string | null;
}): ModelHealthState {
  if (isAccountUnavailable(connection.rateLimitedUntil)) {
    return "RATE_LIMITED";
  }

  const status = connection.testStatus;
  if (status === "unavailable") return "CONNECTION_BLOCKED";
  if (status === "banned" || status === "expired") return "AUTH_FAILED";
  if (status === "credits_exhausted") return "RATE_LIMITED";
  if (status === "deactivated") return "CONNECTION_BLOCKED";

  return "HEALTHY";
}

const SUMMARY_KEY_BY_STATE: Record<ModelHealthState, keyof HealthSummary> = {
  HEALTHY: "healthy",
  DEGRADED: "degraded",
  RATE_LIMITED: "rateLimited",
  AUTH_FAILED: "authFailed",
  PROVIDER_DOWN: "providerDown",
  CONNECTION_BLOCKED: "connectionBlocked",
  MODEL_LOCKED: "modelLocked",
  UNKNOWN: "unknown",
};

function emptySummary(): HealthSummary {
  return {
    healthy: 0,
    degraded: 0,
    rateLimited: 0,
    authFailed: 0,
    providerDown: 0,
    connectionBlocked: 0,
    modelLocked: 0,
    unknown: 0,
  };
}

interface HealthFilters {
  provider: string | null;
  state: ModelHealthState | null;
  onlyUnhealthy: boolean;
}

function parseFilters(url: URL): HealthFilters {
  const stateRaw = url.searchParams.get("state");
  return {
    provider: url.searchParams.get("provider"),
    state: isModelHealthState(stateRaw) ? stateRaw : null,
    onlyUnhealthy: url.searchParams.get("unhealthy") === "1",
  };
}

function groupConnectionsByProvider(
  rows: ProviderConnectionRow[]
): Map<string, ProviderConnectionRow[]> {
  const byProvider = new Map<string, ProviderConnectionRow[]>();
  for (const row of rows) {
    const provider = resolveProviderId(row.provider);
    const list = byProvider.get(provider);
    if (list) {
      list.push(row);
    } else {
      byProvider.set(provider, [row]);
    }
  }
  return byProvider;
}

// Models have no column on the connection row; they live in the synced
// available-models store keyed by connection id.
async function loadSyncedModels(provider: string): Promise<Record<string, Array<{ id?: string }>>> {
  try {
    return await getSyncedAvailableModelsByConnection(provider);
  } catch (err) {
    console.error(
      `[API] model-health: failed to load synced models for ${provider}:`,
      sanitizeErrorMessage(err)
    );
    return {};
  }
}

function isFilteredOut(state: ModelHealthState, filters: HealthFilters): boolean {
  if (filters.state && state !== filters.state) return true;
  return filters.onlyUnhealthy && state === "HEALTHY";
}

function buildConnectionHealth(
  provider: string,
  conn: ProviderConnectionRow,
  syncedModels: Array<{ id?: string }>,
  circuitBreakerState: CircuitBreakerState,
  filters: HealthFilters,
  summary: HealthSummary
): ConnectionHealth {
  const connectionState = classifyConnectionState(conn);
  const connectionHealth: ConnectionHealth = {
    connectionId: conn.id,
    connectionName: conn.name || `${provider} ${conn.id.slice(0, 8)}`,
    state: connectionState,
    rateLimitedUntil: conn.rateLimitedUntil || undefined,
    testStatus: conn.testStatus || undefined,
    models: [],
  };

  for (const model of syncedModels) {
    if (typeof model.id !== "string" || model.id.length === 0) continue;

    const modelState = classifyModelState(
      connectionState,
      circuitBreakerState,
      isModelLocked(provider, conn.id, model.id)
    );
    if (isFilteredOut(modelState, filters)) continue;

    connectionHealth.models.push({ model: model.id, state: modelState });
    summary[SUMMARY_KEY_BY_STATE[modelState]]++;
  }

  return connectionHealth;
}

async function buildProviderHealth(
  provider: string,
  connections: ProviderConnectionRow[],
  breakerStatuses: ReturnType<typeof getAllCircuitBreakerStatuses>,
  filters: HealthFilters,
  summary: HealthSummary
): Promise<ProviderHealth> {
  const breakerStatus = breakerStatuses.find((b) => b.name === provider);
  const circuitBreakerState = toCircuitBreakerState(breakerStatus?.state);
  const retryAfterMs =
    typeof breakerStatus?.retryAfterMs === "number" && breakerStatus.retryAfterMs > 0
      ? breakerStatus.retryAfterMs
      : undefined;

  const providerHealth: ProviderHealth = {
    provider,
    circuitBreakerState,
    // `canExecute()` is true for CLOSED/DEGRADED/HALF_OPEN and false only for
    // OPEN (the status object does not expose half-open probe budget).
    canExecute: circuitBreakerState !== "OPEN",
    retryAfterMs,
    connections: [],
  };

  const syncedByConnection = await loadSyncedModels(provider);
  for (const conn of connections) {
    const connectionHealth = buildConnectionHealth(
      provider,
      conn,
      syncedByConnection[conn.id] ?? [],
      circuitBreakerState,
      filters,
      summary
    );
    // Only include connections that have models (after filtering)
    if (connectionHealth.models.length > 0 || !filters.state) {
      providerHealth.connections.push(connectionHealth);
    }
  }

  return providerHealth;
}

export async function GET(request: Request) {
  // GHSA-mvf8-qc78-5mxm: the whole report is reserved for a management principal.
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;

  const filters = parseFilters(new URL(request.url));

  try {
    const timestamp = new Date().toISOString();
    const breakerStatuses = getAllCircuitBreakerStatuses();
    const allRows = (await getCachedProviderConnections())
      .map(asProviderConnectionRow)
      .filter((row): row is ProviderConnectionRow => row !== null);

    const providers: ProviderHealth[] = [];
    const summary = emptySummary();

    for (const [provider, connections] of groupConnectionsByProvider(allRows)) {
      if (filters.provider && provider !== filters.provider) continue;

      const providerHealth = await buildProviderHealth(
        provider,
        connections,
        breakerStatuses,
        filters,
        summary
      );
      // Only include providers that have connections (after filtering)
      if (providerHealth.connections.length > 0 || !filters.provider) {
        providers.push(providerHealth);
      }
    }

    return NextResponse.json({ timestamp, summary, providers });
  } catch (error) {
    console.error("[API] GET /api/monitoring/model-health error:", error);
    return NextResponse.json(
      { error: "Failed to fetch model health", message: sanitizeErrorMessage(error) },
      { status: 500 }
    );
  }
}
