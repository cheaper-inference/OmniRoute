import { clearLegacyVisionOverride } from "@/lib/providerModels/visionOverrides";
import {
  listProviderOutputOverrides,
  persistOutputTokenOverride,
} from "@/lib/providerModels/outputTokenOverrides";
import {
  getCustomModels,
  getAllCustomModels,
  addCustomModel,
  removeCustomModel,
  replaceCustomModels,
  deleteSyncedAvailableModelsForProvider,
  removeSyncedAvailableModel,
  updateCustomModel,
  getModelCompatOverrides,
  mergeModelCompatOverride,
  resetModelEndpointOverride,
  getHiddenModelsByProvider,
  getModelVisibilityMap,
  getOverrideVisibilityForModality,
  setModelVisibility,
  readStoredVisibility,
  type ModelCompatPatch,
} from "@/lib/db/models";
import { clearModelCompatOverrides } from "@/lib/db/models/compat";
import {
  getModelContextOverrideRecord,
  setModelContextOverride,
  removeModelContextOverride,
  listModelContextOverrides,
} from "@/lib/db/modelContextOverrides";
import {
  deleteManagedAvailableModelAliases,
  deleteManagedAvailableModelAliasesForProvider,
  syncManagedAvailableModelAliases,
} from "@/lib/providerModels/managedAvailableModels";
import {
  AI_PROVIDERS,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getRegisteredEndpointAdapterStatuses } from "@/lib/providerModels/endpointAdapterAvailability";
