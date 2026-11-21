// Pure input parsers for provider connection forms — extracted as a leaf module
// (no React/UI imports) so server-safe consumers like
// connectionProviderSpecificData.ts (and its node:test suite) can import them
// without dragging providerPageHelpers' UI import graph (@lobehub/icons ESM build
// crashes Node's CJS require in the CI unit shard — 2026-07-18).

export function parseRoutingTagsInput(value: string): string[] | undefined {
  const tags = Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
    )
  );
  return tags.length > 0 ? tags : undefined;
}

export function parseExcludedModelsInput(value: string): string[] | undefined {
  const patterns = Array.from(
    new Set(
      value
        .split(",")
        .map((pattern) => pattern.trim())
        .filter(Boolean)
    )
  );
  return patterns.length > 0 ? patterns : undefined;
}

/**
 * Excluded models for an edit save. The provider PUT route merges the incoming
 * providerSpecificData over the stored one and JSON drops `undefined`, so a cleared
 * field must be sent as an explicit `[]` or the saved list is kept (#20745). The
 * server normalizer removes the empty list.
 */
export function parseExcludedModelsForEdit(value: string): string[] {
  return parseExcludedModelsInput(value) ?? [];
}
