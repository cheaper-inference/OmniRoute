import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { z } from "zod";

const dir = mkdtempSync(join(tmpdir(), "m365-identity-"));
process.env.DATA_DIR = dir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const { findExistingOAuthConnectionMatch, persistOAuthConnection } =
  await import("../../src/lib/oauth/connectionPersistence.ts");
const provider = "copilot-m365-web";
const tenantA = "11111111-1111-4111-8111-111111111111";
const tenantB = "22222222-2222-4222-8222-222222222222";
const objectA = "33333333-3333-4333-8333-333333333333";
const objectB = "44444444-4444-4444-8444-444444444444";
const identity = (tid: string, oid: string) => ({ tid, oid, chathubPath: `${oid}@${tid}` });
const incoming = (tid: string, oid: string) => ({
  provider,
  authType: "oauth",
  email: "fixture@example.invalid",
  name: "Synthetic account",
  accessToken: "synthetic-access",
  refreshToken: "synthetic-refresh",
  providerSpecificData: identity(tid, oid),
});
test.after(() => {
  core.resetDbInstance();
  rmSync(dir, { recursive: true, force: true });
});

test("M365 OAuth matches tenant/object identity rather than shared email", () => {
  const first = { ...incoming(tenantA, objectA), id: "first" };
  assert.equal(
    findExistingOAuthConnectionMatch([first], provider, incoming(tenantB, objectA)),
    undefined
  );
  assert.equal(
    findExistingOAuthConnectionMatch([first], provider, incoming(tenantA, objectB)),
    undefined
  );
  assert.equal(
    findExistingOAuthConnectionMatch([first], provider, incoming(tenantA, objectA))?.id,
    "first"
  );
  assert.equal(
    findExistingOAuthConnectionMatch([first], provider, {
      ...incoming(tenantA, objectA),
      email: "new@example.invalid",
    })?.id,
    "first"
  );
});

test("M365 explicit reauthentication cannot replace a different account", () => {
  const first = { ...incoming(tenantA, objectA), id: "first" };
  assert.throws(
    () => findExistingOAuthConnectionMatch([first], provider, incoming(tenantB, objectA), "first"),
    /different|identity|account/i
  );
  assert.throws(
    () =>
      findExistingOAuthConnectionMatch([first], provider, incoming(tenantA, objectA), "missing"),
    /not found|missing/i
  );
});

test("legacy imported connection can be reauthenticated only with its known ChatHub identity", () => {
  const legacy = {
    id: "legacy",
    provider,
    authType: "apikey",
    providerSpecificData: { chathubPath: `${objectA}@${tenantA}`, tier: "enterprise" },
  };
  assert.equal(
    findExistingOAuthConnectionMatch([legacy], provider, incoming(tenantA, objectA), "legacy")?.id,
    "legacy"
  );
  assert.throws(
    () =>
      findExistingOAuthConnectionMatch([legacy], provider, incoming(tenantB, objectA), "legacy"),
    /identity|account/i
  );
});

test("database create does not remerge Microsoft accounts sharing one email", async () => {
  const a = await db.createProviderConnection(incoming(tenantA, objectA));
  const b = await db.createProviderConnection(incoming(tenantB, objectA));
  const c = await db.createProviderConnection(incoming(tenantA, objectB));
  assert.notEqual(a.id, b.id);
  assert.notEqual(a.id, c.id);
  const renewed = await db.createProviderConnection({
    ...incoming(tenantA, objectA),
    email: "changed@example.invalid",
  });
  assert.equal(renewed.id, a.id);
  const rows = await db.getProviderConnections({ provider });
  assert.equal(rows.length, 3);
});

test("reauth upgrades only the same legacy connection while retaining its operator settings", async () => {
  const legacy = await db.createProviderConnection({
    provider,
    authType: "apikey",
    name: "legacy synthetic",
    apiKey: `access_token=synthetic-legacy; chathubPath=${objectB}@${tenantB}`,
    idToken: "synthetic-stale-id",
    providerSpecificData: {
      chathubPath: `${objectB}@${tenantB}`,
      tier: "enterprise",
      host: "substrate.office.com",
      tags: ["preserve"],
      accessToken: "synthetic-stale-access",
      refreshToken: "synthetic-stale-refresh",
      access_token: "synthetic-stale-access-alias",
      refresh_token: "synthetic-stale-refresh-alias",
      token: "synthetic-stale-token",
      cookie: "synthetic-stale-cookie",
    },
  });
  const id = z.string().parse(legacy.id);
  const renewed = await persistOAuthConnection(
    provider,
    { ...incoming(tenantB, objectB), expiresIn: 3600 },
    id
  );
  assert.equal(renewed.id, id);
  const saved = await db.getProviderConnectionById(id);
  const metadata = z.record(z.string(), z.unknown()).parse(saved.providerSpecificData);
  assert.equal(saved.authType, "oauth");
  assert.equal(saved.apiKey ?? null, null);
  assert.equal(saved.name, "legacy synthetic");
  assert.equal(saved.idToken ?? null, null);
  assert.equal(saved.refreshToken, "synthetic-refresh");
  for (const key of [
    "accessToken",
    "refreshToken",
    "access_token",
    "refresh_token",
    "token",
    "cookie",
  ]) {
    assert.equal(Object.hasOwn(metadata, key), false, `obsolete credential ${key} retained`);
  }
  assert.equal(metadata.tier, "enterprise");
  assert.equal(metadata.host, "substrate.office.com");
  assert.deepEqual(metadata.tags, ["preserve"]);
  assert.equal(metadata.chathubPath, `${objectB}@${tenantB}`);
  assert.equal(saved.expiresAt, saved.tokenExpiresAt);
});
