import { CORS_HEADERS } from "@/shared/utils/cors";
import { getLiveWsPath, resolveLiveWsPublicUrl } from "@/shared/utils/wsPath";
import { authorizeWebSocketHandshake } from "@/lib/ws/handshake";
import {
  WS_HANDSHAKE_ORIGIN_HEADER,
  buildHandshakeOriginRequest,
  isWebSocketOriginAllowed,
} from "@/server/origin/wsOrigin";

const WS_HANDSHAKE_HEADERS = {
  ...CORS_HEADERS,
  "Cache-Control": "no-store",
};

/**
 * Public URL for the live dashboard WebSocket (reverse proxy / Cloudflare
 * Tunnel setups). Read lazily at request time (not module load) so runtime
 * env changes are honored, and only echoed when it is a ws:// or wss:// URL.
 */
function getLivePublicUrl(): string | null {
  // Runtime-resolved: a prebuilt image never carries a build-time NEXT_PUBLIC_*
  // value, and this handshake is what the browser reads instead (#11331).
  return resolveLiveWsPublicUrl();
}

function getWsProtocol() {
  return {
    request: {
      type: "request",
      id: "req-1",
      payload: { model: "openai/gpt-4.1-mini", messages: [] },
    },
    cancel: { type: "cancel", id: "req-1" },
    live: {
      port: parseInt(process.env.LIVE_WS_PORT || "20132", 10),
      publicUrl: getLivePublicUrl(),
      path: getLiveWsPath(),
      protocol: "json",
      channels: ["requests", "combo", "credentials"],
      auth: "dashboard-session | api-key:manage",
      heartbeatMs: 15000,
    },
  };
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      ...WS_HANDSHAKE_HEADERS,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * Origin verdict for a `/v1/ws` upgrade, or `null` when the caller is not the bridge.
 *
 * The bridge (`scripts/dev/v1-ws-bridge.mjs`) streams `/v1/chat/completions`,
 * `/v1/messages` and `/v1/responses` back as WebSocket frames, which browsers do not
 * guard with CORS. It forwards the browser's `Origin` and upgrade headers here and
 * refuses to upgrade unless the response says `originChecked: true`. A plain GET (the
 * dashboard's same-origin `fetch`) carries no bridge header and gets no verdict.
 */
function checkBridgeOrigin(request: Request, authType: string): boolean | null {
  const raw = request.headers.get(WS_HANDSHAKE_ORIGIN_HEADER);
  if (raw === null) return null;
  // A valid API key is exempt, as on `/v1/responses`: a cross-site page cannot know it.
  if (authType === "api_key") return true;
  let handshake: unknown = null;
  try {
    handshake = JSON.parse(raw);
  } catch {
    handshake = null;
  }
  return isWebSocketOriginAllowed(
    buildHandshakeOriginRequest(handshake, request.headers.get("origin"))
  );
}

type WsHandshakeAuth = Awaited<ReturnType<typeof authorizeWebSocketHandshake>>;

/** `?handshake=1` answer: auth verdict, bridge Origin verdict, then the handshake metadata. */
function handshakeResponse(request: Request, auth: WsHandshakeAuth): Response {
  if (!auth.authorized) {
    return Response.json(
      {
        error: {
          message: auth.hasCredential ? "Invalid WebSocket credential" : "WebSocket auth required",
          type: "invalid_request",
          code: auth.hasCredential ? "ws_auth_invalid" : "ws_auth_required",
        },
        wsAuth: auth.wsAuth,
        path: auth.wsPath,
      },
      {
        status: auth.hasCredential ? 403 : 401,
        headers: WS_HANDSHAKE_HEADERS,
      }
    );
  }

  const originVerdict = checkBridgeOrigin(request, auth.authType);
  if (originVerdict === false) {
    return Response.json(
      {
        error: {
          message: "WebSocket origin not allowed",
          type: "invalid_request",
          code: "ws_origin_forbidden",
        },
        path: auth.wsPath,
      },
      { status: 403, headers: WS_HANDSHAKE_HEADERS }
    );
  }

  return Response.json(
    {
      ok: true,
      originChecked: originVerdict === true,
      path: auth.wsPath,
      wsAuth: auth.wsAuth,
      authenticated: auth.authenticated,
      authType: auth.authType,
      protocol: getWsProtocol(),
      live: {
        port: parseInt(process.env.LIVE_WS_PORT || "20132", 10),
        publicUrl: getLivePublicUrl(),
        path: getLiveWsPath(),
        protocol: "json",
        channels: ["requests", "combo", "credentials"],
        auth: "dashboard-session | api-key:manage",
        description: "Real-time dashboard events via WebSocket",
      },
    },
    {
      headers: WS_HANDSHAKE_HEADERS,
    }
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const handshake = url.searchParams.get("handshake") === "1";
  const auth = await authorizeWebSocketHandshake(request);

  if (handshake) return handshakeResponse(request, auth);

  return Response.json(
    {
      error: {
        message: "Upgrade Required",
        type: "invalid_request",
        code: "upgrade_required",
      },
      path: auth.wsPath,
      wsAuth: auth.wsAuth,
      protocol: getWsProtocol(),
    },
    {
      status: 426,
      headers: {
        ...WS_HANDSHAKE_HEADERS,
        Upgrade: "websocket",
      },
    }
  );
}
