import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { managedCountChecks, planDocumentCounts } from "../../../scripts/docs/lib/count-sync.mjs";

test("canonical English claims reject four stale model numbers before any write", () => {
  const registry = JSON.parse(
    fs.readFileSync(new URL("../../../scripts/docs/lib/count-claims.json", import.meta.url), "utf8")
  );
  const fixture = JSON.parse(
    fs.readFileSync(
      new URL("../../fixtures/docs/readme-model-claims.json", import.meta.url),
      "utf8"
    )
  );
  const row = fixture.rows.find((item) => item.path === "README.md");
  const original = registry.documents.find((doc) => doc.path === row.path);
  const doc = {
    ...original,
    groups: original.groups.filter(
      (group) =>
        (group.claims.some((claim) => claim.fact === "catalogMarkedFree") &&
          group.claims.some((claim) => claim.fact === "catalogEntries")) ||
        group.parts[0].startsWith("| 🧠")
    ),
  };
  // Expected counts are derived from a small independent catalog, never a
  // production baseline or the historical snapshot's aggregate numbers.
  const namespaces = new Map([
    ["a", ["shared", "x", "x"]],
    ["b", ["shared", "z"]],
  ]);
  const facts = {
    ...row.existingFacts,
    chatNamespaces: namespaces.size,
    distinctProviderModelPairs: new Set(
      [...namespaces].flatMap(([name, ids]) => ids.map((id) => `${name}\0${id}`))
    ).size,
    uniqueRawModelIds: new Set([...namespaces.values()].flat()).size,
  };
  const result = planDocumentCounts(doc, row.text, facts);
  assert.equal(result.operations.length, 4, "all four public model claims must be managed");
  const [check] = managedCountChecks(
    { version: 1, documents: [doc], families: ["README.md"], generated: [] },
    facts
  );
  assert.equal(check.validate(row.text, row.path).ok, false);
  assert.equal(check.validate(result.after, row.path).ok, true);
});
