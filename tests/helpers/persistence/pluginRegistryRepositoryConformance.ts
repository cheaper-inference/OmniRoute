import assert from "node:assert/strict";
import test from "node:test";

import type {
  PluginCreateInput,
  PluginExecutionLogRepository,
  PluginRegistryRepository,
} from "../../../src/domain/persistence/pluginRegistryRepositories.ts";

export interface PluginRegistryRepositoriesHarness {
  plugins: PluginRegistryRepository;
  executions: PluginExecutionLogRepository;
  reset(): Promise<void>;
}

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function input(name: string, overrides: Partial<PluginCreateInput> = {}): PluginCreateInput {
  return {
    id: `id-${name}`,
    name,
    version: "1.0.0",
    main: "index.js",
    manifest: { name, version: "1.0.0" },
    pluginDir: `/plugins/${name}`,
    ...overrides,
  };
}

export function registerPluginRegistryRepositoriesConformance(
  createHarness: () => Promise<PluginRegistryRepositoriesHarness>
): void {
  test("plugin registry repository: insert applies defaults and returns the stored row", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { plugins } = harness;

    const row = await promised(plugins.insert(input("alpha")));
    assert.equal(row.id, "id-alpha");
    assert.equal(row.license, "MIT");
    assert.equal(row.source, "local");
    assert.equal(row.status, "installed");
    assert.equal(row.enabled, 0);
    assert.equal(row.tags, "[]");
    assert.equal(row.config, "{}");
    assert.equal(row.configSchema, "{}");
    assert.equal(row.hooks, "[]");
    assert.equal(row.permissions, "[]");
    assert.equal(row.manifest, '{"name":"alpha","version":"1.0.0"}');
    assert.equal(row.activatedAt, null);
    assert.equal(row.installedAt, row.updatedAt);

    const full = await plugins.insert(
      input("beta", { enabled: true, status: "active", tags: ["x"], config: { a: 1 } })
    );
    assert.equal(full.enabled, 1);
    assert.equal(full.status, "active");
    assert.equal(full.tags, '["x"]');
    assert.equal(full.config, '{"a":1}');

    await assert.rejects(plugins.insert(input("alpha", { id: "other" })), /UNIQUE/);
  });

  test("plugin registry repository: lookups, listing and existence", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { plugins } = harness;

    assert.equal(await promised(plugins.findById("id-none")), null);
    assert.equal(await promised(plugins.findByName("none")), null);
    assert.equal(await promised(plugins.exists("none")), false);
    assert.deepEqual(await promised(plugins.list()), []);

    await plugins.insert(input("zeta"));
    await plugins.insert(input("alpha", { status: "active" }));
    await plugins.insert(input("mid", { status: "error" }));

    assert.equal((await plugins.findById("id-zeta"))?.name, "zeta");
    assert.equal((await plugins.findByName("alpha"))?.id, "id-alpha");
    assert.equal(await plugins.exists("mid"), true);
    assert.deepEqual(
      (await plugins.list()).map((p) => p.name),
      ["alpha", "mid", "zeta"]
    );
    assert.deepEqual(
      (await plugins.list("active")).map((p) => p.name),
      ["alpha"]
    );
    assert.deepEqual(await plugins.list("inactive"), []);
  });

  test("plugin registry repository: status, manifest, config updates and delete", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { plugins } = harness;
    await plugins.insert(input("svc"));

    assert.equal(await promised(plugins.updateStatus("svc", "active")), true);
    const active = (await plugins.findByName("svc"))!;
    assert.equal(active.enabled, 1);
    assert.ok(active.activatedAt);

    assert.equal(await plugins.updateStatus("svc", "error", "boom"), true);
    const errored = (await plugins.findByName("svc"))!;
    assert.equal(errored.enabled, 0);
    assert.equal(errored.errorMessage, "boom");
    assert.equal(errored.activatedAt, active.activatedAt, "last activation is kept");

    await plugins.updateStatus("svc", "inactive");
    assert.equal((await plugins.findByName("svc"))!.errorMessage, null);
    assert.equal(await plugins.updateStatus("ghost", "active"), false);

    assert.equal(await promised(plugins.updateManifest("svc", { v: 2 }, ["onRequest"])), true);
    const refreshed = (await plugins.findByName("svc"))!;
    assert.equal(refreshed.manifest, '{"v":2}');
    assert.equal(refreshed.hooks, '["onRequest"]');
    assert.equal(await plugins.updateManifest("ghost", {}, []), false);

    assert.equal(await promised(plugins.updateConfig("svc", { k: "v" })), true);
    assert.equal((await plugins.findByName("svc"))!.config, '{"k":"v"}');
    assert.equal(await plugins.updateConfig("ghost", {}), false);

    assert.equal(await promised(plugins.deleteByName("svc")), true);
    assert.equal(await plugins.deleteByName("svc"), false);
    assert.equal(await plugins.exists("svc"), false);
  });

  test("plugin execution log repository: append, list newest first, summarize", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { executions } = harness;

    assert.deepEqual(await promised(executions.listForPlugin("p")), []);
    assert.deepEqual(await promised(executions.summarize("p")), {
      totalCalls: 0,
      successCount: 0,
      failureCount: 0,
      avgDurationMs: 0,
    });

    assert.equal(await promised(executions.record("p", "onRequest", 10, true)), undefined);
    await executions.record("p", "onError", 30, false, "bad");
    await executions.record("q", "onRequest", 500, true);

    const rows = await executions.listForPlugin("p");
    assert.equal(rows.length, 2);
    assert.deepEqual(rows.map((r) => [r.hook, r.success, r.errorMessage, r.durationMs]).sort(), [
      ["onError", false, "bad", 30],
      ["onRequest", true, null, 10],
    ]);
    assert.ok(rows.every((r) => r.pluginName === "p" && typeof r.createdAt === "string"));

    assert.deepEqual(await executions.summarize("p"), {
      totalCalls: 2,
      successCount: 1,
      failureCount: 1,
      avgDurationMs: 20,
    });
  });
}
