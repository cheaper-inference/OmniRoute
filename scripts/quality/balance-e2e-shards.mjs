#!/usr/bin/env node
/**
 * balance-e2e-shards — duration-aware LPT bin-packing for the Playwright matrix (WS4.1).
 *
 * Playwright's --shard=N/M distributes by COUNT (per file with fullyParallel:false),
 * blind to duration — measured skew on the 9-shard matrix: worst 24m47s vs best 1m47s
 * (14×), putting E2E on the CI critical path. This script assigns spec FILES to shards
 * by weight (Longest Processing Time greedy: heaviest first, always into the lightest
 * shard) using config/quality/e2e-timings.json, and prints shard N's files (one per
 * line) for `npx playwright test $FILES`.
 *
 * Safety: the union of all shards is verified to equal the discovered spec list —
 * losing a spec silently would hollow the suite. Any inconsistency (or a missing
 * timings file) exits non-zero so the CI step falls back to plain --shard=N/M.
 *
 * Weights are RELATIVE (unitless). The seed uses LOC as a proxy; regenerate from real
 * durations by editing config/quality/e2e-timings.json (see its _meta note).
 *
 * `--sync [--dry-run]` (or `syncE2eTimings()`) refreshes the file's spec list: a spec without
 * an entry gets its LOC (the seed's proxy, `wc -l`), an entry whose spec is gone is dropped, every
 * other line stays byte for byte (values, key order, the \uXXXX escapes of the _meta note). The timings file is a derived baseline written by
 * the release refresh, not by feature PRs (plan 2026-11-13,
 * config/quality/derived-paths/baselines.json); a spec without an entry already gets the median
 * weight at run time.
 */
import fs from "node:fs";
import path from "node:path";

const E2E_DIR = path.join("tests", "e2e");
const TIMINGS_PATH = path.join("config", "quality", "e2e-timings.json");

/**
 * LPT greedy assignment. Deterministic: weight desc, then filename asc; ties on
 * shard totals resolve to the lowest shard index.
 * @param {{file: string, weight: number}[]} items
 * @param {number} shardCount
 * @returns {{files: string[], total: number}[]}
 */
export function lptAssign(items, shardCount) {
  const shards = Array.from({ length: shardCount }, () => ({ files: [], total: 0 }));
  const sorted = [...items].sort((a, b) => b.weight - a.weight || a.file.localeCompare(b.file));
  for (const item of sorted) {
    let target = shards[0];
    for (const s of shards) if (s.total < target.total) target = s;
    target.files.push(item.file);
    target.total += item.weight;
  }
  return shards;
}

/**
 * Weight lookup with a median fallback so a NEW spec (no timing yet) lands mid-pack
 * instead of skewing a shard.
 * @param {string[]} files basenames
 * @param {Record<string, number>} timings
 */
export function weightItems(files, timings) {
  const known = Object.entries(timings)
    .filter(([k]) => !k.startsWith("_"))
    .map(([, v]) => v)
    .filter((v) => Number.isFinite(v) && v > 0)
    .sort((a, b) => a - b);
  const median = known.length ? known[Math.floor(known.length / 2)] : 1;
  return files.map((file) => ({
    file,
    weight: Number.isFinite(timings[file]) && timings[file] > 0 ? timings[file] : median,
  }));
}

// The seed's LOC proxy is `wc -l`: the number of newline characters.
function specLoc(file, e2eDir) {
  const text = fs.readFileSync(path.join(e2eDir, file), "utf8");
  return (text.match(/\n/g) || []).length;
}

// The committed file escapes every non-ASCII character as \uXXXX (the _meta note's em dash);
// writing it the same way keeps every line the sync did not add or drop byte-identical.
function toAsciiJson(value) {
  return JSON.stringify(value, null, 2).replace(
    /[\u007f-\uffff]/g,
    (ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`
  );
}

/**
 * Brings config/quality/e2e-timings.json in line with the spec files on disk.
 * @param {{ root?: string, dryRun?: boolean }} [opts]
 * @returns {{ changed: boolean, added: string[], pruned: string[], file: string }}
 */
export function syncE2eTimings({ root = process.cwd(), dryRun = false } = {}) {
  const file = path.join(root, TIMINGS_PATH);
  const e2eDir = path.join(root, E2E_DIR);
  const timings = JSON.parse(fs.readFileSync(file, "utf8"));
  const specs = fs
    .readdirSync(e2eDir)
    .filter((f) => f.endsWith(".spec.ts"))
    .sort();
  const onDisk = new Set(specs);
  const pruned = Object.keys(timings).filter((k) => !k.startsWith("_") && !onDisk.has(k));
  const added = specs.filter((f) => !(f in timings));
  const next = {};
  for (const [key, value] of Object.entries(timings)) {
    if (key.startsWith("_") || onDisk.has(key)) next[key] = value;
  }
  for (const spec of added) next[spec] = specLoc(spec, e2eDir);
  const changed = added.length > 0 || pruned.length > 0;
  if (changed && !dryRun) fs.writeFileSync(file, `${toAsciiJson(next)}\n`);
  return { changed, added, pruned, file: TIMINGS_PATH };
}

function runSync() {
  const dryRun = process.argv.includes("--dry-run");
  const { changed, added, pruned, file } = syncE2eTimings({ dryRun });
  const verb = dryRun ? "would update" : "updated";
  if (!changed) console.log(`[e2e-balance] ${file} already lists every spec`);
  else
    console.log(
      `[e2e-balance] ${verb} ${file}: +${added.length} (${added.join(", ") || "—"}), -${pruned.length} (${pruned.join(", ") || "—"})`
    );
}

function main() {
  if (process.argv.includes("--sync")) return runSync();
  const shard = Number(process.argv[2]);
  const total = Number(process.argv[3]);
  if (!Number.isInteger(shard) || !Number.isInteger(total) || shard < 1 || shard > total) {
    console.error("usage: node scripts/quality/balance-e2e-shards.mjs <shard> <totalShards>");
    process.exit(2);
  }
  if (!fs.existsSync(TIMINGS_PATH)) {
    console.error(`[e2e-balance] ${TIMINGS_PATH} missing — caller should fall back to --shard`);
    process.exit(3);
  }
  const timings = JSON.parse(fs.readFileSync(TIMINGS_PATH, "utf8"));
  const files = fs
    .readdirSync(E2E_DIR)
    .filter((f) => f.endsWith(".spec.ts"))
    .sort();
  if (!files.length) {
    console.error(`[e2e-balance] no specs found under ${E2E_DIR}`);
    process.exit(3);
  }
  const shards = lptAssign(weightItems(files, timings), total);
  const assigned = shards.flatMap((s) => s.files).sort();
  if (assigned.length !== files.length || assigned.some((f, i) => f !== files[i])) {
    console.error("[e2e-balance] INTERNAL: shard union != discovered specs — falling back");
    process.exit(3);
  }
  process.stdout.write(shards[shard - 1].files.map((f) => path.join(E2E_DIR, f)).join("\n") + "\n");
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isDirectRun) main();
