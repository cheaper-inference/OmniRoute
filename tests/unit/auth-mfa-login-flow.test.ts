import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * Opt-in dashboard TOTP two-factor login.
 *
 * With the factor enrolled, a correct password must no longer be enough to obtain either a
 * dashboard session (`/api/auth/login`) or a CLI access token (`/api/cli/connect`); the
 * second step (`/api/auth/mfa/verify`) shares the login brute-force guard, and the
 * intermediate token can never stand in for a session.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mfa-flow-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-mfa-flow";
const ORIGINAL_STAMP_TOKEN = process.env.OMNIROUTE_PEER_STAMP_TOKEN;
process.env.OMNIROUTE_PEER_STAMP_TOKEN = "test-peer-stamp-mfa-flow";
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_DISABLE_MFA = process.env.OMNIROUTE_DISABLE_MFA;

const PASSWORD = "correct-horse-battery";

const core = await import("../../src/lib/db/core.ts");
const mfaDb = await import("../../src/lib/db/dashboardMfa.ts");
const totp = await import("../../src/lib/auth/totp.ts");
const backupCodes = await import("../../src/lib/auth/backupCodes.ts");
const loginGuard = await import("../../src/server/auth/loginGuard.ts");
const sessionToken = await import("../../src/shared/utils/dashboardSessionToken.ts");
const loginRoute = await import("../../src/app/api/auth/login/route.ts");
const verifyRoute = await import("../../src/app/api/auth/mfa/verify/route.ts");
const setupRoute = await import("../../src/app/api/auth/mfa/setup/route.ts");
const enableRoute = await import("../../src/app/api/auth/mfa/enable/route.ts");
const disableRoute = await import("../../src/app/api/auth/mfa/disable/route.ts");
const statusRoute = await import("../../src/app/api/auth/mfa/status/route.ts");
const connectRoute = await import("../../src/app/api/cli/connect/route.ts");
const settingsRoute = await import("../../src/app/api/settings/route.ts");
const { makeManagementSessionRequest } = await import("../helpers/managementSession.ts");

// Hashing ten bcrypt codes is slow on a loaded box: build one set and reuse it.
const FIXTURE = await backupCodes.generateBackupCodes(3);

type CookieOptions = Record<string, unknown>;

function makeCookieJar(initial: Record<string, string> = {}) {
  const jar = new Map(Object.entries(initial));
  const sets: Array<[string, string, CookieOptions]> = [];
  const store = {
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) as string } : undefined),
    set: (name: string, value: string, options: CookieOptions = {}) => {
      sets.push([name, value, options]);
      if (options.maxAge === 0) jar.delete(name);
      else jar.set(name, value);
    },
    delete: (name: string) => {
      jar.delete(name);
    },
  };
  return { jar, sets, store };
}

let cookieJar = makeCookieJar();
const originalLoginCookies = loginRoute.authRouteInternals.getCookieStore;
const originalVerifyCookies = verifyRoute.mfaVerifyRouteInternals.getCookieStore;

function useCookieJar(jar: ReturnType<typeof makeCookieJar>) {
  cookieJar = jar;
  loginRoute.authRouteInternals.getCookieStore = (async () =>
    jar.store) as unknown as typeof originalLoginCookies;
  verifyRoute.mfaVerifyRouteInternals.getCookieStore = (async () =>
    jar.store) as unknown as typeof originalVerifyCookies;
}

function peerHeaders(peerIp: string): Record<string, string> {
  const local = peerIp === "127.0.0.1";
  return {
    "content-type": "application/json",
    "x-forwarded-for": peerIp,
    "x-omniroute-peer-locality": local ? "loopback" : "remote",
    "x-omniroute-trusted-peer-ip": peerIp,
  };
}

function post(url: string, body: unknown, peerIp = "203.0.113.10") {
  return new Request(`http://localhost${url}`, {
    method: "POST",
    headers: peerHeaders(peerIp),
    body: JSON.stringify(body),
  });
}

function currentCode(secret: string, drift = 0): string {
  return totp.generateHotpCode(secret, totp.totpCounter() + drift);
}

function enrollFixture(): string {
  const secret = totp.generateTotpSecret();
  mfaDb.enableDashboardMfaState({
    secret,
    backupCodeHashes: FIXTURE.hashes,
    lastTotpCounter: null,
  });
  return secret;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  process.env.INITIAL_PASSWORD = PASSWORD;
  delete process.env.OMNIROUTE_DISABLE_MFA;
  loginGuard.resetLoginGuardForTests();
}

