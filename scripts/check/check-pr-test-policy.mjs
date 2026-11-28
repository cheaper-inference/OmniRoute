import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { isDeepStrictEqual } from "node:util";

const SOURCE_ROOTS = ["src/", "open-sse/", "electron/", "bin/"];
const CLI_CATALOG = /^bin\/cli\/locales\/[a-zA-Z0-9-]+\.json$/;
const TEST_PATTERNS = [/^tests\//, /(?:^|\/)__tests__\//, /\.(?:test|spec)\.[cm]?[jt]sx?$/];
// Test files for specific source types (e.g., Python validation scripts for i18n)
const TEST_FILE_PATTERNS = {
  "src/i18n/messages/": [
    /\/scripts\/validate_translation\.py$/,
    /\/scripts\/check_translations\.py$/,
  ],
};
// Exclude directories that don't require tests (i18n has Python validation, docs, config)
const EXCLUDED_PATTERNS = [
  /\/i18n\/messages\//, // i18n files have their own Python test scripts
  /\.md$/, // Documentation
  /\.yaml$/, // Config files
  /\.yml$/, // Config files
  /(?:^|\/)package(?:-lock)?\.json$/, // Dependency manifests/lockfiles (e.g. Dependabot bumps) — not testable code
];

function getArg(name, fallbackValue = "") {
  const index = process.argv.indexOf(name);
  if (index === -1 || index === process.argv.length - 1) {
    return fallbackValue;
  }
  return process.argv[index + 1];
}

function runGit(args) {
  return execFileSync("git", args, { encoding: "utf8" });
}

function isSourceFile(filePath) {
  // Exclude patterns that don't require tests
  if (EXCLUDED_PATTERNS.some((pattern) => pattern.test(filePath))) {
    return false;
  }
  return SOURCE_ROOTS.some((root) => filePath.startsWith(root));
}

function isTestFile(filePath) {
  // Check standard test patterns
  if (TEST_PATTERNS.some((pattern) => pattern.test(filePath))) {
    return true;
  }
  // Check custom test file patterns for specific directories
  for (const [dir, patterns] of Object.entries(TEST_FILE_PATTERNS)) {
    if (filePath.startsWith(dir) && patterns.some((pattern) => pattern.test(filePath))) {
      return true;
    }
  }
  return false;
}

function readCliCatalog(objectId) {
  const blob = execFileSync("git", ["cat-file", "blob", objectId]);
  const source = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(blob);
  const value = JSON.parse(source, (_key, item) => {
    if (typeof item === "string" || (item && typeof item === "object" && !Array.isArray(item))) {
      return item;
    }
    throw new SyntaxError("CLI catalogs contain objects and strings");
  });
  if (typeof value === "string") throw new SyntaxError("Expected a CLI catalog object");

  // JSON.parse keeps only the last occurrence of a key. Scan the already-valid JSON's
  // complete string tokens so escaped quotes, braces and colons in translations are ignored.
  const objects = [];
  for (const [token, literal, colon] of source.matchAll(/("(?:[^"\\]|\\[\s\S])*")\s*(:)?|[{}]/g)) {
    if (token === "{") objects.push(new Set());
    else if (token === "}") objects.pop();
    else if (colon) {
      const keys = objects.at(-1);
      const key = JSON.parse(literal);
      // The CLI flattens nested keys with dots. Keep ambiguous paths in test scope.
      if (!key || key.includes(".")) throw new SyntaxError("Expected a CLI catalog key segment");
      if (keys.has(key)) throw new SyntaxError("Duplicate CLI catalog key");
      keys.add(key);
    }
  }
  return value;
}

function hasSameCliTranslations(before, after) {
  try {
    return isDeepStrictEqual(readCliCatalog(before), readCliCatalog(after));
  } catch {
    return false;
  }
}

function classifyCliCatalogChanges(diffRange) {
  const fields = runGit([
    "diff",
    "--raw",
    "-z",
    "--no-abbrev",
    "--no-renames",
    diffRange,
    "--",
    "bin/cli/locales/",
  ]).split("\0");
  const changed = new Map();
  for (let index = 0; index + 1 < fields.length; index += 2) {
    const filePath = fields[index + 1];
    if (!CLI_CATALOG.test(filePath)) continue;
    const [beforeMode, afterMode, before, after, status] = fields[index].slice(1).split(" ");
    const unchangedTranslations =
      filePath !== "bin/cli/locales/en.json" &&
      status === "M" &&
      beforeMode === afterMode &&
      /^(100644|100755)$/.test(beforeMode) &&
      hasSameCliTranslations(before, after);
    changed.set(filePath, unchangedTranslations);
  }
  return changed;
}

function buildReport(lines) {
  return `${lines.join("\n")}\n`;
}

const summaryFile = getArg("--summary-file", "");
const baseRef = process.env.GITHUB_BASE_REF;

if (!baseRef) {
  const report = buildReport([
    "## PR Test Policy",
    "",
    "Skipped: not running in a pull request context.",
  ]);

  if (summaryFile) {
    mkdirSync(path.dirname(summaryFile), { recursive: true });
    writeFileSync(summaryFile, report);
  }

  process.stdout.write(report);
  process.exit(0);
}

const baseTarget = process.env.GITHUB_BASE_SHA || `origin/${baseRef}`;
const diffRange = `${baseTarget}...HEAD`;
// NUL separators preserve whitespace, Unicode and newlines in Git paths.
const changedFiles = runGit(["diff", "--name-only", "-z", "--diff-filter=ACMR", diffRange])
  .split("\0")
  .filter(Boolean);
// A rename or copy introduces a new destination too. Existing misplaced tests
// remain visible legacy debt; this rule prevents newly introduced locations.
const addedFiles = runGit([
  "diff",
  "--no-renames",
  "--name-only",
  "-z",
  "--diff-filter=A",
  diffRange,
])
  .split("\0")
  .filter(Boolean);
// Workspace packages under @omniroute/ run their own suites from <package>/tests/,
// so a new test there is placed correctly too.
const PACKAGE_TEST_DIR = /^@omniroute\/[^/]+\/tests\//;
const isPlacedTest = (filePath) => filePath.startsWith("tests/") || PACKAGE_TEST_DIR.test(filePath);
const misplacedNewTests = addedFiles.filter(
  (filePath) => isTestFile(filePath) && !isPlacedTest(filePath)
);

// Derived locale formatting has no runtime effect when the exact Git blobs have the same
// translations. Additions, deletions, and other substantive locale edits still require tests.
const cliCatalogChanges = classifyCliCatalogChanges(diffRange);
const changedSourceFiles = [...new Set([...changedFiles, ...cliCatalogChanges.keys()])].filter(
  (filePath) => isSourceFile(filePath) && !cliCatalogChanges.get(filePath)
);
const changedTestFiles = changedFiles.filter(isTestFile);
const hasRequiredTests = changedSourceFiles.length === 0 || changedTestFiles.length > 0;
const passesPolicy = hasRequiredTests && misplacedNewTests.length === 0;

const reportLines = [
  "## PR Test Policy",
  "",
  `Base ref: \`${baseRef}\``,
  `Changed production files: ${changedSourceFiles.length}`,
  `Changed automated test files: ${changedTestFiles.length}`,
  `New test files outside tests/: ${misplacedNewTests.length}`,
  "",
];

if (changedSourceFiles.length > 0) {
  reportLines.push("### Production files in scope", "");
  for (const filePath of changedSourceFiles.slice(0, 20)) {
    reportLines.push(`- \`${filePath}\``);
  }
  reportLines.push("");
}

if (changedTestFiles.length > 0) {
  reportLines.push("### Tests in this PR", "");
  for (const filePath of changedTestFiles.slice(0, 20)) {
    reportLines.push(`- \`${filePath}\``);
  }
  reportLines.push("");
}

if (passesPolicy) {
  reportLines.push("Result: PASS");
} else {
  reportLines.push("Result: FAIL", "");
  if (!hasRequiredTests) {
    reportLines.push(
      "This PR changes production code under `src/`, `open-sse/`, `electron/`, or `bin/` but does not add or update automated tests."
    );
  }
  if (misplacedNewTests.length > 0) {
    reportLines.push(
      "New test files must be under `tests/` (or a workspace package's own `@omniroute/<package>/tests/`), including renamed or copied tests.",
      ""
    );
    for (const filePath of misplacedNewTests.slice(0, 20)) {
      reportLines.push(`- ${JSON.stringify(filePath)}`);
    }
  }
}

const report = buildReport(reportLines);

if (summaryFile) {
  mkdirSync(path.dirname(summaryFile), { recursive: true });
  writeFileSync(summaryFile, report);
}

process.stdout.write(report);

if (!passesPolicy) {
  process.exit(1);
}
