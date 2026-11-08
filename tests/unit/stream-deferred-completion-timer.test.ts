import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-deferred-"));
const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const enc = new TextEncoder();
const dec = new TextDecoder();
const base = { id: "chatcmpl-live", model: "gpt-test" };
const sse = (o: unknown) => enc.encode(`data: ${JSON.stringify(o)}\n\n`);

test("live Chat-to-Responses stream completes after 3 s without usage or [DONE]", async () => {
  mock.timers.enable({ apis: ["setTimeout"] });
  const stream = createSSEStream({
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    provider: "openai",
    model: "gpt-test",
    body: { input: "hi" },
  });
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  let out = "";
  void (async () => {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      out += dec.decode(value, { stream: true });
    }
  })();
  const settle = async () => {
    for (let i = 0; i < 5; i++) await new Promise((r) => setImmediate(r));
  };
  try {
    await writer.write(
      sse({ ...base, choices: [{ index: 0, delta: { content: "Hi" }, finish_reason: null }] })
    );
    await writer.write(sse({ ...base, choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }));
    await settle();
    assert.equal((out.match(/response\.completed/g) || []).length, 0);
    mock.timers.tick(3000);
    await settle();
    assert.equal((out.match(/event: response\.completed/g) || []).length, 1, out.slice(-300));
  } finally {
    mock.timers.reset();
    await writer.close().catch(() => {});
    await settle();
    core.resetDbInstance();
  }
});
