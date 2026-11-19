import test from "node:test";
import assert from "node:assert/strict";
import {
  applyTaskAwareRouting,
  setTaskRoutingConfig,
  getTaskRoutingConfig,
  resetTaskRoutingStats,
  hydrateTaskRoutingConfig,
} from "../../open-sse/services/taskAwareRouter.ts";
import { updateTaskRoutingSchema } from "../../src/shared/validation/schemas/routing.ts";

test.beforeEach(() => {
  resetTaskRoutingStats();
  setTaskRoutingConfig({
    enabled: true,
    detectionEnabled: true,
    taskModelMap: {
      coding: "auto/coding",
      creative: "",
      analysis: "auto/reasoning",
      vision: "auto/vision",
      summarization: "auto/chat:fast",
      background: "auto/chat:cheap",
      chat: "",
    },
    targetModels: undefined,
    excludedModels: undefined,
  });
});

test("#20294 applyTaskAwareRouting respects targetModels scoping", () => {
  setTaskRoutingConfig({
    targetModels: ["auto/dev", "combo/primary"],
  });

  const codingBody = {
    messages: [{ role: "user", content: "write a python function to calculate fibonacci" }],
  };

  // Matching targetModels exactly
  const res1 = applyTaskAwareRouting("auto/dev", codingBody);
  assert.equal(res1.wasRouted, true);
  assert.equal(res1.model, "auto/coding");
  assert.equal(res1.taskType, "coding");

  // Matching targetModels prefix
  const res2 = applyTaskAwareRouting("auto/dev:fast", codingBody);
  assert.equal(res2.wasRouted, true);
  assert.equal(res2.model, "auto/coding");

  // Non-matching model
  const res3 = applyTaskAwareRouting("codestral", codingBody);
  assert.equal(res3.wasRouted, false);
  assert.equal(res3.model, "codestral");

  // Another non-matching model
  const res4 = applyTaskAwareRouting("auto/cyber", codingBody);
  assert.equal(res4.wasRouted, false);
  assert.equal(res4.model, "auto/cyber");

  const config = getTaskRoutingConfig();
  // Only the 2 matching requests were counted towards detected/routed
  assert.equal(config.stats.routed, 2);
  assert.equal(config.stats.detected, 2);
});

test("#20294 applyTaskAwareRouting respects excludedModels", () => {
  setTaskRoutingConfig({
    targetModels: undefined,
    excludedModels: ["codestral", "auto/cyber"],
  });

  const codingBody = {
    messages: [{ role: "user", content: "implement a binary search tree in typescript" }],
  };

  // Excluded model exactly
  const res1 = applyTaskAwareRouting("codestral", codingBody);
  assert.equal(res1.wasRouted, false);
  assert.equal(res1.model, "codestral");

  // Excluded model prefix
  const res2 = applyTaskAwareRouting("auto/cyber:strict", codingBody);
  assert.equal(res2.wasRouted, false);
  assert.equal(res2.model, "auto/cyber:strict");

  // Non-excluded model
  const res3 = applyTaskAwareRouting("openai/gpt-4o", codingBody);
  assert.equal(res3.wasRouted, true);
  assert.equal(res3.model, "auto/coding");

  const config = getTaskRoutingConfig();
  assert.equal(config.stats.routed, 1);
  assert.equal(config.stats.detected, 1);
});

test("#20294 excludedModels takes precedence when model matches targetModels and excludedModels", () => {
  setTaskRoutingConfig({
    targetModels: ["auto/dev"],
    excludedModels: ["auto/dev:no-route"],
  });

  const codingBody = {
    messages: [{ role: "user", content: "fix the bug in this function" }],
  };

  const res = applyTaskAwareRouting("auto/dev:no-route", codingBody);
  assert.equal(res.wasRouted, false);
  assert.equal(res.model, "auto/dev:no-route");
});

