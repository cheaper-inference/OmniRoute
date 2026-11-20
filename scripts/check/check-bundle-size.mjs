#!/usr/bin/env node
// scripts/check/check-bundle-size.mjs
// Bundle size ratchet (Task 12 — Phase 7).
//
// MODO PREFERENCIAL — size-limit + @size-limit/file (ou outro plugin):
//   Run `size-limit --json` via .size-limit.json; extract the `size` field from each
//   entry e somar. Emite `bundleSize=<bytes>`.
//
// MODO FALLBACK — raw fs.statSync() (sem plugins instalados):
//   When size-limit reports "no plugins" (isEmpty — only core is installed), the
//   script reads the `path` entries declared in .size-limit.json directly via fs.statSync()
//   and sums the bytes. Same inputs, same metric. Emits `bundleSize=<bytes>`.
//
// MODO SKIP — entradas inexistentes:
//   Se nenhuma das entradas do .size-limit.json existir, emite
//   `bundleSize=SKIP reason=no-build`. Under --ratchet this is exit 1 (G-04): without
//   measurement there is no verdict. Without --ratchet, exits 0.
//
// By default it is ADVISORY: always exits 0 regardless of the result. Pass --ratchet
// to make it BLOCKING: reads metrics.bundleSize.value from
// config/quality/quality-baseline.json, compares the MEASURED total and EXITS 1 IF — AND ONLY
// IF — the measured value is GREATER than the baseline (real regression, direction:down).
//
// IMPORTANT: the baseline (10384) is the GZIP value of size-limit + @size-limit/file
// (installed by 'npm ci' in CI). The FALLBACK-stat mode reads RAW bytes (a
// DIFFERENT and larger metric) — comparing fallback-stat against a gzip baseline would be a false
// positive, so the fallback cannot produce a ratchet verdict.
//
// #15159 / G-04 — BEFORE, all "not measurable" paths (binary missing, no
// plugins, unexpected error, missing baseline, non-comparable metric) exited 0,
// even under --ratchet, with comments explicitly saying so. A ratchet that does not
// measure and reports OK turns "unknown" into "verified" — and the step in ci.yml
// was called "Bundle size (ratchet, blocking)". Now the rule is a single one:
//
//   --ratchet + comparable measurement  → compare and block on a real regression
//   --ratchet + NOT MEASURED           → exit 1, with the reason and the remedy
//   without --ratchet (advisory)         → always exit 0, measured or not
//
// Uso:
//   node scripts/check/check-bundle-size.mjs
//   node scripts/check/check-bundle-size.mjs --json     (force JSON output of size-limit if possible)
//   node scripts/check/check-bundle-size.mjs --ratchet   (block on a regression OR a measurement failure)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL, fileURLToPath } from "node:url";
import {
  resolveLocalBinEntry,
  isNativeExecutable,
  planBuildToolSpawn,
} from "../build/buildToolRunner.mjs";

const ROOT = process.cwd();
const SIZE_LIMIT_CONFIG = path.join(ROOT, ".size-limit.json");
const SIZE_LIMIT_BIN = path.join(ROOT, "node_modules", ".bin", "size-limit");
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");
const RATCHET = process.argv.includes("--ratchet");

/**
 * Decide COMO invocar o size-limit local.
 *
 * G-04: previously this was `execFileSync("node", ["node_modules/.bin/size-limit",
 * "--json"])`. On Windows this path is a shell shim (not JavaScript), so
 * `node <shim>` morria com "SyntaxError: missing ) after argument list" em TODA
 * invocation — the preferred measurement mode was unreachable on a Windows machine.
 * This was invisible while the failure exited 0; when making "not measured" non-zero
 * (the rest of G-04), the "cannot measure here" case became visible.
 *
 * We reuse the already-tested resolver from scripts/build/buildToolRunner.mjs (the same
 * que corrigiu o ENOENT do esbuild no postbuild Windows) em vez de inventar um
 * second resolver: it prefers the package's own JS entry, detects binary
 * nativo e cai para o shim `.cmd` com shell no win32.
 *
 * @param {readonly string[]} args
 * @param {string} [root] repo root to resolve `node_modules` from
 * @returns {{file: string, args: string[], shell: boolean}}
 */
export function resolveSizeLimitInvocation(args, root = ROOT) {
  const entryPath = resolveLocalBinEntry("size-limit", "size-limit", root);
  if (entryPath) {
    return planBuildToolSpawn({
      binName: "size-limit",
      args,
      entryPath,
      entryIsNative: isNativeExecutable(entryPath),
      root,
    });
  }
  // Without the package entry: it falls back to the shim, which on win32 needs a shell.
  return planBuildToolSpawn({ binName: "size-limit", args, entryPath: null, root });
}

/**
 * Tries to run size-limit --json and returns the array of results.
 * Throws if size-limit is not installed, or has no plugins (plugins.isEmpty).
 *
 * @param {string} [cwd] repo root — used both as the process cwd and for
 *   resolver `node_modules/size-limit`.
 * @returns {Array<{name: string, size: number, sizeLimit?: number, passed?: boolean}>}
 * @throws {SizeLimitNoPluginsError}
 */
