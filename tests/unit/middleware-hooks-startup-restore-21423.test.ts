import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import { createMiddlewareHook, deleteMiddlewareHook } from "../../src/lib/db/middleware.ts";
import {
  initPreRequestRegistry,
  getAllHooks,
  getHook,
  runHooks,
  createHookContext,
  resetPreRequestRegistryForTesting,
  updateHook,
} from "../../src/lib/middleware/registry.ts";

describe("Issue #21423 — stored pre-request hooks restored at start-up / lazy init", () => {
  const activeHookName = `startup-hook-${Date.now()}`;
  const disabledHookName = `disabled-hook-${Date.now()}`;

  beforeEach(() => {
    resetPreRequestRegistryForTesting();
  });

  afterEach(() => {
    deleteMiddlewareHook(activeHookName);
    deleteMiddlewareHook(disabledHookName);
    resetPreRequestRegistryForTesting();
  });

  it("loads stored hooks from SQLite when initPreRequestRegistry is called", async () => {
    createMiddlewareHook({
      name: activeHookName,
      description: "Hook that rewrites model",
      priority: 50,
      scope: { type: "global" },
      enabled: true,
      code: `
        context.model = "rewritten-by-startup-hook";
        return {};
      `,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      runCount: 0,
    });

    createMiddlewareHook({
      name: disabledHookName,
      description: "Disabled hook",
      priority: 60,
      scope: { type: "global" },
      enabled: false,
      code: `
        context.model = "should-not-run";
        return {};
      `,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      runCount: 0,
    });

    // 1. Initialize registry
    initPreRequestRegistry();

    // 2. Both hooks are restored in the registry
    const registered = getAllHooks();
    const active = registered.find((h) => h.name === activeHookName);
    const disabled = registered.find((h) => h.name === disabledHookName);

    assert.ok(active, `Hook ${activeHookName} should be present in runtime registry`);
    assert.equal(active?.enabled, true);

    assert.ok(disabled, `Hook ${disabledHookName} should be present in runtime registry`);
    assert.equal(disabled?.enabled, false);

    // 3. runHooks executes only enabled hooks
    const ctx = createHookContext({
      body: { messages: [] },
      headers: {},
      model: "original-model",
    });

    const { context } = await runHooks(ctx);
    assert.equal(context.model, "rewritten-by-startup-hook");
  });

  it("lazily restores hooks when getAllHooks or runHooks is called directly", async () => {
    createMiddlewareHook({
      name: activeHookName,
      description: "Hook that rewrites model",
      priority: 50,
      scope: { type: "global" },
      enabled: true,
      code: `
        context.model = "rewritten-lazily";
        return {};
      `,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      runCount: 0,
    });

    // Registry is reset (initialized = false)
    assert.equal(getHook(activeHookName)?.enabled, true);

    const ctx = createHookContext({
      body: { messages: [] },
      headers: {},
      model: "initial-model",
    });

    const { context } = await runHooks(ctx);
    assert.equal(context.model, "rewritten-lazily");
  });

  it("updateHook updates runtime registry config without re-creating code", () => {
    createMiddlewareHook({
      name: activeHookName,
      description: "Hook to be disabled",
      priority: 50,
      scope: { type: "global" },
      enabled: true,
      code: `return {};`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      runCount: 0,
    });

    initPreRequestRegistry();
    assert.equal(getHook(activeHookName)?.enabled, true);

    const updated = updateHook(activeHookName, { enabled: false });
    assert.equal(updated, true);
    assert.equal(getHook(activeHookName)?.enabled, false);
  });
});
