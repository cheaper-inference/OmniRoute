import { test } from "node:test";
import assert from "node:assert/strict";
import {
  directHeadersTimeoutResolver,
  resolveDirectHeadersTimeoutMs,
} from "../../open-sse/utils/directResponseStartTimeout.ts";

const IMAGE_TOOL_BODY = JSON.stringify({
  model: "gpt-6.1-sol",
  tools: [{ type: "image_generation", output_format: "png" }],
  input: [{ role: "user", content: [{ type: "input_text", text: "draw a red cube" }] }],
});

const NON_IMAGE_BODY = JSON.stringify({
  model: "gpt-4o-mini",
  messages: [{ role: "user", content: "hello" }],
});

test("image generation URL target raises TTFB floor to 300s by default (#19479)", () => {
  // Codex image POSTs (chatgpt.com/backend-api/codex/images/{generations,edits}) are not listed:
  // production gives them the dedicated OMNIROUTE_CODEX_IMAGE_RESPONSE_START_TIMEOUT_MS deadline
  // and never consults this resolver (#18891). This floor covers the other image endpoints.
  const imageEndpoints = [
    "https://api.openai.com/v1/images/generations",
    "https://api.openai.com/v1/images/edits",
    "https://api.stability.ai/v2beta/stable-image/generate/core",
  ];

  for (const url of imageEndpoints) {
    const got = resolveDirectHeadersTimeoutMs(
      { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
      null,
      0,
      false,
      url
    );
    assert.equal(
      got,
      300_000,
      `image endpoint ${url} should have default 300s direct headers budget`
    );
  }
});

test("hosted image_generation tool body raises TTFB floor to 300s by default (#19479)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    IMAGE_TOOL_BODY,
    0,
    false,
    "https://chatgpt.com/backend-api/codex/responses"
  );
  assert.equal(got, 300_000, "hosted image_generation tool body should get 300s budget");
});

test("image target honors OMNIROUTE_DIRECT_IMAGE_HEADERS_TIMEOUT_MS override (#19479)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    {
      OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined,
      OMNIROUTE_DIRECT_IMAGE_HEADERS_TIMEOUT_MS: "450000",
    },
    null,
    0,
    false,
    "https://api.openai.com/v1/images/generations"
  );
  assert.equal(got, 450_000, "explicit OMNIROUTE_DIRECT_IMAGE_HEADERS_TIMEOUT_MS must be honored");
});

test("image target preserves higher OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS floor (#19479)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    {
      OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: "600000",
      OMNIROUTE_DIRECT_IMAGE_HEADERS_TIMEOUT_MS: undefined,
    },
    null,
    0,
    false,
    "https://api.openai.com/v1/images/generations"
  );
  assert.equal(got, 600_000, "operator override above image floor is preserved");
});

test("non-image chat requests preserve 30s default dead socket detection (#19479)", () => {
  const got = resolveDirectHeadersTimeoutMs(
    { OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS: undefined },
    NON_IMAGE_BODY,
    0,
    false,
    "https://api.openai.com/v1/chat/completions"
  );
  assert.equal(got, 30_000, "chat request must retain 30s zombie-socket detection");
});

test("directHeadersTimeoutResolver passes image budget on attempt 0 (#19479)", () => {
  const resolver = directHeadersTimeoutResolver(
    { body: null },
    "https://api.openai.com/v1/images/generations"
  );
  assert.equal(resolver(0), 300_000);
});
