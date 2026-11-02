import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "quota-alert-latch-route-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "test-quota-alert-latch-route";

const route = await import("../../src/app/api/settings/quota-alert-latch/route.ts");
const db = await import("../../src/lib/db/quotaAlertLatch.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

const URL_PATH = "http://localhost:20128/api/settings/quota-alert-latch";

function put(body: unknown) {
  return route.PUT(
    new Request(URL_PATH, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
}

test.beforeEach(() => {
  db.clearQuotaAlertLatch();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("GET returns the stored latch", async () => {
  db.setQuotaAlertLatch({ "conn-1:session": 10 });

  const response = await route.GET(new Request(URL_PATH));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { latch: { "conn-1:session": 10 } });
});

test("PUT replaces the latch, including with an empty one after a recovery", async () => {
  db.setQuotaAlertLatch({ "conn-1:session": 10 });

  const response = await put({ latch: {} });

  assert.equal(response.status, 200);
  assert.deepEqual(db.getQuotaAlertLatch(), {});
});

test("PUT rejects malformed bodies and leaves the stored latch alone", async () => {
  db.setQuotaAlertLatch({ "conn-1:session": 10 });

  assert.equal((await put("{not json")).status, 400);
  assert.equal((await put({ latch: { key: "not-a-number" } })).status, 400);
  assert.equal((await put({ latch: { ["x".repeat(201)]: 1 } })).status, 400);

  assert.deepEqual(db.getQuotaAlertLatch(), { "conn-1:session": 10 });
});

test("PUT rejects a latch above the entry cap", async () => {
  const latch = Object.fromEntries(Array.from({ length: 5001 }, (_, i) => [`k${i}`, 1]));

  assert.equal((await put({ latch })).status, 400);
  assert.deepEqual(db.getQuotaAlertLatch(), {});
});

test("DELETE clears the latch", async () => {
  db.setQuotaAlertLatch({ "conn-1:session": 10 });

  const response = await route.DELETE(new Request(URL_PATH, { method: "DELETE" }));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { latch: {} });
  assert.deepEqual(db.getQuotaAlertLatch(), {});
});

test("every method requires management auth once login is on", async () => {
  await settingsDb.updateSettings({ requireLogin: true, password: "not-a-real-hash" } as never);
  try {
    assert.equal((await route.GET(new Request(URL_PATH))).status, 401);
    assert.equal((await put({ latch: {} })).status, 401);
    assert.equal((await route.DELETE(new Request(URL_PATH, { method: "DELETE" }))).status, 401);
  } finally {
    await settingsDb.updateSettings({ requireLogin: false, password: null } as never);
  }
});

test("errors never echo internals", async () => {
  const response = await put({ latch: { key: "not-a-number" } });
  const text = JSON.stringify(await response.json());

  assert.equal(text.includes("at "), false);
  assert.equal(text.includes("stack"), false);
});
