// Claude-format clients send the output cap as `max_tokens`. For an OpenAI
// Responses target, sanitizeChatRequestBody (chatCore.ts) renames it to
// max_output_tokens BEFORE translation — but claude-to-openai.ts only reads
// `body.max_tokens`, so the hub-and-spoke leg (claude → openai → responses)
// drops the cap and the upstream request has no output limit at all.
import { test } from "node:test";
import assert from "node:assert/strict";

const { sanitizeChatRequestBody } =
  await import("../../open-sse/handlers/chatCore/sanitization.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const claudeBody = () => ({
  model: "gpt-5.5",
  max_tokens: 4096,
  stream: false,
  messages: [{ role: "user", content: "hi" }],
});

test("claude client max_tokens survives sanitize + translate to a Responses target", () => {
  // Exact chatCore.ts sequence: sanitize first, then translate.
  const sanitized = sanitizeChatRequestBody(claudeBody(), FORMATS.CLAUDE, FORMATS.OPENAI_RESPONSES);
  // Claude bodies keep their token fields: claude-to-openai reads max_tokens,
  // and the final Responses normalization renames it on the translated body.
  assert.equal(sanitized.max_tokens, 4096);
  assert.equal(sanitized.max_output_tokens, undefined);

  const out = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.5",
    sanitized,
    false,
    null,
    "openai"
  ) as Record<string, unknown>;
  assert.equal(
    out.max_output_tokens,
    4096,
    `upstream token fields: ${JSON.stringify({
      max_output_tokens: out.max_output_tokens,
      max_tokens: out.max_tokens,
      max_completion_tokens: out.max_completion_tokens,
    })}`
  );
});

test("control: unsanitized claude body keeps the cap (regression guard)", () => {
  const out = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.5",
    claudeBody(),
    false,
    null,
    "openai"
  ) as Record<string, unknown>;
  assert.equal(out.max_output_tokens, 4096);
});

test("claude -> plain openai target still maps the cap to max_tokens", () => {
  const sanitized = sanitizeChatRequestBody(claudeBody(), FORMATS.CLAUDE, FORMATS.OPENAI);
  assert.equal(sanitized.max_tokens, 4096);
  const out = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "gpt-4o",
    sanitized,
    false,
    null,
    "openai"
  ) as Record<string, unknown>;
  assert.equal(out.max_tokens, 4096);
});