test.beforeEach(async () => {
  await resetStorage();
  useCookieJar(makeCookieJar());
});

test.after(() => {
  loginRoute.authRouteInternals.getCookieStore = originalLoginCookies;
  verifyRoute.mfaVerifyRouteInternals.getCookieStore = originalVerifyCookies;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  const restore = (name: string, value: string | undefined) => {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  };
  restore("OMNIROUTE_PEER_STAMP_TOKEN", ORIGINAL_STAMP_TOKEN);
  restore("INITIAL_PASSWORD", ORIGINAL_INITIAL_PASSWORD);
  restore("OMNIROUTE_DISABLE_MFA", ORIGINAL_DISABLE_MFA);
});

test("MFA is off by default: a correct password still yields a session directly", async () => {
  const response = await loginRoute.POST(post("/api/auth/login", { password: PASSWORD }) as never);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(cookieJar.jar.has("auth_token"), true);
  assert.equal(cookieJar.jar.has(sessionToken.MFA_PENDING_COOKIE), false);
});

test("with MFA on, the password step issues only a pending token that is not a session", async () => {
  enrollFixture();
  const response = await loginRoute.POST(post("/api/auth/login", { password: PASSWORD }) as never);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: false, mfaRequired: true });
  assert.equal(cookieJar.jar.has("auth_token"), false, "no session before the second factor");

  const pending = cookieJar.jar.get(sessionToken.MFA_PENDING_COOKIE);
  assert.ok(pending, "pending cookie set");
  const [, , options] = cookieJar.sets.find(([name]) => name === sessionToken.MFA_PENDING_COOKIE)!;
  assert.equal(options.httpOnly, true);
  assert.equal(options.path, sessionToken.MFA_PENDING_COOKIE_PATH);
  assert.equal(options.maxAge, sessionToken.MFA_PENDING_MAX_AGE_SECONDS);

  // Replaying the intermediate token as the session cookie must not authenticate.
  assert.equal(await sessionToken.verifyDashboardSessionToken(pending), null);
  assert.ok(await sessionToken.verifyMfaPendingToken(pending));
  // …and a real session token is not accepted as a pending token either.
  const session = await sessionToken.mintDashboardSessionToken(
    sessionToken.getDashboardJwtSecret()!
  );
  assert.equal(await sessionToken.verifyMfaPendingToken(session), null);
});

test("verify trades a valid TOTP for a session and refuses the same step twice", async () => {
  const secret = enrollFixture();
  await loginRoute.POST(post("/api/auth/login", { password: PASSWORD }) as never);
  const pending = cookieJar.jar.get(sessionToken.MFA_PENDING_COOKIE)!;
  const code = currentCode(secret);

  const ok = await verifyRoute.POST(post("/api/auth/mfa/verify", { code }) as never);
  assert.equal(ok.status, 200);
  const body = await ok.json();
  assert.equal(body.success, true);
  assert.equal(body.method, "totp");
  const session = cookieJar.jar.get("auth_token");
  assert.ok(session, "session cookie set after the second factor");
  assert.ok(await sessionToken.verifyDashboardSessionToken(session));
  assert.equal(cookieJar.jar.has(sessionToken.MFA_PENDING_COOKIE), false, "pending cleared");

  // Same code again, with a fresh pending cookie: replay inside the window is refused.
  useCookieJar(makeCookieJar({ [sessionToken.MFA_PENDING_COOKIE]: pending }));
  const replay = await verifyRoute.POST(post("/api/auth/mfa/verify", { code }) as never);
  assert.equal(replay.status, 401);
  assert.equal(cookieJar.jar.has("auth_token"), false);
});

test("verify without a pending login is refused", async () => {
  const secret = enrollFixture();
  const response = await verifyRoute.POST(
    post("/api/auth/mfa/verify", { code: currentCode(secret) }) as never
  );
  assert.equal(response.status, 401);
  const body = await response.json();
  assert.equal(typeof body.error?.message, "string");
  assert.equal(body.error.message.includes("at /"), false, "no stack trace in the body");
  assert.equal(cookieJar.jar.has("auth_token"), false);
});

