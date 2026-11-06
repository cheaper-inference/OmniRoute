export type ModelMetadataRow = {
  id: string;
  [key: string]: unknown;
};

/**
 * Overlay fields explicitly stored on a custom model without erasing richer
 * discovered metadata fields the custom row does not define.
 *
 * When a custom row's endpoint capability provenance is "defaulted" (synthetically
 * assigned ["chat"] during import or fallback) and the underlying discovered model
 * has trusted declared or inferred endpoints, the discovered endpoints and their
 * provenance take precedence over the defaulted placeholder (#16929 / #18510).
 */
export function mergeCustomModelMetadata<T extends Record<string, unknown>>(
  base: T,
  custom: Record<string, unknown>
): T {
  const definedCustom = Object.fromEntries(
    Object.entries(custom).filter(([, value]) => value !== undefined)
  );

  const baseSource = base.endpointCapabilitySource;
  const customSource = definedCustom.endpointCapabilitySource;
  const isBaseTrusted = baseSource === "declared" || baseSource === "inferred";
  const isCustomDefaulted = customSource === "defaulted" || customSource === undefined;

  if (isBaseTrusted && isCustomDefaulted && base.supportedEndpoints !== undefined) {
    delete definedCustom.supportedEndpoints;
    delete definedCustom.endpointCapabilitySource;
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
