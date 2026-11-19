#!/usr/bin/env node
// scripts/check/lib/exemption-proof.mjs — the runtime-exemption rule.
//
// Reuses the shared exemption registry without duplicating its detectors. Discovery reads
// declarations (never mentions), comparison is by constant name, and the review
// reminder translates the `REVIEW-DUE` warning the registry already emits. The
// neutralizer mechanism lives in exemption-proof-loader.mjs; this module holds
// the rule and stays testable without a Node loader.

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const REGISTRY = "config/quality/gate-exemptions.json";
const DECLARATION_RE = /^[ \t]*(?:export )?const ((?:KNOWN|ALLOWED|EXEMPT)_[A-Z_]+)/;
const REVIEW_DUE_RE = /^REVIEW-DUE (.+?): last reviewed (.+) \((.+)\)$/;
const DEFAULT_PATTERNS = ["*.mjs", "*.ts", "*.js", "*.tsx"];

const DIFF_SCOPE_CHECKS = new Set([
  "scripts/check/check-db-rules.mjs",
  "scripts/check/check-deps.mjs",
  "scripts/check/check-docs-symbols.mjs",
  "scripts/check/check-fetch-targets.mjs",
  "scripts/check/check-known-symbols.ts",
  "scripts/check/check-openapi-routes.mjs",
  "scripts/check/check-provider-consistency.ts",
  "scripts/check/check-public-creds.mjs",
  "scripts/check/check-route-guard-membership.ts",
  "scripts/check/check-migration-numbering.mjs",
  "scripts/check/check-error-helper.mjs",
]);

const constantName = (entry) => {
  const target = String(entry?.target ?? "");
  const hash = target.lastIndexOf("#");
  return hash >= 0
    ? target.slice(hash + 1)
    : String(entry?.id ?? "")
        .split("/")
        .pop();
};

export function readExemptionRegistry(root = process.cwd()) {
  return JSON.parse(readFileSync(resolve(root, REGISTRY), "utf8"));
}

function trackedFiles(root, patterns) {
  const result = spawnSync("git", ["-C", root, "ls-files", ...patterns], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error(
      `git ls-files failed: ${result.stderr?.trim() || result.error?.message || "unknown error"}`
    );
  }
  return result.stdout
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Sorted `{name, file, line}` declarations. Anchored on `const`/`export const`
 * at the start of a line so a regex literal or a message mentioning `KNOWN_`
 * never creates an entry. `includeChecks: true` returns the whole tree; the
 * default excludes the eleven diff-scope checks wired by the shared registry.
 */
export function discoverRuntimeConstants({
  root = process.cwd(),
  patterns = DEFAULT_PATTERNS,
  includeChecks = false,
} = {}) {
  const declarations = [];
  for (const file of trackedFiles(root, patterns)) {
    if (!includeChecks && DIFF_SCOPE_CHECKS.has(file)) continue;
    let text;
    try {
      text = readFileSync(resolve(root, file), "utf8");
    } catch {
      continue;
    }
    text.split("\n").forEach((line, index) => {
      const match = line.match(DECLARATION_RE);
      if (match) declarations.push({ name: match[1], file, line: index + 1 });
    });
  }
  return declarations.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}

/** Number of registry entries carrying `surface: "runtime"` (the ratchet source). */
export function countRuntimeExemptions({ root = process.cwd(), registry = null } = {}) {
  const data = registry ?? readExemptionRegistry(root);
  return (data.exemptions ?? []).filter((entry) => entry?.surface === "runtime").length;
}

/** Single English summary line, shared by the gate and its tests. */
export function formatExemptionSummary({ declared, absences, missing, due }) {
  return `exemptions runtime: ${declared} declared, ${absences} undeclared, ${missing} missing red proofs, ${due} due for review`;
}

/** Fast, static proof check used by the CLI: fields, test file and named case. */
function staticProof({ entry, root }) {
  const proof = entry.redProof;
  if (!existsSync(resolve(root, proof.test))) return { proved: false, reason: "test file missing" };
  const text = readFileSync(resolve(root, proof.test), "utf8");
  // Cases are generated from the registry, so the named case is not a literal
  // in the file. The proof is declared when the file iterates registry cases
  // and names each one from the entry, as the red-proof test does.
  if (!text.includes("redProof.case")) return { proved: false, reason: "named case missing" };
  return { proved: true };
}

/**
 * Dynamic proof: run the entry's named case with one constant neutralized in
 * memory. Only used when the CLI is asked for `--proof=dynamic`; the CI
 * red-proof job already replays the whole file against the base tree.
 *
 * The declaration is resolved by name (a registry target can point at a test
 * that uses the constant while the declaration lives in another file), and its
 * exact line is passed to the loader so a prefix name never neutralizes a
 * neighbour such as `KNOWN_LIMIT_ENV` in place of `KNOWN_LIMIT`.
 *
 * The named case neutralizes that exact line with the declared value; a green
 * run proves the declaration was resolved and neutralizable at the right line.
 * A case that cannot find its declaration is not proved.
 */
export function runProof({ entry, root = process.cwd(), loaderUrl }) {
  const proof = entry.redProof;
  const loader = loaderUrl ?? new URL("./exemption-proof-loader.mjs", import.meta.url).href;
  const name = String(entry.target).split("#").pop();
  const declaration = discoverRuntimeConstants({ root, includeChecks: true }).find(
    (candidate) => candidate.name === name
  );
  if (!declaration) return { proved: false, status: 1, reason: "declaration not found" };

  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--import",
      loader,
      "--test",
      `--test-name-pattern=${proof.case}`,
      proof.test,
    ],
    {
      cwd: root,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      env: {
        ...process.env,
        OMNIROUTE_EXEMPTION_PROOF_REGISTER: "1",
        OMNIROUTE_EXEMPTION_PROOF_TARGET: `${declaration.file}#${name}`,
        OMNIROUTE_EXEMPTION_PROOF_NEUTRAL: proof.neutralValue,
        OMNIROUTE_EXEMPTION_PROOF_LINE: String(declaration.line),
      },
    }
  );
  return { proved: result.status === 0, status: result.status };
}

