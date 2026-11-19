/**
 * npm installs ship no translated docs mirrors since 2026-11-17 (the 3.8.54 tarball hit the
 * registry's 413 limit). The /docs route must then serve the English page: loadTranslatedDoc
 * returns null when docs/i18n is absent, instead of throwing or rendering an empty page.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { loadTranslatedDoc } from "../../src/lib/docsI18nRender.ts";

test("loadTranslatedDoc falls back to English when the install has no docs/i18n tree", async (t) => {
  const docsRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-docs-no-i18n-"));
  t.after(() => fs.rmSync(docsRoot, { recursive: true, force: true }));
  fs.mkdirSync(path.join(docsRoot, "getting-started"), { recursive: true });
  fs.writeFileSync(path.join(docsRoot, "getting-started", "QUICK-START.md"), "# Quick start\n");

  for (const locale of ["pt-BR", "zh-CN", "fa"]) {
    assert.equal(
      await loadTranslatedDoc(["getting-started", "quick-start"], locale, [], docsRoot),
      null,
      locale
    );
  }
});

test("loadTranslatedDoc falls back to English when only some locales ship mirrors", async (t) => {
  const docsRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-docs-partial-i18n-"));
  t.after(() => fs.rmSync(docsRoot, { recursive: true, force: true }));
  const mirrorDir = path.join(docsRoot, "i18n", "pt-BR", "docs", "getting-started");
  fs.mkdirSync(mirrorDir, { recursive: true });
  fs.writeFileSync(path.join(mirrorDir, "QUICK-START.md"), "# Início rápido\n\nTexto.\n");

  const translated = await loadTranslatedDoc(
    ["getting-started", "quick-start"],
    "pt-BR",
    [],
    docsRoot
  );
  assert.ok(translated, "the pt-BR mirror that exists is still served");
  assert.match(translated.html, /Texto\./);

  assert.equal(
    await loadTranslatedDoc(["getting-started", "quick-start"], "es", [], docsRoot),
    null
  );
});
