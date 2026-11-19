/**
 * Read an already-packed npm tarball as the pack-artifact gate's report (#20644).
 *
 * `check:pack-artifact` used to get its file list from its own `npm pack --dry-run --json`:
 * 12–22 min on the v3.8.54 publish runs, and a second, separate pack of the same dist/ —
 * not the bytes that were then booted and published. The npm-publish job packs once
 * (#20556) and now hands that file to the gate through the same `--tarball` /
 * OMNIROUTE_PACKED_TARBALL input the boot and install-upgrade gates take, so the gate
 * validates the published bytes themselves.
 *
 * One streaming pass over the gzip (no extraction to disk, no new dependency) yields what
 * `npm pack --dry-run --json` reported — every file path and size, the entry count, the
 * unpacked size — plus the packed size from the file itself and the contents of a few
 * small entries the gate needs (package.json for name/version, dist/BUILD_SHA for
 * provenance). Handles ustar, pax (`x` headers: long paths, large sizes) and GNU long
 * names (`L`), which covers npm's own packer and GNU/BSD tar.
 */
import { createReadStream, statSync } from "node:fs";
import path from "node:path";
import { createGunzip } from "node:zlib";

const BLOCK = 512;
const STREAM_CHUNK = 1 << 20;
/** npm tarballs keep every file under this directory. */
export const NPM_TARBALL_ROOT = "package/";

export type PackedTarballFile = { path: string; size: number };

export type PackedTarballContents = {
  /** Basename of the tarball, like npm's `filename`. */
  filename: string;
  /** Size of the .tgz on disk — what the registry receives (npm's `size`). */
  size: number;
  /** Number of file entries (npm's `entryCount`). */
  entryCount: number;
  /** Sum of the file entries' sizes (npm's `unpackedSize`). */
  unpackedSize: number;
  /** File entries, paths relative to `package/` (npm's `files[]`). */
  files: PackedTarballFile[];
  /**
   * Contents of the requested entries (paths relative to `package/`) that were present;
   * an absent entry has no key.
   */
  captured: Record<string, string>;
};

type PendingOverrides = { path?: string; size?: number };

function readString(block: Buffer, offset: number, length: number): string {
  const field = block.subarray(offset, offset + length);
  const end = field.indexOf(0);
  return field.subarray(0, end === -1 ? field.length : end).toString("utf8");
}

function readSize(block: Buffer): number {
  // GNU base-256 for sizes over 8 GiB: high bit of the first byte set.
  if (block[124] & 0x80) {
    let value = 0;
    for (let i = 125; i < 136; i++) value = value * 256 + block[i];
    return value;
  }
  const octal = readString(block, 124, 12).trim();
  return octal ? Number.parseInt(octal, 8) : 0;
}

function checksumMatches(block: Buffer): boolean {
  const stored = Number.parseInt(readString(block, 148, 8).trim(), 8);
  if (!Number.isFinite(stored)) return false;
  let sum = 0;
  for (let i = 0; i < BLOCK; i++) sum += i >= 148 && i < 156 ? 0x20 : block[i];
  return sum === stored;
}

function isZeroBlock(block: Buffer): boolean {
  for (let i = 0; i < BLOCK; i++) if (block[i] !== 0) return false;
  return true;
}

/** Parse pax extended-header records (`<len> <key>=<value>\n`). */
export function parsePaxRecords(data: Buffer): Record<string, string> {
  const records: Record<string, string> = {};
  let offset = 0;
  while (offset < data.length) {
    const space = data.indexOf(0x20, offset);
    if (space === -1) break;
    const length = Number.parseInt(data.subarray(offset, space).toString("utf8"), 10);
    if (!Number.isFinite(length) || length <= 0) break;
    const record = data.subarray(space + 1, offset + length - 1).toString("utf8");
    const eq = record.indexOf("=");
    if (eq > 0) records[record.slice(0, eq)] = record.slice(eq + 1);
    offset += length;
  }
  return records;
}

/**
 * Stream a gzipped tar and return its file entries and the requested small entries.
 * Throws on a non-gzip/non-tar file, a bad header checksum or a truncated archive.
 */
