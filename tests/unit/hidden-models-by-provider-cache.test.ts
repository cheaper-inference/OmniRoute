import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hidden-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "hidden-models-cache-test-secret";

const models = await import("../../src/lib/db/models.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");

const { setModelIsHidden, getHiddenModelsByProvider, addCustomModel, removeCustomModel } = models;
const realNow = Date.now;

// Count the SELECTs that read the hidden-model namespaces.
const db = getDbInstance();
const realPrepare = db.prepare.bind(db);
let hiddenReads = 0;
(db as { prepare: unknown }).prepare = (sql: string) => {
  if (/SELECT/i.test(sql) && /modelCompatOverrides/.test(sql)) hiddenReads++;
  return realPrepare(sql);
};

test.afterEach(() => {
  Date.now = realNow;
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("repeated calls read key_value once, not once per call", () => {
  setModelIsHidden("openai", "gpt-hidden-a", true);
  getHiddenModelsByProvider("chat");
  const before = hiddenReads;
  for (let i = 0; i < 50; i++) getHiddenModelsByProvider("chat");
  assert.equal(hiddenReads - before, 0, "50 repeat calls must be served from the cache");
});

test("hide and show writes show up on the very next read (compat override path)", () => {
  assert.equal(
    getHiddenModelsByProvider("chat").get("openai")?.has("gpt-hidden-b") ?? false,
    false
  );
  setModelIsHidden("openai", "gpt-hidden-b", true);
  assert.equal(getHiddenModelsByProvider("chat").get("openai")?.has("gpt-hidden-b"), true);
  setModelIsHidden("openai", "gpt-hidden-b", false);
  assert.equal(
    getHiddenModelsByProvider("chat").get("openai")?.has("gpt-hidden-b") ?? false,
    false
  );
});

test("hide and show writes show up on the very next read (custom model path)", async () => {
  await addCustomModel("custom-prov", "cm-1", "CM 1");
  assert.equal(getHiddenModelsByProvider("chat").get("custom-prov")?.has("cm-1") ?? false, false);
  setModelIsHidden("custom-prov", "cm-1", true);
  assert.equal(getHiddenModelsByProvider("chat").get("custom-prov")?.has("cm-1"), true);
  await removeCustomModel("custom-prov", "cm-1");
  assert.equal(getHiddenModelsByProvider("chat").get("custom-prov")?.has("cm-1") ?? false, false);
});

test("modalities are cached separately", () => {
  setModelIsHidden("codex", "shared-id", true, "chat");
  assert.equal(getHiddenModelsByProvider("chat").get("codex")?.has("shared-id"), true);
  assert.equal(getHiddenModelsByProvider("images").get("codex")?.has("shared-id") ?? false, false);
});

test("callers may mutate the returned map without corrupting later reads", () => {
  setModelIsHidden("openai", "gpt-hidden-c", true);
  const first = getHiddenModelsByProvider("chat");
  first.get("openai")?.add("injected-model");
  first.set("injected-provider", new Set(["x"]));
  first.delete("openai");
  const second = getHiddenModelsByProvider("chat");
  assert.equal(second.get("openai")?.has("injected-model") ?? false, false);
  assert.equal(second.has("injected-provider"), false);
  assert.equal(second.get("openai")?.has("gpt-hidden-c"), true);
});

test("a write that bypasses the invalidation signal is picked up after the 5s TTL", () => {
  getHiddenModelsByProvider("chat");
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('modelCompatOverrides', 'raw-prov', ?)"
  ).run(JSON.stringify([{ id: "raw-model", isHidden: true }]));
  const start = realNow();
  Date.now = () => start + 6_000;
  assert.equal(getHiddenModelsByProvider("chat").get("raw-prov")?.has("raw-model"), true);
});
