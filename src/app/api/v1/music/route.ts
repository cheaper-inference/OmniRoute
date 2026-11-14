import {
  elevenLabsOptionsResponse,
  proxyElevenLabsRequest,
} from "@/app/api/v1/_shared/elevenLabsProxy";
import { proxyElevenLabsGeneration } from "@/app/api/v1/_shared/elevenLabsGeneration";
import { elevenLabsMusicSchema } from "@/shared/validation/schemas/elevenlabs";
import { getComboByName } from "@/lib/db/combos";
import { runModelEndpointCombo } from "@/lib/combos/modelEndpointCombo";
import { enforceApiKeyPolicy } from "@/shared/utils/apiKeyPolicy";
import { resolveKeyConnectionScope } from "@/sse/services/keyConnectionScope";
import { parseMusicModel } from "@omniroute/open-sse/config/musicRegistry.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";

export async function OPTIONS() {
  return elevenLabsOptionsResponse();
}

export async function POST(request: Request) {
  let candidate: unknown;
  try {
    candidate = await request.clone().json();
  } catch {
    return proxyElevenLabsGeneration(request, "/music", elevenLabsMusicSchema, "music_v1");
  }
  const parsed = elevenLabsMusicSchema.safeParse(candidate);
  const requestedModel = parsed.success ? parsed.data.model_id : null;
  if (typeof requestedModel === "string" && !requestedModel.includes("/")) {
    const combo = await getComboByName(requestedModel);
    if (combo) {
      const policy = await enforceApiKeyPolicy(request, requestedModel);
      if (policy.rejection) return policy.rejection;
      const scope = await resolveKeyConnectionScope(policy.apiKeyInfo);
      if (scope.rejection) return scope.rejection;
      return runModelEndpointCombo({
        name: requestedModel,
        endpoint: "music",
        request,
        body: { ...parsed.data, model: requestedModel },
        policy,
        allowedConnections: scope.allowedConnections,
        dispatch: (targetBody, allowedConnections) => {
          const target = String(targetBody.model || "");
          const { provider, model } = parseMusicModel(target);
          if (provider !== "elevenlabs" || !model) {
            return Promise.resolve(
              errorResponse(400, "The native /v1/music endpoint requires an ElevenLabs target")
            );
          }
          return proxyElevenLabsRequest(
            request,
            "/music",
            { method: "POST", body: JSON.stringify({ ...parsed.data, model_id: model }) },
            {
              model: target,
              contentType: "application/json",
              preauthorizedConnections: allowedConnections,
            }
          );
        },
      });
    }
  }
  return proxyElevenLabsGeneration(request, "/music", elevenLabsMusicSchema, "music_v1");
}
