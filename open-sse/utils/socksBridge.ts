// Loopback HTTP bridge in front of one authenticated SOCKS5 upstream.
//
// Chromium implements no SOCKS5 authentication method, so a proxy that asks for
// a username and password cannot be handed to Playwright directly. This bridge
// speaks plain HTTP CONNECT to the browser and performs the SOCKS5 handshake
// itself. The browser only ever sees http://127.0.0.1:<port>.

import { randomBytes, timingSafeEqual } from "node:crypto";
import http from "node:http";
import net from "node:net";
import type { Duplex } from "node:stream";
import { SocksClient } from "socks";
import {
  buildSocksFamilySocketOptions,
  resolveSocksHandshakeTimeoutMs,
} from "./socksConnectorWithFamily.ts";

export interface SocksBridgeCredential {
  host: string;
  port: number;
  username: string;
  password: string;
  /** Address family for the hop to the proxy; null means let the runtime choose. */
  family?: 4 | 6 | null;
}

export interface SocksBridge {
  /**
   * `http://<user>:<secret>@127.0.0.1:<port>` — the only value that may reach
   * Playwright. The userinfo is the per-bridge credential the listener demands,
   * so another local process cannot borrow this upstream.
   */
  server: string;
  port: number;
  close(): Promise<void>;
}

interface BridgeRecord {
  key: string;
  secret: string;
  refs: number;
  port: number;
  server: http.Server;
  sockets: Set<Duplex>;
  closed: boolean;
}

const bridges = new Map<string, BridgeRecord>();

// Upper bound on how long a teardown may wait for connections to drain.
const SHUTDOWN_GRACE_MS = 1000;

function credentialKey(credential: SocksBridgeCredential): string {
  return JSON.stringify([
    credential.host,
    credential.port,
    credential.username,
    credential.password,
    credential.family ?? null,
  ]);
}

