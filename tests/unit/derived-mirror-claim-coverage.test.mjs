import assert from "node:assert/strict";
import test from "node:test";
import { propagateChangesToMirror } from "../../scripts/release/lib/derived-mirrors.mjs";

const source = "Database: 240 migrations. Census: 240 Dependabot PRs.\n";
const change = {
  label: "DB migrations count",
  claimId: "database-migrations",
  from: "240",
  to: "241",
  index: 10,
};

for (const digits of [
  { from: "240", to: "241" },
  { from: "۲۴۰", to: "۲۴۱" },
]) {
  test(`claimed mirror: a located migration preserves the unrelated census (${digits.from})`, () => {
    const planned = `Banco: ${digits.to} migrações. Censo: 240 PRs Dependabot.\n`;
    const result = propagateChangesToMirror({
      sourceBefore: source,
      changes: [change],
      mirrorText: planned,
      alreadyApplied: [
        { label: "DB migrations count (README mirrors)", claimId: change.claimId, ...digits },
      ],
    });
    assert.deepEqual(result.manual, []);
    assert.equal(result.content, planned);
    assert.equal(result.replaced, 0);
  });
}

for (const claimId of [undefined, "unrelated-count"]) {
  test(`claimed mirror: equal numbers without matching claim identity remain manual (${claimId})`, () => {
    const planned = "Banco: 241 migrações. Censo: 240 PRs Dependabot.\n";
    const result = propagateChangesToMirror({
      sourceBefore: source,
      changes: [change],
      mirrorText: planned,
      alreadyApplied: [{ from: "240", to: "241", claimId }],
    });
    assert.equal(result.manual.length, 1);
    assert.equal(result.content, planned);
  });
}

test("claimed mirror: partial and duplicate claim evidence cannot certify a complete rewrite", () => {
  const planned = "Banco: 241 migrações; 240 arquivos. Censo: 240 PRs Dependabot.\n";
  for (const alreadyApplied of [[{ ...change }], [{ ...change }, { ...change }, { ...change }]]) {
    const result = propagateChangesToMirror({
      sourceBefore: "Database: 240 migrations; 240 SQL files. Census: 240 Dependabot PRs.\n",
      changes: [change, { ...change, index: 26 }],
      mirrorText: planned,
      alreadyApplied,
    });
    assert.equal(result.manual.length, 1);
    assert.equal(result.content, planned);
  }
});
