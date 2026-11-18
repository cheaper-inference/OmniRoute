import test from "node:test";
import assert from "node:assert/strict";

import { buildExactModelLockKey } from "../../open-sse/services/accountFallback/exactModelLock.ts";
import {
  clearAllModelLockouts,
  clearModelLock,
  getAllModelLockouts,
  isModelLocked,
  lockExactModel,
  recordModelLockoutFailure,
} from "../../open-sse/services/accountFallback.ts";
import { clearModelUnavailability } from "../../src/domain/modelAvailability.ts";

test.afterEach(() => clearAllModelLockouts());

test("Antigravity aliases and their upstream model ids use one exact lock key", () => {
  for (const [display, upstream] of [
    ["gemini-3.7-flash-high", "gemini-3.7-flash-tiered"],
    ["gemini-3.8-flash", "gemini-3.8-flash-high"],
    ["gemini-3-pro-image-preview", "gemini-3-pro-image"],
    ["gemini-claude-sonnet-4-5", "claude-sonnet-4-6"],
  ]) {
    assert.equal(
      buildExactModelLockKey("antigravity", "account-1", display),
      buildExactModelLockKey("antigravity", "account-1", upstream),
      display
    );
    assert.equal(
      buildExactModelLockKey("antigravity", "account-1", `agy/${display}`),
      buildExactModelLockKey("antigravity", "account-1", upstream),
      "qualified alias " + display
    );
  }
});

test("exact Antigravity locks still distinguish different real upstream tiers/accounts", () => {
  assert.notEqual(
    buildExactModelLockKey("antigravity", "account-1", "gemini-3.8-flash-low"),
    buildExactModelLockKey("antigravity", "account-1", "gemini-3.8-flash-high")
  );
  assert.notEqual(
    buildExactModelLockKey("antigravity", "account-1", "gemini-3.8-flash-high"),
    buildExactModelLockKey("antigravity", "account-2", "gemini-3.8-flash-high")
  );
});

test("an exact lockout follows the model across its Antigravity display and wire ids", () => {
  for (const [display, upstream] of [
    ["gemini-3.8-flash", "gemini-3.8-flash-high"],
    ["gemini-3.1-pro-high", "gemini-pro-agent"],
    ["gemini-claude-sonnet-4-5", "claude-sonnet-4-6"],
  ]) {
    lockExactModel("antigravity", "account-1", display, "server_error", 60_000);

    assert.equal(isModelLocked("antigravity", "account-1", upstream), true, display);
    assert.equal(isModelLocked("antigravity", "account-1", `agy/${display}`), true, display);
    assert.equal(isModelLocked("antigravity", "account-2", upstream), false, display);
    assert.deepEqual(
      getAllModelLockouts().map((entry) => entry.model),
      [upstream]
    );

    assert.equal(clearModelLock("antigravity", "account-1", upstream), true, display);
    assert.equal(isModelLocked("antigravity", "account-1", display), false, display);

    lockExactModel("antigravity", "account-1", upstream, "server_error", 60_000);
    assert.equal(isModelLocked("antigravity", "account-1", display), true, upstream);
    assert.equal(clearModelLock("antigravity", "account-1", display), true, upstream);
  }
});

test("unblocking a model by any Antigravity id clears its exact lockout", () => {
  for (const [locked, requested] of [
    ["gemini-3.8-flash", "gemini-3.8-flash"],
    ["gemini-3.8-flash", "gemini-3.8-flash-high"],
    ["gemini-3.8-flash-high", "gemini-3.8-flash"],
    ["gemini-3.8-flash", "agy/gemini-3.8-flash"],
    ["gemini-3.1-pro-high", "gemini-3.1-pro-high"],
  ]) {
    lockExactModel("antigravity", "account-1", locked, "server_error", 60_000);
    lockExactModel("antigravity", "account-2", locked, "server_error", 60_000);

    assert.equal(clearModelUnavailability("antigravity", requested), true, requested);
    assert.equal(isModelLocked("antigravity", "account-1", locked), false, requested);
    assert.equal(isModelLocked("antigravity", "account-2", locked), false, requested);
  }
});

test("unblocking one Antigravity model leaves a different tier locked", () => {
  lockExactModel("antigravity", "account-1", "gemini-3.8-flash-low", "server_error", 60_000);

  assert.equal(clearModelUnavailability("antigravity", "gemini-3.8-flash"), false);
  assert.equal(isModelLocked("antigravity", "account-1", "gemini-3.8-flash-low"), true);
});

test("repeated failures escalate one cooldown across Antigravity aliases", () => {
  const record = (model: string) =>
    recordModelLockoutFailure("antigravity", "account-1", model, "server_error", 503, 1_000);

  assert.equal(record("gemini-3.8-flash").failureCount, 1);
  assert.equal(record("gemini-3.8-flash-high").failureCount, 2);
});

test("every Gemini 3.7 Flash tier shares one exact lock, unlike the 3.8 tiers", () => {
  lockExactModel("antigravity", "account-1", "gemini-3.7-flash-high", "server_error", 60_000);

  for (const sibling of [
    "gemini-3.7-flash",
    "gemini-3.7-flash-medium",
    "gemini-3.7-flash-low",
    "gemini-3.7-flash-tiered",
  ]) {
    assert.equal(isModelLocked("antigravity", "account-1", sibling), true, sibling);
  }

  lockExactModel("antigravity", "account-1", "gemini-3.8-flash-high", "server_error", 60_000);
  assert.equal(isModelLocked("antigravity", "account-1", "gemini-3.8-flash-low"), false);
});

test("non-Antigravity providers do not rewrite model aliases", () => {
  assert.equal(
    buildExactModelLockKey("claude", "account-1", "agy/gemini-3.7-flash-high"),
    "claude:account-1:exact:agy/gemini-3.7-flash-high"
  );
  assert.notEqual(
    buildExactModelLockKey("claude", "account-1", "gemini-3.7-flash-high"),
    buildExactModelLockKey("claude", "account-1", "gemini-3.7-flash-tiered")
  );
});
