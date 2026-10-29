import { constants } from "node:fs";
import { lstat, open, opendir, type FileHandle } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { matchesSearch } from "@/shared/utils/turkishText";
import { redactSecrets } from "@/shared/utils/logRedaction";
import { getAppLogFilePath } from "./logEnv";
import { redactPayload } from "./logPayloads";

const MAX_FILES = 64;
const MAX_DIRECTORY_ENTRIES = 4096;
const MAX_SCAN_BYTES = 8 * 1024 * 1024;
const BLOCK_BYTES = 64 * 1024;
const MAX_LINE_BYTES = 256 * 1024;
const LEVELS: Record<string, number> = {
  trace: 5,
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
};
const PINO_LEVELS: Record<number, string> = {
  10: "trace",
  20: "debug",
  30: "info",
  40: "warn",
  50: "error",
  60: "fatal",
};
const RANGES = {
  "1h": 60 * 60_000,
  "24h": 24 * 60 * 60_000,
  "7d": 7 * 24 * 60 * 60_000,
  all: Infinity,
};
export const consoleLogQuerySchema = z.object({
  level: z.enum(["all", "trace", "debug", "info", "warn", "error", "fatal"]).default("all"),
  range: z.enum(["1h", "24h", "7d", "all"]).default("all"),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .catch(500)
    .transform((value) => Math.min(value, 2000)),
  component: z.string().max(128).default(""),
  cursor: z
    .string()
    .min(1)
    .max(1800)
    .regex(/^[A-Za-z0-9_-]+$/)
    .optional(),
});
type Query = z.infer<typeof consoleLogQuerySchema>;
const cursorSchema = z
  .object({
    v: z.literal(1),
    id: z
      .string()
      .min(1)
      .max(100)
      .regex(/^\d+:\d+$/),
    end: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
    until: z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER),
    range: consoleLogQuerySchema.shape.range,
    level: consoleLogQuerySchema.shape.level,
    component: consoleLogQuerySchema.shape.component,
  })
  .strict();
