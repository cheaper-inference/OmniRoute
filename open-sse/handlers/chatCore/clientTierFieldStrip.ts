/**
 * Opt-in per-connection guard (`providerSpecificData.blockClientTierFields: true`, default off).
 * A client can ask for a premium service tier or send a caller identity the operator never
 * approved. With the flag on, those client fields are removed from the upstream body, so they
 * reach the provider zero times. Operator-set values (payload rules, per-key tier, connection
 * defaults) are applied after this step and are not affected.
 */

const CLIENT_TIER_FIELDS = [
  "service_tier",
  "safety_identifier",
  "inference_geo",
  "speed",
  "include_obfuscation",
] as const;

export function stripClientTierFields(
  body: Record<string, unknown>,
  providerSpecificData: Record<string, unknown> | null | undefined
): Record<string, unknown> {
  if (providerSpecificData?.blockClientTierFields !== true) return body;
  for (const field of CLIENT_TIER_FIELDS) delete body[field];
  return body;
}
