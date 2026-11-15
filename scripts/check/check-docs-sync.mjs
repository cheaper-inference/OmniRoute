#!/usr/bin/env node
// Documentation version sync. Two gate modes (scripts/check/lib/gateMode.mjs; plan "derived
// numbers and texts resolved only at release", 2026-11-13):
//
//   release — every check below, strict (push, schedule, the release PR, any local run).
//   pr      — the checks a feature PR can break in its own sources: package.json vs
//             docs/openapi.yaml version, the root CHANGELOG headings, superseded docs. The two
//             translation-mirror checks (docs/i18n/<locale>/llm.txt copies and the translated
//             CHANGELOG.md sections) are skipped with a reason: feature PRs never write
//             docs/i18n/**; the translation wave (scripts/i18n/sync-llm-mirrors.mjs) and the
//             release (npm run release:sync-changelog-i18n) do. Two exceptions keep a mirror
//             edit visible: a change that writes the mirrors (writer branch, or its own diff
//             when the base resolves) is judged strictly, and the llm.txt mirrors must always
//             agree with each other or with the root (a hand edit to one of them fails even
//             in a depth-1 checkout).
//
// The pre-commit hook passes --mode=pr: a commit is judged on what it does, not on mirrors the
// base left stale.

import fs from "node:fs";
import path from "node:path";
import { categoryOf, loadFamilies, matchesAny } from "./check-pr-derived-paths.mjs";
import {
  describeGateMode,
  listChangedFiles,
  resolveGateModeInfo,
  resolveHeadBranch,
  resolvePrDiffBase,
} from "./lib/gateMode.mjs";

const cwd = process.cwd();
const packageJsonPath = path.resolve(cwd, "package.json");
const openApiPath = path.resolve(cwd, "docs/openapi.yaml");
const changelogPath = path.resolve(cwd, "CHANGELOG.md");
const llmPath = path.resolve(cwd, "llm.txt");
const i18nDocsPath = path.resolve(cwd, "docs/i18n");

