import test from "node:test";
import assert from "node:assert/strict";
const core = await import("../../../src/lib/db/core.ts");
const flagsDb = await import("../../../src/lib/db/featureFlags.ts");
const { wouldRefuseAgent } = await import("../../../src/lib/guardrails/agentGuard/enforcement.ts");
const gate = await import("../../../src/sse/handlers/chat/agentGuardGate.ts");
const { isLocalModelPolicyResponse } =
  await import("../../../open-sse/services/resolvedModelAccess.ts");
const MESSAGE =
  "This request was refused because the selected model is restricted to official Anthropic clients on this server.";
const KILO = { "user-agent": "Kilo-Code/4.2.1", "x-title": "Kilo Code" };
const CLI = {
  "user-agent": "claude-cli/2.1.80 (external, cli)",
  "x-app": "cli",
  "anthropic-beta": "oauth-2025-04-20",
};
const CURL = { "user-agent": "curl/8.5.0" };
function capture() {
  const calls: unknown[][] = [];
  const push =
    (level: string) =>
    (...args: unknown[]) =>
      void calls.push([level, ...args]);
  return { calls, log: { debug() {}, error() {}, info: push("info"), warn: push("warn") } };
}
const req = (headers: Record<string, string>) =>
  new Request("http://localhost/v1/chat/completions", { method: "POST", headers });
