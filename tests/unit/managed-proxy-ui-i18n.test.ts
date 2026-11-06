import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Source/catalog-only regression: never import the managed service, open a DB,
// download a core, spawn a listener, or issue network requests.
const root = new URL("../../", import.meta.url);
const read = (file: string) => readFileSync(new URL(file, root), "utf8");
const tab = read("src/app/(dashboard)/dashboard/settings/components/proxy/ManagedProxyTab.tsx");
const fields = read("src/shared/components/ProxyCustomFields.tsx");
const modal = read("src/shared/components/ProxyConfigModal.tsx");
const managedKeys = [
  "title",
  "description",
  "saveHint",
  "saveActivate",
  "core",
  "selectCore",
  "name",
  "source",
  "start",
  "stop",
  "loadError",
  "operationError",
  "state",
];
const modalKeys = ["managedCore", "managedSelectCore", "managedSaveHint", "errorSelectManagedCore"];
const catalogs = Object.fromEntries(
  ["en", "pt-BR", "vi"].map((locale) => [
    locale,
    JSON.parse(read(`src/i18n/messages/${locale}.json`)),
  ])
);

test("managed proxy controls and errors use translated messages", () => {
  assert.match(tab, /useTranslations\("managedProxy"\)/);
  for (const key of managedKeys) assert.ok(tab.includes(`t("${key}"`), key);
  for (const key of modalKeys.slice(0, 3)) assert.ok(fields.includes(`t("${key}")`), key);
  assert.ok(modal.includes('t("errorSelectManagedCore")'));
  for (const source of [tab, fields, modal]) {
    assert.doesNotMatch(source, /"Select sing-box or Xray before saving this tunnel"/);
    assert.doesNotMatch(source, /label="(?:Proxy core|Core|Name)"/);
    assert.doesNotMatch(source, />\s*(?:Select a core|Save and activate|Managed proxy cores)\s*</);
    assert.doesNotMatch(source, /"(?:Unable to load managed cores|Managed core operation failed)"/);
  }
});

for (const locale of ["en", "pt-BR", "vi"]) {
  test(`${locale} includes all managed proxy messages and lifecycle states`, () => {
    for (const [namespace, keys] of [
      ["managedProxy", managedKeys],
      ["proxyConfigModal", modalKeys],
    ] as const) {
      for (const key of keys) {
        const value = catalogs[locale][namespace]?.[key];
        assert.equal(typeof value, "string", `${namespace}.${key}`);
        assert.ok(value.trim().length > 0, `${namespace}.${key}`);
        if (locale !== "en")
          assert.notEqual(value, catalogs.en[namespace][key], `${namespace}.${key}`);
      }
    }
    assert.equal(typeof catalogs[locale].settings.proxyManagedCoresTab, "string");
    if (locale !== "en") {
      assert.notEqual(
        catalogs[locale].settings.proxyManagedCoresTab,
        catalogs.en.settings.proxyManagedCoresTab
      );
    }
    const state = catalogs[locale].managedProxy.state;
    for (const name of [
      "not_installed",
      "stopped",
      "starting",
      "running",
      "stopping",
      "error",
      "other",
    ]) {
      assert.ok(state.includes(`${name} {`), `missing lifecycle state ${name}`);
    }
  });
}
