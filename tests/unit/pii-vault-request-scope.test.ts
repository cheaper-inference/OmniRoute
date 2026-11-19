// Reversible PII vault, design sections 1, 3, 5 and 6.4-6.9: one vault per client request,
// restored once on the response leaving handleChat. Covers non-streaming shapes, the fusion
// judge leak, combo/isolation, lifecycle, logs and the PII_RESPONSE_SANITIZATION interaction.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pii-vault-scope-"));
process.env.PII_REDACTION_ENABLED = "true";
process.env.PII_REVERSIBLE_VAULT_ENABLED = "true";

const { runWithRequestTokenVault, detokenizeResponse } =
  await import("../../src/lib/pii/requestTokenVaultScope.ts");
const { RequestTokenVault, getActiveRequestTokenVault, getLiveTokenVaultCount } =
  await import("../../src/lib/pii/tokenVault.ts");
const { PIIMaskerGuardrail } = await import("../../src/lib/guardrails/piiMasker.ts");
const { buildNonStreamingJsonResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingJsonResponse.ts");
const { handleFusionChat } = await import("../../open-sse/services/fusion.ts");
const { createPiiSseTransform } = await import("../../src/lib/streamingPiiTransform.ts");
const { sanitizePII } = await import("../../src/lib/piiSanitizer.ts");
const { processPII, INJECTION_PATTERNS } = await import("../../src/shared/utils/inputSanitizer.ts");
const { clearAllFeatureFlagOverrides } = await import("../../src/lib/db/featureFlags.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { runMemoryExtractionGate } =
  await import("../../open-sse/handlers/chatCore/memoryExtraction.ts");
const { storeSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/semanticCacheStore.ts");
const { storeStreamingSemanticCacheResponse } =
  await import("../../open-sse/handlers/chatCore/streamingSemanticCacheStore.ts");

clearAllFeatureFlagOverrides();
test.after(() => {
  clearAllFeatureFlagOverrides();
  resetDbInstance();
});

const EMAIL = "jane.doe@example.com";
const silentLog = { warn() {} };

/** The pre-call step of handleChat: mask the prompt with the request's vault. */
async function maskPrompt(prompt: string): Promise<string> {
  const result = await new PIIMaskerGuardrail().preCall(
    { messages: [{ role: "user", content: prompt }] },
    { tokenVault: getActiveRequestTokenVault() ?? null }
  );
  return (result.modifiedPayload as { messages: Array<{ content: string }> }).messages[0].content;
}

const tokenIn = (text: string) => text.match(/<<PII_[A-Z0-9_]+>>/)![0];

function sseResponse(body: BodyInit, status = 200) {
  return new Response(body, { status, headers: { "Content-Type": "text/event-stream" } });
}

// ─── Non-streaming shapes ────────────────────────────────────────────────────

test("chat completion JSON: original restored, Content-Length, status and headers preserved", async () => {
  const response = await runWithRequestTokenVault(
    async () => {
      const masked = await maskPrompt(`write to ${EMAIL}`);
      assert.doesNotMatch(masked, /example\.com/);
      return buildNonStreamingJsonResponse(
        {
          id: "c1",
          choices: [
            { index: 0, message: { role: "assistant", content: `Sent to ${tokenIn(masked)}` } },
          ],
        },
        { "Content-Type": "application/json", "X-OmniRoute-Probe": "kept" }
      );
    },
    { log: silentLog }
  );
  const text = await response.text();
  assert.equal(JSON.parse(text).choices[0].message.content, `Sent to ${EMAIL}`);
  assert.equal(response.headers.get("content-length"), String(Buffer.byteLength(text)));
  assert.equal(response.headers.get("x-omniroute-probe"), "kept");
  assert.equal(response.status, 200);
});

test("Claude tool_use input, OpenAI tool_calls arguments and Responses output[] are restored", async () => {
  const quoted = 'Rua "B" \\ 7';
  const response = await runWithRequestTokenVault(
    async () => {
      const vault = getActiveRequestTokenVault()!;
      const tEmail = tokenIn(await maskPrompt(`mail ${EMAIL}`));
      const tAddr = vault.tokenize("custom:address", quoted)!;
      return buildNonStreamingJsonResponse(
        {
          claude: {
            content: [
              { type: "tool_use", id: "t", name: "send", input: { to: tEmail } },
              { type: "text", text: tEmail },
            ],
          },
          openai: {
            choices: [
              {
                message: {
                  tool_calls: [
                    {
                      id: "c",
                      function: { name: "ship", arguments: JSON.stringify({ address: tAddr }) },
                    },
                  ],
                },
              },
            ],
          },
          responses: {
            output: [
              { type: "message", content: [{ type: "output_text", text: `hi ${tEmail}` }] },
              { type: "function_call", call_id: "fc_1", arguments: JSON.stringify({ to: tEmail }) },
            ],
            output_text: `hi ${tEmail}`,
          },
        },
        { "Content-Type": "application/json" }
      );
    },
    { log: silentLog }
  );
  const body = await response.json();
  assert.equal(body.claude.content[0].input.to, EMAIL);
  assert.equal(body.claude.content[1].text, EMAIL);
  assert.deepEqual(JSON.parse(body.openai.choices[0].message.tool_calls[0].function.arguments), {
    address: quoted,
  });
  assert.equal(body.responses.output[0].content[0].text, `hi ${EMAIL}`);
  assert.deepEqual(JSON.parse(body.responses.output[1].arguments), { to: EMAIL });
  assert.equal(body.responses.output_text, `hi ${EMAIL}`);
});

test("a Responses body forced to SSE reaches the exit as SSE and is restored", async () => {
  const response = await runWithRequestTokenVault(
    async () => {
      const token = tokenIn(await maskPrompt(`mail ${EMAIL}`));
      return sseResponse(
        `event: response.output_text.delta\ndata: ${JSON.stringify({ type: "response.output_text.delta", output_index: 0, delta: `to ${token}` })}\n\n` +
          `event: response.completed\ndata: ${JSON.stringify({ type: "response.completed", response: { output_text: `to ${token}` } })}\n\n`
      );
    },
    { log: silentLog }
  );
  const text = await response.text();
  assert.ok(text.includes(`"delta":"to ${EMAIL}"`), text);
  assert.doesNotMatch(text, /<<PII_/);
});

test("error responses (4xx/5xx) are not detokenized and keep their object identity", async () => {
  let original: Response | null = null;
  const response = await runWithRequestTokenVault(
    async () => {
      const token = tokenIn(await maskPrompt(`mail ${EMAIL}`));
      original = new Response(JSON.stringify({ error: { message: `bad input near ${token}` } }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
      return original;
    },
    { log: silentLog }
  );
  assert.equal(response, original);
  assert.match(await response.text(), /<<PII_EMAIL_/);
});

// ─── Fusion: the judge never sees an original value ─────────────────────────

test("fusion: panel answers and the judge prompt carry tokens only; the client gets the original", async () => {
  const judgeBodies: string[] = [];
  const noop = () => {};
  const response = await runWithRequestTokenVault(
    async () => {
      const masked = await maskPrompt(`Draft an email to ${EMAIL}`);
      const token = tokenIn(masked);
      const handleSingleModel = async (body: Record<string, unknown>, model: string) => {
        if (model === "judge/model") {
          judgeBodies.push(JSON.stringify(body));
          return buildNonStreamingJsonResponse(
            { choices: [{ message: { role: "assistant", content: `Final: write to ${token}` } }] },
            { "Content-Type": "application/json" }
          );
        }
        // Each panel member goes through the real chatCore JSON leaf, as in production.
        return buildNonStreamingJsonResponse(
          { choices: [{ message: { role: "assistant", content: `${model} says mail ${token}` } }] },
          { "Content-Type": "application/json" }
        );
      };
      return handleFusionChat({
        body: { model: "fusion-combo", messages: [{ role: "user", content: masked }] },
        models: ["prov/a", "prov/b"],
        judgeModel: "judge/model",
        handleSingleModel: handleSingleModel as never,
        log: { info: noop, warn: noop, debug: noop, error: noop } as never,
      });
    },
    { log: silentLog }
  );
  assert.equal(judgeBodies.length, 1);
  assert.match(judgeBodies[0], /<<PII_EMAIL_[A-Z]{8}_\d>>/);
  assert.doesNotMatch(
    judgeBodies[0],
    /jane\.doe@example\.com/,
    "the judge provider never sees the original"
  );
  const body = await response.json();
  assert.equal(body.choices[0].message.content, `Final: write to ${EMAIL}`);
});

// ─── Combo legs, retries, isolation ─────────────────────────────────────────

test("combo: legs share one vault minted once; the winning leg's token resolves", async () => {
  const response = await runWithRequestTokenVault(
    async () => {
      const masked = await maskPrompt(`mail ${EMAIL}`);
      const vault = getActiveRequestTokenVault()!;
      const token = tokenIn(masked);
      // First leg fails, a retry and the second leg see the same vault and the same token.
      const legs = await Promise.all([
        (async () => ({ ok: false, vault: getActiveRequestTokenVault() }))(),
        (async () => ({ ok: true, vault: getActiveRequestTokenVault() }))(),
      ]);
      assert.ok(legs.every((leg) => leg.vault === vault));
      assert.equal(vault.size, 1, "minted once for the whole request");
      return buildNonStreamingJsonResponse(
        { choices: [{ message: { content: `second leg: ${token}` } }] },
        { "Content-Type": "application/json" }
      );
    },
    { log: silentLog }
  );
  assert.equal((await response.json()).choices[0].message.content, `second leg: ${EMAIL}`);
});

test("isolation: request B cannot resolve request A's token, even when it is forged into B", async () => {
  let tokenA = "";
  const reqA = runWithRequestTokenVault(
    async () => {
      tokenA = tokenIn(await maskPrompt(`mail ${EMAIL}`));
      await new Promise((r) => setTimeout(r, 10));
      return buildNonStreamingJsonResponse(
        { text: tokenA },
        { "Content-Type": "application/json" }
      );
    },
    { log: silentLog }
  );
  const reqB = runWithRequestTokenVault(
    async () => {
      await maskPrompt("mail other@example.org");
      while (!tokenA) await new Promise((r) => setTimeout(r, 1));
      return buildNonStreamingJsonResponse(
        { text: `leaked? ${tokenA}` },
        { "Content-Type": "application/json" }
      );
    },
    { log: silentLog }
  );
  const [a, b] = await Promise.all([reqA, reqB]);
  assert.equal((await a.json()).text, EMAIL);
  assert.equal((await b.json()).text, `leaked? ${tokenA}`);
});

// ─── Lifecycle: no timers, dispose on end / cancel / error ──────────────────

function tokenStream(token: string, opts: { fail?: boolean } = {}) {
  const enc = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        enc.encode(
          `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: token } }] })}\n\n`
        )
      );
      if (opts.fail) controller.error(new Error("upstream reset"));
    },
  });
}

test("the vault is disposed when the stream ends, is cancelled, or errors upstream", async () => {
  const base = getLiveTokenVaultCount();

  const done = await runWithRequestTokenVault(
    async () => {
      const token = tokenIn(await maskPrompt(`mail ${EMAIL}`));
      return sseResponse(
        `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: token } }] })}\n\ndata: [DONE]\n\n`
      );
    },
    { log: silentLog }
  );
  assert.equal(getLiveTokenVaultCount(), base + 1, "alive while the body is unread");
  assert.match(await done.text(), /jane\.doe@example\.com/);
  assert.equal(getLiveTokenVaultCount(), base, "disposed after the stream drained");

  const cancelled = await runWithRequestTokenVault(
    async () => {
      const token = tokenIn(await maskPrompt(`mail ${EMAIL}`));
      return new Response(tokenStream(token), { headers: { "Content-Type": "text/event-stream" } });
    },
    { log: silentLog }
  );
  const reader = cancelled.body!.getReader();
  await reader.read();
  await reader.cancel("client went away");
  assert.equal(getLiveTokenVaultCount(), base, "disposed on cancel");

  const errored = await runWithRequestTokenVault(
    async () => {
      const token = tokenIn(await maskPrompt(`mail ${EMAIL}`));
      return new Response(tokenStream(token, { fail: true }), {
        headers: { "Content-Type": "text/event-stream" },
      });
    },
    { log: silentLog }
  );
  await assert.rejects(errored.text());
  assert.equal(getLiveTokenVaultCount(), base, "disposed on upstream error");

  await assert.rejects(
    runWithRequestTokenVault(
      async () => {
        await maskPrompt(`mail ${EMAIL}`);
        throw new Error("handler failed");
      },
      { log: silentLog }
    )
  );
  assert.equal(getLiveTokenVaultCount(), base, "disposed when the handler throws");
});

// ─── Logs never carry the original ──────────────────────────────────────────

test("console and the vault logger see counts only, never the original value", async () => {
  const captured: string[] = [];
  const methods = ["log", "info", "warn", "error", "debug"] as const;
  const saved = methods.map((m) => console[m]);
  for (const m of methods) {
    console[m] = (...args: unknown[]) => {
      captured.push(args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
    };
  }
  const warnings: unknown[] = [];
  try {
    const response = await runWithRequestTokenVault(
      async () => {
        const token = tokenIn(await maskPrompt(`mail ${EMAIL}`));
        return sseResponse(
          `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: `${token} and <<PII_EMAIL_ZZZZZZZZ_9>>` } }] })}\n\ndata: [DONE]\n\n`
        );
      },
      { log: { warn: (meta: unknown, msg: unknown) => warnings.push({ meta, msg }) } }
    );
    assert.match(await response.text(), /jane\.doe@example\.com/);
  } finally {
    methods.forEach((m, i) => (console[m] = saved[i]));
  }
  assert.equal(warnings.length, 1, "one count-only warning for the unresolved token");
  const dumped = JSON.stringify(warnings) + captured.join("\n");
  assert.doesNotMatch(dumped, /jane\.doe@example\.com/);
  assert.match(JSON.stringify(warnings), /"unresolved":1/);
});

// ─── PII_RESPONSE_SANITIZATION runs before the exit and only sees tokens ─────

test("response sanitization redacts model-generated PII; restored originals pass, block mode included", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
  try {
    const nonStreaming = await runWithRequestTokenVault(
      async () => {
        const token = tokenIn(await maskPrompt(`mail ${EMAIL}`));
        const modelJson = {
          choices: [{ message: { content: `user ${token}, also bob@other.org` } }],
        };
        // The non-streaming post-call guardrail runs inside chatCore, before the exit.
        const post = await new PIIMaskerGuardrail().postCall(modelJson, {});
        return buildNonStreamingJsonResponse(post.modifiedResponse ?? modelJson, {
          "Content-Type": "application/json",
        });
      },
      { log: silentLog }
    );
    const content = (await nonStreaming.json()).choices[0].message.content as string;
    assert.match(content, /user jane\.doe@example\.com/);
    assert.doesNotMatch(content, /bob@other\.org/);

    const streaming = await runWithRequestTokenVault(
      async () => {
        const token = tokenIn(await maskPrompt(`mail ${EMAIL}`));
        const upstream = sseResponse(
          `data: ${JSON.stringify({ choices: [{ index: 0, delta: { content: `user ${token}, also bob@other.org` } }] })}\n\n` +
            `data: ${JSON.stringify({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] })}\n\ndata: [DONE]\n\n`
        );
        return sseResponse(upstream.body!.pipeThrough(createPiiSseTransform()));
      },
      { log: silentLog }
    );
    const streamed = (await streaming.text())
      .split("\n")
      .filter((l) => l.startsWith("data: {"))
      .map((l) => JSON.parse(l.slice(6)).choices?.[0]?.delta?.content ?? "")
      .join("");
    assert.match(streamed, /user jane\.doe@example\.com/);
    assert.doesNotMatch(streamed, /bob@other\.org/);

    process.env.PII_RESPONSE_SANITIZATION_MODE = "block";
    const blocked = await runWithRequestTokenVault(
      async () => {
        const token = tokenIn(await maskPrompt(`mail ${EMAIL}`));
        const modelJson = { choices: [{ message: { content: `user ${token}` } }] };
        const post = await new PIIMaskerGuardrail().postCall(modelJson, {});
        assert.equal(post.block, false, "a token alone never trips block mode");
        return buildNonStreamingJsonResponse(post.modifiedResponse ?? modelJson, {
          "Content-Type": "application/json",
        });
      },
      { log: silentLog }
    );
    assert.equal((await blocked.json()).choices[0].message.content, `user ${EMAIL}`);
  } finally {
    delete process.env.PII_RESPONSE_SANITIZATION;
    delete process.env.PII_RESPONSE_SANITIZATION_MODE;
  }
});

test("property: no built-in request, response or injection pattern matches a vault token", () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
  try {
    const types = [
      "email",
      "cpf",
      "cnpj",
      "credit_card",
      "iban",
      "phone_br",
      "ssn_us",
      "za_id",
      "custom:x",
    ];
    for (let i = 0; i < 300; i++) {
      const vault = new RequestTokenVault();
      const tokens: string[] = [];
      for (let n = 0; n < 12; n++)
        tokens.push(vault.tokenize(types[n % types.length], `value-${i}-${n}`)!);
      const sample = tokens.join(" ");
      assert.deepEqual(processPII(sample, false).detections, [], sample);
      assert.equal(sanitizePII(sample).redacted, false, sample);
      for (const rule of INJECTION_PATTERNS) assert.doesNotMatch(sample, rule.pattern, rule.name);
      vault.dispose();
    }
  } finally {
    delete process.env.PII_RESPONSE_SANITIZATION;
    delete process.env.PII_RESPONSE_SANITIZATION_MODE;
  }
});

