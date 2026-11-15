// mutation-test-files — the single rule that decides which unit tests Stryker runs.
//
// WHY: `tap.testFiles` used to be a hand-maintained list of ~780 paths in
// stryker.conf.json. Every PR that added a test covering a mutated module had to
// append to it (46 open PRs touched it on 2026-11-13), and a forgotten entry made the
// test's mutant kills stop counting (see check-mutation-test-coverage.mjs). The list
// is now COMPUTED when the Stryker config loads, from this module, and the drift gate
// checks the resolved config with the same rule — one copy of the rule, two users.
//
// RULE: a unit test (tests/unit/**, `*.test.ts`, outside tests/unit/build/) is a
// covering test of a mutated module when it imports that module — static
// `from "…"`, dynamic `import("…")` or `require("…")` — by any path ending in the
// module's 3-segment suffix (relative or `@omniroute/open-sse/…` alias alike).

import fs from "node:fs";
import path from "node:path";

/** 3-segment path suffix without extension (unique enough; matches relative + alias imports). */
export function moduleFragment(modulePath) {
  return modulePath.replace(/\.ts$/, "").split("/").slice(-3).join("/");
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function importPattern(fragment) {
  return new RegExp(
    "(?:from\\s+|\\bimport\\s*\\(\\s*|\\brequire\\s*\\(\\s*)[\"'][^\"']*" + escapeRegExp(fragment)
  );
}

/**
 * True if `content` imports the module identified by `fragment`, in any form:
 * static `... from "…fragment…"`, dynamic `import("…fragment…")` (incl. split
 * across lines), or `require("…fragment…")`. The fragment must appear INSIDE the
 * import string literal — a bare mention in a comment does not match.
 */
export function testImportsModule(content, fragment) {
  // Cheap substring pre-check: the pattern can only match when the fragment is present.
  return content.includes(fragment) && importPattern(fragment).test(content);
}

/** `mutate` entries that name a real module (skips `_comment`-style and range/glob entries). */
export function mutatedModules(mutate) {
  return (mutate || []).filter(
    (m) => typeof m === "string" && !m.startsWith("_") && m.endsWith(".ts")
  );
}

/**
 * Whether a repo-relative POSIX path is a unit test the rule considers. tests/unit/build/
 * is excluded: those tests exercise the build TOOLING (scripts/), not the mutated runtime
 * modules, and legitimately embed module paths as fixture strings that would false-match.
 */
export function isUnitTestCandidate(relPath) {
  return (
    relPath.startsWith("tests/unit/") &&
    relPath.endsWith(".test.ts") &&
    !relPath.startsWith("tests/unit/build/")
  );
}

/**
 * Walk `<repoRoot>/tests/unit` and return every candidate unit test as
 * `{ path, content }`, with repo-relative POSIX paths, sorted.
 */
export function listUnitTestFiles(repoRoot) {
  const base = path.join(repoRoot, "tests", "unit");
  if (!fs.existsSync(base)) return [];
  return fs
    .readdirSync(base, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) =>
      path.relative(repoRoot, path.join(entry.parentPath, entry.name)).split(path.sep).join("/")
    )
    .filter(isUnitTestCandidate)
    .sort()
    .map((rel) => ({ path: rel, content: fs.readFileSync(path.join(repoRoot, rel), "utf8") }));
}

/**
 * @param {{ mutate: string[], unitTests: {path: string, content: string}[] }} input
 * @returns {string[]} sorted paths of the unit tests that import at least one mutated module
 */
export function selectCoveringTests({ mutate, unitTests }) {
  const patterns = mutatedModules(mutate).map((m) => {
    const fragment = moduleFragment(m);
    return { fragment, re: importPattern(fragment) };
  });
  return unitTests
    .filter((t) => isUnitTestCandidate(t.path))
    .filter((t) =>
      patterns.some(({ fragment, re }) => t.content.includes(fragment) && re.test(t.content))
    )
    .map((t) => t.path)
    .sort();
}

/**
 * The resolved `tap.testFiles` for a Stryker config: every covering unit test under
 * `repoRoot` plus the explicitly `pinned` extras, deduplicated and sorted.
 *
 * @param {{ repoRoot: string, mutate: string[], pinned?: string[] }} input
 * @returns {string[]}
 */
export function computeMutationTestFiles({ repoRoot, mutate, pinned = [] }) {
  const covering = selectCoveringTests({ mutate, unitTests: listUnitTestFiles(repoRoot) });
  return [...new Set([...covering, ...pinned])].sort();
}
