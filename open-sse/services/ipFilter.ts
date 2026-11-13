/**
 * IP Filter Middleware — Phase 6
 *
 * IP-based access control with blacklist, whitelist, priority modes, and temporary bans.
 */

import { isIP } from "node:net";
import { getDbInstance } from "../../src/lib/db/core.ts";

// In-memory IP lists
let _config = {
  enabled: false,
  mode: "blacklist",
  blacklist: new Set(),
  whitelist: new Set(),
  tempBans: new Map(),
};

// Persistence (#6131): the config used to live in memory only, so every restart
// (i.e. every OmniRoute update) reset it to Disabled + empty lists. It is now
// persisted to the key_value table (namespace 'ipFilter', key 'config') and
// lazily loaded on first access. better-sqlite3 is synchronous, so both the load
// and the save stay in the sync hot path without extra startup wiring. tempBans
// are intentionally NOT persisted — they are ephemeral, TTL-swept runtime state.
//
// D2 (#9033): the _loaded one-shot gate was removed so a config persisted by the
// dashboard settings route (a separate module instance, since @omniroute/open-sse
// is bundled per-entry via transpilePackages) propagates to the proxy runtime
// without a restart. A DB failure still degrades to the in-memory defaults, and
// tempBans remain in-memory-only as before.
const IP_FILTER_NAMESPACE = "ipFilter";
const IP_FILTER_KEY = "config";

function ensureLoaded() {
  try {
    const row = getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(IP_FILTER_NAMESPACE, IP_FILTER_KEY) as { value?: string } | undefined;
    if (!row?.value) return;
    const parsed = JSON.parse(row.value) as {
      enabled?: boolean;
      mode?: string;
      blacklist?: string[];
      whitelist?: string[];
    };
    _config.enabled = parsed.enabled === true;
    if (typeof parsed.mode === "string") _config.mode = parsed.mode;
    _config.blacklist = new Set(Array.isArray(parsed.blacklist) ? parsed.blacklist : []);
    _config.whitelist = new Set(Array.isArray(parsed.whitelist) ? parsed.whitelist : []);
  } catch {
    // No DB / table yet — keep the in-memory defaults.
  }
}

function persist() {
  try {
    const payload = JSON.stringify({
      enabled: _config.enabled,
      mode: _config.mode,
      blacklist: Array.from(_config.blacklist),
      whitelist: Array.from(_config.whitelist),
    });
    getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run(IP_FILTER_NAMESPACE, IP_FILTER_KEY, payload);
  } catch {
    // Best-effort persistence: never let a DB write failure break the request path.
  }
}

const _tempBanSweep = setInterval(() => {
  const now = Date.now();
  const bans = _config.tempBans as Map<string, { until: number; reason: string }>;
  for (const [ip, entry] of bans) {
    if (now >= entry.until) bans.delete(ip);
  }
}, 60_000);
if (typeof _tempBanSweep === "object" && "unref" in _tempBanSweep) {
  (_tempBanSweep as { unref?: () => void }).unref?.();
}

/**
 * Configure the IP filter
 */
export function configureIPFilter(config) {
  ensureLoaded();
  if (config.enabled !== undefined) _config.enabled = config.enabled;
  if (config.mode) _config.mode = config.mode;
  if (config.blacklist) _config.blacklist = new Set(config.blacklist);
  if (config.whitelist) _config.whitelist = new Set(config.whitelist);
  persist();
}

/**
 * Get current IP filter config (for API)
 */
export function getIPFilterConfig() {
  ensureLoaded();
  return {
    enabled: _config.enabled,
    mode: _config.mode,
    blacklist: Array.from(_config.blacklist),
    whitelist: Array.from(_config.whitelist),
    tempBans: Array.from(_config.tempBans.entries()).map(([ip, info]) => ({
      ip,
      until: new Date(info.until).toISOString(),
      reason: info.reason,
      remainingMs: Math.max(0, info.until - Date.now()),
    })),
  };
}

/**
 * Check if an IP is allowed
 * @param {string} ip
 * @returns {{ allowed: boolean, reason?: string }}
 */
/**
 * Mode decision for an already-normalised address. Split out of `checkIP` to keep
 * that function under the cognitive-complexity ratchet.
 */
function decideByMode(ip) {
  switch (_config.mode) {
    case "whitelist":
      // A whitelist with no entries yet means the admin just switched mode and
      // could not save an entry otherwise; the first entry arms enforcement.
      if (_config.whitelist.size === 0) return { allowed: true };
      return matchesAny(ip, _config.whitelist)
        ? { allowed: true }
        : { allowed: false, reason: "IP not in whitelist" };

    case "whitelist-priority":
      if (matchesAny(ip, _config.whitelist)) return { allowed: true };
      return matchesAny(ip, _config.blacklist)
        ? { allowed: false, reason: "IP blacklisted" }
        : { allowed: true };

    case "blacklist":
    default:
      return matchesAny(ip, _config.blacklist)
        ? { allowed: false, reason: "IP blacklisted" }
        : { allowed: true };
  }
}

