import crypto, { type KeyObject } from "node:crypto";
import { z } from "zod";

/**
 * Plugin Marketplace integrity: signed index + package digest.
 *
 * Pure verification, no network and no filesystem: callers hand over the exact bytes they
 * received. Used when `PLUGIN_MARKETPLACE_INTEGRITY_ENABLED` is on.
 *
 * Trust model
 *  - The index is signed with Ed25519 over its EXACT bytes. The bytes are verified before
 *    they are parsed, and never re-serialised.
 *  - Every entry names one package by SHA-256. The package is only handed on once the bytes
 *    that were downloaded match that digest.
 *  - A failure of any step throws a {@link MarketplaceIntegrityError}. There is no
 *    "unsigned" result to fall back to.
 *
 * Extension point (not implemented): a signed custom registry. Today there is exactly one
 * trust source, {@link OFFICIAL_MARKETPLACE_TRUST}. A custom registry would add a second
 * {@link MarketplaceTrustSource} whose index URL and keys the OPERATOR chose explicitly, and
 * the install flow would pick the source by an explicit field of the request. Nothing in the
 * custom `pluginMarketplaceUrl` setting is ever promoted to a trust source implicitly.
 *
 * @module plugins/marketplaceIntegrity
 */

export type MarketplaceIntegrityCode =
  | "integrity_not_configured"
  | "version_required"
  | "index_unavailable"
  | "index_signature_invalid"
  | "index_invalid"
  | "index_expired"
  | "index_not_yet_valid"
  | "entry_not_found"
  | "package_unavailable"
  | "package_integrity_mismatch"
  | "archive_invalid"
  | "archive_limit_exceeded"
  | "archive_unsafe_entry"
  | "manifest_invalid"
  | "manifest_mismatch";

/** Fixed, client-safe text per code. Never built from upstream data, paths or error objects. */
const MESSAGES: Record<MarketplaceIntegrityCode, string> = {
  integrity_not_configured:
    "Signed marketplace install is not configured: no trusted index key or official index URL is set",
  version_required: "A version is required to install from the signed marketplace index",
  index_unavailable: "The signed marketplace index is unavailable",
  index_signature_invalid: "The marketplace index signature could not be verified",
  index_invalid: "The signed marketplace index is not valid",
  index_expired: "The signed marketplace index has expired",
  index_not_yet_valid: "The signed marketplace index is not valid yet",
  entry_not_found: "Plugin version not found in the signed marketplace index",
  package_unavailable: "The marketplace package is unavailable",
  package_integrity_mismatch: "Marketplace package integrity check failed",
  archive_invalid: "The marketplace package archive is not valid",
  archive_limit_exceeded: "The marketplace package archive exceeds the allowed size limits",
  archive_unsafe_entry: "The marketplace package archive contains an entry that is not allowed",
  manifest_invalid: "The marketplace package manifest is missing or not valid",
  manifest_mismatch: "The marketplace package manifest does not match the signed index entry",
};

const STATUS: Record<MarketplaceIntegrityCode, number> = {
  integrity_not_configured: 503,
  version_required: 400,
  index_unavailable: 502,
  index_signature_invalid: 400,
  index_invalid: 400,
  index_expired: 400,
  index_not_yet_valid: 400,
  entry_not_found: 404,
  package_unavailable: 502,
  package_integrity_mismatch: 400,
  archive_invalid: 400,
  archive_limit_exceeded: 400,
  archive_unsafe_entry: 400,
  manifest_invalid: 400,
  manifest_mismatch: 400,
};

export class MarketplaceIntegrityError extends Error {
  readonly code: MarketplaceIntegrityCode;
  readonly status: number;

  constructor(code: MarketplaceIntegrityCode) {
    super(MESSAGES[code]);
    this.name = "MarketplaceIntegrityError";
    this.code = code;
    this.status = STATUS[code];
  }
}

