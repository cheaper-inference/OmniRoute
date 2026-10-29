// Credential exports hand the caller every stored secret: GET /api/settings/export-json
// returns decrypted provider connections plus raw API keys, and the two backup downloads
// (/api/db-backups/export, /api/db-backups/exportAll) ship the whole SQLite database. They
// must be reachable only by the instance operator:
//   - a signed-in dashboard session, or the machine-bound local CLI subject → allowed;
//   - an API key of any scope (manage / admin) or an `oma_` access token → 403;
//   - no credential → 401;
//   - login disabled (open instance) → allowed, same as every operator-only surface.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-credential-export-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "credential-export-api-key-secret";
process.env.JWT_SECRET = "credential-export-jwt-secret";
process.env.INITIAL_PASSWORD = "credential-export-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const accessTokensDb = await import("../../src/lib/db/accessTokens.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const exportJsonRoute = await import("../../src/app/api/settings/export-json/route.ts");
const dbExportRoute = await import("../../src/app/api/db-backups/export/route.ts");
const dbExportAllRoute = await import("../../src/app/api/db-backups/exportAll/route.ts");

await updateSettings({ requireLogin: true });
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-export", ["manage"]);
const adminScopedKey = await apiKeysDb.createApiKey("admin-automation", "machine-export", [
  "admin",
]);
const adminAccessToken = accessTokensDb.createAccessToken({ name: "remote-cli", scope: "admin" });

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

type ExportRoute = { GET: (request: Request) => Promise<Response> };

const ENDPOINTS: Array<{ name: string; url: string; route: ExportRoute }> = [
  {
    name: "GET /api/settings/export-json",
    url: "http://localhost:20128/api/settings/export-json",
    route: exportJsonRoute as unknown as ExportRoute,
  },
  {
    name: "GET /api/db-backups/export",
    url: "http://localhost:20128/api/db-backups/export",
    route: dbExportRoute as unknown as ExportRoute,
  },
  {
    name: "GET /api/db-backups/exportAll",
    url: "http://localhost:20128/api/db-backups/exportAll",
    route: dbExportAllRoute as unknown as ExportRoute,
  },
];

function requestWith(url: string, headers: Record<string, string> = {}): Request {
  return new Request(url, { method: "GET", headers });
}

async function drain(response: Response): Promise<void> {
  // The backup downloads stream a temp file; consume the body so the temp dir is cleaned up.
  await response.arrayBuffer().catch(() => undefined);
}

for (const { name, url, route } of ENDPOINTS) {
  test(`${name}: a manage-scoped API key is refused with 403`, async () => {
    const response = await route.GET(
      requestWith(url, { authorization: `Bearer ${manageKey.key}` })
    );
    const body = await response.json();
    assert.equal(response.status, 403);
    assert.match(JSON.stringify(body), /dashboard session/i);
    assert.ok(!JSON.stringify(body).includes(manageKey.key), "403 body must not echo the key");
  });

  test(`${name}: an admin-scoped API key is refused with 403`, async () => {
    const response = await route.GET(
      requestWith(url, { authorization: `Bearer ${adminScopedKey.key}` })
    );
    await drain(response);
    assert.equal(response.status, 403);
  });

  test(`${name}: an admin oma_ access token is refused with 403`, async () => {
    const response = await route.GET(
      requestWith(url, { authorization: `Bearer ${adminAccessToken.secret}` })
    );
    await drain(response);
    assert.equal(response.status, 403);
  });

  test(`${name}: a dashboard session can still export`, async () => {
    const response = await route.GET(await makeManagementSessionRequest(url));
    await drain(response);
    assert.equal(response.status, 200);
  });

  test(`${name}: a dashboard session wins over a manage key sent alongside it`, async () => {
    const response = await route.GET(
      await makeManagementSessionRequest(url, { token: manageKey.key })
    );
    await drain(response);
    assert.equal(response.status, 200);
  });

  test(`${name}: the pipeline-stamped local CLI subject can export`, async () => {
    const response = await route.GET(
      requestWith(url, {
        "x-omniroute-auth-kind": "management_key",
        "x-omniroute-auth-label": "local-cli-token",
      })
    );
    await drain(response);
    assert.equal(response.status, 200);
  });

  test(`${name}: unauthenticated callers get 401`, async () => {
    const response = await route.GET(requestWith(url));
    const body = await response.json();
    assert.equal(response.status, 401);
    assert.ok(!JSON.stringify(body).includes("at /"), "401 body must not leak a stack trace");
  });

  test(`${name}: with login disabled the instance is open and export works`, async () => {
    await updateSettings({ requireLogin: false });
    try {
      const response = await route.GET(requestWith(url));
      await drain(response);
      assert.equal(response.status, 200);
    } finally {
      await updateSettings({ requireLogin: true });
    }
  });
}
