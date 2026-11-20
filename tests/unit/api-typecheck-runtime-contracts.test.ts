import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-api-repair-regression-"));
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { isSelectedProviderCredentials } =
  await import("../../src/sse/services/credentialSentinel.ts");
const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const { POST: preview } = await import("../../src/app/api/omniroute/route/preview/route.ts");
const { POST: modelsDev } = await import("../../src/app/api/settings/models-dev/route.ts");
const { POST: codexImport } = await import("../../src/app/api/oauth/codex/import/route.ts");
const { decryptApiKeySecret } = await import("../../src/lib/db/apiKeys/secretAtRest.ts");
let externalCalls = 0;
const fetchOriginal = globalThis.fetch;
test.before(async () => {
  await settings.updateSettings({ requireLogin: false });
  globalThis.fetch = async () => {
    externalCalls++;
    throw new Error("Unexpected upstream dispatch");
  };
});
test.after(() => {
  globalThis.fetch = fetchOriginal;
  core.resetDbInstance();
  fs.rmSync(process.env.DATA_DIR!, { recursive: true, force: true });
});
for (const sentinel of [
  null,
  {},
  { allExpired: true },
  { allRateLimited: true },
  { blockedByKeyPolicy: true },
  { leaseFenceStale: true },
  { waitingForCapacity: true },
]) {
  test(`selection refuses ${JSON.stringify(sentinel)}`, () =>
    assert.equal(isSelectedProviderCredentials(sentinel), false));
}
test("selected keyed and no-auth credentials are accepted; malformed fields are refused", () => {
  assert.equal(isSelectedProviderCredentials({ apiKey: "fixture", accessToken: null }), true);
  assert.equal(isSelectedProviderCredentials({ apiKey: null, accessToken: null }), true);
  assert.equal(isSelectedProviderCredentials({ apiKey: {}, accessToken: null }), false);
});
const candidate = {
  providerId: "fixture",
  modelId: "model",
  capabilityScore: 1,
  allocation: "allow",
  healthScore: 1,
  circuit: "closed",
  quota: "healthy",
};
const request = (url: string, body: unknown) =>
  new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
test("actual routing preview ranks the candidate array without upstream calls", async () => {
  const response = await preview(
    request("http://localhost/api/omniroute/route/preview", { candidates: [candidate] })
  );
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.selected, "fixture");
  assert.equal(data.request.candidateCount, 1);
  assert.equal(data.liveRequestExecuted, false);
  assert.equal(externalCalls, 0);
});
test("routing preview rejects malformed candidates", async () => {
  const response = await preview(
    request("http://localhost/api/omniroute/route/preview", { candidates: [{}] })
  );
  assert.equal(response.status, 400);
  assert.equal(externalCalls, 0);
});
test("models-dev invalid action returns a real 400 response instead of undefined", async () => {
  const response = await modelsDev(
    request("http://localhost/api/settings/models-dev", { action: "invalid" })
  );
  assert.ok(response instanceof Response);
  assert.equal(response.status, 400);
  assert.ok((await response.json()).error);
});
test("codex import rejects a non-object accounts payload with its schema message", async () => {
  const response = await codexImport(
    request("http://localhost/api/oauth/codex/import", { accounts: 42 })
  );
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "accounts must be an object or an array of objects",
  });
  assert.equal(externalCalls, 0);
});
test("malformed stored key values are absent, not opaque non-string credentials", () => {
  assert.equal(decryptApiKeySecret({}), null);
  assert.equal(decryptApiKeySecret(123), null);
  assert.equal(decryptApiKeySecret("fixture"), "fixture");
});
