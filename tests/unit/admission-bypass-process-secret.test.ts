// The admission bypass (skip the heavyweight lease, honor the internal upstream-start
// cap) is only for calls this process makes to its own listener. An API key proves
// nothing about where a request came from: the deployment env key
// (OMNIROUTE_API_KEY / ROUTER_API_KEY) is an ordinary key a client can hold. So, as
// with the internal test mark (#19292), only the per-process token held in memory can
// vouch for the bypass.
import test from "node:test";
import assert from "node:assert/strict";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { callVisionModel } = await import("../../src/lib/guardrails/visionBridgeHelpers.ts");
const { admitChatRequest, ChatAdmissionController } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");
const { isInternalAdmissionBypass } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");
const { INTERNAL_UPSTREAM_START_TIMEOUT_HEADER, resolveInternalUpstreamStartTimeoutMs } =
  await import("../../src/sse/services/internalUpstreamStartTimeout.ts");
const { SELF_HOP_HEADER, ownListenerSelfHopToken } =
  await import("../../open-sse/utils/selfHop.ts");

const DEPLOY_KEY = "sk-deployment-env-key";
const ENV_KEYS = ["OMNIROUTE_API_KEY", "ROUTER_API_KEY", "VISION_BRIDGE_BASE_URL"] as const;
const savedEnv = new Map(ENV_KEYS.map((key) => [key, process.env[key]]));

function setDeployKey(value: string | undefined) {
  delete process.env.ROUTER_API_KEY;
  if (value === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = value;
}

test.before(async () => {
  delete process.env.VISION_BRIDGE_BASE_URL;
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "admission-bypass-openai",
    apiKey: "sk-test-openai",
  });
});

test.afterEach(() => {
  for (const [key, value] of savedEnv) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test.after(() => {
  core.resetDbInstance();
});

const bigBody = () =>
  JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: "x".repeat(512 * 1024) }],
  });

function chatRequest(headers: Record<string, string>, body = bigBody()) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-length": String(body.length),
      ...headers,
    },
    body,
  });
}

/** Admission outcome while the single heavyweight slot is held by a parent request. */
async function admitWhileBusy(request: Request) {
  const controller = new ChatAdmissionController(1);
  const parentLease = controller.tryAcquireHeavy();
  assert.ok(parentLease);
  try {
    const result = await admitChatRequest(request, {
      controller,
      largeBodyBytes: 32,
      hardMaxBytes: 10 * 1024 * 1024,
      heapPressureCheck: () => true,
    });
    return { result, activeHeavy: controller.activeHeavy };
  } finally {
    parentLease.release();
  }
}

/** The headers the vision bridge sends on its describe call to this process's listener. */
async function visionSelfLoopHeaders(): Promise<Record<string, string>> {
  let headers: Record<string, string> = {};
  const fetchImpl: typeof fetch = async (_input, init) => {
    headers = { ...((init?.headers ?? {}) as Record<string, string>) };
    return Response.json({ choices: [{ message: { content: "A green square" } }] });
  };
  const result = await callVisionModel("data:image/png;base64,iVBORw0KGgo", {
    model: "openai/gpt-4o-mini",
    prompt: "Describe",
    timeoutMs: 30_000,
    maxImages: 1,
    routeThroughOmniRoute: true,
    fetchImpl,
  });
  assert.equal(result, "A green square");
  return headers;
}

test("a client holding the deployment env key cannot claim the admission bypass", async () => {
  setDeployKey(DEPLOY_KEY);
  const headers = {
    "x-omniroute-admission-bypass": "internal",
    authorization: `Bearer ${DEPLOY_KEY}`,
  };

  assert.equal(isInternalAdmissionBypass(chatRequest(headers)), false);

  const { result, activeHeavy } = await admitWhileBusy(chatRequest(headers));
  assert.equal(result.admit, false, "the deployment key alone must not skip the admission queue");
  if (!result.admit) assert.equal(result.response.status, 503);
  assert.equal(activeHeavy, 1);
});

test("a client holding the deployment env key cannot set the internal upstream-start cap", () => {
  setDeployKey(DEPLOY_KEY);
  const request = chatRequest({
    "x-omniroute-admission-bypass": "internal",
    authorization: `Bearer ${DEPLOY_KEY}`,
    [INTERNAL_UPSTREAM_START_TIMEOUT_HEADER]: "1000",
  });

  assert.equal(resolveInternalUpstreamStartTimeoutMs(request), undefined);
});

test("a forged or empty process token does not grant the bypass", () => {
  setDeployKey(DEPLOY_KEY);
  const base = {
    "x-omniroute-admission-bypass": "internal",
    authorization: `Bearer ${DEPLOY_KEY}`,
  };

  assert.equal(
    isInternalAdmissionBypass(chatRequest({ ...base, [SELF_HOP_HEADER]: "0".repeat(64) })),
    false
  );
  assert.equal(isInternalAdmissionBypass(chatRequest({ ...base, [SELF_HOP_HEADER]: "" })), false);
  assert.equal(
    isInternalAdmissionBypass(chatRequest({ ...base, [SELF_HOP_HEADER]: DEPLOY_KEY })),
    false
  );
});

for (const [label, deployKey] of [
  ["with a deployment env key", DEPLOY_KEY],
  ["without a deployment env key", undefined],
] as const) {
  test(`the vision bridge describe call is still an internal bypass ${label}`, async () => {
    setDeployKey(deployKey);
    const headers = await visionSelfLoopHeaders();

    assert.equal(headers[SELF_HOP_HEADER], ownListenerSelfHopToken());
    assert.notEqual(headers[SELF_HOP_HEADER], DEPLOY_KEY);
    assert.equal(isInternalAdmissionBypass(chatRequest(headers)), true);

    const { result, activeHeavy } = await admitWhileBusy(chatRequest(headers));
    assert.equal(result.admit, true, "the describe call must not wait behind its own parent");
    assert.equal(activeHeavy, 1, "the bypass must not reserve a second lease");

    const capped = chatRequest({ ...headers, [INTERNAL_UPSTREAM_START_TIMEOUT_HEADER]: "5000" });
    assert.equal(resolveInternalUpstreamStartTimeoutMs(capped), 5000);
  });
}

test("the process token never goes to another endpoint", async () => {
  setDeployKey(DEPLOY_KEY);
  process.env.VISION_BRIDGE_BASE_URL = "http://localhost:11434/v1";
  await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "admission-bypass-gemini",
    apiKey: "sk-test-gemini",
  });
  let headers: Record<string, string> = {};
  const fetchImpl: typeof fetch = async (_input, init) => {
    headers = { ...((init?.headers ?? {}) as Record<string, string>) };
    return Response.json({ choices: [{ message: { content: "A green square" } }] });
  };

  await callVisionModel("data:image/png;base64,iVBORw0KGgo", {
    model: "gemini/gemini-2.5-flash",
    prompt: "Describe",
    timeoutMs: 30_000,
    maxImages: 1,
    fetchImpl,
  });

  assert.equal(headers[SELF_HOP_HEADER], undefined);
  assert.equal(headers["x-omniroute-admission-bypass"], undefined);
});
