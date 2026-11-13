// The default tool cap keeps the first N tools. A tool that tool_choice forces, or that the
// conversation already called, must survive it: dropping it sends an upstream 400 or a request
// the history no longer matches.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-tool-cap-"));
process.env.DATA_DIR = DIR;
const { prepareUpstreamBody } = await import("../../open-sse/handlers/chatCore/upstreamBody.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const tool = (name: string) => ({
  type: "function",
  function: { name, description: "d", parameters: { type: "object", properties: {} } },
});
const names = (body: { tools: Array<{ function: { name: string } }> }) =>
  body.tools.map((t) => t.function.name);

async function prepare(extra: Record<string, unknown>, count = 160) {
  const translatedBody = {
    model: "gpt-4o",
    stream: false,
    tools: Array.from({ length: count }, (_, i) => tool(`tool_${i}`)),
    messages: [{ role: "user", content: "go" }],
    ...extra,
  };
  return (await prepareUpstreamBody({
    translatedBody,
    modelToCall: "gpt-4o",
    provider: "openai",
    targetFormat: "openai",
    credentials: { providerSpecificData: {} },
    log: null,
  })) as { tools: Array<{ function: { name: string } }> };
}

test("the tool that tool_choice forces survives the cap", async () => {
  const out = await prepare({ tool_choice: { type: "function", function: { name: "tool_150" } } });
  assert.ok(names(out).includes("tool_150"));
  assert.equal(out.tools.length, 128, "the cap still applies");
});

test("a tool the conversation already called survives the cap", async () => {
  const out = await prepare({
    messages: [
      { role: "user", content: "go" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "c1", type: "function", function: { name: "tool_155", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "c1", content: "ok" },
      { role: "user", content: "again" },
    ],
  });
  assert.ok(names(out).includes("tool_155"));
  assert.equal(out.tools.length, 128);
});

test("guard: without a forced or called tool the first 128 are kept in order", async () => {
  const out = await prepare({});
  assert.deepEqual(
    names(out),
    Array.from({ length: 128 }, (_, i) => `tool_${i}`)
  );
});

test("guard: a list under the cap is not changed", async () => {
  const out = await prepare(
    { tool_choice: { type: "function", function: { name: "tool_5" } } },
    20
  );
  assert.equal(out.tools.length, 20);
});
