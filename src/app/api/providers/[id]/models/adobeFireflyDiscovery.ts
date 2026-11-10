import {
  discoverAdobeFireflyModels,
  resolveAdobeAccessToken,
} from "@omniroute/open-sse/services/adobeFireflyClient.ts";
import {
  getAdobeFireflyFallbackCatalog,
  mapDiscoveredToCatalog,
  toAdobeMediaCapabilitiesApi,
  type AdobeFireflyCatalogModel,
} from "@omniroute/open-sse/services/adobeFireflyModels.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import type { DiscoveryFailure } from "@/shared/discovery/degradedCause";

type AdobeProviderData = { cookie?: unknown; access_token?: unknown; accessToken?: unknown };

interface AdobeProviderModelsResult {
  models: Array<Record<string, unknown>>;
  source: "api" | "local_catalog";
  warning?: string;
  /** Why the live catalog was not used — a code or an HTTP status, never a message. */
  failure?: DiscoveryFailure;
}

function toModelResponse(model: AdobeFireflyCatalogModel): Record<string, unknown> {
  const endpoint = model.modality === "image" ? "images" : "videos";
  return {
    id: model.id,
    name: model.name,
    owned_by: "adobe-firefly",
    // Import posts this row to /api/provider-models, whose schema names the
    // formats "images-generations" / "video" (the endpoints stay plural).
    apiFormat: model.modality === "image" ? "images-generations" : "video",
    supportedEndpoints: [endpoint],
    type: model.modality,
    input_modalities: model.inputModalities,
    output_modalities: [model.modality],
    supported_sizes: model.capabilities.supportedSizes,
    media_capabilities: toAdobeMediaCapabilitiesApi(model),
  };
}

function fallback(warning: string, failure: DiscoveryFailure): AdobeProviderModelsResult {
  return {
    models: getAdobeFireflyFallbackCatalog().map(toModelResponse),
    source: "local_catalog",
    warning,
    failure,
  };
}

export async function getAdobeModels(
  apiKey: string | undefined,
  accessToken: string | undefined,
  providerData: unknown,
  fetchImpl: typeof fetch = fetch
): Promise<AdobeProviderModelsResult> {
  const providerSpecificData =
    providerData && typeof providerData === "object" ? (providerData as AdobeProviderData) : {};
  try {
    const token = await resolveAdobeAccessToken(
      {
        apiKey,
        accessToken,
        providerSpecificData,
      },
      fetchImpl
    );
    const models = mapDiscoveredToCatalog(await discoverAdobeFireflyModels(token, fetchImpl));
    return models.length > 0
      ? { models: models.map(toModelResponse), source: "api" }
      : fallback(
          "Adobe Firefly discovery returned no callable image or video models",
          // The upstream answered but offered no usable model.
          { code: "EMPTY_CATALOG" }
        );
  } catch (error) {
    return fallback(
      `Adobe Firefly discovery unavailable: ${sanitizeErrorMessage(
        error instanceof Error ? error.message : String(error)
      )}`,
      // The discovery threw; its reason is not readable.
      {}
    );
  }
}
