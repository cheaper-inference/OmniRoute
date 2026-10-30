import assert from "node:assert/strict";
import test from "node:test";

import type { PlaygroundPresetRepository } from "../../../src/domain/persistence/playgroundPresetRepository.ts";

export interface PlaygroundPresetRepositoryHarness {
  presets: PlaygroundPresetRepository;
  reset(): Promise<void>;
  corruptParams(id: string, raw: string): Promise<void>;
  setCreatedAt(id: string, timestamp: string): Promise<void>;
}

const input = {
  name: "Preset",
  endpoint: "chat.completions",
  model: "gpt-4o",
  system: "Be helpful",
  params: { temperature: 0.7, nested: { values: [1, null] } },
};

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

export function registerPlaygroundPresetRepositoryConformance(
  createHarness: () => Promise<PlaygroundPresetRepositoryHarness>
): void {
  test("preset repository: Promise CRUD, UUIDs, nullish defaults, and missing rows", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { presets } = harness;
    assert.deepEqual(await promised(presets.list()), { items: [], total: 0 });
    assert.equal(await promised(presets.findById("missing")), null);
    assert.equal(await promised(presets.update("missing", { name: "Ghost" })), null);
    assert.equal(await promised(presets.deleteById("missing")), false);

    const created = await promised(presets.create(input));
    assert.match(
      created.id,
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
    assert.ok(created.created_at.length > 0);
    assert.deepEqual(created, { ...input, id: created.id, created_at: created.created_at });
    assert.deepEqual(await promised(presets.findById(created.id)), created);
    for (const value of [null, undefined]) {
      const defaults = await promised(
        presets.create({
          ...input,
          system: value,
          params: value as unknown as Record<string, unknown>,
        })
      );
      assert.notEqual(defaults.id, created.id);
      assert.equal(defaults.system, null);
      assert.deepEqual(defaults.params, {});
    }
    assert.equal(await promised(presets.deleteById(created.id)), true);
    assert.equal(await promised(presets.deleteById(created.id)), false);
    assert.equal(await promised(presets.findById(created.id)), null);
  });

  test("preset repository: descending timestamps, pagination, full total, and offset without limit", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { presets } = harness;
    const first = await presets.create(input);
    const second = await presets.create({ ...input, name: "Second" });
    await harness.setCreatedAt(first.id, "2026-01-01 00:00:00");
    await harness.setCreatedAt(second.id, "2026-01-02 00:00:00");
    const all = await presets.list();
    assert.equal(all.total, 2);
    assert.deepEqual(
      all.items.map((item) => item.id),
      [second.id, first.id]
    );
    assert.deepEqual(await presets.list({ offset: 1 }), all);
    assert.deepEqual(await presets.list({ limit: 1 }), { items: all.items.slice(0, 1), total: 2 });
    assert.deepEqual(await presets.list({ limit: 1, offset: 1 }), {
      items: all.items.slice(1),
      total: 2,
    });
    assert.deepEqual(await presets.list({ limit: 0 }), { items: [], total: 2 });
    assert.deepEqual(await presets.list({ limit: 1, offset: 99 }), { items: [], total: 2 });
  });

  test("preset repository: partial updates, params replacement, and system key presence", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { presets } = harness;
    const created = await presets.create(input);
    assert.deepEqual(await promised(presets.update(created.id, {})), created);
    assert.deepEqual(
      await presets.update(created.id, {
        name: undefined,
        endpoint: undefined,
        model: undefined,
        params: undefined,
      }),
      created
    );
    const renamed = await presets.update(created.id, { name: "Renamed" });
    assert.deepEqual(renamed, { ...created, name: "Renamed" });
    const patch = { endpoint: "embeddings", model: "other", params: { seed: 42 }, system: "New" };
    const updated = await presets.update(created.id, patch);
    assert.deepEqual(updated, { ...renamed, ...patch });
    assert.deepEqual(await presets.findById(created.id), updated);
    for (const system of [undefined, null]) {
      await presets.update(created.id, { system: "Reset" });
      assert.deepEqual(await presets.update(created.id, { system }), { ...updated, system: null });
    }
  });

  test("preset repository: defensive params mapping for reads and lists", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { presets } = harness;
    const created = await presets.create(input);
    for (const raw of ["invalid{", "null", "[]", "[1]", "42", "false", '"text"']) {
      await harness.corruptParams(created.id, raw);
      assert.deepEqual((await presets.findById(created.id))?.params, {}, raw);
      assert.deepEqual((await presets.list()).items[0].params, {}, raw);
    }
    await harness.corruptParams(created.id, JSON.stringify(input.params));
    assert.deepEqual((await presets.findById(created.id))?.params, input.params);
    assert.deepEqual((await presets.list()).items[0].params, input.params);
  });

  test("preset repository: the same repository survives storage reset and accepts new writes", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { presets } = harness;
    const old = await presets.create(input);
    await harness.reset();
    assert.deepEqual(await presets.list(), { items: [], total: 0 });
    assert.equal(await presets.findById(old.id), null);
    assert.equal(await presets.update(old.id, { name: "Gone" }), null);
    assert.equal(await presets.deleteById(old.id), false);
    const fresh = await presets.create({ ...input, name: "Fresh" });
    assert.deepEqual(await presets.findById(fresh.id), fresh);
    assert.deepEqual(await presets.list(), { items: [fresh], total: 1 });
  });
}
