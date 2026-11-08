// #14780: automated probes must never leave a conversation on a signed-in provider account.
// The chat pipeline decides for every target a probe reaches, once its provider is final.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-probe-isolation-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const { CHAT_PROBE_NOT_ISOLATED_CODE, chatProbeLeavesNoConversation, isChatProbeRefusal } =
  await import("../../src/lib/providers/chatProbePolicy.ts");
const { chatProbeIsolationOf } = await import("../../open-sse/executors/chatProbeIsolation.ts");
const { ChatGptWebExecutor } = await import("../../open-sse/executors/chatgpt-web.ts");
const { CHATGPT_WEB_PAGE_URL } = await import("../../open-sse/utils/chatgptWebExecutorAdapter.ts");
const { Assessor } = await import("../../src/domain/assessment/assessor.ts");
const { resolveSelfLoopBearer } =
  await import("../../src/shared/middleware/chatAdmissionIdentity.ts");
const { SELF_HOP_HEADER, ownListenerSelfHopToken } =
  await import("../../open-sse/utils/selfHop.ts");

const originalFetch = globalThis.fetch;
const WEB_SESSION_MODEL = "deepseek-web/deepseek-v4-pro-think";

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function countUpstreamCalls(): { calls: number } {
  const counter = { calls: 0 };
  globalThis.fetch = (async () => {
    counter.calls += 1;
    throw new Error("a refused probe must not reach any upstream");
  }) as typeof fetch;
  return counter;
}

/**
 * A probe as OmniRoute sends it in-process (the model runner): marked, with the self-loop bearer
 * and this process's self-hop token, which a live-test mark needs to be honored.
 */
function ownProbe(mark: string): Record<string, string> {
  return {
    "X-Internal-Test": mark,
    [SELF_HOP_HEADER]: ownListenerSelfHopToken(),
    Authorization: `Bearer ${resolveSelfLoopBearer()}`,
  };
}

function chatRequest(model: string, headers: Record<string, string> = {}) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: "Reply with OK only." }],
      max_tokens: 16,
      stream: false,
    }),
  });
}

test("only an executor's own declaration makes a web-session provider probe-safe", () => {
  assert.equal(chatProbeIsolationOf({ chatProbeIsolation: "temporary-chat" }), "temporary-chat");
  assert.equal(chatProbeIsolationOf({ chatProbeIsolation: "anything-else" }), null);
  assert.equal(chatProbeIsolationOf({}), null);
  assert.equal(chatProbeIsolationOf(null), null);
});

test("ChatGPT Web's declaration is pinned to the temporary-chat page every turn runs on", () => {
  assert.equal(chatProbeIsolationOf(new ChatGptWebExecutor()), "temporary-chat");
  assert.equal(new URL(CHATGPT_WEB_PAGE_URL).searchParams.get("temporary-chat"), "true");
});

test("the policy: API-key providers and isolating executors pass, other web sessions do not", async () => {
  assert.equal(await chatProbeLeavesNoConversation("openai"), true);
  assert.equal(await chatProbeLeavesNoConversation("chatgpt-web"), true);
  assert.equal(await chatProbeLeavesNoConversation("deepseek-web"), false);
});

for (const mark of ["combo-health-check", "assessment"]) {
  test(`a ${mark} probe to a web-session model is refused before any upstream call`, async () => {
    const upstream = countUpstreamCalls();
    const response = await chatRoute.POST(chatRequest(WEB_SESSION_MODEL, ownProbe(mark)));
    const body = await response.json();

    assert.equal(response.status, 422);
    assert.equal(body.error.code, CHAT_PROBE_NOT_ISOLATED_CODE);
    assert.equal(isChatProbeRefusal(body), true);
    assert.equal(upstream.calls, 0);
  });
}

test("an assessment mark is gated even without this process's token", async () => {
  // The assessor posts to its configured base URL, which is not always the listener the self-hop
  // stamp covers. The mark only makes its own request stricter, so the gate reads it as sent.
  const upstream = countUpstreamCalls();
  const response = await chatRoute.POST(
    chatRequest(WEB_SESSION_MODEL, {
      "X-Internal-Test": "assessment",
      Authorization: `Bearer ${resolveSelfLoopBearer()}`,
    })
  );
  const body = await response.json();

  assert.equal(response.status, 422);
  assert.equal(body.error.code, CHAT_PROBE_NOT_ISOLATED_CODE);
  assert.equal(upstream.calls, 0);
});