test("a backup code works once and is burned", async () => {
  enrollFixture();
  await loginRoute.POST(post("/api/auth/login", { password: PASSWORD }) as never);
  const pending = cookieJar.jar.get(sessionToken.MFA_PENDING_COOKIE)!;

  const first = await verifyRoute.POST(
    post("/api/auth/mfa/verify", { code: FIXTURE.codes[1].toLowerCase() }) as never
  );
  assert.equal(first.status, 200);
  const body = await first.json();
  assert.equal(body.method, "backup_code");
  assert.equal(body.backupCodesRemaining, FIXTURE.codes.length - 1);
  assert.equal(mfaDb.getDashboardMfaState().backupCodeHashes.length, FIXTURE.codes.length - 1);

  useCookieJar(makeCookieJar({ [sessionToken.MFA_PENDING_COOKIE]: pending }));
  const again = await verifyRoute.POST(
    post("/api/auth/mfa/verify", { code: FIXTURE.codes[1] }) as never
  );
  assert.equal(again.status, 401);
});

test("bad codes lock the peer out and the lockout holds even for a later valid code", async () => {
  const secret = enrollFixture();
  await loginRoute.POST(post("/api/auth/login", { password: PASSWORD }) as never);
  const { FAILURE_THRESHOLD } = loginGuard.LOGIN_GUARD_TUNABLES;
  const statuses: number[] = [];
  for (let i = 0; i < FAILURE_THRESHOLD; i += 1) {
    const response = await verifyRoute.POST(
      post("/api/auth/mfa/verify", { code: "000000" }) as never
    );
    statuses.push(response.status);
  }
  assert.equal(statuses.at(-1), 429, `last bad code locks out: ${statuses.join(",")}`);

  const valid = await verifyRoute.POST(
    post("/api/auth/mfa/verify", { code: currentCode(secret) }) as never
  );
  assert.equal(valid.status, 429);
  assert.ok(valid.headers.get("retry-after"));
  assert.equal(cookieJar.jar.has("auth_token"), false);
});

test("the recovery switch skips the factor only for the operator at the host", async () => {
  enrollFixture();
  process.env.OMNIROUTE_DISABLE_MFA = "true";

  const remote = await loginRoute.POST(
    post("/api/auth/login", { password: PASSWORD }, "203.0.113.20") as never
  );
  assert.deepEqual(await remote.json(), { success: false, mfaRequired: true });
  assert.equal(cookieJar.jar.has("auth_token"), false);

  const local = await loginRoute.POST(
    post("/api/auth/login", { password: PASSWORD }, "127.0.0.1") as never
  );
  assert.deepEqual(await local.json(), { success: true });
  assert.equal(cookieJar.jar.has("auth_token"), true);
});

test("cli/connect refuses a password-only exchange while MFA is on", async () => {
  const secret = enrollFixture();

  const passwordOnly = await connectRoute.POST(
    post("/api/cli/connect", { password: PASSWORD, name: "laptop" }) as never
  );
  assert.equal(passwordOnly.status, 401);
  const refused = await passwordOnly.json();
  assert.equal(refused.mfaRequired, true);
  assert.equal(refused.token, undefined, "no access token without the second factor");

  const wrong = await connectRoute.POST(
    post("/api/cli/connect", { password: PASSWORD, name: "laptop", totp: "000000" }) as never
  );
  assert.equal(wrong.status, 401);
  assert.equal((await wrong.json()).token, undefined);

  const withCode = await connectRoute.POST(
    post("/api/cli/connect", {
      password: PASSWORD,
      name: "laptop",
      totp: currentCode(secret),
    }) as never
  );
  assert.equal(withCode.status, 200);
  const minted = await withCode.json();
  assert.equal(typeof minted.token, "string");
});

test("cli/connect is unchanged while MFA is off", async () => {
  const response = await connectRoute.POST(
    post("/api/cli/connect", { password: PASSWORD, name: "laptop" }) as never
  );
  assert.equal(response.status, 200);
  assert.equal(typeof (await response.json()).token, "string");
});

