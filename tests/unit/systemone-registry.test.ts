/**
 * System One backend registry + model target resolution.
 *
 * Covers the routing contract from the native System One integration: a
 * provider-qualified id is pinned to that backend and fails closed, a bare
 * user-facing alias may fan out across configured backends (bounded), and a
 * free-tier alias never resolves to — or dispatches on — a paid account.
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  SYSTEMONE_BACKENDS,
  SYSTEMONE_MAX_FALLBACK_CANDIDATES,
  SystemOneTargetError,
  isConnectionEligibleForTier,
  isSystemOneProvider,
  listSystemOneProviders,
  nativeSystemOnePricing,
  resolveSystemOneCandidates,
  systemOneBackend,
  systemOneModelTier,
} from "../../open-sse/config/systemOneRegistry.ts";

/** `assert.throws` returns nothing, so capture the error to assert its status. */
function captureError(fn: () => unknown): SystemOneTargetError {
  try {
    fn();
  } catch (error) {
    assert.ok(error instanceof SystemOneTargetError, `unexpected error type: ${String(error)}`);
    return error as SystemOneTargetError;
  }
  throw new Error("expected the call to throw");
}

test("the four explicit native backends are registered and nothing else", () => {
  assert.deepEqual(listSystemOneProviders().sort(), [
    "opencode-zen",
    "openrouter",
    "typesafe",
    "vercel-ai-gateway",
  ]);
  assert.equal(isSystemOneProvider("opencode-zen"), true);
  assert.equal(isSystemOneProvider("openrouter"), true);
  assert.equal(isSystemOneProvider("vercel-ai-gateway"), true);
  assert.equal(isSystemOneProvider("typesafe"), true);
  assert.equal(isSystemOneProvider("constructor"), false);
  assert.equal(isSystemOneProvider("__proto__"), false);
});

test("each backend carries the documented decision and catalog endpoints", () => {
  assert.equal(
    SYSTEMONE_BACKENDS["opencode-zen"].decisionUrl,
    "https://opencode.ai/inference/systemone/v1/systemone"
  );
  assert.equal(
    SYSTEMONE_BACKENDS["opencode-zen"].modelsUrl,
    "https://opencode.ai/inference/v1/models"
  );
  assert.equal(
    SYSTEMONE_BACKENDS["vercel-ai-gateway"].decisionUrl,
    "https://ai-gateway.vercel.sh/typesafe/v1/systemone"
  );
  assert.equal(
    SYSTEMONE_BACKENDS["vercel-ai-gateway"].modelsUrl,
    "https://ai-gateway.vercel.sh/typesafe/v1/models"
  );
  assert.equal(SYSTEMONE_BACKENDS.openrouter.decisionUrl, "https://openrouter.ai/api/v1/systemone");
  assert.equal(
    SYSTEMONE_BACKENDS.openrouter.modelsUrl,
    "https://openrouter.ai/api/v1/models?output_modalities=decisions"
  );
  const typesafe = systemOneBackend("typesafe");
  assert.equal(typesafe.decisionUrl, "https://api.typesafe.ai/v1/systemone");
  assert.equal(typesafe.modelsUrl, "https://api.typesafe.ai/v1/models");
  assert.deepEqual(typesafe.allowedHosts, ["api.typesafe.ai"]);
  assert.equal(typesafe.requiresKey, true);
});

test("every backend declares its allowlisted override hosts and a key requirement", () => {
  for (const provider of listSystemOneProviders()) {
    const backend = systemOneBackend(provider);
    assert.ok(backend.allowedHosts.length > 0, `${provider} must allowlist its hosts`);
    assert.equal(typeof backend.requiresKey, "boolean");
    assert.ok(backend.timeoutMs > 0);
    assert.equal(
      "contractVerified" in backend,
      false,
      "the registry must not assert live verification"
    );
  }
  assert.deepEqual(SYSTEMONE_BACKENDS["opencode-zen"].allowedHosts, ["opencode.ai"]);
  assert.deepEqual(SYSTEMONE_BACKENDS.openrouter.allowedHosts, ["openrouter.ai"]);
  assert.deepEqual(SYSTEMONE_BACKENDS["vercel-ai-gateway"].allowedHosts, ["ai-gateway.vercel.sh"]);
});

