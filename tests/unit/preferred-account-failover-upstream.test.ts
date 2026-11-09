import test from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_PREFERRED_FAILOVER_SETTINGS as defaults,
  normalizePreferredFailoverSettings,
  resolvePreferredConnectionUpstreamStartTimeoutMs as resolve,
} from "../../src/sse/services/preferredConnectionFailover.ts";

const preferred = { selectedByApiKeyPreference: true, preferredFallbackAvailable: true };
const enabled = { ...defaults, enabled: true };
const budget = (provider: string, model: string, hint?: number, settings = enabled) =>
  resolve(provider, preferred, hint, model, settings);

test("opt-in: no deadline/rotation for disabled installations", () => {
  assert.equal(defaults.enabled, false);
  assert.deepEqual(budget("openai", "gpt-6", 35000, defaults), {
    timeoutMs: 35000,
    mayRotateOnRequestTimeout: false,
  });
});

test("every eligible preferred provider uses conservative 20s default", () => {
  for (const provider of ["openai", "codex", "anthropic", "openrouter", "nvidia"]) {
    assert.deepEqual(budget(provider, "some-model"), {
      timeoutMs: 20000,
      mayRotateOnRequestTimeout: true,
    });
  }
});

test("Antigravity/agy retains fast 5s default and slow Gemini 3.8 12s exception", () => {
  for (const provider of ["antigravity", "agy"]) {
    assert.deepEqual(budget(provider, "gemini-3.7-flash-low"), {
      timeoutMs: 5000,
      mayRotateOnRequestTimeout: true,
    });
    for (const model of [
      "gemini-3.8-flash-high",
      "agy/gemini-3.8-flash-tiered",
      "gemini-3.8-flash-medium",
      "gemini-3.8-flash",
    ]) {
      assert.deepEqual(budget(provider, model), {
        timeoutMs: 12000,
        mayRotateOnRequestTimeout: true,
      });
    }
  }
});

test("per-provider overrides outrank family heuristics", () => {
  const settings = { ...enabled, providerTimeoutsMs: { antigravity: 8000, codex: 35000 } };
  assert.deepEqual(budget("agy", "gemini-3.8-flash-high", undefined, settings), {
    timeoutMs: 8000,
    mayRotateOnRequestTimeout: true,
  });
  assert.deepEqual(budget("codex", "gpt-luna", undefined, settings), {
    timeoutMs: 35000,
    mayRotateOnRequestTimeout: true,
  });
});

test("exact model overrides beat wildcard families and provider defaults", () => {
  const settings = {
    ...enabled,
    providerTimeoutsMs: { anthropic: 25000 },
    modelTimeoutsMs: {
      "anthropic/claude-*": 40000,
      "anthropic/claude-opus": 55000,
      "antigravity/gemini-3.8-flash*": 18000,
    },
  };
  assert.deepEqual(budget("anthropic", "claude-opus", undefined, settings), {
    timeoutMs: 55000,
    mayRotateOnRequestTimeout: true,
  });
  assert.deepEqual(budget("anthropic", "anthropic/claude-haiku", undefined, settings), {
    timeoutMs: 40000,
    mayRotateOnRequestTimeout: true,
  });
  assert.deepEqual(budget("anthropic", "other-model", undefined, settings), {
    timeoutMs: 25000,
    mayRotateOnRequestTimeout: true,
  });
  assert.deepEqual(budget("agy", "gemini-3.8-flash-high", undefined, settings), {
    timeoutMs: 18000,
    mayRotateOnRequestTimeout: true,
  });
});

test("zero per-provider/model overrides disable one scope without global shutdown", () => {
  const settings = {
    ...enabled,
    providerTimeoutsMs: { codex: 0 },
    modelTimeoutsMs: { "anthropic/claude-opus": 0 },
  };
  assert.deepEqual(budget("codex", "gpt-6", undefined, settings), {
    timeoutMs: undefined,
    mayRotateOnRequestTimeout: false,
  });
  assert.deepEqual(budget("anthropic", "claude-opus", 10000, settings), {
    timeoutMs: 10000,
    mayRotateOnRequestTimeout: false,
  });
  assert.deepEqual(budget("openai", "gpt-6", undefined, settings), {
    timeoutMs: 20000,
    mayRotateOnRequestTimeout: true,
  });
});

test("trusted per-request deadlines always win, never rotate if shorter/equal", () => {
  assert.deepEqual(budget("codex", "gpt-6", 15000), {
    timeoutMs: 15000,
    mayRotateOnRequestTimeout: false,
  });
  assert.deepEqual(budget("codex", "gpt-6", 20000), {
    timeoutMs: 20000,
    mayRotateOnRequestTimeout: false,
  });
  assert.deepEqual(budget("codex", "gpt-6", 25000), {
    timeoutMs: 20000,
    mayRotateOnRequestTimeout: true,
  });
});

test("forced/only/non-preferred account never applies the heuristic", () => {
  for (const cred of [
    { selectedByApiKeyPreference: true, preferredFallbackAvailable: false },
    { selectedByApiKeyPreference: false, preferredFallbackAvailable: true },
    null,
  ]) {
    assert.deepEqual(resolve("openrouter", cred, 25000, "model", enabled), {
      timeoutMs: 25000,
      mayRotateOnRequestTimeout: false,
    });
  }
});

test("normalization bounds defaults and replaces entire override maps for clearing", () => {
  const next = normalizePreferredFailoverSettings({
    enabled: true,
    defaultTimeoutMs: -1,
    providerTimeoutsMs: { codex: 30000, ["__proto__"]: 1000, test: 10 },
    modelTimeoutsMs: { "anthropic/claude-*": 40000, "bad*model": 10000 },
  });
  assert.equal(next.defaultTimeoutMs, 20000);
  assert.deepEqual(next.providerTimeoutsMs, { codex: 30000 });
  assert.deepEqual(next.modelTimeoutsMs, { "anthropic/claude-*": 40000 });
  assert.deepEqual(
    normalizePreferredFailoverSettings(
      {
        providerTimeoutsMs: {},
        modelTimeoutsMs: {},
      },
      next
    ).providerTimeoutsMs,
    {}
  );
});
