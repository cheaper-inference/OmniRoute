/**
 * #18753 — local-CLI noAuth providers (auggie) must not be advertised in /v1/models
 * when their binary cannot be resolved on this host.
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
const { resolveAuggieBin } = await import("../../open-sse/executors/auggie.ts");

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(EMPTY_HOME, { recursive: true, force: true });
  fs.rmSync(EMPTY_BIN_DIR, { recursive: true, force: true });
});

test("#18753 precondition: auggie binary is not resolvable on this host", () => {
  const bin = resolveAuggieBin();
  assert.equal(bin, "auggie", "falls back to bare PATH lookup");
  assert.equal(fs.existsSync(path.join(EMPTY_BIN_DIR, bin)), false);
});

test(
  "#18753: /v1/models must not list aug/* when the auggie binary is absent",
  { timeout: 280000 },
  async () => {
    const response = await catalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    const body = (await response.json()) as { data?: Array<{ id: string }> };
    assert.equal(
      response.status,
      200,
      `catalog status ${response.status}: ${JSON.stringify(body).slice(0, 300)}`
    );
    assert.ok(Array.isArray(body.data), `no data array: ${JSON.stringify(body).slice(0, 300)}`);
    const aug = body.data!.map((m) => m.id).filter((id) => id.startsWith("aug/"));
    assert.deepEqual(
      aug,
      [],
      `aug/* advertised without binary: ${aug.slice(0, 5).join(", ")} (${aug.length})`
    );
  }
);
