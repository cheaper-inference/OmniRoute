// scripts/check/check-docs-sync.mjs in its two gate modes (plan "derived numbers and texts
// resolved only at release", 2026-11-13). Release mode keeps every check it always had. PR mode
// keeps the checks a feature PR can break in its own sources (package.json vs OpenAPI version,
// the root CHANGELOG headings, superseded docs) and skips the two translation-mirror checks
// (docs/i18n/<locale>/llm.txt copies and translated CHANGELOG sections): those mirrors are
// rewritten by the translation wave / release refresh, never by a feature PR.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const SCRIPT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/check/check-docs-sync.mjs"
);

const roots: string[] = [];
test.after(() => {
  for (const root of roots) fs.rmSync(root, { recursive: true, force: true });
});

const CHANGELOG = [
  "# Changelog",
  "",
  "## [Unreleased]",
  "",
  "- pending",
  "",
  "## [1.2.3] — 2026-11-01",
  "",
  "- shipped",
  "",
].join("\n");
const LLM = "# OmniRoute\n\n> A proxy.\n\n## Section\n\ntext\n";

function write(root: string, relative: string, content: string) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

/** A consistent checkout: version 1.2.3 everywhere, one locale with exact mirrors. */
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "docs-sync-mode-"));
  roots.push(root);
  write(root, "package.json", JSON.stringify({ name: "x", version: "1.2.3" }));
  write(root, "docs/openapi.yaml", 'openapi: 3.1.0\ninfo:\n  title: x\n  version: "1.2.3"\n');
  write(root, "CHANGELOG.md", CHANGELOG);
  write(root, "llm.txt", LLM);
  write(
    root,
    "docs/i18n/fr/llm.txt",
    "# OmniRoute (Français)\n\n🌐 bar\n\n---\n\n> A proxy.\n\n## Section\n\ntext\n"
  );
  write(
    root,
    "docs/i18n/fr/CHANGELOG.md",
    `# Journal (Français)\n\n🌐 bar\n\n---\n\n${CHANGELOG.replace("# Changelog\n\n", "")}`
  );
  return root;
}

/** The base moved on: root llm.txt and CHANGELOG gained content the mirrors do not have yet. */
function staleMirrors(root: string) {
  write(root, "llm.txt", `${LLM}\n## New section\n\nnew text\n`);
  write(root, "CHANGELOG.md", `${CHANGELOG}\n## [1.2.2] — 2026-10-30\n\n- older\n`);
}

function run(root: string, args: string[], env: Record<string, string> = {}) {
  const clean = Object.fromEntries(
    Object.entries(process.env).filter(
      ([key]) => !key.startsWith("GITHUB_") && key !== "OMNIROUTE_GATE_MODE"
    )
  );
  const result = spawnSync(process.execPath, [SCRIPT, ...args], {
    cwd: root,
    env: { ...clean, ...env },
    encoding: "utf8",
  });
  const lines = `${result.stdout}${result.stderr}`.split("\n").filter(Boolean);
  return { status: result.status, lines, out: lines.join("\n") };
}

test("release mode on a consistent tree prints the same lines as before, plus the mode", () => {
  const { status, lines } = run(fixture(), ["--mode=release"]);
  assert.equal(status, 0);
  assert.deepEqual(lines, [
    "[docs-sync] mode=release (flag: --mode=release)",
    "[docs-sync] package.json version: 1.2.3",
    "[docs-sync] openapi.yaml info.version matches: 1.2.3",
    "[docs-sync] changelog has top Unreleased section",
    "[docs-sync] latest changelog release matches package version: 1.2.3",
    "[docs-sync] llm.txt i18n mirrors match root content: 1 locales",
    "[docs-sync] CHANGELOG.md i18n translations validated: 1 locales (version sections + size check)",
    "[docs-sync] PASS - documentation version sync is consistent.",
  ]);
});

