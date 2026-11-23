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

for (const [format, compression] of [
  ["jpg", undefined],
  [" JpG ", 0],
] as const) {
  test(`OpenAI sends the JPEG container for output_format=${JSON.stringify(format)}`, async (t) => {
    let sent: Record<string, unknown> | undefined;
    t.mock.method(globalThis, "fetch", async (_url: string, init: RequestInit) => {
      sent = JSON.parse(String(init.body));
      return Response.json({ data: [{ b64_json: jpeg }] });
    });

    const result = await handleImageGeneration({
      body: {
        model: "openai/gpt-image-2",
        prompt: "A bird",
        output_format: format,
        output_compression: compression,
      },
      credentials: { apiKey: "fixture-only-image-key" },
    });

    assert.equal(result.success, true);
    assert.ok(sent);
    assert.equal(sent.output_format, "jpeg");
    assert.equal(sent.output_compression, compression);
    assert.equal(Object.hasOwn(sent, "output_compression"), compression !== undefined);
    assert.equal(result.data.data[0].b64_json, jpeg);
  });
}
