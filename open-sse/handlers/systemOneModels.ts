/**
 * System One model catalog (`GET /v1/systemone/models`).
 *
 * Each configured decision backend contributes its own live list — OpenCode
 * Zen's model list filtered to its decision models, the Vercel AI Gateway's
 * TypeSafe list, OpenRouter's public `output_modalities=decisions` list, and
 * direct TypeSafe's native name/description catalog. Upstream release_date is
 * accepted by the shared parser but is not part of the catalog projection.
 * A backend with no usable connection is never advertised: the catalog is a
 * metadata view of eligible configured connections, not an inference or
 * entitlement test. A model is listed when such a connection is available
 * (including the free/paid tier rule) and the calling key is allowed to use it.
 *
 * No credential selection, usage or cooldown writes. The existing shared lease guard may
 * reconcile expired session leases. Never cached.
 */

import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";
import * as log from "@/sse/utils/logger";
import {
  isConnectionEligibleForTier,
  isSystemOneProvider,
  listSystemOneProviders,
  type SystemOneProviderId,
} from "../config/systemOneRegistry.ts";
import {
  applyOperatorPricing,
  isDecisionCatalogRow,
  readUpstreamCatalogList,
  toDecisionCatalogModel,
  type DecisionCatalogModel,
} from "./systemOneCatalog.ts";
import {
  fetchSystemOne as defaultFetchSystemOne,
  systemOneHeaders,
  systemOneUrl,
  type SystemOneCredentials,
} from "./systemOneTransport.ts";
import { getProviderConnections } from "@/lib/db/providers";
import { getPricingForModel } from "@/lib/db/settings";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import { isModelLocked } from "../services/accountFallback.ts";
import { isNativeConnectionUnavailable } from "./systemOneLease.ts";
import { readBoundedSystemOneBody, SystemOneResponseBodyError } from "./systemOneBody.ts";

export const SYSTEMONE_MODELS_TIMEOUT_MS = 10_000;
/** The real decision lists are a few KB; anything this large is not one. */
const MAX_CATALOG_BYTES = 2_097_152;
/** Backends list a handful of decision models; bound the per-model policy work. */
const MAX_MODELS_PER_BACKEND = 500;
const MAX_CATALOG_CONNECTION_ATTEMPTS = 3;

/** Terminal connection states never come back on their own. */
const TERMINAL_STATUSES = new Set(["banned", "expired", "credits_exhausted"]);

export type SystemOneCatalogConnection = {
  id: string;
  provider: string;
  apiKey?: string | null;
  accessToken?: string | null;
  testStatus?: string | null;
  rateLimitedUntil?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

export interface SystemOneModelsOptions {
  /** Policy receives the canonical, gateway-qualified id POST accepts. */
  isModelAllowed?: (modelId: string) => Promise<boolean>;
  allowedConnections?: string[] | null;
  signal?: AbortSignal;
}

export type SystemOneModelsDeps = {
  listConnections: () => Promise<SystemOneCatalogConnection[]>;
  isConnectionUnavailable: (connectionId: string) => boolean;
  fetchSystemOne: typeof defaultFetchSystemOne;
  getPricingForModel: (
    provider: string,
    model: string
  ) => Promise<{ input?: unknown; output?: unknown } | null>;
};

export const defaultSystemOneModelsDeps: SystemOneModelsDeps = {
  listConnections: async () =>
    (await getProviderConnections({ isActive: true })) as unknown as SystemOneCatalogConnection[],
  fetchSystemOne: defaultFetchSystemOne,
  isConnectionUnavailable: isNativeConnectionUnavailable,
  getPricingForModel: (provider, model) => getPricingForModel(provider, model),
};

function isCoolingDown(rateLimitedUntil: string | null | undefined): boolean {
  if (!rateLimitedUntil) return false;
  const until = new Date(rateLimitedUntil).getTime();
  return Number.isFinite(until) && until > Date.now();
}

/** Read-only routing eligibility of one connection. */
function canServe(connection: SystemOneCatalogConnection): boolean {
  const status = (connection.testStatus || "").trim().toLowerCase();
  if (TERMINAL_STATUSES.has(status)) return false;
  return !isCoolingDown(connection.rateLimitedUntil);
}

function toCredentials(connection: SystemOneCatalogConnection): SystemOneCredentials {
  return {
    connectionId: connection.id,
    apiKey: connection.apiKey ?? null,
    accessToken: connection.accessToken ?? null,
    providerSpecificData: connection.providerSpecificData ?? null,
  };
}

function isTimeout(error: unknown): boolean {
  const cause = (error as { cause?: Error })?.cause;
  return (
    error instanceof Error &&
    (error.name === "TimeoutError" ||
      cause?.name === "TimeoutError" ||
      (error as { code?: string }).code === "TIMEOUT")
  );
}

async function fetchDecisionCatalog(
  provider: SystemOneProviderId,
  connection: SystemOneCatalogConnection,
  options: SystemOneModelsOptions,
  deps: SystemOneModelsDeps
): Promise<DecisionCatalogModel[]> {
  if (deps.isConnectionUnavailable(connection.id)) throw new Error("decision_connection_leased");
  const credentials = toCredentials(connection);
  const timeout = AbortSignal.timeout(SYSTEMONE_MODELS_TIMEOUT_MS);
  const response = await deps.fetchSystemOne(
    systemOneUrl(provider, credentials, "models"),
    credentials,
    {
      method: "GET",
      headers: systemOneHeaders(provider, credentials),
      signal: options.signal ? AbortSignal.any([options.signal, timeout]) : timeout,
    }
  );
  if (!response.ok) {
    void response.body?.cancel().catch(() => {}); // an error catalog body is never consumed
    throw Object.assign(new Error(`HTTP ${response.status}`), { status: response.status });
  }
  const text = await readBoundedSystemOneBody(
    response,
    options.signal ? AbortSignal.any([options.signal, timeout]) : timeout,
    MAX_CATALOG_BYTES
  );

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("catalog body was not JSON");
  }
  const rows = readUpstreamCatalogList(parsed);
  if (!rows) throw new Error("unexpected catalog shape");

  const models: DecisionCatalogModel[] = [];
  for (const row of rows.slice(0, MAX_MODELS_PER_BACKEND)) {
    if (!isDecisionCatalogRow(provider, row)) continue;
    const model = toDecisionCatalogModel(provider, row);
    if (model) models.push(model);
  }
  return models;
}

