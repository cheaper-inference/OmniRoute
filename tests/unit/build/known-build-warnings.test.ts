/**
 * #16320 — the production build reported the Fumadocs MDX build-dependency
 * warning for `fumadocs-mdx/dist/eval-*.js`, but the infrastructure-log filter
 * only allow-listed `dist/load-from-file-*.js`, so the warning leaked through.
 *
 * These cases pin the match to the whole `dist/` directory and guard the
 * passthrough behavior of the console wrapper.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  IGNORED_INFRASTRUCTURE_BUILD_DEPENDENCY_MODULES,
  filterKnownInfrastructureWarnings,
  isKnownInfrastructureBuildDependencyWarning,
  isNextIntlExtractorDynamicImportWarning,
} from "../../../scripts/build/knownBuildWarnings.mjs";

const ISSUE_WARNING = [
  "[webpack.cache.PackFileCacheStrategy/webpack.FileSystemInfo] Parsing of",
  "/home/temp/OmniRoute/node_modules/fumadocs-mdx/dist/eval-Cldqy98u.js",
  "for build dependencies failed at 'import(pathToFileURL(outfile).href)'.",
  "Build dependencies behind this expression are ignored and might cause incorrect cache invalidation.",
].join(" ");

test("the reported fumadocs-mdx eval-*.js warning is recognized (#16320)", () => {
  assert.equal(isKnownInfrastructureBuildDependencyWarning([ISSUE_WARNING]), true);
});

test("the load-from-file-* fumadocs-mdx bundle shape stays recognized", () => {
  const warning = ISSUE_WARNING.replace("eval-Cldqy98u.js", "load-from-file-abc123.js");
  assert.equal(isKnownInfrastructureBuildDependencyWarning([warning]), true);
});

test("Windows-style backslash paths are normalized before matching", () => {
  const warning = ISSUE_WARNING.replaceAll("/", "\\");
  assert.equal(isKnownInfrastructureBuildDependencyWarning([warning]), true);
});

test("an unrelated FileSystemInfo warning is not swallowed", () => {
  const warning = [
    "[webpack.cache.PackFileCacheStrategy/webpack.FileSystemInfo] Parsing of",
    "/repo/node_modules/some-other-lib/dist/index.js",
    "for build dependencies failed at 'import(expr)'.",
    "Build dependencies behind this expression are ignored and might cause incorrect cache invalidation.",
  ].join(" ");
  assert.equal(isKnownInfrastructureBuildDependencyWarning([warning]), false);
});

test("the fumadocs allowlist matches the dist directory, not a single bundle name", () => {
  assert.ok(
    IGNORED_INFRASTRUCTURE_BUILD_DEPENDENCY_MODULES.some((entry) =>
      entry.includes("/node_modules/fumadocs-mdx/dist/")
    )
  );
});

test("filterKnownInfrastructureWarnings drops known noise and forwards everything else", () => {
  const seen = [];
  const baseConsole = { warn: (...args) => seen.push(args) };
  const filtered = filterKnownInfrastructureWarnings(baseConsole);

  filtered.warn(ISSUE_WARNING);
  filtered.warn("a genuine warning");

  assert.deepEqual(seen, [["a genuine warning"]]);
});

test("isNextIntlExtractorDynamicImportWarning matches only the extractor resource", () => {
  const resource = "node_modules/next-intl/dist/esm/production/extractor/format/index.js";
  assert.equal(
    isNextIntlExtractorDynamicImportWarning({
      module: { resource },
      message: "the request of a dependency is an expression",
    }),
    true
  );
  assert.equal(
    isNextIntlExtractorDynamicImportWarning({
      module: { resource: "node_modules/other/index.js" },
      message: "the request of a dependency is an expression",
    }),
    false
  );
});
