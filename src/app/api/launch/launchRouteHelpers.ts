/**
 * Shared auth, validation and error helpers for the `/api/launch/*` routes (architecture 3.3).
 *
 * Route tier: `/api/launch/` spawns nothing, so it is NOT local-only. It is classified PUBLIC
 * in publicApiRoutes.ts so the management gate (dashboard session / manage scope) does not
 * apply, and every handler enforces its own auth here:
 *   - mint: the parent credential (API key or env key); the session is bound to that exact
 *     secret. With no credential, only a trusted loopback caller on an install with NO
 *     credential surface (REQUIRE_API_KEY off, no API key, password, OIDC or INITIAL_PASSWORD:
 *     the posture in which `/v1/models` is already open to loopback) may mint, and that session
 *     is anonymous (parent NULL), so it grants nothing an anonymous local request does not
 *     already have; it dies as soon as any credential surface appears, and it is refused from a
 *     non-loopback peer by the catalog. A launch token can never mint another session.
 *   - session routes: the session's own `olx_` token, or the parent credential.
 * Errors go through buildErrorBody (Hard Rule #12); tokens are never logged.
 */

import { z } from "zod";

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { SYNTHETIC_SELF_LOOP_API_KEY_ID } from "@/shared/constants/apiKeyIdentities";
import { isLoopbackRequest } from "@/shared/utils/apiAuth";
import { extractApiKey } from "@/sse/services/auth";
import type { LaunchSessionRecord } from "@/lib/db/launchSessions";

export const LAUNCH_API_VERSION = 1;
export const LAUNCH_SPEC_VERSION = 1;

export function launchError(status: number, message: string, code?: string): Response {
  return Response.json(buildErrorBody(status, message, undefined, code ? { code } : undefined), {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function launchJson(body: unknown, status = 200): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export const unauthorized = () =>
  launchError(401, "Invalid or missing credential", "invalid_api_key");
export const notFound = () => launchError(404, "Launch session not found", "not_found");

export type LaunchCaller =
  | { kind: "key"; parentKeyId: string; credential: string }
  | { kind: "session"; session: LaunchSessionRecord }
  | { kind: "anonymous" };

/**
 * Who is calling. A presented credential must validate (a bad one is never downgraded to
 * anonymous here, unlike the inference routes); no credential is only accepted from a trusted
 * loopback peer while REQUIRE_API_KEY is off.
 */
export async function resolveLaunchCaller(request: Request): Promise<LaunchCaller | null> {
  const credential = extractApiKey(request);
  if (credential) {
    const { isLaunchSessionToken, resolveLaunchSessionToken } =
      await import("@/lib/db/launchSessions");
    const { validateApiKey, getApiKeyMetadata } = await import("@/lib/db/apiKeys");
    if (!(await validateApiKey(credential))) return null;
    if (isLaunchSessionToken(credential)) {
      const session = resolveLaunchSessionToken(credential);
      return session ? { kind: "session", session } : null;
    }
    const metadata = await getApiKeyMetadata(credential);
    if (!metadata?.id || metadata.id === SYNTHETIC_SELF_LOOP_API_KEY_ID) return null;
    return { kind: "key", parentKeyId: metadata.id, credential };
  }
  if (!isLoopbackRequest(request)) return null;
  const { isLaunchAnonymousPostureOpen } = await import("@/lib/db/apiKeys");
  return (await isLaunchAnonymousPostureOpen()) ? { kind: "anonymous" } : null;
}

/** The session's own token, or the credential (or anonymous posture) it was minted from. */
export function callerOwnsSession(caller: LaunchCaller, session: LaunchSessionRecord): boolean {
  if (caller.kind === "session") return caller.session.id === session.id;
  if (caller.kind === "key") return session.parentKeyId === caller.parentKeyId;
  return session.parentKeyId === null;
}

export async function readJsonBody(
  request: Request
): Promise<{ ok: true; body: unknown } | { ok: false }> {
  try {
    const text = await request.text();
    return { ok: true, body: text.trim() === "" ? {} : JSON.parse(text) };
  } catch {
    return { ok: false };
  }
}

export function firstIssueMessage(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Invalid request body";
  const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
  return `${path}${issue.message}`;
}

/**
 * Server-view presentation this gateway can honour. Ids are served raw (architecture 3.2), so
 * `serve.prefix` (and `mode`, which needs it) is refused: serving `<prefix>/<id>` also needs the
 * reverse strip on the request path, which this gateway does not have yet. `shape: "codex"` is
 * refused too; codex clients already get their compatible envelope by header. Refusing beats a
 * silently different list (no silent degradation).
 */
export function serveError(
  serve: { prefix?: string; mode?: string; shape?: string } | undefined
): string | null {
  if (!serve) return null;
  if (serve.prefix !== undefined) return "view.serve.prefix is not supported by this gateway";
  if (serve.shape !== undefined && serve.shape !== "openai") {
    return `view.serve.shape "${serve.shape}" is not supported by this gateway`;
  }
  return null;
}

export const launchToolIdSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-z0-9][a-z0-9._-]*$/, "tool id must be lowercase letters, digits, . _ -");

export const launchSessionTagSchema = z
  .string()
  .min(1)
  .max(128)
  .regex(/^[A-Za-z0-9._:/=-]+$/, "session tag must use [A-Za-z0-9._:/=-]");

export function publicSessionView(session: LaunchSessionRecord) {
  return session.view
    ? { hash: session.view.hash, count: session.view.ids.length, serve: session.view.serve ?? null }
    : null;
}
