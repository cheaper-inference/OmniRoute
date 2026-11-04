/**
 * Issue #2348 — Regression guard for the Docker image documentation bundle.
 *
 * The Dashboard Docs viewer at `src/app/docs/[slug]/page.tsx` reads markdown
 * from `process.cwd()/docs/<file>` at runtime. The previous `.dockerignore`
 * shipped only `docs/openapi.yaml` to the container, so every help screen
 * threw ENOENT.
 *
 * This test parses `.dockerignore` with Docker's rule semantics
 * (tests/helpers/dockerignore.ts), applies it against the working tree,
 * and asserts that the critical English markdown files are still in the
 * Docker build context.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { isDockerIgnored, parseDockerignore } from "../helpers/dockerignore.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const DOCKERIGNORE = path.resolve(REPO_ROOT, ".dockerignore");

// Subset of the docs viewer's catalog that MUST survive the docker filter.
// Sourced from src/app/docs/lib/docs-auto-generated.ts.
const REQUIRED_DOCS = [
  "docs/README.md",
  "docs/providers/CLAUDE_WEB.md",
  "docs/routing/AUTO-COMBO.md",
  "docs/guides/SETUP_GUIDE.md",
  "docs/guides/TROUBLESHOOTING.md",
  "docs/reference/API_REFERENCE.md",
  "docs/reference/PROVIDER_REFERENCE.md",
  "docs/reference/ENVIRONMENT.md",
];

// Referenced from docs/**/*.md — fumadocs-mdx webpack build fails if missing.
const REQUIRED_DOC_DIAGRAMS = [
  "docs/diagrams/exported/request-pipeline.svg",
  "docs/diagrams/exported/resilience-3layers.svg",
  "docs/diagrams/exported/authz-pipeline.svg",
  "docs/diagrams/exported/db-schema-overview.svg",
];

const REQUIRED_DOC_SCREENSHOTS = [
  "docs/screenshots/01-providers.png",
  "docs/screenshots/05-translator.png",
];

test("#2348 .dockerignore keeps every doc the in-product viewer needs", () => {
  const parsed = parseDockerignore(fs.readFileSync(DOCKERIGNORE, "utf8"));
  const missing: string[] = [];
  const ignored: string[] = [];

  for (const docPath of [...REQUIRED_DOCS, ...REQUIRED_DOC_DIAGRAMS, ...REQUIRED_DOC_SCREENSHOTS]) {
    const absPath = path.resolve(REPO_ROOT, docPath);
    if (!fs.existsSync(absPath)) {
      missing.push(docPath);
      continue;
    }
    if (isDockerIgnored(docPath, parsed)) {
      ignored.push(docPath);
    }
  }

  assert.deepEqual(missing, [], `Required docs missing from repo: ${missing.join(", ")}`);
  assert.deepEqual(
    ignored,
    [],
    `Files excluded from Docker context — Dashboard Docs viewer will 404 on these:\n  ${ignored.join("\n  ")}`
  );
});

test("#2348 .dockerignore still excludes the i18n files the runtime never reads", () => {
  // 2026-11-03: the translated /docs pages ship in the image (see
  // docs-mirror-runtime-shipping.test.ts for the full-tree check). The locale-root mirrors are
  // most of docs/i18n by size and must stay out.
  const parsed = parseDockerignore(fs.readFileSync(DOCKERIGNORE, "utf8"));
  for (const heavy of [
    "docs/i18n/pt-BR/CHANGELOG.md",
    "docs/i18n/pt-BR/README.md",
    "docs/i18n/pt-BR/AGENTS.md",
    "docs/i18n/pt-BR/llm.txt",
    "docs/i18n/pt-BR/docs/plans/X.md",
  ]) {
    assert.ok(
      isDockerIgnored(heavy, parsed),
      `${heavy} should be excluded from Docker context but is not — image size will balloon`
    );
  }
  assert.equal(
    isDockerIgnored("docs/i18n/pt-BR/docs/routing/AUTO-COMBO.md", parsed),
    false,
    "the translated page mirrors the docs route reads must reach the image"
  );
});
