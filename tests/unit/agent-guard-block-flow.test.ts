/**
 * Agent guard `block` mode through the real chat pipeline.
 *
 * The refusal is decided where a target is dispatched, on the provider the request
 * resolved to, so every way of naming a Claude model meets it: a provider prefix, an
 * alias, a bare id, a routing header, a combo target and a fusion judge. Nothing a
 * client sends switches it off, and a refusal never counts as a provider failure.
 */

import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("agent-guard-block-flow");
const { clearAllModelLockouts, getAllModelLockouts } =
  await import("../../open-sse/services/accountFallback.ts");
const { getAllCircuitBreakerStatuses, getCircuitBreaker } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { SELF_HOP_HEADER, ownListenerSelfHopToken } =
  await import("../../open-sse/utils/selfHop.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const {
  BaseExecutor,
  buildClaudeResponse,
  buildOpenAIResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;

const KILO = { "user-agent": "Kilo-Code/4.2.1", "x-title": "Kilo Code" };
const CLI = {
  "user-agent": "claude-cli/2.1.80 (external, cli)",
  "x-app": "cli",
  "anthropic-beta": "oauth-2025-04-20",
};
const CURL = { "user-agent": "curl/8.5.0" };

const CLAUDE = "anthropic/claude-opus-5";
const BARE = "claude-opus-5";
const OTHER = "openai/gpt-4.1";
const OTHER2 = "openai/gpt-4.1-mini";
const OTHER3 = "openai/gpt-4.1-nano";
// Groq always answers 503: a failing step on a connection no OpenAI target shares.
const FAILING = "groq/llama-3.3-70b-versatile";

const originalFetch = globalThis.fetch;
const calls: string[] = [];
// The model of every OpenAI call.
const openaiModels: string[] = [];
function requestedModel(init?: RequestInit): string {
  try {
    return String(JSON.parse(String(init?.body)).model);
  } catch {
    return "";
  }
}
/** Host of an upstream call, so each stub answers one provider and nothing that merely contains its name. */
function upstreamHost(url: unknown): string {
  try {
    return new URL(String(url)).hostname;
  } catch {
    return "";
  }
}
function stubUpstreams() {
  calls.length = 0;
  openaiModels.length = 0;
  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const host = upstreamHost(url);
    if (host === "api.anthropic.com") {
      calls.push("anthropic");
      return buildClaudeResponse("from-anthropic", "claude-opus-5");
    }
    if (host === "api.openai.com") {
      calls.push("openai");
      openaiModels.push(requestedModel(init));
      return buildOpenAIResponse("from-openai", "gpt-4.1");
    }
    if (host === "api.groq.com") {
      calls.push("groq");
      return Response.json(
        { error: { message: "Service unavailable", type: "server_error" } },
        { status: 503 }
      );
    }
    return Response.json({ data: [] });
  }) as typeof fetch;
}
const chat = (
  model: string,
  headers: Record<string, string>,
  extra: Record<string, unknown> = {},
  url?: string
) => {
  stubUpstreams();
  const body = {
    model,
    messages: [{ role: "user", content: `Reply with OK only. ${crypto.randomUUID()}` }],
    max_tokens: 16,
    stream: false,
    ...extra,
  };
  return handleChat(buildRequest({ url, headers, body }));
};
const codeOf = async (res: Response) =>
  (
    await res
      .clone()
      .json()
      .catch(() => null)
  )?.error?.code ?? null;
const tried = () => [...new Set(calls)];
const REFUSED = [403, "client_agent_not_allowed", []];
const block = (strict = "false") => {
  process.env.AGENT_GUARD_MODE = "block";
  process.env.AGENT_GUARD_STRICT = strict;
};

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  clearAllModelLockouts();
  await settingsDb.updateSettings({ requestRetry: 0 });
  await seedConnection("anthropic");
  await seedConnection("openai");
});

