/**
 * Generic OIDC access-token verification for the client API (/v1/*).
 *
 * Mirrors entra/verifyToken.ts but for standards-compliant issuers (Keycloak
 * first): signature via the issuer's JWKS, pinned issuer+audience, and roles
 * read from the access token (Keycloak puts realm roles under
 * `realm_access.roles` and client roles under `resource_access.<client>.roles`
 * — both are accepted; the dashboard OIDC admission claim path reads the ID
 * token only, so it does not overlap with this branch).
 */

import {
  createRemoteJWKSet,
  customFetch,
  decodeProtectedHeader,
  jwtVerify,
  type JWTPayload,
} from "jose";
import { type OidcInferenceConfig, discoverOidcEndpoints } from "./config";

export interface OidcInferenceIdentity {
  /** Stable per-user subject (`sub`). */
  sub: string;
  /** Human-readable label (preferred_username / email / name). */
  label: string;
  /** Roles held per the token, union of realm and client roles. */
  roles: string[];
  expiresAt: number;
}

export interface OidcInferenceVerifyFailure {
  ok: false;
  status: number;
  code: string;
  message: string;
}

export type OidcInferenceVerifyResult =
  { ok: true; identity: OidcInferenceIdentity } | OidcInferenceVerifyFailure;

const jwksClientsCache: Record<string, ReturnType<typeof createRemoteJWKSet>> = {};

class OidcJwksTransportError extends Error {}

async function fetchOidcJwks(url: string, options: RequestInit): Promise<Response> {
  try {
    const response = await fetch(url, { ...options, redirect: "error" });
    if (response.status !== 200) throw new OidcJwksTransportError("JWKS endpoint unavailable");
    return response;
  } catch (error) {
    if (error instanceof OidcJwksTransportError) throw error;
    throw new OidcJwksTransportError("JWKS transport failed", { cause: error });
  }
}

function getJwksClient(jwksUri: string) {
  let client = jwksClientsCache[jwksUri];
  if (!client) {
    client = createRemoteJWKSet(new URL(jwksUri), { [customFetch]: fetchOidcJwks });
    jwksClientsCache[jwksUri] = client;
  }
  return client;
}

/**
 * Cheap structural pre-filter, same contract as looksLikeEntraJwt: keeps
 * static API keys free. OmniRoute's own HS256 tokens are excluded by
 * requiring an asymmetric alg.
 */
export function looksLikeOidcJwt(token: string): boolean {
  if (!token || typeof token !== "string") return false;
  const segments = token.split(".");
  if (segments.length !== 3) return false;
  if (segments.some((segment) => segment.length === 0)) return false;

  try {
    const header = decodeProtectedHeader(token);
    const alg = typeof header.alg === "string" ? header.alg : "";
    return (
      (alg.startsWith("RS") || alg.startsWith("ES") || alg === "EdDSA") &&
      typeof header.kid === "string" &&
      header.kid.length > 0
    );
  } catch {
    return false;
  }
}

function claimString(payload: JWTPayload, name: string): string {
  const value = (payload as Record<string, unknown>)[name];
  return typeof value === "string" ? value : "";
}

function claimStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

/**
 * Union of realm roles (`realm_access.roles`) and every client's roles
 * (`resource_access.<client>.roles`) — how Keycloak emits authorization in
 * access tokens. An issuer that puts roles somewhere else is out of scope
 * until a mapping knob is added.
 */
export function extractOidcRoles(payload: JWTPayload): string[] {
  const roles = new Set<string>();
  const realmAccess = (payload as Record<string, unknown>).realm_access;
  if (realmAccess && typeof realmAccess === "object") {
    for (const role of claimStringArray((realmAccess as Record<string, unknown>).roles)) {
      roles.add(role);
    }
  }
  const resourceAccess = (payload as Record<string, unknown>).resource_access;
  if (resourceAccess && typeof resourceAccess === "object") {
    for (const client of Object.values(resourceAccess as Record<string, unknown>)) {
      if (!client || typeof client !== "object") continue;
      for (const role of claimStringArray((client as Record<string, unknown>).roles)) {
        roles.add(role);
      }
    }
  }
  return [...roles];
}

function errorCodeOf(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }
  return "";
}

/** Transport failures are 503 (could not verify), bad tokens are 401. */
function classifyVerifyError(error: unknown): OidcInferenceVerifyFailure {
  const code = errorCodeOf(error);

  if (
    error instanceof OidcJwksTransportError ||
    code === "ERR_JWKS_TIMEOUT" ||
    code === "ERR_JWKS_MULTIPLE_MATCHING_KEYS"
  ) {
    return {
      ok: false,
      status: 503,
      code: "AUTH_OIDC_INFERENCE_UNAVAILABLE",
      message: "Identity provider unavailable — could not verify the token",
    };
  }

  if (code === "ERR_JWT_EXPIRED") {
    return {
      ok: false,
      status: 401,
      code: "AUTH_OIDC_INFERENCE_EXPIRED",
      message: "SSO token expired — sign in again",
    };
  }

  return {
    ok: false,
    status: 401,
    code: "AUTH_OIDC_INFERENCE_INVALID",
    message: "Invalid SSO token",
  };
}

export async function verifyOidcInferenceToken(
  token: string,
  config: OidcInferenceConfig
): Promise<OidcInferenceVerifyResult> {
  const discovery = await discoverOidcEndpoints(config.issuer);
  if (!discovery) {
    return {
      ok: false,
      status: 503,
      code: "AUTH_OIDC_INFERENCE_UNAVAILABLE",
      message: "Identity provider discovery failed — could not verify the token",
    };
  }

  let payload: JWTPayload;
  try {
    const jwks = getJwksClient(discovery.jwksUri);
    ({ payload } = await jwtVerify(token, jwks, {
      issuer: config.issuer,
      audience: config.audience,
      requiredClaims: ["exp"],
      // Asymmetric only: accepting `alg: none` or HS256 with the issuer's
      // public key material is how algorithm-substitution gets in. Keycloak
      // defaults to RS256; ES* and EdDSA remain valid choices.
      algorithms: ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "EdDSA"],
      clockTolerance: 60,
    }));
  } catch (error) {
    return classifyVerifyError(error);
  }

  const sub = claimString(payload, "sub");
  if (!sub) {
    return {
      ok: false,
      status: 401,
      code: "AUTH_OIDC_INFERENCE_NO_SUBJECT",
      message: "SSO token carries no subject",
    };
  }

  return {
    ok: true,
    identity: {
      sub,
      label:
        claimString(payload, "preferred_username") ||
        claimString(payload, "email") ||
        claimString(payload, "name") ||
        sub,
      roles: extractOidcRoles(payload),
      expiresAt: typeof payload.exp === "number" ? payload.exp * 1000 : Date.now(),
    },
  };
}
