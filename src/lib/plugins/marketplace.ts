import { getSettings } from "../db/settings";
import dns from "node:dns/promises";
import { isPrivateHost } from "@/shared/network/outboundUrlGuard";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { pluginManager } from "./manager";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, writeFile, rm } from "node:fs/promises";
import { dirname, join, resolve, sep } from "node:path";
import { tmpdir } from "node:os";
import { gunzipSync } from "node:zlib";
/**
 * Plugin Marketplace — browse, search, install plugins from a registry.
 *
 * Phase 1: Local registry with seed data.
 * Phase 2: Remote registry with ratings/downloads.
 *
 * @module plugins/marketplace
 */

/** Resolve a hostname to every address it maps to (A + AAAA). Injectable for tests. */
export type MarketplaceLookupFn = (hostname: string) => Promise<Array<{ address: string }>>;

const defaultLookup: MarketplaceLookupFn = (hostname) =>
  dns.lookup(hostname, { all: true, verbatim: true });

/**
 * SSRF guard for a custom marketplace registry URL. Must be http(s) and must not
 * target a private/loopback/link-local/ULA address. Unlike a literal-only or
 * IPv4-only check, this resolves BOTH IPv4 (A) and IPv6 (AAAA) records and rejects
 * if ANY resolved address is private — closing the public-hostname → private-IP
 * bypass (IPv6 included: `::1`, `fc00::/7`, `fe80::/10`, IPv4-mapped) via the
 * canonical `isPrivateHost`. DNS failure rejects (fail-closed). The fetch itself
 * additionally runs through `safeOutboundFetch({ guard: "public-only" })`, which
 * re-applies the guard and blocks redirects (no public → private 30x pivot).
 */
export async function isSafeMarketplaceUrl(
  urlStr: string,
  lookupFn: MarketplaceLookupFn = defaultLookup
): Promise<boolean> {
  let parsed: URL;
  try {
    parsed = new URL(urlStr);
  } catch {
    return false;
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return false;
  }
  // Literal IP hostnames (IPv4 + IPv6, incl. IPv4-mapped) are classified directly.
  if (isPrivateHost(parsed.hostname)) {
    return false;
  }
  // Resolve A + AAAA and reject if the hostname maps to any private address.
  try {
    const records = await lookupFn(parsed.hostname);
    if (!records.length) return false;
    for (const { address } of records) {
      if (isPrivateHost(address)) return false;
    }
  } catch {
    // DNS resolution failure — reject to be safe.
    return false;
  }
  return true;
}

// Marketplace — local seed registry. Remote registry in Phase 2.

// ── Types ──

export interface MarketplaceEntry {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  downloadUrl: string;
  checksum?: string; // SHA-256 hex (optional — verified when present)
  repository?: string;
  tags: string[];
  downloads: number;
  rating: number; // 0-5
  verified: boolean;
  lastUpdated: string;
}

// ── Seed Data ──

const SEED_REGISTRY: MarketplaceEntry[] = [
  {
    name: "request-logger",
    version: "1.0.0",
    description: "Logs all requests and responses with timing",
    author: "omniroute",
    license: "MIT",
    downloadUrl: "",
    tags: ["logging", "debugging"],
    downloads: 0,
    rating: 5,
    verified: true,
    lastUpdated: "2026-05-29",
  },
  {
    name: "rate-limiter",
    version: "1.0.0",
    description: "Per-model rate limiting with sliding window",
    author: "omniroute",
    license: "MIT",
    downloadUrl: "",
    tags: ["rate-limit", "security"],
    downloads: 0,
    rating: 5,
    verified: true,
    lastUpdated: "2026-05-29",
  },
  {
    name: "cost-tracker",
    version: "1.0.0",
    description: "Track token costs per request and per model",
    author: "omniroute",
    license: "MIT",
    downloadUrl: "",
    tags: ["analytics", "cost"],
    downloads: 0,
    rating: 4,
    verified: true,
    lastUpdated: "2026-05-29",
  },
  {
    name: "theme-manager",
    version: "1.0.0",
    description: "Dynamic UI theme management via CSS variable injection",
    author: "omniroute",
    license: "MIT",
    downloadUrl: "",
    tags: ["theme", "ui", "css", "customization"],
    downloads: 0,
    rating: 5,
    verified: true,
    lastUpdated: "2026-06-09",
  },
];

// ── API ──

/**
 * List all available plugins in the marketplace.
 */
