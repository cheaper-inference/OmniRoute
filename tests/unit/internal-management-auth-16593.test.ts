import test, { mock } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const saved = Object.fromEntries(
  ["DATA_DIR", "REQUIRE_API_KEY", "OMNIROUTE_API_KEY", "ROUTER_API_KEY"].map((key) => [
    key,
    process.env[key],
  ])
);
const directory = mkdtempSync(join(tmpdir(), "omniroute-internal-auth-16593-"));
process.env.DATA_DIR = directory;
process.env.REQUIRE_API_KEY = "true";
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const { enforceClientApiRouteAuth } = await import("../../src/shared/utils/clientApiRouteAuth.ts");
const { buildEvalCaseRequest } = await import("../../src/lib/evals/runtime.ts");

test.after(() => {
  mock.restoreAll();
  core.resetDbInstance();
  rmSync(directory, { recursive: true, force: true });
  for (const [key, value] of Object.entries(saved)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("public chat authentication rejects anonymous and forged internal callers", async () => {
  for (const headers of [
    {},
    { Authorization: "Bearer forged-internal-secret", "x-omniroute-admission-bypass": "internal" },
  ]) {
    const response = await enforceClientApiRouteAuth(
      new Request("http://localhost/api/v1/chat/completions", { headers })
    );
    assert.equal(response?.status, 401);
  }
});

test("eval without a selected key passes required authentication and opts out of memory", async () => {
  const request = buildEvalCaseRequest({ input: {} }, { type: "suite-default" }, null);
  const denial = await enforceClientApiRouteAuth(request);
  assert.equal(denial?.status ?? 200, 200);
  assert.equal(request.headers.get("x-omniroute-no-memory"), "true");
  assert.equal(request.headers.get("x-omniroute-compression"), "off");
});

test("an explicit invalid eval key remains invalid instead of gaining internal identity", async () => {
  const request = buildEvalCaseRequest(
    { input: {} },
    { type: "suite-default" },
    "explicit-invalid-key"
  );
  assert.equal(request.headers.get("Authorization"), "Bearer explicit-invalid-key");
  assert.equal((await enforceClientApiRouteAuth(request))?.status, 401);
});

test("recorded triage authenticates its internal chat call without importing memory", async () => {
  const { createRecordedTriageRun } = await import("../../src/lib/issueAgent/recordedTriage.ts");
  const { executeRecordedTriageChatCompletion } =
    await import("../../src/lib/issueAgent/execution.ts");
  const run = createRecordedTriageRun({
    issueUrl: "https://github.com/diegosouzapw/OmniRoute/issues/16593",
    recordedContext: { title: "Internal authentication", body: "Recorded diagnostic context" },
  });
  let noMemory: string | null = null;
  const result = await executeRecordedTriageChatCompletion({ run }, async (request) => {
    noMemory = request.headers.get("x-omniroute-no-memory");
    return (await enforceClientApiRouteAuth(request)) ?? Response.json({ choices: [] });
  });
  assert.equal(result.status, 200);
  assert.equal(noMemory, "true");
});

test("dashboard chaos dispatch passes required authentication without a selected key", async () => {
  const providers = await import("../../src/lib/db/providers.ts");
  const chaos = await import("../../src/lib/chaos/chaosExecutor.ts");
  await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Internal auth regression",
    apiKey: "upstream-fixture-only",
    defaultModel: "gpt-4o-mini",
  });
  let noMemory: string | null = null;
  const dispatch = mock.method(
    chaos.chatDispatch,
    "postChatCompletion",
    async (request: Request) => {
      noMemory = request.headers.get("x-omniroute-no-memory");
      return (
        (await enforceClientApiRouteAuth(request)) ??
        Response.json({ choices: [{ message: { content: "ok" } }] })
      );
    }
  );
  try {
    const result = await chaos.executeChaosRun({ task: "test internal auth" });
    assert.equal(result.models.length, 1);
    assert.equal(result.models[0].status, "success");
    assert.equal(noMemory, "true");
  } finally {
    dispatch.mock.restore();
  }
});

test("generated internal identity remains restricted to chat and audio", async () => {
  const { getApiKeyMetadata } = await import("../../src/lib/db/apiKeys.ts");
  const request = buildEvalCaseRequest({ input: {} }, { type: "suite-default" }, null);
  const bearer = request.headers.get("Authorization")?.replace(/^Bearer /, "");
  assert.ok(bearer);
  const metadata = await getApiKeyMetadata(bearer);
  assert.deepEqual(metadata?.allowedEndpoints, ["chat", "audio"]);
  assert.deepEqual(metadata?.scopes, ["internal:self-loop"]);
});
