/**
 * Provider endpoint adapter evidence (#16929).
 *
 * A model can advertise an endpoint without OmniRoute having a handler for it.
 * Static registrations are positive evidence. Unknown dynamic/gateway providers
 * remain "unknown", not falsely labeled supported or rejected.
 */
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry";
import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry";
import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry";
import { getImageProvider } from "@omniroute/open-sse/config/imageRegistry";
import { getVideoProvider } from "@omniroute/open-sse/config/videoRegistry";
import { getMusicProvider } from "@omniroute/open-sse/config/musicRegistry";
import {
  getSpeechProvider,
  getTranscriptionProvider,
} from "@omniroute/open-sse/config/audioRegistry";
import {
  isTrustedEndpointCapabilitySource,
  normalizeModelSupportedEndpoints,
} from "@/shared/constants/modelSupportedEndpoints";

export type EndpointAdapterStatus = "available" | "unavailable" | "unknown";
export type EndpointAdapterStatuses = Record<string, EndpointAdapterStatus>;

/**
 * A model-scoped adapter (see `AudioProvider.modelScoped`) only counts as present
 * for the models it lists; without a model id it is not a provider-wide adapter.
 */
function hasTranscriptionAdapter(provider: string, modelId?: string): boolean {
  const config = getTranscriptionProvider(provider);
  if (!config) return false;
  if (!config.modelScoped) return true;
  return Boolean(modelId) && config.models.some((model) => model.id === modelId);
}

export function getRegisteredEndpointAdapterStatuses(
  provider: string,
  modelId?: string
): EndpointAdapterStatuses {
  const hasChatRegistry = Boolean(getRegistryEntry(provider));
  const status = (present: boolean, knownAbsent = false): EndpointAdapterStatus =>
    present ? "available" : knownAbsent ? "unavailable" : "unknown";
  const audioMissing = hasChatRegistry;
  return {
    chat: status(hasChatRegistry),
    responses: status(hasChatRegistry),
    embeddings: status(Boolean(getEmbeddingProvider(provider))),
    rerank: status(Boolean(getRerankProvider(provider))),
    images: status(Boolean(getImageProvider(provider))),
    "images-generations": status(Boolean(getImageProvider(provider))),
    videos: status(Boolean(getVideoProvider(provider))),
    music: status(Boolean(getMusicProvider(provider)), hasChatRegistry),
    "audio-speech": status(Boolean(getSpeechProvider(provider)), audioMissing),
    "audio-transcriptions": status(hasTranscriptionAdapter(provider, modelId), audioMissing),
  };
}

/**
 * True when a model's trusted endpoint tags all point at endpoints this provider
 * has no adapter for. Missing/defaulted provenance and "unknown" adapters never
 * count as unrunnable.
 */
export function hasNoRunnableEndpointAdapter(
  provider: string,
  model:
    | { id?: string; supportedEndpoints?: readonly string[]; endpointCapabilitySource?: unknown }
    | null
    | undefined
): boolean {
  if (!model?.supportedEndpoints?.length) return false;
  if (!isTrustedEndpointCapabilitySource(model.endpointCapabilitySource)) return false;
  const endpoints = normalizeModelSupportedEndpoints(model.supportedEndpoints);
  if (endpoints.length === 0) return false;
  const adapters = getRegisteredEndpointAdapterStatuses(provider, model.id);
  return endpoints.every((endpoint) => adapters[endpoint] === "unavailable");
}
