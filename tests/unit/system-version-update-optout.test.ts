/**
 * `OMNIROUTE_NO_UPDATE_NOTIFIER` opts the operator out of update checks. It used to silence
 * only the CLI notice (`bin/omniroute.mjs`): `GET /api/system/version` still asked npm (CLI,
 * registry, GitHub) and the dashboard kept showing "Update available". With the variable set,
 * the route must make no outbound lookup at all and report `updateAvailable: false`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-update-optout-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const versionCheck = await import("../../src/lib/system/versionCheck.ts");
const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { APP_CONFIG } = await import("../../src/shared/constants/appConfig.ts");

const ENV_KEY = "OMNIROUTE_NO_UPDATE_NOTIFIER";
const originalFetch = globalThis.fetch;
const originalPath = process.env.PATH;
const originalOptOut = process.env[ENV_KEY];

// A fake `npm` first on PATH records every spawn, so the npm-CLI lookup path is observable
// (and can never reach the real registry from this test).
const fakeBin = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-update-optout-bin-"));
const npmMarker = path.join(fakeBin, "npm-was-called");
fs.writeFileSync(path.join(fakeBin, "npm"), `#!/bin/sh\necho "$@" >> "${npmMarker}"\nexit 1\n`, {
  mode: 0o755,
});

let fetchCalls: string[] = [];

// Importing the route boots in-process helpers that may ping this server on loopback (e.g. the
// provider readiness probe); only calls leaving the machine count as update-check egress.
function externalFetchCalls(): string[] {
  return fetchCalls.filter((url) => {
    const host = new URL(url).hostname;
    return host !== "127.0.0.1" && host !== "localhost" && host !== "::1" && host !== "[::1]";
  });
}

function restoreOptOut() {
  if (originalOptOut === undefined) delete process.env[ENV_KEY];
  else process.env[ENV_KEY] = originalOptOut;
}

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false, setupComplete: true });
  process.env.PATH = `${fakeBin}${path.delimiter}${originalPath}`;
});

test.beforeEach(() => {
  versionCheck.clearLatestVersionCache();
  fs.rmSync(npmMarker, { force: true });
  fetchCalls = [];
  globalThis.fetch = (async (url: string | URL | Request) => {
    fetchCalls.push(String(url instanceof Request ? url.url : url));
    return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
});

test.afterEach(() => restoreOptOut());

test.after(() => {
  globalThis.fetch = originalFetch;
  process.env.PATH = originalPath;
  restoreOptOut();
  versionCheck.clearLatestVersionCache();
  core.resetDbInstance();
  fs.rmSync(fakeBin, { recursive: true, force: true });
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function getVersionBody() {
  const { GET } = await import("../../src/app/api/system/version/route.ts");
  const { NextRequest } = await import("next/server");
  const res = await GET(new NextRequest("http://localhost:20128/api/system/version"));
  assert.equal(res.status, 200);
  return (await res.json()) as Record<string, unknown>;
}

function newerThanCurrent(): string {
  const major = Number(String(APP_CONFIG.version).split(".")[0]);
  return `${major + 1}.0.0`;
}

test("isUpdateCheckDisabled follows the CLI semantics: any non-empty value opts out", () => {
  assert.equal(versionCheck.isUpdateCheckDisabled({}), false);
  assert.equal(versionCheck.isUpdateCheckDisabled({ [ENV_KEY]: "" }), false);
  assert.equal(versionCheck.isUpdateCheckDisabled({ [ENV_KEY]: "1" }), true);
  assert.equal(versionCheck.isUpdateCheckDisabled({ [ENV_KEY]: "true" }), true);
  // Same as `bin/omniroute.mjs`: the variable is a presence flag, so "0" also opts out.
  assert.equal(versionCheck.isUpdateCheckDisabled({ [ENV_KEY]: "0" }), true);
});

test("GET /api/system/version makes no outbound lookup when the operator opted out", async () => {
  process.env[ENV_KEY] = "1";

  const body = await getVersionBody();

  assert.deepEqual(externalFetchCalls(), [], "no fetch (npm registry, GitHub, news feed) may run");
  assert.equal(fs.existsSync(npmMarker), false, "the npm CLI must not be spawned");
  assert.equal(body.current, APP_CONFIG.version);
  assert.equal(body.latest, "unavailable");
  assert.equal(body.updateAvailable, false);
  assert.equal(body.updateCheckDisabled, true);
  assert.equal(body.news, null);
  // The rest of the existing shape stays in place for the dashboard.
  assert.ok(["npm", "source", "docker-compose"].includes(String(body.channel)));
  for (const key of ["autoUpdateSupported", "autoUpdateError", "releaseChannel", "channels"]) {
    assert.ok(key in body, `existing field ${key} must remain`);
  }
  assert.deepEqual(body.channels, { latest: "unavailable" });
});

test("GET /api/system/version hides the banner even when a newer version is already cached", async () => {
  await versionCheck.resolveLatestVersionCached({ lookup: async () => newerThanCurrent() });
  process.env[ENV_KEY] = "1";

  const body = await getVersionBody();

  assert.equal(body.updateAvailable, false);
  assert.equal(body.latest, "unavailable");
  assert.deepEqual(externalFetchCalls(), []);
});

test("GET /api/system/version still reports a newer release when the opt-out is unset", async () => {
  delete process.env[ENV_KEY];
  const newer = newerThanCurrent();
  await versionCheck.resolveLatestVersionCached({ lookup: async () => newer });
  await versionCheck.resolveDistTagsCached({ lookup: async () => ({ latest: newer }) });

  const body = await getVersionBody();

  assert.equal(body.latest, newer);
  assert.equal(body.updateAvailable, true);
  assert.equal(body.updateCheckDisabled, false);
});
