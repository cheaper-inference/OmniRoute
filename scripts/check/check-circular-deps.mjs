#!/usr/bin/env node
// scripts/check/check-circular-deps.mjs
// Gate: dpdm circular-deps cross-check (second opinion complementary to check-cycles.mjs).
//
// check-cycles.mjs uses its own AST-TS but covers only 5 sub-trees + only
// imports relativos. Este script usa dpdm (v4) que rastreia path-aliases via
// tsconfig.json and covers high-risk entry points.
//
// Advisory in this version: exit 0 always; prints `circularDeps=N` for baseline.
// Direction of the turnstile: down (cannot go up). Add to quality-baseline.json
// as `{ value: N, direction: "down" }` after the first green run on the CI.
//
// Scope limited to 4 main entrypoints to keep analysis time down
// abaixo de 60s. dpdm rastreia transitivamente todas as deps de cada entry.
// Covering more entries increases the time without proportional gain (the core deps are
// repetem via transitividade).
//
// Note: dpdm may report more cycles than check-cycles.mjs because it counts
// permutations of paths that pass through the same SCC, not just unique SCCs.
// This is expected — different tools, complementary metrics.

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, "../..");

// Entrypoints: cobrem o pipeline principal (chat, combo, MCP, DB).
// Mantido enxuto para que `dpdm -T` (transform) termine em < 60s.
const ENTRYPOINTS = [
  "open-sse/handlers/chatCore.ts",
  "open-sse/services/combo.ts",
  "open-sse/mcp-server/index.ts",
  "src/lib/db/core.ts",
];

const DPDM_BIN = resolve(projectRoot, "node_modules/dpdm/lib/bin/dpdm.js");
const TSCONFIG = resolve(projectRoot, "tsconfig.json");

/**
 * Parses the JSON output from dpdm and returns the cycle count.
 * Function exported to be tested in isolation without running dpdm.
 *
 * @param {string} jsonStr - String containing the JSON output from dpdm ("circulars" field).
 * @returns {{ count: number, circulars: string[][] }}
 */
export function parseDpdmOutput(jsonStr) {
  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    throw new Error(`dpdm JSON parse failed: ${jsonStr.slice(0, 200)}`);
  }
  const circulars = Array.isArray(parsed.circulars) ? parsed.circulars : [];
  return { count: circulars.length, circulars };
}

/**
 * Executes dpdm and returns the raw JSON string from the output file.
 *
 * @returns {string} JSON content of the temporary file.
 */
function runDpdm() {
  if (!existsSync(DPDM_BIN)) {
    throw new Error(`dpdm binary not found at ${DPDM_BIN}. Run: npm install`);
  }

  const tmpFile = path.join(os.tmpdir(), `dpdm-output-${process.pid}.json`);

  try {
    execFileSync(
      "node",
      [
        DPDM_BIN,
        "--circular",
        "--no-warning",
        "--no-tree",
        "-T",
        "--tsconfig",
        TSCONFIG,
        "-o",
        tmpFile,
        ...ENTRYPOINTS,
      ],
      {
        cwd: projectRoot,
        stdio: "inherit",
        timeout: 120_000,
      }
    );

    if (!existsSync(tmpFile)) {
      throw new Error(`dpdm did not produce output file at ${tmpFile}`);
    }

    const raw = readFileSync(tmpFile, "utf8");
    return raw;
  } finally {
    try {
      fs.unlinkSync(tmpFile);
    } catch {
      // best-effort cleanup
    }
  }
}

function main() {
  console.log("[circular-deps] Running dpdm cross-check...");
  console.log(`[circular-deps] Entrypoints: ${ENTRYPOINTS.join(", ")}`);

  let raw;
  try {
    raw = runDpdm();
  } catch (err) {
    console.error(`[circular-deps] ERROR running dpdm: ${err.message}`);
    process.exit(1);
  }

  let result;
  try {
    result = parseDpdmOutput(raw);
  } catch (err) {
    console.error(`[circular-deps] ERROR parsing dpdm output: ${err.message}`);
    process.exit(1);
  }

  // Advisory mode: always exit 0. Turnstile can be added to quality-baseline.json
  // after baseline is established.
  console.log(`[circular-deps] circularDeps=${result.count}`);
  console.log(
    `[circular-deps] Advisory — add to quality-baseline.json: { "value": ${result.count}, "direction": "down" }`
  );
  process.exit(0);
}

// Allows the module to be imported in tests without running main().
if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
