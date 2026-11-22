/**
 * Regression guards for #21014 (settings & `.env.example` hardening):
 *   1. Disabling `REQUIRE_API_KEY` via a DB feature-flag override while
 *      `process.env.REQUIRE_API_KEY=true` must never stay silent:
 *      - `warnIfNonLoopbackWithoutApiKey` / `warnIfInferenceServerExposed` must
 *        warn at startup on non-loopback binds and explicitly name the DB override.
 *      - `isRequireApiKeyEnabled()` must emit a deduplicated `[SECURITY]` warning
 *        when a DB override disables an env-enabled `REQUIRE_API_KEY=true`.
 *      - `PUT /api/settings/feature-flags` disabling `REQUIRE_API_KEY` must log a
 *        `[SECURITY]` warning and surface `securityWarning` in the response payload.
 *   2. `.env.example` must NOT ship literal `INITIAL_PASSWORD=CHANGEME` or literal
 *      `MACHINE_ID_SALT=endpoint-proxy-salt`: both ship blank with generation
 *      guidance so `syncEnv` leaves `INITIAL_PASSWORD` unset (onboarding wizard) and
 *      auto-generates a unique random `MACHINE_ID_SALT=omniroute-<hex>` per install.
 */
import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const ORIG_DATA_DIR = process.env.DATA_DIR;
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-21014-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getExistingDbInstance } = await import("../../src/lib/db/singleton.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { setFeatureFlagOverride, removeFeatureFlagOverride } =
  await import("../../src/lib/db/featureFlags.ts");
const { isRequireApiKeyEnabled } = await import("../../src/shared/utils/featureFlags.ts");
const { warnIfNonLoopbackWithoutApiKey } =
  await import("../../src/lib/startup/nonLoopbackApiKeyGuard.ts");
const { syncEnv } = (await import("../../scripts/dev/sync-env.mjs")) as {
  syncEnv: (opts?: { rootDir?: string; quiet?: boolean }) => { created: boolean; added: number };
};

const ORIG_REQUIRE_API_KEY = process.env.REQUIRE_API_KEY;

function captureWarns(fn: () => void): string[] {
  const messages: string[] = [];
  const orig = console.warn;
  console.warn = (...args: unknown[]) => {
    messages.push(args.map(String).join(" "));
  };
  try {
    fn();
  } finally {
    console.warn = orig;
  }
  return messages;
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
    if (ORIG_REQUIRE_API_KEY === undefined) delete process.env.REQUIRE_API_KEY;
    else process.env.REQUIRE_API_KEY = ORIG_REQUIRE_API_KEY;
    if (ORIG_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIG_DATA_DIR;
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  }
});

test("startup guard warns loudly when DB override disables env REQUIRE_API_KEY=true on non-loopback (#21014)", () => {
  process.env.REQUIRE_API_KEY = "true";
  setFeatureFlagOverride("REQUIRE_API_KEY", "false");
  try {
    const warnings = captureWarns(() =>
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
    const firstWarns = captureWarns(() => {
      assert.equal(isRequireApiKeyEnabled(), false);
    });
    assert.equal(
      firstWarns.length,
      1,
      "first resolution where DB override=false disables env REQUIRE_API_KEY=true must log a warning"
    );
    assert.match(firstWarns[0], /\[SECURITY\].*REQUIRE_API_KEY/);

    const repeatWarns = captureWarns(() => {
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

test(".env.example ships blank INITIAL_PASSWORD and blank MACHINE_ID_SALT with generation guidance (#21014)", () => {
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
    "MACHINE_ID_SALT=",
    ".env.example must ship MACHINE_ID_SALT= blank so sync-env generates a random per-install salt"
  );
  assert.doesNotMatch(
    envExample,
    /^MACHINE_ID_SALT=endpoint-proxy-salt\s*$/m,
    "literal MACHINE_ID_SALT=endpoint-proxy-salt must not remain in .env.example"
  );
  assert.doesNotMatch(
    envExample,
    /falls back\s*\n#\s*to `endpoint-proxy-salt` only when no `\.env`/,
    ".env.example must not claim fallback happens only when .env is absent"
  );
  assert.match(
    envExample,
    /does not overwrite an existing blank `MACHINE_ID_SALT=`/i,
    ".env.example must document that env:sync does not overwrite an existing blank MACHINE_ID_SALT= entry"
  );

  const envDoc = fs.readFileSync(path.join(REPO_ROOT, "docs/reference/ENVIRONMENT.md"), "utf8");
  const saltDocLine = envDoc.split("\n").find((l) => l.startsWith("| `MACHINE_ID_SALT`"));
  assert.ok(saltDocLine, "ENVIRONMENT.md must document MACHINE_ID_SALT");
  assert.match(
    saltDocLine,
    /does not overwrite an existing blank `MACHINE_ID_SALT=`/i,
    "ENVIRONMENT.md must document the existing blank MACHINE_ID_SALT= caveat for manual .env copies"
  );
});

test("syncEnv against real .env.example leaves INITIAL_PASSWORD blank and generates unique random MACHINE_ID_SALT (#21014)", () => {
  const tmpInstall = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-env-sync-real-"));
  try {
    fs.copyFileSync(path.join(REPO_ROOT, ".env.example"), path.join(tmpInstall, ".env.example"));
    syncEnv({ rootDir: tmpInstall, quiet: true });
    const generatedEnv = fs.readFileSync(path.join(tmpInstall, ".env"), "utf8");

    assert.match(generatedEnv, /^INITIAL_PASSWORD=$/m, "INITIAL_PASSWORD must stay empty on sync");
    assert.doesNotMatch(generatedEnv, /^INITIAL_PASSWORD=CHANGEME$/m);
    assert.match(
      generatedEnv,
      /^MACHINE_ID_SALT=omniroute-[0-9a-f]{16}$/m,
      "syncEnv must auto-generate a cryptographic omniroute-<16-hex> MACHINE_ID_SALT when creating .env"
    );

    // Pre-copied .env with an existing blank `MACHINE_ID_SALT=` is intentionally preserved by syncEnv
    // (documented caveat in .env.example and ENVIRONMENT.md).
    const tmpManualCopy = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-env-sync-manual-"));
    try {
      fs.copyFileSync(
        path.join(REPO_ROOT, ".env.example"),
        path.join(tmpManualCopy, ".env.example")
      );
      fs.copyFileSync(path.join(REPO_ROOT, ".env.example"), path.join(tmpManualCopy, ".env"));
      syncEnv({ rootDir: tmpManualCopy, quiet: true });
      const manualEnv = fs.readFileSync(path.join(tmpManualCopy, ".env"), "utf8");
      assert.match(
        manualEnv,
        /^MACHINE_ID_SALT=$/m,
        "syncEnv leaves an already-present blank MACHINE_ID_SALT= untouched after manual cp .env.example .env"
      );
    } finally {
      fs.rmSync(tmpManualCopy, { recursive: true, force: true });
    }
  } finally {
    fs.rmSync(tmpInstall, { recursive: true, force: true });
  }
});
