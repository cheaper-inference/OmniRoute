#!/usr/bin/env node
// scripts/check/check-type-scale-ratchet.mjs
// Type scale ratchet (#19066 block 7). Counts two kit type-scale violations in src/:
//
//   typeScaleSubFloorSizes  arbitrary `text-[8px]` … `text-[11px]` (fractions such as
//                           `text-[10.5px]` included): sizes under the kit's 12 px floor
//                           (`text-xs`).
//   typeScaleFontBold       `font-bold` (700). The kit tops out at 600: its own
//                           `--ci-font-weight-bold` is 600, so `font-semibold` matches it.
//
// The backlog is about a thousand call sites, so this is a ratchet, not one sweep: the
// counts may only go down. Dense tables, charts and badges keep their small sizes until
// each is redesigned; everything else should move onto the kit scale when it is touched.
//
// Output:  typeScaleSubFloorSizes=N
//          typeScaleFontBold=M
//
// Advisory by default (exit 0). With --ratchet, reads metrics.<name>.value from
// config/quality/quality-baseline.json and exits 1 when either count is HIGHER than its
// baseline (direction: down). Incomplete source or baseline inputs exit 2.
//
//   node scripts/check/check-type-scale-ratchet.mjs
//   node scripts/check/check-type-scale-ratchet.mjs --list     # show the worst files
//   node scripts/check/check-type-scale-ratchet.mjs --ratchet  # blocking

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");
const SCAN_DIRS = ["src"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"]);
// Only names that never hold app source: src/ has real `build/` and `out/` folders
// (playground/components/tabs/build), so the usual output-folder list would hide them.
const SKIP = new Set(["node_modules", "__tests__"]);

// `text-[11px]`, `md:text-[10px]`, `!text-[9px]`, `text-[10.5px]`; not `text-[12px]` or
// `text-[110px]`, and not a longer class that merely ends in the same characters.
const SUB_FLOOR = /(?<![\w-])text-\[(?:8|9|10|11)(?:\.\d+)?px\]/g;
const FONT_BOLD = /(?<![\w-])font-bold(?![\w-])/g;

export const METRICS = /** @type {const} */ (["typeScaleSubFloorSizes", "typeScaleFontBold"]);

/** Count both violations in one file's source. */
export function countViolations(source) {
  return {
    typeScaleSubFloorSizes: source.match(SUB_FLOOR)?.length ?? 0,
    typeScaleFontBold: source.match(FONT_BOLD)?.length ?? 0,
  };
}

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (
      EXTENSIONS.has(path.extname(entry.name)) &&
      !/\.(test|spec)\.[cm]?[jt]sx?$/.test(entry.name)
    )
      yield full;
  }
}

/** Measure the tree under `root`. */
export function measure(root = ROOT) {
  const totals = { typeScaleSubFloorSizes: 0, typeScaleFontBold: 0 };
  const perFile = [];
  for (const dir of SCAN_DIRS) {
    for (const file of walk(path.join(root, dir))) {
      const counts = countViolations(fs.readFileSync(file, "utf-8"));
      const sum = counts.typeScaleSubFloorSizes + counts.typeScaleFontBold;
      if (sum === 0) continue;
      totals.typeScaleSubFloorSizes += counts.typeScaleSubFloorSizes;
      totals.typeScaleFontBold += counts.typeScaleFontBold;
      perFile.push({ file: path.relative(root, file), ...counts, sum });
    }
  }
  perFile.sort((a, b) => b.sum - a.sum);
  return { totals, perFile };
}

/**
 * Compare measured totals with the baseline metrics. Returns the regressions; a metric
 * missing from the baseline is reported as skipped, never as a failure.
 */
export function compare(totals, baselineMetrics) {
  const regressions = [];
  const skipped = [];
  for (const name of METRICS) {
    const ceiling = baselineMetrics?.[name]?.value;
    if (typeof ceiling !== "number") skipped.push(name);
    else if (totals[name] > ceiling) regressions.push({ name, measured: totals[name], ceiling });
  }
  return { regressions, skipped };
}

function main(argv) {
  const quiet = argv.includes("--quiet");
  let measurement;
  try {
    measurement = measure();
  } catch {
    console.error("typeScale=INCOMPLETE reason=source-unreadable");
    return 2;
  }
  const { totals, perFile } = measurement;
  for (const name of METRICS) console.log(`${name}=${totals[name]}`);

  if (argv.includes("--list")) {
    for (const row of perFile.slice(0, 25)) {
      console.log(
        `  ${String(row.typeScaleSubFloorSizes).padStart(4)} px  ${String(row.typeScaleFontBold).padStart(3)} bold  ${row.file}`
      );
    }
    console.log(`  ${perFile.length} file(s) affected`);
  }

  if (!argv.includes("--ratchet")) return 0;

  let metrics;
  try {
    metrics = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf-8"))?.metrics;
  } catch {
    console.error("typeScale=INCOMPLETE reason=baseline-unreadable");
    return 2;
  }
  for (const name of METRICS) {
    const metric = metrics?.[name];
    if (!Number.isSafeInteger(metric?.value) || metric.value < 0 || metric.direction !== "down") {
      console.error(`typeScale=INCOMPLETE reason=baseline-invalid metric=${name}`);
      return 2;
    }
  }
  const { regressions } = compare(totals, metrics);
  if (regressions.length > 0) {
    for (const { name, measured, ceiling } of regressions) {
      console.error(`Type scale ratchet: ${name}=${measured}, baseline ${ceiling}.`);
    }
    console.error(
      "Use the kit scale instead: text-xs (12 px) is the floor and font-semibold matches the " +
        "kit's bold. Dense tables, charts and badges that genuinely need a smaller size should " +
        "reuse an existing one rather than add more. Run with --list to see the worst files."
    );
    return 1;
  }
  if (!quiet) console.log("typeScale OK (counts at or below the baseline)");
  return 0;
}

// Only run when invoked directly, so the helpers can be unit tested.
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exit(main(process.argv.slice(2)));
}
