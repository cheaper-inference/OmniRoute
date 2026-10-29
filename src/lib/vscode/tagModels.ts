import { getProviderConnections } from "@/lib/db/providers";
import { getCanonicalModelMetadata } from "@/lib/modelMetadataRegistry";
import {
  buildReasoningConfigSchema,
  buildSupportedReasoningEfforts,
  getDefaultReasoningEffort,
  getReasoningVariantBaseModelId,
  getReasoningEffortValues,
  inferSelectedReasoningEffort,
  type VscodeCatalogModel,
} from "./reasoningMetadata";
import { parseVscodeServiceTierVariantModelId } from "./serviceTierVariants";
import { getFamilyFirstPublishedModelId } from "./familyFirstModelIds";

export type OpenAiCatalogModel = {
  id?: string;
  name?: string;
  root?: string;
  parent?: string | null;
  owned_by?: string;
  type?: string;
  api_format?: string;
  context_length?: number;
  output_modalities?: string[];
  supported_endpoints?: string[];
};

function getModelName(model: OpenAiCatalogModel) {
  return model.id || model.name || model.root || "";
}

function isCodexOwnedModel(model: OpenAiCatalogModel) {
  const owner = typeof model.owned_by === "string" ? model.owned_by.trim().toLowerCase() : "";
  const modelName = getModelName(model).toLowerCase();

  return owner === "codex" || modelName.startsWith("cx/") || modelName.startsWith("codex/");
}

export async function selectPreferredModels(models: OpenAiCatalogModel[]) {
  const activeConnections = (await getProviderConnections({ isActive: true })) as Array<{
    provider?: string;
  }>;
  const activeProviders = new Set(
    activeConnections
      .map((connection) =>
        typeof connection.provider === "string" ? connection.provider.trim().toLowerCase() : ""
      )
      .filter(Boolean)
  );

  const preferCodexOnly =
    activeProviders.size > 0 &&
    Array.from(activeProviders).every((provider) => provider === "codex");
  if (!preferCodexOnly) return models;

  const codexModels = models.filter(isCodexOwnedModel);
  return codexModels.length > 0 ? codexModels : models;
}

function getOllamaModelFamily(model: OpenAiCatalogModel, canonicalFamily?: string | null) {
  const rawModelId = getModelName(model).trim();
  const tierParsedModel = parseVscodeServiceTierVariantModelId(rawModelId);
  const baseModelId = getReasoningVariantBaseModelId(tierParsedModel.baseModelId);
  const modelFamily = baseModelId.includes("/")
    ? baseModelId.split("/").slice(1).join("/")
    : baseModelId;

  if (modelFamily) {
    return modelFamily;
  }

  if (canonicalFamily && canonicalFamily.trim().length > 0) {
    return canonicalFamily.trim();
  }

  return typeof model.owned_by === "string" && model.owned_by.trim().length > 0
    ? model.owned_by.trim()
    : "omniroute";
}

function buildReasoningFields(model: OpenAiCatalogModel) {
  const reasoningEffortValues = getReasoningEffortValues(model as VscodeCatalogModel);
  if (!reasoningEffortValues) return undefined;

  const selectedReasoningEffort =
    inferSelectedReasoningEffort(model as VscodeCatalogModel, reasoningEffortValues) || "none";
  const defaultReasoningEffort = getDefaultReasoningEffort(
    model as VscodeCatalogModel,
    reasoningEffortValues
  );
  const supportedReasoningEfforts =
    reasoningEffortValues.length > 0
      ? buildSupportedReasoningEfforts(reasoningEffortValues)
      : undefined;
  const configSchema = defaultReasoningEffort
    ? buildReasoningConfigSchema(reasoningEffortValues, defaultReasoningEffort)
    : undefined;

  return {
    supports_reasoning_effort: reasoningEffortValues,
    supportsReasoningEffort: reasoningEffortValues,
    supportedReasoningEfforts,
    defaultReasoningEffort,
    selected_reasoning_effort: selectedReasoningEffort,
    selectedReasoningEffort: selectedReasoningEffort,
    ...(configSchema ? { configurationSchema: configSchema } : {}),
    ...(configSchema ? { configSchema } : {}),
  };
}

export function toOllamaTagModel(model: OpenAiCatalogModel, mode: "grouped" | "raw") {
  const actualModelId = model.id || model.root || "unknown";
  const canonicalMetadata = getCanonicalModelMetadata({
    provider: model.owned_by || null,
    model: model.root || model.id || model.name || null,
  });
  const family = getOllamaModelFamily(model, canonicalMetadata?.metadata.family || null);
  const modelId =
    mode === "raw" ? actualModelId : getFamilyFirstPublishedModelId(actualModelId, family);
  const contextLength = typeof model.context_length === "number" ? model.context_length : 0;
  const reasoningFields = buildReasoningFields(model);

  return {
    name: modelId,
    model: modelId,
    modified_at: "2026-01-01T00:00:00Z",
    size: 0,
    digest: `omniroute:${modelId}`,
    ...reasoningFields,
    details: {
      format: "openai",
      family,
      parameter_size: contextLength > 0 ? `${contextLength} ctx` : "unknown",
      quantization_level: "dynamic",
      ...reasoningFields,
    },
  };
}
