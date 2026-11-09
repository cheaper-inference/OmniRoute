import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

import {
  analyze,
  classifyKey,
  collectTokens,
  flattenKeys,
} from "../../scripts/i18n/find-unreferenced-keys.mjs";

const SCRIPT = path.resolve("scripts/i18n/find-unreferenced-keys.mjs");
const MESSAGES_DIR = path.resolve("src/i18n/messages");

function makeFixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "i18n-unref-"));
  fs.mkdirSync(path.join(root, "src/i18n/messages"), { recursive: true });
  fs.mkdirSync(path.join(root, "src/app"), { recursive: true });
  const catalog = {
    settings: { themeCoral: "Coral", themeLight: "Light", dynamicStatus: { ok: "OK" } },
    retiredPage: { title: "Old", description: "Old page" },
  };
  for (const locale of ["en", "pt-BR"]) {
    fs.writeFileSync(
      path.join(root, `src/i18n/messages/${locale}.json`),
      `${JSON.stringify(catalog, null, 2)}\n`
    );
  }
  fs.writeFileSync(
    path.join(root, "src/app/page.tsx"),
    [
      'const t = useTranslations("settings");',
      't("themeLight");',
      "t(`dynamicStatus.${status}`);",
      'const heading = t("title");',
    ].join("\n")
  );
  return root;
}

test("collectTokens + classifyKey: literal, namespace and template-prefix rules", () => {
  const tokens = collectTokens([
    'useTranslations("settings"); t("themeLight"); t(`dynamicStatus.${s}`); `s${n}`; t("title");',
  ]);
  assert.equal(classifyKey("settings.themeLight", tokens), "referenced");
  assert.equal(classifyKey("settings.themeCoral", tokens), "unreferenced");
  assert.equal(classifyKey("settings.dynamicStatus.ok", tokens), "maybe-dynamic");
  // "title" is a literal, but no source file names the `retiredPage` namespace.
  assert.equal(classifyKey("retiredPage.title", tokens), "unreferenced");
  // One-letter template prefixes (`s${n}`) must not mark `settings.*` as dynamic.
  assert.equal(classifyKey("settings.themeCoral", tokens), "unreferenced");
});

test("--remove deletes only unreferenced keys from every catalog and drops empty namespaces", () => {
  const root = makeFixture();
  try {
    const report = analyze(root);
    assert.deepEqual(report.unreferenced.sort(), [
      "retiredPage.description",
      "retiredPage.title",
      "settings.themeCoral",
    ]);

    const refused = spawnSync(
      process.execPath,
      [SCRIPT, "--root", root, "--remove", "settings.themeLight"],
      { encoding: "utf8" }
    );
    assert.equal(refused.status, 1);
    assert.match(refused.stderr, /refusing/);

    execFileSync(process.execPath, [
      SCRIPT,
      "--root",
      root,
      "--remove",
      "settings.themeCoral,retiredPage.title,retiredPage.description",
    ]);
    for (const locale of ["en", "pt-BR"]) {
      const text = fs.readFileSync(path.join(root, `src/i18n/messages/${locale}.json`), "utf8");
      const data = JSON.parse(text);
      assert.equal(text, `${JSON.stringify(data, null, 2)}\n`);
      assert.deepEqual(flattenKeys(data).sort(), [
        "settings.dynamicStatus.ok",
        "settings.themeLight",
      ]);
    }
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("retired theme-preset keys and playground.closeExportModal are gone from all catalogs", () => {
  const retired = [
    "settings.themeAccent",
    "settings.themeCoral",
    "sidebar.themeCoral",
    "sidebar.presetColors",
    "header.themesDescription",
    "playground.closeExportModal",
  ];
  const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));
  assert.ok(files.length >= 67);
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
    const keys = new Set(flattenKeys(data));
    assert.equal(data.themesPage, undefined, `${file}: themesPage namespace`);
    for (const key of retired) assert.ok(!keys.has(key), `${file}: ${key}`);
    // Theme-mode keys the settings page still renders stay.
    assert.ok(keys.has("settings.themeLight"), `${file}: settings.themeLight`);
  }
});

test("en.json providers.apiRegion* carries real copy, not the key-derived placeholder", () => {
  const en = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, "en.json"), "utf8"));
  for (const key of [
    "apiRegionLabel",
    "apiRegionInternational",
    "apiRegionChina",
    "apiRegionHint",
  ]) {
    assert.doesNotMatch(en.providers[key], /^Api Region/, key);
  }
});
