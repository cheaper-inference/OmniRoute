import test from "node:test";
import assert from "node:assert/strict";

const { mergeClientAnthropicBeta, FORWARDABLE_CLIENT_BETAS } =
  await import("../../open-sse/config/anthropicHeaders.ts");
const { selectBetaFlags } = await import("../../open-sse/executors/claudeIdentity.ts");

const FAST_MODE_BETA = "fast-mode-2026-02-01";

test("the fast-mode beta is on the forwardable client allowlist", () => {
  assert.ok(
    FORWARDABLE_CLIENT_BETAS.includes(FAST_MODE_BETA),
    `${FAST_MODE_BETA} must be forwardable`
  );
});

test("mergeClientAnthropicBeta keeps the fast-mode beta the client sent", () => {
  const out = mergeClientAnthropicBeta(
    "claude-code-20250219,oauth-2025-04-20",
    `oauth-2025-04-20,${FAST_MODE_BETA}`
  );
  const tokens = out.split(",");

  assert.equal(tokens.filter((token) => token === FAST_MODE_BETA).length, 1, "forwarded once");
  assert.deepEqual(tokens.slice(0, 2), ["claude-code-20250219", "oauth-2025-04-20"]);
});

test("mergeClientAnthropicBeta does not add the fast-mode beta the client did not send", () => {
  const out = mergeClientAnthropicBeta("claude-code-20250219,oauth-2025-04-20", "oauth-2025-04-20");

  assert.equal(out.split(",").includes(FAST_MODE_BETA), false, "must stay opt-in by the client");
});

test("selectBetaFlags emits the fast-mode beta for a body carrying speed", () => {
  const flags = selectBetaFlags({ model: "claude-opus-5", speed: "fast", messages: [] }, null, null);

  assert.ok(flags.split(",").includes(FAST_MODE_BETA), "a speed-carrying body gates its own beta");
});

test("selectBetaFlags emits the fast-mode beta when the client negotiated its own betas", () => {
  const flags = selectBetaFlags(
    { model: "claude-opus-5", speed: "standard", messages: [] },
    null,
    "oauth-2025-04-20,effort-2025-11-24"
  );

  assert.ok(flags.split(",").includes(FAST_MODE_BETA), "not gated on the client beta header");
});

test("selectBetaFlags leaves the fast-mode beta off a body without speed", () => {
  const flags = selectBetaFlags({ model: "claude-opus-5", messages: [] }, null, null);

  assert.equal(flags.split(",").includes(FAST_MODE_BETA), false, "shape-matched sets only");
});