export async function listMarketplacePlugins(): Promise<MarketplaceEntry[]> {
  try {
    const settings = await getSettings();
    const url =
      typeof settings.pluginMarketplaceUrl === "string" ? settings.pluginMarketplaceUrl : null;
    if (url) {
      if (!(await isSafeMarketplaceUrl(url))) {
        console.warn("Custom marketplace URL rejected (SSRF guard):", url);
        return [...SEED_REGISTRY];
      }
      const res = await safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 });
      if (!res.ok) {
        console.warn("Custom marketplace returned non-OK status:", res.status);
        return [...SEED_REGISTRY];
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        return data.filter(
          (entry: unknown) =>
            entry &&
            typeof entry === "object" &&
            typeof (entry as Record<string, unknown>).name === "string"
        ) as MarketplaceEntry[];
      }
      if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as Record<string, unknown>).plugins)
      ) {
        return ((data as Record<string, unknown>).plugins as unknown[]).filter(
          (entry: unknown) =>
            entry &&
            typeof entry === "object" &&
            typeof (entry as Record<string, unknown>).name === "string"
        ) as MarketplaceEntry[];
      }
      console.warn("Custom marketplace returned unrecognized format");
    }
  } catch (err) {
    console.error("Failed to fetch from custom plugin marketplace:", err);
  }
  return [...SEED_REGISTRY];
}

/**
 * Search marketplace plugins by query.
 */
export async function searchMarketplace(query: string): Promise<MarketplaceEntry[]> {
  const plugins = await listMarketplacePlugins();
  const q = query.toLowerCase();
  return plugins.filter(
    (p) =>
      p.name.includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
}

/**
 * Get a specific marketplace entry.
 */
export async function getMarketplaceEntry(name: string): Promise<MarketplaceEntry | undefined> {
  const plugins = await listMarketplacePlugins();
  return plugins.find((p) => p.name === name);
}

/**
 * Check if marketplace is available.
 */
export function isMarketplaceAvailable(): boolean {
  return true; // Always available (falls back to seed)
}

const MAX_ARCHIVE_BYTES = 32 * 1024 * 1024; // expanded tar stream, headers included
const MAX_ARCHIVE_ENTRIES = 2000;

type TarFile = { path: string; data: Buffer | null }; // data null = directory

function tarString(block: Buffer, start: number, end: number): string {
  const raw = block.subarray(start, end);
  const nul = raw.indexOf(0);
  return raw.subarray(0, nul < 0 ? raw.length : nul).toString("utf8");
}

/** `path` records of a pax extended header ("<len> key=value\n" repeated). */
function paxPath(data: Buffer): string | null {
  let found: string | null = null;
  for (let at = 0; at < data.length;) {
    const space = data.indexOf(0x20, at);
    const length = Number.parseInt(data.toString("latin1", at, space), 10);
    if (space < 0 || !(length > space - at)) break;
    const record = data.toString("utf8", space + 1, at + length - 1);
    if (record.startsWith("path=")) found = record.slice(5);
    at += length;
  }
  return found;
}

/** Read a tar stream into validated entries. Links, devices and unsafe names are rejected. */
function readTar(tar: Buffer): TarFile[] {
  const files: TarFile[] = [];
  const seen = new Set<string>();
  let pendingPath: string | null = null;
  for (let at = 0; at + 512 <= tar.length;) {
    const header = tar.subarray(at, at + 512);
    at += 512;
    if (header.every((byte) => byte === 0)) break;
    const checksum = Number.parseInt(tarString(header, 148, 156).trim(), 8);
    let sum = 0;
    for (let i = 0; i < 512; i++) sum += i >= 148 && i < 156 ? 0x20 : header[i];
    if (checksum !== sum) throw new Error("Plugin archive is not a valid tar file");
    const size = Number.parseInt(tarString(header, 124, 136).trim() || "0", 8);
    if (!(size >= 0) || at + size > tar.length) throw new Error("Plugin archive is truncated");
    const data = tar.subarray(at, at + size);
    at += Math.ceil(size / 512) * 512;
    const type = String.fromCharCode(header[156] || 0x30);
    if (type === "x") {
      pendingPath = paxPath(data);
      continue;
    }
    if (type === "L") {
      pendingPath = tarString(data, 0, data.length); // GNU long name for the next entry
      continue;
    }
    if (type === "g") continue;
    if (type === "1" || type === "2") throw new Error("Plugin archive contains a link entry");
    if (type !== "0" && type !== "5")
      throw new Error(`Plugin archive has unsupported entry type '${type}'`);
    const prefix = tarString(header, 257, 262) === "ustar" ? tarString(header, 345, 500) : "";
    const raw =
      pendingPath ??
      (prefix ? `${prefix}/${tarString(header, 0, 100)}` : tarString(header, 0, 100));
    pendingPath = null;
    // Zip Slip: only plain relative names; `.` and empty segments are dropped.
    if (raw.includes("\\") || raw.includes("\0") || raw.startsWith("/") || /^[a-zA-Z]:/.test(raw)) {
      throw new Error(`Plugin archive has an unsafe path: ${JSON.stringify(raw)}`);
    }
    const segments = raw.split("/").filter((part) => part !== "" && part !== ".");
    if (segments.includes("..")) {
      throw new Error(`Plugin archive has an unsafe path: ${JSON.stringify(raw)}`);
    }
    if (segments.length === 0) {
      if (type === "5") continue; // the archive root directory
      throw new Error(`Plugin archive has an unsafe path: ${JSON.stringify(raw)}`);
    }
    const path = segments.join("/");
    if (seen.has(path.toLowerCase()))
      throw new Error(`Plugin archive has a duplicate path: ${path}`);
    seen.add(path.toLowerCase());
    if (files.length >= MAX_ARCHIVE_ENTRIES) throw new Error("Plugin archive has too many entries");
    files.push({ path, data: type === "5" ? null : Buffer.from(data) });
  }
  return files;
}

/**
 * Extract a .tar.gz plugin archive into `destDir` (must exist). The archive comes
 * from a remote registry, so expansion is capped and every entry is checked before
 * any file is written. An npm-style single `package/` folder is stripped.
 */
async function extractPluginArchive(archive: Buffer, destDir: string): Promise<void> {
  let tar: Buffer;
  try {
    tar = gunzipSync(archive, { maxOutputLength: MAX_ARCHIVE_BYTES });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ERR_BUFFER_TOO_LARGE") {
      throw new Error(`Plugin archive is too large (exceeds ${MAX_ARCHIVE_BYTES} bytes expanded)`);
    }
    throw new Error("Plugin archive is not a valid gzip file");
  }
  const entries = readTar(tar);
  const stripPackage =
    entries.length > 0 &&
    entries.every((entry) => entry.path === "package" || entry.path.startsWith("package/"));
  const root = resolve(destDir);
  for (const entry of entries) {
    const relative = stripPackage ? entry.path.slice("package/".length) : entry.path;
    if (relative === "") continue; // the package/ folder itself
    const target = resolve(root, relative);
    if (!target.startsWith(root + sep)) {
      throw new Error(`Plugin archive has an unsafe path: ${JSON.stringify(entry.path)}`);
    }
    if (entry.data === null) {
      await mkdir(target, { recursive: true });
    } else {
      await mkdir(dirname(target), { recursive: true });
      await writeFile(target, entry.data, { flag: "wx" }); // exclusive: never overwrite
    }
  }
}

