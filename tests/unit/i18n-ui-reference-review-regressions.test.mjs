import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { auditNewUiReferences } from "../../scripts/i18n/lib/translationReferences.mjs";
import { inspectNewUiReferences } from "../../scripts/i18n/check-new-ui-references.mjs";

const FILE = "src/app/page.tsx";
const COMBOS = "src/app/(dashboard)/dashboard/combos/";
const REGISTRY = "src/shared/constants/featureFlagDefinitions.ts";
const FLAG_UI = "src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx";
const comparison = { kind: "snapshot", base: "a".repeat(40), candidate: "b".repeat(40) };
const input = (head, base = "", en = {}) => ({
  comparison,
  changes: [{ status: base ? "M" : "A", path: FILE }],
  baseFiles: base ? { [FILE]: base } : {},
  headFiles: { [FILE]: head },
  baseEn: en,
  headEn: en,
});
const hookPage = (body) =>
  'import { useTranslations } from "next-intl"; export function Page() {' + body + "}";

test("review R1: a reassignable translator alias cannot retain its initial namespace", () => {
  const source = hookPage(
    'const t = useTranslations("common"); let alias = t; alias = useTranslations("wrong"); return alias("done");'
  );
  const result = auditNewUiReferences(input(source, "", { common: { done: "Done" } }));
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(result.incomplete.some((row) => row.reason === "MUTABLE_TRANSLATOR_BINDING"));
});

test("review R1 positive: a constant translator alias preserves its proven namespace", () => {
  const source = hookPage(
    'const t = useTranslations("common"); const alias = t; return alias("done");'
  );
  const result = auditNewUiReferences(input(source, "", { common: { done: "Done" } }));
  assert.equal(result.status, "PASS");
  assert.deepEqual(
    result.newReferences.map((row) => row.key),
    ["common.done"]
  );
  assert.equal(
    auditNewUiReferences(
      input('const original = (value) => value; let callback = original; callback("ordinary");')
    ).status,
    "PASS"
  );
});

const consumer = `import { useTranslations } from "next-intl";
import FeatureFlagCard from "./FeatureFlagCard";
export function FeatureFlagsGrid() {
  const t = useTranslations("featureFlags");
  return filteredFlags.map((flag) => <FeatureFlagCard flag={{ ...flag,
    label: t.has(\`definitions.\${flag.key}.label\`) ? t(\`definitions.\${flag.key}.label\`) : flag.label,
    description: t.has(\`definitions.\${flag.key}.description\`) ? t(\`definitions.\${flag.key}.description\`) : flag.description,
  }} />);
}`;
function flagInput(newObject, prefix = "") {
  return {
    comparison,
    changes: [{ status: "M", path: REGISTRY }],
    baseFiles: {
      [REGISTRY]: 'export const FEATURE_FLAG_DEFINITIONS = [{ key: "OLD" }];',
      [FLAG_UI]: consumer,
    },
    headFiles: {
      [REGISTRY]:
        prefix + 'export const FEATURE_FLAG_DEFINITIONS = [{ key: "OLD" },' + newObject + "];",
      [FLAG_UI]: consumer,
    },
    baseEn: {},
    headEn: { featureFlags: { definitions: { NEW: { label: "New", description: "New flag" } } } },
  };
}

for (const [name, object, prefix] of [
  ["computed literal override", '{ key: "NEW", ["key"]: "OTHER" }', ""],
  [
    "computed dynamic override",
    '{ key: "NEW", [overrideKey]: "OTHER" }',
    'const overrideKey: string = "key";',
  ],
  ["quoted duplicate override", '{ key: "NEW", "key": "OTHER" }', ""],
  ["accessor override", '{ key: "NEW", get key() { return "OTHER"; } }', ""],
]) {
  test("review R3: flag registry rejects " + name, () => {
    const result = auditNewUiReferences(flagInput(object, prefix));
    assert.equal(result.status, "INCOMPLETE");
    assert.ok(result.incomplete.some((row) => row.reason === "FLAG_REGISTRY_CONTRACT_CHANGED"));
  });
}

