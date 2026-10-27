#!/usr/bin/env node
/**
 * OmniRoute — i18n translation drift checker (CI gate).
 *
 * Verifies that every source file recorded in `.i18n-state.json` still has
 * the same SHA-256 hash on disk and that every produced translation file
 * exists with the recorded target hash. Does NOT call any API — purely a
 * deterministic state-vs-disk comparison.
 *
 * Modes:
 *   --strict (default)  exit 1 on any drift, print the offending paths
 *   --warn              exit 0, print warnings only
 *   --json              emit a JSON report to stdout (no human log lines)
 *
 * Recommended usage in CI:
 *   npm run i18n:check
 */

import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { sectionHashes, splitSections, stripTopHeading } from "./lib/section-cache.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const STATE_PATH = path.join(ROOT, ".i18n-state.json");
const isHash = (value) => typeof value === "string" && /^[a-f\d]{64}$/i.test(value);
const isSectionHashList = (value) =>
  Array.isArray(value) &&
  value.length > 0 &&
  Array.from(value).every((hash) => typeof hash === "string" && /^[a-f\d]{12}$/i.test(hash));
const DRIFT_BUCKETS = [
  "driftedSources",
  "missingTargets",
  "driftedTargets",
  "staleTargets",
  "inconsistentSectionCaches",
];

// Only the current source can be proved without Git history. A stale locale's
// cache belongs to another snapshot and must not be compared with today's text.
// An absent cache predates section reuse and legitimately bootstraps from Git.
function findInconsistentSectionCaches({ rel, entry, sourceHash, sourceText }) {
  if (entry.source_hash !== sourceHash) return [];
  const current = sectionHashes(splitSections(stripTopHeading(sourceText)));
  const inconsistent = [];
  for (const [locale, info] of Object.entries(entry.locales || {})) {
    if (info.source_hash !== sourceHash || !Object.hasOwn(info, "section_hashes")) continue;
    const recorded = info.section_hashes;
    const verified = isSectionHashList(recorded);
    if (verified && JSON.stringify(recorded) === JSON.stringify(current)) continue;
    inconsistent.push({
      rel,
      locale,
      reason: verified ? "section-hashes-mismatch" : "section-hashes-unverified",
      sourceHash,
      recorded: recorded ?? null,
      current,
    });
  }
  return inconsistent;
}

// A mirror is stale when its locale record was written from an older version
// of the source than the one the top-level source_hash now records — that is
// what a partial run leaves behind (17 of 65 locales refreshed, the rest
// interrupted by an upstream quota 429): the source no longer reads as
// changed, the stale mirrors' target hashes still match, and the gate said
// PASS for 45 stale mirrors. Missing/invalid source hashes are unverified provenance,
// not evidence of a current translation. Pure over the `sources` map of .i18n-state.json.
export function findStaleTargets(sources) {
  const stale = [];
  for (const [rel, entry] of Object.entries(sources || {})) {
    for (const [locale, info] of Object.entries(entry.locales || {})) {
      const recorded = info?.source_hash;
      const current = entry.source_hash;
      if (!isHash(recorded) || !isHash(current)) {
        stale.push({
          rel,
          locale,
          reason: "source-hash-unverified",
          recorded: isHash(recorded) ? recorded : null,
          current: isHash(current) ? current : null,
        });
      } else if (recorded !== current) {
        stale.push({ rel, locale, recorded, current });
      }
    }
  }
  return stale;
}

/**
 * Pure. Splits a drift report into what the BASE branch already had (`inherited`) and what
 * only this tree adds (`fresh`). A PR gate fails on `fresh` alone: 14 sources edited without a
 * re-translation on release/v3.8.53 (translation backend down until ~2026-10-24) painted every
 * unrelated PR red, which is exactly the "never treat an inherited base-red in your branch" rule
 * the repo already applies to humans. A changed file is inherited only when its location,
 * reason and recorded/current hashes match the base. Another edit to the same path is fresh.
 * Unverified evidence also stays in `fresh`: it cannot authorize inheritance, but does not
 * establish contributor responsibility. Stale translations and inconsistent section caches
 * follow this rule only in PR mode.
 */