test.afterEach(async () => {
  delete process.env.AGENT_GUARD_MODE;
  delete process.env.AGENT_GUARD_STRICT;
  globalThis.fetch = originalFetch;
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("off and monitor: a third-party client still reaches Claude on prefixed and bare ids", async () => {
  for (const mode of [undefined, "monitor"]) {
    if (mode) process.env.AGENT_GUARD_MODE = mode;
    for (const model of [CLAUDE, BARE]) {
      const res = await chat(model, KILO);
      assert.deepEqual([res.status, tried()], [200, ["anthropic"]], `${mode}/${model}`);
    }
  }
});

test("block: every way of naming a Claude model is refused before any upstream call", async () => {
  block();
  const shapes: Array<[string, Record<string, string>]> = [
    [CLAUDE, {}],
    ["cc/claude-opus-5", {}],
    ["claude/claude-opus-5", {}],
    [BARE, {}],
    [`no-think/${CLAUDE}`, {}],
    [OTHER, { "x-route-model": CLAUDE }],
  ];
  for (const [model, extraHeaders] of shapes) {
    const res = await chat(model, { ...KILO, ...extraHeaders });
    assert.deepEqual([res.status, await codeOf(res), tried()], REFUSED, model);
  }
});

test("block: no per-request disable channel switches the refusal off", async () => {
  block();
  const channels: Array<[Record<string, string>, Record<string, unknown>]> = [
    [{ "x-omniroute-disabled-guardrails": "agent-guard" }, {}],
    [{ "x-disabled-guardrails": "agent-guard" }, {}],
    [{}, { disabledGuardrails: ["agent-guard"] }],
    [{}, { metadata: { disabledGuardrails: ["agent-guard"] } }],
  ];
  for (const [headers, extra] of channels) {
    const res = await chat(CLAUDE, { ...KILO, ...headers }, extra);
    assert.deepEqual(
      [res.status, await codeOf(res), tried()],
      REFUSED,
      JSON.stringify([headers, extra])
    );
  }
});

test("block: an official client is served in both modes; an unidentified one only without strict", async () => {
  for (const strict of ["false", "true"]) {
    block(strict);
    assert.deepEqual([(await chat(CLAUDE, CLI)).status, tried()], [200, ["anthropic"]], strict);
  }
  block();
  assert.equal((await chat(CLAUDE, CURL)).status, 200);
  block("true");
  assert.deepEqual([(await chat(CLAUDE, CURL)).status, tried()], [403, []]);
  assert.equal((await chat(OTHER, KILO)).status, 200); // other providers are never gated
});

test("block: streaming and non-streaming refusals are the same JSON 403, without a retry hint", async () => {
  block();
  for (const stream of [false, true]) {
    const res = await chat(CLAUDE, KILO, { stream });
    assert.deepEqual(
      [
        res.status,
        res.headers.get("content-type"),
        res.headers.get("retry-after"),
        await codeOf(res),
      ],
      [403, "application/json", null, "client_agent_not_allowed"],
      String(stream)
    );
  }
});

test("block: the Anthropic-format and Responses routes are gated, each in its own envelope", async () => {
  block();
  const messages = await chat(CLAUDE, KILO, {}, "http://localhost/v1/messages");
  const body = await messages.clone().json();
  assert.deepEqual(
    [messages.status, body.type, body.error.type, body.error.code, tried()],
    [403, "error", "permission_error", "client_agent_not_allowed", []]
  );
  stubUpstreams();
  const responses = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      headers: KILO,
      body: { model: CLAUDE, input: "Reply with OK only." },
    })
  );
  assert.deepEqual([responses.status, await codeOf(responses), tried()], REFUSED);
});

test("block: a mixed combo skips its Claude target and answers from the next one", async () => {
  await combosDb.createCombo({
    name: "guard-mixed",
    strategy: "priority",
    models: [CLAUDE, OTHER],
  });
  block();
  const res = await chat("guard-mixed", KILO);
  assert.deepEqual([res.status, tried()], [200, ["openai"]]);
  assert.deepEqual([(await chat("guard-mixed", CLI)).status, tried()], [200, ["anthropic"]]);
});

