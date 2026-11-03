import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { auditNewUiReferences } from "../../scripts/i18n/lib/translationReferences.mjs";
import { findUntranslatedNewKeys } from "../../scripts/i18n/check-new-key-coverage.mjs";
import { closureNamespaces } from "../../scripts/i18n/lib/routeNamespacesAnalyzer.mjs";
import {
  inspectNewUiReferences,
  parseChangeInventory,
} from "../../scripts/i18n/check-new-ui-references.mjs";
import { staticGateOutcome } from "../../scripts/quality/release-green-static-profile.mjs";

const FILE = "src/app/page.tsx";
const comparison = { kind: "snapshot", base: "a".repeat(40), candidate: "b".repeat(40) };
const page = (body, namespace = "combos") =>
  `import { useTranslations } from "next-intl"; export function Page() { const t = useTranslations("${namespace}"); ${body} }`;
const input = (headSource, headEn = {}, baseSource = "", baseEn = {}) => ({
  comparison,
  changes: [{ status: baseSource ? "M" : "A", path: FILE }],
  baseFiles: baseSource ? { [FILE]: baseSource } : {},
  headFiles: { [FILE]: headSource },
  baseEn,
  headEn,
});

test("new_literal_missing_en: a new UI reference must exist in English", () => {
  const result = auditNewUiReferences(input(page('return t("reorderAll");')));
  assert.equal(result.status, "FAIL");
  assert.deepEqual(
    result.violations.map((row) => row.key),
    ["combos.reorderAll"]
  );
});

test("correct_existing_key_reused: new uses of a valid existing message pass", () => {
  const result = auditNewUiReferences(
    input(page('return t("done");', "common"), { common: { done: "Done" } })
  );
  assert.equal(result.status, "PASS");
  assert.equal(result.newReferences[0].key, "common.done");
});

test("wrong_namespace_translated_everywhere: metadata does not replace the consumer namespace", () => {
  const result = auditNewUiReferences(
    input(page('return t("definitions.FLAG.description");', "featureFlags"), {
      settings: { description: "Translated" },
    })
  );
  assert.equal(result.status, "FAIL");
  assert.equal(result.violations[0].key, "featureFlags.definitions.FLAG.description");
});

test("multiple_translators_in_file: each call follows its own lexical binding", () => {
  const source = page('const tc = useTranslations("common"); return [t("save"), tc("done")];');
  const result = auditNewUiReferences(
    input(source, { combos: { save: "Save" }, common: { done: "Done" } })
  );
  assert.equal(result.status, "PASS");
  assert.deepEqual(
    result.newReferences.map((row) => row.key),
    ["combos.save", "common.done"]
  );
});

test("namespace_declaration_changed: an unchanged call is checked after its namespace changes", () => {
  const result = auditNewUiReferences(
    input(
      page('return t("done");', "combos"),
      { common: { done: "Done" } },
      page('return t("done");', "common")
    )
  );
  assert.equal(result.status, "FAIL");
  assert.equal(result.violations[0].key, "combos.done");
});

test("import_alias: imported hook aliases retain their namespace", () => {
  const source =
    'import { useTranslations as useText } from "next-intl"; export function Page() { const text = useText("common"); return text("done"); }';
  const result = auditNewUiReferences(input(source, { common: { done: "Done" } }));
  assert.equal(result.status, "PASS");
  assert.equal(result.newReferences[0].key, "common.done");
});

test("shadowed_non_translation_function: unrelated calls named t are ignored", () => {
  const source = page(
    'function nested() { const t = (value) => value; return t("notAMessage"); } return t("done");',
    "common"
  );
  const result = auditNewUiReferences(input(source, { common: { done: "Done" } }));
  assert.equal(result.status, "PASS");
  assert.equal(result.newReferences.length, 1);
  assert.equal(
    auditNewUiReferences(
      input('export function Child({onClick}) { return onClick("notAMessage"); }')
    ).status,
    "PASS"
  );
});

test("comments_and_ordinary_strings: translation-looking text is not a reference", () => {
  const result = auditNewUiReferences(
    input('/* t("missing") */ const example = \'useTranslations("wrong")\';')
  );
  assert.equal(result.status, "PASS");
  assert.equal(result.newReferences.length, 0);
});

