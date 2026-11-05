"use strict";

/**
 * Cleartext HTTP/2 (`h2c`) upgrade guard.
 *
 * HTTP/1.1 clients that prefer HTTP/2 — notably the JDK `java.net.http.HttpClient`
 * used by the JetBrains IDEs / Air ("Add an AI provider" connection test) —
 * open a plain-TCP connection with the RFC 9113 §3.2 upgrade handshake:
 *
 *   POST /v1/messages HTTP/1.1
 *   Connection: Upgrade, HTTP2-Settings
 *   Upgrade: h2c
 *   HTTP2-Settings: <base64url>
 *
 * As soon as an `upgrade` listener is registered on a Node `http.Server` (our
 * WebSocket wrappers and Next both register one), Node delivers EVERY request
 * that carries an `Upgrade` header to it instead of `request`. Nothing claims
 * `h2c`, so the socket was closed without a single response byte and the
 * client reported "HTTP/1.1 header parser received no bytes".
 *
 * RFC 9110 §7.8 explicitly allows a server to ignore `Upgrade` and keep
 * answering in HTTP/1.1; the client then simply carries on in HTTP/1.1. This
 * guard does exactly that, for requests whose ONLY offered protocol is `h2c`:
 * shouldUpgradeCallback rejects that upgrade and removes the negotiation
 * headers from the normalized request headers, keeping its body in Node's
 * HTTP/1 parser. Older runtimes use the upgrade-listener replay fallback, so
 * the regular request pipeline (peer stamp, method/HEAD guards, Next) serves it.
 *
 * What is deliberately NOT touched:
 *   - Anything that offers another protocol (`websocket`, `h2c, websocket`, …)
 *     keeps flowing to the existing upgrade handlers unchanged.
 *   - TLS connections: RFC 9113 §3.1 forbids the h2c upgrade over https, so we
 *     never rewrite there and the existing behaviour is preserved.
 *
 * Wired into both `standalone-server-ws.mjs` (production: `omniroute serve`,
 * Docker, Electron) and `run-next.mjs` (`npm start` / dev).
 */

// Header names (lowercase) that only exist to negotiate the h2c upgrade.
const NEGOTIATION_HEADERS = new Set(["upgrade", "http2-settings"]);

function offeredUpgradeProtocols(req) {
  const raw = req && req.headers ? req.headers.upgrade : undefined;
  const value = Array.isArray(raw) ? raw.join(",") : raw;
  return String(value || "")
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * True when the request offers `h2c` and nothing else, on a cleartext socket.
 *
 * @param {{ headers?: Record<string, string | string[] | undefined> }} req
 * @param {{ encrypted?: boolean } | undefined} socket
 */
function isCleartextH2cUpgrade(req, socket) {
  if (socket && socket.encrypted) return false;
  const protocols = offeredUpgradeProtocols(req);
  return protocols.length > 0 && protocols.every((protocol) => protocol === "h2c");
}

// `Connection: keep-alive, Upgrade, HTTP2-Settings` -> `keep-alive`; null when empty.
function stripNegotiationTokens(connectionValue) {
  const kept = String(connectionValue)
    .split(",")
    .map((token) => token.trim())
    .filter((token) => token && !NEGOTIATION_HEADERS.has(token.toLowerCase()));
  return kept.length > 0 ? kept.join(", ") : null;
}

// Rebuild the request head from `rawHeaders` (preserves case, order and duplicates).
function serializeRequestHead(req) {
  let head = `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`;
  const raw = req.rawHeaders;
  for (let i = 0; i + 1 < raw.length; i += 2) {
    const name = raw[i];
    const lower = name.toLowerCase();
    if (NEGOTIATION_HEADERS.has(lower)) continue;
    let value = raw[i + 1];
    if (lower === "connection") {
      value = stripNegotiationTokens(value);
      if (value === null) continue;
    }
    head += `${name}: ${value}\r\n`;
  }
  return Buffer.from(`${head}\r\n`, "latin1");
}

/** Remove negotiation headers before dispatching the ordinary HTTP/1 request. */
function stripH2cRequestHeaders(req) {
  // Keep rawHeaders intact: Node 26 still reads its wire representation after
  // shouldUpgradeCallback returns, using an internal count. Application code
  // consumes these normalized headers instead.
  const headers = req.headers;
  const distinct = req.headersDistinct;
  for (const name of NEGOTIATION_HEADERS) {
    delete headers[name];
    if (distinct) delete distinct[name];
  }
  const connection = stripNegotiationTokens(headers.connection || "");
  if (connection === null) {
    delete headers.connection;
    if (distinct) delete distinct.connection;
  } else {
    headers.connection = connection;
    if (distinct) distinct.connection = [connection];
  }
}

/**
 * Keep h2c inside Node's HTTP/1 parser, including streaming/chunked bodies.
 * Node 26 separates request-body bytes from the upgrade Duplex; replaying only
 * its `head` loses the body. Older runtimes that ignore shouldUpgradeCallback
 * retain the upgrade-listener fallback below.
 */
function createH2cUpgradeCallback(getServer, previous) {
  if (previous !== undefined && typeof previous !== "function") {
    throw new TypeError("shouldUpgradeCallback must be a function");
  }
  return function shouldUpgrade(req) {
    if (isCleartextH2cUpgrade(req, req.socket)) {
      stripH2cRequestHeaders(req);
      return false;
    }
    const server = getServer();
    return typeof previous === "function"
      ? previous.call(server, req)
      : server.listenerCount("upgrade") > 0;
  };
}

/**
 * Serve an h2c upgrade request as plain HTTP/1.1.
 *
 * @param {import("node:http").Server} server
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:net").Socket} socket
 * @param {Buffer} head bytes Node already read past the request head (start of the body)
 * @returns {boolean} true when the request was re-injected (the caller must stop),
 *   false when it is not an h2c upgrade (the caller continues unchanged).
 */
function handleH2cUpgrade(server, req, socket, head) {
  if (!isCleartextH2cUpgrade(req, socket)) return false;
  const requestHead = serializeRequestHead(req);
  socket.unshift(head && head.length > 0 ? Buffer.concat([requestHead, head]) : requestHead);
  server.emit("connection", socket);
  return true;
}

module.exports = { isCleartextH2cUpgrade, handleH2cUpgrade, createH2cUpgradeCallback };
