import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-reauth-"));
process.env.DATA_DIR = dataDir;
const flag = "CLAUDE_REAUTH_IDENTITY_ENABLED";
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { getProviderConnections } = await import("../../src/lib/db/providers.ts");
const { persistOAuthConnection } = await import("../../src/lib/oauth/connectionPersistence.ts");

test.beforeEach(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
  delete process.env[flag];
});
test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  delete process.env[flag];
});

const login = (uuid: string, connectionId?: string) =>
  persistOAuthConnection(
    "claude",
    {
      email: "shared@example.com",
      accessToken: `fixture-${uuid}`,
      expiresIn: 3600,
      providerSpecificData: { accountUUID: uuid, organizationUUID: "one-org" },
    },
    connectionId
  );

test("with the flag off, a different Claude account updates the named row", async () => {
  const first = await login("account-one");
  const next = await login("account-two", first.id);
  assert.equal(next.id, first.id);
  const rows = await getProviderConnections({ provider: "claude" });
  assert.equal(rows.length, 1);
  assert.equal(rows[0].accessToken, "fixture-account-two");
});

test("with the flag on, a different Claude account gets its own row even with the same email and organization", async () => {
  process.env[flag] = "true";
  const first = await login("account-one");
  const next = await login("account-two", first.id);
  assert.notEqual(next.id, first.id, "the different account must have its own row");
  const rows = await getProviderConnections({ provider: "claude" });
  assert.equal(rows.length, 2);
  assert.equal(rows.find((row) => row.id === first.id)?.accessToken, "fixture-account-one");
  assert.equal(rows.find((row) => row.id === next.id)?.accessToken, "fixture-account-two");
});

test("a re-auth of a named connection with the same account UUID updates the row", async () => {
  process.env[flag] = "true";
  const a = await login("uuid-a");
  const again = await login("UUID-A", a.id);
  const rows = await getProviderConnections({ provider: "claude" });
  assert.equal(again.id, a.id);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].accessToken, "fixture-UUID-A");
});

test("a re-auth of a named connection for another organization of the account does not overwrite the row", async () => {
  process.env[flag] = "true";
  const personal = await persistOAuthConnection(
    "claude",
    {
      email: "a@example.com",
      accessToken: "fixture-personal",
      expiresIn: 3600,
      providerSpecificData: { accountUUID: "uuid-a", organizationUUID: "org-personal" },
    },
    undefined
  );
  const team = await persistOAuthConnection(
    "claude",
    {
      email: "a@example.com",
      accessToken: "fixture-team",
      expiresIn: 3600,
      providerSpecificData: { accountUUID: "uuid-a", organizationUUID: "org-team" },
    },
    personal.id
  );
  const rows = await getProviderConnections({ provider: "claude" });
  assert.notEqual(team.id, personal.id);
  assert.equal(rows.length, 2);
  assert.equal(
    rows.find((r: { id: string }) => r.id === personal.id)?.accessToken,
    "fixture-personal"
  );
});

test("the same email with another account UUID is another account, not a re-login", async () => {
  process.env[flag] = "true";
  const a = await login("uuid-a");
  const b = await login("uuid-b");
  const rows = await getProviderConnections({ provider: "claude" });
  assert.notEqual(b.id, a.id);
  assert.equal(rows.length, 2);
});
