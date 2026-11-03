import test from "node:test";
import assert from "node:assert/strict";

// With PROXY_SKIP_RECENTLY_FAILED on, a pool member is set aside only on a refusal the
// provider really returned through it, and only for a provider inside the refusal scope.
// Locally generated failures carry no upstream outcome and never set a member aside. With
// the flag off (the default) nothing is ever written.

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { noteProxyOutcome } = await import("../../src/sse/handlers/proxyOutcomeMemory.ts");
const {
  egressBucketedLockProviders,
  egressQuotaRotationAllFromEnv,
  setProviderErrorRuleFlagReader,
} = await import("../../open-sse/config/providerErrorRules.ts");

const PROXY = { type: "http", host: "10.4.0.1", port: 8080 };
const KEY = memory.proxyEgressKey(PROXY);
const WIDEN_ENV = "OMNIROUTE_EGRESS_QUOTA_ROTATION_PROVIDERS";

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  delete process.env[WIDEN_ENV];
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  delete process.env[WIDEN_ENV];
});

test("a received refusal from an in-scope provider sets the member aside", () => {
  for (const provider of [...egressBucketedLockProviders(), "OpenCode-Go"]) {
    memory.__resetProxyRefusalMemoryForTesting();
    noteProxyOutcome(provider, { proxy: PROXY, upstreamStatus: 429 });
    assert.equal(memory.isProxyAvoided(KEY), true, provider);
  }
});

test("a refusal from a provider outside the scope writes nothing", () => {
  for (const provider of ["opencode-zen", "openai", null]) {
    noteProxyOutcome(provider, { proxy: PROXY, upstreamStatus: 429 });
  }
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("#16797: with OPENCODE_ZEN_EGRESS_IP_LOCK_ENABLED on, an opencode-zen refusal sets the member aside", () => {
  // The flag store is injected by accountFallback.ts at runtime; this unit wires a reader
  // that reports only this flag on, so no database is opened here.
  setProviderErrorRuleFlagReader((key) => key === "OPENCODE_ZEN_EGRESS_IP_LOCK_ENABLED");
  try {
    noteProxyOutcome("opencode-zen", { proxy: PROXY, upstreamStatus: 429 });
    assert.equal(memory.isProxyAvoided(KEY), true);
  } finally {
    setProviderErrorRuleFlagReader(null);
  }
  memory.__resetProxyRefusalMemoryForTesting();
  noteProxyOutcome("opencode-zen", { proxy: PROXY, upstreamStatus: 429 });
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0, "flag off again: nothing written");
});

test("no received status, no proxy or no proxyInfo writes nothing", () => {
  noteProxyOutcome("opencode-go", { proxy: PROXY });
  noteProxyOutcome("opencode-go", { proxy: PROXY, upstreamStatus: null });
  noteProxyOutcome("opencode-go", { proxy: null, upstreamStatus: 429 });
  noteProxyOutcome("opencode-go", null);
  noteProxyOutcome("opencode-go", undefined);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("a success from an in-scope provider clears the member, other outcomes leave it", () => {
  noteProxyOutcome("opencode-go", { proxy: PROXY, upstreamStatus: 429 });
  noteProxyOutcome("opencode-go", { proxy: PROXY, upstreamStatus: 403 });
  noteProxyOutcome("opencode-go", { proxy: PROXY, upstreamStatus: 500 });
  assert.equal(memory.isProxyAvoided(KEY), true);
  noteProxyOutcome("opencode-go", { proxy: PROXY, upstreamStatus: 200 });
  assert.equal(memory.isProxyAvoided(KEY), false);
});

test("a success from another provider only ends an unreachable period, not a refusal one", () => {
  noteProxyOutcome("opencode-go", { proxy: PROXY, upstreamStatus: 429 });
  noteProxyOutcome("openai", { proxy: PROXY, upstreamStatus: 200 });
  assert.equal(
    memory.isProxyAvoided(KEY),
    true,
    "a shared pool must not clear another scope's refusal"
  );

  memory.__resetProxyRefusalMemoryForTesting();
  memory.noteProxyRefusal(KEY, "proxy_unreachable");
  noteProxyOutcome("openai", { proxy: PROXY, upstreamStatus: 200 });
  assert.equal(memory.isProxyAvoided(KEY), false);
});

test("an edge relay is ignored: its status is the relay's", () => {
  noteProxyOutcome("opencode-go", {
    proxy: { type: "vercel", host: "relay.example.vercel.app", port: 443 },
    upstreamStatus: 429,
  });
  noteProxyOutcome("opencode-go", {
    proxy: { type: "Vercel", host: "relay.example.vercel.app", port: 443 },
    upstreamStatus: 429,
  });
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("a second note while the proxy is already set aside changes nothing", () => {
  const start = Date.now();
  const periodMs = memory.noteProxyRefusal(KEY, "ip_quota_429", start) ?? 0;
  noteProxyOutcome("opencode-go", { proxy: PROXY, upstreamStatus: 429 });
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 1);
  assert.equal(memory.isProxyAvoided(KEY, start + periodMs - 1000), true);
  assert.equal(memory.isProxyAvoided(KEY, start + periodMs + 1000), false);
});

test("with the flag opted out a received refusal writes nothing", () => {
  process.env.PROXY_SKIP_RECENTLY_FAILED = "false";
  for (const provider of egressBucketedLockProviders()) {
    noteProxyOutcome(provider, { proxy: PROXY, upstreamStatus: 429 });
  }
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("the widened quota-refusal scope is opt-in and accepts only the literal `all`", () => {
  assert.equal(
    egressQuotaRotationAllFromEnv(undefined),
    false,
    "unset keeps the family-only scope"
  );
  assert.equal(egressQuotaRotationAllFromEnv(""), false);
  assert.equal(egressQuotaRotationAllFromEnv("none"), false);
  assert.equal(egressQuotaRotationAllFromEnv("all"), true);
  assert.equal(egressQuotaRotationAllFromEnv(" ALL "), true, "case/whitespace-insensitive");
  assert.equal(
    egressQuotaRotationAllFromEnv("opencode-zen,openai"),
    false,
    "a provider list is not a widening: it would park a member for every provider"
  );
  assert.equal(egressQuotaRotationAllFromEnv("true"), false, "never a boolean-looking value");
});

test("with the scope widened, a 429 from any provider parks the member (the ask: rotate on rate limit)", () => {
  process.env[WIDEN_ENV] = "all";
  for (const provider of ["openai", "uncloseai", "cloudflare-playground", null]) {
    memory.__resetProxyRefusalMemoryForTesting();
    noteProxyOutcome(provider, { proxy: PROXY, upstreamStatus: 429 });
    assert.equal(memory.isProxyAvoided(KEY), true, String(provider));
  }
});

test("widening the 429 write does not widen the clear-on-success arm (shared pool stays honest)", () => {
  process.env[WIDEN_ENV] = "all";
  noteProxyOutcome("openai", { proxy: PROXY, upstreamStatus: 429 });
  assert.equal(memory.isProxyAvoided(KEY), true);
  noteProxyOutcome("uncloseai", { proxy: PROXY, upstreamStatus: 200 });
  assert.equal(
    memory.isProxyAvoided(KEY),
    true,
    "another provider's success proves reachability, not that this refusal ended"
  );
});
