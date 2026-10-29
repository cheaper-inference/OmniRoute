import {
  selectPreferredModels,
  toOllamaTagModel,
  type OpenAiCatalogModel,
} from "@/lib/vscode/tagModels";
import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getReasoningVariantBaseModelId } from "@/lib/vscode/reasoningMetadata";
import { getVscodeModelGroupingKey } from "@/app/api/v1/vscode/[token]/modelPresentation";
import {
  expandVscodeServiceTierModels,
  getVscodeServiceTierVariantModelId,
  parseVscodeServiceTierVariantModelId,
} from "@/app/api/v1/vscode/[token]/serviceTierVariants";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/[token]/tokenizedRequest";
import { isUsableChatModel } from "@/app/api/v1/vscode/[token]/usableChatModel";

function filterCanonicalTagModels(models: OpenAiCatalogModel[]) {
  const allModelIds = new Set(
    models.map((model) => (model.id || model.root || model.name || "").trim()).filter(Boolean)
  );
  const groupedModels = new Map<string, OpenAiCatalogModel>();
  const orderedGroupKeys: string[] = [];

  for (const model of models) {
    const modelId = (model.id || model.root || model.name || "").trim();
    if (!modelId) continue;

    const tierParsedModel = parseVscodeServiceTierVariantModelId(modelId);
    const baseModelId = getReasoningVariantBaseModelId(tierParsedModel.baseModelId);
    const canonicalModelId = tierParsedModel.serviceTier
      ? getVscodeServiceTierVariantModelId(baseModelId, tierParsedModel.serviceTier)
      : baseModelId;
    if (canonicalModelId !== modelId && allModelIds.has(canonicalModelId)) {
      continue;
    }

    const groupKey = tierParsedModel.serviceTier
      ? canonicalModelId
      : getVscodeModelGroupingKey(model) || canonicalModelId;
    const current = groupedModels.get(groupKey);
    if (!current) {
      groupedModels.set(groupKey, model);
      orderedGroupKeys.push(groupKey);
      continue;
    }

    const currentId = (current.id || current.root || current.name || "").trim();
    if (currentId !== groupKey && modelId === canonicalModelId) {
      groupedModels.set(groupKey, model);
    }
  }

  return orderedGroupKeys
    .map((groupKey) => groupedModels.get(groupKey))
    .filter(Boolean) as OpenAiCatalogModel[];
}

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(
  request: Request,
  { params }: { params?: Promise<{ token: string }> | { token: string } } = {}
) {
  const resolvedParams = params ? await params : undefined;
  const authorizedRequest = withPathTokenApiKey(request, resolvedParams?.token);
  const response = await getUnifiedModelsResponse(authorizedRequest, {
    "Content-Type": "application/json",
    ...CORS_HEADERS,
  });
  const body = (await response.json()) as { data?: OpenAiCatalogModel[] };

  if (!response.ok) {
    return Response.json(body, {
      status: response.status,
      headers: {
        ...CORS_HEADERS,
      },
    });
  }

  const usableModels = Array.isArray(body.data) ? body.data.filter(isUsableChatModel) : [];
  const preferredModels = filterCanonicalTagModels(
    expandVscodeServiceTierModels(await selectPreferredModels(usableModels))
  );
  const models = preferredModels.map((model) => toOllamaTagModel(model, "grouped"));

  return Response.json(
    {
      models,
    },
    {
      headers: {
        ...CORS_HEADERS,
      },
    }
  );
}