export async function readPackedTarball(
  tarballPath: string,
  { capture = [] as string[] } = {}
): Promise<PackedTarballContents> {
  const absolute = path.resolve(tarballPath);
  let size: number;
  try {
    size = statSync(absolute).size;
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code ?? (error as Error).message;
    throw new Error(`cannot read tarball ${absolute} (${code})`);
  }
  const wanted = new Set(capture);
  const files: PackedTarballFile[] = [];
  const captured: Record<string, string> = {};

  let buffered: Buffer = Buffer.alloc(0);
  // Bytes of the current entry's data (plus padding) still to consume.
  let dataRemaining = 0;
  let dataPadding = 0;
  // What to do with the current entry's data.
  let sink: { kind: "skip" } | { kind: "collect"; chunks: Buffer[]; onDone: (b: Buffer) => void } =
    { kind: "skip" };
  let overrides: PendingOverrides = {};
  let ended = false;

  const finishData = () => {
    if (sink.kind === "collect") sink.onDone(Buffer.concat(sink.chunks));
    sink = { kind: "skip" };
  };

  const handleHeader = (block: Buffer) => {
    if (!checksumMatches(block)) {
      throw new Error(
        `${path.basename(absolute)} is not a valid tar archive (bad header checksum)`
      );
    }
    const typeflag = String.fromCharCode(block[156] || 0x30);
    const magic = readString(block, 257, 6);
    let name = readString(block, 0, 100);
    const prefix = magic === "ustar" ? readString(block, 345, 155) : "";
    if (prefix) name = `${prefix}/${name}`;
    let entrySize = readSize(block);

    const metaCollect = (onDone: (data: Buffer) => void) => {
      sink = { kind: "collect", chunks: [], onDone };
    };

    if (typeflag === "x") {
      metaCollect((data) => {
        const records = parsePaxRecords(data);
        if (records.path) overrides.path = records.path;
        if (records.size) overrides.size = Number.parseInt(records.size, 10);
      });
    } else if (typeflag === "L") {
      metaCollect((data) => {
        const end = data.indexOf(0);
        overrides.path = data.subarray(0, end === -1 ? data.length : end).toString("utf8");
      });
    } else if (typeflag === "g" || typeflag === "K") {
      sink = { kind: "skip" };
    } else {
      if (overrides.path !== undefined) name = overrides.path;
      if (overrides.size !== undefined && Number.isFinite(overrides.size)) {
        entrySize = overrides.size;
      }
      overrides = {};
      if (typeflag !== "5") {
        const relative = name.startsWith(NPM_TARBALL_ROOT)
          ? name.slice(NPM_TARBALL_ROOT.length)
          : name;
        // An entry outside package/ keeps its full name so the path policy flags it.
        files.push({ path: relative, size: entrySize });
        if (name.startsWith(NPM_TARBALL_ROOT) && wanted.has(relative)) {
          metaCollect((data) => {
            captured[relative] = data.toString("utf8");
          });
        } else {
          sink = { kind: "skip" };
        }
      } else {
        sink = { kind: "skip" };
      }
    }

    dataRemaining = entrySize;
    dataPadding = (BLOCK - (entrySize % BLOCK)) % BLOCK;
    if (dataRemaining === 0) finishData();
  };

  const consume = (chunk: Buffer) => {
    let offset = 0;
    while (offset < chunk.length && !ended) {
      if (dataRemaining > 0) {
        const take = Math.min(dataRemaining, chunk.length - offset);
        if (sink.kind === "collect") sink.chunks.push(chunk.subarray(offset, offset + take));
        dataRemaining -= take;
        offset += take;
        if (dataRemaining === 0) finishData();
        continue;
      }
      if (dataPadding > 0) {
        const take = Math.min(dataPadding, chunk.length - offset);
        dataPadding -= take;
        offset += take;
        continue;
      }
      const need = BLOCK - buffered.length;
      const take = Math.min(need, chunk.length - offset);
      buffered = Buffer.concat([buffered, chunk.subarray(offset, offset + take)]);
      offset += take;
      if (buffered.length < BLOCK) continue;
      const block = buffered;
      buffered = Buffer.alloc(0);
      if (isZeroBlock(block)) {
        ended = true;
        break;
      }
      handleHeader(block);
    }
  };

  // 1 MiB reads and inflate chunks instead of the 64 KiB / 16 KiB defaults: on the real
  // 3.8.54 tarball (121.7 MB packed, 578.7 MB unpacked) on a loaded runner-class host this
  // took the gunzip from 139 s to 22 s, all of it per-chunk overhead.
  const stream = createReadStream(absolute, { highWaterMark: STREAM_CHUNK }).pipe(
    createGunzip({ chunkSize: STREAM_CHUNK })
  );
  try {
    for await (const chunk of stream) {
      if (ended) continue; // drain the rest (end-of-archive padding)
      consume(chunk as Buffer);
    }
  } catch (error) {
    throw new Error(
      `cannot read ${path.basename(absolute)} as a gzipped tar: ${(error as Error).message}`
    );
  }
  if (!ended && (dataRemaining > 0 || dataPadding > 0 || buffered.length > 0)) {
    throw new Error(`${path.basename(absolute)} is truncated (archive ends inside an entry)`);
  }

  return {
    filename: path.basename(absolute),
    size,
    entryCount: files.length,
    unpackedSize: files.reduce((sum, file) => sum + file.size, 0),
    files,
    captured,
  };
}

/**
 * Name/version mismatches between a tarball's package.json and ./package.json, in the same
 * wording as check-pack-boot.mjs's verifyPrebuiltTarball. Empty when they match.
 */
export function describeManifestMismatch(
  manifestJson: string | undefined,
  expected: { name: string; version: string }
): string[] {
  if (manifestJson === undefined) return ["no package/package.json (not an npm tarball?)"];
  let manifest: { name?: unknown; version?: unknown };
  try {
    manifest = JSON.parse(manifestJson) ?? {};
  } catch {
    return ["package/package.json is not valid JSON"];
  }
  const mismatches: string[] = [];
  if (manifest.name !== expected.name) {
    mismatches.push(`name "${manifest.name}" (expected "${expected.name}")`);
  }
  if (manifest.version !== expected.version) {
    mismatches.push(`version "${manifest.version}" (expected "${expected.version}")`);
  }
  return mismatches;
}
