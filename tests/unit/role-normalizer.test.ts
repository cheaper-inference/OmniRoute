import test from "node:test";
import assert from "node:assert/strict";

const { normalizeDeveloperRole, normalizeModelRole, normalizeSystemRole, normalizeRoles } =
  await import("../../open-sse/services/roleNormalizer.ts");
const { sanitizeResponsesInputItems } =
  await import("../../open-sse/services/responsesInputSanitizer.ts");

test("normalizeDeveloperRole preserves developer for official openai provider by default", () => {
  const messages = [{ role: "developer", content: "internal policy" }];
  const result = normalizeDeveloperRole(messages, "openai", undefined, "openai");
  assert.deepEqual(result, messages);
});

test("normalizeDeveloperRole maps developer to system when compatibility mode disables preservation", () => {
  const messages = [{ role: "DeVeloper", content: "internal policy" }];
  const result = normalizeDeveloperRole(messages, "openai", false);

  assert.deepEqual(result, [{ role: "system", content: "internal policy" }]);
});

test("#2281 normalizeDeveloperRole maps developer to system for non-openai providers by default", () => {
  const messages = [{ role: "developer", content: "internal policy" }];
  // Without explicit preserveDeveloperRole, OpenAI-compatible providers that
  // reject `developer` (DeepSeek, MiniMax, Mimo, GLM, etc.) should default
  // to converting it to `system`.
  // `github` (Copilot) is unverified for `developer` and custom `openai-compatible-*`
  // nodes front arbitrary gateways — both default to `system` (opt in via compat toggle).
  for (const provider of [
    "deepseek",
    "minimax",
    "xiaomi-mimo",
    "glm",
    "fireworks",
    "together",
    "github",
    "openai-compatible-minimax",
  ]) {
    const result = normalizeDeveloperRole(messages, "openai", undefined, provider);
    assert.deepEqual(
      result,
      [{ role: "system", content: "internal policy" }],
      `expected developer→system for provider ${provider}`
    );
  }
});

test("#2281 normalizeDeveloperRole preserves developer for openai-family providers", () => {
  const messages = [{ role: "developer", content: "internal policy" }];
  for (const provider of ["openai", "azure-openai", "azure", "azure-openai-gov"]) {
    const result = normalizeDeveloperRole(messages, "openai", undefined, provider);
    assert.deepEqual(result, messages, `expected developer preserved for provider ${provider}`);
  }
});

test("#2281 explicit preserveDeveloperRole=true overrides provider default", () => {
  const messages = [{ role: "developer", content: "internal policy" }];
  const result = normalizeDeveloperRole(messages, "openai", true, "deepseek");
  // Operator forced preservation via dashboard "Compatibility" toggle.
  assert.deepEqual(result, messages);
});

test("normalizeModelRole maps model to assistant case-insensitively", () => {
  const messages = [{ role: "MoDeL", content: "generated text" }];
  const result = normalizeModelRole(messages);

  assert.deepEqual(result, [{ role: "assistant", content: "generated text" }]);
});

test("normalizeSystemRole leaves supported provider-model pairs untouched", () => {
  const messages = [
    { role: "system", content: "follow policy" },
    { role: "user", content: "say hello" },
  ];

  const result = normalizeSystemRole(messages, "openai", "gpt-5");
  assert.deepEqual(result, messages);
});

test("normalizeSystemRole merges system and developer content into the first user message for unsupported models", () => {
  const messages = [
    { role: "system", content: [{ type: "text", text: "follow policy" }] },
    { role: "developer", content: [{ type: "text", text: "prefer concise answers" }] },
    { role: "user", content: [{ type: "text", text: "say hello" }] },
    { role: "assistant", content: "prior answer" },
  ];

  const result = normalizeSystemRole(messages, "openai", "glm-4.5");

  assert.deepEqual(result, [
    {
      role: "user",
      content:
        "[System Instructions]\nfollow policy\n\nprefer concise answers\n\n[User Message]\nsay hello",
    },
    { role: "assistant", content: "prior answer" },
  ]);
});

