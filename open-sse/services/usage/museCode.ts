/** usage/museCode.ts — Muse Code (Meta) usage fetcher.

Meta does not expose a user-facing usage/balance API for Muse Code. The
inference key mint (`api.meta.ai/muse-code/key`) returns subscription metadata
(`subsTierName`, `subsTierId`, `isSubsActive`, `hasPaymentMethod`) but no
remaining-quota or balance endpoint. OmniRoute therefore cannot fetch a live
token/USD balance for Muse Code.

This fetcher:
- Returns an empty/unknown quota (no used/total figures) — the planRegistry
  already records `muse-code` with `limit: Number.EPSILON`, so the wizard
  treats it as "unknown, set manually".
- Surfaces the subscription tier captured at auth time (`subsTierName`,
  `subsTierId`, `isSubsActive`, `hasPaymentMethod`) from `providerSpecificData`
  so the quota page can show *something* meaningful.

No network call is made: the persisted subscription metadata from
`providerSpecificData` is all OmniRoute has. This is intentional — do not
invent a fetch to `api.meta.ai` unless Meta publishes a usage endpoint.
*/

import { toRecord } from "./scalars.ts";

/** Muse Code usage fetcher.
 *
 * Meta's Muse Code API has no public usage/balance endpoint. The only
 * subscription data OmniRoute holds is what was returned at key-mint time and
 * persisted in `providerSpecificData` (subsTierName, subsTierId,
 * isSubsActive, hasPaymentMethod). Return that as a flat "unknown usage"
 * response so the quota page shows tier info without fabricating numbers.
 */
export async function getMuseUsage(
  _accessToken?: string,
  providerSpecificData: Record<string, unknown> = {},
  _connectionId?: string
): Promise<JsonRecord> {
  const psd = toRecord(providerSpecificData);

  const tierName = typeof psd.subsTierName === "string" ? psd.subsTierName : undefined;
  const tierId = typeof psd.subsTierId === "string" ? psd.subsTierId : undefined;
  const isActive = typeof psd.isSubsActive === "boolean" ? psd.isSubsActive : undefined;
  const hasPayment = typeof psd.hasPaymentMethod === "boolean" ? psd.hasPaymentMethod : undefined;

  const activity = isActive === undefined ? "activity unknown" : isActive ? "active" : "inactive";

  // No usage endpoint exists for Muse Code. Return only subscription metadata;
  // omitting quota values distinguishes unreported usage from exhaustion.
  return {
    provider: "muse-code",
    plan: tierName ?? "unknown",
    subsTierId: tierId ?? undefined,
    isSubsActive: isActive ?? undefined,
    hasPaymentMethod: hasPayment ?? undefined,
    resetAt: null,
    unlimited: false,
    details: [],
    message: tierName
      ? `Muse Code subscription: ${tierName} (${activity}). No usage API available from Meta — quota is manual.`
      : "Muse Code subscription detected. No usage API available from Meta — quota is manual.",
  };
}

type JsonRecord = Record<string, unknown>;