type Cursor = z.infer<typeof cursorSchema>;
type LogFile = { name: string; id: string; size: number; mtime: number };
export type ConsoleLogEntry = Record<string, unknown> & {
  timestamp: string;
  level: string;
  msg: string;
  message: string;
};
export class ConsoleLogHistoryError extends Error {
  constructor(public readonly status: 400 | 410) {
    super(
      status === 400 ? "Invalid log history query." : "Log history changed. Refresh to continue."
    );
  }
}
function isMissing(error: unknown): boolean {
  return (
    !!error &&
    typeof error === "object" &&
    "code" in error &&
    (error.code === "ENOENT" || error.code === "ENOTDIR")
  );
}
function identity(stat: { dev: bigint; ino: bigint }): string {
  return `${stat.dev}:${stat.ino}`;
}
function decodeCursor(query: Query): Cursor | undefined {
  if (!query.cursor) return;
  try {
    const cursor = cursorSchema.parse(
      JSON.parse(Buffer.from(query.cursor, "base64url").toString("utf8"))
    );
    if (
      cursor.range !== query.range ||
      cursor.level !== query.level ||
      cursor.component !== query.component ||
      cursor.until > Date.now() + 1000
    )
      throw new Error("cursor mismatch");
    return cursor;
  } catch {
    throw new ConsoleLogHistoryError(400);
  }
}
async function logFiles(logPath: string): Promise<{ files: LogFile[]; truncated: boolean }> {
  const directory = path.dirname(logPath),
    active = path.basename(logPath);
  const ext = path.extname(active),
    base = path.basename(active, ext);
  const files: LogFile[] = [];
  let count = 0,
    truncated = false;
  try {
    for await (const entry of await opendir(directory)) {
      if (++count > MAX_DIRECTORY_ENTRIES) {
        truncated = true;
        break;
      }
      if (!entry.isFile() || entry.isSymbolicLink()) continue;
      if (entry.name !== active) {
        if (!entry.name.startsWith(base + ".") || (ext && !entry.name.endsWith(ext))) continue;
        const stamp = entry.name.slice(base.length + 1, ext ? -ext.length : undefined);
        if (!/^\d{4}-\d{2}-\d{2}_\d{6}$/.test(stamp)) continue;
      }
      try {
        const stat = await lstat(path.join(directory, entry.name), { bigint: true });
        if (!stat.isFile() || stat.isSymbolicLink() || stat.size > BigInt(Number.MAX_SAFE_INTEGER))
          continue;
        files.push({
          name: entry.name,
          id: identity(stat),
          size: Number(stat.size),
          mtime: Number(stat.mtimeMs),
        });
      } catch (error) {
        if (!isMissing(error)) throw error;
      }
    }
  } catch (error) {
    if (!isMissing(error)) throw error;
  }
  files.sort(
    (a, b) =>
      b.mtime - a.mtime ||
      Number(b.name === active) - Number(a.name === active) ||
      b.name.localeCompare(a.name)
  );
  const seen = new Set<string>();
  const unique = files.filter((file) => {
    if (seen.has(file.id)) return false;
    seen.add(file.id);
    return true;
  });
  return { files: unique.slice(0, MAX_FILES), truncated: truncated || unique.length > MAX_FILES };
}
type Scan = { remaining: number; truncated: boolean; resumeEnd: number };
/** Reverse reads retain at most one bounded incomplete line and one fixed block. */
async function* reverseLines(
  handle: FileHandle,
  end: number,
  scan: Scan
): AsyncGenerator<{ raw: Buffer; start: number }> {
  let position = end,
    pending: Buffer = Buffer.alloc(0),
    skipTail = false;
  while (position > 0 && scan.remaining > 0) {
    const length = Math.min(BLOCK_BYTES, position, scan.remaining);
    const block = Buffer.allocUnsafe(length);
    const start = position - length;
    const { bytesRead } = await handle.read(block, 0, length, start);
    if (bytesRead !== length) throw new ConsoleLogHistoryError(410);
    position = start;
    scan.remaining -= bytesRead;
    const bytes = pending.length ? Buffer.concat([block, pending]) : block;
    let cut = bytes.length;
    for (let index = bytes.length - 1; index >= 0; index--) {
      if (bytes[index] !== 10) continue;
      const raw = bytes.subarray(index + 1, cut);
      cut = index;
      if (skipTail) {
        skipTail = false;
        continue;
      }
      if (!raw.length) continue;
      scan.resumeEnd = position + index + 1;
      if (raw.length > MAX_LINE_BYTES) {
        scan.truncated = true;
        continue;
      }
      yield { raw, start: scan.resumeEnd };
    }
    const prefix = bytes.subarray(0, cut);
    if (position === 0) {
      scan.resumeEnd = 0;
      if (prefix.length && !skipTail) {
        if (prefix.length <= MAX_LINE_BYTES) yield { raw: prefix, start: 0 };
        else scan.truncated = true;
      }
      return;
    }
    if (skipTail || prefix.length > MAX_LINE_BYTES) {
      pending = Buffer.alloc(0);
      skipTail = true;
      scan.truncated = true;
    } else {
      pending = Buffer.from(prefix);
    }
    scan.resumeEnd = position + pending.length;
  }
  if (position > 0) scan.truncated = true;
}
function stringify(value: unknown): string {
  if (value == null) return "";
  return typeof value === "string" ? value : (JSON.stringify(value) ?? "");
}
function normalize(
  raw: Buffer,
  file: LogFile,
  query: Query,
  until: number
): ConsoleLogEntry | null {
  try {
    // Defense for older logs written before redaction was enabled; PII is not mutated.
    const value: unknown = redactPayload(JSON.parse(redactSecrets(raw.toString("utf8"))));
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const entry = value as Record<string, unknown>;
    const rawTime = entry.time ?? entry.timestamp ?? file.mtime;
    const time = new Date(rawTime as string | number).getTime();
    if (!Number.isFinite(time) || time > until || time < until - RANGES[query.range]) return null;
    const level =
      typeof entry.level === "number"
        ? PINO_LEVELS[entry.level] || "info"
        : String(entry.level || "info").toLowerCase();
    if ((LEVELS[level] || 0) < (LEVELS[query.level] || 0)) return null;
    const component = stringify(entry.component ?? entry.module);
    if (query.component && !matchesSearch(component, query.component)) return null;
    return {
      ...entry,
      timestamp: new Date(time).toISOString(),
      level,
      msg: stringify(entry.msg ?? entry.message),
      message: stringify(entry.message ?? entry.msg),
      ...(entry.component !== undefined ? { component } : {}),
      ...(entry.module !== undefined ? { module: stringify(entry.module) } : {}),
      ...(entry.correlationId !== undefined
        ? { correlationId: stringify(entry.correlationId) }
        : {}),
    };
  } catch {
    return null;
  } // Malformed/oversized structured entries never break history.
}
export async function readConsoleLogHistory(
  query: Query
): Promise<{ entries: ConsoleLogEntry[]; nextCursor?: string; truncated: boolean }> {
  const cursor = decodeCursor(query),
    until = cursor?.until ?? Date.now();
  const logPath = path.resolve(getAppLogFilePath());
  try {
    const active = await lstat(logPath);
    if (!active.isFile() && !active.isSymbolicLink())
      throw new Error("Invalid application log file");
  } catch (error) {
    if (!isMissing(error)) throw error;
  }
  const listing = await logFiles(logPath);
  const { files } = listing;
  let index = cursor ? files.findIndex((file) => file.id === cursor.id) : 0;
  if (index < 0) throw new ConsoleLogHistoryError(410);
  const entries: ConsoleLogEntry[] = [];
  const scan: Scan = { remaining: MAX_SCAN_BYTES, truncated: listing.truncated, resumeEnd: 0 };
  let next: { file: LogFile; end: number } | undefined;
  for (; index < files.length; index++) {
    const file = files[index];
    const end = cursor && file.id === cursor.id ? cursor.end : file.size;
    if (end > file.size) throw new ConsoleLogHistoryError(410);
    if (!end) continue;
    if (!scan.remaining) {
      next = { file, end };
      break;
    }
    let handle: FileHandle | undefined;
    try {
      handle = await open(
        path.join(path.dirname(logPath), file.name),
        constants.O_RDONLY | (constants.O_NOFOLLOW || 0) | (constants.O_NONBLOCK || 0)
      );
      const stat = await handle.stat({ bigint: true });
      if (!stat.isFile() || identity(stat) !== file.id) throw new ConsoleLogHistoryError(410);
      scan.resumeEnd = end;
      for await (const line of reverseLines(handle, end, scan)) {
        const entry = normalize(line.raw, file, query, until);
        if (entry) entries.push(entry);
        if (entries.length === query.limit) break;
      }
      if (entries.length === query.limit || !scan.remaining) {
        if (scan.resumeEnd > 0) next = { file, end: scan.resumeEnd };
        else if (files[index + 1]) next = { file: files[index + 1], end: files[index + 1].size };
        break;
      }
    } catch (error) {
      // Rotation/deletion races are explicit, not a false empty success replacing the UI.
      if (isMissing(error)) throw new ConsoleLogHistoryError(410);
      throw error;
    } finally {
      await handle?.close();
    }
  }
  // Preserve physical order, including undated entries and equal timestamps.
  entries.reverse();
  const nextCursor = next
    ? Buffer.from(
        JSON.stringify({
          v: 1,
          id: next.file.id,
          end: next.end,
          until,
          range: query.range,
          level: query.level,
          component: query.component,
        } satisfies Cursor)
      ).toString("base64url")
    : undefined;
  return { entries, ...(nextCursor ? { nextCursor } : {}), truncated: scan.truncated };
}
