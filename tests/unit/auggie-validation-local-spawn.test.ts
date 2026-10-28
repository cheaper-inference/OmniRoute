// Auggie validation probes the local CLI (`auggie --version`). Remote-reachable routes
// (POST /api/providers/validate, bulk and import with validateKeys, connection tests) pass
// `allowLocalSpawn: false` for non-loopback callers, and the dispatcher forwards it to every
// specialty validator — but the Auggie validator took no options and always spawned the
// binary. A remote caller must never make the host start a process (Hard Rules #15/#17).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auggie-spawn-"));
process.env.DATA_DIR = TEST_DIR;
const MARKER = path.join(TEST_DIR, "spawned");
const FAKE_AUGGIE = path.join(TEST_DIR, "auggie");
fs.writeFileSync(FAKE_AUGGIE, `#!/bin/sh\ntouch "${MARKER}"\necho "auggie 1.2.3"\n`, {
  mode: 0o755,
});

const savedBin = process.env.AUGGIE_BIN;
process.env.AUGGIE_BIN = FAKE_AUGGIE;

const { validateAuggieProvider } =
  await import("../../src/lib/providers/validation/specialtyInline.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

test.after(() => {
  if (savedBin === undefined) delete process.env.AUGGIE_BIN;
  else process.env.AUGGIE_BIN = savedBin;
  fs.rmSync(TEST_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => fs.rmSync(MARKER, { force: true }));

test("a remote caller (allowLocalSpawn=false) never starts the Auggie CLI", async () => {
  const result = await validateAuggieProvider({ allowLocalSpawn: false });
  assert.equal(fs.existsSync(MARKER), false, "the Auggie binary must not be executed");
  assert.equal(result.valid, false);
  assert.match(String(result.error), /local/i, "must say the CLI check needs a local request");
});

test("the dispatcher forwards allowLocalSpawn=false to the Auggie validator", async () => {
  const result = await validateProviderApiKey({
    provider: "auggie",
    apiKey: "",
    allowLocalSpawn: false,
  });
  assert.equal(fs.existsSync(MARKER), false, "the Auggie binary must not be executed");
  assert.equal(result.valid, false);
});

test("a local caller still validates through the CLI version probe", async () => {
  const result = await validateAuggieProvider({ allowLocalSpawn: true });
  assert.equal(fs.existsSync(MARKER), true, "the local probe runs");
  assert.equal(result.valid, true);
  // Internal callers that pass nothing keep the existing behaviour.
  fs.rmSync(MARKER, { force: true });
  assert.equal((await validateAuggieProvider()).valid, true);
});
