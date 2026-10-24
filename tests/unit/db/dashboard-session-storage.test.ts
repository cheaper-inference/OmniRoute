import "../../_setup/isolateDataDir.ts";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { SignJWT, decodeJwt } from "jose";
import * as sessions from "../../../src/shared/utils/dashboardSessionToken.ts";
import * as store from "../../../src/lib/db/dashboardSessions.ts";
import * as core from "../../../src/lib/db/core.ts";
import { setDbInstance } from "../../../src/lib/db/singleton.ts";
import { createSqlJsAdapter } from "../../../src/lib/db/adapters/sqljsAdapter.ts";

const secret = new TextEncoder().encode("public-unit-test-only-dashboard-secret");
test.after(() => core.resetDbInstance());

test("a copied cookie and every refreshed variant end together, without ending another login", async () => {
  const token = await sessions.mintDashboardSessionToken(secret);
  const payload = decodeJwt(token);
  const other = await sessions.mintDashboardSessionToken(secret);
  const renewed = await sessions.mintDashboardSessionToken(secret, {
    jti: payload.jti!,
    iat: payload.iat!,
  });
  store.revokeDashboardSession(payload, token);
  assert.equal(await sessions.verifyDashboardSessionToken(token, secret), null);
  assert.equal(await sessions.verifyDashboardSessionToken(renewed, secret), null);
  assert.ok(await sessions.verifyDashboardSessionToken(other, secret));
  await assert.rejects(
    sessions.mintDashboardSessionToken(secret, { jti: payload.jti!, iat: payload.iat! })
  );
});

test("expiry reservation before logout covers a delayed signature; logout before reservation refuses renewal", async () => {
  const exp = Math.floor(Date.now() / 1000) + 100;
  const jti = crypto.randomUUID();
  store.reserveDashboardSessionExpiry(jti, exp + 10000);
  const old = { authenticated: true, jti, exp, iat: exp - 1000 };
  store.revokeDashboardSession(old, "public-unused-fixture");
  const row = core
    .getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get("dashboardSessionLifetimes", `jti:${jti}`) as { value: string };
  assert.equal(JSON.parse(row.value).exp, exp + 10000);
  const delayed = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setJti(jti)
    .setIssuedAt(old.iat)
    .setExpirationTime(exp + 10000)
    .sign(secret);
  assert.equal(await sessions.verifyDashboardSessionToken(delayed, secret), null);
  assert.throws(() => store.reserveDashboardSessionExpiry(jti, exp + 20000));
});

test("legacy signed cookies without a jti can be revoked without storing the cookie", async () => {
  const legacy = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  assert.ok(await sessions.verifyDashboardSessionToken(legacy, secret));
  store.revokeDashboardSession(decodeJwt(legacy), legacy);
  assert.equal(await sessions.verifyDashboardSessionToken(legacy, secret), null);
  const rows = core
    .getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all("dashboardSessionLifetimes");
  assert.equal(JSON.stringify(rows).includes(legacy), false);
});

test("concurrent sign-outs and more than 500 later revocations never resurrect earlier sessions", async () => {
  const first = await sessions.mintDashboardSessionToken(secret);
  const others = await Promise.all(
    Array.from({ length: 8 }, () => sessions.mintDashboardSessionToken(secret))
  );
  await Promise.all(
    [first, ...others].map(async (token) => store.revokeDashboardSession(decodeJwt(token), token))
  );
  const exp = Math.floor(Date.now() / 1000) + 10000;
  for (let n = 0; n < 510; n++)
    store.revokeDashboardSession({ jti: `bulk-${n}`, exp }, "public-fixture");
  for (const token of [first, ...others])
    assert.equal(await sessions.verifyDashboardSessionToken(token, secret), null);
  core.resetDbInstance();
  assert.equal(
    await sessions.verifyDashboardSessionToken(first, secret),
    null,
    "survives DB reopen"
  );
});

test("expired records alone are pruned, including fractional expiry boundaries", () => {
  const now = Date.now() / 1000;
  const future = `fraction-${crypto.randomUUID()}`;
  store.revokeDashboardSession({ jti: future, exp: now + 60.5 }, "public-fixture");
  store.revokeDashboardSession(
    { jti: `past-${crypto.randomUUID()}`, exp: now - 1 },
    "public-fixture"
  );
  store.reserveDashboardSessionExpiry(crypto.randomUUID(), now + 100);
  assert.equal(store.isDashboardSessionRevoked({ jti: future }, "public-fixture"), true);
});

test("sql.js revocations reach an independent reader before the debounce timer and propagate disk failure", async () => {
  const original = core.getDbInstance();
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-session-sqljs-"));
  const filename = path.join(dir, "sessions.sqlite");
  const db = await createSqlJsAdapter(filename);
  db.exec(
    "CREATE TABLE key_value(namespace TEXT NOT NULL,key TEXT NOT NULL,value TEXT NOT NULL,PRIMARY KEY(namespace,key))"
  );
  setDbInstance(db);
  try {
    store.revokeDashboardSession(
      { jti: "durable", exp: Date.now() / 1000 + 100 },
      "public-fixture"
    );
    const reader = new DatabaseSync(filename, { readOnly: true });
    try {
      const row = reader.prepare("SELECT value FROM key_value WHERE key = 'jti:durable'").get() as {
        value: string;
      };
      assert.equal(JSON.parse(row.value).revoked, true);
    } finally {
      reader.close();
    }
    fs.unlinkSync(filename);
    fs.mkdirSync(filename);
    assert.throws(() =>
      store.revokeDashboardSession(
        { jti: "cannot-save", exp: Date.now() / 1000 + 100 },
        "public-fixture"
      )
    );
  } finally {
    db.close();
    setDbInstance(original);
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
