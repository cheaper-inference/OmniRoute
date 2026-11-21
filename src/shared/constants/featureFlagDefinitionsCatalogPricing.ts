import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** #18641 — kept in its own module so the definitions registry stays under the file-size cap. */
export const CATALOG_PRICING_FIELD_MERGE_FLAG: FeatureFlagDefinition = {
  key: "CATALOG_PRICING_FIELD_MERGE_ENABLED",
  label: "Catalog Pricing Field Merge",
  description:
    "Show /v1/models pricing the way cost tracking resolves it. Off by default: the catalog uses the first source that prices the model (models.dev, then LiteLLM, then built-in defaults) and omits user and synced reasoning rates. On: fields merge per field with defaults below LiteLLM below models.dev below user overrides, and reasoning rates are listed, so a model can show fields its top source does not price.",
  descriptionI18nKey: "featureFlagCatalogPricingFieldMergeEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "info",
};
