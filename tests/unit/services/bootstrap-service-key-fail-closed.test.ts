/**
 * bootstrapEmbeddedServices must not supervise a service whose API key cannot be
 * loaded. The key is the service's own credential (9router API key, Mux auth token,
 * Dario admin token, ...): starting the service with a fixed fallback string would hand
 * it a credential anyone can guess. The service is skipped instead; the on-demand
 * /api/services/<name>/* path then surfaces the key error to the operator.
 */
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_STORAGE_KEY = process.env.STORAGE_ENCRYPTION_KEY;
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
// Own database directory: another test file may share the inherited DATA_DIR.
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || os.tmpdir(), "bootstrap-service-key-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
// Without a storage key an encrypted column cannot be decrypted, which is the
// degraded state this test needs.
delete process.env.STORAGE_ENCRYPTION_KEY;

const core = await import("../../../src/lib/db/core.ts");
const { upsertVersionManagerTool } = await import("../../../src/lib/db/versionManager.ts");
const { getSupervisor, unregisterSupervisor } =
  await import("../../../src/lib/services/registry.ts");
const { bootstrapEmbeddedServices } = await import("../../../src/lib/services/bootstrap.ts");

before(() => {
  core.resetDbInstance();
});

after(() => {
  unregisterSupervisor("mux");
  unregisterSupervisor("9router");
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_STORAGE_KEY === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
  else process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_KEY;
});

test("a service whose stored key cannot be decrypted is not supervised", async () => {
  // Installed, not auto-started, with an encrypted key that cannot be read back.
  await upsertVersionManagerTool({
    tool: "mux",
    status: "installed",
    autoStart: false,
    apiKey: "enc:v1:00:00:00",
  });
  // A healthy service next to it keeps working.
  await upsertVersionManagerTool({ tool: "9router", status: "installed", autoStart: false });

  await bootstrapEmbeddedServices();

  assert.equal(getSupervisor("mux"), null, "mux must not run with a fallback credential");
  assert.notEqual(getSupervisor("9router"), null, "services with a readable key still register");
});
