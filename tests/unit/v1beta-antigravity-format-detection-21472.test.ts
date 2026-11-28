/**
 * Regression tests for #21472:
 *   `/v1beta/models/antigravity/<model>:generateContent` (and `:streamGenerateContent`)
 *   must detect the converted internal body as `"openai"` (and raw Gemini `contents`
 *   bodies as `"gemini"`), NOT `"antigravity"`. Previously `/antigravity` in
 *   `detectFormatFromEndpoint()` shadowed `/v1beta`, causing `sourceFormat === targetFormat`
 *   so OmniRoute skipped `openai -> antigravity` translation and sent OpenAI `messages`
 *   verbatim to Antigravity upstream (`Unknown name "messages": Cannot find field.`).
 */
import assert from "node:assert/strict";
import test from "node:test";

import { detectFormatFromEndpoint, detectFormatFromUrl } from "../../open-sse/services/provider.ts";
import { resolveChatCoreRequestFormat } from "../../open-sse/handlers/chatCore/requestFormat.ts";
import { initTranslators, translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { convertGeminiToInternal } from "../../src/app/api/v1beta/models/[...path]/convertGeminiToInternal.ts";

test("#21472: /v1beta/models/antigravity/* converted bodies detect as openai, not antigravity", () => {
  const converted = convertGeminiToInternal(
    { contents: [{ parts: [{ text: "hi" }] }] },
    "antigravity/gemini-4-hydrogen-sonar",
    false
  );

  assert.equal(
    detectFormatFromEndpoint(
      converted,
      "/v1beta/models/antigravity/gemini-4-hydrogen-sonar:generateContent"
    ),
    "openai"
  );
  assert.equal(
    detectFormatFromEndpoint(
      converted,
      "/v1beta/models/antigravity/gemini-4-hydrogen-sonar:streamGenerateContent"
    ),
    "openai"
  );
  assert.equal(
    detectFormatFromEndpoint(
      converted,
      "/api/v1beta/models/antigravity/gemini-4-hydrogen-sonar:generateContent"
    ),
    "openai"
  );
  assert.equal(
    detectFormatFromUrl(
      converted,
      "http://localhost:20128/v1beta/models/antigravity/claude-sonnet-5-5-low:generateContent"
    ),
    "openai"
  );
  assert.equal(
    detectFormatFromUrl(
      converted,
      "http://localhost:20128/v1beta/models/agy/gemini-4-hydrogen-sonar:generateContent"
    ),
    "openai"
  );
});

test("#21472: /v1beta/models/* also prevents /messages and /responses segment shadowing and keeps raw Gemini as gemini", () => {
  const converted = convertGeminiToInternal(
    { contents: [{ parts: [{ text: "hi" }] }] },
    "custom/messages",
    false
  );
  assert.equal(
    detectFormatFromEndpoint(converted, "/v1beta/models/messages/model-a:generateContent"),
    "openai"
  );
  assert.equal(
    detectFormatFromEndpoint(converted, "/v1beta/models/responses/model-a:generateContent"),
    "openai"
  );

  const rawGemini = { contents: [{ parts: [{ text: "hi" }] }] };
  assert.equal(
    detectFormatFromEndpoint(
      rawGemini,
      "/v1beta/models/antigravity/gemini-4-hydrogen-sonar:generateContent"
    ),
    "gemini"
  );
});

test("#21472: resolveChatCoreRequestFormat + translateRequest translates /v1beta antigravity payload without leaking messages", async () => {
  await initTranslators();

  const endpoint = "/v1beta/models/antigravity/gemini-4-hydrogen-sonar:generateContent";
  const converted = convertGeminiToInternal(
    { contents: [{ parts: [{ text: "hi" }] }] },
    "antigravity/gemini-4-hydrogen-sonar",
    false
  );

  const fmt = resolveChatCoreRequestFormat({
    clientRawRequest: { endpoint },
    body: converted,
    provider: "antigravity",
    userAgent: "google-genai-sdk",
  });
  assert.equal(fmt.sourceFormat, "openai");
  assert.equal(fmt.clientResponseFormat, "openai");
  assert.equal(fmt.isResponsesEndpoint, false);

  const translated = translateRequest(
    fmt.sourceFormat,
    FORMATS.ANTIGRAVITY,
    "gemini-4-hydrogen-sonar",
    converted,
    false,
    null,
    "antigravity"
  ) as Record<string, unknown>;

  assert.equal(
    "messages" in translated,
    false,
    "Antigravity upstream payload must not contain OpenAI `messages`"
  );
  const inner = translated.request as { contents?: Array<{ parts?: Array<{ text?: string }> }> };
  assert.ok(
    Array.isArray(inner?.contents),
    "Antigravity upstream payload must carry request.contents"
  );
  assert.equal(inner.contents[0]?.parts?.[0]?.text, "hi");
});

test("#21472: non-regression — genuine /v1/antigravity, /v1/messages, and /v1/responses endpoints keep their formats", () => {
  const cloudcodeEnvelope = {
    model: "gemini-4-hydrogen-sonar",
    project: "projects/test",
    request: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
  };
  assert.equal(detectFormatFromEndpoint(cloudcodeEnvelope, "/v1/antigravity"), "antigravity");
  assert.equal(detectFormatFromEndpoint(cloudcodeEnvelope, "/api/v1/antigravity"), "antigravity");
  assert.equal(
    detectFormatFromEndpoint(cloudcodeEnvelope, "/v1/antigravity:streamGenerateContent"),
    "antigravity"
  );
  assert.equal(detectFormatFromEndpoint({ messages: [] }, "/v1/messages"), "claude");
  assert.equal(detectFormatFromEndpoint({ input: "hi" }, "/v1/responses"), "openai-responses");
  assert.equal(detectFormatFromEndpoint({ messages: [] }, "/v1/chat/completions"), "openai");
});
