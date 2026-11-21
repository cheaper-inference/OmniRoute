// CodeQL js/path-injection #1371 (src/lib/localCorpus/index.ts) and #1372/#1373
// (src/lib/obsidianSync.ts): the caller-chosen directory behind
//   - POST /api/settings/local-corpus      (`rootPath`, indexed and served by the MCP search tools)
//   - POST /api/settings/obsidian/webdav   (`vaultPath`, root of a read/write WebDAV service)
// is a host-filesystem root. Choosing it is an operator action:
//   - a machine credential (a manage-scoped API key) gets 403, on both routes;
//   - an operator (dashboard session) still sets an ordinary folder such as ~/Documents/vault;
//   - the filesystem root, the home directory itself and system directories (/etc, ...) are
//     refused with a fixed 400 message that never echoes the requested path.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-path-roots-data-"));
const FAKE_HOME = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-path-roots-home-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  HOME: process.env.HOME,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  OMNIROUTE_DISABLE_REDIS_AUTH_CACHE: process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE,
};

process.env.DATA_DIR = TEST_DATA_DIR;
// os.homedir() follows $HOME on POSIX: the "home directory itself" case and the ordinary
// ~/Documents/vault folder both live in a throwaway directory, never in the real home.
process.env.HOME = FAKE_HOME;
process.env.API_KEY_SECRET = "path-roots-api-key-secret";
process.env.JWT_SECRET = "path-roots-jwt-secret";
process.env.OMNIROUTE_DISABLE_REDIS_AUTH_CACHE = "1";
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const localCorpusDb = await import("../../src/lib/db/localCorpus.ts");
const obsidianDb = await import("../../src/lib/db/obsidian.ts");
const managementPassword = await import("../../src/lib/auth/managementPassword.ts");
const localCorpusRoute = await import("../../src/app/api/settings/local-corpus/route.ts");
const webdavRoute = await import("../../src/app/api/settings/obsidian/webdav/route.ts");

const LOCAL_CORPUS_URL = "http://localhost:20128/api/settings/local-corpus";
const WEBDAV_URL = "http://localhost:20128/api/settings/obsidian/webdav";
const DENIED_ROOT_MESSAGE =
  "This directory cannot be used as a root: choose a dedicated folder, not the filesystem root, the home directory itself or a system directory";

const ORDINARY_VAULT = path.join(FAKE_HOME, "Documents", "vault");
fs.mkdirSync(ORDINARY_VAULT, { recursive: true });

