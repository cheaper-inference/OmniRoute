// scripts/check/check-docs-sync.mjs in its two gate modes (plan "derived numbers and texts
// resolved only at release", 2026-11-13). Release mode keeps every check it always had. PR mode
// keeps the checks a feature PR can break in its own sources (package.json vs OpenAPI version,
// the root CHANGELOG headings, superseded docs) and skips the two translation-mirror checks
// (docs/i18n/<locale>/llm.txt copies and translated CHANGELOG sections): those mirrors are
// rewritten by the translation wave / release refresh, never by a feature PR.
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
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
      ([key]) =>
        !key.startsWith("GITHUB_") && !["OMNIROUTE_GATE_MODE", "BASE_SHA", "BASE_REF"].includes(key)
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

const TRANSLATION_FAMILY = {
  family: "translation",
  writers: ["docs/i18n-*", "chore/i18n-*"],
  categories: [{ id: "docs-i18n-mirrors", paths: ["docs/i18n/**", ".i18n-state.json"] }],
};

test("PR mode runs the mirror checks strictly on a branch that writes translation mirrors", () => {
  const root = fixture();
  staleMirrors(root);
  write(root, "config/quality/derived-paths/translation.json", JSON.stringify(TRANSLATION_FAMILY));
  const wave = run(root, [], {
    GITHUB_EVENT_NAME: "pull_request",
    GITHUB_HEAD_REF: "docs/i18n-wave-1113",
  });
  assert.equal(wave.status, 1, wave.out);
  assert.match(wave.out, /mode=pr \(auto: pull_request\)/);
  assert.match(wave.out, /head docs\/i18n-wave-1113 writes translation mirrors/);
  assert.match(wave.out, /FAIL - docs\/i18n\/fr\/llm\.txt differs from root llm\.txt/);
  assert.match(wave.out, /FAIL - docs\/i18n\/fr\/CHANGELOG\.md is missing version sections/);

  const feature = run(root, [], { GITHUB_EVENT_NAME: "pull_request", GITHUB_HEAD_REF: "feat/x" });
  assert.equal(feature.status, 0, feature.out);
  assert.match(feature.out, /SKIP reason=pr-mode/);
});

function git(root: string, ...args: string[]) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: "t",
      GIT_AUTHOR_EMAIL: "t@example.invalid",
      GIT_COMMITTER_NAME: "t",
      GIT_COMMITTER_EMAIL: "t@example.invalid",
    },
  }).trim();
}

test("PR mode judges the mirror a change itself edits, whatever the branch name", () => {
  const root = fixture();
  git(root, "init", "-q", "-b", "main");
  git(root, "add", "-A");
  git(root, "commit", "-q", "-m", "base");
  const base = git(root, "rev-parse", "HEAD");
  git(root, "switch", "-q", "-c", "feat/edits-a-mirror");
  write(root, "docs/i18n/fr/llm.txt", "# OmniRoute (Français)\n\n🌐 bar\n\n---\n\nhand edit\n");
  git(root, "commit", "-q", "-am", "edit a mirror by hand");

  const edited = run(root, ["--mode=pr"], { BASE_SHA: base });
  assert.equal(edited.status, 1, edited.out);
  assert.match(edited.out, /the change edits docs\/i18n\/<locale>\/llm\.txt/);
  assert.match(edited.out, /FAIL - docs\/i18n\/fr\/llm\.txt differs from root llm\.txt/);
  // The CHANGELOG mirrors were not touched: that check stays skipped.
  assert.match(edited.out, /SKIP reason=pr-mode — translated CHANGELOG\.md mirrors/);
});

