import type { FeatureFlagDefinition } from "./featureFlagTypes";

/** Kept in its own module so the definitions registry stays under the file-size cap. */
export const STREAM_LENGTH_CONTINUATION_ENABLED_FLAG: FeatureFlagDefinition = {
  key: "STREAM_LENGTH_CONTINUATION_ENABLED",
  label: "Stream: Continue After a Genuine Length Finish",
  description:
    "When a single-choice Chat Completions stream that already delivered text ends with an upstream finish_reason of length, hold that terminal and make ONE extra request to the same provider connection, prefilled with the delivered text, so the answer can continue. The extra request is bounded: at most 2048 extra output tokens, 30 seconds and 64 KiB of held frames. The client still receives a single terminal and a single [DONE], and the usage it receives adds up both executions (the extra one costs a full prompt again). A limit the client set itself (max_tokens, max_completion_tokens, max_output_tokens) is never extended: when it was consumed, or its remainder is unknown, there is no extra request. Turns with tool calls, refusals, several choices, audio or a linked session are never continued. If the extension fails, stalls, or does not echo the end of the delivered text, the original length terminal is delivered unchanged. Off by default: with the flag off the stream frames are byte-for-byte unchanged and no extra request is made.",
  descriptionI18nKey: "featureFlagStreamLengthContinuationEnabledDescription",
  category: "runtime",
  defaultValue: "false",
  type: "boolean",
  requiresRestart: false,
  warningLevel: "caution",
};
