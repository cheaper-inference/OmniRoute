/**
 * System One model catalog (`GET /v1/systemone/models`). Lives in the app layer:
 * it reads connections, proxies and the outbound guard from src/, which the
 * engine (open-sse/) must not import.
 *
 * POST /v1/systemone accepts `typesafe/<model>` (native TypeSafe API) and
 * `openrouter/<vendor>/<model>` (OpenRouter decisions endpoint). Each backend
 * contributes its own live list: TypeSafe's authenticated `GET /v1/models` and
 * OpenRouter's public models API filtered by `output_modalities=decisions`.
 * Lists are validated at the trust boundary, re-emitted as an OpenAI-style
 * `{ object: "list", data }` under the exact ids POST resolves, and never cached.
 */

import { z } from "zod";
import { CORS_HEADERS } from "@omniroute/open-sse/utils/cors.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/errorSanitization.ts";
import { hasUnsafeModelIdSyntax } from "@omniroute/open-sse/utils/modelIdSafety.ts";
import * as log from "@/sse/utils/logger";
import {
  OPENROUTER_DECISIONS_BASE_URL,
  OPENROUTER_DECISIONS_PROVIDER_ID,
  TYPESAFE_SYSTEMONE_BASE_URL,
  TYPESAFE_SYSTEMONE_PROVIDER_ID,
} from "@omniroute/open-sse/config/systemOneRegistry.ts";
import { getProviderConnections } from "@/lib/db/providers";
import { resolveProxyForConnection } from "@/lib/db/settings";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import { isAccountUnavailable } from "@omniroute/open-sse/services/accountFallback.ts";

export const SYSTEMONE_MODELS_TIMEOUT_MS = 10_000;
const TYPESAFE_MODELS_URL = `${TYPESAFE_SYSTEMONE_BASE_URL}/v1/models`;
const OPENROUTER_DECISIONS_MODELS_URL = `${OPENROUTER_DECISIONS_BASE_URL}/api/v1/models?output_modalities=decisions`;
// The real decisions lists are a few tens of KB; anything this large is not one.
const MAX_BODY_CHARS = 2_000_000;
// Real backends list a handful of decision models; bound the per-model policy work.
const MAX_MODELS_PER_BACKEND = 1000;
const DECISIONS_MODALITY = "decisions";

const BACKENDS = [TYPESAFE_SYSTEMONE_PROVIDER_ID, OPENROUTER_DECISIONS_PROVIDER_ID] as const;
type Backend = (typeof BACKENDS)[number];

const openRouterModelSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  canonical_slug: z.string().optional(),
  created: z.number().optional(),
  description: z.string().optional(),
  context_length: z.number().nullable().optional(),
  architecture: z.object({
    modality: z.string().optional(),
    input_modalities: z.array(z.string()).optional(),
    output_modalities: z.array(z.string()),
    tokenizer: z.string().optional(),
    instruct_type: z.string().nullable().optional(),
  }),
  pricing: z.record(z.string(), z.string()).optional(),
  top_provider: z
    .object({
      context_length: z.number().nullable().optional(),
      max_completion_tokens: z.number().nullable().optional(),
      is_moderated: z.boolean().optional(),
    })
    .optional(),
  supported_parameters: z.array(z.string()).optional(),
});

const openRouterListSchema = z.object({ data: z.array(z.unknown()) });

const typeSafeListSchema = z.object({
  models: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      release_date: z.string().optional(),
    })
  ),
});

export type SystemOneModel = Record<string, unknown> & {
  /** Exactly the model string POST /v1/systemone accepts. */
  id: string;
  object: "model";
  owned_by: string;
};

export interface SystemOneModelsOptions {
  /** Receives the id POST /v1/systemone would be called with. */
  isModelAllowed?: (modelId: string) => Promise<boolean>;
  /** The API key's connection scope; null/empty means every connection. */
  allowedConnections?: string[] | null;
  signal?: AbortSignal;
}

type CatalogConnection = {
  id: string;
  provider: Backend;
  testStatus?: string | null;
  rateLimitedUntil?: string | null;
  apiKey?: string | null;
  accessToken?: string | null;
};

function isBackend(value: unknown): value is Backend {
  return typeof value === "string" && (BACKENDS as readonly string[]).includes(value);
}

/** Connection-level eligibility only: what POST's credential selection also skips. */
function canServe(connection: CatalogConnection): boolean {
  const status = (connection.testStatus || "").trim().toLowerCase();
  if (status === "banned" || status === "expired" || status === "credits_exhausted") return false;
  if (isAccountUnavailable(connection.rateLimitedUntil)) return false;
  return Boolean(connection.apiKey || connection.accessToken);
}

