import { test } from "node:test";
import assert from "node:assert";
import { omniglyphEngine } from "../../../open-sse/services/compression/engines/omniglyphAdapter.ts";

// Corpo Claude denso o bastante para o gate de rentabilidade do omniglyph converter.
const DENSE =
  "X".repeat(500) +
  "\n" +
  Array.from(
    { length: 400 },
    (_, i) => `const row_${i} = compute(${i * 17}, "${"v".repeat(80)}");`
  ).join("\n");
function claudeBody(): Record<string, unknown> {
  return {
    model: "claude-fable-5",
    max_tokens: 128,
    system: DENSE,
    messages: [{ role: "user", content: [{ type: "text", text: "oi" }] }],
  };
}
const OK = {
  model: "claude-fable-5",
  supportsVision: true,
  providerTransport: "direct" as const,
  imageTransportFidelity: "byte-preserving" as const,
};
const GPT_OK = {
  model: "gpt-5.6",
  supportsVision: true,
  providerTransport: "direct" as const,
  imageTransportFidelity: "byte-preserving" as const,
  sourceFormat: "openai" as const,
  targetFormat: "openai" as const,
  compressionStage: "post-translation" as const,
};

function openaiChatBody(): Record<string, unknown> {
  return {
    model: "gpt-5.6",
    messages: [
      { role: "system", content: DENSE },
      { role: "user", content: "oi" },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "inspect_repository",
          description: DENSE,
          parameters: { type: "object", properties: { path: { type: "string" } } },
        },
      },
    ],
  };
}

function openaiResponsesBody(): Record<string, unknown> {
  return {
    model: "gpt-5.6",
    instructions: DENSE,
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "oi" }] }],
    tools: [
      {
        type: "function",
        name: "inspect_repository",
        description: DENSE,
        parameters: { type: "object", properties: { path: { type: "string" } } },
      },
    ],
  };
}

test("happy path: compress dense claude body into image blocks", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), OK);
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image"'));
});

test("skip fail-closed: sem supportsVision / transporte agregador / undefined", async () => {
  for (const opts of [
    { ...OK, supportsVision: false },
    { ...OK, providerTransport: "aggregator" as const },
    { model: "claude-fable-5", supportsVision: true }, // transport undefined
  ]) {
    const r = await omniglyphEngine.applyAsync!(claudeBody(), opts);
    assert.equal(r.compressed, false);
    assert.ok(!JSON.stringify(r.body).includes('"type":"image"'));
  }
});

test("skip fail-closed: direct route without image fidelity receipt", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), {
    ...OK,
    imageTransportFidelity: "unknown",
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:transport_fidelity_unknown"));
});

test("skip: modelo fora da allowlist medida", async () => {
  const body = { ...claudeBody(), model: "gpt-5.5" };
  const r = await omniglyphEngine.applyAsync!(body, { ...OK, model: "gpt-5.5" });
  assert.equal(r.compressed, false);
});

test("skip: body in OpenAI format (role system in messages)", async () => {
  const body = {
    model: "claude-fable-5",
    messages: [
      { role: "system", content: DENSE },
      { role: "user", content: "oi" },
    ],
  };
  const r = await omniglyphEngine.applyAsync!(body, OK);
  assert.equal(r.compressed, false);
});

test("client cache_control survives byte by byte", async () => {
  const body = claudeBody();
  (body.messages as Array<Record<string, unknown>>).push({
    role: "user",
    content: [{ type: "text", text: "âncora", cache_control: { type: "ephemeral" } }],
  });
  const r = await omniglyphEngine.applyAsync!(body, OK);
  assert.ok(JSON.stringify(r.body).includes('"cache_control"'));
});

