/**
 * The dashboard model test calls the /v1 handlers in-process, so the request never passes
 * the authz proxy. Since #16403 those handlers run `enforceClientApiRouteAuth` themselves,
 * and the anonymous internal request got a 401 "Authentication required" under
 * REQUIRE_API_KEY=true whenever the management caller had no dashboard cookie in scope.
 *
 * Both builders now present the per-process self-loop bearer, and opt out of memory and
 * skills injection, since the bearer gives the request a memory owner (#13139).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-test-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const runner = await import("../../src/lib/api/modelTestRunner.ts");
const { resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");
const { enforceClientApiRouteAuth } = await import("../../src/shared/utils/clientApiRouteAuth.ts");

const originalRequireApiKey = process.env.REQUIRE_API_KEY;

test.afterEach(() => {
  if (originalRequireApiKey === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = originalRequireApiKey;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const builders = [
  ["chat", runner.buildInternalChatRequest],
  ["responses", runner.buildInternalResponsesRequest],
] as const;

for (const [name, build] of builders) {
  test(`${name} model-test request passes the /v1 route auth under REQUIRE_API_KEY`, async () => {
    process.env.REQUIRE_API_KEY = "true";
    const request = build({ model: "openai/gpt-4o" }, new AbortController().signal, "conn-1");

    assert.equal(request.headers.get("Authorization"), `Bearer ${resolveSelfLoopBearer()}`);
    assert.equal(request.headers.get("x-omniroute-no-memory"), "true");
    assert.equal(request.headers.get("X-OmniRoute-Connection"), "conn-1");
    assert.equal(await enforceClientApiRouteAuth(request), null);
  });
}
