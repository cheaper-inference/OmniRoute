import test from "node:test";
import assert from "node:assert/strict";

import {
  parseAndValidateAgyToken,
  detectLocalAgyTokenRaw,
  getAntigravityIdeDbCandidates,
  readAntigravityAuthStatusFromDb,
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
      err instanceof AgyAuthFileError &&
      err.code === "missing_access_token" &&
      err.status === 400
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
    process.env.AGY_TOKEN_FILE = prevEnv;
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test("getAntigravityIdeDbCandidates returns cross-platform paths", () => {
  const darwinPaths = getAntigravityIdeDbCandidates("darwin", {}, "/Users/testuser");
  assert.equal(darwinPaths.length, 2);
  assert.ok(
    darwinPaths[0].includes("Library/Application Support/Antigravity/User/globalStorage/state.vscdb")
  );
  assert.ok(
    darwinPaths[1].includes("Library/Application Support/Antigravity IDE/User/globalStorage/state.vscdb")
  );

  const winPaths = getAntigravityIdeDbCandidates(
    "win32",
    { APPDATA: "C:\\Users\\testuser\\AppData\\Roaming" },
    "C:\\Users\\testuser"
  );
  assert.equal(winPaths.length, 2);
  assert.ok(winPaths[0].includes("AppData\\Roaming\\Antigravity\\User\\globalStorage\\state.vscdb"));

  const linuxPaths = getAntigravityIdeDbCandidates("linux", {}, "/home/testuser");
  assert.equal(linuxPaths.length, 2);
  assert.ok(linuxPaths[0].includes(".config/Antigravity/User/globalStorage/state.vscdb"));
  assert.ok(linuxPaths[1].includes(".config/Antigravity IDE/User/globalStorage/state.vscdb"));
});

test("readAntigravityAuthStatusFromDb extracts auth status from SQLite DB", async () => {
  const fs = await import("fs/promises");
  const os = await import("os");
  const path = await import("path");
  const Database = (await import("better-sqlite3")).default;

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "agy-db-test-"));
  const dbPath = path.join(tmpDir, "state.vscdb");
  const db = new Database(dbPath);
  db.exec("CREATE TABLE ItemTable (key TEXT PRIMARY KEY, value TEXT)");
  db.prepare("INSERT INTO ItemTable VALUES (?, ?)").run(
    "antigravityAuthStatus",
    JSON.stringify({ apiKey: "db-secret-key-123", email: "ide@example.com" })
  );
  db.close();

  try {
    const rawStatus = await readAntigravityAuthStatusFromDb(dbPath);
    assert.ok(rawStatus);
    const parsed = JSON.parse(rawStatus);
    assert.equal(parsed.apiKey, "db-secret-key-123");
    assert.equal(parsed.email, "ide@example.com");
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});

test("readAntigravityAuthStatusFromDb returns null on missing DB or missing key", async () => {
  const fs = await import("fs/promises");
  const os = await import("os");
  const path = await import("path");
  const Database = (await import("better-sqlite3")).default;

  const nonExistent = await readAntigravityAuthStatusFromDb("/no/such/state.vscdb");
  assert.equal(nonExistent, null);

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "agy-db-empty-"));
  const dbPath = path.join(tmpDir, "state.vscdb");
  const db = new Database(dbPath);
  db.exec("CREATE TABLE ItemTable (key TEXT PRIMARY KEY, value TEXT)");
  db.close();

  try {
    const missingKey = await readAntigravityAuthStatusFromDb(dbPath);
    assert.equal(missingKey, null);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
});
