import assert from "node:assert/strict";
import { test } from "node:test";
import {
  REFRESH_SKEW_MS,
  jwtExpiry,
  needsRefresh,
  readRefreshResponse,
  refreshBody,
} from "../../../src/app/(dashboard)/dashboard/grok-bot/token";

const jwt = (expSeconds: number) =>
  `header.${Buffer.from(JSON.stringify({ exp: expSeconds })).toString("base64url")}.sig`;

test("the refresh call names the grok-bot client", () => {
  const body = JSON.parse(refreshBody("old-refresh")) as Record<string, string>;
  assert.deepEqual(body, {
    client_id: "grok-bot",
    grant_type: "refresh_token",
    refresh_token: "old-refresh",
  });
});

test("a fresh access token is read with its expiry", () => {
  const tokens = readRefreshResponse(
    { access_token: jwt(1_800_000_000), shouldLogout: false },
    "old-refresh"
  );
  assert.equal(tokens?.refreshToken, "old-refresh");
  assert.equal(tokens?.expiresAt, new Date(1_800_000_000_000).toISOString());
});

test("a rotated refresh token is kept", () => {
  const tokens = readRefreshResponse(
    { access_token: jwt(1_800_000_000), refresh_token: "new" },
    "old"
  );
  assert.equal(tokens?.refreshToken, "new");
});

test("an empty access token is not a refresh", () => {
  assert.equal(readRefreshResponse({ access_token: "", shouldLogout: true }, "old"), null);
  assert.equal(readRefreshResponse({ access_token: "" }, "old"), null);
});

test("shouldLogout means the grant is gone", () => {
  assert.equal(
    readRefreshResponse({ access_token: jwt(1_800_000_000), shouldLogout: true }, "old"),
    null
  );
});

test("a malformed answer is not a refresh", () => {
  assert.equal(readRefreshResponse(null, "old"), null);
  assert.equal(readRefreshResponse("nonsense", "old"), null);
});

test("an unreadable token still yields a token without an expiry", () => {
  assert.equal(jwtExpiry("not-a-jwt"), "");
  assert.equal(readRefreshResponse({ access_token: "opaque" }, "old")?.expiresAt, "");
});

test("a missing access token always needs a refresh", () => {
  assert.equal(needsRefresh({ accessToken: "" }, 1_000), true);
  assert.equal(needsRefresh({}, 1_000), true);
});

test("without a refresh token there is nothing to do", () => {
  assert.equal(
    needsRefresh({ accessToken: "a", expiresAt: "2020-01-01T00:00:00.000Z" }, 1_000),
    false
  );
});

test("a spent access token needs a refresh a minute early", () => {
  const expiry = Date.parse("2026-06-01T00:00:00.000Z");
  const connection = {
    accessToken: "a",
    refreshToken: "r",
    expiresAt: new Date(expiry).toISOString(),
  };
  assert.equal(needsRefresh(connection, expiry - REFRESH_SKEW_MS - 1), false);
  assert.equal(needsRefresh(connection, expiry - REFRESH_SKEW_MS), true);
  assert.equal(needsRefresh(connection, expiry + 1), true);
});

test("an unset expiry leaves the token alone", () => {
  assert.equal(needsRefresh({ accessToken: "a", refreshToken: "r" }, Date.now()), false);
});

test("the expiry column refreshed most recently wins", () => {
  const later = new Date(Date.now() + 3_600_000).toISOString();
  const earlier = new Date(Date.now() - 3_600_000).toISOString();
  assert.equal(
    needsRefresh(
      { accessToken: "a", refreshToken: "r", expiresAt: earlier, tokenExpiresAt: later },
      Date.now()
    ),
    false
  );
  assert.equal(
    needsRefresh(
      { accessToken: "a", refreshToken: "r", expiresAt: later, tokenExpiresAt: earlier },
      Date.now()
    ),
    true
  );
});

test("an opaque token still gets an expiry from expires_in", () => {
  const tokens = readRefreshResponse({ access_token: "opaque", expires_in: 3600 }, "old");
  const expiresAt = tokens?.expiresAt ?? "";
  assert.notEqual(expiresAt, "");
  const remaining = Date.parse(expiresAt) - Date.now();
  assert.ok(remaining > 3_000_000 && remaining <= 3_600_000, String(remaining));
});