await settingsDb.updateSettings({
  requireLogin: true,
  setupComplete: true,
  password: await managementPassword.hashManagementPassword("path-roots-operator-secret"),
});
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-paths", ["manage"]);

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(FAKE_HOME, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test.beforeEach(() => {
  localCorpusDb.clearLocalCorpusRoot();
  obsidianDb.clearObsidianVaultPath();
  obsidianDb.clearWebdavEnabled();
});

function keyRequest(url: string, body: Record<string, unknown>): Request {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${manageKey.key}` },
    body: JSON.stringify(body),
  });
}

async function sessionRequest(url: string, body: Record<string, unknown>): Promise<Request> {
  return makeManagementSessionRequest(url, { method: "POST", body });
}

type RouteHandler = (request: never) => Promise<Response>;

function post(handler: RouteHandler, request: Request): Promise<Response> {
  return (handler as (request: Request) => Promise<Response>)(request);
}

/**
 * Error text of either body shape: `{ error: "..." }` (local corpus, which renders the thrown
 * Error as "Error: <message>") or `{ error: { message } }` (WebDAV, buildErrorBody).
 */
async function errorText(response: Response): Promise<string> {
  const body = (await response.json()) as { error?: unknown };
  if (typeof body.error === "string") return body.error.replace(/^Error: /, "");
  const nested = body.error as { message?: unknown } | undefined;
  return typeof nested?.message === "string" ? nested.message : JSON.stringify(body);
}

// ─── (a) a manage-scoped API key cannot choose the root ────────────────────────────────

test("a manage-scoped API key cannot set the local corpus root (403)", async () => {
  const response = await post(
    localCorpusRoute.POST,
    keyRequest(LOCAL_CORPUS_URL, { rootPath: ORDINARY_VAULT })
  );
  assert.equal(response.status, 403, await response.clone().text());
  assert.equal(localCorpusDb.getLocalCorpusRoot(), null, "root must not be stored");
});

test("a manage-scoped API key cannot set the WebDAV vault path (403)", async () => {
  const response = await post(
    webdavRoute.POST,
    keyRequest(WEBDAV_URL, { vaultPath: ORDINARY_VAULT })
  );
  assert.equal(response.status, 403, await response.clone().text());
  assert.equal(obsidianDb.getWebdavEnabled(), false, "WebDAV must stay disabled");
  assert.equal(obsidianDb.getObsidianVaultPath(), null, "vault path must not be stored");
});

test("with login disabled, a manage-scoped API key still cannot set the WebDAV vault path (403)", async () => {
  // /api/settings/obsidian is ALWAYS_PROTECTED: an open instance does not turn a machine
  // credential into the operator for this credential-issuing surface.
  await settingsDb.updateSettings({ requireLogin: false });
  try {
    const response = await post(
      webdavRoute.POST,
      keyRequest(WEBDAV_URL, { vaultPath: ORDINARY_VAULT })
    );
    assert.equal(response.status, 403, await response.clone().text());
    assert.equal(obsidianDb.getWebdavEnabled(), false);
  } finally {
    await settingsDb.updateSettings({ requireLogin: true });
  }
});

// ─── (b) the dashboard session keeps working with an ordinary folder ───────────────────

test("a dashboard session sets an ordinary folder (~/Documents/vault) as the local corpus root", async () => {
  const response = await post(
    localCorpusRoute.POST,
    await sessionRequest(LOCAL_CORPUS_URL, { rootPath: ORDINARY_VAULT })
  );
  assert.equal(response.status, 200, await response.clone().text());
  const body = (await response.json()) as { rootPath?: string };
  assert.equal(body.rootPath, fs.realpathSync(ORDINARY_VAULT));
  assert.equal(localCorpusDb.getLocalCorpusRoot(), fs.realpathSync(ORDINARY_VAULT));
});

test("a dashboard session sets an ordinary folder (~/Documents/vault) as the WebDAV vault", async () => {
  const response = await post(
    webdavRoute.POST,
    await sessionRequest(WEBDAV_URL, { vaultPath: ORDINARY_VAULT })
  );
  assert.equal(response.status, 200, await response.clone().text());
  const body = (await response.json()) as Record<string, unknown>;
  assert.equal(body.vaultPath, path.resolve(ORDINARY_VAULT));
  assert.ok(typeof body.password === "string" && body.password.length > 0);
  assert.equal(obsidianDb.getWebdavEnabled(), true);
});

// ─── (c) dangerous roots are refused with a fixed message ──────────────────────────────

const DENIED_ROOTS: Array<{ label: string; value: () => string }> = [
  { label: "the filesystem root", value: () => path.parse(process.cwd()).root },
  { label: "the home directory itself", value: () => FAKE_HOME },
  { label: "/etc", value: () => "/etc" },
];

for (const denied of DENIED_ROOTS) {
  test(`local corpus refuses ${denied.label} with a fixed 400`, async () => {
    const response = await post(
      localCorpusRoute.POST,
      await sessionRequest(LOCAL_CORPUS_URL, { rootPath: denied.value() })
    );
    assert.equal(response.status, 400);
    assert.equal(await errorText(response), DENIED_ROOT_MESSAGE);
    assert.equal(localCorpusDb.getLocalCorpusRoot(), null, "root must not be stored");
  });

  test(`WebDAV vault refuses ${denied.label} with a fixed 400`, async () => {
    const response = await post(
      webdavRoute.POST,
      await sessionRequest(WEBDAV_URL, { vaultPath: denied.value() })
    );
    assert.equal(response.status, 400);
    assert.equal(await errorText(response), DENIED_ROOT_MESSAGE);
    assert.equal(obsidianDb.getWebdavEnabled(), false, "WebDAV must stay disabled");
    assert.equal(obsidianDb.getObsidianVaultPath(), null, "vault path must not be stored");
  });
}

test("a symlink inside the home directory that resolves to /etc is refused on both routes", async () => {
  const link = path.join(FAKE_HOME, "etc-link");
  try {
    fs.symlinkSync("/etc", link, "dir");
  } catch {
    return; // platform without symlink permission — nothing to assert
  }
  try {
    const corpus = await post(
      localCorpusRoute.POST,
      await sessionRequest(LOCAL_CORPUS_URL, { rootPath: link })
    );
    assert.equal(corpus.status, 400);
    assert.equal(await errorText(corpus), DENIED_ROOT_MESSAGE);

    const vault = await post(
      webdavRoute.POST,
      await sessionRequest(WEBDAV_URL, { vaultPath: link })
    );
    assert.equal(vault.status, 400);
    assert.equal(await errorText(vault), DENIED_ROOT_MESSAGE);
  } finally {
    fs.rmSync(link, { force: true });
  }
});

// ─── helper: which directories are denied ──────────────────────────────────────────────

test("isDeniedRootDirectory: system directories and their children, root and home itself", async () => {
  const { isDeniedRootDirectory } = await import("../../src/lib/deniedRootDirectories.ts");
  for (const denied of ["/", FAKE_HOME, `${FAKE_HOME}/`, "/etc", "/etc/ssh", "/usr/local/bin"]) {
    assert.equal(isDeniedRootDirectory(denied), true, denied);
  }
  for (const allowed of [ORDINARY_VAULT, path.join(FAKE_HOME, "Documents"), TEST_DATA_DIR]) {
    assert.equal(isDeniedRootDirectory(allowed), false, allowed);
  }
});
