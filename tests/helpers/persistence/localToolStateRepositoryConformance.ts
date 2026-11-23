import assert from "node:assert/strict";
import test from "node:test";

import type {
  CliToolStateRepository,
  ConductorCursorRepository,
  LocalCorpusRootRepository,
} from "../../../src/domain/persistence/localToolStateRepositories.ts";

export interface LocalToolStateRepositoriesHarness {
  cliTools: CliToolStateRepository;
  conductorCursor: ConductorCursorRepository;
  localCorpusRoot: LocalCorpusRootRepository;
  reset(): Promise<void>;
}

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

export function registerLocalToolStateRepositoriesConformance(
  createHarness: () => Promise<LocalToolStateRepositoriesHarness>
): void {
  test("cli tool state repository: timestamps per tool", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { cliTools } = harness;

    assert.equal(await promised(cliTools.getLastConfigured("codex")), null);
    assert.deepEqual(await promised(cliTools.listLastConfigured()), {});

    await promised(cliTools.saveLastConfigured("codex", "2026-01-01T00:00:00.000Z"));
    await cliTools.saveLastConfigured("kilo", "2026-01-02T00:00:00.000Z");
    await cliTools.saveLastConfigured("codex", "2026-01-03T00:00:00.000Z");
    assert.equal(await cliTools.getLastConfigured("codex"), "2026-01-03T00:00:00.000Z");
    assert.deepEqual(await cliTools.listLastConfigured(), {
      codex: "2026-01-03T00:00:00.000Z",
      kilo: "2026-01-02T00:00:00.000Z",
    });

    await promised(cliTools.deleteLastConfigured("codex"));
    await cliTools.deleteLastConfigured("never-configured");
    assert.equal(await cliTools.getLastConfigured("codex"), null);
    assert.deepEqual(await cliTools.listLastConfigured(), { kilo: "2026-01-02T00:00:00.000Z" });
  });

  test("cli tool state repository: initial snapshot is first-write-wins", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { cliTools } = harness;

    assert.equal(await promised(cliTools.getInitialConfig("codex")), null);
    assert.equal(await promised(cliTools.saveInitialConfig("codex", { model: "a" })), true);
    assert.equal(await cliTools.saveInitialConfig("codex", { model: "b" }), false);
    assert.deepEqual(await cliTools.getInitialConfig("codex"), { model: "a" });

    await cliTools.saveLastConfigured("codex", "2026-01-01T00:00:00.000Z");
    await promised(cliTools.deleteInitialConfig("codex"));
    assert.equal(await cliTools.getInitialConfig("codex"), null);
    assert.equal(await cliTools.getLastConfigured("codex"), "2026-01-01T00:00:00.000Z");
    assert.equal(await cliTools.saveInitialConfig("codex", { model: "c" }), true);
    assert.deepEqual(await cliTools.getInitialConfig("codex"), { model: "c" });
  });

  test("conductor cursor repository: get and set", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { conductorCursor } = harness;

    assert.equal(await promised(conductorCursor.get()), null);
    await promised(conductorCursor.set("evt-1"));
    assert.equal(await conductorCursor.get(), "evt-1");
    await conductorCursor.set("evt-2");
    assert.equal(await conductorCursor.get(), "evt-2");
  });

  test("local corpus root repository: get, set, blank and clear", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { localCorpusRoot } = harness;

    assert.equal(await promised(localCorpusRoot.get()), null);
    await promised(localCorpusRoot.set("/vault"));
    assert.equal(await localCorpusRoot.get(), "/vault");
    await localCorpusRoot.set("  ");
    assert.equal(await localCorpusRoot.get(), null);
    await localCorpusRoot.set("/vault/2");
    await promised(localCorpusRoot.clear());
    assert.equal(await localCorpusRoot.get(), null);
  });

  test("local tool state repositories: namespaces are independent", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { cliTools, conductorCursor, localCorpusRoot } = harness;

    await cliTools.saveLastConfigured("last_event_id", "2026-01-01T00:00:00.000Z");
    await cliTools.saveLastConfigured("root_path", "2026-01-01T00:00:00.000Z");
    assert.equal(await conductorCursor.get(), null);
    assert.equal(await localCorpusRoot.get(), null);

    await conductorCursor.set("evt-1");
    await localCorpusRoot.set("/vault");
    await localCorpusRoot.clear();
    assert.equal(await conductorCursor.get(), "evt-1");
    assert.deepEqual(Object.keys(await cliTools.listLastConfigured()).sort(), [
      "last_event_id",
      "root_path",
    ]);
  });
}
