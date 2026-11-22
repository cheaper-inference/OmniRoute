import assert from "node:assert/strict";
import test from "node:test";

import type { RadarLocalModelStateRepository } from "../../../src/domain/persistence/radarLocalModelStateRepository.ts";

export interface RadarLocalModelStateRepositoryHarness {
  states: RadarLocalModelStateRepository;
  reset(): Promise<void>;
}

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function withoutTimestamps<T extends { updatedAt: string }>(items: T[]): Omit<T, "updatedAt">[] {
  return items.map(({ updatedAt, ...rest }) => {
    assert.equal(typeof updatedAt, "string");
    assert.ok(updatedAt.length > 0);
    return rest;
  });
}

export function registerRadarLocalModelStateRepositoryConformance(
  createHarness: () => Promise<RadarLocalModelStateRepositoryHarness>
): void {
  test("radar local state repository: Promise API, trimming and partial merges", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { states } = harness;

    assert.deepEqual(await promised(states.list()), []);
    const empty = await promised(states.getMergeState());
    assert.equal(empty.localOverrides.size, 0);
    assert.equal(empty.tombstones.size, 0);

    assert.equal(
      await promised(states.setOverride(" groq ", " model ", { displayName: " Name " })),
      true
    );
    assert.equal(await states.setOverride("groq", "model", { enabled: false }), true);
    assert.deepEqual(withoutTimestamps(await states.list()), [
      {
        provider: "groq",
        modelId: "model",
        displayName: "Name",
        enabled: false,
        tombstoned: false,
      },
    ]);

    assert.equal(await states.setOverride("groq", "model", { displayName: null }), true);
    assert.deepEqual(withoutTimestamps(await states.list()), [
      { provider: "groq", modelId: "model", displayName: null, enabled: false, tombstoned: false },
    ]);
  });

  test("radar local state repository: tombstones are independent and empty rows vanish", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { states } = harness;

    assert.equal(await states.setOverride("groq", "model", { displayName: "Name" }), true);
    assert.equal(await promised(states.setTombstone("groq", "model", true)), true);
    assert.equal(await promised(states.clearOverride("groq", "model")), true);
    assert.deepEqual(withoutTimestamps(await states.list()), [
      { provider: "groq", modelId: "model", displayName: null, enabled: null, tombstoned: true },
    ]);

    const merge = await states.getMergeState();
    assert.deepEqual([...merge.localOverrides], []);
    assert.deepEqual([...merge.tombstones], ["groq:model"]);

    assert.equal(await states.setTombstone("groq", "model", false), true);
    assert.deepEqual(await states.list(), []);
    assert.equal(await states.clearOverride("groq", "missing"), true);
    assert.deepEqual(await states.list(), []);
  });

  test("radar local state repository: invalid input fails closed without writing", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { states } = harness;

    assert.equal(await states.setOverride("bad provider", "model", { enabled: true }), false);
    assert.equal(await states.setOverride("groq", "", { enabled: true }), false);
    assert.equal(await states.setOverride("groq", "model", {}), false);
    assert.equal(
      await states.setOverride("groq", "model", { enabled: "yes" as unknown as boolean }),
      false
    );
    assert.equal(await states.setOverride("groq", "model", { displayName: "\u0000" }), false);
    assert.equal(await states.setTombstone("groq", "model", 1 as unknown as boolean), false);
    assert.equal(await states.clearOverride("groq", "a\nb"), false);
    assert.deepEqual(await states.list(), []);
  });

  test("radar local state repository: list order and merge projection", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { states } = harness;

    await states.setOverride("zeta", "a", { enabled: true });
    await states.setTombstone("alpha", "b", true);
    await states.setOverride("alpha", "a", { displayName: "A", enabled: false });

    assert.deepEqual(
      (await states.list()).map((state) => `${state.provider}:${state.modelId}`),
      ["alpha:a", "alpha:b", "zeta:a"]
    );
    const merge = await states.getMergeState();
    assert.deepEqual(
      [...merge.localOverrides],
      [
        ["alpha:a", { displayName: "A", enabled: false }],
        ["zeta:a", { enabled: true }],
      ]
    );
    assert.deepEqual([...merge.tombstones], ["alpha:b"]);
  });
}
