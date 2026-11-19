// POST /api/v1/issues/report files a GitHub issue with the operator's GITHUB_ISSUES_TOKEN, so it
// takes the management credential the registered-keys and limits routes take:
//   - no credential → 401, also while no password is configured yet;
//   - an API key WITHOUT manage/admin scope (none / read / write) → 403;
//   - a manage- or admin-scoped API key or a dashboard session → allowed (202 without GitHub
//     config, response shape unchanged);
//   - login disabled (open instance) → allowed, unchanged.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(process.env.DATA_DIR || os.tmpdir(), "omniroute-issues-report-auth-")
);
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
  GITHUB_ISSUES_REPO: process.env.GITHUB_ISSUES_REPO,
  GITHUB_ISSUES_TOKEN: process.env.GITHUB_ISSUES_TOKEN,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "issues-report-auth-api-key-secret";
process.env.JWT_SECRET = "issues-report-auth-jwt-secret";
process.env.INITIAL_PASSWORD = "issues-report-auth-password";
// No GitHub config: an allowed call is logged and answered 202, nothing leaves the process.
delete process.env.GITHUB_ISSUES_REPO;
delete process.env.GITHUB_ISSUES_TOKEN;

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const reportRoute = await import("../../src/app/api/v1/issues/report/route.ts");

await updateSettings({ requireLogin: true });
const inferenceKey = await apiKeysDb.createApiKey("inference-client", "machine-report", []);
const readKey = await apiKeysDb.createApiKey("read-automation", "machine-report", ["read"]);
const writeKey = await apiKeysDb.createApiKey("write-automation", "machine-report", ["write"]);
const manageKey = await apiKeysDb.createApiKey("manage-automation", "machine-report", ["manage"]);
const adminKey = await apiKeysDb.createApiKey("admin-automation", "machine-report", ["admin"]);

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

const REPORT_URL = "http://localhost:20128/api/v1/issues/report";
const REPORT_BODY = { title: "Key issuance refused", provider: "openai", errorCode: "QUOTA" };

function bearer(key: string): Record<string, string> {
  return { authorization: `Bearer ${key}` };
}

function report(headers: Record<string, string> = {}, body: unknown = REPORT_BODY): Request {
  return new Request(REPORT_URL, {
    method: "POST",
    headers: { ...headers, "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

async function assertRefused(
  request: Request,
  expectedStatus: 401 | 403,
  secret?: string
): Promise<void> {
  const response = await reportRoute.POST(request);
  const body = (await response.json()) as {
    error?: { message?: string; type?: string };
    requestId?: string;
  };
  const serialized = JSON.stringify(body);

  assert.equal(response.status, expectedStatus, serialized);
  assert.equal(body.error?.type, "invalid_request");
  assert.equal(typeof body.requestId, "string", "refusal goes through createErrorResponse()");
  assert.ok(!serialized.includes("at /"), "error body must not leak a stack trace");
  assert.ok(!("logged" in body), "a refused report must not be logged as accepted");
  if (expectedStatus === 403) assert.match(body.error?.message ?? "", /manage/i);
  if (secret) assert.ok(!serialized.includes(secret), "error body must not echo the credential");
}

async function assertAllowed(request: Request | Promise<Request>): Promise<void> {
  const response = await reportRoute.POST(await request);
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 202, JSON.stringify(body));
  assert.deepEqual(Object.keys(body).sort(), ["githubIssueCreated", "logged", "reason"]);
  assert.equal(body.logged, true);
  assert.equal(body.githubIssueCreated, false);
}

test("unauthenticated callers get 401", async () => {
  await assertRefused(report(), 401);
});

test("an inference key with no scopes is refused with 403", async () => {
  await assertRefused(report(bearer(inferenceKey.key)), 403, inferenceKey.key);
});

test("read- and write-scoped API keys are refused with 403", async () => {
  await assertRefused(report(bearer(readKey.key)), 403, readKey.key);
  await assertRefused(report(bearer(writeKey.key)), 403, writeKey.key);
});

test("the credential is checked before the body is read", async () => {
  await assertRefused(report(bearer(inferenceKey.key), "{not json"), 403, inferenceKey.key);
});

test("with no password configured an anonymous caller gets 401", async () => {
  const initialPassword = process.env.INITIAL_PASSWORD;
  delete process.env.INITIAL_PASSWORD;
  await updateSettings({ setupComplete: true });
  try {
    await assertRefused(report(), 401);
  } finally {
    process.env.INITIAL_PASSWORD = initialPassword;
    await updateSettings({ setupComplete: false });
  }
});

test("manage- and admin-scoped API keys are allowed", async () => {
  await assertAllowed(report(bearer(manageKey.key)));
  await assertAllowed(report(bearer(adminKey.key)));
});

test("a dashboard session is allowed", async () => {
  await assertAllowed(
    makeManagementSessionRequest(REPORT_URL, { method: "POST", body: REPORT_BODY })
  );
});

test("with login disabled the instance is open", async () => {
  await updateSettings({ requireLogin: false });
  try {
    await assertAllowed(report());
  } finally {
    await updateSettings({ requireLogin: true });
  }
});

test("an authorized caller still gets body validation", async () => {
  const response = await reportRoute.POST(report(bearer(manageKey.key), { title: "" }));
  assert.equal(response.status, 400);
});
