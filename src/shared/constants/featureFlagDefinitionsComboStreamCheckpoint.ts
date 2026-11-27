import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const COMBO_STREAM_CHECKPOINT_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "COMBO_STREAM_CHECKPOINT_ENABLED",
  label: "Combo: Resume a Cut Stream at the Next Target",
  description:
    "Let a sequential combo resume a streaming Chat Completions answer at its next target when the stream is cut after output has already reached the client, instead of ending the stream with the failure. Only combos that opt in with `resumeStreamFromCheckpoint: true` in their own config are affected, and only the providers listed in the combo's `reasoningCheckpointProviders` can take over; the global combo defaults never grant either. The text and plain reasoning already delivered (at most 64 KiB) are quoted to the replacement as untrusted data together with an exact anchor it must echo; the client receives only what follows the anchor, in the same stream identity, and the replacement is read whole (at most 64 KiB, 30 s) and checked before any of it is sent. If there is no listed target, the echo does not match, the replacement fails or the checkpoint is incomplete, the client keeps what it already received and gets the original failure. Single-choice requests without tools, tool history or a bound session only. While it applies to a request, the same-target continuation after a cut yields to it. Off by default: with the flag off, or without the combo opt-in, a cut ends the stream as before.",
  descriptionI18nKey: "featureFlagComboStreamCheckpointEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
