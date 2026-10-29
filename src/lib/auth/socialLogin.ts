import { NextResponse } from "next/server";
import { updateSettings } from "@/lib/db/settings";
import {
  DASHBOARD_SESSION_COOKIE,
  getDashboardJwtSecret,
  mintDashboardSessionToken,
} from "@/shared/utils/dashboardSessionToken";
import { timingSafeCompare } from "@/lib/auth/socialOAuth";
import {
  PKCE_CHALLENGE_METHOD,
  generateCodeChallenge,
  generateCodeVerifier,
} from "@/lib/oauth/utils/pkce";

/** Minimal cookie-store surface the social login handlers need (`next/headers` or a test seam). */
export interface SocialCookieStore {
  get(name: string): { value: string } | undefined;
  set(name: string, value: string, options?: Record<string, unknown>): unknown;
}

/** Outcome of a provider HTTP step: the parsed value, or a `/login?error=<code>` code. */
export type StepResult<T> = { ok: true; value: T } | { ok: false; error: string };

export function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export type SocialProvider = "google" | "github";

/** Cookie names of the per-browser flow material for one provider (`state` + PKCE verifier). */
export function oauthFlowCookieNames(provider: SocialProvider) {
  return { state: `${provider}_oauth_state`, verifier: `${provider}_oauth_pkce_verifier` };
}

/**
 * Redirects the browser to the provider's authorization URL with the per-browser flow material:
 * the `state` (login CSRF) and a PKCE S256 challenge whose verifier stays in this browser, so an
 * authorization code stolen in transit cannot be redeemed from another browser (RFC 9700 asks for
 * PKCE on confidential clients too). Both values live in short-lived httpOnly cookies.
 */
export function redirectToProvider(
  authUrl: URL,
  provider: SocialProvider,
  state: string,
  secure: boolean
): NextResponse {
  const verifier = generateCodeVerifier();
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", generateCodeChallenge(verifier));
  authUrl.searchParams.set("code_challenge_method", PKCE_CHALLENGE_METHOD);

  const res = NextResponse.redirect(authUrl.toString());
  const names = oauthFlowCookieNames(provider);
  for (const [name, value] of [
    [names.state, state],
    [names.verifier, verifier],
  ]) {
    res.cookies.set(name, value, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10,
      secure,
    });
  }
  return res;
}

/**
 * Checks the returned OAuth `state` against the per-browser cookie set by the login route and
 * returns the PKCE verifier started with it. Both cookies are single use: they are cleared once
 * the state matches. Returns null (flow rejected) when the state does not match or the verifier
 * is missing — a callback this browser did not start is never redeemed.
 */
export function consumeOAuthFlow(
  cookieStore: SocialCookieStore,
  provider: SocialProvider,
  returnedState: string
): string | null {
  const names = oauthFlowCookieNames(provider);
  const storedState = cookieStore.get(names.state)?.value;
  if (!storedState || !timingSafeCompare(storedState, returnedState)) return null;
  const verifier = cookieStore.get(names.verifier)?.value || "";
  for (const name of [names.state, names.verifier]) {
    cookieStore.set(name, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
  }
  return verifier || null;
}

/**
 * POSTs to a provider endpoint and parses a JSON body. Every failure mode collapses into a short
 * error code — provider response text is never reflected to the browser.
 */
export async function postForJson(
  url: string,
  init: { headers: Record<string, string>; body: string },
  errors: { request: string; response: string }
): Promise<StepResult<Record<string, unknown>>> {
  let resp: Response;
  try {
    resp = await fetch(url, {
      method: "POST",
      headers: init.headers,
      body: init.body,
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    return { ok: false, error: errors.request };
  }
  if (!resp.ok) return { ok: false, error: errors.request };
  try {
    return { ok: true, value: asRecord(await resp.json()) };
  } catch {
    return { ok: false, error: errors.response };
  }
}

/** GETs a provider API endpoint with a bearer token; returns the parsed JSON or `null`. */
export async function getJsonWithBearer(
  url: string,
  accessToken: string,
  extraHeaders: Record<string, string> = {}
): Promise<unknown | null> {
  try {
    const resp = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}`, ...extraHeaders },
      signal: AbortSignal.timeout(5000),
    });
    return resp.ok ? await resp.json() : null;
  } catch {
    return null;
  }
}

/**
 * Completes a successful social login: marks setup complete, mints the dashboard session through
 * the canonical minter (with `iat` + `jti`, so sign-out and a password change end it like any
 * other session) and sets the `auth_token` cookie. Returns false when no JWT secret is available.
 */
export async function startDashboardSession(
  cookieStore: SocialCookieStore,
  secure: boolean
): Promise<boolean> {
  try {
    await updateSettings({ setupComplete: true });
  } catch {
    // non-fatal
  }

  const secret = getDashboardJwtSecret();
  if (!secret) return false;

  cookieStore.set(DASHBOARD_SESSION_COOKIE, await mintDashboardSessionToken(secret), {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return true;
}
