// Runtime-exemption discovery and rule tests.
// Everything entering the repository is written in generic English: no issue
// numbers, no internal labels, no local paths.

import assert from "node:assert/strict";
import test from "node:test";

import {
  checkRuntimeExemptions,
  countRuntimeExemptions,
  discoverRuntimeConstants,
  formatExemptionSummary,
  readExemptionRegistry,
} from "../../scripts/check/lib/exemption-proof.mjs";

const ROOT = process.cwd();
const PROOF_TEST = "tests/unit/exemption-red-proof.test.mjs";
const TARGET = "open-sse/services/model.ts#KNOWN_MODEL_IDS";

function registry(overrides = {}) {
  return {
    schemaVersion: 1,
    baseline: { exemptions: 1, constants: 1, files: 0 },
    exemptions: [],
    ...overrides,
  };
}

function runtimeEntry(overrides = {}) {
  return {
    id: "check:gate-manifest/KNOWN_MODEL_IDS",
    kind: "constant",
    target: TARGET,
    surface: "runtime",
    redProof: {
      test: PROOF_TEST,
      case: "KNOWN_MODEL_IDS rejects an unlisted model",
      neutralValue: "new Set()",
    },
    ...overrides,
  };
}

const green = () => ({ proved: true });
const red = () => ({ proved: false });
const declaration = (name = "KNOWN_MODEL_IDS", file = "open-sse/services/model.ts", line = 79) => [
  { name, file, line },
];

test("discovery anchors declarations across mjs, ts, js and tsx and excludes the diff-scope checks", () => {
  const runtime = discoverRuntimeConstants({ root: ROOT });
  assert.equal(runtime.length, 69);
  assert.equal(new Set(runtime.map((d) => d.name)).size, 65);
  assert.equal(new Set(runtime.map((d) => d.file)).size, 57);

  const tree = discoverRuntimeConstants({ root: ROOT, includeChecks: true });
  assert.equal(tree.length, 84);
  assert.equal(new Set(tree.map((d) => d.name)).size, 80);
  assert.equal(new Set(tree.map((d) => d.file)).size, 67);
});

test("anchoring ignores regex-literal mentions and keeps the tsx and test declarations", () => {
  const tree = discoverRuntimeConstants({ root: ROOT, includeChecks: true });
  const files = new Set(tree.map((d) => d.file));
  const literals = [
    "tests/unit/image-routes-proxy-error-sanitization-15159.test.ts",
    "tests/unit/provider-icon-devin-desktop.test.ts",
  ];
  assert.ok(
    tree.every((d) => !(literals.includes(d.file) && d.name === "KNOWN_MISSING_ERROR_HELPER"))
  );
  assert.ok(!files.has(literals[0]));
  assert.ok(
    tree.some((d) => d.name === "KNOWN_SVGS" && d.file === "src/shared/components/ProviderIcon.tsx")
  );
  assert.ok(
    tree.some(
      (d) =>
        d.name === "KNOWN_WRONG_UNTIL_SKILLS_FACTS_MERGE" &&
        d.file === "tests/unit/agentSkills-route-paths.test.ts"
    )
  );
});

test("a failed declaration scan is reported instead of looking empty", () => {
  assert.throws(
    () => discoverRuntimeConstants({ root: "/no-such-checkout-for-exemption-proof" }),
    /git ls-files failed/
  );
});

test("the committed registry marks exactly the runtime entries with named red proofs", () => {
  const data = readExemptionRegistry(ROOT);
  const constants = data.exemptions.filter((e) => e.kind === "constant");
  const runtimeEntries = data.exemptions.filter((e) => e.surface === "runtime");
  assert.equal(data.exemptions.length, 104);
  assert.equal(constants.length, 83);
  assert.equal(runtimeEntries.length, 65);
  assert.equal(constants.filter((e) => e.surface !== "runtime").length, 18);
  const cases = new Set();
  for (const entry of runtimeEntries) {
    assert.equal(typeof entry.redProof?.test, "string");
    assert.equal(typeof entry.redProof?.case, "string");
    assert.equal(typeof entry.redProof?.neutralValue, "string");
    assert.ok(entry.redProof.test.length && entry.redProof.case.length);
    assert.ok(!cases.has(entry.redProof.case), `duplicate case: ${entry.redProof.case}`);
    cases.add(entry.redProof.case);
  }
});