test("normalizeSystemRole preserves the system role for GLM > 5.0 (glm-5.1/5.2 support it, #5610)", () => {
  const messages = [
    { role: "system", content: "be helpful" },
    { role: "user", content: "hello" },
  ];
  for (const model of [
    "glm-5.1",
    "glm-5.2",
    "glm-5.1-precision",
    "glm-5.2-high",
    "glm-5.2-max",
    "glm-5p1",
  ]) {
    assert.deepEqual(
      normalizeSystemRole(messages, "glm", model),
      messages,
      `expected system role preserved for ${model}`
    );
  }
});

test("normalizeSystemRole still strips the system role for pre-5.1 GLM and bare glm (#5610 guard)", () => {
  const messages = [
    { role: "system", content: "policy" },
    { role: "user", content: "ok" },
  ];
  const merged = [{ role: "user", content: "[System Instructions]\npolicy\n\n[User Message]\nok" }];
  for (const model of ["glm", "glm-4.7", "glm-5", "glm-5-turbo", "glm-5.0", "glm-5.0-turbo"]) {
    assert.deepEqual(
      normalizeSystemRole(messages, "openai", model),
      merged,
      `expected system role stripped for ${model}`
    );
  }
});

test("normalizeSystemRole inserts a user message when no user exists and drops empty system payloads", () => {
  const messages = [
    { role: "system", content: [{ type: "image_url", image_url: { url: "ignored" } }] },
    { role: "developer", content: "plain developer text" },
    { role: "assistant", content: "ready" },
  ];

  const result = normalizeSystemRole(messages, "openai", "ernie-4.0");

  assert.deepEqual(result, [
    { role: "user", content: "[System Instructions]\n[Image: ignored]\n\nplain developer text" },
    { role: "assistant", content: "ready" },
  ]);
});

test("system image part becomes a text placeholder when folding roles", () => {
  const messages = [
    {
      role: "system",
      content: [
        { type: "text", text: "Describe this image" },
        { type: "image_url", image_url: { url: "https://example.test/diagram.png" } },
      ],
    },
    { role: "user", content: [{ type: "text", text: "What does it show?" }] },
  ];

  const result = normalizeSystemRole(messages, "glm", "glm-4.6v");

  assert.deepEqual(result, [
    {
      role: "user",
      content:
        "[System Instructions]\nDescribe this image\n[Image: https://example.test/diagram.png]\n\n[User Message]\nWhat does it show?",
    },
  ]);
});

test("input_image with a string URL uses the same image placeholder", () => {
  const messages = [
    {
      role: "system",
      content: [
        { type: "text", text: "Context" },
        { type: "input_image", image_url: "https://example.test/photo.jpg" },
      ],
    },
    { role: "user", content: [{ type: "text", text: "Describe it" }] },
  ];

  const result = normalizeSystemRole(messages, "glm", "glm-4.6v") as Array<{
    role: string;
    content: string;
  }>;

  assert.ok(result[0].content.includes("[Image: https://example.test/photo.jpg]"));
});

test("image part without a URL yields the bare image placeholder", () => {
  const messages = [
    {
      role: "system",
      content: [
        { type: "text", text: "Context" },
        { type: "image_url", image_url: { detail: "high" } },
      ],
    },
    { role: "user", content: [{ type: "text", text: "Describe it" }] },
  ];

  const result = normalizeSystemRole(messages, "glm", "glm-4.6v") as Array<{
    role: string;
    content: string;
  }>;

  assert.ok(result[0].content.includes("[Image]"), "bare placeholder is present");
  assert.ok(!result[0].content.includes("undefined"), "no undefined leaks into the text");
});

