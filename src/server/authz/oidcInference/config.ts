/**
 * Generic OIDC inference-auth configuration for the client API (/v1/*).
 *
 * Third sibling of the auth family, on purpose separate from both:
 *  - the dashboard's `oidc*` settings: those gate the browser admin login with
 *    an `id_token` audienced to the client_id;
 *  - Entra SSO (`entraSso*`): that verifies Microsoft-shaped tokens (tenant,
 *    `tid`/`oid`, Graph groups).
 *
 * This block trusts any standards-compliant OIDC issuer (Keycloak first) whose
 * access token carries a configured audience and realm/client roles, e.g.
 * Claude Desktop BYOD signing users into Keycloak and sending the access
 * token as a Bearer to the gateway. Roles map to OmniRoute key groups, so
 * model allowlists, budgets and attribution come from the existing policy
 * engine unchanged — same design as Entra shadow keys.
 */

import { getCachedSettings } from "@/lib/db/readCache";

export interface OidcInferenceRoleMapping {
  /** Role name as it appears in the token's role claim (realm or client role). */
  role: string;
  /** OmniRoute key_groups.id applied when the user holds the role. */
  keyGroupId: string;
}

export interface OidcInferenceConfig {
  enabled: boolean;
  /** OIDC issuer URL, e.g. https://auth.example.com/realms/main. */
  issuer: string;
  /** Expected `aud` value of accepted access tokens. */
  audience: string;
  /** Realm/client role → key group mapping. Empty = deny everyone. */
  roleMappings: OidcInferenceRoleMapping[];
  /** Key group for users holding no mapped role. Empty/absent = deny. */
  defaultKeyGroupId: string | null;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseRoleMappings(value: unknown): OidcInferenceRoleMapping[] {
  if (!Array.isArray(value)) return [];
  const mappings: OidcInferenceRoleMapping[] = [];
  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as Record<string, unknown>;
    const role = str(record.role);
    const keyGroupId = str(record.keyGroupId);
    if (role && keyGroupId) mappings.push({ role, keyGroupId });
  }
  return mappings;
}

export function parseOidcInferenceSettings(
  settings: Record<string, unknown> | null | undefined
): OidcInferenceConfig {
  const source = settings ?? {};
  const defaultKeyGroupIdRaw = str(source.oidcInferenceDefaultKeyGroupId);
  return {
    enabled: source.oidcInferenceEnabled === true,
    issuer: str(source.oidcInferenceIssuer),
    audience: str(source.oidcInferenceAudience),
    roleMappings: parseRoleMappings(source.oidcInferenceRoleMappings),
    defaultKeyGroupId: defaultKeyGroupIdRaw.length > 0 ? defaultKeyGroupIdRaw : null,
  };
}

export async function getOidcInferenceConfig(): Promise<OidcInferenceConfig> {
  let settings: Record<string, unknown> | null = null;
  try {
    settings = (await getCachedSettings()) as Record<string, unknown>;
  } catch {
    settings = null;
  }
  return parseOidcInferenceSettings(settings);
}

export async function isOidcInferenceEnabled(): Promise<boolean> {
  const config = await getOidcInferenceConfig();
  return config.enabled && config.issuer.length > 0 && config.audience.length > 0;
}

/**
 * Resolve the issuer's OIDC discovery document. Cached per issuer with a TTL
 * long enough that a Keycloak restart doesn't stampede but short enough that
 * a rotated keys/endpoint change propagates quickly.
 */
interface DiscoveryCacheEntry {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  jwksUri: string;
  expiresAt: number;
}

const DISCOVERY_CACHE_TTL_MS = 5 * 60 * 1000;
const DISCOVERY_TIMEOUT_MS = 10_000;

const discoveryCache = new Map<string, DiscoveryCacheEntry>();

export function resetOidcDiscoveryCache(): void {
  discoveryCache.clear();
}

export interface OidcDiscovery {
  jwksUri: string;
}

export async function discoverOidcEndpoints(issuer: string): Promise<OidcDiscovery | null> {
  const cached = discoveryCache.get(issuer);
  if (cached && cached.expiresAt > Date.now()) {
    return { jwksUri: cached.jwksUri };
  }

  const url = `${issuer.replace(/\/+$/, "")}/.well-known/openid-configuration`;
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(DISCOVERY_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as Record<string, unknown>;
    const jwksUri = str(data.jwks_uri);
    if (!jwksUri.startsWith("https://")) return null;
    discoveryCache.set(issuer, {
      authorizationEndpoint: str(data.authorization_endpoint),
      tokenEndpoint: str(data.token_endpoint),
      jwksUri,
      expiresAt: Date.now() + DISCOVERY_CACHE_TTL_MS,
    });
    return { jwksUri };
  } catch {
    return null;
  }
}
