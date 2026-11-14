// Two dashboards (or an undo racing a drag) that reorder combos at once used to overwrite each
// other: the last POST won, with no sign to the loser. A reorder that carries the revision it
// was based on is now rejected with 409 when the order changed in between.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-reorder-rev-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const route = await import("../../src/app/api/combos/reorder/route.ts");

const post = (body: Record<string, unknown>) =>
  route.POST(
    new Request("http://localhost/api/combos/reorder", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  );
const getRevision = async () =>
  (await (await route.GET(new Request("http://localhost/api/combos/reorder"))).json()).revision;
const names = async () => (await combosDb.getCombos()).map((c: { name: string }) => c.name);

let ids: string[] = [];

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  ids = [];
  for (const name of ["a", "b", "c"]) {
    const combo = await combosDb.createCombo({
      name,
      models: [{ provider: "openai", model: "gpt-4.1" }],
    });
    ids.push(String(combo.id));
  }
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a reorder based on a stale revision is rejected with 409 and changes nothing", async () => {
  const response = await post({ comboIds: [ids[2], ids[1], ids[0]], revision: "stale" });
  assert.equal(response.status, 409);
  assert.deepEqual(await names(), ["a", "b", "c"]);
});

test("a reorder with the current revision applies and returns the next revision", async () => {
  const before = await getRevision();
  assert.equal(typeof before, "string");
  const response = await post({ comboIds: [ids[1], ids[0], ids[2]], revision: before });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.notEqual(body.revision, before);
  assert.equal(body.revision, await getRevision());
  assert.deepEqual(await names(), ["b", "a", "c"]);
});

test("two writers holding the same revision: the first wins, the second gets 409 with the new revision", async () => {
  const shared = await getRevision();
  const first = await post({ comboIds: [ids[1], ids[0], ids[2]], revision: shared });
  const second = await post({ comboIds: [ids[2], ids[1], ids[0]], revision: shared });
  assert.equal(first.status, 200);
  assert.equal(second.status, 409);
  assert.equal((await second.json()).revision, await getRevision());
  assert.deepEqual(await names(), ["b", "a", "c"]);
});

test("a reorder without a revision keeps working for older clients", async () => {
  const response = await post({ comboIds: [ids[2], ids[1], ids[0]] });
  assert.equal(response.status, 200);
  assert.deepEqual(await names(), ["c", "b", "a"]);
});

test("a revision that is not a string is a 400", async () => {
  assert.equal((await post({ comboIds: [ids[0]], revision: 7 })).status, 400);
});

test("two concurrent writers with the same revision: exactly one wins", async () => {
  const shared = await getRevision();
  const results = await Promise.all([
    post({ comboIds: [ids[1], ids[0], ids[2]], revision: shared }),
    post({ comboIds: [ids[2], ids[1], ids[0]], revision: shared }),
    post({ comboIds: [ids[0], ids[2], ids[1]], revision: shared }),
  ]);
  assert.deepEqual(results.map((r) => r.status).sort(), [200, 409, 409]);
});
