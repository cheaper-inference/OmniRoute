#!/usr/bin/env node
// scripts/check/lib/allowlist.mjs
// Shared helper for stale-allowlist enforcement (6A.3).
//
// Purpose: detect allowlist entries that no longer correspond to any live
// violation. When a developer fixes a violation, the entry in KNOWN_* must
// also be removed — otherwise the gate silently allows the violation to
// regress. This pattern is validated practice (ESLint --report-unused-disable-
// directives; Notion suppression hygiene).

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { diffChangedFiles, resolveCheckBase } from "./check-base.mjs";

/**
 * Returns the subset of `allowlist` entries that do NOT appear in
 * `liveViolations`. These are "stale" entries — the violation they once
 * suppressed has been corrected, so the entry should be removed to prevent
 * silent regression.
 *
 * @param {string[] | Set<string>} allowlist  - The known-violations list/set.
 * @param {string[] | Set<string>} liveViolations - Violations detected in the
 *   current run (strings as they appear in the allowlist).
 * @param {string} gateName - Gate name used only in future error messages; not
 *   used internally by this function but kept for API consistency with
 *   assertNoStale.
 * @returns {string[]} Stale entries (present in allowlist, absent in live).
 */
export function reportStaleEntries(allowlist, liveViolations, gateName) {
  const liveSet = liveViolations instanceof Set ? liveViolations : new Set(liveViolations);
  const stale = [];
  for (const entry of allowlist) {
    if (!liveSet.has(entry)) {
      stale.push(entry);
    }
  }
  return stale;
}

/**
 * Calls reportStaleEntries; if any stale entries are found, logs them to
 * stderr and sets process.exitCode = 1 so the gate fails without throwing
 * (allowing multiple gates to report before the process exits).
 *
 * @param {string[] | Set<string>} allowlist
 * @param {string[] | Set<string>} liveViolations
 * @param {string} gateName - Shown in the error message to identify the gate.
 * @returns {string[]} The same stale array returned by reportStaleEntries.
 */
export function assertNoStale(allowlist, liveViolations, gateName) {
  const stale = reportStaleEntries(allowlist, liveViolations, gateName);
  if (stale.length > 0) {
    console.error(
      `[${gateName}] ${stale.length} entrada(s) obsoleta(s) na allowlist ` +
        `— a violação foi corrigida; REMOVA a entrada para travar a correção:\n` +
        stale.map((e) => `  ✗ ${e}`).join("\n")
    );
    process.exitCode = 1;
  }
  return stale;
}

// ---------------------------------------------------------------------------------------
// Diff scope — a known exemption only covers the file it was recorded for.
//
// `assertNoStale` above stays untouched and is still the single source of truth
// for stale entries. The helpers below add a second, independent rule: on a PR,
// a known violation that reappears in a changed file outside its frozen scope
// must be refused by name. Off PR the historic global behaviour is kept.
// ---------------------------------------------------------------------------------------

// A path-shaped string already carries the file it belongs to. Several gates
// (raw SQL, stale doc refs, route membership, spec paths) report violations as
// repository-relative paths, so the file must be derived from the string --
// otherwise the diff scope can never see a real violation.
// Dynamic route segments such as `[id]` are part of the path and must keep it.
const FILE_PATH_RE = /^[\w.@\-[\]]+(?:\/[\w.@\-[\]]+)+$/;

const asViolation = (value) => {
  if (typeof value === "string") {
    return { id: value, file: FILE_PATH_RE.test(value) ? value : null };
  }
  return { id: value?.id, file: value?.file ?? null };
};

/**
 * Frozen files declared for a gate in the exemption registry. A known
 * violation in a changed file is refused unless that file is listed here.
 * Unknown gates or a missing registry yield no frozen files (fail closed on
 * the refusal rule instead of silently widening it).
 */
export function registryFrozenScope(gateName, root = process.cwd()) {
  try {
    const registry = JSON.parse(
      readFileSync(resolve(root, "config/quality/gate-exemptions.json"), "utf8")
    );
    const normalize = (value) =>
      String(value ?? "")
        .replace(/^check:/, "")
        .split(":")[0]
        .replace(/^check-/, "");
    const target = normalize(gateName);
    const frozen = [];
    for (const entry of registry.exemptions ?? []) {
      if (entry?.diffScope !== true || normalize(entry.gate) !== target) continue;
      for (const scope of entry.scope ?? []) frozen.push(scope);
    }
    return frozen;
  } catch {
    return [];
  }
}