test("preserveSystemPrompt keeps the system native and can still compress tool_result", async () => {
  const body = {
    ...claudeBody(),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "call_1",
            content: DENSE,
          },
        ],
      },
    ],
  };
  const r = await omniglyphEngine.applyAsync!(body, {
    ...OK,
    config: { preserveSystemPrompt: true } as never,
  });
  assert.equal(r.compressed, true);
  assert.equal((r.body as { system?: unknown }).system, DENSE);
  assert.ok(JSON.stringify(r.body).includes('"type":"image"'));
});

test("apply sync is a safe pass-through (async-only engine)", () => {
  const body = claudeBody();
  const r = omniglyphEngine.apply(body, OK);
  assert.equal(r.compressed, false);
  assert.deepEqual(r.body, body);
});

test("fail-open: error in transform becomes skip, never propagates", async () => {
  const body = claudeBody() as Record<string, unknown>;
  (body as { self?: unknown }).self = body; // referência circular → JSON.stringify lança
  const r = await omniglyphEngine.applyAsync!(body, OK);
  assert.equal(r.compressed, false);
  assert.deepEqual(r.body, body); // corpo original devolvido intacto
});

test("current version: transform Chat Completions OpenAI into post-translation wire", async () => {
  const r = await omniglyphEngine.applyAsync!(openaiChatBody(), GPT_OK);
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image_url"'));
});

test("current version: transforms OpenAI Responses while preserving input[]", async () => {
  const options = { ...GPT_OK, targetFormat: "openai-responses" as const };
  const r = await omniglyphEngine.applyAsync!(openaiResponsesBody(), options);
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"input_image"'));
  assert.ok(Array.isArray((r.body as { input?: unknown }).input));
});