const setMode = (mode: string, strict = "false") => {
  process.env.AGENT_GUARD_MODE = mode;
  process.env.AGENT_GUARD_STRICT = strict;
};
test.after(() => {
  delete process.env.AGENT_GUARD_MODE;
  delete process.env.AGENT_GUARD_STRICT;
  flagsDb.clearAllFeatureFlagOverrides();
  core.resetDbInstance();
});
test("off and monitor: no header is read, nothing is refused, nothing is logged", () => {
  for (const mode of ["off", "monitor"]) {
    setMode(mode, "true");
    let reads = 0;
    const request = { headers: { get: () => (reads++, "Kilo-Code/4.2.1") } };
    const { calls, log } = capture();
    assert.equal(
      gate.agentGuardRefusal({ request, provider: "claude", modelStr: "cc/claude-opus-5", log }),
      null
    );
    assert.equal(wouldRefuseAgent({ headers: request.headers, provider: "claude" }), false);
    assert.deepEqual([reads, calls.length], [0, 0], mode);
  }
});
test("block: a third-party agent is refused on claude, anthropic and the cc alias; never on another provider", () => {
  setMode("block");
  for (const provider of ["claude", "anthropic", "cc"])
    assert.equal(gate.agentGuardRefusal({ request: req(KILO), provider })?.status, 403, provider);
  assert.equal(gate.agentGuardRefusal({ request: req(KILO), provider: "glm" }), null);
  assert.deepEqual(
    [
      wouldRefuseAgent({ headers: KILO }),
      wouldRefuseAgent({ headers: KILO, provider: "glm" }),
      wouldRefuseAgent({ headers: CLI }),
    ],
    [true, false, false]
  );
});
test("block: an official client is never refused, with or without strict", () => {
  for (const strict of ["false", "true"]) {
    setMode("block", strict);
    assert.equal(gate.agentGuardRefusal({ request: req(CLI), provider: "claude" }), null);
    assert.equal(
      gate.agentGuardRefusal({
        request: req({ "user-agent": "Anthropic/JS 0.122.0" }),
        provider: "anthropic",
      }),
      null
    );
  }
});
test("block: x-stainless-* alone is unidentified: logged without strict, refused with strict", () => {
  const stainless = {
    "user-agent": "node-fetch/3.3",
    "x-stainless-lang": "js",
    "x-stainless-package-version": "1.2.3",
  };
  setMode("block");
  const { calls, log } = capture();
  assert.equal(gate.agentGuardRefusal({ request: req(stainless), provider: "claude", log }), null);
  assert.deepEqual(calls[0].slice(0, 3), ["info", "AGENT_GUARD", "unidentified agent on claude"]);
  setMode("block", "true");
  assert.equal(
    gate.agentGuardRefusal({ request: req(stainless), provider: "claude" })?.status,
    403
  );
});
test("refusal: 403, stable code, neutral message, local-policy mark, no retry hint", async () => {
  setMode("block");
  const res = gate.agentGuardRefusal({
    request: req({ ...KILO, authorization: "Bearer sk-SECRET" }),
    provider: "claude",
    modelStr: "cc/claude-opus-5",
  });
  assert.ok(res);
  const body = await res.json();
  assert.deepEqual(
    [res.status, res.headers.get("content-type"), res.headers.get("retry-after")],
    [403, "application/json", null]
  );
  assert.deepEqual(Object.keys(body), ["error"]);
  assert.deepEqual(
    [body.error.type, body.error.code, body.error.message],
    ["permission_error", "client_agent_not_allowed", MESSAGE]
  );
  assert.doesNotMatch(JSON.stringify(body), /kilo|claude-opus|cc\/|SECRET|\bat \//i);
  assert.equal(isLocalModelPolicyResponse(res), true);
  for (const token of [
    "request not allowed",
    "rate limit",
    "too many requests",
    "quota",
    "credit",
    "balance",
    "capacity",
    "overloaded",
    "no credentials",
  ])
    assert.equal(MESSAGE.toLowerCase().includes(token), false, token);
});
test("refusal: Anthropic envelope when the request came in Anthropic format", async () => {
  setMode("block");
  const body = await gate
    .agentGuardRefusal({ request: req(KILO), provider: "anthropic", sourceFormat: "claude" })
    ?.json();
  assert.deepEqual(
    [body.type, body.error.type, body.error.code, body.error.message],
    ["error", "permission_error", "client_agent_not_allowed", MESSAGE]
  );
});
test("log: one line per request and provider, the fields monitor logs, no secret; a retried request logs again", () => {
  setMode("block");
  const { calls, log } = capture();
  const target = {
    request: req({ ...KILO, authorization: "Bearer sk-SECRET", cookie: "s=SECRET" }),
    provider: "claude",
    modelStr: "cc/claude-opus-5",
    apiKeyInfo: { id: "key-1", key: "sk-SECRET" },
    log,
  };
  gate.agentGuardRefusal(target);
  gate.agentGuardRefusal(target); // pre-flight and dispatch of the same request
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].slice(0, 3), [
    "warn",
    "AGENT_GUARD",
    "blocked third-party agent kilocode on claude",
  ]);
  assert.deepEqual(calls[0][3], {
    agent: "kilocode",
    thirdParty: true,
    provider: "claude",
    model: "cc/claude-opus-5",
    apiKeyId: "key-1",
    userAgent: "Kilo-Code/4.2.1",
    xApp: "",
    anthropicBeta: "",
    xTitle: "Kilo Code",
    referer: "",
    stainless: false,
  });
  assert.doesNotMatch(JSON.stringify(calls), /SECRET/);
  assert.equal(gate.agentGuardRefusal({ ...target, request: req(KILO) })?.status, 403);
  assert.equal(calls.length, 2);
});
test("not client-disableable: no disable channel reaches the gate, including the key setting", () => {
  setMode("block");
  const request = req({
    ...KILO,
    "x-omniroute-disabled-guardrails": "agent-guard",
    "x-disabled-guardrails": "agent-guard",
  });
  const apiKeyInfo = { id: "key-1", disabledGuardrails: ["agent-guard"] };
  assert.equal(gate.agentGuardRefusal({ request, provider: "claude", apiKeyInfo })?.status, 403);
});
test("strict: the trusted live test is exempt; a client that only sends the test header is not", () => {
  setMode("block", "true");
  assert.equal(
    gate.agentGuardRefusal({ request: req(CURL), provider: "claude", trustedLiveTest: true }),
    null
  );
  assert.equal(
    gate.agentGuardRefusal({
      request: req({ ...CURL, "x-internal-test": "combo-health-check" }),
      provider: "claude",
    })?.status,
    403
  );
});
test("a proxy that rewrites User-Agent: Claude Code stays official by x-app and anthropic-beta; with every marker stripped only strict refuses", () => {
  const stripped = { "user-agent": "Mozilla/5.0 (corp-proxy)" };
  setMode("block", "true");
  assert.equal(
    gate.agentGuardRefusal({
      request: req({ ...stripped, "x-app": "cli", "anthropic-beta": "oauth-2025-04-20" }),
      provider: "claude",
    }),
    null
  );
  assert.equal(gate.agentGuardRefusal({ request: req(stripped), provider: "claude" })?.status, 403);
  setMode("block");
  assert.equal(gate.agentGuardRefusal({ request: req(stripped), provider: "claude" }), null);
});
test("fails open: an exception while deciding never refuses; a broken logger does not change a decision", () => {
  setMode("block", "true");
  const boom = () => {
    throw new Error("boom");
  };
  const broken = { headers: { get: boom } };
  assert.equal(gate.agentGuardRefusal({ request: broken, provider: "claude" }), null);
  assert.equal(wouldRefuseAgent({ headers: broken.headers, provider: "claude" }), false);
  assert.equal(gate.agentGuardRefusal({ request: null, provider: "claude" }), null);
  assert.equal(
    gate.agentGuardRefusal({
      request: req(KILO),
      provider: "claude",
      log: { warn: boom, info: boom },
    })?.status,
    403
  );
  const upstream = new Response("{}", { status: 502 });
  assert.equal(gate.settleAgentGuardCombo(broken, upstream), upstream);
});
test("combo: the policy error replaces the combo's own error only when a target was refused and none was admitted", async () => {
  setMode("block");
  const allRefused = req(KILO);
  gate.agentGuardRefusal({ request: allRefused, provider: "claude" });
  gate.agentGuardRefusal({ request: allRefused, provider: "anthropic" });
  const settled = gate.settleAgentGuardCombo(
    allRefused,
    Response.json({ error: { message: "all targets were skipped" } }, { status: 503 }),
    "openai"
  );
  assert.deepEqual(
    [settled.status, (await settled.json()).error.code, settled.headers.get("retry-after")],
    [403, "client_agent_not_allowed", null]
  );
  const mixed = req(KILO);
  gate.agentGuardRefusal({ request: mixed, provider: "claude" });
  gate.agentGuardRefusal({ request: mixed, provider: "glm" }); // admitted
  const upstream = Response.json({ error: { message: "upstream down" } }, { status: 502 });
  assert.equal(gate.settleAgentGuardCombo(mixed, upstream, "openai"), upstream);
  const ok = new Response("{}", { status: 200 });
  assert.equal(gate.settleAgentGuardCombo(allRefused, ok, "openai"), ok);
  assert.equal(gate.settleAgentGuardCombo(req(CLI), upstream, "openai"), upstream);
  // A top-level entry that names a provider outside the guard may have been skipped for an
  // unrelated reason (breaker, cooldown, lockout) before the gate saw it: keep the combo's error.
  const CLAUDE = "cc/claude-opus-5";
  const OTHER = "glm/glm-5";
  const onlyClaudeRefused = () => {
    const request = req(KILO);
    gate.agentGuardRefusal({ request, provider: "claude", log: capture().log });
    return request;
  };
  const settle = (models: unknown[] | undefined) => {
    const outage = Response.json(
      { error: { message: "all targets cooling down" } },
      { status: 503 }
    );
    const combo = models === undefined ? undefined : { name: "c", models };
    const out = gate.settleAgentGuardCombo(onlyClaudeRefused(), outage, "openai", combo);
    return out === outage ? 503 : out.status;
  };
  assert.equal(settle([CLAUDE, OTHER]), 503);
  assert.equal(settle([{ model: CLAUDE }, { model: OTHER }]), 503);
  assert.equal(settle([CLAUDE, "cc/claude-opus-5"]), 403);
  assert.equal(settle([CLAUDE, "claude-opus-5"]), 403); // bare id: unknown, the base rule decides
  assert.equal(settle(undefined), 403); // no combo: the base rule decides
  // Prefixes that are not providers (a namespaced model id, a modifier prefix, a combo name
  // with a slash) are unknown, not "outside the guard".
  assert.equal(settle([CLAUDE, "deepseek-ai/DeepSeek-V3"]), 403);
  assert.equal(settle([CLAUDE, "no-think/claude-opus-5"]), 403);
  assert.equal(settle([CLAUDE, "team/fast-mix"]), 403);
  assert.equal(settle([CLAUDE, { kind: "combo-ref", comboName: "other" }, 7, null]), 403);
  // Stored steps name their provider in `providerId` (an alias such as `cc` resolves), which
  // wins over the model string; a non-string or unregistered providerId is unknown.
  const anthropicStep = { providerId: "anthropic", model: "claude-opus-5" };
  assert.equal(settle([anthropicStep, { providerId: "glm", model: "glm-5" }]), 503);
  assert.equal(settle([anthropicStep, { providerId: "cc", model: "claude-opus-5" }]), 403);
  assert.equal(settle([anthropicStep, { providerId: 7, model: "glm-5" }]), 403);
  assert.equal(settle([anthropicStep, { providerId: "not-a-provider", model: "glm-5" }]), 403);
  assert.equal(settle([anthropicStep, { providerId: "not-a-provider", model: OTHER }]), 403);
  assert.equal(settle([anthropicStep, { providerId: "openrouter", model: "anthropic/x" }]), 503);
  assert.equal(settle([anthropicStep, { kind: "provider-wildcard", providerId: "glm" }]), 503);
  assert.equal(settle([anthropicStep, { provider: "glm", model: "glm-5" }]), 503);
  // Inspecting the combo fails open: an exception returns the response it was given.
  const hostile = {
    get models(): unknown[] {
      throw new Error("boom");
    },
  };
  const outage = new Response("{}", { status: 503 });
  assert.equal(gate.settleAgentGuardCombo(onlyClaudeRefused(), outage, "openai", hostile), outage);
});
test("fusion: a judge the guard would refuse fails the request before the panel fans out", () => {
  setMode("block");
  const combo = (judgeModel?: string, strategy = "fusion") => ({
    name: "f",
    strategy,
    models: ["glm/glm-5"],
    config: judgeModel ? { judgeModel } : {},
  });
  assert.equal(
    gate.agentGuardFusionJudgeRefusal({ request: req(KILO), combo: combo("cc/claude-opus-5") })
      ?.status,
    403
  );
  for (const c of [combo("glm/glm-5"), combo(), combo("cc/claude-opus-5", "priority")])
    assert.equal(gate.agentGuardFusionJudgeRefusal({ request: req(KILO), combo: c }), null);
  assert.equal(
    gate.agentGuardFusionJudgeRefusal({ request: req(CLI), combo: combo("cc/claude-opus-5") }),
    null
  );
  // a judge that is not refused must not count as an admitted target
  const request = req(KILO);
  gate.agentGuardFusionJudgeRefusal({ request, combo: combo("glm/glm-5") });
  gate.agentGuardRefusal({ request, provider: "claude" });
  assert.equal(
    gate.settleAgentGuardCombo(request, new Response("{}", { status: 503 })).status,
    403
  );
});
