import assert from "node:assert/strict";
import test from "node:test";
import { SignJWT } from "jose";
import type { RequiredServerApiKey } from "../../src/shared/utils/requiredApiKeyContext.ts";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("required-api-key-context");
process.env.JWT_SECRET = "required-api-key-test-session-secret";
process.env.REQUIRE_API_KEY = "true";
const { POST, withCodexPreferredModel } = await import("../../src/app/api/v1/responses/route.ts");
const { enforceApiKeyPolicy, resolvePolicyApiKey } =
  await import("../../src/shared/utils/apiKeyPolicy.ts");
const { enforceClientApiRouteAuth } = await import("../../src/shared/utils/clientApiRouteAuth.ts");
const { resolveClientApiKey } = await import("../../src/sse/services/clientApiKeyResolver.ts");
const { resolveApiKeyForcedModel } = await import("../../src/sse/handlers/apiKeyForcedModel.ts");
const { getUsageHistory } = await import("../../src/lib/usage/usageHistory.ts");

const { runWithRequiredApiKey } = await import("../../src/shared/utils/requiredApiKeyContext.ts");

const allowedModel = "openai/gpt-4.1";
const otherModel = "openai/gpt-4o-mini";
const upstreamHeaders: Array<[string, string][]> = [];

test.before(async () => {
  await harness.seedConnection("openai");
});

test.beforeEach(() => {
  upstreamHeaders.length = 0;
  globalThis.fetch = async (input, init) => {
    upstreamHeaders.push([
      ...new Headers(init?.headers ?? (input instanceof Request ? input.headers : undefined)),
    ]);
    return harness.buildOpenAIResponse("OK", "gpt-4.1");
  };
});
test.after(async () => {
  await harness.callLogsDb.closeCallLogSaves(10_000);
  await harness.cleanup();
});

function responsesRequest(model = allowedModel, headers: Record<string, string> = {}) {
  return harness.buildRequest({
    url: "http://localhost/v1/responses",
    body: { model, input: "Hello", stream: false },
    headers,
  });
}

