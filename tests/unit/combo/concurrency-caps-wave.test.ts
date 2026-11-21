/**
 * @file concurrency-caps-wave.test.ts
 * @description Proves per-connection concurrency-cap lookups run in one wave at both routing sites.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-caps-wave-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

// Register cleanup before any module under test loads: with `test:unit:fast` the shared
// db core fixes its data path at first import, so a load-time failure must never leave
// the temporary directory behind. The reset hooks are bound once the imports resolve.
let releaseSemaphores: () => void = () => {};
let resetDatabase: () => void = () => {};
test.after(() => {
  releaseSemaphores();
  resetDatabase();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const { acquire, buildAccountSemaphoreKey, resetAll } =
  await import("../../../open-sse/services/accountSemaphore.ts");
const { lookupPositiveCap, resolveMaxConcurrentByConnection } =
  await import("../../../open-sse/services/combo/concurrencyCaps.ts");
const { isRuntimeUnitAtConcurrencyCap } =
  await import("../../../open-sse/services/combo/runtimeUnitCapacity.ts");
const { resolveComboRuntimeUnits, resolveComboTargets } =
  await import("../../../open-sse/services/combo/comboStructure.ts");
const { resetDbInstance } = await import("../../../src/lib/db/core.ts");

releaseSemaphores = resetAll;
resetDatabase = resetDbInstance;

type ComboLike = import("../../../open-sse/services/combo/types.ts").ComboLike;
type ResolvedComboTarget = import("../../../open-sse/services/combo/types.ts").ResolvedComboTarget;
type ResolvedComboUnit = import("../../../open-sse/services/combo/types.ts").ResolvedComboUnit;

const K = 4;
const PROVIDER = "wave-test-provider";
const connectionIdOf = (index: number) => `wave-conn-${index}`;

function buildChildCombo(): ComboLike {
  return {
    name: "wave-child-combo",
    strategy: "priority",
    models: Array.from({ length: K }, (_, index) => ({
      kind: "model",
      model: `${PROVIDER}/model-${index}`,
      providerId: PROVIDER,
      connectionId: connectionIdOf(index),
    })),
    config: { maxRetries: 0 },
  };
}

function buildUnitAndTargets() {
  const child = buildChildCombo();
  const outer: ComboLike = {
    name: "wave-outer-combo",
    strategy: "priority",
    models: [{ kind: "combo-ref", comboName: child.name }],
    config: { nestedComboMode: "execute", maxRetries: 0 },
  };
  const allCombos = [outer, child];
  const units = resolveComboRuntimeUnits(outer, allCombos, "execute", 1, new Map());
  const unit = units.find((candidate) => candidate.kind === "combo-ref");
  assert.ok(unit, "expected a combo-ref runtime unit");
  const targets = resolveComboTargets(child, allCombos, 1, new Map());
  const resolvedIds = targets.map((target) => target.connectionId);
  assert.equal(resolvedIds.length, K);
  assert.ok(
    targets.every((target) => typeof target.connectionId === "string" && !!target.connectionId),
    "every resolved target must carry a connection id"
  );
  assert.equal(new Set(resolvedIds).size, K, "expected one distinct connection per target");
  return { unit: unit as ResolvedComboUnit, allCombos, targets };
}

/** Park each lookup on a shared barrier so parallel lookups overlap and sequential ones do not. */
function makeWaveBarrier<T>(values: Map<string, T>) {
  let inFlight = 0;
  let maxInFlight = 0;
  let release = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const lookup = async (id: string): Promise<T | null> => {
    inFlight += 1;
    maxInFlight = Math.max(maxInFlight, inFlight);
    await gate;
    inFlight -= 1;
    return values.get(id) ?? null;
  };
  return {
    lookup,
    open: () => release(),
    max: () => maxInFlight,
  };
}

const tick = () => new Promise<void>((resolve) => setImmediate(resolve));

