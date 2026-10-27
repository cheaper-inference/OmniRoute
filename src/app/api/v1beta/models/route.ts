import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  getAllCustomModels,
  getAllSyncedAvailableModels,
  getSyncedAvailableModels,
} from "@/lib/db/models";
import { getProviderConnections } from "@/lib/db/providers";
import { getCachedProviderNodes } from "@/lib/db/readCache";
import { getSettings } from "@/lib/db/settings";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { getSyncedCapabilities } from "@/lib/modelsDevSync";
import { mergeCustomModelMetadata } from "@/lib/providers/modelMetadataPrecedence";
import { getProviderPrefixIndex } from "@/lib/providerNodePrefixes";
import { getModelCatalogAuthRejection } from "../../v1/models/catalogRequest";

/**
 * Build the set of provider keys (raw id + alias) that have at least one active/validated
 * connection. Mirrors the active-provider filter used by the OpenAI-format /v1/models
 * catalog so /v1beta/models only lists models the user can actually call (#2483).
 */
async function getActiveProviderKeys(): Promise<Set<string>> {
  const keys = new Set<string>();
  try {
    const connections = await getProviderConnections();
    for (const conn of connections) {
      if (conn.isActive === false) continue;
      const provider = conn.provider;
      if (!provider) continue;
      keys.add(provider);
      const alias = (PROVIDER_ID_TO_ALIAS as Record<string, string>)[provider];
      if (alias) keys.add(alias);
    }
  } catch (e) {
    // DB unavailable — return empty set (safe default: list nothing provider-gated)
    console.error("[v1beta/models] Could not fetch provider connections:", e);
  }
  return keys;
}

/**
 * #16207: compatible-provider nodes (openai-/anthropic-compatible) have internal UUID
 * ids that are never present in the static AI_PROVIDERS/PROVIDER_MODELS alias maps, so
 * naming a catalog entry off the raw id leaks the node UUID to Gemini clients — the
 * exact leak #8327 removed from /v1/models' `owned_by`. Resolve the operator-configured
 * node prefix the same way that route does and use it for the public `models/<id>`
 * name only; every internal lookup (connections, capabilities, hidden models) stays
 * keyed on the raw node id.
 */
