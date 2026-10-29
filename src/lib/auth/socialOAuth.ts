import { SOCIAL_LOGIN_SESSION_ENDING_SETTINGS_KEYS } from "@/shared/constants/securityImpactingSettings";
import {
  PUBLIC_EMAIL_DOMAINS,
  domainOfAllowlistEntry,
} from "@/shared/constants/publicEmailDomains";
import { timingSafeCompare } from "@/shared/utils/timingSafeCompare";

export interface GoogleOAuthConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  redirectPath: string;
}

export interface GitHubOAuthConfig {
  enabled: boolean;
  clientId: string;
  clientSecret: string;
  redirectPath: string;
}

/**
 * Derives the absolute origin for the incoming request. Mirrors the OIDC routes: the scheme may
 * come from `X-Forwarded-Proto`, but the host is only ever the `Host` header — trusting
 * `X-Forwarded-Host` would let a caller steer `redirect_uri` and the post-login redirect.
 */
export function getRequestOrigin(request: Request): string {
  const forwardedProto = (request.headers.get("x-forwarded-proto") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const reqUrl = new URL(request.url);
  const scheme = forwardedProto === "https" || reqUrl.protocol === "https:" ? "https" : "http";
  const host = request.headers.get("host") || request.headers.get("Host") || reqUrl.host;
  return `${scheme}://${host}`;
}

/**
 * Checks whether the request requires secure cookies.
 */
export function isRequestSecure(request: Request): boolean {
  if (process.env.AUTH_COOKIE_SECURE === "true") return true;
  const forwardedProto = (request.headers.get("x-forwarded-proto") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const reqUrl = new URL(request.url);
  return forwardedProto === "https" || reqUrl.protocol === "https:";
}

/**
 * Accepts only a same-origin absolute path ("/x", never "//x" or "x@evil") for the OAuth
 * `redirect_uri` suffix, falling back to the default — the value comes from settings and is
 * concatenated onto the request origin.
 */
function resolveRedirectPath(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return /^\/(?!\/)[A-Za-z0-9/_.~-]*$/.test(trimmed) ? trimmed : fallback;
}

/**
 * Resolves the effective allowlist entries: the settings value (array or comma-separated string),
 * falling back to `AUTH_ALLOWED_EMAILS`. Blank entries and a bare `*` are dropped — there is no
 * "allow everyone" spelling, because that would hand an admin session to any Google/GitHub account.
 */
export function resolveAuthAllowlist(allowedConfig?: unknown): string[] {
  let candidates: string[] = [];
  if (Array.isArray(allowedConfig)) {
    candidates = allowedConfig.filter((item): item is string => typeof item === "string");
  } else if (typeof allowedConfig === "string" && allowedConfig.trim().length > 0) {
    candidates = allowedConfig.split(",");
  }
  candidates = candidates.map((item) => item.trim()).filter((item) => item.length > 0);

  if (candidates.length === 0 && process.env.AUTH_ALLOWED_EMAILS) {
    candidates = process.env.AUTH_ALLOWED_EMAILS.split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  return candidates.filter((item) => item !== "*");
}

/**
 * A provider is on only with credentials AND a non-empty allowlist, and `<provider>AuthEnabled:
 * false` is a kill-switch that turns it off even then (the default is `true`, so an env-only setup
 * works; switching it off is an explicit operator action).
 */
function isProviderEnabled(
  toggle: unknown,
  clientId: string,
  clientSecret: string,
  allowedConfig: unknown
): boolean {
  if (toggle === false) return false;
  return Boolean(clientId && clientSecret) && resolveAuthAllowlist(allowedConfig).length > 0;
}

/**
 * Resolves Google OAuth 2.0 configuration from settings with environment variable fallbacks.
 * Only the dedicated `AUTH_GOOGLE_*` variables are read (the generic `GOOGLE_CLIENT_ID` is commonly
 * present for unrelated reasons). The provider stays disabled until an allowlist is configured.
 */
export function getGoogleOAuthConfig(settings: Record<string, unknown>): GoogleOAuthConfig {
  const clientId =
    (typeof settings.googleClientId === "string" && settings.googleClientId.trim()) ||
    process.env.AUTH_GOOGLE_CLIENT_ID?.trim() ||
    "";
  const clientSecret =
    (typeof settings.googleClientSecret === "string" && settings.googleClientSecret.trim()) ||
    process.env.AUTH_GOOGLE_CLIENT_SECRET?.trim() ||
    "";
  const redirectPath = resolveRedirectPath(
    settings.googleRedirectPath,
    "/api/auth/google/callback"
  );
  const enabled = isProviderEnabled(
    settings.googleAuthEnabled,
    clientId,
    clientSecret,
    settings.authAllowedEmails
  );

  return { enabled, clientId, clientSecret, redirectPath };
}

/**
 * Resolves GitHub OAuth configuration from settings with environment variable fallbacks.
 * Only the dedicated `AUTH_GITHUB_*` variables are read; disabled until an allowlist is configured.
 */
export function getGitHubOAuthConfig(settings: Record<string, unknown>): GitHubOAuthConfig {
  const clientId =
    (typeof settings.githubClientId === "string" && settings.githubClientId.trim()) ||
    process.env.AUTH_GITHUB_CLIENT_ID?.trim() ||
    "";
  const clientSecret =
    (typeof settings.githubClientSecret === "string" && settings.githubClientSecret.trim()) ||
    process.env.AUTH_GITHUB_CLIENT_SECRET?.trim() ||
    "";
  const redirectPath = resolveRedirectPath(
    settings.githubRedirectPath,
    "/api/auth/github/callback"
  );
  const enabled = isProviderEnabled(
    settings.githubAuthEnabled,
    clientId,
    clientSecret,
    settings.authAllowedEmails
  );

  return { enabled, clientId, clientSecret, redirectPath };
}

/**
 * What the provider proves about the account's domain. A verified e-mail alone does not prove a
 * CURRENT tie to its domain (a consumer Google account created with `x@corp.com`, or a GitHub
 * account that once verified a corporate address, keep it after the person leaves), so domain
 * entries need this extra proof:
 *   - Google: the Workspace `hd` claim;
 *   - GitHub: the address is the account's PRIMARY verified e-mail.
 */
export interface EmailDomainProof {
  /** Lower-cased domain the provider vouches for, or null/undefined when there is none. */
  verifiedDomain?: string | null;
}

/**
 * Validates whether an email address is authorized against the allowlist. Deny-by-default: an
 * empty allowlist (or a bare "*") admits nobody. Exact e-mail entries match a verified e-mail;
 * domain entries ("*@example.com" / "@example.com") also need `proof.verifiedDomain` to equal that
 * domain, and entries for public mail providers never match.
 */
export function isEmailAllowed(
  email: string | null | undefined,
  allowedConfig?: unknown,
  proof: EmailDomainProof = {}
): boolean {
  if (!email || typeof email !== "string") return false;
  const normalizedEmail = email.trim().toLowerCase();
  const provenDomain = proof.verifiedDomain ? proof.verifiedDomain.trim().toLowerCase() : null;

  return resolveAuthAllowlist(allowedConfig).some((allowed) => {
    const normAllowed = allowed.toLowerCase();
    if (normAllowed === normalizedEmail) return true;
    const domain = domainOfAllowlistEntry(normAllowed);
    if (!domain || PUBLIC_EMAIL_DOMAINS.has(domain)) return false;
    return normalizedEmail.endsWith(`@${domain}`) && provenDomain === domain;
  });
}

/** Prefix of an allowlist entry that names a GitHub account by its stable numeric id. */
const GITHUB_ID_ENTRY_PREFIX = "github:";

/**
 * Validates a GitHub account against the allowlist:
 *   - `github:<id>` entries match the account's stable numeric id (preferred);
 *   - bare username entries (no "@", "*" or ":") match the login. A GitHub username can be renamed
 *     and later re-registered by someone else, so these are discouraged — use `github:<id>`.
 * Neither ever satisfies an e-mail or domain entry (and vice versa).
 */
export function isGithubAccountAllowed(
  account: { login?: string | null; id?: number | string | null },
  allowedConfig?: unknown
): boolean {
  const normalizedLogin =
    typeof account.login === "string" ? account.login.trim().toLowerCase() : "";
  const id =
    typeof account.id === "number" || typeof account.id === "string"
      ? String(account.id).trim()
      : "";

  return resolveAuthAllowlist(allowedConfig).some((allowed) => {
    const normAllowed = allowed.toLowerCase();
    if (normAllowed.startsWith(GITHUB_ID_ENTRY_PREFIX)) {
      return /^\d+$/.test(id) && normAllowed.slice(GITHUB_ID_ENTRY_PREFIX.length) === id;
    }
    if (/[@*:]/.test(normAllowed)) return false;
    return normalizedLogin.length > 0 && normAllowed === normalizedLogin;
  });
}

/**
 * True when a settings patch changes who may sign in with Google/GitHub (allowlist, a client
 * id/secret, a provider toggle). The settings route then ends every older dashboard session.
 */
export function hasSocialLoginAccessChange(
  patch: Record<string, unknown>,
  current: Record<string, unknown>
): boolean {
  return SOCIAL_LOGIN_SESSION_ENDING_SETTINGS_KEYS.some(
    (key) => key in patch && JSON.stringify(patch[key]) !== JSON.stringify(current[key])
  );
}

/**
 * Generates the opaque OAuth `state` value bound to the browser through a short-lived cookie.
 */
export function generateOAuthState(): string {
  return crypto.randomUUID();
}

export { timingSafeCompare };
