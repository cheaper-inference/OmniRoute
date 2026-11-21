import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "model-override-repositories-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const readCache = await import("../../../src/lib/db/readCache.ts");
const { modelOverrideRepositories } =
  await import("../../../src/lib/db/repositories/modelOverrideRepositories.ts");
const capabilityFacade = await import("../../../src/lib/db/modelCapabilityOverrides.ts");
const contextFacade = await import("../../../src/lib/db/modelContextOverrides.ts");
const autoFacade = await import("../../../src/lib/db/autoCandidateOverrides.ts");

const { autoCandidates, capabilities, contexts } = modelOverrideRepositories;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

test("facades hand out the composition-root repositories", () => {
  assert.equal(capabilityFacade.getModelCapabilityOverrideRepository(), capabilities);
  assert.equal(contextFacade.getModelContextOverrideRepository(), contexts);
  assert.equal(autoFacade.getAutoCandidateOverrideRepository(), autoCandidates);
});

test("capability repository: Promise CRUD with the facade's validation", async () => {
  assert.deepEqual(await promised(capabilities.list()), []);
  assert.equal(await promised(capabilities.find("p", "m", "vision")), null);
  assert.equal(await promised(capabilities.set("p/m", "max_output_tokens", 0)), false);
  assert.equal(await promised(capabilities.set("pm", "vision", true)), false);
  assert.equal(await promised(capabilities.set(" p / m ", "vision", "true")), true);
  assert.equal(await promised(capabilities.set("p/m", "max_token", 64)), true);

  const vision = await promised(capabilities.find("p", "m", "vision"));
  assert.deepEqual(
    { ...vision, refreshedAt: "x" },
    {
      provider: "p",
      modelId: "m",
      target: "p/m",
      key: "vision",
      value: true,
      refreshedAt: "x",
    }
  );
  assert.equal(await capabilities.find("p", "m", "nope" as never), null);
  assert.deepEqual((await capabilities.list()).map((row) => row.key).sort(), [
    "max_token",
    "vision",
  ]);
  assert.equal(await promised(capabilities.remove("p/m", "vision")), true);
  assert.equal(await promised(capabilities.remove("p/m", "vision")), false);
  assert.equal(await capabilities.find("p", "m", "vision"), null);
});

test("context repository: Promise CRUD, trimming and source normalization", async () => {
  assert.deepEqual(await promised(contexts.list()), []);
  assert.equal(await promised(contexts.find(" ", "m")), null);
  assert.equal(await promised(contexts.set("p", "m", 0)), false);
  assert.equal(await promised(contexts.set(" p ", " m ", 4096)), true);
  assert.equal((await contexts.find("p", "m"))?.source, "manual");
  assert.equal(await contexts.set("p", "m", 8192, "auto:discovery"), true);
  const found = await promised(contexts.find("p", "m"));
  assert.equal(found?.realContext, 8192);
  assert.equal(found?.source, "auto:discovery");
  assert.equal((await contexts.list()).length, 1);
  assert.equal(await promised(contexts.remove("p", "m")), true);
  assert.equal(await promised(contexts.remove("p", "m")), false);
});

test("auto-candidate repository: Promise upsert and scoped reads", async () => {
  assert.deepEqual([...(await promised(autoCandidates.listExcludedConnectionIds("k", "")))], []);
  const row = await promised(autoCandidates.setExcluded("k", "auto/a", "c1", true));
  assert.match(row.id, /^[0-9a-f-]{36}$/);
  assert.deepEqual([...(await autoCandidates.listExcludedConnectionIds("k", "auto/a"))], ["c1"]);
  const again = await autoCandidates.setExcluded("k", "auto/a", "c1", false);
  assert.equal(again.id, row.id);
  assert.deepEqual(await promised(autoCandidates.list("k", "auto/a")), [again]);
  assert.deepEqual([...(await autoCandidates.listExcludedConnectionIds("k", "auto/a"))], []);
});

test("repositories persist only; the facades own model-catalog invalidation", async () => {
  const before = readCache.getModelCatalogCacheVersion();
  await capabilities.set("p/m", "max_output_tokens", 5);
  await capabilities.remove("p/m", "max_output_tokens");
  await contexts.set("p", "m", 5);
  await contexts.remove("p", "m");
  assert.equal(readCache.getModelCatalogCacheVersion(), before);

  capabilityFacade.setModelCapabilityOverride("p/m", "max_output_tokens", 5);
  assert.ok(readCache.getModelCatalogCacheVersion() > before);
});

test("legacy synchronous facades and async repositories share data both ways", async () => {
  assert.equal(capabilityFacade.setModelCapabilityOverride("p/m", "temperature", false), true);
  assert.equal((await capabilities.find("p", "m", "temperature"))?.value, false);
  await capabilities.set("p/m", "max_input_tokens", 77);
  assert.equal(capabilityFacade.getModelCapabilityOverride("p", "m", "max_input_tokens"), 77);

  assert.equal(contextFacade.setModelContextOverride("p", "m", 123), true);
  assert.equal((await contexts.find("p", "m"))?.realContext, 123);
  await contexts.set("p", "m", 456);
  assert.equal(contextFacade.getModelContextOverride("p", "m"), 456);

  await autoCandidates.setExcluded("k", "auto/a", "c1", true);
  assert.deepEqual([...(await autoFacade.getExcludedConnectionIds("k", "auto/a"))], ["c1"]);
});

test("repositories resolve the database per call across a reset", async () => {
  await capabilities.set("p/m", "vision", true);
  await contexts.set("p", "m", 9);
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  assert.equal(await capabilities.find("p", "m", "vision"), null);
  assert.equal(await contexts.find("p", "m"), null);
  assert.equal(await capabilities.set("p/m", "vision", false), true);
  assert.equal((await capabilities.find("p", "m", "vision"))?.value, false);
});
