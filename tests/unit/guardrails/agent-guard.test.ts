import test from "node:test";
import assert from "node:assert/strict";

const { classifyClientAgent } =
  await import("../../../src/lib/guardrails/agentGuard/classifier.ts");
const { providerFromModelString, evaluateAgentPolicy } =
  await import("../../../src/lib/guardrails/agentGuard/policy.ts");
const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../../src/shared/constants/featureFlagDefinitions.ts");
const core = await import("../../../src/lib/db/core.ts");
const flagsDb = await import("../../../src/lib/db/featureFlags.ts");
const { AgentGuardGuardrail } = await import("../../../src/lib/guardrails/agentGuard/guardrail.ts");
const { resolveAgentGuardMode, isAgentGuardStrict } =
  await import("../../../src/lib/guardrails/agentGuard/settings.ts");
const { GuardrailRegistry } = await import("../../../src/lib/guardrails/registry.ts");

const kind = (h: Parameters<typeof classifyClientAgent>[0]) => {
  const c = classifyClientAgent(h);
  return [c.agent, c.official, c.thirdParty];
};

test("classifier: Claude Code CLI and official SDK user-agents are official", () => {
  const cli = {
    "user-agent": "claude-cli/2.1.80 (external, cli)",
    "x-app": "cli",
    "anthropic-beta": "oauth-2025-04-20",
  };
  assert.deepEqual(kind(cli), ["claude-code", true, false]);
  for (const ua of [
    "Anthropic/JS 0.122.0",
    "anthropic-typescript/0.39.0",
    "anthropic-python/0.40.0",
    "Anthropic/Python 2.11.0",
    "AsyncAnthropic/Python 2.11.0",
  ])
    assert.deepEqual(
      kind({ "user-agent": ua, "x-stainless-lang": "js" }),
      ["anthropic-sdk", true, false],
      ua
    );
});

test("classifier: x-stainless-* alone is not official", () => {
  const c = classifyClientAgent({
    "user-agent": "node-fetch/3.3",
    "x-stainless-lang": "js",
    "x-stainless-package-version": "1.2.3",
  });
  assert.deepEqual(
    [c.agent, c.official, c.thirdParty, c.signals.stainless],
    ["unknown", false, false, true]
  );
});

test("classifier: known third-party agents by user-agent, X-Title or referer", () => {
  const cases: Array<[Record<string, string>, string]> = [
    [{ "user-agent": "Kilo-Code/4.2.1", "x-title": "Kilo Code" }, "kilocode"],
    [{ "user-agent": "axios/1.7.2", "http-referer": "https://kilocode.ai" }, "kilocode"],
    [{ "user-agent": "Cline/3.12" }, "cline"],
    [{ "x-title": "Roo Code" }, "roo-code"],
    [{ "user-agent": "opencode/0.3.1" }, "opencode"],
    [{ "user-agent": "Aider/0.82.0" }, "aider"],
    [{ "user-agent": "cline-proxy/1.0" }, "cline"], // "-" is a word boundary
    [{ "user-agent": "x cline" }, "cline"],
    [{ "user-agent": "foo aider" }, "aider"], // token at the very end
    [{ "user-agent": "mycline cline" }, "cline"], // rejected first hit, valid second
    [{ "user-agent": "Anthropic/JS 0.122.0", "x-title": "Kilo Code" }, "kilocode"], // a token beats SDK markers
  ];
  for (const [h, agent] of cases)
    assert.deepEqual(kind(h), [agent, false, true], JSON.stringify(h));
});

test("classifier: unknown is not third-party; tokens match whole words only", () => {
  for (const ua of ["curl/8.5.0", "decline-proxy/1.0", "raider/2.0", "mycline/1"])
    assert.deepEqual(kind({ "user-agent": ua }), ["unknown", false, false], ua);
});

test("classifier: a token never spans two header fields", () => {
  assert.deepEqual(kind({ "user-agent": "my-tool kilo", "x-title": "code helper" }), [
    "unknown",
    false,
    false,
  ]);
});

