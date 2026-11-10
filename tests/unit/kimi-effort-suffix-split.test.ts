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
const { applyKimiCodingEffortVariant } =
  await import("../../open-sse/handlers/chatCore/kimiCodingEffortVariant.ts");
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
  provider = "kimi-coding",
  protocol = "claude"
): Promise<{ url: string; body: Json }> {
  const captured: Array<{ url: string; body: Json }> = [];
  globalThis.fetch = (async (url: unknown, init: RequestInit = {}) => {
    captured.push({ url: String(url), body: JSON.parse(String(init.body || "{}")) });
    const payload =
      protocol === "openai"
        ? {
            id: "chat_kimi",
            object: "chat.completion",
            created: 0,
            model: "k3.1-pro",
            choices: [
              { index: 0, message: { role: "assistant", content: "OK" }, finish_reason: "stop" },
            ],
            usage: { prompt_tokens: 3, completion_tokens: 1, total_tokens: 4 },
          }
        : {
            id: "msg_kimi",
            type: "message",
            role: "assistant",
            model: "k3",
            content: [{ type: "text", text: "OK" }],
            stop_reason: "end_turn",
            usage: { input_tokens: 3, output_tokens: 1 },
          };
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
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
      modelInfo: { provider, model, extendedContext: false, targetFormat: protocol },
      credentials: {
        apiKey: "test-kimi-key",
        providerSpecificData: { _omnirouteKimiTargetFormat: protocol },
      },
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
  assert.match(
    captured[0].url,
    protocol === "openai" ? /chat\/completions$/ : /messages\?beta=true$/
  );
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

test("K3.1 alias normalization does not synthesize effort before dispatch", () => {
  for (const provider of ["kimi-coding", "kimi-coding-apikey"]) {
    for (const [requested, wireModel] of [
      ["kimi-k3.1-pro", "k3.1-pro"],
      ["kimi-k3.1-pro-highspeed", "k3.1-pro-highspeed"],
    ]) {
      const body = { model: requested };
      const normalized = applyKimiCodingEffortVariant({
        provider,
        effectiveModel: requested,
        body,
      });
      assert.equal(normalized.effectiveModel, wireModel);
      assert.equal(body.model, wireModel);
      assert.equal(Object.hasOwn(body, "reasoning_effort"), false);

      const disabled = { model: `${requested}-high`, enable_thinking: false };
      applyKimiCodingEffortVariant({
        provider,
        effectiveModel: disabled.model,
        body: disabled,
      });
      assert.equal(disabled.model, wireModel);
      assert.equal(disabled.reasoning_effort, undefined);
    }
  }
});

test("K3.1 canonical aliases dispatch to wire ids with the executor default", async () => {
  for (const provider of ["kimi-coding", "kimi-coding-apikey"]) {
    for (const protocol of ["openai", "claude"]) {
      for (const [requested, wireModel] of [
        ["kimi-k3.1-pro", "k3.1-pro"],
        ["kimi-k3.1-pro-highspeed", "k3.1-pro-highspeed"],
      ]) {
        const { url, body } = await dispatchKimi(requested, {}, provider, protocol);
        const label = `${provider}/${requested} (${protocol}): ${url} ${JSON.stringify(body)}`;
        assert.equal(body.model, wireModel, label);
        assert.equal(body.reasoning_effort, undefined, label);
        assert.equal(body.reasoning, undefined, label);
        assert.equal(body.enable_thinking, undefined, label);
        if (protocol === "openai") {
          assert.deepEqual(body.thinking, { type: "enabled", effort: "max", keep: "all" }, label);
          assert.equal(body.output_config, undefined, label);
        } else {
          assert.deepEqual(body.thinking, { type: "enabled" }, label);
          assert.deepEqual(body.output_config, { effort: "max" }, label);
        }
      }
    }
  }
});

test("K3.1 canonical aliases preserve disabled-only and explicit-effort requests", async () => {
  for (const provider of ["kimi-coding", "kimi-coding-apikey"]) {
    for (const protocol of ["openai", "claude"]) {
      for (const [extra, expected] of [
        [{ enable_thinking: false }, null],
        [{ enable_thinking: false, reasoning_effort: "low" }, "low"],
      ]) {
        const { body } = await dispatchKimi("kimi-k3.1-pro", extra, provider, protocol);
        const label = `${provider} (${protocol}): ${JSON.stringify(extra)}`;
        assert.equal(body.model, "k3.1-pro", label);
        assert.equal(body.reasoning_effort, undefined, label);
        assert.equal(body.reasoning, undefined, label);
        assert.equal(body.enable_thinking, undefined, label);
        if (expected === null) {
          assert.deepEqual(body.thinking, { type: "disabled" }, label);
          assert.equal(body.output_config, undefined, label);
        } else if (protocol === "openai") {
          assert.deepEqual(
            body.thinking,
            { type: "enabled", effort: expected, keep: "all" },
            label
          );
        } else {
          assert.deepEqual(body.thinking, { type: "enabled" }, label);
          assert.deepEqual(body.output_config, { effort: expected }, label);
        }
      }
    }
  }
});

test("bare K3.1 Coding ids preserve enable_thinking false through both translators", async () => {
  for (const provider of ["kimi-coding", "kimi-coding-apikey"]) {
    for (const protocol of ["openai", "claude"]) {
      const { body } = await dispatchKimi(
        "k3.1-pro",
        { enable_thinking: false },
        provider,
        protocol
      );
      const label = `${provider}/k3.1-pro (${protocol})`;
      assert.equal(body.model, "k3.1-pro", label);
      assert.deepEqual(body.thinking, { type: "disabled" }, label);
      assert.equal(body.output_config, undefined, label);
      assert.equal(body.enable_thinking, undefined, label);
    }
  }
});

test("K3.1 canonical aliases stay intact in reasoning intent without fabricated effort", () => {
  for (const prefix of ["kimi-coding", "kmc", "kimi-coding-apikey", "kmca"]) {
    for (const model of ["kimi-k3.1-pro", "kimi-k3.1-pro-highspeed"]) {
      const id = `${prefix}/${model}`;
      const intent = extractReasoningIntent(id, {});
      assert.equal(intent.model, id);
      assert.equal(intent.effort, null);
      assert.equal(intent.sourceEffort, "missing");
      assert.equal(intent.hasReasoningSignal, false);
    }
  }
  const explicit = extractReasoningIntent("kmc/kimi-k3.1-pro", { reasoning_effort: "low" });
  assert.equal(explicit.model, "kmc/kimi-k3.1-pro");
  assert.equal(explicit.effort, "low");
});

test("K3.1 effort suffixes still split into the canonical model and request effort", () => {
  const high = extractReasoningIntent("kmc/kimi-k3.1-pro-high", {});
  assert.equal(high.model, "kmc/kimi-k3.1-pro");
  assert.equal(high.effort, "high");

  const low = extractReasoningIntent("kmca/kimi-k3.1-pro-highspeed-low", {});
  assert.equal(low.model, "kmca/kimi-k3.1-pro-highspeed");
  assert.equal(low.effort, "low");
});
