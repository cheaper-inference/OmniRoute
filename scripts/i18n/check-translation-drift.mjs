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

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const STATE_PATH = path.join(ROOT, ".i18n-state.json");

// A mirror is stale when its locale record was written from an older version
// of the source than the one the top-level source_hash now records — that is
// what a partial run leaves behind (17 of 65 locales refreshed, the rest
// interrupted by an upstream quota 429): the source no longer reads as
// changed, the stale mirrors' target hashes still match, and the gate said
// PASS for 45 stale mirrors. Pure over the `sources` map of .i18n-state.json.
export function findStaleTargets(sources) {
  const stale = [];
  for (const [rel, entry] of Object.entries(sources || {})) {
    for (const [locale, info] of Object.entries(entry.locales || {})) {
      if (info?.source_hash && entry.source_hash && info.source_hash !== entry.source_hash) {
        stale.push({ rel, locale, recorded: info.source_hash, current: entry.source_hash });
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
 * the repo already applies to humans. Identity = source path (+ locale for targets); a source
 * drifted at base that the PR edits again stays inherited — the wave owns it either way.
 */
export function partitionAgainstBase(report, base) {
  const key = (x) => `${x.rel}::${x.locale ?? ""}`;
  const fresh = {};
  const inherited = {};
  for (const bucket of ["driftedSources", "missingTargets", "driftedTargets"]) {
    const seen = new Set((base?.[bucket] ?? []).map(key));
    fresh[bucket] = (report?.[bucket] ?? []).filter((x) => !seen.has(key(x)));
    inherited[bucket] = (report?.[bucket] ?? []).filter((x) => seen.has(key(x)));
  }
  const count = (b) => b.driftedSources.length + b.missingTargets.length + b.driftedTargets.length;
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
  let checkedSources = 0;
  let checkedTargets = 0;

  for (const [rel, entry] of Object.entries(sources)) {
    checkedSources++;
    const absSource = path.join(ROOT_DIR, rel);
    if (!existsSync(absSource)) {
      driftedSources.push({ rel, reason: "source-missing" });
      continue;
    }
    const currentHash = sha256(await fs.readFile(absSource));
    if (currentHash !== entry.source_hash) {
      driftedSources.push({
        rel,
        reason: "source-changed",
        recorded: entry.source_hash,
        current: currentHash,
      });
    }

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

  // Stale targets are reported but do not fail the gate: they only appear
  // after a refresh run was interrupted (upstream quota 429 on 2026-09-18
  // left 45 locales behind for ~6 days), and failing every PR's CI for a
  // backend outage nobody can fix in-branch helps no one. The list is the
  // work order for `npm run i18n:run -- --locale=<code> --files=<sources>`.
  const staleTargets = findStaleTargets(sources);
  let ok =
    driftedSources.length === 0 && missingTargets.length === 0 && driftedTargets.length === 0;
  // PR-scoped gate: with the base checkout's report, only drift THIS tree introduces blocks;
  // drift the base already carried is inherited (printed, not fatal — the i18n wave owns it).
  let partition = null;
  if (opts.baseReport) {
    const base = JSON.parse(await fs.readFile(path.resolve(opts.baseReport), "utf8"));
    partition = partitionAgainstBase({ driftedSources, missingTargets, driftedTargets }, base);
    ok = partition.ok;
    if (!opts.json) {
      console.log(
        `[i18n-check] base-report: ${partition.inheritedCount} inherited drift item(s) (not blocking), ${partition.freshCount} introduced by this tree`
      );
      for (const b of ["driftedSources", "missingTargets", "driftedTargets"]) {
        for (const x of partition.fresh[b])
          console.log(`  ✗ NEW ${b}: ${x.rel}${x.locale ? ` [${x.locale}]` : ""}`);
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
      console.log(
        `[i18n-check] WARN stale targets (${staleTargets.length}) — translated from an older source (not blocking; refresh with npm run i18n:run):`
      );
      for (const t of staleTargets) console.log(`  - ${t.rel} [${t.locale}] (stale)`);
    }
    if (ok) {
      console.log("[i18n-check] PASS — all sources and targets match recorded hashes.");
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
