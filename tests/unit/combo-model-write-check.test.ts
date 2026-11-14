import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-write-check-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const createRoute = await import("../../src/app/api/combos/route.ts");
const comboRoute = await import("../../src/app/api/combos/[id]/route.ts");

const FLAG = "OMNIROUTE_COMBO_MODEL_WRITE_CHECK";
const originalFlag = process.env[FLAG];
interface ErrorBody {
  error: { code: string; details: { reasonCode: string; models: string[] } };
}

const GOOD = { providerId: "openai", model: "gpt-4o-mini" };
const BAD = { model: "totally-unknown-model" };

function post(body: Record<string, unknown>, query = "") {
  return createRoute.POST(
    new Request(`http://localhost/api/combos${query}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

function put(id: string, body: Record<string, unknown>, query = "") {
  return comboRoute.PUT(
    new Request(`http://localhost/api/combos/${id}${query}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
    { params: Promise.resolve({ id }) }
  );
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env[FLAG];
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = originalFlag;
});

test("default: a combo with an unknown model is still saved", async () => {
  const response = await post({ name: "typo-default", strategy: "priority", models: [GOOD, BAD] });
  assert.equal(response.status, 201);
});

test("flag on: POST rejects an unknown model with a reason code and names it", async () => {
  process.env[FLAG] = "1";
  const response = await post({ name: "typo-on", strategy: "priority", models: [GOOD, BAD] });
  const body = (await response.json()) as ErrorBody;
  assert.equal(response.status, 400);
  assert.equal(body.error.code, "COMBO_002");
  assert.equal(body.error.details.reasonCode, "model_not_found");
  assert.deepEqual(body.error.details.models, ["totally-unknown-model"]);
  assert.equal(await combosDb.getComboByName("typo-on"), null);
});

test("flag on: a resolvable model is saved and ?force=true saves an unknown one", async () => {
  process.env[FLAG] = "1";
  const ok = await post({ name: "typo-good", strategy: "priority", models: [GOOD] });
  assert.equal(ok.status, 201);
  const forced = await post(
    { name: "typo-forced", strategy: "priority", models: [GOOD, BAD] },
    "?force=true"
  );
  assert.equal(forced.status, 201);
});

test("flag on: PUT rejects an unknown model and leaves the stored combo unchanged", async () => {
  process.env[FLAG] = "1";
  const combo = await combosDb.createCombo({ name: "typo-put", models: [GOOD] });
  const response = await put(combo.id, { models: [GOOD, BAD] });
  const body = (await response.json()) as ErrorBody;
  assert.equal(response.status, 400);
  assert.equal(body.error.details.reasonCode, "model_not_found");
  const stored = await combosDb.getComboById(combo.id);
  assert.equal((stored as { models: unknown[] }).models.length, 1);
});

test("flag on: a nested combo reference and a wildcard step are not checked", async () => {
  process.env[FLAG] = "1";
  await combosDb.createCombo({ name: "inner-combo", models: [GOOD] });
  const response = await post({
    name: "typo-skip",
    strategy: "priority",
    models: [
      { kind: "combo-ref", comboName: "inner-combo" },
      { providerId: "openai", model: "*" },
    ],
  });
  assert.equal(response.status, 201);
});
