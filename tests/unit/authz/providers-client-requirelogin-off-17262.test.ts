import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-17262-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");

test.after(async () => {
  core.resetDbInstance();
  await cleanupTempDataDir(TEST_DATA_DIR);
});

function ctx(p: string) {
  return {
    request: {
      method: "GET",
      headers: new Headers(),
      url: `http://localhost:20128${p}`,
      nextUrl: { pathname: p },
      socket: { remoteAddress: "127.0.0.1" },
    },
    classification: {
      routeClass: "MANAGEMENT" as const,
      reason: "management_api" as const,
      normalizedPath: p,
    },
    requestId: "req_17262",
  };
}

// Guard (#17262): the hard gate on /api/providers/client must stay; the dashboard
// quota UIs recover by falling back to the masked /api/providers instead.
test("#17262: requireLogin=false, no session: sibling quota endpoints pass, /api/providers/client stays 401", async () => {
  await settingsDb.updateSettings({ requireLogin: false, setupComplete: true });
  const { managementPolicy } = await import(
    `../../../src/server/authz/policies/management.ts?ts=${Date.now()}`
  );
  const providers = await managementPolicy.evaluate(ctx("/api/providers"));
  const limits = await managementPolicy.evaluate(ctx("/api/usage/provider-limits"));
  const client = await managementPolicy.evaluate(ctx("/api/providers/client"));
  assert.equal(providers.allow, true);
  assert.equal(limits.allow, true);
  assert.equal(client.allow, false);
  assert.equal((client as { status?: number }).status, 401);
});
