/**
 * #18753 positive case — with AUGGIE_BIN pointing at a real file, aug/* is listed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tfb-18753-"));
const EMPTY_HOME = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tfb-18753-home-"));
const EMPTY_BIN_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tfb-18753-path-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "tfb-18753-test-secret";
// Make the auggie binary unresolvable: no override, empty HOME, empty PATH.
delete process.env.AUGGIE_BIN;
delete process.env.CLI_AUGGIE_BIN;
process.env.HOME = EMPTY_HOME;
process.env.USERPROFILE = EMPTY_HOME;
process.env.CATALOG_BUILD_TIMEOUT_MS = "240000"; // load-tolerant
process.env.PATH = `${EMPTY_BIN_DIR}:/usr/bin:/bin`;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const availability = await import("../../src/shared/services/localCliAvailability.ts");

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(EMPTY_HOME, { recursive: true, force: true });
  fs.rmSync(EMPTY_BIN_DIR, { recursive: true, force: true });
});

test(
  "#18753: /v1/models lists aug/* when AUGGIE_BIN points at a real file",
  { timeout: 280000 },
  async () => {
    const fakeBin = path.join(EMPTY_BIN_DIR, "fake-auggie");
    fs.writeFileSync(fakeBin, "#!/bin/sh\n", { mode: 0o755 });
    process.env.AUGGIE_BIN = fakeBin;
    availability.resetLocalCliAvailabilityCache();
    try {
      const response = await catalog.getUnifiedModelsResponse(
        new Request("http://localhost/api/v1/models")
      );
      const body = (await response.json()) as { data?: Array<{ id: string }> };
      assert.equal(response.status, 200);
      const aug = (body.data ?? []).map((m) => m.id).filter((id) => id.startsWith("aug/"));
      assert.ok(aug.length > 0, "aug/* must be listed when the binary resolves");
    } finally {
      delete process.env.AUGGIE_BIN;
      availability.resetLocalCliAvailabilityCache();
    }
  }
);
