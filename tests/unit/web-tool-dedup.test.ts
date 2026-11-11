/**
 * Opt-in (OMNIROUTE_DEDUP_WEB_TOOLS): a Claude-client request that already carries an Exa or
 * Tavily MCP search/fetch tool does not also ship the built-in WebSearch and WebFetch tools.
 * Exact tool names only; other clients, other tools and forced tool_choice are never touched.
 */
import test, { before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-web-tool-dedup-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");

const FLAG = "OMNIROUTE_DEDUP_WEB_TOOLS";
const CLAUDE_UA = "claude-cli/2.1.311 (external, cli)";

before(async () => {
  await coreDb.ensureDbInitialized();
});
beforeEach(() => {
  process.env[FLAG] = "true";
});
after(() => {
  delete process.env[FLAG];
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const claudeTool = (name: string) => ({
  name,
  description: `${name} tool`,
  input_schema: { type: "object", properties: {} },
});
const chatTool = (name: string) => ({
  type: "function",
  function: { name, description: `${name} tool`, parameters: { type: "object", properties: {} } },
});

async function toolNames(
  names: string[],
  options: { ua?: string | null; format?: "claude" | "openai"; toolChoice?: unknown } = {}
): Promise<string[]> {
  const format = options.format ?? "claude";
  const ua = options.ua === undefined ? CLAUDE_UA : options.ua;
  const translatedBody: Record<string, unknown> = {
    model: "claude-sonnet-4-6",
    messages: [{ role: "user", content: "hi" }],
    tools: names.map(format === "claude" ? claudeTool : chatTool),
  };
  if (options.toolChoice !== undefined) translatedBody.tool_choice = options.toolChoice;
  const out = (await prepareUpstreamBody({
    translatedBody,
    modelToCall: "claude-sonnet-4-6",
    provider: "test",
    targetFormat: format,
    credentials: null,
    clientRawRequest: ua === null ? { headers: {} } : { headers: { "user-agent": ua } },
  })) as { tools?: Array<{ name?: string; function?: { name?: string } }> };
  return (out.tools ?? []).map((t) => t.name ?? t.function?.name ?? "");
}

const EXA = ["mcp__exa__web_search_exa", "mcp__exa__web_fetch_exa"];
const TAVILY = ["mcp__tavily__tavily_search", "mcp__tavily__tavily_extract"];

test("Exa MCP tools present: built-in WebSearch and WebFetch are dropped", async () => {
  assert.deepEqual(await toolNames(["Read", "WebSearch", "WebFetch", ...EXA]), ["Read", ...EXA]);
});

test("Tavily MCP tools present: built-in WebSearch and WebFetch are dropped", async () => {
  assert.deepEqual(await toolNames(["WebSearch", "Bash", "WebFetch", ...TAVILY]), [
    "Bash",
    ...TAVILY,
  ]);
});

test("one matching MCP tool is enough, and OpenAI-shaped tools are handled", async () => {
  assert.deepEqual(
    await toolNames(["WebSearch", "mcp__exa__web_search_exa"], { format: "openai" }),
    ["mcp__exa__web_search_exa"]
  );
});

test("no Exa or Tavily tool: nothing is dropped", async () => {
  const names = ["Read", "WebSearch", "WebFetch", "mcp__other__web_search"];
  assert.deepEqual(await toolNames(names), names);
});

test("only exact names are dropped", async () => {
  const names = ["WebSearchPro", "WebFetch2", "web_search", "mcp__exa__web_search_exa"];
  assert.deepEqual(await toolNames(names), names);
});

test("a client that is not Claude Code keeps every tool", async () => {
  const names = ["WebSearch", "WebFetch", ...EXA];
  assert.deepEqual(await toolNames(names, { ua: "OpenAI/Python 1.0" }), names);
  assert.deepEqual(await toolNames(names, { ua: null }), names);
});

test("a forced tool_choice on a built-in web tool keeps the body unchanged", async () => {
  const names = ["WebSearch", "WebFetch", ...EXA];
  const forced = { type: "tool", name: "WebSearch" };
  assert.deepEqual(await toolNames(names, { toolChoice: forced }), names);
});

test("flag off (default): every tool is kept", async () => {
  delete process.env[FLAG];
  const names = ["WebSearch", "WebFetch", ...EXA];
  assert.deepEqual(await toolNames(names), names);
});
