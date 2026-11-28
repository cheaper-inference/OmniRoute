/**
 * Tests for #21472:
 * Gemini-native /v1beta route forwarding to antigravity model must detect
 * converted body as "openai" format so it is correctly translated to
 * antigravity/cloudcode upstream envelope instead of being forwarded raw with { messages }.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { detectFormatFromEndpoint, detectFormatFromUrl } =
  await import("../../open-sse/services/provider.ts");
const { translateRequest } =
  await import("../../open-sse/translator/index.ts");

test("#21472: converted openai body on /v1beta path with antigravity model detects as openai", () => {
  const converted = {
    model: "antigravity/gemini-2.5-flash",
    messages: [{ role: "user", content: "Hello from agy CLI" }],
    stream: false,
  };

  assert.equal(
    detectFormatFromEndpoint(
      converted,
      "/v1beta/models/antigravity/gemini-2.5-flash:generateContent"
    ),
    "openai"
  );

  assert.equal(
    detectFormatFromEndpoint(
      converted,
      "/v1beta/models/antigravity/gemini-2.5-flash:streamGenerateContent"
    ),
    "openai"
  );
});

test("#21472: detectFormatFromUrl with full /v1beta URL targeting antigravity detects as openai", () => {
  const converted = {
    model: "antigravity/gemini-2.5-flash",
    messages: [{ role: "user", content: "Hello from agy CLI" }],
    stream: true,
  };

  assert.equal(
    detectFormatFromUrl(
      converted,
      "http://localhost:20128/v1beta/models/antigravity/gemini-2.5-flash:streamGenerateContent?alt=sse"
    ),
    "openai"
  );
});

test("#21472: raw gemini body on /v1beta path with antigravity model still detects as gemini", () => {
  const raw = {
    contents: [{ role: "user", parts: [{ text: "Hello" }] }],
  };

  assert.equal(
    detectFormatFromEndpoint(
      raw,
      "/v1beta/models/antigravity/gemini-2.5-flash:generateContent"
    ),
    "gemini"
  );
});

test("#21472: genuine /v1/antigravity ingress endpoint still detects as antigravity", () => {
  const cloudCodeEnvelope = {
    model: "gemini-2.5-flash",
    project: "projects/test",
    request: { contents: [{ role: "user", parts: [{ text: "Hello" }] }] },
  };

  assert.equal(
    detectFormatFromEndpoint(cloudCodeEnvelope, "/v1/antigravity"),
    "antigravity"
  );
  assert.equal(
    detectFormatFromEndpoint(cloudCodeEnvelope, "/api/v1/antigravity"),
    "antigravity"
  );
  assert.equal(
    detectFormatFromEndpoint(cloudCodeEnvelope, "/v1/antigravity:streamGenerateContent"),
    "antigravity"
  );
});

test("#21472: openai format body translates properly to antigravity envelope when source is openai", async () => {
  const converted = {
    model: "antigravity/gemini-2.5-flash",
    messages: [{ role: "user", content: "Test message" }],
  };

  const translated = await translateRequest(
    "openai",
    "antigravity",
    "gemini-2.5-flash",
    converted,
    {}
  );

  assert.ok(translated, "Translation should produce a result");
  assert.ok(translated.request, "Antigravity envelope should have request property");
  assert.ok(Array.isArray(translated.request.contents), "Antigravity request should contain contents");
  assert.equal(translated.messages, undefined, "Antigravity request should not contain top-level messages");
});
