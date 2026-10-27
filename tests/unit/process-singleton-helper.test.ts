import test from "node:test";
import assert from "node:assert/strict";

const HELPER_PATH = "../../src/shared/utils/processSingleton.ts";

function testKey(name: string): string {
  return `test.${name}`;
}

function testSymbol(name: string): symbol {
  return Symbol.for(`omniroute.test.${name}`);
}

async function clearTestKey(name: string): Promise<void> {
  delete (globalThis as unknown as Record<symbol, unknown>)[testSymbol(name)];
}

test("two copies loaded under two specifiers share one state", async (t) => {
  const name = "shared";
  await clearTestKey(name);
  t.after(() => clearTestKey(name));
  const copyA = await import(`${HELPER_PATH}?copy=a`);
  const copyB = await import(`${HELPER_PATH}?copy=b`);
  const storeA = copyA.getProcessStore(testKey(name), () => ({ count: 0 }));
  storeA.count += 1;
  const storeB = copyB.getProcessStore(testKey(name), () => ({ count: 0 }));
  assert.equal(storeB.count, 1);
  assert.equal(storeA, storeB);
});

test("existing keys resolve to the same symbols as before", async () => {
  const copy = await import(`${HELPER_PATH}?copy=symbols`);
  assert.equal(copy.sharedSymbol("requestId.store"), Symbol.for("omniroute.requestId.store"));
  assert.equal(
    copy.sharedSymbol("correlationId.store"),
    Symbol.for("omniroute.correlationId.store")
  );
  assert.equal(
    copy.sharedSymbol("featureFlagResolver"),
    Symbol.for("omniroute.featureFlagResolver")
  );
  assert.equal(copy.sharedSymbol("selfLoopSecret"), Symbol.for("omniroute.selfLoopSecret"));
  assert.equal(
    copy.sharedSymbol("adaptiveAdmission.runtime"),
    Symbol.for("omniroute.adaptiveAdmission.runtime")
  );
  assert.equal(copy.sharedSymbol("cpaAuthIndex"), Symbol.for("omniroute.cpaAuthIndex"));
  assert.equal(
    copy.sharedSymbol("forcedReasoningEffort"),
    Symbol.for("omniroute.forcedReasoningEffort")
  );
  assert.equal(copy.sharedSymbol("usage.estimated"), Symbol.for("omniroute.usage.estimated"));
  assert.equal(
    copy.sharedSymbol("apiKeyCodexServiceTier"),
    Symbol.for("omniroute.apiKeyCodexServiceTier")
  );
  assert.equal(
    copy.sharedSymbol("local-model-policy-response"),
    Symbol.for("omniroute.local-model-policy-response")
  );
});

test("factory runs once, stored value wins", async (t) => {
  const freshName = "factory-once";
  await clearTestKey(freshName);
  t.after(() => clearTestKey(freshName));
  const copy = await import(`${HELPER_PATH}?copy=factory`);
  let calls = 0;
  const first = copy.getProcessStore(testKey(freshName), () => {
    calls += 1;
    return { id: 1 };
  });
  const second = copy.getProcessStore(testKey(freshName), () => {
    calls += 1;
    return { id: 2 };
  });
  assert.equal(calls, 1);
  assert.equal(first, second);
  assert.equal(second.id, 1);
});

test("a value stored before migration wins over the factory", async (t) => {
  const name = "pre-migrated";
  await clearTestKey(name);
  t.after(() => clearTestKey(name));
  const existing = { id: "existing" };
  (globalThis as unknown as Record<symbol, unknown>)[testSymbol(name)] = existing;
  try {
    const copy = await import(`${HELPER_PATH}?copy=existing`);
    let calls = 0;
    const value = copy.getProcessStore(testKey(name), () => {
      calls += 1;
      return { id: "created" };
    });
    assert.equal(calls, 0);
    assert.equal(value, existing);
  } finally {
    await clearTestKey(name);
  }
});
