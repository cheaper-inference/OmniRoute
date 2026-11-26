import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const COMBO_REASONING_HOLDBACK_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "COMBO_REASONING_HOLDBACK_ENABLED",
  label: "Combo: Retain Reasoning Before the First Answer",
  description:
    "Let a sequential combo hold a streaming Chat Completions target's reasoning back until its first answer token arrives, instead of committing the stream the moment reasoning starts. Only combos that opt in with `retainReasoningBeforeAnswer: true` in their own config are affected; the global combo defaults never grant it. While holding, at most 64 KiB is kept and the target's remaining first-output budget still applies. If the target is cut or times out during reasoning, the combo moves to its next target. The held reasoning text is forwarded to that target, quoted as untrusted data in a leading system message, only when the target's provider is listed in the combo's `reasoningCheckpointProviders`; otherwise the next target receives the original request. Signed, encrypted or hidden reasoning is never forwarded. Single-choice requests without tools, tool history or a bound session only. Off by default: with the flag off, or without the combo opt-in, reasoning reaches the client the moment it arrives.",
  descriptionI18nKey: "featureFlagComboReasoningHoldbackEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
