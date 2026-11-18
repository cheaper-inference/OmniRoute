/**
 * chatCore compression-combo config merge (chatCore god-file decomposition, slice 2).
 *
 * Extracted byte-identically from the `applyCompressionComboConfig` closure in handleChatCore's
 * prompt-compression pipeline: fold a runtime compression combo (its stacked pipeline, language
 * packs and output-mode settings) into the request's CompressionConfig, and pin every routing id
 * in `routingOverrideIds` to the `stacked` mode. Returns the merged config, or null when there is
 * no combo / the combo has an empty pipeline (the closure then reports "not applied"). The handler
 * keeps the `config` rebinding and the `compressionComboApplied` flag.
 */

import type { CompressionConfig } from "../../services/compression/types.ts";
import type { RuntimeCompressionCombo } from "./compressionComboPredicates.ts";

export function mergeCompressionComboIntoConfig(
  config: CompressionConfig,
  compressionCombo: RuntimeCompressionCombo | null,
  routingOverrideIds: string[]
): CompressionConfig | null {
  if (!compressionCombo || compressionCombo.pipeline.length === 0) return null;
  const comboLanguagePacks = [
    ...new Set(
      compressionCombo.languagePacks.map((pack) => pack.trim()).filter((pack) => pack.length > 0)
    ),
  ];
  const comboOutputIntensity = (
    ["lite", "full", "ultra"].includes(compressionCombo.outputModeIntensity)
      ? compressionCombo.outputModeIntensity
      : (config.cavemanOutputMode?.intensity ?? "full")
  ) as "lite" | "full" | "ultra";
  const comboDefaultLanguage =
    comboLanguagePacks.find((pack) => pack === config.languageConfig?.defaultLanguage) ??
    comboLanguagePacks[0] ??
    config.languageConfig?.defaultLanguage ??
    "en";
  const comboOverrides = { ...(config.comboOverrides ?? {}) };
  for (const id of routingOverrideIds) {
    if (id) comboOverrides[id] = "stacked";
  }
  return {
    ...config,
    compressionComboId: compressionCombo.id,
    stackedPipeline: compressionCombo.pipeline,
    languageConfig: {
      ...(config.languageConfig ?? {
        enabled: false,
        defaultLanguage: "en",
        autoDetect: true,
        enabledPacks: ["en"],
      }),
      enabled: true,
      defaultLanguage: comboDefaultLanguage,
      enabledPacks:
        comboLanguagePacks.length > 0
          ? comboLanguagePacks
          : (config.languageConfig?.enabledPacks ?? ["en"]),
    },
    cavemanOutputMode: {
      ...(config.cavemanOutputMode ?? {
        enabled: false,
        intensity: "full",
        autoClarity: true,
      }),
      enabled: compressionCombo.outputMode,
      intensity: comboOutputIntensity,
    },
    // A combo's own selection wins over the global panel; empty keeps the panel's.
    ...(compressionCombo.outputStyles && compressionCombo.outputStyles.length > 0
      ? { outputStyles: compressionCombo.outputStyles }
      : {}),
    comboOverrides,
  };
}
