// scripts/i18n/sync-llm-mirrors.mjs exported as syncLlmMirrors() so the release refresh
// (`release:refresh-derived`) and the translation wave can call it; the CLI keeps its output.
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { syncLlmMirrors } from "../../scripts/i18n/sync-llm-mirrors.mjs";

const SCRIPT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/i18n/sync-llm-mirrors.mjs"
);
const ROOT_LLM = "# OmniRoute\n\n> A proxy.\n\n## Section\n\nnew text\n";
const HEADER = (native: string) => `# OmniRoute (${native})\n\n🌐 **Languages:** bar\n\n---`;

const roots: string[] = [];
test.after(() => {
  for (const root of roots) fs.rmSync(root, { recursive: true, force: true });
});

function write(root: string, relative: string, content: string) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

/** fr is current, pt-BR is stale, de has no llm.txt, ja has no separator. */
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "sync-llm-mirrors-"));
  roots.push(root);
  write(root, "llm.txt", ROOT_LLM);
  write(
    root,
    "docs/i18n/fr/llm.txt",
    `${HEADER("Français")}\n\n> A proxy.\n\n## Section\n\nnew text\n`
  );
  write(root, "docs/i18n/pt-BR/llm.txt", `${HEADER("Português")}\n\n> A proxy.\n\nold text\n`);
  fs.mkdirSync(path.join(root, "docs/i18n/de"), { recursive: true });
  write(root, "docs/i18n/ja/llm.txt", "# OmniRoute (日本語)\n\nno separator\n");
  return root;
}

test("syncLlmMirrors rewrites stale mirrors, keeps their header and reports relative paths", async () => {
  const root = fixture();
  const result = await syncLlmMirrors({ root });
  assert.deepEqual(result.changedFiles, ["docs/i18n/pt-BR/llm.txt"]);
  assert.equal(result.updated, 1);
  assert.equal(result.unchanged, 1);
  assert.equal(result.missing, 2);
  assert.equal(result.locales, 4);
  assert.deepEqual(
    result.skipped.map((s: { locale: string }) => s.locale),
    ["de", "ja"]
  );
  assert.equal(
    fs.readFileSync(path.join(root, "docs/i18n/pt-BR/llm.txt"), "utf8"),
    `${HEADER("Português")}\n\n> A proxy.\n\n## Section\n\nnew text\n`
  );
});

test("syncLlmMirrors is idempotent", async () => {
  const root = fixture();
  await syncLlmMirrors({ root });
  const second = await syncLlmMirrors({ root });
  assert.deepEqual(second.changedFiles, []);
  assert.equal(second.updated, 0);
  assert.equal(second.unchanged, 2);
});

test("dryRun reports the same changes without writing", async () => {
  const root = fixture();
  const before = fs.readFileSync(path.join(root, "docs/i18n/pt-BR/llm.txt"), "utf8");
  const result = await syncLlmMirrors({ root, dryRun: true });
  assert.deepEqual(result.changedFiles, ["docs/i18n/pt-BR/llm.txt"]);
  assert.equal(result.updated, 1);
  assert.equal(fs.readFileSync(path.join(root, "docs/i18n/pt-BR/llm.txt"), "utf8"), before);
});

test("the library call is silent unless a logger is passed", async () => {
  const root = fixture();
  const lines: string[] = [];
  await syncLlmMirrors({ root, log: (line: string) => lines.push(line), warn: () => {} });
  assert.ok(lines.includes("[sync-llm-mirrors] updated docs/i18n/pt-BR/llm.txt"));
  assert.ok(
    lines.includes("[sync-llm-mirrors] done — updated=1 unchanged=1 missing=2 (4 locales)")
  );
});

test("the CLI prints the same lines as before and honours --dry-run", () => {
  // The CLI works on the checkout that holds the script, so run a copy inside the fixture.
  const root = fixture();
  write(root, "scripts/i18n/sync-llm-mirrors.mjs", fs.readFileSync(SCRIPT, "utf8"));
  const cli = (args: string[]) =>
    spawnSync(process.execPath, [path.join(root, "scripts/i18n/sync-llm-mirrors.mjs"), ...args], {
      encoding: "utf8",
    });

  const dry = cli(["--dry-run"]);
  assert.equal(dry.status, 0, dry.stderr);
  assert.match(dry.stdout, /\[sync-llm-mirrors\] would update docs\/i18n\/pt-BR\/llm\.txt/);
  assert.match(dry.stdout, /done \(dry-run\) — updated=1 unchanged=1 missing=2 \(4 locales\)/);
  assert.match(fs.readFileSync(path.join(root, "docs/i18n/pt-BR/llm.txt"), "utf8"), /old text/);

  const real = cli([]);
  assert.equal(real.status, 0, real.stderr);
  assert.deepEqual(real.stdout.split("\n").filter(Boolean), [
    "[sync-llm-mirrors] updated docs/i18n/pt-BR/llm.txt",
    "[sync-llm-mirrors] done — updated=1 unchanged=1 missing=2 (4 locales)",
  ]);
  assert.deepEqual(real.stderr.split("\n").filter(Boolean), [
    "[sync-llm-mirrors] skip de: llm.txt missing",
    "[sync-llm-mirrors] skip ja: missing --- separator",
  ]);
});

test("the CLI still runs when it is invoked through a symlinked path", () => {
  // The direct-run guard compares the module URL (real path) with argv[1] (the path as invoked);
  // a symlinked checkout must not turn the CLI into a silent no-op that exits 0.
  const root = fixture();
  write(root, "scripts/i18n/sync-llm-mirrors.mjs", fs.readFileSync(SCRIPT, "utf8"));
  const link = `${root}-link`;
  fs.symlinkSync(root, link, "dir");
  roots.push(link);
  const result = spawnSync(
    process.execPath,
    [path.join(link, "scripts/i18n/sync-llm-mirrors.mjs"), "--dry-run"],
    { encoding: "utf8" }
  );
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /done \(dry-run\) — updated=1 unchanged=1 missing=2 \(4 locales\)/);
});
