import assert from "node:assert/strict";
import test from "node:test";
import { validateManifest } from "../../src/lib/plugins/manifest.ts";
import { pluginRegistration } from "../../src/lib/plugins/pluginRegistration.ts";

test("maps validated manifest data and includes only enabled hooks in stable order", () => {
  const manifest = validateManifest({
    name: "test-plugin",
    version: "1.0.0",
    description: "Test plugin",
    hooks: { onStreamComplete: true, onRequest: true, onResponse: false, onInstall: true },
    requires: { permissions: ["network", "file-read"] },
    enabledByDefault: true,
  });
  const row = pluginRegistration(manifest, "test-plugin", "/tmp/test-plugin", "test-id");
  assert.deepEqual(row.hooks, ["onRequest", "onInstall", "onStreamComplete"]);
  assert.equal(row.id, "test-id");
  assert.equal(row.name, "test-plugin");
  assert.equal(row.version, "1.0.0");
  assert.equal(row.pluginDir, "/tmp/test-plugin");
  assert.equal(row.enabled, true);
  assert.equal(row.manifest, manifest);
  assert.equal(row.configSchema, manifest.configSchema);
  assert.deepEqual(row.permissions, ["network", "file-read"]);
});

test("default manifests retain disabled activation and empty hooks", () => {
  const manifest = validateManifest({
    name: "test-plugin",
    version: "1.0.0",
    description: "Test plugin",
  });
  const row = pluginRegistration(manifest, "test-plugin", "/tmp/test-plugin", "test-id");
  assert.deepEqual(row.hooks, []);
  assert.equal(row.enabled, manifest.enabledByDefault);
  assert.equal(row.main, manifest.main);
  assert.deepEqual(row.tags, manifest.tags);
});