/**
 * Install a plugin from the marketplace by name.
 * Downloads the plugin archive, verifies checksum if present, and installs via PluginManager.
 */
export async function installMarketplacePlugin(
  name: string
): Promise<{ name: string; version: string }> {
  const plugins = await listMarketplacePlugins();
  const entry = plugins.find((p) => p.name === name);
  if (!entry) {
    throw new Error(`Plugin '${name}' not found in marketplace`);
  }

  // Create temp dir for download and extraction
  const tmpDir = await mkdtemp(join(tmpdir(), "plugin-mp-"));
  const stagingDir = join(tmpDir, "extracted");

  try {
    // Download the plugin archive
    const response = await safeOutboundFetch(entry.downloadUrl, { guard: "public-only" });
    if (!response.ok) {
      throw new Error(`Failed to download plugin '${name}': ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());

    // Verify SHA-256 checksum if provided
    if (entry.checksum) {
      const actual = createHash("sha256").update(buffer).digest("hex");
      if (actual !== entry.checksum) {
        throw new Error(
          `Checksum mismatch for plugin '${name}': expected ${entry.checksum}, got ${actual}`
        );
      }
    }

    // pluginManager.install wants a folder that holds plugin.json: extract first
    await mkdir(stagingDir);
    await extractPluginArchive(buffer, stagingDir);

    // Delegate to pluginManager.install
    const result = await pluginManager.install(stagingDir);
    return { name: result.name, version: result.version };
  } finally {
    // Cleanup temp dir
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}
