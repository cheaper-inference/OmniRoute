// @vitest-environment node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";

// A Redis that always claims the credential is valid, and whose DEL fails.
const store = new Map<string, string>();
vi.mock("@/shared/utils/rateLimiter", () => ({
  isRedisConfigured: () => true,
  getRedisClient: async () => ({
    get: async (k: string) => store.get(k) ?? null,
    set: async (k: string, v: string) => {
      store.set(k, v);
    },
    del: async () => {
      throw new Error("redis down");
    },
  }),
}));

// Load the database graph during suite collection, after isolating its environment.
// Module transformation is setup work; each credential assertion keeps its own deadline.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-redis-auth-"));
vi.stubEnv("DATA_DIR", dataDir);
vi.stubEnv("API_KEY_SECRET", "test-api-key-secret-0123456789abcdef");
vi.stubEnv("NODE_ENV", "production");
vi.stubEnv("OMNIROUTE_DISABLE_REDIS_AUTH_CACHE", undefined);
const core = await import("@/lib/db/core");
const apiKeys = await import("@/lib/db/apiKeys");
// Regeneration lazily loads the real audit module; prepare that dependency too.
await import("@/lib/compliance");
await import("@/shared/utils/apiKey");

afterAll(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  vi.unstubAllEnvs();
});

describe("API-key validation with the Redis auth cache (GHSA-66vh-35g3-78qv)", () => {
  it("rejects a revoked key even when Redis still holds a positive entry and DEL fails", async () => {
    const created = await apiKeys.createApiKey("redis-revoke", "machine-1");
    expect(await apiKeys.validateApiKey(created.key)).toBe(true);
    expect(store.size).toBeGreaterThan(0);

    await apiKeys.revokeApiKey(created.id);
    // The stale positive entry is still there; the process-local cache is cleared by revoke.
    expect(store.size).toBeGreaterThan(0);
    expect(await apiKeys.validateApiKey(created.key)).toBe(false);
  });

  it("rejects the old credential after regeneration when the Redis entry survives", async () => {
    const created = await apiKeys.createApiKey("redis-regen", "machine-1");
    expect(await apiKeys.validateApiKey(created.key)).toBe(true);

    await apiKeys.regenerateApiKey(created.id);
    expect(await apiKeys.validateApiKey(created.key)).toBe(false);
  });
});
