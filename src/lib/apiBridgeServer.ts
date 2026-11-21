import http from "http";
import type { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";
import net from "net";
import { classifyIpScope } from "@/lib/ipUtils";
import {
  isLoopbackBindHost,
  isPrintableAsciiTarget,
  isQuotaPanelBasePath,
  isQuotaPanelPath,
  QUOTA_PANEL_DROPPED_HEADER_NAMES,
  QUOTA_PANEL_DROPPED_HEADER_PREFIXES,
  QUOTA_PANEL_DROPPED_RESPONSE_HEADERS,
  QUOTA_PANEL_HEADERS_TIMEOUT_MS,
  QUOTA_PANEL_KEEP_ALIVE_TIMEOUT_MS,
  QUOTA_PANEL_MAX_CONNECTIONS,
  QUOTA_PANEL_METHOD_NAMES,
  QUOTA_PANEL_REQUEST_TIMEOUT_MS,
  QUOTA_PANEL_SOCKET_TIMEOUT_MS,
  QUOTA_PANEL_TIMEOUT_CHECK_INTERVAL_MS,
  resolveQuotaPanelListener,
} from "@/lib/quotaPanelBridge";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { warnIfNonLoopbackWithoutApiKey } from "@/lib/startup/nonLoopbackApiKeyGuard";
import { getTrustProxyMode } from "@/server/origin/trustProxyMode";
import { getApiBridgeTimeoutConfig } from "@/shared/utils/runtimeTimeouts";
import {
  attachRequestStreamGuards,
  installProcessCrashGuard,
} from "@/shared/utils/httpClientAbortGuard.mjs";

const API_BRIDGE_TIMEOUTS = getApiBridgeTimeoutConfig(process.env, (message) => {
  console.warn(`[API Bridge] ${message}`);
});

const OPENAI_COMPAT_PATHS = [
  /^\/v1(?:\/|$)/,
  // Gemini-native generateContent (Gemini CLI, google-genai SDK); case-insensitive like
  // the v1beta matcher in src/proxy.ts. /api/v1beta stays blocked.
  /^\/v1beta(?:\/|$)/i,
  /^\/chat\/completions(?:\?|$)/,
  /^\/responses(?:\?|$)/,
  /^\/models(?:\?|$)/,
  /^\/codex(?:\/|\?|$)/,
  /^\/api\/oauth(?:\/|$)/,
  /^\/callback(?:\?|$)/,
];

function isOpenAiCompatiblePath(pathname: string): boolean {
  return OPENAI_COMPAT_PATHS.some((pattern) => pattern.test(pathname));
}

// The percent escapes that can hide a dot, a separator or another escape, and what each one
// stands for.
const HIDDEN_PATH_CHARS: Record<string, string> = { "25": "%", "2e": ".", "2f": "/", "5c": "\\" };
const HIDDEN_PATH_CHAR_PATTERN = /%(25|2e|2f|5c)/gi;
const MAX_UNWRAP_PASSES = 8;

/**
 * True when the path carries a `.` or `..` segment, literal or percent-encoded.
 *
 * The allowlist is matched against the path as the client sent it, and that same
 * path is relayed untouched, so a dot segment would let the server behind the
 * bridge resolve the request to a route the allowlist never saw. Only the
 * escapes that can hide a separator or a dot are unwrapped, one level per pass,
 * and the result is used for this check alone, never as a path. The loop is
 * bounded and cannot throw on malformed escapes.
 */
export function hasDotSegment(pathname: string): boolean {
  let current = pathname;
  for (let pass = 0; pass < MAX_UNWRAP_PASSES; pass += 1) {
    const next = current.replace(
      HIDDEN_PATH_CHAR_PATTERN,
      (_escape, hex: string) => HIDDEN_PATH_CHARS[hex.toLowerCase()]
    );
    if (next === current) break;
    current = next;
  }
  return current.split(/[/\\]/).some((segment) => segment === "." || segment === "..");
}

/**
 * A request is relayed only when its path is free of dot segments and on the allowlist.
 *
 * A path that carries a fragment marker is refused as well. A request target has no
 * fragment, and parsers disagree on where such a path ends, so the path this function
 * validated would not be the path the server behind the bridge resolves. A marker after
 * the `?` belongs to the query for every parser and is left alone.
 */
export function isRelayablePath(
  rawUrl: string,
  isAllowedPath: (pathname: string) => boolean = isOpenAiCompatiblePath
): boolean {
  const pathname = rawUrl.split("?")[0] || "/";
  if (pathname.includes("#")) return false;
  return !hasDotSegment(pathname) && isAllowedPath(pathname);
}

/**
 * What one listener of the bridge relays.
 *
 * Every listener shares the path guard, the client address handling, the timeouts and the
 * relay itself. Listeners differ only in the fields of their role.
 */
export interface BridgeRole {
  /** Allowlist, matched against the raw path without the query. */
  isAllowedPath: (pathname: string) => boolean;
  /** Methods relayed, upper case. `null` relays every method. */
  methods: readonly string[] | null;
  /** When true, a target with a character outside printable ASCII is refused. */
  strictTarget: boolean;
  /** When false, every upgrade request is refused. */
  relayUpgrades: boolean;
  /** When false, a request that declares a body is refused. */
  relayBodies: boolean;
  /** The `message` of the 404 body. It never says why the request was refused. */
  notFoundMessage: string;
  /** When false, the 502 and 504 bodies carry no `detail`. */
  errorDetail: boolean;
  /** Request headers not relayed, by lower-case name prefix or exact lower-case name. */
  droppedRequestHeaders: RequestHeaderDropRule;
  /** Lower-case names of upstream response headers not copied to the client. */
  droppedResponseHeaders: readonly string[];
}

export interface RequestHeaderDropRule {
  prefixes: readonly string[];
  names: readonly string[];
}

const NO_REQUEST_HEADER_DROPS: RequestHeaderDropRule = Object.freeze({
  prefixes: Object.freeze([]),
  names: Object.freeze([]),
});

const QUOTA_PANEL_REQUEST_HEADER_DROPS: RequestHeaderDropRule = Object.freeze({
  prefixes: QUOTA_PANEL_DROPPED_HEADER_PREFIXES,
  names: QUOTA_PANEL_DROPPED_HEADER_NAMES,
});

const API_BRIDGE_ROLE: BridgeRole = {
  isAllowedPath: isOpenAiCompatiblePath,
  methods: null,
  strictTarget: false,
  relayUpgrades: true,
  relayBodies: true,
  notFoundMessage: "API port only serves OpenAI-compatible routes.",
  errorDetail: true,
  droppedRequestHeaders: NO_REQUEST_HEADER_DROPS,
  droppedResponseHeaders: Object.freeze([]),
};

/**
 * The role of the quota panel port: the self-service quota page, read only.
 *
 * A base path that is not empty and not supported (see `isQuotaPanelBasePath`) gives a role that
 * refuses every path. The role object is frozen.
 */
export function createQuotaPanelRole(basePath = ""): BridgeRole {
  const supportedBasePath = basePath === "" || isQuotaPanelBasePath(basePath);
  return Object.freeze({
    isAllowedPath: (pathname: string) => supportedBasePath && isQuotaPanelPath(pathname, basePath),
    methods: QUOTA_PANEL_METHOD_NAMES,
    strictTarget: true,
    relayUpgrades: false,
    relayBodies: false,
    notFoundMessage: "Not found.",
    errorDetail: false,
    droppedRequestHeaders: QUOTA_PANEL_REQUEST_HEADER_DROPS,
    droppedResponseHeaders: QUOTA_PANEL_DROPPED_RESPONSE_HEADERS,
  });
}

/**
 * True when the role relays this method and target. The path goes through `isRelayablePath`.
 *
 * This does not cover the body rule of a role (`relayBodies`): `bridgeRequestDecision` does.
 */
export function isRelayableRequest(
  role: BridgeRole,
  method: string | undefined,
  rawUrl: string
): boolean {
  if (role.strictTarget && !isPrintableAsciiTarget(rawUrl)) return false;
  if (role.methods && !role.methods.includes(method ?? "")) return false;
  return isRelayablePath(rawUrl, role.isAllowedPath);
}

/** True when the request declares a body, by a non-zero length or any transfer coding. */
function declaresRequestBody(headers: IncomingHttpHeaders): boolean {
  if (headers["transfer-encoding"] !== undefined) return true;
  const length = headers["content-length"];
  return length !== undefined && Number(length) !== 0;
}

type BridgeRequestDecision = "relay" | "refuse" | "refuse-and-close";

/**
 * What the bridge does with a request: the body, method and path rules of the role, together.
 *
 * A request refused for its body also closes the connection, so its body is not read.
 */
function bridgeRequestDecision(
  role: BridgeRole,
  method: string | undefined,
  rawUrl: string,
  headers: IncomingHttpHeaders
): BridgeRequestDecision {
  if (!role.relayBodies && declaresRequestBody(headers)) return "refuse-and-close";
  return isRelayableRequest(role, method, rawUrl) ? "relay" : "refuse";
}

function notFoundBody(role: BridgeRole): string {
  return JSON.stringify({ error: "not_found", message: role.notFoundMessage });
}

function relayErrorBody(role: BridgeRole, error: string, detail: string): string {
  return JSON.stringify(role.errorDetail ? { error, detail } : { error });
}

function requestWantsStreaming(req: IncomingMessage): boolean {
  const accept = String(req.headers.accept || "").toLowerCase();
  if (accept.includes("text/event-stream")) return true;

  const pathname = (req.url || "/").split("?")[0] || "/";
  return /^\/(?:v1\/)?(?:responses|chat\/completions)(?:\/|$)/.test(pathname);
}

function getProxyTimeoutMs(req: IncomingMessage): number {
  if (!requestWantsStreaming(req)) return API_BRIDGE_TIMEOUTS.proxyTimeoutMs;

  return Math.max(API_BRIDGE_TIMEOUTS.proxyTimeoutMs, API_BRIDGE_TIMEOUTS.serverRequestTimeoutMs);
}

// The dashboard tells a local caller from a remote one by the socket peer plus whether
// forwarding headers are present. This relay always connects from loopback, so a remote
// client has to be reported through them or it would be taken for the host itself.
//
//   local          loopback peer: its headers pass through, as for any local caller.
//   trusted-proxy  private-LAN peer that OMNIROUTE_TRUST_PROXY=private|lan names as a
//                  proxy: its headers pass through and its own address is appended.
//   remote         anyone else: everything it sent about forwarding is dropped and it
//                  is reported by the address of its connection.
type ClientPolicy =
  { kind: "local" } | { kind: "trusted-proxy"; peer: string } | { kind: "remote"; peer: string };

// Headers a client can use to claim an address, host or scheme other than its own.
const FORWARDING_HEADERS = new Set([
  "forwarded",
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
  "x-real-ip",
  "cf-connecting-ip",
  "true-client-ip",
  "x-client-ip",
]);

function resolveClientPolicy(remoteAddress: string | undefined): ClientPolicy {
  const scope = classifyIpScope(remoteAddress);
  if (scope === "loopback") return { kind: "local" };
  const peer = remoteAddress ? remoteAddress.replace(/^::ffff:/, "") : "unknown";
  if (scope === "private" && getTrustProxyMode() === "private") {
    return { kind: "trusted-proxy", peer };
  }
  return { kind: "remote", peer };
}

/**
 * The headers relayed to the dashboard. A header that `dropped` names, by lower-case prefix or
 * exact lower-case name, is left out. `Host` and the forwarding headers are then set.
 */
export function buildBridgeRequestHeaders(
  headers: IncomingHttpHeaders,
  remoteAddress: string | undefined,
  dashboardPort: number,
  dropped: RequestHeaderDropRule = NO_REQUEST_HEADER_DROPS
): IncomingHttpHeaders {
  const relayed: IncomingHttpHeaders = { ...headers, host: `127.0.0.1:${dashboardPort}` };
  for (const name of Object.keys(relayed)) {
    const lower = name.toLowerCase();
    const byPrefix = dropped.prefixes.some((prefix) => lower.startsWith(prefix));
    if (byPrefix || dropped.names.includes(lower)) delete relayed[name];
  }
  const policy = resolveClientPolicy(remoteAddress);
  if (policy.kind === "remote") {
    for (const name of FORWARDING_HEADERS) delete relayed[name];
    relayed["x-forwarded-for"] = policy.peer;
  } else if (policy.kind === "trusted-proxy") {
    const chain = [headers["x-forwarded-for"], policy.peer].flat().filter(Boolean);
    relayed["x-forwarded-for"] = chain.join(", ");
  }
  return relayed;
}

/** The upstream response headers copied to the client, without the role's dropped names. */
function relayedResponseHeaders(
  role: BridgeRole,
  headers: IncomingHttpHeaders
): IncomingHttpHeaders {
  if (role.droppedResponseHeaders.length === 0) return headers;
  const relayed: IncomingHttpHeaders = { ...headers };
  for (const name of role.droppedResponseHeaders) delete relayed[name];
  return relayed;
}

function proxyRequest(
  req: IncomingMessage,
  res: ServerResponse,
  dashboardPort: number,
  role: BridgeRole
): void {
  const proxyTimeoutMs = getProxyTimeoutMs(req);
  const targetReq = http.request(
    {
      hostname: "127.0.0.1",
      port: dashboardPort,
      method: req.method,
      path: req.url,
      headers: buildBridgeRequestHeaders(
        req.headers,
        req.socket.remoteAddress,
        dashboardPort,
        role.droppedRequestHeaders
      ),
      timeout: proxyTimeoutMs,
    },
    (targetRes) => {
      const contentType = String(targetRes.headers["content-type"] || "").toLowerCase();
      if (contentType.includes("text/event-stream")) {
        targetReq.setTimeout(0);
      }

      res.writeHead(targetRes.statusCode || 502, relayedResponseHeaders(role, targetRes.headers));
      // pipe() never ends the client on an upstream error; destroy it so the client fails fast.
      targetRes.on("error", () => res.destroy());
      targetRes.pipe(res);
    }
  );

  targetReq.on("timeout", () => {
    targetReq.destroy();
    if (res.headersSent) return;
    res.writeHead(504, { "content-type": "application/json" });
    res.end(
      relayErrorBody(
        role,
        "api_bridge_timeout",
        `Proxy request timed out after ${proxyTimeoutMs}ms`
      )
    );
  });

  targetReq.on("error", (error) => {
    if (res.headersSent) return;
    res.writeHead(502, { "content-type": "application/json" });
    res.end(relayErrorBody(role, "api_bridge_unavailable", String(error.message || error)));
  });

  req.on("aborted", () => {
    targetReq.destroy();
  });

  req.pipe(targetReq);
}

function writeUpgradeProxyError(socket: net.Socket, status: number, body: string): void {
  if (!socket.writable || socket.destroyed) return;
  const buffer = Buffer.from(body, "utf8");
  const response = [
    `HTTP/1.1 ${status} ${http.STATUS_CODES[status] || "Error"}`,
    "Connection: close",
    "Content-Type: application/json; charset=utf-8",
    `Content-Length: ${buffer.length}`,
    "",
    "",
  ].join("\r\n");

  // A reset while the answer is written closes the socket here.
  socket.on("error", () => socket.destroy());
  socket.write(response);
  // The server socket allows half-open connections: close it fully once the answer is written.
  socket.end(buffer, () => socket.destroy());
}

/** Header lines for an upgrade request relayed to the dashboard, from the client's raw headers. */
export function buildBridgeUpgradeHeaderLines(
  rawHeaders: string[],
  remoteAddress: string | undefined,
  dashboardPort: number
): string[] {
  const policy = resolveClientPolicy(remoteAddress);
  const headerLines: string[] = [];
  const forwardedFor: string[] = [];
  let wroteHost = false;

  for (let index = 0; index < rawHeaders.length; index += 2) {
    const name = rawHeaders[index];
    const rawValue = rawHeaders[index + 1] || "";
    const lowerName = name.toLowerCase();
    if (lowerName === "host") {
      headerLines.push(`Host: 127.0.0.1:${dashboardPort}`);
      wroteHost = true;
    } else if (policy.kind === "remote" && FORWARDING_HEADERS.has(lowerName)) {
      continue;
    } else if (policy.kind === "trusted-proxy" && lowerName === "x-forwarded-for") {
      forwardedFor.push(rawValue);
    } else {
      headerLines.push(`${name}: ${rawValue}`);
    }
  }

  if (!wroteHost) {
    headerLines.push(`Host: 127.0.0.1:${dashboardPort}`);
  }
  if (policy.kind === "remote") {
    headerLines.push(`X-Forwarded-For: ${policy.peer}`);
  } else if (policy.kind === "trusted-proxy") {
    headerLines.push(`X-Forwarded-For: ${[...forwardedFor, policy.peer].join(", ")}`);
  }
  return headerLines;
}

function proxyUpgrade(
  req: IncomingMessage,
  socket: net.Socket,
  head: Buffer,
  dashboardPort: number
) {
  // Built now: once the client disconnects, the socket no longer reports its address.
  const requestLine = `${req.method || "GET"} ${req.url || "/"} HTTP/${req.httpVersion || "1.1"}`;
  const headerLines = [
    requestLine,
    ...buildBridgeUpgradeHeaderLines(req.rawHeaders, req.socket.remoteAddress, dashboardPort),
  ];
  const upstream = net.connect(dashboardPort, "127.0.0.1");

  upstream.on("connect", () => {
    upstream.write(`${headerLines.join("\r\n")}\r\n\r\n`);
    if (head.length > 0) {
      upstream.write(head);
    }

    socket.pipe(upstream);
    upstream.pipe(socket);
  });

  upstream.on("error", (error) => {
    writeUpgradeProxyError(
      socket,
      502,
      JSON.stringify({
        error: "api_bridge_upgrade_failed",
        detail: String(error.message || error),
      })
    );
  });

  socket.on("error", () => {
    upstream.destroy();
  });

  socket.on("close", () => {
    upstream.destroy();
  });
}

declare global {
  var __omnirouteApiBridgeStarted: boolean | undefined;
  // undefined: never attempted. null: off or refused.
  var __omnirouteQuotaPanelServer: http.Server | null | undefined;
}

/**
 * Creates the bridge server for a role. `serverOptions`, when given, is passed to
 * `http.createServer`. Without it the server is created with the defaults.
 */
export function createApiBridgeServer(
  dashboardPort: number,
  role: BridgeRole = API_BRIDGE_ROLE,
  serverOptions?: http.ServerOptions
): http.Server {
  const handleRequest: http.RequestListener = (req, res) => {
    // Absorb client-abort errors (browser closes the socket during navigation/
    // HMR/bfcache) on the request/response streams so they never surface as an
    // uncaughtException that kills the server (#fix-dev-server-aborted).
    attachRequestStreamGuards(req, res);

    const decision = bridgeRequestDecision(role, req.method, req.url || "/", req.headers);
    if (decision !== "relay") {
      const headers: http.OutgoingHttpHeaders = { "content-type": "application/json" };
      if (decision === "refuse-and-close") headers.connection = "close";
      res.writeHead(404, headers);
      res.end(notFoundBody(role));
      return;
    }

    proxyRequest(req, res, dashboardPort, role);
  };
  const server = serverOptions
    ? http.createServer(serverOptions, handleRequest)
    : http.createServer(handleRequest);
  server.requestTimeout = API_BRIDGE_TIMEOUTS.serverRequestTimeoutMs;
  server.headersTimeout = API_BRIDGE_TIMEOUTS.serverHeadersTimeoutMs;
  server.keepAliveTimeout = API_BRIDGE_TIMEOUTS.serverKeepAliveTimeoutMs;
  server.setTimeout(API_BRIDGE_TIMEOUTS.serverSocketTimeoutMs);
  server.on("upgrade", (req, socket, head) => {
    if (!role.relayUpgrades || !isRelayableRequest(role, req.method, req.url || "/")) {
      writeUpgradeProxyError(socket, 404, notFoundBody(role));
      return;
    }

    proxyUpgrade(req, socket, head, dashboardPort);
  });
  return server;
}

/**
 * Starts the quota panel listener when QUOTA_PANEL_PORT asks for it.
 *
 * Returns null when the variable is unset or refused. A bind failure logs a warning and leaves
 * the returned server not listening, and it is not retried. Nothing here throws. The listener
 * has its own connection limit and client timeouts (`QUOTA_PANEL_*` in quotaPanelBridge.ts).
 */
export function startQuotaPanelListener(
  env: Record<string, string | undefined> = process.env,
  ports: { apiPort: number; dashboardPort: number } = getRuntimePorts()
): http.Server | null {
  const decision = resolveQuotaPanelListener(env, ports);
  if (decision.kind === "off") return null;
  if (decision.kind === "refused") {
    console.warn(`[Quota Panel] ${decision.warning}`);
    return null;
  }

  const { port, host, basePath } = decision;
  const { dashboardPort } = ports;
  // The server checks the header and request timeouts on this interval.
  const server = createApiBridgeServer(dashboardPort, createQuotaPanelRole(basePath), {
    connectionsCheckingInterval: QUOTA_PANEL_TIMEOUT_CHECK_INTERVAL_MS,
  });
  server.maxConnections = QUOTA_PANEL_MAX_CONNECTIONS;
  server.headersTimeout = QUOTA_PANEL_HEADERS_TIMEOUT_MS;
  server.requestTimeout = QUOTA_PANEL_REQUEST_TIMEOUT_MS;
  server.keepAliveTimeout = QUOTA_PANEL_KEEP_ALIVE_TIMEOUT_MS;
  // An idle socket, in either direction, is closed after this long.
  server.setTimeout(QUOTA_PANEL_SOCKET_TIMEOUT_MS);
  let listening = false;
  server.on("error", (error: NodeJS.ErrnoException) => {
    if (listening) {
      console.warn("[Quota Panel] Listener error:", error?.code || error?.message || error);
    } else if (error?.code === "EADDRINUSE") {
      console.warn(`[Quota Panel] Port ${port} is already in use. The quota panel port stays off.`);
    } else {
      console.warn("[Quota Panel] Failed to start:", error?.message || error);
    }
  });
  server.listen(port, host, () => {
    listening = true;
    console.log(`[Quota Panel] Listening on ${host}:${port} -> dashboard:${dashboardPort}`);
    if (!isLoopbackBindHost(host)) {
      console.warn(
        `[Quota Panel] Bound to ${host}. This port serves plain HTTP and the page sends API keys. Put a TLS reverse proxy in front of it.`
      );
    }
  });
  return server;
}

function initQuotaPanelServer(): void {
  if (globalThis.__omnirouteQuotaPanelServer !== undefined) return;
  globalThis.__omnirouteQuotaPanelServer = startQuotaPanelListener();
}

export function initApiBridgeServer(): void {
  // Safety net: a client aborting a connection can emit `Error: aborted`/
  // ECONNRESET on the request stream; without this the single missed listener
  // becomes an uncaughtException that kills the server. Benign aborts are
  // swallowed; genuine errors still crash loudly (#fix-dev-server-aborted).
  installProcessCrashGuard();
  // The quota panel listener starts on its own, also when the API port is not split.
  initQuotaPanelServer();
  if (globalThis.__omnirouteApiBridgeStarted) return;

  const { apiPort, dashboardPort } = getRuntimePorts();
  if (apiPort === dashboardPort) return;

  const host = process.env.API_HOST || "127.0.0.1";
  warnIfNonLoopbackWithoutApiKey("API bridge", host);

  const server = createApiBridgeServer(dashboardPort);
  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error?.code === "EADDRINUSE") {
      console.warn(
        `[API Bridge] Port ${apiPort} is already in use. API bridge disabled. (dashboard: ${dashboardPort})`
      );
      return;
    }
    console.warn("[API Bridge] Failed to start:", error?.message || error);
  });

  server.listen(apiPort, host, () => {
    globalThis.__omnirouteApiBridgeStarted = true;
    console.log(`[API Bridge] Listening on ${host}:${apiPort} -> dashboard:${dashboardPort}`);
  });
}