test("#20294 a scoped model id does not match a different model it merely prefixes", () => {
  const codingBody = {
    messages: [{ role: "user", content: "write a python function to calculate fibonacci" }],
  };

  setTaskRoutingConfig({ targetModels: ["openai/gpt-4o"], excludedModels: undefined });
  assert.equal(applyTaskAwareRouting("openai/gpt-4o", codingBody).wasRouted, true);
  assert.equal(applyTaskAwareRouting("openai/gpt-4o:thinking", codingBody).wasRouted, true);
  const mini = applyTaskAwareRouting("openai/gpt-4o-mini", codingBody);
  assert.equal(mini.wasRouted, false);
  assert.equal(mini.model, "openai/gpt-4o-mini");

  setTaskRoutingConfig({ targetModels: undefined, excludedModels: ["openai/gpt-4o"] });
  assert.equal(applyTaskAwareRouting("openai/gpt-4o", codingBody).wasRouted, false);
  assert.equal(applyTaskAwareRouting("openai/gpt-4o-mini", codingBody).wasRouted, true);

  // A provider or namespace entry still scopes every model under it.
  setTaskRoutingConfig({ targetModels: ["openai"], excludedModels: undefined });
  assert.equal(applyTaskAwareRouting("openai/gpt-4o-mini", codingBody).wasRouted, true);
  assert.equal(applyTaskAwareRouting("openai-compatible/gpt-4o", codingBody).wasRouted, false);
});

test("#20294 updateTaskRoutingSchema accepts and validates targetModels and excludedModels", () => {
  const valid = updateTaskRoutingSchema.safeParse({
    targetModels: ["auto/dev", "combo/primary"],
    excludedModels: ["auto/cyber"],
  });
  assert.ok(valid.success);
  if (valid.success) {
    assert.deepEqual(valid.data.targetModels, ["auto/dev", "combo/primary"]);
    assert.deepEqual(valid.data.excludedModels, ["auto/cyber"]);
  }

  const emptyString = updateTaskRoutingSchema.safeParse({
    targetModels: [""],
  });
  assert.equal(emptyString.success, false);

  const tooLong = updateTaskRoutingSchema.safeParse({
    excludedModels: ["a".repeat(201)],
  });
  assert.equal(tooLong.success, false);
});

test("#20294 hydrateTaskRoutingConfig restores targetModels and excludedModels from persisted settings", () => {
  const persisted = JSON.stringify({
    enabled: true,
    detectionEnabled: true,
    taskModelMap: {
      coding: "auto/coding",
      creative: "",
      analysis: "auto/reasoning",
      vision: "auto/vision",
      summarization: "auto/chat:fast",
      background: "auto/chat:cheap",
      chat: "",
    },
    targetModels: ["auto/dev"],
    excludedModels: ["codestral"],
  });

  const hydrated = hydrateTaskRoutingConfig({ taskRouting: persisted });
  assert.equal(hydrated, true);

  const config = getTaskRoutingConfig();
  assert.deepEqual(config.targetModels, ["auto/dev"]);
  assert.deepEqual(config.excludedModels, ["codestral"]);
});

test("#20294 without scoping (unset or empty lists) every model is still routed and counted", () => {
  const codingBody = {
    messages: [{ role: "user", content: "write a python function to calculate fibonacci" }],
  };
  const models = ["auto/dev", "codestral", "openai/gpt-4o-mini", "combo/primary"];

  for (const scope of [
    { targetModels: undefined, excludedModels: undefined },
    { targetModels: [], excludedModels: [] },
  ]) {
    resetTaskRoutingStats();
    setTaskRoutingConfig(scope);
    for (const model of models) {
      assert.deepEqual(applyTaskAwareRouting(model, codingBody), {
        model: "auto/coding",
        taskType: "coding",
        wasRouted: true,
      });
    }
    const { stats } = getTaskRoutingConfig();
    assert.equal(stats.detected, models.length);
    assert.equal(stats.routed, models.length);
  }

  // A pre-#20294 persisted config (no scoping keys) hydrates without adding any scope.
  setTaskRoutingConfig({ targetModels: undefined, excludedModels: undefined });
  const hydrated = hydrateTaskRoutingConfig({
    taskRouting: JSON.stringify({ enabled: true, detectionEnabled: true }),
  });
  assert.equal(hydrated, true);
  const config = getTaskRoutingConfig();
  assert.equal(config.targetModels, undefined);
  assert.equal(config.excludedModels, undefined);
  assert.equal(applyTaskAwareRouting("codestral", codingBody).wasRouted, true);
});
