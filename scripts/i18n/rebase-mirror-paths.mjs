#!/usr/bin/env node
/**
 * Rebases relative links and images in translated mirrors that were copied verbatim from the
 * English source (see lib/mirror-paths.mjs). New mirrors are rebased by run-translation.mjs
 * when they are written; this repairs mirrors already on disk.
 *
 *   node scripts/i18n/rebase-mirror-paths.mjs docs/i18n/ja/README.md [...]
 *   node scripts/i18n/rebase-mirror-paths.mjs --dry-run docs/i18n/{ja,ko}/README.md
 *
 * Existence is checked against the files git tracks (plus their directories), so the result is
 * the same in a sparse checkout. Only mirrors of root-level sources are rebased; mirrors of
 * `docs/**` pages are skipped (see rebasesMirrorOf).
 *
 * Afterwards run `npm run i18n:run -- --adopt --targets-only` so `.i18n-state.json` records the
 * rewritten mirrors instead of reporting them as edited.
 */
import { execFileSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { rebaseMirrorPaths, rebasesMirrorOf } from "./lib/mirror-paths.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const MIRROR = /^docs\/i18n\/[^/]+\/(.+)$/;

export function trackedPaths(root = ROOT) {
  const files = execFileSync("git", ["ls-files", "-z"], { cwd: root, maxBuffer: 1 << 28 })
    .toString("utf8")
    .split("\0")
    .filter(Boolean);
  const all = new Set(files);
  for (const file of files) {
    for (let dir = path.posix.dirname(file); dir !== "."; dir = path.posix.dirname(dir)) {
      if (all.has(dir)) break;
      all.add(dir);
    }
  }
  return all;
}

export async function rebaseMirrors(mirrorRels, { root = ROOT, dryRun = false, exists } = {}) {
  const has =
    exists ??
    (
      (set) => (p) =>
        set.has(p)
    )(trackedPaths(root));
  const changed = [];
  for (const mirrorRel of mirrorRels) {
    const match = MIRROR.exec(mirrorRel);
    if (!match) throw new Error(`not a mirror under docs/i18n/<locale>/: ${mirrorRel}`);
    if (!rebasesMirrorOf(match[1])) continue;
    const abs = path.join(root, ...mirrorRel.split("/"));
    const text = await fs.readFile(abs, "utf8");
    const next = rebaseMirrorPaths(text, { sourceRel: match[1], mirrorRel, exists: has });
    if (next === text) continue;
    changed.push(mirrorRel);
    if (!dryRun) await fs.writeFile(abs, next, "utf8");
  }
  return changed;
}

const isDirectRun =
  !!process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const files = args
    .filter((a) => a !== "--dry-run")
    .map((f) => path.relative(ROOT, path.resolve(f)).split(path.sep).join("/"));
  if (!files.length) {
    console.error("Usage: node scripts/i18n/rebase-mirror-paths.mjs [--dry-run] <mirror.md>...");
    process.exit(2);
  }
  const changed = await rebaseMirrors(files, { dryRun });
  for (const rel of changed) console.log(`${dryRun ? "[DRY] " : ""}${rel}`);
  console.log(
    `${changed.length} of ${files.length} mirrors ${dryRun ? "would change" : "changed"}`
  );
}
