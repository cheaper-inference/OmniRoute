import { NextResponse } from "next/server";
import { z } from "zod";
import { getCachedSettings } from "@/lib/db/readCache";
import { cookies } from "next/headers";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getGitHubOAuthConfig,
  getRequestOrigin,
  isEmailAllowed,
  isGithubAccountAllowed,
  isRequestSecure,
} from "@/lib/auth/socialOAuth";
import {
  consumeOAuthFlow,
  getJsonWithBearer,
  parseOAuthCallbackQuery,
  postForAccessToken,
  startDashboardSession,
  type SocialCookieStore,
  type StepResult,
} from "@/lib/auth/socialLogin";

export const githubCallbackInternals = {
  getCookieStore: cookies as unknown as () => Promise<SocialCookieStore>,
};

const GITHUB_API_HEADERS = { "User-Agent": "OmniRoute-OAuth" };

const githubEmailsSchema = z.array(
  z.object({
    email: z.string().trim().toLowerCase().min(1),
    primary: z.boolean().optional(),
    verified: z.boolean().optional(),
  })
);

const githubAccountSchema = z.object({
  login: z.string().toLowerCase().optional(),
  id: z.number().int().optional(),
});

async function exchangeCodeForAccessToken(
  config: ReturnType<typeof getGitHubOAuthConfig>,
  code: string,
  redirectUri: string,
  codeVerifier: string
): Promise<StepResult<string>> {
  return postForAccessToken(
    "https://github.com/login/oauth/access_token",
    {
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    },
    { request: "token_exchange", response: "token_response" }
  );
}

/** The account's verified e-mail and whether it is the account's primary address. */
interface GithubVerifiedEmail {
  email: string;
  primary: boolean;
}

/**
 * Resolves the account's verified e-mail from `/user/emails` (primary first, then any verified).
 * The public profile e-mail carries no `verified` flag and is deliberately NOT a fallback: when
 * this call fails or yields nothing verified, the login fails closed.
 */
async function fetchVerifiedEmail(accessToken: string): Promise<GithubVerifiedEmail | null> {
  const raw = await getJsonWithBearer(
    "https://api.github.com/user/emails",
    accessToken,
    GITHUB_API_HEADERS
  );
  const entries = githubEmailsSchema.safeParse(raw);
  if (!entries.success) return null;
  const match =
    entries.data.find((entry) => entry.primary && entry.verified) ??
    entries.data.find((entry) => entry.verified);
  return match ? { email: match.email, primary: match.primary === true } : null;
}

/** The account's login and stable numeric id (the id survives renames; the login does not). */
async function fetchAccount(accessToken: string): Promise<{ login: string; id: number | null }> {
  const account = githubAccountSchema.safeParse(
    await getJsonWithBearer("https://api.github.com/user", accessToken, GITHUB_API_HEADERS)
  );
  if (!account.success) return { login: "", id: null };
  return { login: account.data.login ?? "", id: account.data.id ?? null };
}

/**
 * Allowlist decision for a GitHub account. A domain entry is honoured only against the PRIMARY
 * verified e-mail — GitHub keeps a secondary address verified long after its owner left the
 * domain — while `github:<id>` and username entries match the account itself.
 */
function isGithubSignInAllowed(
  verified: GithubVerifiedEmail,
  account: { login: string; id: number | null },
  allowedConfig: unknown
): boolean {
  const verifiedDomain = verified.primary ? verified.email.split("@").pop() || null : null;
  return (
    isEmailAllowed(verified.email, allowedConfig, { verifiedDomain }) ||
    isGithubAccountAllowed(account, allowedConfig)
  );
}

/**
 * GET /api/auth/github/callback
 * Handles the GitHub OAuth authorization code exchange and sets the dashboard session cookie.
 */
export async function GET(request: Request) {
  const origin = getRequestOrigin(request);
  const fail = (error: string) => NextResponse.redirect(new URL(`/login?error=${error}`, origin));

  const query = parseOAuthCallbackQuery(new URL(request.url));
  if (!query) return fail("missing_code");

  const cookieStore = await githubCallbackInternals.getCookieStore();
  const codeVerifier = consumeOAuthFlow(cookieStore, "github", query.state);
  if (!codeVerifier) return fail("invalid_state");

  const settings = await getCachedSettings();
  const config = getGitHubOAuthConfig(settings);
  if (!config.enabled) return fail("not_configured");

  const accessToken = await exchangeCodeForAccessToken(
    config,
    query.code,
    `${origin}${config.redirectPath}`,
    codeVerifier
  );
  if (accessToken.ok === false) return fail(accessToken.error);

  const verified = await fetchVerifiedEmail(accessToken.value);
  if (!verified) return fail("email_not_verified");
  const { email } = verified;
  const account = await fetchAccount(accessToken.value);
  const githubUsername = account.login;

  const auditContext = getAuditRequestContext(request);
  if (!isGithubSignInAllowed(verified, account, settings.authAllowedEmails)) {
    logAuditEvent({
      action: "auth.login.github.unauthorized",
      actor: email,
      target: "dashboard-auth",
      resourceType: "auth_session",
      status: "failed",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: { email, githubUsername, githubId: account.id, reason: "not_in_allowlist" },
    });
    return fail("unauthorized_email");
  }

  if (!(await startDashboardSession(cookieStore, isRequestSecure(request)))) {
    return fail("server_misconfigured");
  }

  logAuditEvent({
    action: "auth.login.github.success",
    actor: email,
    target: "dashboard-auth",
    resourceType: "auth_session",
    status: "success",
    ipAddress: auditContext.ipAddress || undefined,
    requestId: auditContext.requestId,
    metadata: { email, githubUsername, githubId: account.id },
  });

  return NextResponse.redirect(`${origin}/dashboard`);
}
