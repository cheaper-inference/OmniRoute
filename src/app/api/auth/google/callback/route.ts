import { NextResponse } from "next/server";
import { z } from "zod";
import { getCachedSettings } from "@/lib/db/readCache";
import { cookies } from "next/headers";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getGoogleOAuthConfig,
  getRequestOrigin,
  isEmailAllowed,
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

export const googleCallbackInternals = {
  getCookieStore: cookies as unknown as () => Promise<SocialCookieStore>,
};

async function exchangeCodeForAccessToken(
  config: ReturnType<typeof getGoogleOAuthConfig>,
  code: string,
  redirectUri: string,
  codeVerifier: string
): Promise<StepResult<string>> {
  return postForAccessToken(
    "https://oauth2.googleapis.com/token",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code_verifier: codeVerifier,
      }).toString(),
    },
    { request: "token_exchange", response: "token_response" }
  );
}

const googleUserInfoSchema = z.object({
  email: z.string().trim().toLowerCase().min(1),
  email_verified: z.literal(true),
  hd: z.string().trim().toLowerCase().optional(),
});

/** A Google account's verified e-mail and its Workspace domain (`hd`), when it has one. */
interface GoogleIdentity {
  email: string;
  hostedDomain: string | null;
}

/** Returns the lower-cased e-mail only when Google reports it as verified, plus the `hd` claim. */
async function fetchVerifiedIdentity(accessToken: string): Promise<StepResult<GoogleIdentity>> {
  const raw = await getJsonWithBearer("https://www.googleapis.com/oauth2/v3/userinfo", accessToken);
  if (raw === null) return { ok: false, error: "user_info_failed" };
  const info = googleUserInfoSchema.safeParse(raw);
  if (!info.success) return { ok: false, error: "email_not_verified" };
  return { ok: true, value: { email: info.data.email, hostedDomain: info.data.hd || null } };
}

/**
 * GET /api/auth/google/callback
 * Handles the Google OAuth 2.0 authorization code exchange and sets the dashboard session cookie.
 */
export async function GET(request: Request) {
  const origin = getRequestOrigin(request);
  const fail = (error: string) => NextResponse.redirect(new URL(`/login?error=${error}`, origin));

  const query = parseOAuthCallbackQuery(new URL(request.url));
  if (!query) return fail("missing_code");

  const cookieStore = await googleCallbackInternals.getCookieStore();
  const codeVerifier = consumeOAuthFlow(cookieStore, "google", query.state);
  if (!codeVerifier) return fail("invalid_state");

  const settings = await getCachedSettings();
  const config = getGoogleOAuthConfig(settings);
  if (!config.enabled) return fail("not_configured");

  const accessToken = await exchangeCodeForAccessToken(
    config,
    query.code,
    `${origin}${config.redirectPath}`,
    codeVerifier
  );
  if (accessToken.ok === false) return fail(accessToken.error);

  const verified = await fetchVerifiedIdentity(accessToken.value);
  if (verified.ok === false) return fail(verified.error);
  const { email, hostedDomain } = verified.value;

  const auditContext = getAuditRequestContext(request);
  // Domain entries need the Workspace `hd` claim: a consumer account that merely verified a
  // corporate address does not prove a current tie to that domain.
  if (!isEmailAllowed(email, settings.authAllowedEmails, { verifiedDomain: hostedDomain })) {
    logAuditEvent({
      action: "auth.login.google.unauthorized",
      actor: email,
      target: "dashboard-auth",
      resourceType: "auth_session",
      status: "failed",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: { email, reason: "email_not_in_allowlist" },
    });
    return fail("unauthorized_email");
  }

  if (!(await startDashboardSession(cookieStore, isRequestSecure(request)))) {
    return fail("server_misconfigured");
  }

  logAuditEvent({
    action: "auth.login.google.success",
    actor: email,
    target: "dashboard-auth",
    resourceType: "auth_session",
    status: "success",
    ipAddress: auditContext.ipAddress || undefined,
    requestId: auditContext.requestId,
    metadata: { email },
  });

  return NextResponse.redirect(`${origin}/dashboard`);
}
