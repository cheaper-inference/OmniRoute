/**
 * System One model catalog (`GET /v1/systemone/models`).
 *
 * Each configured decision backend contributes its own live list: TypeSafe's native
 * catalog (authenticated), OpenRouter's public models API filtered by
 * `output_modalities=decisions`, and a local Ollama connection's synced `/api/show`
 * capabilities. Lists are validated at the trust boundary, re-emitted as an OpenAI-style
 * `{ object: "list", data }` under gateway-qualified ids, and never cached.
 */

import { z } from "zod";
import { CORS_HEADERS } from "../utils/cors.ts";
import { errorResponse } from "../utils/error.ts";
import { sanitizeErrorMessage } from "../utils/errorSanitization.ts";
import * as log from "@/sse/utils/logger";
import { isSystemOneProvider, type SystemOneProvider } from "../config/systemOneRegistry.ts";
import {
  fetchSystemOne,
  systemOneHeaders,
  systemOneUrl,
  type SystemOneCredentials,
} from "./systemOneTransport.ts";
import {
  applyDecisionModelCapabilities,
  parseTypeSafeModels,
  perTokenPrice,
  qualifyDecisionModel,
} from "./systemOneCatalog.ts";
import { getProviderConnections } from "@/lib/db/providers";
import { getSyncedAvailableModelsForConnection } from "@/lib/db/models";
import { getPricingForModel } from "@/lib/db/settings";
import { isModelExcludedByConnection } from "@/domain/connectionModelRules";
import { isFreeModel } from "@/shared/utils/freeModels";
import { isAccountUnavailable, isModelLocked } from "../services/accountFallback.ts";

export const SYSTEMONE_MODELS_TIMEOUT_MS = 10_000;
// The real decisions list is a few tens of KB; anything this large is not it.
const MAX_BODY_CHARS = 2_000_000;
// Real backends list a handful of decision models; bound the per-model policy work.
const MAX_MODELS_PER_BACKEND = 1000;
const DECISIONS_MODALITY = "decisions";

