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
const LOG_STAMP = /^\d{4}-\d{2}-\d{2}_\d{6}$/;

/** The active log or one of its dated rotations (`<base>.<stamp><ext>`). */
function isLogFileName(name: string, active: string, base: string, ext: string): boolean {
  if (name === active) return true;
  if (!name.startsWith(base + ".") || (ext && !name.endsWith(ext))) return false;
  return LOG_STAMP.test(name.slice(base.length + 1, ext ? -ext.length : undefined));
}
async function statLogFile(directory: string, name: string): Promise<LogFile | null> {
  try {
    const stat = await lstat(path.join(directory, name), { bigint: true });
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size > BigInt(Number.MAX_SAFE_INTEGER))
      return null;
    return { name, id: identity(stat), size: Number(stat.size), mtime: Number(stat.mtimeMs) };
  } catch (error) {
    if (!isMissing(error)) throw error;
    return null;
  }
}
async function collectLogFiles(
  directory: string,
  active: string
): Promise<{ files: LogFile[]; truncated: boolean }> {
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
      if (!isLogFileName(entry.name, active, base, ext)) continue;
      const file = await statLogFile(directory, entry.name);
      if (file) files.push(file);
    }
  } catch (error) {
    if (!isMissing(error)) throw error;
  }
  return { files, truncated };
}
async function logFiles(logPath: string): Promise<{ files: LogFile[]; truncated: boolean }> {
  const active = path.basename(logPath);
  const { files, truncated } = await collectLogFiles(path.dirname(logPath), active);
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
type BlockLine = { raw: Buffer; resumeEnd: number; oversize: boolean };
/** Complete lines of one block, newest first; `cut` is where the incomplete head starts, and
 * `skipTail` is whether a pending oversize tail is still being discarded. */
function splitBlockLines(
  bytes: Buffer,
  position: number,
  skipTail: boolean
): { lines: BlockLine[]; cut: number; skipTail: boolean } {
  const lines: BlockLine[] = [];
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
    lines.push({ raw, resumeEnd: position + index + 1, oversize: raw.length > MAX_LINE_BYTES });
  }
  return { lines, cut, skipTail };
}
/** Read one fixed block that ends at `position`; a short read means the file changed. */
async function readBlock(
  handle: FileHandle,
  position: number,
  remaining: number
): Promise<{ block: Buffer; start: number }> {
  const length = Math.min(BLOCK_BYTES, position, remaining);
  const block = Buffer.allocUnsafe(length);
  const start = position - length;
  const { bytesRead } = await handle.read(block, 0, length, start);
  if (bytesRead !== length) throw new ConsoleLogHistoryError(410);
  return { block, start };
}
/** The first line of the file (no newline before it), or null when it is not usable. */
function headLine(prefix: Buffer, skipTail: boolean, scan: Scan): Buffer | null {
  if (!prefix.length || skipTail) return null;
  if (prefix.length <= MAX_LINE_BYTES) return prefix;
  scan.truncated = true;
  return null;
}
/** The bounded incomplete line carried into the next (older) block. */
function carryOver(
  prefix: Buffer,
  skipTail: boolean,
  scan: Scan
): { pending: Buffer; skipTail: boolean } {
  if (skipTail || prefix.length > MAX_LINE_BYTES) {
    scan.truncated = true;
    return { pending: Buffer.alloc(0), skipTail: true };
  }
  return { pending: Buffer.from(prefix), skipTail: false };
}
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
    const { block, start } = await readBlock(handle, position, scan.remaining);
    position = start;
    scan.remaining -= block.length;
    const bytes = pending.length ? Buffer.concat([block, pending]) : block;
    const split = splitBlockLines(bytes, position, skipTail);
    for (const line of split.lines) {
      scan.resumeEnd = line.resumeEnd;
      if (line.oversize) {
        scan.truncated = true;
        continue;
      }
      yield { raw: line.raw, start: line.resumeEnd };
    }
    skipTail = split.skipTail;
    const prefix = bytes.subarray(0, split.cut);
    if (position === 0) {
      scan.resumeEnd = 0;
      const first = headLine(prefix, skipTail, scan);
      if (first) yield { raw: first, start: 0 };
      return;
    }
    ({ pending, skipTail } = carryOver(prefix, skipTail, scan));
    scan.resumeEnd = position + pending.length;
  }
  if (position > 0) scan.truncated = true;
}
function stringify(value: unknown): string {
  if (value == null) return "";
  return typeof value === "string" ? value : (JSON.stringify(value) ?? "");
}
/** Epoch-ms of an entry, or null when it falls outside the query window. */
function entryTime(entry: Record<string, unknown>, file: LogFile, query: Query, until: number) {
  const rawTime = entry.time ?? entry.timestamp ?? file.mtime;
  const time = new Date(rawTime as string | number).getTime();
  if (!Number.isFinite(time) || time > until || time < until - RANGES[query.range]) return null;
  return time;
}
function entryLevel(entry: Record<string, unknown>): string {
  return typeof entry.level === "number"
    ? PINO_LEVELS[entry.level] || "info"
    : String(entry.level || "info").toLowerCase();
}
function buildEntry(
  entry: Record<string, unknown>,
  time: number,
  level: string,
  component: string
): ConsoleLogEntry {
  return {
    ...entry,
    timestamp: new Date(time).toISOString(),
    level,
    msg: stringify(entry.msg ?? entry.message),
    message: stringify(entry.message ?? entry.msg),
    ...(entry.component !== undefined ? { component } : {}),
    ...(entry.module !== undefined ? { module: stringify(entry.module) } : {}),
    ...(entry.correlationId !== undefined ? { correlationId: stringify(entry.correlationId) } : {}),
  };
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
    const time = entryTime(entry, file, query, until);
    if (time === null) return null;
    const level = entryLevel(entry);
    if ((LEVELS[level] || 0) < (LEVELS[query.level] || 0)) return null;
    const component = stringify(entry.component ?? entry.module);
    if (query.component && !matchesSearch(component, query.component)) return null;
    return buildEntry(entry, time, level, component);
  } catch {
    return null;
  } // Malformed/oversized structured entries never break history.
}
/** The active log may be missing, but never anything other than a file or a symlink. */
async function assertActiveLogShape(logPath: string): Promise<void> {
  try {
    const active = await lstat(logPath);
    if (!active.isFile() && !active.isSymbolicLink())
      throw new Error("Invalid application log file");
  } catch (error) {
    if (!isMissing(error)) throw error;
  }
}
type NextPage = { file: LogFile; end: number };
type ScanContext = {
  logPath: string;
  query: Query;
  until: number;
  scan: Scan;
  entries: ConsoleLogEntry[];
};
/** Where the next (older) page starts once this one is full or the scan budget is spent. */
function resumePoint(files: LogFile[], index: number, scan: Scan): NextPage | undefined {
  if (scan.resumeEnd > 0) return { file: files[index], end: scan.resumeEnd };
  const following = files[index + 1];
  return following ? { file: following, end: following.size } : undefined;
}
/** Newest-first scan of one file, appending matching entries until the page limit. */
async function scanFile(ctx: ScanContext, file: LogFile, end: number): Promise<void> {
  let handle: FileHandle | undefined;
  try {
    handle = await open(
      path.join(path.dirname(ctx.logPath), file.name),
      constants.O_RDONLY | (constants.O_NOFOLLOW || 0) | (constants.O_NONBLOCK || 0)
    );
    const stat = await handle.stat({ bigint: true });
    if (!stat.isFile() || identity(stat) !== file.id) throw new ConsoleLogHistoryError(410);
    ctx.scan.resumeEnd = end;
    for await (const line of reverseLines(handle, end, ctx.scan)) {
      const entry = normalize(line.raw, file, ctx.query, ctx.until);
      if (entry) ctx.entries.push(entry);
      if (ctx.entries.length === ctx.query.limit) break;
    }
  } catch (error) {
    // Rotation/deletion races are explicit, not a false empty success replacing the UI.
    if (isMissing(error)) throw new ConsoleLogHistoryError(410);
    throw error;
  } finally {
    await handle?.close();
  }
}
function startOffset(cursor: Cursor | undefined, file: LogFile): number {
  const end = cursor && file.id === cursor.id ? cursor.end : file.size;
  if (end > file.size) throw new ConsoleLogHistoryError(410);
  return end;
}
function encodeCursor(next: NextPage, until: number, query: Query): string {
  return Buffer.from(
    JSON.stringify({
      v: 1,
      id: next.file.id,
      end: next.end,
      until,
      range: query.range,
      level: query.level,
      component: query.component,
    } satisfies Cursor)
  ).toString("base64url");
}
export async function readConsoleLogHistory(
  query: Query
): Promise<{ entries: ConsoleLogEntry[]; nextCursor?: string; truncated: boolean }> {
  const cursor = decodeCursor(query),
    until = cursor?.until ?? Date.now();
  const logPath = path.resolve(getAppLogFilePath());
  await assertActiveLogShape(logPath);
  const listing = await logFiles(logPath);
  const { files } = listing;
  let index = cursor ? files.findIndex((file) => file.id === cursor.id) : 0;
  if (index < 0) throw new ConsoleLogHistoryError(410);
  const scan: Scan = { remaining: MAX_SCAN_BYTES, truncated: listing.truncated, resumeEnd: 0 };
  const ctx: ScanContext = { logPath, query, until, scan, entries: [] };
  let next: NextPage | undefined;
  for (; index < files.length; index++) {
    const file = files[index];
    const end = startOffset(cursor, file);
    if (!end) continue;
    if (!scan.remaining) {
      next = { file, end };
      break;
    }
    await scanFile(ctx, file, end);
    if (ctx.entries.length === query.limit || !scan.remaining) {
      next = resumePoint(files, index, scan);
      break;
    }
  }
  // Preserve physical order, including undated entries and equal timestamps.
  const entries = ctx.entries.reverse();
  const nextCursor = next ? encodeCursor(next, until, query) : undefined;
  return { entries, ...(nextCursor ? { nextCursor } : {}), truncated: scan.truncated };
}
