// "direct" is sometimes a decision: a consumer that owns a fallback scope has
// to tell an operator's proxy-off from "nothing configured here", or it would
// re-enable a proxy the operator turned off.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-directby-"));
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(process.env.DATA_DIR as string, {
    recursive: true,
    force: true,
    maxRetries: 5,
    retryDelay: 100,
  });
});

function db() {
  return core.getDbInstance();
}

function insertConnection(id: string, proxyEnabled: number): void {
  db()
    .prepare(
      "INSERT INTO provider_connections (id, provider, auth_type, proxy_enabled, created_at, updated_at) VALUES (?, 'gemini-web', 'cookie', ?, datetime('now'), datetime('now'))"
    )
    .run(id, proxyEnabled);
}

function setGlobalProxyEnabled(value: boolean): void {
  db()
    .prepare(
      "INSERT INTO key_value (namespace, key, value) VALUES ('settings', 'proxyEnabled', ?) ON CONFLICT(namespace, key) DO UPDATE SET value = excluded.value"
    )
    .run(JSON.stringify(value));
}

test("a connection that turned proxying off reports a policy direct", async () => {
  insertConnection("conn-off", 0);
  const result = await settings.resolveProxyForConnection("conn-off");
  assert.equal(result.proxy, null);
  assert.equal(result.directBy, "connection-disabled");
});

test("the global switch reports its own policy direct", async () => {
  setGlobalProxyEnabled(false);
  const result = await settings.resolveProxyForConnection("conn-absent");
  assert.equal(result.proxy, null);
  assert.equal(result.directBy, "global-disabled");
});