test("countRuntimeExemptions reads the runtime surface and returns to its start after add and remove", () => {
  const data = readExemptionRegistry(ROOT);
  const start = countRuntimeExemptions({ root: ROOT, registry: data });
  assert.equal(start, 65);
  data.exemptions.push(
    runtimeEntry({
      id: "check:gate-manifest/KNOWN_SCRATCH",
      target: "open-sse/scratch.ts#KNOWN_SCRATCH",
    })
  );
  assert.equal(countRuntimeExemptions({ root: ROOT, registry: data }), start + 1);
  data.exemptions.pop();
  assert.equal(countRuntimeExemptions({ root: ROOT, registry: data }), start);
});

test("an undeclared discovered name is refused with its path and name", async () => {
  const result = await checkRuntimeExemptions({
    root: ROOT,
    registry: registry({ exemptions: [runtimeEntry()] }),
    declarations: [...declaration(), { name: "KNOWN_EXTRA", file: "open-sse/extra.ts", line: 1 }],
    proofRunner: green,
  });
  assert.ok(
    result.errors.some((e) => e.includes("KNOWN_EXTRA") && e.includes("open-sse/extra.ts"))
  );
});

test("a runtime entry whose target file is gone is refused", async () => {
  const result = await checkRuntimeExemptions({
    root: ROOT,
    registry: registry({
      exemptions: [runtimeEntry({ target: "open-sse/gone.ts#KNOWN_MODEL_IDS" })],
    }),
    declarations: declaration(),
    proofRunner: green,
  });
  assert.ok(result.errors.some((e) => /target.*gone\.ts|gone\.ts.*target/.test(e)));
});

test("a runtime entry without a red-proof field is refused by field name", async () => {
  const proof = { test: PROOF_TEST, neutralValue: "new Set()" };
  const result = await checkRuntimeExemptions({
    root: ROOT,
    registry: registry({ exemptions: [runtimeEntry({ redProof: proof })] }),
    declarations: declaration(),
    proofRunner: green,
  });
  assert.ok(result.errors.some((e) => e.includes("case")));
});

test("a REVIEW-DUE line for a runtime entry is translated and counted in due", async () => {
  const result = await checkRuntimeExemptions({
    root: ROOT,
    registry: registry({ exemptions: [runtimeEntry()] }),
    declarations: declaration(),
    proofRunner: green,
    now: "2026-11-19",
    warnings: [
      "REVIEW-DUE check:gate-manifest/KNOWN_MODEL_IDS: last reviewed v3.8.53 (2026-11-19)",
    ],
  });
  assert.deepEqual(result.errors, []);
  assert.ok(
    result.warnings.includes(
      "Review due check:gate-manifest/KNOWN_MODEL_IDS: last reviewed v3.8.53 (2026-11-19)"
    )
  );
  assert.ok(!result.warnings.some((w) => w.startsWith("REVIEW-DUE ")));
  assert.match(result.summary.exemptionsRuntime, /1 due for review/);
});

test("a REVIEW-DUE line for a non-runtime entry is left to the registry gate", async () => {
  const warning =
    "REVIEW-DUE check:gate-manifest/KNOWN_VALIDATION: last reviewed v3.8.53 (2026-11-19)";
  const result = await checkRuntimeExemptions({
    root: ROOT,
    registry: registry({ exemptions: [runtimeEntry()] }),
    declarations: declaration(),
    proofRunner: green,
    warnings: [warning],
  });
  assert.ok(result.warnings.includes(warning));
  assert.match(result.summary.exemptionsRuntime, /0 due for review/);
});

test("a proof that stays green is REMOVABLE and blocking", async () => {
  const result = await checkRuntimeExemptions({
    root: ROOT,
    registry: registry({ exemptions: [runtimeEntry()] }),
    declarations: declaration(),
    proofRunner: red,
    now: "2026-11-19",
  });
  assert.ok(result.errors.some((e) => e.includes("REMOVABLE")));
  assert.ok(result.warnings.some((w) => w.startsWith("REMOVABLE ")));
});

test("a proof that fails under neutralization passes", async () => {
  const result = await checkRuntimeExemptions({
    root: ROOT,
    registry: registry({ exemptions: [runtimeEntry()] }),
    declarations: declaration(),
    proofRunner: green,
  });
  assert.deepEqual(result.errors, []);
  assert.ok(!result.warnings.some((w) => w.startsWith("REMOVABLE ")));
});

test("the shared summary line is rendered in English", () => {
  assert.equal(
    formatExemptionSummary({ declared: 65, absences: 0, missing: 0, due: 2 }),
    "exemptions runtime: 65 declared, 0 undeclared, 0 missing red proofs, 2 due for review"
  );
});