/**
 * Apply stale enforcement first, then diff scope. Pure: never writes to the
 * tree or to `process.exitCode`, so it is safe to unit test. The caller turns
 * `blocked`/`exitCode` into a process verdict.
 *
 * @param {{allowlist: Iterable<string>, liveViolations: Iterable<any>,
 *   changedFiles?: string[], frozenScope?: string[], gateName: string,
 *   baseStatus?: object}} input
 */
export function assertDiffScope({
  allowlist,
  liveViolations,
  changedFiles = [],
  frozenScope = [],
  gateName,
  baseStatus,
} = {}) {
  // A record is a valid allowlist shape in several gates; index it by key.
  const source = allowlist ?? [];
  const iterable =
    typeof source === "object" && !Array.isArray(source) && !(Symbol.iterator in source)
      ? Object.keys(source)
      : source;
  const known = new Set(iterable);
  const violations = [...(liveViolations ?? [])].map(asViolation);
  const stale = reportStaleEntries(
    known,
    violations.map((v) => v.id),
    gateName
  );

  if (baseStatus?.status === "error") {
    return {
      blocked: true,
      exitCode: 2,
      stale,
      newViolations: [],
      status: "error",
      resolver: baseStatus.resolver,
      message: `[${gateName}] base refused by ${baseStatus.resolver}: ${baseStatus.reason}`,
    };
  }

  const changed = new Set(changedFiles ?? []);
  const frozen = new Set(frozenScope ?? []);
  const newViolations =
    baseStatus?.status === "resolved"
      ? violations.filter(
          (v) => v.file && changed.has(v.file) && !frozen.has(v.file) && known.has(v.id)
        )
      : [];

  const lines = [
    ...(stale.length ? stale.map((id) => `[${gateName}] stale entry: ${id}`) : []),
    ...newViolations.map(
      (v) => `[${gateName}] known violation in new file: ${v.file} (entry ${v.id})`
    ),
  ];

  return {
    blocked: lines.length > 0,
    exitCode: lines.length > 0 ? 1 : 0,
    stale,
    newViolations,
    status: baseStatus?.status === "resolved" ? "resolved" : "skipped",
    message: lines.join("\n"),
  };
}

/**
 * Runtime wrapper used by gates: resolve the verified base, collect the files
 * changed against it, then delegate to `assertDiffScope`. Without a base (local
 * or non-PR runs) it returns `skipped` and the global allowlist still applies.
 *
 * All destructured parameters carry a default: TypeScript reading this .mjs
 * otherwise infers only the defaulted ones and rejects the three required keys
 * (TS2353) in the TypeScript gates.
 *
 * @param {{allowlist?: Iterable<string>, liveViolations?: Iterable<any>,
 *   gateName?: string, frozenScope?: string[], cwd?: string,
 *   cliBase?: string | null, latestTag?: boolean,
 *   env?: Record<string, string | undefined>}} [input]
 */
export function enforceDiffScope({
  allowlist = [],
  liveViolations = [],
  gateName = "allowlist",
  frozenScope = [],
  cwd = process.cwd(),
  cliBase = null,
  latestTag = false,
  env = process.env,
} = {}) {
  const baseStatus = resolveCheckBase({ cwd, env, cliBase, latestTag });
  let changedFiles = [];
  if (baseStatus.status === "resolved") {
    changedFiles = diffChangedFiles(cwd, baseStatus.sha);
  }
  const result = assertDiffScope({
    allowlist,
    liveViolations,
    changedFiles,
    frozenScope: [...new Set([...registryFrozenScope(gateName, cwd), ...frozenScope])],
    gateName,
    baseStatus,
  });
  // Stale entries are already reported by the gate's own assertNoStale call;
  // this wrapper only surfaces the new diff-scope rule and base refusals.
  if (baseStatus.status === "error") {
    console.error(result.message);
    process.exitCode = 2;
  } else if (result.newViolations.length) {
    const lines = result.newViolations.map(
      (v) => `[${gateName}] known violation in new file: ${v.file} (entry ${v.id})`
    );
    console.error(lines.join("\n"));
    process.exitCode = 1;
  }
  return { ...result, baseSha: baseStatus.sha ?? null, resolver: baseStatus.resolver };
}
