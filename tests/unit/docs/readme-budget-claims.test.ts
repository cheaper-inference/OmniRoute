import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { CURRENT_DOC_COUNTS } from "../../../scripts/docs/lib/read-count-facts.ts";
import { planDocumentCounts } from "../../../scripts/docs/lib/count-sync.mjs";
import { buildChecks } from "../../../scripts/check/check-docs-counts-sync.mjs";

const root = new URL("../../../", import.meta.url);
const registry = JSON.parse(
  fs.readFileSync(new URL("scripts/docs/lib/count-claims.json", root), "utf8")
);
const documents = registry.documents.filter(
  (doc: { path: string }) =>
    doc.path === "README.md" || /^docs\/i18n\/[^/]+\/README\.md$/.test(doc.path)
);
const required = ["catalogEntries", "freePools", "gatedMillions"];

function budgetDocument(doc: (typeof documents)[number]) {
  const groups = doc.groups.filter(
    (group: { parts: string[]; claims: { fact: string }[] }) =>
      group.parts[0].startsWith(">") &&
      group.parts.join("").includes("`/dashboard/free-tiers`") &&
      group.claims.some((claim) => claim.fact === "catalogEntries")
  );
  assert.equal(groups.length, 1, `one budget introduction: ${doc.path}`);
  return { ...doc, groups };
}

test("every README budget introduction binds its three independently measured amounts", () => {
  assert.equal(documents.length, 67);
  for (const doc of documents) {
    const [group] = budgetDocument(doc).groups;
    assert.deepEqual(
      group.claims.map((claim: { fact: string }) => claim.fact).sort(),
      required,
      doc.path
    );
  }
});

test("budget updates preserve other prose and a missing gated allowance is rejected", () => {
  const changed = {
    ...CURRENT_DOC_COUNTS,
    catalogEntries: CURRENT_DOC_COUNTS.catalogEntries + 1,
    freePools: CURRENT_DOC_COUNTS.freePools + 1,
    gatedMillions: String(Number(CURRENT_DOC_COUNTS.gatedMillions) + 1),
  };
  for (const row of documents) {
    const doc = budgetDocument(row);
    const content = fs.readFileSync(new URL(doc.path, root), "utf8");
    const current = planDocumentCounts(doc, content, CURRENT_DOC_COUNTS);
    assert.equal(current.operations.length, 0, row.path);
    const result = planDocumentCounts(doc, content, changed);
    assert.equal(result.operations.length, 3, row.path);
    assert.deepEqual(result.operations.map((op: { fact: string }) => op.fact).sort(), required);
    let reversed = result.after;
    let shift = result.operations.reduce(
      (sum: number, op: { before: string; after: string }) =>
        sum + op.after.length - op.before.length,
      0
    );
    for (const op of [...result.operations].reverse()) {
      shift -= op.after.length - op.before.length;
      const start = op.start + shift;
      reversed = reversed.slice(0, start) + op.before + reversed.slice(start + op.after.length);
    }
    assert.equal(reversed, content, row.path);
    const gated = result.operations.find((op: { fact: string }) => op.fact === "gatedMillions");
    assert.ok(gated, row.path);
    const missing = content.slice(0, gated.start) + content.slice(gated.end);
    assert.throws(
      () => planDocumentCounts(doc, missing, CURRENT_DOC_COUNTS),
      /COUNT_ANCHOR_MISSING/
    );
  }
});

test("the real CI fact collector supplies the same budget facts as the updater", () => {
  const check = buildChecks().find((row) => row.label === "Managed documentation numeric units");
  assert.ok(check?.validate, "the real collector must produce the blocking managed check");
  for (const row of documents) {
    const content = fs.readFileSync(new URL(row.path, root), "utf8");
    assert.equal(check.validate(content, row.path).ok, true, row.path);
    const drifted = planDocumentCounts(budgetDocument(row), content, {
      ...CURRENT_DOC_COUNTS,
      gatedMillions: String(Number(CURRENT_DOC_COUNTS.gatedMillions) + 1),
    });
    assert.equal(drifted.operations.length, 1, row.path);
    assert.equal(check.validate(drifted.after, row.path).ok, false, row.path);
  }
});
