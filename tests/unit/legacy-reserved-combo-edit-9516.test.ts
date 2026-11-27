import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const originalDataDir = process.env.DATA_DIR;
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-legacy-reserved-combo-9516-"));
process.env.DATA_DIR = dataDir;

const { resetDbInstance } = await import("@/lib/db/core");
const { createCombo, getComboById } = await import("@/lib/db/combos");
const { updateSettings } = await import("@/lib/db/settings");
const { POST } = await import("@/app/api/combos/route");
const { PUT } = await import("@/app/api/combos/[id]/route");

const models = ["openai/gpt-4o-mini"];
const reservedMessage =
  "auto and names starting with auto/ are reserved for the built-in automatic routes";

test.before(async () => {
  await updateSettings({ requireLogin: false });
});

test.after(() => {
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

async function seedCombo(name: string) {
  const combo = await createCombo({ name, models, strategy: "priority", isActive: true });
  assert.ok(typeof combo.id === "string");
  return combo.id;
}

function comboRequest(method: string, path: string, body: Record<string, unknown>) {
  return new Request(`http://localhost/api/combos${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function putCombo(id: string, body: Record<string, unknown>) {
  return PUT(comboRequest("PUT", `/${id}`, body), { params: Promise.resolve({ id }) });
}

test("PUT can disable and re-enable a legacy reserved combo without sending its name", async () => {
  const id = await seedCombo("auto/fast");

  for (const isActive of [false, true]) {
    const response = await putCombo(id, { isActive });
    assert.equal(response.status, 200, await response.text());
    const stored = await getComboById(id);
    assert.equal(stored?.name, "auto/fast");
    assert.equal(stored?.isActive, isActive);
  }
});

test("PUT can edit a legacy reserved combo when its submitted name stays the same after trimming", async () => {
  const id = await seedCombo("auto/steady");

  for (const name of ["auto/steady", " auto/steady "]) {
    const description = `Updated from "${name}"`;
    const response = await putCombo(id, { name, description });
    assert.equal(response.status, 200, await response.text());
    const stored = await getComboById(id);
    assert.equal(stored?.name, "auto/steady");
    assert.equal(stored?.description, description);
  }
});

test("PUT rejects renaming a normal combo to a reserved name", async () => {
  const id = await seedCombo("normal-route");

  for (const name of ["auto", " AUTO/x "]) {
    const response = await putCombo(id, { name });
    assert.equal(response.status, 400);
    const { error } = await response.json();
    assert.equal(error.code, "COMBO_002");
    assert.equal(error.details.firstField, "name");
    assert.equal(error.details.firstMessage, reservedMessage);
    assert.equal((await getComboById(id))?.name, "normal-route");
  }
});

test("POST still rejects a reserved combo name", async () => {
  const response = await POST(comboRequest("POST", "", { name: "auto", models }));
  assert.equal(response.status, 400);
  const { error } = await response.json();
  assert.deepEqual(error.details[0], { field: "name", message: reservedMessage });
});

test("PUT can rename a legacy reserved combo to a valid name", async () => {
  const id = await seedCombo("auto/rename");

  const response = await putCombo(id, { name: "fast-route" });
  assert.equal(response.status, 200, await response.text());
  assert.equal((await getComboById(id))?.name, "fast-route");
});
