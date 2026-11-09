import assert from "node:assert/strict";
import test from "node:test";
import {
  auditNewUiReferences,
  DEFAULT_LIMITS,
} from "../../scripts/i18n/lib/translationReferences.mjs";

const PAGE = "src/app/(dashboard)/dashboard/combos/page.tsx";
const WRAPPER = "src/app/(dashboard)/dashboard/combos/comboPageHelpers.tsx";
const WRAPPER_SOURCE =
  'export function getI18nOrFallback(t, key, fallback, values = undefined) { try { if (typeof t.has === "function" && t.has(key)) return t(key, values); } catch {} return fallback; }';

function pageSource({
  padding = 1600,
  late = false,
  ambiguous = false,
  helperKey = null,
  recursiveHelper = false,
} = {}) {
  const helper =
    helperKey === null
      ? ""
      : `function label(translator) {
          ${recursiveHelper ? "label(translator);" : ""}
          return getI18nOrFallback(translator, ${JSON.stringify(helperKey)}, "fallback");
        }`;
  return `
    import { useTranslations } from "next-intl";
    import { getI18nOrFallback } from "./comboPageHelpers";
    ${helper}
    function Child({ translator }) { return translator("ok"); }
    export function Page() {
      const t = useTranslations("ui");
      const padding = [${Array.from({ length: padding }, () => "0").join(",")}];
      ${ambiguous ? 'const other = useTranslations("other");' : ""}
      ${helperKey === null ? "" : "label(t);"}
      ${late ? 't("lateMissing");' : ""}
      return ${
        ambiguous
          ? "<><Child translator={t} /><Child translator={other} /></>"
          : "<Child translator={t} />"
      };
    }
  `;
}

function input(before, after, { wrapperAfter = WRAPPER_SOURCE } = {}) {
  return {
    comparison: { kind: "snapshot", base: "a".repeat(40), candidate: "b".repeat(40) },
    changes: [
      { status: "M", path: PAGE },
      ...(wrapperAfter === WRAPPER_SOURCE ? [] : [{ status: "M", path: WRAPPER }]),
    ],
    baseFiles: { [PAGE]: before, [WRAPPER]: WRAPPER_SOURCE },
    headFiles: { [PAGE]: after, [WRAPPER]: wrapperAfter },
    baseEn: { ui: { ok: "Okay" }, other: { ok: "Other" } },
    headEn: { ui: { ok: "Okay" }, other: { ok: "Other" } },
    limits: { maxNodes: 5000 },
  };
}

function reasons(result) {
  return result.incomplete.map((row) => row.reason);
}

test("analysis work budget: a bounded JSX comparison does not repeat whole AST walks", () => {
  const before = pageSource();
  const result = auditNewUiReferences(input(before, before + "\n// unrelated edit\n"));
  assert.equal(DEFAULT_LIMITS.maxNodes, 500000);
  assert.equal(DEFAULT_LIMITS.maxReferences, 20000);
  assert.equal(DEFAULT_LIMITS.maxMilliseconds, 15000);
  assert.notEqual(result.incomplete[0]?.reason, "ANALYSIS_WORK_LIMIT");
  assert.equal(result.status, "PASS");
  assert.deepEqual(result.newReferences, []);
  assert.equal(result.statistics.referencesObserved, 2);
  // Both snapshots contain 1600 numeric AST nodes; indexing must charge them.
  assert.ok(result.statistics.nodesVisited >= 3200);
  assert.ok(result.statistics.nodesVisited <= 5000);
});

test("analysis work budget: a late missing call remains a failure under the same bound", () => {
  const result = auditNewUiReferences(input(pageSource(), pageSource({ late: true })));
  assert.notEqual(result.incomplete[0]?.reason, "ANALYSIS_WORK_LIMIT");
  assert.equal(result.status, "FAIL");
  assert.deepEqual(result.incomplete, []);
  assert.deepEqual(
    result.violations.map((row) => [row.key, row.reason]),
    [["ui.lateMissing", "MISSING_EN_MESSAGE"]]
  );
  assert.equal(result.statistics.referencesObserved, 3);
  assert.ok(result.statistics.nodesVisited >= 3200);
  assert.ok(result.statistics.nodesVisited <= 5000);
});

test("analysis work budget: all JSX callers still determine a translator prop", () => {
  const result = auditNewUiReferences(input(pageSource(), pageSource({ ambiguous: true })));
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(reasons(result).includes("AMBIGUOUS_TRANSLATOR_PROP"));
  assert.ok(!reasons(result).includes("ANALYSIS_WORK_LIMIT"));
});

test("analysis work budget: a local helper and wrapper still expose a missing key", () => {
  const result = auditNewUiReferences(
    input(
      pageSource({ padding: 800, helperKey: "ok" }),
      pageSource({ padding: 800, helperKey: "helperMissing" })
    )
  );
  assert.equal(result.status, "FAIL");
  assert.deepEqual(result.incomplete, []);
  assert.deepEqual(
    result.violations.map((row) => [row.key, row.reason]),
    [["ui.helperMissing", "MISSING_EN_MESSAGE"]]
  );
  assert.equal(result.statistics.referencesObserved, 4);
  assert.ok(result.statistics.nodesVisited <= 5000);
});

test("analysis work budget: changed wrapper code cannot reuse the known contract", () => {
  const page = pageSource({ padding: 100, helperKey: "ok" });
  const result = auditNewUiReferences(
    input(page, page, {
      wrapperAfter: WRAPPER_SOURCE.replace("return fallback;", 'return "changed";'),
    })
  );
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(reasons(result).includes("WRAPPER_CONTRACT_CHANGED"));
});

test("analysis work budget: recursive helper bindings remain incomplete", () => {
  const result = auditNewUiReferences(
    input(
      pageSource({ padding: 100, helperKey: "ok" }),
      pageSource({ padding: 100, helperKey: "ok", recursiveHelper: true })
    )
  );
  assert.equal(result.status, "INCOMPLETE");
  assert.ok(
    reasons(result).some((reason) =>
      ["CYCLIC_TRANSLATOR_BINDING", "UNRESOLVED_TRANSLATOR_PARAMETER"].includes(reason)
    )
  );
});

test("analysis work budget: reference limits still charge both revisions", () => {
  const page = pageSource({ padding: 0 });
  const fixture = input(page, page + "\n// unrelated edit\n");
  fixture.limits.maxReferences = 1;
  const result = auditNewUiReferences(fixture);
  assert.equal(result.status, "INCOMPLETE");
  assert.deepEqual(reasons(result), ["ANALYSIS_WORK_LIMIT"]);
});

test("analysis work budget: the AST index itself is subject to the node limit", () => {
  const page = pageSource({ padding: 0 });
  const fixture = input(page, page + "\n// unrelated edit\n");
  fixture.limits.maxNodes = 1;
  const result = auditNewUiReferences(fixture);
  assert.equal(result.status, "INCOMPLETE");
  assert.deepEqual(reasons(result), ["ANALYSIS_WORK_LIMIT"]);
});
