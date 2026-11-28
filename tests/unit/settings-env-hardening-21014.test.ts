/**
 * Regression guards for #21014 (settings & `.env.example` hardening):
 *   1. Disabling `REQUIRE_API_KEY` via a DB feature-flag override while
 *      `process.env.REQUIRE_API_KEY=true` must never stay silent:
 *      - `warnIfNonLoopbackWithoutApiKey` / `warnIfInferenceServerExposed` must
 *        warn at startup on non-loopback binds and explicitly name the DB override.
 *      - `isRequireApiKeyEnabled()` must emit a deduplicated `[SECURITY]` warning
 *        when a DB override disables an env-enabled `REQUIRE_API_KEY=true`.
 *      - `PUT /api/settings/feature-flags` disabling `REQUIRE_API_KEY` must log a
 *        `[SECURITY]` warning and surface `securityWarning` in the response payload
 *        (documented in `docs/openapi.yaml`).
 *   2. `.env.example` ships `INITIAL_PASSWORD=` blank (fresh-install onboarding
 *      wizard / bootstrap-token flow; no stale `CHANGEME` default in `.env.example`
 *      or `CONTRIBUTING.md`) while preserving `MACHINE_ID_SALT=endpoint-proxy-salt`
 *      so `syncEnv` matches the template default (`cli-default-env-warning-16763`).
 */
