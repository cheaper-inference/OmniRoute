import { gunzipSync } from "node:zlib";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve, sep } from "node:path";
import { MarketplaceIntegrityError } from "./marketplaceIntegrity";
import { safeValidateManifest } from "./manifest";

/**
 * Extract a verified marketplace package (`.tar.gz`) into a private staging directory.
 *
 * The caller has already checked the SHA-256 of these exact bytes. This module still treats
 * the archive as hostile: it creates only regular files and directories (links, devices and
 * every other entry kind are refused), accepts only relative names that stay inside the
 * staging root (no absolute paths, no `..`, no backslashes, no NUL), refuses duplicate
 * paths, and bounds the entry count and the unpacked size.
 *
 * Extraction is a small purpose-built ustar reader on `node:zlib` so that every entry is
 * checked BEFORE anything is written, and so there is no general-purpose extractor whose
 * defaults could be relaxed by accident.
 *
 * @module plugins/marketplaceArchive
 */

export const MARKETPLACE_ARCHIVE_LIMITS = {
  /** Total unpacked bytes (the whole tar stream, headers included). */
  maxUnpackedBytes: 50 * 1024 * 1024,
  maxEntries: 2000,
  maxPathBytes: 1024,
} as const;

const BLOCK = 512;

type TarEntry = { path: string; kind: "file" | "directory"; data: Buffer };

function unsafe(): MarketplaceIntegrityError {
  return new MarketplaceIntegrityError("archive_unsafe_entry");
}
function invalid(): MarketplaceIntegrityError {
  return new MarketplaceIntegrityError("archive_invalid");
}
function tooLarge(): MarketplaceIntegrityError {
  return new MarketplaceIntegrityError("archive_limit_exceeded");
}

function cString(block: Buffer, start: number, length: number): string {
  const slice = block.subarray(start, start + length);
  const end = slice.indexOf(0);
  return slice.subarray(0, end === -1 ? slice.length : end).toString("utf8");
}

function readOctal(block: Buffer, start: number, length: number): number {
  // A leading high bit means base-256 (huge or negative values): never legitimate here.
  if (block[start] & 0x80) throw invalid();
  const text = cString(block, start, length).trim();
  if (text === "") return 0;
  if (!/^[0-7]+$/.test(text)) throw invalid();
  const value = parseInt(text, 8);
  if (!Number.isSafeInteger(value)) throw invalid();
  return value;
}

function headerChecksumOk(block: Buffer): boolean {
  const stored = readOctal(block, 148, 8);
  let sum = 0;
  for (let i = 0; i < BLOCK; i++) sum += i >= 148 && i < 156 ? 0x20 : block[i];
  return sum === stored;
}

/** Validate an entry name and return it normalised (relative, "/"-separated, no "." parts). */
function normalizeEntryPath(raw: string): string {
  if (raw.length === 0 || Buffer.byteLength(raw) > MARKETPLACE_ARCHIVE_LIMITS.maxPathBytes) {
    throw unsafe();
  }
  if (raw.includes("\0") || raw.includes("\\")) throw unsafe();
  if (raw.startsWith("/") || /^[A-Za-z]:/.test(raw)) throw unsafe();
  const parts: string[] = [];
  for (const part of raw.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") throw unsafe();
    parts.push(part);
  }
  if (parts.length === 0) throw unsafe();
  return parts.join("/");
}

/** PAX extended header: only `path` is honoured; size and link overrides are refused. */
function paxPath(data: Buffer): string | undefined {
  let path: string | undefined;
  let offset = 0;
  while (offset < data.length) {
    const space = data.indexOf(0x20, offset);
    if (space === -1) throw invalid();
    const length = Number(data.subarray(offset, space).toString("ascii"));
    if (!Number.isInteger(length) || length <= space - offset + 1) throw invalid();
    const record = data.subarray(space + 1, offset + length - 1).toString("utf8");
    const eq = record.indexOf("=");
    if (eq === -1) throw invalid();
    const key = record.slice(0, eq);
    if (key === "path") path = record.slice(eq + 1);
    else if (key === "size" || key === "linkpath") throw unsafe();
    offset += length;
  }
  return path;
}

type RawHeader = { block: Buffer; flag: string; data: Buffer; next: number };

/** Read one header block and its data: checksum, octal size and bounds are checked here. */
function readRawHeader(tar: Buffer, offset: number): RawHeader {
  const block = tar.subarray(offset, offset + BLOCK);
  if (!headerChecksumOk(block)) throw invalid();

  const size = readOctal(block, 124, 12);
  const dataStart = offset + BLOCK;
  const dataEnd = dataStart + size;
  if (dataEnd > tar.length) throw invalid();
  return {
    block,
    flag: String.fromCharCode(block[156] || 0x30),
    data: tar.subarray(dataStart, dataEnd),
    next: dataStart + Math.ceil(size / BLOCK) * BLOCK,
  };
}

/**
 * Metadata headers carry no entry of their own: a pax ("x") or GNU long-name ("L") header
 * overrides the name of the NEXT entry, a global pax ("g") header is skipped.
 */
function applyMetaHeader(
  header: RawHeader,
  pendingName: string | undefined
): { isMeta: boolean; pendingName: string | undefined } {
  if (header.flag === "x")
    return { isMeta: true, pendingName: paxPath(header.data) ?? pendingName };
  if (header.flag === "L") {
    return { isMeta: true, pendingName: cString(header.data, 0, header.data.length) };
  }
  return { isMeta: header.flag === "g", pendingName };
}

