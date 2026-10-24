// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";

const { recordResearchCooldown, cooldownRemainingMs } =
  await import("../../open-sse/mcp-server/tools/perplexityResearchCooldown.ts");

function recorder() {
  const patches = [];
  const merge = async (id, patch) => {
    patches.push({ id, patch });
  };
  return { patches, merge };
}

test("a finished upstream call records a 60 second cooldown", async () => {
  const { patches, merge } = recorder();
  await recordResearchCooldown({
    connectionId: "c1",
    nowMs: 1_000,
    upstreamEnded: true,
    confirmed: true,
    merge,
  });
  assert.equal(patches.length, 1);
  assert.equal(patches[0].patch.pplxResearchNextAllowedAt, 1_000 + 60_000);
});

test("a local input error records nothing", async () => {
  const { patches, merge } = recorder();
  await recordResearchCooldown({
    connectionId: "c1",
    nowMs: 1_000,
    upstreamEnded: false,
    confirmed: true,
    merge,
  });
  assert.equal(patches.length, 0);
});

test("an upstream call that never confirmed it ended records nothing", async () => {
  const { patches, merge } = recorder();
  await recordResearchCooldown({
    connectionId: "c1",
    nowMs: 1_000,
    upstreamEnded: true,
    confirmed: false,
    merge,
  });
  assert.equal(patches.length, 0);
});

test("a cooldown still in the future reports the remaining time", () => {
  assert.equal(cooldownRemainingMs({ pplxResearchNextAllowedAt: 5_000 }, 2_000), 3_000);
  assert.equal(cooldownRemainingMs({ pplxResearchNextAllowedAt: 5_000 }, 6_000), 0);
  assert.equal(cooldownRemainingMs({}, 6_000), 0);
});

test("a remembered cooldown counts even when the stored data has none", async () => {
  const { merge } = recorder();
  await recordResearchCooldown({
    connectionId: "c-mem",
    nowMs: 1_000,
    upstreamEnded: true,
    confirmed: true,
    merge,
  });
  assert.equal(cooldownRemainingMs({}, 1_000 + 30_000, "c-mem"), 30_000);
  assert.equal(cooldownRemainingMs({}, 1_000 + 30_000, "someone-else"), 0);
});