test("block: a refused protected priority target is skipped and the next step answers", async () => {
  await combosDb.createCombo({
    name: "guard-protected",
    strategy: "priority",
    models: [
      {
        kind: "model",
        providerId: "anthropic",
        model: CLAUDE,
        fallbackOnlyOnQuotaExhaustion: true,
      },
      OTHER,
    ],
  });
  block();
  const res = await chat("guard-protected", KILO);
  assert.deepEqual([res.status, tried()], [200, ["openai"]], String(await codeOf(res)));
  assert.equal(getCircuitBreaker("anthropic").getStatus().failureCount, 0);
});

test("block: an unguarded shadow target leaves the foreground refusal as the policy error", async () => {
  await combosDb.createCombo({
    name: "guard-shadow",
    strategy: "priority",
    models: [CLAUDE],
    config: { shadowRouting: { enabled: true, targets: [OTHER] } },
  });
  block();
  const res = await chat("guard-shadow", KILO);
  assert.deepEqual([res.status, await codeOf(res)], [403, "client_agent_not_allowed"]);
  // The shadow copy runs in the background: wait for it so it ends inside this test.
  for (let i = 0; i < 250 && !calls.includes("openai"); i++) {
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  assert.deepEqual(tried(), ["openai"], "the shadow target was dispatched");
});

test("block: a combo of only Claude targets fails with the policy error, and so does the retry", async () => {
  await combosDb.createCombo({
    name: "guard-claude-only",
    strategy: "priority",
    models: [CLAUDE, "cc/claude-opus-5"],
  });
  block();
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await chat("guard-claude-only", KILO);
    assert.deepEqual([res.status, await codeOf(res), tried()], REFUSED, String(attempt));
    assert.deepEqual(
      [
        res.headers.get("retry-after"),
        (await res.clone().json()).error.message.includes("anthropic/"),
      ],
      [null, false]
    );
  }
});

test("block: a mixed combo whose other target is cooling down keeps the combo's own error", async () => {
  // The other step is pinned to its connection, so the attempt loop skips it for the
  // persisted cooldown. The combo's pre-screen still runs its pre-flight first (the guard
  // admits it there); the open-breaker test below covers a target the guard never sees.
  const [openai] = await providersDb.getProviderConnections({ provider: "openai" });
  const connectionId = String(openai.id);
  await providersDb.updateProviderConnection(connectionId, {
    rateLimitedUntil: new Date(Date.now() + 10 * 60_000).toISOString(),
  });
  await combosDb.createCombo({
    name: "guard-mixed-cooldown",
    strategy: "priority",
    models: [CLAUDE, { kind: "model", providerId: "openai", model: OTHER, connectionId }],
  });
  block();
  const res = await chat("guard-mixed-cooldown", KILO);
  const code = await codeOf(res);
  assert.deepEqual([res.ok, tried()], [false, []]);
  assert.notEqual(res.status, 403, String(code));
  assert.notEqual(code, "client_agent_not_allowed");
});

test("block: a mixed combo whose other provider's breaker is open keeps the combo's own error", async () => {
  // An open breaker skips the other target before any pre-flight, so the guard never admits
  // it: only the combo's own entries tell the gate that the outage, not the refusal, decided.
  await combosDb.createCombo({
    name: "guard-mixed-open",
    strategy: "priority",
    models: [CLAUDE, OTHER],
  });
  // Without this the combo waits out a short breaker reset and then dispatches the target.
  await settingsDb.updateSettings({
    resilienceSettings: { comboCooldownWait: { enabled: false } },
  });
  const breaker = getCircuitBreaker("openai");
  for (let i = 0; i < 50 && breaker.getStatus().state !== "OPEN"; i++) breaker._onFailure();
  assert.equal(breaker.getStatus().state, "OPEN");
  block();
  const res = await chat("guard-mixed-open", KILO);
  const code = await codeOf(res);
  assert.deepEqual([res.ok, tried()], [false, []]);
  assert.notEqual(res.status, 403, String(code));
  assert.notEqual(code, "client_agent_not_allowed");
  // The same combo with only Claude targets still answers the policy error.
  await combosDb.createCombo({
    name: "guard-claude-pair",
    strategy: "priority",
    models: [CLAUDE, "cc/claude-opus-5"],
  });
  const refused = await chat("guard-claude-pair", KILO);
  assert.deepEqual([refused.status, await codeOf(refused), tried()], REFUSED);
});