test("classifier: Headers objects, capitalized keys, non-string values and null", () => {
  const h = new Headers({ "user-agent": "claude-cli/2.1.80 (external, cli)", "x-app": "cli" });
  assert.equal(classifyClientAgent(h).agent, "claude-code");
  assert.equal(classifyClientAgent({ "User-Agent": "Cline/3.12" }).agent, "cline");
  assert.equal(
    classifyClientAgent({ "user-agent": ["Cline/3.12"], "x-title": 7 }).agent,
    "unknown"
  );
  assert.equal(classifyClientAgent(null).agent, "unknown");
});

test("classifier: signals carry only the allowlisted headers, raw and capped at 200 chars", () => {
  const c = classifyClientAgent({
    "user-agent": "X".repeat(500),
    "x-title": "My App",
    authorization: "Bearer sk-SECRET",
    "x-api-key": "sk-ant-SECRET",
    cookie: "s=SECRET",
  });
  assert.deepEqual([c.signals.userAgent.length, c.signals.xTitle], [200, "My App"]);
  assert.deepEqual(Object.keys(c.signals).sort(), [
    "anthropicBeta",
    "referer",
    "stainless",
    "userAgent",
    "xApp",
    "xTitle",
  ]);
  assert.doesNotMatch(JSON.stringify(c), /SECRET/);
});

test("providerFromModelString: prefixed, alias, quota-share and bare forms", () => {
  const cases: Array<[string | null, string | null]> = [
    ["claude/claude-sonnet-5", "claude"],
    ["cc/claude-sonnet-5", "claude"],
    [" cc/claude-sonnet-5 ", "claude"],
    ["anthropic/claude-opus-4-8", "anthropic"],
    ["qtSd/teamx/claude/claude-opus-4-8", "claude"],
    ["qtSd/teamx/cc/claude-opus-4-8", "claude"],
    ["openai/gpt-5", "openai"],
    ["gpt-5", null],
    ["/foo", null],
    ["", null],
    [null, null],
  ];
  for (const [model, provider] of cases)
    assert.equal(providerFromModelString(model), provider, String(model));
});

const signals = {
  userAgent: "",
  xApp: "",
  anthropicBeta: "",
  xTitle: "",
  referer: "",
  stainless: false,
};
const official = { agent: "claude-code", official: true, thirdParty: false, signals } as const;
const kilo = { agent: "kilocode", official: false, thirdParty: true, signals } as const;
const unknown = { agent: "unknown", official: false, thirdParty: false, signals } as const;

test("policy: official allowed; third-party and unknown flagged with distinct reasons", () => {
  assert.deepEqual(evaluateAgentPolicy(official, "claude"), {
    action: "allow",
    reason: "official agent claude-code on claude",
  });
  assert.deepEqual(evaluateAgentPolicy(kilo, "claude"), {
    action: "flag",
    reason: "third-party agent kilocode on claude",
  });
  assert.deepEqual(evaluateAgentPolicy(unknown, "anthropic"), {
    action: "flag",
    reason: "unidentified agent on anthropic",
  });
});

test("policy: only claude and anthropic are observed", () => {
  assert.deepEqual(evaluateAgentPolicy(kilo, "glm"), {
    action: "allow",
    reason: "provider not observed",
  });
  assert.equal(evaluateAgentPolicy(kilo, null).action, "allow");
});