export function checkIP(ip) {
  ensureLoaded();
  if (!_config.enabled) return { allowed: true };
  if (!ip) return { allowed: true };

  const normalizedIP = normalizeIP(ip);

  // Check temp bans first (highest priority)
  const ban = _config.tempBans.get(normalizedIP);
  if (ban) {
    if (Date.now() < ban.until) {
      return { allowed: false, reason: `Temporarily banned: ${ban.reason}` };
    }
    _config.tempBans.delete(normalizedIP); // Expired
  }

  return decideByMode(normalizedIP);
}

/**
 * Temporarily ban an IP
 */
export function tempBanIP(ip, durationMs, reason = "Automated ban") {
  const normalizedIP = normalizeIP(ip);
  _config.tempBans.set(normalizedIP, {
    until: Date.now() + durationMs,
    reason,
  });
}

/**
 * Remove a temporary ban
 */
export function removeTempBan(ip) {
  _config.tempBans.delete(normalizeIP(ip));
}

/**
 * Add IP to blacklist
 */
export function addToBlacklist(ip) {
  ensureLoaded();
  _config.blacklist.add(normalizeIP(ip));
  persist();
}

/**
 * Remove IP from blacklist
 */
export function removeFromBlacklist(ip) {
  ensureLoaded();
  _config.blacklist.delete(normalizeIP(ip));
  persist();
}

/**
 * Add IP to whitelist
 */
export function addToWhitelist(ip) {
  ensureLoaded();
  _config.whitelist.add(normalizeIP(ip));
  persist();
}

/**
 * Remove IP from whitelist
 */
export function removeFromWhitelist(ip) {
  ensureLoaded();
  _config.whitelist.delete(normalizeIP(ip));
  persist();
}

/**
 * Express/Next.js middleware factory
 */
export function createIPFilterMiddleware() {
  return (req, res, next) => {
    const ip = extractClientIP(req);
    const { allowed, reason } = checkIP(ip);
    if (!allowed) {
      const statusCode = 403;
      if (res.status) {
        // Express
        return res.status(statusCode).json({ error: reason || "Access denied" });
      }
      // Raw response
      res.writeHead(statusCode, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: reason || "Access denied" }));
    }
    if (next) next();
  };
}

/**
 * For Next.js App Router — check IP from request object
 *
 * D1 (#9033): accepts an optional trustedPeerIp (resolved from the authenticated
 * peer stamp, available on direct connections where the proxy runtime has no
 * socket). When provided, it is checked FIRST before falling through to the
 * forwarding headers, so a blacklisted IP on a direct connection (no XFF, no
 * socket) is blocked. When behind a reverse proxy (via-proxy marker set), the
 * caller passes null so the XFF path continues to work.
 */
export function checkRequestIP(request, trustedPeerIp) {
  const ip =
    pickFirstValidIp(trustedPeerIp || null) ||
    pickFirstValidIp(request.headers?.get?.("cf-connecting-ip")) ||
    pickFirstValidIp(request.headers?.get?.("x-forwarded-for")) ||
    pickFirstValidIp(request.headers?.get?.("x-real-ip")) ||
    normalizeIP(request.ip || "") ||
    "unknown";
  return checkIP(ip);
}

// ─── Internal Helpers ───────────────────────────────────────────────────────

/** 16-byte form of an IPv6 literal, or null when it is not one. */
function ipv6ToBytes(ip) {
  let clean = ip.split("%")[0].trim().toLowerCase();
  if (isIP(clean) !== 6) return null;

  // A trailing dotted quad is two 16-bit groups; folding it first keeps the
  // group count arithmetic below honest.
  const dotted = /(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(clean);
  if (dotted) {
    const o = dotted.slice(1).map(Number);
    if (o.some((n) => n > 255)) return null;
    clean =
      clean.slice(0, dotted.index) +
      `${((o[0] << 8) | o[1]).toString(16)}:${((o[2] << 8) | o[3]).toString(16)}`;
  }

  const halves = clean.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 ? missing !== 0 : missing < 1) return null;

  const groups = [...head, ...new Array(halves.length === 2 ? missing : 0).fill("0"), ...tail];
  const out = Buffer.alloc(16);
  for (let i = 0; i < 8; i += 1) {
    const group = groups[i] ?? "0";
    if (!/^[0-9a-f]{1,4}$/.test(group)) return null;
    out.writeUInt16BE(Number.parseInt(group, 16), i * 2);
  }
  return out;
}

