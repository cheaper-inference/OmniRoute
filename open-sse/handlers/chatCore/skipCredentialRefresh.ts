import { isNoAuthProviderKey } from "@/shared/utils/noAuthProviders";
import { isOpencodeFreeTierRefusalForProvider } from "../../executors/opencodeGeoBlock.ts";
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
  const bodyText = await response
    .clone()
    .text()
    .catch(() => null); // an unreadable body cannot carry a safety code; keep the refresh
  if (bodyText !== null && isProviderSafetyRefusalBody(response.status, bodyText)) return true;
  if (!provider.toLowerCase().startsWith("opencode")) return false;
  return isOpencodeFreeTierRefusalForProvider(provider, response.status, bodyText);
}
