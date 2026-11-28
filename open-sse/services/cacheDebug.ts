/**
 * Opt-in prompt-cache debug mode (OMNIROUTE_CACHE_DEBUG, default off).
 *
 * A provider prompt cache hits only when the prompt prefix is byte-stable. When the hit rate
 * drops, the question is "which block of my prompt changed between what the client sent and
 * what went on the wire?". With the flag on, each upstream attempt appends one JSON line to
 * `cache-debug.jsonl` in the data directory: a keyed HMAC-SHA256 tag (12 hex) of the canonical
 * JSON of every instructions/tools/message block, for the inbound body and for the outbound
 * wire body, and the first block where they differ.
 *
 * Privacy: only tags are written, never prompt text and never the cache key value. The HMAC key
 * is random per process and never stored, so a tag cannot be matched across restarts or
 * guessed from a known prompt. The file is owner-only, rolls from 200 to 100 lines, and a
 * write failure never reaches the request path.
 */
import { createHmac, randomBytes } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const MAX_LINES = 200;
const KEEP_LINES = 100;
const SECTIONS = ["instructions", "tools", "input", "messages"] as const;
type Section = (typeof SECTIONS)[number];

let processKey: Buffer | null = null;

export function isCacheDebugEnabled(env: Record<string, string | undefined> = process.env) {
  return ["1", "true", "yes", "on"].includes(
    (env.OMNIROUTE_CACHE_DEBUG ?? "").trim().toLowerCase()
  );
}

export function resetCacheDebugForTests(): void {
  processKey = null;
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonical(record[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

function tag(value: unknown): string {
  processKey ??= randomBytes(32);
  return createHmac("sha256", processKey).update(canonical(value)).digest("hex").slice(0, 12);
}

function blocks(body: unknown, section: Section): unknown[] {
  const value =
    body && typeof body === "object" ? (body as Record<string, unknown>)[section] : null;
  if (Array.isArray(value)) return value;
  return value === undefined || value === null || value === "" ? [] : [value];
}

export type CacheDebugRecord = {
  at: string;
  route: string | null;
  cacheKey: {
    inbound: { present: boolean; tag: string | null };
    outbound: { present: boolean; tag: string | null };
  };
  sections: Record<Section, string[]>;
  wireSections: Record<Section, string[]>;
  firstDivergentBlock: { section: Section; index: number } | null;
};

function cacheKey(body: unknown) {
  const value =
    body && typeof body === "object" ? (body as Record<string, unknown>).prompt_cache_key : null;
  return typeof value === "string" && value
    ? { present: true, tag: tag(value) }
    : { present: false, tag: null };
}

function firstDivergence(inbound: Record<Section, string[]>, wire: Record<Section, string[]>) {
  for (const section of SECTIONS) {
    const length = Math.max(inbound[section].length, wire[section].length);
    for (let index = 0; index < length; index += 1) {
      if (inbound[section][index] !== wire[section][index]) return { section, index };
    }
  }
  return null;
}

export function buildCacheDebugRecord(
  inbound: unknown,
  outbound: unknown,
  route?: string | null
): CacheDebugRecord {
  const tags = (body: unknown) =>
    Object.fromEntries(
      SECTIONS.map((section) => [section, blocks(body, section).map(tag)])
    ) as Record<Section, string[]>;
  const sections = tags(inbound);
  const wireSections = tags(outbound);
  return {
    at: new Date().toISOString(),
    route: route ?? null,
    cacheKey: { inbound: cacheKey(inbound), outbound: cacheKey(outbound) },
    sections,
    wireSections,
    firstDivergentBlock: firstDivergence(sections, wireSections),
  };
}

function rollFile(file: string): void {
  const lines = fs.readFileSync(file, "utf8").split("\n").filter(Boolean);
  if (lines.length > MAX_LINES)
    fs.writeFileSync(file, `${lines.slice(-KEEP_LINES).join("\n")}\n`, { mode: 0o600 });
}

/**
 * The directory the file goes in: DATA_DIR, as the rest of the server resolves it. open-sse
 * cannot import src/lib/dataPaths (boundary ratchet), so the unset case uses the same default.
 */
export function cacheDebugDir(env: Record<string, string | undefined> = process.env): string {
  const configured = (env.DATA_DIR ?? "").trim();
  return configured || path.join(os.homedir(), ".omniroute");
}

/** Append one record when the flag is on. Returns the record, or null (flag off or write failed). */
export function writeCacheDebugRecord(args: {
  dir: string;
  inbound: unknown;
  outbound: unknown;
  route?: string | null;
}): CacheDebugRecord | null {
  if (!isCacheDebugEnabled()) return null;
  try {
    const record = buildCacheDebugRecord(args.inbound, args.outbound, args.route);
    fs.mkdirSync(args.dir, { recursive: true, mode: 0o700 });
    const file = path.join(args.dir, "cache-debug.jsonl");
    fs.appendFileSync(file, `${JSON.stringify(record)}\n`, { mode: 0o600 });
    rollFile(file);
    return record;
  } catch {
    return null;
  }
}
