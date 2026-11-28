import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mgmt-pwd-insecure-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");

function makeLogger() {
  const warnings: string[] = [];
  return {
    warnings,
    log() {},
    warn: (...args: unknown[]) => {
      warnings.push(args.map((a) => String(a)).join(" "));
    },
  };
}

test.afterEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("warns when bootstrapping the management password with the CHANGEME default (Seg2)", async () => {
  const logger = makeLogger();

  const result = await managementPassword.ensurePersistentManagementPasswordHash({
    settings: {},
    initialPassword: "CHANGEME",
    logger,
  });

  // It still bootstraps (does not hard-reject — would break local dev), but it must warn loudly.
  assert.equal(managementPassword.isBcryptHash(result.hash), true);
  assert.equal(
    logger.warnings.some((line) => line.includes("CHANGEME")),
    true,
    "expected a security warning mentioning the CHANGEME default"
  );
});

test("does not warn when bootstrapping with a strong password", async () => {
  const logger = makeLogger();

  const result = await managementPassword.ensurePersistentManagementPasswordHash({
    settings: {},
    initialPassword: "a-strong-unique-password",
    logger,
  });

  assert.equal(managementPassword.isBcryptHash(result.hash), true);
  assert.equal(
    logger.warnings.length,
    0,
    "did not expect any security warning for a strong password"
  );
});

test("a whitespace-only INITIAL_PASSWORD becomes the password as written", async () => {
  const result = await managementPassword.ensurePersistentManagementPasswordHash({
    settings: {},
    initialPassword: "   ",
    logger: makeLogger(),
  });

  assert.equal(result.source, "env");
  assert.equal(await managementPassword.verifyManagementPassword("   ", result.hash), true);
});

test("an empty INITIAL_PASSWORD leaves the password unset", async () => {
  const result = await managementPassword.ensurePersistentManagementPasswordHash({
    settings: {},
    initialPassword: "",
    logger: makeLogger(),
  });

  assert.equal(result.source, "missing");
  assert.equal(result.hash, null);
});

// bcryptjs appends a NUL to the key and reads it cyclically, so an input made of whole
// repetitions of the stored placeholder plus NUL verifies as the placeholder itself.
// The off-host refusal used to compare the submitted string with the list of known
// defaults, so such an input passed the password check without matching the list.
const PLACEHOLDER_EQUIVALENT_INPUT = "CHANGEME\u0000CHANGEME";

test("verifyManagementPassword refuses an input with NUL even when bcrypt would accept it", async () => {
  const hash = await managementPassword.hashManagementPassword("CHANGEME");
  assert.equal(await managementPassword.verifyManagementPassword("CHANGEME", hash), true);
  assert.equal(
    await managementPassword.verifyManagementPassword(PLACEHOLDER_EQUIVALENT_INPUT, hash),
    false,
    "a NUL-containing input must never verify, whatever bcrypt says about it"
  );
});

test("isStoredManagementPasswordKnownInsecure decides on the stored hash, not the input", async () => {
  const insecure = await managementPassword.hashManagementPassword("CHANGEME");
  const strong = await managementPassword.hashManagementPassword("a-strong-unique-password");
  assert.equal(await managementPassword.isStoredManagementPasswordKnownInsecure(insecure), true);
  assert.equal(await managementPassword.isStoredManagementPasswordKnownInsecure(strong), false);
  assert.equal(await managementPassword.isStoredManagementPasswordKnownInsecure(""), false);
  assert.equal(
    await managementPassword.isStoredManagementPasswordKnownInsecure("not-a-bcrypt-hash"),
    false
  );
});
