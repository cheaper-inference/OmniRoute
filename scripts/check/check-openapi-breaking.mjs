#!/usr/bin/env node
// scripts/check/check-openapi-breaking.mjs
// Breaking-change gate in the public API (Phase 8 B.4 — optional backlog).
//
// Diffa a spec do PR (docs/openapi.yaml na working tree = HEAD) contra
// the same spec on the base branch, via `oasdiff breaking`. Catches contract regressions:
// endpoint removed, new mandatory parameter, response field removed, enum
// narrowed, etc. — changes that break existing clients.
//
// Complements the existing anti-hallucination gates:
//   • check-openapi-routes.mjs   — toda `path` na spec resolve a uma rota real.
//   • check-openapi-coverage.mjs — % de rotas reais documentadas (ratchet).
// Neither of them compares TWO versions of the spec; this one does.
//
// A required (--ratchet) measurement fails closed: exit 1 is measured regression,
// exit 2 is INCOMPLETE (missing tool/base/spec/report/baseline). Advisory mode
// preserves SKIP/exit 0. GitHub event SHAs take precedence over local BASE_REF.
// PR heads compare at merge-base; synthetic merges compare to their pinned base.
// Local usage: BASE_REF=<commit-or-ref> node scripts/check/check-openapi-breaking.mjs
// --json prints the scanner report but still enforces --ratchet.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { resolveOpenapiBaseline } from "./openapiBaseline.mjs";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const PRINT_JSON = process.argv.includes("--json");
const RATCHET = process.argv.includes("--ratchet");

const SPEC_REL = "docs/openapi.yaml";
const SPEC_PATH = path.join(ROOT, "docs", "openapi.yaml");

/**
 * Derives the release base branch from a SemVer version
 * (e.g.: "3.8.29" → "origin/release/v3.8.29"). Keeps the default synchronized with
 * o ciclo de release SEM hard-code: o version-bump atualiza package.json a cada
 * cycle, so the default never becomes stale (it used to be "origin/release/v3.8.27" fixed).
 * Ignora sufixos de prerelease/build (ex.: "3.8.29-dev.2" → v3.8.29).
 *
 * @param {string|null|undefined} version
 * @returns {string|null} base branch (without `origin/` missing) or null if not semver
 */
export function releaseBranchForVersion(version) {
  const m = String(version ?? "")
    .trim()
    .match(/^(\d+)\.(\d+)\.(\d+)/);
  return m ? `origin/release/v${m[1]}.${m[2]}.${m[3]}` : null;
}

function readPackageVersion() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
  } catch {
    return null;
  }
}

// Only local runs use this default; event SHAs are resolved independently.
const DEFAULT_BASE_REF = releaseBranchForVersion(readPackageVersion());
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");

// ---------------------------------------------------------------------------
// Pure parsing function (exported for tests)
// ---------------------------------------------------------------------------

/**
 * Conta breaking changes no JSON emitido por `oasdiff breaking --format json`.
 *
 * oasdiff outputs an array of objects (or an empty array when there are no breaking
 * change). Each object has the form:
 * [
 *   {
 *     id: string,          // ex.: "api-path-removed-without-deprecation"
 *     text: string,        // human-readable description
 *     level: number,       // 3 = ERR, 2 = WARN, 1 = INFO
 *     operation: string,   // ex.: "GET"
 *     path: string,        // ex.: "/api/bar"
 *     section: string,
 *     source?: string,
 *     baseSource?: { file, line, column },
 *     fingerprint: string
 *   },
 *   ...
 * ]
 *
 * @param {Array|null} oasdiffJson - Array de breaking changes do oasdiff (ou null).
 * @returns {{ count: number, byId: Record<string, number>, byPath: Record<string, number>, items: Array }}
 */