export function runSizeLimit(cwd = ROOT) {
  const entryPath = resolveLocalBinEntry("size-limit", "size-limit", cwd);
  // Sem o pacote instalado, nem o shim existe — sinaliza o fallback-stat.
  if (!entryPath && !fs.existsSync(path.join(cwd, "node_modules", ".bin", "size-limit"))) {
    throw Object.assign(new Error("size-limit binary not found"), { code: "SL_NO_BIN" });
  }

  const plan = resolveSizeLimitInvocation(["--json"], cwd);
  let stdout;
  try {
    stdout = execFileSync(plan.file, plan.args, {
      encoding: "utf8",
      cwd,
      maxBuffer: 8 * 1024 * 1024,
      ...(plan.shell ? { shell: true } : {}),
    });
  } catch (err) {
    const combined = (err.stdout || "") + (err.stderr || "");
    if (
      combined.includes("Install Size Limit preset") ||
      combined.includes("plugins.isEmpty") ||
      combined.includes("@size-limit/preset")
    ) {
      throw Object.assign(new Error("size-limit: no plugins installed"), {
        code: "SL_NO_PLUGINS",
      });
    }
    throw err;
  }
  return JSON.parse(stdout.trim());
}

/**
 * Parses the JSON output of size-limit and returns the total in bytes.
 * Throws if the JSON has no `size` field in at least one entry.
 *
 * @param {Array<{name: string, size?: number}>} results
 * @returns {number} total em bytes
 */
export function parseSizeLimitResults(results) {
  if (!Array.isArray(results)) {
    throw new TypeError("parseSizeLimitResults: expected array of results");
  }
  let total = 0;
  let hasMeasured = false;
  for (const entry of results) {
    if (typeof entry.size === "number") {
      total += entry.size;
      hasMeasured = true;
    }
  }
  if (!hasMeasured) {
    throw new Error("parseSizeLimitResults: no entry with a numeric `size` field");
  }
  return total;
}

/**
 * Fallback: reads the `path` entries from .size-limit.json via fs.statSync().
 * Retorna {total, entries, allMissing} onde:
 *   - total: sum of the bytes of the files found
 *   - entries: [{name, path, size}]
 *   - allMissing: true if NO file existed (skip)
 *
 * @param {string} configPath
 * @param {string} cwd
 */
export function measureViaFileStat(configPath = SIZE_LIMIT_CONFIG, cwd = ROOT) {
  if (!fs.existsSync(configPath)) {
    return { total: 0, entries: [], allMissing: true };
  }
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  let total = 0;
  let found = 0;
  const entries = [];
  for (const entry of config) {
    const entryPath = path.isAbsolute(entry.path) ? entry.path : path.join(cwd, entry.path);
    if (!fs.existsSync(entryPath)) {
      entries.push({ name: entry.name, path: entry.path, size: null });
      continue;
    }
    const size = fs.statSync(entryPath).size;
    total += size;
    found++;
    entries.push({ name: entry.name, path: entry.path, size });
  }
  return { total, entries, allMissing: found === 0 };
}

// ---------------------------------------------------------------------------
// Ratchet (direction:down) — exported for tests
// ---------------------------------------------------------------------------

/**
 * Avalia o total MEDIDO de bytes contra o baseline.
 * Direction: down (the size can only DROP — larger = regression).
 *
 * @param {number} current  - Total bytes measured now (gzip, via size-limit).
 * @param {number} baseline - Total congelado em quality-baseline.json.
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateBundleSizeRatchet(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

/**
 * Reads metrics.bundleSize.value from quality-baseline.json.
 * Returns null if the file or the metric is missing (with no baseline there is no
 * possible ratchet — the caller treats it as a graceful SKIP, exit 0).
 *
 * @param {string} baselinePath
 * @returns {number|null}
 */
export function readBaselineBundleSizeValue(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return null;
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return null;
  }
  const metric = baselineJson?.metrics?.bundleSize;
  if (!metric || typeof metric.value !== "number") return null;
  return metric.value;
}

/**
 * Aplica o ratchet (direction:down) sobre o total medido vs o baseline.
 * Without --ratchet: advisory (exit 0). With --ratchet comparable measurement (gzip via
 * size-limit): exit 1 on a real regression (measured > baseline). Missing baseline →
 * graceful SKIP (exit 0). Sets process.exitCode; does not throw.
 *
 * @param {number} totalBytes - Total MEDIDO pelo size-limit (gzip).
 */
