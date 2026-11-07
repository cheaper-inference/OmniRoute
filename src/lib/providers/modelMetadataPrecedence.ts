export type ModelMetadataRow = {
  id: string;
  [key: string]: unknown;
};

type EndpointMetadata = {
  supportedEndpoints?: unknown;
  endpointCapabilitySource?: unknown;
};

/** A provenance-less custom row: only its bare `["chat"]` is the historical placeholder. */
function isBareChatPlaceholder(endpoints: unknown): boolean {
  return Array.isArray(endpoints) && endpoints.length === 1 && endpoints[0] === "chat";
}

/**
 * Whether a custom row's endpoint metadata is a synthetic placeholder that must give way
 * to the discovered row. Rows stamped "defaulted" yield; unmarked rows predate provenance
 * (#16929), so an explicit list on them may be an operator's and only `["chat"]` yields.
 * The discovered side has to be real evidence: declared/inferred, or a list naming a
 * non-chat endpoint (most parsers leave a bare `supportedEndpoints` unmarked).
 */
export function customEndpointsYieldToDiscovered(
  custom: EndpointMetadata,
  discovered: EndpointMetadata
): boolean {
  const customSource = custom.endpointCapabilitySource;
  const isPlaceholder =
    customSource === "defaulted" ||
    (customSource === undefined && isBareChatPlaceholder(custom.supportedEndpoints));
  const endpoints = discovered.supportedEndpoints;
  if (!isPlaceholder || !Array.isArray(endpoints)) return false;
  const discoveredSource = discovered.endpointCapabilitySource;
  return (
    discoveredSource === "declared" ||
    discoveredSource === "inferred" ||
    endpoints.some((endpoint) => endpoint !== "chat" && endpoint !== "responses")
  );
}

/**
 * Overlay fields explicitly stored on a custom model without erasing richer
 * discovered metadata fields the custom row does not define.
 *
 * Placeholder endpoint metadata (see customEndpointsYieldToDiscovered) does not count as
 * defined: the discovered endpoints, their provenance and their apiFormat stand (#18510).
 * "chat-completions" is the storage default, so only that value yields; any other
 * apiFormat on the custom row was chosen and still wins.
 */
export function mergeCustomModelMetadata<T extends Record<string, unknown>>(
  base: T,
  custom: Record<string, unknown>
): T {
  const definedCustom = Object.fromEntries(
    Object.entries(custom).filter(([, value]) => value !== undefined)
  );

  if (customEndpointsYieldToDiscovered(definedCustom, base)) {
    delete definedCustom.supportedEndpoints;
    delete definedCustom.endpointCapabilitySource;
    if (definedCustom.apiFormat === "chat-completions") delete definedCustom.apiFormat;
  }

  return { ...base, ...definedCustom };
}

export function mergeModelsWithCustomPrecedence<T extends ModelMetadataRow>(
  baseModels: T[],
  customModels: ModelMetadataRow[]
): T[] {
  const merged = new Map(baseModels.map((model) => [model.id, model]));
  for (const custom of customModels) {
    const existing = merged.get(custom.id);
    merged.set(custom.id, existing ? mergeCustomModelMetadata(existing, custom) : (custom as T));
  }
  return Array.from(merged.values());
}