async function getPublicProviderIdResolver(): Promise<(providerId: string) => string> {
  let providerNodes: Array<Record<string, any>> = [];
  try {
    providerNodes = (await getCachedProviderNodes()) as Array<Record<string, any>>;
  } catch (e) {
    console.error("[v1beta/models] Could not fetch provider nodes:", e);
  }
  const providerIdToPrefix: Record<string, string> = {};
  for (const node of providerNodes) {
    const resolvedPrefix =
      node.prefix?.trim() ||
      node.name
        ?.trim()
        ?.toLowerCase()
        ?.replace(/\s+/g, "-")
        ?.replace(/[^a-z0-9-]/g, "") ||
      null;
    if (resolvedPrefix && node.id) providerIdToPrefix[node.id] = resolvedPrefix;
  }
  return (providerId: string) => providerIdToPrefix[providerId] || providerId;
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * GET /v1beta/models - Gemini compatible models list
 * Returns models in Gemini API format with real token limits when available.
 */
export async function GET(request: Request) {
  try {
    // #16208: the sibling OpenAI-format catalog gates anonymous callers on the
    // requireAuthForModels setting (getModelCatalogAuthRejection); the Gemini surface
    // skipped that gate entirely, so a catalog /v1/models refused was still listable
    // here unauthenticated. Enforce the same gate, wired the same way (settings fetched
    // per request — auth state is per-request and MUST NOT be cached — and a fall
    // through to the builder on auth-check failure, as on /v1/models).
    let settingsForAuth: Record<string, any> = {};
    try {
      settingsForAuth = await getSettings();
    } catch {}
    const authRejection = await getModelCatalogAuthRejection(request, settingsForAuth, {});
    if (authRejection) return authRejection;
  } catch {
    // Fall through to the builder on auth-check failure; parity with /v1/models.
  }

  try {
    getSyncedCapabilities();
    const models = [];
    const existingNames = new Set<string>();

    // Only list models whose provider has an active/validated connection (#2483).
    const activeKeys = await getActiveProviderKeys();
    // #16207: public naming resolver — compatible-provider node UUIDs become the
    // operator-configured prefix, exactly what /v1/models publishes as owned_by.
    const resolvePublicProviderId = await getPublicProviderIdResolver();
    // Compatible nodes that do not uniquely own a non-reserved prefix are not
    // runtime-routable under any public name, so they are not advertised at all.
    const { compatibleNodeIds, eligibleNodeIds } = await getProviderPrefixIndex();
    const isUnadvertisedNode = (providerId: string) =>
      compatibleNodeIds.has(providerId) && !eligibleNodeIds.has(providerId);

    // Built-in models (hardcoded defaults)
    for (const [provider, providerModels] of Object.entries(PROVIDER_MODELS)) {
      if (!activeKeys.has(provider)) continue;
      for (const model of providerModels) {
        const name = `models/${provider}/${model.id}`;
        if (existingNames.has(name)) continue;
        const resolved = getResolvedModelCapabilities({ provider, model: model.id });
        models.push({
          name,
          displayName: model.name || model.id,
          description: `${provider} model: ${model.name || model.id}`,
          supportedGenerationMethods: ["generateContent"],
          inputTokenLimit: resolved.maxInputTokens || resolved.contextWindow || 128000,
          outputTokenLimit: resolved.maxOutputTokens || 8192,
          ...(resolved.supportsThinking === true ? { thinking: true } : {}),
        });
        existingNames.add(name);
      }
    }

    // Gemini: always replace hardcoded entries with synced models (no fallback)
    // Always remove hardcoded gemini entries — even if sync returns empty
    for (let i = models.length - 1; i >= 0; i--) {
      if (
        typeof (models[i] as any).name === "string" &&
        (models[i] as any).name.startsWith("models/gemini/")
      ) {
        models.splice(i, 1);
      }
    }
    try {
      const syncedGeminiModels = activeKeys.has("gemini")
        ? await getSyncedAvailableModels("gemini")
        : [];
      for (const m of syncedGeminiModels) {
        models.push({
          name: `models/gemini/${m.id}`,
          displayName: m.name || m.id,
          ...(typeof m.description === "string" ? { description: m.description } : {}),
          supportedGenerationMethods: ["generateContent"],
          inputTokenLimit:
            typeof m.inputTokenLimit === "number"
              ? m.inputTokenLimit
              : typeof m.contextWindow === "number"
                ? m.contextWindow
                : 128000,
          outputTokenLimit: typeof m.outputTokenLimit === "number" ? m.outputTokenLimit : 8192,
          ...(m.supportsThinking === true ? { thinking: true } : {}),
        });
      }
    } catch (err) {
      console.error("[v1beta/models] Error fetching synced Gemini models:", err);
    }

    // Synced/imported models for non-Gemini providers
    try {
      const syncedModelsMap = await getAllSyncedAvailableModels();
      for (const [providerId, syncedModels] of Object.entries(syncedModelsMap)) {
        if (providerId === "gemini") continue;
        if (!activeKeys.has(providerId)) continue;
        if (isUnadvertisedNode(providerId)) continue;
        if (!Array.isArray(syncedModels)) continue;
        for (const m of syncedModels) {
          if (!m || typeof m.id !== "string") continue;
          const name = `models/${resolvePublicProviderId(providerId)}/${m.id}`;
          if (existingNames.has(name)) continue;
          const resolved = getResolvedModelCapabilities({
            provider: providerId,
            model: m.id,
          });
          models.push({
            name,
            displayName: m.name || m.id,
            ...(typeof m.description === "string" ? { description: m.description } : {}),
            supportedGenerationMethods: ["generateContent"],
            inputTokenLimit:
              typeof m.inputTokenLimit === "number"
                ? m.inputTokenLimit
                : typeof m.contextWindow === "number"
                  ? m.contextWindow
                  : resolved.maxInputTokens || resolved.contextWindow || 128000,
            outputTokenLimit:
              typeof m.outputTokenLimit === "number"
                ? m.outputTokenLimit
                : resolved.maxOutputTokens || 8192,
            ...(m.supportsThinking === true || resolved.supportsThinking === true
              ? { thinking: true }
              : {}),
          });
          existingNames.add(name);
        }
      }
    } catch {
      // Synced models are optional — skip on error
    }

    // Custom models (use stored metadata from provider APIs)
    try {
      const customModelsMap = (await getAllCustomModels()) as Record<string, unknown>;
      for (const [providerId, rawModels] of Object.entries(customModelsMap)) {
        if (!Array.isArray(rawModels)) continue;
        // Skip Gemini — handled by syncedAvailableModels above
        if (providerId === "gemini") continue;
        if (!activeKeys.has(providerId)) continue;
        if (isUnadvertisedNode(providerId)) continue;
        for (const model of rawModels) {
          if (!model || typeof model !== "object" || typeof (model as any).id !== "string")
            continue;
          const m = model as Record<string, unknown>;
          if (m.isHidden === true) continue;
          const resolved = getResolvedModelCapabilities({
            provider: providerId,
            model: String(m.id),
          });
          const name = `models/${resolvePublicProviderId(providerId)}/${m.id}`;
          const customEntry = {
            name,
            displayName: m.name || m.id,
            ...(typeof m.description === "string" ? { description: m.description } : {}),
            supportedGenerationMethods: ["generateContent"],
            inputTokenLimit:
              typeof m.inputTokenLimit === "number"
                ? m.inputTokenLimit
                : typeof m.contextWindow === "number"
                  ? m.contextWindow
                  : resolved.maxInputTokens || resolved.contextWindow || 128000,
            outputTokenLimit:
              typeof m.outputTokenLimit === "number"
                ? m.outputTokenLimit
                : resolved.maxOutputTokens || 8192,
            ...(typeof m.supportsThinking === "boolean"
              ? { thinking: m.supportsThinking }
              : resolved.supportsThinking === true
                ? { thinking: true }
                : {}),
          };
          const existingIndex = models.findIndex((entry) => entry.name === name);
          if (existingIndex !== -1) {
            models[existingIndex] = mergeCustomModelMetadata(models[existingIndex], customEntry);
            continue;
          }
          models.push(customEntry);
          existingNames.add(name);
        }
      }
    } catch {
      // Custom models are optional — skip on error
    }

    return Response.json({ models });
  } catch (error: any) {
    console.log("Error fetching models:", error);
    return Response.json({ error: { message: sanitizeErrorMessage(error) } }, { status: 500 });
  }
}
