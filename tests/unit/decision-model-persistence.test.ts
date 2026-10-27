import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "decision-model-persistence-"));
process.env.DATA_DIR = data;
const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const route = await import("../../src/app/api/provider-models/route.ts");
test.after(async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  core.resetDbInstance();
  fs.rmSync(data, { recursive: true, force: true });
});

function request(method: string, body: Record<string, unknown>) {
  return new Request("http://localhost/api/provider-models", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("native model management create/edit/clear survives a database reload", async () => {
  const id = { provider: "typesafe", modelId: "fixture-decision" };
  assert.equal((await route.POST(request("POST", { ...id, apiFormat: "systemone" }))).status, 200);
  core.resetDbInstance();
  let rows = await models.getCustomModels(id.provider);
  assert.equal(rows[0].modelType, "decision");
  assert.deepEqual(rows[0].supportedEndpoints, ["systemone"]);
  assert.equal(
    (await route.PUT(request("PUT", { ...id, modelName: "Renamed", modelType: "decision" })))
      .status,
    200
  );
  core.resetDbInstance();
  rows = await models.getCustomModels(id.provider);
  assert.equal(rows[0].modelType, "decision");
  assert.equal(rows[0].name, "Renamed");
  assert.equal(
    (
      await route.PUT(
        request("PUT", {
          ...id,
          apiFormat: "chat-completions",
          supportedEndpoints: ["chat"],
          modelType: null,
        })
      )
    ).status,
    200
  );
  core.resetDbInstance();
  rows = await models.getCustomModels(id.provider);
  assert.equal(Object.hasOwn(rows[0], "modelType"), false);
  assert.deepEqual(rows[0].supportedEndpoints, ["chat"]);
});

test("sync preserves explicit decision metadata and never replaces an operator's endpoint override", async () => {
  await models.replaceCustomModels("fixture", [
    {
      id: "native",
      name: "Native",
      apiFormat: "systemone",
      supportedEndpoints: ["systemone"],
      modelType: "decision",
    },
  ]);
  await models.updateCustomModel("fixture", "native", {
    supportedEndpoints: ["systemone", "chat"],
  });
  await models.replaceCustomModels("fixture", [
    { id: "native", name: "Native", supportedEndpoints: ["systemone"], modelType: "decision" },
  ]);
  core.resetDbInstance();
  const rows = await models.getCustomModels("fixture");
  assert.equal(rows[0].modelType, "decision");
  assert.deepEqual(rows[0].supportedEndpoints, ["systemone", "chat"]);
});

test("a type-only native PUT cannot leave a newly created model chat-selectable", async () => {
  const id = { provider: "typesafe", modelId: "fixture-type-only" };
  assert.equal((await route.PUT(request("PUT", { ...id, modelType: "decision" }))).status, 200);
  core.resetDbInstance();
  const row = (await models.getCustomModels(id.provider)).find((item) => item.id === id.modelId);
  assert.equal(row?.modelType, "decision");
  assert.deepEqual(row?.supportedEndpoints, ["systemone"]);
});

test("an explicit mixed capability is preserved when assigning the decision type", async () => {
  const id = { provider: "openai", modelId: "fixture-mixed" };
  assert.equal(
    (
      await route.PUT(
        request("PUT", { ...id, modelType: "decision", supportedEndpoints: ["chat", "systemone"] })
      )
    ).status,
    200
  );
  const row = (await models.getCustomModels(id.provider)).find((item) => item.id === id.modelId);
  assert.deepEqual(row?.supportedEndpoints, ["chat", "systemone"]);
});
