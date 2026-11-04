// The Google "verify your account" link must reach the connection from the two places that
// actually see Antigravity's raw 403: the executor (chat traffic) and the connection test probe
// (dashboard "Test" + the hourly credential-health run). The executor rebuilds the 403 into a
// sanitized client envelope that drops the link, so recording it later in chatCore never finds
// it — the Verify account button then never shows (#16532 follow-up).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-verify-capture-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { sendAntigravityRequest } =
  await import("../../open-sse/executors/antigravity/executeAttempt.ts");
const { testOAuthConnection, testSingleConnection } =
  await import("../../src/app/api/providers/[id]/test/route.ts");

const TOKEN = "AKgnsbtCAPTURETOKEN0123456789";
const LINK = `https://accounts.google.com/v3/signin/continue?plt=${TOKEN}&flowName=GlifWebSignIn`;
const VALIDATION_BODY = JSON.stringify({
  error: {
    code: 403,
    message: "Verify your account to continue.",
    status: "PERMISSION_DENIED",
    details: [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        reason: "VALIDATION_REQUIRED",
        domain: "cloudcode-pa.googleapis.com",
        metadata: {
          validation_error_message: "Verify your account to continue.",
          validation_url_link_text: "Verify your account",
          validation_url: LINK,
          validation_learn_more_url: "https://support.google.com/accounts?p=al_alert",
        },
      },
    ],
  },
});
const PLAIN_403_BODY = JSON.stringify({
  error: { code: 403, message: "The caller does not have permission", status: "PERMISSION_DENIED" },
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function makeConn() {
  const conn = (await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    accessToken: "access-token",
    refreshToken: "refresh-token",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    email: `ag-${Math.random().toString(36).slice(2)}@example.com`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { projectId: "proj-1" },
  })) as { id: string };
  return conn.id;
}

async function storedLink(id: string) {
  const row = (await providersDb.getProviderConnectionById(id)) as {
    providerSpecificData?: Record<string, unknown>;
  };
  return row.providerSpecificData?.verificationUrl;
}

function stubFetch(status: number, body: string) {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(body, {
      status,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

async function sendOnce(connectionId: string) {
  return sendAntigravityRequest(
    "antigravity",
    "https://cloudcode-pa.googleapis.com/v1internal:streamGenerateContent?alt=sse",
    "gemini-3.5-flash-lite",
    { "Content-Type": "application/json" },
    {
      project: "proj-1",
      requestId: "verify-capture",
      request: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
      model: "gemini-3.5-flash-lite",
      userAgent: "antigravity",
      requestType: "agent",
    },
    { accessToken: "access-token", projectId: "proj-1", connectionId },
    true,
    null,
    { debug() {}, info() {}, warn() {}, error() {} },
    0,
    { value: 0 },
    "verify-capture"
  );
}

test("executor: a 403 VALIDATION_REQUIRED stores the verification link on the connection", async () => {
  const id = await makeConn();
  const restore = stubFetch(403, VALIDATION_BODY);
  try {
    const result = await sendOnce(id);
    assert.equal(result.response.status, 403, "the upstream status is passed through unchanged");
    assert.equal(await result.response.text(), VALIDATION_BODY, "the response body stays readable");
  } finally {
    restore();
  }
  assert.equal(await storedLink(id), LINK);
});

test("executor: a plain 403 without a verification challenge stores nothing", async () => {
  const id = await makeConn();
  const restore = stubFetch(403, PLAIN_403_BODY);
  try {
    await sendOnce(id);
  } finally {
    restore();
  }
  assert.equal(await storedLink(id), undefined);
});

test("connection test: a 403 VALIDATION_REQUIRED stores the link and never logs its token", async () => {
  const id = await makeConn();
  const connection = await providersDb.getProviderConnectionById(id);
  const restore = stubFetch(403, VALIDATION_BODY);
  const logged: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    logged.push(args.map(String).join(" "));
  };
  let result: { valid: boolean; statusCode?: number };
  try {
    result = await testOAuthConnection(connection, 5000);
  } finally {
    console.log = originalLog;
    restore();
  }
  assert.equal(result.valid, false);
  assert.equal(result.statusCode, 403);
  assert.equal(await storedLink(id), LINK);
  assert.ok(
    logged.every((line) => !line.includes(TOKEN)),
    "the continuation token must never reach the logs"
  );
});

test("connection test: a passing probe clears a stored verification link", async () => {
  const id = await makeConn();
  await providersDb.updateProviderConnection(id, {
    providerSpecificData: { projectId: "proj-1", verificationUrl: LINK, verificationAt: "x" },
  });
  assert.equal(await storedLink(id), LINK, "precondition: the link is stored");
  const restore = stubFetch(200, 'data: {"response":{"candidates":[]}}\n\n');
  let result: { valid: boolean };
  try {
    result = await testSingleConnection(id);
  } finally {
    restore();
  }
  assert.equal(result.valid, true);
  assert.equal(await storedLink(id), undefined, "a verified account leaves the pending filter");
});
