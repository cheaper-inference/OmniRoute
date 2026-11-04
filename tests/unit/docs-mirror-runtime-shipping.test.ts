/**
 * 2026-11-03 (owner decision): npm and Docker installs serve the translated /docs pages
 * (#18699), so both ship the docs mirrors the route reads and nothing else from docs/i18n.
 *
 * One rule (scripts/build/docsMirrorRuntime.mjs) decides what that is. This file pins it to
 * source.config.ts, to the npm pack policy, and to .dockerignore, checked against the real
 * docs/i18n tree, and checks that jsdom (the sanitizer behind every translated page) is a
 * runtime dependency an npm install actually gets.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  DOCS_RUNTIME_EXCLUDED_PAGES,
  DOCS_RUNTIME_SECTIONS,
  isRuntimeDocsMirrorPath,
} from "../../scripts/build/docsMirrorRuntime.mjs";
import {
  APP_STAGING_ALLOWED_EXACT_PATHS,
  APP_STAGING_ALLOWED_PATH_MATCHERS,
  APP_STAGING_ALLOWED_PATH_PREFIXES,
  PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
  PACK_ARTIFACT_ALLOWED_PATH_MATCHERS,
  PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
  PACK_ARTIFACT_REQUIRED_PATHS,
  findUnexpectedArtifactPaths,
} from "../../scripts/build/pack-artifact-policy.ts";
import { resolveSafeI18nSectionDir } from "../../src/lib/docsI18nPath.ts";
import { isDockerIgnored, parseDockerignore } from "../helpers/dockerignore.ts";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const I18N_ROOT = path.join(REPO_ROOT, "docs", "i18n");

function readSourceConfigGlobs(): string[] {
  const src = fs.readFileSync(path.join(REPO_ROOT, "source.config.ts"), "utf8");
  const block = src.match(/files\s*:\s*\[([\s\S]*?)\]/);
  assert.ok(block, "source.config.ts must declare files: [...]");
  return [...block[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
}

function walkRepoFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkRepoFiles(full, out);
    else if (entry.isFile()) out.push(path.relative(REPO_ROOT, full).split(path.sep).join("/"));
  }
  return out;
}

const ALL_I18N_FILES = walkRepoFiles(I18N_ROOT).sort();
const RUNTIME_MIRRORS = ALL_I18N_FILES.filter(isRuntimeDocsMirrorPath);

test("the runtime sections and excluded pages are exactly what source.config.ts compiles", () => {
  const globs = readSourceConfigGlobs();
  const sections = globs
    .filter((glob) => !glob.startsWith("!"))
    .map((glob) => glob.match(/^\.\/([^/]+)\/\*\*\/\*\.md$/)?.[1]);
  assert.ok(
    sections.every(Boolean),
    `unexpected include glob shape in source.config.ts: ${globs.join(", ")}`
  );
  assert.deepEqual([...DOCS_RUNTIME_SECTIONS], sections);

  const excluded = globs
    .filter((glob) => glob.startsWith("!"))
    .map((glob) => glob.replace(/^!\.\//, ""));
  assert.deepEqual([...DOCS_RUNTIME_EXCLUDED_PAGES].sort(), excluded.sort());
});

test("isRuntimeDocsMirrorPath accepts only mirrors the docs route can serve", () => {
  for (const accepted of [
    "docs/i18n/pt-BR/docs/getting-started/QUICK-START.md",
    "docs/i18n/fa/docs/architecture/RESILIENCE_GUIDE.md",
    "docs/i18n/zh-CN/docs/security/GUARDRAILS.md",
    "docs/i18n/pt-BR/docs/guides/nested/PAGE.md",
  ]) {
    assert.equal(isRuntimeDocsMirrorPath(accepted), true, accepted);
  }

  for (const rejected of [
    // locale-root mirrors the runtime never opens
    "docs/i18n/pt-BR/README.md",
    "docs/i18n/pt-BR/CHANGELOG.md",
    "docs/i18n/pt-BR/llm.txt",
    "docs/i18n/pt-BR/AGENTS.md",
    "docs/i18n/README.md",
    // mirrors of pages outside the compiled sections
    "docs/i18n/pt-BR/docs/DEVELOPER-ENVIRONMENT.md",
    "docs/i18n/pt-BR/docs/features/X.md",
    "docs/i18n/pt-BR/docs/plans/X.md",
    "docs/i18n/pt-BR/docs/superpowers/plans/X.md",
    // operator-internal pages, never distributed
    "docs/i18n/pt-BR/docs/security/PUBLIC_CREDS.md",
    "docs/i18n/pt-BR/docs/security/STEALTH_GUIDE.md",
    "docs/i18n/pt-BR/docs/security/SOCKET_DEV_FINDINGS.md",
    "docs/i18n/pt-BR/docs/security/MITM-TPROXY-DECRYPT.md",
    // not markdown, or not a mirror at all
    "docs/i18n/pt-BR/docs/guides/screenshot.png",
    "docs/i18n/pt-BR/docs/guides/meta.json",
    "docs/guides/SETUP_GUIDE.md",
    "dist/docs/i18n/pt-BR/docs/guides/SETUP_GUIDE.md",
    // segments the route's guard would refuse
    "docs/i18n/../docs/guides/X.md",
    "docs/i18n/pt-BR/docs/guides/../X.md",
    "docs/i18n/pt_BR/docs/guides/X.md",
    "docs/i18n/pt-BR/docs/guides/.md",
    "docs/i18n/pt-BR/docs/guides/a b.md",
  ]) {
    assert.equal(isRuntimeDocsMirrorPath(rejected), false, rejected);
  }
});

test("every shipped mirror is a file the route's path guard resolves to", () => {
  assert.ok(RUNTIME_MIRRORS.length > 0, "the checkout must contain docs mirrors");
  for (const mirror of RUNTIME_MIRRORS) {
    const [, , locale, , ...rest] = mirror.split("/");
    const slug = rest.map((segment) => segment.replace(/\.md$/, ""));
    const sectionDir = resolveSafeI18nSectionDir(path.join(REPO_ROOT, "docs"), locale, slug);
    assert.ok(sectionDir, `${mirror}: the route's guard rejects it, so it would ship for nothing`);
    assert.equal(
      path.join(sectionDir, rest[rest.length - 1]),
      path.join(REPO_ROOT, mirror),
      mirror
    );
  }
});

test("the npm pack policy allows the runtime mirrors under dist/ and nothing else in docs/i18n", () => {
  const stagedI18n = ALL_I18N_FILES;
  const unexpectedStaged = findUnexpectedArtifactPaths(stagedI18n, {
    exactPaths: APP_STAGING_ALLOWED_EXACT_PATHS,
    prefixPaths: APP_STAGING_ALLOWED_PATH_PREFIXES,
    pathMatchers: APP_STAGING_ALLOWED_PATH_MATCHERS,
    neverAllowedSegments: [],
  });
  assert.deepEqual(
    stagedI18n.filter((file) => !unexpectedStaged.includes(file)),
    RUNTIME_MIRRORS,
    "prepublish's staging prune must keep exactly the runtime mirrors"
  );

  const packed = ALL_I18N_FILES.map((file) => `dist/${file}`);
  const unexpectedPacked = findUnexpectedArtifactPaths(packed, {
    exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
    prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
    pathMatchers: PACK_ARTIFACT_ALLOWED_PATH_MATCHERS,
  });
  assert.deepEqual(
    packed.filter((file) => !unexpectedPacked.includes(file)),
    RUNTIME_MIRRORS.map((file) => `dist/${file}`)
  );

  // The tarball root never carries mirrors: only dist/ does.
  assert.deepEqual(
    findUnexpectedArtifactPaths(["docs/i18n/pt-BR/docs/getting-started/QUICK-START.md"], {
      exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
      prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
      pathMatchers: PACK_ARTIFACT_ALLOWED_PATH_MATCHERS,
    }),
    ["docs/i18n/pt-BR/docs/getting-started/QUICK-START.md"]
  );
});

test("the pack gate fails when the mirrors vanish from the tarball", () => {
  const sample = "dist/docs/i18n/pt-BR/docs/getting-started/QUICK-START.md";
  assert.ok(PACK_ARTIFACT_REQUIRED_PATHS.includes(sample));
  assert.ok(RUNTIME_MIRRORS.includes(sample.slice("dist/".length)));
});

test("the .dockerignore helper follows Docker's last-match-wins and parent-directory rules", () => {
  const rules = parseDockerignore(
    ["docs/i18n/**", "!docs/i18n/*/docs/guides/**/*.md", "docs/i18n/*/docs/guides/SECRET.md"].join(
      "\n"
    )
  );
  assert.equal(isDockerIgnored("docs/i18n/pt-BR/README.md", rules), true);
  assert.equal(isDockerIgnored("docs/i18n/pt-BR/docs/guides/A.md", rules), false);
  assert.equal(isDockerIgnored("docs/i18n/pt-BR/docs/guides/SECRET.md", rules), true);
  assert.equal(isDockerIgnored("docs/i18n/pt-BR/docs/guides/a.png", rules), true);
  // A rule that names a directory excludes everything beneath it.
  assert.equal(isDockerIgnored("electron/main.js", parseDockerignore("electron")), true);
});

test(".dockerignore sends exactly the runtime mirrors into the build context", () => {
  const rules = parseDockerignore(fs.readFileSync(path.join(REPO_ROOT, ".dockerignore"), "utf8"));
  const inContext = ALL_I18N_FILES.filter((file) => !isDockerIgnored(file, rules));
  assert.deepEqual(inContext, RUNTIME_MIRRORS);

  for (const page of DOCS_RUNTIME_EXCLUDED_PAGES) {
    const mirror = `docs/i18n/pt-BR/docs/${page}`;
    assert.equal(isDockerIgnored(mirror, rules), true, `${mirror} must stay out of the image`);
    assert.equal(isDockerIgnored(`docs/${page}`, rules), true, `docs/${page} must stay out`);
  }
});

test("jsdom, which renders every translated page, is a runtime dependency", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "package.json"), "utf8"));
  // npm never packs node_modules (files[] has "!**/node_modules/**"), so an npm install only
  // gets what `dependencies` declares; a devDependency would leave docsSanitizer's import
  // unresolvable and every translated page would fall back to English.
  assert.ok(pkg.dependencies?.jsdom, "jsdom must be in dependencies");
  assert.equal(pkg.devDependencies?.jsdom, undefined, "jsdom must not also be a devDependency");
  const sanitizer = fs.readFileSync(path.join(REPO_ROOT, "src/lib/docsSanitizer.ts"), "utf8");
  assert.match(sanitizer, /from "jsdom"/);
});
