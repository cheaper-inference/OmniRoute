/**
 * Bounded tail reader for a log-serving route, adopted by the CLI logs route.
 *
 * Reads the end of a log file through doubling windows from the end instead
 * of loading the whole file, until the requested limit is covered or the
 * oldest dated entry in the window is older than the requested hour.
 * Worst case (a filter matched only at the top of the file) reads the whole
 * file, which matches the previous full-read behavior.
 */

import fs from "node:fs";

export const TAIL_INITIAL_BYTES = 256 * 1024;

export function oldestDatedStamp(entries: Record<string, unknown>[]): number | null {
  let oldest: number | null = null;
  for (const entry of entries) {
    const ts = entry.time || entry.timestamp;
    if (!ts) continue;
    const stamp = new Date(ts as string | number).getTime();
    if (!Number.isFinite(stamp)) continue;
    if (oldest === null || stamp < oldest) oldest = stamp;
  }
  return oldest;
}

function parseWindow(
  fd: number,
  start: number,
  length: number,
  matches: (entry: Record<string, unknown>) => boolean
): { lines: string[]; matched: number; parsed: Record<string, unknown>[] } {
  const buffer = Buffer.alloc(length);
  let read = 0;
  while (read < length) {
    const n = fs.readSync(fd, buffer, read, length - read, start + read);
    if (n === 0) break;
    read += n;
  }
  const text = buffer.subarray(0, read).toString("utf-8");
  const chunks = text.split("\n");
  if (start > 0) chunks.shift();
  const lines = chunks.filter(Boolean);

  let matched = 0;
  const parsed: Record<string, unknown>[] = [];
  for (const line of lines) {
    let entry: Record<string, unknown> | null = null;
    try {
      entry = JSON.parse(line) as Record<string, unknown>;
    } catch {
      continue;
    }
    parsed.push(entry);
    if (matches(entry)) matched += 1;
  }
  return { lines, matched, parsed };
}

export function readTailLines(
  logPath: string,
  size: number,
  limit: number,
  matches: (entry: Record<string, unknown>) => boolean,
  oneHourAgo: number
): string[] {
  const fd = fs.openSync(logPath, "r");
  try {
    let windowBytes = Math.min(TAIL_INITIAL_BYTES, size);
    let lines: string[] = [];
    for (;;) {
      const start = Math.max(size - windowBytes, 0);
      const parsedWindow = parseWindow(fd, start, size - start, matches);
      lines = parsedWindow.lines;

      const oldest = oldestDatedStamp(parsedWindow.parsed);
      if (
        parsedWindow.matched >= limit ||
        (oldest !== null && oldest < oneHourAgo) ||
        start === 0
      ) {
        return lines;
      }
      if (windowBytes >= size) return lines;
      windowBytes = Math.min(windowBytes * 2, size);
    }
  } finally {
    fs.closeSync(fd);
  }
}
