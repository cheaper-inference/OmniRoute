// The legacy per-provider / global proxy setting can hold a URL string from an older install.
// Treating it as unset let a registry-global proxy shadow the more specific provider one, or the
// OAuth exchange fall through to a direct connection.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-legacy-proxy-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const proxies = await import("../../src/lib/db/proxies.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("a global proxy stored as a URL string is resolved, not skipped", async () => {
  // Written straight into the row, the way an older install left it: the setter normalises a
  // URL into an object today, so this is the shape only pre-upgrade data has.
  core
    .getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', 'global', ?)")
    .run(JSON.stringify("socks5://alice:secret@10.0.0.8:1080"));

  const resolved = await proxies.resolveProxyForProvider("no-such-provider");

  assert.equal(resolved?.host, "10.0.0.8");
  assert.equal(resolved?.username, "alice");
  assert.equal(resolved?.password, "secret");
  assert.equal(resolved?.type, "socks5");
  assert.equal(String(resolved?.port), "1080");
});

test("a provider-level legacy string wins over a global proxy", async () => {
  const db = core.getDbInstance();
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', 'global', ?)")
    .run(JSON.stringify({ type: "http", host: "10.9.9.9", port: 8080 }));
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', 'providers', ?)")
    .run(JSON.stringify({ acme: "socks5://alice:secret@10.0.0.8:1080" }));

  const resolved = await proxies.resolveProxyForProvider("acme");

  assert.equal(resolved?.host, "10.0.0.8", "the provider-level proxy must win over the global one");
});
