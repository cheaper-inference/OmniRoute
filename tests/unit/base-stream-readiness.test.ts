/**
 * #111 (B17 closure) — base executor first-byte readiness gate config.
 *
 * glm/kiro/grok-web/zed executors already run ensureStreamReadiness(); the
 * base executor (serving custom anthropic-compatible nodes, e.g. the
 * production Volcano Ark lanes) did not. These tests pin the gate's scope
 * and dial semantics: default ON only for anthropic-compatible providers at
 * the glm-identical deadline, OMNIROUTE_BASE_STREAM_READINESS = "auto"
 * (size-scaled, clamped) | <ms> (fixed) | "0" (off), junk → default.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { resolveBaseStreamReadiness, isBaseStreamReadinessProvider } = await import(
  "../../open-sse/executors/baseStreamReadiness.ts"
);

const AC = "anthropic-compatible-d70a9997-f802-49b6-92fc-92a60a018fc2";
const BASE = 60_000;

test("#111 scope: only anthropic-compatible providers are gated", () => {
  assert.equal(isBaseStreamReadinessProvider(AC), true);
  assert.equal(isBaseStreamReadinessProvider("anthropic-compatible"), true);
  assert.equal(isBaseStreamReadinessProvider("glm-cn"), false);
  assert.equal(isBaseStreamReadinessProvider("tencent"), false);
  assert.equal(isBaseStreamReadinessProvider(""), false);
  assert.equal(isBaseStreamReadinessProvider(null), false);
});

test("#111 unset env: ON for anthropic-compatible at the glm-identical default deadline", () => {
  const g = resolveBaseStreamReadiness({ provider: AC, defaultTimeoutMs: BASE, env: "" });
  assert.deepEqual(
    { enabled: g.enabled, timeoutMs: g.timeoutMs, mode: g.mode },
    { enabled: true, timeoutMs: BASE, mode: "default" }
  );
});

test("#111 unset env: OFF for every non-anthropic provider — zero blast radius elsewhere", () => {
  for (const p of ["glm-cn", "tencent", "openai", "codex", ""]) {
    const g = resolveBaseStreamReadiness({ provider: p, defaultTimeoutMs: BASE, env: "" });
    assert.equal(g.enabled, false, p);
  }
});

test("#111 '0' kills the gate even for anthropic-compatible", () => {
  const g = resolveBaseStreamReadiness({ provider: AC, defaultTimeoutMs: BASE, env: "0" });
  assert.deepEqual(
    { enabled: g.enabled, timeoutMs: g.timeoutMs, mode: g.mode },
    { enabled: false, timeoutMs: 0, mode: "off" }
  );
});

test("#111 fixed ms: pinning the deadline ignores body size", () => {
  const g = resolveBaseStreamReadiness({
    provider: AC,
    bodyByteLength: 900_000,
    defaultTimeoutMs: BASE,
    env: "42000",
  });
  assert.deepEqual(
    { enabled: g.enabled, timeoutMs: g.timeoutMs, mode: g.mode },
    { enabled: true, timeoutMs: 42_000, mode: "fixed" }
  );
});

test("#111 auto: deadline scales with serialized body bytes and never drops below base", () => {
  const small = resolveBaseStreamReadiness({
    provider: AC,
    bodyByteLength: 12_000, // ≈4k est. tokens → 60_000 + 6_000
    defaultTimeoutMs: BASE,
    env: "auto",
  });
  assert.equal(small.mode, "auto");
  assert.equal(small.enabled, true);
  assert.equal(small.timeoutMs, 66_000);

  const empty = resolveBaseStreamReadiness({
    provider: AC,
    bodyByteLength: 0,
    defaultTimeoutMs: BASE,
    env: "auto",
  });
  assert.equal(empty.timeoutMs, BASE);
});

test("#111 auto: clamps at the 180s ceiling (below the 240s combo global budget) so huge contexts cannot buy a deadline the combo timer would waste", () => {
  const g = resolveBaseStreamReadiness({
    provider: AC,
    bodyByteLength: 900_000, // ≈300k est. tokens → unclamped 510_000
    defaultTimeoutMs: BASE,
    env: "auto",
  });
  assert.equal(g.timeoutMs, 180_000);
});

test("#111 junk env value falls back to the default gate (safe posture)", () => {
  const g = resolveBaseStreamReadiness({ provider: AC, defaultTimeoutMs: BASE, env: "banana" });
  assert.deepEqual(
    { enabled: g.enabled, timeoutMs: g.timeoutMs, mode: g.mode },
    { enabled: true, timeoutMs: BASE, mode: "default" }
  );
});
