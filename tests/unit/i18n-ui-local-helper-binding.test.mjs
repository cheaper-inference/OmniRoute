import assert from "node:assert/strict";
import test from "node:test";
import { auditNewUiReferences } from "../../scripts/i18n/lib/translationReferences.mjs";

const page = "src/app/(dashboard)/dashboard/combos/page.tsx";
const wrapper = "src/app/(dashboard)/dashboard/combos/comboPageHelpers.tsx";
const wrapperSource =
  'export function getI18nOrFallback(t, key, fallback, values = undefined) { try { if (typeof t.has === "function" && t.has(key)) return t(key, values); } catch {} return fallback; }';
const helper = 'function label(t, key) { return getI18nOrFallback(t, key, "fallback"); }';
const source = (namespace = "combos", local = helper, extra = "") =>
  'import {useTranslations} from "next-intl"; import {getI18nOrFallback} from "./comboPageHelpers"; ' +
  local +
  ` export function Page() { const t = useTranslations("${namespace}"); ${extra} return label(t, "done"); }`;
function audit(before, after) {
  return auditNewUiReferences({
    comparison: { kind: "snapshot", base: "a".repeat(40), candidate: "b".repeat(40) },
    changes: [{ status: "M", path: page }],
    baseFiles: { [page]: before, [wrapper]: wrapperSource },
    headFiles: { [page]: after, [wrapper]: wrapperSource },
    baseEn: { combos: { done: "Done" } },
    headEn: { combos: { done: "Done" } },
  });
}

test("unchanged dynamic wrapper in a closed local helper retains its proven namespace", () => {
  const before = source();
  const result = audit(before, source("combos", helper, "const unrelated = 1;"));
  assert.equal(result.status, "PASS");
  assert.deepEqual(result.incomplete, []);
});

test("changing only the helper caller namespace invalidates the inherited dynamic key", () => {
  assert.equal(audit(source(), source("other")).status, "INCOMPLETE");
});

test("a newly added literal reference through a local helper is checked in English", () => {
  const after = source("combos", helper.replace("t, key,", 't, "missing",'));
  const result = audit(source(), after);
  assert.equal(result.status, "FAIL");
  assert.deepEqual(
    result.violations.map((row) => row.key),
    ["combos.missing"]
  );
});

test("all direct callers must agree on the local helper namespace", () => {
  const after = source(
    "combos",
    helper,
    'const other = useTranslations("other"); label(other, "done");'
  );
  const result = audit(source(), after);
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(result.incomplete.some((row) => row.reason === "AMBIGUOUS_TRANSLATOR_PARAMETER"));
});

test("a helper escaping as a callback cannot establish a closed parameter binding", () => {
  assert.equal(
    audit(source(), source("combos", helper, "const callback = label;")).status,
    "INCOMPLETE"
  );
});

test("a reassigned local helper parameter remains unresolved", () => {
  const changed = helper.replace("{ return", '{ t = () => "other"; return');
  assert.equal(audit(source(), source("combos", changed)).status, "INCOMPLETE");
});

test("recursive parameter flow fails closed instead of exhausting the checker", () => {
  const changed = helper.replace("{ return", "{ label(t, key); return");
  assert.equal(audit(source(), source("combos", changed)).status, "INCOMPLETE");
});

test("changing helper key dependencies cannot retain an inherited limitation", () => {
  const before = source("combos", helper.replace("{ return", '{ key = "old"; return'));
  const after = before.replace('key = "old"', 'key = "new"');
  assert.equal(audit(before, after).status, "INCOMPLETE");
});

test("exported helper parameters have callers outside the closed source set", () => {
  assert.equal(audit(source(), source("combos", "export " + helper)).status, "INCOMPLETE");
});
