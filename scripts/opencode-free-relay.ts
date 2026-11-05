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
const HOP_BY_HOP = new Set([
  "host",
  "connection",
  "content-length",
  "accept-encoding",
  "transfer-encoding",
  PROXY_HEADER,
]);
const STRIP_RESPONSE = new Set(["content-encoding", "content-length", "transfer-encoding"]);

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function handle(req: Request): Promise<Response> {
  const url = new URL(req.url);
  if (req.method === "GET" && url.pathname === "/health") {
    return json(200, {
      ok: true,
      upstream: UPSTREAM,
      runtime: `bun ${process.versions.bun ?? ""}`,
    });
  }
  if (req.method !== "POST") return json(405, { error: "method not allowed" });

  const headers = new Headers();
  for (const [name, value] of req.headers) {
    if (!HOP_BY_HOP.has(name.toLowerCase())) headers.set(name, value);
  }
  const proxy = req.headers.get(PROXY_HEADER) || undefined;
  if (proxy && !/^https?:\/\//i.test(proxy)) {
    return json(502, { error: "unsupported upstream proxy scheme (http/https only)" });
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${UPSTREAM}${url.pathname}${url.search}`, {
      method: "POST",
      headers,
      body: await req.arrayBuffer(),
      signal: req.signal,
      ...(proxy ? { proxy } : {}),
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
  const server = Bun.serve({ port: PORT, hostname: HOST, idleTimeout: 255, fetch: handle });
  console.log(`[opencode-free-relay] listening on http://${HOST}:${server.port} -> ${UPSTREAM}`);
}