// A shallow CI checkout (the docs-sync-strict job checks out at depth 1) cannot resolve the diff
// base, so "did the change edit a mirror?" is unanswerable there. One check needs no base: the
// llm.txt mirrors are exact copies, so a base that moved leaves them all equally stale, while a
// hand edit leaves one mirror differing from the root AND from the others.
const MIRROR_HEADER = (locale: string) => `# OmniRoute (${locale})\n\n🌐 bar\n\n---\n\n`;
const LLM_BODY = LLM.replace(/^# .+\n+/, "");

function addLocales(root: string, locales: string[], body = LLM_BODY) {
  for (const locale of locales)
    write(root, `docs/i18n/${locale}/llm.txt`, MIRROR_HEADER(locale) + body);
}

const PR_NO_BASE = { GITHUB_EVENT_NAME: "pull_request", GITHUB_HEAD_REF: "fix/fr-typo" };

test("PR mode without a diff base fails a hand-edited llm.txt mirror (it agrees with nothing)", () => {
  const root = fixture();
  addLocales(root, ["de", "es"]);
  write(
    root,
    "docs/i18n/fr/llm.txt",
    `${MIRROR_HEADER("fr")}> A proxy.\n\n## Section\n\nmauvais\n`
  );
  const { status, out } = run(root, [], PR_NO_BASE);
  assert.equal(status, 1, out);
  assert.match(out, /mode=pr \(auto: pull_request\)/);
  assert.match(
    out,
    /FAIL - docs\/i18n\/fr\/llm\.txt differs from root llm\.txt and from the other locales' mirrors/
  );
  assert.doesNotMatch(out, /FAIL - docs\/i18n\/(de|es)\//);
});

test("PR mode without a diff base passes mirrors that are all stale the same way", () => {
  const root = fixture();
  addLocales(root, ["de", "es"]);
  staleMirrors(root);
  const { status, out } = run(root, [], PR_NO_BASE);
  assert.equal(status, 0, out);
  assert.match(out, /llm\.txt mirrors agree with each other: 3 locales/);
  assert.match(out, /SKIP reason=pr-mode — docs\/i18n\/<locale>\/llm\.txt mirrors are refreshed/);
});

test("PR mode accepts a mirror already synced to the root while the others are still stale", () => {
  const root = fixture();
  addLocales(root, ["de", "es"]);
  staleMirrors(root);
  // e.g. a locale added by add-locale after the root moved: it copies the current root.
  write(
    root,
    "docs/i18n/es/llm.txt",
    MIRROR_HEADER("es") +
      fs.readFileSync(path.join(root, "llm.txt"), "utf8").replace(/^# .+\n+/, "")
  );
  const { status, out } = run(root, ["--mode=pr"]);
  assert.equal(status, 0, out);
});

test("PR mode reports the release line when every llm.txt mirror already matches the root", () => {
  const root = fixture();
  addLocales(root, ["de", "es"]);
  const { status, out } = run(root, ["--mode=pr"]);
  assert.equal(status, 0, out);
  assert.match(out, /\[docs-sync\] llm\.txt i18n mirrors match root content: 3 locales/);
  assert.doesNotMatch(out, /SKIP reason=pr-mode — docs\/i18n\/<locale>\/llm\.txt/);
});

test("PR mode still fails a missing llm.txt mirror or a mirror without its separator", () => {
  const root = fixture();
  addLocales(root, ["de"]);
  write(root, "docs/i18n/es/README.md", "x\n");
  write(root, "docs/i18n/de/llm.txt", "no separator here\n");
  const { status, out } = run(root, ["--mode=pr"]);
  assert.equal(status, 1, out);
  assert.match(out, /FAIL - docs\/i18n\/es\/llm\.txt is missing/);
  assert.match(out, /FAIL - docs\/i18n\/de\/llm\.txt is missing the i18n mirror separator/);
});

// The pre-commit hook judges what the commit does, not what the base did: a local run defaults
// to release mode, so without the flag one merged feature PR that edits llm.txt (allowed — the
// wave syncs the mirrors) would block every later commit on that base until the wave runs.
test("the pre-commit hook runs check-docs-sync in PR mode", () => {
  const hook = fs.readFileSync(
    path.resolve(path.dirname(SCRIPT), "../../.husky/pre-commit"),
    "utf8"
  );
  const lines = hook.split("\n").filter((line) => line.includes("check-docs-sync.mjs"));
  assert.deepEqual(lines, ["node scripts/check/check-docs-sync.mjs --mode=pr"]);
});
