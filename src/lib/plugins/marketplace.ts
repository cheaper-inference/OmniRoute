import { getSettings } from "../db/settings";
import dns from "node:dns/promises";
import { isPrivateHost } from "@/shared/network/outboundUrlGuard";
import { safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { pluginManager } from "./manager";
import { createHash, type KeyObject } from "node:crypto";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";
import {
  MARKETPLACE_INTEGRITY_LIMITS,
  MarketplaceIntegrityError,
  OFFICIAL_MARKETPLACE_TRUST,
  resolveTrustedMarketplaceKeys,
  verifyMarketplaceArchive,
  verifyMarketplaceIndex,
} from "./marketplaceIntegrity";
import { extractMarketplaceArchive } from "./marketplaceArchive";
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
 * Keep the entries of a custom registry that carry a string `name`, and make each one satisfy
 * what search reads: a string `description` and a `string[]` `tags` (empty when absent), so a
 * sparse entry can never make {@link searchMarketplace} throw.
 */
export function normalizeMarketplaceEntries(list: unknown[]): MarketplaceEntry[] {
  const entries: MarketplaceEntry[] = [];
  for (const entry of list) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as Record<string, unknown>;
    if (typeof record.name !== "string") continue;
    entries.push({
      ...record,
      description: typeof record.description === "string" ? record.description : "",
      tags: Array.isArray(record.tags)
        ? record.tags.filter((tag): tag is string => typeof tag === "string")
        : [],
    } as MarketplaceEntry);
  }
  return entries;
}

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
      if (Array.isArray(data)) return normalizeMarketplaceEntries(data);
      if (
        data &&
        typeof data === "object" &&
        Array.isArray((data as Record<string, unknown>).plugins)
      ) {
        return normalizeMarketplaceEntries((data as Record<string, unknown>).plugins as unknown[]);
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

export type MarketplaceInstallRequest = { name: string; version?: string };

/** Feature flag: install only from the official signed index (see marketplaceIntegrity.ts). */
const INTEGRITY_FLAG = "PLUGIN_MARKETPLACE_INTEGRITY_ENABLED";

// ── Signed install (PLUGIN_MARKETPLACE_INTEGRITY_ENABLED) ──

type VerifiedInstallDeps = {
  trust: { indexUrl: string; signatureUrl: string; keys: readonly KeyObject[] };
  fetchBytes: (url: string, maxBytes: number) => Promise<Uint8Array>;
  install: (pluginDir: string) => Promise<{ name: string; version: string }>;
  now: () => Date;
};

const PACKAGE_FETCH_TIMEOUT_MS = 30_000;

/** Read a response body, refusing anything larger than `maxBytes`. */
async function readBoundedBody(response: Response, maxBytes: number): Promise<Uint8Array> {
  const declared = Number(response.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) throw new Error("body too large");
  const reader = response.body?.getReader();
  if (!reader) {
    const whole = Buffer.from(await response.arrayBuffer());
    if (whole.byteLength > maxBytes) throw new Error("body too large");
    return whole;
  }
  const chunks: Buffer[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => undefined);
      throw new Error("body too large");
    }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks);
}

type PackageFetch = (
  url: string,
  init: { guard: "public-only"; timeoutMs: number; signal: AbortSignal }
) => Promise<Response>;

/**
 * Download with ONE deadline that covers the request and the body read, so a server that sends
 * headers and then stalls cannot keep an install pending. The deadline is cleared once the read
 * ends, whether it succeeded or not.
 */
export async function fetchBoundedBytes(
  url: string,
  maxBytes: number,
  timeoutMs: number = PACKAGE_FETCH_TIMEOUT_MS,
  fetchPackage: PackageFetch = safeOutboundFetch as PackageFetch
): Promise<Uint8Array> {
  const controller = new AbortController();
  const deadline = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchPackage(url, {
      guard: "public-only",
      timeoutMs,
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`unexpected status ${response.status}`);
    return await readBoundedBody(response, maxBytes);
  } finally {
    clearTimeout(deadline);
  }
}

let verifiedInstallOverrides: Partial<VerifiedInstallDeps> | null = null;

/** Test seam: replace the trust anchor, transport, manager or clock. `null` restores defaults. */
export function setVerifiedInstallDepsForTesting(
  overrides: Partial<VerifiedInstallDeps> | null
): void {
  verifiedInstallOverrides = overrides ? { ...verifiedInstallOverrides, ...overrides } : null;
}

function resolveVerifiedInstallDeps(): VerifiedInstallDeps {
  const now = verifiedInstallOverrides?.now ?? (() => new Date());
  return {
    trust: verifiedInstallOverrides?.trust ?? {
      indexUrl: OFFICIAL_MARKETPLACE_TRUST.indexUrl,
      signatureUrl: OFFICIAL_MARKETPLACE_TRUST.signatureUrl,
      keys: resolveTrustedMarketplaceKeys(OFFICIAL_MARKETPLACE_TRUST.keys, now()),
    },
    fetchBytes: verifiedInstallOverrides?.fetchBytes ?? fetchBoundedBytes,
    install:
      verifiedInstallOverrides?.install ??
      (async (pluginDir) => {
        const row = await pluginManager.install(pluginDir);
        return { name: row.name, version: row.version };
      }),
    now,
  };
}

