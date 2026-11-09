import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import * as factsModule from "../../../scripts/docs/lib/count-facts.mjs";
import {
  planCountSync,
  planDocumentCounts,
  spellCount,
  validateCountRegistry,
} from "../../../scripts/docs/lib/count-sync.mjs";
import { contentHash } from "../../../scripts/docs/lib/count-state.mjs";

const fixture = JSON.parse(
  fs.readFileSync(new URL("../../fixtures/docs/readme-model-claims.json", import.meta.url), "utf8")
);
const inventory = () => [
  { id: "one", alias: "a", modelIds: ["shared", "x", "x"] },
  { id: "duplicate-alias", alias: "a", modelIds: ["ignored"] },
  { id: "two", modelIds: ["shared", "z"] },
  { id: "empty", modelIds: [] },
];
const modelFacts = () => factsModule.measureChatModelCounts(inventory());
// Text and bindings belong to the same historical fixture. Live documentation
// is checked separately by check:docs-counts against the current registry.
const selectedDoc = (path) => {
  const row = fixture.rows.find((item) => item.path === path);
  assert.ok(row?.countDocument, `historical bindings for ${path}`);
  return structuredClone(row.countDocument);
};
const miniRegistry = (paths) => ({
  version: 1,
  documents: paths.map(selectedDoc),
  families: ["README.md"],
  generated: [],
});

test("model facts distinguish namespaces pairs raw IDs and duplicate declared rows", () => {
  assert.deepEqual(modelFacts(), {
    chatNamespaces: 2,
    distinctProviderModelPairs: 4,
    uniqueRawModelIds: 3,
  });
  const changed = inventory();
  changed[2].modelIds.push("new");
  assert.deepEqual(factsModule.measureChatModelCounts(changed), {
    chatNamespaces: 2,
    distinctProviderModelPairs: 5,
    uniqueRawModelIds: 4,
  });
  for (const malformed of [
    [],
    [{ id: "x", modelIds: [null] }],
    [{ id: "x", alias: "__proto__", modelIds: ["x"] }],
  ])
    assert.throws(() => factsModule.measureChatModelCounts(malformed));
});

test("all 67 real README claim fixtures update four numbers and preserve every other byte", () => {
  assert.equal(fixture.version, 2);
  assert.equal(fixture.rows.length, 67);
  const paths = fixture.rows.map((row) => row.path);
  validateCountRegistry(miniRegistry(paths));
  for (const row of fixture.rows) {
    const facts = { ...row.existingFacts, ...modelFacts() };
    const doc = selectedDoc(row.path);
    const result = planDocumentCounts(doc, row.text, facts);
    assert.equal(result.operations.length, 4, row.path);
    let reversed = result.after;
    let shift = result.operations.reduce((sum, op) => sum + op.after.length - op.before.length, 0);
    for (const op of [...result.operations].reverse()) {
      shift -= op.after.length - op.before.length;
      const at = op.start + shift;
      assert.equal(reversed.slice(at, at + op.after.length), op.after, row.path);
      reversed = reversed.slice(0, at) + op.before + reversed.slice(at + op.after.length);
    }
    assert.equal(reversed, row.text, row.path);
    assert.equal(planDocumentCounts(doc, result.after, facts).operations.length, 0, row.path);
    const beforeTable = row.text.split("\n")[0].split("|");
    const afterTable = result.after.split("\n")[0].split("|");
    assert.deepEqual(
      afterTable.slice(0, 4),
      beforeTable.slice(0, 4),
      "historical columns stay literal"
    );
  }
});

test("grouped integer formats are explicit preserve digit script and reject malformed samples", () => {
  for (const [format, separator] of [
    ["grouped-comma", ","],
    ["grouped-dot", "."],
    ["grouped-space", " "],
  ]) {
    assert.equal(
      spellCount(1234567, `1${separator}234`, "uniqueRawModelIds", format),
      `1${separator}234${separator}567`
    );
    assert.equal(spellCount(4, `1${separator}234`, "uniqueRawModelIds", format), "4");
    assert.throws(
      () => spellCount(4, `12${separator}34`, "uniqueRawModelIds", format),
      /INTEGER_FORMAT/
    );
  }
  assert.equal(spellCount(1234, "৯৯৯", "uniqueRawModelIds", "grouped-comma"), "১,২৩৪");
  assert.throws(() => spellCount(4, "1,234", "uniqueRawModelIds"), /INTEGER_FORMAT/);
  assert.throws(() => spellCount(4, "1 234", "uniqueRawModelIds"), /INTEGER_FORMAT/);
  assert.throws(
    () => spellCount(4, "1.234", "uniqueRawModelIds", "grouped-comma"),
    /INTEGER_FORMAT/
  );
  assert.throws(
    () => spellCount(4, "1\t234", "uniqueRawModelIds", "grouped-space"),
    /INTEGER_FORMAT/
  );
  assert.throws(() => spellCount(4, "1,২৩৪", "uniqueRawModelIds", "grouped-comma"), /MIXED_DIGIT/);
  assert.throws(() => spellCount(4, "1234", "uniqueRawModelIds", "unknown"), /NUMBER_FORMAT/);
  assert.throws(
    () => spellCount(Number.MAX_SAFE_INTEGER + 1, "1234", "uniqueRawModelIds"),
    /INVALID_FACT/
  );
});

