import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { IntlMessageFormat } from "intl-messageformat";

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
const config = JSON.parse(read("config/i18n.json"));
const locales: string[] = [
  ...new Set<string>([
    config.default,
    ...config.locales.map((entry: { code: string }) => entry.code),
  ]),
];
const catalogs = Object.fromEntries(
  locales.map((locale) => [locale, JSON.parse(read(`src/i18n/messages/${locale}.json`))])
);

test("extracted proxy controls retain the release's explicit radio semantics", () => {
  for (const source of [fields, modal]) {
    const controls = [...source.matchAll(/<SegmentedControl\b[^>]*>/g)];
    assert.ok(controls.length > 0);
    for (const [control] of controls) assert.match(control, /semantics="radio"/);
  }
});

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

for (const locale of locales) {
  test(`${locale} includes all managed proxy messages and lifecycle states`, () => {
    for (const [namespace, keys] of [
      ["managedProxy", managedKeys],
      ["proxyConfigModal", modalKeys],
    ] as const) {
      for (const key of keys) {
        const value = catalogs[locale][namespace]?.[key];
        assert.equal(typeof value, "string", `${namespace}.${key}`);
        assert.ok(value.trim().length > 0, `${namespace}.${key}`);
        assert.ok(!value.startsWith("__MISSING__:"), `${namespace}.${key}`);
        // Some short labels are legitimately identical (e.g. German "Name").
        if (
          locale !== "en" &&
          (["pt-BR", "vi"].includes(locale) || !["core", "name", "start", "stop"].includes(key))
        )
          assert.notEqual(value, catalogs.en[namespace][key], `${namespace}.${key}`);
        const message = new IntlMessageFormat(value, locale);
        const placeholders = message
          .getAst()
          .filter((node) => node.type !== 0)
          .map((node) => ("value" in node ? node.value : "#"));
        assert.deepEqual(
          placeholders,
          key === "state" ? ["state"] : [],
          `${namespace}.${key} ICU arguments`
        );
      }
    }
    const tabLabel = catalogs[locale].settings.proxyManagedCoresTab;
    assert.equal(typeof tabLabel, "string");
    assert.ok(tabLabel.trim().length > 0);
    assert.ok(!tabLabel.startsWith("__MISSING__:"));
    assert.ok(new IntlMessageFormat(tabLabel, locale).getAst().every((node) => node.type === 0));
    if (locale !== "en") {
      assert.notEqual(
        catalogs[locale].settings.proxyManagedCoresTab,
        catalogs.en.settings.proxyManagedCoresTab
      );
    }
    const state = catalogs[locale].managedProxy.state;
    const stateMessage = new IntlMessageFormat(state, locale);
    const stateAst = stateMessage.getAst();
    assert.equal(stateAst.length, 1);
    const selector = stateAst[0];
    assert.equal(selector.type, 5);
    if (selector.type !== 5) throw new Error("Expected a state select expression");
    const states = [
      "not_installed",
      "stopped",
      "starting",
      "running",
      "stopping",
      "error",
      "other",
    ];
    assert.deepEqual(Object.keys(selector.options).sort(), [...states].sort());
    for (const option of Object.values(selector.options)) {
      assert.ok(
        option.value.every((node) => node.type === 0),
        "State branches must be literal labels"
      );
    }
    for (const name of states) {
      assert.ok(state.includes(`${name} {`), `missing lifecycle state ${name}`);
      const formatted = stateMessage.format({ state: name });
      assert.equal(typeof formatted, "string");
      assert.ok(String(formatted).trim().length > 0);
    }
    assert.equal(
      stateMessage.format({ state: "unrecognized" }),
      stateMessage.format({ state: "other" })
    );
  });
}
