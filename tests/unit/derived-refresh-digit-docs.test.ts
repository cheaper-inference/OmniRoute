import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import test from "node:test";

import ts from "typescript";

import { buildChecks, PR_MODE_FACTS } from "../../scripts/check/check-docs-counts-sync.mjs";
import { categoryOf, loadFamilies } from "../../scripts/check/check-pr-derived-paths.mjs";
import { loadConfig } from "../../scripts/merge-queue/config.mjs";
import { isProtectedPath } from "../../scripts/merge-queue/contracts.mjs";

const moduleUrl = new URL("../../scripts/release/derived-refresh-digit-docs.mjs", import.meta.url);
const root = new URL("../../", import.meta.url);

test("the autoland document allowlist matches the eligible docs counts registry paths", async () => {
  const { DIGITS_ONLY_DOCS } = await import("../../scripts/release/derived-refresh-digit-docs.mjs");
  const { protectedPaths } = loadConfig();
  const families = loadFamilies();
  const registeredFiles = buildChecks({ facts: PR_MODE_FACTS }).flatMap(
    (check) => check.files ?? (check.file ? [check.file] : [])
  );
  const eligibleDocs = [...new Set<string>(registeredFiles)].filter(
    (file) =>
      file.endsWith(".md") &&
      !file.startsWith("docs/i18n/") &&
      !isProtectedPath(file, protectedPaths) &&
      families.every((family) => categoryOf(file, family) === null)
  );
  assert.deepEqual(
    [...DIGITS_ONLY_DOCS].sort(),
    eligibleDocs.sort(),
    "Adding or removing a path in DIGITS_ONLY_DOCS changes what the robot can land on its own and requires review. Reconcile the allowlist with the docs counts registry."
  );
});

test("every allowlisted document exists in the repository", async () => {
  const { DIGITS_ONLY_DOCS } = await import("../../scripts/release/derived-refresh-digit-docs.mjs");
  for (const file of DIGITS_ONLY_DOCS) {
    assert.ok(
      statSync(new URL(file, root), { throwIfNoEntry: false })?.isFile(),
      `Missing ${file}`
    );
  }
});

test("the autoland document allowlist is frozen, sorted and unique", async () => {
  const { DIGITS_ONLY_DOCS } = await import("../../scripts/release/derived-refresh-digit-docs.mjs");
  assert.ok(Object.isFrozen(DIGITS_ONLY_DOCS));
  assert.deepEqual(DIGITS_ONLY_DOCS, [...new Set(DIGITS_ONLY_DOCS)].sort());
});

test("the autoland document allowlist module imports only Node built-ins", () => {
  const source = readFileSync(moduleUrl, "utf8");
  const { importedFiles } = ts.preProcessFile(source, true, true);
  for (const { fileName } of importedFiles) {
    assert.ok(fileName.startsWith("node:"), `Unexpected allowlist module dependency: ${fileName}`);
  }
});
