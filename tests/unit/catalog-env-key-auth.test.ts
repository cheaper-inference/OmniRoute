import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-envkey-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_ENV_KEY = process.env.OMNIROUTE_API_KEY;

process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.INITIAL_PASSWORD;
process.env.OMNIROUTE_API_KEY = "sk-env-master-test-key";

const core = await import("../../src/lib/db/core.ts");
const catalogRequest = await import("../../src/app/api/v1/models/catalogRequest.ts");

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

// Both tests read an empty api_keys table; neither mutates it, so one
// storage setup for the file is enough (reset per test doubled runtime).

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  restoreEnv("DATA_DIR", ORIGINAL_DATA_DIR);
  restoreEnv("INITIAL_PASSWORD", ORIGINAL_INITIAL_PASSWORD);
  restoreEnv("OMNIROUTE_API_KEY", ORIGINAL_ENV_KEY);
});

// Regression: validateCatalogApiKey() used the DB-only validateApiKey(),
// skipping the isValidApiKey() env bypass (#1350), so the documented
// OMNIROUTE_API_KEY master key got a 401 on /v1/models whenever the
// api_keys table had no row for it (always, for env keys). Remote URL:
// isAuthRequired() enforces auth for non-loopback requests on a fresh DB.
test("env master key passes catalog auth with an empty api_keys table", async () => {
  const request = new Request("http://192.168.0.50:20128/v1/models", {
    headers: { authorization: `Bearer ${process.env.OMNIROUTE_API_KEY}` },
  });

  const rejection = await catalogRequest.getModelCatalogAuthRejection(request, {}, {});

  assert.equal(rejection, null, "OMNIROUTE_API_KEY must be accepted by catalog auth");
});

test("unknown key is still rejected with 401", async () => {
  const request = new Request("http://192.168.0.50:20128/v1/models", {
    headers: { authorization: "Bearer sk-definitely-not-registered" },
  });

  const rejection = await catalogRequest.getModelCatalogAuthRejection(request, {}, {});

  assert.ok(rejection, "unregistered key must be rejected");
  assert.equal(rejection!.status, 401);
});