// A CONNECT target is an authority, never an absolute URL: `host:port`, with an
// IPv6 literal bracketed the way Chromium writes it. Returns null for anything
// else so the caller answers 405 without dialing.
function parseAuthority(target: string | undefined): { host: string; port: number } | null {
  if (!target) return null;
  const colon = target.lastIndexOf(":");
  if (colon <= 0 || colon === target.length - 1) return null;
  const portText = target.slice(colon + 1);
  if (!/^\d+$/.test(portText)) return null;
  const port = Number(portText);
  if (port <= 0 || port > 65535) return null;
  let host = target.slice(0, colon);
  if (host.startsWith("[") || host.endsWith("]")) {
    if (!host.startsWith("[") || !host.endsWith("]")) return null;
    host = host.slice(1, -1);
    if (net.isIP(host) !== 6) return null;
    // The SOCKS request carries the bare address; a domain name cannot contain
    // a colon, so a bracketed non-address is a malformed target.
  } else if (host.includes(":")) {
    return null;
  }
  if (!host || /[\s@"[\]/%]/.test(host)) return null;
  return { host, port };
}

function rejectConnect(socket: Duplex): void {
  socket.end("HTTP/1.1 405 Method Not Allowed\r\nContent-Length: 0\r\n\r\n");
}

// The bridge hands Playwright a URL with its own userinfo, so a browser that
// was given the handle answers every CONNECT with that Basic credential. A
// local process that merely found the port has no way to produce it.
function hasBridgeCredential(req: http.IncomingMessage, secret: string): boolean {
  const presented = req.headers["proxy-authorization"];
  if (typeof presented !== "string") return false;
  const expected = `Basic ${Buffer.from(`forge:${secret}`).toString("base64")}`;
  const given = Buffer.from(presented);
  const wanted = Buffer.from(expected);
  return given.length === wanted.length && timingSafeEqual(given, wanted);
}

function rejectUnauthorized(socket: Duplex): void {
  socket.end(
    'HTTP/1.1 407 Proxy Authentication Required\r\nProxy-Authenticate: Basic realm="forge"\r\nContent-Length: 0\r\n\r\n'
  );
}

/** In-flight listens, so concurrent callers for one credential share a port. */
const opening = new Map<string, Promise<BridgeRecord>>();

// RFC 1929 writes each credential field behind a one-byte length prefix. A
// longer value makes the socks library throw from inside a socket data
// handler, where no caller can catch it, so it is refused up front.
function assertCredentialFits(credential: SocksBridgeCredential): void {
  const userBytes = Buffer.byteLength(credential.username, "utf8");
  const passwordBytes = Buffer.byteLength(credential.password, "utf8");
  if (userBytes > 255 || passwordBytes > 255) {
    throw new Error(
      "[SocksBridge] SOCKS5 credential exceeds the 255-byte length prefix; refusing the proxy"
    );
  }
  if (!Number.isInteger(credential.port) || credential.port <= 0 || credential.port > 65535) {
    throw new Error("[SocksBridge] SOCKS5 proxy has no usable port; refusing the proxy");
  }
}

// A credential arrives from stored JSON or a caller's literal. Normalising it
// to plain strings keeps a Buffer or a later mutation from reaching the socks
// client, whose length arithmetic assumes strings.
function normalizeCredential(credential: SocksBridgeCredential): SocksBridgeCredential {
  return {
    host: credential.host == null ? "" : String(credential.host),
    port: Number(credential.port),
    username: credential.username == null ? "" : String(credential.username),
    password: credential.password == null ? "" : String(credential.password),
    family: credential.family === 4 || credential.family === 6 ? credential.family : null,
  };
}

/**
 * Return the bridge for this credential, creating it on first use.
 * Callers that share a credential share the bridge; each caller must close its
 * own handle once it no longer needs it.
 */
export async function acquireSocksBridge(credential: SocksBridgeCredential): Promise<SocksBridge> {
  const normalized = normalizeCredential(credential);
  assertCredentialFits(normalized);
  const key = credentialKey(normalized);
  const existing = bridges.get(key);
  if (existing) {
    existing.refs += 1;
    return handleFor(key, existing);
  }

  // Concurrent callers for one credential share a single listen. The second
  // waits instead of opening a listener nobody will close.
  let created = opening.get(key);
  if (!created) {
    created = listen(key, normalized);
    opening.set(key, created);
    // `then` with both handlers, not `finally`: a rejected listen must not
    // leave a derived promise rejected with no handler of its own. This also
    // clears the entry before an awaiting caller resumes, so a failure is
    // never cached for the next caller.
    const clearOpening = () => {
      if (opening.get(key) === created) opening.delete(key);
    };
    void created.then(clearOpening, clearOpening);
  }
  const record = await created;

  const winner = bridges.get(key);
  if (winner) {
    winner.refs += 1;
    return handleFor(key, winner);
  }
  record.refs = 1;
  bridges.set(key, record);
  return handleFor(key, record);
}

// One handle per caller. A caller that closes twice releases once; the handle's
// own flag is the guard, so it cannot drain another caller's reference.
function handleFor(key: string, record: BridgeRecord): SocksBridge {
  let released = false;
  return {
    server: `http://forge:${record.secret}@127.0.0.1:${record.port}`,
    port: record.port,
    close: async () => {
      if (released) return;
      released = true;
      record.refs -= 1;
      if (record.refs === 0) await shutdown(key, record);
    },
  };
}

function listen(key: string, credential: SocksBridgeCredential): Promise<BridgeRecord> {
  const sockets = new Set<Duplex>();
  const record: BridgeRecord = {
    key,
    secret: randomBytes(18).toString("base64url"),
    refs: 0,
    port: 0,
    server: http.createServer(),
    sockets,
    closed: false,
  };
  const { server } = record;

  // Node drops its own error handler from an accepted CONNECT socket, so a
  // reset between accept and the tunnel would surface as an uncaught exception
  // instead of a closed connection.
  server.on("connection", (socket: Duplex) => {
    sockets.add(socket);
    socket.on("close", () => sockets.delete(socket));
    socket.on("error", () => socket.destroy());
  });
  server.on("connect", (req, client, head) => {
    // The listener is reachable by every process on the host, so it demands the
    // per-bridge secret. Without this any local process could ride the SOCKS5
    // upstream we authenticated, to any destination it likes.
    if (!hasBridgeCredential(req, record.secret)) {
      rejectUnauthorized(client);
      return;
    }
    const authority = parseAuthority(req.url);
    if (!authority) {
      rejectConnect(client);
      return;
    }
    void dial(credential, authority, client, record, head);
  });
  server.on("request", (_req, res) => {
    res.writeHead(405);
    res.end();
  });

  return new Promise((resolve, reject) => {
    const onListenError = (error: Error) => reject(error);
    server.once("error", onListenError);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", onListenError);
      // After listen there is no caller to reject. Drop the bridge rather than
      // leave an unhandled 'error' event to crash the process.
      server.on("error", () => {
        void shutdown(record.key, record);
      });
      const address = server.address();
      if (!address || typeof address === "string") {
        // The socket is already bound; closing it keeps the failure from
        // leaving a listener nobody can reach through the registry.
        server.close();
        reject(new Error("bridge listen returned no port"));
        return;
      }
      record.port = address.port;
      resolve(record);
    });
  });
}

