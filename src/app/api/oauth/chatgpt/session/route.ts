import { z } from "zod";
import { opaqueTokenFingerprint } from "@omniroute/open-sse/utils/opaqueTokenFingerprint.ts";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getChatGptHostId } from "@/lib/db/chatgpt";
import { isEncryptionEnabled } from "@/lib/db/encryption";
import {
  createProviderConnection,
  getProviderConnectionById,
  updateProviderConnection,
} from "@/lib/db/providers";
import {
  createChatGptAttempt,
  exchangeChatGptCode,
  resolveChatGptClientId,
  verifyChatGptIdentity,
  type ChatGptTokens,
} from "@/lib/oauth/chatgptProtocol";
import {
  saveChatGptAttempt,
  getChatGptAttempt,
  claimChatGptAttempt,
  cancelChatGptAttempt,
} from "@/lib/oauth/chatgptAttempts";
import { discoverChatGptModels } from "@/lib/providerModels/chatgptDiscovery";
import { CHATGPT_ISSUER, hasChatGptPlanScope } from "@omniroute/open-sse/config/chatgpt";
import { errorResponse } from "@omniroute/open-sse/utils/error";
import { DASHBOARD_SESSION_COOKIE } from "@/shared/utils/dashboardSessionToken";
import { parseChatGptManualCallback } from "@/shared/utils/chatgptCallback";

export const runtime = "nodejs";
const schema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("start"),
    port: z.number().int().min(1024).max(65535),
    connectionId: z.string().min(1).max(200).optional(),
  }),
  z.object({
    action: z.literal("complete"),
    state: z.string().max(2000),
    code: z.string().min(1).max(8192),
    clientId: z.string().max(200).optional(),
  }),
  z.object({ action: z.literal("status"), state: z.string().max(2000) }),
  z.object({
    action: z.literal("complete-url"),
    state: z.string().min(1).max(2000),
    callbackUrl: z.string().min(1).max(16384),
  }),
  z.object({ action: z.literal("cancel"), state: z.string().max(2000) }),
]);
function json(value: unknown) {
  return Response.json(value, { headers: { "Cache-Control": "no-store" } });
}

type SessionBody = z.infer<typeof schema>;
type AttemptEntry = ReturnType<typeof claimChatGptAttempt>;
type ChatGptCallback = { code: string; clientId?: string };
type VerifiedIdentity = Awaited<ReturnType<typeof verifyChatGptIdentity>>;

const LOOPBACK_HOSTNAMES = ["127.0.0.1", "localhost", "[::1]"];
const EXPIRED_ATTEMPT_MESSAGE = "This sign-in expired or was already used. Start again.";

function isSecureDashboardOrigin(site: URL): boolean {
  if (site.protocol === "https:") return true;
  return site.protocol === "http:" && LOOPBACK_HOSTNAMES.includes(site.hostname);
}

/** Browsers supply Origin on these POSTs. Comparing the authority also works behind HTTPS proxies. */
function checkDashboardOrigin(request: Request): { origin: string } | Response {
  const origin = request.headers.get("origin");
  let site: URL;
  try {
    site = new URL(origin || "");
  } catch {
    return errorResponse(403, "Same-origin browser sign-in required.");
  }
  if (
    site.origin !== origin ||
    site.host !== request.headers.get("host") ||
    !isSecureDashboardOrigin(site)
  )
    return errorResponse(403, "Open the dashboard over HTTPS or on localhost.");
  return { origin };
}