test("agent guard flags: MODE gains block, STRICT is a boolean, both default to today's behavior", () => {
  const byKey = (key: string) => FEATURE_FLAG_DEFINITIONS.find((d) => d.key === key);
  const mode = byKey("AGENT_GUARD_MODE");
  const strict = byKey("AGENT_GUARD_STRICT");
  assert.ok(mode && strict);
  assert.deepEqual(
    [mode.category, mode.type, mode.defaultValue, mode.enumValues, mode.requiresRestart],
    ["security", "enum", "off", ["off", "monitor", "block"], false]
  );
  assert.deepEqual(
    [strict.category, strict.type, strict.defaultValue, strict.requiresRestart],
    ["security", "boolean", "false", false]
  );
});
test("settings: mode and strict follow the flags (DB override > env > default; other values are off/false)", () => {
  delete process.env.AGENT_GUARD_MODE;
  delete process.env.AGENT_GUARD_STRICT;
  assert.deepEqual([resolveAgentGuardMode(), isAgentGuardStrict()], ["off", false]);
  process.env.AGENT_GUARD_MODE = " Block ";
  process.env.AGENT_GUARD_STRICT = " TRUE ";
  assert.deepEqual([resolveAgentGuardMode(), isAgentGuardStrict()], ["block", true]);
  flagsDb.setFeatureFlagOverride("AGENT_GUARD_MODE", "monitor");
  flagsDb.setFeatureFlagOverride("AGENT_GUARD_STRICT", "false");
  assert.deepEqual([resolveAgentGuardMode(), isAgentGuardStrict()], ["monitor", false]);
  flagsDb.removeFeatureFlagOverride("AGENT_GUARD_MODE");
  flagsDb.removeFeatureFlagOverride("AGENT_GUARD_STRICT");
  process.env.AGENT_GUARD_MODE = "enforce";
  process.env.AGENT_GUARD_STRICT = "maybe";
  assert.deepEqual([resolveAgentGuardMode(), isAgentGuardStrict()], ["off", false]);
});
test("policy: block refuses a known third-party agent; an unidentified client only with strict", () => {
  const block = { block: true, strict: false };
  const strict = { block: true, strict: true };
  assert.deepEqual(evaluateAgentPolicy(kilo, "claude", block), {
    action: "block",
    reason: "blocked third-party agent kilocode on claude",
  });
  assert.deepEqual(evaluateAgentPolicy(unknown, "claude", block), {
    action: "flag",
    reason: "unidentified agent on claude",
  });
  assert.deepEqual(evaluateAgentPolicy(unknown, "anthropic", strict), {
    action: "block",
    reason: "blocked unidentified agent on anthropic",
  });
  for (const enforcement of [block, strict]) {
    assert.equal(evaluateAgentPolicy(official, "claude", enforcement).action, "allow");
    assert.equal(evaluateAgentPolicy(kilo, "glm", enforcement).action, "allow");
  }
  assert.deepEqual(evaluateAgentPolicy(kilo, "cc", block), {
    action: "block",
    reason: "blocked third-party agent kilocode on claude",
  });
  assert.equal(evaluateAgentPolicy(kilo, "claude").action, "flag"); // two-argument form is unchanged
});