async function dial(
  credential: SocksBridgeCredential,
  target: { host: string; port: number },
  client: Duplex,
  record: BridgeRecord,
  head: Buffer
): Promise<void> {
  if (record.closed || client.destroyed) {
    client.destroy();
    return;
  }
  try {
    const connection = await SocksClient.createConnection({
      command: "connect",
      timeout: resolveSocksHandshakeTimeoutMs(),
      destination: { host: target.host, port: target.port },
      socket_options: buildSocksFamilySocketOptions(credential.family ?? null) as never,
      proxy: {
        host: credential.host,
        port: credential.port,
        type: 5,
        userId: credential.username,
        password: credential.password,
      },
    });
    const upstream = connection.socket;
    // The bridge can shut down while the handshake is in flight; without this
    // check the socket would be opened after teardown and nothing would own it.
    if (record.closed || client.destroyed) {
      upstream.destroy();
      return;
    }
    record.sockets.add(upstream);
    upstream.on("close", () => record.sockets.delete(upstream));
    const drop = () => {
      upstream.destroy();
      client.destroy();
    };
    upstream.on("error", drop);
    client.on("error", drop);
    client.write("HTTP/1.1 200 Connection Established\r\n\r\n");
    // Bytes a client sent right behind the CONNECT headers belong to the
    // tunnel; HTTP parsing hands them over separately instead of in the stream.
    if (head.length > 0) upstream.write(head);
    upstream.pipe(client);
    client.pipe(upstream);
  } catch {
    if (!client.destroyed) {
      client.end("HTTP/1.1 502 Bad Gateway\r\nContent-Length: 0\r\n\r\n");
    }
  }
}

async function shutdown(key: string, record: BridgeRecord): Promise<void> {
  record.closed = true;
  // Only drop the entry this record owns: a stale handle must not evict a
  // successor that was built for the same credential after a teardown.
  if (bridges.get(key) === record) bridges.delete(key);
  // Upgraded CONNECT sockets survive server.close(), and a client that
  // connected but never wrote would keep it pending too.
  for (const socket of record.sockets) socket.destroy();
  record.sockets.clear();
  record.server.closeAllConnections();
  await new Promise<void>((resolve) => {
    const timer = setTimeout(resolve, SHUTDOWN_GRACE_MS);
    timer.unref();
    record.server.close(() => {
      clearTimeout(timer);
      resolve();
    });
  });
}

/** Test teardown: close every bridge, including a listen still in flight. */
export async function closeAllSocksBridges(): Promise<void> {
  const pending = [...opening.values()];
  const records = [...bridges.entries()];
  await Promise.all(records.map(([key, record]) => shutdown(key, record)));
  // A listen that was still in flight has no registry entry yet; once it
  // settles it would otherwise stay open past the teardown.
  await Promise.allSettled(pending);
  const late = [...bridges.entries()];
  await Promise.all(late.map(([key, record]) => shutdown(key, record)));
}

/** Visible for tests that assert no bridge was built. */
export function socksBridgeCount(): number {
  return bridges.size;
}