/**
 * Enrich the registry result with the runtime-exemption rule. Pure apart from the
 * optional proof runner, so every branch is unit-testable. Returns
 * `{errors, warnings, summary}` with `summary.exemptionsRuntime` holding the
 * single summary line.
 */
export async function checkRuntimeExemptions({
  root = process.cwd(),
  registry,
  warnings = [],
  summary = {},
  now = "",
  declarations = null,
  proofRunner = staticProof,
} = {}) {
  const errors = [];
  const outWarnings = [];
  if (!registry || !Array.isArray(registry.exemptions)) {
    return {
      errors: ["missing exemption registry"],
      warnings: outWarnings,
      summary: {
        ...summary,
        exemptionsRuntime: formatExemptionSummary({ declared: 0, absences: 0, missing: 0, due: 0 }),
      },
    };
  }

  const found = declarations ?? discoverRuntimeConstants({ root });
  const declaredNames = new Set(
    (registry.exemptions ?? []).filter((entry) => entry?.kind === "constant").map(constantName)
  );
  let absences = 0;
  for (const declaration of found) {
    if (declaredNames.has(declaration.name)) continue;
    absences++;
    errors.push(`undeclared runtime exemption: ${declaration.name} (${declaration.file})`);
  }

  const runtimeEntries = (registry.exemptions ?? []).filter(
    (entry) => entry?.surface === "runtime"
  );
  let missing = 0;
  const proofByEntry = new Map();
  for (const entry of runtimeEntries) {
    const file = String(entry.target ?? "").split("#")[0];
    if (!file || !existsSync(resolve(root, file))) {
      errors.push(`runtime exemption target missing: ${entry.id} (${file})`);
    }
    const proof = entry.redProof ?? {};
    const emptyFields = ["test", "case", "neutralValue"].filter(
      (field) => typeof proof[field] !== "string" || !proof[field].trim()
    );
    if (emptyFields.length) {
      missing++;
      errors.push(`missing red proof field ${emptyFields.join(", ")}: ${entry.id}`);
      proofByEntry.set(entry.id, false);
      continue;
    }
    const result = await proofRunner({ entry, root, now });
    const proved = Boolean(result?.proved);
    proofByEntry.set(entry.id, proved);
    if (!proved) {
      errors.push(`REMOVABLE exemption not removed: ${entry.id}`);
      outWarnings.push(`REMOVABLE ${entry.id}: red proof no longer fails (${now})`);
    }
  }

  let due = 0;
  const dueIds = new Set();
  for (const warning of warnings) {
    const match = String(warning).match(REVIEW_DUE_RE);
    if (!match) {
      outWarnings.push(warning);
      continue;
    }
    const [, id, tag, date] = match;
    const entry = runtimeEntries.find((candidate) => candidate.id === id);
    if (!entry) {
      // Non-runtime reminders belong to the registry gate; leave them untouched.
      outWarnings.push(warning);
      continue;
    }
    if (proofByEntry.get(id) === false) {
      if (!dueIds.has(id)) {
        dueIds.add(id);
        outWarnings.push(`REMOVABLE ${id}: last reviewed ${tag} (${date})`);
        errors.push(`REMOVABLE exemption not removed: ${id}`);
      }
      continue;
    }
    due++;
    outWarnings.push(`Review due ${id}: last reviewed ${tag} (${date})`);
  }

  const declared = countRuntimeExemptions({ root, registry });
  return {
    errors,
    warnings: outWarnings,
    summary: {
      ...summary,
      exemptionsRuntime: formatExemptionSummary({ declared, absences, missing, due }),
    },
  };
}
