/**
 * KEA-9387: POST /api/cli/tokens enforces the same Name limit the dashboard form shows
 * (ACCESS_TOKEN_NAME_MAX_LENGTH), so the client message and the server refusal cannot drift.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-tokens-name-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "cli-tokens-name-api-key-secret";
process.env.JWT_SECRET = "cli-tokens-name-jwt-secret";
process.env.INITIAL_PASSWORD = "cli-tokens-name-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const tokensRoute = await import("../../src/app/api/cli/tokens/route.ts");
const { ACCESS_TOKEN_NAME_MAX_LENGTH } = await import("../../src/shared/constants/formLimits.ts");

await updateSettings({ requireLogin: true });
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-cli-name", ["manage"]);

test.after(() => {
  try {
    apiKeysDb.resetApiKeyState?.();
  } catch {}
  try {
    core.resetDbInstance();
  } catch {}
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [name, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

function mint(name: string) {
  return tokensRoute.POST(
    new Request("http://localhost:20128/api/cli/tokens", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${manageKey.key}` },
      body: JSON.stringify({ name, scope: "read" }),
    })
  );
}

test("the limit the form shows is the one the route enforces", () => {
  assert.equal(ACCESS_TOKEN_NAME_MAX_LENGTH, 100);
});

test("a name one character over the limit is refused with a field-level detail", async () => {
  const name = "n".repeat(ACCESS_TOKEN_NAME_MAX_LENGTH + 1);
  const res = await mint(name);
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.token, undefined);
  assert.equal(body.error.details[0].field, "name");
  assert.equal(accessTokensDb.listAccessTokens().filter((t) => t.name === name).length, 0);
});

test("a name exactly at the limit is accepted", async () => {
  const name = "n".repeat(ACCESS_TOKEN_NAME_MAX_LENGTH);
  const res = await mint(name);
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.name, name);
});
