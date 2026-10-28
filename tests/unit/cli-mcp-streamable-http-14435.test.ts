import assert from "node:assert/strict";
import test from "node:test";
import { makeMcpStreamFetch } from "./helpers/mcpStreamMock.ts";

async function captureStdout(fn: () => Promise<number>): Promise<{ code: number; output: string }> {
  const chunks: string[] = [];
  const write = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    if (typeof chunk === "string") chunks.push(chunk);
    return true;
  }) as typeof process.stdout.write;
  try {
    return { code: await fn(), output: chunks.join("") };
  } finally {
    process.stdout.write = write;
  }
}

test("mcp call supports Streamable HTTP responses", async () => {
  const fetch = globalThis.fetch;
  const { runMcpCallCommand } = await import("../../bin/cli/commands/mcp.mjs");

  try {
    for (const stream of [false, true]) {
      globalThis.fetch = makeMcpStreamFetch({
        toolResult: { content: [{ type: "text", text: "ok" }] },
      });
      const result = await captureStdout(() =>
        runMcpCallCommand("test", {}, { stream }, { baseUrl: "http://localhost:20128" })
      );
      assert.equal(result.code, 0);
      assert.match(result.output, /ok/);
    }
  } finally {
    globalThis.fetch = fetch;
  }
});

test("mcp call supports Streamable HTTP without a session id", async () => {
  const fetch = globalThis.fetch;
  const { runMcpCallCommand } = await import("../../bin/cli/commands/mcp.mjs");

  try {
    globalThis.fetch = makeMcpStreamFetch({
      toolResult: { content: [{ type: "text", text: "ok-stateless" }] },
      sessionMode: "stateless",
    });
    const result = await captureStdout(() =>
      runMcpCallCommand("test", {}, { stream: false }, { baseUrl: "http://localhost:20128" })
    );
    assert.equal(result.code, 0);
    assert.match(result.output, /ok-stateless/);
  } finally {
    globalThis.fetch = fetch;
  }
});
