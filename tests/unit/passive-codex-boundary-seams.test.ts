import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The open-sse → src boundary ratchet (quality-baseline.json) counts one edge per importing file.
// passiveCodex.ts must not add edges of its own: the expiry parser lives in open-sse and src
// re-exports it, and the direct-SELECT connection reread goes through codexAccount/write.ts, the
// existing Codex connection DB seam.

test("src/lib/tokenHealthCheckExpiry re-exports the engine expiry parser (same function)", async () => {
  const engine = await import("../../open-sse/utils/tokenExpiry.ts");
  const src = await import("../../src/lib/tokenHealthCheckExpiry.ts");
  assert.equal(typeof engine.parseTokenExpiryMs, "function");
  assert.equal(src.parseTokenExpiryMs, engine.parseTokenExpiryMs);
  assert.equal(engine.parseTokenExpiryMs(1_789_012_345), 1_789_012_345_000);
  assert.equal(engine.parseTokenExpiryMs("1789012345678"), 1_789_012_345_678);
  assert.equal(engine.parseTokenExpiryMs("2026-10-28T00:00:00.000Z"), Date.UTC(2026, 9, 28));
  assert.equal(engine.parseTokenExpiryMs("not a date"), 0);
  assert.equal(engine.parseTokenExpiryMs(null), 0);
});

test("codexAccount/write exposes the direct connection reader from db/providers", async () => {
  const seam = await import("../../open-sse/services/codexAccount/write.ts");
  const db = await import("../../src/lib/db/providers.ts");
  assert.equal(seam.getProviderConnectionById, db.getProviderConnectionById);
});

test("passiveCodex.ts does not import src/ directly", () => {
  const s = readFileSync("open-sse/services/tokenRefresh/passiveCodex.ts", "utf8");
  assert.match(s, /export function isPassiveCodex/);
  assert.doesNotMatch(s, /(?:from|import\()\s*["'](?:@\/|(?:\.\.\/)+src\/)/);
});
