import test from "node:test";
import assert from "node:assert/strict";

import {
  parseAndValidateAgyToken,
  detectLocalAgyTokenRaw,
  AgyAuthFileError,
} from "../../src/lib/oauth/utils/agyAuthImport.ts";

// Fixture token values are deliberately generic (not `ya29.`/`1//` shaped) so secret
// scanners don't flag them — the parser only cares that they are non-empty strings.
const ACCESS = "agy-access-token-fixture";
const REFRESH = "agy-refresh-token-fixture";

test("parses the nested agy token-file shape (token.* with ISO expiry, no id_token)", () => {
  const parsed = parseAndValidateAgyToken({
    token: {
      access_token: ACCESS,
      token_type: "Bearer",
      refresh_token: REFRESH,
      expiry: "2026-05-29T06:16:24.338-03:00",
    },
    auth_method: "consumer",
  });
  assert.equal(parsed.accessToken, ACCESS);
  assert.equal(parsed.refreshToken, REFRESH);
  assert.equal(parsed.tokenType, "Bearer");
  assert.equal(parsed.authMethod, "consumer");
  assert.equal(parsed.expiresAt, new Date("2026-05-29T06:16:24.338-03:00").toISOString());
});

test("accepts a flat fallback shape (access_token/refresh_token at top level)", () => {
  const parsed = parseAndValidateAgyToken({
    access_token: ACCESS,
    refresh_token: REFRESH,
  });
  assert.equal(parsed.accessToken, ACCESS);
  assert.equal(parsed.refreshToken, REFRESH);
  assert.equal(parsed.tokenType, "Bearer"); // default
  assert.equal(parsed.expiresAt, null);
});

test("supports unix-ms expiry_date as an alternative to ISO expiry", () => {
  const ms = 1780038984000;
  const parsed = parseAndValidateAgyToken({
    token: { access_token: ACCESS, refresh_token: REFRESH, expiry_date: ms },
  });
  assert.equal(parsed.expiresAt, new Date(ms).toISOString());
});

test("rejects a token file missing access_token", () => {
  assert.throws(
    () => parseAndValidateAgyToken({ token: { refresh_token: REFRESH } }),
    (err) =>
      err instanceof AgyAuthFileError && err.code === "missing_access_token" && err.status === 400
  );
});

test("rejects a token file missing refresh_token", () => {
  assert.throws(
    () => parseAndValidateAgyToken({ token: { access_token: ACCESS } }),
    (err) => err instanceof AgyAuthFileError && err.code === "missing_refresh_token"
  );
});

test("invalid/garbage expiry becomes null rather than throwing", () => {
  const parsed = parseAndValidateAgyToken({
    token: { access_token: ACCESS, refresh_token: REFRESH, expiry: "not-a-date" },
  });
  assert.equal(parsed.expiresAt, null);
});

test("detectLocalAgyTokenRaw honors AGY_TOKEN_FILE environment override", async () => {
  const fs = await import("fs/promises");
  const os = await import("os");
  const path = await import("path");
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "agy-test-"));
  const tmpFile = path.join(tmpDir, "token.json");
  await fs.writeFile(
    tmpFile,
    JSON.stringify({
      token: { access_token: ACCESS, refresh_token: REFRESH },
      id_token_email: "test@example.com",
    })
  );

  const prevEnv = process.env.AGY_TOKEN_FILE;
  try {
    process.env.AGY_TOKEN_FILE = tmpFile;
    const detected = await detectLocalAgyTokenRaw();
    assert.equal(detected.source, "env:AGY_TOKEN_FILE");
    const parsed = parseAndValidateAgyToken(detected.raw);
    assert.equal(parsed.accessToken, ACCESS);
    assert.equal(parsed.refreshToken, REFRESH);
  } finally {
    if (prevEnv === undefined) delete process.env.AGY_TOKEN_FILE;
    else process.env.AGY_TOKEN_FILE = prevEnv;
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
  assert.equal(process.env.AGY_TOKEN_FILE, prevEnv, "AGY_TOKEN_FILE must be restored as it was");
});

/**
 * Run `fn` with HOME / XDG_CONFIG_HOME / APPDATA pointed at a fresh temp dir and
 * AGY_TOKEN_FILE unset, so detection never sees the developer's real login.
 */
async function withIsolatedHome(fn: (home: string) => Promise<void>) {
  const fs = await import("fs/promises");
  const os = await import("os");
  const path = await import("path");
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "agy-home-"));
  const keys = ["HOME", "USERPROFILE", "XDG_CONFIG_HOME", "APPDATA", "AGY_TOKEN_FILE"] as const;
  const saved = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
  process.env.HOME = home;
  process.env.USERPROFILE = home;
  process.env.XDG_CONFIG_HOME = path.join(home, ".config");
  process.env.APPDATA = path.join(home, "AppData", "Roaming");
  delete process.env.AGY_TOKEN_FILE;
  try {
    await fn(home);
  } finally {
    for (const k of keys) {
      if (saved[k] === undefined) delete process.env[k];
      else process.env[k] = saved[k];
    }
    await fs.rm(home, { recursive: true, force: true });
  }
}

test("detectLocalAgyTokenRaw throws a 404 no_local_login when nothing is stored locally", async () => {
  await withIsolatedHome(async () => {
    await assert.rejects(detectLocalAgyTokenRaw(), (error: unknown) => {
      assert.ok(error instanceof AgyAuthFileError);
      assert.equal(error.status, 404);
      assert.equal(error.code, "no_local_login");
      return true;
    });
  });
});

test("detectLocalAgyTokenRaw reads the default CLI token file under HOME", async () => {
  const fs = await import("fs/promises");
  const path = await import("path");
  await withIsolatedHome(async (home) => {
    const dir = path.join(home, ".gemini", "antigravity-cli");
    await fs.mkdir(dir, { recursive: true });
    const file = path.join(dir, "antigravity-oauth-token");
    await fs.writeFile(
      file,
      JSON.stringify({ token: { access_token: ACCESS, refresh_token: REFRESH } })
    );
    const detected = await detectLocalAgyTokenRaw();
    assert.equal(detected.source, file);
    assert.equal(parseAndValidateAgyToken(detected.raw).refreshToken, REFRESH);
  });
});

test("detectLocalAgyTokenRaw never turns an IDE state.vscdb apiKey into a refresh token", async () => {
  const fs = await import("fs/promises");
  const path = await import("path");
  const Database = (await import("better-sqlite3")).default;
  await withIsolatedHome(async (home) => {
    const dbDirs = [
      path.join(home, ".config", "Antigravity", "User", "globalStorage"),
      path.join(home, "Library", "Application Support", "Antigravity", "User", "globalStorage"),
      path.join(home, "AppData", "Roaming", "Antigravity", "User", "globalStorage"),
    ];
    for (const dir of dbDirs) {
      await fs.mkdir(dir, { recursive: true });
      const db = new Database(path.join(dir, "state.vscdb"));
      db.exec("CREATE TABLE ItemTable (key TEXT PRIMARY KEY, value TEXT)");
      db.prepare("INSERT INTO ItemTable VALUES (?, ?)").run(
        "antigravityAuthStatus",
        JSON.stringify({ apiKey: "ide-api-key-fixture", email: "ide@example.com" })
      );
      db.close();
    }
    // The IDE payload shape is unverified: an apiKey must not be imported as both the
    // access and the refresh token, so detection still reports no local login.
    await assert.rejects(detectLocalAgyTokenRaw(), (error: unknown) => {
      assert.ok(error instanceof AgyAuthFileError);
      assert.equal(error.code, "no_local_login");
      return true;
    });
  });
});
