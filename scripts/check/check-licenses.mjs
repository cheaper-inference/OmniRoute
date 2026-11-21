#!/usr/bin/env node
// scripts/check/check-licenses.mjs
// Gate de license compliance — PLANO-QUALITY-GATES-FASE7.md, Task 20.
//
// Policy: OmniRoute is MIT. PRODUCTION dependencies with a license outside the SPDX allowlist
// and with no exception registered in .license-allowlist.json => FAIL (policy violation).
// devDependencies with non-standard license => advisory (printed, do not fail).
//
// Ferramenta: license-checker-rseidelsohn v4+ (node_modules/.bin/license-checker-rseidelsohn).
//
// Uso:
//   node scripts/check/check-licenses.mjs            # modo normal
//   node scripts/check/check-licenses.mjs --verbose  # lists all classified packages
//   node scripts/check/check-licenses.mjs --json     # emite o raw JSON do license-checker
//
// Exit with code 0 = everything OK (or just advisory).
// Exit with code 1 = policy violation in production dept.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const ALLOWLIST_PATH = path.join(ROOT, "config/quality/.license-allowlist.json");
const CHECKER_BIN = path.join(ROOT, "node_modules", ".bin", "license-checker-rseidelsohn");

const VERBOSE = process.argv.includes("--verbose");
const PRINT_JSON = process.argv.includes("--json");

// ---------------------------------------------------------------------------
// Allowlist loading
// ---------------------------------------------------------------------------

/**
 * Loads and returns the license allowlist from .license-allowlist.json.
 *
 * @returns {{ allowed: string[], allowedExpressions: string[], exceptions: Record<string, {license:string, justification:string, risk:string}> }}
 */
export function loadAllowlist() {
  if (!fs.existsSync(ALLOWLIST_PATH)) {
    throw new Error(
      `Allowlist not found: ${ALLOWLIST_PATH}. Create .license-allowlist.json first.`
    );
  }
  const raw = fs.readFileSync(ALLOWLIST_PATH, "utf-8");
  const parsed = JSON.parse(raw);
  return {
    allowed: parsed.allowed ?? [],
    allowedExpressions: parsed.allowedExpressions ?? [],
    exceptions: parsed.exceptions ?? {},
  };
}

// ---------------------------------------------------------------------------
// Classification logic (pure, testable)
// ---------------------------------------------------------------------------

/**
 * Classifies a package+license against the allowlist.
 *
 * @param {string} packageName - Package name without version, e.g. "lightningcss"
 * @param {string} license     - License string from license-checker, e.g. "MPL-2.0"
 * @param {{ allowed: string[], allowedExpressions: string[], exceptions: Record<string,any> }} allowlist
 * @returns {{ status: "allowed" | "exception" | "denied", reason: string }}
 */
export function classifyLicense(packageName, license, allowlist) {
  const { allowed, allowedExpressions, exceptions } = allowlist;

  // 1. Direct SPDX match
  if (allowed.includes(license)) {
    return { status: "allowed", reason: `SPDX match: ${license}` };
  }

  // 2. Expression match (e.g. "(MIT OR Apache-2.0)")
  if (allowedExpressions.includes(license)) {
    return { status: "allowed", reason: `allowed expression: ${license}` };
  }

  // 3. Per-package exception (strip version suffix for lookup)
  const baseName = stripVersion(packageName);
  if (exceptions[baseName]) {
    const exc = exceptions[baseName];
    return {
      status: "exception",
      reason: `exception: ${exc.justification} [risk=${exc.risk}]`,
    };
  }

  // 4. Denied
  return {
    status: "denied",
    reason: `license '${license}' not in allowlist and no exception registered for '${baseName}'`,
  };
}

/**
 * Strips the @version suffix from a package key returned by license-checker.
 * e.g. "lightningcss@1.32.0" => "lightningcss"
 *      "@img/sharp-libvips-linux-x64@1.2.4" => "@img/sharp-libvips-linux-x64"
 *
 * @param {string} pkgKey - Package key as returned by license-checker
 * @returns {string}
 */
