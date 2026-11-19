import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The shared logger builds its transport at import time, so configure file logging first.
const dir = mkdtempSync(join(tmpdir(), "omniroute-affinity-miss-"));
const logFile = join(dir, "app.log");
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.NODE_ENV = "production";
process.env.APP_LOG_TO_FILE = "true";
process.env.APP_LOG_FILE_PATH = logFile;
process.env.APP_LOG_LEVEL = "debug";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function logWhen(predicate: (text: string) => boolean): Promise<string> {
  for (let i = 0; i < 80; i++) {
    const text = existsSync(logFile) ? readFileSync(logFile, "utf8") : "";
    if (predicate(text)) return text;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  return existsSync(logFile) ? readFileSync(logFile, "utf8") : "";
}

test("a session key that gets no affinity target logs one reason code", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "affinity-miss",
    apiKey: "sk-synthetic-affinity-miss",
    isActive: true,
    testStatus: "active",
  });

  const creds = (await getProviderCredentials("openai", null, null, null, {
    sessionKey: "synthetic-session-...ey-0001",
  })) as Record<string, unknown>;
  assert.ok(creds.connectionId, "routing itself still works without affinity");

  const text = await logWhen((t) => t.includes("synthetic-session-..."));
  const line = text.split("\n").find((l) => l.includes("synthetic-session-..."));
  assert.ok(line, "the miss is logged");
  const record = JSON.parse(line);
  assert.equal(record.reason, "affinity_disabled", "the session affinity TTL is 0 by default");
  assert.equal(record.level, 20, "one line per request must stay at debug, not info (30)");
});