async function sessionHeaders() {
  const jwt = await new SignJWT({ authenticated: true, sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  return { cookie: `auth_token=${jwt}` };
}

async function seedKey(name: string, model = allowedModel) {
  return harness.apiKeysDb.createApiKey(name, "required-key-context-test", [], {
    allowedModels: [model],
  });
}

type Key = Awaited<ReturnType<typeof seedKey>>;

function bind(key: Key): RequiredServerApiKey {
  return {
    apiKeyId: key.id,
    async resolve(id) {
      assert.equal(id, key.id);
      const apiKeyInfo = await harness.apiKeysDb.getApiKeyMetadata(key.key);
      return apiKeyInfo && { apiKey: key.key, apiKeyInfo };
    },
  };
}

async function assertUnavailable(response: Response | null, secret: string) {
  assert.ok(response);
  const body = await response.text();
  assert.equal(response.status, 403, body);
  assert.equal(JSON.parse(body).error.code, "required_api_key_unavailable");
  assert.equal(body.includes(secret), false);
}

test("outside the context Responses accepts a dashboard session and rejects missing credentials", async () => {
  assert.equal((await POST(responsesRequest())).status, 401);
  const response = await POST(responsesRequest(allowedModel, await sessionHeaders()));
  const body = await response.text();
  assert.equal(response.status, 200, body);
  assert.equal(upstreamHeaders.length, 1);
});

test("the bound policy survives the Responses model rewrite and attributes allowed usage", async () => {
  const key = await seedKey("bound Responses key");
  const deniedRequest = responsesRequest("gpt-5.5", await sessionHeaders());
  const rewritten = await withCodexPreferredModel(deniedRequest);
  assert.notEqual(rewritten.request, deniedRequest);
  assert.equal(rewritten.body.model, "codex/gpt-5.5");
  const denied = await runWithRequiredApiKey(bind(key), () => POST(deniedRequest));
  assert.equal(denied.status, 403);
  assert.match(await denied.text(), /codex\/gpt-5\.5.*not allowed/);
  assert.equal(upstreamHeaders.length, 0);

  const response = await runWithRequiredApiKey(bind(key), () => POST(responsesRequest()));
  const body = await response.text();
  assert.equal(response.status, 200, body);
  assert.equal(body.includes(key.key), false);
  assert.equal(upstreamHeaders.length, 1);
  assert.equal(JSON.stringify(upstreamHeaders).includes(key.key), false);
  await harness.callLogsDb.waitForCallLogSaves(10_000);
  const logs = await harness.callLogsDb.getCallLogs({ apiKey: key.id, limit: 5 });
  assert.ok(
    logs.some((log) => log.status === 200 && log.apiKeyId === key.id && log.apiKeyName === key.name)
  );
  const usage = await getUsageHistory();
  assert.ok(usage.some((entry) => entry.apiKeyId === key.id && entry.apiKeyName === key.name));
});

test("client credentials and a session cannot override the required identity or its forced model", async () => {
  const key = await seedKey("pinned server key");
  const other = await seedKey("request key", otherModel);
  await harness.apiKeysDb.updateApiKeyPermissions(key.id, { forcedModel: allowedModel });
  const request = responsesRequest(otherModel, {
    ...(await sessionHeaders()),
    Authorization: `Bearer ${other.key}`,
    "x-api-key": other.key,
    "x-omniroute-playground-key-id": other.id,
  });
  await runWithRequiredApiKey(bind(key), async () => {
    assert.equal((await resolveClientApiKey(request)).apiKey === key.key, true);
    assert.equal(await resolveApiKeyForcedModel(request), allowedModel);
    const response = await POST(request);
    assert.equal(response.status, 200, await response.text());
  });
  await harness.callLogsDb.waitForCallLogSaves(10_000);
  const usage = await getUsageHistory();
  assert.equal(
    usage.some((entry) => entry.apiKeyId === other.id),
    false
  );
  assert.ok(usage.some((entry) => entry.apiKeyId === key.id));
});

test("the local usage command honors the bound key instead of the request bearer", async () => {
  const key = await seedKey("usage command disabled");
  const other = await seedKey("usage command enabled");
  await harness.apiKeysDb.updateApiKeyPermissions(other.id, { allowUsageCommand: true });
  const request = harness.buildRequest({
    url: "http://localhost/v1/responses",
    body: { model: allowedModel, input: "@@om-usage", stream: false },
    authKey: other.key,
  });
  const response = await runWithRequiredApiKey(bind(key), () => POST(request));
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Usage command is disabled for this API key/);
  assert.equal(upstreamHeaders.length, 0);
});

for (const state of [
  "revoked",
  "deleted",
  "disabled",
  "expired",
  "banned",
  "wrong id",
  "throws",
] as const) {
  test(`a ${state} binding returns the stable rejection with or without client credentials`, async () => {
    const key = await seedKey(`${state} key`);
    const other = await seedKey("request key");
    const binding = bind(key);
    if (state === "revoked") await harness.apiKeysDb.revokeApiKey(key.id);
    if (state === "deleted") await harness.apiKeysDb.deleteApiKey(key.id);
    if (state === "disabled")
      await harness.apiKeysDb.updateApiKeyPermissions(key.id, { isActive: false });
    if (state === "expired")
      await harness.apiKeysDb.setApiKeyExpiry(key.id, "2000-01-01T00:00:00.000Z");
    if (state === "banned")
      await harness.apiKeysDb.updateApiKeyPermissions(key.id, { isBanned: true });
    if (state === "wrong id") binding.resolve = () => bind(other).resolve(other.id);
    if (state === "throws")
      binding.resolve = async () => {
        throw new Error(key.key);
      };

    const authenticated = responsesRequest(allowedModel, {
      ...(await sessionHeaders()),
      Authorization: `Bearer ${other.key}`,
    });
    await runWithRequiredApiKey(binding, async () => {
      await assertUnavailable(await POST(authenticated), key.key);
      assert.equal((await resolvePolicyApiKey(authenticated)) === null, true);
    });
    await runWithRequiredApiKey(binding, async () => {
      const { rejection } = await enforceApiKeyPolicy(responsesRequest(), allowedModel);
      await assertUnavailable(rejection, key.key);
    });
    assert.equal(upstreamHeaders.length, 0);
  });
}

test("policy rejects a key deleted between route authorization and dispatch, even with stale resolver metadata", async () => {
  const key = await seedKey("deleted after auth");
  const binding = bind(key);
  const snapshot = await binding.resolve(key.id);
  binding.resolve = async () => snapshot;
  await runWithRequiredApiKey(binding, async () => {
    const request = responsesRequest(allowedModel, await sessionHeaders());
    assert.equal(await enforceClientApiRouteAuth(request), null);
    await harness.apiKeysDb.deleteApiKey(key.id);
    const { rejection } = await enforceApiKeyPolicy(new Request(request), allowedModel);
    await assertUnavailable(rejection, key.key);
  });
});

test("overlapping executions keep their own key even for the same Request object", async () => {
  const a = await seedKey("first request");
  const b = await seedKey("second request", otherModel);
  const request = responsesRequest();
  const arrived = Promise.withResolvers<void>();
  const release = Promise.withResolvers<void>();
  const first = runWithRequiredApiKey(bind(a), async () => {
    arrived.resolve();
    await release.promise;
    return enforceApiKeyPolicy(request, allowedModel);
  });
  await arrived.promise;
  try {
    const second = await runWithRequiredApiKey(bind(b), () =>
      enforceApiKeyPolicy(request, otherModel)
    );
    assert.equal(second.apiKeyInfo?.id, b.id);
    assert.equal(second.rejection, null);
    assert.equal((await enforceClientApiRouteAuth(request))?.status, 401);
  } finally {
    release.resolve();
    await first;
  }
  const result = await first;
  assert.equal(result.apiKeyInfo?.id, a.id);
  assert.equal(result.rejection, null);
});
