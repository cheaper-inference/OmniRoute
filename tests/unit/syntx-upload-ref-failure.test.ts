import { after, describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// The handlers pull in the usage DB; keep test data out of the real data directory.
process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-syntx-upload-ref-"));

const { handleSyntxVideoGeneration } =
  await import("../../open-sse/handlers/videoGeneration/syntxHandler.ts");
const { handleSyntxImageGeneration } =
  await import("../../open-sse/handlers/imageGeneration/providers/syntx.ts");
const core = await import("../../src/lib/db/core.ts");

after(() => core.resetDbInstance());

function fakeJwt(): string {
  return (
    "eyJhbGciOiJub25lIn0." +
    Buffer.from(JSON.stringify({ sub: "1", exp: Math.floor(Date.now() / 1000) + 3600 })).toString(
      "base64url"
    ) +
    ".x"
  );
}

const credentials = { accessToken: fakeJwt() };
const validImageRef = `data:image/png;base64,${Buffer.from("an image").toString("base64")}`;
const validVideoRef = `data:video/mp4;base64,${Buffer.from("a video").toString("base64")}`;
const brokenImageRef = "data:image/png;base64,";
const brokenVideoRef = "data:video/mp4;base64,";
// A single base64 character matches the data-URL pattern but decodes to zero bytes.
const emptyImageRef = "data:image/png;base64,A";
const emptyVideoRef = "data:video/mp4;base64,A";

type Call = { url: string; body: string };

// The fake transport answers the upload endpoint with the requested status and ends the
// generation request immediately with a 500. Recording both kinds of call lets each test prove
// whether a generation was attempted with a missing reference.
function makeTransport(uploadStatus: number): { transport: typeof fetch; calls: Call[] } {
  const calls: Call[] = [];
  const transport = (async (input: string | URL | Request, init?: RequestInit) => {
    const url = String(input);
    const body = typeof init?.body === "string" ? init.body : "";
    calls.push({ url, body });
    if (url.includes("/api/v1/chats/upload-files")) {
      return new Response("{}", { status: uploadStatus });
    }
    if (url.includes("/api/v1/chats")) {
      return new Response(JSON.stringify({ uuid: "test-chat" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    // The generation request is the one that carries the resolved references.
    if (url.includes("/api/v1/design/generate") || url.includes("/api/v1/video/generate")) {
      return new Response("{}", { status: 500 });
    }
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  return { transport, calls };
}

const uploadCalls = (calls: Call[]) =>
  calls.filter((call) => call.url.includes("/api/v1/chats/upload-files"));
const generationCalls = (calls: Call[]) =>
  calls.filter(
    (call) =>
      call.url.includes("/api/v1/design/generate") || call.url.includes("/api/v1/video/generate")
  );

describe("syntx upload reference failures", () => {
  it("returns 400 from the image handler for a malformed image reference data URL", async () => {
    const { transport, calls } = makeTransport(200);
    const result = await handleSyntxImageGeneration({
      model: "syntx/sora-images/gpt-image-2",
      provider: "syntx",
      body: { prompt: "hi", image_url: brokenImageRef },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(result.status, 400);
    assert.equal(uploadCalls(calls).length, 0);
    assert.equal(generationCalls(calls).length, 0);
  });

  it("returns 400 from the image handler for an image reference that decodes to zero bytes", async () => {
    const { transport, calls } = makeTransport(200);
    const result = await handleSyntxImageGeneration({
      model: "syntx/sora-images/gpt-image-2",
      provider: "syntx",
      body: { prompt: "hi", image_url: emptyImageRef },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(result.status, 400);
    assert.equal(uploadCalls(calls).length, 0);
    assert.equal(generationCalls(calls).length, 0);
  });

  it("returns 502 from the image handler when the reference upload is rejected", async () => {
    const { transport, calls } = makeTransport(403);
    const result = await handleSyntxImageGeneration({
      model: "syntx/sora-images/gpt-image-2",
      provider: "syntx",
      body: { prompt: "hi", image_url: validImageRef },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(result.status, 502);
    assert.equal(uploadCalls(calls).length, 1);
    assert.equal(generationCalls(calls).length, 0);
  });

  it("keeps an https image reference on the pass-through path", async () => {
    const ref = "https://r2.syntx.ai/ref.png";
    const { transport, calls } = makeTransport(403);
    await handleSyntxImageGeneration({
      model: "syntx/sora-images/gpt-image-2",
      provider: "syntx",
      body: { prompt: "hi", image_url: ref },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(uploadCalls(calls).length, 0);
    const generation = generationCalls(calls);
    assert.equal(generation.length, 1);
    assert.ok(generation[0].body.includes(ref));
  });

  it("returns 400 from the video handler for a malformed video reference data URL", async () => {
    const { transport, calls } = makeTransport(200);
    const result = await handleSyntxVideoGeneration({
      model: "syntx/sora/gpt",
      provider: "syntx",
      body: { prompt: "hi", image_url: brokenVideoRef },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(result.status, 400);
    assert.equal(uploadCalls(calls).length, 0);
    assert.equal(generationCalls(calls).length, 0);
  });

  it("returns 400 from the video handler for a video reference that decodes to zero bytes", async () => {
    const { transport, calls } = makeTransport(200);
    const result = await handleSyntxVideoGeneration({
      model: "syntx/sora/gpt",
      provider: "syntx",
      body: { prompt: "hi", image_url: emptyVideoRef },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(result.status, 400);
    assert.equal(uploadCalls(calls).length, 0);
    assert.equal(generationCalls(calls).length, 0);
  });

  it("returns 502 from the video handler when the reference upload is rejected", async () => {
    const { transport, calls } = makeTransport(500);
    const result = await handleSyntxVideoGeneration({
      model: "syntx/sora/gpt",
      provider: "syntx",
      body: { prompt: "hi", image_url: validVideoRef },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(result.status, 502);
    assert.equal(uploadCalls(calls).length, 1);
    assert.equal(generationCalls(calls).length, 0);
  });

  it("keeps an https video reference on the pass-through path", async () => {
    const ref = "https://r2.syntx.ai/frame.mp4";
    const { transport, calls } = makeTransport(403);
    await handleSyntxVideoGeneration({
      model: "syntx/sora/gpt",
      provider: "syntx",
      body: { prompt: "hi", image_url: ref },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(uploadCalls(calls).length, 0);
    const generation = generationCalls(calls);
    assert.equal(generation.length, 1);
    assert.ok(generation[0].body.includes(ref));
  });

  it("still generates an image without an image_url when no reference is given", async () => {
    const { transport, calls } = makeTransport(403);
    await handleSyntxImageGeneration({
      model: "syntx/sora-images/gpt-image-2",
      provider: "syntx",
      body: { prompt: "hi" },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(uploadCalls(calls).length, 0);
    const generation = generationCalls(calls);
    assert.equal(generation.length, 1);
    assert.ok(!generation[0].body.includes('"image_url"'));
  });

  it("still generates a video without file_urls when no reference is given", async () => {
    const { transport, calls } = makeTransport(403);
    await handleSyntxVideoGeneration({
      model: "syntx/sora/gpt",
      provider: "syntx",
      body: { prompt: "hi" },
      credentials,
      fetchImpl: transport,
    });
    assert.equal(uploadCalls(calls).length, 0);
    const generation = generationCalls(calls);
    assert.equal(generation.length, 1);
    assert.ok(!generation[0].body.includes('"file_urls"'));
  });
});
