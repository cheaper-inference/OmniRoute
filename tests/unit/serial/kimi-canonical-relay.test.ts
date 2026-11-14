import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const originalEnv = {
  DATA_DIR: process.env.DATA_DIR,
  BIFROST_BASE_URL: process.env.BIFROST_BASE_URL,
  OMNIROUTE_RELAY_BACKEND: process.env.OMNIROUTE_RELAY_BACKEND,
  BIFROST_ENABLED: process.env.BIFROST_ENABLED,
};
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "kimi-relay-"));
process.env.DATA_DIR = dataDir;
process.env.BIFROST_BASE_URL = "http://fixture-bifrost:8080";
process.env.OMNIROUTE_RELAY_BACKEND = "bifrost";
process.env.BIFROST_ENABLED = "1";
const core = await import("../../../src/lib/db/core.ts");
const relay = await import("../../../src/lib/db/relayProxies.ts");
const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");
const routes = [
  (await import("../../../src/app/api/v1/relay/chat/completions/route.ts")).POST,
  (await import("../../../src/app/api/v1/relay/chat/completions/bifrost/route.ts")).POST,
];
const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});
for (const [index, post] of routes.entries())
  for (const pattern of ["moonshot/kimi-k3", "moonshot/*"]) {
    test(
      "C6 relay route " + index + " accepts both prefixes with migrated " + pattern,
      async () => {
        const token = relay.createRelayToken({
          name: "compat",
          allowedModels: [pattern],
          maxRequestsPerMinute: 1000,
        });
        const db = core.getDbInstance();
        db.prepare("DELETE FROM _omniroute_migrations WHERE version='242'").run();
        runMigrations(db);
        let calls = 0;
        globalThis.fetch = (async () => {
          calls++;
          return Response.json({ choices: [{ message: { content: "relay works" } }] });
        }) as typeof fetch;
        for (const model of [
          "moonshot/kimi-k3",
          "kimi/kimi-k3",
          "kimi-coding/kimi-k3",
          "openrouter/moonshot/kimi-k3",
        ]) {
          const response = await post(
            new Request("http://localhost/api/v1/relay/chat/completions", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: "Bearer " + token.rawToken,
                "x-forwarded-for": "127.0.0." + String(index + 1),
              },
              body: JSON.stringify({ model, messages: [{ role: "user", content: "hello" }] }),
            })
          );
          const text = await response.text();
          assert.equal(
            response.status,
            model.startsWith("moonshot/") || model.startsWith("kimi/") ? 200 : 403,
            text
          );
        }
        assert.equal(calls, 2);
      }
    );
  }