export function parseOasdiffBreaking(oasdiffJson) {
  // null, undefined or empty array = no breaking change.
  if (
    oasdiffJson === null ||
    oasdiffJson === undefined ||
    (Array.isArray(oasdiffJson) && oasdiffJson.length === 0)
  ) {
    return { count: 0, byId: {}, byPath: {}, items: [] };
  }

  // Defensive: anything other than an array is treated as "no data".
  if (!Array.isArray(oasdiffJson)) {
    return { count: 0, byId: {}, byPath: {}, items: [] };
  }

  let count = 0;
  const byId = {};
  const byPath = {};
  const items = [];

  for (const change of oasdiffJson) {
    if (!change || typeof change !== "object") continue;

    count++;
    items.push(change);

    const id = change.id ?? change.ID ?? "unknown";
    byId[id] = (byId[id] ?? 0) + 1;

    const p = change.path ?? change.Path ?? "unknown";
    byPath[p] = (byPath[p] ?? 0) + 1;
  }

  return { count, byId, byPath, items };
}

// ---------------------------------------------------------------------------
// Ratchet (direction:down) — exported for tests
// ---------------------------------------------------------------------------

/**
 * Evaluates the MEASURED count of breaking changes against the baseline.
 * Direction: down (the count can only GO DOWN — more breaking changes = regression).
 *
 * A missing measurement (current null/undefined) OR a missing baseline
 * (baseline null/undefined) → { regressed:false, skipped:true }: sem uma das
 * Two ends — no ratchet possible. The caller requires full measurement in
 * mandatory (exit 2 with --ratchet).
 *
 * @param {object} args
 * @param {number|null} args.current  - Breaking changes measured now (null = no measurement).
 * @param {number|null} args.baseline - Count frozen in quality-baseline.json (null = no baseline).
 * @returns {{ regressed: boolean, skipped: boolean }}
 */
export function evaluateOpenapiRatchet({ current, baseline }) {
  if (current === null || current === undefined || baseline === null || baseline === undefined) {
    return { regressed: false, skipped: true };
  }
  return { regressed: current > baseline, skipped: false };
}

/**
 * Reads metrics.openapiBreaking.value from quality-baseline.json.
 * Returns null if the file or metric is missing/invalid (without
 * baseline, no ratchet is possible — the caller treats it as INCOMPLETE in required mode).
 *
 * @param {string} baselinePath
 * @returns {number|null}
 */
export function readBaselineOpenapiValue(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return null;
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return null;
  }
  const metric = baselineJson?.metrics?.openapiBreaking;
  if (!metric || !Number.isSafeInteger(metric.value) || metric.value < 0) return null;
  return metric.value;
}

// ---------------------------------------------------------------------------
// Binary detection
// ---------------------------------------------------------------------------

/**
 * Detects whether the `oasdiff` binary is available in the PATH.
 * Uses `which` (Unix) without shell interpolation — Hard Rule #13.
 *
 * @returns {string|null} Path to the binary, or null if absent.
 */
