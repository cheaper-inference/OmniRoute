import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "agent-guard-block-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../../src/lib/db/core.ts");
const flagsDb = await import("../../../src/lib/db/featureFlags.ts");
const { wouldRefuseAgent } = await import("../../../src/lib/guardrails/agentGuard/enforcement.ts");
const gate = await import("../../../src/sse/handlers/chat/agentGuardGate.ts");
const { isLocalModelPolicyResponse } =
  await import("../../../open-sse/services/resolvedModelAccess.ts");
const { parseModel } = await import("../../../open-sse/services/model.ts");
const { isGuardedProvider } = await import("../../../src/lib/guardrails/agentGuard/policy.ts");
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
// Every gate call gets a capture logger: a call without one writes to the process logger.
const quiet = () => capture().log;
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
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
    assert.equal(
      gate.agentGuardRefusal({ request: req(KILO), provider, log: quiet() })?.status,
      403,
      provider
    );
  assert.equal(gate.agentGuardRefusal({ request: req(KILO), provider: "glm", log: quiet() }), null);
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
    assert.equal(
      gate.agentGuardRefusal({ request: req(CLI), provider: "claude", log: quiet() }),
      null
    );
    assert.equal(
      gate.agentGuardRefusal({
        request: req({ "user-agent": "Anthropic/JS 0.122.0" }),
        provider: "anthropic",
        log: quiet(),
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
    gate.agentGuardRefusal({ request: req(stainless), provider: "claude", log: quiet() })?.status,
    403
  );
});
test("refusal: 403, stable code, neutral message, local-policy mark, no retry hint", async () => {
  setMode("block");
  const res = gate.agentGuardRefusal({
    request: req({ ...KILO, authorization: "Bearer sk-SECRET" }),
    provider: "claude",
    modelStr: "cc/claude-opus-5",
    log: quiet(),
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
    .agentGuardRefusal({
      request: req(KILO),
      provider: "anthropic",
      sourceFormat: "claude",
      log: quiet(),
    })
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
  assert.equal(
    gate.agentGuardRefusal({ request, provider: "claude", apiKeyInfo, log: quiet() })?.status,
    403
  );
});
test("strict: the trusted live test is exempt; a client that only sends the test header is not", () => {
  setMode("block", "true");
  assert.equal(
    gate.agentGuardRefusal({
      request: req(CURL),
      provider: "claude",
      trustedLiveTest: true,
      log: quiet(),
    }),
    null
  );
  assert.equal(
    gate.agentGuardRefusal({
      request: req({ ...CURL, "x-internal-test": "combo-health-check" }),
      provider: "claude",
      log: quiet(),
    })?.status,
    403
  );
  // The fusion judge pre-check takes the same exemption.
  const fusion = {
    name: "f",
    strategy: "fusion",
    models: ["glm/glm-5"],
    config: { judgeModel: "cc/claude-opus-5" },
  };
  assert.equal(
    gate.agentGuardFusionJudgeRefusal({
      request: req(CURL),
      combo: fusion,
      trustedLiveTest: true,
      log: quiet(),
    }),
    null
  );
  assert.equal(
    gate.agentGuardFusionJudgeRefusal({ request: req(CURL), combo: fusion, log: quiet() })?.status,
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
      log: quiet(),
    }),
    null
  );
  assert.equal(
    gate.agentGuardRefusal({ request: req(stripped), provider: "claude", log: quiet() })?.status,
    403
  );
  setMode("block");
  assert.equal(
    gate.agentGuardRefusal({ request: req(stripped), provider: "claude", log: quiet() }),
    null
  );
});
test("fails open: an exception while deciding never refuses and writes exactly one warn line; a broken logger does not change a decision", () => {
  setMode("block", "true");
  const boom = () => {
    throw new Error("boom");
  };
  const broken = { headers: { get: boom } };
  const failOpenLine = ["warn", "AGENT_GUARD", "agent guard failed open", { error: "Error" }];
  const gateLog = capture();
  assert.equal(
    gate.agentGuardRefusal({ request: broken, provider: "claude", log: gateLog.log }),
    null
  );
  assert.deepEqual(gateLog.calls, [failOpenLine]);
  const probeLog = capture();
  assert.equal(
    wouldRefuseAgent({ headers: broken.headers, provider: "claude", log: probeLog.log }),
    false
  );
  assert.deepEqual(probeLog.calls, [failOpenLine]);
  const nullLog = capture();
  assert.equal(
    gate.agentGuardRefusal({ request: null, provider: "claude", log: nullLog.log }),
    null
  );
  assert.deepEqual(nullLog.calls, []);
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
test("fails open: a mode read that throws refuses nothing and writes one warn line with only the error's class name", () => {
  const realEnv = process.env;
  const unreadable = new Proxy(realEnv, {
    get(target, key) {
      if (key === "AGENT_GUARD_MODE") throw new TypeError("mode unreadable sk-SECRET");
      return Reflect.get(target, key);
    },
  });
  const failOpenLine = ["warn", "AGENT_GUARD", "agent guard failed open", { error: "TypeError" }];
  const gateLog = capture();
  const judgeLog = capture();
  process.env = unreadable;
  try {
    assert.equal(
      gate.agentGuardRefusal({ request: req(KILO), provider: "claude", log: gateLog.log }),
      null
    );
    const combo = { strategy: "fusion", config: { judgeModel: "cc/claude-opus-5" } };
    assert.equal(
      gate.agentGuardFusionJudgeRefusal({ request: req(KILO), combo, log: judgeLog.log }),
      null
    );
  } finally {
    process.env = realEnv;
  }
  assert.deepEqual(gateLog.calls, [failOpenLine]);
  assert.deepEqual(judgeLog.calls, [failOpenLine]);
});
test("fails open: a target let through by a failure counts as admitted, so the combo keeps its real error", () => {
  setMode("block");
  let failing = false;
  const request = {
    headers: {
      get: (name: string) => {
        if (failing) throw new Error("boom");
        return (KILO as Record<string, string>)[name.toLowerCase()] ?? null;
      },
    },
  };
  const { calls, log } = capture();
  assert.equal(gate.agentGuardRefusal({ request, provider: "claude", log })?.status, 403);
  failing = true;
  assert.equal(gate.agentGuardRefusal({ request, provider: "anthropic", log }), null);
  assert.deepEqual(
    calls.map((call) => call.slice(0, 3)),
    [
      ["warn", "AGENT_GUARD", "blocked third-party agent kilocode on claude"],
      ["warn", "AGENT_GUARD", "agent guard failed open"],
    ]
  );
  const upstream = Response.json({ error: { message: "upstream down" } }, { status: 502 });
  assert.equal(gate.settleAgentGuardCombo(request, upstream, "openai"), upstream);
});
test("the decision follows the provider it is given, not the model string", () => {
  setMode("block");
  assert.equal(
    gate.agentGuardRefusal({
      request: req(KILO),
      provider: "glm",
      modelStr: "cc/claude-opus-5",
      log: quiet(),
    }),
    null
  );
  assert.equal(
    gate.agentGuardRefusal({
      request: req(KILO),
      provider: "claude",
      modelStr: "glm/glm-5",
      log: quiet(),
    })?.status,
    403
  );
});
test("combo: a check that records no state, as for a shadow target, keeps the policy error", async () => {
  setMode("block");
  const request = req(KILO);
  const { calls, log } = capture();
  gate.agentGuardRefusal({ request, provider: "claude", log: quiet() });
  const shadow = { request, provider: "claude", recordState: false, log };
  assert.equal(gate.agentGuardRefusal(shadow)?.status, 403, "still decided");
  assert.equal(gate.agentGuardRefusal({ ...shadow, provider: "glm" }), null);
  assert.equal(calls.length, 0, "the claude line was already written for this request");
  const settled = gate.settleAgentGuardCombo(
    request,
    Response.json({ error: { message: "all targets were skipped" } }, { status: 503 }),
    "openai"
  );
  assert.deepEqual(
    [settled.status, (await settled.json()).error.code],
    [403, "client_agent_not_allowed"]
  );
  // A shadow check that is the first to see the request still writes its line.
  const fresh = capture();
  gate.agentGuardRefusal({
    request: req(KILO),
    provider: "claude",
    recordState: false,
    log: fresh.log,
  });
  assert.equal(fresh.calls.length, 1);
});
test("combo: the policy error replaces the combo's own error only when a target was refused and none was admitted", async () => {
  setMode("block");
  const allRefused = req(KILO);
  gate.agentGuardRefusal({ request: allRefused, provider: "claude", log: quiet() });
  gate.agentGuardRefusal({ request: allRefused, provider: "anthropic", log: quiet() });
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
  gate.agentGuardRefusal({ request: mixed, provider: "claude", log: quiet() });
  gate.agentGuardRefusal({ request: mixed, provider: "glm", log: quiet() }); // admitted
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
  const settleLog = capture();
  assert.equal(
    gate.settleAgentGuardCombo(onlyClaudeRefused(), outage, "openai", hostile, settleLog.log),
    outage
  );
  assert.deepEqual(
    settleLog.calls.map((call) => call.slice(0, 3)),
    [["warn", "AGENT_GUARD", "agent guard failed open"]]
  );
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
    gate.agentGuardFusionJudgeRefusal({
      request: req(KILO),
      combo: combo("cc/claude-opus-5"),
      log: quiet(),
    })?.status,
    403
  );
  for (const c of [combo("glm/glm-5"), combo(), combo("cc/claude-opus-5", "priority")])
    assert.equal(
      gate.agentGuardFusionJudgeRefusal({ request: req(KILO), combo: c, log: quiet() }),
      null
    );
  assert.equal(
    gate.agentGuardFusionJudgeRefusal({
      request: req(CLI),
      combo: combo("cc/claude-opus-5"),
      log: quiet(),
    }),
    null
  );
  // a judge that is not refused must not count as an admitted target
  const request = req(KILO);
  gate.agentGuardFusionJudgeRefusal({ request, combo: combo("glm/glm-5"), log: quiet() });
  gate.agentGuardRefusal({ request, provider: "claude", log: quiet() });
  assert.equal(
    gate.settleAgentGuardCombo(request, new Response("{}", { status: 503 })).status,
    403
  );
});
test("fusion: a strategy stored with other casing or spaces still gets the judge pre-check", () => {
  setMode("block");
  const refusal = (strategy: string) =>
    gate.agentGuardFusionJudgeRefusal({
      request: req(KILO),
      combo: { strategy, config: { judgeModel: "anthropic/claude-opus-5" } },
      log: quiet(),
    });
  for (const strategy of ["Fusion", " FUSION ", "fusion"]) {
    assert.equal(refusal(strategy)?.status, 403, strategy);
  }
  assert.equal(refusal("priority"), null);
});
test("fusion: the judge is the one the service resolves, combo config over settings.comboDefaults", () => {
  setMode("block");
  const fusion = (config: Record<string, unknown> = {}) => ({
    name: "f",
    strategy: "fusion",
    models: ["glm/glm-5"],
    config,
  });
  const judge = (combo: object, settings?: unknown) =>
    gate.agentGuardFusionJudgeRefusal({ request: req(KILO), combo, settings, log: quiet() })
      ?.status ?? null;
  const claudeDefault = { comboDefaults: { judgeModel: "cc/claude-opus-5" } };
  assert.equal(judge(fusion(), claudeDefault), 403); // judge only in comboDefaults
  assert.equal(judge(fusion({ judgeModel: "glm/glm-5" }), claudeDefault), null); // combo wins
  assert.equal(
    judge(fusion({ judgeModel: "cc/claude-opus-5" }), {
      comboDefaults: { judgeModel: "glm/glm-5" },
    }),
    403
  );
  assert.equal(judge(fusion(), {}), null); // no judge anywhere
  assert.equal(judge(fusion(), undefined), null);
  // The service resolves the setup config without a provider: overrides never reach the judge.
  const override = { providerOverrides: { glm: { judgeModel: "cc/claude-opus-5" } } };
  assert.equal(judge(fusion(), override), null);
});
test("fusion: a judge's provider is read the way dispatch parses a target's model string", () => {
  setMode("block");
  for (const judgeModel of [
    "anthropic/claude-opus-5",
    "cc/claude-opus-5",
    "claude/claude-opus-5",
    "anthropic/claude-opus-5[1m]",
    "no-think/anthropic/claude-opus-5", // dispatch resolves the `no-think` provider: not Claude
    "claude-opus-5", // bare: dispatch needs provider inference, left to the dispatch gate
    "glm/glm-5",
  ]) {
    const combo = { name: "f", strategy: "fusion", models: ["glm/glm-5"], config: { judgeModel } };
    const refused = gate.agentGuardFusionJudgeRefusal({ request: req(KILO), combo, log: quiet() });
    assert.equal(refused !== null, isGuardedProvider(parseModel(judgeModel).provider), judgeModel);
  }
});
