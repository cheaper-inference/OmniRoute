import {
  classifyModelSupportedEndpoints,
  defaultEndpointsForProviderNodeApiType,
} from "@/shared/constants/modelSupportedEndpoints";
import { customEndpointsYieldToDiscovered } from "@/lib/providers/modelMetadataPrecedence";

// Provider-node modality helpers for the unified model catalog: a node typed
// `embeddings`/`rerank` (or an audio/image type) serves exactly that modality, so its
// model rows must not fall back to the historical `["chat"]` default when they carry no
// endpoint metadata of their own. Kept out of ./catalog.ts to hold its size.

/** Node id → `apiType` for every node that declares one. */
export function indexNodeApiTypes(
  nodes: ReadonlyArray<{ id: string; apiType?: unknown }>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const node of nodes) {
    if (typeof node.apiType === "string" && node.apiType) out[node.id] = node.apiType;
  }
  return out;
}

/**
 * Endpoints for a provider-node model row: its own `supportedEndpoints` when present,
 * otherwise the default modality of the node it belongs to.
 */
export function nodeModelEndpoints(
  supportedEndpoints: unknown,
  nodeApiType: string | undefined
): string[] {
  // A synced row's list is passed through as-is (the same trust the catalog already
  // extends to it), so the classifier sees the row's own endpoints, not a narrowed copy.
  return Array.isArray(supportedEndpoints)
    ? (supportedEndpoints as string[])
    : defaultEndpointsForProviderNodeApiType(nodeApiType);
}

/**
 * `supported_endpoints` plus `type`/`subtype` for a custom-model overlay that carries an
 * explicit endpoint list: the list also decides the row's classification (a manual
 * `supportedEndpoints: ["rerank"]` row must not stay typed as chat). Empty when the
 * overlay declares no endpoints, so the synced row's fields stand.
 */
export function overlayEndpoints(endpoints: unknown[] | undefined): {
  supported_endpoints?: unknown[];
  type?: string;
  subtype?: string;
} {
  if (!endpoints) return {};
  const classification = classifyModelSupportedEndpoints(endpoints as string[]);
  return {
    supported_endpoints: endpoints,
    ...(classification.type ? { type: classification.type } : {}),
    ...(classification.subtype ? { subtype: classification.subtype } : {}),
  };
}

/**
 * The endpoint list and apiFormat a custom row overlays on the catalog row of the same
 * model. A placeholder row must not mask what discovery found (#18510), so it contributes
 * no endpoints and not its default apiFormat; `overlayEndpoints` then leaves `type` alone.
 * Catalog rows do not carry provenance, so the emitted list is the discovered evidence.
 */
export function customOverlayEndpointFields(
  custom: { supportedEndpoints?: unknown; endpointCapabilitySource?: unknown; apiFormat?: unknown },
  existing: Record<string, unknown>
): { endpoints?: unknown[]; apiFormat?: string } {
  const yieldsToDiscovered = customEndpointsYieldToDiscovered(custom, {
    supportedEndpoints: existing.supported_endpoints,
  });
  const apiFormat = typeof custom.apiFormat === "string" ? custom.apiFormat : undefined;
  return {
    endpoints:
      !yieldsToDiscovered && Array.isArray(custom.supportedEndpoints)
        ? custom.supportedEndpoints
        : undefined,
    apiFormat: yieldsToDiscovered && apiFormat === "chat-completions" ? undefined : apiFormat,
  };
}
