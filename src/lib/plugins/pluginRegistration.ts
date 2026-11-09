import type { PluginManifestWithDefaults } from "./manifest";

export function pluginRegistration(
  manifest: PluginManifestWithDefaults,
  name: string,
  destDir: string,
  id: string
) {
  return {
    id,
    name,
    version: manifest.version,
    description: manifest.description,
    author: manifest.author,
    license: manifest.license,
    main: manifest.main,
    source: manifest.source,
    tags: manifest.tags,
    manifest: manifest as unknown as Record<string, unknown>,
    configSchema: manifest.configSchema as unknown as Record<string, unknown>,
    hooks: [
      manifest.hooks.onRequest && "onRequest",
      manifest.hooks.onResponse && "onResponse",
      manifest.hooks.onError && "onError",
      manifest.hooks.onInstall && "onInstall",
      manifest.hooks.onActivate && "onActivate",
      manifest.hooks.onDeactivate && "onDeactivate",
      manifest.hooks.onUninstall && "onUninstall",
      manifest.hooks.onStreamComplete && "onStreamComplete",
    ].filter(Boolean) as string[],
    permissions: manifest.requires.permissions,
    pluginDir: destDir,
    enabled: manifest.enabledByDefault,
  };
}
