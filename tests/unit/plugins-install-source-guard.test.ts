// POST /api/plugins installs — and, with `enabledByDefault`, activates — the code at a
// caller-supplied path. Two guarantees are pinned here:
//   1. the install source must live inside the operator-managed `plugin-sources`
//      directory next to the plugin root; any other absolute path, a path that
//      resolves outside it through a symlink, or a source tree carrying a symlink
//      that escapes it is refused before anything is copied;
//   2. the route needs a management credential even when login is disabled
//      (requireLogin=false): "anonymous" is never the right audience for
//      "install and run this code on the host".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const BASE_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || os.tmpdir(), "plugin-src-guard-")
);
const PLUGIN_ROOT = path.join(BASE_DIR, "plugins");
const SOURCES_ROOT = path.join(BASE_DIR, "plugin-sources");
const OUTSIDE_ROOT = path.join(BASE_DIR, "outside");
fs.mkdirSync(PLUGIN_ROOT, { recursive: true });
fs.mkdirSync(SOURCES_ROOT, { recursive: true });
fs.mkdirSync(OUTSIDE_ROOT, { recursive: true });

const ORIGINAL_ENV = {
  OMNIROUTE_PLUGINS_DIR: process.env.OMNIROUTE_PLUGINS_DIR,
  JWT_SECRET: process.env.JWT_SECRET,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
};
process.env.OMNIROUTE_PLUGINS_DIR = PLUGIN_ROOT;
process.env.JWT_SECRET = "plugin-src-guard-jwt-secret";
process.env.API_KEY_SECRET = "plugin-src-guard-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const pluginsDb = await import("../../src/lib/db/plugins.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const pluginsRoute = await import("../../src/app/api/plugins/route.ts");
const loadInstallSource = () => import("../../src/lib/plugins/installSource.ts");

const URL_PLUGINS = "http://localhost:20128/api/plugins";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(BASE_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function writePlugin(parent: string, name: string): string {
  const dir = path.join(parent, name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "plugin.json"),
    JSON.stringify({ name, version: "1.0.0", main: "index.js" })
  );
  fs.writeFileSync(path.join(dir, "index.js"), "module.exports = {};\n");
  return dir;
}

function anonymousPost(body: unknown): Request {
  return new Request(URL_PLUGINS, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function sessionPost(body: unknown): Promise<Request> {
  return makeManagementSessionRequest(URL_PLUGINS, { method: "POST", body: body as never });
}

async function assertRefused(response: Response, status: number): Promise<void> {
  const text = await response.text();
  assert.equal(response.status, status, `expected ${status}, got ${response.status}: ${text}`);
  assert.ok(!text.includes("at /"), "error body must not leak a stack trace");
}

test("getPluginSourcesDir is the plugin-sources sibling of the plugin root", async () => {
  const installSource = await loadInstallSource();
  assert.equal(installSource.getPluginSourcesDir(PLUGIN_ROOT), SOURCES_ROOT);
});

test("resolvePluginInstallSource refuses paths outside the sources root", async () => {
  const installSource = await loadInstallSource();
  const outside = writePlugin(OUTSIDE_ROOT, "outside-direct");
  const cases = [
    outside,
    "/etc",
    "relative/plugin",
    "",
    `${SOURCES_ROOT}/../outside/outside-direct`,
    SOURCES_ROOT,
    `${SOURCES_ROOT}-sibling/x`,
    `${SOURCES_ROOT}/x\0y`,
  ];
  for (const candidate of cases) {
    await assert.rejects(
      installSource.resolvePluginInstallSource(candidate, SOURCES_ROOT),
      installSource.PluginInstallSourceError,
      `must refuse ${JSON.stringify(candidate)}`
    );
  }
});

test("resolvePluginInstallSource refuses symlinks that escape the sources root", async () => {
  const installSource = await loadInstallSource();
  const outside = writePlugin(OUTSIDE_ROOT, "outside-linked");
  const linkedDir = path.join(SOURCES_ROOT, "linked-dir");
  fs.symlinkSync(outside, linkedDir, "dir");
  await assert.rejects(
    installSource.resolvePluginInstallSource(linkedDir, SOURCES_ROOT),
    installSource.PluginInstallSourceError
  );

  const inner = writePlugin(SOURCES_ROOT, "inner-escape");
  fs.mkdirSync(path.join(inner, "lib"));
  fs.symlinkSync(path.join(outside, "index.js"), path.join(inner, "lib", "evil.js"));
  await assert.rejects(
    installSource.resolvePluginInstallSource(inner, SOURCES_ROOT),
    installSource.PluginInstallSourceError
  );
});

test("resolvePluginInstallSource fails closed when the sources root does not exist", async () => {
  const installSource = await loadInstallSource();
  const missingRoot = path.join(BASE_DIR, "missing-root");
  await assert.rejects(
    installSource.resolvePluginInstallSource(path.join(missingRoot, "p"), missingRoot),
    installSource.PluginInstallSourceError
  );
});

test("resolvePluginInstallSource accepts a plugin directory inside the sources root", async () => {
  const installSource = await loadInstallSource();
  const good = writePlugin(SOURCES_ROOT, "inside-ok");
  fs.symlinkSync(path.join(good, "index.js"), path.join(good, "alias.js"));
  const resolved = await installSource.resolvePluginInstallSource(good, SOURCES_ROOT);
  assert.equal(resolved, fs.realpathSync(good));
});

test("POST /api/plugins refuses an install source outside the plugin sources directory", async () => {
  const outside = writePlugin(OUTSIDE_ROOT, "route-outside");
  const response = await pluginsRoute.POST((await sessionPost({ path: outside })) as never);
  await assertRefused(response, 400);
  assert.equal(pluginsDb.getPluginByName("route-outside"), null, "nothing may be installed");
  assert.equal(fs.existsSync(path.join(PLUGIN_ROOT, "route-outside")), false);
});

test("POST /api/plugins installs from inside the plugin sources directory", async () => {
  const good = writePlugin(SOURCES_ROOT, "route-inside");
  const response = await pluginsRoute.POST((await sessionPost({ path: good })) as never);
  const text = await response.text();
  assert.equal(response.status, 201, text);
  assert.equal(JSON.parse(text).plugin.name, "route-inside");
  assert.ok(pluginsDb.getPluginByName("route-inside"));
});

test("with login disabled, an anonymous POST /api/plugins is refused", async () => {
  const good = writePlugin(SOURCES_ROOT, "route-anon");
  await updateSettings({ requireLogin: false });
  try {
    const response = await pluginsRoute.POST(anonymousPost({ path: good }) as never);
    await assertRefused(response, 401);
    assert.equal(pluginsDb.getPluginByName("route-anon"), null, "nothing may be installed");
  } finally {
    await updateSettings({ requireLogin: true });
  }
});