export function findOasdiff() {
  try {
    const result = spawnSync("which", ["oasdiff"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.status === 0 && result.stdout.trim()) {
      return result.stdout.trim();
    }
  } catch {
    // which not available
  }

  // Fallback: try to run directly to distinguish ENOENT from "exists".
  try {
    const result = spawnSync("oasdiff", ["--version"], {
      encoding: "utf8",
      timeout: 5_000,
    });
    if (result.error?.code === "ENOENT") return null;
    if (result.status !== null) return "oasdiff"; // found in PATH
  } catch {
    // noop
  }

  return null;
}

// ---------------------------------------------------------------------------
// Base spec resolution
// ---------------------------------------------------------------------------

/**
 * Extracts the base spec via `git show<BASE_REF>:<SPEC_REL>` to a temp file.
 * Returns the path of the temp file (the caller is responsible for cleaning it up), or null if the
 * spec could not be resolved (ref missing in shallow clone, or file did not
 * existed at that ref). NEVER throws — failure → null → measurement unavailable.
 *
 * @param {string} baseRef
 * @returns {string|null} path of the temp file with the base spec, or null.
 */
export function resolveBaseSpec(baseRef) {
  let stdout;
  try {
    stdout = execFileSync("git", ["show", `${baseRef}:${SPEC_REL}`], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      timeout: 30_000,
      stdio: ["ignore", "pipe", "ignore"], // descarta stderr ruidoso do git
    });
  } catch {
    // unknown ref (shallow clone), file does not exist in base, etc.
    return null;
  }

  if (!stdout || !stdout.trim()) return null;

  const tmpFile = path.join(
    os.tmpdir(),
    `oasdiff-base-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.yaml`
  );
  try {
    fs.writeFileSync(tmpFile, stdout, "utf8");
  } catch {
    return null;
  }
  return tmpFile;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function incomplete(reason) {
  console.log(`openapiBreaking=${RATCHET ? "INCOMPLETE" : "SKIP"} reason=${reason}`);
  process.exitCode = RATCHET ? 2 : 0;
}

function main() {
  // 1) HEAD spec must exist (working tree).
  if (!fs.existsSync(SPEC_PATH)) {
    incomplete("head-spec-absent");
    if (!QUIET) {
      process.stderr.write(`[openapi-breaking] SKIP — spec not found: ${SPEC_PATH}\n`);
    }
    return;
  }

  // 2) The oasdiff binary needs to be in the PATH.
  const oasdiffBin = findOasdiff();
  if (!oasdiffBin) {
    incomplete("binary-absent");
    if (!QUIET) {
      process.stderr.write(
        "[openapi-breaking] SKIP — oasdiff not found in PATH.\n" +
          "[openapi-breaking] Instale via: https://github.com/oasdiff/oasdiff\n" +
          "[openapi-breaking] Required measurements must complete before acceptance.\n"
      );
    }
    return;
  }

  let comparison;
  try {
    comparison = resolveOpenapiBaseline({ defaultRef: DEFAULT_BASE_REF });
  } catch (error) {
    incomplete("base-unresolved");
    if (!QUIET) process.stderr.write(`[openapi-breaking] ${error.message}\n`);
    return;
  }
  const baseRef = comparison.baseSha;
  if (process.env.GITHUB_EVENT_NAME) {
    const candidateTmp = resolveBaseSpec(comparison.candidateSha);
    if (!candidateTmp) {
      incomplete("candidate-spec-unresolved");
      return;
    }
    try {
      if (!fs.readFileSync(candidateTmp).equals(fs.readFileSync(SPEC_PATH))) {
        incomplete("candidate-spec-mismatch");
        return;
      }
    } finally {
      fs.unlinkSync(candidateTmp);
    }
  }
  if (!PRINT_JSON) {
    console.log(
      `openapiBaseSha=${baseRef} openapiCandidateSha=${comparison.candidateSha} source=${comparison.source}`
    );
  }
  const baseTmp = resolveBaseSpec(baseRef);
  if (!baseTmp) {
    incomplete("base-spec-unresolved");
    return;
  }

  try {
    // 4) Run `oasdiff breaking --format json<baseTmp> <headSpec>`.
    //    oasdiff exits 0 by default even with breaking changes (only with --fail-on
    //    does it exit 1). Any execution error is an incomplete measurement.
    const args = ["breaking", "--format", "json", baseTmp, SPEC_PATH];

    if (!QUIET) {
      process.stderr.write(
        `[openapi-breaking] Rodando: oasdiff breaking --format json <base:${baseRef}> ${SPEC_REL} ...\n`
      );
    }

    let stdout = "";
    try {
      stdout = execFileSync(oasdiffBin, args, {
        cwd: ROOT,
        encoding: "utf8",
        maxBuffer: 32 * 1024 * 1024,
        timeout: 90_000,
      });
    } catch (err) {
      incomplete("oasdiff-error");
      if (!QUIET) process.stderr.write(`[openapi-breaking] oasdiff failed: ${err.message}\n`);
      return;
    }

    const trimmed = stdout.trim();
    if (!trimmed) {
      incomplete("invalid-report");
      return;
    }
    let parsed = [];
    if (trimmed && trimmed !== "null") {
      try {
        parsed = JSON.parse(trimmed);
      } catch (parseErr) {
        // Unexpected JSON is not a valid measurement.
        incomplete("parse-error");
        if (!QUIET) {
          process.stderr.write(
            `[openapi-breaking] SKIP — oasdiff JSON not parsable: ${parseErr.message}\n` +
              `[openapi-breaking] stdout (primeiros 500): ${trimmed.slice(0, 500)}\n`
          );
        }
        return;
      }
    }

    if (
      !Array.isArray(parsed) ||
      parsed.some((item) => !item || typeof item !== "object" || Array.isArray(item))
    ) {
      incomplete("invalid-report");
      return;
    }
    if (PRINT_JSON) {
      process.stdout.write(JSON.stringify(parsed, null, 2) + "\n");
      applyRatchet(parseOasdiffBreaking(parsed).count);
      return;
    }

    const { count, byId, byPath, items } = parseOasdiffBreaking(parsed);

    // Issue KEY=VALUE to the metrics collector.
    console.log(`openapiBreaking=${count}`);

    if (!QUIET) {
      if (count > 0) {
        const topIds = Object.entries(byId)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([id, n]) => `${id}(${n})`)
          .join(", ");
        process.stderr.write(
          `[openapi-breaking] ⚠️  ${count} breaking change(s) vs '${baseRef}' (top: ${topIds})\n`
        );
        for (const it of items.slice(0, 20)) {
          const op = it.operation ?? it.Operation ?? "?";
          const p = it.path ?? it.Path ?? "?";
          const txt = it.text ?? it.Text ?? it.id ?? "";
          process.stderr.write(`[openapi-breaking]   ✗ ${op} ${p} — ${txt}\n`);
        }
        if (items.length > 20) {
          process.stderr.write(`[openapi-breaking]   … +${items.length - 20} more\n`);
        }
        // Mitigation hint: by path.
        const topPaths = Object.entries(byPath)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([p, n]) => `${p}(${n})`)
          .join(", ");
        process.stderr.write(`[openapi-breaking]   affected paths: ${topPaths}\n`);
        if (RATCHET) {
          process.stderr.write(
            "[openapi-breaking] If the break is intentional (major bump), document it in PR and\n"
              "[openapi-breaking] re-baseline metrics.openapiBreaking em config/quality/quality-baseline.json\n" +
              "[openapi-breaking] with justification + tracking issue; otherwise, adjust the spec.\n"
          );
        } else {
          process.stderr.write(
            "[openapi-breaking] ADVISORY — Pass --ratchet to BLOCK a regression. If the break is\n" +
              "[openapi-breaking] intentional (major bump), document it in the PR; otherwise, adjust the spec.\n"
          );
        }
      } else {
        process.stderr.write(
          `[openapi-breaking] OK — nenhuma breaking change na spec vs '${baseRef}'.\n`
        );
      }
    }

    // Successful measurement → applies the ratchet (blocking only with --ratchet).
    applyRatchet(count);
  } finally {
    // Clears the temp file of the base spec.
    try {
      fs.unlinkSync(baseTmp);
    } catch {
      // best-effort
    }
  }
}