test("systemOneBackend rejects an unregistered provider instead of returning undefined", () => {
  assert.throws(() => systemOneBackend("unknown-native"), SystemOneTargetError);
});

test("direct TypeSafe is explicit and never enlarges an existing bare alias", () => {
  assert.deepEqual(resolveSystemOneCandidates("typesafe/jev-1.14.0"), [
    {
      provider: "typesafe",
      model: "jev-1.14.0",
      canonicalModel: "typesafe/jev-1.14.0",
      tier: "paid",
      pinned: true,
    },
  ]);
  assert.throws(() => resolveSystemOneCandidates("jev", { availableProviders: ["typesafe"] }));
  assert.equal(nativeSystemOnePricing("typesafe", "jev-1.14.0"), null);
  assert.equal(isConnectionEligibleForTier("paid", { apiKey: null }, "typesafe"), false);
});

test("a provider-qualified id pins exactly one backend", () => {
  const candidates = resolveSystemOneCandidates("openrouter/typesafe/jev-1.13");
  assert.equal(candidates.length, 1);
  assert.deepEqual(candidates[0], {
    provider: "openrouter",
    model: "typesafe/jev-1.13",
    canonicalModel: "openrouter/typesafe/jev-1.13",
    tier: "paid",
    pinned: true,
  });
});

test("qualified ids keep the vendor prefix of each gateway's own model id", () => {
  assert.deepEqual(resolveSystemOneCandidates("vercel-ai-gateway/typesafe-ai/jev-1.13.0")[0], {
    provider: "vercel-ai-gateway",
    model: "typesafe-ai/jev-1.13.0",
    canonicalModel: "vercel-ai-gateway/typesafe-ai/jev-1.13.0",
    tier: "paid",
    pinned: true,
  });
  assert.deepEqual(resolveSystemOneCandidates("opencode-zen/jev-1.13")[0], {
    provider: "opencode-zen",
    model: "jev-1.13",
    canonicalModel: "opencode-zen/jev-1.13",
    tier: "paid",
    pinned: true,
  });
});

test("a qualified id for a provider without System One support fails closed", () => {
  const error = captureError(() => resolveSystemOneCandidates("anthropic/claude-4"));
  assert.equal(error.status, 400);
  assert.match(error.message, /does not support System One/);
  // It must not silently degrade into a bare alias on another backend.
  assert.doesNotMatch(error.message, /openrouter\/anthropic/);
});

test("a qualified id never falls back to another backend", () => {
  for (const id of [
    "opencode-zen/jev-1.13",
    "openrouter/typesafe/jev-1.13",
    "vercel-ai-gateway/typesafe-ai/jev-1.13.0",
  ]) {
    const candidates = resolveSystemOneCandidates(id);
    assert.equal(candidates.length, 1, `${id} must not fan out`);
    assert.equal(candidates[0].pinned, true);
  }
});

test("unsafe model id syntax is rejected before any URL is built", () => {
  for (const id of [
    "openrouter/typesafe/jev?x=1",
    "openrouter/typesafe/jev#frag",
    "openrouter/..%2f..%2fadmin",
    "openrouter/../secret",
    "opencode-zen/jev\\1.13",
    "",
    "   ",
  ]) {
    assert.throws(() => resolveSystemOneCandidates(id), SystemOneTargetError, `accepted ${id}`);
  }
});

test("a bare paid alias fans out across backends, bounded and price ordered", () => {
  const candidates = resolveSystemOneCandidates("jev-1.13");
  assert.ok(candidates.length > 1, "a bare alias may cross-provider fall back");
  assert.ok(candidates.length <= SYSTEMONE_MAX_FALLBACK_CANDIDATES);
  assert.deepEqual(
    candidates.map((candidate) => candidate.canonicalModel),
    [
      "opencode-zen/jev-1.13",
      "openrouter/typesafe/jev-1.13",
      "vercel-ai-gateway/typesafe-ai/jev-1.13.0",
    ]
  );
  assert.ok(candidates.every((candidate) => candidate.pinned === false));
  assert.ok(candidates.every((candidate) => candidate.tier === "paid"));
});