test("OpenAI does not run in the pre-translation stage", async () => {
  const r = await omniglyphEngine.applyAsync!(openaiChatBody(), {
    ...GPT_OK,
    compressionStage: "pre-translation",
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:requires_post_translation"));
});

// OmniGlyph 1.4.0 introduced security scopes (`coding-safe`/`balanced`/
// `aggressive`/`passthrough`) and started resolving them inside
// `isOmniGlyphSupportedModel()`, lendo `process.env.OMNIGLYPH_PROFILE`. Isso
// transforms a HOST environment variable into a silent TODO gate
// request do OmniRoute: um `OMNIGLYPH_PROFILE=passthrough` exportado no shell
// of the process would shut down the engine without any OmniRoute configuration
// had changed — and without any sign in the UI. The policy is from OmniRoute; the
// adapter tem de passar o escopo explicitamente.
async function withEnv<T>(key: string, value: string, fn: () => Promise<T>): Promise<T> {
  const had = Object.prototype.hasOwnProperty.call(process.env, key);
  const previous = process.env[key];
  process.env[key] = value;
  try {
    return await fn();
  } finally {
    if (had) process.env[key] = previous;
    else delete process.env[key];
  }
}

test("Host OMNIGLYPH_PROFILE does not decide OmniRoute model gate", async () => {
  const r = await withEnv("OMNIGLYPH_PROFILE", "passthrough", () =>
    omniglyphEngine.applyAsync!(claudeBody(), OK)
  );
  assert.equal(
    r.compressed,
    true,
    "env do processo não pode desligar a engine: o escopo vem da config do OmniRoute"
  );
});

test("host's OMNIGLYPH_PROFILE does not expand the OmniRoute model allowlist", async () => {
  const body = { ...claudeBody(), model: "claude-sonnet-5" };
  const r = await withEnv("OMNIGLYPH_PROFILE", "aggressive", () =>
    withEnv("OMNIGLYPH_MODELS", "claude-fable-5,claude-sonnet-5", () =>
      omniglyphEngine.applyAsync!(body, { ...OK, model: "claude-sonnet-5" })
    )
  );
  assert.equal(r.compressed, false, "modelo sem recibo medido não pode entrar via env do host");
  assert.ok(r.stats?.techniquesUsed.includes("skip:model_not_approved"));
});

// ---------------------------------------------------------------------------
// Semantic profiles (OmniGlyph 1.4.0)
//
// `transformAnthropicMessages()` resolves and merges the profile itself, but the
// OpenAI transformers receive raw `TransformOptions` and DO NOT know
// `profile`. Without explicit host merging, a profile chosen by the operator
// would be valid in the Claude wire and would be silently ignored in the OpenAI wire.
// ---------------------------------------------------------------------------

/** History long enough for the collapse to take effect even with the native system. */
function claudeBodyWithHistory(): Record<string, unknown> {
  const messages: Array<Record<string, unknown>> = [];
  for (let i = 0; i < 40; i++) {
    messages.push({ role: "user", content: [{ type: "text", text: `pergunta ${i}: ${DENSE}` }] });
    messages.push({
      role: "assistant",
      content: [{ type: "text", text: `resposta ${i}: ${DENSE}` }],
    });
  }
  messages.push({ role: "user", content: [{ type: "text", text: "oi" }] });
  return { model: "claude-fable-5", max_tokens: 128, system: DENSE, messages };
}

test("coding-safe profile arrives in the OpenAI wire (not just the Anthropic wrapper)", async () => {
  const aggressive = await omniglyphEngine.applyAsync!(openaiChatBody(), {
    ...GPT_OK,
    stepConfig: { profile: "aggressive" } as never,
  });
  assert.equal(aggressive.compressed, true, "aggressive é a política medida atual");

  const codingSafe = await omniglyphEngine.applyAsync!(openaiChatBody(), {
    ...GPT_OK,
    stepConfig: { profile: "coding-safe" } as never,
  });
  assert.equal(
    codingSafe.compressed,
    false,
    "coding-safe mantém system e schemas de tools nativos no wire OpenAI"
  );
  assert.ok(
    codingSafe.stats?.techniquesUsed.some((t) => t.startsWith("skip:below_min_chars")),
    `esperado skip por minCompressChars, veio ${JSON.stringify(codingSafe.stats?.techniquesUsed)}`
  );
});

test("profile is CEILING, not floor: coding-safe keeps the system native even without preserveSystemPrompt", async () => {
  const body = claudeBodyWithHistory();
  const r = await omniglyphEngine.applyAsync!(body, {
    ...OK,
    stepConfig: { profile: "coding-safe", preserveSystemPrompt: false } as never,
  });
  assert.equal(r.compressed, true, "o histórico antigo ainda colapsa");
  assert.equal(
    (r.body as { system?: unknown }).system,
    DENSE,
    "coding-safe não deixa um override do chamador reabrir a compressão do system"
  );
});

test("passthrough profile turns off the engine without touching the body", async () => {
  const body = claudeBodyWithHistory();
  const r = await omniglyphEngine.applyAsync!(body, {
    ...OK,
    stepConfig: { profile: "passthrough" } as never,
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:profile_passthrough"));
  assert.deepEqual(r.body, body);
});

test("invalid profile fails closed, does not propagate exception", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), {
    ...OK,
    stepConfig: { profile: "turbo-max" } as never,
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:invalid_profile"));
});

test("preserveSystemPrompt: wire OpenAI skips, because the package doesn't know how to preserve system there", async () => {
  // OmniGlyph 1.4.0's OpenAI transform only honors compressTools, gptHistory,
  // minCompressChars and reflow — there is no compressSystem in this wire, and the
  // instruction always becomes a pointer to the image. Imaging like that would burn the
  // hot prefix that OmniRoute's cache-aware decision ordered to preserve, and the
  // OmniRoute would have no way of knowing. With no option to honor the policy, jump.
  const r = await omniglyphEngine.applyAsync!(openaiChatBody(), {
    ...GPT_OK,
    config: { preserveSystemPrompt: true } as never,
  });
  assert.equal(r.compressed, false);
  assert.ok(r.stats?.techniquesUsed.includes("skip:system_preservation_unsupported_on_wire"));
  assert.deepEqual(r.body, openaiChatBody());
});
