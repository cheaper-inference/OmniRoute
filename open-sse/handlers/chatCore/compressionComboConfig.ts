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

import type { CompressionConfig, CompressionPipelineStep } from "../../services/compression/types.ts";
import type { RuntimeCompressionCombo } from "./compressionComboPredicates.ts";
import { applyLossyRequestPolicy } from "../../services/compression/lossyRequestPolicy.ts";
import { planFromHeader } from "../../services/compression/planResolution.ts";

export function mergeCompressionComboIntoConfig(
  config: CompressionConfig,
  compressionCombo: RuntimeCompressionCombo | null,
  routingOverrideIds: string[],
  header: string | null = null,
  combos: Record<string, CompressionPipelineStep[]> = {}
): CompressionConfig | null {
  if (!compressionCombo || compressionCombo.pipeline.length === 0) return null;
  // The same lossy-request policy `defaultComboForRequest` applies to the seeded default combo
  // (#21083). A named or routing combo is an explicit operator choice, so its engines are kept
  // — but choosing engines is not an opt-in to tool-result truncation, and
  // `shouldRunResolvedPipeline` never replaces this pipeline with the resolved (already
  // sanitized) one. Left raw, a bare `{ engine: "lite" }` step reaches lite.ts with no config,
  // its `compressToolResults !== false` gate defaults to true, and every earlier tool result is
  // cut to DEFAULT_MAX_TOOL_LENGTH from turn 3 of a long session on. A request that opts in —
  // `allow-lossy`, or a header that resolves its own plan — still gets the lossy steps.
  //
  // `headerOptsIntoLossy` only honours a named combo / `engine:<id>` when the plan carries
  // `source: "request-header"`, and the plan merged here is the combo's own, so tag it exactly
  // when the header resolves a plan of its own (`planFromHeader`, the same resolver the later
  // Phase 3 runs). A null, unrecognized, `off`, `default` or `safe` header sanitizes as before,
  // so a mistyped combo name cannot silently turn truncation on.
  const headerResolvesPlan = header !== null && planFromHeader(config, header, combos) !== null;
  const { stackedPipeline } = applyLossyRequestPolicy(
    headerResolvesPlan
      ? { mode: "stacked", stackedPipeline: compressionCombo.pipeline, source: "request-header" }
      : { mode: "stacked", stackedPipeline: compressionCombo.pipeline },
    header
  );
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
    stackedPipeline: stackedPipeline as CompressionConfig["stackedPipeline"],
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
