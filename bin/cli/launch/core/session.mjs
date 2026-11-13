// bin/cli/launch/core/session.mjs: the ONE client for the gateway launch API (section 3.3, 12.3,
// 12.9). Every /api/launch/* call lives here, so a G1 API change is a one-file change.
//
//   GET    /api/launch/capabilities           parent credential   404 -> GatewayTooOld
//   POST   /api/launch/sessions               parent credential   {tool, view?, ttlSec?}
//   PATCH  /api/launch/sessions/:id           session token       {view?:{hash,ids,serve?}, heartbeat?}
//   DELETE /api/launch/sessions/:id           session token
//   GET    /api/launch/sessions/:id/usage     session token
//
// Errors never include response bodies or tokens.

import { LaunchError } from "../contract.mjs";
import { httpError } from "./errors.mjs";

export const DEFAULT_SESSION_TTL_SEC = 900;
export const HEARTBEAT_INTERVAL_MS = 60000;

function bearer(token) {
  return token ? { authorization: `Bearer ${token}` } : {};
}

/**
 * @param {{ rootUrl: string, credential?: string, fetch?: typeof fetch, timeoutMs?: number }} options
 */
export function createSessionClient(options) {
  const rootUrl = options.rootUrl;
  const doFetch = options.fetch ?? globalThis.fetch;
  const timeoutMs = options.timeoutMs ?? 10000;
  const credential = options.credential;

  async function call(method, path, { token, body, what, map, timeout } = {}) {
    let res;
    try {
      res = await doFetch(`${rootUrl}${path}`, {
        method,
        headers: {
          accept: "application/json",
          ...(body !== undefined ? { "content-type": "application/json" } : {}),
          ...bearer(token),
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        signal: AbortSignal.timeout(timeout ?? timeoutMs),
      });
    } catch (error) {
      throw new LaunchError("GatewayUnreachable", `${what}: gateway not reachable at ${rootUrl}`, {
        cause: error,
      });
    }
    const failure = httpError(res.status, what, map);
    if (failure) {
      await res.body?.cancel?.().catch?.(() => {});
      throw failure;
    }
    if (res.status === 204) return null;
    const text = await res.text();
    if (text === "") return null;
    try {
      return JSON.parse(text);
    } catch (error) {
      throw new LaunchError("GatewayUnreachable", `${what}: gateway sent invalid JSON`, {
        cause: error,
      });
    }
  }

  const sessionPath = (id) => `/api/launch/sessions/${encodeURIComponent(id)}`;

  return {
    rootUrl,
    /** `{version, features:[...]}`; 404 = GatewayTooOld (D2, no unscoped fallback). */
    async capabilities() {
      const data = await call("GET", "/api/launch/capabilities", {
        token: credential,
        what: "launch capabilities",
        map: { notFound: "GatewayTooOld" },
      });
      const features = Array.isArray(data?.features) ? data.features.map(String) : [];
      return { version: data?.version ?? data?.apiVersion, features, raw: data };
    },
    /** Mint the olx_ session token. */
    async mint({ tool, view, ttlSec = DEFAULT_SESSION_TTL_SEC }) {
      const body = { tool, ttlSec, ...(view ? { view } : {}) };
      const data = await call("POST", "/api/launch/sessions", {
        token: credential,
        body,
        what: "launch session mint",
        map: { notFound: "GatewayTooOld", badRequest: "ViewInvalid" },
      });
      if (!data || typeof data.sessionId !== "string" || typeof data.token !== "string") {
        throw new LaunchError("GatewayTooOld", "launch session mint returned no session token", {
          hint: "upgrade the OmniRoute gateway",
        });
      }
      return { sessionId: data.sessionId, token: data.token, expiresAt: data.expiresAt };
    },
    /** PATCH the resolved server-view onto the session (400 = ViewInvalid, an adapter bug). */
    async patchView(session, view) {
      await call("PATCH", sessionPath(session.sessionId), {
        token: session.token,
        body: { view },
        what: "launch session view",
        map: { badRequest: "ViewInvalid", notFound: "GatewayTooOld" },
      });
    },
    async heartbeat(session) {
      await call("PATCH", sessionPath(session.sessionId), {
        token: session.token,
        body: { heartbeat: true },
        what: "launch session heartbeat",
      });
    },
    async revoke(session) {
      await call("DELETE", sessionPath(session.sessionId), {
        token: session.token,
        what: "launch session revoke",
      });
    },
    /** LaunchUsageSummary (12.3), short timeout: cosmetic. */
    async usage(session, { timeoutMs: usageTimeout = 1500 } = {}) {
      return call("GET", `${sessionPath(session.sessionId)}/usage`, {
        token: session.token,
        what: "launch session usage",
        timeout: usageTimeout,
      });
    },
  };
}

/**
 * Heartbeat every `intervalMs` while the tool runs; failures are warnings.
 * @returns {{ stop(): void }}
 */
export function startHeartbeat(client, session, options = {}) {
  const intervalMs = options.intervalMs ?? HEARTBEAT_INTERVAL_MS;
  const warn = options.warn ?? (() => {});
  const setIntervalFn = options.setInterval ?? setInterval;
  const clearIntervalFn = options.clearInterval ?? clearInterval;
  let warned = false;
  const timer = setIntervalFn(() => {
    client.heartbeat(session).catch((error) => {
      if (warned) return;
      warned = true;
      warn(`launch session heartbeat failed: ${error?.message ?? "error"}`);
    });
  }, intervalMs);
  timer?.unref?.();
  return {
    stop() {
      clearIntervalFn(timer);
    },
  };
}