test("missing mirrored bindings missing facts and ambiguous claims fail closed", () => {
  const paths = ["README.md", "docs/i18n/pt-BR/README.md"];
  const untouchedRegistry = JSON.stringify(fixture);
  const input = miniRegistry(paths);
  const target = input.documents[1];
  // Missing semantic binding must stay structurally valid.
  target.groups = target.groups.filter((group) => !group.parts[0].startsWith("| 🧠"));
  assert.throws(() => validateCountRegistry(input), /MODEL_BINDINGS/);
  // A malformed empty group is a distinct structural failure.
  const malformed = miniRegistry(paths);
  malformed.documents[1].groups.find((group) => group.parts[0].startsWith("| 🧠")).claims.pop();
  assert.throws(() => validateCountRegistry(malformed), /COUNT_REGISTRY_GROUP/);
  assert.equal(JSON.stringify(fixture), untouchedRegistry);
  const missingFact = miniRegistry(paths);
  const row = fixture.rows.find((item) => item.path === paths[0]);
  assert.throws(
    () => planDocumentCounts(missingFact.documents[0], row.text, row.existingFacts),
    /FACT_UNAVAILABLE/
  );
  assert.throws(
    () =>
      planDocumentCounts(missingFact.documents[0], row.text.repeat(2), {
        ...row.existingFacts,
        ...modelFacts(),
      }),
    /ANCHOR_AMBIGUOUS/
  );
  const removed = miniRegistry(paths);
  removed.documents[1].groups.find((group) =>
    group.claims.some((claim) => claim.fact === "chatNamespaces")
  ).claims = removed.documents[1].groups
    .find((group) => group.claims.some((claim) => claim.fact === "chatNamespaces"))
    .claims.filter((claim) => claim.fact !== "chatNamespaces");
  assert.throws(() => validateCountRegistry(removed), /MODEL_BINDINGS/);
  assert.equal(JSON.stringify(fixture), untouchedRegistry);
  assert.doesNotThrow(() => validateCountRegistry(miniRegistry(paths)));
});

function stateFixture() {
  const source = fixture.rows.find((row) => row.path === "README.md");
  const target = fixture.rows.find((row) => row.path === "docs/i18n/pt-BR/README.md");
  const sourceHash = contentHash(source.text);
  const state = {
    sources: {
      "README.md": {
        source_hash: sourceHash,
        locales: {
          "pt-BR": {
            source_hash: sourceHash,
            target_hash: contentHash(target.text),
            updated_at: "2020-01-01",
          },
        },
      },
    },
  };
  return {
    registry: miniRegistry([source.path, target.path]),
    facts: { ...source.existingFacts, ...modelFacts() },
    locales: ["pt-BR"],
    files: new Map([
      [source.path, source.text],
      [target.path, target.text],
      [".i18n-state.json", JSON.stringify(state)],
    ]),
  };
}

test("numeric-only reconciliation requires exact preimages and updates both README surfaces", () => {
  const input = stateFixture();
  const plan = planCountSync(input);
  assert.equal(plan.changes.filter((change) => change.kind === "numeric").length, 2);
  assert.equal(
    plan.changes
      .filter((change) => change.kind === "numeric")
      .reduce((sum, change) => sum + change.operations.length, 0),
    8
  );
  assert.ok(plan.stateLeaves.length > 0);
  assert.ok(plan.stateLeaves.every((leaf) => leaf.pointer.at(-1) !== "updated_at"));
});

test("unmanaged English prose drift cannot gain provenance through a numeric rewrite", () => {
  const input = stateFixture();
  input.files.set(
    "README.md",
    input.files.get("README.md") + "\nUnreviewed English explanation.\n"
  );
  const beforeState = input.files.get(".i18n-state.json");
  assert.throws(() => planCountSync(input), /STATE_SOURCE_PREIMAGE/);
  const held = planCountSync({ ...input, preserveState: true });
  assert.equal(held.stateReviewRequired, true);
  assert.equal(held.stateLeaves.length, 0);
  assert.equal(input.files.get(".i18n-state.json"), beforeState);
  assert.ok(!held.changes.some((change) => change.path === ".i18n-state.json"));
});

test("matching new numbers do not certify stale prose or invent translation state", () => {
  const input = stateFixture();
  const beforeState = input.files.get(".i18n-state.json");
  for (const doc of input.registry.documents)
    input.files.set(
      doc.path,
      planDocumentCounts(doc, input.files.get(doc.path), input.facts).after
    );
  input.files.set(
    "README.md",
    input.files.get("README.md") + "\nUnreviewed English explanation.\n"
  );
  const plan = planCountSync(input);
  assert.equal(plan.changes.length, 0);
  assert.equal(plan.stateLeaves.length, 0);
  assert.equal(input.files.get(".i18n-state.json"), beforeState);
  const state = JSON.parse(beforeState);
  assert.notEqual(
    state.sources["README.md"].source_hash,
    contentHash(input.files.get("README.md"))
  );
});
