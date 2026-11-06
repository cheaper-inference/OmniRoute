// Qoder Personal Access Token (`pt-…`) validation runs the local `qodercli --list-models`.
// Remote-reachable routes (POST /api/providers/validate, import with validateKeys, the
// connection tests, bulk through the `if` alias) pass `allowLocalSpawn: false` for
// non-loopback callers and the dispatcher forwards it, but the Qoder validator ignored it,
// so a remote caller made the host start the CLI. Non-PAT keys validate over HTTP and are
// not affected.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qoder-spawn-"));
process.env.DATA_DIR = TEST_DIR;
process.env.QODER_CLI_CONFIG_DIR = path.join(TEST_DIR, "qoder-config");
const MARKER = path.join(TEST_DIR, "spawned");
const FAKE_QODER = path.join(TEST_DIR, "qodercli");
fs.writeFileSync(FAKE_QODER, `#!/bin/sh\ntouch "${MARKER}"\necho "[]"\n`, { mode: 0o755 });

const savedBin = process.env.CLI_QODER_BIN;
process.env.CLI_QODER_BIN = FAKE_QODER;

const { validateQoderProvider } =
  await import("../../src/lib/providers/validation/specialtyInline.ts");
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const PAT = "pt-test-personal-access-token";

test.after(() => {
  if (savedBin === undefined) delete process.env.CLI_QODER_BIN;
  else process.env.CLI_QODER_BIN = savedBin;
  fs.rmSync(TEST_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => fs.rmSync(MARKER, { force: true }));

test("a remote caller (allowLocalSpawn=false) never starts qodercli for a PAT", async () => {
  const result = await validateQoderProvider({ apiKey: PAT, allowLocalSpawn: false });
  assert.equal(fs.existsSync(MARKER), false, "qodercli must not be executed");
  assert.equal(result.valid, false);
  assert.match(String(result.error), /local/i, "must say PAT validation needs a local request");
});

test("the dispatcher forwards allowLocalSpawn=false for qoder and for its `if` alias", async () => {
  for (const provider of ["qoder", "if"]) {
    const result = await validateProviderApiKey({ provider, apiKey: PAT, allowLocalSpawn: false });
    assert.equal(fs.existsSync(MARKER), false, `${provider}: qodercli must not be executed`);
    assert.equal(result.valid, false, `${provider}: refused for a remote caller`);
  }
});

test("a local caller still reaches the qodercli PAT probe", async () => {
  await validateQoderProvider({ apiKey: PAT, allowLocalSpawn: true });
  assert.equal(fs.existsSync(MARKER), true, "the local probe runs");
});