/**
 * Applies the ratchet (direction:down) to the measured count vs. the baseline.
 * Without --ratchet: advisory (exit 0). With --ratchet: exit 1 in an actual regression
 * (measurement > baseline). Baseline absent → INCOMPLETE (exit 2).
 *
 * @param {number} count - MEASURED count of breaking changes (successful measurement).
 */
function applyRatchet(count) {
  if (!RATCHET) {
    process.exitCode = 0;
    return;
  }

  const baselineValue = readBaselineOpenapiValue(BASELINE_PATH);
  const { regressed, skipped } = evaluateOpenapiRatchet({
    current: count,
    baseline: baselineValue,
  });

  if (skipped) {
    incomplete("baseline-unresolved");
    if (!QUIET) {
      process.stderr.write(
        "[openapi-breaking] baseline missing (metrics.openapiBreaking) — measurement INCOMPLETE, exit 2.\n"
      );
    }
    return;
  }

  if (regressed) {
    process.stderr.write(
      `[openapi-breaking] REGRESSION — ${count} breaking change(s) > baseline ${baselineValue}\n` +
        "  → Adjust the spec so as not to break existing clients. If the breaking change is intentional\n" +
        "    (major bump), re-baseline metrics.openapiBreaking em\n" +
        "    config/quality/quality-baseline.json com justificativa + issue de tracking.\n"
    );
    process.exitCode = 1;
    return;
  }

  if (!QUIET) {
    process.stderr.write(
      `[openapi-breaking] OK — no regression (${count} breaking change(s), baseline ${baselineValue}).\n`
    );
  }
  process.exitCode = 0;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