test("an ordinary request to the same model is not a probe and is not refused by the gate", async () => {
  // A usable web-session connection, so the request can reach the provider.
  await providersDb.createProviderConnection({
    provider: "deepseek-web",
    authType: "apikey",
    name: "deepseek-web-fixture",
    apiKey: "deepseek-web-fixture-token",
    isActive: true,
    testStatus: "active",
  });
  const upstream = countUpstreamCalls();
  const response = await chatRoute.POST(chatRequest(WEB_SESSION_MODEL));
  const body = await response.json().catch(() => null);

  assert.equal(isChatProbeRefusal(body), false);
  assert.ok(upstream.calls > 0, "the ordinary request must be dispatched to the provider");
});

test("a probe reaching a web-session target inside a combo is refused for that target", async () => {
  await combosDb.createCombo({
    name: "probe-isolation-web-only",
    strategy: "priority",
    models: [WEB_SESSION_MODEL],
  });
  const upstream = countUpstreamCalls();
  const response = await chatRoute.POST(
    chatRequest("probe-isolation-web-only", ownProbe("combo-health-check"))
  );
  const body = await response.json();

  assert.equal(upstream.calls, 0);
  assert.equal(isChatProbeRefusal(body), true, JSON.stringify(body));
});

test("an assessment never probes a web-session model and marks its probes as assessments", async () => {
  const sent: Array<{ url: string; mark: string | null }> = [];
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    sent.push({ url: String(url), mark: new Headers(init?.headers).get("x-internal-test") });
    return Response.json({ choices: [{ message: { role: "assistant", content: "OK" } }] });
  }) as typeof fetch;
  const assessor = new Assessor("key", "http://localhost/v1");

  const web = await assessor.probeModel("deepseek-web", "deepseek-v4-pro-think");
  assert.equal(web.status, "unknown");
  assert.equal(sent.length, 0);

  const api = await assessor.probeModel("openai", "gpt-4.1");
  assert.equal(api.status, "working");
  assert.deepEqual(sent, [{ url: "http://localhost/v1/chat/completions", mark: "assessment" }]);
});

test("an assessment the pipeline refuses (e.g. through a combo) is not assessed, not broken", async () => {
  globalThis.fetch = (async () =>
    Response.json(
      { error: { message: "skipped", code: CHAT_PROBE_NOT_ISOLATED_CODE } },
      { status: 422 }
    )) as typeof fetch;

  const result = await new Assessor("key", "http://localhost/v1").probeModel("auto", "best-free");
  assert.equal(result.status, "unknown");
});

test("a model every assessment probe was refused for is neither tested nor failed", async () => {
  const sent: string[] = [];
  globalThis.fetch = (async (url: string | URL) => {
    sent.push(String(url));
    return Response.json({ choices: [{ message: { role: "assistant", content: "OK" } }] });
  }) as typeof fetch;
  const assessor = new Assessor("key", "http://localhost/v1");

  const run = await assessor.runAssessment([
    { providerId: "deepseek-web", modelId: "deepseek-v4-pro-think" },
    { providerId: "openai", modelId: "gpt-4.1" },
  ]);
  const refused = assessor.getAssessment("deepseek-web", "deepseek-v4-pro-think");

  assert.equal(sent.length, 2, "only the API-key model was probed (quick + standard)");
  assert.equal(refused?.status, "unknown");
  assert.equal(refused?.consecutiveFails, 0);
  assert.equal(refused?.probeCount, 0);
  assert.equal(run.modelsTested, 1);
  assert.equal(run.modelsPassed, 1);
  assert.equal(run.modelsFailed, 0);

  // Assessing again keeps the refused model out of the failure streak.
  await assessor.assessModel("deepseek-web", "deepseek-v4-pro-think");
  assert.equal(
    assessor.getAssessment("deepseek-web", "deepseek-v4-pro-think")?.consecutiveFails,
    0
  );
});