async function fetchOrRefuse(
  deps: VerifiedInstallDeps,
  url: string,
  maxBytes: number,
  failure: "index_unavailable" | "package_unavailable"
): Promise<Uint8Array> {
  try {
    return await deps.fetchBytes(url, maxBytes);
  } catch {
    // The underlying error can carry hosts, ports and paths: callers get the fixed text only.
    throw new MarketplaceIntegrityError(failure);
  }
}

/**
 * Signed install: official index (signature + validity) -> exact id+version entry ->
 * download -> SHA-256 of the downloaded bytes -> extraction in private staging -> manifest
 * name/version check -> `pluginManager.install(<extracted dir>)`.
 *
 * A failure in a verification step throws a {@link MarketplaceIntegrityError} BEFORE the
 * manager is called, so an already installed plugin and its registered version are untouched.
 * An error raised by `pluginManager.install()` follows the manager's existing behavior (the
 * plugin row is written before its `onInstall` hook and `activate()` run). This path has no
 * fallback to an unsigned install and never consults the custom registry URL.
 */
async function installVerifiedMarketplacePlugin(
  request: MarketplaceInstallRequest
): Promise<{ name: string; version: string }> {
  const deps = resolveVerifiedInstallDeps();
  const version = request.version?.trim();
  if (!version) throw new MarketplaceIntegrityError("version_required");

  const { indexUrl, signatureUrl, keys } = deps.trust;
  if (
    !indexUrl.startsWith("https://") ||
    !signatureUrl.startsWith("https://") ||
    keys.length === 0
  ) {
    throw new MarketplaceIntegrityError("integrity_not_configured");
  }

  const limits = MARKETPLACE_INTEGRITY_LIMITS;
  const indexBytes = await fetchOrRefuse(deps, indexUrl, limits.maxIndexBytes, "index_unavailable");
  const signatureBytes = await fetchOrRefuse(
    deps,
    signatureUrl,
    limits.maxSignatureBytes,
    "index_unavailable"
  );
  const index = verifyMarketplaceIndex(
    indexBytes,
    Buffer.from(signatureBytes).toString("utf8"),
    keys,
    deps.now()
  );

  const entry = index.plugins.find((p) => p.name === request.name && p.version === version);
  if (!entry) throw new MarketplaceIntegrityError("entry_not_found");

  const archive = await fetchOrRefuse(
    deps,
    entry.downloadUrl,
    limits.maxPackageBytes,
    "package_unavailable"
  );
  verifyMarketplaceArchive(archive, entry.checksum);

  const stagingDir = await mkdtemp(join(tmpdir(), "plugin-mp-"));
  try {
    const { pluginDir } = await extractMarketplaceArchive(archive, stagingDir, {
      name: entry.name,
      version: entry.version,
    });
    return await deps.install(pluginDir);
  } finally {
    await rm(stagingDir, { recursive: true, force: true }).catch(() => {});
  }
}

/**
 * Install a plugin from the marketplace by name.
 *
 * With `PLUGIN_MARKETPLACE_INTEGRITY_ENABLED` on, only the signed official index is used and
 * a version is required (see {@link installVerifiedMarketplacePlugin}); with it off, the
 * original behaviour below is unchanged. The flag is read without a catch: if it cannot be
 * resolved the install fails, it does not fall back to the unsigned path.
 */
export async function installMarketplacePlugin(
  input: string | MarketplaceInstallRequest
): Promise<{ name: string; version: string }> {
  const request: MarketplaceInstallRequest = typeof input === "string" ? { name: input } : input;
  if (isFeatureFlagEnabled(INTEGRITY_FLAG)) {
    return installVerifiedMarketplacePlugin(request);
  }
  return installUnverifiedMarketplacePlugin(request.name);
}

/**
 * Install a plugin from the marketplace by name (flag off: the unchanged original contract).
 * Downloads the plugin archive, verifies checksum if present, and installs via PluginManager.
 */
async function installUnverifiedMarketplacePlugin(
  name: string
): Promise<{ name: string; version: string }> {
  const plugins = await listMarketplacePlugins();
  const entry = plugins.find((p) => p.name === name);
  if (!entry) {
    throw new Error(`Plugin '${name}' not found in marketplace`);
  }

  // Create temp dir for download
  const tmpDir = await mkdtemp(join(tmpdir(), "plugin-mp-"));
  const tmpFile = join(tmpDir, "plugin.tar.gz");

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

    // Write to temp file
    await writeFile(tmpFile, buffer);

    // Delegate to pluginManager.install
    const result = await pluginManager.install(tmpDir);
    return { name: result.name, version: result.version };
  } finally {
    // Cleanup temp dir
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}