test("review R3 positive: one quoted literal key has the same registry meaning", () => {
  const result = auditNewUiReferences(flagInput('{ "key": "NEW" }'));
  assert.equal(result.status, "PASS");
  assert.deepEqual(result.newReferences.map((row) => row.key).sort(), [
    "featureFlags.definitions.NEW.description",
    "featureFlags.definitions.NEW.label",
  ]);
});

test("review R4: a changed constant dependency cannot hide an unresolved namespace", () => {
  const before = hookPage(
    'const namespace = "combos"; const t = useTranslations(namespace); return t("done");'
  );
  const after = before.replace('namespace = "combos"', 'namespace = "wrong"');
  const result = auditNewUiReferences(input(after, before, { combos: { done: "Done" } }));
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(result.incomplete.some((row) => row.reason === "DYNAMIC_NAMESPACE"));
});

test("review R4 positive: renaming a proven constant dependency does not create a new limitation", () => {
  const before = hookPage(
    'const namespace = "combos"; const t = useTranslations(namespace); return t("done");'
  );
  const after = before.replaceAll("namespace", "messageNamespace");
  const result = auditNewUiReferences(input(after, before, { combos: { done: "Done" } }));
  assert.equal(result.status, "PASS");
  assert.equal(result.incomplete.length, 0);
});

test("review R4: a namespace binding without a constant proof is never silently grandfathered", () => {
  const before = hookPage(
    'const namespace = externalNamespace(); const t = useTranslations(namespace); return t("done");'
  );
  const result = auditNewUiReferences(input(before + "\nconst unrelated = 1;", before));
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(result.incomplete.some((row) => row.reason === "DYNAMIC_NAMESPACE"));
});

test("review R5: renaming a proven translator preserves an unchanged dynamic-key limitation", () => {
  const before = hookPage('const t = useTranslations("combos"); return t(name);');
  const after = hookPage('const text = useTranslations("combos"); return text(name);');
  const result = auditNewUiReferences(input(after, before));
  assert.equal(result.status, "PASS");
  assert.equal(result.incomplete.length, 0);
});

test("review R5 negative: changing the proven namespace still creates a new dynamic limitation", () => {
  const before = hookPage('const t = useTranslations("combos"); return t(name);');
  const after = hookPage('const text = useTranslations("wrong"); return text(name);');
  const result = auditNewUiReferences(input(after, before));
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(result.incomplete.some((row) => row.reason === "DYNAMIC_KEY"));
});

const wrapper = `export function getI18nOrFallback(t, key, fallback, values = undefined) {
  try { if (typeof t.has === "function" && t.has(key)) return t(key, values); } catch {}
  return fallback;
}`;
const toolbar =
  'import { getI18nOrFallback } from "./comboPageHelpers"; export function ComboListToolbar({ t }) { return getI18nOrFallback(t, "reorderAll", "Reorder"); }';
const caller = (namespace) => `import { useTranslations } from "next-intl";
import { ComboListToolbar } from "./ComboListControls";
export function Page() {
  const t = useTranslations("${namespace}");
  return <ComboListToolbar t={t}/>;
}`;

