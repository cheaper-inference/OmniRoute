// A `403 VALIDATION_REQUIRED` on an Antigravity connection must persist the
// Google verification link on the connection (so the dashboard can show a
// Verify button) without banning it, and a later success must clear the link.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ag-verify-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { recordAntigravityVerificationUrl, clearAntigravityVerificationUrl } =
  await import("../../open-sse/handlers/chatCore/antigravityVerificationState.ts");
const { handleProjectRouteFailure } =
  await import("../../open-sse/handlers/chatCore/projectRouteFailure.ts");

const URL_A = "https://accounts.google.com/signin/continue?sarp=1&id=ag-1";
const VALIDATION_BODY = {
  error: {
    code: 403,
    message: "Verify your account to continue.",
    status: "PERMISSION_DENIED",
    details: [{ reason: "VALIDATION_REQUIRED", metadata: { validation_url: URL_A } }],
  },
};

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function makeConn(provider = "antigravity") {
  core.resetDbInstance();
  const conn = (await providersDb.createProviderConnection({
    provider,
    authType: "oauth",
    accessToken: "token",
    email: `${provider}@example.com`,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { projectId: "proj-1" },
  })) as { id: string };
  return conn.id;
}

async function readPsd(id: string) {
  const row = (await providersDb.getProviderConnectionById(id)) as {
    testStatus?: string;
    isActive?: boolean;
    providerSpecificData?: Record<string, unknown>;
  };
  return row;
}

test("records the verification link for antigravity without touching other psd keys", async () => {
  const id = await makeConn();
  const url = await recordAntigravityVerificationUrl({
    provider: "antigravity",
    connectionId: id,
    upstreamErrorBody: VALIDATION_BODY,
    message: "Verify your account to continue.",
  });
  assert.equal(url, URL_A);

  const row = await readPsd(id);
  assert.equal(row.providerSpecificData?.verificationUrl, URL_A);
  assert.equal(typeof row.providerSpecificData?.verificationAt, "string");
  assert.equal(row.providerSpecificData?.projectId, "proj-1");
  assert.notEqual(row.testStatus, "banned");
  assert.notEqual(row.isActive, false);
});

test("ignores other providers and bodies without a valid Google link", async () => {
  const id = await makeConn("gemini-cli");
  assert.equal(
    await recordAntigravityVerificationUrl({
      provider: "gemini-cli",
      connectionId: id,
      upstreamErrorBody: VALIDATION_BODY,
      message: "",
    }),
    null
  );
  assert.equal((await readPsd(id)).providerSpecificData?.verificationUrl, undefined);

  const agId = await makeConn();
  assert.equal(
    await recordAntigravityVerificationUrl({
      provider: "antigravity",
      connectionId: agId,
      upstreamErrorBody: { error: { message: "Verify your account at https://evil.com/x" } },
      message: "Verify your account at https://evil.com/x",
    }),
    null
  );
  assert.equal((await readPsd(agId)).providerSpecificData?.verificationUrl, undefined);
});

test("falls back to the message text when the body has no structured link", async () => {
  const id = await makeConn();
  const url = await recordAntigravityVerificationUrl({
    provider: "antigravity",
    connectionId: id,
    upstreamErrorBody: null,
    message: `Verify your account to continue: ${URL_A}`,
  });
  assert.equal(url, URL_A);
});

test("a later success clears the link and keeps the rest of providerSpecificData", async () => {
  const id = await makeConn();
  await recordAntigravityVerificationUrl({
    provider: "antigravity",
    connectionId: id,
    upstreamErrorBody: VALIDATION_BODY,
    message: "",
  });
  const before = await readPsd(id);

  assert.equal(
    await clearAntigravityVerificationUrl("antigravity", id, before.providerSpecificData),
    true
  );
  const after = await readPsd(id);
  assert.equal(after.providerSpecificData?.verificationUrl, undefined);
  assert.equal(after.providerSpecificData?.verificationAt, undefined);
  assert.equal(after.providerSpecificData?.projectId, "proj-1");

  // No stored link -> no write.
  assert.equal(
    await clearAntigravityVerificationUrl("antigravity", id, after.providerSpecificData),
    false
  );
  assert.equal(
    await clearAntigravityVerificationUrl("gemini-cli", id, { verificationUrl: URL_A }),
    false
  );
});

test("PROJECT_ROUTE_ERROR leaf records the link and the error, never bans", async () => {
  const id = await makeConn();
  await handleProjectRouteFailure({
    provider: "antigravity",
    connectionId: id,
    statusCode: 403,
    persistentMessage: "Verify your account to continue.",
    message: "Verify your account to continue.",
    upstreamErrorBody: VALIDATION_BODY,
    targetModel: "gemini-3-pro",
  });

  const row = (await readPsd(id)) as Awaited<ReturnType<typeof readPsd>> & {
    lastErrorType?: string;
    errorCode?: number | string;
  };
  assert.equal(row.providerSpecificData?.verificationUrl, URL_A);
  assert.equal(row.lastErrorType, "project_route_error");
  assert.equal(Number(row.errorCode), 403);
  assert.notEqual(row.testStatus, "banned");
  assert.notEqual(row.isActive, false);
});

test("wiring: chatCore records on PROJECT_ROUTE_ERROR, chat success path clears", () => {
  const root = path.resolve(import.meta.dirname, "../..");
  const chatCore = fs.readFileSync(path.join(root, "open-sse/handlers/chatCore.ts"), "utf8");
  const branchStart = chatCore.indexOf("errorType === PROVIDER_ERROR_TYPES.PROJECT_ROUTE_ERROR");
  assert.ok(branchStart > 0, "PROJECT_ROUTE_ERROR branch not found in chatCore.ts");
  const branchEnd = chatCore.indexOf("} else if (", branchStart);
  // chatCore delegates the branch to the leaf and must hand it the upstream body.
  assert.match(
    chatCore.slice(branchStart, branchEnd),
    /handleProjectRouteFailure\(\{[\s\S]*upstreamErrorBody/
  );
  const leaf = fs.readFileSync(
    path.join(root, "open-sse/handlers/chatCore/projectRouteFailure.ts"),
    "utf8"
  );
  assert.match(leaf, /recordAntigravityVerificationUrl\(\{[\s\S]*upstreamErrorBody/);

  const helpers = fs.readFileSync(path.join(root, "src/sse/handlers/chatHelpers.ts"), "utf8");
  const successStart = helpers.indexOf("onRequestSuccess: async () => {");
  assert.ok(successStart > 0, "onRequestSuccess not found in chatHelpers.ts");
  const successEnd = helpers.indexOf("onStreamFailure:", successStart);
  assert.match(
    helpers.slice(successStart, successEnd),
    /clearAntigravityVerificationUrl\(\s*provider,\s*credentials\.connectionId,\s*credentials\.providerSpecificData/
  );
});
