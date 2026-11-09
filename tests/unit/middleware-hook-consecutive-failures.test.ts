import { test, beforeEach, after } from "node:test";
import assert from "node:assert/strict";

import {
  registerHook,
  updateHook,
  runHooks,
  createHookContext,
  getHook,
  clearAllHooks,
} from "../../src/lib/middleware/registry.ts";
import { HookPriority, type HookConfig } from "../../src/lib/middleware/types.ts";

const CONSECUTIVE_FAILURE_LIMIT = 5; // MAX_CONSECUTIVE_HOOK_FAILURES in registry.ts

function config(name: string, priority: number = HookPriority.NORMAL): HookConfig {
  return {
    name,
    description: "test hook",
    priority,
    scope: { type: "global" },
    enabled: true,
    code: "return {};",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    runCount: 0,
  };
}

function ctx() {
  return createHookContext({ body: { messages: [] }, headers: {}, model: "gpt-4o" });
}

beforeEach(() => clearAllHooks());
after(() => clearAllHooks());

test("a hook that fails five times in a row is switched off with a named diagnostic", async () => {
  let calls = 0;
  registerHook(config("always-fails"), async () => {
    calls++;
    throw new Error("boom");
  });

  for (let i = 0; i < 8; i++) await runHooks(ctx());

  assert.equal(calls, CONSECUTIVE_FAILURE_LIMIT, "the hook must stop being called");
  const hook = getHook("always-fails");
  assert.equal(hook?.enabled, false);
  assert.match(hook?.lastError ?? "", /disabled after 5 consecutive failures/);
  assert.match(hook?.lastError ?? "", /boom/);
});

test("a success between failures resets the count", async () => {
  let calls = 0;
  registerHook(config("flaky"), async () => {
    calls++;
    if (calls % 5 === 0) return {};
    throw new Error("flaky");
  });

  for (let i = 0; i < 20; i++) await runHooks(ctx());

  assert.equal(calls, 20, "four failures then one success never reaches the limit");
  assert.equal(getHook("flaky")?.enabled, true);
});

test("a switched-off hook does not stop the other hooks", async () => {
  registerHook(config("bad", HookPriority.HIGH), async () => {
    throw new Error("boom");
  });
  registerHook(config("good", HookPriority.NORMAL), async () => ({ model: "gpt-4o-mini" }));

  let last = ctx();
  for (let i = 0; i < 7; i++) last = (await runHooks(ctx())).context;

  assert.equal(getHook("bad")?.enabled, false);
  assert.equal(last.model, "gpt-4o-mini");
  assert.equal(getHook("good")?.enabled, true);
});

test("saving the hook again switches it back on with a fresh count", async () => {
  let calls = 0;
  registerHook(config("revived"), async () => {
    calls++;
    throw new Error("boom");
  });
  for (let i = 0; i < 6; i++) await runHooks(ctx());
  assert.equal(calls, CONSECUTIVE_FAILURE_LIMIT);

  updateHook("revived", { enabled: true });
  await runHooks(ctx());

  assert.equal(calls, CONSECUTIVE_FAILURE_LIMIT + 1, "an operator re-enable runs the hook again");
  assert.equal(getHook("revived")?.enabled, true);
});
