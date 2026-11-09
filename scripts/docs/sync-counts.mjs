#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { applyCountPlan, countSourceFingerprint, readCountFiles } from "./lib/count-io.mjs";
import { planCountSync } from "./lib/count-sync.mjs";
import { validateFinancialCopy } from "./lib/count-finance-guard.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export function parseCountArguments(args) {
  const allowed = new Set(["--check", "--write", "--json", "--preserve-i18n-state"]);
  if (
    args.some((arg) => !allowed.has(arg)) ||
    new Set(args).size !== args.length ||
    (args.includes("--check") && args.includes("--write"))
  ) {
    throw Object.assign(new Error("COUNT_ARGUMENTS_INVALID"), { code: "COUNT_ARGUMENTS_INVALID" });
  }
  return {
    write: args.includes("--write"),
    json: args.includes("--json"),
    preserveState: args.includes("--preserve-i18n-state"),
  };
}

export function countPlanSummary(plan, facts, written = 0) {
  return {
    status: plan.stateReviewRequired
      ? "STATE_REVIEW_REQUIRED"
      : written
        ? "COUNTS_UPDATED"
        : plan.status,
    facts,
    written,
    changedFiles: plan.changes.length,
    numericUnits: plan.changes
      .filter((change) => change.kind === "numeric")
      .reduce((sum, change) => sum + change.operations.length, 0),
    stateLeaves: plan.stateLeaves.length,
    translationAcceptance: false,
    stateReviewRequired: plan.stateReviewRequired,
    files: plan.changes.map(({ path: file, beforeHash, afterHash, kind }) => ({
      path: file,
      beforeHash,
      afterHash,
      kind,
    })),
  };
}

export async function runCountSync(args = process.argv.slice(2)) {
  const options = parseCountArguments(args);
  // Snapshot before importing the measured source modules, not after caching them.
  const fingerprint = countSourceFingerprint(ROOT);
  const registry = JSON.parse(
    fs.readFileSync(path.join(ROOT, "scripts/docs/lib/count-claims.json"), "utf8")
  );
  const config = JSON.parse(fs.readFileSync(path.join(ROOT, "config/i18n.json"), "utf8"));
  const locales = config.locales
    .map((locale) => locale.code)
    .filter((locale) => !(config.docsExcluded ?? []).includes(locale));
  const files = readCountFiles(ROOT, [
    ...registry.documents.map((doc) => doc.path),
    ...registry.generated,
    ...registry.guardedFinancialSources,
    ".i18n-state.json",
  ]);
  const { CURRENT_DOC_COUNTS: facts } = await import("./lib/read-count-facts.ts");
  const { renderReadmeHero } = await import("./gen-readme-hero.mjs");
  const { renderReadmePromisePillars } = await import("./gen-readme-promise-pillars.mjs");
  const { renderComparisonTable } = await import("./gen-readme-comparison-table.mjs");
  const { renderCliTerminal } = await import("./gen-readme-cli-terminal.mjs");
  const { renderReadmeFreeTierBudget } = await import("./gen-readme-free-tier-budget.mjs");
  const { planProviderReference, countExecutorImpls } = await import("./gen-provider-reference.ts");
  const prettier = await import("prettier");
  const reference = "docs/reference/PROVIDER_REFERENCE.md";
  const prettierConfig = await prettier.resolveConfig(path.join(ROOT, reference));
  const version = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
  const generated = new Map([
    ["docs/diagrams/readme-hero.svg", await renderReadmeHero({ counts: facts })],
    ["docs/diagrams/promise-pillars.svg", await renderReadmePromisePillars({ counts: facts })],
    ["docs/diagrams/comparison-table.svg", await renderComparisonTable({ counts: facts })],
    ["docs/diagrams/cli-terminal.svg", await renderCliTerminal({ counts: facts })],
    ["docs/diagrams/free-tier-budget.svg", await renderReadmeFreeTierBudget()],
    [
      reference,
      await planProviderReference({
        existing: files.get(reference),
        version,
        executorCount: countExecutorImpls(),
        today: new Date().toISOString().slice(0, 10),
        format: (text) =>
          prettier.format(text, { ...prettierConfig, filepath: path.join(ROOT, reference) }),
      }),
    ],
  ]);
  validateFinancialCopy(files, facts, registry.guardedFinancialSources);
  const plan = planCountSync({
    registry,
    facts,
    files,
    generated,
    locales,
    preserveState: options.preserveState,
  });
  const verifyInputs = () => fingerprint === countSourceFingerprint(ROOT);
  if (!verifyInputs())
    throw Object.assign(new Error("COUNT_SOURCE_CHANGED_DURING_RUN"), {
      code: "COUNT_SOURCE_CHANGED_DURING_RUN",
    });
  const written = options.write ? applyCountPlan({ root: ROOT, plan, verifyInputs }).written : 0;
  return {
    options,
    summary: countPlanSummary(plan, facts, written),
    exitCode: plan.stateReviewRequired ? 2 : !options.write && plan.changes.length ? 1 : 0,
  };
}

async function main() {
  try {
    const { options, summary, exitCode } = await runCountSync();
    console.log(
      options.json
        ? JSON.stringify(summary)
        : `${summary.status}: ${summary.changedFiles} files, ${summary.numericUnits} numeric units, ${summary.stateLeaves} proven hash leaves; ${summary.written} written. Translation acceptance is checked separately.`
    );
    process.exitCode = exitCode;
  } catch (error) {
    console.error(
      JSON.stringify({
        status: "REVIEW_REQUIRED",
        code: error.code ?? "COUNT_SYNC_FAILED",
        path: error.path ?? null,
        paths: error.paths ?? [],
      })
    );
    process.exitCode = 2;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href)
  await main();
