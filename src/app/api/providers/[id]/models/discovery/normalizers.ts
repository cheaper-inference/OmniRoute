import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";
import {
  getAntigravityModelsDiscoveryUrls,
  getAntigravityFetchAvailableModelsUrls,
} from "@omniroute/open-sse/config/antigravityUpstream.ts";
import { getAntigravityContentHeaders } from "@omniroute/open-sse/services/antigravityHeaders.ts";
import { resolveAntigravityClientVersion } from "@omniroute/open-sse/services/antigravityClientProfile.ts";
import {
  getClientVisibleAntigravityModelName,
  isDiscoverableAntigravityModelId,
  toClientAntigravityModelId,
} from "@omniroute/open-sse/config/antigravityModelAliases.ts";
import {
  getClientVisibleAgyModelName,
  isDiscoverableAgyModelId,
} from "@omniroute/open-sse/config/agyModels.ts";
import { normalizeAntigravityClientProfile } from "@/shared/constants/antigravityClientProfile";
import {
  ensureAntigravityProjectAssigned,
  isUsableAntigravityProjectId,
} from "@omniroute/open-sse/services/antigravityProjectBootstrap.ts";
import { persistDiscoveredAntigravityProjectId } from "@omniroute/open-sse/services/antigravityProjectPersist.ts";
import { asRecord, toNonEmptyString } from "./helpers";
import type { DiscoveryFailure } from "@/shared/discovery/degradedCause";

const antigravityDiscoveryInflight = new Map<
  string,
  Promise<{ models: Array<{ id: string; name: string }>; failure?: DiscoveryFailure }>
>();

type AntigravityDiscoveryModel = {
  id: string;
  name: string;
  isInternal?: boolean;
  /** Token window advertised by the upstream discovery payload, when present. */
  inputTokenLimit?: number;
  outputTokenLimit?: number;
};

/**
 * Forward discovery-advertised token windows when the upstream payload carries
 * them. Field names are probed defensively (payload shape is not contractual);
 * absent/non-numeric fields yield no entry, so nothing downstream changes.
 */
function extractDiscoveryTokenLimits(item: Record<string, unknown>): {
  inputTokenLimit?: number;
  outputTokenLimit?: number;
} {
  const limits: { inputTokenLimit?: number; outputTokenLimit?: number } = {};
  const input = item.inputTokenLimit ?? item.contextWindow;
  if (typeof input === "number" && Number.isFinite(input) && input > 0) {
    limits.inputTokenLimit = input;
  }
  const output = item.outputTokenLimit ?? item.maxOutputTokens;
  if (typeof output === "number" && Number.isFinite(output) && output > 0) {
    limits.outputTokenLimit = output;
  }
  return limits;
}

export function normalizeAntigravityModelsResponse(data: unknown): AntigravityDiscoveryModel[] {
  const payload = asRecord(data).models;

  if (Array.isArray(payload)) {
    return payload
      .map((value) => {
        const item = asRecord(value);
        const id =
          typeof item.id === "string"
            ? item.id
            : typeof item.name === "string"
              ? item.name
              : typeof item.model === "string"
                ? item.model
                : "";
        const name =
          typeof item.displayName === "string"
            ? item.displayName
            : typeof item.name === "string"
              ? item.name
              : id;
        return id
          ? {
              id,
              name,
              ...extractDiscoveryTokenLimits(item),
              ...(item.isInternal === true ? { isInternal: true } : {}),
            }
          : null;
      })
      .filter((value): value is AntigravityDiscoveryModel => Boolean(value));
  }

  const modelsById = asRecord(payload);
  return Object.entries(modelsById)
    .map(([id, value]) => {
      const item = asRecord(value);
      const name =
        typeof item.displayName === "string"
          ? item.displayName
          : typeof item.name === "string"
            ? item.name
            : id;
      return id
        ? {
            id,
            name,
            ...extractDiscoveryTokenLimits(item),
            ...(item.isInternal === true ? { isInternal: true } : {}),
          }
        : null;
    })
    .filter((value): value is AntigravityDiscoveryModel => Boolean(value));
}