export const MARKETPLACE_INTEGRITY_LIMITS = {
  /** Signed index, bytes. */
  maxIndexBytes: 2 * 1024 * 1024,
  /** Detached signature text, bytes. */
  maxSignatureBytes: 4096,
  /** Downloaded package (compressed), bytes. */
  maxPackageBytes: 25 * 1024 * 1024,
  maxPlugins: 5000,
} as const;

// ── Trust configuration ──

/** A public key the marketplace trusts, with an optional retirement date for rotation. */
export type MarketplaceTrustKey = {
  id: string;
  /** Ed25519 public key: base64 SPKI-DER or PEM. */
  publicKey: string;
  /** ISO instant after which the key is no longer trusted (rotation overlap window). */
  notAfter?: string;
};

export type MarketplaceTrustSource = {
  /** HTTPS URL of the signed index JSON. */
  indexUrl: string;
  /** HTTPS URL of the detached signature: base64 Ed25519 over the exact index bytes. */
  signatureUrl: string;
  keys: readonly MarketplaceTrustKey[];
};

/**
 * Trust anchor for the official marketplace index.
 *
 * Both fields ship EMPTY on purpose: the owner supplies the official public key and index
 * URL before the flag is turned on (see docs/frameworks/PLUGIN_MARKETPLACE.md). While they
 * are empty, signed mode refuses every install with `integrity_not_configured`.
 *
 * Rotation: add the new key, keep the old one with a `notAfter` for the overlap window, and
 * drop it afterwards. Only public keys belong here.
 */
export const OFFICIAL_MARKETPLACE_TRUST: MarketplaceTrustSource = {
  indexUrl: "",
  signatureUrl: "",
  keys: [],
};

function parsePublicKey(input: string): KeyObject | null {
  try {
    const trimmed = input.trim();
    const key = trimmed.startsWith("-----BEGIN")
      ? crypto.createPublicKey(trimmed)
      : crypto.createPublicKey({
          key: Buffer.from(trimmed, "base64"),
          format: "der",
          type: "spki",
        });
    return key.asymmetricKeyType === "ed25519" ? key : null;
  } catch {
    return null;
  }
}

/** Turn configured trust keys into key objects, dropping malformed and retired ones. */
export function resolveTrustedMarketplaceKeys(
  keys: readonly MarketplaceTrustKey[],
  now: Date
): KeyObject[] {
  const resolved: KeyObject[] = [];
  for (const entry of keys) {
    if (entry.notAfter !== undefined) {
      const until = Date.parse(entry.notAfter);
      if (!Number.isFinite(until) || until <= now.getTime()) continue;
    }
    const key = parsePublicKey(entry.publicKey);
    if (key) resolved.push(key);
  }
  return resolved;
}

// ── Signed index ──

const NAME = z
  .string()
  .min(1)
  .max(100)
  .regex(/^[a-z0-9-]+$/);
const SEMVER = z.string().regex(/^\d+\.\d+\.\d+$/);
const HTTPS_URL = z
  .string()
  .max(2048)
  .refine((value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password;
    } catch {
      return false;
    }
  });
const SHA256_HEX = z
  .string()
  .regex(/^[0-9a-fA-F]{64}$/)
  .transform((value) => value.toLowerCase());
const INSTANT = z
  .string()
  .max(40)
  .refine((value) => Number.isFinite(Date.parse(value)));

const EntrySchema = z
  .object({
    name: NAME,
    version: SEMVER,
    downloadUrl: HTTPS_URL,
    checksum: SHA256_HEX,
    description: z.string().max(500).default(""),
    author: z.string().max(200).default(""),
    license: z.string().max(100).default("MIT"),
    repository: HTTPS_URL.optional(),
    tags: z.array(z.string().max(50)).max(50).default([]),
    downloads: z.number().int().nonnegative().default(0),
    rating: z.number().min(0).max(5).default(0),
    verified: z.boolean().default(true),
    lastUpdated: z.string().max(40).default(""),
  })
  .strict();

const IndexSchema = z
  .object({
    issuedAt: INSTANT,
    expiresAt: INSTANT,
    plugins: z.array(EntrySchema).max(MARKETPLACE_INTEGRITY_LIMITS.maxPlugins),
  })
  .strict();

