import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-anthropic16406-"));
process.env.DATA_DIR = dir;
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const scope = await import("../../open-sse/services/accountFallback/perModelFailureScope.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
for (const errorText of [
  "model: claude-haiku-4.5",
  JSON.stringify({
    type: "error",
    error: { type: "not_found_error", message: "model: claude-haiku-4.5" },
  }),
  "model not found",
]) {
  test(`Anthropic model404 does not cool connection: ${errorText}`, async () => {
    core.resetDbInstance();
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });
    const conn = await db.createProviderConnection({
      provider: "anthropic",
      authType: "apikey",
      apiKey: "test-key",
      isActive: true,
      testStatus: "active",
    });
    await auth.markAccountUnavailable(conn.id, 404, errorText, "anthropic", "claude-haiku-4.5");
    const after = await db.getProviderConnectionById(conn.id);
    assert.equal(after.testStatus, "active");
    assert.ok(
      !after.rateLimitedUntil,
      `unexpected whole-account cooldown ${after.rateLimitedUntil}`
    );
    assert.equal(
      fallback.getModelLockoutInfo("anthropic", conn.id, "claude-haiku-4.5")?.reason,
      "not_found"
    );
    assert.equal(fallback.getModelLockoutInfo("anthropic", conn.id, "claude-sonnet-4-6"), null);
    const sibling = await auth.getProviderCredentials(
      "anthropic",
      null,
      [conn.id],
      "claude-sonnet-4-6"
    );
    assert.ok(sibling && !("allRateLimited" in sibling), "sibling must remain selectable");
  });
}

for (const [name, status, body, provider, model, expected] of [
  ["raw exact", 404, "model: claude-haiku-4-5", "anthropic", "claude-haiku-4-5", true],
  [
    "object exact",
    404,
    { error: { type: "not_found_error", message: "model: claude-haiku-4-5" } },
    "anthropic",
    "claude-haiku-4-5",
    true,
  ],
  ["endpoint", 404, "404 page not found", "anthropic", "claude-haiku-4-5", false],
  ["other model", 404, "model: claude-haiku-4-50", "anthropic", "claude-haiku-4-5", false],
  ["other provider", 404, "model: claude-haiku-4-5", "groq", "claude-haiku-4-5", false],
  ["unauthorized", 401, "model: claude-haiku-4-5", "anthropic", "claude-haiku-4-5", false],
  ["quota", 429, "model: claude-haiku-4-5", "anthropic", "claude-haiku-4-5", false],
  ["server", 500, "model: claude-haiku-4-5", "anthropic", "claude-haiku-4-5", false],
  [
    "extra context",
    404,
    "model: claude-haiku-4-5 (endpoint /v1/messages)",
    "anthropic",
    "claude-haiku-4-5",
    false,
  ],
  ["missing model", 404, "model: claude-haiku-4-5", "anthropic", null, false],
] as const) {
  test(`model scope: ${name}`, () =>
    assert.equal(
      scope.hasPerModelFailureScope(provider, model, undefined, status, body),
      expected
    ));
}