test("system image placeholder matches the Responses input sanitizer format", () => {
  const url = "https://example.test/diagram.png";
  const messages = [
    {
      role: "system",
      content: [
        { type: "text", text: "Describe this image" },
        { type: "image_url", image_url: { url } },
      ],
    },
    { role: "user", content: [{ type: "text", text: "What does it show?" }] },
  ];

  const folded = normalizeSystemRole(messages, "glm", "glm-4.6v") as Array<{
    role: string;
    content: string;
  }>;
  const placeholder = `[Image: ${url}]`;
  assert.ok(folded[0].content.includes(placeholder));

  const sanitized = sanitizeResponsesInputItems([
    { role: "assistant", content: [{ type: "image_url", image_url: { url } }] },
  ]) as Array<{ content: Array<{ type: string; text: string }> }>;
  assert.equal(sanitized[0].content[0].text, placeholder);
});

test("non-image non-text system part becomes a type placeholder", () => {
  const messages = [
    {
      role: "system",
      content: [
        { type: "text", text: "ctx" },
        { type: "audio", audio: { data: "sample" } },
      ],
    },
    { role: "user", content: [{ type: "text", text: "go" }] },
  ];

  const result = normalizeSystemRole(messages, "glm", "glm-4.6v") as Array<{
    role: string;
    content: string;
  }>;

  assert.ok(result[0].content.includes("[audio]"));
});

test("normalizeSystemRole treats ZenMux z-ai/glm models as GLM even with vendor prefix", () => {
  const messages = [
    { role: "system", content: "[Context compressed: earlier messages removed]" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_1",
          type: "function",
          function: { name: "read", arguments: "{}" },
        },
      ],
    },
    { role: "tool", tool_call_id: "call_1", content: "ok" },
  ];

  const result = normalizeSystemRole(messages, "zenmux", "z-ai/glm-5.2");

  assert.deepEqual(result, [
    {
      role: "user",
      content: "[System Instructions]\n[Context compressed: earlier messages removed]",
    },
    messages[1],
    messages[2],
  ]);
});

test("normalizeRoles composes model, developer and system normalization in order", () => {
  const messages = [
    { role: "model", content: "first answer" },
    { role: "developer", content: "internal policy" },
    { role: "user", content: "help me" },
    { role: "", content: "empty role should survive" },
  ];

  const result = normalizeRoles(messages, "openai", "glm-4.7", "openai", false);

  assert.deepEqual(result, [
    { role: "assistant", content: "first answer" },
    {
      role: "user",
      content: "[System Instructions]\ninternal policy\n\n[User Message]\nhelp me",
    },
    { role: "", content: "empty role should survive" },
  ]);
});

test("normalizeSystemRole folds system/developer into the first user message for DuckDuckGo duck.ai providers (#ddgw)", () => {
  // duckchat/v1/chat accepts only user/assistant — a system/developer message
  // yields 400 ERR_BAD_REQUEST. Both the registry id and its alias must fold.
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Reply with OK" },
  ];
  for (const provider of ["duckduckgo-web", "ddgw"]) {
    const result = normalizeSystemRole(messages, provider, "gpt-5.4-nano");
    assert.deepEqual(
      result,
      [
        {
          role: "user",
          content:
            "[System Instructions]\nYou are a helpful assistant.\n\n[User Message]\nReply with OK",
        },
      ],
      `expected system folded for provider ${provider}`
    );
  }
});

test("normalizeRoles keeps folding for every current duck.ai wire model via the ddgw alias (#ddgw)", () => {
  const messages = [
    { role: "developer", content: "policy" },
    { role: "user", content: "hello" },
  ];
  for (const model of ["gpt-5.4-mini", "gpt-5.4-nano", "claude-haiku-4-5", "mistral-small-2603"]) {
    const result = normalizeRoles(messages, "ddgw", model, "openai");
    assert.deepEqual(
      result,
      [{ role: "user", content: "[System Instructions]\npolicy\n\n[User Message]\nhello" }],
      `expected developer folded for ${model}`
    );
  }
});

test("role normalization returns non-arrays unchanged", () => {
  assert.equal(normalizeDeveloperRole(null, "openai"), null);
  assert.equal(normalizeModelRole("invalid"), "invalid");
  assert.equal(normalizeSystemRole(undefined, "openai", "gpt-5"), undefined);
  assert.equal(normalizeRoles(false, "openai", "gpt-5", "openai"), false);
});