export function filterUserCallableAntigravityModels(
  models: AntigravityDiscoveryModel[],
  provider: "antigravity" | "agy" = "antigravity"
) {
  return models.filter(
    (model) =>
      model.isInternal !== true &&
      (provider === "agy"
        ? isDiscoverableAgyModelId(model.id)
        : isDiscoverableAntigravityModelId(model.id))
  );
}

export function mapAntigravityModelForClient(
  model: { id: string; name: string; inputTokenLimit?: number; outputTokenLimit?: number },
  provider: "antigravity" | "agy" = "antigravity"
): {
  id: string;
  name: string;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
} {
  const clientId = toClientAntigravityModelId(model.id);
  return {
    id: clientId,
    name:
      provider === "agy"
        ? getClientVisibleAgyModelName(clientId, model.name)
        : getClientVisibleAntigravityModelName(clientId, model.name),
    ...(typeof model.inputTokenLimit === "number"
      ? { inputTokenLimit: model.inputTokenLimit }
      : {}),
    ...(typeof model.outputTokenLimit === "number"
      ? { outputTokenLimit: model.outputTokenLimit }
      : {}),
  };
}

export async function fetchAntigravityDiscoveryModelsCached(
  accessToken: string,
  connectionId: string,
  proxy: unknown,
  providerSpecificData?: unknown,
  provider: "antigravity" | "agy" = "antigravity"
): Promise<{
  models: Array<{ id: string; name: string; inputTokenLimit?: number; outputTokenLimit?: number }>;
  failure?: DiscoveryFailure;
}> {
  const profile = normalizeAntigravityClientProfile(asRecord(providerSpecificData).clientProfile);
  const cacheKey = `${provider}:${connectionId}:${accessToken.substring(0, 16)}:${profile}`;
  const inflight = antigravityDiscoveryInflight.get(cacheKey);
  if (inflight) return inflight;

  const promise = (async () => {
    await resolveAntigravityClientVersion(profile);
    const discovered = await ensureAntigravityProjectAssigned(accessToken, fetch, profile);
    if (isUsableAntigravityProjectId(discovered)) {
      // #8491: persist the recovered id so it survives the next token refresh
      // or process restart instead of being silently rediscovered every time.
      await persistDiscoveredAntigravityProjectId(
        connectionId,
        discovered,
        asRecord(providerSpecificData)
      );
    }

    // The first attempt that produced no model explains the fallback.
    let failure: DiscoveryFailure | undefined;

    for (const discoveryUrl of [
      ...getAntigravityFetchAvailableModelsUrls(),
      ...getAntigravityModelsDiscoveryUrls(),
    ]) {
      try {
        const response = await safeOutboundFetch(discoveryUrl, {
          ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
          guard: getProviderOutboundGuard(),
          proxyConfig: proxy,
          method: "POST",
          headers: getAntigravityContentHeaders(profile, accessToken),
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn(
            `[models] ${provider} discovery failed at ${discoveryUrl} (${response.status}): ${errorText}`
          );
          failure = failure ?? { status: response.status };
          continue;
        }

        const models = filterUserCallableAntigravityModels(
          normalizeAntigravityModelsResponse(await response.json()),
          provider
        ).map((model) => mapAntigravityModelForClient(model, provider));
        if (models.length > 0) {
          return { models };
        }
        failure = failure ?? { code: "EMPTY_CATALOG" };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[models] ${provider} discovery threw for ${discoveryUrl}: ${message}`);
        failure = failure ?? {};
      }
    }

    return { models: [], ...(failure ? { failure } : {}) };
  })().finally(() => {
    antigravityDiscoveryInflight.delete(cacheKey);
  });

  antigravityDiscoveryInflight.set(cacheKey, promise);
  return promise;
}

export function normalizeDataRobotCatalogResponse(
  data: unknown
): Array<{ id: string; name: string }> {
  const items = Array.isArray(asRecord(data).data) ? (asRecord(data).data as unknown[]) : [];

  return items
    .map((value) => {
      const item = asRecord(value);
      const model =
        toNonEmptyString(item.model) || toNonEmptyString(item.id) || toNonEmptyString(item.name);
      if (!model) return null;
      if (item.isActive === false) return null;
      const name = toNonEmptyString(item.label) || toNonEmptyString(item.displayName) || model;
      return { id: model, name };
    })
    .filter((value): value is { id: string; name: string } => Boolean(value));
}

// Upstream fields that declare supported reasoning efforts (#15762). Only these are carried
// through so the sync extractor sees them; spreading the whole record would alter other flows.
const OPENAI_LIKE_EFFORT_DECLARATION_KEYS = [
  "reasoning",
  "supported_reasoning_levels",
  "thinking",
  "metadata",
  "capabilities",
  "supportedThinkingEfforts",
  "reasoning_options",
  "vendors",
] as const;

function pickEffortDeclarations(item: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const key of OPENAI_LIKE_EFFORT_DECLARATION_KEYS) {
    if (item[key] !== undefined && item[key] !== null) picked[key] = item[key];
  }
  return picked;
}

// SiliconFlow free-only imports rely on live pricing and explicit flags. Keep
// that evidence through discovery so a paid row cannot become free by losing
// its veto. Project only the fields consumed by payloadFreeEvidence.
function pickSiliconFlowPricingEvidence(item: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const key of ["pricing", "isFree", "is_free", "free", "tags"] as const) {
    if (item[key] !== undefined && item[key] !== null) picked[key] = item[key];
  }
  return picked;
}

export function normalizeOpenAiLikeModelsResponse(
  data: unknown,
  fallbackOwner: string
): Array<{ id: string; name: string; owned_by: string }> {
  const payload = asRecord(data);
  const items = Array.isArray(data)
    ? data
    : Array.isArray(payload.data)
      ? (payload.data as unknown[])
      : Array.isArray(payload.models)
        ? (payload.models as unknown[])
        : [];

  return items
    .map((value) => {
      const item = asRecord(value);
      const id =
        toNonEmptyString(item.id) || toNonEmptyString(item.model) || toNonEmptyString(item.name);
      if (!id) return null;
      const name =
        toNonEmptyString(item.display_name) ||
        toNonEmptyString(item.displayName) ||
        toNonEmptyString(item.name) ||
        id;
      const ownedBy =
        toNonEmptyString(item.owned_by) || toNonEmptyString(item.provider) || fallbackOwner;
      return {
        ...pickEffortDeclarations(item),
        ...(fallbackOwner === "siliconflow" ? pickSiliconFlowPricingEvidence(item) : {}),
        id,
        name,
        owned_by: ownedBy,
      };
    })
    .filter((value): value is { id: string; name: string; owned_by: string } => Boolean(value));
}

/** Read the shared Tencent product-config envelope and discard media-only rows. */
function getTencentConfigModels(data: unknown): Record<string, unknown>[] {
  const root = asRecord(data);
  const inner = asRecord(root.data);
  const payload = inner.models ?? root.models;
  const items: unknown[] = Array.isArray(payload)
    ? payload
    : payload && typeof payload === "object"
      ? Object.entries(asRecord(payload)).map(([id, value]) => ({ id, ...asRecord(value) }))
      : [];

  return items.map(asRecord).filter((item) => !isTencentMediaOnlyModel(item));
}

/**
 * Tencent product configs can list image/video generation entries beside chat
 * models. Only media-only tags identify entries that cannot serve chat.
 *
 * WorkBuddy includes image and video entries in its shipped catalog. The latest
 * CodeBuddy CN CLI catalog similarly tags Hunyuan image models.
 */
const TENCENT_MEDIA_GENERATION_TAGS = new Set([
  "text-to-image",
  "image-to-image",
  "text-to-video",
  "image-to-video",
]);

/**
 * Keep untagged entries and mixed-capability entries; drop only rows whose tags
 * all describe media generation.
 */
function isTencentMediaOnlyModel(item: Record<string, unknown>): boolean {
  const tags = item.tags;
  if (!Array.isArray(tags) || tags.length === 0) return false;
  return tags.every((tag) => typeof tag === "string" && TENCENT_MEDIA_GENERATION_TAGS.has(tag));
}

/**
 * WorkBuddy's authenticated `GET /v3/config` response provides its current
 * account-specific catalog under `data.models`.
 */
export function normalizeWorkbuddyModelsResponse(
  data: unknown
): Array<{ id: string; name: string; owned_by: string }> {
  return getTencentConfigModels(data).flatMap((item) => {
    const id = toNonEmptyString(item.id) || toNonEmptyString(item.model);
    if (!id) return [];
    const name = toNonEmptyString(item.name) || toNonEmptyString(item.displayName) || id;
    return [{ id, name, owned_by: "workbuddy" }];
  });
}

/**
 * CodeBuddy CN's authenticated `GET /v3/config` response includes the official
 * CLI model metadata used to populate OmniRoute's synced catalog.
 */
export function normalizeCodeBuddyCnModelsResponse(data: unknown): Array<Record<string, unknown>> {
  return getTencentConfigModels(data).flatMap((item) => {
    const id = toNonEmptyString(item.id) || toNonEmptyString(item.model);
    if (!id) return [];
    const name = toNonEmptyString(item.name) || toNonEmptyString(item.displayName) || id;
    const maxInputTokens =
      typeof item.maxInputTokens === "number" ? item.maxInputTokens : undefined;
    const maxOutputTokens =
      typeof item.maxOutputTokens === "number" ? item.maxOutputTokens : undefined;

    return [
      {
        id,
        name,
        owned_by: "codebuddy-cn",
        modelType: "chat",
        ...(maxInputTokens !== undefined
          ? { contextWindow: maxInputTokens, inputTokenLimit: maxInputTokens }
          : {}),
        ...(maxOutputTokens !== undefined ? { outputTokenLimit: maxOutputTokens } : {}),
        ...(typeof item.supportsToolCall === "boolean"
          ? { supportsTools: item.supportsToolCall }
          : {}),
        ...(typeof item.supportsImages === "boolean"
          ? { supportsVision: item.supportsImages }
          : {}),
        ...(typeof item.supportsReasoning === "boolean"
          ? { supportsThinking: item.supportsReasoning }
          : {}),
      },
    ];
  });
}

export function normalizeSapModelsResponse(
  data: unknown
): Array<{ id: string; name: string; owned_by: string }> {
  const payload = asRecord(data);
  const items = Array.isArray(payload.resources) ? (payload.resources as unknown[]) : [];

  return items
    .map((value) => {
      const item = asRecord(value);
      const id =
        toNonEmptyString(item.model) || toNonEmptyString(item.id) || toNonEmptyString(item.name);
      if (!id) return null;
      const name =
        toNonEmptyString(item.displayName) ||
        toNonEmptyString(item.display_name) ||
        toNonEmptyString(item.name) ||
        id;
      const ownedBy = toNonEmptyString(item.provider) || "sap";
      return { id, name, owned_by: ownedBy };
    })
    .filter((value): value is { id: string; name: string; owned_by: string } => Boolean(value));
}

export function normalizeAzureModelsResponse(
  data: unknown,
  fallbackOwner = "azure-ai"
): Array<{ id: string; name: string; owned_by: string }> {
  const payload = asRecord(data);
  const items = Array.isArray(data)
    ? data
    : Array.isArray(payload.data)
      ? (payload.data as unknown[])
      : Array.isArray(payload.models)
        ? (payload.models as unknown[])
        : Array.isArray(payload.value)
          ? (payload.value as unknown[])
          : Array.isArray(payload.deployments)
            ? (payload.deployments as unknown[])
            : [];

  return items
    .map((value) => {
      const item = asRecord(value);
      const id =
        toNonEmptyString(item.id) ||
        toNonEmptyString(item.deployment_name) ||
        toNonEmptyString(item.deploymentName) ||
        toNonEmptyString(item.name) ||
        toNonEmptyString(item.model);
      if (!id) return null;
      const name =
        toNonEmptyString(item.display_name) ||
        toNonEmptyString(item.displayName) ||
        toNonEmptyString(item.name) ||
        id;
      const ownedBy =
        toNonEmptyString(item.owned_by) || toNonEmptyString(item.provider) || fallbackOwner;
      return { id, name, owned_by: ownedBy };
    })
    .filter((value): value is { id: string; name: string; owned_by: string } => Boolean(value));
}