/** Only regular files and directories exist for us: links, devices, fifos and unknowns do not. */
function entryKind(flag: string): TarEntry["kind"] {
  if (flag === "0") return "file";
  if (flag === "5") return "directory";
  throw unsafe();
}

function rawEntryName(block: Buffer, pendingName: string | undefined): string {
  if (pendingName !== undefined) return pendingName;
  const prefix = cString(block, 345, 155);
  const baseName = cString(block, 0, 100);
  return prefix ? `${prefix}/${baseName}` : baseName;
}

/** Validate one entry header and turn it into an entry. Order of the checks is deliberate. */
function buildEntry(
  header: RawHeader,
  pendingName: string | undefined,
  seen: Set<string>,
  entryCount: number
): TarEntry {
  const kind = entryKind(header.flag);
  const rawName = rawEntryName(header.block, pendingName);
  // A regular file named like a directory is a malformed (or disguised) entry.
  if (kind === "file" && rawName.endsWith("/")) throw unsafe();

  const path = normalizeEntryPath(rawName);
  if (seen.has(path)) throw unsafe();
  seen.add(path);
  if (entryCount >= MARKETPLACE_ARCHIVE_LIMITS.maxEntries) throw tooLarge();
  return { path, kind, data: kind === "file" ? Buffer.from(header.data) : Buffer.alloc(0) };
}

function parseTar(tar: Buffer): TarEntry[] {
  const entries: TarEntry[] = [];
  const seen = new Set<string>();
  let offset = 0;
  let pendingName: string | undefined;

  while (offset + BLOCK <= tar.length) {
    if (tar.subarray(offset, offset + BLOCK).every((byte) => byte === 0)) return entries;
    const header = readRawHeader(tar, offset);
    offset = header.next;

    const meta = applyMetaHeader(header, pendingName);
    if (meta.isMeta) {
      pendingName = meta.pendingName;
      continue;
    }
    entries.push(buildEntry(header, pendingName, seen, entries.length));
    pendingName = undefined;
  }
  // No end-of-archive marker: a truncated stream.
  throw invalid();
}

function gunzipBounded(bytes: Uint8Array): Buffer {
  try {
    return gunzipSync(bytes, { maxOutputLength: MARKETPLACE_ARCHIVE_LIMITS.maxUnpackedBytes });
  } catch (error) {
    const code = (error as { code?: string } | null)?.code;
    if (code === "ERR_BUFFER_TOO_LARGE") throw tooLarge();
    throw invalid();
  }
}

/**
 * Pick the plugin root: the directory holding the single `plugin.json`, either at the top
 * of the archive or one directory down.
 */
function locateManifest(entries: readonly TarEntry[]): string {
  const manifests = entries.filter(
    (entry) =>
      entry.kind === "file" && (entry.path === "plugin.json" || entry.path.endsWith("/plugin.json"))
  );
  if (manifests.length !== 1) throw new MarketplaceIntegrityError("manifest_invalid");
  const depth = manifests[0].path.split("/").length;
  if (depth > 2) throw new MarketplaceIntegrityError("manifest_invalid");
  return manifests[0].path;
}

export type ExtractedMarketplacePackage = {
  /** Directory inside `stagingDir` that holds `plugin.json`: what the plugin manager installs. */
  pluginDir: string;
};

/**
 * Extract `bytes` into `stagingDir` (a fresh, private, empty directory owned by the caller,
 * who also removes it) and check the manifest against the name and version the signed index
 * listed. Throws {@link MarketplaceIntegrityError}; on failure the caller deletes the staging
 * directory and nothing has been handed to the plugin manager.
 */
export async function extractMarketplaceArchive(
  bytes: Uint8Array,
  stagingDir: string,
  expected: { name: string; version: string }
): Promise<ExtractedMarketplacePackage> {
  const entries = parseTar(gunzipBounded(bytes));
  const manifestPath = locateManifest(entries);

  const root = resolve(stagingDir);
  for (const entry of entries) {
    const destination = resolve(root, entry.path);
    if (!destination.startsWith(root + sep)) throw unsafe();
    try {
      if (entry.kind === "directory") {
        await mkdir(destination, { recursive: true, mode: 0o755 });
      } else {
        await mkdir(dirname(destination), { recursive: true, mode: 0o755 });
        // "wx": never follow or overwrite anything that already exists. Modes are fixed:
        // archive permission bits (setuid, exec) are not honoured.
        await writeFile(destination, entry.data, { flag: "wx", mode: 0o644 });
      }
    } catch {
      // e.g. a file used as a directory, or an existing path: the archive is malformed.
      throw unsafe();
    }
  }

  let manifest: unknown;
  try {
    manifest = JSON.parse(await readFile(join(root, manifestPath), "utf8"));
  } catch {
    throw new MarketplaceIntegrityError("manifest_invalid");
  }
  const validated = safeValidateManifest(manifest);
  if (!validated.success) throw new MarketplaceIntegrityError("manifest_invalid");
  if (validated.data.name !== expected.name || validated.data.version !== expected.version) {
    throw new MarketplaceIntegrityError("manifest_mismatch");
  }

  return { pluginDir: resolve(root, dirname(manifestPath)) };
}