const COMBOS = "src/app/(dashboard)/dashboard/combos/";
const HELPER = COMBOS + "comboPageHelpers.tsx";
const TOOLBAR = COMBOS + "ComboListControls.tsx";
const wrapper = `export function getI18nOrFallback(t, key, fallback, values = undefined) {
  try {
    if (typeof t.has === "function" && t.has(key)) return t(key, values);
  } catch {}
  return fallback;
}`;

test("wrapper_fallback_is_not_translation: fallback does not satisfy English", () => {
  const source =
    'import { useTranslations } from "next-intl"; import { getI18nOrFallback } from "./comboPageHelpers"; export function Page() { const t = useTranslations("combos"); return getI18nOrFallback(t, "reorderAll", "Reorder all"); }';
  const fixture = {
    ...input(""),
    changes: [{ status: "A", path: COMBOS + "page.tsx" }],
    headFiles: { [COMBOS + "page.tsx"]: source, [HELPER]: wrapper },
  };
  const result = auditNewUiReferences(fixture);
  assert.equal(result.status, "FAIL");
  assert.equal(result.violations[0].key, "combos.reorderAll");
  const changed = auditNewUiReferences({
    ...fixture,
    headFiles: {
      ...fixture.headFiles,
      [HELPER]: wrapper.replace("return t(key, values)", 'return t("other", values)'),
    },
  });
  assert.equal(changed.status, "INCOMPLETE");
});

function propFixture(ambiguous = false) {
  const child =
    'import { getI18nOrFallback } from "./comboPageHelpers"; export function ComboListToolbar({ t }) { return getI18nOrFallback(t, "reorderAll", "Reorder all"); }';
  const caller =
    'import { useTranslations } from "next-intl"; import { ComboListToolbar } from "./ComboListControls"; export function Page() { const t = useTranslations("combos"); const other = useTranslations("wrong"); return <><ComboListToolbar t={t}/>' +
    (ambiguous ? "<ComboListToolbar t={other}/>" : "") +
    "</>; }";
  return {
    ...input(""),
    changes: [{ status: "A", path: TOOLBAR }],
    headEn: { combos: { reorderAll: "Reorder all" } },
    headFiles: { [TOOLBAR]: child, [HELPER]: wrapper, [COMBOS + "page.tsx"]: caller },
  };
}

test("translator_prop_resolved: a child receives the exact translator from its caller", () => {
  const result = auditNewUiReferences(propFixture());
  assert.equal(result.status, "PASS");
  assert.deepEqual(
    result.newReferences.map((row) => row.key),
    ["combos.reorderAll"]
  );
});

test("translator_prop_ambiguous: incompatible caller namespaces are incomplete", () => {
  const result = auditNewUiReferences(propFixture(true));
  assert.equal(result.status, "INCOMPLETE");
  assert.equal(result.incomplete[0].reason, "AMBIGUOUS_TRANSLATOR_PROP");
  const spread = propFixture();
  spread.headFiles[COMBOS + "page.tsx"] = spread.headFiles[COMBOS + "page.tsx"].replace(
    "t={t}/>",
    "t={t} {...external}/>"
  );
  assert.equal(auditNewUiReferences(spread).status, "INCOMPLETE");
});

const REGISTRY = "src/shared/constants/featureFlagDefinitions.ts";
const FLAG_UI = "src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx";
const flagRegistry = (keys) =>
  `export const FEATURE_FLAG_DEFINITIONS = [${keys.map((key) => `{ key: "${key}", label: "Public flag", description: "Public description" }`).join(",")}];`;
const flagUi = (namespace = "featureFlags") =>
  'import { useTranslations } from "next-intl"; import FeatureFlagCard from "./FeatureFlagCard"; export function FeatureFlagsGrid() { const t = useTranslations("' +
  namespace +
  '"); return filteredFlags.map((flag) => <FeatureFlagCard flag={{ ...flag, label: t.has(`definitions.${flag.key}.label`) ? t(`definitions.${flag.key}.label`) : flag.label, description: t.has(`definitions.${flag.key}.description`) ? t(`definitions.${flag.key}.description`) : flag.description }} />); }';