/** A catalog entry from the signed index. `checksum` is mandatory here. */
export type VerifiedMarketplaceEntry = {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  downloadUrl: string;
  checksum: string;
  repository?: string;
  tags: string[];
  downloads: number;
  rating: number;
  verified: boolean;
  lastUpdated: string;
};

export type VerifiedMarketplaceIndex = {
  issuedAt: string;
  expiresAt: string;
  plugins: readonly VerifiedMarketplaceEntry[];
};

function decodeSignature(signatureBase64: string): Buffer | null {
  const text = typeof signatureBase64 === "string" ? signatureBase64.trim() : "";
  if (text.length === 0 || text.length > MARKETPLACE_INTEGRITY_LIMITS.maxSignatureBytes) {
    return null;
  }
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(text)) return null;
  const bytes = Buffer.from(text, "base64");
  // An Ed25519 signature is exactly 64 bytes.
  return bytes.length === 64 ? bytes : null;
}

/**
 * Verify the index signature over `bytes`, then its validity window, then its schema.
 * `keys` is the trusted set; an empty (or non-Ed25519) set refuses everything.
 */
export function verifyMarketplaceIndex(
  bytes: Uint8Array,
  signatureBase64: string,
  keys: readonly KeyObject[],
  now: Date
): VerifiedMarketplaceIndex {
  const trusted = keys.filter((key) => key.asymmetricKeyType === "ed25519");
  if (trusted.length === 0) throw new MarketplaceIntegrityError("integrity_not_configured");
  if (bytes.byteLength === 0 || bytes.byteLength > MARKETPLACE_INTEGRITY_LIMITS.maxIndexBytes) {
    throw new MarketplaceIntegrityError("index_invalid");
  }

  const signature = decodeSignature(signatureBase64);
  if (!signature) throw new MarketplaceIntegrityError("index_signature_invalid");
  const signed = trusted.some((key) => {
    try {
      return crypto.verify(null, bytes, key, signature);
    } catch {
      return false;
    }
  });
  if (!signed) throw new MarketplaceIntegrityError("index_signature_invalid");

  // Only signed bytes are parsed.
  let raw: unknown;
  try {
    raw = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new MarketplaceIntegrityError("index_invalid");
  }
  const parsed = IndexSchema.safeParse(raw);
  if (!parsed.success) throw new MarketplaceIntegrityError("index_invalid");

  const { issuedAt, expiresAt, plugins } = parsed.data;
  const issued = Date.parse(issuedAt);
  const expires = Date.parse(expiresAt);
  if (expires <= issued) throw new MarketplaceIntegrityError("index_invalid");
  const seen = new Set<string>();
  for (const plugin of plugins) {
    const id = `${plugin.name}@${plugin.version}`;
    if (seen.has(id)) throw new MarketplaceIntegrityError("index_invalid");
    seen.add(id);
  }
  if (now.getTime() < issued) throw new MarketplaceIntegrityError("index_not_yet_valid");
  if (now.getTime() >= expires) throw new MarketplaceIntegrityError("index_expired");

  // The schema marks `checksum` mandatory; with `strict: false` zod infers every key optional,
  // so state the verified shape explicitly.
  return { issuedAt, expiresAt, plugins: plugins as VerifiedMarketplaceEntry[] };
}

/** The downloaded bytes must hash to exactly the digest the signed index lists. */
export function verifyMarketplaceArchive(bytes: Uint8Array, expectedSha256: string): void {
  const expected = typeof expectedSha256 === "string" ? expectedSha256.trim().toLowerCase() : "";
  if (!/^[0-9a-f]{64}$/.test(expected)) {
    throw new MarketplaceIntegrityError("package_integrity_mismatch");
  }
  const actual = crypto.createHash("sha256").update(bytes).digest();
  if (!crypto.timingSafeEqual(actual, Buffer.from(expected, "hex"))) {
    throw new MarketplaceIntegrityError("package_integrity_mismatch");
  }
}