async function fetchJson(
  url: string,
  connection: CatalogConnection,
  authenticated: boolean,
  signal?: AbortSignal
): Promise<unknown> {
  const timeout = AbortSignal.timeout(SYSTEMONE_MODELS_TIMEOUT_MS);
  const proxyInfo = await resolveProxyForConnection(connection.id);
  const token = connection.apiKey || connection.accessToken;
  const res = await safeOutboundFetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      // OpenRouter's decisions catalog is public: never send it the credential.
      ...(authenticated && token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    guard: getProviderOutboundGuard(),
    proxyConfig: proxyInfo?.proxy || null,
    retry: false,
    allowRedirect: false,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  if (text.length > MAX_BODY_CHARS) throw new Error("body too large");
  try {
    return JSON.parse(text);
  } catch {
    throw new Error("invalid JSON");
  }
}

function typeSafeModels(json: unknown): SystemOneModel[] {
  return typeSafeListSchema.parse(json).models.map((model) => ({
    id: `${TYPESAFE_SYSTEMONE_PROVIDER_ID}/${model.name}`,
    object: "model",
    owned_by: TYPESAFE_SYSTEMONE_PROVIDER_ID,
    name: model.name,
    description: model.description,
    release_date: model.release_date,
    architecture: { input_modalities: ["text"], output_modalities: [DECISIONS_MODALITY] },
  }));
}

function openRouterModels(json: unknown): SystemOneModel[] {
  const list = openRouterListSchema.parse(json);
  const models: SystemOneModel[] = [];
  for (const raw of list.data) {
    const parsed = openRouterModelSchema.safeParse(raw);
    if (!parsed.success) continue;
    const model = parsed.data;
    if (!model.architecture.output_modalities.includes(DECISIONS_MODALITY)) continue;
    models.push({
      ...model,
      // Verbatim: `openrouter/` + the vendor id, `~alias` spellings included.
      id: `${OPENROUTER_DECISIONS_PROVIDER_ID}/${model.id}`,
      object: "model",
      owned_by: model.id.replace(/^~/, "").split("/")[0] || OPENROUTER_DECISIONS_PROVIDER_ID,
    });
  }
  // A non-empty upstream list with no valid decisions model means the filter or the
  // schema drifted; fail closed rather than present an empty catalog.
  if (list.data.length > 0 && models.length === 0) throw new Error("no valid decisions models");
  return models;
}

async function fetchBackendCatalog(
  backend: Backend,
  connection: CatalogConnection,
  signal?: AbortSignal
): Promise<SystemOneModel[]> {
  return backend === TYPESAFE_SYSTEMONE_PROVIDER_ID
    ? typeSafeModels(await fetchJson(TYPESAFE_MODELS_URL, connection, true, signal))
    : openRouterModels(await fetchJson(OPENROUTER_DECISIONS_MODELS_URL, connection, false, signal));
}

/** Applies the key's model rules and the per-backend bound to one catalog. */
async function admitModels(
  models: SystemOneModel[],
  options: SystemOneModelsOptions,
  into: Map<string, SystemOneModel>
): Promise<void> {
  for (const model of models.slice(0, MAX_MODELS_PER_BACKEND)) {
    if (into.has(model.id) || hasUnsafeModelIdSyntax(model.id)) continue;
    if (!options.isModelAllowed || (await options.isModelAllowed(model.id))) {
      into.set(model.id, model);
    }
  }
}

/** Reads one backend catalog through the first healthy connection that can answer. */
async function collectBackend(
  backend: Backend,
  group: CatalogConnection[],
  options: SystemOneModelsOptions,
  into: Map<string, SystemOneModel>
): Promise<void> {
  const eligible = group.filter(canServe);
  if (!eligible.length) throw new Error(`no eligible ${backend} connection`);
  let lastError: unknown = null;
  // OpenRouter's list is public, so another key cannot fix a failed read.
  for (const connection of backend === "openrouter" ? eligible.slice(0, 1) : eligible) {
    try {
      const models = await fetchBackendCatalog(backend, connection, options.signal);
      await admitModels(models, options, into);
      return;
    } catch (error) {
      if (options.signal?.aborted) throw error;
      lastError = error;
    }
  }
  throw lastError;
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

function catalogStatus(configured: number, failed: number): string {
  if (!configured) return "unconfigured";
  return failed ? "partial" : "complete";
}

export async function handleSystemOneModels(
  options: SystemOneModelsOptions = {}
): Promise<Response> {
  const allowedIds = options.allowedConnections?.length ? options.allowedConnections : null;
  const rows = (await getProviderConnections({ isActive: true })) as unknown as Array<
    Omit<CatalogConnection, "provider"> & { provider?: unknown }
  >;
  const connections = rows.filter(
    (row): row is CatalogConnection =>
      isBackend(row.provider) && (!allowedIds || allowedIds.includes(String(row.id)))
  );
  const groups = BACKENDS.map(
    (backend) => [backend, connections.filter((c) => c.provider === backend)] as const
  ).filter(([, group]) => group.length > 0);

  const listed = new Map<string, SystemOneModel>();
  let fetched = 0;
  let failed = 0;
  let timedOut = false;
  for (const [backend, group] of groups) {
    try {
      await collectBackend(backend, group, options, listed);
      fetched++;
    } catch (error) {
      failed++;
      timedOut ||= isTimeout(error);
      log.warn("SYSTEMONE", `models backend failed: ${sanitizeErrorMessage(error)}`);
    }
  }
  if (options.signal?.aborted) return errorResponse(499, "Request aborted by caller");
  if (groups.length && !fetched) {
    return errorResponse(timedOut ? 504 : 502, "System One models are temporarily unavailable");
  }
  return new Response(JSON.stringify({ object: "list", data: [...listed.values()] }), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "X-OmniRoute-Catalog-Status": catalogStatus(groups.length, failed),
    },
  });
}
