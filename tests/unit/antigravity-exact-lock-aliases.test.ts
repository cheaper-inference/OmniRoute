import test from "node:test";
import assert from "node:assert/strict";

import { buildExactModelLockKey } from "../../open-sse/services/accountFallback/exactModelLock.ts";

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