/** A model is listed only if some eligible connection could actually serve it. */
function hasEligibleConnection(
  provider: SystemOneProviderId,
  group: SystemOneCatalogConnection[],
  model: DecisionCatalogModel
): boolean {
  return group.some(
    (connection) =>
      isConnectionEligibleForTier(model.tier, connection, provider) &&
      !isModelExcludedByConnection(model.root, connection.providerSpecificData) &&
      !isModelLocked(provider, connection.id, model.root)
  );
}

async function addEligibleModels(
  models: DecisionCatalogModel[],
  provider: SystemOneProviderId,
  group: SystemOneCatalogConnection[],
  options: SystemOneModelsOptions,
  deps: SystemOneModelsDeps,
  into: Map<string, DecisionCatalogModel>
): Promise<void> {
  for (const model of models) {
    if (into.has(model.id)) continue;
    if (!hasEligibleConnection(provider, group, model)) continue;
    if (options.isModelAllowed && !(await options.isModelAllowed(model.id))) continue;
    const override = await deps.getPricingForModel(provider, model.root).catch(() => null);
    into.set(model.id, applyOperatorPricing(model, override));
  }
}

async function collectProvider(
  provider: SystemOneProviderId,
  group: SystemOneCatalogConnection[],
  options: SystemOneModelsOptions,
  deps: SystemOneModelsDeps,
  into: Map<string, DecisionCatalogModel>
): Promise<void> {
  let lastError: unknown = new Error(`no eligible ${provider} connection`);
  for (const connection of group.slice(0, MAX_CATALOG_CONNECTION_ATTEMPTS)) {
    try {
      const models = await fetchDecisionCatalog(provider, connection, options, deps);
      await addEligibleModels(models, provider, group, options, deps, into);
      return;
    } catch (error) {
      if (
        options.signal?.aborted ||
        error instanceof SystemOneResponseBodyError ||
        [401, 402, 403, 429, 451].includes((error as { status?: number }).status ?? 0)
      )
        throw error;
      // Retry only availability failures; never rotate after access or quota restrictions.
      lastError = error;
    }
  }
  throw lastError;
}

function groupByProvider(
  connections: SystemOneCatalogConnection[]
): Map<SystemOneProviderId, SystemOneCatalogConnection[]> {
  const groups = new Map<SystemOneProviderId, SystemOneCatalogConnection[]>();
  for (const provider of listSystemOneProviders()) {
    const group = connections.filter((connection) => connection.provider === provider);
    if (group.length) groups.set(provider, group);
  }
  return groups;
}

function catalogStatus(configured: number, failed: number): string {
  if (!configured) return "unconfigured";
  return failed ? "partial" : "complete";
}

export async function handleSystemOneModels(
  options: SystemOneModelsOptions = {},
  overrides: Partial<SystemOneModelsDeps> = {}
): Promise<Response> {
  const deps: SystemOneModelsDeps = { ...defaultSystemOneModelsDeps, ...overrides };
  if (options.signal?.aborted) return errorResponse(499, "Request aborted by caller");

  const allowed = options.allowedConnections?.length ? options.allowedConnections : null;
  const connections = (await deps.listConnections()).filter(
    (connection) =>
      typeof connection.provider === "string" &&
      isSystemOneProvider(connection.provider) &&
      canServe(connection) &&
      !deps.isConnectionUnavailable(connection.id) &&
      (!allowed || allowed.includes(String(connection.id)))
  );

  const groups = groupByProvider(connections);
  const listed = new Map<string, DecisionCatalogModel>();
  let fetched = 0;
  let failed = 0;
  let timedOut = false;

  for (const [provider, group] of groups) {
    try {
      await collectProvider(provider, group, options, deps, listed);
      fetched++;
    } catch (error) {
      failed++;
      timedOut ||= isTimeout(error);
      log.warn(
        "SYSTEMONE",
        `decision catalog failed for ${provider}: ${sanitizeErrorMessage(error)}`
      );
    }
  }

  if (options.signal?.aborted) return errorResponse(499, "Request aborted by caller");
  if (groups.size && !fetched) {
    // An empty list would read as "this installation has no decision models".
    return errorResponse(timedOut ? 504 : 502, "System One models are temporarily unavailable");
  }

  return new Response(JSON.stringify({ object: "list", data: [...listed.values()] }), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-OmniRoute-Catalog-Status": catalogStatus(groups.size, failed),
    },
  });
}