/** Binds attempts to the caller's dashboard session (cookie or bearer), hashed. */
function resolveAttemptOwner(request: Request): string | null {
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${DASHBOARD_SESSION_COOKIE}=`));
  const identity = cookie || request.headers.get("authorization");
  if (!identity) return null;
  return opaqueTokenFingerprint(identity);
}

async function startAttempt(
  body: Extract<SessionBody, { action: "start" }>,
  origin: string,
  owner: string
): Promise<Response> {
  let registration: { clientId: string; subject: string; connectionId: string } | undefined;
  if (body.connectionId) {
    const existing = await getProviderConnectionById(body.connectionId);
    const data = existing?.providerSpecificData as Record<string, unknown> | undefined;
    if (
      existing?.provider !== "chatgpt" ||
      typeof data?.clientId !== "string" ||
      typeof data.subject !== "string"
    )
      return errorResponse(400, "Invalid ChatGPT registration.");
    registration = {
      clientId: data.clientId,
      subject: data.subject,
      connectionId: body.connectionId,
    };
  }
  try {
    const { attempt, authUrl } = createChatGptAttempt(
      origin,
      body.port,
      getChatGptHostId(),
      registration
    );
    saveChatGptAttempt(attempt, owner);
    return json({ authUrl, state: attempt.state, expiresAt: attempt.expiresAt });
  } catch {
    return errorResponse(503, "Unable to start ChatGPT sign-in. Try again shortly.");
  }
}

function resolveCallback(
  body: Extract<SessionBody, { action: "complete" | "complete-url" }>,
  owner: string
): ChatGptCallback | Response {
  if (body.action !== "complete-url") return body;
  const pending = getChatGptAttempt(body.state, owner);
  if (!pending || pending.phase !== "pending") return errorResponse(400, EXPIRED_ATTEMPT_MESSAGE);
  try {
    const callback = parseChatGptManualCallback(body.callbackUrl, pending.attempt);
    resolveChatGptClientId(pending.attempt, callback.clientId);
    return callback;
  } catch {
    return errorResponse(
      400,
      "Paste the complete callback URL from this sign-in, including code, state and client_id if present. If access was denied, start again."
    );
  }
}

function buildTokenData(tokens: ChatGptTokens, verified: VerifiedIdentity, clientId: string) {
  const scopes = tokens.scope.split(/\s+/).filter(Boolean);
  const permitted = hasChatGptPlanScope(scopes);
  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();
  return {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    idToken: tokens.id_token,
    expiresAt,
    tokenExpiresAt: expiresAt,
    email: verified.email,
    isActive: permitted,
    testStatus: permitted ? "active" : "unavailable",
    lastError: permitted
      ? null
      : "ChatGPT plan usage was not authorized. Sign in again to enable it.",
    errorCode: null,
    lastErrorType: null,
    rateLimitedUntil: null,
    backoffLevel: 0,
    providerSpecificData: {
      issuer: CHATGPT_ISSUER,
      subject: verified.subject,
      clientId,
      scopes,
      earliestRefreshAt: tokens.earliest_refresh_at ?? null,
      expiredRetry: null,
      refreshCircuit: null,
      autoFetchModels: true,
    },
  };
}

async function persistConnection(
  entry: AttemptEntry,
  tokenData: ReturnType<typeof buildTokenData>,
  verified: VerifiedIdentity
) {
  if (!entry.attempt.connectionId) {
    return createProviderConnection({
      ...tokenData,
      provider: "chatgpt",
      authType: "oauth",
      name: verified.email || "ChatGPT",
    });
  }
  const existing = await getProviderConnectionById(entry.attempt.connectionId);
  if (existing?.provider !== "chatgpt") throw new Error("Registration removed");
  return updateProviderConnection(entry.attempt.connectionId, {
    ...tokenData,
    providerSpecificData: {
      ...(existing.providerSpecificData as object),
      ...tokenData.providerSpecificData,
    },
  });
}

async function completeAttempt(entry: AttemptEntry, callback: ChatGptCallback): Promise<Response> {
  try {
    const clientId = resolveChatGptClientId(entry.attempt, callback.clientId);
    const tokens = await exchangeChatGptCode(entry.attempt, callback.code, clientId);
    const verified = await verifyChatGptIdentity(tokens.id_token, clientId, entry.attempt.nonce);
    if (entry.attempt.subject && verified.subject !== entry.attempt.subject)
      throw new Error("Different account");
    const tokenData = buildTokenData(tokens, verified, clientId);
    const permitted = tokenData.isActive;
    const connection = await persistConnection(entry, tokenData, verified);
    if (permitted) {
      try {
        await discoverChatGptModels(connection);
      } catch {
        entry.warning =
          "Signed in, but the live model catalog could not be loaded. Use Sync models to retry.";
      }
    } else
      entry.warning =
        "Signed in without plan usage. Sign in again and allow ChatGPT plan usage to enable models.";
    entry.phase = "done";
    return json({ success: true, planAuthorized: permitted, warning: entry.warning });
  } catch {
    entry.phase = "failed";
    // Neither provider token bodies nor JWT validation errors belong in responses/logs.
    return errorResponse(
      400,
      "ChatGPT sign-in could not be completed or verified. Start again with the same account."
    );
  }
}

export async function POST(request: Request) {
  const denied = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (denied) return denied;
  const site = checkDashboardOrigin(request);
  if (site instanceof Response) return site;
  const owner = resolveAttemptOwner(request);
  if (!owner) return errorResponse(401, "Sign in to the dashboard first.");
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return errorResponse(400, "Invalid ChatGPT sign-in request.");
  const body = parsed.data;
  if (body.action === "status" || body.action === "cancel") {
    if (body.action === "cancel") cancelChatGptAttempt(body.state, owner);
    const entry = getChatGptAttempt(body.state, owner);
    return json({ phase: entry?.phase || "expired", warning: entry?.warning });
  }
  if (!isEncryptionEnabled())
    return errorResponse(503, "Enable credential encryption before connecting ChatGPT.");
  if (body.action === "start") return startAttempt(body, site.origin, owner);
  const callback = resolveCallback(body, owner);
  if (callback instanceof Response) return callback;
  let entry: AttemptEntry;
  try {
    entry = claimChatGptAttempt(body.state, owner);
  } catch {
    return errorResponse(400, EXPIRED_ATTEMPT_MESSAGE);
  }
  return completeAttempt(entry, callback);
}
