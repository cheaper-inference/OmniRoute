#!/usr/bin/env node
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { catalogKey, validateCatalogEvidence } from "./freeCatalogEvidence.mjs";

// Isolate DATA_DIR before loading application modules so the check never opens the
// operator database (tests/unit/repo-checks-isolate-datadir.test.ts).
if (!process.env.DATA_DIR?.trim()) delete process.env.DATA_DIR;
if (process.env.OMNIROUTE_ALLOW_DEFAULT_DATA_DIR !== "1") {
  await import("../../tests/_setup/isolateDataDir.ts");
}
const { FREE_MODEL_BUDGETS } = await import("../../open-sse/config/freeModelCatalog.data.ts");

const POLICY_PATH = "config/quality/free-catalog-evidence.json";
const SEED_PATH = "config/quality/free-catalog-legacy-seed.json";
// Approved bootstrap debt at 40523566; this is NOT evidence of free access.
// The immutable seed only caps initial debt. Base-relative comparison prevents reintroduction.
const SEED_HASH = "6bceff03ec7e2f4a783e5194504703f268357d909dd04a334dac5315f4439feb";
const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

function previousDebt(baseRef, seed) {
  // Resolve first: unavailable history must fail, never silently bootstrap.
  const commit = git("rev-parse", "--verify", "--end-of-options", `${baseRef}^{commit}`);
  if (!git("ls-tree", "--name-only", commit, "--", POLICY_PATH))
    return seed.entries.map(catalogKey);
  const previous = JSON.parse(git("show", `${commit}:${POLICY_PATH}`));
  if (
    previous.schemaVersion !== 1 ||
    !Array.isArray(previous.debt) ||
    previous.debt.some((key) => typeof key !== "string")
  )
    throw new Error("Invalid base policy");
  return previous.debt;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length && (args.length !== 2 || args[0] !== "--base-ref" || !args[1]))
    throw new Error("Usage: --base-ref <commit>");
  const suppliedBase = args[1] || process.env.BASE_SHA;
  if (
    ["pull_request", "merge_group", "push"].includes(process.env.GITHUB_EVENT_NAME) &&
    !suppliedBase
  )
    throw new Error("Event base SHA required");
  const baseRef = suppliedBase || "HEAD";
  const seed = JSON.parse(readFileSync(SEED_PATH, "utf8"));
  const hash = createHash("sha256").update(JSON.stringify(seed)).digest("hex");
  if (hash !== SEED_HASH) throw new Error("Frozen legacy seed changed");
  const policy = JSON.parse(readFileSync(POLICY_PATH, "utf8"));
  const errors = validateCatalogEvidence(FREE_MODEL_BUDGETS, policy, {
    seed: seed.entries,
    previousDebt: previousDebt(baseRef, seed),
    today: new Date().toISOString().slice(0, 10),
  });
  if (errors.length) {
    for (const error of errors) console.error(`[free-catalog-evidence] ${error}`);
    process.exitCode = 1;
    return;
  }
  console.log(
    `[free-catalog-evidence] PASS: ${policy.evidence.length} sourced entries; ${policy.debt.length} legacy entries still need audit (#17028).`
  );
}

try {
  main();
} catch {
  console.error(
    "[free-catalog-evidence] FAIL: invalid policy/seed/arguments or unavailable base history. Check the pinned base and JSON files."
  );
  process.exitCode = 1;
}