import {
  isHiddenForModality,
  normalizeVisibilityMode,
  type ModelVisibilityMode,
} from "@/shared/utils/modelVisibility";
import { normalizeCombosOnlyProviderSet } from "@/shared/utils/providerCombosOnly";
import { PROVIDER_ID_TO_ALIAS } from "@omniroute/open-sse/config/providerModels";
import { getCachedProviderNodes } from "@/lib/db/readCache";
import { getSettings } from "@/lib/db/settings";
import { isProviderNodePrefixReserved } from "@/lib/providerNodePrefixes";
import { clearHealthCheckHiddenMarks } from "@/lib/db/modelHealthAutoHidden";
export const dynamic = "force-dynamic";
import { providerModelMutationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { normalizeNodeModelId } from "@/lib/providerModels/modelIdNormalization";

function normalizeRequestedModelIds(
  searchParams: URLSearchParams,
  body: Record<string, unknown>
): string[] {
  const bodyModelIds = Array.isArray(body.modelIds)
    ? body.modelIds
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
    : [];
  const singleModelId = searchParams.get("modelId") || searchParams.get("model");
  const allModelIds = [...bodyModelIds, ...(singleModelId ? [singleModelId.trim()] : [])];
  return Array.from(new Set(allModelIds)).filter(Boolean);
}

/**
 * Run `action` on a model id as submitted, then (when it differs) on its
 * node-normalized form, stopping at the first id the action handles. Legacy
 * rows can still be stored under a prefixed id while writes store the bare
 * upstream id, so id-addressed resets and deletes resolve both forms.
 */
async function tryEachIdForm(
  submittedId: string,
  normalizedId: string,
  action: (id: string) => Promise<boolean>
): Promise<boolean> {
  if (await action(submittedId)) return true;
  return normalizedId !== submittedId && (await action(normalizedId));
}

/**
 * Persist one visibility mode for each requested model under its stored (bare) id so a
 * prefixed paste hits the same row the catalog emits. Returns every id form touched:
 * managed aliases are keyed `<storagePrefix>/<storedId>`, so the alias layer gets both forms
 * and a prefixed paste cannot leave the bare row's alias (or vice versa) pointing at a
 * still-visible model.
 */
async function setVisibilityByStoredIds(
  provider: string,
  modelIds: string[],
  mode: ModelVisibilityMode,
  modality: string | undefined
): Promise<string[]> {
  const normalizedIds: string[] = [];
  for (const requestedId of modelIds) {
    const modelId = await normalizeNodeModelId(provider, requestedId);
    normalizedIds.push(modelId);
    setModelVisibility(provider, modelId, mode, modality);
    // #11777: a manual hide/unhide makes the user the owner of the visibility state,
    // so the scheduled health check must never restore this model on its own. Clear
    // the mark per completed write: if a later model in the batch throws, the ones
    // already written keep their user ownership.
    clearHealthCheckHiddenMarks(provider, [requestedId, modelId]);
  }
  return Array.from(new Set([...modelIds, ...normalizedIds]));
}

/**
 * DELETE ?resetEndpoints=true: restore a model's endpoint override. Overrides
 * follow the same write contract as the rows they annotate (bare upstream id),
 * so the id resolves as submitted, then by its normalized form.
 */
async function resetEndpointOverrideResponse(provider: string, modelId: string) {
  const normalizedId = await normalizeNodeModelId(provider, modelId);
  const restored = await tryEachIdForm(modelId, normalizedId, (id) =>
    resetModelEndpointOverride(provider, id)
  );
  if (!restored)
    return Response.json(
      { error: { message: "No endpoint override to reset", type: "not_found" } },
      { status: 404 }
    );
  return Response.json({ restored: true, resetEndpoints: true });
}

/**
 * GET /api/provider-models?provider=<id>
 * List custom models (all providers if no provider param)
 */
export async function GET(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");

    const models = provider ? await getCustomModels(provider) : await getAllCustomModels();
    const modelCompatOverrides = provider ? getModelCompatOverrides(provider) : [];
    const modelOutputOverrides = listProviderOutputOverrides(provider);
    const outputOverrides = new Map(
      modelOutputOverrides.map((row) => [row.modelId, row.maxOutputTokenOverride])
    );
    // #4125: surface the manual/auto context-window override (Feature 5004 table) on
    // each custom-model row so the UI can show/edit it without a second round trip.
    const modelsWithContextOverride =
      provider && Array.isArray(models)
        ? models.map((model: Record<string, unknown>) => {
            const modelId = typeof model?.id === "string" ? model.id : null;
            const record = modelId ? getModelContextOverrideRecord(provider, modelId) : null;
            const outputOverride = modelId ? outputOverrides.get(modelId) : undefined;
            const outputFields =
              outputOverride === undefined ? {} : { maxOutputTokenOverride: outputOverride };
            // Three-state visibility for this row: the operator-declared custom row wins, then
            // the compat override — the same precedence `getModelIsHidden` reads.
            const visibilityMode = modelId
              ? readStoredVisibility(provider, modelId, "chat", {
                  customModels: models as Array<Record<string, unknown>>,
                  compatOverrides: modelCompatOverrides,
                })
              : null;
            const visibilityFields = visibilityMode === null ? {} : { visibilityMode };
            return record
              ? {
                  ...model,
                  ...outputFields,
                  ...visibilityFields,
                  contextWindowOverride: record.realContext,
                  contextWindowOverrideSource: record.source,
                }
              : { ...model, ...outputFields, ...visibilityFields };
          })
        : models;

    // #9203: surface the unified hidden-model map (customModels.isHidden +
    // modelCompatOverrides.isHidden) so the client can filter every model source
    // (system catalog, fallback, aliases, auto-fetched) — not just custom rows.
    const hiddenModelsByProvider: Record<string, string[]> = {};
    for (const [providerId, hiddenModelIds] of getHiddenModelsByProvider()) {
      if (hiddenModelIds.size > 0) {
        hiddenModelsByProvider[providerId] = [...hiddenModelIds];
      }
    }
    // Three-state visibility for the dashboard: a row can be `visible`, `combos_only` or
    // `hidden`, and a provider-level default (`combosOnlyProviders`) is inherited by every
    // model without an explicit override. Returning all three buckets in this same response
    // lets the client hydrate the state in one fetch instead of N per-model reads.
    const visibilityMap = getModelVisibilityMap("chat");
    const toRecord = (map: Map<string, Set<string>>): Record<string, string[]> => {
      const out: Record<string, string[]> = {};
      for (const [providerId, modelIds] of map) {
        if (modelIds.size > 0) out[providerId] = [...modelIds];
      }
      return out;
    };
    // The provider-level default this page renders as "inherited": every model without its own
    // override inherits `combos_only`. Resolved here so the dashboard does not need a second
    // settings round trip, and matched through the same key forms the catalog uses (canonical
    // id, alias, compatible-node id/prefix).
    let combosOnlyProvider = false;
    if (provider) {
      let configured: unknown = [];
      try {
        configured = (await getSettings()).combosOnlyProviders;
      } catch {
        configured = [];
      }
      const configuredSet = normalizeCombosOnlyProviderSet(configured);
      if (configuredSet.size > 0) {
        const providerKeys = new Set<string>([provider]);
        const alias = PROVIDER_ID_TO_ALIAS[provider];
        if (typeof alias === "string" && alias) providerKeys.add(alias);
        try {
          for (const node of await getCachedProviderNodes()) {
            const nodeId = typeof node?.id === "string" ? node.id : "";
            const prefix = typeof node?.prefix === "string" ? node.prefix : "";
            if (!nodeId || !prefix) continue;
            if (nodeId === provider || prefix === provider) {
              providerKeys.add(nodeId);
              if (!isProviderNodePrefixReserved(prefix)) providerKeys.add(prefix);
            }
          }
        } catch {
          // Node cache unavailable: the canonical id and alias keys still match.
        }
        combosOnlyProvider = [...providerKeys].some((key) => configuredSet.has(key));
      }
    }

    // #14337: the block above attaches the override to CUSTOM-model rows only.
    // A synced/imported model has no `customModels` row, so its override — which
    // the PUT compatOnly branch has always accepted — was never readable, and the
    // UI had no value to show or edit. Return the provider's overrides directly
    // so a row without a custom entry can still carry one.
    const modelContextOverrides = provider
      ? listModelContextOverrides()
          .filter((override) => override.provider === provider)
          .map((override) => ({
            modelId: override.modelId,
            contextWindowOverride: override.realContext,
            contextWindowOverrideSource: override.source,
          }))
      : [];

    return Response.json({
      models: modelsWithContextOverride,
      modelCompatOverrides: modelCompatOverrides.map((override) => ({
        ...override,
        isHidden: isHiddenForModality(override, "chat"),
        visibilityMode: getOverrideVisibilityForModality(override, "chat"),
      })),
      modelContextOverrides,
      modelOutputOverrides,
      endpointAdapters: provider ? getRegisteredEndpointAdapterStatuses(provider) : {},
      hiddenModelsByProvider,
      combosOnlyModelsByProvider: toRecord(visibilityMap.combosOnly),
      explicitVisibleModelsByProvider: toRecord(visibilityMap.explicitVisible),
      /** Provider-level `combos_only` default (`settings.combosOnlyProviders`) for this provider. */
      providerCombosOnly: combosOnlyProvider,
    });
  } catch {
    return Response.json(
      { error: { message: "Failed to fetch provider models", type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * Stores the manual context-window override sent at ADD time and echoes it on the
 * added model. Without an override the response body is unchanged.
 */
function withAddTimeContextOverride<T extends object>(
  provider: string,
  modelId: string,
  model: T,
  contextWindowOverride: number | null | undefined
) {
  if (contextWindowOverride == null) return { model };
  setModelContextOverride(provider, modelId, contextWindowOverride, "manual");
  return {
    model: { ...model, contextWindowOverride, contextWindowOverrideSource: "manual" as const },
  };
}

/**
 * POST /api/provider-models
 * Body: { provider, modelId, modelName?, contextWindowOverride? }
 */
export async function POST(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON body", type: "validation_error" } },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(providerModelMutationSchema, rawBody);
    if (isValidationFailure(validation)) {
      return Response.json({ error: validation.error }, { status: 400 });
    }
    const {
      provider,
      modelId,
      modelName,
      source,
      apiFormat,
      supportedEndpoints,
      endpointCapabilitySource,
      targetFormat,
      // #1294: persist the per-model token limits set in the add-model form.
      max_input_tokens: maxInputTokens,
      max_output_tokens: maxOutputTokens,
      // #1904: manual vision-capability override set in the add-model form.
      supportsVision,
      // #9820: optional video-generation job preset (job/poll path).
      generationConfig,
      isFree,
      dimensions,
      supportedInputTypes,
      modelType,
      // Manual context-window override set at ADD time — same Feature-5004 table
      // the PUT path (#4125) writes, so the chatCore guard sees the real window
      // from the first request instead of DEFAULT_LIMITS.default (128k).
      contextWindowOverride,
    } = validation.data;

    // Store the bare upstream id: a pasted/imported id can arrive already
    // carrying the node prefix (copied from a prefixed listing), and storing
    // it verbatim would stack another prefix at catalog emission
    // (`<prefix>/<prefix>/<model>`). Scoped to compatible nodes — canonical
    // providers' ids that begin with their own name are legitimate and pass
    // through untouched.
    const storedModelId = await normalizeNodeModelId(provider, modelId);

    const model = await addCustomModel(
      provider,
      storedModelId,
      modelName,
      source || "manual",
      apiFormat,
      supportedEndpoints,
      targetFormat,
      {
        ...(maxInputTokens != null ? { inputTokenLimit: maxInputTokens } : {}),
        ...(maxOutputTokens != null ? { outputTokenLimit: maxOutputTokens } : {}),
      },
      typeof supportsVision === "boolean" ? supportsVision : undefined,
      generationConfig,
      typeof isFree === "boolean" ? isFree : undefined,
      {
        ...(typeof dimensions === "number" && dimensions > 0 ? { dimensions } : {}),
        ...(Array.isArray(supportedInputTypes) ? { supportedInputTypes } : {}),
        ...(typeof modelType === "string" ? { modelType } : {}),
        ...(endpointCapabilitySource ? { endpointCapabilitySource } : {}),
      }
    );

    return Response.json(
      withAddTimeContextOverride(provider, storedModelId, model, contextWindowOverride)
    );
  } catch (error) {
    console.error("Error adding provider model:", error);
    return Response.json(
      { error: { message: "Failed to add provider model", type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/provider-models
 * Body: { provider, modelId, modelName?, apiFormat?, supportedEndpoints? }
 * A body with only `contextWindowOverride` next to provider/modelId never creates a custom-model row.
 */
export async function PUT(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON body", type: "validation_error" } },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(providerModelMutationSchema, rawBody);
    if (isValidationFailure(validation)) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const {
      provider,
      modelId,
      modelName,
      apiFormat,
      supportedEndpoints,
      targetFormat,
      normalizeToolCallId,
      preserveOpenAIDeveloperRole,
      upstreamHeaders,
      compatByProtocol,
      contextWindowOverride,
      maxOutputTokenOverride,
      supportsVision,
      thinkingReplay,
      generationConfig,
      isFree,
    } = validation.data;

    // Same write-path contract as POST: address (and, with createIfMissing,
    // create) the row under the bare upstream id so a prefixed paste cannot
    // re-introduce a stacked custom row through the update verb.
    const storedModelId = await normalizeNodeModelId(provider, modelId);

    const raw = rawBody as Record<string, unknown>;
    const updates: Record<string, unknown> = {};
    if ("modelName" in raw) updates.modelName = modelName;
    if ("apiFormat" in raw) updates.apiFormat = apiFormat;
    if ("supportedEndpoints" in raw) updates.supportedEndpoints = supportedEndpoints;
    if ("targetFormat" in raw) updates.targetFormat = targetFormat;
    if ("normalizeToolCallId" in raw) updates.normalizeToolCallId = normalizeToolCallId;
    if ("preserveOpenAIDeveloperRole" in raw)
      updates.preserveOpenAIDeveloperRole = preserveOpenAIDeveloperRole;
    if ("upstreamHeaders" in raw) updates.upstreamHeaders = upstreamHeaders;
    if ("supportsVision" in raw) updates.supportsVision = supportsVision;
    if ("isFree" in raw) updates.isFree = isFree;
    // #9820: video-generation job preset — schema is non-nullable optional, so
    // presence implies a well-formed { preset } object; null is rejected by Zod.
    if ("generationConfig" in raw && generationConfig !== undefined) {
      updates.generationConfig = generationConfig;
    }
    if ("compatByProtocol" in raw && compatByProtocol !== undefined) {
      updates.compatByProtocol = compatByProtocol;
    }

    // #4125: manual context-window override — persisted in the Feature-5004
    // `model_context_overrides` table (source="manual"), independent of the
    // customModels JSON row, so it applies whether or not other fields changed.
    let contextWindowOverrideResult: number | null | undefined;
    if ("contextWindowOverride" in raw) {
      if (contextWindowOverride == null) {
        removeModelContextOverride(provider, storedModelId);
        // Legacy overrides may be keyed by the id as it was submitted before
        // normalization; clear that key too so a stale override cannot linger.
        if (storedModelId !== modelId) removeModelContextOverride(provider, modelId);
        contextWindowOverrideResult = null;
      } else {
        setModelContextOverride(provider, storedModelId, contextWindowOverride, "manual");
        if (storedModelId !== modelId) removeModelContextOverride(provider, modelId);
        contextWindowOverrideResult = contextWindowOverride;
      }
    }

    // A body whose only mutable keys are `contextWindowOverride` and/or
    // `thinkingReplay` edits overlay records alone (`model_context_overrides`,
    // the modelCompatOverrides entry). It must not upsert a customModels row:
    // that would turn a native/synced catalog model into a "custom" one
    // (/v1/models overlay, apiFormat flip, availability under a live catalog).
    const contextOnly =
      ("contextWindowOverride" in raw || "thinkingReplay" in raw) &&
      Object.keys(raw).every((k) =>
        ["provider", "modelId", "contextWindowOverride", "thinkingReplay"].includes(k)
      );

    const model = await updateCustomModel(provider, storedModelId, updates, {
      createIfMissing:
        !contextOnly && (maxOutputTokenOverride === undefined || Object.keys(updates).length > 0),
    });
    clearLegacyVisionOverride(provider, modelId, updates);

    if (!model) {
      const rawKeys = Object.keys(raw);
      // isFree is intentionally excluded: it has no compat-override home (customModels row only),
      // so a PUT with isFree against a missing row must 404 rather than enter the compat branch.
      const compatOnly =
        rawKeys.length > 0 &&
        rawKeys.every((k) =>
          [
            "provider",
            "modelId",
            "modelName",
            "source",
            "normalizeToolCallId",
            "preserveOpenAIDeveloperRole",
            "upstreamHeaders",
            "compatByProtocol",
            "contextWindowOverride",
            "maxOutputTokenOverride",
            "apiFormat",
            "targetFormat",
            "supportsVision",
            "thinkingReplay",
          ].includes(k)
        ) &&
        ("normalizeToolCallId" in raw ||
          "preserveOpenAIDeveloperRole" in raw ||
          "upstreamHeaders" in raw ||
          "compatByProtocol" in raw ||
          "contextWindowOverride" in raw ||
          "maxOutputTokenOverride" in raw ||
          "apiFormat" in raw ||
          "targetFormat" in raw ||
          "supportsVision" in raw ||
          "thinkingReplay" in raw);
      if (compatOnly) {
        const knownProvider =
          !!provider &&
          (Object.prototype.hasOwnProperty.call(
            AI_PROVIDERS as Record<string, unknown>,
            provider
          ) ||
            isOpenAICompatibleProvider(provider) ||
            isAnthropicCompatibleProvider(provider));
        if (!knownProvider) {
          return Response.json(
            { error: { message: "Unknown provider", type: "validation_error" } },
            { status: 400 }
          );
        }
        const patch: ModelCompatPatch = {};
        if ("normalizeToolCallId" in raw && typeof normalizeToolCallId === "boolean") {
          patch.normalizeToolCallId = normalizeToolCallId;
        }
        if ("preserveOpenAIDeveloperRole" in raw) {
          patch.preserveOpenAIDeveloperRole =
            preserveOpenAIDeveloperRole === null || typeof preserveOpenAIDeveloperRole === "boolean"
              ? preserveOpenAIDeveloperRole
              : undefined;
        }
        if ("compatByProtocol" in raw && compatByProtocol && typeof compatByProtocol === "object") {
          patch.compatByProtocol = compatByProtocol;
        }
        if ("upstreamHeaders" in raw) {
          patch.upstreamHeaders =
            upstreamHeaders === null || typeof upstreamHeaders === "object"
              ? upstreamHeaders
              : undefined;
        }
        if ("apiFormat" in raw) {
          patch.apiFormat = typeof apiFormat === "string" ? apiFormat : null;
        }
        if ("targetFormat" in raw) {
          patch.targetFormat = typeof targetFormat === "string" ? targetFormat : null;
        }
        if ("supportsVision" in raw) {
          patch.supportsVision =
            supportsVision === null || typeof supportsVision === "boolean"
              ? supportsVision
              : undefined;
        }
        if ("thinkingReplay" in raw && thinkingReplay !== undefined) {
          patch.thinkingReplay = thinkingReplay;
        }
        if (Object.keys(patch).length > 0) {
          mergeModelCompatOverride(provider, storedModelId, patch);
        }
        return Response.json({
          ok: true,
          ...persistOutputTokenOverride(provider, storedModelId, maxOutputTokenOverride),
          modelCompatOverrides: getModelCompatOverrides(provider),
          ...(contextWindowOverrideResult !== undefined
            ? { contextWindowOverride: contextWindowOverrideResult }
            : {}),
        });
      }
      return Response.json(
        { error: { message: "Model not found", type: "not_found" } },
        { status: 404 }
      );
    }

    // thinkingReplay has no customModels home: the translator reads it from the
    // modelCompatOverrides entry only, so persist it there for custom rows too.
    if ("thinkingReplay" in raw && thinkingReplay !== undefined) {
      mergeModelCompatOverride(provider, storedModelId, { thinkingReplay });
    }

    return Response.json({
      model,
      ...persistOutputTokenOverride(provider, storedModelId, maxOutputTokenOverride),
      ...(contextWindowOverrideResult !== undefined
        ? { contextWindowOverride: contextWindowOverrideResult }
        : {}),
    });
  } catch (error) {
    console.error("Error updating provider model:", error);
    return Response.json(
      { error: { message: "Failed to update provider model", type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/provider-models?provider=<id>&modelId=<modelId>
 * Body: { visibilityMode: "visible" | "combos_only" | "hidden", modelIds?: string[], modality?: string }
 *
 * `isHidden: boolean` is still accepted for older callers and maps onto the same three-state
 * write (`true` → `hidden`, `false` → `visible`).
 */
export async function PATCH(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON body", type: "validation_error" } },
      { status: 400 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");
    const body =
      rawBody && typeof rawBody === "object" && !Array.isArray(rawBody)
        ? (rawBody as Record<string, unknown>)
        : {};

    if (!provider) {
      return Response.json(
        { error: { message: "provider query param is required", type: "validation_error" } },
        { status: 400 }
      );
    }

    // Three-state visibility (`visible` | `combos_only` | `hidden`) is the primary contract;
    // the legacy `isHidden` boolean is still accepted and maps onto it (true → hidden,
    // false → visible), so every existing caller keeps working unchanged.
    const requestedMode = normalizeVisibilityMode(body.visibilityMode);
    if (body.visibilityMode !== undefined && requestedMode === null) {
      return Response.json(
        {
          error: {
            message: "visibilityMode must be one of visible, combos_only, hidden",
            type: "validation_error",
          },
        },
        { status: 400 }
      );
    }
    const visibilityMode: ModelVisibilityMode | null =
      requestedMode ??
      (typeof body.isHidden === "boolean" ? (body.isHidden ? "hidden" : "visible") : null);
    if (visibilityMode === null) {
      return Response.json(
        {
          error: {
            message: "visibilityMode or isHidden boolean is required",
            type: "validation_error",
          },
        },
        { status: 400 }
      );
    }

    // #12172: optional modality scope (e.g. "chat", "images") so hiding a model on one
    // registry surface does not also hide an identically-ID'd model on another one.
    // Omitted = legacy "hide everywhere" behavior, unchanged for existing callers.
    if (typeof body.modality !== "undefined" && typeof body.modality !== "string") {
      return Response.json(
        { error: { message: "modality must be a string when provided", type: "validation_error" } },
        { status: 400 }
      );
    }
    const modality = typeof body.modality === "string" && body.modality ? body.modality : undefined;

    const modelIds = normalizeRequestedModelIds(searchParams, body);
    if (modelIds.length === 0) {
      return Response.json(
        {
          error: {
            message: "modelId query param or body.modelIds is required",
            type: "validation_error",
          },
        },
        { status: 400 }
      );
    }

    // Alias lifecycle follows "callable directly": a `hidden` or `combos_only` model must not
    // keep a published managed alias (which would be a direct call under another name), and
    // returning to `visible` republishes them.
    const callableDirectly = visibilityMode === "visible";
    const aliasTargetIds = await setVisibilityByStoredIds(
      provider,
      modelIds,
      visibilityMode,
      modality
    );
    const aliasChanges = callableDirectly
      ? {
          removed: [],
          assigned: (
            await syncManagedAvailableModelAliases(provider, aliasTargetIds, {
              pruneMissing: false,
            })
          ).assignedAliases,
        }
      : {
          removed: await deleteManagedAvailableModelAliases(provider, aliasTargetIds),
          assigned: [],
        };

    return Response.json({
      ok: true,
      updated: modelIds.length,
      appliedVisibilityMode: visibilityMode,
      aliasChanges,
      models: await getCustomModels(provider),
      modelCompatOverrides: getModelCompatOverrides(provider).map((override) => ({
        ...override,
        isHidden: isHiddenForModality(override, "chat"),
        visibilityMode: getOverrideVisibilityForModality(override, "chat"),
      })),
    });
  } catch (error) {
    console.error("Error patching provider models:", error);
    return Response.json(
      { error: { message: "Failed to update provider models", type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/provider-models?provider=<id>&model=<modelId>
 */
export async function DELETE(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");
    const modelId = searchParams.get("model");
    const resetOverride = searchParams.get("resetOverride") === "true";
    const resetEndpoints = searchParams.get("resetEndpoints") === "true";

    if (!provider) {
      return Response.json(
        {
          error: {
            message: "provider query param is required",
            type: "validation_error",
          },
        },
        { status: 400 }
      );
    }

    // DELETE /api/provider-models?provider=<id>&all=true — clear all models
    const all = searchParams.get("all");
    if (all === "true") {
      await replaceCustomModels(provider, [], { allowEmpty: true });
      clearModelCompatOverrides(provider);
      const syncedAvailableModelListsRemoved =
        await deleteSyncedAvailableModelsForProvider(provider);
      const removedAliases = await deleteManagedAvailableModelAliasesForProvider(provider);
      return Response.json({
        cleared: true,
        syncedAvailableModelListsRemoved,
        aliasChanges: { removed: removedAliases, assigned: [] },
      });
    }

    if (!modelId) {
      return Response.json(
        {
          error: {
            message: "model query param is required (or use all=true)",
            type: "validation_error",
          },
        },
        { status: 400 }
      );
    }

    if (resetEndpoints) return await resetEndpointOverrideResponse(provider, modelId);

    // Resetting a user-owned overlay must never delete the same-id synced base.
    // The normal delete action retains its existing behavior for a standalone
    // synced row, while the detail-page reset control uses resetOverride=true.
    // Match the row the operator can see: the id as submitted, then its
    // node-normalized form, so both legacy stacked rows and pasted prefixed
    // ids resolve to the same delete.
    const normalizedModelId = await normalizeNodeModelId(provider, modelId);
    const modelIdForms = Array.from(new Set([modelId, normalizedModelId]));
    const removedCustom = await tryEachIdForm(modelId, normalizedModelId, (id) =>
      removeCustomModel(provider, id)
    );
    const removedSynced =
      removedCustom || resetOverride
        ? false
        : await tryEachIdForm(modelId, normalizedModelId, (id) =>
            removeSyncedAvailableModel(provider, id)
          );
    const removed = removedCustom || removedSynced;
    if (resetOverride && removedCustom) {
      modelIdForms.forEach((id) => removeModelContextOverride(provider, id));
      const aliasChanges = await syncManagedAvailableModelAliases(provider, modelIdForms, {
        pruneMissing: false,
      });
      return Response.json({
        removed,
        resetOverride: true,
        aliasChanges,
      });
    }

    const removedAliases = await deleteManagedAvailableModelAliases(provider, modelIdForms);
    return Response.json({ removed, aliasChanges: { removed: removedAliases, assigned: [] } });
  } catch (error) {
    console.error("Error removing provider model:", error);
    return Response.json(
      { error: { message: "Failed to remove provider model", type: "server_error" } },
      { status: 500 }
    );
  }
}