const upstreamModelSchema = z.object({
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

const upstreamListSchema = z.object({ data: z.array(z.unknown()) });

export type SystemOneModel = z.infer<typeof upstreamModelSchema> & {
  object: "model";
  owned_by: string;
};

export interface SystemOneModelsOptions {
  /** Policy receives the canonical, gateway-qualified target POST accepts. */
  isModelAllowed?: (modelId: string) => Promise<boolean>;
  allowedConnections?: string[] | null;
  signal?: AbortSignal;
}

function toDecisionModel(raw: unknown): SystemOneModel | null {
  const parsed = upstreamModelSchema.safeParse(raw);
  if (!parsed.success) return null;
  const model = parsed.data;
  if (!model.architecture.output_modalities.includes(DECISIONS_MODALITY)) return null;
  const provider = model.id.replace(/^~/, "").split("/")[0] || "openrouter";
  return { object: "model", owned_by: provider, ...model };
}

function upstreamFailure(reason: string, status = 502): Response {
  log.warn("SYSTEMONE", `models upstream failed: ${reason}`);
  return errorResponse(status, "System One models are temporarily unavailable");
}

async function fetchDecisionCatalog(
  provider: SystemOneProvider,
  credentials: SystemOneCredentials,
  signal?: AbortSignal
): Promise<Record<string, unknown>[]> {
  if (provider === "ollama-local") {
    // The connection's live-synced /api/show capabilities are authoritative; never
    // synthesize a static local catalog or union another host's pulled models.
    const rows = await getSyncedAvailableModelsForConnection(provider, credentials.connectionId!);
    return rows
      .filter((row) => row.supportedEndpoints?.includes("systemone"))
      .map((row) => ({
        ...row,
        pricing: { prompt: "0", completion: "0" },
        pricing_source: "local-upstream",
      }));
  }
  let text: string;
  const timeout = AbortSignal.timeout(SYSTEMONE_MODELS_TIMEOUT_MS);
  const res = await fetchSystemOne(systemOneUrl(provider, credentials, true), credentials, {
    method: "GET",
    headers:
      provider === "openrouter" ? { Accept: "application/json" } : systemOneHeaders(credentials),
    signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  text = await res.text();
  if (text.length > MAX_BODY_CHARS) throw new Error("body too large");

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("invalid JSON");
  }
  if (provider === "typesafe") return withOperatorPricing(provider, parseTypeSafeModels(json));
  const list = upstreamListSchema.safeParse(json);
  if (!list.success) throw new Error("unexpected list shape");

  const models = list.data.data
    .map(toDecisionModel)
    .filter((model): model is SystemOneModel => model !== null);
  // A non-empty upstream list with no valid decisions model means the filter or
  // the schema drifted; fail closed rather than present an empty catalog.
  if (list.data.data.length > 0 && models.length === 0) {
    throw new Error("no valid decisions models");
  }
  return models.map(applyDecisionModelCapabilities);
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

type CatalogConnection = {
  id: string;
  provider: SystemOneProvider;
  testStatus?: string | null;
  rateLimitedUntil?: string | null;
  apiKey?: string | null;
  accessToken?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

/** An operator pricing row replaces the published native rate on the listed model. */
async function withOperatorPricing(
  provider: SystemOneProvider,
  models: Record<string, unknown>[]
): Promise<Record<string, unknown>[]> {
  return Promise.all(
    models.map(async (model) => {
      const override = await getPricingForModel(provider, String(model.id));
      if (!override || typeof override.input !== "number") return model;
      const output = typeof override.output === "number" ? override.output : 0;
      const { pricing_status: _unknown, ...rest } = model;
      return {
        ...rest,
        pricing: {
          prompt: perTokenPrice(override.input),
          completion: perTokenPrice(output),
        },
        pricing_source: "operator",
      };
    })
  );
}

async function listConfiguredConnections(
  options: SystemOneModelsOptions
): Promise<CatalogConnection[]> {
  const allowedIds = options.allowedConnections?.length ? options.allowedConnections : null;
  const rows = (await getProviderConnections({ isActive: true })) as unknown as Array<
    CatalogConnection & { provider?: unknown }
  >;
  return rows.filter(
    (row) =>
      typeof row.provider === "string" &&
      isSystemOneProvider(row.provider) &&
      (!allowedIds || allowedIds.includes(String(row.id)))
  );
}

function isTerminal(connection: CatalogConnection, model: string | null): boolean {
  const status = (connection.testStatus || "").trim().toLowerCase();
  if (status === "banned" || status === "expired") return true;
  if (status !== "credits_exhausted") return false;
  // OpenRouter bills `:free` models apart from the exhausted paid balance.
  return !(
    connection.provider === "openrouter" &&
    model &&
    isFreeModel("openrouter", { id: model })
  );
}

/** Read-only routing eligibility: no selection, lease, usage or cooldown writes. */
function canServe(connection: CatalogConnection, model: string | null): boolean {
  if (isTerminal(connection, model) || isAccountUnavailable(connection.rateLimitedUntil)) {
    return false;
  }
  if (!model) return true;
  return (
    !isModelExcludedByConnection(model, connection.providerSpecificData) &&
    !isModelLocked(connection.provider, connection.id, model)
  );
}

function toCredentials(connection: CatalogConnection): SystemOneCredentials {
  return {
    connectionId: connection.id,
    apiKey: connection.apiKey ?? null,
    accessToken: connection.accessToken ?? null,
    providerSpecificData: connection.providerSpecificData ?? null,
  };
}

/** A model is listed only if some connection of the group could serve it and the key may use it. */
async function isListable(
  provider: SystemOneProvider,
  group: CatalogConnection[],
  model: Record<string, unknown>,
  options: SystemOneModelsOptions
): Promise<boolean> {
  const upstreamId = String(model.id).replace(/^~/, "");
  if (!group.some((connection) => canServe(connection, upstreamId))) return false;
  return !options.isModelAllowed || options.isModelAllowed(`${provider}/${upstreamId}`);
}

/** Remote catalogs are read once per provider (first healthy connection); local ones per host. */
async function collectGroup(
  provider: SystemOneProvider,
  group: CatalogConnection[],
  options: SystemOneModelsOptions,
  into: Map<string, Record<string, unknown>>
): Promise<void> {
  const eligible = group.filter((connection) => canServe(connection, null));
  if (!eligible.length) throw new Error(`no eligible ${provider} connection`);
  let lastError: unknown = null;
  // OpenRouter's decision list is public, so another key cannot fix a failed read.
  for (const connection of provider === "openrouter" ? eligible.slice(0, 1) : eligible) {
    try {
      const models = await fetchDecisionCatalog(
        provider,
        toCredentials(connection),
        options.signal
      );
      for (const model of models.slice(0, MAX_MODELS_PER_BACKEND)) {
        const canonical = `${provider}/${String(model.id).replace(/^~/, "")}`;
        if (into.has(canonical)) continue;
        if (
          await isListable(
            provider,
            provider === "ollama-local" ? [connection] : eligible,
            model,
            options
          )
        ) {
          into.set(canonical, qualifyDecisionModel(provider, model));
        }
      }
      return;
    } catch (error) {
      if (options.signal?.aborted) throw error;
      lastError = error;
    }
  }
  throw lastError;
}

function groupConnections(connections: CatalogConnection[]): CatalogConnection[][] {
  const groups = new Map<string, CatalogConnection[]>();
  for (const connection of connections) {
    // Each local host has its own inventory; a remote provider has one catalog.
    const key =
      connection.provider === "ollama-local" ? `local:${connection.id}` : connection.provider;
    groups.set(key, [...(groups.get(key) ?? []), connection]);
  }
  return [...groups.values()];
}

function catalogStatus(configured: number, failed: number): string {
  if (!configured) return "unconfigured";
  return failed ? "partial" : "complete";
}

export async function handleSystemOneModels(
  options: SystemOneModelsOptions = {}
): Promise<Response> {
  const groups = groupConnections(await listConfiguredConnections(options));
  const listed = new Map<string, Record<string, unknown>>();
  let fetched = 0;
  let failed = 0;
  let timedOut = false;
  for (const group of groups) {
    try {
      await collectGroup(group[0].provider, group, options, listed);
      fetched++;
    } catch (error) {
      failed++;
      timedOut ||= isTimeout(error);
      log.warn("SYSTEMONE", `models backend failed: ${sanitizeErrorMessage(error)}`);
    }
  }
  if (options.signal?.aborted) return errorResponse(499, "Request aborted by caller");
  if (groups.length && !fetched) {
    return upstreamFailure("all configured decision backends unavailable", timedOut ? 504 : 502);
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
