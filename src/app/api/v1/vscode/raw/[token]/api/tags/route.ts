import {
  selectPreferredModels,
  toOllamaTagModel,
  type OpenAiCatalogModel,
} from "@/lib/vscode/tagModels";
import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { expandVscodeRawModels } from "@/app/api/v1/vscode/[token]/models/route";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/raw/[token]/tokenizedRequest";
import { isUsableChatModel } from "@/app/api/v1/vscode/[token]/usableChatModel";

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
  const preferredModels = expandVscodeRawModels(await selectPreferredModels(usableModels));
  const models = preferredModels.map((model) => toOllamaTagModel(model, "raw"));

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
