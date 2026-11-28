/**
 * e0228 — the dashboard session lifetime (JWT expiry + cookie maxAge) is
 * hardcoded to 30 days. `DASHBOARD_SESSION_MAX_AGE_HOURS` opts into a shorter
 * session (9router ships 24 h); unset keeps the 30-day default, and no value
 * can make the session LONGER than the 30-day Seg3 hardening bound.
 */
import "../_setup/isolateDataDir.ts";
import { test } from "node:test";
import assert from "node:assert/strict";
import { jwtVerify } from "jose";

process.env.JWT_SECRET = "dashboard-session-max-age-env-secret";

const {
  mintDashboardSessionToken,
  dashboardSessionMaxAgeSeconds,
  DASHBOARD_SESSION_DEFAULT_MAX_AGE_SECONDS,
} = await import("../../src/shared/utils/dashboardSessionToken.ts");

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const DAY = 24 * 60 * 60;

function withEnv(value: string | undefined, fn: () => void) {
  const saved = process.env.DASHBOARD_SESSION_MAX_AGE_HOURS;
  try {
    if (value === undefined) delete process.env.DASHBOARD_SESSION_MAX_AGE_HOURS;
    else process.env.DASHBOARD_SESSION_MAX_AGE_HOURS = value;
    fn();
  } finally {
    if (saved === undefined) delete process.env.DASHBOARD_SESSION_MAX_AGE_HOURS;
    else process.env.DASHBOARD_SESSION_MAX_AGE_HOURS = saved;
  }
}

test("default lifetime stays 30 days (2592000 s)", () => {
  withEnv(undefined, () => {
    assert.equal(dashboardSessionMaxAgeSeconds(), 30 * DAY);
  });
  assert.equal(DASHBOARD_SESSION_DEFAULT_MAX_AGE_SECONDS, 30 * DAY);
});

test("integer hours shorten the session", () => {
  withEnv("24", () => assert.equal(dashboardSessionMaxAgeSeconds(), DAY));
  withEnv("1", () => assert.equal(dashboardSessionMaxAgeSeconds(), 3600));
});

test("invalid, zero or negative values keep the 30-day default", () => {
  for (const bad of ["", "abc", "0", "-5", "  "]) {
    withEnv(bad, () => assert.equal(dashboardSessionMaxAgeSeconds(), 30 * DAY, `value ${bad}`));
  }
});

test("values above the 30-day ceiling clamp to 30 days, never longer", () => {
  withEnv("720", () => assert.equal(dashboardSessionMaxAgeSeconds(), 30 * DAY));
  withEnv("9000", () => assert.equal(dashboardSessionMaxAgeSeconds(), 30 * DAY));
});

test("minted JWT expiry tracks the env lifetime (24 h), default stays ~30 d", async () => {
  process.env.DASHBOARD_SESSION_MAX_AGE_HOURS = "24";
  let expMinusIat = 0;
  try {
    const token = await mintDashboardSessionToken(secret);
    const { payload } = await jwtVerify(token, secret);
    expMinusIat = (payload.exp as number) - (payload.iat as number);
  } finally {
    delete process.env.DASHBOARD_SESSION_MAX_AGE_HOURS;
  }
  assert.ok(
    Math.abs(expMinusIat - DAY) <= 2,
    `24 h env should mint a ~86400 s token, got ${expMinusIat}`
  );

  const token = await mintDashboardSessionToken(secret);
  const { payload } = await jwtVerify(token, secret);
  const spread = (payload.exp as number) - (payload.iat as number);
  assert.ok(Math.abs(spread - 30 * DAY) <= 2, `default should mint a ~30 d token, got ${spread}`);
});