export function partitionAgainstBase(report, base) {
  const key = (bucket, x) => {
    if (!x || typeof x.rel !== "string" || !x.rel) return null;
    if (bucket !== "driftedSources" && (typeof x.locale !== "string" || !x.locale)) return null;
    if (bucket === "inconsistentSectionCaches") {
      if (
        x.reason !== "section-hashes-mismatch" ||
        !isHash(x.sourceHash) ||
        !isSectionHashList(x.recorded) ||
        !isSectionHashList(x.current)
      ) {
        return null;
      }
      return JSON.stringify([x.rel, x.locale, x.reason, x.sourceHash, x.recorded, x.current]);
    }
    if (bucket === "driftedSources" && x.reason === "source-missing") {
      return JSON.stringify([x.rel, x.reason]);
    }
    if (bucket === "driftedSources" ? x.reason !== "source-changed" : x.reason !== undefined) {
      return null;
    }
    // Legacy or malformed reports without hashes cannot prove equal failure evidence.
    if (bucket !== "missingTargets" && (!isHash(x.recorded) || !isHash(x.current))) return null;
    return JSON.stringify([x.rel, x.locale, x.reason, x.recorded, x.current]);
  };
  const fresh = {};
  const inherited = {};
  for (const bucket of DRIFT_BUCKETS) {
    const seen = new Set((base?.[bucket] ?? []).map((x) => key(bucket, x)).filter(Boolean));
    fresh[bucket] = [];
    inherited[bucket] = [];
    for (const item of report?.[bucket] ?? []) {
      (seen.has(key(bucket, item)) ? inherited : fresh)[bucket].push(item);
    }
  }
  const count = (b) => DRIFT_BUCKETS.reduce((total, bucket) => total + b[bucket].length, 0);
  return {
    fresh,
    inherited,
    freshCount: count(fresh),
    inheritedCount: count(inherited),
    ok: count(fresh) === 0,
  };
}

function parseArgs(argv) {
  const opts = { mode: "strict", json: false, root: null, baseReport: null };
  const args = argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--warn") opts.mode = "warn";
    else if (arg === "--strict") opts.mode = "strict";
    else if (arg === "--json") opts.json = true;
    else if (arg === "--root") opts.root = args[++i];
    else if (arg.startsWith("--root=")) opts.root = arg.slice(7);
    else if (arg === "--base-report") opts.baseReport = args[++i];
    else if (arg.startsWith("--base-report=")) opts.baseReport = arg.slice(14);
    else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/check-translation-drift.mjs [--strict|--warn] [--json] [--root <dir>] [--base-report <json>]",
          "",
          "  --strict        (default) exit 1 when any source or target is out of date",
          "  --warn          report drift but exit 0",
          "  --json          write a machine-readable report to stdout",
          "  --root <dir>    check another checkout (e.g. the PR base) with THIS script",
          "  --base-report   JSON report of the base checkout: drift already present there is",
          "                  reported as inherited and does not fail the gate; only drift this",
          "                  tree introduces does (PR-scoped gate, 2026-10-20)",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  return opts;
}

