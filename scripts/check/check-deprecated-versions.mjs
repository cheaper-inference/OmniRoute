#!/usr/bin/env node
// Detects explicit claims for old OmniRoute versions in docs (pre-3 or 3.0–3.6).
// Skips historical context, examples, and minimum-version marks. Dates are ignored.
// Exits 0 if clean, 1 (in --strict mode) if drift detected.
//
// Run: node scripts/check/check-deprecated-versions.mjs
// Strict: node scripts/check/check-deprecated-versions.mjs --strict

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isMainModule } from "../lib/is-main-module.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const DOCS_DIR = path.join(ROOT, "docs");
const PKG_JSON = path.join(ROOT, "package.json");

function currentVersion() {
  try {
    return JSON.parse(fs.readFileSync(PKG_JSON, "utf8")).version || "0.0.0";
  } catch {
    return "0.0.0";
  }
}

const OMNIROUTE_VERSION =
  /\bomniroute(?:@|:|\s{1,3}(?:version\s{1,3})?)(v?(\d{1,3})\.(\d{1,3})\.\d{1,4})\b(?!\+|\.\d)/gi;

const SAFE_CONTEXTS =
  /historical|archive|legacy|previously|deprecated|since|introduced|was|originally|fix|fixed|\be\.g\.|\bfor example\b/i;

const IGNORED_DIRS = new Set(["archive", "i18n", "superpowers"]);
const IGNORED_BASENAMES = new Set(["CHANGELOG.md", "RFC-AUTO-ASSESSMENT-DRAFT.md"]);

function walkDocs(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkDocs(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      if (IGNORED_BASENAMES.has(entry.name)) continue;
      out.push(full);
    }
  }
  return out;
}

export function findVersionDrift(text) {
  const issues = [];

  for (const [index, line] of text.split("\n").entries()) {
    if (line.length > 500 || SAFE_CONTEXTS.test(line)) continue;

    // Requiring the version directly after the product separator skips ≥ and >= minimums.
    for (const [, version, majorText, minorText] of line.matchAll(OMNIROUTE_VERSION)) {
      const major = Number(majorText);
      const minor = Number(minorText);
      if (major < 3 || (major === 3 && minor <= 6)) {
        issues.push({
          line: index + 1,
          type: "stale-version",
          match: version,
          text: line.trim().slice(0, 100),
        });
      }
    }
  }

  return issues;
}

function main() {
  const cur = currentVersion();
  console.log(`Version drift report (current: v${cur})`);
  console.log("=".repeat(40));

  const files = walkDocs(DOCS_DIR);
  let drift = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const issues = findVersionDrift(fs.readFileSync(file, "utf8"));

    if (issues.length > 0) {
      console.log(`\n  ${rel}`);
      for (const iss of issues.slice(0, 5)) {
        console.log(`    L${iss.line} [${iss.type}] ${iss.match}: ${iss.text}`);
      }
      if (issues.length > 5) console.log(`    ... and ${issues.length - 5} more`);
      drift += issues.length;
    }
  }

  console.log();
  if (drift > 0) {
    console.warn(`⚠ ${drift} potential drift(s) detected across ${files.length} doc files.`);
    if (process.argv.includes("--strict")) process.exit(1);
  } else {
    console.log(`✓ No drift detected across ${files.length} doc files.`);
  }
}

if (isMainModule(import.meta.url)) {
  main();
}
