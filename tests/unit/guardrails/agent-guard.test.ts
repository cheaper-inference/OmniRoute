import test from "node:test";
import assert from "node:assert/strict";

const { classifyClientAgent } =
  await import("../../../src/lib/guardrails/agentGuard/classifier.ts");

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
    [{ "user-agent": "Anthropic/JS 0.122.0", "x-title": "Kilo Code" }, "kilocode"], // a token beats SDK markers
  ];
  for (const [h, agent] of cases)
    assert.deepEqual(kind(h), [agent, false, true], JSON.stringify(h));
});

test("classifier: unknown is not third-party; tokens match whole words only", () => {
  for (const ua of ["curl/8.5.0", "decline-proxy/1.0", "raider/2.0", "mycline/1"])
    assert.deepEqual(kind({ "user-agent": ua }), ["unknown", false, false], ua);
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
