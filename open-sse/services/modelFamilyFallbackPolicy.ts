import { resolveModelFallbackAuthorization } from "@/shared/utils/modelFallbackAuthorization";
import {
  STANDARD_REASONING_EFFORTS,
  EXTENDED_REASONING_EFFORTS,
} from "../config/reasoningEfforts.ts";
import { getRegistryEntry } from "../config/providerRegistry.ts";
import { getHeader, normalizeHeaders } from "../utils/headers.ts";
import { getRegisteredProviderEffortBaseModelId } from "../utils/registeredEffortVariants.ts";
import { parseModel, splitSyncedEffortSuffix } from "./model.ts";
import {
  getContextFamilyFallback,
  getEligibleModelFamily,
  getNextEligibleFamilyFallback,
} from "./modelFamilyFallback.ts";

export const CROSS_VERSION_FALLBACK_HEADER = "x-omniroute-allow-cross-version-fallback";

type RequestFamilyPolicy = {
  headers?: unknown;
  hasApiKeyMetadata?: boolean;
  connectionId?: string | (() => string);
  sameVersionOnly?: boolean;
};

/** Only registry-backed effort/mode aliases collapse; snapshots and versions stay distinct. */
export function isSameModelVersion(current: string, candidate: string, provider: string): boolean {
  const registered = new Set(
    getRegistryEntry(provider)?.models.map((model) => model.id.replace(/\./g, "-")) ?? []
  );
  const version = (model: string) => {
    const modelId = parseModel(model).model || model;
    const declaredBase = getRegisteredProviderEffortBaseModelId(provider, modelId);
    if (declaredBase) return declaredBase.replace(/\./g, "-");
    const bare = modelId.replace(/\./g, "-");
    const effort = splitSyncedEffortSuffix(bare, [
      ...STANDARD_REASONING_EFFORTS,
      ...EXTENDED_REASONING_EFFORTS,
    ]);
    if (effort.effort && registered.has(effort.baseModel)) return effort.baseModel;
    const modeBase = bare.replace(/-(thinking|tiered)$/, "");
    return registered.has(modeBase) ? modeBase : bare;
  };
  return version(current) === version(candidate);
}

export async function getRequestModelFamily(
  current: string,
  provider: string,
  policy: RequestFamilyPolicy = {}
): Promise<string[]> {
  const allowCrossVersion =
    !policy.sameVersionOnly &&
    getHeader(policy.headers, CROSS_VERSION_FALLBACK_HEADER)?.trim().toLowerCase() === "true";
  const connectionId =
    typeof policy.connectionId === "function" ? policy.connectionId() : policy.connectionId || "";
  const candidates = getEligibleModelFamily(current, provider, connectionId)
    .slice(1)
    .filter((candidate) => allowCrossVersion || isSameModelVersion(current, candidate, provider));
  if (!policy.hasApiKeyMetadata && !policy.headers) return [current, ...candidates];
  const request = new Request("http://localhost/api/v1/chat/completions", {
    headers: normalizeHeaders(policy.headers),
  });
  const isAllowed = await resolveModelFallbackAuthorization(request, !!policy.hasApiKeyMetadata);
  const permitted: string[] = [];
  for (const candidate of candidates) {
    const qualified = candidate.includes("/") ? candidate : `${provider}/${candidate}`;
    if (await isAllowed(qualified)) permitted.push(candidate);
  }
  return [current, ...permitted];
}

export async function getNextRequestFamilyFallback(
  current: string,
  tried: Set<string>,
  provider: string,
  policy: RequestFamilyPolicy = {}
): Promise<string | null> {
  const permitted = new Set(await getRequestModelFamily(current, provider, policy));
  const excluded = new Set(tried);
  const connectionId =
    typeof policy.connectionId === "function" ? policy.connectionId() : policy.connectionId || "";
  let candidate = getNextEligibleFamilyFallback(current, excluded, provider, connectionId);
  while (candidate) {
    if (permitted.has(candidate)) return candidate;
    excluded.add(candidate);
    candidate = getNextEligibleFamilyFallback(current, excluded, provider, connectionId);
  }
  return null;
}

/** Preserve aliases until a fallback actually changes the dispatched model. */
export function modelAfterFamilyFallback(
  requested: string,
  current: string,
  initial: string,
  outbound: unknown
): string {
  if (current === initial) return requested;
  const wire =
    outbound && typeof outbound === "object" ? (outbound as Record<string, unknown>).model : null;
  return typeof wire === "string" && wire ? wire : current;
}

/** Bind request policy once while reading the active connection at each recovery. */
export function createRequestFamilyFallback(provider: string, policy: RequestFamilyPolicy) {
  return {
    getNext: (current: string, tried: Set<string>) =>
      getNextRequestFamilyFallback(current, tried, provider, policy),
    getForContextOverflow: async (current: string, tried: Set<string>) => {
      const permitted = await getRequestModelFamily(current, provider, policy);
      const connectionId =
        typeof policy.connectionId === "function"
          ? policy.connectionId()
          : policy.connectionId || "";
      return getContextFamilyFallback(current, tried, provider, connectionId, permitted);
    },
  };
}

/** Quality recovery cannot repair request-scoped refusals or change model versions. */
export function getNextComboFamilyFallback(options: {
  model: string;
  tried: Set<string>;
  provider: string;
  connectionId: string;
  headers?: unknown;
  requestScoped?: boolean;
}): Promise<string | null> {
  if (!options.provider || options.provider === "unknown" || options.requestScoped)
    return Promise.resolve(null);
  return getNextRequestFamilyFallback(options.model, options.tried, options.provider, {
    connectionId: options.connectionId,
    headers: options.headers,
    sameVersionOnly: true,
  });
}
