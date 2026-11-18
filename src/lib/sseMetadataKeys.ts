// Metadata keys that still carry values worth masking: the usage provenance body and the cost
// figures can hold a credential-shaped string, and skipping them outright emitted it verbatim.
// They are redacted where they stand, never buffered.
//
// A leaf module on purpose: both sseTextTransform.ts and responsesSseText.ts read it, and
// sseTextTransform.ts already imports responsesSseText.ts, so defining it in either one would
// add an import cycle.
export const IN_PLACE_METADATA_KEYS: ReadonlySet<string> = new Set([
  "usage_evidence",
  "tokens_per_second",
  "cost_in_usd_ticks",
]);