function sha256(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

async function main() {
  const opts = parseArgs(process.argv);
  const ROOT_DIR = opts.root ? path.resolve(opts.root) : ROOT;
  const STATE_FILE = opts.root ? path.join(ROOT_DIR, ".i18n-state.json") : STATE_PATH;

  if (!existsSync(STATE_FILE)) {
    const msg = ".i18n-state.json not found — run `npm run i18n:run` to bootstrap.";
    if (opts.json) {
      process.stdout.write(JSON.stringify({ ok: false, reason: "missing-state" }) + "\n");
    } else {
      console.error(`[i18n-check] ${msg}`);
    }
    process.exit(opts.mode === "warn" ? 0 : 1);
  }

  const state = JSON.parse(await fs.readFile(STATE_FILE, "utf8"));
  // Scope: only the documentation core set is translated on purpose (PR-0 decision, 22
  // sources); state entries for other docs (older per-locale extras) are not a CI concern.
  // `--all` restores the full-state behaviour for local inspection.
  const { computeDocsCoreSet } = await import("./lib/docs-core-set.mjs");
  const config = JSON.parse(await fs.readFile(path.join(ROOT_DIR, "config", "i18n.json"), "utf8"));
  const coreSet = computeDocsCoreSet({ root: ROOT_DIR, config });
  const coreList = Array.isArray(coreSet)
    ? coreSet
    : (coreSet.coreSet ?? coreSet.files ?? Object.keys(coreSet));
  const core = new Set(coreList);
  const scopeAll = process.argv.includes("--all");
  const sources = Object.fromEntries(
    Object.entries(state.sources || {}).filter(([rel]) => scopeAll || core.has(rel))
  );

  const driftedSources = [];
  const missingTargets = [];
  const driftedTargets = [];
  const inconsistentSectionCaches = [];
  let checkedSources = 0;
  let checkedTargets = 0;

  for (const [rel, entry] of Object.entries(sources)) {
    checkedSources++;
    const absSource = path.join(ROOT_DIR, rel);
    if (!existsSync(absSource)) {
      driftedSources.push({ rel, reason: "source-missing" });
      continue;
    }
    const sourceBytes = await fs.readFile(absSource);
    const currentHash = sha256(sourceBytes);
    if (currentHash !== entry.source_hash) {
      driftedSources.push({
        rel,
        reason: "source-changed",
        recorded: entry.source_hash,
        current: currentHash,
      });
    }
    inconsistentSectionCaches.push(
      ...findInconsistentSectionCaches({
        rel,
        entry,
        sourceHash: currentHash,
        sourceText: sourceBytes.toString("utf8"),
      })
    );

    for (const [locale, info] of Object.entries(entry.locales || {})) {
      checkedTargets++;
      // Mirror the path layout used by run-translation.mjs.
      const targetAbs = rel.includes("/")
        ? path.join(ROOT_DIR, "docs", "i18n", locale, rel)
        : path.join(ROOT_DIR, "docs", "i18n", locale, rel);
      if (!existsSync(targetAbs)) {
        missingTargets.push({ rel, locale });
        continue;
      }
      const targetHash = sha256(await fs.readFile(targetAbs));
      if (info.target_hash && targetHash !== info.target_hash) {
        driftedTargets.push({ rel, locale, recorded: info.target_hash, current: targetHash });
      }
    }
  }

  // Without a base report, stale targets and inconsistent section caches remain
  // advisory. Interrupted refreshes
  // (such as the upstream quota 429 on 2026-09-18) remain a translation work order.
  // PR comparison below permits that unchanged inherited debt, but blocks a new
  // stale locale or another source-hash change introduced by this candidate.
  const staleTargets = findStaleTargets(sources);
  let ok =
    driftedSources.length === 0 && missingTargets.length === 0 && driftedTargets.length === 0;
  // PR-scoped gate: with the base checkout's report, only drift THIS tree introduces blocks;
  // drift the base already carried is inherited (printed, not fatal — the i18n wave owns it).
  let partition = null;
  if (opts.baseReport) {
    const base = JSON.parse(await fs.readFile(path.resolve(opts.baseReport), "utf8"));
    partition = partitionAgainstBase(
      { driftedSources, missingTargets, driftedTargets, staleTargets, inconsistentSectionCaches },
      base
    );
    ok = partition.ok;
    if (!opts.json) {
      console.log(
        `[i18n-check] base-report: ${partition.inheritedCount} inherited drift item(s) (not blocking), ${partition.freshCount} new or unverified drift item(s)`
      );
      for (const b of DRIFT_BUCKETS) {
        for (const x of partition.fresh[b])
          console.log(`  ✗ NEW OR UNVERIFIED ${b}: ${x.rel}${x.locale ? ` [${x.locale}]` : ""}`);
      }
    }
  }

  if (opts.json) {
    process.stdout.write(
      JSON.stringify(
        {
          ok,
          checkedSources,
          checkedTargets,
          driftedSources,
          missingTargets,
          driftedTargets,
          staleTargets,
          inconsistentSectionCaches,
          ...(partition ? { fresh: partition.fresh, inherited: partition.inherited } : {}),
        },
        null,
        2
      ) + "\n"
    );
  } else {
    console.log(`[i18n-check] checked sources=${checkedSources}, targets=${checkedTargets}`);
    if (driftedSources.length) {
      console.log(`[i18n-check] drifted sources (${driftedSources.length}):`);
      for (const d of driftedSources) console.log(`  - ${d.rel} (${d.reason})`);
    }
    if (missingTargets.length) {
      console.log(`[i18n-check] missing targets (${missingTargets.length}):`);
      for (const m of missingTargets) console.log(`  - ${m.rel} [${m.locale}]`);
    }
    if (driftedTargets.length) {
      console.log(`[i18n-check] drifted targets (${driftedTargets.length}):`);
      for (const t of driftedTargets) console.log(`  - ${t.rel} [${t.locale}]`);
    }
    if (staleTargets.length) {
      const policy = opts.baseReport
        ? "unchanged inherited entries are advisory; new or unverified entries block"
        : "advisory without --base-report";
      console.log(
        `[i18n-check] WARN stale or unverified targets (${staleTargets.length}) — ${policy}; refresh with npm run i18n:run:`
      );
      for (const t of staleTargets) {
        console.log(`  - ${t.rel} [${t.locale}] (${t.reason ?? "stale"})`);
      }
    }
    if (inconsistentSectionCaches.length) {
      const policy = opts.baseReport
        ? "unchanged inherited entries are advisory; new or unverified entries block"
        : "advisory without --base-report";
      console.log(
        `[i18n-check] WARN inconsistent section caches (${inconsistentSectionCaches.length}) — ${policy}; review source provenance before rebuilding the cache:`
      );
      for (const item of inconsistentSectionCaches) {
        console.log(`  - ${item.rel} [${item.locale}] (${item.reason})`);
      }
    }
    if (ok) {
      const message = partition
        ? "no new or unverified drift against the base."
        : staleTargets.length || inconsistentSectionCaches.length
          ? "file hashes match; translation-provenance warnings remain advisory."
          : "all sources and targets match recorded hashes.";
      console.log(`[i18n-check] PASS — ${message}`);
    } else if (opts.mode === "warn") {
      console.log("[i18n-check] WARN — drift detected (warn mode, exiting 0).");
    } else {
      console.log("[i18n-check] FAIL — drift detected. Run `npm run i18n:run` to refresh.");
    }
  }

  if (!ok && opts.mode !== "warn") process.exit(1);
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    console.error("[i18n-check] ERROR", err?.stack || err?.message || String(err));
    process.exit(1);
  });
}
