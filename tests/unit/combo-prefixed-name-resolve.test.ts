import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Client-namespaced combo names (`<client-namespace>/<combo>`).
//
// Some clients (OpenCode, multi-proxy configs) register an OmniRoute combo under their
// own provider key and then send `<that-key>/<comboName>`. Before this fix the combo
// resolver only matched the full string, so the combo was missed and the request fell
// through to provider inference with the namespace still attached.
//
// Owner decision: the namespace is stripped ONLY when it is not a known provider
// (registered id/alias, manual alias, or a custom compatible-node prefix/id). An explicit
// `provider/model` pin keeps going straight to that provider even when a combo with the
// same bare name exists — combos named like a bare model id are the documented per-model
// fallback mechanism (#6940 / #8530) and must not hijack explicit provider pins.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-prefixed-name-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const sseModelService = await import("../../src/sse/services/model.ts");

type ComboLike = { name: string; models: unknown[] };

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedCombo(name: string, model = "llama-3.1-8b-instant") {
  return combosDb.createCombo({ name, models: [{ provider: "groq", model }] });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("client namespace that is not a provider resolves to the combo by its bare name", async () => {
  await seedCombo("lordx.1");

  const resolved = (await sseModelService.getCombo("my-client/lordx.1")) as ComboLike | null;
  assert.ok(resolved, "expected my-client/lordx.1 to resolve to the lordx.1 combo");
  assert.equal(resolved.name, "lordx.1");

  const viaForModel = (await sseModelService.getComboForModel(
    "my-client/lordx.1"
  )) as ComboLike | null;
  assert.equal(viaForModel?.name, "lordx.1");
});

test("multi-segment client namespace resolves using the segment after the last slash", async () => {
  await seedCombo("my-combo");

  const resolved = (await sseModelService.getCombo("my-proxy/team-a/my-combo")) as ComboLike | null;
  assert.equal(resolved?.name, "my-combo");
});

test("bare-name fallback is case-insensitive like the unprefixed path (#4446)", async () => {
  await seedCombo("MASTER-LIGHT");

  const resolved = (await sseModelService.getCombo(
    "opencode-omniroute/master-light"
  )) as ComboLike | null;
  assert.equal(resolved?.name, "MASTER-LIGHT");
});

test("exact full-name match wins over the bare-name fallback", async () => {
  await seedCombo("x/y", "llama-3.3-70b-versatile");
  await seedCombo("y");

  const resolved = (await sseModelService.getCombo("x/y")) as ComboLike | null;
  assert.equal(resolved?.name, "x/y");
});

test("known provider id keeps an explicit provider/model pin even with a homonymous combo", async () => {
  await seedCombo("gpt-5.5");

  assert.equal(await sseModelService.getCombo("openai/gpt-5.5"), null);
  assert.equal(await sseModelService.getComboForModel("openai/gpt-5.5"), null);
  // The bare name still resolves to the combo (documented #6940 mechanism).
  assert.equal(((await sseModelService.getCombo("gpt-5.5")) as ComboLike | null)?.name, "gpt-5.5");
});

test("known provider id (openrouter) is never stripped to reach a combo", async () => {
  await seedCombo("lordx.1");

  assert.equal(await sseModelService.getCombo("openrouter/lordx.1"), null);
});

test("known provider aliases (registry alias and manual alias) keep the provider pin", async () => {
  await seedCombo("gpt-5.5");
  await seedCombo("mimo-v2-flash");

  // `cx` is the registry alias of codex; `xiaomi` is a manual alias → xiaomi-mimo.
  assert.equal(await sseModelService.getCombo("cx/gpt-5.5"), null);
  assert.equal(await sseModelService.getCombo("xiaomi/mimo-v2-flash"), null);
});

test("known provider prefix is matched case-insensitively for the guard", async () => {
  await seedCombo("gpt-5.5");

  assert.equal(await sseModelService.getCombo("OpenAI/gpt-5.5"), null);
});

test("custom compatible-node prefix and node id keep routing to the node", async () => {
  const node = (await providersDb.createProviderNode({
    type: "openai-compatible",
    name: "My Gateway",
    prefix: "mygw",
    baseUrl: "https://gateway.example.com/v1",
  })) as { id: string };
  await seedCombo("some-model");

  assert.equal(await sseModelService.getCombo("mygw/some-model"), null);
  assert.equal(await sseModelService.getCombo(`${node.id}/some-model`), null);
});

test("catalogued slash-bearing model id is not re-read as <namespace>/<combo>", async () => {
  // `z-ai/glm-5.2` is a verbatim catalog id (its `z-ai` segment is not a provider id).
  await seedCombo("glm-5.2");

  assert.equal(await sseModelService.getCombo("z-ai/glm-5.2"), null);
});

test("provider pin nested under a client namespace is not stripped", async () => {
  await seedCombo("gpt-5.5");

  assert.equal(await sseModelService.getCombo("my-client/openai/gpt-5.5"), null);
});

test("no matching combo under a client namespace returns null", async () => {
  await seedCombo("lordx.1");

  assert.equal(await sseModelService.getCombo("my-client/nonexistent"), null);
  assert.equal(await sseModelService.getCombo("my-client/"), null);
});

test("combo/<name> prefix behaviour is unchanged", async () => {
  await seedCombo("lordx.1");

  const resolved = (await sseModelService.getCombo("combo/lordx.1")) as ComboLike | null;
  assert.equal(resolved?.name, "lordx.1");
  assert.equal(await sseModelService.getCombo("combo/missing"), null);
});
