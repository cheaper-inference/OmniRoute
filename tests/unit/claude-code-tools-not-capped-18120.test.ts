import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-18120-"));
process.env.DATA_DIR = DIR;

const { injectMemoryAndSkills } =
  await import("../../open-sse/handlers/chatCore/memorySkillsInjection.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");
const { setDetectedToolLimit } = await import("../../open-sse/services/toolLimitDetector.ts");
const core = await import("../../src/lib/db/core.ts");

test.before(async () => {
  await core.ensureDbInitialized();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const CORE = [
  "Agent",
  "Bash",
  "Edit",
  "ListAgents",
  "Read",
  "SendMessage",
  "Skill",
  "TaskOutput",
  "TaskStop",
  "TodoWrite",
  "WebFetch",
  "WebSearch",
  "Write",
];
const mk = (name: string) => ({ name, description: name, input_schema: { type: "object" } });
const mkFn = (name: string) => ({
  type: "function",
  function: { name, description: name, parameters: { type: "object" } },
});
const mcpNames = (n: number) =>
  Array.from({ length: n }, (_, i) => `mcp__ctx__ctx_tool_${String(i).padStart(3, "0")}`);

async function run(tools: unknown[], provider: string, targetFormat: string, warns?: string[]) {
  const injected = await injectMemoryAndSkills({
    body: { model: "m", messages: [], tools },
    memoryOwnerId: null,
    provider,
    effectiveModel: "m",
    sourceFormat: targetFormat,
    targetFormat,
    backgroundReason: null,
    log: null,
  });
  return (await prepareUpstreamBody({
    translatedBody: injected.body,
    modelToCall: "m",
    provider,
    targetFormat,
    credentials: null,
    log: {
      debug: () => {},
      info: () => {},
      error: () => {},
      warn: (tag: string, msg: string) => warns?.push(`${tag} ${msg}`),
    },
  })) as {
    tools: Array<Record<string, unknown> & { function?: { name?: string }; name?: string }>;
  };
}

test("#18120: Claude Code core tools survive injection + default cap on provider claude", async () => {
  const clientTools = [...CORE.map(mk), ...mcpNames(130).map(mk)];
  assert.equal(clientTools.length, 143);
  const out = await run(clientTools, "claude", "claude");
  const names = new Set(out.tools.map((t) => t.name));
  const missing = CORE.filter((n) => !names.has(n));
  assert.deepEqual(missing, [], `built-in Claude Code tools dropped: ${missing.join(", ")}`);
  assert.equal(out.tools.length, 143);
});

test("#18120: 200 tools on provider claude all survive, in client order", async () => {
  const clientTools = [...CORE.map(mk), ...mcpNames(187).map(mk)];
  const out = await run(clientTools, "claude", "claude");
  assert.deepEqual(
    out.tools.map((t) => t.name),
    clientTools.map((t) => t.name)
  );
});

test("#18120: claude-format targets of other providers are not capped either", async () => {
  for (const provider of ["claude-code", "anthropic-compatible-foo"]) {
    const out = await run(mcpNames(150).map(mk), provider, "claude");
    assert.equal(out.tools.length, 150, provider);
  }
});

test("#18120: a LEARNED limit still truncates a claude provider, keeping client order", async () => {
  setDetectedToolLimit("claude-learned-18120", 100);
  const clientTools = [...CORE.map(mk), ...mcpNames(130).map(mk)];
  const out = await run(clientTools, "claude-learned-18120", "claude");
  assert.equal(out.tools.length, 100);
  assert.deepEqual(
    out.tools.map((t) => t.name),
    clientTools.slice(0, 100).map((t) => t.name)
  );
});

test("#18120: capped providers keep the client's order (not alphabetical) and warn with dropped names", async () => {
  // Built-ins late in the alphabet come first from the client; MCP tools sort earlier.
  const clientTools = [
    ...["Write", "Skill", "Read"].map(mkFn),
    ...Array.from({ length: 140 }, (_, i) => mkFn(`a_mcp_${String(i).padStart(3, "0")}`)),
  ];
  const warns: string[] = [];
  const out = await run(clientTools, "some-openai-compatible-18120", "openai", warns);
  assert.equal(out.tools.length, 128);
  assert.deepEqual(
    out.tools.map((t) => t.function.name),
    clientTools.slice(0, 128).map((t) => t.function.name)
  );
  assert.equal(warns.length, 1);
  assert.match(warns[0], /TOOL_LIMIT/);
  assert.match(warns[0], /a_mcp_139/);
  assert.equal(warns[0].includes("\n"), false);
});

test("#18120: tools injected by the gateway are still sorted deterministically after client tools", async () => {
  const { sortToolsByName } =
    await import("../../open-sse/handlers/chatCore/memorySkillsInjection.ts");
  assert.deepEqual(
    sortToolsByName([mk("b"), mk("a")]).map((t) => t.name),
    ["a", "b"]
  );
});