// ─── Memory, idempotency and semantic cache are not written when tokens were minted ───

test("memory extraction and both semantic cache writes are skipped when tokens were minted", () => {
  const facts: string[] = [];
  const memoryInput = {
    memoryOwnerId: "key-1",
    memorySettings: { enabled: true, maxTokens: 1000 },
    videoBridgeObserved: false,
    pipelineSessionId: "s",
    requestBody: { messages: [{ role: "user", content: "I live in Lisbon" }] },
    responseBody: { choices: [{ message: { content: "Noted" } }] },
    extractFacts: (text: string) => facts.push(text),
  };
  runMemoryExtractionGate({ ...memoryInput, piiTokensMinted: true });
  assert.equal(facts.length, 0);
  runMemoryExtractionGate({ ...memoryInput, piiTokensMinted: false });
  assert.ok(facts.length > 0, "control: extraction runs without minted tokens");

  let writes = 0;
  const deps = {
    isCacheableForWrite: () => true,
    isTruncatedCompletion: () => false,
    isTruncatedStreamBody: () => false,
    isSmallEnoughForSemanticCache: () => true,
    generateSignature: () => "sig",
    setCachedResponse: () => {
      writes++;
    },
  };
  const body = { messages: [{ role: "user", content: "x" }], temperature: 0 };
  storeSemanticCacheResponse(
    {
      enabled: true,
      body,
      headers: {},
      translatedResponse: null,
      model: "m",
      piiTokensMinted: true,
    },
    deps as never
  );
  storeStreamingSemanticCacheResponse(
    {
      enabled: true,
      streamStatus: 200,
      streamResponseBody: { a: 1 },
      body,
      headers: {},
      model: "m",
      piiTokensMinted: true,
    },
    deps as never
  );
  assert.equal(writes, 0);
  storeSemanticCacheResponse(
    { enabled: true, body, headers: {}, translatedResponse: null, model: "m" },
    deps as never
  );
  assert.equal(writes, 1, "control: the write runs without minted tokens");
});

test("detokenizeResponse leaves an unsupported content type literal and disposes the vault", async () => {
  const vault = new RequestTokenVault();
  const token = vault.tokenize("email", EMAIL)!;
  const warnings: unknown[] = [];
  const original = new Response(`text ${token}`, { headers: { "Content-Type": "text/plain" } });
  const out = await detokenizeResponse(original, vault, {
    log: { warn: (m: unknown) => warnings.push(m) },
  });
  assert.equal(out, original);
  assert.equal(vault.disposed, true);
  assert.equal(warnings.length, 1);
  assert.doesNotMatch(JSON.stringify(warnings), /example\.com/);
});
