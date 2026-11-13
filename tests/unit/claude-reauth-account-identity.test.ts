// ocx-49: a re-auth that names a connection (connectionId) skipped every identity check, so tokens of
// a DIFFERENT Claude account attached to the old row and the row kept the old account's accountUUID.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-reauth-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { persistOAuthConnection } = await import("../../src/lib/oauth/connectionPersistence.ts");
const { claude } = await import("../../src/lib/oauth/providers/claude.ts");

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const login = (email: string, tag: string, uuid?: string, connectionId?: string) =>
  persistOAuthConnection(
    "claude",
    {
      email,
      accessToken: `tok-${tag}`,
      refreshToken: `ref-${tag}`,
      expiresIn: 3600,
      ...(uuid
        ? {
            providerSpecificData: {
              accountUUID: uuid,
              organizationUUID: `org-${uuid.toLowerCase()}`,
            },
          }
        : {}),
    },
    connectionId
  );

test("a re-auth of a named connection with another account's UUID does not overwrite the row", async () => {
  const a = await login("a@example.com", "a", "uuid-a");
  const other = await login("c@example.com", "c", "uuid-c", a.id);
  const rows = await providersDb.getProviderConnections({ provider: "claude" });
  assert.notEqual(other.id, a.id, "the other account must get its own connection");
  assert.equal(rows.length, 2);
  const kept = rows.find((r: { id: string }) => r.id === a.id);
  assert.equal(kept?.accessToken, "tok-a");
  assert.equal(kept?.providerSpecificData?.accountUUID, "uuid-a");
});

test("a re-auth of a named connection with the same account UUID updates the row", async () => {
  const a = await login("a@example.com", "a", "uuid-a");
  const again = await login("a@example.com", "a2", "UUID-A", a.id);
  const rows = await providersDb.getProviderConnections({ provider: "claude" });
  assert.equal(again.id, a.id);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].accessToken, "tok-a2");
});

test("a re-auth of a named connection for another organization of the account does not overwrite the row", async () => {
  const personal = await persistOAuthConnection(
    "claude",
    {
      email: "a@example.com",
      accessToken: "tok-p",
      refreshToken: "ref-p",
      expiresIn: 3600,
      providerSpecificData: { accountUUID: "uuid-a", organizationUUID: "org-personal" },
    },
    undefined
  );
  const team = await persistOAuthConnection(
    "claude",
    {
      email: "a@example.com",
      accessToken: "tok-t",
      refreshToken: "ref-t",
      expiresIn: 3600,
      providerSpecificData: { accountUUID: "uuid-a", organizationUUID: "org-team" },
    },
    personal.id
  );
  const rows = await providersDb.getProviderConnections({ provider: "claude" });
  assert.notEqual(team.id, personal.id);
  assert.equal(rows.length, 2);
  assert.equal(rows.find((r: { id: string }) => r.id === personal.id)?.accessToken, "tok-p");
});

test("the same email with another account UUID is another account, not a re-login", async () => {
  const a = await login("shared@example.com", "a", "uuid-a");
  const b = await login("shared@example.com", "b", "uuid-b");
  const rows = await providersDb.getProviderConnections({ provider: "claude" });
  assert.notEqual(b.id, a.id);
  assert.equal(rows.length, 2);
});

test("a re-auth with no identity in the payload still updates the named row (lookup is best-effort)", async () => {
  const a = await login("a@example.com", "a", "uuid-a");
  const again = await login("a@example.com", "a2", undefined, a.id);
  const rows = await providersDb.getProviderConnections({ provider: "claude" });
  assert.equal(again.id, a.id);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].accessToken, "tok-a2");
});

test("mapTokens still stores the identity the lookup returned", () => {
  const tokenData = claude.mapTokens(
    { access_token: "tok", refresh_token: "ref", expires_in: 3600 },
    { account_uuid: "uuid-x", organization_uuid: "org-x", account_email: "x@example.com" }
  );
  assert.equal(tokenData.providerSpecificData.accountUUID, "uuid-x");
  assert.equal(tokenData.providerSpecificData.organizationUUID, "org-x");
});