const flagFixture = (consumer = flagUi()) => ({
  ...input(""),
  changes: [{ status: "M", path: REGISTRY }],
  baseFiles: { [REGISTRY]: flagRegistry(["OLD"]), [FLAG_UI]: flagUi() },
  headFiles: { [REGISTRY]: flagRegistry(["OLD", "NEW"]), [FLAG_UI]: consumer },
  headEn: {},
});

test("new_flag_consumer_pair: a new registry key requires the real label and description", () => {
  const result = auditNewUiReferences(flagFixture());
  assert.equal(result.status, "FAIL");
  assert.deepEqual(result.violations.map((row) => row.key).sort(), [
    "featureFlags.definitions.NEW.description",
    "featureFlags.definitions.NEW.label",
  ]);
});

test("flag_consumer_contract_changed: a changed consumer cannot reuse an obsolete mapping", () => {
  const result = auditNewUiReferences(flagFixture(flagUi("settings")));
  assert.equal(result.status, "INCOMPLETE");
  assert.equal(result.incomplete[0].reason, "FLAG_CONSUMER_CONTRACT_CHANGED");
  const spread = flagFixture();
  spread.headFiles[REGISTRY] =
    'export const FEATURE_FLAG_DEFINITIONS = [{key: "NEW", ...external}];';
  assert.equal(auditNewUiReferences(spread).status, "INCOMPLETE");
  const duplicate = flagFixture();
  duplicate.headFiles[REGISTRY] =
    'export const FEATURE_FLAG_DEFINITIONS = [{key: "NEW", key: "OTHER"}];';
  assert.equal(auditNewUiReferences(duplicate).status, "INCOMPLETE");
});

test("dynamic_reference_without_contract: new arbitrary keys are incomplete", () => {
  const result = auditNewUiReferences(input(page("return t(prefix + suffix);")));
  assert.equal(result.status, "INCOMPLETE");
  assert.equal(result.incomplete[0].reason, "DYNAMIC_KEY");
  const mutable = page('return t("message");').replace("const t", "let t");
  assert.equal(
    auditNewUiReferences(input(mutable, { combos: { message: "Message" } })).status,
    "INCOMPLETE"
  );
});

test("optional_has_only: an isolated optional probe is not a visible-message obligation", () => {
  const result = auditNewUiReferences(input(page('return t.has("optional");')));
  assert.equal(result.status, "PASS");
  assert.equal(result.newReferences.length, 0);
});

test("en_marker_or_empty_or_non_string: a referenced message must be real English text", () => {
  for (const value of ["__MISSING__:Example", "", [], {}, 3]) {
    const result = auditNewUiReferences(
      input(page('return t("message");'), { combos: { message: value } })
    );
    assert.equal(result.status, "FAIL");
  }
});

test("invalid_icu: malformed messages or missing proven arguments fail", () => {
  const malformed = auditNewUiReferences(
    input(page('return t("message");'), { combos: { message: "{count" } })
  );
  assert.equal(malformed.status, "FAIL");
  assert.equal(malformed.violations[0].reason, "INVALID_ICU");
  const missing = auditNewUiReferences(
    input(page('return t("message", { unrelated: 3 });'), { combos: { message: "Count: {count}" } })
  );
  assert.equal(missing.status, "FAIL");
  assert.equal(missing.violations[0].reason, "MISSING_ICU_ARGUMENTS");
  assert.equal(
    auditNewUiReferences(
      input(page('return t("message", { count: 3 });'), { combos: { message: "Count: {count}" } })
    ).status,
    "PASS"
  );
});

test("prototype_segment_or_accessor: lookup cannot traverse prototypes or invoke getters", () => {
  let calls = 0;
  const en = { combos: {} };
  Object.defineProperty(en.combos, "message", {
    enumerable: true,
    get() {
      calls++;
      return "wrong";
    },
  });
  assert.equal(auditNewUiReferences(input(page('return t("message");'), en)).status, "FAIL");
  assert.equal(calls, 0);
  assert.equal(
    auditNewUiReferences(input(page('return t("constructor.name");'), {})).status,
    "FAIL"
  );
});

