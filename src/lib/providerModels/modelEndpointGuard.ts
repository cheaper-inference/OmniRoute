import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
/**
 * Local endpoint guard (#16929).
 *
 * Only trusted capability metadata constrains dispatch: legacy rows and
 * defaulted chat tags remain backwards-compatible. This runs before upstream
 * credentials, health accounting and paid requests.
 *
 * Catalog-derived restrictions are opt-in via MODEL_ENDPOINT_CAPABILITY_GATE_ENABLED.
 * Registered native transports always reject incompatible requests before dispatch;
 * exact stored combo names retain precedence.
 */
import { getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";
import { getComboByName } from "@/lib/db/combos";
import {
  isTrustedEndpointCapabilitySource,
  normalizeModelSupportedEndpoints,
} from "@/shared/constants/modelSupportedEndpoints";
import { isModelEndpointCapabilityGateEnabled } from "./endpointCapabilityGateFlag";

export type RequestedEndpoint =
  | "chat"
  | "embeddings"
  | "rerank"
  | "images"
  | "videos"
  | "music"
  | "audio-speech"
  | "audio-transcriptions"
  | "ocr";

type TaggedModel = {
  supportedEndpoints?: readonly string[];
  endpointCapabilitySource?: string;
};
const ENDPOINT_ROUTE: Record<string, string> = {
  chat: "/v1/chat/completions",
  systemone: "/v1/systemone",
  decisions: "/v1/decisions",
  responses: "/v1/responses",
  embeddings: "/v1/embeddings",
  rerank: "/v1/rerank",
  images: "/v1/images/generations",
  "images-generations": "/v1/images/generations",
  videos: "/v1/videos/generations",
  music: "/v1/music/generations",
  "audio-speech": "/v1/audio/speech",
  "audio-transcriptions": "/v1/audio/transcriptions",
  ocr: "/v1/ocr",
};

function supportsRequestedEndpoint(supported: string[], requested: RequestedEndpoint): boolean {
  if (requested === "chat") return supported.includes("chat") || supported.includes("responses");
  if (requested === "images")
    return supported.includes("images") || supported.includes("images-generations");
  return supported.includes(requested);
}

function requestedEndpointRoute(requested: RequestedEndpoint): string {
  return ENDPOINT_ROUTE[requested] || "/v1/" + requested;
}

export function getModelEndpointMismatchMessage(
  fullModelId: string,
  model: TaggedModel | null | undefined,
  requested: RequestedEndpoint
): string | null {
  if (!model?.supportedEndpoints?.length) return null;
  // Neither a legacy/missing source nor an assumed chat default may impose
  // a hard upstream gate. Declared, user-owned and specialty-ID inference do.
  if (!isTrustedEndpointCapabilitySource(model.endpointCapabilitySource)) return null;
  const supported = normalizeModelSupportedEndpoints(model.supportedEndpoints);
  if (supportsRequestedEndpoint(supported, requested)) return null;
  const alternatives = [
    ...new Set(
      supported
        .map((endpoint) => ENDPOINT_ROUTE[endpoint])
        .filter((path): path is string => Boolean(path))
        .map((path) => "POST " + path)
    ),
  ];
  // Routes are prefixed with the HTTP method: errorResponse() sanitizes absolute
  // paths in prose to "<path>" unless they carry a route context (POST /v1/...),
  // which would leave the client with "does not serve <path>".
  return (
    "Model '" +
    fullModelId +
    "' does not serve POST " +
    requestedEndpointRoute(requested) +
    ". Use " +
    (alternatives.length ? alternatives.join(" or ") : "a supported endpoint") +
    " instead."
  );
}

export async function getRequestedModelEndpointMismatch(
  fullModelId: string,
  requested: RequestedEndpoint
): Promise<string | null> {
  if (typeof fullModelId !== "string") return null;
  const nativeProvider = fullModelId.split("/")[0];
  const nativeFormat = getRegistryEntry(nativeProvider)?.format;
  if (nativeFormat === "systemone" || nativeFormat === "decisions") {
    // A registered native transport cannot accept chat, regardless of the
    // optional capability gate. Exact stored combo names still win.
    try {
      if (await getComboByName(fullModelId)) return null;
    } catch {
      /* fail closed for native transport */
    }
    return getModelEndpointMismatchMessage(
      fullModelId,
      { supportedEndpoints: [nativeFormat], endpointCapabilitySource: "declared" },
      requested
    );
  }
  if (!isModelEndpointCapabilityGateEnabled()) return null;
  const slash = fullModelId.indexOf("/");
  if (slash <= 0 || slash >= fullModelId.length - 1) return null;
  const provider = fullModelId.slice(0, slash);
  const modelId = fullModelId.slice(slash + 1);
  try {
    const catalog = await getActiveSyncedCatalog(provider);
    const model = catalog.models.find((row) => row.id === modelId);
    const rejection = getModelEndpointMismatchMessage(fullModelId, model, requested);
    if (!rejection) return null;
    // An exact stored combo wins over a provider-shaped name collision.
    if (await getComboByName(fullModelId)) return null;
    return rejection;
  } catch {
    // A catalog/combo read failure must never turn into a client 400: fail open
    // to normal dispatch, exactly as with the flag off.
    return null;
  }
}