/** Full eight-group spelling, so every way of writing one address collapses to a single string. */
function expandIpv6(ip) {
  const bytes = ipv6ToBytes(ip);
  if (!bytes) return null;
  const groups = [];
  for (let i = 0; i < 8; i += 1) groups.push(bytes.readUInt16BE(i * 2).toString(16));
  return groups.join(":");
}

/**
 * Canonical text form used by EVERY comparison: trimmed, lowercased, zone id
 * dropped, IPv4-mapped IPv6 unwrapped and IPv6 fully expanded. Without this an
 * entry stored as `::1` never matched a peer reported as
 * `0:0:0:0:0:0:0:1`, which is the same address.
 */
function normalizeIP(ip) {
  if (!ip) return "";
  const value = ip.trim().replace(/^::ffff:/i, "");
  if (!value) return "";
  return expandIpv6(value) ?? value.toLowerCase();
}

function pickFirstValidIp(rawValue) {
  if (typeof rawValue !== "string" || rawValue.trim().length === 0) return null;
  const candidates = rawValue.split(",");
  for (const candidate of candidates) {
    const normalized = normalizeIP(candidate);
    if (normalized && isIP(normalized) !== 0) {
      return normalized;
    }
  }
  return null;
}

/** Whether one list entry matches the canonical address. */
function entryMatches(canonical, family, entry) {
  if (entry.includes("*")) {
    // Wildcards are an IPv4 shape ("192.168.*.*").
    return family === 4 && matchesWildcard(canonical, entry);
  }
  if (entry.includes("/")) return matchesCIDR(canonical, entry);
  return normalizeIP(entry) === canonical;
}

function matchesAny(ip, ipSet) {
  const canonical = normalizeIP(ip);
  if (!canonical) return false;
  // Direct match first: the common case for a small list.
  if (ipSet.has(canonical)) return true;

  const family = isIP(canonical);
  for (const entry of ipSet) {
    if (entryMatches(canonical, family, entry)) return true;
  }
  return false;
}

function matchesIpv4Cidr(ip, network, mask) {
  const ipNum = ipToNum(ip);
  const rangeNum = ipToNum(network);
  if (ipNum === null || rangeNum === null) return false;
  const maskBits = (-1 << (32 - mask)) >>> 0;
  return (ipNum & maskBits) === (rangeNum & maskBits);
}

function matchesIpv6Cidr(ip, network, mask) {
  const address = ipv6ToBytes(ip);
  const range = ipv6ToBytes(network);
  if (!address || !range) return false;
  const whole = Math.floor(mask / 8);
  for (let i = 0; i < whole; i += 1) {
    if (address[i] !== range[i]) return false;
  }
  const rest = mask % 8;
  if (rest === 0) return true;
  const bits = (0xff << (8 - rest)) & 0xff;
  return (address[whole] & bits) === (range[whole] & bits);
}

function matchesCIDR(ip, cidr) {
  const slash = cidr.indexOf("/");
  if (slash <= 0) return false;

  const network = normalizeIP(cidr.slice(0, slash));
  const mask = Number.parseInt(cidr.slice(slash + 1), 10);
  const family = isIP(ip);
  if (!network || Number.isNaN(mask) || family === 0 || family !== isIP(network)) return false;
  if (mask < 0 || mask > (family === 4 ? 32 : 128)) return false;
  if (mask === 0) return true;

  return family === 4 ? matchesIpv4Cidr(ip, network, mask) : matchesIpv6Cidr(ip, network, mask);
}

function ipToNum(ip) {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let num = 0;
  for (const p of parts) {
    const n = parseInt(p, 10);
    if (isNaN(n) || n < 0 || n > 255) return null;
    num = (num << 8) | n;
  }
  return num >>> 0;
}

function matchesWildcard(ip, pattern) {
  const ipParts = ip.split(".");
  const patParts = pattern.split(".");
  if (ipParts.length !== 4 || patParts.length !== 4) return false;
  return ipParts.every((part, i) => patParts[i] === "*" || part === patParts[i]);
}

function extractClientIP(req) {
  const headers = req.headers || {};
  return (
    pickFirstValidIp(headers["cf-connecting-ip"]) ||
    pickFirstValidIp(headers["x-forwarded-for"]) ||
    pickFirstValidIp(headers["x-real-ip"]) ||
    pickFirstValidIp(req.socket?.remoteAddress) ||
    pickFirstValidIp(req.ip) ||
    "unknown"
  );
}

/**
 * Reset config (for testing)
 */
export function resetIPFilter() {
  _config = {
    enabled: false,
    mode: "blacklist",
    blacklist: new Set(),
    whitelist: new Set(),
    tempBans: new Map(),
  };
}
