import {
  buildShowPayload,
  getRequestedModelName,
  matchesRequestedModel,
  type OpenAiCatalogModel,
} from "@/lib/vscode/showModel";
import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { getVscodeRawModelDisplayName } from "@/app/api/v1/vscode/[token]/models/route";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { expandVscodeRawModels } from "@/app/api/v1/vscode/[token]/models/route";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/raw/[token]/tokenizedRequest";
import { isUsableChatModel } from "@/app/api/v1/vscode/[token]/usableChatModel";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(
  request: Request,
  { params }: { params?: Promise<{ token: string }> | { token: string } } = {}
) {
  const resolvedParams = params ? await params : undefined;
  const authorizedRequest = withPathTokenApiKey(request, resolvedParams?.token);
  const payload = await request
    .clone()
    .json()
    .catch(() => null);
  const requestedName = getRequestedModelName(payload);

  if (!requestedName) {
    return Response.json(
      {
        error: "Model name is required",
      },
      {
        status: 400,
        headers: {
          ...CORS_HEADERS,
        },
      }
    );
  }

  const catalogResponse = await getUnifiedModelsResponse(authorizedRequest, {
    "Content-Type": "application/json",
    ...CORS_HEADERS,
  });
  const catalogBody = (await catalogResponse.json()) as { data?: OpenAiCatalogModel[] };

  if (!catalogResponse.ok) {
    return Response.json(catalogBody, {
      status: catalogResponse.status,
      headers: {
        ...CORS_HEADERS,
      },
    });
  }

  const expandedModels = Array.isArray(catalogBody.data)
    ? expandVscodeRawModels(catalogBody.data.filter(isUsableChatModel))
    : [];

  const model = Array.isArray(expandedModels)
    ? expandedModels.find((entry) => matchesRequestedModel(entry, requestedName))
    : undefined;

  if (!model) {
    return Response.json(
      {
        error: `Model not found: ${requestedName}`,
      },
      {
        status: 404,
        headers: {
          ...CORS_HEADERS,
        },
      }
    );
  }

  return Response.json(
    buildShowPayload(
      model,
      getVscodeRawModelDisplayName(model),
      model.id || model.name || model.root || "unknown"
    ),
    {
      headers: {
        ...CORS_HEADERS,
      },
    }
  );
}
