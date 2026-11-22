/**
 * Output ceilings measured on the live upstream, per provider/model.
 *
 * Some upstreams pick the response budget server-side (the Devin Connect
 * `GetChatMessage` request carries no output-token field) and truncate every
 * reply at an account/plan limit. When the router does not know that ceiling it
 * keeps sending long-output requests to a target that cannot finish them: the
 * reply stops mid-sentence with `finish_reason: "length"` and clients that need
 * a complete answer (context compaction, code generation) fail.
 *
 * Declaring the ceiling here makes it a first-class model capability, so
 * `pickMaxOutputTokens` reports it and the combo compatibility filter
 * (`filterTargetsByRequestCompatibility`) can keep a request that asks for more
 * output away from a target that cannot produce it.
 *
 * Only add a row after measuring the truncation on the live upstream. A guessed
 * ceiling silently removes a target from every large-output request.
 */
export interface ObservedOutputCeiling {
  /** Provider id, as stored on the connection (e.g. `devin-desktop`). */
  provider: string;
  /** Exact upstream model id without the provider prefix, or `*` for the whole provider. */
  model: string;
  /** Highest completion-token count a single reply can reach. */
  maxOutputTokens: number;
  /** Where the number comes from, so the diagnostics surface can cite it. */
  evidence: string;
}

export const OBSERVED_OUTPUT_CEILINGS: readonly ObservedOutputCeiling[] = [
  {
    provider: "devin-desktop",
    model: "swe-2-flash-medium",
    maxOutputTokens: 1024,
    evidence:
      "272 replies stopped at exactly 1024 completion tokens between 2026-11-13 and 2026-11-16 " +
      "(call_logs, 10 accounts, never above); the Connect request has no output-token field",
  },
  {
    provider: "devin-desktop",
    model: "swe-1-6-slow",
    maxOutputTokens: 1024,
    evidence:
      "2026-11-16: max_completion_tokens=3000 returned completion_tokens=1024, " +
      "finish_reason=length, 0 content characters — same plan-level ceiling as swe-2-flash-medium",
  },
];

function normalize(value: string | null | undefined): string {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

/** Drop the `provider/` prefix a combo target may carry. */
function stripProviderPrefix(provider: string, model: string): string {
  const prefix = `${provider}/`;
  return model.startsWith(prefix) ? model.slice(prefix.length) : model;
}

/** Known output ceiling for `provider`/`model`, or null when none was measured. */
export function getObservedOutputCeiling(
  provider: string | null | undefined,
  model: string | null | undefined
): number | null {
  const providerId = normalize(provider);
  if (!providerId) return null;
  let modelId = normalize(model);
  if (!modelId) return null;
  modelId = stripProviderPrefix(providerId, modelId);

  for (const row of OBSERVED_OUTPUT_CEILINGS) {
    if (normalize(row.provider) !== providerId) continue;
    const rowModel = normalize(row.model);
    if (rowModel !== "*" && rowModel !== modelId) continue;
    return row.maxOutputTokens > 0 ? row.maxOutputTokens : null;
  }
  return null;
}
