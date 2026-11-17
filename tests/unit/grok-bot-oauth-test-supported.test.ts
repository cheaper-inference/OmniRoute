import test from "node:test";
import assert from "node:assert/strict";

const { testOAuthConnection } = await import("../../src/app/api/providers/[id]/test/route.ts");

test("grok-bot OAuth connection test is no longer unsupported", async () => {
  const result = await testOAuthConnection({
    provider: "grok-bot",
    accessToken: "healthy-access-token",
    refreshToken: "healthy-refresh-token",
    tokenExpiresAt: new Date(Date.now() + 3600_000).toISOString(),
  });

  assert.notEqual(result.diagnosis?.type, "unsupported");
  assert.notEqual(result.error, "Provider test not supported");
  assert.equal(result.valid, true);
});
