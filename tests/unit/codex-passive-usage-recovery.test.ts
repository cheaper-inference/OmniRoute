import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import childProcess from "node:child_process";
import { syncBuiltinESMExports } from "node:module";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-passive-usage-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "synthetic-passive-usage-secret";
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const { fetchAndPersistProviderLimits } = await import("../../src/lib/usage/providerLimits.ts");
const { getMachineId } = await import("../../src/shared/utils/machine.ts");
const { resetMachineIdCache } = await import("../../src/shared/utils/machineId.ts");
const originalFetch = globalThis.fetch;

// Prime a synthetic machine identity so the cloud-path spy never reads the host identity.
test.before(async () => {
  const execSync = childProcess.execSync;
  const readFileSync = fs.readFileSync;
  const hostname = os.hostname;
  childProcess.execSync = (() => '"IOPlatformUUID" = "synthetic-machine-id"\n') as typeof execSync;
  fs.readFileSync = ((file: fs.PathOrFileDescriptor, ...args: unknown[]) => {
    if (["/etc/machine-id", "/var/lib/dbus/machine-id"].includes(String(file))) {
      return "synthetic-machine-id";
    }
    return Reflect.apply(readFileSync, fs, [file, ...args]);
  }) as typeof readFileSync;
  os.hostname = () => "synthetic-machine-id";
  syncBuiltinESMExports();
  resetMachineIdCache();
  try {
    await getMachineId();
  } finally {
    childProcess.execSync = execSync;
    fs.readFileSync = readFileSync;
    os.hostname = hostname;
    syncBuiltinESMExports();
  }
});
test.after(() => {
  globalThis.fetch = originalFetch;
  delete process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS;
  resetMachineIdCache();
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const stored of [
  "different",
  "unchanged",
  "expired",
  "different-still-unauthorized",
] as const) {
  test(`on-demand passive usage recovery retries only a different unexpired token: ${stored}`, async () => {
    process.env.OMNIROUTE_TOKEN_REFRESH_PASSIVE_PROVIDERS = "codex";
    const connection = await db.createProviderConnection({
      provider: "codex",
      authType: "oauth",
      name: "synthetic-passive-usage",
      accessToken: "synthetic-A",
      refreshToken: "synthetic-refresh-A",
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
      isActive: true,
      testStatus: "active",
    });
    const sends: string[] = [];
    let tokenCalls = 0;
    let credentialWrites = 0;
    let cloudPathCalls = 0;
    let synchronizing = false;
    const database = core.getDbInstance();
    const prepare = database.prepare;
    const createHash = crypto.createHash;
    database.prepare = function (sql: string) {
      if (
        !synchronizing &&
        /UPDATE\s+provider_connections\s+SET/i.test(sql) &&
        /\b(access_token|refresh_token|id_token|expires_at|token_expires_at)\s*=/i.test(sql)
      ) {
        credentialWrites++;
      }
      return prepare.call(this, sql);
    };
    crypto.createHash = (...args: Parameters<typeof createHash>) => {
      if (new Error().stack?.includes("getConsistentMachineId")) cloudPathCalls++;
      return createHash(...args);
    };
    syncBuiltinESMExports();
    try {
      await getMachineId();
      assert.equal(cloudPathCalls, 1, "spy detects entry into the cloud machine-ID path");
      cloudPathCalls = 0;
      globalThis.fetch = async (input, init) => {
        const url = String(input);
        if (url.includes("auth.openai.com")) {
          tokenCalls++;
          throw new Error("passive replica must not exchange tokens");
        }
        assert.equal(url, "https://chatgpt.com/backend-api/wham/usage");
        const auth = new Headers(init?.headers).get("authorization") || "";
        sends.push(auth);
        if (sends.length === 1) {
          synchronizing = true;
          try {
            await db.updateProviderConnection(connection.id, {
              accessToken: stored === "unchanged" ? "synthetic-A" : "synthetic-B",
              refreshToken: "synthetic-refresh-B",
              expiresAt: new Date(
                Date.now() + (stored === "expired" ? -60000 : 3600000)
              ).toISOString(),
            });
          } finally {
            synchronizing = false;
          }
          return Response.json({ error: { message: "synthetic unauthorized" } }, { status: 401 });
        }
        assert.equal(auth, "Bearer synthetic-B");
        if (stored === "different-still-unauthorized") {
          return Response.json({ error: { message: "synthetic unauthorized" } }, { status: 401 });
        }
        return Response.json({
          plan_type: "plus",
          rate_limit: {
            allowed: true,
            limit_reached: false,
            primary_window: {
              used_percent: 10,
              limit_window_seconds: 18000,
              reset_after_seconds: 3600,
            },
          },
        });
      };
      const result = await fetchAndPersistProviderLimits(connection.id, "manual", {
        allowRotatingRefresh: true,
      });
      const adopted = stored.startsWith("different");
      assert.deepEqual(
        sends,
        adopted ? ["Bearer synthetic-A", "Bearer synthetic-B"] : ["Bearer synthetic-A"]
      );
      assert.equal(result.connection.accessToken, adopted ? "synthetic-B" : "synthetic-A");
      assert.equal(
        result.usage.message,
        stored === "different"
          ? undefined
          : "Codex token expired or access denied. Please re-authenticate the connection."
      );
      assert.equal(tokenCalls, 0);
      assert.equal(credentialWrites, 0, "only the simulated synchronization may write credentials");
      assert.equal(cloudPathCalls, 0, "adoption must not enter syncToCloudIfEnabled");
      const row = await db.getProviderConnectionById(connection.id);
      assert.equal(row.testStatus, "active");
      assert.equal(row.isActive, true);
      assert.equal(row.accessToken, stored === "unchanged" ? "synthetic-A" : "synthetic-B");
      assert.equal(row.refreshToken, "synthetic-refresh-B");
    } finally {
      database.prepare = prepare;
      crypto.createHash = createHash;
      syncBuiltinESMExports();
      globalThis.fetch = originalFetch;
    }
  });
}
