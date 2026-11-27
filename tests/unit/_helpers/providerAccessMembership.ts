import type { ProviderAccessMembership } from "@omniroute/open-sse/config/freeModelCatalog.counts.ts";
import {
  NOAUTH_PROVIDERS,
  OAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
} from "@/shared/constants/providers.ts";

const ids = (collection: Record<string, { id?: string }>) =>
  new Set(
    Object.entries(collection).flatMap(([key, p]) => (p?.id && p.id !== key ? [key, p.id] : [key]))
  );

const NOAUTH = ids(NOAUTH_PROVIDERS);
const OAUTH = ids(OAUTH_PROVIDERS);
const WEB_COOKIE = ids(WEB_COOKIE_PROVIDERS);

/** Which access collections the provider constants put a provider id in. */
export function membershipFromProviderConstants(providerId: string): ProviderAccessMembership {
  return {
    noAuth: NOAUTH.has(providerId),
    oauth: OAUTH.has(providerId),
    webCookie: WEB_COOKIE.has(providerId),
  };
}
