// Route-level: a zstd-compressed /v1/responses request (Codex CLI request compression) is
// decoded by the chat body admission and reaches the provider as plain JSON, instead of
// being rejected with 400 "Invalid JSON body".
import test from "node:test";
import assert from "node:assert/strict";
import zlib from "node:zlib";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("responses-compressed-body");
const { POST } = await import("../../src/app/api/v1/responses/route.ts");

test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.seedConnection("openai");
});
test.after(async () => await harness.cleanup());

function compressedRequest(body: Uint8Array, encoding: string): Request {
  return new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Content-Encoding": encoding },
    body,
  });
}

test("POST /v1/responses accepts a zstd-compressed JSON body", async () => {
  const upstreamBodies: unknown[] = [];
  const upstreamEncodings: Array<string | null> = [];
  globalThis.fetch = async (_url: unknown, init?: RequestInit) => {
    upstreamEncodings.push(new Headers(init?.headers).get("content-encoding"));
    upstreamBodies.push(typeof init?.body === "string" ? JSON.parse(init.body) : init?.body);
    return harness.buildOpenAIResponse("OK", "gpt-4.1");
  };
  const payload = {
    model: "openai/gpt-4.1",
    input: [{ role: "user", content: "hi" }],
    stream: false,
  };
  const response = await POST(
    compressedRequest(zlib.zstdCompressSync(Buffer.from(JSON.stringify(payload))), "zstd")
  );
  const wire = await response.text();
  assert.equal(response.status, 200, wire);
  assert.doesNotMatch(wire, /Invalid JSON body/);
  assert.equal(upstreamBodies.length, 1, "the decoded request must be dispatched upstream once");
  assert.notEqual(upstreamEncodings[0], "zstd", "the client encoding must not leak upstream");
  await harness.callLogsDb.waitForCallLogSaves(60_000);
});

test("POST /v1/responses answers a corrupt zstd body with a sanitized 400", async () => {
  let upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls += 1;
    return harness.buildOpenAIResponse("OK", "gpt-4.1");
  };
  const response = await POST(compressedRequest(new TextEncoder().encode("broken"), "zstd"));
  assert.equal(response.status, 400);
  const body = (await response.json()) as { error?: { message?: string } };
  assert.match(String(body.error?.message), /could not be decoded/i);
  assert.doesNotMatch(String(body.error?.message), /ZSTD_error/);
  assert.equal(upstreamCalls, 0);
});
