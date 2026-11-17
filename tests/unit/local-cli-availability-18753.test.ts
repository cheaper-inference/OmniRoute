import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  findExecutable,
  getUnavailableLocalCliProviderKeys,
  resetLocalCliAvailabilityCache,
} from "../../src/shared/services/localCliAvailability.ts";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-avail-18753-"));
const home = path.join(root, "home");
const bin = path.join(root, "bin");
fs.mkdirSync(home, { recursive: true });
fs.mkdirSync(bin, { recursive: true });
test.after(() => fs.rmSync(root, { recursive: true, force: true }));

function touch(p: string) {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, "#!/bin/sh\n", { mode: 0o755 });
}
const ctx = (env: NodeJS.ProcessEnv = {}) => ({
  env: { PATH: bin, ...env },
  platform: "linux",
  homedir: home,
});

test("both gated providers are unavailable when nothing is installed", () => {
  const keys = getUnavailableLocalCliProviderKeys(ctx());
  assert.deepEqual([...keys].sort(), ["aug", "auggie", "zc", "zcode"]);
});

test("auggie: PATH lookup, installer path and AUGGIE_BIN override each make it available", () => {
  touch(path.join(bin, "auggie"));
  assert.equal(getUnavailableLocalCliProviderKeys(ctx()).has("auggie"), false);
  fs.rmSync(path.join(bin, "auggie"));
  assert.equal(getUnavailableLocalCliProviderKeys(ctx()).has("auggie"), true);

  touch(path.join(home, ".auggie", "bin", "auggie"));
  assert.equal(getUnavailableLocalCliProviderKeys(ctx()).has("auggie"), false);
  fs.rmSync(path.join(home, ".auggie"), { recursive: true });

  const custom = path.join(root, "custom-auggie");
  touch(custom);
  assert.equal(
    getUnavailableLocalCliProviderKeys(ctx({ AUGGIE_BIN: custom })).has("auggie"),
    false
  );
  assert.equal(
    getUnavailableLocalCliProviderKeys(ctx({ AUGGIE_BIN: path.join(root, "missing") })).has(
      "auggie"
    ),
    true
  );
});

test("zcode: PATH binary makes it available; other local-CLI providers are never gated", () => {
  touch(path.join(bin, "zcode"));
  const keys = getUnavailableLocalCliProviderKeys(ctx());
  assert.equal(keys.has("zcode"), false);
  assert.equal(keys.has("devin-cli-agentic"), false);
  assert.equal(keys.has("codex-app-server"), false);
  fs.rmSync(path.join(bin, "zcode"));
});

test("findExecutable finds a PATH file and rejects missing or empty names", () => {
  assert.equal(findExecutable("", {}, "linux"), null);
  assert.equal(findExecutable("nope", { PATH: bin }, "linux"), null);
  touch(path.join(bin, "tool"));
  assert.equal(findExecutable("tool", { PATH: bin }, "linux"), path.join(bin, "tool"));
});

test("default-context result is cached until reset", () => {
  resetLocalCliAvailabilityCache();
  const first = getUnavailableLocalCliProviderKeys({}, 1_000);
  assert.equal(getUnavailableLocalCliProviderKeys({}, 1_000 + 30_000), first);
  assert.notEqual(getUnavailableLocalCliProviderKeys({}, 1_000 + 61_000), first);
  resetLocalCliAvailabilityCache();
});
