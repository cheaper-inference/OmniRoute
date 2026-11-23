// Turns a stored proxy value into what Playwright should use for a gemini-web
// context. Chromium implements no SOCKS5 authentication, so an authenticated
// SOCKS5 upstream is fronted by a loopback HTTP bridge; every other proxy is
// handed over unchanged.

import {
  acquireSocksBridge,
  type SocksBridge,
  type SocksBridgeCredential,
} from "./socksBridge.ts";
import { parseProxyFamily, stripIpv6Brackets, detectIpLiteralFamily } from "./proxyFamily.ts";
import { decodeUserinfo } from "../../src/shared/utils/decodeUserinfo.ts";
import {
  isRelayProxyRecord,
  isSocks5Type,
  proxyAuthority,
  toPlaywrightProxy,
  type PlaywrightProxy,
} from "./playwrightProxy.ts";

export interface ResolvedProxy {
  type?: string;
  host?: string;
  port?: number | string;
  username?: string | null;
  password?: string | null;
  family?: string | null;
}

const PROXY_PROTOCOLS = new Set(["http", "https", "socks4", "socks4a", "socks5", "socks5h"]);

// The same default ports the fetch-side normalizer uses. Schemes are a superset
// here on purpose: a browser can use socks4/socks5h directly, and the SOCKS5
// enable flag guards the fetch dispatcher, not a browser proxy.
const DEFAULT_PORTS: Record<string, number> = {
  http: 8080,
  https: 443,
  socks4: 1080,
  socks4a: 1080,
  socks5: 1080,
  socks5h: 1080,
};

// `new URL()` drops a port that matches the scheme default, so ":80" would
// otherwise fall through to the proxy default below.
function explicitPort(raw: string): string | null {
  const afterScheme = raw.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "");
  const authority = afterScheme.split(/[/?#]/, 1)[0];
  const match = authority.match(/:(\d+)$/);
  return match ? match[1] : null;
}

// Legacy config levels store a proxy as a URL string instead of a record. A
// string that carries a proxy but cannot be read is an error, not a reason to
// go direct.
export function parseProxyUrl(raw: string): ResolvedProxy {
  const trimmed = raw.trim();
  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    throw new Error("[ExecutorProxy] Invalid proxy URL; refusing a direct connection");
  }
  const type = url.protocol.replace(/:$/, "").toLowerCase();
  if (!PROXY_PROTOCOLS.has(type)) {
    // Never echo the scheme: a string without "//" parses its leading userinfo
    // as the scheme, and that text would land in the error message.
    throw new Error("[ExecutorProxy] Unsupported proxy scheme; refusing a direct connection");
  }
  const portText = explicitPort(trimmed) ?? url.port;
  const familyDirective = parseProxyFamily(url.searchParams.get("family"));
  const family = familyDirective === "auto" ? undefined : familyDirective;
  return {
    type,
    host: stripIpv6Brackets(url.hostname),
    port: portText ? Number(portText) : DEFAULT_PORTS[type],
    username: url.username ? decodeUserinfo(url.username) : "",
    password: url.password ? decodeUserinfo(url.password) : "",
    ...(family ? { family } : {}),
  };
}

function normalizeProxyValue(value: unknown): ResolvedProxy | null {
  if (value == null) return null;
  // An empty string is how a cleared legacy setting looks; it means "unset",
  // while a non-empty string that will not parse is a configuration error.
  if (typeof value === "string") return value.trim() ? parseProxyUrl(value) : null;
  if (typeof value === "object" && !Array.isArray(value)) return value as ResolvedProxy;
  throw new Error("[ExecutorProxy] Invalid proxy config; refusing a direct connection");
}

function hasSocksAuth(record: ResolvedProxy): boolean {
  if (!isSocks5Type(record)) return false;
  return record.username != null && String(record.username).length > 0;
}

// RFC 1929 has no password-only form. Dropping the password and handing
// Chromium an unauthenticated socks5 URL would silently change the egress
// identity, so an incomplete credential is refused instead.
function assertCredentialComplete(record: ResolvedProxy): void {
  if (!isSocks5Type(record)) return;
  const hasPassword = record.password != null && String(record.password).length > 0;
  if (!hasPassword) return;
  if (!hasSocksAuth(record)) {
    throw new Error(
      "[ExecutorProxy] SOCKS5 proxy has a password but no username; refusing a direct connection"
    );
  }
}

function familyOf(record: ResolvedProxy): 4 | 6 | null {
  const family = parseProxyFamily(record.family);
  if (family === "ipv4") return 4;
  if (family === "ipv6") return 6;
  return null;
}

// The fetch path refuses a record whose family directive contradicts a literal
// address; failing here keeps a contradictory row from silently pinning the
// wrong family.
function assertFamilyMatchesHost(record: ResolvedProxy): void {
  const family = familyOf(record);
  if (family === null) return;
  const host = typeof record.host === "string" ? stripIpv6Brackets(record.host.trim()) : "";
  const literal = host ? detectIpLiteralFamily(host) : null;
  if (literal !== null && literal !== family) {
    throw new Error(
      "[ExecutorProxy] Proxy family contradicts its literal address; refusing a direct connection"
    );
  }
}

function bridgeCredential(record: ResolvedProxy): SocksBridgeCredential {
  const authority = proxyAuthority(record);
  if (!authority) {
    throw new Error(
      "[ExecutorProxy] SOCKS5 proxy has no usable host and port; refusing a direct connection"
    );
  }
  return {
    // Registry rows may carry the bracketed form; the SOCKS hop wants the bare
    // address, the same way the fetch-side connector reads it.
    host: stripIpv6Brackets(authority.host),
    port: authority.port,
    username: String(record.username),
    password: record.password == null ? "" : String(record.password),
    family: familyOf(record),
  };
}

interface ProxyResolution {
  proxy: PlaywrightProxy | undefined;
  bridge: SocksBridge | null;
}

/**
 * Resolve the proxy Playwright should use for one account.
 *
 * An authenticated SOCKS5 proxy comes back as a loopback HTTP bridge and the
 * caller must close `bridge` when the context is done. Any other proxy comes
 * back unchanged, with `bridge` null. A missing value resolves to no proxy; a
 * value that carries a proxy but cannot be used is an error, never a silent
 * direct connection.
 */
export async function resolveExecutorProxy(value: unknown): Promise<ProxyResolution> {
  const record = normalizeProxyValue(value);
  if (!record) return { proxy: undefined, bridge: null };
  if (isRelayProxyRecord(record)) {
    throw new Error(
      "[ExecutorProxy] Edge relay proxies cannot carry a browser connection; refusing a direct connection"
    );
  }
  assertFamilyMatchesHost(record);
  assertCredentialComplete(record);
  if (hasSocksAuth(record)) {
    const bridge = await acquireSocksBridge(bridgeCredential(record));
    return { proxy: { server: bridge.server }, bridge };
  }
  const proxy = toPlaywrightProxy(record);
  if (!proxy) {
    throw new Error(
      "[ExecutorProxy] Proxy has no usable host and port; refusing a direct connection"
    );
  }
  return { proxy, bridge: null };
}
