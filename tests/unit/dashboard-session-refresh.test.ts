import test from "node:test";
import "../_setup/isolateDataDir.ts";
import assert from "node:assert/strict";
import { decodeJwt } from "jose";
import * as session from "../../src/shared/utils/dashboardSessionToken.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
test.after(() => resetDbInstance());

const secret = new TextEncoder().encode("session-refresh-unit-test-only");

test("refresh keeps the verified session id and original issue time", async () => {
  const identity = { jti: "session-under-test", iat: Math.floor(Date.now() / 1000) - 1000 };
  const renewed = decodeJwt(await session.mintDashboardSessionToken(secret, identity));
  assert.equal(renewed.jti, identity.jti);
  assert.equal(renewed.iat, identity.iat);
  assert.equal(renewed.authenticated, true);
  assert.ok(renewed.exp! > Math.floor(Date.now() / 1000) + 29 * 86400);
});

test("multiple refreshed copies match one revocation while a separate login does not", async () => {
  const identity = { jti: "same-session", iat: Math.floor(Date.now() / 1000) - 1000 };
  const first = decodeJwt(await session.mintDashboardSessionToken(secret, identity));
  const second = decodeJwt(await session.mintDashboardSessionToken(secret, identity));
  const unrelated = decodeJwt(await session.mintDashboardSessionToken(secret));
  const revoked = session.addRevokedSession([], { jti: first.jti!, exp: first.exp! }, 1);
  assert.ok(revoked.some((entry) => entry.jti === second.jti));
  assert.equal(
    revoked.some((entry) => entry.jti === unrelated.jti),
    false
  );
});

test("refresh cannot move a session past a later password-change cutoff", async () => {
  const cutoff = Math.floor(Date.now() / 1000) - 30;
  const renewed = decodeJwt(
    await session.mintDashboardSessionToken(secret, { jti: "old-session", iat: cutoff - 60 })
  );
  assert.ok(renewed.iat! < cutoff);
});

test("fresh sign-ins still receive independent identities", async () => {
  const first = decodeJwt(await session.mintDashboardSessionToken(secret));
  const second = decodeJwt(await session.mintDashboardSessionToken(secret));
  assert.notEqual(first.jti, second.jti);
});

test("an invalid refresh identity is refused rather than becoming another session", async () => {
  await assert.rejects(session.mintDashboardSessionToken(secret, { jti: "", iat: 1 }));
  await assert.rejects(session.mintDashboardSessionToken(secret, { jti: "test", iat: NaN }));
});
