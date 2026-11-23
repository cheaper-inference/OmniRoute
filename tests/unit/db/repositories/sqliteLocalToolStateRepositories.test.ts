import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { registerLocalToolStateRepositoriesConformance } from "../../../helpers/persistence/localToolStateRepositoryConformance.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-local-tool-state-repo-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

const { sqliteCliToolStateRepository: cliTools } =
  await import("../../../../src/lib/db/repositories/sqliteCliToolStateRepository.ts");
const { sqliteConductorCursorRepository: conductorCursor } =
  await import("../../../../src/lib/db/repositories/sqliteConductorCursorRepository.ts");
const { sqliteLocalCorpusRootRepository: localCorpusRoot } =
  await import("../../../../src/lib/db/repositories/sqliteLocalCorpusRootRepository.ts");
const { localToolStateRepositories } =
  await import("../../../../src/lib/db/repositories/localToolStateRepositories.ts");
const cliFacade = await import("../../../../src/lib/db/cliToolState.ts");
const conductorFacade = await import("../../../../src/lib/db/conductorBridge.ts");
const corpusFacade = await import("../../../../src/lib/db/localCorpus.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

registerLocalToolStateRepositoriesConformance(async () => ({
  cliTools,
  conductorCursor,
  localCorpusRoot,
  reset: resetStorage,
}));

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy helpers must not return Promises");
  return value;
}

test("composition root binds the SQLite repositories and their legacy sync helpers", () => {
  assert.equal(localToolStateRepositories.cliTools, cliTools);
  assert.equal(localToolStateRepositories.conductorCursor, conductorCursor);
  assert.equal(localToolStateRepositories.localCorpusRoot, localCorpusRoot);
  assert.equal(cliFacade.getCliToolStateRepository(), cliTools);
  assert.equal(conductorFacade.getConductorCursorRepository(), conductorCursor);
  assert.equal(corpusFacade.getLocalCorpusRootRepository(), localCorpusRoot);
  for (const helpers of Object.values(localToolStateRepositories.legacySync)) {
    for (const fn of Object.values(helpers)) assert.equal(typeof fn, "function");
  }
});

test("async repositories and sync facades share the same rows", async () => {
  await resetStorage();

  await cliTools.saveLastConfigured("codex", "2026-01-01T00:00:00.000Z");
  assert.equal(
    synchronous(cliFacade.getCliToolLastConfigured("codex")),
    "2026-01-01T00:00:00.000Z"
  );
  cliFacade.saveCliToolInitialConfig("codex", { from: "facade" });
  assert.deepEqual(await cliTools.getInitialConfig("codex"), { from: "facade" });

  conductorFacade.setConductorCursor("evt-7");
  assert.equal(await conductorCursor.get(), "evt-7");

  await localCorpusRoot.set("/vault");
  assert.deepEqual(synchronous(corpusFacade.getLocalCorpusConfig()), {
    rootPath: "/vault",
    configured: true,
  });
  corpusFacade.clearLocalCorpusRoot();
  assert.equal(await localCorpusRoot.get(), null);
});

test("repository reads resolve the database at call time after a reset", async () => {
  await resetStorage();
  await conductorCursor.set("before-reset");
  await resetStorage();
  assert.equal(await conductorCursor.get(), null);
  await conductorCursor.set("after-reset");
  assert.equal(conductorFacade.getConductorCursor(), "after-reset");
});