test("unchanged_baseline_gap: touching unrelated code does not charge an inherited gap", () => {
  const before = page('return t("oldMissing");');
  const result = auditNewUiReferences(input(before + "\nconst unrelated = 1;", {}, before));
  assert.equal(result.status, "PASS");
  assert.equal(result.newReferences.length, 0);
  assert.deepEqual(
    result.baselineGaps?.map((row) => row.key),
    ["combos.oldMissing"]
  );
});

test("new_use_of_existing_gap: an extra use remains a new defective reference", () => {
  const result = auditNewUiReferences(
    input(page('return [t("oldMissing"), t("oldMissing")];'), {}, page('return t("oldMissing");'))
  );
  assert.equal(result.status, "FAIL");
  assert.equal(result.newReferences.length, 1);
});

test("format_or_variable_rename_only: equivalent bindings do not create new obligations", () => {
  const before = page('return t("oldMissing");');
  const after = before.replace(/\bt\b/g, "text").replaceAll(";", ";\n");
  const result = auditNewUiReferences(input(after, {}, before));
  assert.equal(result.status, "PASS");
  assert.equal(result.newReferences.length, 0);
});

test("unambiguous_file_rename: the old logical file keeps its reference identity", () => {
  const source = page('return t("oldMissing");');
  const result = auditNewUiReferences({
    ...input(source),
    changes: [{ status: "R", path: FILE, previousPath: "src/old.tsx" }],
    baseFiles: { "src/old.tsx": source },
  });
  assert.equal(result.status, "PASS");
  assert.equal(result.newReferences.length, 0);
});

test("missing_history_or_parse_error: incomplete input never becomes an empty PASS", () => {
  const fixture = input(page('return t("done");'), { combos: { done: "Done" } });
  assert.equal(auditNewUiReferences({ ...fixture, comparison: null }).status, "INCOMPLETE");
  assert.equal(
    auditNewUiReferences({ ...fixture, changes: [{ status: "M", path: FILE }] }).status,
    "INCOMPLETE"
  );
  assert.equal(auditNewUiReferences(input("export function broken( {")).status, "INCOMPLETE");
  assert.deepEqual(parseChangeInventory("R100\0src/old.tsx\0src/new.tsx\0"), [
    { status: "R", previousPath: "src/old.tsx", path: "src/new.tsx", similarity: 100 },
  ]);
  assert.throws(() => parseChangeInventory("M\0src/bad.tsx"));
  assert.throws(() => parseChangeInventory("R100\0src/../outside.tsx\0src/new.tsx\0"));
  const invalid = inspectNewUiReferences({
    snapshot: { base: "not-a-sha", candidate: comparison.candidate },
  });
  assert.equal(invalid.incomplete, true);
  assert.equal(staticGateOutcome(2, JSON.stringify(invalid)).evidenceState, "INCOMPLETE");
});

test("resource_bound_exceeded: bounded analysis cannot report partial success", () => {
  const fixture = input(page('return t("done");'), { combos: { done: "Done" } });
  assert.equal(
    auditNewUiReferences({ ...fixture, limits: { maxFileBytes: 10 } }).status,
    "INCOMPLETE"
  );
  assert.equal(auditNewUiReferences({ ...fixture, limits: { maxFiles: 0 } }).status, "INCOMPLETE");
});

test("en_fix_does_not_complete_other_locales: reference success preserves translation failure", () => {
  const en = { combos: { reorderAll: "Reorder all" } };
  const result = auditNewUiReferences(input(page('return t("reorderAll");'), en));
  assert.equal(result.status, "PASS");
  assert.deepEqual(
    findUntranslatedNewKeys({ baseEn: {}, headEn: en, headLocales: { "pt-BR": {} } }),
    [{ key: "combos.reorderAll", locale: "pt-BR" }]
  );
});

test("route_payload_stale: valid references do not replace the existing namespace check", () => {
  const result = auditNewUiReferences(
    input(page('return t("reorderAll");'), { combos: { reorderAll: "Reorder all" } })
  );
  const required = [
    ...closureNamespaces([
      fileURLToPath(new URL("../fixtures/ui-references/route.tsx", import.meta.url)),
    ]),
  ];
  const present = [];
  assert.equal(result.status, "PASS");
  assert.equal(result.scope?.routePayloadChecked, false);
  assert.deepEqual(
    required.filter((namespace) => !present.includes(namespace)),
    ["combos"]
  );
});
