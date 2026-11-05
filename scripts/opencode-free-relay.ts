/**
 * OpenCode free-tier relay — run with Bun: `bun scripts/opencode-free-relay.ts`.
 *
 * The OpenCode free models answer 429 FreeUsageLimitError to any HTTP client other than Bun's
 * native fetch (measured: the identical request from Node fetch/undici and curl is refused,
 * from Bun 1.4.4 it is served). OmniRoute therefore sends gated free-tier requests here
 * (OPENCODE_FREE_TIER_RELAY_URL) and this process re-sends them with Bun's fetch.
 *
 *   POST <path>  -> POST https://opencode.ai<path>, headers and body unchanged, response
 *                   (status, headers, SSE body) streamed back.
 *   GET /health  -> {"ok":true,...}
 *
 * Optional upstream proxy: the `x-opencode-relay-proxy` request header (set by OmniRoute from
 * the egress proxy of the request) is consumed here and handed to Bun's fetch `proxy` option.
 * Only http(s) proxy URLs are supported by Bun; other schemes answer 502.
 *
 * Env: OPENCODE_FREE_RELAY_PORT (default 20199), OPENCODE_FREE_RELAY_HOST (default 127.0.0.1),
 *      OPENCODE_FREE_RELAY_UPSTREAM (default https://opencode.ai).
 *
 * Non-loopback bind: the relay refuses to start unless OPENCODE_FREE_RELAY_TOKEN is set, and
 * then answers 401 to POSTs that do not carry it in `x-opencode-relay-auth` (OmniRoute sends
 * the same OPENCODE_FREE_RELAY_TOKEN). On such a bind a caller-supplied proxy is honoured only
 * when its host[:port] is listed in OPENCODE_FREE_RELAY_PROXY_ALLOWLIST (comma-separated);
 * otherwise the proxy header answers 403. A loopback bind stays unauthenticated unless a token
 * is configured, in which case it is enforced too.
 */

declare const Bun: {
  serve(options: {
    port: number;
    hostname: string;
    idleTimeout?: number;
    fetch(req: Request): Response | Promise<Response>;
  }): { port: number };
};

const PORT = Number(process.env.OPENCODE_FREE_RELAY_PORT || 20199);
const HOST = process.env.OPENCODE_FREE_RELAY_HOST || "127.0.0.1";
const UPSTREAM = (process.env.OPENCODE_FREE_RELAY_UPSTREAM || "https://opencode.ai").replace(
  /\/+$/,
  ""
);
const PROXY_HEADER = "x-opencode-relay-proxy";
const AUTH_HEADER = "x-opencode-relay-auth";
const HOP_BY_HOP = new Set([
  "host",
  "connection",
  "content-length",
  "accept-encoding",
  "transfer-encoding",
  PROXY_HEADER,
  AUTH_HEADER,
]);
const STRIP_RESPONSE = new Set(["content-encoding", "content-length", "transfer-encoding"]);

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export interface RelayGuard {
  /** Shared secret expected in `x-opencode-relay-auth`; empty = no check. */
  token: string;
  /** True when the listen host is not loopback. */
  exposed: boolean;
  /** Allowed proxy `host` or `host:port` entries (lowercase). Consulted when `exposed`. */
  proxyAllowlist: string[];
}

/** `localhost`, `::1` or a literal IPv4 in 127.0.0.0/8 (`127.example.com` is a DNS name). */
export function isLoopbackHost(hostname: string): boolean {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (host === "localhost" || host === "::1") return true;
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  return !!m && m.slice(1).every((n) => Number(n) <= 255) && m[1] === "127";
}

export function guardFromEnv(env: Record<string, string | undefined>): RelayGuard {
  return {
    token: (env.OPENCODE_FREE_RELAY_TOKEN || "").trim(),
    exposed: !isLoopbackHost(env.OPENCODE_FREE_RELAY_HOST || "127.0.0.1"),
    proxyAllowlist: (env.OPENCODE_FREE_RELAY_PROXY_ALLOWLIST || "")
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  };
}

/** Throws when the upstream would receive the caller's credentials over plaintext http to a remote host. */
export function assertSafeUpstream(upstream: string): void {
  const url = new URL(upstream);
  if (url.protocol === "https:") return;
  if (url.protocol === "http:" && isLoopbackHost(url.hostname)) return;
  throw new Error(
    "OPENCODE_FREE_RELAY_UPSTREAM must be https:// (http:// is accepted for loopback test origins only)"
  );
}

/** Throws when the guard would leave a non-loopback relay open to any caller. */
export function assertSafeBind(guard: RelayGuard): void {
  if (guard.exposed && !guard.token) {
    throw new Error(
      "OPENCODE_FREE_RELAY_HOST is not loopback: set OPENCODE_FREE_RELAY_TOKEN " +
        "(and OPENCODE_FREE_RELAY_PROXY_ALLOWLIST to allow caller proxies)"
    );
  }
}

function sameSecret(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function proxyAllowed(proxy: string, allowlist: string[]): boolean {
  try {
    const u = new URL(proxy);
    return allowlist.includes(u.host.toLowerCase()) || allowlist.includes(u.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function createHandler(guard: RelayGuard): (req: Request) => Promise<Response> {
  return (req) => handleWith(req, guard);
}

export const handle = createHandler(guardFromEnv(process.env));

async function handleWith(req: Request, guard: RelayGuard): Promise<Response> {
  const url = new URL(req.url);
  if (req.method === "GET" && url.pathname === "/health") {
    return json(200, {
      ok: true,
      upstream: UPSTREAM,
      runtime: `bun ${process.versions.bun ?? ""}`,
    });
  }
  if (req.method !== "POST") return json(405, { error: "method not allowed" });

  if (guard.token && !sameSecret(req.headers.get(AUTH_HEADER) || "", guard.token)) {
    return json(401, { error: "relay authentication required" });
  }

  const headers = new Headers();
  for (const [name, value] of req.headers) {
    if (!HOP_BY_HOP.has(name.toLowerCase())) headers.set(name, value);
  }
  const proxy = req.headers.get(PROXY_HEADER) || undefined;
  if (proxy && !/^https?:\/\//i.test(proxy)) {
    return json(502, { error: "unsupported upstream proxy scheme (http/https only)" });
  }

  if (proxy && guard.exposed && !proxyAllowed(proxy, guard.proxyAllowlist)) {
    return json(403, { error: "upstream proxy not in OPENCODE_FREE_RELAY_PROXY_ALLOWLIST" });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${UPSTREAM}${url.pathname}${url.search}`, {
      method: "POST",
      headers,
      body: await req.arrayBuffer(),
      signal: req.signal,
      // `proxy: false` connects directly regardless of HTTP(S)_PROXY in the environment (Bun
      // fetch docs), so direct egress never falls back to an inherited proxy.
      proxy: proxy ?? false,
    } as RequestInit);
  } catch (err) {
    return json(502, { error: `relay upstream failure: ${(err as Error).message}` });
  }
  const out = new Headers();
  for (const [name, value] of upstream.headers) {
    if (!STRIP_RESPONSE.has(name.toLowerCase())) out.set(name, value);
  }
  return new Response(upstream.body, { status: upstream.status, headers: out });
}

if (typeof Bun !== "undefined" && (import.meta as { main?: boolean }).main) {
  assertSafeBind(guardFromEnv(process.env));
  assertSafeUpstream(UPSTREAM);
  const server = Bun.serve({ port: PORT, hostname: HOST, idleTimeout: 255, fetch: handle });
  console.log(`[opencode-free-relay] listening on http://${HOST}:${server.port} -> ${UPSTREAM}`);
}