test("resolveMaxConcurrentByConnection resolves K cold-cache connections in one wave and keeps Map order", async () => {
  const { targets } = buildUnitAndTargets();
  const capById = new Map(
    targets.map((target, index) => [target.connectionId as string, index + 3])
  );
  const wave = makeWaveBarrier(capById);
  try {
    const pending = resolveMaxConcurrentByConnection(targets, wave.lookup);
    await tick();
    wave.open();
    const caps = await pending;
    assert.equal(wave.max(), K, "all distinct connections must be looked up in one wave");
    assert.equal(caps.size, K);
    assert.deepEqual(
      [...caps.entries()],
      targets.map((target) => [
        target.connectionId as string,
        capById.get(target.connectionId as string),
      ])
    );
  } finally {
    wave.open();
  }
});

test("resolveMaxConcurrentByConnection performs one lookup for one connection repeated across targets", async () => {
  const { targets } = buildUnitAndTargets();
  const only = targets[0].connectionId as string;
  const repeated: ResolvedComboTarget[] = Array.from({ length: K * 3 }, () => ({
    ...targets[0],
    connectionId: only,
  }));
  const seen: string[] = [];
  const caps = await resolveMaxConcurrentByConnection(repeated, async (id) => {
    seen.push(id);
    return 5;
  });
  assert.deepEqual(seen, [only], "one lookup per distinct connection");
  assert.equal(caps.size, 1);
  assert.equal(caps.get(only), 5);
});

test("lookupPositiveCap returns null for a missing connection without blocking routing", async () => {
  const { targets } = buildUnitAndTargets();
  const missing = "wave-missing-connection";
  assert.equal(
    await lookupPositiveCap(missing),
    null,
    "the real lookup fails open for a connection with no row"
  );
  const seen: string[] = [];
  const caps = await resolveMaxConcurrentByConnection(
    [{ ...targets[0], connectionId: missing }],
    async (id) => {
      seen.push(id);
      return null;
    }
  );
  assert.deepEqual(seen, [missing], "the injected lookup is the one used for the cap");
  assert.equal(caps.get(missing), null, "a null cap stays a non-blocking map entry");
});

test("isRuntimeUnitAtConcurrencyCap returns false after one wave when one of K connections has headroom", async () => {
  const { unit, allCombos, targets } = buildUnitAndTargets();
  const ids = targets.map((target) => target.connectionId as string);
  const releases: Array<() => void> = [];
  try {
    for (const id of ids.slice(1)) {
      const key = buildAccountSemaphoreKey({ provider: PROVIDER, accountKey: id });
      releases.push(await acquire(key, { maxConcurrency: 2 }));
      releases.push(await acquire(key, { maxConcurrency: 2 }));
    }
    const wave = makeWaveBarrier(new Map(ids.map((id) => [id, 2])));
    try {
      const pending = isRuntimeUnitAtConcurrencyCap(unit, allCombos, wave.lookup, new Map());
      await tick();
      wave.open();
      assert.equal(wave.max(), K, "all connection caps must be read in one wave");
      assert.equal(await pending, false, "one connection with headroom keeps the unit available");
    } finally {
      wave.open();
    }
  } finally {
    for (const release of releases) release();
  }
});

test("isRuntimeUnitAtConcurrencyCap returns true after one wave when all connections are full", async () => {
  const { unit, allCombos, targets } = buildUnitAndTargets();
  const ids = targets.map((target) => target.connectionId as string);
  const releases: Array<() => void> = [];
  try {
    for (const id of ids) {
      const key = buildAccountSemaphoreKey({ provider: PROVIDER, accountKey: id });
      releases.push(await acquire(key, { maxConcurrency: 1 }));
    }
    const wave = makeWaveBarrier(new Map(ids.map((id) => [id, 1])));
    try {
      const pending = isRuntimeUnitAtConcurrencyCap(unit, allCombos, wave.lookup, new Map());
      await tick();
      wave.open();
      assert.equal(wave.max(), K, "all connection caps must be read in one wave");
      assert.equal(await pending, true, "every connection at cap skips the unit");
    } finally {
      wave.open();
    }
    assert.equal(
      await isRuntimeUnitAtConcurrencyCap(unit, allCombos, async () => null, new Map()),
      false,
      "a unit with no capped connection is not skipped"
    );
  } finally {
    for (const release of releases) release();
  }
});