const MODEL = "claude/claude-sonnet-5";
const KILO = { "user-agent": "Kilo-Code/4.2.1", "x-title": "Kilo Code" };
const monitor = () => new AgentGuardGuardrail({ mode: "monitor" });
function capture() {
  const calls: unknown[][] = [];
  const push =
    (level: string) =>
    (...args: unknown[]) =>
      void calls.push([level, ...args]);
  return { calls, log: { debug() {}, error() {}, info: push("info"), warn: push("warn") } };
}
test.after(() => {
  delete process.env.AGENT_GUARD_MODE;
  delete process.env.AGENT_GUARD_STRICT;
  flagsDb.clearAllFeatureFlagOverrides();
  core.resetDbInstance();
});
test("guardrail: block mode is inert at pre-call (the dispatch gate owns it)", async () => {
  const g = new AgentGuardGuardrail({ mode: "block" });
  let reads = 0;
  const headers = { get: () => (reads++, "Kilo-Code/4.2.1") } as unknown as Headers;
  const { calls, log } = capture();
  assert.deepEqual(
    [await g.preCall({}, { model: MODEL, headers, log }), reads, calls.length],
    [{ block: false }, 0, 0]
  );
});
test("guardrail: agent-guard, priority 1; off reads no header and writes no log", async () => {
  const g = new AgentGuardGuardrail({ mode: "off" });
  assert.deepEqual([g.name, g.priority, g.enabled], ["agent-guard", 1, true]);
  let reads = 0;
  const headers = { get: () => (reads++, "Kilo-Code/4.2.1") } as unknown as Headers;
  const { calls, log } = capture();
  assert.deepEqual(
    [await g.preCall({}, { model: MODEL, headers, log }), reads, calls.length],
    [{ block: false }, 0, 0]
  );
});
test("guardrail: monitor logs third-party at warn and unknown at info, never blocks", async () => {
  const { calls, log } = capture();
  const apiKeyInfo = { id: "key-1", key: "sk-SECRET" };
  assert.deepEqual(await monitor().preCall({}, { model: MODEL, headers: KILO, log, apiKeyInfo }), {
    block: false,
  });
  assert.deepEqual(
    await monitor().preCall({}, { model: MODEL, headers: { "user-agent": "curl/8.5.0" }, log }),
    { block: false }
  );
  assert.deepEqual(calls[0].slice(0, 3), [
    "warn",
    "AGENT_GUARD",
    "third-party agent kilocode on claude",
  ]);
  assert.deepEqual(calls[0][3], {
    agent: "kilocode",
    thirdParty: true,
    provider: "claude",
    model: MODEL,
    apiKeyId: "key-1",
    userAgent: "Kilo-Code/4.2.1",
    xApp: "",
    anthropicBeta: "",
    xTitle: "Kilo Code",
    referer: "",
    stainless: false,
  });
  assert.deepEqual(calls[1].slice(0, 3), ["info", "AGENT_GUARD", "unidentified agent on claude"]);
});
test("guardrail: observes the cc alias and quota-share ids; silent for official agents, other providers, bare ids", async () => {
  const { calls, log } = capture();
  await monitor().preCall({}, { model: "cc/claude-sonnet-5", headers: KILO, log });
  await monitor().preCall({}, { model: "qtSd/teamx/claude/claude-opus-4-8", headers: KILO, log });
  assert.deepEqual(
    calls.map((c) => (c[3] as { provider: string }).provider),
    ["claude", "claude"]
  );
  await monitor().preCall(
    {},
    {
      model: MODEL,
      headers: { "user-agent": "claude-cli/2.1.80 (external, cli)", "x-app": "cli" },
      log,
    }
  );
  await monitor().preCall({}, { model: "glm/glm-5", headers: KILO, log });
  await monitor().preCall({}, { model: "claude-sonnet-5", headers: KILO, log }); // documented limit
  assert.equal(calls.length, 2);
});
test("guardrail: the log never carries the API key, authorization or cookies", async () => {
  const { calls, log } = capture();
  const headers = new Headers({
    ...KILO,
    authorization: "Bearer sk-SECRET",
    "x-api-key": "sk-ant-SECRET",
    cookie: "s=SECRET",
  });
  await monitor().preCall(
    {},
    { model: MODEL, headers, log, apiKeyInfo: { id: "key-1", key: "sk-SECRET" } }
  );
  assert.equal(calls.length, 1);
  assert.doesNotMatch(JSON.stringify(calls), /SECRET|authorization|x-api-key|cookie/i);
});
test("guardrail: the referer is logged without its query, fragment and userinfo", async () => {
  const { calls, log } = capture();
  const referer = "https://user:SECRETU@client.example/chat?access_token=SECRETQ#id_token=SECRETF";
  await monitor().preCall({}, { model: MODEL, headers: { ...KILO, "http-referer": referer }, log });
  assert.equal((calls[0][3] as { referer: string }).referer, "https://client.example/chat");
  assert.doesNotMatch(JSON.stringify(calls), /SECRET|access_token|id_token/);
  // A known agent named only in the referer's host is still recognised.
  const byHost = classifyClientAgent({
    "user-agent": "axios/1.7.2",
    referer: "https://kilocode.ai/app?session=SECRETS",
  });
  assert.deepEqual([byHost.agent, byHost.signals.referer], ["kilocode", "https://kilocode.ai/app"]);
  // A token that appears only in the query no longer classifies the client.
  const byQuery = classifyClientAgent({
    "user-agent": "axios/1.7.2",
    referer: "https://client.example/?from=kilocode",
  });
  assert.equal(byQuery.agent, "unknown");
  // The userinfo runs to the last `@` of the authority.
  const twoAt = classifyClientAgent({
    "user-agent": "axios/1.7.2",
    referer: "https://a@b:secret@host/p",
  });
  assert.equal(twoAt.signals.referer, "https://host/p");
  // A referer that is not a URL is kept as it is.
  const plain = classifyClientAgent({ "user-agent": "axios/1.7.2", referer: "kilocode app" });
  assert.equal(plain.signals.referer, "kilocode app");
});
test("guardrail: fails open when headers or the logger throw, and without log or model", async () => {
  const boom = () => {
    throw new Error("boom");
  };
  const badHeaders = { get: boom } as unknown as Headers;
  assert.deepEqual(await monitor().preCall({}, { model: MODEL, headers: badHeaders }), {
    block: false,
  });
  assert.deepEqual(
    await monitor().preCall({}, { model: MODEL, headers: KILO, log: { warn: boom, info: boom } }),
    { block: false }
  );
  assert.deepEqual(await monitor().preCall({}, { model: MODEL, headers: KILO }), { block: false });
  assert.deepEqual(await monitor().preCall({}, {}), { block: false });
});
test("guardrail: mode follows AGENT_GUARD_MODE (default off, env, DB override wins, other values off)", async () => {
  const g = new AgentGuardGuardrail();
  const logged = async () => {
    const { calls, log } = capture();
    await g.preCall({}, { model: MODEL, headers: KILO, log });
    return calls.length;
  };
  const previousEnv = process.env.AGENT_GUARD_MODE;
  try {
    delete process.env.AGENT_GUARD_MODE;
    assert.equal(await logged(), 0);
    process.env.AGENT_GUARD_MODE = " Monitor ";
    assert.equal(await logged(), 1);
    flagsDb.setFeatureFlagOverride("AGENT_GUARD_MODE", "off");
    assert.equal(await logged(), 0);
    flagsDb.removeFeatureFlagOverride("AGENT_GUARD_MODE");
    process.env.AGENT_GUARD_MODE = "enforce";
    assert.equal(await logged(), 0);
  } finally {
    flagsDb.removeFeatureFlagOverride("AGENT_GUARD_MODE");
    if (previousEnv === undefined) delete process.env.AGENT_GUARD_MODE;
    else process.env.AGENT_GUARD_MODE = previousEnv;
  }
});
test("guardrail: an unreadable flag store falls back to the AGENT_GUARD_MODE env value", async () => {
  const previousEnv = process.env.AGENT_GUARD_MODE;
  const db = core.getDbInstance();
  flagsDb.clearFeatureFlagOverrideCache();
  db.exec("ALTER TABLE key_value RENAME TO key_value_hidden");
  try {
    assert.throws(() => flagsDb.getFeatureFlagOverride("AGENT_GUARD_MODE"));
    process.env.AGENT_GUARD_MODE = "monitor";
    const { calls, log } = capture();
    assert.deepEqual(
      await new AgentGuardGuardrail().preCall({}, { model: MODEL, headers: KILO, log }),
      { block: false }
    );
    assert.equal(calls.length, 1);
  } finally {
    db.exec("ALTER TABLE key_value_hidden RENAME TO key_value");
    flagsDb.clearFeatureFlagOverrideCache();
    if (previousEnv === undefined) delete process.env.AGENT_GUARD_MODE;
    else process.env.AGENT_GUARD_MODE = previousEnv;
  }
});
test("guardrail: a request that disables agent-guard is skipped by the registry (known limit)", async () => {
  const registry = new GuardrailRegistry();
  registry.register(monitor());
  const { calls, log } = capture();
  const out = await registry.runPreCallHooks(
    {},
    { model: MODEL, headers: KILO, log, disabledGuardrails: ["agent-guard"] }
  );
  assert.deepEqual([out.blocked, out.results[0].skipped, calls.length], [false, true, 0]);
});