function callerSnapshotFixture(t, afterPage, { renameCaller = false, renameWrapper = false } = {}) {
  const temporary = resolve(tmpdir());
  assert.ok(
    !temporary.split(sep).includes("_tasks"),
    "Git fixtures must not be created under _tasks"
  );
  const root = mkdtempSync(join(temporary, "ui-reference-review-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const env = {
    PATH: process.env.PATH || "/usr/bin:/bin",
    HOME: root,
    XDG_CONFIG_HOME: root,
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_CONFIG_GLOBAL: join(root, "absent-global-config"),
    GIT_OPTIONAL_LOCKS: "0",
    GIT_ALLOW_PROTOCOL: "",
    GIT_NO_LAZY_FETCH: "1",
    LANG: "C.UTF-8",
  };
  const git = (...args) =>
    execFileSync("git", args, {
      cwd: root,
      env,
      encoding: "utf8",
      timeout: 5000,
      maxBuffer: 65536,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  const write = (file, text) => {
    const destination = join(root, file);
    mkdirSync(dirname(destination), { recursive: true });
    writeFileSync(destination, text);
  };
  git("init", "--quiet", "--initial-branch=fixture");
  write(COMBOS + "page.tsx", caller("combos"));
  write(COMBOS + "comboPageHelpers.tsx", wrapper);
  write(COMBOS + "ComboListControls.tsx", toolbar);
  write("src/i18n/messages/en.json", JSON.stringify({ combos: { reorderAll: "Reorder" } }));
  git("add", "--", "src");
  const base = git("write-tree");
  if (renameWrapper) {
    renameSync(
      join(root, COMBOS + "comboPageHelpers.tsx"),
      join(root, COMBOS + "renamedHelper.tsx")
    );
    write(
      COMBOS + "ComboListControls.tsx",
      toolbar.replace("./comboPageHelpers", "./renamedHelper")
    );
  }
  if (renameCaller) {
    renameSync(join(root, COMBOS + "page.tsx"), join(root, COMBOS + "renamedPage.tsx"));
  }
  write(COMBOS + (renameCaller ? "renamedPage.tsx" : "page.tsx"), afterPage);
  git("add", "--", "src");
  const candidate = git("write-tree");
  return { cwd: root, env, snapshot: { base, candidate } };
}

test("review R2: changing only the caller namespace rechecks its unchanged prop consumer", (t) => {
  const result = inspectNewUiReferences(callerSnapshotFixture(t, caller("wrong")));
  assert.equal(result.status, "FAIL");
  assert.equal(result.sourceChangeCount, 1);
  assert.deepEqual(
    result.violations.map((row) => row.key),
    ["wrong.reorderAll"]
  );
  assert.equal(result.violations[0].file, COMBOS + "ComboListControls.tsx");
});

test("review R2 positive: an unrelated caller edit preserves unchanged child obligations", (t) => {
  const result = inspectNewUiReferences(
    callerSnapshotFixture(t, caller("combos") + "\nconst layout = 1;")
  );
  assert.equal(result.status, "PASS");
  assert.equal(result.sourceChangeCount, 1);
  assert.equal(result.newReferences.length, 0);
});

function multipleCallerInput(secondNamespace, reversed = false) {
  const callsites = ["<ComboListToolbar t={first}/>", "<ComboListToolbar t={second}/>"];
  if (reversed) callsites.reverse();
  const render = (second) =>
    'import { useTranslations } from "next-intl"; import { ComboListToolbar } from "./ComboListControls";' +
    'export function Page() { const firstNs = "combos"; const secondNs = "' +
    second +
    '";' +
    "const first = useTranslations(firstNs); const second = useTranslations(secondNs);" +
    "return <>" +
    callsites.join("") +
    "</>; }";
  return {
    comparison,
    changes: [{ status: "M", path: COMBOS + "page.tsx" }],
    affectedFiles: [COMBOS + "ComboListControls.tsx"],
    baseFiles: {
      [COMBOS + "page.tsx"]: render("combos"),
      [COMBOS + "comboPageHelpers.tsx"]: wrapper,
      [COMBOS + "ComboListControls.tsx"]: toolbar,
    },
    headFiles: {
      [COMBOS + "page.tsx"]: render(secondNamespace),
      [COMBOS + "comboPageHelpers.tsx"]: wrapper,
      [COMBOS + "ComboListControls.tsx"]: toolbar,
    },
    baseEn: { combos: { reorderAll: "Reorder" } },
    headEn: { combos: { reorderAll: "Reorder" } },
  };
}

for (const reversed of [false, true]) {
  test(
    "review R4 multi-caller: changing only the second binding is not inherited, reversed=" +
      reversed,
    () => {
      const result = auditNewUiReferences(multipleCallerInput("wrong", reversed));
      assert.equal(result.status, "INCOMPLETE");
      assert.ok(result.incomplete.some((row) => row.reason === "AMBIGUOUS_TRANSLATOR_PROP"));
    }
  );
}

test("review R4 multi-caller positive: every stable proof is retained independently of order", () => {
  const fixture = multipleCallerInput("combos");
  fixture.headFiles[COMBOS + "page.tsx"] = multipleCallerInput("combos", true).headFiles[
    COMBOS + "page.tsx"
  ];
  const result = auditNewUiReferences(fixture);
  assert.equal(result.status, "PASS");
  assert.equal(result.incomplete.length, 0);
});

test("review R4 multi-caller: incompatible proven dependencies are never grandfathered", () => {
  const fixture = multipleCallerInput("wrong");
  fixture.baseFiles[COMBOS + "page.tsx"] = fixture.headFiles[COMBOS + "page.tsx"];
  fixture.headFiles[COMBOS + "page.tsx"] += "\nconst layout = 1;";
  const result = auditNewUiReferences(fixture);
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(result.incomplete.some((row) => row.reason === "AMBIGUOUS_TRANSLATOR_PROP"));
});

test("review R4 chain: changing the selected constant alias changes the dependency proof", () => {
  const before = hookPage(
    'const first = "combos"; const second = "wrong"; const selected = first; const t = useTranslations(selected); return t("done");'
  );
  const after = before.replace("selected = first", "selected = second");
  const result = auditNewUiReferences(input(after, before));
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(result.incomplete.some((row) => row.reason === "DYNAMIC_NAMESPACE"));
});

test("review R5 key: changing the dynamic key AST remains a new limitation", () => {
  const before = hookPage('const t = useTranslations("combos"); return t(firstKey);');
  const after = hookPage('const text = useTranslations("combos"); return text(secondKey);');
  const result = auditNewUiReferences(input(after, before));
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(result.incomplete.some((row) => row.reason === "DYNAMIC_KEY"));
});

test("review R2 rename: renaming the caller and changing its namespace rechecks the child", (t) => {
  const result = inspectNewUiReferences(
    callerSnapshotFixture(t, caller("wrong"), { renameCaller: true })
  );
  assert.equal(result.status, "FAIL");
  assert.ok(
    result.inventory.some((row) => row.status === "R" && row.previousPath === COMBOS + "page.tsx")
  );
  assert.deepEqual(
    result.violations.map((row) => row.key),
    ["wrong.reorderAll"]
  );
});

test("review R2 rename positive: a pure caller rename preserves child obligations", (t) => {
  const result = inspectNewUiReferences(
    callerSnapshotFixture(t, caller("combos"), { renameCaller: true })
  );
  assert.equal(result.status, "PASS");
  assert.ok(
    result.inventory.some((row) => row.status === "R" && row.previousPath === COMBOS + "page.tsx")
  );
  assert.equal(result.newReferences.length, 0);
});

test("review R2 wrapper boundary: removing the known wrapper requires contract review", () => {
  const result = auditNewUiReferences({
    comparison,
    changes: [{ status: "D", path: COMBOS + "comboPageHelpers.tsx" }],
    baseFiles: { [COMBOS + "comboPageHelpers.tsx"]: wrapper },
    headFiles: {},
    baseEn: {},
    headEn: {},
  });
  assert.equal(result.status, "INCOMPLETE");
  assert.equal(result.incomplete[0].reason, "WRAPPER_CONTRACT_PATH_CHANGED");
});

test("review R2 wrapper boundary: rename with an updated import cannot erase reference checks", (t) => {
  const result = inspectNewUiReferences(
    callerSnapshotFixture(t, caller("combos"), { renameWrapper: true })
  );
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(
    result.inventory.some(
      (row) => row.status === "R" && row.previousPath === COMBOS + "comboPageHelpers.tsx"
    )
  );
  assert.equal(result.incompleteDetails[0].reason, "WRAPPER_CONTRACT_PATH_CHANGED");
});
