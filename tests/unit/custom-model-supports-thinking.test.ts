/**
 * Opt-in "Thinking capable" flag for custom models (self-hosted reasoning backends whose id and
 * discovery metadata do not say they reason). The flag is stored on the customModels row, set from
 * the add/edit form through /api/provider-models, and read back by the capability resolver. A model
 * that is not marked is unchanged.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-thinking-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const route = await import("../../src/app/api/provider-models/route.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");

const provider = "openai-compatible-chat-thinking";
const modelId = "selfhost-r1";
const send = (method: "POST" | "PUT", body: Record<string, unknown>) =>
  (method === "POST" ? route.POST : route.PUT)(
    new Request("http://localhost/api/provider-models", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, modelId, ...body }),
    })
  );
const storedRow = async () =>
  ((await models.getCustomModels(provider)) as Array<Record<string, unknown>>).find(
    (row) => row.id === modelId
  );

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("POST stores supportsThinking true; an add without the field stores no key", async () => {
  assert.equal((await send("POST", { supportsThinking: true })).status, 200);
  assert.equal((await storedRow())?.supportsThinking, true);

  await models.removeCustomModel(provider, modelId);
  assert.equal((await send("POST", {})).status, 200);
  assert.equal("supportsThinking" in ((await storedRow()) ?? {}), false);
});

test("dispatch metadata carries the stored flag for a compatible node and a built-in provider", async () => {
  for (const [target, prefix] of [
    [provider, null],
    ["openai", "openai"],
  ] as const) {
    await models.addCustomModel(
      target,
      "marked-r1",
      "marked-r1",
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      undefined,
      undefined,
      undefined,
      { supportsThinking: true }
    );
    await models.addCustomModel(target, "plain-r1", "plain-r1", "manual", "chat-completions", [
      "chat",
    ]);
    const lead = prefix ? `${prefix}/` : "";
    if (!prefix) {
      const providersDb = await import("../../src/lib/db/providers.ts");
      await providersDb.createProviderNode({
        id: provider,
        type: "openai-compatible",
        name: "Gw",
        prefix: "gw",
        baseUrl: "https://gw.example.com",
        chatPath: "/v1/chat/completions",
        modelsPath: "/v1/models",
      });
    }
    const addr = prefix ? lead : "gw/";
    const marked = (await getModelInfo(`${addr}marked-r1`)) as { supportsThinking?: boolean };
    const plain = (await getModelInfo(`${addr}plain-r1`)) as { supportsThinking?: boolean };
    assert.equal(marked.supportsThinking, true, `${target}: marked model must carry the flag`);
    assert.equal("supportsThinking" in plain, false, `${target}: unmarked model must be unchanged`);
  }
});

test("the flag is read from the custom row even when the request differs from the stored id by case", async () => {
  await models.addCustomModel(
    "openai",
    "Case-R1",
    "Case-R1",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    {},
    undefined,
    undefined,
    undefined,
    { supportsThinking: true }
  );

  const info = (await getModelInfo("openai/case-r1")) as { supportsThinking?: boolean };

  assert.equal(info.supportsThinking, true);
});

test("the capability resolver (reasoning routing, thinking budget) treats a marked model as thinking-capable", async () => {
  const add = (target: string, id: string, supportsThinking?: true) =>
    models.addCustomModel(
      target,
      id,
      id,
      "manual",
      "chat-completions",
      ["chat"],
      undefined,
      {},
      undefined,
      undefined,
      undefined,
      supportsThinking ? { supportsThinking } : undefined
    );
  await add(provider, "Marked-R1", true);
  await add(provider, "plain-r1");
  await add("openai", "marked-local-r1", true);

  const caps = (target: string, model: string) =>
    getResolvedModelCapabilities({ provider: target, model }).supportsThinking;

  assert.equal(caps(provider, "Marked-R1"), true);
  assert.equal(caps(provider, "marked-r1"), true, "id match ignores case, like the vision flag");
  assert.equal(caps("openai", "marked-local-r1"), true);
  assert.notEqual(caps(provider, "plain-r1"), true, "an unmarked model is unchanged");
  assert.equal(
    getResolvedModelCapabilities({ provider, model: "Marked-R1" }, { persistedOverrides: false })
      .supportsThinking,
    null,
    "the override-free view stays override-free"
  );
});

test("PUT sets the flag with true, clears it with null, and leaves it alone when the field is absent", async () => {
  assert.equal((await send("POST", {})).status, 200);

  assert.equal((await send("PUT", { supportsThinking: true })).status, 200);
  assert.equal((await storedRow())?.supportsThinking, true);

  assert.equal((await send("PUT", { modelName: "Renamed" })).status, 200);
  assert.equal((await storedRow())?.supportsThinking, true, "an unrelated edit keeps the flag");

  assert.equal((await send("PUT", { supportsThinking: null })).status, 200);
  assert.equal("supportsThinking" in ((await storedRow()) ?? {}), false, "null clears the key");

  assert.equal((await send("PUT", { supportsThinking: true })).status, 200);
  assert.equal((await send("PUT", { supportsThinking: false })).status, 200);
  assert.equal(
    "supportsThinking" in ((await storedRow()) ?? {}),
    false,
    "the flag is opt-in: false clears it instead of storing an inert false"
  );
});

test("a non-boolean flag is rejected before anything is stored", async () => {
  assert.equal((await send("POST", { supportsThinking: "yes" })).status, 400);
  assert.equal(await storedRow(), undefined);
});
