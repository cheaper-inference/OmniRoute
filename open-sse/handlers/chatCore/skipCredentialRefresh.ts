import { readResponseTextWithinCap } from "../../utils/responseBodyCap.ts";
import { isNoAuthProviderKey } from "@/shared/utils/noAuthProviders";
import { isOpencodeFreeTierRefusalForProvider } from "../../executors/opencodeGeoBlock.ts";
import { isMusePolicyRefusal } from "../../services/musePolicyRefusal.ts";
import { getM365FailureScope } from "../../services/m365ErrorPolicy.ts";
import { isProviderSafetyRefusalBody } from "../../utils/providerSafety.ts";

/**
 * True when a 401/403 from `provider` cannot be cured by refreshing credentials.
 *
 * - A no-auth provider holds nothing to refresh: each attempt fails after its
 *   retries, and repeated failures open the provider-wide refresh breaker.
 * - A refusal scoped to the request (same verdict from every account) says nothing
 *   about the token, so a refresh only adds latency before the same answer.
 * - An explicit provider safety stop refuses the request's content; refreshing would
 *   re-send the refused conversation with a new token.
 *
 * The body is read from a clone so the caller can still consume the response.
 */
export async function shouldSkipCredentialRefresh(
  provider: string | null | undefined,
  response: Response
): Promise<boolean> {
  if (isNoAuthProviderKey(provider)) return true;
  if (!provider) return false;
  const bodyText = await readResponseTextWithinCap(response.clone()).catch(() => null); // an unreadable or over-cap body cannot carry a safety code; keep the refresh
  if (bodyText !== null && isProviderSafetyRefusalBody(response.status, bodyText)) return true;
  if (provider.toLowerCase() === "muse-code" && isMusePolicyRefusal(response.status, bodyText))
    return true;
  // Neither model nor account licence entitlements change by rotating the token.
  if (response.status === 403 && getM365FailureScope(provider, response.status, bodyText) !== null)
    return true;
  if (!provider.toLowerCase().startsWith("opencode")) return false;
  return isOpencodeFreeTierRefusalForProvider(provider, response.status, bodyText);
}