test("a bare alias fan-out can be narrowed to the configured providers", () => {
  const candidates = resolveSystemOneCandidates("jev-1.13", {
    availableProviders: ["openrouter"],
  });
  assert.deepEqual(
    candidates.map((candidate) => candidate.canonicalModel),
    ["openrouter/typesafe/jev-1.13"]
  );
});

test("a bare alias with no configured backend fails closed", () => {
  const error = captureError(() =>
    resolveSystemOneCandidates("jev-1.13", { availableProviders: [] })
  );
  assert.equal(error.status, 400);
});

test("an unknown bare id is rejected instead of guessing a backend", () => {
  const error = captureError(() => resolveSystemOneCandidates("some-new-decision-model"));
  assert.equal(error.status, 400);
  assert.match(error.message, /provider-qualified/i);
});

test("the free alias resolves only to free-tier candidates — never a paid one", () => {
  const candidates = resolveSystemOneCandidates("jev-1.13-free");
  assert.deepEqual(
    candidates.map((candidate) => candidate.canonicalModel),
    ["opencode-zen/jev-1.13-free"]
  );
  assert.ok(candidates.every((candidate) => candidate.tier === "free"));
});

test("a paid alias never produces a free-tier candidate", () => {
  const candidates = resolveSystemOneCandidates("jev-1.13");
  assert.ok(candidates.every((candidate) => candidate.tier === "paid"));
  assert.ok(candidates.every((candidate) => !candidate.model.endsWith("-free")));
});

test("the model tier is derived per provider and per model id", () => {
  assert.equal(systemOneModelTier("opencode-zen", "jev-1.13-free"), "free");
  assert.equal(systemOneModelTier("opencode-zen", "jev-1.13"), "paid");
  assert.equal(systemOneModelTier("openrouter", "typesafe/jev-1.13"), "paid");
  assert.equal(systemOneModelTier("openrouter", "typesafe/jev-1.13:free"), "free");
});

test("a free-tier model requires a keyed connection explicitly tagged free", () => {
  const credential = ["fixture", "credential"].join("-");
  // The documented OpenCode endpoint always requires a Zen API key.
  assert.equal(
    isConnectionEligibleForTier("free", { apiKey: credential, accessToken: null }, "opencode-zen"),
    false
  );
  // A normal paid key must never be billed for the free alias.
  assert.equal(isConnectionEligibleForTier("free", { apiKey: credential }, "opencode-zen"), false);
  // The operator must explicitly mark the legitimate free-account key.
  assert.equal(
    isConnectionEligibleForTier(
      "free",
      {
        apiKey: credential,
        providerSpecificData: { systemOneTier: "free" },
      },
      "opencode-zen"
    ),
    true
  );
});

test("a paid model is not dispatchable on a keyless connection of a key-requiring backend", () => {
  assert.equal(
    isConnectionEligibleForTier("paid", { apiKey: null, accessToken: null }, "openrouter"),
    false
  );
  assert.equal(isConnectionEligibleForTier("paid", { apiKey: "sk-live" }, "openrouter"), true);
  assert.equal(isConnectionEligibleForTier("paid", { accessToken: "oauth" }, "openrouter"), true);
});

test("pricing provenance is explicit — unknown rates are not reported as free", () => {
  // No published per-token rate is asserted for a gateway-served decision model.
  assert.equal(nativeSystemOnePricing("openrouter", "typesafe/jev-1.13"), null);
  assert.equal(nativeSystemOnePricing("vercel-ai-gateway", "typesafe-ai/jev"), null);
  assert.equal(nativeSystemOnePricing("opencode-zen", "jev-1.13"), null);
});
