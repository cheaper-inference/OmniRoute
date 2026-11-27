import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const PLUGIN_MARKETPLACE_INTEGRITY_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "PLUGIN_MARKETPLACE_INTEGRITY_ENABLED",
  label: "Plugin Marketplace: Signed Install",
  description:
    "Install marketplace plugins only from the official signed index. The index must carry a valid Ed25519 signature from a trusted marketplace key and be inside its validity window, the download must match the SHA-256 listed in that index, and the extracted plugin.json must carry the signed name and version. A request needs an explicit version. A failure of any step refuses the install: signed mode never falls back to an unsigned install and ignores the custom registry URL. Needs the official trust key and index URL to be configured in the build; until then every install is refused with a clear error. Off by default: the existing marketplace install contract, including a custom registry, is unchanged.",
  descriptionI18nKey: "featureFlagPluginMarketplaceIntegrityEnabledDescription",
  category: "security",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