test("enrollment: setup → enable needs the password and a valid code; disable needs both too", async () => {
  const badSetup = await setupRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/auth/mfa/setup", {
      method: "POST",
      body: { password: "wrong-password" },
    })
  );
  assert.equal(badSetup.status, 401);

  const setup = await setupRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/auth/mfa/setup", {
      method: "POST",
      body: { password: PASSWORD },
    })
  );
  assert.equal(setup.status, 200);
  const enrollment = await setup.json();
  assert.match(enrollment.secret, /^[A-Z2-7]{32}$/);
  assert.ok(enrollment.otpauthUri.startsWith("otpauth://totp/"));
  assert.ok(enrollment.qrCodeDataUri.startsWith("data:image/png;base64,"));
  assert.equal(mfaDb.getDashboardMfaState().enabled, false, "setup persists nothing");

  const wrongCode = await enableRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/auth/mfa/enable", {
      method: "POST",
      body: { password: PASSWORD, secret: enrollment.secret, code: "000000" },
    })
  );
  assert.equal(wrongCode.status, 401);
  assert.equal(mfaDb.getDashboardMfaState().enabled, false);

  const enable = await enableRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/auth/mfa/enable", {
      method: "POST",
      body: { password: PASSWORD, secret: enrollment.secret, code: currentCode(enrollment.secret) },
    })
  );
  assert.equal(enable.status, 200);
  const enabled = await enable.json();
  assert.equal(enabled.backupCodes.length, backupCodes.BACKUP_CODE_COUNT);
  assert.equal(mfaDb.getDashboardMfaState().enabled, true);
  assert.equal(mfaDb.getDashboardMfaState().secret, enrollment.secret);

  const status = await statusRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/auth/mfa/status")
  );
  const statusBody = await status.json();
  assert.equal(statusBody.enabled, true);
  assert.equal(statusBody.backupCodesRemaining, backupCodes.BACKUP_CODE_COUNT);
  assert.equal(JSON.stringify(statusBody).includes(enrollment.secret), false);

  const passwordOnlyDisable = await disableRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/auth/mfa/disable", {
      method: "POST",
      body: { password: PASSWORD, code: "000000" },
    })
  );
  assert.equal(passwordOnlyDisable.status, 401);
  assert.equal(mfaDb.getDashboardMfaState().enabled, true);

  const disable = await disableRoute.POST(
    await makeManagementSessionRequest("http://localhost/api/auth/mfa/disable", {
      method: "POST",
      body: { password: PASSWORD, code: currentCode(enrollment.secret, 1) },
    })
  );
  assert.equal(disable.status, 200);
  assert.equal(mfaDb.getDashboardMfaState().enabled, false);
  assert.equal(mfaDb.getDashboardMfaState().secret, "");
});

test("the TOTP secret is encrypted at rest when a storage key is configured", async () => {
  const original = process.env.STORAGE_ENCRYPTION_KEY;
  process.env.STORAGE_ENCRYPTION_KEY = "mfa-flow-test-storage-key-0123456789abcdef";
  try {
    const secret = enrollFixture();
    const row = core
      .getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = 'dashboardMfa' AND key = 'state'")
      .get() as { value: string };
    assert.equal(row.value.includes(secret), false, "plaintext secret must not be stored");
    assert.match(JSON.parse(row.value).secret, /^enc:v1:/);
    assert.equal(mfaDb.getDashboardMfaState().secret, secret);
  } finally {
    if (original === undefined) delete process.env.STORAGE_ENCRYPTION_KEY;
    else process.env.STORAGE_ENCRYPTION_KEY = original;
  }
});

test("GET /api/settings never exposes the factor and PATCH cannot set it", async () => {
  const secret = enrollFixture();
  const get = await settingsRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/settings")
  );
  assert.equal(get.status, 200);
  const serialized = JSON.stringify(await get.json());
  assert.equal(serialized.includes(secret), false);
  assert.equal(/mfaSecret|backupCodeHashes|dashboardMfa/.test(serialized), false);

  const patch = await settingsRoute.PATCH(
    await makeManagementSessionRequest("http://localhost/api/settings", {
      method: "PATCH",
      body: { mfaEnabled: false, mfaSecret: "AAAAAAAAAAAAAAAA" },
    })
  );
  // Unknown keys are stripped by the settings schema; either way the factor is untouched.
  assert.notEqual(patch.status, 500);
  const settingsDb = await import("../../src/lib/db/settings.ts");
  const stored = (await settingsDb.getSettings()) as Record<string, unknown>;
  assert.equal(stored.mfaSecret, undefined);
  assert.equal(mfaDb.getDashboardMfaState().enabled, true);
  assert.equal(mfaDb.getDashboardMfaState().secret, secret);
});

test("only the verify step is public, by exact path; enrollment routes need management auth", async () => {
  const { isPublicApiRoute } = await import("../../src/shared/constants/publicApiRoutes.ts");
  assert.equal(isPublicApiRoute("/api/auth/mfa/verify", "POST"), true);
  assert.equal(isPublicApiRoute("/api/auth/mfa/verify/", "POST"), true);
  for (const route of [
    "/api/auth/mfa/setup",
    "/api/auth/mfa/enable",
    "/api/auth/mfa/disable",
    "/api/auth/mfa/status",
    "/api/auth/mfa/verify-anything",
    "/api/auth/mfa/",
  ]) {
    assert.equal(isPublicApiRoute(route, "POST"), false, route);
  }
});