test("release mode fails on stale llm.txt and CHANGELOG mirrors, as it always did", () => {
  const root = fixture();
  staleMirrors(root);
  const { status, out } = run(root, ["--mode=release"]);
  assert.equal(status, 1);
  assert.match(out, /FAIL - docs\/i18n\/fr\/llm\.txt differs from root llm\.txt/);
  assert.match(out, /FAIL - docs\/i18n\/fr\/CHANGELOG\.md is missing version sections: 1\.2\.2/);
  assert.doesNotMatch(out, /SKIP/);
});

test("a local run without a mode is release mode (strict by default)", () => {
  const root = fixture();
  staleMirrors(root);
  const { status, out } = run(root, []);
  assert.equal(status, 1);
  assert.match(out, /mode=release \(auto: local run\)/);
  assert.match(out, /llm\.txt differs from root/);
});

test("PR mode skips only the two mirror checks, with the reason, and passes", () => {
  const root = fixture();
  staleMirrors(root);
  const { status, out } = run(root, ["--mode=pr"]);
  assert.equal(status, 0, out);
  assert.match(out, /mode=pr \(flag: --mode=pr\)/);
  assert.match(
    out,
    /SKIP reason=pr-mode — docs\/i18n\/<locale>\/llm\.txt mirrors are refreshed by the translation wave.*strict check runs in release mode/
  );
  assert.match(
    out,
    /SKIP reason=pr-mode — translated CHANGELOG\.md mirrors are refreshed by the release.*strict check runs in release mode/
  );
  assert.match(out, /package\.json version: 1\.2\.3/);
  assert.match(out, /openapi\.yaml info\.version matches/);
  assert.match(out, /PASS - documentation version sync is consistent\./);
  assert.doesNotMatch(out, /FAIL/);
});

test("a pull_request event selects PR mode without a flag", () => {
  const root = fixture();
  staleMirrors(root);
  const { status, out } = run(root, [], {
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_HEAD_REF: "feat/x",
  });
  assert.equal(status, 0, out);
  assert.match(out, /mode=pr \(auto: pull_request\)/);
});

test("the release PR (release/v* head) stays in release mode", () => {
  const root = fixture();
  staleMirrors(root);
  const { status } = run(root, [], {
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_HEAD_REF: "release/v1.2.3",
  });
  assert.equal(status, 1);
});

test("PR mode still fails when the OpenAPI version differs from package.json", () => {
  const root = fixture();
  write(root, "docs/openapi.yaml", 'openapi: 3.1.0\ninfo:\n  title: x\n  version: "1.2.2"\n');
  const { status, out } = run(root, ["--mode=pr"]);
  assert.equal(status, 1);
  assert.match(out, /FAIL - OpenAPI version \(1\.2\.2\) differs from package\.json \(1\.2\.3\)/);
});

test("PR mode still fails when the root CHANGELOG loses its top Unreleased section", () => {
  const root = fixture();
  write(root, "CHANGELOG.md", CHANGELOG.replace("## [Unreleased]\n\n- pending\n\n", ""));
  const { status, out } = run(root, ["--mode=pr"]);
  assert.equal(status, 1);
  assert.match(out, /FAIL - CHANGELOG\.md first section must be "## \[Unreleased\]"/);
});

test("PR mode still fails when the latest CHANGELOG release differs from package.json", () => {
  const root = fixture();
  write(root, "package.json", JSON.stringify({ name: "x", version: "1.2.4" }));
  write(root, "docs/openapi.yaml", 'openapi: 3.1.0\ninfo:\n  title: x\n  version: "1.2.4"\n');
  const { status, out } = run(root, ["--mode=pr"]);
  assert.equal(status, 1);
  assert.match(out, /Latest changelog release \(1\.2\.3\) differs from package\.json \(1\.2\.4\)/);
});

test("PR mode still fails when a superseded legacy doc reappears", () => {
  const root = fixture();
  write(root, "docs/CLI-TOOLS.md", "# old\n");
  const { status, out } = run(root, ["--mode=pr"]);
  assert.equal(status, 1);
  assert.match(out, /legacy duplicate docs\/CLI-TOOLS\.md reappeared/);
});

test("an invalid --mode value fails closed", () => {
  const { status, out } = run(fixture(), ["--mode=lenient"]);
  assert.equal(status, 1);
  assert.match(out, /invalid gate mode "lenient"/);
});
