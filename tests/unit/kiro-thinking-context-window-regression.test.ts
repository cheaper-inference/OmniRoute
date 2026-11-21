import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const provider = "kiro",
  model = "claude-opus-5.5",
  name = "kiro-window-regression";
const dir = fs.mkdtempSync(path.join(os.tmpdir(), "kiro-window-"));
process.env.DATA_DIR = dir;
const calls: string[] = [];
const original = globalThis.fetch;
globalThis.fetch = async () => {
  throw new Error("offline test: network forbidden");
};
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { KiroExecutor } = await import("../../open-sse/executors/kiro.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const { updateCompressionSettings } = await import("../../src/lib/db/compression.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS: F } = await import("../../open-sse/translator/formats.ts");
const execute = KiroExecutor.prototype.execute;
const note = "nota ".repeat(2048);
function fixture(kind: "none" | "thinking" | "text") {
  const extra =
    kind === "none"
      ? []
      : kind === "text"
        ? [{ type: "text", text: note }]
        : [{ type: "thinking", thinking: note }];
  return {
    model,
    stream: false,
    max_tokens: 64,
    messages: [
      { role: "user", content: "Teste de conectividade." },
      { role: "assistant", content: [...extra, { type: "text", text: "Recebido." }] },
      { role: "user", content: "Responda apenas OK." },
    ],
  };
}
test.before(async () => {
  await updateCompressionSettings({ enabled: false, defaultMode: "off", autoTriggerTokens: 0 });
  await createCombo({ name, models: [`${provider}/${model}`], context_length: 2000 } as never);
  KiroExecutor.prototype.execute = async function ({ body }) {
    calls.push(JSON.stringify(body));
    return {
      url: "https://example.invalid",
      headers: {},
      transformedBody: body,
      response: new Response(
        JSON.stringify({
          id: "test",
          object: "chat.completion",
          model,
          choices: [
            { index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" },
          ],
        }),
        { headers: { "Content-Type": "application/json" } }
      ),
    } as never;
  };
});
test.after(() => {
  KiroExecutor.prototype.execute = execute;
  globalThis.fetch = original;
  resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
for (const kind of ["none", "text", "thinking"] as const) {
  test(`Kiro: ${kind}`, async () => {
    calls.length = 0;
    const body = fixture(kind);
    const wire = translateRequest(
      F.CLAUDE,
      F.KIRO,
      model,
      structuredClone(body),
      false,
      {},
      provider
    );
    const payload = JSON.stringify(wire.conversationState);
    assert.ok(payload.includes("Recebido."));
    assert.equal(payload.includes(note), kind === "text");
    const result = await handleChatCore({
      body,
      modelInfo: { provider, model, extendedContext: false },
      credentials: { accessToken: "offline-placeholder" },
      clientRawRequest: {
        endpoint: "/v1/messages",
        body: structuredClone(body),
        headers: new Headers({ "content-type": "application/json" }),
      },
      isCombo: true,
      comboName: name,
      userAgent: "unit-test",
      log: { debug() {}, info() {}, warn() {}, error() {} },
    } as never);
    if (kind === "text") {
      assert.equal(result.response?.status, 400);
      assert.equal(calls.length, 0);
      assert.match(String(result.error), /prompt is too long/);
    } else {
      assert.equal(calls.length, 1, "History that fits after Kiro translation must reach executor");
      assert.equal(result.response?.status, 200);
    }
  });
}

test("Kiro lite compression does not trigger another pass for discarded thinking", async () => {
  await updateCompressionSettings({ enabled: true, defaultMode: "lite", autoTriggerTokens: 0 });
  try {
    const body = fixture("thinking");
    body.messages[0].content = "check\n\n\n\nthen report";
    calls.length = 0;
    const lines: string[] = [];
    const result = await handleChatCore({
      body,
      modelInfo: { provider, model, extendedContext: false },
      credentials: { accessToken: "offline-placeholder" },
      clientRawRequest: {
        endpoint: "/v1/messages",
        body: structuredClone(body),
        headers: new Headers({ "content-type": "application/json" }),
      },
      isCombo: true,
      comboName: name,
      userAgent: "unit-test",
      log: {
        debug() {},
        info(_tag: string, msg: string) {
          lines.push(msg);
        },
        warn() {},
        error() {},
      },
    } as never);
    assert.equal(result.response?.status, 200);
    assert.equal(calls.length, 1);
    assert.ok(
      !calls[0].includes("check\\n\\n\\n\\nthen report"),
      "lite should normalize the repeated blank lines"
    );
    assert.equal(
      lines.some((line) => line.includes("Proactive compression triggered")),
      false,
      lines.filter((line) => line.includes("triggered")).join("; ")
    );
  } finally {
    await updateCompressionSettings({ enabled: false, defaultMode: "off", autoTriggerTokens: 0 });
  }
});
