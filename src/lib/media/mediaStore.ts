import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { resolveDataDir } from "@/lib/dataPaths";
import { getCallLogRetentionDays } from "@/lib/logEnv";

/**
 * On-disk storage for generated media the caller could not otherwise fetch.
 *
 * Some video providers publish results behind their own auth (OpenRouter's
 * `unsigned_urls` point at `/api/v1/videos/{id}/content`, which 401s without the
 * upstream key). Returning those URLs, or the equivalent base64 blob, makes the
 * response shape depend on which provider served it — a combo's failover path and
 * its happy path would hand back different payloads. Persisting the bytes and
 * handing back a URL on this gateway keeps every provider's result the same shape.
 *
 * Mirrors the call-log artifact conventions: a directory under DATA_DIR, atomic
 * writes via tmp+rename, and null (rather than throwing) when storage is
 * unavailable so callers can degrade deliberately.
 */
const isCloud = typeof globalThis.caches === "object" && globalThis.caches !== null;
const isBuildPhase =
  process.env.NEXT_PHASE === "phase-production-build" || process.env.OMNIROUTE_BUILDING === "1";
const DATA_DIR = resolveDataDir({ isCloud });

export const MEDIA_DIR = isCloud || isBuildPhase ? null : path.join(DATA_DIR, "media");

/**
 * Owner tag for media written with no owner key (a dashboard-session request with no API key).
 * Mirrors `canAccessOwnedRecord()`: an unowned record is readable only by the dashboard
 * session or a manage-scope key, never by an arbitrary authenticated key.
 */
export const NO_OWNER_TAG = "none";

/**
 * Ids are `<ownerTag>__<uuid>.<ext>`. The owner tag is a truncated digest of the owning id
 * (an API key id, or the shared anonymous-caller sentinel under REQUIRE_API_KEY=false) rather
 * than the id itself, so a served URL does not leak which key produced it and no side table is
 * needed to answer "who owns this?".
 *
 * Both parts must match exactly, which also keeps `../` and absolute paths out of the serving
 * route — that route takes its id straight from the URL.
 */
export const MEDIA_ID_PATTERN = /^([a-f0-9]{16}|none)__[a-f0-9]{32}\.[a-z0-9]{2,5}$/;

/** Extensions we will store, mapped to the mime type the serving route reports. */
const MIME_TYPES: Record<string, string> = {
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
};

/**
 * Persist media bytes and return the id to serve them under, or null when no
 * writable media directory exists. Atomic write: a reader never observes a
 * partially written file.
 */
export function writeMediaFile(
  bytes: Buffer,
  extension = "mp4",
  ownerTag: string | null = null
): string | null {
  if (!MEDIA_DIR || bytes.length === 0) return null;
  const ext = extension.toLowerCase().replace(/[^a-z0-9]/g, "") || "mp4";
  const owner = normalizeOwnerTag(ownerTag);
  const id = `${owner}__${randomUUID().replaceAll("-", "")}.${ext}`;
  const absPath = path.join(MEDIA_DIR, id);
  const tmpPath = `${absPath}.${process.pid}.${Date.now()}.tmp`;
  try {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
    fs.writeFileSync(tmpPath, bytes);
    fs.renameSync(tmpPath, absPath);
  } catch {
    try {
      fs.rmSync(tmpPath, { force: true });
    } catch {
      // Best effort — the tmp file is inert either way.
    }
    return null;
  }
  // Bound the directory without a scheduler: every write sweeps expired files, so
  // growth tracks generation activity rather than running away between sweeps.
  // ponytail: O(files) scan per write, and nothing expires while no generation runs.
  // Both are fine at this scale (a few dozen files); move to a scheduled sweep if the
  // directory ever reaches thousands of entries.
  pruneExpiredMedia();
  return id;
}

/**
 * Digested owner tag for an owning id (API key id or the anonymous-owner sentinel), or
 * NO_OWNER_TAG when there is none. Only the digest is ever stored or served.
 */
export function mediaOwnerTagFor(ownerId: string | null | undefined): string {
  const raw = typeof ownerId === "string" ? ownerId.trim() : "";
  if (!raw) return NO_OWNER_TAG;
  return createHash("sha256").update(raw).digest("hex").slice(0, 16);
}

function normalizeOwnerTag(ownerTag: string | null): string {
  return ownerTag && /^[a-f0-9]{16}$/.test(ownerTag) ? ownerTag : NO_OWNER_TAG;
}

/** Owner tag embedded in a stored media id, or null when the id is not one of ours. */
export function mediaOwnerTag(id: string): string | null {
  const match = MEDIA_ID_PATTERN.exec(id);
  return match ? match[1] : null;
}

/**
 * Delete media older than the call-log retention window.
 *
 * Deliberately reuses `CALL_LOG_RETENTION_DAYS` (default 7) so there is one
 * retention knob rather than two that can drift. The coupling is real: lowering
 * that value also shortens how long served media URLs stay valid.
 *
 * Age comes from mtime, not from any database row — media ids are deliberately
 * stateless (see MEDIA_ID_PATTERN), so the filesystem is the only record.
 */
export function pruneExpiredMedia(now = Date.now()): number {
  if (!MEDIA_DIR) return 0;
  let entries: string[];
  try {
    entries = fs.readdirSync(MEDIA_DIR);
  } catch {
    return 0;
  }
  const cutoff = now - getCallLogRetentionDays() * 24 * 60 * 60 * 1000;
  let removed = 0;
  for (const entry of entries) {
    const absPath = path.join(MEDIA_DIR, entry);
    try {
      // Skip anything that is not a file we generated, including in-flight tmp files.
      if (!MEDIA_ID_PATTERN.test(entry)) {
        if (!entry.includes(".tmp")) continue;
      }
      const stat = fs.statSync(absPath);
      if (!stat.isFile() || stat.mtimeMs >= cutoff) continue;
      fs.rmSync(absPath, { force: true });
      removed += 1;
    } catch {
      // A file that vanished or is unreadable is not worth failing the write over.
    }
  }
  return removed;
}

/** Absolute path for a stored media id, or null if the id is malformed/unknown. */
export function resolveMediaPath(id: string): string | null {
  if (!MEDIA_DIR || !MEDIA_ID_PATTERN.test(id)) return null;
  const absPath = path.join(MEDIA_DIR, id);
  try {
    if (!fs.statSync(absPath).isFile()) return null;
  } catch {
    return null;
  }
  return absPath;
}

/** Mime type for a stored media id, defaulting to a safe binary type. */
export function mediaMimeType(id: string): string {
  const ext = id.split(".").pop() ?? "";
  return MIME_TYPES[ext.toLowerCase()] ?? "application/octet-stream";
}

/** Media bytes for a stored id, or null when unavailable. */
export function readMediaFile(id: string): Buffer | null {
  const absPath = resolveMediaPath(id);
  if (!absPath) return null;
  try {
    return fs.readFileSync(absPath);
  } catch {
    return null;
  }
}

/**
 * Media sink injected into the open-sse video job pipeline by the route (the job module never
 * imports src/): stores the bytes under the request owner and returns the URL to hand back,
 * or null when no writable media directory exists.
 */
export function createMediaSink({ origin, ownerId }: { origin: string; ownerId: string | null }): {
  store: (bytes: Buffer, format: string) => string | null;
} {
  const base = origin.replace(/\/+$/, "");
  const ownerTag = mediaOwnerTagFor(ownerId);
  return {
    store(bytes, format) {
      const id = writeMediaFile(bytes, format, ownerTag);
      return id ? `${base}/api/v1/media/${id}` : null;
    },
  };
}