function readText(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${path.relative(cwd, filePath)}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function extractOpenApiVersion(content) {
  const lines = content.split(/\r?\n/);
  let inInfoBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inInfoBlock) {
      if (trimmed === "info:") {
        inInfoBlock = true;
      }
      continue;
    }

    if (line.length > 0 && !line.startsWith(" ")) {
      break;
    }

    const match = line.match(/^\s{2}version:\s*["']?([^"'\s]+)["']?\s*$/);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function extractChangelogSections(content) {
  const headings = [...content.matchAll(/^##\s+\[([^\]]+)\](?:\s+[-—–].*)?$/gm)];
  return headings.map((match) => match[1]);
}

function stripTopHeading(content) {
  return content.replace(/^# .+\r?\n+/, "");
}

function extractI18nMirrorBody(content) {
  const separator = content.match(/^---\s*$/m);
  if (!separator || separator.index === undefined) {
    return null;
  }

  return content.slice(separator.index + separator[0].length).replace(/^\r?\n+/, "");
}

function normalizeMirrorBody(content) {
  return content.replace(/\r\n/g, "\n").trim();
}

function isSemver(value) {
  // Accept X.Y.Z and X.Y.Z-prerelease.N (e.g. 3.0.0-rc.1, 3.0.0-beta.2)
  return /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/.test(value);
}

let hasFailure = false;

let gateMode;
try {
  gateMode = resolveGateModeInfo({ argv: process.argv, env: process.env });
} catch (error) {
  console.error(`[docs-sync] FAIL - ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
console.log(`[docs-sync] ${describeGateMode(gateMode)}`);
const STRICT_ELSEWHERE =
  "the strict check runs in release mode (the release PR, pushes to main, local runs)";

const LLM_MIRROR = /^docs\/i18n\/[^/]+\/llm\.txt$/;
const CHANGELOG_MIRROR = /^docs\/i18n\/[^/]+\/CHANGELOG\.md$/;

/**
 * PR mode only. A change that writes translation mirrors is judged on them: a head branch that is a
 * declared writer of the docs/i18n family (config/quality/derived-paths/*.json — the translation
 * wave) runs both mirror checks strictly; any other change runs a mirror check strictly when its
 * own diff touches those mirrors (diff base unresolvable, e.g. a depth-1 CI checkout → skipped).
 * @returns {{ llm: string | null, changelog: string | null }} reason to run strictly, or null
 */
function prMirrorScope() {
  const branch = resolveHeadBranch({ env: process.env, cwd });
  const writer = loadFamilies(cwd).find(
    (family) =>
      branch &&
      matchesAny(branch, family.writers) &&
      categoryOf("docs/i18n/xx/llm.txt", family) !== null
  );
  if (writer) {
    const reason = `head ${branch} writes translation mirrors (${writer.source})`;
    return { llm: reason, changelog: reason };
  }
  const base = resolvePrDiffBase({ env: process.env, cwd });
  if (!base) return { llm: null, changelog: null };
  const files = listChangedFiles(base.sha, { cwd, includeWorktree: !process.env.GITHUB_ACTIONS });
  return {
    llm: files.some((file) => LLM_MIRROR.test(file))
      ? "the change edits docs/i18n/<locale>/llm.txt"
      : null,
    changelog: files.some((file) => CHANGELOG_MIRROR.test(file))
      ? "the change edits docs/i18n/<locale>/CHANGELOG.md"
      : null,
  };
}

function fail(message) {
  hasFailure = true;
  console.error(`[docs-sync] FAIL - ${message}`);
}

function checkI18nMirrorFile(fileName, sourcePath) {
  if (!fs.existsSync(i18nDocsPath)) {
    fail("docs/i18n directory is missing");
    return;
  }

  const sourceBody = normalizeMirrorBody(stripTopHeading(readText(sourcePath)));
  const locales = fs
    .readdirSync(i18nDocsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  let checked = 0;
  for (const locale of locales) {
    const targetPath = path.join(i18nDocsPath, locale, fileName);
    if (!fs.existsSync(targetPath)) {
      fail(`docs/i18n/${locale}/${fileName} is missing`);
      continue;
    }

    const body = extractI18nMirrorBody(readText(targetPath));
    if (body === null) {
      fail(`docs/i18n/${locale}/${fileName} is missing the i18n mirror separator`);
      continue;
    }

    if (normalizeMirrorBody(body) !== sourceBody) {
      fail(`docs/i18n/${locale}/${fileName} differs from root ${fileName}`);
      continue;
    }

    checked += 1;
  }

  if (checked > 0) {
    console.log(`[docs-sync] ${fileName} i18n mirrors match root content: ${checked} locales`);
  }
}

/**
 * PR mode, when the change is not judged strictly on the exact-copy mirrors (it does not write
 * them, or its diff base is unresolvable — the depth-1 checkout of docs-sync-strict). A base that
 * moved leaves every mirror equally stale; a hand edit leaves one mirror that matches neither the
 * root nor the body most mirrors share. So each mirror must exist, keep its separator, and carry
 * either the root body or that most common body — a check that needs no base.
 * @returns {boolean} true when every mirror already matches the root body
 */
function checkI18nMirrorConsistency(fileName, sourcePath) {
  if (!fs.existsSync(i18nDocsPath)) {
    fail("docs/i18n directory is missing");
    return false;
  }

  const sourceBody = normalizeMirrorBody(stripTopHeading(readText(sourcePath)));
  const locales = fs
    .readdirSync(i18nDocsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const bodies = new Map();
  for (const locale of locales) {
    const targetPath = path.join(i18nDocsPath, locale, fileName);
    if (!fs.existsSync(targetPath)) {
      fail(`docs/i18n/${locale}/${fileName} is missing`);
      continue;
    }
    const body = extractI18nMirrorBody(readText(targetPath));
    if (body === null) {
      fail(`docs/i18n/${locale}/${fileName} is missing the i18n mirror separator`);
      continue;
    }
    bodies.set(locale, normalizeMirrorBody(body));
  }

  const counts = new Map();
  for (const body of bodies.values()) counts.set(body, (counts.get(body) ?? 0) + 1);
  let shared = null;
  let sharedCount = 0;
  for (const [body, count] of counts) {
    if (count > sharedCount) [shared, sharedCount] = [body, count];
  }

  let agreeing = 0;
  let current = 0;
  for (const [locale, body] of bodies) {
    if (body === sourceBody) current += 1;
    if (body === sourceBody || body === shared) {
      agreeing += 1;
      continue;
    }
    fail(
      `docs/i18n/${locale}/${fileName} differs from root ${fileName} and from the other locales' mirrors (hand edit? run node scripts/i18n/sync-llm-mirrors.mjs)`
    );
  }

  const allCurrent = current > 0 && current === locales.length;
  if (allCurrent) {
    console.log(`[docs-sync] ${fileName} i18n mirrors match root content: ${current} locales`);
  } else if (agreeing > 0) {
    console.log(
      `[docs-sync] pr mode: ${fileName} mirrors agree with each other: ${agreeing} locales (${current} already match the root)`
    );
  }
  return allCurrent;
}

/**
 * Check i18n CHANGELOG mirrors by verifying that all version sections from the
 * root CHANGELOG exist in each translation. Unlike strict mirror files (llm.txt),
 * CHANGELOG translations have translated section headings (e.g. "Security" →
 * "Segurança"), so byte-for-byte comparison is intentionally skipped.
 *
 * Validates:
 * 1. File exists in each locale
 * 2. Has the i18n mirror separator (---)
 * 3. Contains all version sections (## [X.Y.Z]) from root, in the same order
 * 4. Body is non-empty and within a reasonable size tolerance of the source
 */
function checkI18nChangelogFile(sourcePath) {
  const fileName = "CHANGELOG.md";
  if (!fs.existsSync(i18nDocsPath)) {
    fail("docs/i18n directory is missing");
    return;
  }

  const sourceContent = readText(sourcePath);
  const sourceBody = normalizeMirrorBody(stripTopHeading(sourceContent));
  const sourceVersions = extractChangelogSections(sourceContent);
  const locales = fs
    .readdirSync(i18nDocsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  let checked = 0;
  for (const locale of locales) {
    const targetPath = path.join(i18nDocsPath, locale, fileName);
    if (!fs.existsSync(targetPath)) {
      fail(`docs/i18n/${locale}/${fileName} is missing`);
      continue;
    }

    const targetContent = readText(targetPath);
    const body = extractI18nMirrorBody(targetContent);
    if (body === null) {
      fail(`docs/i18n/${locale}/${fileName} is missing the i18n mirror separator`);
      continue;
    }

    const normalizedBody = normalizeMirrorBody(body);
    if (normalizedBody.length === 0) {
      fail(`docs/i18n/${locale}/${fileName} has empty body after separator`);
      continue;
    }

    // Verify all version sections from root exist in the translation
    const targetVersions = extractChangelogSections(targetContent);
    const missingVersions = sourceVersions.filter((v) => !targetVersions.includes(v));
    if (missingVersions.length > 0) {
      fail(
        `docs/i18n/${locale}/${fileName} is missing version sections: ${missingVersions.slice(0, 3).join(", ")}${missingVersions.length > 3 ? ` (+${missingVersions.length - 3} more)` : ""}`
      );
      continue;
    }

    // Verify body line count is within 25% tolerance of source (translations
    // should preserve structure — drastic line-count differences indicate
    // stale or missing content)
    const sourceLines = sourceBody.split("\n").length;
    const targetLines = normalizedBody.split("\n").length;
    const sizeDiff = Math.abs(targetLines - sourceLines) / sourceLines;
    if (sizeDiff > 0.25) {
      fail(
        `docs/i18n/${locale}/${fileName} body line count differs by ${(sizeDiff * 100).toFixed(0)}% from root (expected within 25%)`
      );
      continue;
    }

    checked += 1;
  }

  if (checked > 0) {
    console.log(
      `[docs-sync] ${fileName} i18n translations validated: ${checked} locales (version sections + size check)`
    );
  }
}

try {
  const packageJson = JSON.parse(readText(packageJsonPath));
  const packageVersion = packageJson.version;

  if (!isSemver(packageVersion)) {
    fail(`package.json version is not valid semver: "${packageVersion}"`);
  } else {
    console.log(`[docs-sync] package.json version: ${packageVersion}`);
  }

  const openApiVersion = extractOpenApiVersion(readText(openApiPath));
  if (!openApiVersion) {
    fail("could not extract docs/openapi.yaml info.version");
  } else if (openApiVersion !== packageVersion) {
    fail(`OpenAPI version (${openApiVersion}) differs from package.json (${packageVersion})`);
  } else {
    console.log(`[docs-sync] openapi.yaml info.version matches: ${openApiVersion}`);
  }

  const changelogSections = extractChangelogSections(readText(changelogPath));
  if (changelogSections.length === 0) {
    fail("CHANGELOG.md has no version sections");
  } else {
    if (changelogSections[0] !== "Unreleased") {
      fail('CHANGELOG.md first section must be "## [Unreleased]"');
    } else {
      console.log("[docs-sync] changelog has top Unreleased section");
    }

    const semverSections = changelogSections.filter((section) => isSemver(section));
    if (semverSections.length === 0) {
      fail("CHANGELOG.md has no semver release section");
    } else if (semverSections[0] !== packageVersion) {
      fail(
        `Latest changelog release (${semverSections[0]}) differs from package.json (${packageVersion})`
      );
    } else {
      console.log(
        `[docs-sync] latest changelog release matches package version: ${packageVersion}`
      );
    }
  }

  if (gateMode.mode === "pr") {
    const scope = prMirrorScope();
    if (scope.llm) {
      console.log(`[docs-sync] pr mode: ${scope.llm} — checking the llm.txt mirrors strictly`);
      checkI18nMirrorFile("llm.txt", llmPath);
    } else if (!checkI18nMirrorConsistency("llm.txt", llmPath)) {
      console.log(
        `[docs-sync] SKIP reason=pr-mode — docs/i18n/<locale>/llm.txt mirrors are refreshed by the translation wave (scripts/i18n/sync-llm-mirrors.mjs), not by feature PRs; ${STRICT_ELSEWHERE}`
      );
    }
    if (scope.changelog) {
      console.log(
        `[docs-sync] pr mode: ${scope.changelog} — checking the translated CHANGELOG.md mirrors strictly`
      );
      checkI18nChangelogFile(changelogPath);
    } else {
      console.log(
        `[docs-sync] SKIP reason=pr-mode — translated CHANGELOG.md mirrors are refreshed by the release (npm run release:sync-changelog-i18n) and the translation wave, not by feature PRs; ${STRICT_ELSEWHERE}`
      );
    }
  } else {
    // llm.txt mirrors must be exact copies (no translation)
    checkI18nMirrorFile("llm.txt", llmPath);
    // CHANGELOG.md mirrors are translations — check version sections and size, not exact content
    checkI18nChangelogFile(changelogPath);
  }

  // Anti-regression: legacy duplicate docs that have been superseded must not return.
  // Use docs/reference/* as the source of truth.
  const supersededDocs = [{ legacy: "docs/CLI-TOOLS.md", current: "docs/reference/CLI-TOOLS.md" }];
  for (const { legacy, current } of supersededDocs) {
    const legacyAbs = path.resolve(cwd, legacy);
    if (fs.existsSync(legacyAbs)) {
      fail(
        `legacy duplicate ${legacy} reappeared — use ${current} instead (single source of truth)`
      );
    }
  }
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

if (hasFailure) {
  process.exit(1);
}

console.log("[docs-sync] PASS - documentation version sync is consistent.");
