import { createHash, randomBytes } from "node:crypto";
import { exchangeZaiBusinessToken } from "../../../../open-sse/executors/zcode/oauthGrant.ts";

export type ZcodeFamily = "zai" | "bigmodel";
type Session = {
  family: ZcodeFamily;
  flowId: string;
  pollToken: string;
  expiresAt: number;
  busy: boolean;
  owner: string;
  targetConnectionId?: string;
  ready?: Ready;
  normalized?: boolean;
  connectionId?: string;
};
export type Ready = {
  status: "ready";
  token: string;
  accessToken: string;
  refreshToken?: string;
  userId: string;
  name?: string;
  email?: string;
};
const key = "__zcodeOAuthSessions";
const globals = globalThis as unknown as Record<string, Map<string, Session>>;
const sessions = (globals[key] ??= new Map<string, Session>());
const MAX_SESSIONS = 100;
const TTL_MS = 15 * 60_000;
export class ZcodeSessionLimitError extends Error {}
// Bind the opaque session to the credential presented on both authenticated requests.
export function zcodeRequestOwner(request: Request): string {
  const cookie =
    (request.headers.get("cookie") || "")
      .split(";")
      .map((v) => v.trim())
      .find((v) => v.startsWith("auth_token=")) || "";
  const parts = [
    request.headers.get("authorization") || "",
    request.headers.get("x-api-key") || "",
    request.headers.get("x-omniroute-cli-token") || "",
    cookie,
  ];
  return createHash("sha256").update(JSON.stringify(parts)).digest("hex");
}
const base = "https://zcode.z.ai/api/v1";
const text = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() ? v.trim() : undefined;
const obj = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
function prune() {
  for (const [id, s] of sessions) if (s.expiresAt <= Date.now()) sessions.delete(id);
}
function scheduleExpiry(id: string, expiresAt: number) {
  const timer = setTimeout(
    () => {
      const session = sessions.get(id);
      if (!session) return;
      if (session.expiresAt <= Date.now()) sessions.delete(id);
      else scheduleExpiry(id, session.expiresAt);
    },
    Math.max(1, expiresAt - Date.now())
  );
  timer.unref();
}
async function upstream(
  path: string,
  token: string,
  family?: ZcodeFamily
): Promise<Record<string, unknown>> {
  const response = await fetch(`${base}${path}`, {
    method: family ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(family ? { "Content-Type": "application/json" } : {}),
    },
    ...(family ? { body: JSON.stringify({ provider: family }) } : {}),
    redirect: "error",
    signal: AbortSignal.timeout(15000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Z-code OAuth upstream request failed");
  const envelope = obj(await response.json());
  if (envelope.code !== 0) throw new Error("Z-code OAuth upstream rejected request");
  return obj(envelope.data);
}
export async function startZcodeLogin(
  family: ZcodeFamily,
  owner: string,
  targetConnectionId?: string
) {
  prune();
  if (sessions.size >= MAX_SESSIONS) throw new ZcodeSessionLimitError();
  const pollToken = randomBytes(32).toString("hex");
  const sessionId = randomBytes(32).toString("base64url");
  const session: Session = {
    family,
    owner,
    targetConnectionId,
    flowId: "",
    pollToken,
    expiresAt: Date.now() + TTL_MS,
    busy: true,
  };
  sessions.set(sessionId, session);
  scheduleExpiry(sessionId, session.expiresAt);
  try {
    const data = await upstream("/oauth/cli/init", pollToken, family);
    const flowId = text(data.flow_id),
      authorizeUrl = text(data.authorize_url);
    const expiresAt = typeof data.expires_at === "number" ? data.expires_at * 1000 : 0;
    const interval = data.poll_interval_sec;
    if (
      !flowId ||
      !authorizeUrl ||
      !Number.isFinite(expiresAt) ||
      expiresAt <= Date.now() ||
      typeof interval !== "number" ||
      !Number.isFinite(interval) ||
      interval < 1
    )
      throw new Error("Invalid Z-code OAuth init response");
    try {
      if (new URL(authorizeUrl).protocol !== "https:") throw new Error();
    } catch {
      throw new Error("Invalid Z-code OAuth authorization URL");
    }
    if (session.expiresAt <= Date.now()) throw new Error("Z-code OAuth session expired");
    session.flowId = flowId;
    session.expiresAt = Math.min(expiresAt, session.expiresAt);
    scheduleExpiry(sessionId, session.expiresAt);
    session.busy = false;
    return {
      sessionId,
      authorizeUrl,
      expiresAt: session.expiresAt,
      pollIntervalSec: interval,
    };
  } catch (error) {
    sessions.delete(sessionId);
    throw error;
  }
}

function connectionResult(session: Session, id: string) {
  return {
    status: "ok" as const,
    connection: { id, provider: "zcode", family: session.family },
  };
}

async function normalizeReadySession(session: Session) {
  if (!session.ready || session.normalized) return;
  if (session.family === "zai")
    session.ready.accessToken = await exchangeZaiBusinessToken(session.ready.accessToken);
  session.normalized = true;
}

async function persistReadySession(
  sessionId: string,
  session: Session,
  persist: (
    family: ZcodeFamily,
    result: Ready,
    receipt: string,
    targetConnectionId?: string
  ) => Promise<{ id: string }>
) {
  await normalizeReadySession(session);
  const connection = await persist(
    session.family,
    session.ready!,
    createHash("sha256").update(sessionId).digest("hex"),
    session.targetConnectionId
  );
  session.connectionId = connection.id;
  session.ready = undefined;
  session.pollToken = "";
  return connectionResult(session, connection.id);
}

async function receiveReadySession(sessionId: string, session: Session) {
  const data = await upstream(
    `/oauth/cli/poll/${encodeURIComponent(session.flowId)}`,
    session.pollToken
  );
  if (session.expiresAt <= Date.now()) {
    sessions.delete(sessionId);
    return { status: "expired" as const };
  }
  if (data.status === "pending") return { status: "pending" as const };
  if (data.status === "failed") {
    sessions.delete(sessionId);
    return { status: "failed" as const };
  }
  const user = obj(data.user),
    provider = obj(data[session.family]);
  const token = text(data.token),
    accessToken = text(provider.access_token) ?? text(provider.accessToken),
    userId = text(user.user_id);
  if (data.status !== "ready" || !token || !accessToken || !userId)
    throw new Error("Invalid Z-code OAuth poll response");
  const refreshToken =
    session.family === "bigmodel"
      ? (text(provider.refresh_token) ?? text(provider.refreshToken))
      : undefined;
  session.ready = {
    status: "ready",
    token,
    accessToken,
    userId,
    name: text(user.name),
    email: text(user.email),
    ...(refreshToken ? { refreshToken } : {}),
  };
  // Keep the grant until persistence is reconciled; a retry never polls upstream again.
  session.pollToken = "";
  return null;
}

export async function pollZcodeLogin(
  sessionId: string,
  owner: string,
  persist: (
    family: ZcodeFamily,
    result: Ready,
    receipt: string,
    targetConnectionId?: string
  ) => Promise<{ id: string }>
) {
  prune();
  const session = sessions.get(sessionId);
  if (!session || session.owner !== owner) return { status: "expired" as const };
  if (session.connectionId) return connectionResult(session, session.connectionId);
  if (session.busy) return { status: "pending" as const };
  session.busy = true;
  try {
    if (session.ready) return await persistReadySession(sessionId, session, persist);
    const result = await receiveReadySession(sessionId, session);
    if (result) return result;
    return await persistReadySession(sessionId, session, persist);
  } finally {
    session.busy = false;
  }
}
