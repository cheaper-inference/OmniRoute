import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// handleChatCore and the reasoning policy touch the DB: isolate DATA_DIR before importing
// them and release + remove it afterwards (PII learning #3).
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-suffix-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { extractReasoningIntent } = await import("../../src/lib/reasoningRouting/policy.ts");
const { splitKimiCodingEffortVariant } =
  await import("../../open-sse/utils/kimiCodingEffortVariant.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

type Json = Record<string, unknown>;
const originalFetch = globalThis.fetch;

test.after(async () => {
  globalThis.fetch = originalFetch;
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function dispatchKimi(
  model: string,
  extraBody: Json = {},
  provider = "kimi-coding"
): Promise<{ url: string; body: Json }> {
  const captured: Array<{ url: string; body: Json }> = [];
  globalThis.fetch = (async (url: unknown, init: RequestInit = {}) => {
    captured.push({ url: String(url), body: JSON.parse(String(init.body || "{}")) });
    return new Response(
      JSON.stringify({
        id: "msg_kimi",
        type: "message",
        role: "assistant",
        model: "k3",
        content: [{ type: "text", text: "OK" }],
        stop_reason: "end_turn",
        usage: { input_tokens: 3, output_tokens: 1 },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;

  const body = {
    model,
    stream: false,
    max_tokens: 32,
    messages: [{ role: "user", content: "hello" }],
    ...extraBody,
  };
  try {
    const result = await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider, model, extendedContext: false },
      credentials: { apiKey: "test-kimi-key", providerSpecificData: {} },
      log: { debug() {}, info() {}, warn() {}, error() {} },
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(body),
        headers: new Headers({ "content-type": "application/json" }),
      },
    } as never);
    await (result as { response?: Response }).response?.body?.cancel?.().catch(() => {});
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.equal(captured.length, 1, "exactly one upstream call");
  return captured[0];
}

// ── Dispatch: the upstream receives the bare wire id + the effort (the 401 fix) ──────────

test("kimi-coding dispatches kimi-k3-high as k3 with effort high", async () => {
  const { url, body } = await dispatchKimi("kimi-k3-high");
  assert.match(url, /api\.kimi\.com\/coding\/v1\/messages/);
  assert.equal(body.model, "k3");
  assert.deepEqual(body.output_config, { effort: "high" });
  assert.equal((body.thinking as Json | undefined)?.type, "enabled");
});

test("a registry base with a suffix keeps its own id (kimi-for-coding-low)", async () => {
  const { body } = await dispatchKimi("kimi-for-coding-low");
  assert.equal(body.model, "kimi-for-coding");
  assert.deepEqual(body.output_config, { effort: "low" });
});

test("an explicit client effort wins over the suffix", async () => {
  const { body } = await dispatchKimi("kimi-k3-high", { reasoning_effort: "low" });
  assert.equal(body.model, "k3");
  assert.deepEqual(body.output_config, { effort: "low" });
});

test("kimi-coding-apikey gets the same strip", async () => {
  const { body } = await dispatchKimi("kimi-k3-max", {}, "kimi-coding-apikey");
  assert.equal(body.model, "k3");
  assert.deepEqual(body.output_config, { effort: "max" });
});

test("registry ids pass through untouched", async () => {
  for (const id of ["k3", "kimi-for-coding-highspeed"]) {
    const { body } = await dispatchKimi(id);
    assert.equal(body.model, id);
  }
});

// ── Splitter scope ──────────────────────────────────────────────────────────────────────

test("the splitter never touches another provider's genuine suffixed ids", () => {
  // Cursor registers kimi-k3-high / kimi-k3-low as real upstream ids.
  for (const provider of ["cursor", "cu", "moonshot", "opencode", null, undefined]) {
    assert.equal(splitKimiCodingEffortVariant(provider, "kimi-k3-high"), null, String(provider));
  }
  // Unknown bases and non-Kimi tiers are not inferred from spelling.
  assert.equal(splitKimiCodingEffortVariant("kimi-coding", "kimi-k9-high"), null);
  assert.equal(splitKimiCodingEffortVariant("kimi-coding", "kimi-k3-xhigh"), null);
  assert.equal(splitKimiCodingEffortVariant("kimi-coding", "kimi-k3-ultra"), null);
  assert.deepEqual(splitKimiCodingEffortVariant("kimi-coding", "kmc/kimi-k3-high"), {
    wireModel: "k3",
    effort: "high",
  });
});

// ── Reasoning-rule intent mirrors the dispatch split, only for Kimi Coding prefixes ─────

test("kimi-coding / kmc prefixed ids split into the base model + request effort", () => {
  const intent = extractReasoningIntent("kimi-coding/kimi-k3-high", {});
  assert.equal(intent.model, "kimi-coding/kimi-k3");
  assert.equal(intent.effort, "high");

  const kmc = extractReasoningIntent("kmc/kimi-k3-high", {});
  assert.equal(kmc.model, "kmc/kimi-k3");
  assert.equal(kmc.effort, "high");
});

test("bare or foreign-prefixed suffixed ids are not split (Cursor's kimi-k3-high)", () => {
  for (const id of ["kimi-k3-high", "k3-high", "cursor/kimi-k3-high", "cu/kimi-k3-low"]) {
    const intent = extractReasoningIntent(id, {});
    assert.equal(intent.model, id);
    assert.equal(intent.effort, null);
  }
});

test("real kimi wire ids pass through unsplit", () => {
  for (const id of [
    "kimi-coding/k3",
    "kimi-coding/kimi-for-coding",
    "kimi-coding/kimi-for-coding-highspeed",
    "kimi-coding/kimi-k3-xhigh",
  ]) {
    const intent = extractReasoningIntent(id, {});
    assert.equal(intent.model, id);
    assert.equal(intent.effort, null);
  }
});

test("explicit request effort still wins over the suffix", () => {
  const intent = extractReasoningIntent("kimi-coding/kimi-k3-high", {
    reasoning_effort: "low",
  });
  assert.equal(intent.model, "kimi-coding/kimi-k3");
  assert.equal(intent.effort, "low");
});