test("block: fusion drops a refused panel member, and a refused judge stops the request before the fan-out", async () => {
  await combosDb.createCombo({
    name: "guard-fusion-panel",
    strategy: "fusion",
    models: [CLAUDE, OTHER, OTHER2],
  });
  await combosDb.createCombo({
    name: "guard-fusion-judge",
    strategy: "fusion",
    models: [OTHER, OTHER2],
    config: { judgeModel: CLAUDE },
  });
  block();
  const panel = await chat("guard-fusion-panel", KILO);
  assert.deepEqual([panel.status, tried()], [200, ["openai"]]);
  const judge = await chat("guard-fusion-judge", KILO);
  assert.deepEqual([judge.status, await codeOf(judge), tried()], REFUSED);
});

test("block: a judge set only in comboDefaults is refused before any panel member is dispatched", async () => {
  await settingsDb.updateSettings({ comboDefaults: { judgeModel: CLAUDE } });
  await combosDb.createCombo({
    name: "guard-fusion-default-judge",
    strategy: "fusion",
    models: [OTHER, OTHER2],
  });
  block();
  const res = await chat("guard-fusion-default-judge", KILO);
  assert.deepEqual(
    [res.status, await codeOf(res), calls.length],
    [403, "client_agent_not_allowed", 0]
  );
});

test("block: judge spellings left to dispatch: a no-think judge never reaches Claude, a bare one is refused after the panel", async () => {
  await combosDb.createCombo({
    name: "guard-fusion-no-think-judge",
    strategy: "fusion",
    models: [OTHER, OTHER2],
    config: { judgeModel: `no-think/${CLAUDE}` },
  });
  await combosDb.createCombo({
    name: "guard-fusion-bare-judge",
    strategy: "fusion",
    models: [OTHER, OTHER2],
    config: { judgeModel: BARE },
  });
  block();
  await chat("guard-fusion-no-think-judge", KILO);
  assert.deepEqual(tried(), ["openai"]);
  const bare = await chat("guard-fusion-bare-judge", KILO);
  assert.deepEqual(
    [bare.status, await codeOf(bare), tried()],
    [403, "client_agent_not_allowed", ["openai"]]
  );
});

test("block: a fusion combo reached through the safety-net redirect has its judge checked before the fan-out", async () => {
  // The global fallback model names an `auto/…` combo: resolveModelOrError hands it to the
  // safety-net redirect in handleSingleModelChat, which runs it as a combo of its own.
  await combosDb.createCombo({
    name: "auto/guard-net-fusion",
    strategy: "fusion",
    models: [OTHER, OTHER3],
    config: { judgeModel: CLAUDE },
  });
  const groq = await seedConnection("groq");
  // The outer step fails on its own Groq connection, once: `maxRetries: 0` skips the retry delay.
  await combosDb.createCombo({
    name: "guard-net-outer",
    strategy: "priority",
    models: [FAILING],
    config: { maxRetries: 0 },
  });
  await settingsDb.updateSettings({ globalFallbackModel: "auto/guard-net-fusion" });
  // Guard off: the redirect runs the fallback combo, both panel members and its judge.
  const open = await chat("guard-net-outer", KILO);
  assert.deepEqual(
    [open.status, calls.includes("groq"), [...openaiModels].sort(), calls.includes("anthropic")],
    [200, true, ["gpt-4.1", "gpt-4.1-nano"], true],
    JSON.stringify([open.status, calls, openaiModels])
  );
  // The 503 cooled the Groq connection down: clear it so the outer step runs again.
  await providersDb.updateProviderConnection(String(groq.id), {
    rateLimitedUntil: null,
    backoffLevel: 0,
    testStatus: "active",
  });
  clearAllModelLockouts();
  block();
  const res = await chat("guard-net-outer", KILO);
  // Claude never called, and no panel member of the fallback fusion combo dispatched.
  assert.deepEqual(
    [calls.includes("anthropic"), openaiModels],
    [false, []],
    JSON.stringify([res.status, calls, openaiModels])
  );
  assert.ok(calls.includes("groq"), JSON.stringify(calls)); // outer ran
  assert.equal(res.ok, false);
});