import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { SignJWT } from "jose";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const ORIG_DATA_DIR = process.env.DATA_DIR;
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-21014-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getExistingDbInstance } = await import("../../src/lib/db/singleton.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { setFeatureFlagOverride, removeFeatureFlagOverride } =
  await import("../../src/lib/db/featureFlags.ts");
const { isRequireApiKeyEnabled } = await import("../../src/shared/utils/featureFlags.ts");
const { warnIfNonLoopbackWithoutApiKey } =
  await import("../../src/lib/startup/nonLoopbackApiKeyGuard.ts");
const featureFlagsRoute = await import("../../src/app/api/settings/feature-flags/route.ts");
const { syncEnv } = (await import("../../scripts/dev/sync-env.mjs")) as {
  syncEnv: (opts?: { rootDir?: string; quiet?: boolean }) => { created: boolean; added: number };
};

const ENV_KEYS = [
  "REQUIRE_API_KEY",
  "JWT_SECRET",
  "API_KEY_SECRET",
  "OMNIROUTE_DISABLE_REDIS_AUTH_CACHE",
] as const;
const SAVED_ENV: Record<string, string | undefined> = Object.fromEntries(
  ENV_KEYS.map((k) => [k, process.env[k]])
);

function captureWarns<T>(fn: () => T): { result: T; warnings: string[] } {
  const warnings: string[] = [];
  const orig = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  try {
    const result = fn();
    return { result, warnings };
  } finally {
    console.warn = orig;
  }
}

async function captureWarnsAsync<T>(
  fn: () => Promise<T>
): Promise<{ result: T; warnings: string[] }> {
  const warnings: string[] = [];
  const orig = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  try {
    const result = await fn();
    return { result, warnings };
  } finally {
    console.warn = orig;
  }
}

async function makeSessionCookie(secretValue: string): Promise<string> {
  const secret = new TextEncoder().encode(secretValue);
  const token = await new SignJWT({ authenticated: true, sub: "ff-21014-admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

async function putFeatureFlag(
  payload: { key: string; value?: string },
  cookie?: string
): Promise<{ status: number; body: Record<string, unknown> }> {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (cookie) headers.cookie = cookie;
  const res = await featureFlagsRoute.PUT(
    new Request("http://localhost/api/settings/feature-flags", {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    }) as never
  );
  const body = (await res.json()) as Record<string, unknown>;
  return { status: res.status, body };
}

after(() => {
  try {
    removeFeatureFlagOverride("REQUIRE_API_KEY");
    resetDbInstance();
    assert.equal(
      getExistingDbInstance(),
      null,
      "DB handle must be closed via resetDbInstance() before removing TEST_DATA_DIR"
    );
  } finally {
    for (const key of ENV_KEYS) {
      if (SAVED_ENV[key] === undefined) delete process.env[key];
      else process.env[key] = SAVED_ENV[key];
    }
    if (ORIG_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIG_DATA_DIR;
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

test("startup guard warns loudly when DB override disables env REQUIRE_API_KEY=true on non-loopback (#21014)", () => {
  process.env.REQUIRE_API_KEY = "true";
  setFeatureFlagOverride("REQUIRE_API_KEY", "false");
  try {
    const { warnings } = captureWarns(() =>
      warnIfNonLoopbackWithoutApiKey("Dashboard/API server", "0.0.0.0")
    );
    assert.ok(
      warnings.length >= 1,
      "non-loopback startup guard must warn when DB override=false overrides env REQUIRE_API_KEY=true"
    );
    assert.match(
      warnings.join("\n"),
      /DB|database|override/i,
      "warning must mention that a DB override disabled REQUIRE_API_KEY"
    );
  } finally {
    removeFeatureFlagOverride("REQUIRE_API_KEY");
  }
});

test("isRequireApiKeyEnabled emits a deduplicated [SECURITY] warning when DB override disables env REQUIRE_API_KEY=true (#21014)", () => {
  process.env.REQUIRE_API_KEY = "true";
  removeFeatureFlagOverride("REQUIRE_API_KEY");
  // Reset any prior warning state by observing the clean keyed state first.
  assert.equal(isRequireApiKeyEnabled(), true);

  setFeatureFlagOverride("REQUIRE_API_KEY", "false");
  try {
    const { warnings: firstWarns } = captureWarns(() => {
      assert.equal(isRequireApiKeyEnabled(), false);
    });
    assert.equal(
      firstWarns.length,
      1,
      "first resolution where DB override=false disables env REQUIRE_API_KEY=true must log a warning"
    );
    assert.match(firstWarns[0], /\[SECURITY\].*REQUIRE_API_KEY/);

    const { warnings: repeatWarns } = captureWarns(() => {
      assert.equal(isRequireApiKeyEnabled(), false);
    });
    assert.equal(
      repeatWarns.length,
      0,
      "subsequent hot-path checks must not spam duplicate warnings"
    );
  } finally {
    removeFeatureFlagOverride("REQUIRE_API_KEY");
  }
});

test("PUT /api/settings/feature-flags emits [SECURITY] log and securityWarning field when REQUIRE_API_KEY is disabled (#21014)", async () => {
  process.env.JWT_SECRET = "ff-21014-jwt-secret-for-put-route-test";
  process.env.API_KEY_SECRET = "ff-21014-api-key-secret";
  process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
  await updateSettings({ requireLogin: false, password: "hashed-placeholder" });
  removeFeatureFlagOverride("REQUIRE_API_KEY");
  const cookie = await makeSessionCookie(process.env.JWT_SECRET);

  try {
    // 1. Protected flag remains guarded against anonymous writes even when requireLogin=false
    process.env.REQUIRE_API_KEY = "true";
    const unauth = await putFeatureFlag({ key: "REQUIRE_API_KEY", value: "false" });
    assert.equal(unauth.status, 401, "anonymous PUT on REQUIRE_API_KEY must be rejected with 401");

    // 2. Disabling REQUIRE_API_KEY via DB override while REQUIRE_API_KEY=true in env
    const { result: overrideEnvOff, warnings: envOffWarns } = await captureWarnsAsync(() =>
      putFeatureFlag({ key: "REQUIRE_API_KEY", value: "false" }, cookie)
    );
    assert.equal(overrideEnvOff.status, 200);
    assert.equal(overrideEnvOff.body.key, "REQUIRE_API_KEY");
    assert.equal(overrideEnvOff.body.effectiveValue, "false");
    assert.equal(overrideEnvOff.body.source, "db");
    assert.equal(overrideEnvOff.body.previousValue, "true");
    assert.equal(overrideEnvOff.body.previousSource, "env");
    assert.match(
      String(overrideEnvOff.body.securityWarning ?? ""),
      /disabled via database override while REQUIRE_API_KEY=true is set in the environment/
    );
    assert.ok(
      envOffWarns.some((w) =>
        w.includes(
          "[SECURITY] REQUIRE_API_KEY was disabled via database override while REQUIRE_API_KEY=true is set in the environment"
        )
      ),
      "PUT route must log [SECURITY] warning when overriding env REQUIRE_API_KEY=true"
    );

    // 3. Re-enabling REQUIRE_API_KEY ("true") must NOT include securityWarning
    const { result: reEnable, warnings: reEnableWarns } = await captureWarnsAsync(() =>
      putFeatureFlag({ key: "REQUIRE_API_KEY", value: "true" }, cookie)
    );
    assert.equal(reEnable.status, 200);
    assert.equal(reEnable.body.effectiveValue, "true");
    assert.equal("securityWarning" in reEnable.body, false);
    assert.equal(
      reEnableWarns.filter((w) => w.includes("[SECURITY]")).length,
      0,
      "enabling REQUIRE_API_KEY must not log a disablement warning"
    );

    // 4. Clearing a DB-enabled override when env is unset/false drops effectiveValue true -> false and warns
    delete process.env.REQUIRE_API_KEY;
    const { result: clearedToOff, warnings: clearedWarns } = await captureWarnsAsync(() =>
      putFeatureFlag({ key: "REQUIRE_API_KEY" }, cookie)
    );
    assert.equal(clearedToOff.status, 200);
    assert.equal(clearedToOff.body.effectiveValue, "false");
    assert.equal(clearedToOff.body.source, "default");
    assert.equal(clearedToOff.body.previousValue, "true");
    assert.match(
      String(clearedToOff.body.securityWarning ?? ""),
      /REQUIRE_API_KEY is now disabled — \/v1\/\* inference endpoints accept unauthenticated requests/
    );
    assert.ok(
      clearedWarns.some((w) => w.includes("[SECURITY] REQUIRE_API_KEY is now disabled")),
      "clearing active DB override back to disabled default must log [SECURITY] warning"
    );
  } finally {
    removeFeatureFlagOverride("REQUIRE_API_KEY");
  }
});

test(".env.example, CONTRIBUTING.md, and docs/openapi.yaml match hardened INITIAL_PASSWORD, template MACHINE_ID_SALT, and securityWarning contracts (#21014)", () => {
  const envExample = fs.readFileSync(path.join(REPO_ROOT, ".env.example"), "utf8");
  const lines = envExample.split("\n");

  const initialPwdLine = lines.find((l) => l.startsWith("INITIAL_PASSWORD="));
  assert.equal(
    initialPwdLine,
    "INITIAL_PASSWORD=",
    ".env.example must ship INITIAL_PASSWORD= blank instead of literal CHANGEME"
  );
  assert.doesNotMatch(
    envExample,
    /^INITIAL_PASSWORD=CHANGEME\s*$/m,
    "literal INITIAL_PASSWORD=CHANGEME must not remain in .env.example"
  );

  const saltLine = lines.find((l) => l.startsWith("MACHINE_ID_SALT="));
  assert.equal(
    saltLine,
    "MACHINE_ID_SALT=endpoint-proxy-salt",
    ".env.example must keep MACHINE_ID_SALT=endpoint-proxy-salt so default syncEnv matches the template (#16763)"
  );

  const contributing = fs.readFileSync(path.join(REPO_ROOT, "CONTRIBUTING.md"), "utf8");
  const contributingInitialRow = contributing
    .split("\n")
    .find((l) => l.includes("`INITIAL_PASSWORD`"));
  assert.ok(contributingInitialRow, "CONTRIBUTING.md must document INITIAL_PASSWORD");
  assert.doesNotMatch(
    contributingInitialRow,
    /CHANGEME/,
    "CONTRIBUTING.md must not instruct setting INITIAL_PASSWORD to CHANGEME"
  );
  assert.match(
    contributingInitialRow,
    /unset|onboarding|bootstrap/i,
    "CONTRIBUTING.md INITIAL_PASSWORD row must describe the unset / onboarding wizard + bootstrap-token flow"
  );

  const openapi = fs.readFileSync(path.join(REPO_ROOT, "docs/openapi.yaml"), "utf8");
  const ffPathIdx = openapi.indexOf("  /api/settings/feature-flags:");
  assert.ok(ffPathIdx !== -1, "docs/openapi.yaml must document /api/settings/feature-flags");
  const ffSlice = openapi.slice(ffPathIdx, ffPathIdx + 1200);
  assert.match(
    ffSlice,
    /securityWarning/,
    "docs/openapi.yaml PUT /api/settings/feature-flags must document securityWarning"
  );
});

test("syncEnv against real .env.example leaves INITIAL_PASSWORD blank and preserves template MACHINE_ID_SALT (#21014)", () => {
  const tmpInstall = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-env-sync-real-"));
  try {
    fs.copyFileSync(path.join(REPO_ROOT, ".env.example"), path.join(tmpInstall, ".env.example"));
    syncEnv({ rootDir: tmpInstall, quiet: true });
    const generatedEnv = fs.readFileSync(path.join(tmpInstall, ".env"), "utf8");

    assert.match(generatedEnv, /^INITIAL_PASSWORD=$/m, "INITIAL_PASSWORD must stay empty on sync");
    assert.doesNotMatch(generatedEnv, /^INITIAL_PASSWORD=CHANGEME$/m);
    assert.match(
      generatedEnv,
      /^MACHINE_ID_SALT=endpoint-proxy-salt$/m,
      "syncEnv must preserve template MACHINE_ID_SALT=endpoint-proxy-salt so default installs stay quiet"
    );
  } finally {
    fs.rmSync(tmpInstall, { recursive: true, force: true });
  }
});