export function stripVersion(pkgKey) {
  // Handle scoped packages: @scope/name@version
  const scopedMatch = pkgKey.match(/^(@[^/]+\/[^@]+)(?:@.*)?$/);
  if (scopedMatch) return scopedMatch[1];
  // Regular: name@version
  const regularMatch = pkgKey.match(/^([^@]+)(?:@.*)?$/);
  if (regularMatch) return regularMatch[1];
  return pkgKey;
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------

/**
 * Runs license-checker-rseidelsohn --production and returns parsed JSON.
 *
 * @returns {Record<string, { licenses: string, path: string }>}
 */
function runLicenseChecker() {
  if (!fs.existsSync(CHECKER_BIN)) {
    throw new Error(
      `license-checker-rseidelsohn not found at ${CHECKER_BIN}.\n` +
        `Install it: npm install --save-dev license-checker-rseidelsohn`
    );
  }

  const output = execFileSync(CHECKER_BIN, ["--production", "--json"], {
    cwd: ROOT,
    encoding: "utf-8",
    maxBuffer: 32 * 1024 * 1024, // 32 MB
  });

  return JSON.parse(output);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  /** @type {Record<string, { licenses: string, path: string }>} */
  let licenseData;
  try {
    licenseData = runLicenseChecker();
  } catch (err) {
    console.error("[check-licenses] Failed to run license-checker-rseidelsohn:");
    console.error(err.message ?? err);
    process.exitCode = 1;
    return;
  }

  if (PRINT_JSON) {
    console.log(JSON.stringify(licenseData, null, 2));
    return;
  }

  /** @type {{ allowed: string[], allowedExpressions: string[], exceptions: Record<string,any> }} */
  let allowlist;
  try {
    allowlist = loadAllowlist();
  } catch (err) {
    console.error("[check-licenses]", err.message);
    process.exitCode = 1;
    return;
  }

  const violations = [];
  const exceptions = [];
  const advisory = [];
  let allowedCount = 0;

  for (const [pkgKey, info] of Object.entries(licenseData)) {
    const license = info.licenses ?? "UNKNOWN";
    const result = classifyLicense(pkgKey, license, allowlist);

    if (result.status === "allowed") {
      allowedCount++;
      if (VERBOSE) {
        console.log(`  ✓ ${pkgKey}: ${license}`);
      }
    } else if (result.status === "exception") {
      exceptions.push({ pkgKey, license, reason: result.reason });
    } else {
      violations.push({ pkgKey, license, reason: result.reason });
    }
  }

  const total = Object.keys(licenseData).length;

  // Print summary
  console.log(`[check-licenses] Scanned ${total} production packages.`);
  console.log(`  Permitidos: ${allowedCount}`);
  console.log(`  Exceptions logged: ${exceptions.length}`);
  console.log(`  Policy violations: ${violations.length}`);

  // Print exceptions (informational)
  if (exceptions.length > 0) {
    console.log(
      "\n[check-licenses] Exceptions recorded (non-blocking, review periodically):"
    );
    for (const { pkgKey, license } of exceptions) {
      const baseName = stripVersion(pkgKey);
      const exc = allowlist.exceptions[baseName];
      const riskTag = exc?.risk === "medium" ? " ⚠️  RISK=medium" : "";
      console.log(`  ⚑  ${pkgKey}: ${license}${riskTag}`);
      if (exc?.risk === "medium") {
        console.log(`       → ${exc.justification}`);
      }
    }
  }

  // Print advisory (devDep non-standard — empty here since we run --production)
  if (advisory.length > 0) {
    console.log("\n[check-licenses] Advisory (devDeps with non-standard license):");
    for (const { pkgKey, license } of advisory) {
      console.log(`  ℹ  ${pkgKey}: ${license}`);
    }
  }

  // Print violations and fail
  if (violations.length > 0) {
    console.error(
      "\n[check-licenses] ❌ POLICY VIOLATIONS — production deps with non-permitted license:"
    );
    for (const { pkgKey, license, reason } of violations) {
      console.error(`  ✗ ${pkgKey}: ${license}`);
      console.error(`    → ${reason}`);
    }
    console.error(
      "\nAdd the license to the 'allowed' allowlist in .license-allowlist.json (if SPDX-permissive)\n"
        "or log a per-package exception in 'exceptions' with justification and 'reviewAt'.\n"
        "DO NOT override strong copyleft without recording the justification. See PLAN-QUALITY-GATES-PHASE7.md § Task 20."
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    "\n[check-licenses] ✅ All production packages comply with the licensing policy."
  );
}

// Run only when invoked directly (not when imported by tests)
const isMain =
  process.argv[1] === pathToFileURL(import.meta.url).pathname ||
  process.argv[1]?.endsWith("check-licenses.mjs");

if (isMain) {
  main();
}