test("block + strict: the trusted live test keeps its exemption through the safety-net redirect", async () => {
  await combosDb.createCombo({
    name: "auto/guard-net-live",
    strategy: "fusion",
    models: [OTHER, OTHER3],
    config: { judgeModel: CLAUDE },
  });
  await seedConnection("groq");
  await combosDb.createCombo({
    name: "guard-net-live-outer",
    strategy: "priority",
    models: [FAILING],
    config: { maxRetries: 0 },
  });
  await settingsDb.updateSettings({ globalFallbackModel: "auto/guard-net-live" });
  block("true");
  const trusted = {
    "x-internal-test": "combo-health-check",
    [SELF_HOP_HEADER]: ownListenerSelfHopToken(),
  };
  const res = await chat("guard-net-live-outer", trusted);
  // The outer step failed, both panel members of the fallback fusion combo ran, and its judge.
  assert.deepEqual(
    [res.status, calls.includes("groq"), [...openaiModels].sort(), calls.includes("anthropic")],
    [200, true, ["gpt-4.1", "gpt-4.1-nano"], true],
    JSON.stringify([res.status, await codeOf(res), calls, openaiModels])
  );
});

test("block + strict: the trusted live test still reaches a Claude target and judge; the forged test header does not", async () => {
  await combosDb.createCombo({
    name: "guard-live-test",
    strategy: "fusion",
    models: [OTHER, OTHER2],
    config: { judgeModel: CLAUDE },
  });
  block("true");
  const trusted = {
    "x-internal-test": "combo-health-check",
    [SELF_HOP_HEADER]: ownListenerSelfHopToken(),
  };
  const live = await chat("guard-live-test", trusted);
  assert.deepEqual([live.status, tried().includes("anthropic")], [200, true]);
  const direct = await chat(CLAUDE, trusted);
  assert.deepEqual([direct.status, tried()], [200, ["anthropic"]]);
  const forged = await chat(CLAUDE, { "x-internal-test": "combo-health-check" });
  assert.deepEqual([forged.status, await codeOf(forged), tried()], REFUSED);
});

test("block: refusals leave breaker, connection cooldown and model lockout state untouched", async () => {
  const snapshot = async () =>
    JSON.stringify([
      getAllCircuitBreakerStatuses(),
      getAllModelLockouts(),
      (await providersDb.getProviderConnections({})).map((c) => [
        c.id,
        c.rateLimitedUntil ?? null,
        c.testStatus ?? null,
        c.backoffLevel ?? null,
      ]),
    ]);
  await combosDb.createCombo({
    name: "guard-claude-only",
    strategy: "priority",
    models: [CLAUDE, "cc/claude-opus-5"],
  });
  const before = await snapshot();
  block();
  for (let i = 0; i < 6; i++) assert.equal((await chat(CLAUDE, KILO)).status, 403);
  assert.equal(await snapshot(), before);
  // Through a combo: before its pre-flight, the combo reads each target's breaker status,
  // which registers a CLOSED breaker for it. The refusals must record no failure on it.
  for (let i = 0; i < 6; i++) assert.equal((await chat("guard-claude-only", KILO)).status, 403);
  const [breakers, ...rest] = JSON.parse(await snapshot());
  assert.deepEqual(rest, JSON.parse(before).slice(1));
  for (const breaker of breakers)
    assert.deepEqual(
      [breaker.state, breaker.failureCount, breaker.lastFailureKind, breaker.kindFailureCounts],
      ["CLOSED", 0, null, {}],
      breaker.name
    );
  assert.deepEqual([(await chat(CLAUDE, CLI)).status, tried()], [200, ["anthropic"]]);
  assert.deepEqual([(await chat("guard-claude-only", CLI)).status, tried()], [200, ["anthropic"]]);
});
