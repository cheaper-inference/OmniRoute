import assert from "node:assert/strict";
import test, { after } from "node:test";
import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import { shutdownDbInstance } from "../../src/lib/db/core.ts";
import { closeCallLogSaves } from "../../src/lib/usage/callLogs.ts";

after(async () => {
  await closeCallLogSaves();
  await shutdownDbInstance();
});

const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xd9]).toString("base64");
const request = { model: "openai/gpt-image-2", prompt: "A bird" };

async function generate(t: test.TestContext, body: Record<string, unknown>) {
  let sent: Record<string, unknown> | undefined;
  const fetchMock = t.mock.method(globalThis, "fetch", async (_url: string, init: RequestInit) => {
    sent = JSON.parse(String(init.body));
    return Response.json({ data: [{ b64_json: jpeg }] });
  });
  const result = await handleImageGeneration({
    body,
    credentials: { apiKey: "fixture-only-image-key" },
  });
  return { result, sent, upstreamCalls: fetchMock.mock.callCount() };
}

for (const [format, compression] of [
  ["jpg", undefined],
  ["jpg", 0],
  [" JpG ", 0],
  ["jpeg", undefined],
  ["jpeg", 0],
] as const) {
  test(`OpenAI sends JPEG for ${JSON.stringify(format)} with compression ${compression ?? "omitted"}`, async (t) => {
    const { result, sent } = await generate(t, {
      ...request,
      output_format: format,
      ...(compression === undefined ? {} : { output_compression: compression }),
    });

    assert.equal(result.success, true);
    assert.ok(sent);
    assert.equal(sent.output_format, "jpeg");
    assert.equal(sent.output_compression, compression);
    assert.equal(Object.hasOwn(sent, "output_compression"), compression !== undefined);
    assert.equal(result.data.data[0].b64_json, jpeg);
  });
}

for (const format of ["jpg", "jpeg"]) {
  for (const compression of [-1, 101, 20.5, "20"]) {
    test(`OpenAI rejects ${format} compression ${JSON.stringify(compression)} before fetch`, async (t) => {
      const { result, upstreamCalls } = await generate(t, {
        ...request,
        output_format: format,
        output_compression: compression,
      });

      assert.equal(result.status, 400, `upstream calls: ${upstreamCalls}`);
      assert.equal(result.success, false);
      assert.match(result.error, /output_compression/);
      assert.equal(upstreamCalls, 0);
    });
  }
}

test("OpenAI rejects JPG compression before it can be copied into the upstream payload", async (t) => {
  let reads = 0;
  const { result, upstreamCalls } = await generate(t, {
    ...request,
    output_format: "jpg",
    get output_compression() {
      // Expose a separate read by the alias path by omitting compression on later reads.
      return reads++ === 0 ? 20.5 : undefined;
    },
  });

  assert.equal(result.status, 400, `upstream calls: ${upstreamCalls}`);
  assert.equal(result.success, false);
  assert.match(result.error, /output_compression/);
  assert.equal(upstreamCalls, 0);
});