function applyRatchet(totalBytes) {
  if (!RATCHET) {
    process.exitCode = 0;
    return;
  }

  const baselineValue = readBaselineBundleSizeValue(BASELINE_PATH);
  if (baselineValue === null) {
    // G-04: a ratchet with no baseline imposes nothing — and before it exited 0 in
    // silently, leaving the CI step green without verifying anything.
    exitUnmeasurable(
      "no-baseline",
      "metrics.bundleSize.value does not exist in config/quality/quality-baseline.json — " +
        "with no frozen baseline there is no regression to detect."
    );
    return;
  }

  const { regressed } = evaluateBundleSizeRatchet(totalBytes, baselineValue);
  if (regressed) {
    console.error(
      `[bundle-size] REGRESSION — ${totalBytes} bytes > baseline ${baselineValue}.\n` +
        "  → Reduce the size of the entrypoints, or re-baseline metrics.bundleSize in\n" +
        "    config/quality/quality-baseline.json if the growth is legitimate and justified."
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    `[bundle-size] --ratchet OK — ${totalBytes} bytes, baseline ${baselineValue} (no regression).`
  );
  process.exitCode = 0;
}

/**
 * G-04 (#15159) — a ratchet that could NOT measure and still exits 0 is not
 * a ratchet: it turns "unknown" into "verified". Before this function, all
 * "not measurable" paths (binary missing, no plugins, unexpected error,
 * missing baseline, non-comparable metric) printed an informational line and
 * retornavam com exit 0 — inclusive sob --ratchet, e o passo correspondente no
 * ci.yml se chama "Bundle size (ratchet, blocking)".
 *
 * Rule now: in ADVISORY mode it still exits 0 (a local dev without a build should
 * not be blocked). Under --ratchet, "could not measure" is exit 1 with reason and
 * remedy — because --ratchet is an explicit request for a verdict, and the only
 * honest verdict when measurement is impossible is "I could not verify this".
 *
 * @param {string} reason - stable token for logs/annotations (bundleSize=SKIP reason=…)
 * @param {string} hint - what to do to make measurement possible.
 */
function exitUnmeasurable(reason, hint) {
  // Kept on stdout: it is the token that CI logs read.
  console.log(`bundleSize=SKIP reason=${reason}`);

  if (!RATCHET) {
    console.log(`[bundle-size] ${reason} — modo advisory, seguindo com exit 0.`);
    process.exitCode = 0;
    return;
  }

  console.error(
    `[bundle-size] NOT MEASURED (${reason}) — the ratchet cannot verify the metric.\n` +
      `  → ${hint}\n` +
      "'could not measure' is not 'no regression'. Under --ratchet this is exit 1."
  );
  if (process.env.CI) {
    console.error(`::error title=bundle-size ratchet could not measure::${reason} — ${hint}`);
  }
  process.exitCode = 1;
}

function main() {
  // Step 1: tenta com size-limit + plugin instalado
  let totalBytes = null;
  let mode = "size-limit";

  try {
    const results = runSizeLimit(ROOT, SIZE_LIMIT_BIN);
    totalBytes = parseSizeLimitResults(results);
  } catch (err) {
    if (err.code === "SL_NO_PLUGINS" || err.code === "SL_NO_BIN") {
      // Step 2: fallback to direct file reading
      mode = "fallback-stat";
      const { total, entries, allMissing } = measureViaFileStat(SIZE_LIMIT_CONFIG, ROOT);

      if (allMissing) {
        // Step 3: no entry of .size-limit.json exists — nothing to measure.
        exitUnmeasurable(
          "no-build",
          "the files pointed to by .size-limit.json do not exist; run the build " +
          "(or restore the entrypoints in bin/) before the gate."
        );
        return;
      }

      totalBytes = total;
      for (const e of entries) {
        if (e.size !== null) {
          const kb = (e.size / 1024).toFixed(2);
          console.log(`  ${e.name}: ${kb} KB (${e.size} bytes)`);
        } else {
          console.log(`  ${e.name}: missing (not counted)`);
        }
      }
    } else {
      exitUnmeasurable(
        "size-limit-error",
        `size-limit failed with "${err.message}" — run \`npm ci\` to reinstall ` +
          "size-limit + @size-limit/file, or fix the configuration."
      );
      return;
    }
  }

  const kb = (totalBytes / 1024).toFixed(2);
  console.log(`bundleSize=${totalBytes}`);

  // The ratchet can only compare the SAME metric that froze the baseline (gzip via
  // size-limit + @size-limit/file). The fallback-stat reads RAW bytes — a different
  // and larger metric — so comparing it to the gzip baseline would be a false
  // positive. This is not a "no regression" verdict, it is absence of a verdict:
  // under --ratchet is exit 1 (G-04), otherwise the ratchet hangs in silence.
  if (mode !== "size-limit") {
    if (RATCHET) {
      exitUnmeasurable(
        "non-comparable-metric",
        `the measurement came from ${mode} (raw bytes), which is not comparable to the baseline ` +
          "gzip do size-limit. Instale @size-limit/file para que o ratchet funcione."
      );
      return;
    }
    console.log(`[bundle-size] ${mode}: total ${kb} KB (${totalBytes} bytes) — advisory, saindo 0`);
    return;
  }

  if (!RATCHET) {
    console.log(`[bundle-size] ${mode}: total ${kb} KB (${totalBytes} bytes) — advisory, saindo 0`);
  }
  applyRatchet(totalBytes);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
