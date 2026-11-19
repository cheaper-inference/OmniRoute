import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-20445-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#20445: PATCH /api/settings rejects resilienceSettings instead of silently dropping it", async () => {
  const res = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { resilienceSettings: { p2cLatency: { weight: 20 } } },
    })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { code: string; message: string } };
  assert.equal(body.error.code, "USE_RESILIENCE_ENDPOINT");
  assert.match(body.error.message, /\/api\/resilience/);
  const stored = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(
    (stored.resilienceSettings as { p2cLatency?: { weight?: number } } | undefined)?.p2cLatency
      ?.weight,
    undefined
  );
});

test("#20445: `resilience config set` exposes --p2c-latency-weight", () => {
  const src = fs.readFileSync(path.resolve("bin/cli/commands/resilience.mjs"), "utf8");
  assert.match(src, /--p2c-latency-weight/);
  assert.match(src, /p2cLatency\s*=\s*\{\s*weight/);
});
