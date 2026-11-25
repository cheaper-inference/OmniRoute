import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const PLUGIN_PERMISSION_MODEL_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "PLUGIN_PERMISSION_MODEL_ENABLED",
  label: "Plugin Permission Model",
  description:
    "Run each plugin process under the Node.js permission model, derived from the permissions its manifest declares: file reads limited to the plugin directory (plus its data directory with file-read or file-write), file writes only in the plugin data directory with file-write, child processes only with exec, and no worker threads, native addons or WASI. Network access is not restricted. Applies to plugins activated after the change. Off by default: plugins run with the full privileges of the OmniRoute user, as before.",
  descriptionI18nKey: "featureFlagPluginPermissionModelEnabledDescription",
  category: "security",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
