// One conversion from a stored proxy record to Playwright's proxy options.
// `browserPool` and the executor proxy path both need it, and one copy keeps
// them from drifting on the scheme or on credential handling.

import type { LaunchOptions } from "playwright";
import { isRelayProxyType } from "../../src/lib/db/proxies/mappers.ts";

export type PlaywrightProxy = NonNullable<LaunchOptions["proxy"]>;

interface ProxyRecordLike {
  type?: unknown;
  host?: unknown;
  port?: unknown;
  username?: unknown;
  password?: unknown;
}

const SOCKS5_TYPES = new Set(["socks5", "socks5h"]);
const SOCKS4_TYPES = new Set(["socks4", "socks4a"]);

export function isSocks5Type(record: ProxyRecordLike): boolean {
  return typeof record.type === "string" && SOCKS5_TYPES.has(record.type.toLowerCase());
}

export function isRelayProxyRecord(record: ProxyRecordLike): boolean {
  // Stored types are lower-case in practice, but the socks predicate next to
  // this one lowercases, so a mixed-case row must not slip through as http.
  return isRelayProxyType(
    typeof record.type === "string" ? record.type.toLowerCase() : record.type
  );
}

/**
 * The host and port a record actually carries, or null when it has none.
 * Shared so the Playwright URL and the SOCKS handshake read the same values.
 */
export function proxyAuthority(record: ProxyRecordLike): { host: string; port: number } | null {
  const host = typeof record.host === "string" ? record.host.trim() : "";
  const port = Number(record.port);
  if (!host || !Number.isInteger(port) || port <= 0 || port > 65535) return null;
  return { host, port };
}

function schemeFor(type: unknown): string {
  const normalized = typeof type === "string" ? type.toLowerCase().trim() : "";
  // A record without a type predates the field and was an HTTP proxy. Anything else unknown
  // must fail closed: sending a typo'd or unsupported scheme to Chromium as HTTP silently
  // connects through a proxy the operator never chose.
  if (!normalized || normalized === "http") return "http";
  if (SOCKS5_TYPES.has(normalized)) return "socks5";
  if (SOCKS4_TYPES.has(normalized)) return "socks4";
  if (normalized === "https") return "https";
  throw new Error(`Unsupported proxy type "${normalized}"; refusing to treat it as an HTTP proxy`);
}

// Chromium takes the proxy as a URL, so an IPv6 literal has to be bracketed
// there; the SOCKS handshake keeps the bare address.
function authorityHost(host: string): string {
  return host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
}

export function toPlaywrightProxy(record: ProxyRecordLike): PlaywrightProxy | null {
  // Edge relays (vercel/deno/cloudflare) answer their own protocol with
  // x-relay-* headers; they cannot proxy a browser CONNECT.
  if (isRelayProxyRecord(record)) return null;
  const authority = proxyAuthority(record);
  if (!authority) return null;
  const proxy: PlaywrightProxy = {
    server: `${schemeFor(record.type)}://${authorityHost(authority.host)}:${authority.port}`,
  };
  if (record.username) {
    proxy.username = String(record.username);
    proxy.password = record.password == null ? "" : String(record.password);
  }
  return proxy;
}
