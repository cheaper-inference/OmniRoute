/**
 * sync-ui-keys as the release refresh step (plan "derived numbers and texts resolved only at
 * release", 2026-11-13): feature PRs touch en.json only, so the non-English catalogs are completed
 * once per release by `release:refresh-derived` through the programmatic `syncUiKeys()`.
 *
 * Covers the two options the refresh needs — dropping keys en.json no longer has (`pruneExtra`)
 * and re-queuing translations of rewritten English (`rewrittenSinceRef`) — through the API and the
 * CLI (`--prune-extra` / `--keep-extra`, `--rewritten-since=<ref>`). No translation backend: the
 * translate path runs through the injected `translateFns` seam.
 */

import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  markRewrittenAsMissing,
  mergeMissing,
  parseArgs,
  syncUiKeys,
} from "../../scripts/i18n/sync-ui-keys.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const quiet = () => {};

function git(dir: string, ...args: string[]) {
  return execFileSync("git", args, {
    cwd: dir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function writeJson(dir: string, rel: string, value: unknown) {
  const file = path.join(dir, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n");
}

function readJson(dir: string, rel: string) {
  return JSON.parse(fs.readFileSync(path.join(dir, rel), "utf8"));
}

function makeRoot(locales = ["pt-BR", "es"]) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sync-ui-keys-refresh-"));
  writeJson(dir, "config/i18n.json", {
    default: "en",
    locales: [{ code: "en" }, ...locales.map((code) => ({ code }))],
  });
  return dir;
}

function initGit(dir: string) {
  git(dir, "init", "-q", "-b", "main");
  git(dir, "config", "user.email", "test@example.invalid");
  git(dir, "config", "user.name", "test");
  git(dir, "config", "commit.gpgsign", "false");
  git(dir, "add", "-A");
  git(dir, "commit", "-q", "-m", "base");
}

test("mergeMissing reports the leaves the source dropped and prunes them by default", () => {
  const source = { a: "A", nested: { keep: "Keep" } };
  const target = { a: "x", gone: "old", nested: { keep: "k", stale: { deep: "d" } } };

  const pruned = mergeMissing(source, target);
  assert.deepEqual(JSON.parse(JSON.stringify(pruned.merged)), { a: "x", nested: { keep: "k" } });
  assert.deepEqual(pruned.extraPaths.sort(), ["gone", "nested.stale.deep"]);
  assert.deepEqual(pruned.addedPaths, []);

  const kept = mergeMissing(source, target, { pruneExtra: false });
  assert.deepEqual(JSON.parse(JSON.stringify(kept.merged)), {
    a: "x",
    gone: "old",
    nested: { keep: "k", stale: { deep: "d" } },
  });
  assert.deepEqual(kept.extraPaths.sort(), ["gone", "nested.stale.deep"]);
});

test("mergeMissing never carries a forbidden key over from the target, even when keeping extras", () => {
  const target = JSON.parse('{"a":"x","__proto__":{"polluted":"yes"},"constructor":"c"}');
  const { merged, extraPaths } = mergeMissing({ a: "A" }, target, { pruneExtra: false });
  assert.deepEqual(JSON.parse(JSON.stringify(merged)), { a: "x" });
  assert.deepEqual(extraPaths, []);
  assert.equal(({} as Record<string, unknown>).polluted, undefined);
});

test("markRewrittenAsMissing marks only real translations with the current English", () => {
  const merged = {
    a: "Velho",
    b: "__MISSING__:Already pending",
    nested: { c: "Antigo" },
    n: 3,
  };
  const marked = markRewrittenAsMissing(merged, ["nested.c", "a", "b", "absent", "n"], {
    a: "New A",
    b: "New B",
    "nested.c": "New C",
    n: "3",
  });
  assert.deepEqual(marked, ["a", "nested.c"]);
  assert.deepEqual(merged, {
    a: "__MISSING__:New A",
    b: "__MISSING__:Already pending",
    nested: { c: "__MISSING__:New C" },
    n: 3,
  });
  assert.deepEqual(markRewrittenAsMissing(merged, undefined, {}), []);
});

test("syncUiKeys adds, prunes and reports repo-relative paths; dryRun writes nothing", async () => {
  const dir = makeRoot();
  try {
    writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save", panel: "Panel" } });
    writeJson(dir, "src/i18n/messages/pt-BR.json", { common: { save: "Salvar", gone: "Antigo" } });
    writeJson(dir, "src/i18n/messages/es.json", { common: { save: "Guardar", panel: "Panel ES" } });
    const before = fs.readFileSync(path.join(dir, "src/i18n/messages/pt-BR.json"), "utf8");

    const dry = await syncUiKeys({ root: dir, pruneExtra: true, dryRun: true, log: quiet });
    assert.equal(dry.dryRun, true);
    assert.deepEqual(dry.changedFiles, ["src/i18n/messages/pt-BR.json"]);
    assert.equal(dry.added, 1);
    assert.equal(dry.pruned, 1);
    assert.equal(fs.readFileSync(path.join(dir, "src/i18n/messages/pt-BR.json"), "utf8"), before);

    const real = await syncUiKeys({ root: dir, pruneExtra: true, log: quiet });
    assert.deepEqual(real.changedFiles, ["src/i18n/messages/pt-BR.json"]);
    const pt = real.locales.find((r) => r.locale === "pt-BR");
    assert.deepEqual(pt?.added, ["common.panel"]);
    assert.deepEqual(pt?.pruned, ["common.gone"]);
    assert.equal(pt?.placeholders, 1);
    assert.deepEqual(readJson(dir, "src/i18n/messages/pt-BR.json"), {
      common: { save: "Salvar", panel: "__MISSING__:Panel" },
    });
    assert.equal(real.locales.find((r) => r.locale === "es")?.changed, false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("syncUiKeys keeps the keys en.json dropped unless pruneExtra is set", async () => {
  const dir = makeRoot(["pt-BR"]);
  try {
    writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save" } });
    writeJson(dir, "src/i18n/messages/pt-BR.json", { common: { save: "Salvar", gone: "Antigo" } });
    const res = await syncUiKeys({ root: dir, log: quiet });
    assert.equal(res.pruned, 0);
    assert.deepEqual(res.changedFiles, []);
    assert.deepEqual(readJson(dir, "src/i18n/messages/pt-BR.json").common.gone, "Antigo");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("syncUiKeys marks translations of English rewritten since a ref and translates them", async () => {
  const dir = makeRoot(["pt-BR", "es"]);
  try {
    writeJson(dir, "src/i18n/messages/en.json", {
      common: { save: "Save", reset: "Reset Defaults" },
    });
    writeJson(dir, "src/i18n/messages/pt-BR.json", {
      common: { save: "Salvar", reset: "Redefinir padrões" },
    });
    writeJson(dir, "src/i18n/messages/es.json", {
      common: { save: "Guardar", reset: "Restablecer" },
    });
    initGit(dir);
    git(dir, "checkout", "-q", "-b", "release/v9.9.9");
    // A real rewrite, plus a cosmetic one (case only) that must not invalidate translations.
    writeJson(dir, "src/i18n/messages/en.json", {
      common: { save: "Save all changes", reset: "Reset defaults" },
    });
    // es already refreshed its translation in the cycle: not stale.
    writeJson(dir, "src/i18n/messages/es.json", {
      common: { save: "Guardar todo", reset: "Restablecer" },
    });
    git(dir, "commit", "-q", "-am", "feat: reword");

    const requests: string[][] = [];
    const res = await syncUiKeys({
      root: dir,
      rewrittenSinceRef: "main",
      translate: true,
      log: quiet,
      translateFns: {
        translateBatch: async (
          entries: Array<{ id: string; text: string }>,
          locale: { code: string }
        ) => {
          requests.push([locale.code, ...entries.map((e) => e.text)]);
          return new Map(entries.map((e) => [e.id, `[${locale.code}] ${e.text}`]));
        },
      },
    });
    assert.equal(res.markedRewritten, 1);
    assert.equal(res.translated, 1);
    assert.deepEqual(requests, [["pt-BR", "Save all changes"]]);
    assert.deepEqual(res.locales.find((r) => r.locale === "pt-BR")?.markedRewritten, [
      "common.save",
    ]);
    assert.deepEqual(readJson(dir, "src/i18n/messages/pt-BR.json"), {
      common: { save: "[pt-BR] Save all changes", reset: "Redefinir padrões" },
    });
    assert.deepEqual(res.changedFiles, ["src/i18n/messages/pt-BR.json"]);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("syncUiKeys covers the CLI catalogs and a locale subset", async () => {
  const dir = makeRoot(["pt-BR", "es"]);
  try {
    writeJson(dir, "bin/cli/locales/en.json", { common: { ok: "OK", added: "Added" } });
    writeJson(dir, "bin/cli/locales/pt-BR.json", { common: { ok: "OK" } });
    writeJson(dir, "bin/cli/locales/es.json", { common: { ok: "OK" } });
    const res = await syncUiKeys({ root: dir, catalog: "cli", locales: ["es"], log: quiet });
    assert.equal(res.catalog, "cli");
    assert.deepEqual(res.changedFiles, ["bin/cli/locales/es.json"]);
    assert.deepEqual(readJson(dir, "bin/cli/locales/pt-BR.json"), { common: { ok: "OK" } });
    await assert.rejects(syncUiKeys({ root: dir, catalog: "web", log: quiet }), /unknown catalog/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("syncUiKeys rejects a locale it would not process instead of reporting nothing to do", async () => {
  const dir = makeRoot(["pt-BR", "es"]);
  try {
    writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save", panel: "Panel" } });
    writeJson(dir, "src/i18n/messages/pt-BR.json", { common: { save: "Salvar" } });
    const before = fs.readFileSync(path.join(dir, "src/i18n/messages/pt-BR.json"), "utf8");
    // `pt-br` (typo), `xx` (not in config/i18n.json), `es` (in config, no catalog), `en` (source).
    for (const code of ["pt-br", "xx", "es", "en"]) {
      await assert.rejects(
        syncUiKeys({ root: dir, locales: ["pt-BR", code], log: quiet }),
        new RegExp(`unknown locale\\(s\\) for the ui catalog: ${code}\\b`),
        code
      );
    }
    assert.equal(
      fs.readFileSync(path.join(dir, "src/i18n/messages/pt-BR.json"), "utf8"),
      before,
      "nothing is written when the locale list is rejected"
    );
    const ok = await syncUiKeys({ root: dir, locales: ["pt-BR"], log: quiet });
    assert.deepEqual(ok.changedFiles, ["src/i18n/messages/pt-BR.json"]);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a dashboard refresh that changed a catalog regenerates the compact global-error catalogs", async () => {
  const dir = makeRoot(["pt-BR"]);
  try {
    const en = { publicSystem: { globalError: { title: "Error", retry: "Retry" } } };
    writeJson(dir, "src/i18n/messages/en.json", en);
    writeJson(dir, "src/i18n/messages/pt-BR.json", {
      publicSystem: { globalError: { title: "Erro" } },
    });
    writeJson(dir, "src/i18n/global-error-messages/en.json", en);
    writeJson(dir, "src/i18n/global-error-messages/pt-BR.json", {
      publicSystem: { globalError: { title: "Erro" } },
    });
    const compactBefore = fs.readFileSync(
      path.join(dir, "src/i18n/global-error-messages/pt-BR.json"),
      "utf8"
    );
    // A dry run lists the compact catalogs a real run writes, and writes none of them.
    const dry = await syncUiKeys({ root: dir, dryRun: true, log: quiet });
    assert.deepEqual(dry.changedFiles, [
      "src/i18n/messages/pt-BR.json",
      "src/i18n/global-error-messages/pt-BR.json",
    ]);
    assert.equal(
      fs.readFileSync(path.join(dir, "src/i18n/global-error-messages/pt-BR.json"), "utf8"),
      compactBefore
    );
    const res = await syncUiKeys({ root: dir, log: quiet });
    assert.deepEqual(res.changedFiles, dry.changedFiles);
    assert.deepEqual(readJson(dir, "src/i18n/global-error-messages/pt-BR.json"), {
      publicSystem: { globalError: { title: "Erro", retry: "__MISSING__:Retry" } },
    });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("CLI flags: pruning stays the default, --keep-extra opts out, --rewritten-since marks", () => {
  assert.equal(parseArgs(["node", "s"]).pruneExtra, true);
  assert.equal(parseArgs(["node", "s", "--prune-extra"]).pruneExtra, true);
  assert.equal(parseArgs(["node", "s", "--keep-extra"]).pruneExtra, false);
  assert.equal(parseArgs(["node", "s"]).rewrittenSince, null);
  assert.equal(
    parseArgs(["node", "s", "--rewritten-since=origin/main"]).rewrittenSince,
    "origin/main"
  );

  const dir = makeRoot(["pt-BR"]);
  try {
    for (const rel of [
      "scripts/i18n/sync-ui-keys.mjs",
      "scripts/i18n/check-ui-value-drift.mjs",
      "scripts/i18n/generate-global-error-messages.mjs",
      "scripts/i18n/lib/translate-backend.mjs",
      "scripts/i18n/lib/google-translate.mjs",
      "scripts/i18n/lib/release-mode.mjs",
      "scripts/check/lib/gateMode.mjs",
    ]) {
      fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
      fs.copyFileSync(path.join(REPO, rel), path.join(dir, rel));
    }
    writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save" } });
    writeJson(dir, "src/i18n/messages/pt-BR.json", { common: { save: "Salvar", gone: "Antigo" } });
    initGit(dir);
    writeJson(dir, "src/i18n/messages/en.json", { common: { save: "Save everything" } });

    const cli = (...args: string[]) => {
      const res = spawnSync(process.execPath, ["scripts/i18n/sync-ui-keys.mjs", ...args], {
        cwd: dir,
        encoding: "utf8",
        env: { PATH: process.env.PATH ?? "", HOME: dir },
      });
      assert.equal(res.status, 0, `${res.stdout}${res.stderr}`);
      return res.stdout;
    };

    const kept = cli("--keep-extra");
    assert.match(kept, /pt-BR: 1 keys en\.json no longer has kept \(--keep-extra\)/);
    assert.equal(readJson(dir, "src/i18n/messages/pt-BR.json").common.gone, "Antigo");

    const out = cli("--rewritten-since=main");
    assert.match(
      out,
      /rewritten-since: main \(base [0-9a-f]{12}\) — 1 stale translation\(s\) in 1 locale/
    );
    assert.deepEqual(readJson(dir, "src/i18n/messages/pt-BR.json"), {
      common: { save: "__MISSING__:Save everything" },
    });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
