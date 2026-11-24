// Two plugin management guarantees are pinned here:
//   1. POST /api/plugins/marketplace/install downloads code and may activate it, so it
//      needs a management credential even when login is disabled (requireLogin=false),
//      exactly like the local-path install (POST /api/plugins).
//   2. PUT /api/plugins/[name]/config only stores keys the plugin declares in its
//      configSchema. A plugin without a schema has no configurable keys, so the write
//      is refused with a fixed 400 and nothing is stored.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const BASE_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || os.tmpdir(), "plugin-mp-auth-config-")
);

const ORIGINAL_ENV = {
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
};
process.env.JWT_SECRET = "plugin-mp-auth-config-jwt-secret";
process.env.API_KEY_SECRET = "plugin-mp-auth-config-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const pluginsDb = await import("../../src/lib/db/plugins.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const marketplaceInstallRoute =
  await import("../../src/app/api/plugins/marketplace/install/route.ts");
const configRoute = await import("../../src/app/api/plugins/[name]/config/route.ts");

const URL_MP_INSTALL = "http://localhost:20128/api/plugins/marketplace/install";
const configUrl = (name: string) => `http://localhost:20128/api/plugins/${name}/config`;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(BASE_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function insertTestPlugin(name: string, configSchema: Record<string, unknown>) {
  pluginsDb.insertPlugin({
    id: `id-${name}`,
    name,
    version: "1.0.0",
    main: "index.js",
    pluginDir: path.join(BASE_DIR, name),
    manifest: {},
    config: { existing: "kept" },
    configSchema,
  });
}

function storedConfig(name: string): Record<string, unknown> {
  const row = pluginsDb.getPluginByName(name);
  assert.ok(row, `plugin ${name} must exist`);
  return JSON.parse(row.config || "{}");
}

async function putConfig(name: string, config: Record<string, unknown>): Promise<Response> {
  const request = await makeManagementSessionRequest(configUrl(name), {
    method: "PUT",
    body: { config },
  });
  return configRoute.PUT(request as never, { params: Promise.resolve({ name }) });
}

// ── 1. Marketplace install needs a credential in every auth mode ──

test("with login disabled, an anonymous marketplace install is refused with 401", async () => {
  await updateSettings({ requireLogin: false });
  try {
    const response = await marketplaceInstallRoute.POST(
      new Request(URL_MP_INSTALL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "any-plugin" }),
      }) as never
    );
    const text = await response.text();
    assert.equal(response.status, 401, `expected 401, got ${response.status}: ${text}`);
    assert.ok(!text.includes("at /"), "error body must not leak a stack trace");
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

test("with login disabled, an authenticated marketplace install reaches the installer", async () => {
  await updateSettings({ requireLogin: false });
  try {
    const request = await makeManagementSessionRequest(URL_MP_INSTALL, {
      method: "POST",
      body: { name: "no-such-marketplace-plugin" },
    });
    const response = await marketplaceInstallRoute.POST(request as never);
    const text = await response.text();
    // Past the auth gate: the seed registry does not know this name.
    assert.equal(response.status, 400, text);
    assert.match(text, /not found in marketplace/);
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

// ── 2. Config writes only accept keys the plugin declares ──

test("PUT config on a plugin without a config schema is refused and stores nothing", async () => {
  insertTestPlugin("cfg-no-schema", {});
  const response = await putConfig("cfg-no-schema", { arbitrary: "value", other: 1 });
  const text = await response.text();
  assert.equal(response.status, 400, text);
  assert.equal(JSON.parse(text).error.message, "Plugin does not declare any configurable keys");
  assert.deepEqual(storedConfig("cfg-no-schema"), { existing: "kept" });
});

test("PUT config with a key the schema does not declare is refused and stores nothing", async () => {
  insertTestPlugin("cfg-undeclared", { threshold: { type: "number", min: 1, max: 10 } });
  const response = await putConfig("cfg-undeclared", { threshold: 5, injected: "x" });
  const text = await response.text();
  assert.equal(response.status, 400, text);
  assert.match(text, /Unknown config key: injected/);
  assert.deepEqual(storedConfig("cfg-undeclared"), { existing: "kept" });
});

test("PUT config with a value of the wrong type is refused and stores nothing", async () => {
  insertTestPlugin("cfg-wrong-type", { threshold: { type: "number", min: 1, max: 10 } });
  const response = await putConfig("cfg-wrong-type", { threshold: "5" });
  assert.equal(response.status, 400, await response.text());
  assert.deepEqual(storedConfig("cfg-wrong-type"), { existing: "kept" });
});

test("PUT config out of the declared range is refused", async () => {
  insertTestPlugin("cfg-range", { threshold: { type: "number", min: 1, max: 10 } });
  const response = await putConfig("cfg-range", { threshold: 50 });
  const text = await response.text();
  assert.equal(response.status, 400, text);
  assert.match(text, /must be <= 10/);
  assert.deepEqual(storedConfig("cfg-range"), { existing: "kept" });
});

test("PUT config with declared keys only is stored", async () => {
  insertTestPlugin("cfg-ok", {
    threshold: { type: "number", min: 1, max: 10 },
    mode: { type: "select", enum: ["fast", "slow"] },
    debug: { type: "boolean" },
  });
  const response = await putConfig("cfg-ok", { threshold: 7, mode: "slow", debug: true });
  const text = await response.text();
  assert.equal(response.status, 200, text);
  assert.deepEqual(storedConfig("cfg-ok"), { threshold: 7, mode: "slow", debug: true });
});

test("PUT config on an unknown plugin still answers 404", async () => {
  const response = await putConfig("cfg-missing", { threshold: 1 });
  assert.equal(response.status, 404, await response.text());
});
