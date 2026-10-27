/**
 * Claude Code sends the top-level `fallbacks` body parameter (server-side model fallback) together
 * with the betas `server-side-fallback-2026-06-01` and `server-side-fallback-2026-07-01`. The body
 * field passes through the proxy untouched, but the betas were dropped by the allowlist merge, so
 * upstream answered `400 fallbacks: Extra inputs are not permitted` — the same field-travels /
 * beta-drops shape as the other per-turn betas on FORWARDABLE_CLIENT_BETAS.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { mergeClientAnthropicBeta, FORWARDABLE_CLIENT_BETAS } =
  await import("../../open-sse/config/anthropicHeaders.ts");

const SERVER_SIDE_FALLBACK_BETAS = [
  "server-side-fallback-2026-06-01",
  "server-side-fallback-2026-07-01",
];

test("server-side-fallback betas are on the forwardable client allowlist", () => {
  for (const beta of SERVER_SIDE_FALLBACK_BETAS) {
    assert.ok(FORWARDABLE_CLIENT_BETAS.includes(beta), `${beta} must be forwardable`);
  }
});

test("mergeClientAnthropicBeta keeps the server-side-fallback betas the client sent", () => {
  const out = mergeClientAnthropicBeta(
    "claude-code-20250219,oauth-2025-04-20",
    `oauth-2025-04-20,${SERVER_SIDE_FALLBACK_BETAS.join(",")}`
  );
  const tokens = out.split(",");

  for (const beta of SERVER_SIDE_FALLBACK_BETAS) {
    assert.equal(tokens.filter((token) => token === beta).length, 1, `${beta} forwarded once`);
  }
  assert.deepEqual(tokens.slice(0, 2), ["claude-code-20250219", "oauth-2025-04-20"]);
});

test("mergeClientAnthropicBeta does not add the server-side-fallback betas the client did not send", () => {
  const out = mergeClientAnthropicBeta("claude-code-20250219,oauth-2025-04-20", "oauth-2025-04-20");

  for (const beta of SERVER_SIDE_FALLBACK_BETAS) {
    assert.equal(out.split(",").includes(beta), false, `${beta} must stay opt-in by the client`);
  }
});
